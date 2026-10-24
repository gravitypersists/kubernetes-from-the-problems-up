status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/research/facts.md — 12 claims (cap 12), 4 sources, all 7 questions answered; it lists the Ch 2/4/5 claims it reuses by reference, written as "Ch N claim NN"
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/research/misconceptions.md — m-09, plus local-01 (a failed rollout rolls itself back), local-02 (health checks test correctness), local-03 (rollback undoes the release)
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/research/examples.md — x-01 3-copy arithmetic (matches Sam's three rounds in Ch 3), x-02 4 copies, x-03 surge Pod pending, x-04 crash vs. $0 `catalog`, x-05 rollback when the old image is gone or its tag moved
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/research/parking-lot.md — 16 one-liners, tagged with later chapters
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/gate/check_research.txt — PASS

summary: Light research from primary sources: the Kubernetes Deployment, probes and container-images pages (read from the kubernetes/website source) and the Argo Rollouts docs for canary and blue-green. The check script passes. Defaults are cited to their settings: maxSurge 25% rounded up, maxUnavailable 25% rounded down, progressDeadlineSeconds 600, revisionHistoryLimit 10. The docs themselves say that 3 copies means at least 3 available and at most 4 Pods, and that 4 copies means 3 to 5 Pods. Facts most likely to surprise managers: (1) at the deadline Kubernetes only reports "failed to progress" and never rolls back on its own; (2) an HTTP health check passes "solely" on the status code (200–399), and with no probe at all the result counts as Success; (3) rollback rolls back only the Pod template. It is itself a gradual rollout, and it depends on the kept ReplicaSet and on the old image still being in the registry.

concerns:
- On the entry's line "a version that crashes is stopped by health checks": strictly, a crashing container is never ready even without any probe. The readiness probe is what stops a version that starts but isn't ready (c-04, c-07 notes). The wording should be "stopped because its Pods never become ready".
- c-10 (a rollback is itself a gradual rolling update) is confidence: medium. No single doc sentence says it; it follows from three statements on the Deployment page. The docs' own rollback example rolls back a stalled rollout, so it only scales the bad ReplicaSet down.
- x-02's "start 2, stop 1" first step for 4 copies is my arithmetic from the setting descriptions, not a documented sequence. x-03 (a surge Pod pending for lack of node room stalls the rollout) is composed from several claims; the docs' list of stall causes doesn't name node room.
- The change-causes-outages statistic (Google SRE book: "roughly 70% of outages are due to changes in a live system", 2016, method not given) is in the parking lot only, because the claim cap is full. If the chapter uses it, a claim has to be swapped out to make room.
- q-2's question of what teams that ship several times a day do differently (DORA) was not researched at light depth. That part is answered only through reuse of Ch 2 and Ch 4 claims.
- The check script counts only `m-NN` misconception IDs, so it reports 1/4 although there are 4 entries. This is the same as Ch 5 and is harmless.

relaxed:
- none
