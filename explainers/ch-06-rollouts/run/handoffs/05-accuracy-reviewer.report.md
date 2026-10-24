status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/review/round-1/accuracy.md — round-1 (only round) accuracy review: 1 blocking, 3 should, 3 nit

summary: I checked every factual statement against facts.md and against the Kubernetes docs source (deployment.md and images.md from kubernetes/website, fetched today). That covered the prose, f-01 to f-07, D1–D4, the term cards, the sources footer, k-01 to k-07 (keys and all feedback), lane R1–R5, FIGURES.crash/shipped, CH06_LOOPS and CH06_INCIDENT. The following all hold: the defaults and rounding, at most four Pods and at least three ready at every lane step, the free-GB numbers, the scheduler choices (they match the default scoring), the stalled rollout with no automatic rollback, the 600 s deadline, readiness vs. liveness, the status-code rule, the kept ReplicaSet, undo vs. file revert, tags vs. digests, canary/blue-green, scope, and the Ch 3–5 story facts.

The one blocking finding is in §07: "Going back works only as far as the record reaches" (ten kept ReplicaSets). That is false for the file-revert rollback Riley used, and it contradicts §08's "about a month" for a team that ships 2–3 times a day.

The three `should` findings:
- "A container that crashes never becomes ready, with or without a check" is an absolute; the docs' definition of minReadySeconds shows a Pod can be ready and then crash.
- "Each new Pod downloads [the image] when it starts" is wrong by default: a version tag gets IfNotPresent, and nodes 05/06 still had v63.
- The definition "removing old Pods only as new ones become ready" contradicts the page's own D2 (four copies).

concerns:
- I ruled A-01 blocking rather than should because it touches o-3 and makes two of the page's numbers contradict each other; the fix is a two-sentence rewrite.
- Lane R5 puts the third v63 Pod on node 05, which is a near-tie under default scoring; the page gives no reason for it, so I didn't flag it.
- No acc-r1 probe screenshots were taken. I used the existing probe screenshots and read the data files directly.

relaxed:
- none
