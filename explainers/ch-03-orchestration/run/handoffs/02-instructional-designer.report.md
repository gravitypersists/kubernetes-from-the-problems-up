status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/learning-plan.md: the plan. It has 7 segments, the w-fleet widget (high complexity, with a reuse note for each later chapter), 2 static figures, 6 checks (k-01 to k-06), 17 acceptance criteria, a minutes table, a vocabulary guard and `## Curriculum recommendations` (R1 to R13).
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/cut-list.md: what's left out and why, plus `## If it runs long` (8 cuts in order, and a split fallback).
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/mockup.html: the wireframe. It has every segment, the final wording of every check, a text sketch of each widget phase, both figures, the cut list, the cut order and the assets panel (no third-party assets).

summary: The chapter is a narrative article built around one widget. The reader does Sam's jobs by hand on 4 machines × 6 room units with 9 containers. Phase 1: place each container with one tap, then pass on addresses. Phase 2: restart a crashed container at 02:51; at 03:04 the machine running `orders` dies, and the reader re-places its containers and reconnects them. Phase 3: update storefront from v12 to v13 without the site going down. A debrief then asks the reader to list the jobs (think, then reveal), using the reader's own numbers. After that the page covers what each job costs a manager (f-01, k-03), names orchestrator and cluster (k-04 on local-03), names Kubernetes with its history (local-01), and places Docker (k-05, f-02 on m-02). It ends with the conversation question (k-06). The widget reuses Ch 2's chip and machine frame, adds chip height for size, and keeps its settings in a data file so later chapters can drive it. check_plan passes with no warnings.

concerns:
- **Sizing:** planned at 14.75 min, and the widget alone takes 4.75. Ch 1 and Ch 2 both ran over their plans, so expect about 16 min when built. Cut items 1–4 recover about 1.5 min, and 1–6 about 2.5. If it still runs past about 17.5 min, the plan says to split (move the Docker section to Ch 4) rather than compress.
- **"Fits nowhere" is designed out:** local-02 and c-03 cover containers that fit nowhere even though there's room in total. The widget's sizes make that impossible, so the 3 a.m. phase stays about the jobs rather than a packing puzzle. I recommend Ch 5 own local-02 (R2). This means c-03 and x-01 go unused.
- **9 containers, not about a dozen:** four machines side by side at 360px leave about 68px per chip, and each size unit needs at least 44px of chip height. Nine containers also guarantee no phase can get stuck.
- **New Fennel fiction** (listed in R4): the copies and sizes per service, the 02:51 crash and 03:04 machine failure, `orders` running as a single copy, storefront v12 → v13, Sam's "Nobody deploy anything" chat message, and Morgan's "could four do it?" question.
- **Scaling** is the one job the reader names but doesn't do by hand. The debrief ties it to the three storefront copies "because Friday needs them".
- **Left out as unsourced:** "K8s" and "helmsman" (useful to managers; I suggest sourcing them in Ch 4), and Docker, Inc. as a company.
- **Fixed failure targets:** the machine that fails and the container that crashes are picked by a fixed rule from the reader's own layout. The plan states the rule so builders and reviewers can check it.

relaxed:
- "about a dozen containers" (chapter entry) — 9 containers — keeps the widget usable at 360px and guarantees no phase can get stuck.
- research suggestion to make fragmentation the widget's phase-2 moment — dropped — it would add a packing puzzle and isn't guaranteed to happen; moved to Ch 5 (R2, R7).

dispositions:
- none (first round)
