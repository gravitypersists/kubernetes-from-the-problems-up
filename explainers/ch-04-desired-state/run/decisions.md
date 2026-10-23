# Decisions

<!-- Orchestrator only. Format: templates/decisions.md -->

### d-01 · 2026-10-21T23:10:00 · intake
question: Ch 4 has 4 objectives and §9 flags it as likely to run long; Ch 3 planned 15, built 17. How to scope?
answer: "One chapter, ~20 min (Recommended)"
decision: approved
applies_to: brief field time_budget_minutes
notes: one chapter, 20 minutes; designer gives an honest minutes table and a cut order, and proposes a split only if it plans out well over 20.

### d-02 · 2026-10-21T23:10:00 · intake
question: Research depth and agent-time cap?
answer: "Standard, cap 120 min"
decision: extended
applies_to: cap agent_minutes
notes: research_depth standard (the entry suggested light); init default cap 105 → extended by 15 to 120.

### d-03 · 2026-10-22T00:15:00 · checkpoint
question: Approve the Ch 4 plan (mockup open in your browser) for build?
answer: "Approve"
decision: approved
applies_to: plan

### d-04 · 2026-10-22T00:15:00 · checkpoint
question: New Fennel story facts for Year 3 (standard managed mode, Ari's team on nodes 01–04; moving day storefront:v38 replicas: 3 ending in Ch 3's Monday layout; 03:04 repeat on a default-settings clock, orders down ~6–7 min; Pod names orders-5c8x → orders-q2rw; Ari's line; notifications crash-looping on a missing setting). OK?
answer: "Yes, use them (Recommended)"
decision: approved
applies_to: plan
notes: recorded in CURRICULUM §3 after ship (R2).

### d-05 · 2026-10-22T00:15:00 · checkpoint
question: Course-wide style: capitalise Kubernetes kinds as the API spells them (Pod, ReplicaSet, later Deployment, Service, StatefulSet) from Ch 4 on; 'node' stays lowercase. Add to CURRICULUM now?
answer: "Yes, from Ch 4 on (Recommended)"
decision: approved
applies_to: other (CURRICULUM.md)
notes: R13 applied now as a §2 principle line.

### d-06 · 2026-10-22T00:15:00 · checkpoint
question: Curriculum updates R1–R12: when to apply?
answer: "After ship (Recommended)"
decision: approved
applies_to: other (CURRICULUM.md)

### d-07 · 2026-10-22T09:10:00 · delta
question: Blocking fixes A-01 (k-07 "upgrades" false) and P-01 (giveaway option lengths, k-02 caption) change approved check text. Allow rewording?
answer: "Allow rewording (Recommended)"
decision: approved
applies_to: plan
notes: same keys, same meaning; k-07 A loses "upgrading"; option lengths evened out; Fig. 01 caption takeaway moves after k-02.

### d-08 · 2026-10-22T09:10:00 · delta
question: Agent time 87/120; fix round plus closure review needs ~40–50 more. How to finish review?
answer: "No closure round"
decision: other
applies_to: cap agent_minutes
notes: cap stays 120; builders fix, gate re-runs; no fresh closure reviewer (as Ch 3). Remaining open findings reported at delivery.

### d-09 · 2026-10-22T09:10:00 · delta
question: Reviewer estimates ~23 min (22–25) vs 20. Length?
answer: "Relabel to ~23 min"
decision: other
applies_to: brief field time_budget_minutes
notes: no cuts; page time label and brief → 23.

### d-10 · 2026-10-22T09:25:00 · delta
question: (unprompted, after the fix round was interrupted by a rate limit)
answer: "Let's stay at 1 round of review for now, I will do a human review."
decision: other
applies_to: plan
notes: confirms d-08: no closure round; the user's human review follows delivery.

### d-11 · 2026-10-22T12:20:00 · post-delivery
question: Address the user's human review (run/review/human-review-01.md): readability pass.
answer: "I think the language on this page overall is very difficult to read. I'm going to ask for a pass on readability. You can determine whether you want to do it yourself, but let's keep it lean, I don't want to spend a million tokens just to do a readability pass. … Let's ignore these for now, we can reorganize chapters if we feel one is too long."
decision: approved
applies_to: site (prose, check feedback, figure captions, lane step text)
notes: done directly in the main session, no dispatch (as Ch 3 d-16). Reading-time constraints are lifted for this pass: favour flowing sentences over brevity. Keys, facts, hedges and vocabulary guard unchanged.

### d-12 · 2026-10-22T19:45:00 · post-delivery
question: Address the user's human review 02 (run/review/human-review-02.md): moving day unexplained, "the tool", record and API server ungrounded ("front door"), loops not shown running before the apply, the loop lens too vague and tied to moving day, node check-ins ungrounded.
answer: "okay, let's handle chapter 4 human review then. I haven't solidified those thoughts yet and wanted to see chapter 5 first, so take them as recommendation and input rather than must haves."
decision: approved
applies_to: site (§04, §05 prose, k-03 wording, lane A/B step text, f-04, §07, recap)
notes: done directly in the main session, as d-11. Keys, facts and hedges unchanged.

### d-13 · 2026-10-22T19:45:00 · post-delivery
question: How should the loop lens be worded, keeping the pattern (observe → compare → act) distinct from each loop that implements it? (Goes into CURRICULUM §2.3.)
answer: "Wants / sees / does (Recommended)"
decision: approved
applies_to: site (TERM 03, §04 lens paragraph, f-04, canvas lens line, recap); other (CURRICULUM.md §2.3)
notes: lens = which loop, what it wants, what it sees, what it does about a gap. f-04 gains a Wants column; the canvas lens line stays two lines (SEES / DOES).

### d-14 · 2026-10-22T21:50:00 · post-delivery
question: (from Ch 5's checkpoint, Ch 5 run d-04) Ch 4's moving day puts two storefront Pods on node 01, but the default scheduler would spread them across 01, 04 and 02. How should we handle it?
answer: "(b) Fix Ch 4 (Recommended)"
decision: approved
applies_to: site (w-cluster-scrolly data.js lanes A4–A5, B1–B6; f-05 sketch); other (CURRICULUM §3 Ch 4 facts)
notes: done directly in the main session. storefront on 01, 04, 02; at 03:04 orders → 04 (one of two nodes with room), the lost dispatch copy → 01; B5 text and aria labels updated. Keys, timings and k-05 unchanged.
