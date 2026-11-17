# Ch 8 page build: progress (delete when the build is finished and the page gate passes)

## To continue this build

- Role file: `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`
- Handoff (the task): `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/handoffs/04-page-builder.prompt.md`
- Plan records (segments, widget, figures, checks, claims, conventions):
  `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/kb.py /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling get s-01 s-02 s-03 s-04 s-05 s-06 s-07 s-08 s-09 w-rush-scrolly --closure`
  (or read `run/plan/learning-plan.md` whole once; facts are in `run/research/facts.md` and `examples.md`)
- Gate: `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling --phase page`
- Never edit `site/index.html` (assembled from `site/src/`) or `site/pool/` (read-only).

## Order of work and state

Order: assets/page.css → assets/page.js → widgets/w-rush-scrolly/data.js → widgets/manifest.json →
src/shell.html → src/s-01.html … s-09.html → gate → screenshots (360, 1280) → reading time → report.

- [x] `assets/page.css`: complete (Ch 5's components carried forward via sed, Ch 7's .cp-dialog and .cp-gate, all Ch 8 figure CSS). Lane canvas min-heights at the end are guesses (480 / 600px): replace with measured heights after the first gate run.
- [x] `assets/page.js`: complete, untested (checks, gates, CH08_LOOPS table, week charts for .wk[data-week], Fig. 06 slot, lane glue)
- [x] `widgets/w-rush-scrolly/data.js`: complete, untested (lane A steps A1–A6 with final step text, FIGURES.after)
- [x] `widgets/manifest.json`: complete
- [x] `src/shell.html`: complete (hero READ and data-minutes are a provisional 28; scripts in the required order; sources footer)
- [x] `src/s-01.html`: complete (cast, D1, k-01, Fig. 01 chart slot, dialog)
- [x] `src/s-02.html`: complete (Fig. 02 manifest + three gauges, k-02, TERM 01, lens, D2)
- [x] `src/s-03.html`: complete (k-03, gate on k-03 holding Fig. 03, TERM 02 payoff, TERM 03, D3). The plan's "would have ended that hour's wait in minutes" is reworded without a duration, because it gives k-04's answer away.
- [x] `src/s-04.html`: complete (set-up, lane mount A1–A6 with k-04 in A3, .cp-gate on k-04 holding the dialog, Fig. 04 in two layouts, debrief, D4). The plan's "each ready a minute or two after it is asked for" is left out of the set-up (a duration before k-04); the range is given once in the debrief.
- [x] `src/s-05.html`: complete (Fig. 05 table, k-05, aside)
- [x] `src/s-06.html`: complete (k-06; the gate on k-06 holds Fig. 06 AND the rest of the section, since Fig. 07 shows which node went back; D5)
- [x] `src/s-07.html`: complete (k-07, gate holding Fig. 08 and the rest)
- [x] `src/s-08.html`: complete (Fig. 09 table shell)
- [x] `src/s-09.html`: complete (k-08 reveal, recap, bridge) (write in order; s-04 holds the lane mount, k-04 inside step A3, and a .cp-gate on k-04 after the lane)
- [ ] gate passes; screenshots checked at 360 and 1280; dark mode checked
- [ ] hero READ and rail `data-minutes` set to an honest estimate (text-only time from the gate + ~4.25 min checks + ~3 min lane)
- [ ] check option lengths measured (no key the longest)
- [ ] this file deleted

## Decisions not in the plan (all go in the final report under concerns)

- Lane glue (`ClusterCanvas.lanes('w-rush-scrolly', window.ClusterData)`) and Fig. 06's drawing live in `assets/page.js`; the widget folder holds `data.js` only (handoff: "no widget code"). So `assets/page.js` must load LAST, after `pool/widget.js`, `widgets/w-rush-scrolly/data.js`, `pool/cluster/cluster.js`, `pool/cluster/lanes.js`.
- §04's h2 is "The Friday of the push" and §05's "Buying back the wait": the plan's titles ("…it took seven minutes", "…the minutes") give k-04's answer away on the page and in the rail (handoff: headings must not give a check's answer away; ac-09).
- Everything after the lane in §04 (Fig. 04, Jordan and Ari, the debrief, D4) sits in a `.cp-gate[data-gate="k-04"]`, so no duration is readable before the commit (ac-09). Locked lane steps collapse to a plate (display: none on their content), not blank reserved height.
- Fig. 07 "after": copies step 3 → 9 on the push evening; the plan's separate "6 over the Friday rush" step can't be drawn at week scale (2 hours is about 1% of the axis) and that Friday went straight from 3 to 9.
- Charts' NODES band: solid ink outline on c6-soft, not a c6 outline (the style guide says c6 is always dashed, and dashed c6 means "not rented yet" in Fig. 03).
- Fig. 04 marks reused by Fig. 05: READING CLIMBS (surface-2 / ink-3), HPA DECIDES (c3), POD STARTS (c1), NODE STARTS (dashed c6).
- Before k-02 the loop is called "an autoscaler" as a plain word (k-02's prompt uses it); "HorizontalPodAutoscaler" / "HPA" come after k-02 (ac-04).

## Names the fragments rely on (page.css / page.js)

- Components (as Ch 5): `.cp-cast`, `details.d-more.cp-more > summary + .cp-more__body`, `.cp-check[data-check="k-NN"]` with `.cp-option[data-fb][data-ok]` buttons holding `.cp-option__key` and `.cp-option__tag`, `.cp-feedback[hidden]`; think-then-reveal: `.cp-check[data-reveal]` with `button.cp-reveal` and `.cp-feedback`. Feedback text is in `data-fb`; backticks mark code.
- `.cp-term` (+ `.cp-term--payoff.cp-blueprint`, once), `.cp-aside` + `p.cp-breaks`, `.cp-quote`, `blockquote.cp-dialog > p > b` (speaker), `.cp-recap`, `.cp-wcap`, `footer.cp-sources[data-toc-skip]`.
- Gated block: `<div class="cp-gate" data-gate="k-NN"><p class="cp-gate__lock">…</p>…</div>`; page.js adds `.is-locked` and opens it on `didactician:check-commit`, then fires `didactician:gate-open`.
- Figure plate: `figure.cp-fig(.d-wide) > .cp-fig__plate > .cp-fig__bar + .cp-blueprint.<fig class>`; `figcaption > .cp-label + span`.
- Ch 8 figure classes: gauge `.gg` (style `--v`, `--t`; children `.gg__track > .gg__res, .gg__use, .gg__over, .gg__tick`, `.gg__target > .fg-set`, `.gg__now(.gg__now--end)`); copy marks `.cm > i(.is-now|.is-add) ×10 + .cm__min + .cm__max`; Fig. 02 `.hp > .hp__grid`, `.hp__rd`, `.hp__case`, `.hp__res`, `.hp__key`; manifest `.mf > .cp-rec.mf__code > .mf__row > code.mf__line + p.mf__ann`; Fig. 03 `.np > .np__cluster > .np__pool(--main|--none)`, `.np__set > .np__node(--slot)`; Fig. 04 `.wt > .wt__wide (.wt__axis, .wt__row, .wt__seg[style="--a;--b"] .is-read|.is-hpa|.is-pod|.is-node|.is-ready|.is-note, .wt__band) + .wt__narrow (ol.wt__list > li.wt__li.is-good|warn|bad > .wt__lb, .wt__lt, .wt__le)`; marks `.wm.wm--read|--hpa|--pod|--node`; Fig. 05 `.rm table` with `td[data-label]`; Fig. 06 `.cf > .cf__draw[data-cluster-figure="after"]`; charts `.wk[data-week="before|after"] > svg.wk__svg`; Fig. 08 `.db > .db__grid > .db__panel`, `.db__row`, `.db__nine`, `.db__box > .db__cells > i(.is-on)`; shared `.fg-head`, `.fg-tag`, `.fg-set`, `.pod > .pod__chip`.
- Lane mount (Ch 5's contract): `[data-widget="w-rush-scrolly"][data-lanes="A"].d-wide.cs > .cs-lane[data-lane="A"] > .cs-lane__grid > .cs-canvas[data-canvas] + ol.cs-steps > li.cs-step[data-step="A1"…"A6"]` each holding `[data-step-snap]`, `[data-step-text]`; A3 also holds k-04's `.cp-check`; A4–A6 carry `data-gate="k-04"` and `p.cs-step__lock[data-step-lock]`.
- Loop lens table: `table[data-labels][data-new="New in Ch 8"] > tbody[data-loop-lens]`, built from `CH08_LOOPS` in page.js.

## Keys page.js reads from data.js (`window.ClusterData`)

- `CLUSTER_LANES.A` = `{ name, steps: [A1…A6] }` (read by pool/cluster/lanes.js).
- `FIGURES.after` = `{ state, highlight, ariaLabel }` for Fig. 06, drawn with `nodesOnly: true`, 5 columns (3 under a 560px slot).

## Pool check: `spare` node with the word `Starting`, then `newNodes`

- By reading `pool/cluster/cluster.js` (about lines 880–950): a node listed in `state.spare` gets `.is-spare` (dashed c6 frame) and its free room prints `STRINGS.spare`, so `spare: 'Starting'` draws STARTING in the body; a later state with the same id in `newNodes`, not in `spare`, draws a solid frame with the `STRINGS.newNode` tag. Not yet confirmed on screen: check A4 and A5 in the gate screenshots or with probe.mjs.

## Gate failures seen

- none yet (gate not run)
