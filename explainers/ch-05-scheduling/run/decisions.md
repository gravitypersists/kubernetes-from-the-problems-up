# Decisions

<!-- Orchestrator only. Format: templates/decisions.md -->

### d-01 · 2026-10-22T19:28:00 · intake
question: Ch 5 has 3 objectives plus a possible hands-on bin-packing sandbox; earlier chapters built 2–5 min over plan. What time budget?
answer: "~20 min (Recommended)"
decision: approved
applies_to: brief field time_budget_minutes
notes: one chapter, 20 minutes; designer gives an honest minutes table and a cut order, and proposes a split only if it plans out well over 20. Per the user's Ch 4 human review, prose is not compressed to fit; reorganizing chapters is preferred.

### d-02 · 2026-10-22T19:28:00 · intake
question: Research depth and agent-time cap?
answer: "Standard, cap 120 min (Recommended)"
decision: extended
applies_to: cap agent_minutes
notes: research_depth standard (the entry suggested light); init default cap 105 → extended by 15 to 120.

### d-03 · 2026-10-22T21:40:00 · checkpoint
question: Approve the Ch 5 plan (mockup open in your browser), including its invented story facts (16 GB / 4-core nodes, the service sizes, Friday's 5 nodes, Tuesday's OOM-kills, Year 2's spare machines given back before the move)?
answer: "Approve"
decision: approved
applies_to: plan
notes: story facts R2 approved; recorded in CURRICULUM §3 after ship.

### d-04 · 2026-10-22T21:40:00 · checkpoint
question: Q1: Ch 4's moving day puts two storefront Pods on node 01, but the default scheduler would spread them across 01, 04 and 02. How should we handle it?
answer: "(b) Fix Ch 4 (Recommended)"
decision: approved
applies_to: other (Ch 4 site: w-cluster-scrolly lanes A and B; CURRICULUM §3 Ch 4 facts)
notes: course-level edit outside this run, before Ch 5's build: storefront on 01, 04, 02; at 03:04 orders → 04 (one of two nodes with room), lost dispatch → 01; Ch 4 re-gated. The plan is written for (b).

### d-05 · 2026-10-22T21:40:00 · checkpoint
question: Q2: The plan is about 26 minutes. Split it?
answer: "keep one chapter, don't cut, I will consider cut in human review (note it in output to consider cutting)"
decision: other
applies_to: brief field time_budget_minutes
notes: one chapter, the full plan, no cuts at build; time_budget_minutes relabelled 20 → 26. At delivery, list the cut order (cut-list.md `## If it runs long`) for the user to consider in human review.

### d-06 · 2026-10-22T21:40:00 · checkpoint
question: Both widgets reuse Ch 4's renderCluster. Promote it (and its lane controller) to explainers/_pool/ with the eight additions before the build, re-gating Ch 4 on the pooled copy?
answer: "Promote it (Recommended)"
decision: approved
applies_to: other (explainers/_pool/; Ch 4 site)
notes: course-level step outside the run (CURRICULUM §8 step 5), after the Ch 4 fix (d-04) and before Ch 5's build.

### d-07 · 2026-10-22T23:30:00 · delta
question: The course's widget height rule (CURRICULUM §8 step 6) says that under 600px a multi-state widget scrolls its header to the top on every state change. The sizing sandbox doesn't: its controls sit at the top on phones. Accept this exception for sandboxes?
answer: "Accept the exception (Recommended)"
decision: approved
applies_to: other (w-sizing-sandbox; CURRICULUM §8 step 6 clarification after ship)
notes: sandboxes with controls at the top don't scroll on change; stepped and multi-state widgets still follow the rule.

### d-08 · 2026-10-23T08:05:00 · delta
question: (unprompted, during review round 1) How many review rounds?
answer: "keep this to a single round of reviews please."
decision: approved
applies_to: cap loops.review (2 → 1)
notes: no closure round. Round-1 blocking and should findings go to the builders once, then the full gate; whatever is still open (including disputes) goes to the user at delivery instead of to fresh reviewers.

### d-09 · 2026-10-25T18:48:58 · delta
question: (unprompted, after delivery) Move the run back to the human review step now that the skill has one?
answer: "we'll want to perform the human review as a formal check from now on. In fact, I'd like to revert ch 5, 6 and 7 back to the human review step."
decision: other
applies_to: stage (done → human-review)
notes: the run stopped after the round-1 fixes passed the gate, which is where Stage 4b sits; nothing in site/ is reverted. The next step is a site review session (human_review.mjs --target site). The chapter leaves the course build (dist/) until it is back at deliver. Curriculum updates already applied from this chapter's plan stay; the review may change them.

### d-10 · 2026-10-25T23:05:38 · delta
question: Finished with site review round 1 (42 comments, §01–§07; none yet on §08–§09)?
answer: "Finished with this review"
decision: approved
applies_to: human-review site-1
notes: ingest the 42 comments as H- findings; §08–§09 get a look in the next site round, after the fixes.

### d-11 · 2026-10-25T23:05:38 · delta
question: Comments #6 and #10 (loop lens: "what does it do about a gap" is vague; say it compares desired with real state). Course-wide or Chapter 5 only?
answer: "Course-wide (Recommended)"
decision: approved
applies_to: CURRICULUM.md §2.3 loop lens wording
notes: reword the loop lens question in §2.3 and fix Chapter 5 now; Chapters 4, 6 and 7 pick it up in their reviews or a later pass.

### d-12 · 2026-10-25T23:06:35 · delta
question: H-37: does §06 (node pools) belong in Ch 5, before readers learn how nodes get added?
answer: "Move to Chapter 8 (Recommended)"
decision: rescope
applies_to: plan s-06, f-03, k-06, o-1 (node pools)
notes: reopens the plan: the designer drops s-06, f-03 and k-06 and narrows o-1; node pools move to Ch 8's entry and the term ledger.

### d-13 · 2026-10-25T23:06:59 · escalation
question: Agent-minutes at 127/120 before the human-review fixes. Extend for a designer revision and one combined builder?
answer: "Extend by 120 min (Recommended)"
decision: extended
applies_to: cap agent_minutes
notes: 120 → 240.

### d-14 · 2026-10-26T07:50:48 · delta
question: Finished with site review round 2 (window closed after ~20 min, 0 comments)?
answer: "Finished, all looks good"
decision: approved
applies_to: human-review site-2
notes: no new comments; nothing to ingest. Closing H-01..H-42 is asked separately.

### d-15 · 2026-10-26T07:51:21 · delta
question: Close H-01 to H-42 as fixed?
answer: "Close all 42 (Recommended)"
decision: approved
applies_to: H-01 H-02 H-03 H-04 H-05 H-06 H-07 H-08 H-09 H-10 H-11 H-12 H-13 H-14 H-15 H-16 H-17 H-18 H-19 H-20 H-21 H-22 H-23 H-24 H-25 H-26 H-27 H-28 H-29 H-30 H-31 H-32 H-33 H-34 H-35 H-36 H-37 H-38 H-39 H-40 H-41 H-42

### d-16 · 2026-10-26T07:51:21 · delta
question: Run a closure round (fresh accuracy and pedagogy reviewers) over the changed text and the round-1 fixes, raising the review cap 1 → 2?
answer: "Run the closure round (Recommended)"
decision: extended
applies_to: cap loops.review (1 → 2)
notes: supersedes d-08's single review round for this chapter.

### d-17 · 2026-10-26T07:52:24 · delta
question: (unprompted, during closure round 2) Sandbox sizing after the redesign
answer: "one small comment, w-02 needs to be resized now that it has a new layout, it's spaced too large. I assume that the reviews kicked off will identify that, but if not, please make sure it gets slotted into the round of fixes."
decision: revise
applies_to: widget w-sizing-sandbox (reserved height and spacing)
notes: goes into the round-2 fix handoff whether or not a reviewer raises it. The reserved height (~1270px at desktop) comes from payments' 8 GB maximum needing 10 nodes; the fix may lower that maximum or change the layout.

### d-18 · 2026-10-26T08:13:23 · delivery
question: Sandbox resized (dispatch max 6 → 5 GB; 923px reserved at desktop); nothing open. How to finish Chapter 5?
answer: "Ship it (Recommended)"
decision: approved
applies_to: delivery
notes: apply the plan's Revision 1 curriculum recommendations (R13–R19), stage deliver → done, rebuild dist/, commit and push.
