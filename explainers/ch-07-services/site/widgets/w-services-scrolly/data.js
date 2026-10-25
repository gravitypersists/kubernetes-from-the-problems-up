/* w-services-scrolly · data. Ch 07, §04 "Thursday, 10:15, from storefront's side" (lane S, steps S1–S4),
   plus the two snapshots of Fig. 04 in §06 (FIGURES.restarting, FIGURES.ready), which the page draws.
   Classic script; defines window.ClusterData (the pool's default name). Every reader-visible string of
   the lane (canvas and step text) and of Fig. 04's drawings lives in this file.

   The drawing and the lane controller are the course pool's: pool/cluster/cluster.js and
   pool/cluster/lanes.js. The snapshot format, the step fields and the highlight keys are documented in
   explainers/_pool/README.md ("Cluster drawing", "Cluster lanes"). Each step's `state` is a COMPLETE
   snapshot, not a diff, so any step can be drawn on its own and scrolling back restores it exactly.

   FIGURES (Fig. 04, read by the page): FIGURES.restarting (left panel) and FIGURES.ready (right panel),
   each { head, state, highlight, ariaLabel }:
     head       the panel's mono head line (the page prints it above the drawing; uppercase it in CSS)
     state      a complete snapshot (node 04 only), drawn with no header bar: renderCluster(slot, state,
                { width, layout, reserve, highlight }), one laneLayout and one measureReserve over both
                states so the panels read alike and share one height (as Ch 06's f-03)
     highlight  the step highlight (the list row and the storefront → orders line only)
     ariaLabel  the panel's state in words, for the slot's aria-label

   Fiction vs. sourced. `catalog`, `orders`, their Pods, nodes, versions, times, addresses and the
   Thursday and Tuesday are Fennel story facts (plan R2, d-05, d-06); addresses are illustrative and the
   same as Figs. 01–03 (plan ## Widgets). Mechanism (facts.md): a Service has a stable address, the
   cluster IP (c-02); a loop, the endpoints loop (EndpointSlice controller), keeps each Service's list
   of the Pods its selector matches (c-03); only ready Pods that aren't shutting down are listed, by
   default, and a Pod told to stop leaves the list at the same time as it starts shutting down, so
   within a moment no new connection reaches it (c-04; review A-01); each
   new connection goes to one listed Pod at random, by default (c-05), so the calls line names every
   version on the list; with an empty list the caller's node refuses the call at once, in most
   clusters, by default (c-06, medium; Fig. 04 only). The Pods' own moves are Ch 06's lane R, unchanged
   (Ch 06 claims 03, 06); S4 joins lane R's R4 and R5 into one step. Fig. 04: an OOM-killed container is
   restarted in place by the node agent (Ch 05), so the Pod keeps its name and address (plan, research
   concern 6a), and is not ready while it restarts (6b).

   Pool fields this lane uses: Ch 05's units (CAPACITY { memory: 13, cpu: 3.9 }, UNIT 'GB', ROOM_UNIT 2),
   pool-03's status `notready`, PODS[id].series (v62: 5, v63: 2) and STATUS_INLINE, and pool-04's
   record.service (the Service block) and PODS[id].addr. The record holds no rows (rows: []) and no
   Deployment group, so the Service is the panel's only new element (plan ## Widgets).

   Numbers (requests per copy, memory · processor): catalog 2 GB · 0.25 cores, dispatch 2 GB · 1 core;
   Fig. 04: orders 6 GB · 1, payments 2 GB · 0.25, storefront 4 GB · 0.5 (node 04: 12 of 13 GB, Ch 05).
     S1  05: dispatch, c1 v62 · 06: c2 v62, c3 v62                list c1 c2 c3
     S2  + n1 v63 on 05, NOT READY                                 list c1 c2 c3
     S3  n1 READY; c2 STOPPED                                      list c1 c3 n1, c2 leaving
     S4  05: dispatch, n1, n3 · 06: c3 STOPPED, n2 (R4 + R5)       list n1 n2 n3, c3 leaving
   Loop pills: S2–S4 light both the Deployment loop (it starts and stops the Pods, as the step text says) and
   the endpoints loop; the lens line is the endpoints loop's throughout (review P-14).
   NODES is empty on purpose: every lane state names both of its nodes, and Fig. 04 draws node 04 alone
   (the pool merges NODES into every state). */
(function () {
  'use strict';

  var CAPACITY = { memory: 13, cpu: 3.9 };  /* room for Pods per node (Ch 05) */

  var SERVICES = {
    catalog:    { size: 2, cpu: 0.25, label: 'catalog',    breaks: ['catalog'] },
    dispatch:   { size: 2, cpu: 1,    label: 'dispatch',   breaks: ['dispatch'] },
    orders:     { size: 6, cpu: 1,    label: 'orders',     breaks: ['orders'] },
    payments:   { size: 2, cpu: 0.25, label: 'payments',   breaks: ['pay-', 'ments'] },
    storefront: { size: 4, cpu: 0.5,  label: 'storefront', breaks: ['store-', 'front'] }
  };

  var LOOPS = {
    deploy: { label: 'Deployment loop' },
    ep:     { label: 'endpoints loop' }
  };

  /* version = printed on the chip and in the list; series = the chip's and the list square's colour
     (5: v62, 2: v63, as in Ch 06); addr = the Pod's address, printed only in the Service's list */
  var PODS = {
    di7: { service: 'dispatch' },
    c1: { service: 'catalog', version: 'v62', series: 5, addr: '10.4.5.12' },   /* node 05 */
    c2: { service: 'catalog', version: 'v62', series: 5, addr: '10.4.6.8' },    /* node 06 */
    c3: { service: 'catalog', version: 'v62', series: 5, addr: '10.4.6.9' },    /* node 06 */
    n1: { service: 'catalog', version: 'v63', series: 2, addr: '10.4.5.14' },   /* node 05 */
    n2: { service: 'catalog', version: 'v63', series: 2, addr: '10.4.6.11' },   /* node 06 */
    n3: { service: 'catalog', version: 'v63', series: 2, addr: '10.4.5.15' },   /* node 05 */
    /* Fig. 04: node 04 on Ch 05's Tuesday */
    pa2: { service: 'payments' },
    sf2: { service: 'storefront' },
    or1: { service: 'orders', addr: '10.4.4.7' }                                 /* orders-q2rw */
  };

  var STRINGS = {
    widget: 'W-01 · The cluster',
    widgetShort: 'W-01',
    step: 'Step',
    node: 'Node',
    free: 'free',
    down: 'DOWN',
    status: {
      running: 'READY', notready: 'NOT READY', notstarted: 'NOT STARTED', starting: 'STARTING',
      lost: 'LOST', crashed: 'OOM-KILLED', stopped: 'STOPPED'
    },
    statusBreaks: { notstarted: ['NOT', 'STARTED'], notready: ['NOT', 'READY'], crashed: ['OOM-', 'KILLED'] },
    nodeStatus: { unknown: 'UNKNOWN' },
    record: {
      title: 'The cluster’s record · one Service',
      titleShort: 'The record',
      want: 'WANT', running: 'READY', short: 'SHORT', unknown: 'UNKNOWN',
      /* pool-04 */
      service: 'Service', list: 'Ready Pods', none: 'None'
    },
    loopMark: '↻',
    agent: 'agent',
    agents: 'agents',
    lens: { watching: 'Sees', doing: 'Does' },
    cpu: 'CPU',
    /* short, as Ch 06's: with the clock kicker and STEP n / 4 beside it, the plan's longer name
       ("Thursday, 10:15 · catalog, from storefront's side") left the header bar a bare "W-01" */
    lanes: { S: 'Thursday · catalog' }
  };

  /* ---- reused pieces of snapshots (each step below still lists its full state) ---- */
  var SHOWN = ['deploy', 'ep'];
  function catalog(list, leaving) {
    var s = { name: 'catalog', addr: '10.96.0.21', list: list };
    if (leaving) s.leaving = leaving;
    return s;
  }
  function calls(text, tone) { return { id: 'calls', label: 'storefront → catalog', text: text, tone: tone || 'good' }; }
  var HIDDEN = { id: 'hidden', label: 'Not drawn', text: 'nodes 01, 02, 04', tone: 'mute' };

  var CLUSTER_LANES = {
    S: {
      name: STRINGS.lanes.S,
      steps: [
        {
          id: 'S1',
          kicker: '10:15:00',
          state: {
            nodes: { '05': ['di7', 'c1'], '06': ['c2', 'c3'] },
            record: { rows: [], want: {}, pods: {}, service: catalog(['c1', 'c2', 'c3']) },
            loops: { shown: SHOWN, active: ['ep'], agents: [], lens: { watching: '3 Pods match, all ready', doing: 'lists all 3' } },
            notes: [calls('answered by 3\u00a0v62\u00a0Pods'), HIDDEN],
            clock: '10:15:00'
          },
          text: [
            'Before the release begins, the `catalog` Service’s list holds the addresses of its three v62 Pods, one on node 05 and two on node 06.',
            '`storefront`’s settings name only `catalog`. The cluster’s DNS answers that name with `10.96.0.21`, the address at the top of the block, and that is the only address `storefront` ever uses for `catalog`. Right now every call it makes there is answered by one of the three v62 Pods.'
          ],
          ariaLabel: '10:15. The record shows the catalog Service, with the address 10.96.0.21. Its list of ready Pods holds three entries: v62 at 10.4.5.12, v62 at 10.4.6.8 and v62 at 10.4.6.9. The endpoints loop is acting: it sees 3 Pods that match, all ready, and lists all 3. Node 05 runs the dispatch Pod and one catalog v62 Pod; node 06 runs two catalog v62 Pods. All are ready. Storefront’s calls to catalog are answered by the three v62 Pods. Nodes 01, 02 and 04 are not drawn.',
          highlight: ['svc:catalog', 'svc:catalog:list']
        },
        {
          id: 'S2',
          kicker: 'Seconds later',
          state: {
            nodes: { '05': ['di7', 'c1', 'n1:notready'], '06': ['c2', 'c3'] },
            record: { rows: [], want: {}, pods: {}, service: catalog(['c1', 'c2', 'c3']) },
            loops: { shown: SHOWN, active: ['deploy', 'ep'], agents: [], lens: { watching: 'a 4th matching Pod, not ready', doing: 'leaves it off the list' } },
            notes: [calls('answered by 3\u00a0v62\u00a0Pods'), HIDDEN],
            clock: 'Seconds later'
          },
          text: [
            'As in Chapter 6, the Deployment loop starts a v63 Pod, and it lands on node 05. The new Pod carries the label `app: catalog`, so the Service’s selector matches it, but its container has only just started and it hasn’t passed its readiness check yet.',
            'So the endpoints loop leaves it off the list, and none of `storefront`’s calls reach it. The list still holds the same three v62 addresses.'
          ],
          ariaLabel: 'Seconds later. A catalog v63 Pod runs on node 05 but is not ready. The catalog Service, 10.96.0.21, still lists three ready Pods: v62 at 10.4.5.12, v62 at 10.4.6.8 and v62 at 10.4.6.9. The Deployment loop and the endpoints loop are acting: the endpoints loop sees a fourth Pod that matches but is not ready, and leaves it off the list. Node 05 runs the dispatch Pod, a catalog v62 Pod and the new v63 Pod; node 06 runs two catalog v62 Pods. Storefront’s calls to catalog are answered by the three v62 Pods.',
          highlight: ['p:n1', 'lens']
        },
        {
          id: 'S3',
          kicker: '~10:15:20',
          gate: ['k-03'],
          state: {
            nodes: { '05': ['di7', 'c1', 'n1'], '06': ['c2:stopped', 'c3'] },
            record: { rows: [], want: {}, pods: {}, service: catalog(['c1', 'c3', 'n1'], ['c2']) },
            loops: { shown: SHOWN, active: ['deploy', 'ep'], agents: [], lens: { watching: 'v63 Pod ready; a v62 Pod stopping', doing: 'adds one, removes one' } },
            notes: [calls('answered by 2\u00a0v62\u00a0Pods · 1\u00a0v63\u00a0Pod'), HIDDEN],
            clock: '~10:15:20'
          },
          text: [
            'The v63 Pod passes its check, and within seconds, usually, the endpoints loop has put its address on the list. Seeing the same Pod ready, the Deployment loop tells a v62 Pod on node 06 to stop.',
            'That Pod’s address comes off the list as soon as it is told to stop, while its container is still shutting down, so within a moment new calls stop going to a Pod on its way out. For now, `storefront`’s calls are answered by both versions.'
          ],
          ariaLabel: 'About 10:15:20. The catalog v63 Pod on node 05 is ready, and a catalog v62 Pod on node 06 is stopped. The catalog Service, 10.96.0.21, now lists three ready Pods: v62 at 10.4.5.12, v62 at 10.4.6.9 and v63 at 10.4.5.14. The stopped Pod’s entry, v62 at 10.4.6.8, is struck through: it has just left the list. The Deployment loop and the endpoints loop are acting: the endpoints loop sees the v63 Pod ready and a v62 Pod stopping, and adds one entry and removes one. Storefront’s calls to catalog are answered by the two v62 Pods and the v63 Pod, each new connection going to one of them at random.',
          highlight: ['p:n1', 'p:c2', 'svc:catalog:n1', 'svc:catalog:c2', 'note:calls']
        },
        {
          id: 'S4',
          kicker: '~10:16',
          gate: ['k-03'],
          state: {
            nodes: { '05': ['di7', 'n1', 'n3'], '06': ['c3:stopped', 'n2'] },
            record: { rows: [], want: {}, pods: {}, service: catalog(['n1', 'n2', 'n3'], ['c3']) },
            loops: { shown: SHOWN, active: ['deploy', 'ep'], agents: [], lens: { watching: '3 Pods match, all ready', doing: 'lists all 3' } },
            notes: [calls('answered by 3\u00a0v63\u00a0Pods'), HIDDEN],
            clock: '~10:16'
          },
          text: [
            'Two more rounds follow, each starting a v63 Pod, waiting until it is ready and then stopping a v62 Pod, and the list follows every change. The last v62 Pod, stopping on node 06, is already off it.',
            'By about 10:16 every address on the list is different from the ones at 10:15. The line at the top of the block, the name and address `storefront` uses, hasn’t changed once, and nobody had to tell `storefront` anything.'
          ],
          ariaLabel: 'About 10:16. Every catalog Pod runs v63: two on node 05, beside the dispatch Pod, and one on node 06, all ready. The last v62 Pod, on node 06, is stopped. The catalog Service still has the address 10.96.0.21, and its list holds three ready Pods: v63 at 10.4.5.14, v63 at 10.4.6.11 and v63 at 10.4.5.15. The stopped Pod’s entry, v62 at 10.4.6.9, is struck through: it has just left the list. The Deployment loop and the endpoints loop are acting: the endpoints loop sees 3 Pods that match, all ready, and lists all 3. Storefront’s calls to catalog are answered by the three v63 Pods.',
          highlight: ['svc:catalog', 'svc:catalog:list']
        }
      ]
    }
  };

  /* Fig. 04 (§06, revealed after k-05): Tuesday at about 12:40 on node 04 (Ch 05's layout that day:
     payments, storefront, orders; 12 of 13 GB reserved). Left: orders' only Pod, OOM-killed and being
     restarted in place, isn't ready, so the orders list is empty and calls are refused. Right: seconds
     later the same Pod is ready again and back on the list at the same address. */
  function orders(list) { return { name: 'orders', addr: '10.96.0.25', list: list }; }
  var HIDDEN04 = { id: 'hidden', label: 'Not drawn', text: 'nodes 01, 02, 05, 06', tone: 'mute' };
  function ordersCalls(text, tone) { return { id: 'calls', label: 'storefront → orders', text: text, tone: tone }; }

  var FIGURES = {
    restarting: {
      head: '~12:40 · Restarting',
      state: {
        nodes: { '04': ['pa2', 'sf2', 'or1:crashed'] },
        restarts: { or1: 1 },
        record: { rows: [], want: {}, pods: {}, service: orders([]) },
        loops: { shown: ['ep'], active: ['ep'], agents: [], lens: { watching: 'orders’ only Pod not ready', doing: 'empties the list' } },
        notes: [ordersCalls('connection refused', 'bad'), HIDDEN04]
      },
      highlight: ['svc:orders:list', 'note:calls'],
      ariaLabel: 'About 12:40, restarting. Node 04 runs a payments Pod, a storefront Pod and orders’ only Pod, orders-q2rw, whose container was OOM-killed and is being restarted, its first restart. The record shows the orders Service, with the address 10.96.0.25, and its list of ready Pods is empty: none. The endpoints loop sees that orders’ only Pod is not ready and empties the list. Storefront’s calls to orders get connection refused. Nodes 01, 02, 05 and 06 are not drawn.'
    },
    ready: {
      head: 'Seconds later · Ready again',
      state: {
        nodes: { '04': ['pa2', 'sf2', 'or1'] },
        restarts: { or1: 1 },
        record: { rows: [], want: {}, pods: {}, service: orders(['or1']) },
        loops: { shown: ['ep'], active: ['ep'], agents: [], lens: { watching: 'the Pod ready again', doing: 'lists it again: 10.4.4.7, as before' } },
        notes: [ordersCalls('answered', 'good'), HIDDEN04]
      },
      highlight: ['svc:orders:list', 'note:calls'],
      ariaLabel: 'Seconds later, ready again. The same orders Pod, orders-q2rw on node 04, restarted once, is ready. The orders Service, still at 10.96.0.25, lists it again at the same address, 10.4.4.7. The endpoints loop sees the Pod ready again and lists it at the same address. Storefront’s calls to orders are answered. Nodes 01, 02, 05 and 06 are not drawn.'
    }
  };

  window.ClusterData = {
    NODES: [],
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
