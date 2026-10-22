status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/plan/learning-plan.md — the plan: 8 segments, one widget (w-cluster-scrolly, two lanes), 5 figures, 4 term cards, 9 checks, 17 acceptance criteria. It also has `## Research concerns, resolved`, `## Visual grammar`, a reuse note for each later chapter, and `## Curriculum recommendations` (R1–R13).
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/plan/cut-list.md — what was left out and why, plus `## If it runs long`: 8 ranked cuts worth about 3 minutes, and a split fallback.
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/plan/mockup.html — the wireframe, with text wireframes of both lane canvases and every check written out in final form.
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/gate/check_plan.txt — check_plan.py: PASS, no warnings. All 25 claims are used.

summary: The chapter is an article built around two scrollytelling lanes on one cluster drawing. The drawing extends Ch 3's renderFleet; its files are copied into this run, and Ch 3's are not edited. Lane A, "Moving day": Ari applies "storefront: 3". The reader predicts what exists right after (k-03, m-04), then watches the record change, followed by the ReplicaSet loop, the scheduler and the node agents. Lane B replays 03:04 with one new loop, the node loop, and a hedged clock. The reader first predicts the recovery time (k-04, local-01/m-27). The page then answers Ch 1's question: "with default settings, roughly six or seven minutes; nobody". It also shows `orders` down for those minutes because it runs as a single copy. There is no hands-on widget: a "kill a node" button would give the same result every time. The plan estimates about 20.25 minutes, so no split is proposed.

Research concerns, how each was resolved:
- Orchestrator tension: it becomes the "no single conductor" reveal after lane B (k-05, m-03). This pays off Ch 3's conductor aside.
- The manifest snippet shows `kind: ReplicaSet`, shortened. Its caption says engineers usually write a Deployment, which wraps it (Ch 6).
- Every timing says "by default", and D3 covers the faster path.
- "No room" is only ever "waits" with a pointer to Ch 5; it's never called "pending".
- Cybernetics is unused. The helmsman and K8s get a short aside with a breaks line.
- x-04 (orders down for those minutes) is turned into the question "which of our services run as a single copy?"

concerns:
- Sizing: the plan is about 20.25 minutes, but Ch 1–3 each built 2–3 minutes over plan, so a 22–23 minute build is plausible. The cut order recovers about 3 minutes. If the user wants a strict 20, the split seam is after s-05; the plan explains why one chapter is preferred.
- New story facts need the user's approval at the checkpoint (R2):
  - Fennel runs in the provider's standard managed mode; Ari's team manages the nodes.
  - Moving day, with `storefront:v38`.
  - The Year 3 03:04 timeline.
  - Pod names `orders-5c8x` → `orders-q2rw`.
  - `notifications` is introduced for the crash-loop conversation, as a seed for Ch 12.
- Lane A ends in Ch 3's Monday layout, so the two Saturdays can be compared directly. The real default scheduler would probably have spread `storefront` toward node 04. The text never claims how the scheduler chooses ("Chapter 5"), and R4 hands this to Ch 5 as a hook.
- Following the style guide, Pod and ReplicaSet are capitalised. Earlier chapters didn't use these terms, so R13 asks to fix this course-wide.
- Mobile: the canvas now also holds the record and the loops, so it is taller than Ch 3's. The target is about 360px tall at 360px wide. Where it would exceed 50vh, it falls back by measurement to inline snapshots per step, Ch 3's short-viewport behaviour. On small phones, readers may get snapshots rather than a sticky canvas.
- Two statements rest on the researcher's model notes, not fetched sources, and are kept hedged:
  - replacement Pods get new generated names (c-19 note);
  - the crash-loop restart counts are arithmetic on the documented back-off (x-05).

relaxed:
- none
