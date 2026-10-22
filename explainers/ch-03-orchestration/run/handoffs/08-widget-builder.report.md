status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/widgets/w-fleet-scrolly/data.js — revised A3, B4, C1, C2, C3, C4; `hold` can also hold chip statuses.
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/widgets/w-fleet-scrolly/index.js — applies held chip statuses; RUNNING gets no lamp when its word doesn't fit.
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/widgets/w-fleet-scrolly/index.css — note-line spacing; each lane reserves its own canvas height before the script runs.
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/gate/w-fleet-scrolly-round-4.json — gate PASS at 360, 768, 1280.

summary: All seven findings and the load-shift item fixed; gate passes. Playwright at 1280×900, 768×1024, 360×900, 375×667: k-03 hold shows or2/di4 RUNNING and pills "?" before commit, NEW ADDR and orders 0 · DOWN after; C3/C4 show A-01's end states; smallest text 13px; no overflow; no console errors; canvas heights equal with JS off and on per lane (424/480/456 at 1280; 420/468/444 at 768; 324/380/352 at 360×900; 324/334/334 at 375×667).

concerns:
- k-02's feedback says "Machine 04 is the only one with room"; with four empty spares (d-12) a reader may ask why not a spare. B4 now says "Of the three machines still running…"; page builder might add the qualifier to k-02.
- Page builder should use the exact phrase "the settings that send customers’ traffic to `storefront`" in k-04.
- On phones ≤667px tall, lane B's storefront chips still drop "v12" (unchanged).

relaxed:
- none

dispositions:
- A-01: fixed — C4: 01 sf5, sf6, pa1 (1 FREE); 02 dispatch ×3 (3 FREE; sf3 stopped and removed); 04 unchanged. Text "start a v13 copy on machine 01, where there’s room, add its address to those settings, then stop a v12 copy". ariaLabel and highlight updated.
- P-01: fixed — C3 no longer draws the stopped copy; machine 01 reads 3 FREE (highlighted); text says it "now has 3 units free for the next round".
- P-02: fixed — A3 "Sam moves everything onto these four, and from now on they run all of Fennel’s containers. The other four machines sit empty as spares, and Fennel still pays for all eight." B4 "Of the three machines still running, machine 04 is the only one with room…".
- P-03: fixed — B4 hold `chips: { or2: 'running', di4: 'running' }` until k-03; switch to NEW ADDR on commit; ariaHeld updated.
- P-07: fixed — C1 introduces "the settings that send customers’ traffic to `storefront`"; C3 same; C2/C4 "those settings"; "the list" gone.
- P-09: fixed — RUNNING never a lamp without its word; unmarked where it doesn't fit; abnormal states always worded.
- P-15: fixed — notes inset and spaced; outlines clear; counted in reserved height.
- load shift: fixed — per-lane canvas min-heights (A 424 / B 480 / C 456 at ≥900px; capped at 50vh below; 0 on short viewports).
