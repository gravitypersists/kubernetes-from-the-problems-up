status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/index.html — the full page: hero, ToC, s-01 to s-07, D1–D8, TERM 01–03, f-01, f-02, k-01 to k-09, the §02 scaffold and mount, and the mount contract as a comment above the mount
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/assets/page.css — Ch 2 (b661656) treatments plus new ones: cast strip, .cp-more disclosures, .cp-term (and --payoff), .cp-cluster, f-01 table/cards, f-02 (.dk), §02 scrolly layout (.fs-*)
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/assets/page.js — Ch 2's check behaviour plus Ch 1's think-then-reveal; every commit dispatches `didactician:check-commit` and sets data-committed
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/assets/tokens.css — byte-identical copy of design/control-plane/control-plane.css
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/assets/{components.css,toc.js,widget.js} — kit copies
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/widgets/manifest.json — w-fleet-scrolly: segment s-02; files data.js, index.js, index.css; no cdn and no data origins
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/gate/page-round-3.json — latest gate: PASS; the only warning is that w-fleet-scrolly is pending
(The report's first artifact line named a wrong path, /Users/m/workspace/explainers/…, and corrected itself on the next line; orchestrator note.)

summary: Built every segment, disclosure, term card, figure and check in the plan; check text verbatim from the mockup. New prose follows the precise-language rules and vocabulary guard (scan found no guarded terms). Kubernetes first appears in §05; orchestration/cluster in §04 apart from the fixed title. f-02 is static HTML from page-level .cp-machine/.cp-ctr/.cp-img/.cp-cluster classes, reusing Ch 2's typographic → / ↓ arrows. Fixed after screenshots at 360/1280: payoff card blueprint ground, indented check options, narrow f-01 card headers on mobile. Probe confirmed checks commit, show feedback, dispatch the event and stamp data-committed. Reading: gate measures 11.4 min of text excluding widget step text; estimate ~15.5–16 min with step text and checks.

MOUNT CONTRACT (w-fleet-scrolly; full version is the comment in index.html):
- Mount: `div[data-widget="w-fleet-scrolly"].d-wide.fs`, initialised with Didactician.widget; three `.fs-lane[data-lane="A"|"B"|"C"]`, each with `h3.fs-lane__title` and `.fs-lane__grid` holding `.fs-canvas[data-canvas]` and `ol.fs-steps > li.fs-step[data-step="A1".."C4"]`; step ids match data.js keys.
- Widget renders only into: `[data-canvas]` (one per lane; renderFleet; role="img"; aria-label from active step's ariaLabel); `[data-step-snap]` in every step (always rendered; page CSS shows it only at max-height 559px, where the canvas is hidden); `[data-step-text]` (step text from data.js).
- Page-owned, widget leaves alone: .cp-check cards (k-02 in B3, k-03 in B4, k-04 in C1), D2 (A1) and D3 (B4) disclosures, `p.fs-step__lock[data-step-lock]`.
- Controller toggles on .fs-step: `.is-active` (top crosses 55% viewport, IntersectionObserver); `.is-locked` (page CSS hides content, keeps height, shows lock line, dashed border); `.is-unlocked` (added once; page CSS fades in).
- Gates: `data-gate` = space-separated check ids. B4 waits on k-02; B5, B6 on k-02 and k-03; C2, C3, C4 on k-04. Unlock on `didactician:check-commit` on document (detail {id, option, correct}; any option unlocks); at init also count `.cp-check[data-committed]`. Gates never re-lock; a locked step can't become active; canvas holds the last unlocked state.
- Heights (page CSS): ≥900px canvas left (11fr/9fr), sticky top var(--sp-4), 420px reserved. <900px canvas sticky top, opaque, z-index 2, min(420px,50vh) at 600–899px and min(316px,50vh) under 600px. Step cards ≥ 40vh.
- Motion ≤ 300ms, instant under reduced motion, no autoplay.

concerns:
- Plan's §02 layout line says "B5 on k-02, B6 on k-03, C3 on k-04"; its widget spec and ac-05/ac-06 say B4, B5, C2. Built to the widget spec and acceptance criteria.
- Also locked later steps in the same lane (B5, B6, C3, C4), because B6's text gives away k-02/k-03 and C3's gives away k-04. Markup-only change if unwanted.
- No-JS: ac-07 can't be met as specified (step text and snapshots in data.js). Without JS the slots stay empty, nothing locks, and a `<noscript>` line says §02 needs JavaScript (only text added beyond the plan).
- Plan says f-02 shares renderFleet (ac-08); followed the handoff (static HTML).
- ac-01 forbids numbers on symptoms but plan wording was "paged twice this month"; wrote "more than once this month".
- Wording changes for exact referents: "Sam's four machines in §02 would make a small one"; D6 "as of 2016, when the designers of Borg and Kubernetes described both in a paper" (a 2020 Borg paper exists); conductor breaks line "doesn't work from one place giving every cue"; f-01 replacing row "takes its containers down".
- Added lane h3 titles inside the mount (excluded from ToC rail).
- Added trailing space inside each "§ NN" span for ToC readability.
- Reading time: plan 14.25, estimate ~15.5–16.

relaxed:
- ac-07 no-JS clause: lane snapshots and step text not visible without JS.
- ac-08 "renderFleet shared with f-02": f-02 is static HTML, per the handoff.

dispositions:
- none (first build)
