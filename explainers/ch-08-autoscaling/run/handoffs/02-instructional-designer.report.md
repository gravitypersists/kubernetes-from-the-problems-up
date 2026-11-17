status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/plan/learning-plan.md — the plan: Shape with minutes table, Conventions (incl. `### Visual grammar` and Fennel's numbers), 9 segments, 9 figures + term cards, 1 lane widget, 8 checks, 16 acceptance criteria, Curriculum recommendations (Q1–Q8, R1–R7)
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/plan/cut-list.md — what's out, and the ranked `## If it runs long` order
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/plan/mockup.html — checkpoint wireframe with a "Questions for you" panel
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/plan/PROGRESS.md — working notes, marked `status: complete` (per your mid-task note; delete if unwanted)

summary: `check_plan.py` passes with no errors or warnings. Shape is option (c): one data-only lane ("Friday, 17:30: the push", 6 steps on the pooled `renderCluster`, gated) plus static figures and four committed predictions; no explorer, because an honest two-layer simulation adds more load than it teaches. The plan is about 25 minutes against the 22 budget, stated openly with a tagged cut order to about 22.5. o-4 is reshaped to scaling down and the bill; node pools move into o-1. "Twenty minutes" is corrected to about seven with nothing broken. Bottleneck case is `catalog`'s database connection limit, as Fennel's story.

checkpoint questions (recommended first):
- Q1 size: (a) one chapter at about 25 min (expect 27–29 built); (b) cuts 1–6, about 22.5, no re-plan needed; (c) split after s-05 (about 18 + 11–12).
- Q2 explorer: (a) none; (b) small "replay the push" explorer replacing f-05 (+2 min, a widget builder); (c) explorer instead of the lane.
- Q3 "twenty minutes": (a) correct to about seven minutes, nothing failed, with two hedged sentences and disclosure D4 on what stretches it; (b) keep twenty with stacked failures in the lane (+2 steps, +1 min).
- Q4 objectives: (a) o-4 = scaling down and the bill, node pools inside o-1, spot pool at exposure level; (b) keep the brief's o-4 and add back Ch 5's spot-pool check (+1 min).
- Q5 pool: (a) no pool change; a starting node uses the existing `spare` frame with `STRINGS.spare = 'Starting'`, the reading is a note line; (b) pool-05: a `meter` note and a `starting` node status, every chapter re-gated.
- Q6 story facts to approve: `dispatch` HPA target 60%, min 3, max 10; general pool min 3, max 8; node 05 given back, quiet cluster of four nodes (38 of 52 GB); the late Friday caused by an unannounced marketing push at 17:30; node 07 rented about two hours; `catalog`'s slow Sunday; Sam speaks the conversation's line; entry's "a bill that tracks traffic" reworded.
- Q7 names: (a) "the HPA" and "the cluster autoscaler"; (b) plain descriptions only.
- Q8 analogy: (a) staffing-rule aside with its breaks line (first in the cut order); (b) Ch 4's thermostat; (c) none.

concerns:
- Over budget: about 25 planned vs. 22 (d-01). I did not thin prose or drop an objective to fit; Q1 puts the choice to the user.
- The brief's o-4 text still includes node pools and the spot pool; the plan's `## Objectives` rewords it. If the user picks Q4 (b), k for the spot pool must be added (a small revision).
- The handoff's done-when names a `## Visual grammar`; I put it inside `## Conventions` as `### Visual grammar`, because kb.py only hands builders `## Shape` and `## Conventions`.
- The `spare`-frame trick for a starting node was confirmed by reading `cluster.js`, not by rendering; the widget spec tells the builder to check it on the pool test page and report rather than patch.
- Model-level assumptions for the accuracy reviewer: the 180% average reading (Pods using more than they reserve, with no processor limit on `dispatch`); the HPA reaching 9 "in a couple of quick steps"; which three `dispatch` Pods are removed on scale-down and `catalog`'s Pods settling one each on 01, 02, 06 (fiction, not explained on the page); a Pod's start at "about 1.5 minutes" (x-01 step 5 is low confidence, hedged); a copy that can't reach the database failing readiness (follows Ch 6's `/healthz` story fact).
- Scheduled scaling and faster-starting Pods are model-sourced (x-03); the plan keeps them general with no product names.
- No sourced fact covers how long a provider takes to start a node beyond "multiple minutes" (c-06); Fennel's four minutes is fiction inside that, labelled as such.
- Ch 6 and Ch 7 are still unreviewed by the user; this plan relies on their story facts (readiness check reaching the database, Service lists, m-36).

relaxed:
- time_budget_minutes 22 — planned about 25 — four objectives need it; cut order and split offered at Q1.
- CURRICULUM entry's "goal-free explorer" — replaced by a lane and predictions — argued in `## Shape`; Q2 offers it back.
- CURRICULUM entry's "twenty minutes" — proposed as about seven — research x-01/x-02; Q3 offers it back.

dispositions: none (first round)
