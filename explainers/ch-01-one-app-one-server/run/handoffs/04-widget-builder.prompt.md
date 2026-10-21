# Handoff 04 → widget-builder (w-rebuild)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/widget-builder.md`. This file is your task.

## Original request (verbatim)

> we're going to start a run to create Ch 1 from CURRICULUM.md. Go ahead and get it started. This will be the first time I'm running this skill not as a standalone, but as a chapter in a bigger course. Weigh this when producing widgets (widgets can be used across chapters. If a widget might be useful in a future chapter, this might justify building it, but use discretion, because an analysis on that chapter might veto that widget for pedagogical reasons). Feel free to recommend changes to curriculum at the checkpoint.

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Build widget `w-rebuild` (segment s-03) exactly as specified in the plan's `### w-rebuild` section: four stages (1 predict what's on Sam's server — check k-02; 2 rebuild from Sam's six-step notes; 3 run launch checks, photo upload and confirmation email fail, diagnose — checks k-03/k-04 as the plan assigns; 4 compare the two machines side by side). It mounts into the page's existing mount point and must respect the plan's `size:` (min-height 600px desktop, about 820px at 360px; stage changes never move the page). Check prompts, options and feedback are final: take them verbatim from the plan/mockup, with one exception below.

Specifics:
- **Files:** the page already loads `widgets/w-rebuild/data.js` before `widgets/w-rebuild/index.js`, plus `index.css`, per `site/widgets/manifest.json`. Create all three. Keep all content (rows, notes steps, check text, statuses) in `data.js` so a later chapter could re-skin the stage-4 comparison (plan's reuse note: Ch 2 "same code, one dependency version different"). Reuse must add no reader-visible complexity.
- **Wording change (orchestrator ruling, logged):** use "photo-resizing tool" wherever the plan says "image-resizing tool" (k-02 card, k-04 feedback, widget row). Reason: the plan's ac-03 forbids the later-chapter term "image" anywhere on the page, and the page prose already says "the photo tool". Change nothing else in the final check text.
- **Visual grammar:** follow the plan's `## Visual grammar` (machine as outlined frame with a `MACHINE · NAME` bar; code in c1; contents as c2 rows grouped RUNTIME / LIBRARIES & TOOLS / CONFIG / DISK & DATA; clutter and unknowns in c6 dashed; status as word + colour: PRESENT, MISSING, UNKNOWN, PASS, FAIL). This grammar will be reused by later chapters, so be consistent.
- **Style is fixed:** Control Plane. Use the tokens in `site/assets/tokens.css` (a copy of `design/control-plane/control-plane.css`); don't invent tokens or hard-code colours. Follow `/Users/m/workspace/k8s-course/design/control-plane/README.md` and `tokens.json` usage notes; use the slider-widget and check treatments in `design/control-plane/components/` (`bundle.css`) as the reference for widget chrome and checks. Match the check behaviour the page already uses for k-01/k-05..k-09 (see `site/assets/page.js`, `page.css`) so the reader meets one check pattern; you may read those files but not edit them.
- No Kubernetes, containers, images, registries or orchestration terms. Fennel details (times, dates, the log clean-up job, the holiday-sale setting) are fiction; never present them as statistics. Cast: Sam is the only engineer; Jordan and Morgan are founders; the app is "the Fennel app"; don't name `storefront`.
- Misconception IDs, if any appear in code comments/data: catalog IDs m-19 (code is the app), m-20 (runbook), m-21 (bigger server), m-22 (VMs), not the plan's local m-01..m-04. Never reader-visible.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/learning-plan.md` (`### w-rebuild`, `## Visual grammar`, `## Comprehension items`, `## Acceptance criteria`)
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/mockup.html` (the widget walkthrough; check text final)
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/facts.md`
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/index.html`, `site/assets/*`, `site/widgets/manifest.json` (read-only for you)
- `/Users/m/workspace/k8s-course/design/control-plane/` (README.md, tokens.json, components/)
- `/Users/m/workspace/k8s-course/.claude/skills/didactician/references/widgets.md` and the kit as your role file directs

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/widgets/w-rebuild/` (data.js, index.js, index.css, and anything else the widget needs)
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

- d-01: "12 minutes (Recommended)" → the page is already near budget; the widget should take the plan's 3–4 minutes, not more.
- d-03: "Approve" (the plan, including select-then-reveal k-02 and diagnosis k-04 instead of free-text listing) → build the widget as specified.
- d-04: "Yes, use it" (Jordan and Morgan are the two Year 0 founders, Sam the only engineer, the app is called "the Fennel app") → use this cast.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] All four stages work by mouse, touch and keyboard; checks behave like the page's other checks.
- [ ] Widget acceptance criteria in the plan are met.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server --widget w-rebuild` passes.

## Not your job

- Page prose, other checks, figures, global CSS/JS, `site/widgets/manifest.json`, `site/index.html`.
- Editing the plan, research, CURRICULUM.md or the style guide.
- Building a "try a fix" stage (cut).
