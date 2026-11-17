status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/src/shell.html — hero READ and rail `data-minutes` now 30
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/src/s-02.html — one sentence corrected (the 0.4-core case)
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/src/s-03.html — date added to the AWS spot warning
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/src/s-04.html — set-up sentence reworded; vendor dates in the "twenty minutes" disclosure
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/src/s-05.html — Fig. 05 wait label now matches Fig. 04's ("Node rented and starting")
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/assets/page.css — measured lane heights; the starting node's word may wrap
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/assets/page.js — a locked block's term card no longer describes a term outside it
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/widgets/w-rush-scrolly/data.js — spare word with a soft hyphen; pool note shortened
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/gate/page-round-4.json — final page gate, PASS
- s-01, s-06 to s-09 and `widgets/manifest.json` are unchanged from builder 04; `site/src/PROGRESS.md` is deleted

summary: Finished builder 04's draft without rewriting it. The page gate passes (rounds 2 to 4, no warnings). I walked the page in Chromium at 360 and 1280, light and dark (heights at more sizes): lane steps A1–A6, k-04's gate on A4–A6 and on the block after the lane, the other three gates, Fig. 06's cluster slot, both week charts and the loop lens table all draw and work, with no console errors or overflow. The pool check holds on screen: A4 draws node 07 as a dashed frame reading STARTING, A5 as a solid frame tagged NEW. Lane heights are now measured, the read time is 30 minutes, and no key is the longest option.

concerns:
- **Read time is 30 minutes, against a plan of about 25.** The gate's 19.6 is not usable: it counts only text visible at load, so the four locked blocks are left out. With gates open the page has about 6,750 words (27.6 minutes at 230 wpm without the footer), plus thinking and feedback on eight checks and looking at the lane, less the seven unchanged lens rows. Ch 5 and Ch 7's ratio of stated time to words gives 29. No cuts were applied (d-04).
- **Pool: the spare-frame word is clipped on phones.** At 360px the node column is 54px and STARTING needs 68px, and the pool sets `nowrap`. I did not touch `site/pool/`; a two-property override in `page.css`, scoped to this widget, plus a soft hyphen in `STRINGS.spare` makes it break as START-ING. A pool fix would be cleaner.
- **Pool: starting and waiting chips show only their status word** (STARTING, WAITING), not the service name, at every width. The step text names the Pods. Not changed.
- **Pool: inline snapshots differ in height between steps** at 600px and wider when the lane falls back to per-step snapshots (608 vs 642px at 600x900). This is the pool's per-state column rule.
- **Lane note shortened:** the plan's "4 nodes, 1 more requested · max 8" wrapped a lone "8" onto a fourth note line, so it is now "4 nodes, 1 requested · max 8". The A4 lens line still wraps to two lines at 1280 with the plan's wording.
- **Lane heights measured:** 689px from 900px wide (the controller shrinks it to fit 100vh − 48px); under 900px the canvas is held to 50vh + 16px. At 360x780 and 768x1024 it cannot fit and each step shows its own snapshot (540 and 563px), as the plan expected for phones.
- **s-02 sentence changed for consistency:** the plan says a copy uses 0.4 of a core on an ordinary evening, but at that point `dispatch` still runs six copies (0.2 each). It now says the work "shared among three copies" would take 0.4 from each.
- **Not in `facts.md`:** the "takes the largest" sentence in the processor-use disclosure comes from the plan, not a claim. The general start-up ranges are model-sourced, as the plan says, and the footer says so.
- **Vendor dates added** where a vendor figure lacked one (AWS spot warning, GKE retry, AWS's 23-minute customer), for ac-05.
- **Sources footer** names durations ("multiple minutes", "under 25 seconds") and is visible at the page's end before k-04 is committed. Left as in earlier chapters.
- **Acceptance criteria:** ac-01 to ac-16 were checked by reading every fragment once against the plan and facts, and on screen for the figure, lane and gate items; ac-07's arithmetic was checked against the data file and the drawn CPU footers. All hold, with the deviations listed here.
- Builder 04's decisions not in the plan, carried forward:
  - Lane glue and Fig. 06's drawing live in `assets/page.js`, which must load last; the widget folder holds `data.js` only.
  - §04's heading is "The Friday of the push" and §05's "Buying back the wait", because the plan's titles give k-04's answer away on the page and in the rail.
  - Everything after the lane in §04 sits in a gate on k-04; locked lane steps collapse to a plate instead of reserving blank height.
  - The gate on k-06 holds the rest of §06, not only Fig. 06 and one paragraph, because Fig. 07 shows which node went back.
  - Fig. 07's "after" panel steps copies from 3 straight to 9; the plan's "6 over the Friday rush" step can't be drawn at week scale.
  - The charts' NODES band is a solid ink outline on c6-soft, since dashed c6 means "not rented yet" in Fig. 03.
  - Fig. 05 reuses Fig. 04's marks: reading climbs, HPA decides, Pod starts, node starts.
  - Before k-02 the loop is called "an autoscaler"; "HorizontalPodAutoscaler" and "HPA" come after it.
  - The plan's "would have ended that hour's wait in minutes" (s-03) and "each ready a minute or two after it is asked for" (s-04 set-up) are reworded or left out, since each gives a duration before k-04.

relaxed:
- none
