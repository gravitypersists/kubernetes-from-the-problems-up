status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/round-1/pedagogy-ux.md — round-1 pedagogy and UX review: scores, evidence for each acceptance criterion, a time estimate, and 12 findings (0 blocking, 6 should, 6 nit). It parses with findings.py.
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/screenshots/probe/pux-*.png — 79 probe screenshots: the widget at 1280 light, 390 light, 360 dark with reduced motion, keyboard runs at 1280 and 390, the page checks and figures at 390 light and 360 dark, and the stage-4 tables at 768, 1280 and 360.

summary: I drove w-rebuild through all four stages by mouse, touch and keyboard, at 1280, 768, 390 and 360, in both themes and with reduced motion. I picked the tempting wrong answer once on each check, then used "Try again" and "Start over". I also measured where the content below the widget sits after every interaction.

All 18 acceptance criteria are met. Two have caveats: ac-09, where the landing position hides the effect, and ac-14, where f-03's timeline doesn't match. Misconceptions m-19 to m-22 are handled well, and the page follows the style guide closely.

The three most important issues:
1. In all five single-answer checks the correct option is the longest and the only hedged one, so the checks can be gamed.
2. k-02 asks what's needed "to order and get a confirmation email", then marks the photo tool and the log-cleanup job as missed.
3. On phones, "Next: rebuild it" lands with the new machine below the fold, so the first "Run step" changes something off screen.

Other should findings:
- f-03 restores a Monday snapshot on Friday, which contradicts "a snapshot every night" in the prose and k-07.
- The ledger term "single point of failure" appears only in k-06 option B's feedback, never in the prose.
- The "why" and "All six notes" disclosures have no disclosure marker, so they look like static labels.

Time: about 17 minutes (15–19) against the 12-minute budget. The gate's 11.3 minutes counts prose only. The biggest costs are w-rebuild (about 4.5–5 min), s-06 (about 3), s-04 (about 2) and s-01 (about 2). The cut list's first three items would save about 1.5 minutes. The hero and rail say "12 MIN".

concerns:
- Two of the should findings (option-length balance, and the k-02 prompt) touch check text that was approved as final at d-03. They need the user's agreement at the next checkpoint; the builders can't just fix them.
- The f-03 timeline mismatch is partly an accuracy question, so I flagged it for the accuracy reviewer too.
- Not reviewed (accuracy isn't my job), noted for the accuracy reviewer: the k-02 feedback says items "never show up in the code", which is shaky for libraries, since the code usually lists them. Also, the nightly log-cleanup job is filed under CONFIG and diagnosed as "config".
- I wrote my own Playwright drivers in the scratchpad, using the skill's pw.mjs, instead of probe.mjs alone, because I needed dark mode, reduced motion and position measurements.

relaxed:
- none
