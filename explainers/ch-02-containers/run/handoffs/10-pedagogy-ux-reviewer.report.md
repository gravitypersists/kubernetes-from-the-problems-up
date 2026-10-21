status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/round-2/pedagogy-ux.md — the round-2 closure review, in the review format
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/screenshots/probe/r2-*.png — probe screenshots: the widget at 360/390/768/1280 in light and dark, every state, wrong and right picks; k-05 at 360 and 1280

summary: I re-reviewed the revised Ch 2 page against P-01 to P-05 with custom Playwright drivers built on the skill's lib/pw.mjs. I drove the whole widget at 360, 390, 768 and 1280, in light and dark, picking the tempting wrong answer first each time. I also did a keyboard pass at 360 and 1280.
- **Closed:** P-01 (Tab, Tab now reaches Next at every width), P-03 (k-05 C no longer echoes s-04), P-04 (page checks now move focus to their feedback) and P-05 (the code chip stands out on the image band, and each category shows once).
- **Still open:** P-02.
- **Regressions:** none. ac-03 to ac-07 still hold. The no-reflow rule holds at every width, there is no overflow and no console errors, and the gate passes with 11.9 min of reading. I raised no new findings.

concerns:
- P-02 (should, still open). The state-3 exit link works, but the widget is still 1682px tall at 360 (was 1742; the plan says 960). States 1 and 2 show about 470–550px of empty frame under the check before the reader commits. The builder can't close this without changing ac-07, so the user or designer has to decide. The choices are (1) accept it as is, or (2) relax the shared-height rule below 600px only, where `scrollIntoView` already moves each new state's header to the top. I recommend (2), and the decision should cover the course, because Ch 1's w-rebuild has the same problem.
- I didn't run `findings.py ingest`. That's left to the orchestrator.

relaxed:
- none
