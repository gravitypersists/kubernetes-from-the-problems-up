# _pool: shared chapter runtime

One copy of the code every chapter uses. `npm run sync` mirrors this folder into each chapter's
`site/pool/` (gitignored), so a chapter stays self-contained for the didactician gate, which serves
`site/` only. The site build (`npm run build`) ships this folder once, as `dist/pool/`.

| File | What | Source |
| --- | --- | --- |
| `tokens.css` | Control Plane tokens | copy of `design/control-plane/control-plane.css`; change both together |
| `components.css` | kit page skeleton, rail, checks | didactician `kit/components.css` |
| `widget.js` | `Didactician.widget()` mount helper | kit |
| `toc.js` | rail + mobile Contents | kit, plus the course tweak: the rail drops h2 `.cp-sec` numerals |
| `arrow.js`, `replay.js` | arrows, replay control | kit |
| `cluster/cluster.js` | `ClusterCanvas.create(data)` → `renderCluster()`, the course's cluster drawing | Ch 4's `w-cluster-scrolly` (Ch 3's `renderFleet`), plus Ch 5's optional fields |
| `cluster/cluster.css` | its styles, the lane step kicker and the measured inline fallback | Ch 4 |
| `cluster/lanes.js` | `ClusterCanvas.lanes(id, data)`, the scrollytelling lane controller | Ch 4 (Ch 3's), plus per-state columns in inline snapshots (pool-02) |
| `cluster/test/` | builder test page: one snapshot per optional feature and per narrow-width fallback. **Not shipped** (sync and build skip `test/` folders and READMEs) | — |

**In a run:** reference these as `pool/<file>` from `site/index.html`. Don't edit `site/pool/`:
it's overwritten on sync, and `sync --check` / the build flag an edited copy. Chapter-only changes go
in `site/assets/`. A builder that needs a pool change reports it instead of making it.

**Changing the pool** is a course-level step, outside any run: edit here, `npm run sync`, then
re-gate every chapter (`verify.mjs` on each), because every chapter picks the change up.

**Adding to the pool:** promote code once a second chapter needs it, into a subfolder per renderer
(like `cluster/`). Chapter content (lanes, steps, strings, services, Pods) stays in the chapter's own
`data.js`; the pool code takes it as an argument and hard-codes no reader-visible string. Document the
data format here, keep the promoted chapter drawing exactly as before (compare its DOM and screenshots),
and give new features optional fields that are off when absent. A pool test page goes in a `test/`
folder, which is never shipped. Promoted so far: Ch 4's cluster renderer and lane controller (Ch 5
pool-01; narrow-width fallbacks, pool-02; Ch 6's Deployment group, `notready`, series colour and
`STATUS_INLINE`, pool-03). Still a candidate: Ch 3's `renderFleet` in `w-fleet-scrolly`, which `cluster/` supersedes.

## Cluster drawing (`cluster/cluster.js`, `cluster/cluster.css`)

Load `pool/cluster/cluster.css`, the widget's `data.js`, then `pool/cluster/cluster.js`.

```js
var R = ClusterCanvas.create(window.ClusterData);   // one renderer per data object
R.renderCluster(target, state, opts);              // draws ONE complete snapshot into target
```

Two widgets on one page each make their own renderer from their own data object. `R` also has
`laneLayout(width, states, header, opts)` (choices that must hold for every state of a lane),
`measureReserve(target, states, opts)` (per-block heights, so a lane never changes height),
`recordRows`, `nodeIds`, `usedRoom`, `usedCpu`, `capacity`, `fmt`, and `reset()` (call it after web
fonts load). Styles are scoped under the drawing's root, `.wc`.

### Chapter data (`window.ClusterData` or any object)

| Field | Meaning |
| --- | --- |
| `NODES` | node ids always drawn, merged with each state's `nodes` keys; drawn in sorted key order |
| `CAPACITY` | room per node. A number (Ch 4: room units), or `{ memory, cpu }` (Ch 5: GB and cores) |
| `UNIT` | optional. Printed after memory amounts: `'GB'` gives `3 GB FREE`. Omit for room units |
| `ROOM_UNIT` | optional, default 1. How many `UNIT`s one drawn unit of room is (Ch 5: `2`, so a 2 GB Pod is Ch 4's one-unit chip) |
| `SERVICES` | `{ svc: { size, cpu?, label, breaks } }`. `size` in `UNIT` (fractions allowed); `cpu` in cores; `breaks` = where the label may break on a narrow chip |
| `LOOPS` | `{ id: { label } }`, the loop pills |
| `PODS` | `{ id: { service, version?, name?, size?, cpu?, use?, series? } }`. `size` / `cpu` override the service's for this Pod; `use` = what it used (also settable per state) |
| `STATUS_INLINE` | optional (pool-03). `true`: a chip with no line of its own for its status word puts it beside its label |
| `STRINGS` | every reader-visible string (below) |
| `CLUSTER_LANES` (or `LANES`) | lanes for `lanes.js` |

`STRINGS` (Ch 4's set, all required): `widget`, `widgetShort`, `step`, `node`, `free`, `down`,
`status { running, notstarted, starting, lost, crashed, newaddr?, stopped? }`, `statusBreaks`,
`nodeStatus { unknown }`, `record { title, titleShort, want, running, short, unknown }`, `loopMark`,
`agent`, `agents`, `lens { watching, doing }`. Needed only by the optional features that use them (a
missing one logs a console error): `record.waiting` and `status.waiting` and `waiting` (the strip
head, e.g. `'Waiting · no room'`); `cpu` (`'CPU'`); `verdict { fits, mem, cpu, cores, free, short { fits,
mem, cpu } }` (e.g. `'Fits'`, `'No memory'`, `'No processor'`, `'cores'`, `'free'`, `'✓ Fits'`, `'✕ Mem'`,
`'✕ CPU'`); `scheduler` (the note label); `newNode` (`'New'`); `spare` (`'Spare'`); `use { over,
overBreaks?, overShort? }` (`'Uses more than it reserves'`, `['Uses more', 'than it', 'reserves']`,
`'Over'`). Bar, tag and status text is uppercased by CSS.

### Snapshot format

Each `state` is a COMPLETE snapshot, not a diff, so any step can be drawn on its own and scrolling
back restores it exactly. Ch 4's fields:

- `nodes` `{ '01': ['pa1', 'sf1:notstarted'], … }`: every node and its Pods, top to bottom. An entry is
  `'id'` (running) or `'id:status'`:
  `running` (solid chip, lamp, RUNNING, good) · `notstarted` (assigned, not running: dashed, no fill, no
  lamp, NOT STARTED, ink-3; it exists only as a record) · `starting` (STARTING, warn) · `lost` (on a node
  that is DOWN: LOST) · `crashed` (CRASHED, bad) · `newaddr`, `stopped` (Ch 3's) · `placed` (new: a Pod in
  a what-if packing, solid, no status word, for the sandbox). Keys may change between steps. Each Pod
  takes its `size`; unused room is drawn as `N FREE` (dashed c6).
- `down` `['03']`: nodes physically dead (reality): dashed frame, DOWN in the body, their Pods LOST.
- `nodeStatus` `{ '03': 'unknown' }`: what the record says about a node: UNKNOWN (warn) on the bar,
  and that node's Pod marks in the record read "?".
- `record` `{ rows: [svc…], want: { svc: n }, pods: { svc: [podId…] }, deleting?: { svc: [podId…] } }`:
  one row per service, WANT n, one mark per Pod record, one struck-through mark per record marked for
  deletion. Marks and row words are COMPUTED: mark filled (good) = the Pod is on a node, running or
  lost, not on an unknown node; hollow dashed = notstarted / starting / crashed / waiting / on no node;
  "?" (warn) = on an unknown node; struck = in `deleting`, not counted. Word: `SHORT n` (warn) when
  fewer Pod records than WANT; else `n RUNNING` (good when n ≥ WANT, else ink-3), plus `· n UNKNOWN`
  and `· n WAITING` (warn) when any apply. On a narrow canvas only the most urgent part shows
  (SHORT > WAITING > UNKNOWN > RUNNING).
- `loops` `{ shown: [loopId…], active: [loopId…], agents: [nodeId…], lens?: { watching, doing } }`:
  pills drawn (inactive at 0.35 opacity), the acting ones, nodes whose agent acts (their bar pill
  lights, and an `↻ agents · 01, 02` pill joins the row), and the lens line `SEES · … / DOES · …`.
  Wide canvas: every shown pill; narrow: only the acting one.
- `notes` `[{ id, label?, text, sub?, tone?, type? }]`: lines under the nodes. `tone` good / bad / warn /
  mute colours `text`; `sub` is an ink-3 tail dropped on a narrow canvas.
- `clock` (header kicker), `banner` (Ch 3's "what if" line), `restarts { podId: n }` (`↻ n` on the chip).

Optional fields (Ch 5, pool-01). Each is drawn only when present; with none of them the drawing is
Ch 4's, unchanged:

1. **Capacity and unit**: data `CAPACITY: { memory: 13, cpu: 3.9 }`, `UNIT: 'GB'`, `ROOM_UNIT: 2`;
   per-node override in the state, `capacity: { '05': { memory: 13, cpu: 3.9 } }`. Chip height =
   `size / ROOM_UNIT` drawn units (fractions allowed, e.g. 0.5 GB); free room reads `3 GB FREE`, on two
   lines where one doesn't fit, and unlabelled where the room is thinner than 8px (and see fallback 6
   below for boxes shorter than a line).
2. **Processor footer**: drawn on every node whose capacity has `cpu`: `CPU 2.75 / 3.9` (reserved,
   computed from the Pods' `cpu`, never written / room), ink-2. The lane picks one form that fits every
   node: `CPU 2.75 / 3.9`, `CPU 2.75/3.9`, `CPU` over `2.75/3.9`, or `CPU` over `2.75`.
3. **Waiting**: `waiting: ['di7']` (Pods with no node; not in any node's list) draws a strip above the
   nodes headed `WAITING · NO ROOM` (warn) with each Pod as a dashed c1 chip, no fill, no lamp, WAITING
   (warn); the row word gains `· n WAITING`. The strip's height is reserved across a lane once any
   state has it.
4. **Verdicts**: `verdicts: { '01': 'mem cpu', '02': 'fits', '04': 'mem' }` (also `'cpu'`) on the node
   bars. Wide form: `FITS` (good) or `NO MEMORY · NO PROCESSOR` (warn), then the node's free amounts
   `1 GB · 0.15 CORES FREE` (ink-2), wrapped to the column. Narrow form: `✓ FITS`, `✕ MEM`, `✕ CPU`, no
   amounts. The lane uses the wide form only on a wide canvas where every verdict wraps to 3 lines or
   fewer. Free amounts are computed from the drawn state; when the check happened before the drawn
   placement, give them: `{ verdict: 'fits', memory: 3, cpu: 1.15 }` (Ch 5's F2 draws the second new
   Pod's check: `{ '01': { verdict: 'mem cpu', memory: 1, cpu: 0.9 }, '02': { verdict: 'fits', memory: 3,
   cpu: 1.15 }, '04': 'mem' }`).
5. **Scheduler note**: `notes: [{ id: 'reason', type: 'scheduler', text: '0/3 nodes are available: 2
   Insufficient cpu, 3 Insufficient memory.' }]`, labelled `SCHEDULER` (`STRINGS.scheduler`, or the
   note's own `label`); wraps.
6. **NEW tag**: `newNodes: ['05', '06']`: `NEW` on an ink tag on the node's bar, on the id line, the
   pill row or a line of its own, whichever fits.
7. **Use**: `use: { or1: 5.5 }` (in `UNIT`; or `PODS[id].use`): a solid c1 fill from the chip's bottom
   (the label keeps a c1-soft plate). Where use exceeds the Pod's size, the excess rises above the
   chip's top edge, hatched, with a warn top edge, over whatever sits above (clipped, dashed edge, at
   the node's top), and the chip's status line becomes the warn tag `USES MORE THAN IT RESERVES`
   (broken or `OVER` where it doesn't fit).
8. **Nodes only**: `opts.nodesOnly: true`: no record panel, no loop pills (nor agent pills on the
   bars), no header step counter (a header with no `n` also drops it).

Also new, for Ch 5's sandbox and lane sizes: `spare: ['5']` (a dashed c6 frame with SPARE in its
body); `opts.columns` (node columns; more nodes wrap into rows; by default a lane reserves the
largest node count of any of its states, so nodes added later never reflow the earlier ones);
`opts.labels: false` (chips show only outline and fill).

### Narrow-width fallbacks (pool-02)

Each applies only where the drawing doesn't fit, so a drawing that fits (all of Ch 4) is unchanged.
No new fields; the test page's last group draws each one at a 360px phone's snapshot width (314px).

1. **Node ids** (`laneLayout`, `L.idForm`): the bar shows `NODE · 01` on a wide canvas and `NODE 01` on
   a narrow one. Where that form misses the bar of any node in any state of the lane, every node of the
   lane gets the next form (`NODE 01`, then the bare `01`), so ids never clip to a shared "NODE 0".
   "Fits" means the id's ink fits: its width less the trailing letter-spacing and 1px of side bearing.
2. **Record row word** (`L.marksTight`, `L.wordBelow`): where even the compact word doesn't fit beside
   the marks (`fixed + compW > recInner`), the marks draw at 8px, 2px apart (the columns keep their gap
   if that is enough, else 4px); where that still doesn't fit, each row's word takes a line of its own
   under the row, right-aligned, in full where that line holds it. Lane-wide, like the other choices.
3. **Per-state columns in inline snapshots** (`lanes.js`, `drawSnaps`): each inline snapshot (shown
   under 560px tall, or where the lane falls back to `data-cs-fit="inline"`) sizes its node columns to
   its own state's node count, so Ch 5's F1–F4 draw three columns and F5 five. The lane's other choices
   are made over every state at that column width (steps with the same count share a layout and a
   reserve) and the unit stays the lane's. The sticky canvas keeps the lane-wide reservation, so
   switching steps never moves it. A lane whose states all have one node count draws exactly as before;
   lane option `snapColumns: 'lane'` keeps lane-wide columns in the snapshots too.
4. **Ring inset** (`geometry`): where a one-line label (the name of a Pod one drawn unit tall) misses
   its chip, the Pod ring's inset goes to 0 before the label is cut: on a narrow canvas always (as
   before), and now on a wide one too where that makes at least one such label fit (Ch 5's `payments`
   and `dispatch` in five columns at 460px), so a wide ring keeps its inset where dropping it saves
   nothing. Measured in each chrome's letter-spacing.
5. **Very short chips** (`chipLinesMax`): a chip whose text room (its height less the ring's and chip's
   strokes and the inset) is under 10px, the height of a 13px line's caps and digits, gets 0 lines and
   draws no label, only its outline and fill (and any use fill). From 10px up to a full line it holds one
   tight line, as before. A status word goes with the label, so the step text or the aria-label must
   name such a Pod (the sandbox lists them under its drawing).
6. **Free-room label**: a free box shorter than a line (16px) shows the amount alone (`1 GB`) where its
   inside holds the glyphs (10px or more), and no label where it doesn't, as under 8px; a box of a line
   or more is labelled as before (`3 GB FREE`, two lines, or the amount).

### Optional fields (pool-03, Ch 06)

Each is drawn only when present; with none of them the drawing is Ch 04's and Ch 05's, unchanged.

1. **Deployment group in the record**: `record.deployment: { name, want, version, rows }` draws a header
   row `DEPLOYMENT · catalog · WANT 3 · v63` (`STRINGS.record.deployment`, uppercased; the version in
   bold) above the first of the listed `rows`, which are drawn indented under it (a thin c4 elbow) and
   named `ReplicaSet v62` (`STRINGS.record.replicaSet` + the row key). Where any row of the lane would
   then miss its full word, every grouped row is named by its key alone (`v62`), lane-wide (`L.rsForm`);
   where the header doesn't fit one line, it takes two (`DEPLOYMENT · catalog` / `WANT 3 · v63`,
   `L.depWrap`). A grouped row with WANT 0 and no Pod records reads `KEPT` (`STRINGS.record.kept`,
   ink-3) instead of `0 RUNNING`: kept, not deleted. A ReplicaSet not yet created has no row (leave it
   out of `rows`). Rows outside the group draw as before, and the indent sits inside the name column, so
   mixed records stay aligned. Rows are keyed like services (`want`, `pods`, `deleting` by row key).
   Highlight keys `dep:<name>` (the header row) and `dep:<name>:version` (its version).
2. **Status `notready`**: `'n1:notready'`, a Pod whose container runs but hasn't passed its readiness
   check: a solid chip (as running), a hollow lamp, the word `STRINGS.status.notready` in warn
   (`statusBreaks.notready` allowed); its record mark is hollow (the existing rule: only running and
   lost Pods fill a mark). A chapter that uses it usually also sets `status.running` and
   `record.running` to `'READY'`.
3. **Per-Pod series colour**: `PODS[id].series: 1–6` draws that Pod's chip in `cN` on `cN-soft` instead
   of c1; the ring stays ink. Absent = c1. NOT STARTED, STOPPED and LOST keep their own looks; a WAITING
   chip's dashed edge and a use fill take the series colour. Status words keep their tone colours on
   every fill (contrast on c2-soft and c5-soft is the same as on c1-soft, within 0.1).
4. **`STATUS_INLINE: true`** (data): where a chip has no line of its own for its status word (a one-unit
   Pod, such as a 2 GB Pod at `ROOM_UNIT` 2), the word goes beside the label's last line
   (`catalog v63 ■ READY`), else beside the version alone (`v63 □ NOT READY`), before the usual
   fallbacks; RUNNING included, which without the flag stays unmarked on such a chip. Added for Ch 06,
   whose READY / NOT READY difference must show on every chip.

Example (Ch 06's lane step R3; `PODS.c2.series = 5`, `PODS.n1.series = 2`):

```js
{ nodes: { '05': ['di7', 'c1', 'n1'], '06': ['c2:stopped', 'c3'] },
  record: { deployment: { name: 'catalog', want: 3, version: 'v63', rows: ['v62', 'v63'] },
            rows: ['v62', 'v63'], want: { v62: 2, v63: 1 }, pods: { v62: ['c1', 'c3'], v63: ['n1'] },
            deleting: { v62: ['c2'] } },
  loops: { shown: ['deploy', 'rs', 'sched'], active: ['deploy'], agents: [],
           lens: { watching: '1 v63 Pod ready', doing: 'v62 down to 2' } },
  notes: [{ id: 'customers', label: 'Customers', text: 'served by v62 ×2 · v63 ×1', tone: 'good' }],
  clock: '~10:15:20' }
```

Strings these use: `record.deployment` (`'Deployment'`), `record.replicaSet` (`'ReplicaSet'`),
`record.kept` (`'KEPT'`), `status.notready` (`'NOT READY'`). The test page's pool-03 group draws each
at 560px, 360px and a 360px phone's snapshot width (314px), in both themes (`?theme=dark`).

`renderCluster` options, all optional: `width` (the plate's width; with `bleed`, the target's width plus
the bleed), `unit` (px per drawn unit of room; default 32, 22 narrow), `layout` (from `laneLayout`),
`reserve` (from `measureReserve`), `highlight` (keys below), `lit` (false = highlight drawn but not yet
inked, for the ease-in), `header: { lane, n, total }`, `bleed`, `nodesOnly`, `columns`, `labels`. A
canvas under 440px wide uses the narrow chrome.

Highlight keys (the step highlight, a 3px ink outline): `p:<pod>`, `n:<node>`, `status:<node>`,
`free:<node>`, `row:<service>`, `loop:<id>`, `agent:<node>`, `note:<id>`, `lens`, `banner`; new:
`verdict:<node>`, `cpu:<node>`, `new:<node>`, `waiting`, `use:<pod>`; pool-03: `dep:<name>`,
`dep:<name>:version`.

Example (Ch 5 lane step F3):

```js
{ nodes: { '01': ['pa1', 'sf1', 'di1', 'no1', 'di5'], '02': ['di2', 'di3', 'sf2', 'no2', 'di6'], '04': ['pa2', 'sf3', 'or1'] },
  waiting: ['di7'],
  verdicts: { '01': 'mem cpu', '02': 'mem cpu', '04': 'mem' },
  record: { rows: ['orders', 'payments', 'dispatch', 'storefront', 'notifications'],
            want: { orders: 1, payments: 2, dispatch: 6, storefront: 3, notifications: 2 },
            pods: { orders: ['or1'], payments: ['pa1', 'pa2'], dispatch: ['di1', 'di2', 'di3', 'di5', 'di6', 'di7'],
                    storefront: ['sf1', 'sf2', 'sf3'], notifications: ['no1', 'no2'] } },
  loops: { shown: ['rs', 'sched'], active: ['sched'], agents: [],
           lens: { watching: '1 Pod with no node; no node with room', doing: 'leaves it unplaced; records why' } },
  notes: [{ id: 'reason', type: 'scheduler', text: '0/3 nodes are available: 2 Insufficient cpu, 3 Insufficient memory.' }],
  clock: 'Seconds later' }
```

`cluster/test/index.html` draws every feature at 560px and 360px, and each narrow-width fallback, from
sample data (open it from disk; `?theme=dark` for the dark theme).

## Cluster lanes (`cluster/lanes.js`)

`ClusterCanvas.lanes('w-…', data)` after `pool/widget.js` and `pool/cluster/cluster.js`. It mounts every
`[data-widget="w-…"]` on the page (the kit's `Didactician.widget` hands over only the first) and runs each
`.cs-lane[data-lane=X]` from `data.CLUSTER_LANES[X]` = `{ name, steps: [step…] }`. Step fields: `id`
(matches `li.cs-step[data-step]`), `kicker?` (a time above the step text), `text` (paragraphs; `code`
in backticks), `ariaLabel` (the canvas state in words), `gate?` (check ids; the page's `data-gate` wins),
`highlight` (keys above), `state` (a snapshot).

Markup (the page owns it and its layout CSS, `.cs-*` in `assets/page.css`; see Ch 4's MOUNT CONTRACT
comment in `index.html` §04): `.cs-lane > .cs-lane__grid > .cs-canvas[data-canvas]` and
`ol.cs-steps > li.cs-step[data-step][data-gate?]` holding `[data-step-snap]`, `[data-step-text]`,
`p.cs-step__lock` and any `.cp-check`. The controller toggles `.is-active` (the step whose top last
crossed 55% of the viewport), `.is-locked` / `.is-unlocked` (gates open on the page's
`didactician:check-commit` event, or `.cp-check[data-committed]` at init; never re-lock); keeps the canvas
within 50vh under 900px and the viewport above by shrinking the unit; and where it still can't, sets
`data-cs-fit="inline"` on every mount so each step shows its own snapshot (each sized to its own
state's node count: fallback 3 above; lane field `snapColumns: 'lane'` turns that off). A chapter's widget
`index.css` keeps only its load-time height reservation.
