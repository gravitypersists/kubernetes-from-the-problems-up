status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/plan/learning-plan.md — the plan: shape and minutes table, 10 segments, 7 figures plus 4 term cards, the visual grammar, 1 widget (low complexity, data only), 7 checks, 15 acceptance criteria, curriculum recommendations R1–R11 with checkpoint questions Q1–Q4
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/plan/cut-list.md — what's out (22 items) and `## If it runs long` (8 ranked cuts, about 2.5–3.25 min)
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/plan/mockup.html — the wireframe: real headings, final check prompts, options and answers, a description of every figure, the cut tables, an empty assets panel
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/gate/check_plan.txt — PASS, no warnings

summary: The chapter is a narrative article that follows one Thursday of `catalog` releases.
- **The lane.** There is one scrollytelling lane: lane R, the 10:15 release from v62 to v63, in 5 steps on the pooled renderer, with the step after the key moment locked until the reader answers k-02 ("waits until the new Pod is ready").
- **The core contrast.** k-04 asks the reader to predict what a v64 that crashes and a v64 that shows $0 would each do. Fig. 03 then shows both outcomes, drawn from the lane's own data file and hidden until the reader answers.
- **Rollback.** It is shown with static figures, not a second lane: a timeline (Fig. 04) and the record at three moments (Fig. 05), where the kept v63 ReplicaSet fills again. Ch 4's level-based behaviour is now in the main text.
- **Size.** About 22 minutes planned; earlier chapters suggest it will build at 23–25. I recommend one chapter rather than a split.
- **Widgets.** None needs its own builder. The only widget is data-only, so the page builder can build it.

concerns:
- **Pool additions are needed before the build (Q3).** The pooled renderer can't currently draw a Deployment row over ReplicaSet rows, a NOT READY status, or Pods coloured by version. The plan specifies three optional fields, off when absent, which leave Ch 4 and Ch 5 unchanged; the orchestrator has to schedule them and re-gate every chapter. The fallback without them (b) breaks the rule that old and new versions, and ready and not ready, must look different.
- **Version colours.** v63 is always `c2`. The "other" version in each drawing is `c5`, which is v62 in the lane and v64 later; the two never appear in the same drawing, and every chip prints its version. The page builder should check that `c5` chips read clearly beside `bad` status words.
- **Assumptions about the story.** `dispatch` still runs 6 copies weeks after Ch 5, so the Pod that waited is still on node 05. The lane draws only nodes 05 and 06, with a note saying the other three aren't drawn. The `catalog` story facts are invented and listed in R2 for approval (Q2).
- **Rollback wording is hedged.** The research rates "rollback is a gradual rolling update" (c-10) as medium confidence. The plan says "with the default settings, the same gradual way" and never quotes a documented event sequence.
- **k-03's "no room" case (x-03) is model reasoning,** not quoted behaviour. It is stated as a consequence of the settings with three copies.
- **Minutes figures.** The cut order recovers about 2.5 minutes from cuts 1–6, and about 3.25 with cut 8, which isn't recommended. The plan's Shape text rounds this to "about 3".
- **The analogy is optional.** The entry names no analogy. I included a shift-handover aside with a "where this analogy breaks" line (Q4) and put it first in the cut order.

relaxed:
- d-01 (20 minutes) — the plan comes to about 22 minutes, without compressing the prose — every objective, the entry's pick-ups and the course conventions don't fit in fewer ideas; the cut order lets the user trim after the build.

dispositions:
- none (first round)
