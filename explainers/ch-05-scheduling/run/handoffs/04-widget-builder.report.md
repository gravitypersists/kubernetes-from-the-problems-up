status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/widgets/w-friday-scrolly/data.js: `window.ClusterData`. NODES, CAPACITY {13 GB, 3.9 cores}, UNIT 'GB', ROOM_UNIT 2, SERVICES with cpu, LOOPS, PODS (continuing Ch 4's ids: or2 = orders-q2rw, di4 on 01; new: no1, no2, di5–di7), every STRING, and `CLUSTER_LANES.F` with five complete snapshots. The header documents the Ch 5 fields used and the numbers.
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/widgets/w-friday-scrolly/index.js: glue only, `ClusterCanvas.lanes('w-friday-scrolly', window.ClusterData)`.
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/widgets/w-friday-scrolly/index.css: only the load-time height reservation, set to the measured heights.
- Gate: /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/gate/w-friday-scrolly-round-1.json. Result PASS at 360, 768 and 1280.
- Probe screenshots: /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/screenshots/probe/friday-w360-*.png and friday-w1280-*.png.

summary: I built lane F (F1–F5) on the pooled renderer and lane controller, using option (b) with the corrected F3 numbers: verdicts {01: mem cpu, 02: mem cpu, 04: mem} and the reason "0/3 nodes are available: 2 Insufficient cpu, 3 Insufficient memory.", identical to §03's prose. The step text follows the prose rules. It gives the free amounts each step turns on (F2: 3 GB and 1.9 cores on 01, 3 GB and 1.15 on 02, 1 GB on 04), says who does what, and puts "with default settings" on the scoring and the tie. It describes the reason as the format engineers see, with wording that varies between versions, and the lens uses SEES / DOES. No libraries and no CDN.

How I checked each criterion (probe.mjs plus a Playwright script):
- Gate: before the commit there are 3 locked steps, their text is hidden, and scrolling to F4 leaves F2 active. After clicking a wrong option there are 0 locked steps, and the feedback shows.
- Steps never re-lock, and scrolling back restores each step: I scrolled back F4 → F3 → F2 → F1 → F3 → F5. Every step's canvas HTML was identical to its first render, at 1280×900, 360×800 and 390×1200.
- Numbers on the canvas match the plan: F1 shows `dispatch WANT 6 · 3 RUNNING` and footers CPU 2.0 / 2.75 / 1.75. F3 shows `5 RUNNING · 1 WAITING`, the WAITING · NO ROOM strip and the SCHEDULER note. F5 shows `6 RUNNING`, NEW and ✓ FITS on 05 and 06, 05 at 11 GB free with CPU 1.0, and 06 at 13 GB free.
- aria-label: it follows the active step.
- Motion: the longest transition on the canvas is 220 ms; under reduced motion it is 1 ms.
- Overflow: there is no horizontal overflow at 360, 390, 768 or 1280.

concerns:
1. Phone legibility is limited by the pool (narrow canvas, inline snapshots). The lane reserves five node columns from F1, so a 360–390px snapshot has columns about 59px wide. The result: node ids are cut to "NODE 0", so 01, 02 and 04 can't be told apart; the record's row word overlaps its marks ("□WAITING", and the "1" is lost); "✓ FITS" is clipped; the "1 GB" free labels are cramped. Pool changes wanted: (a) in `laneLayout`/`barId`, fall back to the bare id ("01") when "NODE 01" doesn't fit `barTextW` for every node; (b) when `fixed + compW > recInner`, put the row word on its own line, or shorten the marks; (c) in `lanes.js` `drawSnaps`, allow per-state columns for inline snapshots (each step has its own snapshot, so nothing reflows), so F1–F4 draw three columns of about 100px, as the plan specified; (d) in `geometry`, apply the narrow ring-inset fallback on wide canvases too ("payments" and "dispatch" (63.6px) miss a 61px chip by about 1px at a 460px canvas). Workaround meanwhile: one-line services keep `breaks: [label]`; their chip shows "dispa…" with an ellipsis instead of "dis-".
2. The lane is taller than planned: 717px on desktop, against the plan's ~600, reserved in index.css. It shrinks to fit the viewport (665px at 1280×720) and falls back to inline snapshots under about 710px tall. Under 900px wide, most phones and short tablets go inline; the canvas stays sticky only on tall screens (390×1200, 768×1200, 820×1180).
3. F2's second check also corrects node 01: for the second Pod, node 01 has 1 GB and 0.9 cores free, so its verdict is `mem cpu`, not "no memory". The plan, the index.html mount contract ("2nd: 01 no memory") and the pool README / test-page samples (F2 `'01': 'mem'`, F3's "1 Insufficient cpu") still have the old value.
4. One small canvas addition beyond the spec: F2 has a mute note, `VERDICTS · for the second new dispatch Pod: 2 GB, 1 core`, so 01's ✕ MEM ✕ CPU doesn't read as wrong for the Pod just drawn on it. It adds no height on desktop; a reviewer can drop it.
5. Smaller choices: F4 keeps the recorded reason alongside the DISPATCH note; F5 draws verdicts only on 05 and 06; F2's text runs to three paragraphs to cover both checks (a candidate for trimming at human review, d-05).
6. CLAUDE.md note raised again: starting Ch 5 should wait until the Ch 4 session that updates curriculum facts has concluded; please confirm with the user.

relaxed:
- none

dispositions:
- none (first round)
