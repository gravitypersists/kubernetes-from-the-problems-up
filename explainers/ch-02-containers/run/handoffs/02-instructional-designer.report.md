status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/learning-plan.md: a 6-segment plan with 1 widget (w-samecode, high complexity), 2 static figures (f-01, f-02) and 7 checks. It includes an honest minutes table, the visual grammar, 16 acceptance criteria and `## Curriculum recommendations` (R1–R9).
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/cut-list.md: what's out (c-08, x-02, x-05 and parking-lot items), plus `## If it runs long`, a 6-step cut order.
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/mockup.html: a wireframe with final check prompts, options and answers, an ASCII sketch of each widget state, figure descriptions, the cut tables, and the assets panel (no third-party assets).
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/gate/check_plan.txt: PASS, no errors and no warnings. Info: c-08 unused (it's in the cut list).

summary: The plan is a narrative article built around one contrasting case. The same code runs on Riley's laptop and on production. In state 1 the photo tool is installed by hand on each (7.0 vs 6.2), and the reader predicts a "can't reproduce" FAIL in production. In state 2 both machines run one image, which holds 6.2. The reader predicts again: the image doesn't fix the bug, it makes it fail on the laptop, before release. In state 3 a new image, v43, passes on both, and a NOT IN THE IMAGE band shows settings and data (the m-19 revisit).
- **w-rebuild:** I adapted its stage-4 aligned-row comparison into w-samecode and vetoed stages 1–3, which replay Ch 1's lesson and take about 5 min.
- **Coverage:** the prose names image, registry and container after the widget. s-05 confronts m-01. o-4 is folded into the conversation segment (d-01's merge option), where k-06's distractors carry local-02 and m-01, and k-07 carries local-01.
- **Recommendations:** local-01 should become m-23, owned by Ch 2. local-02 should become m-24, owned by Ch 2 and revisited by Ch 9.

concerns:
- The honest estimate is about 14.5 min, slightly over the 14-minute budget. Cuts 1–3 in `## If it runs long` recover about 2 min without losing an objective. All 4 objectives fit only because o-4 shares the conversation segment.
- I added new Fennel story facts that need the user's OK at the checkpoint (R4): Riley (they/them) as a Year 1 engineer; photo tool 6.2 in production vs 7.0 on Riley's laptop; images `fennel-app:v42` and `v43`; Year 1 production on one rented machine plus a staging machine.
- Tags vs digests (c-08, the researcher's most surprising fact) is cut for time and recommended for Ch 6 (R6). ac-10 stops the page from implying that a version label always points to the same image.
- I reserved 960px of widget height at 360px, estimated from the tallest state. The builder must measure it and report if it's more than 10% over. That's tall, but honest: all three states share one reserved height.
- "Kernel" isn't in the term ledger. It's glossed once in s-05; R3 proposes adding it to the Ch 2 row.
- Inferences the accuracy reviewer should check:
  - "Every release replaces containers" (k-04) and the machine-dies outcome (k-07) are inferences from c-05 and c-06, as the researcher noted.
  - The onboarding benefit is an inference from the c-01 note.
  - The A1 analogy (the pre-imaged IT laptop) is model-sourced.
- The A2 breaks note uses the processor-type limit (c-09) only as a clause, and says nothing about the Mac or ARM case.

relaxed:
- none
