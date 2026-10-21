# Decisions

<!-- Orchestrator only. Format: templates/decisions.md -->

### d-01 · 2026-10-21T01:45:00 · intake
question: Time budget for Ch 2 (4 draft objectives; Ch 1 planned 12, built ~17)
answer: "14 minutes"
decision: approved
applies_to: brief field time_budget_minutes

### d-02 · 2026-10-21T01:45:00 · intake
question: Pre-authorize a higher agent-time cap (120 min)?
answer: "Keep default"
decision: other
applies_to: cap agent_minutes
notes: default 75 min; escalate if reached.

### d-03 · 2026-10-21T02:30:00 · checkpoint
question: Approve the Ch 2 plan for build?
answer: "Approve"
decision: approved
applies_to: plan

### d-04 · 2026-10-21T02:30:00 · checkpoint
question: New Fennel facts (Riley they/them, Year 1 engineer; photo tool 6.2 prod vs 7.0 laptop; images fennel-app:v42/v43; Year 1 = one production machine plus staging). OK?
answer: "Yes, use them"
decision: approved
applies_to: plan

### d-05 · 2026-10-21T02:30:00 · checkpoint
question: Curriculum recommendations?
answer: "Apply 'now' set (Recommended)"
decision: approved
applies_to: other (CURRICULUM.md)
notes: R1, R2, R3, R6, R7, R8, R9 now; R4, R5 after ship.

### d-06 · 2026-10-21T13:10:00 · escalation
question: Agent-time cap reached (clock ~263/75 min, inflated by a multi-hour API rate-limit pause in dispatch 06; ~70 min real). How to proceed with 6 should fixes?
answer: "Extend 45 min (Recommended)"
decision: extended
applies_to: cap agent_minutes
notes: applied as 45 min of further work on top of the current clock (cap raised from 75 to 310), since the counter includes the rate-limit pause.

### d-07 · 2026-10-21T13:10:00 · delta
question: P-03 changes approved-final check text (k-05 option C repeats s-04's definition). Fix how?
answer: "Reword k-05 option C (Recommended)"
decision: approved
applies_to: plan
notes: same meaning, different words; distractors balanced to match.

### d-08 · 2026-10-21T14:10:00 · delivery
question: P-02: relax the "every state reserves the tallest state's height" rule on phones?
answer: "Relax <600px, course rule (Recommended)"
decision: approved
applies_to: plan
notes: course rule added to CURRICULUM.md; widget builder applies it to w-samecode now; gate re-run, no third review; Ch 1's w-rebuild noted for a later pass.

### d-09 · 2026-10-21T14:10:00 · delivery
question: Page says 14 min; estimate ~15–16. Relabel?
answer: "Relabel to 16 min"
decision: other
applies_to: brief field time_budget_minutes
notes: no cuts; label and brief to 16.

### d-10 · 2026-10-21T14:10:00 · delivery
question: Apply post-ship curriculum updates (R4, R5) and commit Ch 2?
answer: "Apply and commit (Recommended)"
decision: approved
applies_to: other (CURRICULUM.md, git)
