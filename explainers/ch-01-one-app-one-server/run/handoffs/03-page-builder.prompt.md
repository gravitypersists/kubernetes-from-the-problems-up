# Handoff 03 → page-builder (ch1-page)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. This file is your task.

## Original request (verbatim)

> we're going to start a run to create Ch 1 from CURRICULUM.md. Go ahead and get it started. This will be the first time I'm running this skill not as a standalone, but as a chapter in a bigger course. Weigh this when producing widgets (widgets can be used across chapters. If a widget might be useful in a future chapter, this might justify building it, but use discretion, because an analysis on that chapter might veto that widget for pedagogical reasons). Feel free to recommend changes to curriculum at the checkpoint.

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Build the Chapter 1 page ("One app, one server") from the approved learning plan: the shell, tokens, ToC, all prose for s-01..s-07, figures f-01..f-03, all comprehension items k-01..k-09, the mount for widget `w-rebuild`, and `site/widgets/manifest.json`. `w-rebuild` is `complexity: high` and will be built by a separate widget-builder in `site/widgets/w-rebuild/`; you provide its mount point (with the reserved size from the plan's `size:` field) and the manifest entry, not the widget itself. The mockup is the approved content and flow. Its prose is a draft: write the real prose yourself to the plan's intents. Only its check prompts, options and feedback are final and must be used verbatim.

Course-level notes:
- **Style is fixed:** the Control Plane style guide. Copy `/Users/m/workspace/k8s-course/design/control-plane/control-plane.css` to `site/assets/tokens.css` in place of the kit's default tokens; don't invent tokens or hard-code colours. Follow `/Users/m/workspace/k8s-course/design/control-plane/README.md` (voice, colour rules, type, space, figure and widget conventions) and the token usage notes in `tokens.json`. Use the treatments in `design/control-plane/components/` (hero, prose, figure plate, slider widget, check) as the reference for those elements, copying from `components/bundle.css`.
- This page is chapter 1 of 15 in a course; a course index may come later. Use relative URLs only. Show the chapter as "Chapter 01" (or equivalent mono kicker) in the hero; don't add links to other chapters.
- Figure f-01 (outage timeline) is planned as data-driven so later chapters can copy it; keep its data in a small, clearly named structure. Don't add reader-visible complexity for reuse.
- No Kubernetes, containers, images or orchestration terms anywhere on the page (Chapters 1–2 contain no Kubernetes).
- Fennel facts in the plan (times, dates, the log clean-up job, the holiday-sale setting) are fiction; never present them as statistics. Respect the researcher's wording caveats in the plan (no RTO/MTTR acronyms; don't say "exponential" for c-11; keep the partial benefit of snapshots honest).
- Misconception IDs: the plan uses run-local IDs m-01..m-04. The course catalog (CURRICULUM.md §6) has since assigned them m-19 (code is the app), m-20 (runbook), m-21 (bigger server), m-22 (VMs). If an ID appears anywhere in site source comments or data, use the catalog ID; it should not appear in reader-visible text.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/learning-plan.md`: the approved plan (segments, figures, visual grammar, widget spec, comprehension items, acceptance criteria).
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/mockup.html`: approved content and flow (prose is draft; checks are final).
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/cut-list.md`: what's out; don't re-add.
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/facts.md`: the only source of factual claims (cite by claim id in the plan's sense; the page itself shows sources per the skill's conventions).
- `/Users/m/workspace/k8s-course/design/control-plane/` (README.md, tokens.json, control-plane.css, components/).
- `/Users/m/workspace/k8s-course/.claude/skills/didactician/kit/` and `references/` as your role file directs.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/` — everything except `site/widgets/<id>/` contents (you do write `site/widgets/manifest.json`).
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

- d-01: "12 minutes (Recommended)" → built reading + interaction time should fit about 12 minutes.
- d-03: "Approve" (the plan, including select-then-reveal k-02 and diagnosis k-04 instead of free-text listing) → build the plan as written.
- d-04: "Yes, use it" (Jordan and Morgan are the two Year 0 founders, Sam the only engineer, the app is called "the Fennel app") → use this cast; don't name `storefront`.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] All segments, figures and checks in the plan are built; check prompts/options/feedback match the mockup verbatim.
- [ ] `site/assets/tokens.css` is a copy of `design/control-plane/control-plane.css`; no invented tokens or hard-coded colours.
- [ ] `w-rebuild` mount reserves the plan's size and `site/widgets/manifest.json` lists it.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server --phase page` passes (widget reported as pending is expected).

## Not your job

- Building `w-rebuild` itself (anything inside `site/widgets/w-rebuild/`).
- Editing the plan, research, CURRICULUM.md or the style guide.
- Deployment.
