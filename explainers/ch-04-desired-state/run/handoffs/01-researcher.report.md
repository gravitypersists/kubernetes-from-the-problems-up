status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/facts.md — 25 claims from 15 sources. q-1 to q-10 are all answered, and each has a "partial coverage" note.
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/misconceptions.md — m-03, m-04, m-05, m-06 and m-27, plus local-01, "self-healing is instant", proposed as a catalog entry. The check script counts 5 because it doesn't parse the `local-` ID.
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/examples.md — 7 examples: thermostat (the docs' own analogy), goals vs. task lists with where it breaks, the 2→5→3 level-based example, the 03:04 timeline with default timings, crash-loop arithmetic, helmsman, and Ch 3's jobs mapped to loops.
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/parking-lot.md — 18 one-liners, each tagged with the chapter it belongs to.
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/gate/check_research.txt — check_research.py: PASS (claims 25/25, sources 15/15, examples 7/8, misconceptions 5/6, no unresolved questions).

summary: Almost all sources are primary. I read the kubernetes.io concept pages as their Markdown source, so the quotes are verbatim. The other sources are the Kubernetes API conventions, the GKE and EKS docs (AKS cross-checked in notes) and twelve-factor. Ch 2 and Ch 3 claims are reused by reference. Three facts are likely to surprise the reader:
(1) The Kubernetes overview itself says it "eliminates the need for orchestration" and that "Centralized control is also not required". That is a direct counter to m-03.
(2) A dead machine's pods are replaced after about 6 minutes with default settings, not instantly. The 50 s grace period plus the 5-minute toleration come before replacement starts.
(3) A pod is never moved. It is replaced by a new pod with a new identity and a new address, and a crash-looping container is restarted in place forever, with the wait between restarts capped at 5 minutes.

concerns:
- **Orchestrator tension with Ch 3.** Ch 3 called Kubernetes an orchestrator. The overview page (c-09) says it isn't "a mere orchestration system". I suggest the designer frame this as: an orchestrator in the sense of the jobs it does, but not a conductor following a score. That makes the tension the m-03 reveal rather than a contradiction.
- **The `replicas: 3` manifest.** The docs' own example uses `kind: Deployment`, a Ch 6 term, and they advise against using ReplicaSets directly (c-12 note). The designer must choose: show a Deployment snippet and say "we'll name this kind in Chapter 6", or show a ReplicaSet as a simplification.
- **Timings are upstream defaults.** I found no provider statement about whether EKS, GKE or AKS tune them. "Roughly six minutes" should be hedged as "with default settings". It can be faster when the cloud reports the VM gone (c-11 note). The note that older releases used 40 s is from memory, marked as such.
- **No room is medium confidence.** "No room → the pod waits" (c-15) combines several sources rather than quoting one. "Pending" must stay Ch 5's word.
- **Cybernetics link left out.** The connection between "Kubernetes" and "cybernetics" is unsourced (x-06, parking lot). Use it only if it gets sourced.
- **Ch 3's layout (x-04).** I took it from CURRICULUM §3: machine 03 = orders + dispatch, so in Ch 3's units 1 of 1 orders and 1 of 3 dispatch copies are lost. `orders` with one copy is down for those minutes.

relaxed:
- none
