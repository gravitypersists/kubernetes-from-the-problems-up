# Escalation · agent-time cap (review stage)

**What failed.** `round_gate.py dispatch` refused the round-1 accuracy reviewer: "agent-time cap reached (106/105 min)". The cap is the run default for light depth; only the user can extend it.

**Where the time went.** Researcher ~8 min, designer ~19, page builder ~17, widget builder 04 ~75 (pool-03 renderer additions plus lane R; most of it was re-verifying Ch 4 and Ch 5 unchanged: 190 DOM snapshots, 102 screenshot pairs, and five chapter gates, with probe runs of ~30 min each). Handoffs: `run/handoffs/01`–`04`; snapshots in `run/history/`.

**State.** Build is complete. Full gate round 5 PASS (~21.6 min text-only, 410 KB). Ch 1–5 re-gated PASS on the new pool.

**Options.**
1. **Extend agent_minutes by 60 (to 165)** for the planned round: accuracy and pedagogy-UX reviewers in parallel, then one combined fix builder (d-03). Recommended.
2. **Extend by 35 (to 140)** for one merged reviewer (pedagogy-UX with accuracy) and one combined fix builder. Cheaper; less independent fact-checking.
3. **No extension:** deliver as built, unreviewed, for the user's human review.

---

# Escalation 2 · agent-time cap (fix round)

**What failed.** `round_gate.py dispatch` refused the combined fix builder: "agent-time cap reached (277/165 min)".

**Why the count is high.** The gate counts wall-clock time from dispatch to receive. Both reviewers (05, 06) were dispatched at about 11:22, stopped on the account's session usage limit, and were resumed at 14:13 after the 14:00 reset, so about 2.5 hours of pause is counted twice. Their actual run times were about 6 min (accuracy) and 12 min (pedagogy-UX).

**State.** Review round 1 is merged: `run/review/round-1/findings.md`, 17 findings (2 blocking: A-01 "as far as the record reaches", P-01 k-04 given away by the standfirst; 7 should; 8 nit). One combined builder would fix all of them.

**Options.**
1. **Extend by 150 min (to 315)**: covers the counted pause plus about 35 min for the combined fix builder and the gate. Recommended.
2. **No extension:** deliver with the 2 blocking findings open, for the user's human review.
