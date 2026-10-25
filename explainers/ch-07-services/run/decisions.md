# Decisions

<!-- Orchestrator only. Format: templates/decisions.md -->

### d-01 · 2026-10-24T16:35:00 · intake
question: How long should Chapter 7 be? (not asked: inferred from the user's message and the course pattern)
answer: "Commit and continue, I will review at a later date. Once done with 6 let's start ch 7."
decision: other
applies_to: brief field time_budget_minutes
notes: inferred, not asked, so the run doesn't wait on an intake question while the user is away: 20 minutes, the user's choice for Ch 6 (d-01 there, "20 minutes (Recommended)") for the same shape of entry (three objectives plus pick-ups). Confirmed or changed at the checkpoint. Prose is not compressed to fit (user's Ch 4 human review).

### d-02 · 2026-10-24T16:35:00 · intake
question: How much research should Chapter 7 get? (not asked: inferred)
answer: "Commit and continue, I will review at a later date. Once done with 6 let's start ch 7."
decision: other
applies_to: brief field research_depth
notes: light, as the chapter entry suggests and as the user chose for Ch 5 and Ch 6; one researcher; default caps.

### d-03 · 2026-10-24T16:35:00 · intake
question: (standing guidance carried from Ch 5's run, d-08, and Ch 6's d-03) How many review rounds?
answer: "keep this to a single round of reviews please." / "let's try and conserve usage tokens here and batch our subagent processes where we can."
decision: other
applies_to: cap review
notes: review loop capped at 1 (one review round, one combined fix round, no closure review) unless the user says otherwise.

### d-04 · 2026-10-24T16:35:00 · intake
question: Apply Ch 6's after-ship curriculum updates before the user's human review of Ch 6?
answer: "Commit and continue, I will review at a later date. Once done with 6 let's start ch 7."
decision: approved
applies_to: CURRICULUM.md (Ch 6 updates, committed in 93c96f8)
notes: Ch 6's plan R1–R11 applied and committed with Ch 6 before this run started, so Ch 7 reads the updated §3, §5, §6 and its own "Picked up from Ch 6" line. If the user's later review of Ch 6 changes any story fact Ch 7 relies on, Ch 7 follows.

### d-05 · 2026-10-24T17:20:00 · checkpoint
question: Approve the Chapter 7 plan (one chapter, ~20 min planned; support-line analogy; 'endpoints loop' and kube-proxy by name; no hands-on address widget)?
answer: "Approve (Recommended)"
decision: approved
applies_to: plan
notes: checkpoint questions Q1 (a) one chapter, Q4 (a) the support-line aside, Q5 (a) "endpoints loop" / "endpoints" and kube-proxy by name, Q6 (a) no hands-on widget. Confirms d-01's 20 minutes (built likely 22–25; cut order goes to the user at delivery). The R2 story facts are approved with the plan.

### d-06 · 2026-10-24T17:20:00 · checkpoint
question: What caused Fennel's 'connection refused' incidents?
answer: "Ch 5's Tuesday (Recommended)"
decision: approved
applies_to: plan Q2, story facts R2
notes: `orders` runs one copy; during each of Ch 5's three OOM restarts its Service had no ready Pod and `storefront`'s calls were refused (hedged "in most clusters, by default").

### d-07 · 2026-10-24T17:20:00 · checkpoint
question: The Service's list needs a small optional addition to the shared cluster drawing (a Service block in the record panel, plus Pod addresses), with Ch 1–6 re-checked. How should it be done?
answer: "Add it + fix 360px labels (Recommended)"
decision: approved
applies_to: plan Q3, pool (pool-04)
notes: pool-04 (the Service block, `PODS[id].addr`) plus CURRICULUM §9's 360px chip-label follow-up (Ch 6 P-08 part 4), one widget builder, before or alongside the page build; every chapter re-gated. Ch 6's lane is expected to change at 360px only (its chips gain the service name); every other chapter must render unchanged.

### d-08 · 2026-10-24T17:20:00 · checkpoint
question: Chapter 6's commit (93c96f8) is local only. Push it to origin?
answer: "Push now"
decision: approved
applies_to: git
notes: pushed main to origin.

### d-09 · 2026-10-24T19:15:00 · build
question: Chapter 7 has used 134 of its 105 agent-minutes, much of it the two builders idling through an API usage-limit pause. Extend the cap so the two reviewers and one fix builder can run?
answer: "Extend by 120 min (Recommended)"
decision: approved
applies_to: cap agent_minutes
notes: +120 agent-minutes (105 → 225). Builders 03 and 04 resumed after the limit reset at 19:10.

### d-10 · 2026-10-24T20:45:00 · deliver
question: Chapter 6's Fig. 03 crash panel now reads 'catalog v64 ↻ 3 CRASHED' at all widths, including desktop. You had approved changes at 360px only. Keep it?
answer: "Keep it (Recommended)"
decision: approved
applies_to: pool-04 narrow-chip rule; Ch 6 f-03
notes: relaxes d-07's "Ch 6 may change at 360px only" for Fig. 03's narrow crash-panel columns.

### d-11 · 2026-10-24T20:45:00 · deliver
question: How should Chapter 7 be wrapped up?
answer: "Commit + continue (Recommended)"
decision: approved
applies_to: CURRICULUM.md, git
notes: apply the plan's curriculum recommendations R1–R11 (plus the "a Service is never a hop" visual-grammar rule from P-02) now, before the human review; commit chapter, pool-04 and curriculum together.

### d-12 · 2026-10-24T20:45:00 · deliver
question: Push to origin after committing?
answer: "Push now"
decision: approved
applies_to: git
notes: push main after the Ch 7 commit.
