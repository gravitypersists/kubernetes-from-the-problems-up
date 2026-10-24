status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/widgets/w-sizing-sandbox/model.js — `window.SizingModel`. Pure functions with no DOM: `pods`, `pack` (exact 2-D bin packing), `evaluate` (nodes, set by, idle split, warnings, placement, memoised) and `selfTest`.
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/widgets/w-sizing-sandbox/data.js — `window.SizingData`. R2 story facts, the data object for the pooled renderer (separate from lane F's), and every reader-visible string (`STRINGS` and `SHEET`).
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/widgets/w-sizing-sandbox/index.js — readouts, idle bar, three steppers, switch, reset, warnings, never-placeable bar, the nodes-only drawing through `ClusterCanvas.create(copy of SizingData)`, the polite live sentence and the height rule.
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/widgets/w-sizing-sandbox/index.css — scoped, tokens only, plus measured load-time `min-height` values for the mount.
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/widgets/w-sizing-sandbox/selftest.mjs — Node self-test (`node selftest.mjs`). The gate doesn't load it.

summary: Pre-flight: the model matches c-02 and c-05 (per node, per resource, ≤ room; 13 GB and 3.9 cores). Packing is an exact depth-first search, largest Pod first, skipping nodes in identical states and pruning on remaining room. Worst case is 11,499 steps per setting (the designer estimated about 8,000); a whole update takes at most 7.6 ms at 4× CPU throttle.

ac-08 results from the self-test, and from real clicks at 360, 600, 768 and 1280:
- Defaults with the spare: 05 nodes, set by memory, 38 of 65 GB reserved, 19.5 GB used (30%). Spare off: 04.
- (2.5, 6, 1.5): 03, set by both; 04 with the spare.
- (2, 6, 1): 03, set by processor; 04 with the spare.
- `orders` at 8 with the others right-sized: 03. At 12: 04.
- `orders` 13: placeable. `orders` 13.5 or more: NODES —, with `orders` named as never placeable.
- Raising any request never lowers the count: checked over all 6,144 settings × 2.
- A request below use shows a warning line.

`verify.mjs --widget w-sizing-sandbox` passes at 360/768/1280 (round 2).

My script, in the scratchpad at `ss/check.mjs`, drove 14 states per width. From 600px the caption never moved. The steppers stayed in place at every width. Nothing overflows at 360. Every target is at least 44px and the smallest text is 13px. Enter and Space work on the steppers, Space on the switch and Enter on reset, and the live sentence updates. I also checked dark mode.

concerns:
- Departures from the mount contract and plan: (1) warnings sit below the controls, not above them, at every width, because appearing warnings would otherwise push the steppers under the reader's finger or pointer; (2) below 600px the widget doesn't scroll to its header on a change (CURRICULUM §8 step 6), because a sandbox with its controls at the top would jump on every tap, and the plan's phone layout assumes it doesn't.
- Heights are far above the plan's estimates. Measured tallest state: about 874px at 1280, 1034px at 768, and 1520px at 600–751 (one column there, because two columns don't fit in a mount under 720px). Default state on phones is about 1290px. `index.css` raises the mount's load-time `min-height` to these values (the contract allows it). Consider this with d-05: the sandbox is last in the cut order.
- Small requests: a 0.5 GB Pod draws 3–4px and a 1 GB Pod about 12px. In my own glue, Pods under 14px drop their label and step highlight and get 1px edges. A mono line under the drawing names any service whose chips can't show their name, e.g. "dispatch (6 × 1 GB)". Pool change wanted: make `chipLinesMax` return 0 lines when the chip is shorter than one line (today it forces at least one clipped 13px line). The pool's "1 GB FREE" label also overflows its 12px box.
- Idle bar labels: labels sit directly under their segments where they fit side by side; otherwise they fall back to a three-row stacked form with swatches, e.g. at defaults at 360. ac-09 wants them "on the bar", so the reviewer may want to judge the stacked form.
- No-answer state: when `orders` is never placeable, RESERVED counts every request (45.5 GB at 13.5) and USED stays 19.5. The idle bar is replaced by "No count while a Pod fits on no node". The other Pods are still drawn packed, with a bar comparing the request to a node's room.
- CLAUDE.md note: please confirm with the user that the Ch 4 session had concluded.

relaxed:
- none
