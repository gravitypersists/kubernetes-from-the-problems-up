# Handoff 10 → pedagogy-ux-reviewer (review-pux-r2)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/pedagogy-ux-reviewer.md`. This file is your task.

## Original request (verbatim)

> okay, commit it, clear context of everything you don't need for ch 2 and proceed with building chapter 2 with the didactician skill

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

**Closure round (round 2).** Re-review the revised Chapter 2 page. For each round-1 finding in your lane (P-01..P-05) in `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/round-1/findings.md`, read the builder's disposition in `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/handoffs/round-1-dispositions.md`, inspect the current site, and mark the finding `closed`, `still-open` or `dispute-upheld`. You may raise **new** findings only at `blocking` severity (e.g. a regression introduced by the fixes). Keep the same review format.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/round-1/findings.md` (round-1 findings)
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/handoffs/round-1-dispositions.md` (builders' dispositions)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/learning-plan.md`, `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/cut-list.md`, `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/mockup.html` (approved; mockup prose was a draft, its check text final)
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/site/` (index.html, assets/, widgets/)
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/screenshots/page-round-5/` (gate screenshots)
- `/Users/m/workspace/k8s-course/design/control-plane/` (README.md, tokens.json, components/)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §2, §3, §5, §6, §7 Ch 2 entry; Ch 1 as built (`/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/`) is the course's reference implementation of the style, so check cross-chapter consistency

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/round-2/pedagogy-ux.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`)
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/screenshots/probe/` if you probe
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

- d-01: "14 minutes" → the time budget is 14 minutes of reading plus interaction.
- d-03: "Approve" → the plan is the approved spec.
- d-07: "Reword k-05 option C (Recommended)" → builders were allowed to reword k-05 option C (same meaning) for P-03.
- d-04: "Yes, use them" (Riley (they/them), a Year 1 engineer; photo tool 6.2 in prod vs 7.0 on Riley's laptop; images fennel-app:v42/v43; Year 1 = one production machine plus staging) → approved Fennel story facts (fiction).

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every round-1 finding in your lane is marked closed / still-open / dispute-upheld with evidence; any new finding is blocking-only.

## Not your job

- Factual accuracy (another reviewer covers it).
- Fixing anything in `site/`; editing plan or curriculum.
