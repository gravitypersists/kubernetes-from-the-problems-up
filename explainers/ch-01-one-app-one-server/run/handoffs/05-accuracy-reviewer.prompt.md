# Handoff 05 → accuracy-reviewer (review-accuracy-r1)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/accuracy-reviewer.md`. This file is your task.

## Original request (verbatim)

> we're going to start a run to create Ch 1 from CURRICULUM.md. Go ahead and get it started. This will be the first time I'm running this skill not as a standalone, but as a chapter in a bigger course. Weigh this when producing widgets (widgets can be used across chapters. If a widget might be useful in a future chapter, this might justify building it, but use discretion, because an analysis on that chapter might veto that widget for pedagogical reasons). Feel free to recommend changes to curriculum at the checkpoint.

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Round-1 accuracy review of the built Chapter 1 page ("One app, one server") of the course "Kubernetes for Technical Managers". Check every factual statement on the page, including widget `w-rebuild` text (in `site/widgets/w-rebuild/data.js`) and all check feedback, against `facts.md` and, where a statement isn't covered there, against reliable sources you verify yourself. Fennel (the company, its people, times, dates and events) is declared fiction on the page and needs no sourcing, but fiction must not be presented as statistics, and the mechanisms it illustrates must be true. Also check: no later-chapter terms (container, image, registry, orchestration, Kubernetes, cluster, node, pod) used as concepts on the page; check answers are actually correct and their feedback is true.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/facts.md` (and the rest of `run/research/` if useful)
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/` (index.html, assets/, widgets/w-rebuild/)
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/screenshots/page-round-5/` (gate screenshots)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §5 term ledger and §7 Ch 1–2 entries (scope)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/round-1/accuracy.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`)
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

- d-01: "12 minutes (Recommended)" → the time budget is 12 minutes of reading plus interaction.
- d-03: "Approve" (the plan, including select-then-reveal k-02 and diagnosis k-04 instead of free-text listing) → the plan is the approved spec.
- d-04: "Yes, use it" (Jordan and Morgan are the two Year 0 founders, Sam the only engineer, the app is called "the Fennel app") → the approved cast.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every factual statement on the page and in the widget has been checked; findings written with severity (blocking / should / nit), location and expected fix.

## Not your job

- Pedagogy, UX, visual style (another reviewer covers them).
- Fixing anything in `site/`; editing research or plan.
