# Handoff 08 → widget-builder (r1-fixes-widget)

## Your role

Continue as widget-builder for `w-samecode` (`/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/widget-builder.md`). This file is your task.

## Original request (verbatim)

> okay, commit it, clear context of everything you don't need for ch 2 and proceed with building chapter 2 with the didactician skill

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Address the review-round-1 findings you own, listed below. The full text, evidence and expected fixes are in `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/round-1/findings.md`. Answer each finding with a disposition (`fixed`, `disputed` with evidence, or `blocked`) in your report's `dispositions:` section. Report the widget's final constant heights at 1280, 768 and 360; the page builder is setting the mount reservation in parallel.

## Findings to address

- A-02 (should): state 2 contradicts itself. Production is shown failing while the laptop says "caught before release". Make production's state-2 result hypothetical ("would fail the same way" / not released), per the finding's options. This is data or lead text, not check text.
- P-01 (should): at widths of 700px and up, "Next" comes before the check feedback in tab order. Make Next reachable by forward Tab from the feedback at every width.
- P-02 (should): the widget is 1742px tall at 360. Reduce the tallest phone state without dropping the no-reflow rule. Use the finding's options, cheapest first: show each category once per group, as Ch 1 does; put SAME / DIFFERENT on the label line; and so on. Don't cut plan content or check text.
- P-05 (nit): give the code chip inside the image band a `--surface` fill, and show each category once per group (shared with P-02).

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/round-1/findings.md`
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/learning-plan.md`
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/site/` (read-only outside your namespace)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/site/widgets/w-samecode/`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, with a `dispositions:` line per finding ID and the measured heights.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace

## User decisions that apply (quoted from run/decisions.md)

- d-06: "Extend 45 min (Recommended)" → the run is time-capped. Fix efficiently, with no polish beyond the findings.

## Done when

- [ ] Every listed finding has a disposition.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-02-containers --widget w-samecode` passes.

## Not your job

- Page prose, page checks, page.css/page.js, the manifest and the mount reservation. The page builder is on these in parallel.
- Content cuts; editing the plan, research, curriculum or Ch 1's files.
