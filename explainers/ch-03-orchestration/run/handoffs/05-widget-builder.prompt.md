# Handoff 05 → widget-builder (fleet-scrolly)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/widget-builder.md`. This file is your task. Your widget id is `w-fleet-scrolly`.

## Original request (verbatim)

> Let's start ch 3 now, notes from the last run "
> Ch 3 is next. Its entry already has the retrieval opener, the instruction to place Docker, and the note to reuse Ch 2's container drawings for its placement widget."

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Build `w-fleet-scrolly`, the §02 scrollytelling lanes of Chapter 3, in `site/widgets/w-fleet-scrolly/` (`data.js`, `index.js`, `index.css`), per the plan's `## Widgets` → `w-fleet-scrolly` spec and acceptance criteria ac-03 to ac-08:
- `data.js`: `FLEET_LANES` (lanes → steps → `{ state, text, ariaLabel, gate?, highlight }`), machines and services; complete snapshots per step; every reader-visible word for the lanes. The step text in the plan is draft wording: write the final text to each step's intent, one or two sentences, in the course voice.
- `index.js`: `renderFleet(el, state)` (chips with height by size, dashed free region, DOWN machine with LOST chips, RUNNING / CRASHED / LOST / NEW ADDR / STOPPED, service pills computed from the snapshot, the connection line, the stale-spreadsheet note, the step highlight) and the scrolly controller (activation at 55% viewport, sticky handling, gates, the short-viewport inline snapshots).
- `index.css`: scoped to the widget.

**Follow the page builder's mount contract exactly.** It is the comment above the mount in `site/index.html`, and it is summarised in `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/handoffs/04-page-builder.report.md` under MOUNT CONTRACT. In short: render only into `[data-canvas]`, `[data-step-snap]` and `[data-step-text]`; leave the page-owned check cards, disclosures and lock lines alone; toggle `.is-active` / `.is-locked` / `.is-unlocked`; unlock from `data-gate` on the `didactician:check-commit` event (and `.cp-check[data-committed]` at init); gates never re-lock. If the contract and the plan conflict, the contract wins for DOM structure and the plan wins for content and behaviour; report any conflict.

**Visuals.** Reuse Ch 2's container chip and machine frame. Read them from commit b661656, not the working tree (another agent is rebuilding Ch 2 right now): `git -C /Users/m/workspace/k8s-course show b661656:explainers/ch-02-containers/site/assets/page.css` and `…/page.js` (`chip()` / `renderMachine()`). This run's `site/assets/page.css` already has page-level `.cp-machine` / `.cp-ctr` classes for f-02; match them so f-02 and the lanes look the same, but keep your own styles scoped to the widget. Follow the plan's `## Visual grammar` and the Control Plane style guide. Make `renderFleet` and the snapshot format clean enough for later chapters to copy (Ch 4, 6, 7, 8; see the plan's `reuse:` notes); add no reader-visible complexity for that.

**Course rules.** CURRICULUM.md §8 step 5 (heights: ≥600px reserve the tallest state; <600px each state its own height) and step 6 (scrollytelling convention). Transitions ≤ 300ms, instant under `prefers-reduced-motion`, nothing autoplays. Tap and keyboard work wherever there's interaction (the checks are page-owned). Text ≥ 13px; nothing overflows at 360px. Respect the plan's vocabulary guard (no node, pod, replica, scheduler, etc.) and its precise-language rules from the user's reviews: no sentence whose referent the reader has to guess, no sentence that sends the reader to a label inside the drawing. Fennel facts are fiction (d-04). Re-creating a container on another machine includes pulling its image first (B4 says so).

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/learning-plan.md` (`## Widgets`, `## Visual grammar`, `## Figures`, `## Acceptance criteria`, segment s-02)
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/mockup.html` (approved flow; the lanes' sketch)
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/` (built page: `index.html` mount contract, `assets/page.css`, `assets/page.js`, `assets/widget.js`, `widgets/manifest.json`); read-only for you
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/handoffs/04-page-builder.report.md` (mount contract summary)
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/facts.md`
- Ch 2's site at commit b661656 (read-only, via `git show`)
- `/Users/m/workspace/k8s-course/design/control-plane/`
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §8 steps 4–6

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/widgets/w-fleet-scrolly/`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace. Yours is `site/widgets/w-fleet-scrolly/`.

## User decisions that apply (quoted from run/decisions.md)

- d-03: "…review if the widget is serving a pedagogical need or if we're unnecessarily increasing cognitive load when a scrollytelling portion of the article would do better at showing stages of progression." → this is scrollytelling with a non-interactive canvas, not a hands-on widget.
- d-04: "Yes, use them" → the story facts (copies and sizes per service, 02:51 crash, 03:04 failure, v12→v13, "Nobody deploy anything", "Could four do it?").
- d-06: "Approve" → build the revised plan as written.
- d-07: "Accept (Recommended)" → the reader makes Sam's key decisions via the page's checks; the lanes show the outcomes.
- d-08: "R13 scrolly pattern, R14 term card, R15 jump-ahead opening" → the scrollytelling pattern is now a course convention; build it so later chapters can copy it.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] All three lanes (A1–A3, B1–B6, C1–C4) render the plan's snapshots, with the step text, aria-labels and highlights; scrolling back restores earlier states exactly.
- [ ] Gates unlock on the page's check-commit events per the mount contract.
- [ ] Sticky canvas on desktop and under 900px, inline snapshots under 560px tall, heights per the course rule.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-03-orchestration --widget w-fleet-scrolly` passes.

## Not your job

- Anything outside `site/widgets/w-fleet-scrolly/`: prose, checks, disclosures, f-01/f-02, global CSS, the manifest.
- Editing the plan, research, CURRICULUM.md, the style guide, or Ch 1's or Ch 2's files.
- Deployment.
