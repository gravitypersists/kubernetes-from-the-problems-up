status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-07-services/run/research/facts.md — 12 claims, 8 sources, all of q-1 to q-5 answered; reuses claims from Ch 3, 4 and 6 by reference
- /Users/m/workspace/k8s-course/explainers/ch-07-services/run/research/misconceptions.md — m-10 plus local-01 ("the Service checks Pod health"), local-02 ("it balances by load"), local-03 ("every service needs its own load balancer")
- /Users/m/workspace/k8s-course/explainers/ch-07-services/run/research/examples.md — 5 examples: front-desk analogy with its three breaks, a candidate cause for the "connection refused" incident, a caller's view of a `catalog` rollout, the load-balancer cost arithmetic, a customer request traced end to end
- /Users/m/workspace/k8s-course/explainers/ch-07-services/run/research/parking-lot.md — 13 one-liners tagged Ch 8/10/11/12/13/14, including the one sentence on service mesh (Istio's own definition)
- /Users/m/workspace/k8s-course/explainers/ch-07-services/run/gate/check_research.txt — check_research.py: PASS

summary: Light research. The Kubernetes pages were read from the kubernetes/website source, kube-proxy's behaviour from the kubernetes/kubernetes source, and AWS pricing on 2026-10-24. The rule cap was full, so the timing hedge and the service-mesh sentence went into a note and the parking lot. Three facts likely to surprise the audience:
- There is no Service process. kube-proxy writes forwarding rules on every node and picks a Pod at random each time a connection opens, not by load. A long-lived connection stays on one Pod.
- When a Service has no ready Pods, callers get "connection refused" at once, while the Pods can look fine. This fits `orders`, which runs a single copy: during each of Ch 5's Tuesday OOM restarts it had no ready Pod (x-02).
- The Ingress API is frozen and Kubernetes recommends Gateway API instead. Ingress NGINX, a controller about 50% of environments relied on, was retired on 24 March 2026.

concerns:
- c-06 is medium confidence. The source shows kube-proxy (in its default iptables mode) rejects traffic to a Service with no Pods. That callers then see "connection refused" is inferred from how Linux reports a rejection (connect(2)). Replacement proxies may behave differently.
- What a caller sees after using a stale Pod address (usually a timeout, sometimes a refusal) is model knowledge and is hedged in c-06's note. So is "a Deployment's own selector can't be edited after creation", in x-02. Neither is a claim.
- The AWS prices come from the pricing page's worked "US-East-1" examples, read through a fetch summary; the page text has no plain table. The page must label them as one provider's figures at a date.
- Timing ("within seconds, usually"; kube-proxy waits up to 1 s by default) is a medium-confidence note on c-05, not a separate claim.
- x-02 recommends a cause for the incident: `orders` has one copy, so while it restarts its Service has no ready Pod. This reuses established Ch 5 facts instead of inventing a new outage. The story facts are still the designer's to propose and the user's to approve.
- check_research.py counts only `m-NN` IDs as misconceptions, so it reports 1/4. The file holds 4 entries in all, which is at the light cap.

relaxed:
- none
