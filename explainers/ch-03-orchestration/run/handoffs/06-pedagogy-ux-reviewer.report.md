status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/review/round-1/pedagogy-ux.md — merged round-1 review covering pedagogy, UX and accuracy. 20 findings: 1 blocking, 12 should, 7 nit. The 5 findings with a `verdict:` line are accuracy findings and ingest as A-.
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/screenshots/probe/ — d1280-*, d1280dark-*, m360-*, m360dark-*, l740-*, pg360-*, pg1280-*.

summary: Drove all three lanes forward through every gate and back, in five passes (1280×900 light mouse; 1280 dark reduced-motion keyboard; 360×740 light tap; 360 dark reduced-motion keyboard; 740×360 landscape). Wrong answers on every check at least once; no console errors. Gates, sticky canvases, scroll-back restore, short-screen inline snapshots, dark mode and the body vocabulary guard all work. The scrollytelling answers d-03. Blocking (accuracy, contradicted): C4's final layout puts a v13 copy on machine 02, which can't happen under start-one-then-stop-one (02 has 1 unit free); data.js-only fix. Top shoulds: four vs eight machines unsettled (undercuts k-02); B4's NEW ADDR hints k-03; D1 states k-01's answer above the check; k-08 has the "pick the middle" form (ac-16). Time ~17–18 min vs 15 (gate 13.1 reading; §02 ~6.5 min).

concerns:
- 768px not probed separately (gate w768 screenshot used). Reduced motion checked via CSS rules and probe runs, not timing.
- Several shoulds trace to approved-plan choices (k-08 options, C4 layout, NEW ADDR at B4, D1 wording, ToC title); the user may decide some differently.
- ac-02 (ToC shows "Its name is Kubernetes" from the top) may be moot since the course is titled Kubernetes; finding offers a retitle or relaxing ac-02.
- Accuracy: Omega wording confirmed against the Borg/Omega/Kubernetes paper; CNCF acceptance (10 March 2016) against CNCF's announcement. All other claims match facts.md; all check answers and distractors correct.

relaxed:
- none

dispositions:
- n/a (round 1)
