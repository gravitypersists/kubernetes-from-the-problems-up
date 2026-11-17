# Handoff 06 → accuracy-reviewer (accuracy-r1)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/accuracy-reviewer.md`. This file is your task.

## Original request (verbatim)

> (this session) continue the didactician run on ch 08, it was last halted part way through a page builder run
>
> (the run's original request) start a /didactician run on ch 08. Let's use Sonnet or Haiku (your choice) for the researcher, but I think orchestrator and instruction designer should be fable.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/brief.md` (its o-4 is superseded: the plan's `## Objectives` are the objectives, user decision d-04)
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`
- Run (`<out>`): `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling`

## Task

Round-1 accuracy review of the built Chapter 8 page ("The Friday dinner rush: autoscaling") in the course "Desired state: Kubernetes from the problems up". Make each finding complete enough to fix without a follow-up question.

Check every factual statement on the page against `facts.md`. Where `facts.md` doesn't cover a statement, check it against reliable sources you verify yourself (prefer kubernetes.io, the cluster autoscaler's own documentation and the cloud providers' own pages). The review covers:
- prose in segments s-01 to s-09 (source fragments in `site/src/`; the assembled page is `site/index.html`), figures Fig. 01 to Fig. 09, the term cards, asides, disclosures and the sources footer. **Four blocks are locked until a check is committed** (after k-03, k-04, k-06, k-07): read the fragments, or commit the checks in a browser, so that you review the locked text too;
- every comprehension item's prompt, key, options and feedback (k-01 to k-08; feedback is in `data-fb` attributes);
- all lane text, canvas strings and snapshot data in `site/widgets/w-rush-scrolly/data.js` (lane A, steps A1–A6, and `FIGURES.after`, which `site/assets/page.js` draws as Fig. 06);
- the loop lens table data (`CH08_LOOPS`) and the week-chart data in `site/assets/page.js`.

Pay particular attention to these:
- **The HorizontalPodAutoscaler:** what it reads (use measured against the Pods' requests, averaged over the Pods), the target, the desired-copies arithmetic (ceil of current copies × reading ÷ target), min and max, the tolerance, how often it looks, and what it does with several metrics. Check every worked number on the page (the gauges in Fig. 02, the 180% reading, 3 → 6 → 9 copies) by redoing the arithmetic.
- **How fast it scales up and down:** the default scale-up behaviour and the scale-down stabilisation window; whether "in a couple of quick steps" to 9 is consistent with the default scale-up policy.
- **The cluster autoscaler:** what triggers it (Pods that can't be scheduled, not processor use), node pools / node groups with a minimum and maximum, how it picks a pool, when it gives a node back (under-used for how long, Pods that can move), and what blocks that. Check the dated statements about providers and alternatives (Karpenter, GKE, AWS) and that each vendor figure carries its source and date.
- **Timings, which are the chapter's main claim:** a Pod's start at about 1.5 minutes, a node's start at about four minutes at Fennel, the seven-minute total and how it is split in Fig. 04, and the general ranges given for image pulls, readiness and node start-up. The page says which of these are Fennel's fiction and which are typical; check that each general range is honestly hedged and not presented as a measured statistic.
- **Buying back the wait (Fig. 05):** each of the five ways (a lower target, a higher minimum, scheduled scaling, spare room / placeholder Pods, faster starts) must work as described, with its cost stated truthfully.
- **Scaling down and the bill:** which node can be removed and why; what happens to its Pods; the bill arithmetic before and after.
- **When more Pods don't help:** `catalog`'s copies limited by the database's connection limit. Is it true that the autoscaler's reading can stay low while callers wait, and that a copy that can't reach its database fails readiness (if a readiness check tests that)? Check the hedging.
- **Simplifications that cross into falsehood**, and anything stated without the hedge its claim's confidence needs.

Fennel (the company, its people, services, node numbers, times, prices and versions) is declared fiction on the page and needs no sourcing. Three conditions still apply: fiction must not be presented as statistics; the mechanisms it illustrates must be true; and its numbers must be consistent everywhere they appear (prose, figures, lane data, check feedback, charts), including with CURRICULUM §3's established facts from Ch 3–7 and the plan's approved story facts (`## Conventions` and `## Curriculum recommendations` in the plan: `dispatch`'s autoscaler at a 60% target with 3–10 copies; a pool of 3–8 nodes; node 05 given back; a marketing push at 17:30 causing the late Friday; `catalog`'s database connection limit).

Also check scope: no later-chapter terms used as concepts. The term ledger in CURRICULUM.md §5 lists what Ch 1–7 may use.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/research/facts.md`, the rest of `run/research/`, and the earlier chapters' `run/research/facts.md` it references
- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/` (`index.html`, `src/`, `assets/`, `widgets/`, and `pool/cluster/` for how the drawing labels things)
- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/plan/learning-plan.md` `## Conventions` only (Fennel's numbers for this chapter): `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/kb.py /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling ids` lists records; the plan is otherwise not your input
- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/screenshots/page-round-5/` and `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/gate/page-round-5.json` (gate results)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §3 (established story facts), §5 term ledger, §7 Ch 8–10 entries (scope)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/review/round-1/accuracy.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`)
- Probe screenshots, if any, in `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/screenshots/probe/` (prefix them `acc-r1-`)
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I8: Each agent writes only in its namespace. Yours is `run/review/round-1/` (your file) and `run/screenshots/probe/`.

## User decisions that apply (quoted from run/decisions.md)

- d-04: "Approve (Recommended)" → the plan is approved as written: one chapter at about 25 minutes; the late Friday takes about seven minutes with nothing broken. Length is not an accuracy issue.
- d-05: "Yes, all three (Recommended)" → the story facts are approved fiction; the loops are named "the HPA" and "the cluster autoscaler". Check that the mechanisms they illustrate are true, not the fiction itself.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every factual statement on the page (including the four locked blocks), in the lane's data, in Fig. 06's snapshot, in the chart and loop-lens data and in check feedback has been checked. Each problem is a finding with severity, location (segment or widget ID), evidence and expected fix.
- [ ] `accuracy.md` follows the review template.

## Not your job

- Pedagogy, layout and prose style (the pedagogy-UX reviewer's lane), beyond flagging something misleading.
- Fixing anything; editing the site, plan or research.
