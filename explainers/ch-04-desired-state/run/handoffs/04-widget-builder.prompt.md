# Handoff 04 → widget-builder (cluster-scrolly)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/widget-builder.md`. This file is your task. Your widget id is `w-cluster-scrolly`.

## Original request (verbatim)

> now we're going to do chapter 4.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Build `w-cluster-scrolly`, the two scrollytelling lanes of Chapter 4, in `site/widgets/w-cluster-scrolly/` (`data.js`, `index.js`, `index.css`), per the plan's `## Widgets` → `w-cluster-scrolly` spec, `## Visual grammar`, and acceptance criteria ac-04 to ac-08:
- Lane A, "Moving day" (s-04, steps A1–A5, gated on k-03): Ari applies the `storefront` manifest; the record changes first, then the ReplicaSet loop, the scheduler and the node agents each do one part.
- Lane B, "Saturday, 03:04" (s-05, steps B1–B6, gated on k-04): node 03 dies; the node loop, then the same loops, close the gap on an honest clock (`03:04`, `~03:04:50`, `~03:09:50`, `SECONDS LATER`, `~03:10–03:11`), with `orders` down for those minutes. Lane B starts from A5's state.

**Start by copying Ch 3's widget** (`/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/widgets/w-fleet-scrolly/`: `index.js` with `renderFleet` and the lane controller, `index.css`, `data.js` with the documented snapshot format) into your directory. Rename `renderFleet` → `renderCluster` and extend it as the plan's `reuse:` note lists: node naming (`NODE · NN`), the Pod ring, NOT STARTED / STARTING, the record panel (replacing Ch 3's service pills; marks and row words computed from the snapshot), the loop pills and lens line, the agent pills, `nodeStatus` (UNKNOWN vs. the physical DOWN frame), the CUSTOMERS line and the clock kicker. Never edit Ch 3's files. Write `data.js` with complete snapshots per step and every reader-visible word for the lanes. The plan's `shows:` text is draft wording; write the final text to each step's intent, one or two sentences, in the course voice. Keep the renderer and snapshot format clean and documented, so Ch 5, 6, 7, 8 and 12 can copy them (see the plan's per-chapter reuse notes); add no reader-visible complexity for that.

**Follow the page builder's mount contract exactly.** It's in the comment above the first mount in `site/index.html`, and in `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/handoffs/03-page-builder.report.md` under "Mount contract". Key points:
- There are **two mounts** (`data-lanes="A"` in s-04, `data-lanes="B"` in s-05). `Didactician.widget` passes only the first, so collect both lanes yourself and set `__dInit` on the second.
- Render only into `[data-canvas]`, `[data-step-snap]` and `[data-step-text]`. Leave the page-owned check cards (k-03 in A1, k-04 in B1), disclosures and lock lines alone.
- Toggle `.is-active` / `.is-locked` / `.is-unlocked`. Unlock from `data-gate` on the `didactician:check-commit` event (and `.cp-check[data-committed]` at init). Gates never re-lock.
- Reserved canvas heights: 540px from 900px wide; min(480px, 50vh) at 600–899px; min(360px, 50vh) under 600px. Under 560px viewport height, show the per-step snapshots instead. Where the measured canvas would exceed 50vh, fall back by measurement to inline snapshots, as the plan says.

If the contract and the plan conflict, the contract wins for DOM structure and the plan wins for content and behaviour. Report any conflict.

**Visuals.** Things different in kind must look different. A written intention is `c4` on `c4-soft`; a loop is a `c3` pill with `↻`; a Pod is Ch 3's chip inside an inset `ink` ring. Match this run's page-level `.cp-rec` / `.cp-loop` / `.cp-pod` / `.cp-machine` / `.cp-ctr` classes in `site/assets/page.css`, so f-01 to f-05 and the lanes look the same, but keep your own styles scoped to the widget. Follow the Control Plane style guide (`/Users/m/workspace/k8s-course/design/control-plane/`: README.md, tokens.json, components/). Tokens only; no hard-coded colours.

**Course rules.**
- Follow CURRICULUM.md §8 step 5 (heights) and step 6 (scrollytelling convention).
- Transitions are ≤ 300ms, instant under `prefers-reduced-motion`, and nothing autoplays. Keyboard and screen readers work: `ariaLabel` per step.
- Text is ≥ 13px, and nothing overflows at 360px.
- Respect the plan's vocabulary guard: never pending, eviction, Service, probe, etc. Say "removed from the record after a wait", and credit "another loop (Chapter 7)" for keeping `storefront` pointed at the new `orders` Pod. Kubernetes kinds are capitalised (Pod, ReplicaSet), and "node" is lowercase (d-05).
- Follow the precise-language rules from the user's reviews: no sentence whose referent the reader has to guess, no sentence that sends the reader to a label inside the drawing, and no slogans.
- Every timing carries "by default" or "with default settings"; recovery is minutes, never "instant".
- A replacement Pod must download its image if the node doesn't have it (Ch 2's accuracy point). It is a new Pod with a new name (`orders-5c8x` → `orders-q2rw`), not a moved one.
- Fennel facts are fiction (d-04).

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/plan/learning-plan.md`: the approved plan (`## Widgets`, `## Visual grammar`, `## Segments` s-04 and s-05, ac-04 to ac-08, `## Shape` for the vocabulary guard and precise-language rules).
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/plan/mockup.html`: the approved flow, including text wireframes of both lane canvases.
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/facts.md` (c-10 to c-13, c-18, c-19 in particular, and x-04 in `examples.md`).
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/` (read-only for you outside your directory): `index.html` with the mount contract, `assets/page.css`, `assets/page.js`, `assets/widget.js`.
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/handoffs/03-page-builder.report.md`: the mount contract and the page builder's notes.
- Ch 3's widget (read-only): `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/widgets/w-fleet-scrolly/`.
- `/Users/m/workspace/k8s-course/design/control-plane/`.
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §8 steps 5–6.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/widgets/w-cluster-scrolly/` (`data.js`, `index.js`, `index.css`).
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace. Yours is `site/widgets/w-cluster-scrolly/`.

## User decisions that apply (quoted from run/decisions.md)

- d-03: "Approve" → build the plan as written.
- d-04: "Yes, use them (Recommended)" → the Year 3 story facts: nodes 01–04; moving day with `storefront:v38`, `replicas: 3`, ending in Ch 3's Monday layout; the 03:04 repeat on a default-settings clock, with `orders` down for those minutes; Pod names `orders-5c8x` → `orders-q2rw`.
- d-05: "Yes, from Ch 4 on (Recommended)" → Pod, ReplicaSet capitalised; "node" lowercase.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Both lanes render every step from complete snapshots; scrolling back restores the earlier state; gates unlock on k-03 / k-04 commit.
- [ ] ac-04 to ac-08 are met, and `data.js` documents the extended snapshot format for later chapters.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-04-desired-state --widget w-cluster-scrolly` passes (it scopes to the first mount, lane A). Also check lane B at 360px, 768px and 1280px yourself, in light and dark, and report what you saw.

## Not your job

- Anything outside `site/widgets/w-cluster-scrolly/`: page prose, check cards, figures f-01 to f-05, global CSS, `manifest.json`.
- Editing the plan, research, CURRICULUM.md, or Ch 1–3's files.
- Deployment.
