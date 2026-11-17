/* w-rush-scrolly · data. Ch 08, §04: lane A, "Friday, 17:30 · the push" (steps A1–A6, gated on k-04 in
   A3), plus the snapshot of Fig. 06 in §06 (FIGURES.after), which the page draws (assets/page.js).
   Classic script; defines window.ClusterData. Data only: the drawing and the lane controller are the
   course pool's (pool/cluster/cluster.js, pool/cluster/lanes.js; format in explainers/_pool/README.md),
   and assets/page.js makes the one call that starts the lane. Every reader-visible string of the canvas
   and the step text lives in this file. Each step's `state` is a COMPLETE snapshot, not a diff, so any
   step can be drawn on its own and scrolling back restores it exactly.

   Fennel's nodes, numbers and times are fiction built on Kubernetes' default settings (plan, Conventions:
   Fennel's numbers). Mechanism (facts.md): the HPA's number is current copies × reading ÷ target, rounded
   up, within its minimum and maximum (c-01, c-03), and it counts Pods that aren't ready yet as using
   nothing, so it doesn't ask again while they start (c-08); the scheduler places by requests and leaves a
   Pod waiting when no node has room for both its numbers (Ch 05); the cluster autoscaler acts only on
   waiting Pods and asks for a node only if one from the pool would hold them (c-04), within the pool's
   maximum (c-05); a new node takes minutes (c-06); a Pod is ready only after it starts and passes its
   readiness check (Ch 06).

   Requests per copy (memory · processor): storefront 4 GB · 0.5; orders 6 · 1; payments 2 · 0.25;
   dispatch 2 · 1; notifications 2 · 0.25; catalog 2 · 0.25. Room for Pods per node: 13 GB, 3.9 cores.
     17:30   01: payments, storefront, dispatch, notifications, catalog   12 GB (1 free)   CPU 2.25 (1.65 free)
             02: dispatch ×2, storefront, notifications, catalog          12 GB (1 free)   CPU 3.0  (0.9 free)
             04: payments, storefront, orders                             12 GB (1 free)   CPU 1.75 (2.15 free)
             06: catalog                                                   2 GB (11 free)  CPU 0.25 (3.65 free)
     A2      3 copies × 180% ÷ 60% = 9.
     A3      six new Pods (2 GB · 1 core each): three fit on 06 (8 GB, CPU 3.25: 5 GB · 0.65 free). For the
             other three: 01 no memory, 02 no memory and no processor, 04 no memory, 06 no processor.
             "0/4 nodes are available: 2 Insufficient cpu, 3 Insufficient memory."
     A4      6 ready of 9 wanted share the work of 9: 9 × 60% ÷ 6 = 90%. With the three unready Pods counted
             as using nothing, the HPA's average is (6 × 90%) ÷ 9 = 60%, so it asks for no more.
     A5      node 07: three dispatch Pods, 6 GB, CPU 3.0.
   Pool features used: CAPACITY { memory, cpu }, UNIT, ROOM_UNIT, STATUS_INLINE, waiting, the scheduler
   note, newNodes, verdicts (Fig. 06), and spare with this chapter's word: STRINGS.spare is 'Starting', so
   a node in state.spare is a node being started (a dashed c6 frame with STARTING in its body). The
   chapter uses spare for nothing else. */
(function () {
  'use strict';

  var NODES = ['01', '02', '04', '06'];      /* 07 joins in A4 (starting) and A5 (ready); 05 was given back */
  var CAPACITY = { memory: 13, cpu: 3.9 };

  var SERVICES = {
    storefront:    { size: 4, cpu: 0.5,  label: 'storefront',    breaks: ['store-', 'front'] },
    orders:        { size: 6, cpu: 1,    label: 'orders',        breaks: ['orders'] },
    payments:      { size: 2, cpu: 0.25, label: 'payments',      breaks: ['payments'] },
    dispatch:      { size: 2, cpu: 1,    label: 'dispatch',      breaks: ['dispatch'] },
    notifications: { size: 2, cpu: 0.25, label: 'notifications', breaks: ['notifications'] },
    catalog:       { size: 2, cpu: 0.25, label: 'catalog',       breaks: ['catalog'] }
  };

  var LOOPS = {
    hpa:   { label: 'HPA' },
    rs:    { label: 'ReplicaSet loop' },
    sched: { label: 'scheduler' },
    ca:    { label: 'cluster autoscaler' }
  };

  var PODS = {
    pa1: { service: 'payments' }, pa2: { service: 'payments' },
    sf1: { service: 'storefront' }, sf2: { service: 'storefront' }, sf3: { service: 'storefront' },
    or1: { service: 'orders', name: 'orders-q2rw' },
    no1: { service: 'notifications' }, no2: { service: 'notifications' },
    ca1: { service: 'catalog' }, ca2: { service: 'catalog' }, ca3: { service: 'catalog' },
    di1: { service: 'dispatch' }, di2: { service: 'dispatch' }, di3: { service: 'dispatch' },
    di4: { service: 'dispatch' }, di5: { service: 'dispatch' }, di6: { service: 'dispatch' },   /* to node 06 */
    di7: { service: 'dispatch' }, di8: { service: 'dispatch' }, di9: { service: 'dispatch' }    /* to node 07 */
  };

  var STRINGS = {
    widget: 'W-01 · The cluster',
    widgetShort: 'W-01',
    step: 'Step',
    node: 'Node',
    free: 'free',
    down: 'DOWN',
    status: {
      running: 'READY', notstarted: 'NOT STARTED', starting: 'STARTING', lost: 'LOST',
      crashed: 'CRASHED', waiting: 'WAITING', notready: 'NOT READY'
    },
    statusBreaks: { notstarted: ['NOT', 'STARTED'], notready: ['NOT', 'READY'] },
    nodeStatus: { unknown: 'UNKNOWN' },
    record: {
      title: 'The cluster’s record · API server',
      titleShort: 'The record · API server',
      want: 'WANT', running: 'READY', short: 'SHORT', unknown: 'UNKNOWN', waiting: 'WAITING'
    },
    loopMark: '↻',
    agent: 'agent',
    agents: 'agents',
    lens: { watching: 'Sees', doing: 'Does' },
    cpu: 'CPU',
    waiting: 'Waiting · no room',
    verdict: {
      fits: 'Fits', mem: 'No memory', cpu: 'No processor', cores: 'cores', free: 'free',
      short: { fits: '✓ Fits', mem: '✕ Mem', cpu: '✕ CPU' }
    },
    scheduler: 'Scheduler',
    newNode: 'New',
    spare: 'Start\u00ADing',   /* soft hyphen: breaks only in a column too narrow for the word (assets/page.css) */
    lanes: { A: 'Friday, 17:30 · the push' }
  };

  /* ---- reused pieces of snapshots (each step below still lists its full state) ---- */
  var N01 = ['pa1', 'sf1', 'di1', 'no1', 'ca1'];
  var N02 = ['di2', 'di3', 'sf2', 'no2', 'ca2'];
  var N04 = ['pa2', 'sf3', 'or1'];
  var ROWS = ['dispatch'];
  var THREE = ['di1', 'di2', 'di3'];
  var NINE = ['di1', 'di2', 'di3', 'di4', 'di5', 'di6', 'di7', 'di8', 'di9'];
  var SHOWN = ['hpa', 'rs', 'sched', 'ca'];
  var REASON = { id: 'sched', type: 'scheduler', text: '0/4 nodes are available: 2 Insufficient cpu, 3 Insufficient memory.' };
  function reading(text, tone) { return { id: 'reading', label: 'Measured', text: text, tone: tone }; }
  function customers(text, tone) { return { id: 'customers', label: 'Customers', text: text, tone: tone }; }
  function pool(text) { return { id: 'pool', label: 'Node pool · general', text: text }; }

  var CLUSTER_LANES = {
    A: {
      name: STRINGS.lanes.A,
      steps: [
        {
          id: 'A1',
          kicker: '17:30',
          state: {
            nodes: { '01': N01, '02': N02, '04': N04, '06': ['ca3'] },
            down: [], nodeStatus: {},
            record: { rows: ROWS, want: { dispatch: 3 }, pods: { dispatch: THREE } },
            loops: { shown: SHOWN, active: ['hpa'], agents: [], lens: { watching: 'average 50%, target 60%', doing: 'nothing: the rule gives 3, the minimum' } },
            notes: [reading('50% · target 60% · 3 ready'), customers('a driver assigned within seconds', 'good')],
            clock: '17:30'
          },
          text: [
            'At 17:30 `dispatch` runs its minimum of three copies, and each is using about half the processor it reserves, which is below the target. The rule would give 3 copies at most, and 3 is the minimum, so the HPA has nothing to do.',
            'Then the push goes out.'
          ],
          ariaLabel: '17:30. The record wants 3 copies of dispatch and 3 are ready. The HPA is acting: it sees an average of 50% against a target of 60%, and does nothing, because the rule gives 3, which is also the minimum. Node 01 runs payments, storefront, dispatch, notifications and catalog, with 1 GB free and 2.25 of 3.9 cores reserved. Node 02 runs two dispatch Pods, storefront, notifications and catalog, with 1 GB free and 3 of 3.9 cores reserved. Node 04 runs payments, storefront and orders, with 1 GB free and 1.75 cores reserved. Node 06 runs one catalog Pod, with 11 GB free and 0.25 cores reserved. Measured for dispatch: 50% of what each Pod reserves, target 60%. Customers: a driver assigned within seconds.',
          highlight: ['note:reading', 'row:dispatch']
        },
        {
          id: 'A2',
          kicker: '~17:34',
          state: {
            nodes: { '01': N01, '02': N02, '04': N04, '06': ['ca3'] },
            down: [], nodeStatus: {},
            record: { rows: ROWS, want: { dispatch: 9 }, pods: { dispatch: THREE } },
            loops: { shown: SHOWN, active: ['hpa'], agents: [], lens: { watching: 'average 180%, target 60%', doing: 'writes 9 copies' } },
            notes: [reading('180% · target 60% · 3 ready', 'warn'), customers('waiting minutes for a driver', 'bad')],
            clock: '~17:34'
          },
          text: [
            'Orders pour in. By about 17:33 the reading has passed its target and the first customers are waiting longer than usual for a driver. A minute later each copy is using nearly twice the processor it reserved: the reading is 180%, three times the target.',
            'Three times the target means three times the copies, so the HPA rewrites `dispatch`’s number in the record from 3 to 9, in a couple of quick steps. That is all it does.'
          ],
          ariaLabel: 'About 17:34, a minute after the reading passed its target and the first customers began to wait. The HPA is acting: it sees an average of 180% against a target of 60%, and writes 9 copies. The record now wants 9 copies of dispatch; 3 exist, so it is short 6. The four nodes are unchanged. Measured for dispatch: 180%, target 60%. Customers: waiting minutes for a driver.',
          highlight: ['row:dispatch', 'note:reading', 'lens']
        },
        {
          id: 'A3',
          kicker: 'Seconds later',
          state: {
            nodes: { '01': N01, '02': N02, '04': N04, '06': ['ca3', 'di4:starting', 'di5:starting', 'di6:starting'] },
            waiting: ['di7', 'di8', 'di9'],
            down: [], nodeStatus: {},
            record: { rows: ROWS, want: { dispatch: 9 }, pods: { dispatch: NINE } },
            loops: { shown: SHOWN, active: ['sched'], agents: [], lens: { watching: '6 new Pods; room for 3', doing: '3 to node 06; 3 left waiting' } },
            notes: [reading('180% · target 60% · 3 ready', 'warn'), REASON, customers('waiting minutes for a driver', 'bad')],
            clock: 'Seconds later'
          },
          text: [
            'The ReplicaSet loop writes six new Pod records, and the scheduler places them as it places any Pod, by what they reserve: 2 GB of memory and a whole processor core each.',
            'Node 06 has room for three, and they begin to start there. For the other three, no node has both the memory and the processor, so they wait, as one did on that Friday in Chapter 5.'
          ],
          ariaLabel: 'Seconds later. The scheduler is acting: it sees 6 new Pods and room for 3, puts 3 on node 06 and leaves 3 waiting. Node 06 now holds catalog and three dispatch Pods that are starting, with 5 GB free and 3.25 of 3.9 cores reserved. Three dispatch Pods wait in the strip above the nodes, headed waiting, no room. The record wants 9 copies of dispatch: 3 ready, 3 waiting. The scheduler’s recorded reason: 0/4 nodes are available: 2 Insufficient cpu, 3 Insufficient memory. Measured for dispatch: 180%, target 60%. Customers: waiting minutes for a driver.',
          highlight: ['p:di4', 'p:di5', 'p:di6', 'waiting', 'note:sched']
        },
        {
          id: 'A4',
          kicker: '~17:36',
          state: {
            nodes: { '01': N01, '02': N02, '04': N04, '06': ['ca3', 'di4', 'di5', 'di6'], '07': [] },
            spare: ['07'],
            waiting: ['di7', 'di8', 'di9'],
            down: [], nodeStatus: {},
            record: { rows: ROWS, want: { dispatch: 9 }, pods: { dispatch: NINE } },
            loops: { shown: SHOWN, active: ['ca'], agents: [], lens: { watching: '3 Pods with no room; one more node would hold them', doing: 'has asked for a node; waiting' } },
            notes: [pool('4 nodes, 1 requested · max 8'), reading('90% · target 60% · 6 ready', 'warn'), customers('waiting longer than usual', 'warn')],
            clock: '~17:36'
          },
          text: [
            'Within seconds of the three Pods beginning to wait, at about 17:34:30, the cluster autoscaler had noticed them, worked out that one more node from the general pool would hold all three, and asked the provider for it. A minute and a half later that machine is still starting.',
            'Meanwhile the three Pods on node 06 have downloaded their image, started and passed their readiness check, so six copies now share the work.',
            'The HPA keeps looking. It counts the three Pods that aren’t ready yet as using nothing, so the average it works out across all nine is 60%, which is the target, and it asks for no more.'
          ],
          ariaLabel: 'About 17:36. The cluster autoscaler is acting: it sees 3 Pods with no room, has worked out that one more node would hold them, has asked the provider for a node at about 17:34:30, and is waiting for it. Node 07 is drawn as a dashed frame marked starting, with no Pods. The three dispatch Pods on node 06 are ready. Three dispatch Pods are still waiting, with no room. The record wants 9 copies of dispatch: 6 ready, 3 waiting. Node pool general: 4 nodes, 1 requested, maximum 8. Measured for dispatch: 90%, target 60%. Customers: waiting longer than usual.',
          highlight: ['n:07', 'waiting', 'lens']
        },
        {
          id: 'A5',
          kicker: '~17:38:30',
          state: {
            nodes: { '01': N01, '02': N02, '04': N04, '06': ['ca3', 'di4', 'di5', 'di6'], '07': ['di7:starting', 'di8:starting', 'di9:starting'] },
            newNodes: ['07'],
            down: [], nodeStatus: {},
            record: { rows: ROWS, want: { dispatch: 9 }, pods: { dispatch: NINE } },
            loops: { shown: SHOWN, active: ['sched'], agents: ['07'], lens: { watching: '3 waiting Pods; a new node', doing: 'all 3 to node 07' } },
            notes: [pool('5 nodes · max 8'), reading('90% · target 60% · 6 ready', 'warn'), customers('waiting longer than usual', 'warn')],
            clock: '~17:38:30'
          },
          text: [
            'About four minutes after it was asked for, node 07 joins the cluster. It is a new machine with a new name; node 05 is not coming back.',
            'The scheduler places the three waiting Pods on it at once, and node 07’s agent starts them as node 06’s agent started the others.'
          ],
          ariaLabel: 'About 17:38:30. Node 07 has joined the cluster, tagged new. The scheduler is acting: it sees 3 waiting Pods and a new node, and puts all 3 on node 07, where they are starting; node 07’s agent is acting. Nothing is waiting. Node 07 has 7 GB free and 3 of 3.9 cores reserved. The record wants 9 copies of dispatch: 6 ready. Node pool general: 5 nodes, maximum 8. Measured for dispatch: 90%, target 60%. Customers: waiting longer than usual.',
          highlight: ['n:07', 'new:07', 'p:di7', 'p:di8', 'p:di9']
        },
        {
          id: 'A6',
          kicker: '~17:40',
          state: {
            nodes: { '01': N01, '02': N02, '04': N04, '06': ['ca3', 'di4', 'di5', 'di6'], '07': ['di7', 'di8', 'di9'] },
            down: [], nodeStatus: {},
            record: { rows: ROWS, want: { dispatch: 9 }, pods: { dispatch: NINE } },
            loops: { shown: SHOWN, active: ['hpa'], agents: [], lens: { watching: 'average 60%, target 60%', doing: 'nothing' } },
            notes: [reading('60% · target 60% · 9 ready', 'good'), customers('a driver assigned within seconds', 'good')],
            clock: '~17:40'
          },
          text: [
            'By 17:40 all nine copies are ready, each is on the list of `dispatch`’s Service, and the reading is back at its target.',
            'From the first late assignment, at about 17:33, to this moment took about seven minutes.'
          ],
          ariaLabel: 'About 17:40. All nine dispatch Pods are ready: three on nodes 01 and 02, three on node 06 and three on node 07. The record wants 9 copies of dispatch and 9 are ready. The HPA is acting: it sees an average of 60% against a target of 60%, and does nothing. Measured for dispatch: 60%, target 60%. Customers: a driver assigned within seconds.',
          highlight: ['row:dispatch', 'note:reading']
        }
      ]
    }
  };

  /* Fig. 06 (§06, revealed after k-06): Friday at about 19:20. dispatch is back at 3 copies; node 07 is
     empty; node 06 holds one catalog Pod (2 GB) that fits on no other node, each of which has 1 GB free.
     The verdicts are for that catalog Pod. Drawn by assets/page.js with opts.nodesOnly. */
  var FIGURES = {
    after: {
      state: {
        nodes: { '01': N01, '02': N02, '04': N04, '06': ['ca3'], '07': [] },
        down: [], nodeStatus: {},
        verdicts: { '01': 'mem', '02': 'mem', '04': 'mem' },
        record: { rows: [], want: {}, pods: {} },
        loops: { shown: [], active: [], agents: [] },
        notes: [
          { id: 'n07', label: 'Node 07', text: 'empty · given back after about 10 min, so it takes no Pod', tone: 'good' },
          { id: 'n06', label: 'Node 06', text: 'stays · its Pod fits on no node that is staying', tone: 'warn' },
          { id: 'key', label: 'Nodes 01, 02, 04', text: 'no memory for node 06’s catalog Pod' }
        ]
      },
      highlight: ['n:07', 'p:ca3'],
      ariaLabel: 'Friday at about 19:20, five nodes. Nodes 01, 02 and 04 are nearly full, each with 1 GB free, and each is marked no memory for the catalog Pod on node 06, which reserves 2 GB. Node 07 is empty, with 13 GB free: it is given back after about 10 minutes, so it takes no Pod. Node 06 holds only that catalog Pod, with 11 GB free: its Pod fits on no node that is staying, so node 06 stays.'
    }
  };

  window.ClusterData = {
    NODES: NODES,
    CAPACITY: CAPACITY,
    UNIT: 'GB',
    ROOM_UNIT: 2,
    STATUS_INLINE: true,
    SERVICES: SERVICES,
    LOOPS: LOOPS,
    PODS: PODS,
    STRINGS: STRINGS,
    CLUSTER_LANES: CLUSTER_LANES,
    FIGURES: FIGURES
  };
})();
