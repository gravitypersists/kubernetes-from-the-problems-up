status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/widgets/w-cluster-scrolly/data.js — `window.ClusterData`. Complete snapshots for A1–A5 and B1–B6, every reader-visible string, and a header that documents the extended snapshot format. The header also marks which later-chapter fields are drawn (`restarts`, `version`) and which are reserved but not drawn (`waiting`, nested Deployment rows).
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/widgets/w-cluster-scrolly/index.js — `renderCluster` (exposed as `window.ClusterCanvas`, with `laneLayout`, `measureReserve`, `recordRows` and `geometry`), plus the two-mount lane controller.
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/widgets/w-cluster-scrolly/index.css — styles scoped to the widget, tokens only, with per-lane load-time height reservations.

summary: I copied Ch 3's `w-fleet-scrolly` and extended it; Ch 3's files are untouched (git shows them clean). The extensions:
- node bars read `NODE · NN`, with an `↻ agent` pill and the record's view of the node (UNKNOWN);
- Pods are Ch 3's chip inside an inset ink ring;
- NOT STARTED Pods are dashed with no fill and no lamp;
- the record panel (c4) computes its marks (filled, hollow dashed, `?`) and row words (`SHORT n`, `n RUNNING · n UNKNOWN`) from the snapshot;
- loops are c3 pills with a WATCHING / DOING lens line;
- the DOWN body shows reality, and the bar shows what the record believes;
- the canvas also carries the CUSTOMERS line, the connection note and the clock kicker.

The controller collects both mounts and sets `__dInit` on the second. It unlocks gates on `didactician:check-commit` (any option) and never re-locks them. Every state of a lane reserves the same rows, measured by rendering each state, so a lane's canvas never changes height.

How I checked it:
- `verify.mjs --widget` gives PASS on every check, with no console errors.
- I drove both lanes at 360, 390, 768, 1024 and 1280 wide, in light and dark, and looked at every step's screenshot. No overflow inside the drawing or on the page; the smallest canvas text is 13px; there are no SVG or arrows; there are no hard-coded colours.
- Before k-03 is committed, scrolling to A3 keeps the canvas on step 1/5 with A2–A5 locked; a wrong answer unlocks them. Scrolling back from A5 to A2 restores `storefront WANT 3 SHORT 3`. Lane B stays locked until k-04, separately from lane A.
- Under reduced motion, transitions are instant.

concerns:
- **Canvas heights versus the plan.** At 360 wide, lane A is 390px and lane B 432px tall (plan target ≤ 360). On a 360×740 phone both lanes, and on a 390×844 phone lane B, use the plan's measured fallback (`data-cs-fit="inline"` on the mount), so each step shows its own snapshot. At 412×915 both lanes stay sticky. At 768×900 lane A is sticky and lane B falls back; on 768×1024 tablets both should fit. On desktop, lane B is 549px, so my CSS reserves 552px for it rather than the page's 540px.
- **Contract extension.** The fallback is a `data-cs-fit` attribute on the mount, styled in my CSS. On phones, inline snapshots bleed 10px into the step card's padding, so four node columns fit without cutting `payments`.
- **Changes from the plan's draft canvas text.** The lens lines were shortened so they don't wrap on phones (A3 "storefront: wants 3, has 0"; A4 drops "01, 01, 02"; B4 "Pods wanted vs. recorded"; B6 "gets the image, starts it"). The step text still says what was cut, including the image download. A one-line NOT STARTED Pod (B5's `dispatch`) reads "NOT YET". Row order is orders, payments, dispatch, storefront throughout, because storefront's row is new in A2.
- **Agents pill.** When node agents act, an "↻ agents · 01, 02" pill joins the loop row so the lens line has an actor. In B6 at 1280, the four pills don't fit on one row, so only the acting pill shows; on phones only the acting pill ever shows, as the plan says.
- **No `aria-live` region.** The canvas `aria-label` follows the active step and the step text carries the meaning, per the plan. A live region would repeat the text while scrolling.
- **For the accuracy reviewer.** "Removes node 03's Pods from the record" (B3) simplifies what happens: the Pods are marked for deletion, and the ReplicaSet loop stops counting them. I kept the wording because the handoff requires it.

relaxed:
- plan size "≤ 360px tall at 360px" — about 390 / 432px — four node columns, the record, the lens and the notes don't fit in 360px with 13px text; the plan's own measured fallback applies.

dispositions: none (first round)
