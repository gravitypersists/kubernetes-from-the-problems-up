# Handoff 07 → page-builder (r1-fixes-page)

## Your role

Continue as page-builder (`/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`). This file is your task.

## Original request (verbatim)

> okay, commit it, clear context of everything you don't need for ch 2 and proceed with building chapter 2 with the didactician skill

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Address the review-round-1 findings you own, listed below. The full text, evidence and expected fixes are in `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/round-1/findings.md`. Answer each finding with a disposition (`fixed`, `disputed` with evidence, or `blocked`) in your report's `dispositions:` section.

Also set the `w-samecode` mount's reserved min-height in `page.css` (while empty) close to the widget's final heights. The widget builder measured 952px at 1280, 1045px at 768 and 1742px at 360. It is shrinking the phone height in parallel (P-02), so reserve a value at or a little below the current figures; the reservation only matters before the widget mounts.

## Findings to address

- A-01 (should): version labels can be moved. Add one caution sentence near the immutability paragraph in s-03, and fix Fig. 01's registry labels in `page.js` (`CH02_REGISTRY`: "never changes" / "every version kept as it was") so they don't claim the label is immutable. Keep it to the finding's scope. Tags vs. digests in depth belongs to Ch 6.
- A-03 (should): images often carry an operating system's basic files, but never its kernel. Add a clause in s-05 and adjust Fig. 02 if it's cheap.
- A-04 (nit): shipping-container name origin. Rephrase as a comparison.
- A-05 (nit): k-07 option B feedback should say "…takes seconds once the machine has the image" (or "is fast").
- P-03 (should): reword k-05 option C so it no longer repeats s-04's definition, keeping its meaning; balance the distractors to match in length and shape. The user approved this at d-07.
- P-04 (nit): page checks should focus the feedback after a pick (`tabindex="-1"`, `preventScroll: true`), as the widget does. Don't touch Ch 1's files.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/round-1/findings.md`
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/facts.md`, `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/learning-plan.md`

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/site/`, except the contents of `site/widgets/<id>/`.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, with a `dispositions:` line per finding ID.

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
- d-07: "Reword k-05 option C (Recommended)" → same meaning in different words; distractors balanced to match. Change no other check text, except A-05's feedback wording.

## Done when

- [ ] Every listed finding has a disposition.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-02-containers --phase page` passes.

## Not your job

- Anything in `site/widgets/w-samecode/`. The widget builder is fixing A-02, P-01, P-02 and P-05 in parallel.
- Content cuts; editing the plan, research, curriculum or Ch 1's files.
