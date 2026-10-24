# Handoff 10 → widget-builder w-sizing-sandbox (r1-fixes-sandbox)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/widget-builder.md`. This file is your task. You are a fresh widget builder (a respawn: the builder of handoff 05 was in an earlier session). Its report, `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/handoffs/05-widget-builder.report.md`, tells you how W-02 is built.

## Original request (verbatim)

> let's apply the R1-R12 now and start chapter 5 now

Resumed in a later session with:

> yes, close chapter 4 first. commit it, push it, then verify 2 and finish chapter 5

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Fix the round-1 review findings in the sizing sandbox (`site/widgets/w-sizing-sandbox/`). **This is the only fix round** (d-08): no closure review follows. Details are in `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/review/round-1/findings.md`.

- **A-08**: rename the idle bar's head (`SHEET.idle.head`, now "The rented room") to exactly **"Room for Pods on the rented nodes"**. The bar shows the 65 GB of room for Pods, not the 80 GB rented. The page builder is changing the prose to use this exact name, so don't vary it. Check any other string or aria-label that calls the bar "the rented room".
- **P-14**: the idle bar's three labels fall back to a stacked swatch legend at 768 and when one segment dominates. Before falling back, try letting labels wrap under their segments. Label the hatched "used above its reservation" part (on the bar or in the warnings).
- **P-15**: in the minimal state, `storefront`'s hatched overflow draws over the chip above it. Stop the overflow at the chip above, or draw it behind the neighbour's label. Use ellipsis-cut one-line names (lane F's approach: `breaks` that keep the whole name, so the chip cuts with "…") rather than hyphen cuts like "notifi-".
- While you're there: the sandbox's own short-chip glue (Pods under 14px drop their label and get 1px edges; handoff 05's report) now overlaps the pool's 0-line rule for chips under 10px of text room (pool README, "Narrow-width fallbacks (pool-02)", item 5). Remove your glue only if the pool rule covers it without a visible regression; otherwise leave it and say why.

Don't change the model's numbers or behaviour: the accuracy reviewer verified the node counts (`run/review/round-1/accuracy.md`), and the page's prose and k-09 pointer depend on them. `selftest.mjs` must still pass.

Afterwards run `node site/widgets/w-sizing-sandbox/selftest.mjs` (from the chapter folder) and `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-05-scheduling --phase page`; both must pass. Check the default, minimal and inflated states at 360, 768 and 1280.

## Inputs (read these; don't expect them pasted)

- `run/review/round-1/findings.md`, `pedagogy-ux.md`, `accuracy.md` (in `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/`); the screenshots they cite in `run/screenshots/probe/`
- `site/widgets/w-sizing-sandbox/`
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md` (read only)

**Style.** Control Plane style guide, `/Users/m/workspace/k8s-course/design/control-plane/`; course tokens from `site/pool/tokens.css` only, no hard-coded colours. `site/pool/` is read-only; if a fix needs a pool change, report it instead.

## Outputs (write only these)

- `site/widgets/w-sizing-sandbox/`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, with one disposition per finding: `fixed`, `disputed` (with evidence) or `blocked`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I4: Finite animations longer than flair have a replay control
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace (above).

## User decisions that apply (quoted from run/decisions.md)

- d-07: "Accept the exception (Recommended)" → the sandbox doesn't scroll its header to the top on change under 600px.
- d-08: "keep this to a single round of reviews please." → only fix round.

## Findings to address

A-08, P-14, P-15 (plus the optional glue cleanup above).

## Done when

- [ ] Each finding has a disposition; `selftest.mjs` and `verify.mjs --phase page` pass.

## Not your job

- The page, lane F, the pool, the plan, CURRICULUM.md; committing to git.
