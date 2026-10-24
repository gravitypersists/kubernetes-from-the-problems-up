# Examples

Reused by reference, not copied: Ch 3 x-01 (100 GB free in 10 GB pieces can't take a 20 GB job; 8 cores free as half a core on 16 machines can't take one 4-core job), `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/examples.md`. The chapter entry names it as m-26's example.

### x-01
objective: o-1
example: How much of a node Pods can actually reserve, using GKE's published memory reservation (node pools created on GKE 1.36 or earlier): 25% of the first 4 GiB, 20% of the next 4, 10% of the next 8, 6% of the next 112, plus 100 MiB for eviction thresholds. A 4 GiB node keeps back about 1.1 GiB (~27%); a 16 GiB node about 2.7 GiB (~17%); a 64 GiB node about 5.6 GiB (~9%). Processor reservations are small (a 4-core node keeps back about 0.08 of a core, ~2%).
why: Makes "allocatable < capacity" (c-05) countable and shows why small nodes waste a bigger share: one reason the bill rises after a move. Caveats: node pools created on GKE 1.37 or later use a different formula, capped by Pod density ("Min(EarlierMemoryReservation, (15 MiB * MaxPodsPerNode) + BaseOverhead)"), so the large-node share is lower there; other providers publish their own numbers. Present it as "for example, on one provider" and round. Arithmetic is the researcher's, from the published percentages.
source: https://cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes

### x-02
objective: o-1
example: Per-Pod billing rounds up. On EKS with Fargate, a Pod requesting 1 vCPU and 8 GB gets 256 MB added for Kubernetes' components; no 1 vCPU / 9 GB size exists, so it is given, and billed for, 2 vCPU and 9 GB.
why: Shows that per-Pod modes bill the *requested* size (rounded up), not usage, so over-requesting still costs money there (c-11, m-08). Use only in a disclosure or footnote; provider pricing specifics are Ch 14's.
source: https://docs.aws.amazon.com/eks/latest/userguide/fargate-pod-configuration.html

### x-03
objective: o-2
example: The chapter's analogy, with its limits checked against the facts. A request is a reserved budget: the finance team (scheduler) approves a project for a department (node) only if the reserved budgets still fit the department's total, whatever has actually been spent (c-02, c-03). A limit is a spending cap on a corporate card. Where it breaks: (1) reserved-but-unspent money can't be lent to another project, even for a day (c-03); (2) a project may spend above its reservation while the department has slack (c-04), and is the first to be cut when money runs short (eviction, c-19); (3) the processor card doesn't decline at the cap, it slows spending down (throttling, c-16); the memory card cuts the project off and restarts it (OOM-kill, c-17).
why: Keeps reserved vs. used vs. cap distinct, which the brief says figures must show. Point (2) is where most managers' budgeting intuition is wrong in an interesting way: overspending isn't forbidden, just unprotected.
source: model

### x-04
objective: o-1
example: Restaurant bookings. The host (scheduler) seats parties by their bookings, not by how much they eat. A table booked for six and used by two still can't be given away (c-03). A party of eight can't be seated even if three tables of four are free in different rooms, because tables don't join across rooms (m-26, c-02). A party may spread into empty seats next to it, but if new booked guests arrive and the room is short, the overflow is asked to leave first (c-04, c-19).
why: A second, more physical picture of placement by reservation and of fragmentation, if the budget analogy (x-03) feels too abstract for packing. Where it breaks: memory and processor are two separate "seat counts" that must both fit; restaurants have one. And nobody is "killed" in a restaurant: the OOM-kill has no polite equivalent.
source: model

### x-05
objective: o-3
example: Leak vs. growth, as two memory graphs over a week for `orders`. Leak: memory climbs steadily from each restart, overnight too, when there are almost no orders, until it hits the limit and is OOM-killed, then starts again: a sawtooth, independent of traffic. Growth: memory rises and falls with traffic (peaks at the Friday dinner rush) or steps up once after a change (a bigger catalog, a new feature), then levels off at a higher plateau that sometimes touches the limit.
why: Gives the manager the picture behind "Is that a leak or real growth?": a leak means raising the limit only delays the next kill (and raising the request buys nodes for a bug); growth means raising the request is a real cost decision, with a node-count consequence (c-23). This heuristic is model reasoning, not from a source the researcher read; the docs only say to check for a leak first (c-23). The accuracy reviewer should treat it as an illustration, hedged ("typically", "a common sign").
source: model

### x-06
objective: o-3
example: The scheduler's recorded reason for Fennel's stuck `dispatch` Pods, written in the format engineers see: "0/3 nodes are available: 3 Insufficient memory." (three nodes checked, all three short of memory). Kubernetes' own docs show the same shape: "0/42 nodes available: insufficient cpu".
why: A concrete artefact for o-3: the message already answers "which resource is short, on how many nodes", which is what the reader should ask. Caveat: the exact wording differs across Kubernetes versions (the memory task page shows an older form, "No nodes are available that match all of the following predicates:: Insufficient memory (3)"), and recent versions append a note about preemption. The Fennel line is the researcher's adaptation of the documented format; mark it as illustrative, not a verbatim log.
source: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

### x-07
objective: o-1
example: Ch 4's moving day replayed with default scoring. Before `storefront` (3 Pods × 2 room units) arrives: node 01 has 5 free, 02 has 4, 03 has 2, 04 has 5. Default scoring favours the least-reserved node (c-06) and spreads copies (c-07): the first Pod goes to 01 or 04 (a tie, picked at random), the second to the other one of the two (5 free beats 3 and 4), the third most likely to 02 (4 free, no `storefront` yet). Likely result: one `storefront` Pod each on 01, 02 and 04, not Ch 4's two on 01 and one on 02. With packing switched on instead (`MostAllocated`), the first Pod would fill 03's last 2 units. Neither default nor packing yields Ch 4's layout.
why: Answers the curriculum's ready-made opener "why not 04?" honestly: under default settings it probably *would* have used 04. The designer needs this before using the opener; see the report's concern 1. Under the likely default layout, after 03:04 both 01 and 04 have 3 free, so "04 was the only node with room" for `orders` would also change. Simplification: real scoring mixes several scores (balanced use, image already present), so this is the most likely outcome, not a certainty.
source: model

### x-08
objective: o-2
example: "Inflate everything to be safe", in Ch 3/4's room units on today's three nodes (6 units each, 18 in all). Fennel's requests total 14 units (storefront 3 × 2, orders 1 × 3, payments 2 × 1, dispatch 3 × 1), leaving 4 free, split across nodes. Doubling every request "to be safe" makes 28 units: at least five nodes even with perfect packing, and an `orders` copy of 6 needs a completely empty node. On three nodes, most of the doubled Pods would sit pending.
why: A countable version of m-07 for the widget designer, using established story numbers. `notifications` (Ch 4) has no size yet; the designer must give it one (curriculum recommendation). Room units fold memory and processor into one number; the chapter that counts them separately (c-02) has to say where the widget simplifies.
source: model
