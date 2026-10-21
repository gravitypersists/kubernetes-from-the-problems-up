# Escalation: agent-time cap reached

**What failed:** `round_gate.py dispatch` refused both review-round-1 fix dispatches (page-builder `r1-fixes-page`, widget-builder `r1-fixes-widget`): "agent-time cap reached (75/75 min)". This is a run cap, not an invariant.

**Where the time went:** six dispatches so far: researcher (01, ~5 min), designer (02, ~12 min), page-builder (03, ~15 min), widget-builder (04, ~28 min), accuracy reviewer (05, ~5 min), pedagogy-ux reviewer (06, ~11 min). The widget build was the largest. Handoffs and reports: `run/handoffs/01..06`; snapshots in `run/history/`.

**Still to do:** 1 blocking finding (A-01, f-03 timeline) plus 9 `should` and 9 nits from `run/review/round-1/findings.md`; user decisions d-06 (apply check-text fixes incl. P-01) and d-07 (keep all, relabel ~17 min) to apply; gate re-run; closure review round 2 (2 fresh reviewers).

**Options:**
1. **Extend by ~45 min** (recommended): covers both fix rounds (~15–20 min in parallel), the gate, and a closure review round (~15 min).
2. **Extend by ~25 min, skip closure review:** fix everything, re-run the gate; I check the blocking finding is closed myself from the diff. Loses the independent check.
3. **Stop here:** deliver the page as it is, with A-01 (blocking) and all findings open.
