# Decisions

<!-- Orchestrator only. Format: templates/decisions.md -->

### d-01 · 2026-10-24T09:08:00 · intake
question: How long should Chapter 6 be? (three objectives plus the pick-ups; past chapters built 15–20% longer than planned)
answer: "20 minutes (Recommended)"
decision: approved
applies_to: brief field time_budget_minutes
notes: one chapter, 20 minutes; the designer gives an honest minutes table and a cut order. Prose is not compressed to fit (user's Ch 4 human review).

### d-02 · 2026-10-24T09:08:00 · intake
question: How much research should Chapter 6 get?
answer: "Light (Recommended)"
decision: approved
applies_to: brief field research_depth
notes: one researcher; default caps (agent_minutes 105).

### d-03 · 2026-10-24T09:08:00 · intake
question: (standing guidance carried from Ch 5's run, d-08, and the user's request to conserve usage) How many review rounds?
answer: "keep this to a single round of reviews please." / "let's try and conserve usage tokens here and batch our subagent processes where we can."
decision: other
applies_to: cap review
notes: review loop capped at 1 (one review round, one combined fix round, no closure review) unless the user says otherwise; fix rounds go to one combined builder where the work is small.

### d-04 · 2026-10-24T09:20:00 · checkpoint
question: (given before the checkpoint) Approve the plan?
answer: "auto approve plan, I'll be stepping away from computer and I trust you'll pick right"
decision: approved
applies_to: plan
notes: the orchestrator approves the plan at the checkpoint on the user's behalf and answers the designer's checkpoint questions with the recommended options, recording each choice here; anything that changes objectives or would edit a shipped chapter is listed for the user at delivery.

### d-05 · 2026-10-24T09:55:00 · checkpoint
question: Approve the Ch 6 plan, with checkpoint questions Q1 (size: one chapter, ~22 min), Q2 (`catalog` and Thursday story facts, R2), Q3 (three optional renderer additions in the pool before the build, every chapter re-gated), Q4 (the shift-handover aside)?
answer: (taken by the orchestrator under d-04: "auto approve plan, I'll be stepping away from computer and I trust you'll pick right") Q1 (a), Q2 (a), Q3 (a), Q4 (a), all the designer's recommended options
decision: approved
applies_to: plan
notes: ~22 min planned against 20 (d-01); the cut order goes to the user at delivery. Q3's pool additions are scheduled as a course-level step (pool-03) inside this run's build, given to the lane's builder; listed for the user at delivery. No shipped chapter's content changes.

### d-06 · 2026-10-24T11:20:00 · escalation
question: The agent-time cap was reached (106/105 min) before review. Extend?
answer: "Extend by 60 min (Recommended)"
decision: extended
applies_to: cap agent_minutes
notes: 105 → 165, for one review round (accuracy ∥ pedagogy-UX) and one combined fix builder.

### d-07 · 2026-10-24T14:40:00 · escalation
question: Fix-round dispatch refused at 277/165 agent-minutes (inflated by the reviewers' ~2.5 h usage-limit pause). Extend so one combined builder can fix all 17 findings?
answer: "Extend by 150 min (Recommended)"
decision: extended
applies_to: cap agent_minutes
notes: 165 → 315 (extend --minutes is an increment).

### d-08 · 2026-10-25T18:48:58 · delta
question: (unprompted, after delivery) Move the run back to the human review step now that the skill has one?
answer: "we'll want to perform the human review as a formal check from now on. In fact, I'd like to revert ch 5, 6 and 7 back to the human review step."
decision: other
applies_to: stage (done → human-review)
notes: the run stopped after the round-1 fixes passed the gate, which is where Stage 4b sits; nothing in site/ is reverted. The next step is a site review session (human_review.mjs --target site). The chapter leaves the course build (dist/) until it is back at deliver. Curriculum updates already applied from this chapter's plan stay; the review may change them.
