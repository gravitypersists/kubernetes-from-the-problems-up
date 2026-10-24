/* w-rollout-scrolly · data. Ch 06, §03 "Thursday, 10:15: a routine release" (lane R, steps R1–R5), plus the two
   snapshots of Fig. 03 in §06 (FIGURES.crash, FIGURES.shipped), which the page draws (assets/page.js).
   Classic script; defines window.ClusterData (the pool's default name). Every reader-visible string of
   the lane (canvas and step text) and of Fig. 03's drawings lives in this file.

   The drawing and the lane controller are the course pool's: pool/cluster/cluster.js and
   pool/cluster/lanes.js. The snapshot format, the step fields and the highlight keys are documented in
   explainers/_pool/README.md ("Cluster drawing", "Cluster lanes"). Each step's `state` is a COMPLETE
   snapshot, not a diff, so any step can be drawn on its own and scrolling back restores it exactly.

   Fiction vs. sourced. `catalog`, its requests, Pods, nodes, versions, times and the Thursday are Fennel
   story facts (plan R2, d-05); timings are illustrative. Mechanism (facts.md): a new image in the
   Deployment's Pod description makes a new ReplicaSet, which the Deployment loop makes bigger while it
   makes the old one smaller (c-01); with 3 copies and the default settings at most 4 Pods exist and at
   least 3 are ready, i.e. one extra and none short (c-02, c-03); an old Pod goes only once a new one is
   ready (c-03), "ready" being the readiness check passing (c-06); the emptied ReplicaSet is kept with
   0 Pods (c-09). Pods that never become ready stall the rollout with the old Pods serving (c-04): Fig. 03.
   Placement follows Ch 05's defaults (room, then spreading copies of a service); a scaled-down
   ReplicaSet's Pod is marked for deletion (struck record mark, Ch 04's grammar) and stopped by its
   node's agent (STOPPED, Ch 03's word), and is gone in the next step.

   Pool fields this lane uses: Ch 05's units (CAPACITY { memory: 13, cpu: 3.9 } per node, UNIT 'GB',
   ROOM_UNIT 2, so a 2 GB Pod is one drawn unit) and pool-03's: record.deployment (a Deployment row over
   its ReplicaSet rows, an emptied row reading KEPT), status `notready` (a running Pod that hasn't passed
   its readiness check: solid chip, hollow lamp), PODS[id].series (v62 and v64: 5; v63: 2) and
   STATUS_INLINE (a one-line chip puts its status word beside its label, so READY and NOT READY show on
   every chip).

   Numbers (requests per copy, memory · processor): catalog 2 GB · 0.25 cores, dispatch 2 GB · 1 core.
     10:15   05: dispatch, catalog v62 (c1)          4 GB (9 free)  CPU 1.25
             06: catalog v62 (c2), v62 (c3)          4 GB (9 free)  CPU 0.5
     R2      n1 (v63) → 05 (fewer catalog copies)    05: 6 GB (7 free)
     R3      n1 ready; c2 (06) stopped
     R4      n2 → 06 (more room, fewer copies); n2 ready; c1 (05) stopped
     R5      n3 → 05; n3 ready; c3 stopped and gone  05: dispatch, n1, n3 (7 free) · 06: n2 (11 free)
   The rest of the cluster (nodes 01, 02, 04: 12 of 13 GB reserved each since Ch 05) is not drawn; a
   note line says so. Fig. 03 starts from R5's end state: v64's first Pod would go to 06 (more room). */
(function () {
  'use strict';

  var NODES = ['05', '06'];
  var CAPACITY = { memory: 13, cpu: 3.9 };  /* room for Pods per node (Ch 05) */
  var UNIT = 'GB';
  var ROOM_UNIT = 2;                        /* one drawn unit of room = 2 GB */

  var SERVICES = {
    catalog:  { size: 2, cpu: 0.25, label: 'catalog',  breaks: ['catalog'] },
    dispatch: { size: 2, cpu: 1,    label: 'dispatch', breaks: ['dispatch'] }
  };

  var LOOPS = {
    deploy: { label: 'Deployment loop' },
    rs:     { label: 'ReplicaSet loop' },
    sched:  { label: 'scheduler' }
  };

  /* version = printed on the chip; series = the chip's colour (5: v62 and v64, 2: v63). The dispatch
     Pod keeps the course's default colour (c1). */
  var PODS = {
    di7: { service: 'dispatch' },                                   /* Ch 05's Friday Pod, on 05 */
    c1: { service: 'catalog', version: 'v62', series: 5 },
    c2: { service: 'catalog', version: 'v62', series: 5 },
    c3: { service: 'catalog', version: 'v62', series: 5 },
    n1: { service: 'catalog', version: 'v63', series: 2 },
    n2: { service: 'catalog', version: 'v63', series: 2 },
    n3: { service: 'catalog', version: 'v63', series: 2 },
    /* Fig. 03: the bad v64 */
    x1: { service: 'catalog', version: 'v64', series: 5 },          /* crashes on start */
    b1: { service: 'catalog', version: 'v64', series: 5 },          /* as shipped: ready, prices $0 */
    b2: { service: 'catalog', version: 'v64', series: 5 },
    b3: { service: 'catalog', version: 'v64', series: 5 }
  };

  var STRINGS = {
    widget: 'W-01 · The cluster',
    widgetShort: 'W-01',
    step: 'Step',
    node: 'Node',
    free: 'free',
    down: 'DOWN',
    /* From this chapter a running Pod's word is READY: with a readiness check, running and passing it;
       NOT READY is running but not passing yet */
    status: {
      running: 'READY', notready: 'NOT READY', notstarted: 'NOT STARTED', starting: 'STARTING',
      lost: 'LOST', crashed: 'CRASHED', stopped: 'STOPPED'
    },
    statusBreaks: { notstarted: ['NOT', 'STARTED'], notready: ['NOT', 'READY'] },
    nodeStatus: { unknown: 'UNKNOWN' },
    record: {
      title: 'The cluster’s record · catalog only',
      titleShort: 'The record · catalog',
      want: 'WANT', running: 'READY', short: 'SHORT', unknown: 'UNKNOWN',
      deployment: 'Deployment', replicaSet: 'ReplicaSet', kept: 'KEPT'
    },
    loopMark: '↻',
    agent: 'agent',
    agents: 'agents',
    lens: { watching: 'Sees', doing: 'Does' },
    cpu: 'CPU',
    lanes: { R: 'Thursday · catalog' }   /* no version: the header bar is uppercased, and a version reads "v63" */
  };

  /* ---- reused pieces of snapshots (each step below still lists its full state) ---- */
  var SHOWN = ['deploy', 'rs', 'sched'];
  var DEP63 = { name: 'catalog', want: 3, version: 'v63', rows: ['v62', 'v63'] };
  var DEP64 = { name: 'catalog', want: 3, version: 'v64', rows: ['v63', 'v64'] };
  var HIDDEN = { id: 'hidden', label: 'Not drawn', text: 'nodes 01, 02, 04 · 1 GB free each', tone: 'mute' };
  function customers(text, tone) { return { id: 'customers', label: 'Customers', text: text, tone: tone || 'good' }; }

  var CLUSTER_LANES = {
    R: {
      name: STRINGS.lanes.R,
      steps: [
        {
          id: 'R1',
          kicker: '10:15:00',
          state: {
            nodes: { '05': ['di7', 'c1'], '06': ['c2', 'c3'] },
            record: { deployment: DEP63, rows: ['v62', 'v63'], want: { v62: 3, v63: 1 }, pods: { v62: ['c1', 'c2', 'c3'], v63: [] } },
            loops: { shown: SHOWN, active: ['deploy'], agents: [], lens: { watching: 'record wants v63; 3 Pods run v62', doing: 'makes a v63 ReplicaSet, wanting 1' } },
            notes: [customers('served by v62 ×3'), HIDDEN],
            clock: '10:15:00'
          },
          text: [
            'At 10:15 Fennel’s build pipeline writes `catalog:v63` into the image line of the Deployment’s record. Nothing else in the record changes, but that one line is enough: the Deployment loop now sees that the version its record wants is not the version its three Pods are running.',
            'So the loop makes a new ReplicaSet for v63 and asks it to keep one copy, on top of the three that v62’s ReplicaSet keeps. Nothing new is running yet. The v63 ReplicaSet is one Pod short, and customers are still served by v62.'
          ],
          ariaLabel: '10:15. The Deployment row in the record now wants 3 catalog Pods at version v63. The v62 ReplicaSet wants 3 and has 3 ready. The Deployment loop is acting: seeing that the record wants v63 while 3 Pods run v62, it makes a new v63 ReplicaSet, which wants 1 and is 1 short. Node 05 runs the dispatch Pod and one catalog v62 Pod, with 9 GB free; node 06 runs two catalog v62 Pods, with 9 GB free. All are ready. Customers are served by the three v62 Pods. Nodes 01, 02 and 04 are not drawn; each has 1 GB free.',
          highlight: ['dep:catalog:version', 'row:v63', 'loop:deploy', 'lens']
        },
        {
          id: 'R2',
          kicker: 'Seconds later',
          state: {
            nodes: { '05': ['di7', 'c1', 'n1:notready'], '06': ['c2', 'c3'] },
            record: { deployment: DEP63, rows: ['v62', 'v63'], want: { v62: 3, v63: 1 }, pods: { v62: ['c1', 'c2', 'c3'], v63: ['n1'] } },
            loops: { shown: SHOWN, active: ['rs', 'sched'], agents: ['05'], lens: { watching: 'v63 ReplicaSet: 1 Pod short', doing: 'writes a Pod record; scheduler picks 05' } },
            notes: [customers('served by v62 ×3'), HIDDEN],
            clock: 'Seconds later'
          },
          text: [
            'The ReplicaSet loop sees that the v63 ReplicaSet is one Pod short and writes a record for a new Pod. The scheduler puts that Pod on node 05, where there is room for it, and node 05’s agent starts its container.',
            'For a moment `catalog` has four Pods, one more than the record wants, and that extra Pod is the spare room a rollout uses. The new Pod is running but isn’t ready, because it hasn’t passed its check yet, so customers are still sent only to the three v62 Pods.'
          ],
          ariaLabel: 'Seconds later. The ReplicaSet loop, seeing the v63 ReplicaSet 1 Pod short, has written a Pod record, and the scheduler placed it on node 05, whose agent started it. The catalog v63 Pod runs on node 05 but is not ready, so the v63 ReplicaSet has 1 Pod and 0 ready. Node 05 runs the dispatch Pod, a catalog v62 Pod and the new catalog v63 Pod, with 7 GB free; node 06 still runs two catalog v62 Pods. Catalog has four Pods where the record wants three. The v62 ReplicaSet still wants 3 and has 3 ready. Customers are served by the three v62 Pods.',
          highlight: ['p:n1', 'row:v63', 'lens']
        },
        {
          id: 'R3',
          kicker: '~10:15:20',
          state: {
            nodes: { '05': ['di7', 'c1', 'n1'], '06': ['c2:stopped', 'c3'] },
            record: { deployment: DEP63, rows: ['v62', 'v63'], want: { v62: 2, v63: 1 }, pods: { v62: ['c1', 'c3'], v63: ['n1'] }, deleting: { v62: ['c2'] } },
            loops: { shown: SHOWN, active: ['deploy', 'rs'], agents: ['06'], lens: { watching: '1 v63 Pod ready', doing: 'v62 down to 2' } },
            notes: [customers('served by v62 ×2 · v63 ×1'), HIDDEN],
            clock: '~10:15:20'
          },
          text: [
            'A few seconds later the v63 Pod passes its check, and from then on it is sent customers’ requests along with the v62 Pods. Only now, with a new Pod ready, does the Deployment loop make v62’s ReplicaSet smaller, from three copies to two. The ReplicaSet loop marks one v62 Pod for deletion, and node 06’s agent stops it.',
            'Three `catalog` Pods were ready at every moment, and customers never noticed the swap.'
          ],
          ariaLabel: 'About 10:15:20. The catalog v63 Pod on node 05 is ready and serving. The Deployment loop has lowered the v62 ReplicaSet to 2: it has 2 ready Pods, and the ReplicaSet loop has marked one for deletion, a v62 Pod on node 06 that node 06’s agent has now stopped. The v63 ReplicaSet wants 1 and has 1 ready. Three catalog Pods are ready: two v62 and one v63. Customers are served by v62 twice and v63 once.',
          highlight: ['p:n1', 'p:c2', 'row:v62', 'note:customers', 'lens']
        },
        {
          id: 'R4',
          kicker: '~10:15:40',
          state: {
            nodes: { '05': ['di7', 'c1:stopped', 'n1'], '06': ['c3', 'n2'] },
            record: { deployment: DEP63, rows: ['v62', 'v63'], want: { v62: 1, v63: 2 }, pods: { v62: ['c3'], v63: ['n1', 'n2'] }, deleting: { v62: ['c1'] } },
            loops: { shown: SHOWN, active: ['deploy'], agents: [], lens: { watching: '2 v63 Pods ready', doing: 'v63 up to 2, then v62 down to 1' } },
            notes: [customers('served by v62 ×1 · v63 ×2'), HIDDEN],
            clock: '~10:15:40'
          },
          text: [
            'Then the Deployment loop repeats the same round. It raises the v63 ReplicaSet to two copies, and the scheduler puts the new Pod on node 06, which now has more room. Once that Pod passes its check, the loop lowers v62’s ReplicaSet to one, and a second v62 Pod is stopped, this time on node 05.'
          ],
          ariaLabel: 'About 10:15:40. A second catalog v63 Pod runs on node 06 and is ready, so the v63 ReplicaSet wants 2 and has 2 ready. The v62 ReplicaSet is down to 1: its Pod on node 05 is stopped and marked for deletion, and one v62 Pod on node 06 is still ready. Node 05 runs the dispatch Pod, the stopped v62 Pod and a v63 Pod; node 06 runs a v62 Pod and a v63 Pod. Three catalog Pods are ready. Customers are served by v62 once and v63 twice.',
          highlight: ['p:n2', 'p:c1', 'row:v62', 'row:v63', 'note:customers', 'lens']
        },
        {
          id: 'R5',
          kicker: '~10:16',
          state: {
            nodes: { '05': ['di7', 'n1', 'n3'], '06': ['n2'] },
            record: { deployment: DEP63, rows: ['v62', 'v63'], want: { v62: 0, v63: 3 }, pods: { v62: [], v63: ['n1', 'n2', 'n3'] } },
            loops: { shown: SHOWN, active: ['deploy'], agents: [], lens: { watching: '3 v63 Pods ready, as wanted', doing: 'nothing more; keeps the v62 ReplicaSet, empty' } },
            notes: [customers('served by v63 ×3'), HIDDEN],
            clock: '~10:16'
          },
          text: [
            'A third round brings up a third v63 Pod on node 05 and stops the last v62 Pod, and now every `catalog` Pod runs v63. The whole change took about a minute, and nobody had to watch it or ask anyone else to wait before shipping.',
            'The v62 ReplicaSet isn’t deleted. The Deployment keeps it in the record, set to zero copies.'
          ],
          ariaLabel: 'About 10:16. Every catalog Pod runs v63: two on node 05, beside the dispatch Pod, with 7 GB free, and one on node 06, with 11 GB free. All are ready. The v63 ReplicaSet wants 3 and has 3 ready. The v62 ReplicaSet wants 0 and is kept in the record, with no Pods. The Deployment loop sees three ready v63 Pods, as wanted, and does nothing more. Customers are served by the three v63 Pods.',
          highlight: ['p:n3', 'row:v62', 'row:v63', 'note:customers', 'lens']
        }
      ]
    }
  };

  /* Fig. 03 (§06, revealed after k-04): two snapshots at 14:03, with the page's figure contract
     ({ state, highlight, ariaLabel }; no header bar, so no clock or step counter). Same nodes,
     services, version colours and strings as lane R; only v64's behaviour differs. Left: v64 crashes on
     start (c-04, Ch 04 claim 14): its one Pod never becomes ready, so no v63 Pod is removed. Right: v64
     as shipped passes its check (c-08) and replaces every v63 Pod; the v63 ReplicaSet is kept (c-09). */
  var FIGURES = {
    crash: {
      state: {
        nodes: { '05': ['di7', 'n1', 'n3'], '06': ['n2', 'x1:crashed'] },
        restarts: { x1: 3 },
        record: { deployment: DEP64, rows: ['v63', 'v64'], want: { v63: 3, v64: 1 }, pods: { v63: ['n1', 'n2', 'n3'], v64: ['x1'] } },
        loops: { shown: SHOWN, active: ['deploy'], agents: [], lens: { watching: 'v64 Pod not ready', doing: 'waits; removes no v63 Pod' } },
        notes: [customers('served by v63 ×3 · prices correct', 'good')]
      },
      highlight: ['p:x1', 'note:customers'],
      ariaLabel: 'If v64 had crashed on start, at 14:03. The record’s Deployment row wants 3 catalog Pods at v64. The v63 ReplicaSet still wants 3 and has 3 ready. The v64 ReplicaSet wants 1 and has 0 ready. Node 05 runs the dispatch Pod and two catalog v63 Pods; node 06 runs one catalog v63 Pod and the catalog v64 Pod, crashed and restarted 3 times. The Deployment loop sees a v64 Pod that is not ready, so it waits and removes no v63 Pod. Customers are served by the three v63 Pods, and prices are correct.'
    },
    shipped: {
      state: {
        nodes: { '05': ['di7', 'b2', 'b3'], '06': ['b1'] },
        record: { deployment: DEP64, rows: ['v63', 'v64'], want: { v63: 0, v64: 3 }, pods: { v63: [], v64: ['b1', 'b2', 'b3'] } },
        loops: { shown: SHOWN, active: ['deploy'], agents: [], lens: { watching: '3 v64 Pods ready, as wanted', doing: 'nothing more' } },
        notes: [customers('served by v64 ×3 · every price $0.00', 'bad')]
      },
      highlight: ['p:b1', 'p:b2', 'p:b3', 'note:customers'],
      ariaLabel: 'v64 as it was shipped, at 14:03. The record’s Deployment row wants 3 catalog Pods at v64. The v63 ReplicaSet wants 0 and is kept, with no Pods. The v64 ReplicaSet wants 3 and has 3 ready. Node 05 runs the dispatch Pod and two catalog v64 Pods; node 06 runs one catalog v64 Pod; all are ready. The Deployment loop sees three ready v64 Pods, as wanted, and does nothing more. Customers are served by the three v64 Pods, and every price shows $0.00.'
    }
  };

  window.ClusterData = {
    NODES: NODES,
    CAPACITY: CAPACITY,
    UNIT: UNIT,
    ROOM_UNIT: ROOM_UNIT,
    STATUS_INLINE: true,
    SERVICES: SERVICES,
    LOOPS: LOOPS,
    PODS: PODS,
    STRINGS: STRINGS,
    CLUSTER_LANES: CLUSTER_LANES,
    FIGURES: FIGURES
  };
})();
