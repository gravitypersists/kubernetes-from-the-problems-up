# Handoff 04 → widget-builder w-rollout-scrolly + pool-03 (pool03-and-lane)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/widget-builder.md`. This file is your task. It has two parts, done in order: a course-level change to the shared cluster renderer (pool-03), then this chapter's lane, which is the first consumer of that change.

## Original request (verbatim)

> Let's commit chapter 5 and then get chapter 6 going.

Then: "auto approve plan, I'll be stepping away from computer and I trust you'll pick right". (The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

### Part 1 · pool-03: three optional renderer additions (course-level, CURRICULUM §8 step 5)

In `/Users/m/workspace/k8s-course/explainers/_pool/cluster/`, add the three fields specified in the plan (`run/plan/learning-plan.md`, `## Widgets` → `w-rollout-scrolly` → `reuse:` → "Pool additions needed"):
1. **Deployment group in the record panel** (`record.deployment`, header row, indented ReplicaSet rows, `KEPT` for an emptied row, highlight keys `dep:<name>` and `dep:<name>:version`, narrow form);
2. **status `notready`** (solid chip, hollow lamp, `warn` word, hollow record mark; `.wc-st--notready` in `cluster.css`);
3. **per-Pod `series` colour** (`PODS[id].series` 1–6 → `cN` / `cN-soft` chip; ring stays ink; absent = `c1`).

Each is **off when absent**, so Ch 4 and Ch 5 must render **unchanged**. Document all three in `explainers/_pool/README.md` (data format and an example) and add cases to `explainers/_pool/cluster/test/index.html`, including 360px. Check that `c5` chips read clearly beside `bad` status words (plan concern).

Check, as pool-02 did:
- before and after screenshots of Ch 4's lanes and Ch 5's lane F and sandbox (`node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/probe.mjs --out <chapter> …`, at 1280, 768 and 360, names `pool3-before-*` / `pool3-after-*`); Ch 4's and Ch 5's must be byte-identical, or explain any difference you can't remove. To unlock Ch 5's lane gate, use `click:[data-check=k-03] .cp-option[data-ok]`; Ch 4's gates are in its `site/index.html`;
- `npm run sync` (from `/Users/m/workspace/k8s-course`), then `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out explainers/<ch>` for **every** shipped chapter, ch-01 to ch-05; all must PASS.

### Part 2 · lane R, `site/widgets/w-rollout-scrolly/`

Build the widget the plan specifies (`## Widgets` → `w-rollout-scrolly`; `## Figures` → f-03; `## Visual grammar`): one scrollytelling lane of 5 steps (R1–R5) on the pooled `renderCluster` and lane controller, gated on k-02 after R2, with complete per-step snapshots, plus f-03's two snapshots (`FIGURES.crash`, `FIGURES.shipped`) in the same `data.js`. Every reader-visible string lives in `data.js`. The step text in the plan is draft wording: write final step text to the plan's prose rules (`## Shape` → "Prose rules"; flowing sentences, cause and effect, name who does what) and its vocabulary guard.

The plan marked this widget `complexity: low` (data only) for the page builder; the orchestrator routed it to you instead because it is the pool additions' first consumer. A page builder is building the rest of the page **in parallel** (handoff 03), including the lane's mount in s-03, f-03's mount in s-06 and `site/widgets/manifest.json`, following the pool README's lane-mount contract. Follow the same contract. If you need something in the mount that the README doesn't specify, report it rather than editing the page. Until the page exists, test on the pool's test page or a scratch harness inside your widget folder (remove it, or keep it out of the manifest, when done). Once `site/index.html` mounts the lane, check it there at 360, 768 and 1280, scrolling forward and back, in light and dark, and with the gate locked and unlocked.

**Don't run `npm run sync` while the page builder may still be writing** except as Part 1 requires (it only writes chapters' `site/pool/`, which the page builder never edits).

Afterwards run `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-06-rollouts --phase page`. If the page isn't finished yet, say so in your report rather than waiting on it indefinitely.

## Inputs (read these; don't expect them pasted)

- `run/brief.md`, `run/plan/learning-plan.md` (`## Shape`, `## Widgets`, `## Figures` f-03, `## Visual grammar`), `run/plan/mockup.html`, `run/research/facts.md` (in `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/`)
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md` and `explainers/_pool/cluster/` (the renderer, the lane controller, the test page)
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/handoffs/pool-01.report.md` (the pooled API as promoted) and `pool-02.prompt.md` (the last pool change and its checks)
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/widgets/w-friday-scrolly/data.js` (a lane on the pooled renderer; read only, don't copy code)

**Style.** Control Plane style guide, `/Users/m/workspace/k8s-course/design/control-plane/`; course tokens only (`tokens.css`), no hard-coded colours; status always travels as a word plus colour; transitions ≤ 300ms, instant under reduced motion, no autoplay.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/_pool/cluster/` and `/Users/m/workspace/k8s-course/explainers/_pool/README.md`
- `site/widgets/w-rollout-scrolly/` (in this chapter)
- Probe screenshots in `explainers/ch-04-desired-state/run/screenshots/probe/`, `explainers/ch-05-scheduling/run/screenshots/probe/` and this chapter's `run/screenshots/probe/`
- Files written by the scripts themselves: chapters' `site/pool/` (sync), `dist/` (build), chapters' `run/gate/`, `log.md` and `state.json` (verify)
- Nothing else: not any chapter's `site/` outside `site/pool/` and your widget folder, not CURRICULUM.md, not the skills, not `tools/`.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, with the pool part (each addition and how it was verified, every chapter's gate result) and the lane part.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I4: Finite animations longer than flair have a replay control
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace (above).

## User decisions that apply (quoted from run/decisions.md)

- d-03: "keep this to a single round of reviews please." → build carefully; one review round, one fix round.
- d-04: "auto approve plan, I'll be stepping away from computer and I trust you'll pick right" / d-05: plan approved with Q3 (a): "schedule the three optional renderer additions before the build (Deployment group in the record, `notready`, per-Pod series colour), re-gating every chapter", and Q2 (a): the `catalog` story facts in the plan's R2.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] The three pool additions are built, documented and on the test page; Ch 4 and Ch 5 render unchanged; ch-01 to ch-05 all PASS `verify.mjs`.
- [ ] Lane R (R1–R5, gated on k-02) and f-03's two snapshots are built in `site/widgets/w-rollout-scrolly/`, every string in `data.js`.
- [ ] `verify.mjs --phase page` on ch-06 passes, or you report that the page wasn't ready.

## Not your job

- The page (`site/` outside your widget folder), the plan, CURRICULUM.md, other chapters' sites; committing to git.
