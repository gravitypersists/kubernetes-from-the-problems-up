# Cut list: Ch 5, Who runs where: scheduling, resources and cost

Researched or considered, and deliberately left out of the main text. Every research claim (c-01 to c-25) is used somewhere in the plan, so nothing here is an unused claim; the items are examples, parking-lot lines and design options. "Cost to add back" is what it would take in this chapter.

| What | Why it's out | Cost to add back |
|---|---|---|
| Restaurant-bookings analogy (research x-04) | One analogy is enough, and the curriculum names budgeting; two analogies for one idea add load and invite mixing their breaks | One aside with its own breaks line in s-02; about 0.5 min |
| A second lane for Tuesday (`orders` climbs past its request, hits its limit, is killed, restarts in place, backs off) | Time. f-05 shows the same day as a chart; the process detail (restart count, back-off) was taught in Ch 4 | A 4–5 step lane on the pooled renderer (it already draws `restarts`); about 2 min. Planned for Part 2 if the user chooses the split |
| An eviction lane (a node runs short at the rush; the agent evicts the Pod furthest over its request; the replacement waits) | Time; eviction is taught in prose and rehearsed in k-08 | A 4-step lane; about 2 min. Candidate for Part 2 under the split |
| Processor requests in the sandbox (steppers for processor too) | Keeps the reader's hands on one resource; processor still shows up as a floor ("set by processor") | Three more steppers; about 0.5 min of reader time and a busier phone layout |
| Steppers for `payments` and `notifications` in the sandbox | Small services; three adjustable services already show every behaviour | Two more rows |
| Scoring details beyond "emptiest node, copies spread" (balanced memory/processor use, image already on the node; plugin names and weights) | Engineer territory; c-06's note says "favours the emptiest" is a tendency, which the plan's wording respects | A disclosure; about 0.25 min |
| Switching the scheduler to packing (`MostAllocated`) and how providers expose it | Engineer territory; one clause in s-04 says packing is a setting and some fully managed modes pack for you | A disclosure |
| Pod priority and preemption (the scheduler removing lower-priority Pods to place a higher-priority pending one) | Out of scope (Ch 11 / Ch 12); would complicate "pending" and the eviction order | Ch 11 or Ch 12 |
| QoS classes (Guaranteed, Burstable, BestEffort) and their role in eviction | Engineer vocabulary; the node agent orders evictions by use over request, which the plan states directly (c-19) | Ch 12 |
| Namespace defaults for requests and limits (LimitRange) and per-team totals (ResourceQuota) | Ch 11's | Ch 11 |
| Resizing requests from observed use, recommenders, vertical autoscaling, in-place resize | Ch 8 names them; the brief's out_of_scope | Ch 8 |
| The cluster autoscaler by name | Ch 8; this chapter says only "a loop that adds nodes; Chapter 8" | — |
| Memory limits enforced "reactively"; memory throttling on newer kernels | Too fine for this reader; the plan's "over the limit → killed" holds | Ch 12 |
| A processor request also weights a container's share under contention | Engineer territory | A disclosure in s-07 |
| A limit with no request gets the limit copied as its request | Engineer territory | One sentence in D7 |
| Spot machines' short graceful shutdown when reclaimed | Detail; k-06 needs only "can be taken back at short notice" | Ch 12 / Ch 14 |
| Default eviction threshold (100 MiB) and eviction ignoring disruption budgets | Engineer territory | Ch 12 |
| Control-plane fee amounts; Fargate's one Pod per node and requests = limits | Ch 14 (pricing specifics); the fee is named only | Ch 14 |
| Spreading across zones (the second default spread rule) | Zones are out of scope | Ch 10 / Ch 14 |
| CNCF's 2021 survey (68%) | Not comparable with 2023; secondhand | Ch 14 |
| Newer provider reservation formula (capped by Pod density, lower on large nodes) | D2 gives one provider's earlier formula as an example; the newer one adds a condition, not an idea | One sentence in D2 |
| Load-aware placement add-ons (placing by live use) | Not researched; would blur local-01's correction | — |
| The outcome of the leak-vs-growth question (what Ari's team found) | Left open on purpose: the conversation rehearses the questions; the answer would be fiction with no mechanism behind it | Ch 12 (a postmortem), R8 |
| A money readout in the sandbox | Pricing is Ch 14's, and a made-up price per node would read as a real one; the node count is the bill in standard mode | — |

## If it runs long

In the plan now; cut in this order. Each line says what the reader loses. Together they recover about 5 minutes (about 26 → 21) without dropping an objective. If the user instead chooses the split (learning-plan.md `## Shape`, Q2), items 1, 5 and 7 apply to Part 1 and items 2, 3, 4 and 6 to Part 2.

1. **k-05** (nodes 05 and 06 a month later; −0.5 min). Keep its point as one sentence in s-04's bin-packing paragraph ("nothing packs Pods or gives nodes back by default"). Loses the committed prediction against m-08; m-08 is still stated and corrected in prose.
2. **s-06 trimmed to one paragraph**: drop f-03 and k-06, keep the `dfn` and the large-memory and spot cases in words (−1.0 min). Loses the node-pool check and the criticality apply moment (`orders` vs. `notifications`); o-1's "what node pools add" survives as exposure.
3. **f-07 to words** (−0.5 min). k-09's reveal describes the two patterns in one sentence each instead of drawing them. Loses the picture behind "Is that a leak or real growth?".
4. **The spending-cap aside to one line** (−0.25 min). Keep "a limit is a spending cap" and fold its breaks into the processor-vs-memory paragraph. Loses the analogy's second half as a separate aside (its breaks line must stay, in the paragraph).
5. **s-05 folded into s-04** after the sandbox (−0.5 min): two sentences and the quoted question move to the end of Morgan's answer. Loses headroom's own section heading (Ch 4's D4 promise is still kept, in fewer words).
6. **s-08 eviction to a disclosure**, keeping k-08 and f-06 (−1.0 min). k-08's feedback then carries the eviction mechanism. Loses eviction from the main text: o-2's "evictions" and o-3's "an eviction" become disclosure-level.
7. **The sandbox (W-02) replaced by a static two-panel figure** ("as the teams set them: 4 nodes + 1 spare" vs. "close to what they use: 3 + 1"), keeping k-04 (−1.5 min). Loses the hands-on discovery: the step-shaped node count, the processor floor, the never-placeable Pod, and the sandbox the conversation points to. Only if the user judges the sandbox busywork.
