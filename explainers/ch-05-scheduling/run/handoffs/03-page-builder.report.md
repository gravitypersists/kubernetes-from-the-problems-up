status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/index.html: the full page. It has the hero (CHAPTER 05 · Part II · Fennel, year 3, 26 MIN), the ToC, s-01 to s-09, the cast strip, D1, D2 and D4 to D7 (no D3), four term cards (TERM 01 is the payoff variant), f-01 to f-07, k-01 to k-09 with the plan's text, both widget scaffolds, both MOUNT CONTRACT comments (lane F in §03, W-02 in §04) and the sources footer.
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/assets/page.css: Ch 4's page components reimplemented here, plus f-02, f-03, the charts, the NEW IN CH 5 tag, lane F's reserved heights and the W-02 frame. All values are tokens.
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/assets/page.js: the check script (dispatches `didactician:check-commit` exactly as Ch 4 does), CH05_LOOPS and the f-06 builder, and the f-05 and f-07 charts with their data, drawn at the measured width.
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/widgets/manifest.json: both widgets with their files, pool dependencies and sizes.
- Gate: /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/gate/page-round-2.json. Result PASS. The only notice is that both widgets are pending, as expected.

summary: Built the page for option (b) throughout. I wrote fresh prose in flowing sentences from the plan's intents. Every scene is set up before its lane or figure, and every default says "by default". No providers are named, and no catalog IDs or guarded terms appear in reader-visible text ("allocatable" appears only in D2). The checks use the plan's text, with the mockup's abbreviated feedback expanded to the plan's full wording. The page loads the pool files in the README's order, and nothing is copied from the pool or from Ch 4.

Mount contracts, in short (the full versions are the comments in index.html):
- w-friday-scrolly: one mount, `[data-widget="w-friday-scrolly"][data-lanes="F"]`; `.cs-lane[data-lane="F"]` with steps F1 to F5; k-03 sits in F2, and F3 to F5 carry `data-gate="k-03"`; `data.js` defines `window.ClusterData` with `CLUSTER_LANES.F`; `index.js` calls `ClusterCanvas.lanes('w-friday-scrolly', ClusterData)`; the page reserves the canvas at 600px from 900px wide, min(480px, 50vh) at 600–899px, and min(360px, 50vh) below that.
- w-sizing-sandbox: one empty mount, `[data-widget="w-sizing-sandbox"].d-wide.ss`, between k-04 and k-05; files: `data.js` defines `window.SizingData` (not ClusterData), `model.js` defines `window.SizingModel` (pure functions, no DOM), plus `index.js` and `index.css`; the page reserves 560px on desktop, 620px at 600–899px, and a 560px load-time minimum on phones; the page owns the three "things to notice" prompts above the mount and the caption that states the simplifications below it.

concerns:
- Error in the plan's numbers for lane F, step F3. After F2, node 01 has 1 GB and only 0.9 cores free (CPU 3.0 / 3.9), so the third Pod is short of processor on node 01 too. The correct verdicts are `{01: 'mem cpu', 02: 'mem cpu', 04: 'mem'}`. The correct reason string is "0/3 nodes are available: 2 Insufficient cpu, 3 Insufficient memory." §03's prose quotes this corrected string. The lane's widget builder has to use the same string, and the plan's R2 story fact and the pool README's example need the same fix.
- Fig. 03: I drew the spot pool dashed ("not rented yet") as well as the large-memory pool, because k-06 has Ari only proposing a spot pool. The plan drew it solid.
- Fig. 05: on phones its line labels sit in a stacked key above the plot, as the plan asked. On wide screens the used line is labelled at its start, because its end would collide with the band note.
- Reading time: the gate measures about 24.3 minutes of text alone, and that includes the sources footer. Adding the lane (about 1.75), the sandbox (about 2.5) and thinking time for the checks, my honest estimate is about 28 to 30 minutes. Per d-05 nothing was cut. The cut order for the user to consider at human review is in cut-list.md under "If it runs long".
- Small story additions: Jordan forwards Morgan's question to Ari; Ari's message is set on Tuesday evening after the third restart; and §01 says in one clause that Fennel gave back its spares before the move (approved at d-03).
- Dark mode: not screenshotted. The page uses tokens only.
- R11: page components are reimplemented here a fifth time; promoting them to the pool is still open.
- CLAUDE.md note: this asks to stop the user starting Ch 5 unless the Ch 4 session that updates curriculum facts has concluded. I didn't check this. The pool-01 report raised the same question. Please confirm it with the user.

relaxed:
- none
