# Escalation: agent-time cap reached

**What failed:** the agent-time cap (75 min). `round_gate` sums dispatch wall time, and dispatch 06 (pedagogy-ux reviewer) was paused by an API rate limit for several hours. That pause makes the clock read about 263 min, against roughly 70 min of real agent work. Any further dispatch will be refused.

**State:** the gate passes. Round-1 review has 0 blocking, 6 should and 4 nit findings (`run/review/round-1/findings.md`). By the skill's rule the page is shippable.

**Open should findings:** A-01 (version labels can be moved), A-02 (state 2 production result should be hypothetical), A-03 (images carry the OS's basic files, not its kernel), P-01 (keyboard tab order skips Next at ≥ 700px), P-02 (widget is 1742px at 360), P-03 (k-05's key repeats s-04's wording; check text is approved-final).

**Options:**
1. Extend by about 45 min: both builders fix all should findings and the cheap nits, then the gate, then a closure review.
2. Extend by about 25 min: fix them and re-run the gate, with no closure review.
3. Ship as-is, with the findings recorded.
