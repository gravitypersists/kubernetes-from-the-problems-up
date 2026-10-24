# Handoff pool-02 → course-level builder (cluster drawing: narrow-width legibility fixes)

This is a **course-level step outside any didactician run** (CURRICULUM.md §8 step 5). It follows pool-01, which the user approved at Ch 5's checkpoint:

- d-06, question: "Promote it (and its lane controller) to explainers/_pool/ with the eight additions before the build, re-gating Ch 4 on the pooled copy?" Answer: "Promote it (Recommended)".

Ch 5's two widget builders found legibility problems in the pooled drawing at narrow widths and asked for the pool changes below instead of editing the pool. Their reports are `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/handoffs/04-widget-builder.report.md` (lane F) and `05-widget-builder.report.md` (sandbox). Pool-01's report, `pool-01.report.md` in the same folder, documents the current API.

## Task

Fix these in `explainers/_pool/cluster/`. Each fix must only take effect where the current drawing doesn't fit, so Ch 4, which fits today, renders **unchanged**.

1. **Node ids.** In `laneLayout` / `barId`: when "NODE 01" doesn't fit `barTextW` for every node in the lane, fall back to the bare id ("01") for all nodes. Today Ch 5's 360–390px snapshots show "NODE 0" on every node, so 01, 02 and 04 can't be told apart.
2. **Record row word.** When `fixed + compW > recInner`, the row word (e.g. `5 RUNNING · 1 WAITING`) must not overlap the marks. Put it on its own line under the row, or shorten the marks, whichever reads better. Today it shows "□WAITING" and loses the "1".
3. **Per-state columns for inline snapshots.** In `lanes.js` `drawSnaps`, allow each inline snapshot (shown under 560px tall, or where the lane falls back) to size its columns to its own state's node count. Each step has its own snapshot, so nothing reflows. Then lane F's F1–F4 draw three columns of about 100px instead of five of about 59px. The sticky canvas keeps the lane-wide reservation, so switching steps never moves the page. Opt in with a lane or data option if needed, so Ch 4 is unaffected.
4. **Ring inset.** In `geometry`, apply the narrow ring-inset fallback on wide canvases too, when a one-line label misses its chip. "payments" and "dispatch" (63.6px) miss a 61px chip by about 1px on a 460px canvas.
5. **Very short chips.** Make `chipLinesMax` return 0 lines when a chip is shorter than one text line; today it forces at least one clipped 13px line. A chip with 0 lines draws no label. The sandbox draws 0.5 GB Pods 3–4px high and 1 GB Pods about 12px.
6. **Free-room label.** "1 GB FREE" overflows its 12px box. Drop the label, or use a shorter form, when the box is shorter than a line, as is already done under 8px.
7. **Documentation and samples.** In the pool README's example snapshot and in `test/index.html`, correct lane F's numbers:
   - F2's second-Pod verdict for node 01 is `'mem cpu'`, not `'mem'`;
   - F3's reason is "0/3 nodes are available: 2 Insufficient cpu, 3 Insufficient memory."

   Add the new fallbacks (1–6) to the README. Add test-page cases for 1, 2, 3, 5 and 6 at 360px.

## Check

- Capture before and after screenshots of Ch 4's lanes, as pool-01 did: `node .claude/skills/didactician/scripts/probe.mjs --out explainers/ch-04-desired-state …`, at 1280, 768 and 360, under the names `pool2-before` and `pool2-after`. Ch 4 must be identical. Explain any difference you can't remove.
- Capture before and after screenshots of Ch 5's lane F (steps F1–F5) and the sandbox (default state, and the smallest requests: steppers at 0.5) at 390 and 1280: `--out explainers/ch-05-scheduling`, names `pool2-before-*` and `pool2-after-*`. To unlock the lane's gate, use `click:[data-check=k-03] .cp-option[data-ok]`. The sandbox mount is `[data-widget="w-sizing-sandbox"]`; read its controls' selectors from its `index.js`. The after shots should show the fixes.
- Run `npm run sync`, then `node .claude/skills/didactician/scripts/verify.mjs --out explainers/<ch>` for **every** chapter, ch-01 to ch-05. All must PASS.
- `npm run build` succeeds, and `npm run sync -- --check` reports no drift.

## Write only

- `explainers/_pool/cluster/` and `explainers/_pool/README.md`.
- Probe screenshots in `explainers/ch-04-desired-state/run/screenshots/probe/` and `explainers/ch-05-scheduling/run/screenshots/probe/`.
- Files written by the scripts themselves: chapters' `site/pool/` (sync), `dist/` (build), and chapters' `run/gate/`, `log.md` and `state.json` (verify).
- Nothing else. Not any chapter's `site/` outside `site/pool/` (in particular not Ch 5's widget folders; report anything they should now change), not CURRICULUM.md, not the skills, not `tools/` unless genuinely needed (say why).

## Constraints (verbatim invariants that apply)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver.
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine.
- I8: Each agent writes only in its namespace (above).
- Use course tokens only; status always travels as a word plus colour; transitions ≤ 300ms, instant under reduced motion.
- Don't commit anything to git.

## Report

Reply in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, covering:
- status;
- artifacts;
- summary, with each fix and how it was verified;
- concerns, including anything Ch 5's widget folders should now change, e.g. lane F's `breaks: [label]` ellipsis workaround, or the sandbox's own short-chip glue;
- relaxed.
