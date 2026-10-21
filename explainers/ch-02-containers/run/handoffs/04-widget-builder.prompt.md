# Handoff 04 → widget-builder (w-samecode)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/widget-builder.md`. This file is your task.

## Original request (verbatim)

> okay, commit it, clear context of everything you don't need for ch 2 and proceed with building chapter 2 with the didactician skill

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Build widget `w-samecode` (segment s-02) exactly as the plan's `### w-samecode` section specifies. It has three states, compared on two machines aligned row by row, with checks k-02 and k-03 inside it:
1. tools installed by hand;
2. one image;
3. new image v43, with the NOT IN THE IMAGE band.

It mounts into the page's existing mount point. The page loads `widgets/w-samecode/data.js`, `index.js` and `index.css` per `site/widgets/manifest.json`, so create all three. Check prompts, options and feedback are final: take them verbatim from the plan and mockup.

Specifics:
- **Adapted from Ch 1.** The plan reuses the stage-4 aligned-row comparison from Ch 1's `w-rebuild` (`/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/widgets/w-rebuild/`). Copy what helps into your namespace and adapt it, but never edit Ch 1's files. Ch 1 used two techniques that should carry over:
  - all states stack in one grid cell, so state changes never move the page;
  - all reader-visible content lives in `data.js`.

  Ch 1's review fixes to keep:
  - disclosure summaries get an ink ▸/▾ marker;
  - a status like IDENTICAL or SAME that applies to both machines spans both columns;
  - on stage or state change under 600px, the state header scrolls to the top of the viewport.
- **Size.** The plan reserves 600px on desktop and 960px at 360px. Measure the tallest state at 1280, 768 and 360, and report all three. If 360px comes out more than 10% over 960px, say so and say why. Don't cut plan content to fit.
- **Checks.** Match the page's check behaviour and classes in `site/assets/page.css` and `page.js` (read-only for you), so the reader meets one check pattern.
- **Visual grammar.** Follow the plan's `## Visual grammar`, which extends Ch 1's grammar (recorded in CURRICULUM.md §5 Visuals): the machine frame with a `MACHINE · NAME` bar, the code in c1, the image frame and chip, the container chip with a lamp and RUNNING, and the SAME / DIFFERENT markers. Status always appears as a word plus a colour. Reuse the page's `.cp-machine` / `.cp-img` / `.cp-ctr` chips where they fit.
- **Style.** Control Plane. Use only the tokens in `site/assets/tokens.css`; follow `/Users/m/workspace/k8s-course/design/control-plane/README.md`, the `tokens.json` notes and `components/` (`bundle.css`).
- **Content rules.**
  - No Kubernetes or orchestration terms.
  - Fennel facts are fiction (approved at d-04): Riley (they/them), the photo tool at 6.2 in production vs. 7.0 on Riley's laptop, the images `fennel-app:v42` and `v43`. Never present them as statistics.
  - Don't imply that a version label always points to the same image (ac-10).
- **Misconception IDs.** In comments or data, use catalog IDs (m-19, m-23, m-24, m-01). The plan's local-01 is m-23 and local-02 is m-24. Never show them to the reader.
- **Reuse note.** For later chapters, the plan says Ch 3 should reuse the page's f-01 chips rather than this widget. Don't design this widget for reuse beyond keeping its content in `data.js`.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/learning-plan.md`: read `### w-samecode`, `## Visual grammar`, `## Comprehension items` and `## Acceptance criteria`.
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/mockup.html`: the widget states as ASCII sketches; check text is final.
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/facts.md`
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/site/` (index.html, assets/, widgets/manifest.json; read-only for you)
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/widgets/w-rebuild/` (read-only reference)
- `/Users/m/workspace/k8s-course/design/control-plane/`
- `/Users/m/workspace/k8s-course/.claude/skills/didactician/references/widgets.md`, and the kit as your role file directs

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/site/widgets/w-samecode/`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, with the measured heights.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace

## User decisions that apply (quoted from run/decisions.md)

- d-01: "14 minutes" → the widget should take the plan's estimated time (about 3.5 minutes), not more.
- d-03: "Approve" → build as specified.
- d-04: "Yes, use them" (Riley (they/them), a Year 1 engineer; photo tool 6.2 in prod vs. 7.0 on Riley's laptop; images fennel-app:v42/v43; Year 1 = one production machine plus staging) → use these story facts.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] All three states work by mouse, touch and keyboard, and the checks behave like the page's other checks.
- [ ] The plan's widget acceptance criteria are met.
- [ ] Heights at 1280, 768 and 360 are measured and reported.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-02-containers --widget w-samecode` passes.

## Not your job

- Page prose, other checks, figures, global CSS/JS, `site/widgets/manifest.json`, `site/index.html`, or the mount's reserved height.
- Editing the plan, research, CURRICULUM.md or Ch 1's files.
