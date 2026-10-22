/* w-cluster-scrolly · data. Ch 04, §04 "Moving day" (lane A) and §05 "Saturday, 03:04" (lane B).
   Classic script; defines window.ClusterData. Copied from Ch 03's w-fleet-scrolly/data.js and extended.
   Every reader-visible string of the lanes (canvas and step text) lives in this file. Fennel's services,
   sizes, nodes, Pod names, times and the moving-day story are fiction (d-04); the waits in lane B are
   Kubernetes' documented defaults (facts c-10, c-11; x-04), so every timing says "by default".

   ---- Snapshot format (copy this for later chapters) -------------------------------------------------
   Each step's `state` is a COMPLETE snapshot, not a diff, so any step can be drawn on its own and
   scrolling back restores it exactly. renderCluster(el, state, opts) in index.js draws one snapshot.

     nodes       { '01': ['pa1', 'sf1:notstarted'], … }  every node and the Pods placed on it, top to
                 bottom. An entry is 'id' (status running) or 'id:status', status one of
                   running     solid chip with a lamp, RUNNING (good)
                   notstarted  assigned to this node, not running yet: dashed, no fill, no lamp,
                               NOT STARTED (ink-3). It exists only as a record.
                   starting    the node agent is downloading the image and starting it: STARTING (warn)
                   lost        on a node that is physically DOWN (reality, not yet in the record): LOST
                   crashed     CRASHED (bad)
                   newaddr | stopped   Ch 03's statuses, still drawn, unused here
                 Nodes are drawn in key order, one column each, so a later chapter may add or remove
                 keys between steps (Ch 08 adds nodes). Every node has CAPACITY units of room; a Pod
                 takes its service's `size`; unused room is drawn as "N FREE".
     down        ['03']            nodes that are physically dead: dashed frame, "DOWN" in the body,
                                   their Pods drawn LOST. This is reality; the record may not know yet.
     nodeStatus  { '03': 'unknown' }  what the record says about a node: 'unknown' prints UNKNOWN (warn)
                                   on the node bar, and that node's Pod marks in the record read "?".
     record      { rows: ['orders', …], want: { orders: 1, … }, pods: { orders: ['or1'], … } }
                 The cluster's record: one row per service in `rows` order, WANT n, then one mark per
                 Pod record in `pods`. Marks and row words are COMPUTED, never written here:
                   mark  filled (good)   the Pod is in `nodes`, running or lost, on a node not marked
                                         unknown (the record believes what the agent last reported,
                                         even if the machine has since died)
                         hollow dashed   the Pod is notstarted/starting/crashed, or not on any node yet
                         ? (warn)        the Pod is on a node marked unknown
                   word  SHORT n (warn)  fewer Pod records than WANT
                         n RUNNING       otherwise, n = filled marks (good when n ≥ WANT), plus
                                         "· n UNKNOWN" (warn) when any mark is "?". Where the full word
                                         doesn't fit (narrow canvas) only the most urgent part shows.
     loops       { shown: ['rs', 'sched'], active: ['sched'], agents: ['01'], lens: { watching, doing } }
                 shown   loop pills drawn on the canvas (LOOPS below), inactive ones at 0.35 opacity
                 active  the acting loop(s), at full ink
                 agents  nodes whose agent is acting: its "↻ agent" pill on the node bar lights up, and an
                         "↻ agents · 01, 02" pill joins the loop row so the lens line has its actor
                 lens    the acting loop's lens line, WATCHING · … / DOING · … (omit when none acts)
                 On a narrow canvas, or wherever a state's pills don't fit one row, only the acting
                 pill is drawn (all shown pills, dimmed, when none acts).
     notes       [{ id, label?, text, sub?, tone? }]  lines under the nodes: the CUSTOMERS line, the
                 connection line. tone 'good' | 'bad' | 'warn' | 'mute' colours `text`; `sub` is an
                 ink-3 tail ("kept current by …"), dropped on a narrow canvas (the step text says it).
     clock       'string'          the clock kicker on the canvas header ('~03:04:50'); omit for none
     banner      'text'            optional "what if" line above the record (Ch 03's)
   Later-chapter fields (designed in the plan; none is used or drawn in Ch 04 unless marked):
     restarts    { podId: n }      DRAWN: "↻ n" on the Pod's chip where it fits (Ch 12, crash loops)
     PODS[id].version              DRAWN: printed after the label where it fits (Ch 06, versions)
     status 'waiting', row word 'WAITING · NO ROOM'   NOT DRAWN yet (Ch 05: a Pod no node has room for)
     several rows per service (old and new ReplicaSet under a Deployment row)   NOT DRAWN yet (Ch 06)
     a note listing a service's current Pod addresses   use `notes` (Ch 07)

   A Pod id names one Pod (one running copy of a service, in its wrapper): see PODS. A replacement is a
   new Pod with a new id and a new name (or1 → or2: orders-5c8x → orders-q2rw); Pods never move.
   Step fields: id, kicker? (a time, shown above the step text), text [paragraphs; `code` in
   backticks], ariaLabel (the canvas state in words), gate? (check ids; the page's data-gate attributes
   are authoritative), highlight [what changed in this step: 'p:<pod>', 'n:<node>' (the whole node),
   'status:<node>' (its UNKNOWN word), 'free:<node>', 'row:<service>', 'loop:<id>', 'agent:<node>',
   'note:<id>', 'lens', 'banner']. */
(function () {
  'use strict';

  var NODES = ['01', '02', '03', '04'];
  var CAPACITY = 6;                       /* units of room per node (Ch 03's unit and D2) */

  /* size in room units, chip label, and where the label may break on a narrow chip */
  var SERVICES = {
    storefront: { size: 2, label: 'storefront', breaks: ['store-', 'front'] },
    orders:     { size: 3, label: 'orders',     breaks: ['orders'] },
    payments:   { size: 1, label: 'payments',   breaks: ['payments'] },
    dispatch:   { size: 1, label: 'dispatch',   breaks: ['dispatch'] }
  };

  /* the loops drawn as pills. The node agent is one per node, drawn on each node bar. */
  var LOOPS = {
    rs:    { label: 'ReplicaSet loop' },
    sched: { label: 'scheduler' },
    node:  { label: 'node loop' }
  };

  /* name: the generated name the reader sees in §06 (fiction, R2); not drawn on the canvas */
  var PODS = {
    or1: { service: 'orders', name: 'orders-5c8x' },
    pa1: { service: 'payments' },
    pa2: { service: 'payments' },
    di1: { service: 'dispatch' },
    di2: { service: 'dispatch' },
    di3: { service: 'dispatch' },
    sf1: { service: 'storefront' },
    sf2: { service: 'storefront' },
    sf3: { service: 'storefront' },
    or2: { service: 'orders', name: 'orders-q2rw' },   /* the replacement, written at about 03:09:50 */
    di4: { service: 'dispatch' }                      /* the replacement dispatch Pod */
  };

  var STRINGS = {
    widget: 'W-01 · The cluster',
    widgetShort: 'W-01',
    step: 'Step',
    node: 'Node',
    free: 'free',
    down: 'DOWN',
    status: {
      running: 'RUNNING', notstarted: 'NOT STARTED', starting: 'STARTING', lost: 'LOST',
      crashed: 'CRASHED', newaddr: 'NEW ADDR', stopped: 'STOPPED'
    },
    /* where a status word may break when it doesn't fit on one chip line */
    statusBreaks: { notstarted: ['NOT', 'STARTED'], newaddr: ['NEW', 'ADDR'] },
    /* a size-1 chip has one line: where the word doesn't fit there, this shorter one is used */
    statusShort: { notstarted: 'NOT YET' },
    nodeStatus: { unknown: 'UNKNOWN' },
    record: {
      title: 'The cluster’s record · API server',
      titleShort: 'The record · API server',
      want: 'WANT', running: 'RUNNING', short: 'SHORT', unknown: 'UNKNOWN'
    },
    loopMark: '↻',
    agent: 'agent',
    agents: 'agents',
    lens: { watching: 'Watching', doing: 'Doing' },
    lanes: { A: 'Moving day', B: 'Saturday, 03:04' }
  };

  /* ---- reused pieces of snapshots (each step below still lists its full state) ---- */
  var ROWS = ['orders', 'payments', 'dispatch', 'storefront'];
  var WANT = { orders: 1, payments: 2, dispatch: 3, storefront: 3 };
  var CUSTOMERS_DOWN = { id: 'customers', label: 'Customers', text: 'can’t place orders', tone: 'bad' };
  var CUSTOMERS_UP = { id: 'customers', label: 'Customers', text: 'can order', tone: 'good' };

  /* end of moving day = Ch 03's Monday layout (the storefront Pods were added below what was there) */
  var A5_NODES = { '01': ['pa1', 'sf1', 'sf2'], '02': ['di1', 'di2', 'sf3'], '03': ['or1', 'di3'], '04': ['pa2'] };
  var A5_PODS = { orders: ['or1'], payments: ['pa1', 'pa2'], dispatch: ['di1', 'di2', 'di3'], storefront: ['sf1', 'sf2', 'sf3'] };

  var CLUSTER_LANES = {
    A: {
      name: STRINGS.lanes.A,
      steps: [
        {
          id: 'A1',
          state: {
            nodes: { '01': ['pa1'], '02': ['di1', 'di2'], '03': ['or1', 'di3'], '04': ['pa2'] },
            down: [], nodeStatus: {},
            record: { rows: ['orders', 'payments', 'dispatch'], want: { orders: 1, payments: 2, dispatch: 3 }, pods: { orders: ['or1'], payments: ['pa1', 'pa2'], dispatch: ['di1', 'di2', 'di3'] } },
            loops: { shown: ['rs', 'sched'], active: [], agents: [] },
            notes: []
          },
          text: [
            'Moving day. `orders`, `payments` and `dispatch` already run on Fennel’s cluster, and `storefront` is the last service to move. Ari applies its manifest, the one in Fig. 02, and the tool answers `created` in under a second.'
          ],
          ariaLabel: 'The cluster’s record lists three services: orders, 1 Pod wanted and 1 running; payments, 2 wanted and 2 running; dispatch, 3 wanted and 3 running. It has no storefront line. Node 01 runs a payments Pod; node 02, two dispatch Pods; node 03, the orders Pod and a dispatch Pod; node 04, a payments Pod. No loop is acting.',
          highlight: []
        },
        {
          id: 'A2',
          gate: ['k-03'],
          state: {
            nodes: { '01': ['pa1'], '02': ['di1', 'di2'], '03': ['or1', 'di3'], '04': ['pa2'] },
            down: [], nodeStatus: {},
            record: { rows: ROWS, want: WANT, pods: { orders: ['or1'], payments: ['pa1', 'pa2'], dispatch: ['di1', 'di2', 'di3'], storefront: [] } },
            loops: { shown: ['rs', 'sched'], active: [], agents: [] },
            notes: []
          },
          text: [
            'The manifest went to the cluster’s API server, the front door to the record, which checked it and wrote it down. That’s all `created` means: Fennel’s intention is recorded, and nothing new is running anywhere.'
          ],
          ariaLabel: 'A new line in the cluster’s record: storefront, 3 Pods wanted, short 3, with no Pod records yet. The nodes are unchanged: no storefront Pod exists anywhere. No loop is acting yet.',
          highlight: ['row:storefront']
        },
        {
          id: 'A3',
          gate: ['k-03'],
          state: {
            nodes: { '01': ['pa1'], '02': ['di1', 'di2'], '03': ['or1', 'di3'], '04': ['pa2'] },
            down: [], nodeStatus: {},
            record: { rows: ROWS, want: WANT, pods: A5_PODS },
            loops: { shown: ['rs', 'sched'], active: ['rs'], agents: [], lens: { watching: 'storefront: wants 3, has 0', doing: 'writes 3 new Pod records' } },
            notes: []
          },
          text: [
            'Within seconds, the ReplicaSet loop notices the new `storefront` line in the record: three Pods wanted, none recorded. It writes three Pod records and stops there. Picking nodes and starting containers are other loops’ work.'
          ],
          ariaLabel: 'The ReplicaSet loop is acting. Watching storefront, which wants 3 Pods and has 0, it writes 3 new Pod records. The storefront line now holds three Pod records, none on a node and none running. The nodes are unchanged.',
          highlight: ['loop:rs', 'lens', 'row:storefront']
        },
        {
          id: 'A4',
          gate: ['k-03'],
          state: {
            nodes: { '01': ['pa1', 'sf1:notstarted', 'sf2:notstarted'], '02': ['di1', 'di2', 'sf3:notstarted'], '03': ['or1', 'di3'], '04': ['pa2'] },
            down: [], nodeStatus: {},
            record: { rows: ROWS, want: WANT, pods: A5_PODS },
            loops: { shown: ['rs', 'sched'], active: ['sched'], agents: [], lens: { watching: 'Pods with no node', doing: 'writes a node into each record' } },
            notes: []
          },
          text: [
            'The scheduler sees three Pods with no node and writes a node with room into each Pod’s record. How it chooses is Chapter 5. It doesn’t start anything either: so far, each `storefront` Pod is only a record.'
          ],
          ariaLabel: 'The scheduler is acting. Watching for Pods with no node, it writes a node into each: 01, 01 and 02. Two storefront Pods now sit on node 01 and one on node 02, not started: they exist only as records. The record still shows 0 storefront Pods running.',
          highlight: ['loop:sched', 'lens', 'p:sf1', 'p:sf2', 'p:sf3']
        },
        {
          id: 'A5',
          gate: ['k-03'],
          state: {
            nodes: A5_NODES,
            down: [], nodeStatus: {},
            record: { rows: ROWS, want: WANT, pods: A5_PODS },
            loops: { shown: ['rs', 'sched'], active: [], agents: ['01', '02'], lens: { watching: 'Pods assigned to its node', doing: 'downloads the image, starts it' } },
            notes: []
          },
          text: [
            'On nodes 01 and 02, each node’s agent sees the Pods assigned to its node, downloads the `storefront` image, starts the containers and reports back. Now the record matches what’s running.',
            'No part handed another a plan: each loop read the record and wrote to it. And the loops keep watching, release or not.'
          ],
          ariaLabel: 'The node agents on nodes 01 and 02 are acting. Watching the Pods assigned to their node, they download the storefront image, start the containers and report back. All three storefront Pods are running, and the record reads storefront, 3 wanted, 3 running; every line matches what runs. Node 01: a payments Pod and two storefront Pods, 1 unit free. Node 02: two dispatch Pods and a storefront Pod, 2 free. Node 03: orders and a dispatch Pod, 2 free. Node 04: a payments Pod, 5 free.',
          highlight: ['agent:01', 'agent:02', 'lens', 'p:sf1', 'p:sf2', 'p:sf3', 'row:storefront']
        }
      ]
    },

    B: {
      name: STRINGS.lanes.B,
      steps: [
        {
          id: 'B1',
          kicker: '03:04',
          state: {
            nodes: { '01': ['pa1', 'sf1', 'sf2'], '02': ['di1', 'di2', 'sf3'], '03': ['or1:lost', 'di3:lost'], '04': ['pa2'] },
            down: ['03'], nodeStatus: {},
            record: { rows: ROWS, want: WANT, pods: A5_PODS },
            loops: { shown: ['rs', 'sched'], active: [], agents: [] },
            notes: [CUSTOMERS_DOWN],
            clock: '03:04'
          },
          text: [
            'Machine 03, node 03 to Kubernetes, stops. The `orders` Pod and a `dispatch` Pod stop with it, and customers can’t place orders. The record still lists both Pods as running: nothing has told it otherwise.'
          ],
          ariaLabel: '03:04. Node 03 is down: its orders Pod and a dispatch Pod are lost, and customers can’t place orders. The cluster’s record hasn’t changed: it still lists orders, 1 running, and dispatch, 3 running, counting the two Pods on node 03. No loop is acting.',
          highlight: ['n:03', 'note:customers']
        },
        {
          id: 'B2',
          kicker: '~03:04:50',
          gate: ['k-04'],
          state: {
            nodes: { '01': ['pa1', 'sf1', 'sf2'], '02': ['di1', 'di2', 'sf3'], '03': ['or1:lost', 'di3:lost'], '04': ['pa2'] },
            down: ['03'], nodeStatus: { '03': 'unknown' },
            record: { rows: ROWS, want: WANT, pods: A5_PODS },
            loops: { shown: ['rs', 'sched', 'node'], active: ['node'], agents: [], lens: { watching: 'every node’s check-ins', doing: 'marks node 03 UNKNOWN' } },
            notes: [CUSTOMERS_DOWN],
            clock: '~03:04:50'
          },
          text: [
            'Each node’s agent checks in regularly, and node 03’s check-ins have stopped. After 50 seconds of silence, by default, the node loop marks node 03 as unknown.',
            'The node loop removes nothing yet: a network glitch looks just like a dead machine, and the machine may come back.'
          ],
          ariaLabel: 'About 03:04:50. The node loop is acting. Watching every node’s check-ins, it marks node 03 unknown. In the record, the orders Pod and one dispatch Pod, both on node 03, now read unknown. Customers still can’t place orders.',
          highlight: ['loop:node', 'lens', 'status:03', 'row:orders', 'row:dispatch']
        },
        {
          id: 'B3',
          kicker: '~03:09:50',
          gate: ['k-04'],
          state: {
            nodes: { '01': ['pa1', 'sf1', 'sf2'], '02': ['di1', 'di2', 'sf3'], '03': [], '04': ['pa2'] },
            down: ['03'], nodeStatus: { '03': 'unknown' },
            record: { rows: ROWS, want: WANT, pods: { orders: [], payments: ['pa1', 'pa2'], dispatch: ['di1', 'di2'], storefront: ['sf1', 'sf2', 'sf3'] } },
            loops: { shown: ['rs', 'sched', 'node'], active: ['node'], agents: [], lens: { watching: 'node 03: 5 minutes unknown', doing: 'removes node 03’s Pod records' } },
            notes: [CUSTOMERS_DOWN],
            clock: '~03:09:50'
          },
          text: [
            'By default, the node loop then waits five more minutes. Node 03 hasn’t come back, so the node loop removes node 03’s Pods from the record. Now the record shows the gap that customers have felt since 03:04.'
          ],
          ariaLabel: 'About 03:09:50. Node 03 has been unknown for 5 minutes, so the node loop removes its Pods from the record. The record now reads orders, 1 wanted, short 1, and dispatch, 3 wanted, short 1. Node 03 is empty and still down. Customers still can’t place orders.',
          highlight: ['loop:node', 'lens', 'row:orders', 'row:dispatch', 'n:03']
        },
        {
          id: 'B4',
          kicker: 'Seconds later',
          gate: ['k-04'],
          state: {
            nodes: { '01': ['pa1', 'sf1', 'sf2'], '02': ['di1', 'di2', 'sf3'], '03': [], '04': ['pa2'] },
            down: ['03'], nodeStatus: { '03': 'unknown' },
            record: { rows: ROWS, want: WANT, pods: { orders: ['or2'], payments: ['pa1', 'pa2'], dispatch: ['di1', 'di2', 'di4'], storefront: ['sf1', 'sf2', 'sf3'] } },
            loops: { shown: ['rs', 'sched', 'node'], active: ['rs'], agents: [], lens: { watching: 'Pods wanted vs. recorded', doing: 'writes 2 new Pod records' } },
            notes: [CUSTOMERS_DOWN],
            clock: 'Seconds later'
          },
          text: [
            'The ReplicaSet loop makes the same comparison as on moving day and finds two gaps, one `orders` Pod and one `dispatch` Pod. It writes a new Pod record for each, without knowing, or needing to know, why the old ones went.'
          ],
          ariaLabel: 'Seconds later. The ReplicaSet loop is acting. Comparing Pods wanted with Pods recorded, it finds orders short 1 and dispatch short 1, and writes 2 new Pod records, one for each. Neither new Pod has a node yet: orders reads 0 running, dispatch 2 running. Customers still can’t place orders.',
          highlight: ['loop:rs', 'lens', 'row:orders', 'row:dispatch']
        },
        {
          id: 'B5',
          gate: ['k-04'],
          state: {
            nodes: { '01': ['pa1', 'sf1', 'sf2'], '02': ['di1', 'di2', 'sf3', 'di4:notstarted'], '03': [], '04': ['pa2', 'or2:notstarted'] },
            down: ['03'], nodeStatus: { '03': 'unknown' },
            record: { rows: ROWS, want: WANT, pods: { orders: ['or2'], payments: ['pa1', 'pa2'], dispatch: ['di1', 'di2', 'di4'], storefront: ['sf1', 'sf2', 'sf3'] } },
            loops: { shown: ['rs', 'sched', 'node'], active: ['sched'], agents: [], lens: { watching: '2 Pods with no node', doing: 'orders → 04, dispatch → 02' } },
            notes: [CUSTOMERS_DOWN],
            clock: 'Seconds later'
          },
          text: [
            'The scheduler sees two Pods with no node. Node 04 is the only node with room for all of `orders`. Sam made the same choice by hand a year ago; this time a loop made it.'
          ],
          ariaLabel: 'The scheduler is acting. Watching 2 Pods with no node, it writes node 04 into the new orders Pod, the only node with room for it, and node 02 into the new dispatch Pod. Both Pods sit on their nodes, not started. Node 04 now has 2 units free and node 02 has 1. Customers still can’t place orders.',
          highlight: ['loop:sched', 'lens', 'p:or2', 'p:di4', 'free:04', 'free:02']
        },
        {
          id: 'B6',
          kicker: '~03:10–03:11',
          gate: ['k-04'],
          state: {
            nodes: { '01': ['pa1', 'sf1', 'sf2'], '02': ['di1', 'di2', 'sf3', 'di4'], '03': [], '04': ['pa2', 'or2'] },
            down: ['03'], nodeStatus: { '03': 'unknown' },
            record: { rows: ROWS, want: WANT, pods: { orders: ['or2'], payments: ['pa1', 'pa2'], dispatch: ['di1', 'di2', 'di4'], storefront: ['sf1', 'sf2', 'sf3'] } },
            loops: { shown: ['rs', 'sched', 'node'], active: [], agents: ['04', '02'], lens: { watching: 'Pods assigned to its node', doing: 'gets the image, starts it' } },
            notes: [CUSTOMERS_UP, { id: 'link', text: 'storefront → orders: node 04', sub: 'kept current by another loop (Ch 7)' }],
            clock: '~03:10–03:11'
          },
          text: [
            'Node 04 has never run `orders`, so its agent downloads the image first, then starts the container. Customers can order again, roughly six or seven minutes after 03:04 with default settings, and nobody was woken.',
            'Another loop, Chapter 7’s, keeps `storefront` pointed at the new `orders` Pod, so connecting is done too.'
          ],
          ariaLabel: 'About 03:10 to 03:11. The node agents on nodes 04 and 02 are acting: node 04’s agent downloads the orders image, and both start their new Pods. The record reads orders, 1 running, and dispatch, 3 running. Customers can order again. storefront sends orders to node 04, kept current by another loop, covered in Chapter 7.',
          highlight: ['agent:04', 'agent:02', 'lens', 'p:or2', 'p:di4', 'row:orders', 'row:dispatch', 'note:customers', 'note:link']
        }
      ]
    }
  };

  window.ClusterData = {
    NODES: NODES,
    CAPACITY: CAPACITY,
    SERVICES: SERVICES,
    LOOPS: LOOPS,
    PODS: PODS,
    STRINGS: STRINGS,
    CLUSTER_LANES: CLUSTER_LANES
  };
})();
