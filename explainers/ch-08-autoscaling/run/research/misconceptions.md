# Misconceptions

Catalog IDs from CURRICULUM.md §6 where they exist; new ones are `local-NN` (to propose at the checkpoint). Capped at four at light depth: m-11 (this chapter's) plus three new. Relatives m-28, m-29, m-31 and m-36 are handled as retrieval, not new entries.

### m-11
objective: o-2
misconception: Autoscaling is instant and fixes any slowness: when load rises, the system adds capacity right away, and whatever was slow gets fast.
why_tempting: "Auto" suggests no waiting and no judgment, and demos scale up within seconds. The HPA does decide fast (it looks every 15 seconds and can add copies at once), so the first part of the belief is nearly true; the delay hides in what follows. Same family as m-28 (self-healing is instant).
counter: c-06, c-07, c-08, c-11, c-12
source: CURRICULUM.md §6 m-11. The counters are the AWS guide's "Nodes can take multiple minutes to become available", the HPA page's dampening of scale-ups for Pods not yet ready, and the database limit.

Notes for the designer: two separate claims. Instant: the decision is quick, the Pods and the node are not (x-01), and a Pod joins its Service's list only once ready (Ch 7). Fixes any slowness: only if the slowness is lack of Pods and the measurement shows it (c-02, c-12). Retrieval: m-28 (Ch 4), m-31 (pending: here is who ends the wait), m-36 (a new Pod may get little traffic until long-lived connections reopen; Ch 7 by reference).

### local-01
objective: o-1
misconception: The cluster adds machines when the machines get busy (high processor use on the nodes triggers it).
why_tempting: It's how a thermostat or a car's cooling fan works, and dashboards show node use; the HPA does watch use, so people assume both layers do. It rhymes with m-29 (the scheduler places by least busy).
counter: c-04, c-10
source: model (the belief); the counter is the FAQ's "CPU-usage-based (or any metric-based) cluster/node group autoscalers don't care about pods when scaling up and down" and AKS's "scales up based on pending pods rather than CPU or memory pressure on nodes" (https://learn.microsoft.com/en-us/azure/aks/cluster-autoscaler-overview)

Notes: the loop that adds nodes watches for Pods with no room, so a node can be 95 percent busy and nothing is added, and a cluster of nodes that look idle can be "full" by reservations. Nodes are removed on requests too (c-10). The fair part: the HPA does start from a measurement of use, so the first layer is metric-driven and the second is not.

### local-02
objective: o-4
misconception: With autoscaling we only pay for what we use, so the bill tracks traffic.
why_tempting: The chapter entry's own "a bill that tracks traffic"; cloud marketing says "pay as you go"; copies go down when traffic does.
counter: c-05, c-09, c-10
source: model (the belief); evidence for what actually happens in Ch 5's Datadog and CNCF claims (reused by reference): idle room, mostly unreserved nodes and oversized requests, is most of container spend

Notes: standard mode bills nodes (Ch 5), and nodes leave only when emptied: HPA window 5 minutes, node unneeded 10 minutes, nothing movable blocks, and the minimum copies and node-pool minimums are a floor. Padded requests keep nodes "needed". The bill follows traffic as far as nodes are actually removed, with a lag after the peak. Fully managed modes that bill per Pod are the exception (Ch 5 and Ch 14 parking lots).

### local-03
objective: o-3
misconception: Once autoscaling is on, we don't need to plan capacity: the system knows how much traffic we have and will scale to match it.
why_tempting: "Auto" again, plus the product pages. The autoscaler's output is a number, so it feels like it knows demand.
counter: c-01, c-02, c-03, c-05, c-12
source: model (the belief); the counters are in the docs: the HPA knows one measurement and a target (c-01, c-02), a person sets the maximum copies and the pool's maximum nodes (c-03, c-05), and something outside the Pods (a database limit, a quota, a provider's rate limit) caps what scaling can achieve (c-12)

Notes: the maximum is also a cap on spend and an upper bound on what a bug or an attack can cost; what to ask: "what are the minimum, maximum, and target, who chose them, and what happens at the maximum?" (c-03: the HPA stops there; `ScalingLimited`).
