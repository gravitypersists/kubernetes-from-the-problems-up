status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/_pool/cluster/cluster.js: pool-03 renderer additions (record.deployment, notready, series, STATUS_INLINE)
- /Users/m/workspace/k8s-course/explainers/_pool/cluster/cluster.css: pool-03 styles, appended (Deployment row and elbow, `.wc-st--notready` hollow lamp, `.wc-ser--1…6`)
- /Users/m/workspace/k8s-course/explainers/_pool/README.md: new section "Optional fields (pool-03, Ch 06)" with the data format, strings, highlight keys and an example (step R3); data table and highlight-key list updated
- /Users/m/workspace/k8s-course/explainers/_pool/cluster/test/index.html: new pool-03 group (D1–D3, N1–N2, S1–S2, I1) at 560, 360 and 314px, plus a crash panel at 440 and 328px
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/widgets/w-rollout-scrolly/data.js: lane R (R1–R5), FIGURES.crash and FIGURES.shipped, every string
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/widgets/w-rollout-scrolly/index.js: glue, `ClusterCanvas.lanes('w-rollout-scrolly', ClusterData)`
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/widgets/w-rollout-scrolly/index.css: measured load-time reservation (562px from 900px wide; min(456px, 50vh + 16px) below that)
- Probe shots: `pool3-before-*` and `pool3-after-*` (1280, 768, 360) in ch-04-desired-state/run/screenshots/probe/ and ch-05-scheduling/run/screenshots/probe/; `lane-r-1280-*` and `lane-r-360-*` in ch-06-rollouts/run/screenshots/probe/

summary: Part 1 (pool-03). Each addition is off when absent:
1. `record.deployment`: a header row `DEPLOYMENT · catalog · WANT 3 · v63` above indented ReplicaSet rows (thin c4 elbow). Rows read `ReplicaSet v62`, or the key alone lane-wide where that doesn't fit. An emptied row reads KEPT. Highlight keys are `dep:<name>` and `dep:<name>:version`.
2. `notready`: solid chip, hollow lamp, warn word, hollow record mark.
3. `series` 1–6: the chip in cN on cN-soft; the ring stays ink. NOT STARTED, STOPPED and LOST keep their own looks.
4. A fourth field, `STATUS_INLINE` (see concerns).

Verification:
- Every widget mount's outerHTML and height, old pool vs new, for Ch 4 (11 steps) and Ch 5 (5 steps, sandbox at defaults and minimum requests), at 1280, 1100, 768, 390 and 360, 900 and 640 tall: 190 snapshots, 0 differ.
- `npm run sync`, then verify ch-01 to ch-05: all PASS (rounds 11, 12, 14, 12, 11).
- `sync --check`: all in sync. `npm run build`: succeeds.
- Contrast: c2-soft and c5-soft match c1-soft within 0.1 for good, bad and warn. Bad on c5-soft is 5.3:1, and CRASHED reads clearly on the c5 chip.

Part 2 (lane R). Built as the plan specifies, with final step text and no reference to Ch 3 in it. How each acceptance criterion was checked:
- ac-05: a script over data.js finds 3 or 4 catalog Pods drawn and 3 ready at every step; R5 shows `WANT 0 · KEPT`.
- ac-06: scrolling back to R4, R3, R2, R1 and R5 gives a DOM identical to the first visit, at 1280 and 360. R3–R5 stay locked until k-02 is committed, and any option unlocks them (tested with a wrong option).
- In light and dark, at 1280, 1100, 768 and 360 (900 tall) and 360×640, there is no horizontal overflow. 768 and short phones use the pool's inline snapshots.
- v62 chips are magenta (c5) and v63 blue (c2), as the set-up prose says.
- f-03 is drawn by page.js from FIGURES, with `data-drawn` set.
- `verify --widget w-rollout-scrolly`: PASS. `verify --phase page` on ch-06: PASS (round 4).

concerns:
- **Fourth pool addition, `STATUS_INLINE`.** A 2 GB Pod is a one-line chip, and the existing rule drops RUNNING (READY) and replaces the label with an abnormal word. Without this field READY wouldn't show and NOT READY would hide the version, which fails ac-06. With it, the word goes beside the label, or beside the version alone ("v63 □ NOT READY") where the full label doesn't fit. That happens for some chips at 360, and for READY chips too in short-phone inline snapshots ("v62 ■ READY").
- **Before/after screenshots.** All 36 Ch 5 pairs are byte-identical; 53 of 66 Ch 4 pairs are. Of the other 13:
  - two (768 A1 and B1) differ only in the page's check-card region, caught mid-transition;
  - eleven differ by 1–6 anti-aliased pixels (360 B5 at the canvas edge, during the highlight's ease-in).
  The DOM comparison above shows the drawing itself is unchanged.
- **Lane header.** The lane name is "Thursday · catalog v63", not the plan's "Thursday, 10:15 · catalog v63". With the clock ("SECONDS LATER") the plan's name pushed the 476px header down to a bare "W-01"; the clock already carries the time.
- **ac-05 wording conflicts with the plan's own step specs.** The plan has R3 stop c2 in the step where n1 becomes ready, and R5 draw c3 gone in the step where n3 becomes ready. I followed the step specs; within each step the text says the new Pod is ready first.
- **Which Pod goes.** With default ranking, which v62 Pod is scaled down in R3 is effectively a tie. The step text doesn't explain the choice of c2.
- **Record title** is "The cluster's record · catalog only", since the `dispatch` row is omitted.
- **Reservation at 1100px.** The 562px reservation from 900px leaves about 87px empty at 1100px, where the rail narrows the canvas and the drawing is 475px.
- **Probe timing.** The scripted probes took about 30 minutes per pass, because snapshot shots of hidden elements and clicks on disabled sandbox buttons each wait out a 30s timeout.

relaxed:
- none
