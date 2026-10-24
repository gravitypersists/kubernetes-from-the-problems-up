status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/widgets/w-friday-scrolly/data.js: F3's step text shortened (P-08). `STRINGS.verdict.free` changed from 'free' to 'free when checked' (P-12), with a comment saying why. index.js and index.css are unchanged.
- Gates, all PASS: /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/gate/page-round-6.json (`--phase page`, run after the last edit) and /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/gate/w-friday-scrolly-round-2.json (`--widget`).
- Probe screenshots: /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/screenshots/probe/r2fix-w390-F2.png, r2fix-w390-F3.png, r2fix-w390-F5.png, and the same three for w768 and w1280.

summary: P-08: F3's second paragraph now ends "…records why, in a line in the format engineers see." The version caveat stays in the W-01 caption only.

P-12: the pool has no per-step way to drop the free amounts or reword them, and per-state strings don't exist. Changing amounts in the data would make the numbers false. What the pool README does support is the lane-wide `verdict.free` string, so I changed it to "free when checked". That label is true at every step. At F2 and F5 the amounts are from the check, before the drawn placement. At F3 they are computed from the drawing, which is the same moment. At 768 node 02 now reads "FITS / 3 GB · 1.15 CORES / FREE WHEN CHECKED", and the clash with its drawn 1 GB box is gone.

How I checked:
- I ran probe.mjs at 390, 768 and 1280: clicked k-03, then scrolled to F2, F3 and F5, took screenshots and read the text.
- I ran a Playwright script at 390×1200, 768×1200, 820×1180 and 1280×900. It drove the sticky canvas through F2, F3 and F5 and read the verdict text and the canvas height. There is no horizontal overflow at any of these sizes.

concerns:
- The new label only shows where the pool picks the wide verdict form, which is the 3-column inline snapshots at about 600–899px (F1–F4). The sticky canvas uses the narrow form ("✓ FITS", "✕ MEM ✕ CPU") at every size I tested, and so does every snapshot at 390 and 1280. Its heights still match the index.css reservation (592, 611 and 717px), so no reservation change was needed.
- In the wide form every verdict gains one line, so those inline snapshots are about 16px taller. At widths where "NO MEMORY · NO PROCESSOR" wraps, a verdict now needs 4 lines. There the lane falls back to the short form without amounts, which is what the finding listed as acceptable. The step text still gives the amounts.
- F5 had the same latent clash (05: 13 GB at the check, 11 GB drawn). The new label covers it too. At 768, F5 uses the narrow form, so it doesn't show there.
- P-11 (pool, not changed): there is no clean chapter-side fix. `STRINGS.status.waiting` is one lane-wide word, and putting the service name in it would fight the pool. It needs the renderer change the finding describes.
- P-13 (pool, not changed): a scoped rule in this widget's index.css would fix it cheaply, for example `outline-offset` or about 4px of padding on the highlighted waiting strip and verdict boxes. But Ch 4 would then look different from Ch 5, so it belongs in pool/cluster/cluster.css. I did not make this change.
- Not mine: the page's paragraph after TERM 02 still has its own copy of the version clause, and the page builder removes it. The carry-over from report 04 still applies: the plan, the mount contract and the pool samples still say F2's node 01 is "no memory" only.

relaxed:
- none

dispositions:
- P-08: fixed. In data.js, F3's text no longer has "; its exact wording varies between Kubernetes versions". The probe text read at all three widths confirms it.
- P-12: fixed. `STRINGS.verdict.free` is now 'free when checked', so at F2 the 768 wide form reads "3 GB · 1.15 CORES FREE WHEN CHECKED" (r2fix-w768-F2.png). I did this lane-wide rather than for F2 only, because the pool format has no per-step option. The label is accurate at every step, and desktop and 390 are unchanged because they use the short form.
