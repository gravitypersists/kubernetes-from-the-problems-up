status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/widgets/w-fleet-scrolly/data.js — `window.FleetData`: MACHINES, CAPACITY 6, SERVICES (size, copies, label, narrow breaks), CONTAINERS, STRINGS and FLEET_LANES (A1–A3, B1–B6, C1–C4). Each step has a complete snapshot, final text, ariaLabel, gate and highlight. Snapshot format documented in the file header for Ch 4–8.
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/widgets/w-fleet-scrolly/index.js — `renderFleet(target, state, opts)` and `servicePills` (exported as `window.FleetCanvas`), plus the lane controller.
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/widgets/w-fleet-scrolly/index.css — scoped to `[data-widget="w-fleet-scrolly"]`, tokens only.
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/gate/w-fleet-scrolly-round-3.json — gate: PASS at 360, 768 and 1280.

summary: Built to the mount contract, rendering only into the three slots. Canvas is a figure plate on blueprint ground with Ch 2's machine frame and chip; chip height by size (40px/unit; under 900px fitted so canvas ≤ 50vh); dashed N FREE regions; dashed DOWN machine with LOST chips; status words; pills computed from snapshot; note lines; highlight easing in over dur-2. Each lane reserves its tallest state. Activation via IntersectionObserver plus scroll listener at 55%; locked step can't become active. Gates use page data-gate, unlock on any option, never re-lock. Page CSS shows per-step snapshots on short viewports. No libraries.

Verification: verify.mjs --widget PASS. Playwright driver (scratchpad) scrolled every step at 1280×900, 1024×700, 768×1024, 375×667, 360×640, 360×900, 740×390, dark mode, reduced motion. Free room per step matches plan (A3 1/2/2/5 = 10 of 24; B4 04:2, 02:1; C1 1/1/2). Pills match ac-05/ac-06. Scrolling back restored exact states. Wrong answers unlock. Before k-02 canvas held STEP 3/6 with B4–B6 locked. Smallest text 13px. No overflow. No console errors.

concerns:
- k-03 answer visible during the check: B4 state has `hold: { until: 'k-03' }`; orders and dispatch pills show "?" (dashed) until k-03 is committed. NEW ADDR chips stay visible as the clue. Remove that field in data.js to undo.
- C3 shows the end of round one only (v13 RUNNING on 04, one v12 on 01 STOPPED), not NEW ADDR then RUNNING within one step (would need in-step animation).
- Rounds 2 and 3 fixed order: v13 on 01, stop v12 on 02; v13 on 02, stop other v12 on 01. C4 text doesn't name machines.
- Connection line only at B5/B6, spreadsheet note only at B6 (earlier would give away k-03). Lane C omits both.
- Desktop canvas taller than page reserves: ~421/465/454px for lanes A/B/C vs 420px reserved. Shifts the page at load only.
- Narrow chips: ≤343px a size-1 RUNNING chip shows only its name; on phones ≤667px tall lane B's storefront chips drop "v12" to stay under 50vh. Lane C keeps v12/v13.
- Step text changes: C1 "have to be replaced by v13 copies"; B5/B6 storefront's "settings still say / now say machine 04"; B1/B3 carry 02:51 and 03:04 kickers.
- No aria-live; canvas role=img with per-step aria-label; step text carries meaning.

relaxed:
- I4 / plan "NEW ADDR, then RUNNING" in C3 — in-step sequence not shown — would need autoplay within a step.

dispositions:
- none (first build)
