# Handoff 09 → widget-builder w-friday-scrolly (r1-fixes-friday)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/widget-builder.md`. This file is your task. You are a fresh widget builder (a respawn: the builder of handoff 04 was in an earlier session). Its report, `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/handoffs/04-widget-builder.report.md`, tells you how lane F is built.

## Original request (verbatim)

> let's apply the R1-R12 now and start chapter 5 now

Resumed in a later session with:

> yes, close chapter 4 first. commit it, push it, then verify 2 and finish chapter 5

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Fix the two round-1 review findings in lane F (`site/widgets/w-friday-scrolly/`). **This is the only fix round** (d-08): no closure review follows. Details are in `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/review/round-1/findings.md`.

- **P-08 (your part)**: delete "its exact wording varies between Kubernetes versions" (and the words that only connect it) from F3's step text in `data.js`. The W-01 caption on the page keeps it; the page builder removes the third copy.
- **P-12**: at F2, node 02's wide verdict reads "FITS · 3 GB · 1.15 CORES FREE" while the drawing already shows the second Pod placed and 1 GB free. For F2 only, remove the clash: drop the free amounts from the wide verdicts there, or use the pool's existing options to show them as what the node *had* when it was checked, whichever the pool README's verdict format supports without a pool change. The step text gives the amounts.

**Not yours**: P-11 and P-13 also concern lane F, but they need changes to the shared pool renderer (`explainers/_pool/cluster/`), a course-level step outside this run. Don't work around them in `data.js`. If you see a cheap chapter-side fix that doesn't fight the pool, describe it in your report instead of making it.

Afterwards run `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-05-scheduling --phase page`; it must PASS. Check F2 and F3 at 390, 768 and 1280.

## Inputs (read these; don't expect them pasted)

- `run/review/round-1/findings.md` and `pedagogy-ux.md` (in `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/`); screenshots it cites in `run/screenshots/probe/` (`pux-r1-w768-lane-F2.png`)
- `site/widgets/w-friday-scrolly/`
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md` (the cluster drawing's data format and verdict forms; read only)

**Style.** Control Plane style guide, `/Users/m/workspace/k8s-course/design/control-plane/`; course tokens from `site/pool/tokens.css` only. `site/pool/` is read-only.

## Outputs (write only these)

- `site/widgets/w-friday-scrolly/`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, with one disposition per finding: `fixed`, `disputed` (with evidence) or `blocked`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I4: Finite animations longer than flair have a replay control
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace (above).

## User decisions that apply (quoted from run/decisions.md)

- d-05: "keep one chapter, don't cut, I will consider cut in human review" → no trimming beyond P-08's duplicate clause.
- d-08: "keep this to a single round of reviews please." → only fix round.

## Findings to address

P-08 (F3 step text), P-12.

## Done when

- [ ] Both findings have a disposition; `verify.mjs --phase page` passes.

## Not your job

- The page, the other widget, the pool, the plan, CURRICULUM.md; committing to git.
