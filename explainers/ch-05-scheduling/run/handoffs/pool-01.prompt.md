# Handoff pool-01 → course-level builder (promote renderCluster to the shared pool)

This is a **course-level step outside any didactician run** (CURRICULUM.md §8 step 5; `explainers/_pool/README.md` "Adding to the pool"). The user approved it at Ch 5's checkpoint:

- Ch 5 run d-06, question: "Both widgets reuse Ch 4's renderCluster. Promote it (and its lane controller) to explainers/_pool/ with the eight additions before the build, re-gating Ch 4 on the pooled copy?" Answer: "Promote it (Recommended)".

## Task

Move Ch 4's cluster renderer (`renderCluster`) and its scrollytelling lane controller out of `explainers/ch-04-desired-state/site/widgets/w-cluster-scrolly/` into the shared pool. Then make Ch 4 use the pooled copy, and add the new, optional features that Ch 5 needs. When no Ch 5 field is present, every Ch 4 state must draw exactly as it does today.

1. **Read first:**
   - `explainers/_pool/README.md`;
   - `tools/site/sync.mjs`, `build.mjs` and `course.mjs`;
   - Ch 4's `site/index.html` (the MOUNT CONTRACT comment in §04);
   - `site/widgets/w-cluster-scrolly/index.js`, `index.css` and `data.js` (its header documents the snapshot format);
   - `site/widgets/manifest.json`.
   - Ch 5's plan, `explainers/ch-05-scheduling/run/plan/learning-plan.md`: `## Widgets` (w-friday-scrolly and its `reuse:` line, which lists the eight additions; w-sizing-sandbox) and `## Visual grammar`. These define what the additions must draw.
2. **Before changing anything,** capture reference screenshots of Ch 4's two lanes, at enough steps and widths to compare against afterwards. Use `node .claude/skills/didactician/scripts/probe.mjs --out explainers/ch-04-desired-state --width <w> --name pool-before …`, with actions `click:[data-check=k-03] .cp-option[data-ok]`, `scroll:[data-step=A4]`, `wait:800`, `shot:<name>`, and similarly for k-04 and the B steps. Use widths 1280, 768 and 360.
3. **Promote.** Put the generic renderer, its CSS and the lane controller under `explainers/_pool/cluster/`, choosing sensible file names. Chapter content (lanes, steps, strings, services, Pods) stays in each chapter's own `data.js`.
   - Separate everything chapter-specific in today's `index.js` from the generic code. Ch 4's strings, such as the record title and the lens labels, should come from the chapter's data rather than being hard-coded in the pool.
   - Ch 4's widget folder then holds only its data, plus whatever thin glue mounts it. Ch 4's `index.html` references the pool files as `pool/cluster/<file>`.
   - Update `_pool/README.md` (the table and "Adding to the pool"), and the snapshot-format documentation (wherever it now lives; the pool is the right home for the format, chapters keep their data).
4. **Add the eight Ch 5 features, all optional and off by default,** exactly as Ch 5's plan specifies them:
   1. per-node capacity and a unit (`capacity`, `unit`), with chip heights scaled by the unit and fractional sizes allowed (the sandbox uses 0.5 GB steps);
   2. a computed processor footer line per node;
   3. the `waiting` strip and the `n WAITING` row word (already designed in Ch 4's format, not yet drawn);
   4. per-node `verdicts` on the node bar (`FITS` / `NO MEMORY` / `NO PROCESSOR`), in wide and narrow forms;
   5. a `scheduler` note type (the recorded reason);
   6. a `NEW` tag for added nodes;
   7. a per-Pod `use` fill with the overflow form (hatched, `warn`);
   8. an option to draw only the nodes: no record panel, no loop pills, no header step counter.

   Follow the plan's Visual grammar for colours and forms. Use only course tokens (`pool/tokens.css`) and never hard-code colours. Status always travels as a word plus colour. The lane controller is reused unchanged.
5. **Build a small test page** for the new features, outside every chapter's `site/`: for example `explainers/_pool/cluster/test.html`, or a scratch page under `/private/tmp/claude-501/-Users-m-workspace-k8s-course/dd94c908-c30b-47ea-a884-f3a5ebe71e30/scratchpad/`. It should draw one snapshot for each feature, so Ch 5's builders can see them working. If you put it in `_pool/`, make sure sync and build don't ship it into chapters, or exclude it.
6. **Sync and re-gate:**
   - Run `npm run sync` (all chapters).
   - Then run `node .claude/skills/didactician/scripts/verify.mjs --out explainers/<ch>` for **every** chapter, ch-01 to ch-04. All must PASS; ch-05 has no site yet, so skip it.
   - Retake the step-2 screenshots as `pool-after` and compare them with `pool-before`. Ch 4 must look identical. Explain any pixel difference you can't remove.
   - Run `npm run build` and confirm `dist/` builds.

## Inputs

- Repo root: `/Users/m/workspace/k8s-course` (Node ≥ 20, no dependencies).
- `CURRICULUM.md` §8 steps 4–7 (the style guide, the pool, the widget height rule, the scrollytelling spec); `design/control-plane/` (the style guide).
- The files named in steps 1–3.

## Write only

- `explainers/_pool/` (new `cluster/` folder; README).
- `explainers/ch-04-desired-state/site/` (`index.html` script and link tags; `site/widgets/w-cluster-scrolly/`; `site/widgets/manifest.json` if needed).
- `explainers/ch-04-desired-state/run/screenshots/probe/` (pool-before and pool-after shots).
- `tools/site/` only if sync or build genuinely need a change (for example, to exclude a test page), and say why.
- Generated mirrors: `npm run sync` rewrites each chapter's `site/pool/` and `dist/`, which is expected.
- Nothing else: not Ch 1–3's files (beyond their synced `site/pool/`), not CURRICULUM.md, not Ch 5's `run/` or `site/` (Ch 5 is synced by the orchestrator later), and not `.agents/skills/` or `.claude/skills/`.

## Constraints (verbatim invariants that apply)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver.
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine.
- I8: Each agent writes only in its namespace (above).
- Ch 4's §8 conventions still hold: transitions ≤ 300ms, instant under reduced motion; the widget height rule; and the lanes' sticky and fallback behaviour at every width.
- Don't commit anything to git. The user asked for no commits for now.

## Done when

- [ ] The renderer, its CSS and the lane controller live in `explainers/_pool/cluster/`, documented in the pool README with the snapshot format.
- [ ] Ch 4 loads them from `pool/cluster/`, and its widget folder holds only chapter data and glue.
- [ ] All eight features are drawn when their fields are present and are absent otherwise, as shown on the test page.
- [ ] `verify.mjs` PASSes for ch-01 to ch-04; `npm run build` succeeds; `npm run sync -- --check` reports no drift.
- [ ] Ch 4's before and after screenshots match.

## Report

Reply in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, covering:
- status;
- artifacts (the new pool files, and the API for each feature: its field names and an example snapshot);
- summary;
- concerns, including any deviation from Ch 5's plan in how a feature is specified;
- relaxed.
