# Handoff 12 → page-builder (relabel-reserve)

## Your role

Continue as page-builder (`/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`). This file is your task.

## Original request (verbatim)

> okay, commit it, clear context of everything you don't need for ch 2 and proceed with building chapter 2 with the didactician skill

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/brief.md` (time_budget_minutes is now 16, per d-09)
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Make two small changes and nothing else:

1. Change the time label from 14 to 16 minutes wherever it appears (hero, ToC rail).
2. Update the empty `w-samecode` mount's reserved min-height in `page.css` and the size notes in `site/widgets/manifest.json` to the widget's final heights:
   - 600px and wider: the widget keeps a constant height, 1001px at 1280 and 1045px at 768. Reserve about 1000px at 900px and wider, and about 1040px from 600 to 899px.
   - Under 600px, the widget now follows the course rule (CURRICULUM.md §8 step 5): each state takes its own height, and the first state is 1240px at 360 before an answer. Reserve about 1200px.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/site/` (index.html, assets/page.css, widgets/manifest.json), excluding `site/widgets/w-samecode/`.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I8: Each agent writes only in its namespace

## User decisions that apply (quoted from run/decisions.md)

- d-08: "Relax <600px, course rule (Recommended)" → phones don't reserve the tallest state.
- d-09: "Relabel to 16 min" → the label changes to 16; no cuts.

## Done when

- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-02-containers --phase page` passes.

## Not your job

- Anything else, including the widget's own files.
