# Handoff 08 → widget-builder (r1-fixes-widget)

## Your role

Continue as widget-builder for `w-rebuild` (`/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/widget-builder.md`). This file is your task.

## Original request (verbatim)

> we're going to start a run to create Ch 1 from CURRICULUM.md. Go ahead and get it started. This will be the first time I'm running this skill not as a standalone, but as a chapter in a bigger course. Weigh this when producing widgets (widgets can be used across chapters. If a widget might be useful in a future chapter, this might justify building it, but use discretion, because an analysis on that chapter might veto that widget for pedagogical reasons). Feel free to recommend changes to curriculum at the checkpoint.

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Address the review-round-1 findings you own, listed below. Full text, evidence and expected fixes: `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/round-1/findings.md`. Answer each with a disposition (`fixed`, `disputed` with evidence, or `blocked`) in your report's `dispositions:` section. Report the widget's final constant heights at 1280, 768 and 360, because the page builder is raising the mount's reserved min-height in parallel.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/round-1/findings.md`
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/learning-plan.md`, `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/facts.md`
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/` (read-only outside your namespace)
- `/Users/m/workspace/k8s-course/design/control-plane/`

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/widgets/w-rebuild/`
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

- d-06: "All, incl. P-01 (Recommended)" → you may change approved check text, but only as findings A-04/P-02 and P-01 require. The meaning and correctness of every answer stay the same, and each option's feedback must stay true for that option.
- d-07: "Keep all, relabel time" → no content cuts.
- d-08: "Extend 45 min (Recommended)" → the run is time-capped. Fix efficiently and add no polish beyond the findings.

## Findings to address (full text in findings.md)

- A-04 / P-02 (should): k-02's prompt doesn't match its answer key. Widen the prompt to match the key, for example "Besides the code, what's on this machine that the site needs to keep working?". Soften the answer line per A-04 so it stays true for the photo tool and the log job. This is one defect: fix it once and report both IDs.
- P-01 (should), your part: k-03. Balance option lengths and give the distractors the same "partly right" shape, so the key isn't the longest or the only hedged option. Keep its meaning, and keep each option's feedback true. k-04's answers come from each item's kind, so leave k-04 alone unless the same issue applies to it.
- P-03 (should): on a stage change under 600px, scroll the stage header to the top of the viewport. Consider moving "All six notes" below the machine, so the step card sits directly above the rows.
- P-06 (should): add disclosure markers to `.wr-all summary`, `.wr-m__more > summary` and any other widget summaries, in ink, not accent. If you can see the page's `.cp-why` marker, match it; otherwise use ▸/▾.
- P-08 (nit): stage 1's name and lead repeat each other, and the lead is out of date after the reveal.
- P-09 (nit): make the IDENTICAL chip in stage 4 span both columns.
- P-12 (nit, optional): reduce the tallest stage's height at narrow widths without bringing back reflow. Only do this if it's cheap.

## Done when

- [ ] Every listed finding has a disposition.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server --widget w-rebuild` passes.

## Not your job

- Page prose, the page checks, page.css/page.js, the manifest and the mount min-height. The page builder is working on these in parallel.
- Content cuts; editing the plan, research or curriculum.
