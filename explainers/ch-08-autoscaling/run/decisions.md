# Decisions

<!-- Orchestrator only. Format: templates/decisions.md -->

### d-01 · 2026-11-16T21:00:00 · intake
question: How long should Chapter 8 be? (not asked: inferred from the course pattern)
answer: "start a /didactician run on ch 08. Let's use Sonnet or Haiku (your choice) for the researcher, but I think orchestrator and instruction designer should be fable."
decision: other
applies_to: brief field time_budget_minutes
notes: inferred, not asked: 22 minutes. Ch 6 and Ch 7 were 20 for three objectives; Ch 8 has its three draft objectives plus node pools moved from Ch 5 (d-12 there), drafted as o-4. Confirmed or changed at the checkpoint, with the objectives. Prose is not compressed to fit; a too-big plan proposes a split (§2.10).

### d-02 · 2026-11-16T21:00:00 · intake
question: How much research should Chapter 8 get? (not asked: inferred)
answer: "start a /didactician run on ch 08. Let's use Sonnet or Haiku (your choice) for the researcher, but I think orchestrator and instruction designer should be fable."
decision: other
applies_to: brief field research_depth
notes: light, as the chapter entry suggests and as every Part II chapter used; one researcher; default caps.

### d-03 · 2026-11-16T21:00:00 · intake
question: Which models run which roles?
answer: "Let's use Sonnet or Haiku (your choice) for the researcher, but I think orchestrator and instruction designer should be fable."
decision: other
applies_to: dispatch model per role
notes: researcher on Sonnet (orchestrator's choice: the chapter leans on defaults, timings and 2026 provider status that need careful source reading, which is worth more than Haiku's saving on one dispatch); orchestrator and instructional-designer on Fable. Builders and reviewers not specified by the user: ask at the checkpoint.

### d-04 · 2026-11-16T21:30:00 · checkpoint
question: Your 5 comments on the Chapter 8 plan all pick the recommended option (a) for Q1–Q5: one chapter at about 25 min, no explorer, about seven minutes instead of twenty, the reshaped objectives, no pool change. Are you finished with this round, and what's the decision on the plan?
answer: "Approve (Recommended)"
decision: approved
applies_to: plan
notes: comments in review/human-plan-1/comments.md (#1 "yes. let's do a." Q1; #2 "none" Q2; #3 "I'm not really understanding the question but let's go with your recommendation" Q3; #4 "not sure what your question is, you're recommending moving around learning objectives, but this seems inconsequential, let's just do it." Q4; #5 "let's keep it simple" Q5). Supersedes d-01's 22 minutes: one chapter at about 25 planned. The brief's o-4 is replaced by the plan's `## Objectives` (node pools inside o-1; o-4 = scaling down and the bill).

### d-05 · 2026-11-16T21:30:00 · checkpoint
question: You didn't comment on Q6–Q8: the story facts (dispatch autoscaler 60% target, 3–10 copies; pool of 3–8 nodes; node 05 given back; a marketing push at 17:30 causes the late Friday; catalog's database connection limit as the bottleneck; Sam speaks the conversation's line), the names "the HPA" and "the cluster autoscaler", and a staffing-rule analogy aside. Take the designer's recommendations for all three?
answer: "Yes, all three (Recommended)"
decision: approved
applies_to: plan Q6, Q7, Q8; story facts in `## Curriculum recommendations`
notes: story facts approved with the plan; names "the HPA" and "the cluster autoscaler"; the staffing-rule aside stays (first in the cut order).

### d-06 · 2026-11-16T21:30:00 · checkpoint
question: Which models should run the builders and the reviewers for Chapter 8?
answer: "Fable build, Sonnet review"
decision: other
applies_to: dispatch model per role
notes: page-builder (and any widget builder or wording editor) on Fable; accuracy and pedagogy-ux reviewers on Sonnet.

### d-07 · 2026-11-16T21:30:00 · checkpoint
question: You said you're close to running out of usage credit. The build is the most expensive stage. When should it start?
answer: "Start the build now"
decision: approved
applies_to: build stage timing
notes: dispatch the page builder now; if halted, the next session respawns it from what's on disk. Builder told to write fragments to disk as it goes.

### d-08 · 2026-11-16T23:30:00 · review
question: (unprompted, while the round-1 reviewers were running) What happens after the review fixes?
answer: "after all this commit it and push it, no need to initiate a human review, I'll review later."
decision: other
applies_to: human-review site-1 timing; commit and push
notes: after the round-1 fix round passes the gate, move the run to stage `human-review` and leave it there (CURRICULUM §8 step 9: a deferred review never ships); don't open a review session; commit the chapter and push. Not an approval of the page and not a skip of human review. The closure round and curriculum updates wait for the review.
