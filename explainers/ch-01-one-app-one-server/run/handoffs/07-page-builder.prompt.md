# Handoff 07 → page-builder (r1-fixes-page)

## Your role

Continue as page-builder (`/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`). This file is your task.

## Original request (verbatim)

> we're going to start a run to create Ch 1 from CURRICULUM.md. Go ahead and get it started. This will be the first time I'm running this skill not as a standalone, but as a chapter in a bigger course. Weigh this when producing widgets (widgets can be used across chapters. If a widget might be useful in a future chapter, this might justify building it, but use discretion, because an analysis on that chapter might veto that widget for pedagogical reasons). Feel free to recommend changes to curriculum at the checkpoint.

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/brief.md` (time_budget_minutes is now 17 per d-07)
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Address the review-round-1 findings you own, listed below. Full text, evidence and expected fixes: `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/round-1/findings.md`. Answer each with a disposition (`fixed`, `disputed` with evidence, or `blocked`) in your report's `dispositions:` section. A-01 and P-04 are the same defect (the f-03 timeline): fix it once and report both.

Two more items from the build concerns:
- Raise the w-rebuild mount's reserved min-height in `page.css` to match the widget's measured constant heights. The widget builder measured about 1023px at 1280, 1189px at 768 and 1491px at 360. It may reduce the narrow-width height under P-12 in parallel, so pick a safe value at or slightly below those figures. The reservation only matters before the widget mounts.
- Change the time label from 12 to 17 minutes wherever it appears (hero, ToC rail).

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/round-1/findings.md`
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/learning-plan.md`, `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/facts.md`
- `/Users/m/workspace/k8s-course/design/control-plane/`

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/` except the contents of `site/widgets/<id>/`.
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

- d-06: "All, incl. P-01 (Recommended)" → you may change approved check text, but only as findings A-02, A-07 and P-01 require. The meaning and correctness of every answer stay the same, and each option's feedback must stay true for that option.
- d-07: "Keep all, relabel time" → no content cuts. The time label changes from 12 to 17 minutes.
- d-08: "Extend 45 min (Recommended)" → the run is time-capped. Fix efficiently and add no polish beyond the findings.

## Findings to address (full text in findings.md)

- A-01 / P-04 (blocking / should): the f-03 timeline contradicts "a snapshot every night". Put all three panels within one day, relative to last night's snapshot.
- A-02 (should): k-07 option B and f-03 panel 3 should also say that orders taken since the snapshot are lost.
- A-03 (should): the "dependency" definition in s-04. Separate the data on the disk from the dependencies.
- A-05 (nit): reword the VM link text closer to the Red Hat source.
- A-06 (nit): soften "The only way to find out" in s-04.
- A-07 (nit): k-06 option A feedback should say "can take the whole site down".
- P-01 (should), page checks k-05, k-06, k-07 and k-08: balance option lengths and give the distractors the same "partly right" shape as the key. Put the key at A in at least one check. Keep each answer's meaning, and keep each option's feedback true. The widget builder handles k-03.
- P-05 (should): name "single point of failure" once in the s-06 prose.
- P-06 (should): add a disclosure marker to `.cp-why summary` in page.css. Use ink, not accent.
- P-07 (nit): trim the lead-ins that repeat the check prompts before k-01, k-06/k-07 and k-08.
- P-10 (nit): replace "SRE" with plain words.
- P-11 (nit): take the breaks label out of `warn`; fix the f-03 tag wrapping and the opacity of the context rows at 900px and wider.

## Done when

- [ ] Every listed finding has a disposition.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server --phase page` passes.

## Not your job

- Anything in `site/widgets/w-rebuild/`. In parallel, the widget builder is fixing A-04/P-02, k-03's part of P-01, P-03, P-06 for the widget's disclosures, P-08, P-09 and P-12.
- Content cuts; editing the plan, research or curriculum.
