status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/index.html — the full Ch 4 page: hero, ToC, s-01 to s-08, D1–D7, TERM 01–04, f-01 to f-05, both asides, k-01 to k-09, the two lane scaffolds, sources footer, and the mount contract comment above the first mount
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/assets/page.css — Ch 3's page.css with the f-01 jobs table and f-02 Docker rules removed. New: the grammar (.cp-rec, .cp-loop, .cp-pod), f-01 to f-05, the term-card mono line, and the .cs-* scaffold. Tokens only, no raw colours
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/assets/page.js — Ch 3's check script (dispatches `didactician:check-commit`), plus `CH04_LOOPS` and the f-04 renderer, plus the f-05 connectors (arrow.js)
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/assets/{tokens.css, components.css, toc.js, widget.js, arrow.js} — tokens.css is byte-identical to design/control-plane/control-plane.css. The other files are copied from Ch 3 and the kit
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/widgets/manifest.json — lists w-cluster-scrolly (files data.js, index.js, index.css), both mounts, sizes, no CDN or data origins

summary: Built every plan segment from Ch 3's skeleton. The prose is written new from the plan's intents. Check prompts, options and feedback are verbatim from the plan. All figures are HTML/CSS and don't depend on the widget. f-04 is rendered from `CH04_LOOPS`. f-05's two-headed connectors are drawn by arrow.js from measured positions: every one ends on the API SERVER bar, and none joins two loops. Every figure re-lays out under 600px and was checked at 360, 768 and 1280, in light and dark. `verify.mjs --phase page` round 2 passes: all checks PASS, only `pending` (3 widget files). The gate reports ~16.9 min of text only, which includes the footer but not the lane step text that is still pending. My honest estimate including both lanes, check thinking and figure time is about 21–23 min (plan 20.25). Over budget? Nothing was trimmed; cut-list.md has the cut order.

Mount contract (also in the comment in index.html):
- **Two mounts.** Both are `[data-widget="w-cluster-scrolly"]` with class `d-wide cs`:
  - `data-lanes="A"` is in s-04 (steps A1–A5).
  - `data-lanes="B"` is in s-05 (steps B1–B6).
- **The second mount isn't passed to init.** `Didactician.widget` passes only the first mount. The controller must collect both lanes itself (`document.querySelectorAll('[data-widget="w-cluster-scrolly"] .cs-lane')`) and set `__dInit` on the second mount. Widget CSS scoped under `[data-widget=…]` applies to both.
- **Lane B's start state.** Lane B starts from A5's state.
- **Slots and classes.** Same as Ch 3 with the prefix `.cs-*` in place of `.fs-*`:
  - `.cs-lane[data-lane]`, `.cs-canvas[data-canvas]`, `li.cs-step[data-step]`, `[data-step-snap]`, `[data-step-text]`, `p.cs-step__lock`.
  - The widget toggles `.is-active`, `.is-locked` and `.is-unlocked`.
- **Checks and gates.** k-03 sits in A1 and k-04 in B1. `data-gate="k-03"` is on A2–A5 and `data-gate="k-04"` on B2–B6. Unlock on the document event `didactician:check-commit` `{id, option, correct}`, and treat `.cp-check[data-committed]` as committed at init.
- **Reserved canvas heights:**
  - 540px from 900px wide;
  - min(480px, 50vh) at 600–899px;
  - min(360px, 50vh) under 600px (canvas ≤ 50vh).
  - Under 560px viewport height, the per-step snapshots show instead of the canvas.
- **Text.** All step text and canvas strings live in data.js; the plan's `shows:` has the draft wording.

concerns:
- **Widget-phase gate covers only lane A.** `verify.mjs --widget` scopes to the first mount, so lane B is checked only by the page-phase run.
- **f-05 departs from the plan's mobile spec so that no connector crosses another part:**
  - narrow layout: the loops are in a staircase, Ari sits above the band, and the four nodes are one row, not 2×2;
  - wide layout: Ari sits level with the bar in the right column;
  - all widths: the agent pill sits above the node label;
  - the Pod marks are unlabelled, with one "Pods" label.
- **Term card placement.** TERM 02 follows f-03, per the plan's s-03 content order, so it isn't directly after its `dfn` (ac-11).
- **Additions beyond the plan's wording:**
  - h3 subheads in s-06 ("What 'disposable' asks of the app", "Self-healing, honestly") in place of bold labels;
  - COMPARE uses the ink chip style;
  - the f-02 comment is split over two lines to stay ≤ 28 characters;
  - a one-line lead-in before Ari's quote: "Ari mentions it to Jordan."
- **For the accuracy reviewer:**
  - D7 rests on the plan's parking-lot source, not on a facts.md claim;
  - twelve-factor is called "a widely used checklist", which goes slightly beyond c-20;
  - "self-healing" is introduced as "You'll hear… called", because "vendors call it" isn't sourced;
  - the footer names the GKE, EKS and AKS docs as sources; the main text keeps providers generic.
- **Feedback formatting.** Feedback in `data-fb` is plain text, so service names lose their code styling, as in Ch 3.
- **f-04 on phones** stacks to about 1000px at 360 (the plan estimated 640).

relaxed:
- plan f-05 "nodes 2×2 under 600px" — replaced by four nodes in a row — vertical connectors from the lower row would cross the upper row

dispositions: none (first round)
