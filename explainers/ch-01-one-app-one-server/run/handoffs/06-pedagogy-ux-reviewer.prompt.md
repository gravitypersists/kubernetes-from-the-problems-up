# Handoff 06 → pedagogy-ux-reviewer (review-pux-r1)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/pedagogy-ux-reviewer.md`. This file is your task.

## Original request (verbatim)

> we're going to start a run to create Ch 1 from CURRICULUM.md. Go ahead and get it started. This will be the first time I'm running this skill not as a standalone, but as a chapter in a bigger course. Weigh this when producing widgets (widgets can be used across chapters. If a widget might be useful in a future chapter, this might justify building it, but use discretion, because an analysis on that chapter might veto that widget for pedagogical reasons). Feel free to recommend changes to curriculum at the checkpoint.

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Round-1 pedagogy and UX review of the built Chapter 1 page ("One app, one server") of the course "Kubernetes for Technical Managers", against the brief and the approved learning plan (its acceptance criteria included). Include widget `w-rebuild` (try all four stages by mouse, keyboard and at 360px). Also check the page against the course style guide (Control Plane, `design/control-plane/`: README.md voice/colour/type/space/figure/widget rules, tokens.json usage notes, components/), per CURRICULUM.md §8 step 4, and against the course design principles in CURRICULUM.md §2 that apply to Ch 1. Judge time: the brief's budget is 12 minutes of reading plus interaction; report your estimate of the built page's time and, if over, which parts cost the most (don't cut anything yourself).

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/learning-plan.md`, `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/cut-list.md`, `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/mockup.html` (approved; mockup prose was a draft, its check text final)
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/` (index.html, assets/, widgets/)
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/screenshots/page-round-5/` (gate screenshots)
- `/Users/m/workspace/k8s-course/design/control-plane/` (README.md, tokens.json, components/)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §2, §3, §5, §7 Ch 1 entry

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/round-1/pedagogy-ux.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`)
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

- [ ] The page, all checks and all four widget stages have been exercised at desktop and 360px, both themes; findings written with severity (blocking / should / nit), location and expected fix.

## Not your job

- Factual accuracy (another reviewer covers it).
- Fixing anything in `site/`; editing plan or curriculum.
