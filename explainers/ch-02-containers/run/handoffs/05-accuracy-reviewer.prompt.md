# Handoff 05 → accuracy-reviewer (review-accuracy-r1)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/accuracy-reviewer.md`. This file is your task.

## Original request (verbatim)

> okay, commit it, clear context of everything you don't need for ch 2 and proceed with building chapter 2 with the didactician skill

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Round-1 accuracy review of the built Chapter 2 page ("'Works on my machine': containers") of the course "Kubernetes for Technical Managers". Check every factual statement on the page, including widget `w-samecode` text (in `site/widgets/w-samecode/data.js`) and all check feedback, against `facts.md` and, where a statement isn't covered there, against reliable sources you verify yourself. Fennel (the company, its people, times, dates and events) is declared fiction on the page and needs no sourcing, but fiction must not be presented as statistics, and the mechanisms it illustrates must be true. Also check: no later-chapter terms (orchestration, orchestrator, Kubernetes, cluster, node, pod, Deployment, Service, volume) used as concepts on the page (Docker may be named once, deferred to Ch 3); Ch 1 terms are allowed. Facts may also come from Ch 1's `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/facts.md`, which Ch 2's facts reference; check answers are actually correct and their feedback is true.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/facts.md` (and the rest of `run/research/` if useful)
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/site/` (index.html, assets/, widgets/w-samecode/)
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/screenshots/page-round-3/` (gate screenshots)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §5 term ledger and §7 Ch 2–3 entries (scope)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/round-1/accuracy.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`)
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
- d-04: "Yes, use them" (Riley (they/them), a Year 1 engineer; photo tool 6.2 in prod vs 7.0 on Riley's laptop; images fennel-app:v42/v43; Year 1 = one production machine plus staging) → approved Fennel story facts (fiction).

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every factual statement on the page and in the widget has been checked; findings written with severity (blocking / should / nit), location and expected fix.

## Not your job

- Pedagogy, UX, visual style (another reviewer covers them).
- Fixing anything in `site/`; editing research or plan.
