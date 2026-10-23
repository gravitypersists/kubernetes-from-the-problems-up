/* w-cluster-scrolly · data. Ch 04, §04 "Moving day" (lane A) and §05 "Saturday, 03:04" (lane B).
   Classic script; defines window.ClusterData. Copied from Ch 03's w-fleet-scrolly/data.js and extended.
   Every reader-visible string of the lanes (canvas and step text) lives in this file. Fennel's services,
   sizes, nodes, Pod names, times and the moving-day story are fiction (d-04); the waits in lane B are
   Kubernetes' documented defaults (facts c-10, c-11; x-04), so every timing says "by default".

   The snapshot format, the step fields and the highlight keys are the pool's: see
   explainers/_pool/README.md, "Cluster drawing" (pool/cluster/cluster.js draws one snapshot) and
   "Cluster lanes" (pool/cluster/lanes.js). Each step's `state` is a COMPLETE snapshot, not a diff, so
   any step can be drawn on its own and scrolling back restores it exactly. This chapter uses room units
   (CAPACITY 6, no UNIT) and none of the optional Ch 05 fields.

   A Pod id names one Pod (one running copy of a service, in its wrapper): see PODS. A replacement is a
   new Pod with a new id and a new name (or1 → or2: orders-5c8x → orders-q2rw); Pods never move. */
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
    nodeStatus: { unknown: 'UNKNOWN' },
    record: {
      title: 'The cluster’s record · API server',
      titleShort: 'The record · API server',
      want: 'WANT', running: 'RUNNING', short: 'SHORT', unknown: 'UNKNOWN'
    },
    loopMark: '↻',
    agent: 'agent',
    agents: 'agents',
    lens: { watching: 'Sees', doing: 'Does' },
    lanes: { A: 'Moving day', B: 'Saturday, 03:04' }
  };

  /* ---- reused pieces of snapshots (each step below still lists its full state) ---- */
  var ROWS = ['orders', 'payments', 'dispatch', 'storefront'];
  var WANT = { orders: 1, payments: 2, dispatch: 3, storefront: 3 };
  var CUSTOMERS_DOWN = { id: 'customers', label: 'Customers', text: 'can’t place orders', tone: 'bad' };
  var CUSTOMERS_UP = { id: 'customers', label: 'Customers', text: 'can order', tone: 'good' };

  /* end of moving day: the scheduler's default layout (emptiest node first, copies spread: Ch 05 facts
     c-06, c-07), one storefront Pod each on 01, 04 and 02 (Ch 05 run d-04; was Ch 03's Monday layout) */
  var A5_NODES = { '01': ['pa1', 'sf1'], '02': ['di1', 'di2', 'sf3'], '03': ['or1', 'di3'], '04': ['pa2', 'sf2'] };
  /* after ~03:09:50: node 03's Pods are marked for deletion; the records linger, uncounted */
  var DELETING = { orders: ['or1'], dispatch: ['di3'] };
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
            'The record is drawn at the top. It wants one `orders` Pod, two `payments` Pods and three `dispatch` Pods, and that’s exactly what runs on the nodes below it, so the loops keep comparing and find no gap to close.',
            'Then Ari applies the `storefront` manifest from Fig. 02, and Kubernetes answers `created` in under a second.'
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
            'Ari’s command sent the manifest to the API server, which checked it and added a new line to the record: `storefront`, three Pods wanted. That’s all `created` means. Fennel’s intention has been recorded, but nothing new is running anywhere yet.'
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
            loops: { shown: ['rs', 'sched'], active: ['rs'], agents: [], lens: { watching: 'storefront: 0 of 3 Pods', doing: 'writes 3 new Pod records' } },
            notes: []
          },
          text: [
            'Within seconds, the ReplicaSet loop notices the new `storefront` line in the record, which wants three Pods and has none. It writes three Pod records and stops there, because picking nodes and starting containers is other loops’ work.'
          ],
          ariaLabel: 'The ReplicaSet loop is acting. Watching storefront, which wants 3 Pods and has 0, it writes 3 new Pod records. The storefront line now holds three Pod records, none on a node and none running. The nodes are unchanged.',
          highlight: ['loop:rs', 'lens', 'row:storefront']
        },
        {
          id: 'A4',
          gate: ['k-03'],
          state: {
            nodes: { '01': ['pa1', 'sf1:notstarted'], '02': ['di1', 'di2', 'sf3:notstarted'], '03': ['or1', 'di3'], '04': ['pa2', 'sf2:notstarted'] },
            down: [], nodeStatus: {},
            record: { rows: ROWS, want: WANT, pods: A5_PODS },
            loops: { shown: ['rs', 'sched'], active: ['sched'], agents: [], lens: { watching: 'Pods with no node', doing: 'writes a node into each record' } },
            notes: []
          },
          text: [
            'Next, the scheduler sees three Pods with no node and writes a node with room into each Pod’s record; how it chooses is the subject of Chapter 5. The scheduler doesn’t start anything either, so for now each `storefront` Pod exists only as a record.'
          ],
          ariaLabel: 'The scheduler is acting. Watching for Pods with no node, it writes a node into each: 01, 04 and 02. One storefront Pod now sits on each of nodes 01, 04 and 02, not started: they exist only as records. The record still shows 0 storefront Pods running.',
          highlight: ['loop:sched', 'lens', 'p:sf1', 'p:sf2', 'p:sf3']
        },
        {
          id: 'A5',
          gate: ['k-03'],
          state: {
            nodes: A5_NODES,
            down: [], nodeStatus: {},
            record: { rows: ROWS, want: WANT, pods: A5_PODS },
            loops: { shown: ['rs', 'sched'], active: [], agents: ['01', '02', '04'], lens: { watching: 'assigned Pods not running', doing: 'downloads the image, starts it' } },
            notes: []
          },
          text: [
            'On nodes 01, 02 and 04, each node’s agent sees the Pods assigned to its node. It downloads the `storefront` image, starts the containers and reports back, and now the record matches what’s running.',
            'No part handed another a plan; each loop simply read the record and wrote to it. And the loops keep watching, whether or not there’s a release.'
          ],
          ariaLabel: 'The node agents on nodes 01, 02 and 04 are acting. Each watching the Pods assigned to its own node, they download the storefront image, start the containers and report back. All three storefront Pods are running, and the record reads storefront, 3 wanted, 3 running; every line matches what runs. Node 01: a payments Pod and a storefront Pod, 3 units free. Node 02: two dispatch Pods and a storefront Pod, 2 free. Node 03: orders and a dispatch Pod, 2 free. Node 04: a payments Pod and a storefront Pod, 3 free.',
          highlight: ['agent:01', 'agent:02', 'agent:04', 'lens', 'p:sf1', 'p:sf2', 'p:sf3', 'row:storefront']
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
            nodes: { '01': ['pa1', 'sf1'], '02': ['di1', 'di2', 'sf3'], '03': ['or1:lost', 'di3:lost'], '04': ['pa2', 'sf2'] },
            down: ['03'], nodeStatus: {},
            record: { rows: ROWS, want: WANT, pods: A5_PODS },
            loops: { shown: ['rs', 'sched'], active: [], agents: [] },
            notes: [CUSTOMERS_DOWN],
            clock: '03:04'
          },
          text: [
            'Machine 03, which Kubernetes knows as node 03, stops. The `orders` Pod and a `dispatch` Pod stop with it, and customers can’t place orders. The record still lists both Pods as running, because nothing has told it otherwise.'
          ],
          ariaLabel: '03:04. Node 03 is down: its orders Pod and a dispatch Pod are lost, and customers can’t place orders. The cluster’s record hasn’t changed: it still lists orders, 1 running, and dispatch, 3 running, counting the two Pods on node 03. No loop is acting.',
          highlight: ['n:03', 'note:customers']
        },
        {
          id: 'B2',
          kicker: '~03:04:50',
          gate: ['k-04'],
          state: {
            nodes: { '01': ['pa1', 'sf1'], '02': ['di1', 'di2', 'sf3'], '03': ['or1:lost', 'di3:lost'], '04': ['pa2', 'sf2'] },
            down: ['03'], nodeStatus: { '03': 'unknown' },
            record: { rows: ROWS, want: WANT, pods: A5_PODS },
            loops: { shown: ['rs', 'sched', 'node'], active: ['node'], agents: [], lens: { watching: 'node 03: no report for 50 s', doing: 'marks node 03 UNKNOWN' } },
            notes: [CUSTOMERS_DOWN],
            clock: '~03:04:50'
          },
          text: [
            'Every node’s agent reports to the API server regularly, which is how the record knows each node is alive. Node 03’s reports have stopped. By default, after 50 seconds of silence, the node loop marks node 03 as unknown.',
            'It doesn’t touch node 03’s Pods yet, because a network glitch looks just like a dead machine, and the machine may come back.'
          ],
          ariaLabel: 'About 03:04:50. The node loop is acting. Watching every node’s check-ins, it marks node 03 unknown. In the record, the orders Pod and one dispatch Pod, both on node 03, now read unknown. Customers still can’t place orders.',
          highlight: ['loop:node', 'lens', 'status:03', 'row:orders', 'row:dispatch']
        },
        {
          id: 'B3',
          kicker: '~03:09:50',
          gate: ['k-04'],
          state: {
            nodes: { '01': ['pa1', 'sf1'], '02': ['di1', 'di2', 'sf3'], '03': ['or1:lost', 'di3:lost'], '04': ['pa2', 'sf2'] },
            down: ['03'], nodeStatus: { '03': 'unknown' },
            record: { rows: ROWS, want: WANT, pods: { orders: [], payments: ['pa1', 'pa2'], dispatch: ['di1', 'di2'], storefront: ['sf1', 'sf2', 'sf3'] }, deleting: DELETING },
            loops: { shown: ['rs', 'sched', 'node'], active: ['node'], agents: [], lens: { watching: 'node 03: 5 minutes unknown', doing: 'marks its Pods for deletion' } },
            notes: [CUSTOMERS_DOWN],
            clock: '~03:09:50'
          },
          text: [
            'By default, the node loop then waits five more minutes. Node 03 still hasn’t come back, so the node loop marks its Pods for deletion.',
            'The ReplicaSet loop stops counting Pods marked this way, so the record now shows the gap that customers have been feeling since 03:04.'
          ],
          ariaLabel: 'About 03:09:50. Node 03 has been unknown for 5 minutes, so the node loop marks its two Pods for deletion. In the record they are struck through and no longer counted, so it reads orders, 1 wanted, short 1, and dispatch, 3 wanted, short 1. Node 03 is still down. Customers still can’t place orders.',
          highlight: ['loop:node', 'lens', 'row:orders', 'row:dispatch']
        },
        {
          id: 'B4',
          kicker: 'Seconds later',
          gate: ['k-04'],
          state: {
            nodes: { '01': ['pa1', 'sf1'], '02': ['di1', 'di2', 'sf3'], '03': ['or1:lost', 'di3:lost'], '04': ['pa2', 'sf2'] },
            down: ['03'], nodeStatus: { '03': 'unknown' },
            record: { rows: ROWS, want: WANT, pods: { orders: ['or2'], payments: ['pa1', 'pa2'], dispatch: ['di1', 'di2', 'di4'], storefront: ['sf1', 'sf2', 'sf3'] }, deleting: DELETING },
            loops: { shown: ['rs', 'sched', 'node'], active: ['rs'], agents: [], lens: { watching: 'orders, dispatch: 1 short each', doing: 'writes 2 new Pod records' } },
            notes: [CUSTOMERS_DOWN],
            clock: 'Seconds later'
          },
          text: [
            'The ReplicaSet loop makes the same comparison it made on moving day, and this time finds two gaps: one `orders` Pod and one `dispatch` Pod. It writes a new Pod record for each, without knowing, or needing to know, why the old ones went.'
          ],
          ariaLabel: 'Seconds later. The ReplicaSet loop is acting. Comparing Pods wanted with Pods recorded, it finds orders short 1 and dispatch short 1, and writes 2 new Pod records, one for each. Neither new Pod has a node yet: orders reads 0 running, dispatch 2 running. Customers still can’t place orders.',
          highlight: ['loop:rs', 'lens', 'row:orders', 'row:dispatch']
        },
        {
          id: 'B5',
          gate: ['k-04'],
          state: {
            nodes: { '01': ['pa1', 'sf1', 'di4:notstarted'], '02': ['di1', 'di2', 'sf3'], '03': ['or1:lost', 'di3:lost'], '04': ['pa2', 'sf2', 'or2:notstarted'] },
            down: ['03'], nodeStatus: { '03': 'unknown' },
            record: { rows: ROWS, want: WANT, pods: { orders: ['or2'], payments: ['pa1', 'pa2'], dispatch: ['di1', 'di2', 'di4'], storefront: ['sf1', 'sf2', 'sf3'] }, deleting: DELETING },
            loops: { shown: ['rs', 'sched', 'node'], active: ['sched'], agents: [], lens: { watching: '2 Pods with no node', doing: 'orders → 04, dispatch → 01' } },
            notes: [CUSTOMERS_DOWN],
            clock: 'Seconds later'
          },
          text: [
            'The scheduler sees two Pods with no node. Nodes 01 and 04 both have enough room for `orders`, and the scheduler picks node 04; the new `dispatch` Pod goes to node 01. A year ago Sam put `orders` on machine 04 by hand; this time a loop made the choice.'
          ],
          ariaLabel: 'The scheduler is acting. Watching 2 Pods with no node, it writes node 04 into the new orders Pod, one of two nodes with room for it, and node 01 into the new dispatch Pod. Both Pods sit on their nodes, not started. Node 04 now has no room free and node 01 has 2 units. Customers still can’t place orders.',
          highlight: ['loop:sched', 'lens', 'p:or2', 'p:di4', 'free:04', 'free:01']
        },
        {
          id: 'B6',
          kicker: '~03:10–03:11',
          gate: ['k-04'],
          state: {
            nodes: { '01': ['pa1', 'sf1', 'di4'], '02': ['di1', 'di2', 'sf3'], '03': ['or1:lost', 'di3:lost'], '04': ['pa2', 'sf2', 'or2'] },
            down: ['03'], nodeStatus: { '03': 'unknown' },
            record: { rows: ROWS, want: WANT, pods: { orders: ['or2'], payments: ['pa1', 'pa2'], dispatch: ['di1', 'di2', 'di4'], storefront: ['sf1', 'sf2', 'sf3'] }, deleting: DELETING },
            loops: { shown: ['rs', 'sched', 'node'], active: [], agents: ['04', '01'], lens: { watching: 'assigned Pods not running', doing: 'gets the image, starts it' } },
            notes: [CUSTOMERS_UP, { id: 'link', text: 'storefront → orders: node 04', sub: 'kept current by another loop (Ch 7)' }],
            clock: '~03:10–03:11'
          },
          text: [
            'If node 04 doesn’t already have the `orders` image, its agent downloads it first, then starts the container. With default settings, customers can order again roughly six or seven minutes after 03:04, and nobody was woken.',
            'Another loop, which Chapter 7 covers, keeps `storefront` pointed at the new `orders` Pod, so the connecting job is done too.'
          ],
          ariaLabel: 'About 03:10 to 03:11. The node agents on nodes 04 and 01 are acting: node 04’s agent downloads the orders image if it doesn’t have it, and both start their new Pods. The record reads orders, 1 running, and dispatch, 3 running. Customers can order again. storefront sends orders to node 04, kept current by another loop, covered in Chapter 7.',
          highlight: ['agent:04', 'agent:01', 'lens', 'p:or2', 'p:di4', 'row:orders', 'row:dispatch', 'note:customers', 'note:link']
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
