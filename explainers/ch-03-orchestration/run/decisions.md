# Decisions

<!-- Orchestrator only. Format: templates/decisions.md -->

### d-01 · 2026-10-21T15:00:00 · intake
question: Time budget for Ch 3 (3 draft objectives plus a three-phase placement widget; Ch 1 planned 12 built ~17, Ch 2 planned 14 built ~16)
answer: "15 minutes (Recommended)"
decision: approved
applies_to: brief field time_budget_minutes

### d-02 · 2026-10-21T15:00:00 · intake
question: Agent-time cap for this run?
answer: "Keep default (Recommended)"
decision: other
applies_to: cap agent_minutes
notes: default 75 min; escalate if reached.

### d-03 · 2026-10-21T16:10:00 · checkpoint
question: Approve the Ch 3 plan (mockup open in your browser) for build?
answer: "Review the human-review.md I just added into reviews for chapter 2. I'm going to ask an agent to go back and undo the w-01 widget in chapter 2 and implement scrollytelling instead. Consider doing that here please, review if the widget is serving a pedagogical need or if we're unnecessarily increasing cognitive load when a scrollytelling portion of the article would do better at showing stages of progression. "
decision: revise
applies_to: plan
notes: human review at /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/human-review.md; designer re-evaluates w-fleet vs. scrollytelling and applies the review's general lessons.

### d-04 · 2026-10-21T16:10:00 · checkpoint
question: New Fennel story facts (copies and sizes per service, 02:51 crash and 03:04 machine failure, storefront v12→v13, Sam's "Nobody deploy anything", Morgan's "Could four do it?"). OK?
answer: "Yes, use them"
decision: approved
applies_to: plan

### d-05 · 2026-10-21T16:10:00 · checkpoint
question: Curriculum recommendations R1–R13: apply 'now' set, R4/R5 after ship?
answer: "Apply 'now' set (Recommended)"
decision: approved
applies_to: other (CURRICULUM.md)
notes: applied after the revised plan is settled, because R6–R10 and R13 describe w-fleet reuse, which d-03 may change; R1–R3, R11, R12 are independent.

### d-06 · 2026-10-21T17:05:00 · checkpoint
question: Approve the revised Ch 3 plan (three scrollytelling sections, mockup open) for build?
answer: "Approve"
decision: approved
applies_to: plan

### d-07 · 2026-10-21T17:05:00 · checkpoint
question: The reader now makes Sam's three key decisions instead of placing containers by hand. The chapter entry and o-1 say 'by hand'. Accept that change?
answer: "Accept (Recommended)"
decision: approved
applies_to: brief field objectives
notes: o-1 reworded to "having made the key decisions themselves"; CURRICULUM Ch 3 entry updated to match.

### d-08 · 2026-10-21T17:05:00 · checkpoint
question: Which of the new course-wide conventions should go into CURRICULUM.md now?
answer: "R13 scrolly pattern, R14 term card, R15 jump-ahead opening"
decision: approved
applies_to: other (CURRICULUM.md)
notes: applied with the d-05 'now' set (R1–R3, R6–R15); R4, R5 after ship.

### d-09 · 2026-10-21T19:10:00 · escalation
question: Agent-time cap reached (84/75 min) before review. How to run the review?
answer: "Extend 25 min"
decision: extended
applies_to: cap agent_minutes
notes: applied as 25 min on top of the current clock (cap 75 → 109); one merged pedagogy-ux reviewer with also_accuracy: true, one fix round, no closure round.

### d-10 · 2026-10-21T19:20:00 · delta
question: Fixes change approved-final check text (k-08 options, k-06/k-07 keys, "the list" in k-04, shorter k-05/k-09 prompts). Allow?
answer: "Allow rewording (Recommended)"
decision: approved
applies_to: plan
notes: same meaning and same keys; P-05, P-06, P-07, P-11, P-12.

### d-11 · 2026-10-21T19:20:00 · delta
question: ToC shows "§ 05 Its name is Kubernetes" from the top (ac-02, §2.2). Relax or retitle?
answer: "Relax it (Recommended)"
decision: waived
applies_to: plan
notes: ac-02 relaxed for the ToC only; P-08 closed without change.

### d-12 · 2026-10-21T19:20:00 · delta
question: New story fact: on Monday Sam moves everything onto four machines; the other four sit empty as spares Fennel still pays for. OK?
answer: "Yes (Recommended)"
decision: approved
applies_to: plan
notes: P-02; recorded in R4 at ship.

### d-13 · 2026-10-21T19:20:00 · delta
question: Review estimates 17–18 min vs 15. Apply cuts now?
answer: "Decide at delivery"
decision: other
applies_to: brief field time_budget_minutes
notes: fix first; measure; offer cut order at delivery.

### d-14 · 2026-10-21T19:50:00 · delivery
question: Built page runs ~16.5–17.5 min vs 15-min label. What to do?
answer: "Relabel to 17 min (Recommended)"
decision: other
applies_to: brief field time_budget_minutes
notes: no cuts; label and brief to 17.

### d-15 · 2026-10-21T19:50:00 · delivery
question: Apply post-ship curriculum updates (R4, R5) and commit Ch 3 with the two human-review files and today's CURRICULUM changes?
answer: "Apply and commit (Recommended)"
decision: approved
applies_to: other (CURRICULUM.md, git)

### d-16 · 2026-10-21T23:30:00 · post-delivery
question: Address the user's human review of the delivered chapter (run/review/human-review.md).
answer: "Please address the changes - do so yourself, please. Keep it constrained."
decision: approved
applies_to: site (s-03, s-05, s-06, s-07, f-02)
notes: Applied directly in the main session, no dispatch. s-03 idle-machines paragraph rewritten (opens on Morgan's question; same claims, 12–18% still hedged). s-05 "Morgan's question … at Google's scale" → "Just like Morgan at Fennel, Google cared about idle machines: …". s-06 meta opener replaced with the user's suggested framing, which also states the section's purpose (place Docker vs Kubernetes, m-02) without giving away k-08. f-02: docker build / docker run moved out of the process-row style into a dashed, unfilled "Commands Riley types" strip with $ prompts. NOTE aside after the push paragraph: real teams build and push images on a shared build server, not laptops. Gate round 10 PASS. Follow-up (review file re-saved with an expanded §06 note and a §07 note): s-06 prose now says a container is a general idea and Docker one brand of tools; OCI (2015, Docker donated its image format) sourced to opencontainers.org and added to Sources. s-07: Sam's quote kept; k-09 replaced with "If we'd been on Kubernetes last Saturday, what would have been different?" (A prevents failure, B m-27, C replacing + connecting = correct); the conversation question moved to prose with the Ch 14 pointer; new Part I → II transition paragraph (catching up → getting ahead). Gate round 11 PASS. No fresh accuracy or pedagogy-ux review.
