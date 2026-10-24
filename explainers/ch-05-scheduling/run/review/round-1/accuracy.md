# Accuracy review: round 1

## Summary
The page teaches the mechanisms correctly, so I found nothing blocking. It states correctly that filter-then-score works by requests, that the default prefers the least-reserved node and spreads copies softly, that ties are broken at random, and that Pods can reserve only allocatable room. Requests vs. limits (memory OOM-kill and restart in place, processor throttled), eviction order, the billing modes and the hedged survey figures are also right. Lane F's numbers check out at every step. I recomputed them with the default score plugins (fit, balanced allocation, spreading), and the F2, F5 and moving-day choices all come out as the page says. The recorded reason's counts (2 cpu, 3 memory) match how the real message counts a node short of both. My own exact solver agrees with W-02's node counts. Two `should` findings: k-09 points readers to a W-02 setting that shows no change, and k-08's feedback claims more over-request services than the story's numbers give.

## Findings

### new
severity: should
criterion: o-2 / o-3 (raising a request can add a node)
location: s-09, k-09 reveal, "(try `orders` at 8 and then 12 GB in W-02)"; widget w-sizing-sandbox
evidence: Probe (1280px, run/screenshots/probe/acc-r1-ss-at-use.png, acc-r1-ss-at-use-orders12.png): starting from the state the page asks for ("Set each request to what that service used at the rush": storefront 2, orders 5.5, dispatch 1), NODES reads 04 (3 + 1 spare) with orders at 5.5, at 8 and at 12. It changes only at 12.5. Starting from Fennel's defaults (4 / 6 / 2), the model gives 4 + spare at every orders value from 5.5 to 13 (model sweep with SizingModel.evaluate, cross-checked with an independent exact solver). The only state where 8 → 12 adds a node is storefront 2.5 / dispatch 1.5, which the self-test uses but the page never names. A reader who follows the pointer sees the node count stay the same while orders doubles, the opposite of what the sentence beside it claims ("that can mean another node on the bill").
expected_fix: Point to a reproducible setting. Either name the state ("with storefront at 2.5 and dispatch at 1.5, try orders at 8 and then 12 GB") or pick values that add a node from the "used at the rush" state the page already sets up (from 2 / 5.5 / 1, orders at 12 → 3 nodes for the Pods, 12.5 → 4). Alternatively drop the parenthesis and say a node is added only once the bigger request no longer fits beside the others.
verdict: misleading-simplification

### new
severity: should
criterion: o-2 (under-requesting → evictions); internal consistency of the fiction
location: s-08, k-08 option A feedback: "at the rush several services would use more than they reserved … (W-02's warnings show which services.)"
evidence: The story's rush usage (W-02 data.js `use`) is storefront 2, orders 5.5, dispatch 1, payments 0.5 and notifications 0.5 GB per copy. Halved requests are 2, 3, 1, 1 and 1 GB. Only orders goes over its request; storefront and dispatch land exactly on their use. In W-02, halving the three adjustable requests (storefront 2, orders 3, dispatch 1) gives one warning, for orders only (model: `over: ['orders']`). The mechanism in the key is right, but the feedback's "several services" contradicts the page's own numbers and the widget it sends the reader to.
expected_fix: Say "at the rush orders would use far more than it reserved (and storefront and dispatch would have no margin at all)", or change "several services" to "orders, at least". Keep the pointer to W-02's warnings, which will then match.
verdict: contradicted

### new
severity: nit
criterion: c-05 / x-01 (allocatable example)
location: s-02 disclosure "Why can Pods reserve only about 13 GB of a 16 GB node?": "On one provider, for example, a 16 GB node keeps back about 2.7 GB of memory"
evidence: GKE "Plan node sizes" (fetched 2026-10-23, docs.cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes) gives 25%/20%/10% … + 100 MiB only for "node pools created on GKE 1.36 or earlier". Pools created on 1.37 or later use "Min(EarlierMemoryReservation, (15 MiB * MaxPodsPerNode) + BaseOverhead)" (BaseOverhead 500 MiB on COS). At 110 Pods per node that's about 2.1 GiB + 100 MiB ≈ 2.2 GB for a 16 GB node. The facts file flagged this caveat (x-01) but the page states 2.7 GB as the provider's current figure. The "small machines lose a bigger share" point and the ~quarter for 4 GB still hold under both formulas.
expected_fix: Hedge the number: "keeps back roughly 2 to 3 GB of memory, depending on the node pool's version" or "on node pools created on its older versions, about 2.7 GB". Fennel's 13 GB stays fiction in the right range.
verdict: misleading-simplification

### new
severity: nit
criterion: c-04 / q-3 note (defaults when unset)
location: s-07 term card "limits": "They cap use; they reserve nothing."
evidence: facts.md q-3 note, quoting kubernetes.io manage-resources: with a limit but no request, "Kubernetes copies the limit you specified and uses it as the requested value for the resource". So a limit set alone does end up reserving room. The card's absolute "reserve nothing" is true only when a request is also set, which is Fennel's case. A manager who later hears "we only set limits" would draw the wrong conclusion about placement and cost.
expected_fix: Soften to "On their own terms they reserve nothing", or add to D7 one sentence: "If a team sets only a limit, Kubernetes uses it as the request too, so it reserves that much."
verdict: misleading-simplification

### new
severity: nit
criterion: c-20 / c-21 (pending)
location: s-03 term card "pending", second line: "Not failed, and not fixed by waiting alone."
evidence: The disclosure "Is 'pending' always about room?" right below says pending also covers image download, which does resolve by waiting. A room-pending Pod is also placed without anyone acting when other Pods finish or are removed (c-21: retried "when a node joining or a Pod being removed"). The prose is careful ("in Fennel's cluster no loop makes room by itself"), but the card generalises it.
expected_fix: "Not failed, and in Fennel's cluster not fixed by waiting alone", or "Not failed; it waits until something makes room."
verdict: misleading-simplification

### new
severity: nit
criterion: c-14 / c-15 (survey attribution)
location: s-04 disclosure "How common is this?": "with just over 100 self-selected respondents" … "Over-provisioning, which means reserving more than workloads need"
evidence: The CNCF post (fetched 2026-10-23) says only "received a total of just over 100 responses" and doesn't describe recruitment, so "self-selected" is the researcher's characterisation. The post also doesn't define over-provisioning; its chart caption gives "workloads using more resources than necessary". In this chapter "reserving" means requests specifically, so the gloss narrows the cause to over-requesting, though the survey term plausibly covers over-sized clusters too (Datadog's 54-point "cluster idle" is exactly that).
expected_fix: Drop "self-selected" or write "a small online survey". Gloss over-provisioning as "paying for more capacity than workloads need".
verdict: unsupported

### new
severity: nit
criterion: brief: invented sizes internally consistent
location: s-02 first paragraph ("every node had room for six units" … "One unit of room in Chapter 4 stood for 2 GB of memory request") vs. "the Pods on a node can reserve only about 13 GB"
evidence: 6 units × 2 GB = 12 GB, while the same section gives each node 13 GB of room for Pods, and W-01 draws 13 GB columns. Because every Ch 3/4 size is a whole number of units, the extra 1 GB changes no Ch 4 placement (I checked moving day and 03:04 at 13 GB / 3.9 cores, and both match d-04's layout). Still, a reader who multiplies will find the two figures disagree.
expected_fix: One clause, e.g. "every node had room for six units (the real figure, 13 GB, leaves 1 GB over that Chapter 4's sizes never used)".
verdict: misleading-simplification

### new
severity: nit
criterion: c-05 / c-09 (what Fennel pays for)
location: w-sizing-sandbox idle bar head "The rented room" and readout "Reserved · 38 of 65 GB"; s-04 "W-02's idle bar splits the room Fennel rents"
evidence: Probe at the defaults (acc-r1-ss-default.png): "THE RENTED ROOM … 19.5 GB · 30% / 18.5 GB · 28% / 27 GB · 42%", which sums to 65 GB = 5 × 13 GB of room for Pods. Fennel rents 5 × 16 = 80 GB. The 15 GB kept back for the system, which §04 lists as a third reason for the bill, is outside the bar, so "rented" overstates what the bar shows.
expected_fix: Relabel the head "Room for Pods on the rented nodes" (or similar), or add a fourth, hatched "kept back for the system" segment.
verdict: misleading-simplification

### new
severity: nit
criterion: cross-chapter consistency
location: s-05: "Chapter 3 called spare room insurance and left 'how much?' to this chapter."
evidence: Ch 3's page (site/index.html) says "Some of that room is worth having … How much spare room is right is a question for Chapter 5", and Ch 3's story fact quotes Sam: "the spare room is for when something breaks". Neither the page nor its widget data uses the word "insurance".
expected_fix: "Chapter 3 said some spare room is worth having and left 'how much?' to this chapter."
verdict: unsupported
