status: done_with_concerns

**On the coordinator's baseline caution:** the baseline is clean. I took the "before" snapshots from the chapters' own `site/pool/` copies before running any sync, and I confirmed those copies were byte-identical to `git show HEAD:explainers/_pool/cluster/cluster.js`. The edited pool didn't affect them.

artifacts:
- /Users/m/workspace/k8s-course/explainers/_pool/cluster/cluster.js — pool-04: the `record.service` Service block, `PODS[id].addr`, and the narrow-chip label rule
- /Users/m/workspace/k8s-course/explainers/_pool/cluster/cluster.css — Service block styles, appended and token-only
- /Users/m/workspace/k8s-course/explainers/_pool/README.md — new section "Optional field and chip rule (pool-04, Ch 07)" with format, strings, highlight keys and an example (step S3); the data table and key list are updated
- /Users/m/workspace/k8s-course/explainers/_pool/cluster/test/index.html — new pool-04 group (V1–V5, C1–C2b) at 560, 440, 360 and 314px, both themes
- /Users/m/workspace/k8s-course/explainers/ch-07-services/site/widgets/w-services-scrolly/data.js — lane S (S1–S4), `FIGURES.restarting` / `FIGURES.ready`, every string
- …/w-services-scrolly/index.js — glue only: `ClusterCanvas.lanes('w-services-scrolly', ClusterData)`
- …/w-services-scrolly/index.css — measured load-time reservation
- Screenshots: `pool4-before-*` / `pool4-after-*` at 1280, 768 and 360 in the probe folders of ch-04, ch-05 and ch-06; `lane-s-<w>x<h>-<theme>-*` in ch-07's `run/screenshots/probe/`

summary:
**Part 1: pool-04.**
- **Service block:** a header `SERVICE · catalog · 10.96.0.21` in the record's c4, over a `READY PODS` list on surface-2 with a dashed c3 left rule.
  - Each entry is a series-colour square, the version, then the address.
  - `leaving` entries are struck through in ink-3; an empty list reads `NONE` in bad.
  - The list reserves its fullest state's line count across the lane.
  - On a narrow canvas the label sits on its own line, entries go two to a line without separator dots, and the header wraps if it must.
  - It's off when `record.service` is absent.
- **Narrow-chip rule** (Ch 6 P-08), for one-line chips under `STATUS_INLINE`, tried in order:
  1. `catalog v63 ■ READY`
  2. drop the lamp: `catalog v63 READY` (the word keeps its colour)
  3. drop the version: `catalog □ NOT READY`, then `catalog NOT READY`
  4. as before: `v63 □ NOT READY`
  - Each try is measured as drawn.

**Part 1 verification:**
- DOM comparison of every mount and figure slot's outerHTML and height, before vs after, at 10 viewports (1280, 1100, 768, 390, 360 wide; 900 and 640 tall), on load, after unlocking, at each step forward and back, plus the sandbox at defaults and at minimum requests:
  - Ch 4: 500 snapshots, 0 differ.
  - Ch 5: 280 snapshots, 0 differ.
  - Ch 4 and Ch 5 screenshots are byte-identical.
- Ch 6: 224 of 390 snapshots differ, all in chip label lines, with no height change:
  - At 360 and 390, and in the hidden or inline step snapshots: `v63 NOT READY` → `catalog NOT READY`; `v62 STOPPED` → `catalog STOPPED` or `catalog v62 STOPPED`; `v62 READY` → `catalog v62 READY`.
  - At 360: chips that drew `catalog v62 ■ READY` now drop the lamp. In the "before" shot, READY touched the chip's right edge.
  - Fig. 03's crash panel, at every width including the 1280 desktop figure: `v64 ↻ 3 CRASHED` → `catalog v64 ↻ 3 CRASHED` (or `catalog ↻ 3 CRASHED` where narrower). It's the same rule, because those panels' columns are narrow.
- `npm run sync`, then `verify.mjs` on ch-01 to ch-06: all PASS (rounds 12, 13, 15, 13, 12, 9). `sync --check` reports everything in sync, and `npm run build` succeeds.
- After those gates I made one more pool change, to the label placement for one-entry lists. It is reached only through `record.service`, which no shipped chapter uses.

**Part 2: lane S.**
- Built to the plan, with final step text written to the prose rules.
- The addresses match f-01 and f-02: catalog `10.96.0.21`, orders `10.96.0.25`, Pods `10.4.5.12` / `10.4.6.8` / `10.4.6.9` → `10.4.5.14` / `10.4.6.11` / `10.4.5.15`, orders Pod `10.4.4.7`.
- Driven on the real page at 1280×900, 1100×900 (dark), 768, 390, 360×900 (dark), 360×740, 360×640 and 1280×640:
  - **ac-06:** at every step the list holds exactly the drawn READY catalog Pods; STOPPED ones appear only struck through; the header is unchanged in every step; the calls line names every listed version (S3: `v62 ×2 · v63 ×1`).
  - **Gate:** S3 can't become active before k-03 is committed, and a wrong option unlocks it.
  - **Scroll-back:** S3, S2 and S1 give a DOM identical to the first visit.
  - **No overflow:** no clipped labels and no horizontal scroll. 360×740 and shorter use inline snapshots, 442px each.
  - **Console:** no errors.
- **ac-07:** the header (c4), the list (surface-2, dashed c3) and the calls note look different from each other, and nothing draws the Service on a call's path.
- `verify --widget w-services-scrolly` and `verify --phase page`: both PASS. The page was in place.

**For the f-04 mount:** the keys are `ClusterData.FIGURES.restarting` (left) and `ClusterData.FIGURES.ready` (right). Each is `{ head, state, highlight, ariaLabel }`. `head` duplicates the page's own panel heads; the page can ignore it. The page already reads these keys, and both panels draw with `data-drawn`.

concerns:
- **`NODES` is `[]` in data.js, where the page's mount comment says `['05','06']`.** The pool merges `NODES` into every state, so `['05','06']` would add nodes 05 and 06 to Fig. 04's node-04-only panels. Every lane state names both nodes itself, so the lane is unaffected. The page builder may want to correct the comment.
- **The lane name is "Thursday · catalog", not the plan's "Thursday, 10:15 · catalog, from storefront's side".** With the clock and `STEP n / 4` beside it, the longer name collapsed the header to a bare "W-01" at 1280, as happened in Ch 6. The header now reads `W-01 · THURSDAY · CATALOG`. The manifest's `mounts.S` text still quotes the long name.
- **S4 draws the last v62 Pod as STOPPED on node 06 (`c3:stopped`)**, where the plan lists only `n2` there. The plan also strikes that Pod's entry in S4, so its Pod is drawn in the step it leaves (ac-06).
- **At 360, the NOT READY chip reads `catalog NOT READY`, without the version (rule step 3).** "catalog v63 NOT READY" can't fit a one-line chip about 136px wide. The step text, the chip's c2 colour and the list carry the version.
- **Fig. 04's panels are 417px wide at desktop**, under the pool's 440px narrow-chrome threshold. Their list label sits above the entry by rule.
- **One step activity is attributed to the endpoints loop only.** The Deployment loop acts in S2–S4, but the lens is one loop's, so `ep` alone is active, following the plan. The step text names the Deployment loop where it acts.
- **Page reservations:** index.css raises the canvas reservation to min(536px, 100vh − 48px) from 900px wide and min(460px, 50vh + 16px) below. The drawing measured 536px at 1280, and 442 + 16 at 360×900, which was 2px over the page's 456.

relaxed:
- none
