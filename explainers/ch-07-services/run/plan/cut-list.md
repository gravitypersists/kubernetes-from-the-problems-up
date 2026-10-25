# Cut list: Ch 7, Finding each other: services and traffic

Researched or considered, and deliberately left out of the main text. Every research claim (c-01 to c-12) is used by a segment, so nothing here is an unused claim; the items are examples, parking-lot lines and design options. "Cost to add back" is what it would take in this chapter.

| What | Why it's out | Cost to add back |
|---|---|---|
| The entry's hands-on widget (Pods come and go; the reader keeps an address list current by hand, then a Service takes over) | The pain was felt once already (Ch 3's k-03, NEW ADDR); typing or tapping addresses is the busywork Ch 3's checkpoint rejected; k-02 → f-01 gets the same surprise from one committed prediction | A widget builder (complexity high) and about 2 min of reader time; it would replace k-02 and f-01 (checkpoint Q6) |
| A second lane for Tuesday's incident (the `orders` list emptying and refilling, step by step) | One moment and its recovery; f-04's two snapshots from the same data file show it | 3–4 steps on the same data file; about 1.5 min |
| The Deployment group in the lane's record panel (Ch 6's ReplicaSet rows beside the Service block) | Keeps the Service's list the only new element on a canvas the reader knows; the step text names the Deployment loop | Data only (Ch 6's fields); about 0.25 min of extra reading per step |
| A selector typo that matches no Pods, as a Fennel event (x-02 alternative a) | A new outage when an established one fits; it teaches a configuration slip more than how Services behave | It sits in D5; a dated story fact and a paragraph in s-06 |
| A caller that bypassed the Service with a Pod's address, as a Fennel event (x-02 alternative b) | Fits "connection refused" poorly (usually timeouts) and would mean someone at Fennel went around the Services | One sentence in D5 already covers what such a caller sees |
| Which caller sees a timeout and which a refusal, in detail | Model knowledge, hedged in c-06's note; not a claim | A disclosure in s-06, with a research pass to source it |
| Terminating Pods: if every listed Pod is shutting down, proxies may still use them (c-04 note) | Pedantic; the main text's "a Pod told to stop leaves the list at once" is true by default | One sentence in a disclosure in s-04 |
| `publishNotReadyAddresses` (listing Pods that aren't ready) | Rare engineer setting | One clause in s-04 with "by default" |
| kube-proxy's modes (iptables, nftables, the deprecated IPVS) and its 1-second batching (`minSyncPeriod`) | Engineer territory; network internals are out of scope; timing is said as "within seconds, usually" | A disclosure in s-05; Ch 14 (upgrades) |
| How a Service's address reaches a node from outside (node ports, the cloud-controller-manager) | Out of scope (networking internals); s-07 says the provider's machine passes connections on | A disclosure in s-07 |
| Long-lived connections in depth (a new Pod gets little traffic until connections reopen) | One disclosure (D4) is enough here; Ch 8 (scaling) and Ch 13 (mesh) need it more | Ch 8 entry (R5) |
| Session affinity, topology-aware routing, `internalTrafficPolicy` | Engineer settings; cross-zone charges are Ch 14's | Ch 13 / Ch 14 |
| Service mesh beyond one sentence (per-request balancing, encryption and measurement between services) | Named only (brief); Ch 13 | Ch 13 (R9) |
| Headless Services | Named only in D2; databases are Ch 10's | Ch 10 (R6) |
| Services without a selector, and `type: ExternalName`, for outside databases | Ch 10 (managed databases) | Ch 10 (R6) |
| The namespace in a DNS name, in depth | Glossed once in D2; Ch 11 | Ch 11 (R7) |
| Gateway API's split of roles (provider, platform team, product teams) | Answers Riley's "control" in Ch 11's terms; here only as k-07's question | Ch 11 (R7) |
| Network policies (by default anything in the cluster can call anything) | Ch 11 | Ch 11 (R7) |
| Ingress NGINX's retirement as an ecosystem lesson ("about 50%" of environments relied on a controller kept by one or two people; migration needs planning) | D6 gives the dated fact; the lesson is Ch 13's | Ch 13 (R9) |
| Ingress2Gateway, the migration tool | Ch 13 | Ch 13 (R9) |
| Cross-provider load-balancer pricing; data-transfer and per-use charges in detail; the AWS free tier | One provider's hourly figure, labelled, is enough for the question; Ch 14 owns cost | Ch 14 (R9) |
| The Network Load Balancer price (seen in AWS's examples only) | Medium confidence and not needed for the argument | One clause in s-07 |
| A cloud load balancer's own health checks | Provider-defined; Ch 12 / Ch 14 | Ch 12 (R8) |
| Graceful shutdown (callers with open connections can still reach a Pod that is stopping) | Ch 12 | Ch 12 (R8) |
| kube-proxy replacements (eBPF network add-ons) in more than a clause | Network plugins are out of scope | Ch 13 / Ch 14 |
| A comparison of ingress or gateway products | The brief names ingress / gateway; it doesn't compare products | — |

## If it runs long

In the plan now; cut in this order. Each cut keeps every objective covered.

| # | Cut | What the reader loses | Saves |
|---|---|---|---|
| 1 | The support-line analogy aside (s-05) | The management bridge for the stable name; its breaks line (no switchboard; nobody judges the rota) is said once in s-05's reveal instead | ~0.5 min |
| 2 | The canary sentence (s-04's last paragraph, second half) | Why a share of traffic by Pod count is only rough (Ch 6's pick-up); "old and new side by side" stays | ~0.25 min |
| 3 | k-06 (the trace check) → f-05 shown without a gate | The prediction that internal calls need no load balancer (local-03); k-07's model answer still says it | ~0.5 min |
| 4 | f-02's right column → one sentence | Seeing the written record apart from what Kubernetes adds; the prose still says both | ~0.25 min |
| 5 | Lane step S1 merged into S2 ("before and just after the new Pod starts") | The starting list drawn on its own; three steps instead of four | ~0.25 min |
| 6 | k-01 → one recall sentence in s-01 | The loop-lens retrieval opener (§2.8 asks for one); k-02 still retrieves Ch 6 | ~0.5 min |
| 7 | D2–D6 removed | Optional depth only (full DNS name; kube-proxy stopping; long-lived connections; other refusals; ingress vs. gateway, including the dated Ingress NGINX retirement) | 0 (not counted) |
| 8 | s-08's table reduced to a sentence in the recap (not recommended) | Breaks the course's loop lens table convention (§2.3) | ~0.75 min |

Cuts 1–6 recover about 2.25 minutes; with 8, about 3.
