# Cut list: Ch 5, Who runs where: scheduling, resources and cost

Researched or considered, and deliberately left out of the main text. Revision 1 (handoff 11, the user's site review) adds the rows marked **Rev 1** at the top. Every research claim from c-01 to c-23 is used somewhere in the plan; c-24 and c-25 (node pools, spot machines) are now unused here and go to Ch 8 with s-06. The other items are examples, parking-lot lines and design options. "Cost to add back" is what it would take in this chapter.

| What | Why it's out | Cost to add back |
|---|---|---|
| **Rev 1.** §06 node pools: s-06 (a Pod bigger than any node → a bigger machine type → node pools; large-memory and spot pools), f-03 (Fennel's cluster as node pools), k-06 (which service stays off a spot pool), the `dfn` "node pool", the gloss "spot machines"; claims c-24, c-25 | d-12, from #37: the reader hasn't yet seen how nodes get added (Ari's team adds them by hand), so pools answer a question the reader can't ask yet. s-04 keeps the "bigger than any node" case in plain words: it never gets placed; it needs a bigger node | Moved to Ch 8 (CURRICULUM §7 Ch 8 entry; plan R13 says what is reusable). About 1.75 min here |
| **Rev 1.** The room kept back for the system, repeated in Morgan's answer (s-04) | #34: "We're repeating ourselves too much here"; s-02 and D2 own it | One clause in Morgan's answer |
| **Rev 1.** The per-cluster control-plane fee | #34: "some arbitrary arithmetic and details that don't matter right now" | Ch 14 (pricing) |
| **Rev 1.** The two-kinds-of-idle paragraph after the sandbox (s-04), as a paragraph | #31: it rehashes the widget; reduced to one sentence that carries D5 | — |
| **Rev 1.** Per-Pod billing beyond two sentences ("the picture shifts", "Pod by Pod", "some fully managed modes still bill per machine") | #32: garbled and of unclear value; the lesson is the same | D6 keeps the detail |
| **Rev 1.** The stranded-room paragraph after lane F, beyond two sentences, and the Chapter 3 back-reference | #16, #17: repeats what F3 and k-03 showed | — |
| **Rev 1.** s-05's second kind of insurance (requests sized to each service's busiest hour) and the Chapter 3 "Sam kept spare room" callback | #36: rebuild s-05 around losing a node; s-02 already owns the daily peak | One sentence in s-05 |
| **Rev 1.** The sandbox's stats block (nodes with "what Fennel rents", set by, reserved, used) and the "· Over" row tags | #26, #27: "extraneous and noisy … captured in the visualization below". The count stays as one heading; processor's role as one line when it applies | A readout strip |
| **Rev 1.** The sandbox prompt "Switch off the spare node. What does insurance cost?" | Replaced by the `payments` prompt (k-04's case, #25); s-05 owns insurance and names the switch | One list item |
| **Rev 1.** The second D3 ("Would the scheduler really have put two `storefront` Pods on node 01?") | Only for checkpoint option (c); the user chose (b) (d-04) | — |
| Restaurant-bookings analogy (research x-04) | One analogy is enough, and the curriculum names budgeting; two analogies for one idea add load and invite mixing their breaks | One aside with its own breaks line in s-02; about 0.5 min |
| A second lane for Tuesday (`orders` climbs past its request, hits its limit, is killed, restarts in place, backs off) | Time. f-05 shows the same day as a chart; the process detail (restart count, back-off) was taught in Ch 4 | A 4–5 step lane on the pooled renderer (it already draws `restarts`); about 2 min |
| An eviction lane (a node runs short at the rush; the agent evicts the Pod furthest over its request; the replacement waits) | Time; eviction is taught in prose and rehearsed in k-08 | A 4-step lane; about 2 min |
| Processor requests in the sandbox (steppers for processor too) | Keeps the reader's hands on one resource; processor still shows up as a floor ("set by processor") | Three more steppers; about 0.5 min of reader time and a busier phone layout |
| A stepper for `notifications` in the sandbox (Rev 1 added `payments`, #25) | Small service; four adjustable services show every behaviour, and `payments` is the one k-04 asks about | One more row |
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
| Spot machines' short graceful shutdown when reclaimed | Spot machines left with node pools (Rev 1) | Ch 8 / Ch 12 / Ch 14 |
| Default eviction threshold (100 MiB) and eviction ignoring disruption budgets | Engineer territory | Ch 12 |
| Fargate's one Pod per node and requests = limits | Ch 14 (pricing specifics) | Ch 14 |
| Spreading across zones (the second default spread rule) | Zones are out of scope | Ch 10 / Ch 14 |
| CNCF's 2021 survey (68%) | Not comparable with 2023; secondhand | Ch 14 |
| Newer provider reservation formula (capped by Pod density, lower on large nodes) | D2 gives one provider's earlier formula as an example; the newer one adds a condition, not an idea | One sentence in D2 |
| Load-aware placement add-ons (placing by live use) | Not researched; would blur local-01's correction | — |
| The outcome of the leak-vs-growth question (what Ari's team found) | Left open on purpose: the conversation rehearses the questions; the answer would be fiction with no mechanism behind it | Ch 12 (a postmortem), R8 |
| A money readout in the sandbox | Pricing is Ch 14's, and a made-up price per node would read as a real one; the node count is the bill in standard mode | — |

## If it runs long

In the plan now; cut in this order. Each line says what the reader loses. Revision 0's item 2 (trim node pools) is gone: the user cut the whole section (d-12), so the list is renumbered. Together these recover about 4 minutes (about 22.5 → 18.5) without dropping an objective.

1. **k-05** (nodes 05 and 06 a month later; −0.5 min). Keep its point as one sentence in s-04's bin-packing paragraph ("nothing packs Pods or gives nodes back by default"). Loses the committed prediction against m-08; m-08 is still stated and corrected in prose.
2. **f-07 to words** (−0.5 min). k-09's reveal describes the two patterns in one sentence each instead of drawing them. Loses the picture behind "Is that a leak or real growth?".
3. **The spending-cap aside to one line** (−0.25 min). Keep "a limit is a spending cap" and fold its breaks into the processor-vs-memory paragraph. Loses the analogy's second half as a separate aside (its breaks line must stay, in the paragraph).
4. **s-05 folded into s-04** after Morgan's answer (−0.25 min; Revision 1 already made it one paragraph): its sentences and the quoted question move to the end of s-04. Loses headroom's own section heading (Ch 4's D4 promise is still kept, in fewer words).
5. **s-08 eviction to a disclosure**, keeping k-08 and f-06 (−1.0 min). k-08's feedback then carries the eviction mechanism. Loses eviction from the main text: o-2's "evictions" and o-3's "an eviction" become disclosure-level.
6. **The sandbox replaced by a static two-panel figure** ("as the teams set them: 4 nodes + 1 spare" vs. "close to what they use: 3 + 1"), keeping k-04 (−1.5 min). Loses the hands-on discovery: the step-shaped node count, the processor floor, doubling `payments` costing nothing until it costs a node, the never-placeable Pod, and the sandbox the conversation points to. The user reorganised it in review rather than cutting it (#23–#30), so this is last.
