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
