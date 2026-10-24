# Handoff 07 → page-builder (r1-fixes, page and lane data)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. This file is your task. You are a fresh builder, and you fix both the page and the lane's data: this is one combined fix round (the user asked to batch work). The page builder's report (`run/handoffs/03-page-builder.report.md`) and the lane builder's (`run/handoffs/04-widget-builder.report.md`) tell you how each part is built.

## Original request (verbatim)

> Let's commit chapter 5 and then get chapter 6 going.

Then: "auto approve plan, I'll be stepping away from computer and I trust you'll pick right". (The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Fix the round-1 review findings in `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/review/round-1/findings.md`: **all 17** (A-01 to A-07, P-01 to P-10). The findings give severity, location, evidence and suggested fix; the suggestions are suggestions, so keep the meaning and the plan's intent, and write to the plan's prose rules (`run/plan/learning-plan.md`, `## Shape`). **This is the only fix round** (d-03): no closure review follows, so each fix must be complete. Anything you dispute or can't fix goes to the user with your evidence.

Notes on particular findings:
- **P-01 (blocking)**: k-04 must not be given away by the standfirst, the meta description, the §01 hand-off or k-04's own wording. The check's options and key stay as approved; you may change wording around them, and the prompt only so far as needed to remove the giveaway. Retitling §07 is optional.
- **A-01 (blocking)**: rewrite §07's "only as far as the record reaches" so it's true for the file-revert rollback Riley used and consistent with §08's registry clean-up.
- **P-02**: locked gated blocks. You may hide locked content instead of reserving its height, as the finding suggests; make sure nothing visible before k-04 is committed (including the analogy's "where it breaks" line) gives its answer away. Leave the lane's own locked steps as they are (the Ch 4–5 convention).
- **P-03**: in `site/widgets/w-rollout-scrolly/data.js`, R2's canvas must not print k-02's answer before the reader commits, and the highlighted loops in R2 and R3 must match the step text. Data only; keep complete per-step snapshots.
- **P-05**: don't trim prose. Set the hero's "Read" figure and the rail's `data-minutes` to an honest estimate (the gate measures 21.6 min text only; the reviewer estimates about 27 with checks and the lane). The cut order goes to the user at delivery.
- **P-08 (4)**: if fitting "catalog v62" on 360px chips needs a pool change, leave it and say so; don't edit the pool.
- After all edits, re-measure every choice check's option lengths (k-01 to k-06) and report them, key marked; no key may be the longest.

Afterwards run `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-06-rollouts` (the full gate); it must PASS. Check the changed parts at 360 and 1280, and the lane forward and back with k-02 locked and unlocked.

## Inputs (read these; don't expect them pasted)

- `run/review/round-1/findings.md`, `accuracy.md`, `pedagogy-ux.md`, and the probe screenshots they cite in `run/screenshots/probe/` (all in `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/`)
- `run/plan/learning-plan.md` (approved plan), `run/plan/cut-list.md`, `run/research/facts.md`
- `site/` as built, including `site/widgets/w-rollout-scrolly/`
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md` (shared code; read only)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §2, §3, §8 steps 4–7

**Style.** Control Plane style guide in `/Users/m/workspace/k8s-course/design/control-plane/`; course tokens from `site/pool/tokens.css` only, no invented tokens or hard-coded colours. `site/pool/` is read-only; chapter-only CSS and JS go in `site/assets/`.

## Outputs (write only these)

- `site/` except `site/pool/` (this includes `site/widgets/w-rollout-scrolly/`)
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, with one disposition per finding ID: `fixed` (say how), `disputed` (with evidence) or `blocked`, plus the option lengths.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace (above).

## User decisions that apply (quoted from run/decisions.md)

- d-01: "20 minutes (Recommended)" → don't trim prose for length; the cut order goes to the user.
- d-03: "keep this to a single round of reviews please." → the only fix round.
- d-04 / d-05: "auto approve plan, I'll be stepping away from computer and I trust you'll pick right" → the plan is approved, including the `catalog` story facts and the shift-handover aside.

## Findings to address

A-01, A-02, A-03, A-04, A-05, A-06, A-07, P-01, P-02, P-03, P-04, P-05, P-06, P-07, P-08, P-09, P-10.

## Done when

- [ ] Every finding has a disposition; option lengths are reported per check.
- [ ] The full gate (`verify.mjs` without `--phase`) passes.

## Not your job

- The pool, the plan, the research, CURRICULUM.md, other chapters.
- Cutting content for length.
- Committing to git.
