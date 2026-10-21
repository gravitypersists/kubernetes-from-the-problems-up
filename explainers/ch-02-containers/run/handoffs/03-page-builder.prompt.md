# Handoff 03 → page-builder (ch2-page)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. This file is your task.

## Original request (verbatim)

> okay, commit it, clear context of everything you don't need for ch 2 and proceed with building chapter 2 with the didactician skill

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Build the Chapter 2 page ("'Works on my machine': containers") from the approved learning plan. That covers:
- the shell, tokens and ToC;
- all prose for s-01 to s-06;
- figures f-01 and f-02;
- every comprehension item the page owns;
- the mount for widget `w-samecode`, with the plan's reserved size;
- `site/widgets/manifest.json`.

`w-samecode` is `complexity: high`, and a separate widget builder will build it in `site/widgets/w-samecode/`. You provide its mount and its manifest entry only. The mockup is the approved content and flow. Its prose is a draft, so write the real prose yourself to the plan's intents. Only its check prompts, options and feedback are final, and they must be used verbatim.

Course consistency: Chapter 1 is the reference implementation of the course style, at `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/`. Copy and adapt its `assets/page.css` and `assets/page.js` patterns (hero, ToC, check behaviour with "Why the other answers miss", figure plates, analogy asides with "where this analogy breaks", sources footer) so the two chapters look and behave the same. Never edit Ch 1's files.

Ch 1's review rounds added these fixes; keep them:
- disclosure summaries show an ink ▸/▾ marker;
- the "breaks" label is in `ink-3`, not `warn`;
- check options are balanced in length and shape.

Show the time label as 14 minutes, and the hero kicker in Ch 1's pattern ("CHAPTER 02 · Part I · Fennel, year 1").

Other rules:
- No Kubernetes or orchestration terms. Docker may be named once, as in the plan.
- Fennel facts are fiction (approved at d-04); never present them as statistics.
- Respect the plan's sourcing caveats:
  - no "N times more containers than VMs";
  - keep the hedge on Google Cloud's size and start-up figures;
  - don't imply that a version label always points to the same image (ac-10).
- Use catalog misconception IDs (m-01, m-19, m-23, m-24) in any comments or data, and never in reader-visible text. The plan's local-01 is now m-23 and local-02 is now m-24.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/learning-plan.md`: the approved plan.
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/mockup.html`: approved content and flow; checks final.
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/cut-list.md`: what's out; don't re-add any of it.
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/facts.md`, and Ch 1's `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/facts.md`, which it references.
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/` (reference implementation; read-only).
- `/Users/m/workspace/k8s-course/design/control-plane/` (README.md, tokens.json, control-plane.css, components/).

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/site/`, except the contents of `site/widgets/<id>/`. You do write `site/widgets/manifest.json`.
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

- d-01: "14 minutes" → the built page should fit about 14 minutes of reading plus interaction. Don't trim prose to fit; report the estimate.
- d-03: "Approve" → build the plan as written.
- d-04: "Yes, use them" (Riley (they/them), a Year 1 engineer; photo tool 6.2 in prod vs. 7.0 on Riley's laptop; images fennel-app:v42/v43; Year 1 = one production machine plus staging) → use these story facts.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] All segments, figures and page checks in the plan are built, and the check text matches the mockup verbatim.
- [ ] `site/assets/tokens.css` is a copy of `design/control-plane/control-plane.css`, with no invented tokens or hard-coded colours.
- [ ] The `w-samecode` mount reserves the plan's size, and `site/widgets/manifest.json` lists the widget (files data.js, index.js, index.css).
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-02-containers --phase page` passes. The widget being reported as pending is expected.

## Not your job

- Building `w-samecode` itself (anything inside `site/widgets/w-samecode/`).
- Editing the plan, research, CURRICULUM.md, the style guide or Ch 1's files.
- Deployment.
