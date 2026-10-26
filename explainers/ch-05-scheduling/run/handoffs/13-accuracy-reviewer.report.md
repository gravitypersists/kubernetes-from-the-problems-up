status: done_with_concerns

(Report as returned by the accuracy closure reviewer, recorded by the orchestrator.)

summary: All 9 round-1 A- findings closed (A-01..A-06, A-08 by builders; A-07, A-09 by the H- rewrites). Changed text checked against facts.md. Sandbox driven at 1280 and 360 and checked with an independent packing solver: defaults 4+1; payments 4/7 GB 4+1, 7.5 GB 5+1; at rush use 3+1 set by processor; orders 5 → 3+1, 5.5 → 4+1 (k-09 pointer works); orders 13.5 never placed; halved requests: only orders over; extremes 3+1 and 9+1; selftest passes; no overflow at 360. #28 intro doesn't claim to be the scheduler. No node-pool reference left; numbering consistent. No new blocking findings.

concerns:
- H-34 cut the control-plane fee; "Morgan's five nodes constitute the bill" with no fee mentioned is a slight overstatement (should level; not raised, the cut was the user's call).
- A-07: residual risk for a reader who multiplies 6 units × 2 GB = 12 GB vs 13 GB room; closed rather than undo H-04.
- CURRICULUM §7 Ch 5 "Ideas" still lists node pools.
- k-07 option B's feedback ("at the rush, some run short") states a shortage Fennel's numbers don't produce; unchanged from round 1.

relaxed: none
