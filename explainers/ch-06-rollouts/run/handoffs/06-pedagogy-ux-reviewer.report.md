status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/review/round-1/pedagogy-ux.md — the round-1 pedagogy/UX review. It has 10 findings: 1 blocking, 4 should, 5 nit. It also covers scores, a reading-time estimate and every acceptance criterion with evidence. It parses with findings.py.
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/screenshots/probe/pux-r1-* — 107 probe screenshots. Widths 360×740, 390×844 (dark), 768×1024 and 1280×900, plus short viewports 390×500, 1280×520 and 1024×700. They cover the lane forward and back, every check (each answered wrong once), both gates locked and open, f-01 to f-07, k-07 revealed, and full pages.

summary: I drove the whole page with my own Playwright script (lib/pw.mjs) at 360, 390 (dark), 768 and 1280, plus three short viewports.
- **What works:**
  - The lane: the scene is set up before it, the k-02 gate holds and unlocks on a wrong pick, and scrolling back restores R1 exactly. The inline fallback switches on at 360×740 and at short heights.
  - No overflow anywhere; tap targets are at least 44px; text in the drawings is at least 13px; dark mode is intact.
  - The page uses only course tokens and loads the shared code from `pool/`.
  - f-03 makes the core contrast land.
  - The misconceptions (m-09, local-01 to 03), the handover analogy with its "where it breaks" line, the f-07 loop row and the Ch 2–5 callbacks are all handled well.
- **Acceptance criteria:** 13 of 15 met; ac-09 not met, ac-14 partly met.
- **Most important issues:**
  1. Blocking: k-04, the chapter's core prediction, is given away before the reader answers. The opening summary under the title says one release "showed every price as $0.00 for six minutes". k-04's own wording says the $0 version passes its readiness check, so the tempting wrong answer contradicts the question. The review gives replacement wording.
  2. Should: while the two gated blocks are locked, they leave 1,990–1,998px of blank page at 360 and about 1,280px at 1280. Also, the analogy's "where it breaks" line sits below the k-04 block and stays visible before the reader answers, which gives the answer away.
  3. Should: next to k-02, the drawing shows "DOES · waits", which is k-02's answer. In R2 and R3 the highlighted loops also don't match the step text. Separately, f-04's rows hint at k-06's answer.
- **Reading time:** about 27 minutes (range 25–28), against 20 budgeted and 22 planned. The automated check measures 21.6 minutes, text only. The review routes this to the cut list, not to prose trimming.

concerns:
- ac-05's wording ("not removed in the step its replacement becomes ready or earlier") conflicts with the plan's own R3, where a v63 Pod becomes ready and a v62 Pod is stopped in the same step. I judged ac-05 met in intent and noted the wording problem in the plan.
- The §07 heading ("…six minutes at $0") also hints at k-04's answer, but it is in the approved plan, so I made retitling it optional.
- The gate fix says to hide locked content entirely rather than reserve its height. I based this on CURRICULUM §8 step 6, where no height is reserved under 600px, and on the fact that the content opens below the reader. The lane's locked steps are left alone because they follow the Ch 4–5 convention.

relaxed:
- none
