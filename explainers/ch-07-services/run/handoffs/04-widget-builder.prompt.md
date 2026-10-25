# Handoff 04 → widget-builder w-services-scrolly + pool-04 (pool04-and-lane)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/widget-builder.md`. This file is your task. It has two parts, done in order: a course-level change to the shared cluster renderer (pool-04), then this chapter's lane, which is the first consumer of that change.

## Original request (verbatim)

> Commit and continue, I will review at a later date. Once done with 6 let's start ch 7.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

### Part 1 · pool-04 (course-level, CURRICULUM §8 step 5)

In `/Users/m/workspace/k8s-course/explainers/_pool/cluster/`:
1. **The Service block in the record panel and `PODS[id].addr`**, exactly as the plan specifies (`run/plan/learning-plan.md`, `## Widgets` → `w-services-scrolly` → `reuse:` → "Pool addition needed (pool-04)", items 1–4: `record.service { name, addr, list, leaving? }`, the header and `READY PODS` list row, `NONE` in `bad`, struck leaving entries, lane-wide reserved list height, the narrow form, highlight keys `svc:<name>`, `svc:<name>:list`, `svc:<name>:<podId>`, strings `record.service`, `record.list`, `record.none`). Off when absent.
2. **The 360px chip-label fix** (CURRICULUM §9 "Pool after Ch 6"; Ch 6 review finding P-08 part 4, in `explainers/ch-06-rollouts/run/review/round-1/findings.md`): at 360px, chips with an inline status (`STATUS_INLINE`) drop the service name (`v63 READY`, not `catalog v63`). Make narrow chips keep the service name (with the version and status word fitted, wrapped, or abbreviated by a rule you document), without overflow or clipping.

Document both in `explainers/_pool/README.md` (data format and an example) and add cases to `explainers/_pool/cluster/test/index.html`, including 360px.

Check, as pool-03 did (Ch 6's `run/handoffs/04-widget-builder.prompt.md` and its report show the procedure):
- before and after screenshots of Ch 4's lanes, Ch 5's lane F and sandbox, and Ch 6's lane R and f-03 (`node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/probe.mjs --out <chapter> …`, at 1280, 768 and 360, names `pool4-before-*` / `pool4-after-*`), or a DOM-snapshot comparison as pool-03 did. Ch 4's and Ch 5's must be identical. Ch 6's may differ **only** where item 2 changes narrow chips (expected at 360px; report each difference); explain anything else you can't remove. Gate unlocks: Ch 5's lane `click:[data-check=k-03] .cp-option[data-ok]`; Ch 4's and Ch 6's gates are in their `site/index.html`;
- `npm run sync` (from `/Users/m/workspace/k8s-course`), then `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out explainers/<ch>` for **every** shipped chapter, ch-01 to ch-06; all must PASS.

### Part 2 · lane S, `site/widgets/w-services-scrolly/`

Build the widget the plan specifies (`## Widgets` → `w-services-scrolly`; `## Figures` → f-04; `## Visual grammar`): one scrollytelling lane of 4 steps (S1–S4) on the pooled `renderCluster` and lane controller, gated on k-03 after S2, with complete per-step snapshots, plus f-04's two snapshots (Tuesday 12:40: the `orders` list empty while its only Pod restarts, then refilled) in the same `data.js`, under `FIGURES` keys you document in `data.js` (Ch 6's `w-rollout-scrolly/data.js` used `FIGURES.crash` / `FIGURES.shipped`). Every reader-visible string lives in `data.js`. The step text in the plan is draft wording: write final step text to the plan's prose rules (`## Shape` → "Prose rules"; flowing sentences, cause and effect, name who does what; "within seconds, usually"; "connection refused" hedged) and its vocabulary guard. The addresses must match the plan's (they recur in f-01 and f-02, which the page builder draws).

A page builder is building the rest of the page **in parallel** (handoff 03), including the lane's mount in s-04, f-04's mount in s-06 and `site/widgets/manifest.json`, following the pool README's lane-mount contract. Follow the same contract. If you need something in the mount that the README doesn't specify, report it rather than editing the page. Until the page exists, test on the pool's test page or a scratch harness inside your widget folder (remove it, or keep it out of the manifest, when done). Once `site/index.html` mounts the lane, check it there at 360, 768 and 1280, scrolling forward and back, in light and dark, and with the gate locked and unlocked.

**Don't run `npm run sync` while the page builder may still be writing** except as Part 1 requires (it only writes chapters' `site/pool/`, which the page builder never edits).

Afterwards run `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-07-services --phase page`. If the page isn't finished yet, say so in your report rather than waiting on it indefinitely.

## Inputs (read these; don't expect them pasted)

- `run/brief.md`, `run/plan/learning-plan.md` (`## Shape`, `## Widgets`, `## Figures` f-04, `## Visual grammar`), `run/plan/mockup.html`, `run/research/facts.md` (in `/Users/m/workspace/k8s-course/explainers/ch-07-services/`)
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md` and `explainers/_pool/cluster/` (the renderer, the lane controller, the test page)
- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/handoffs/04-widget-builder.prompt.md` and `.report.md` (the last pool change and its checks)
- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/widgets/w-rollout-scrolly/data.js` (lane R, the scene lane S replays; read only, don't copy code)
- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/review/round-1/findings.md` (P-08) and `/Users/m/workspace/k8s-course/CURRICULUM.md` §9

**Style.** Control Plane style guide, `/Users/m/workspace/k8s-course/design/control-plane/`; course tokens only (`tokens.css`), no hard-coded colours; status always travels as a word plus colour; transitions ≤ 300ms, instant under reduced motion, no autoplay.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/_pool/cluster/` and `/Users/m/workspace/k8s-course/explainers/_pool/README.md`
- `site/widgets/w-services-scrolly/` (in this chapter)
- Probe screenshots in `explainers/ch-04-desired-state/run/screenshots/probe/`, `explainers/ch-05-scheduling/run/screenshots/probe/`, `explainers/ch-06-rollouts/run/screenshots/probe/` and this chapter's `run/screenshots/probe/`
- Files written by the scripts themselves: chapters' `site/pool/` (sync), `dist/` (build), chapters' `run/gate/`, `log.md` and `state.json` (verify)
- Nothing else: not any chapter's `site/` outside `site/pool/` and your widget folder, not CURRICULUM.md, not the skills, not `tools/`.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, with the pool part (each change and how it was verified, every chapter's gate result, every Ch 6 difference) and the lane part, including the `FIGURES` keys and the data shape the page builder's f-04 mount should read.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I4: Finite animations longer than flair have a replay control
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace (above).

## User decisions that apply (quoted from run/decisions.md)

- d-07: "Add it + fix 360px labels (Recommended)" → pool-04 (the Service block, `PODS[id].addr`) plus the 360px chip-label follow-up, with every chapter re-gated; Ch 6's lane may change at 360px only.
- d-05: "Approve (Recommended)" → plan approved, including the R2 story facts and addresses. d-06: "Ch 5's Tuesday (Recommended)" → f-04 is Tuesday 12:40.
- d-03: "keep this to a single round of reviews please." → build carefully; one review round, one fix round.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] pool-04 and the chip-label fix are built, documented and on the test page; Ch 4 and Ch 5 render unchanged, Ch 6 changes only at narrow chips; ch-01 to ch-06 all PASS `verify.mjs`.
- [ ] Lane S (S1–S4, gated on k-03) and f-04's two snapshots are built in `site/widgets/w-services-scrolly/`, every string in `data.js`.
- [ ] `verify.mjs --phase page` on ch-07 passes, or you report that the page wasn't ready.

## Not your job

- The page (`site/` outside your widget folder), the plan, CURRICULUM.md, other chapters' sites; committing to git.
