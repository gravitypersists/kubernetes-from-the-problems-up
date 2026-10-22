status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/review/round-1/pedagogy-ux.md: the round-1 pedagogy and UX review, in the template format. It has scores, a met / not-met call for each of ac-01 to ac-17, a reading-time estimate, and 11 findings (1 blocking, 5 should, 5 nit). The file parses with findings.py.
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/screenshots/probe/rev-*.png: my probe screenshots.
  - Lanes A and B step by step at 1280×900, 768×1024, 390×844, 360×740 and 740×360, including the screen after a wrong commit.
  - Dark mode at 1280 and 414.
  - Each figure, term card and check at 360, 768 and 1280.
  - A locked step, k-01 after a wrong pick, and k-09 revealed.

summary: I drove the page in Playwright: light and dark; 360, 390, 414, 600, 768, 1024 and 1280 wide; and short viewports of 740×360 and 1280×500. I committed every check, picking the tempting wrong answer for k-01, k-03 and k-04, used TRY AGAIN and revealed k-09. I scrolled both lanes forward and back, and every scroll-back restored the right state. I measured canvas heights, the fallbacks, tap targets, text sizes, option lengths and word count.

The chapter teaches. The gates work, lane B adds one new thing per step, every owned misconception is confronted, the Ch 1 payoff lands, and dark mode and the tokens are intact. Reading time: the gate says 18.2 minutes for words alone. With checks, lane steps and figures I estimate about 23 minutes (range 22–25) against the 20-minute budget. Per d-01, cuts would follow the plan's cut order.

The most important issues:
1. **Blocking, ac-15 (checks give their answers away).** k-02's right option repeats the Fig. 01 caption that sits just above it. In 5 of the 8 multiple-choice checks the right option is also the longest one: k-03 (96 characters against 59), k-05 (134) and k-07 (130).
2. **Should: the cluster's record is never introduced cleanly.** §02 says the manifest *is* the record ("a written goal like Fig. 02 is that record"). Lane A then opens on an unexplained "THE CLUSTER'S RECORD · API SERVER" panel, and k-03's options rely on that term. Only A2 explains it.
3. **Should: the loop lens is never named.** §05 says "the lens's three blanks", but nothing called "the lens" has been introduced, and "Those three blanks" in §04 points at nothing. The bridge uses a meta line about the course where the name should be. Later chapters need the name.

Other should findings:
- At 360×740 both lanes fall back to inline snapshots. At 390×844 lane A is sticky but lane B falls back, so the two lanes behave differently on the commonest phone size.
- The TERM 02 card has an ambiguous "It counts, places and replaces Pods".
- A Pod is drawn three different ways, and Fig. 03's Pod looks like a node frame.

concerns:
- I made ac-15 blocking because the user has explicitly flagged giveaway checks. The fixes are text edits only.
- Some of the precise-language points (manifest vs. record, the D2 "queue of orders") border on the accuracy reviewer's lane. I flagged them only for how clearly they teach.
- Probe screenshots are prefixed `rev-` so they don't overwrite the builders' earlier probe shots in the same folder.

relaxed:
- none

dispositions: none (first round)
