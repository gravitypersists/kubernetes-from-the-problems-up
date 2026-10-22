/* w-fleet-scrolly · data. Ch 03, §02 "One week of Sam's job". Classic script; defines window.FleetData.
   Every reader-visible string of the lanes (canvas and step text) lives in this file. Fennel's services,
   copies, sizes, machines, times and versions are fiction (d-04).

   ---- Snapshot format (copy this for later chapters) -------------------------------------------------
   Each step's `state` is a COMPLETE snapshot, not a diff, so any step can be drawn on its own:
     machines  { '01': ['sf1', 'sf2', 'pa1'], … }  every machine, its containers top to bottom.
               An entry is 'id' (status RUNNING) or 'id:status', status one of
               running | crashed | lost | newaddr | stopped. (Room left for Ch 5: 'waiting'.)
     down      ['03']            machines that are DOWN (their chips stay in place, marked LOST)
     pills     true | false      show the service pills (computed from the snapshot, never written here)
     hold      { until: 'k-03', pills: ['orders'], chips: { or2: 'running' } }  optional: until that
               check is committed, these pills read "?" and these chips show the given status, so the
               canvas doesn't answer a prediction before the reader commits
     notes     [{ id, label?, text, tone? }]  lines under the pills (the connection line, the
               spreadsheet); tone 'warn' or 'mute'
     banner    'text'            optional line above the machines (a "what if" state)
   A container id names one container (one copy of a service, started from its image): see CONTAINERS.
   A container re-created elsewhere is a new container with a new id (or2, di4).
   Pill rule: a service is UP if at least `copies` of its containers are RUNNING on up machines, DOWN
   if none are, DEGRADED otherwise. NEW ADDR containers are running but not yet reachable, so they
   don't count.
   Step fields: id, kicker? (a time), text [paragraphs; `code` in backticks], ariaLabel (the canvas
   state in words), ariaHeld? (used while `hold` applies), gate? (check ids; the page's data-gate
   attributes are authoritative), highlight [ids of what changed: 'c:<container>', 'm:<machine>',
   'free:<machine>', 'pill:<service>', 'note:<id>', 'banner']. */
(function () {
  'use strict';

  var MACHINES = ['01', '02', '03', '04'];
  var CAPACITY = 6;                       /* units of room per machine (D2: one number, for simplicity) */

  /* size in room units, copies the service needs, chip label, and where the label may break on a
     narrow chip */
  var SERVICES = {
    storefront: { size: 2, copies: 3, label: 'storefront', breaks: ['store-', 'front'] },
    orders:     { size: 3, copies: 1, label: 'orders',     breaks: ['orders'] },
    payments:   { size: 1, copies: 2, label: 'payments',   breaks: ['payments'] },
    dispatch:   { size: 1, copies: 3, label: 'dispatch',   breaks: ['dispatch'] }
  };
  var SERVICE_ORDER = ['storefront', 'orders', 'payments', 'dispatch'];

  var CONTAINERS = {
    sf1: { service: 'storefront', version: 'v12' },
    sf2: { service: 'storefront', version: 'v12' },
    sf3: { service: 'storefront', version: 'v12' },
    or1: { service: 'orders' },
    pa1: { service: 'payments' },
    pa2: { service: 'payments' },
    di1: { service: 'dispatch' },
    di2: { service: 'dispatch' },
    di3: { service: 'dispatch' },
    or2: { service: 'orders' },            /* orders, re-created on machine 04 after 03:04 */
    di4: { service: 'dispatch' },          /* the lost dispatch copy, re-created on machine 02 */
    sf4: { service: 'storefront', version: 'v13' },
    sf5: { service: 'storefront', version: 'v13' },
    sf6: { service: 'storefront', version: 'v13' }
  };

  var STRINGS = {
    widget: 'W-01 · One week, by hand',
    widgetShort: 'W-01',
    step: 'Step',
    machine: 'Machine',
    free: 'free',
    status: {
      running: 'RUNNING', crashed: 'CRASHED', lost: 'LOST', newaddr: 'NEW ADDR', stopped: 'STOPPED',
      down: 'DOWN'
    },
    service: { up: 'UP', degraded: 'DEGRADED', down: 'DOWN' },
    held: '?',
    heldAria: 'answer the check to see',
    pillsAria: 'Services: ',
    lanes: { A: 'Monday', B: 'Saturday night', C: 'Tuesday' }
  };

  /* ---- reused snapshots (each step below still lists its full state) ---- */
  var MONDAY = { '01': ['sf1', 'sf2', 'pa1'], '02': ['sf3', 'di1', 'di2'], '03': ['or1', 'di3'], '04': ['pa2'] };
  var AFTER_0304 = { '01': ['sf1', 'sf2', 'pa1'], '02': ['sf3', 'di1', 'di2', 'di4:newaddr'], '03': ['or1:lost', 'di3:lost'], '04': ['pa2', 'or2:newaddr'] };
  var SUNDAY = { '01': ['sf1', 'sf2', 'pa1'], '02': ['sf3', 'di1', 'di2', 'di4'], '03': ['or1:lost', 'di3:lost'], '04': ['pa2', 'or2'] };

  var FLEET_LANES = {
    A: {
      name: STRINGS.lanes.A,
      steps: [
        {
          id: 'A1',
          state: { machines: { '01': [], '02': [], '03': [], '04': [] }, down: [], pills: false, notes: [] },
          text: [
            'Morgan’s question: Fennel pays for eight machines, and half of them look mostly idle. Could four do the work?',
            'Here, each machine has six units of room. Each container takes one to three units, depending on how much memory and processor time it needs.'
          ],
          ariaLabel: 'Four empty machines, 01 to 04, each with 6 units of room free.',
          highlight: ['free:01', 'free:02', 'free:03', 'free:04']
        },
        {
          id: 'A2',
          state: { machines: MONDAY, down: [], pills: false, notes: [] },
          text: [
            'Sam fits the nine containers in by hand. Each one needs a single machine with enough room for all of it.',
            'Then Sam writes each container’s machine into the spreadsheet, and into the settings of the services that call it, so `storefront` knows where to send orders.'
          ],
          ariaLabel: 'Nine containers placed. Machine 01: two storefront v12 copies and a payments copy, 1 unit free. Machine 02: a storefront v12 copy and two dispatch copies, 2 units free. Machine 03: orders and a dispatch copy, 2 units free. Machine 04: a payments copy, 5 units free.',
          highlight: ['c:sf1', 'c:sf2', 'c:sf3', 'c:or1', 'c:pa1', 'c:pa2', 'c:di1', 'c:di2', 'c:di3']
        },
        {
          id: 'A3',
          state: { machines: MONDAY, down: [], pills: true, notes: [] },
          text: [
            'Nine containers fit on four machines, with 10 of the 24 units still free. Sam moves everything onto these four, and from now on they run all of Fennel’s containers. The other four machines sit empty as spares, and Fennel still pays for all eight.',
            'Sam’s answer to Morgan: “The spare room is for when something breaks.”'
          ],
          ariaLabel: 'Nine containers on four machines, which now run all of Fennel’s containers; 10 of 24 units free: 1 on machine 01, 2 on 02, 2 on 03, 5 on 04. All four services up: storefront 3 copies, orders 1, payments 2, dispatch 3.',
          highlight: ['free:01', 'free:02', 'free:03', 'free:04', 'pill:storefront', 'pill:orders', 'pill:payments', 'pill:dispatch']
        }
      ]
    },

    B: {
      name: STRINGS.lanes.B,
      steps: [
        {
          id: 'B1',
          kicker: '02:51',
          state: { machines: { '01': ['sf1', 'sf2', 'pa1'], '02': ['sf3', 'di1:crashed', 'di2'], '03': ['or1', 'di3'], '04': ['pa2'] }, down: [], pills: true, notes: [] },
          text: [
            'Sam’s phone buzzes: one of the three `dispatch` copies, the one on machine 02, has crashed. The machine itself is fine.'
          ],
          ariaLabel: 'A dispatch copy on machine 02 has crashed; machine 02 is still up. dispatch degraded, 2 of 3 copies running. The other services are up.',
          highlight: ['c:di1', 'pill:dispatch']
        },
        {
          id: 'B2',
          state: { machines: MONDAY, down: [], pills: true, notes: [] },
          text: [
            'Sam restarts the crashed copy on the same machine. Nothing else has to change, and Sam goes back to bed.'
          ],
          ariaLabel: 'The dispatch copy is running again on machine 02, where it was. All four services up.',
          highlight: ['c:di1', 'pill:dispatch']
        },
        {
          id: 'B3',
          kicker: '03:04',
          state: { machines: { '01': ['sf1', 'sf2', 'pa1'], '02': ['sf3', 'di1', 'di2'], '03': ['or1:lost', 'di3:lost'], '04': ['pa2'] }, down: ['03'], pills: true, notes: [] },
          text: [
            'Machine 03 stops answering. The `orders` container and a `dispatch` copy on it are lost, so customers can’t place orders, and nothing will change until Sam does something.'
          ],
          ariaLabel: 'Machine 03 down. orders and one dispatch copy lost. orders down; dispatch degraded, 2 of 3 copies running. Free room: machine 01, 1 unit; machine 02, 2 units; machine 04, 5 units.',
          highlight: ['m:03', 'pill:orders', 'pill:dispatch']
        },
        {
          id: 'B4',
          gate: ['k-02'],
          state: { machines: AFTER_0304, down: ['03'], pills: true, hold: { until: 'k-03', pills: ['orders', 'dispatch'], chips: { or2: 'running', di4: 'running' } }, notes: [] },
          text: [
            'Of the three machines still running, machine 04 is the only one with room for all of `orders`. Sam pulls the `orders` image onto machine 04 and starts a container from it there, then starts the lost `dispatch` copy again on machine 02.'
          ],
          ariaLabel: 'orders started on machine 04, now 2 units free, and the lost dispatch copy on machine 02, now 1 unit free. Both run at new addresses that nothing calling them knows yet. orders down; dispatch degraded, 2 of 3 copies reachable.',
          ariaHeld: 'orders started on machine 04, now 2 units free, and the lost dispatch copy started again on machine 02, now 1 unit free. Both are running. Whether customers can use them is hidden until you answer the check.',
          highlight: ['c:or2', 'c:di4', 'free:04', 'free:02']
        },
        {
          id: 'B5',
          gate: ['k-02', 'k-03'],
          state: { machines: AFTER_0304, down: ['03'], pills: true, notes: [{ id: 'link', text: 'storefront → orders: still machine 03', tone: 'warn' }] },
          text: [
            'Customers still can’t place orders. The new `orders` container runs at a new address, but `storefront`’s settings still say machine 03, so `storefront` sends orders where nothing is running.'
          ],
          ariaLabel: 'storefront still sends orders to machine 03, which is down. orders runs on machine 04 at an address storefront doesn’t know: orders down; dispatch degraded.',
          highlight: ['note:link', 'pill:orders']
        },
        {
          id: 'B6',
          gate: ['k-02', 'k-03'],
          state: { machines: SUNDAY, down: ['03'], pills: true, notes: [{ id: 'link', text: 'storefront → orders: machine 04' }, { id: 'sheet', label: 'Spreadsheet', text: 'orders: machine 03', tone: 'mute' }] },
          text: [
            'Sam passes on the new addresses. `storefront`’s settings now say machine 04, and customers can order again.',
            'The spare room on machine 04 is what made space for `orders`. The spreadsheet can wait until morning; it still says machine 03.'
          ],
          ariaLabel: 'storefront now sends orders to machine 04. orders and the re-created dispatch copy are running; all four services up. The spreadsheet still says orders is on machine 03.',
          highlight: ['note:link', 'c:or2', 'c:di4', 'pill:orders', 'pill:dispatch', 'note:sheet']
        }
      ]
    },

    C: {
      name: STRINGS.lanes.C,
      steps: [
        {
          id: 'C1',
          state: { machines: SUNDAY, down: ['03'], pills: true, notes: [] },
          text: [
            'A new `storefront` image, v13, is ready. Sam posts in the team chat: “Nobody deploy anything, I’m updating storefront.”',
            'The three v12 copies have to be replaced by v13 copies without the site going down. Each copy’s address is written into the settings that send customers’ traffic to `storefront`, and there’s room for one extra copy, on machine 04.'
          ],
          ariaLabel: 'Three storefront v12 copies: two on machine 01, one on machine 02. Free room: machine 01, 1 unit; machine 02, 1 unit; machine 04, 2 units. Machine 03 still down. All four services up.',
          highlight: ['c:sf1', 'c:sf2', 'c:sf3', 'free:01', 'free:02', 'free:04']
        },
        {
          id: 'C2',
          gate: ['k-04'],
          state: { machines: { '01': ['sf1:stopped', 'sf2:stopped', 'pa1'], '02': ['sf3:stopped', 'di1', 'di2', 'di4'], '03': ['or1:lost', 'di3:lost'], '04': ['pa2', 'or2'] }, down: ['03'], pills: true, banner: 'What if: stop all three first', notes: [] },
          text: [
            'Here’s what stopping all three v12 copies first would do. With no `storefront` copy running, the site doesn’t load until the v13 copies are started and their addresses added to those settings.'
          ],
          ariaLabel: 'What if all three were stopped first: the three storefront v12 copies are stopped, and storefront is down, with 0 copies running.',
          highlight: ['c:sf1', 'c:sf2', 'c:sf3', 'pill:storefront', 'banner']
        },
        {
          id: 'C3',
          gate: ['k-04'],
          state: { machines: { '01': ['sf2', 'pa1'], '02': ['sf3', 'di1', 'di2', 'di4'], '03': ['or1:lost', 'di3:lost'], '04': ['pa2', 'or2', 'sf4'] }, down: ['03'], pills: true, notes: [] },
          text: [
            'Sam’s way, round one: start one v13 copy on machine 04 and add its address to the settings that send customers’ traffic to `storefront`, then stop one v12 copy on machine 01 and remove its address.',
            'Three copies serve customers throughout, and machine 01 now has 3 units free for the next round.'
          ],
          ariaLabel: 'Round one: a storefront v13 copy running on machine 04, which is now full. One v12 copy on machine 01 stopped and removed, so machine 01 has 3 units free. storefront up, 3 copies running.',
          highlight: ['c:sf4', 'free:01']
        },
        {
          id: 'C4',
          gate: ['k-04'],
          state: { machines: { '01': ['sf5', 'sf6', 'pa1'], '02': ['di1', 'di2', 'di4'], '03': ['or1:lost', 'di3:lost'], '04': ['pa2', 'or2', 'sf4'] }, down: ['03'], pills: true, notes: [] },
          text: [
            'Two more rounds, the same way: start a v13 copy on machine 01, where there’s room, add its address to those settings, then stop a v12 copy. The site never went down.',
            'It took Sam the evening, and nobody else shipped anything until it was done.'
          ],
          ariaLabel: 'All three storefront copies are v13: two on machine 01 and one on machine 04. The last v12 copy, on machine 02, is stopped and removed. storefront up, 3 copies running. Free room: machine 01, 1 unit; machine 02, 3 units; machine 04 full.',
          highlight: ['c:sf5', 'c:sf6', 'free:02', 'pill:storefront']
        }
      ]
    }
  };

  window.FleetData = {
    MACHINES: MACHINES,
    CAPACITY: CAPACITY,
    SERVICES: SERVICES,
    SERVICE_ORDER: SERVICE_ORDER,
    CONTAINERS: CONTAINERS,
    STRINGS: STRINGS,
    FLEET_LANES: FLEET_LANES
  };
})();
