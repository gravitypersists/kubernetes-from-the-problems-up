# Handoff 09 → accuracy-reviewer (review-accuracy-r2)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/accuracy-reviewer.md`. This file is your task.

## Original request (verbatim)

> we're going to start a run to create Ch 1 from CURRICULUM.md. Go ahead and get it started. This will be the first time I'm running this skill not as a standalone, but as a chapter in a bigger course. Weigh this when producing widgets (widgets can be used across chapters. If a widget might be useful in a future chapter, this might justify building it, but use discretion, because an analysis on that chapter might veto that widget for pedagogical reasons). Feel free to recommend changes to curriculum at the checkpoint.

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

**Closure round (round 2).** Re-review the revised Chapter 1 page. For each round-1 finding in your lane (A-01..A-07) in `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/round-1/findings.md`, read the builder's disposition in `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/handoffs/round-1-dispositions.md`, inspect the current site, and mark the finding `closed`, `still-open` or `dispute-upheld`. You may raise **new** findings only at `blocking` severity (e.g. a regression introduced by the fixes). Keep the same review format.

Context the round-1 reviewers didn't have: the user approved changes to the check text for the round-1 fixes (d-06 below) and raised the time budget to 17 minutes with no cuts (d-07).

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/round-1/findings.md` (round-1 findings)
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/handoffs/round-1-dispositions.md` (builders' dispositions)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/facts.md` (and the rest of `run/research/` if useful)
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/` (index.html, assets/, widgets/w-rebuild/)
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/screenshots/page-round-8/` (gate screenshots)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §5 term ledger and §7 Ch 1–2 entries (scope)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/round-2/accuracy.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`)
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/screenshots/probe/` if you probe
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace

## User decisions that apply (quoted from run/decisions.md)

- d-01: "12 minutes (Recommended)" → superseded by d-07 (now 17 minutes).
- d-03: "Approve" (the plan, including select-then-reveal k-02 and diagnosis k-04 instead of free-text listing) → the plan is the approved spec.
- d-06: "All, incl. P-01 (Recommended)" → builders were allowed to change check text for A-02, A-04/P-02, A-07, P-01 (answers keep their meaning).
- d-07: "Keep all, relabel time" → time budget is now 17 minutes; no content cuts. Don't re-raise length as a finding.
- d-04: "Yes, use it" (Jordan and Morgan are the two Year 0 founders, Sam the only engineer, the app is called "the Fennel app") → the approved cast.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every round-1 finding in your lane is marked closed / still-open / dispute-upheld with evidence; any new finding is blocking-only.

## Not your job

- Pedagogy, UX, visual style (another reviewer covers them).
- Fixing anything in `site/`; editing research or plan.
