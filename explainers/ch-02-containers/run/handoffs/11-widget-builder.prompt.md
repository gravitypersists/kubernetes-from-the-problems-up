# Handoff 11 → widget-builder (phone-height-rule)

## Your role

Continue as widget-builder for `w-samecode` (`/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/widget-builder.md`). This file is your task.

## Original request (verbatim)

> okay, commit it, clear context of everything you don't need for ch 2 and proceed with building chapter 2 with the didactician skill

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Close P-02 (`/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/round-2/findings.md`) by applying the new course-wide widget height rule, which is now in CURRICULUM.md §8 step 5:

> On screens 600px and wider, a multi-state widget reserves the height of its tallest state, so moving between states never moves the page. Below 600px it does not: each state takes its own height, and on a state change the widget scrolls the new state's header to the top of the viewport.

- Keep the current behaviour at 600px and wider.
- Below 600px, drop the stacked-height reservation (the `reserve()` / hold-height logic) so each state is only as tall as its content. Keep the existing scroll-to-header on state change.
- An answer revealed within a state may still grow the widget, as page checks do.
- Change nothing else: no text, no layout changes beyond what this requires.

Report:
- the widget's height at 360px for each state, before and after an answer;
- confirmation that 768px and 1280px heights are unchanged (1045px and 1001px).

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/round-2/findings.md` (P-02)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §8 step 5

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/site/widgets/w-samecode/`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, with a `dispositions:` line for P-02.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I8: Each agent writes only in its namespace

## User decisions that apply (quoted from run/decisions.md)

- d-08: "Relax <600px, course rule (Recommended)" → apply the rule above to `w-samecode` now. There will be no third review; the gate re-runs.

## Done when

- [ ] P-02 has a disposition, and the heights are reported.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-02-containers --widget w-samecode` passes.

## Not your job

- The page's mount reservation and the time label (the page builder updates these next).
- Ch 1's `w-rebuild`.
- Any other change.
