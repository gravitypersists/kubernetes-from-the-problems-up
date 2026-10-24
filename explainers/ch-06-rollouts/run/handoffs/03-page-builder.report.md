status: done_with_concerns

Built the Chapter 6 page with every plan segment. The page gate passes; the lane shows as pending because the widget builder's files aren't there yet.

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/index.html — the page: hero, s-01 to s-10, figures f-01 to f-07, term cards 01–04 (01 is the payoff variant), disclosures D1–D4, checks k-01 to k-07, the lane R mount, the f-03 mount, the sources list
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/assets/page.css — Ch 5's components reimplemented (including the fix that puts TRY AGAIN on its own line), the lane scaffold with Ch 6 reserved heights, and Ch 6's figures
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/assets/page.js — the checks, the gated blocks (k-04 and k-06), `CH06_LOOPS` for f-07, `CH06_INCIDENT` for f-04, and the code that draws f-03 from `ClusterData.FIGURES`
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/widgets/manifest.json — lists `w-rollout-scrolly`: lane mount R, the f-03 slots, the pool files it uses
- Gate: /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/gate/page-round-2.json is a PASS. The only warning is the 3 widget files not built yet. Text reads in about 20.2 minutes; that doesn't include the lane's step text.

summary: The prose is written fresh from the plan's intents and prose rules: flowing sentences, each scene set up before its lane or figure, and every component named before it acts. Check prompts, options and feedback are the plan's. The lane mount follows Ch 5's contract, adapted to lane R (R1–R5, with k-02 in R2 gating R3–R5); the contract comment sits above the mount. f-03 is page-owned: page.js draws `ClusterData.FIGURES.crash` and `.shipped` with the pooled renderer. Each entry can be a snapshot or `{state, highlight, ariaLabel}`. The two panels share one layout and one height reserve, and are drawn at load, when the gate opens, on resize and after fonts load. I tested this against a stub data file in scratch at 360 and 1280: both panels draw, and the aria-label comes from the data. f-03 and its explaining paragraphs are locked until k-04 is committed; f-05, the reveal, TERM 04 and the level-based paragraph are locked until k-06. The locked blocks keep their height (the lane's lock pattern). I checked f-01, f-02, f-04, f-05, f-06, f-07, §01 and the checks in screenshots at 360 and 1280.

Option lengths in characters (* = key; no key is the longest):
- k-01: A 86 · B 77* · C 109
- k-02: A 88 · B 69* · C 97
- k-03: A 110 · B 92* · C 121
- k-05: A 116 · B 95* · C 109
- k-04: A 98 · B 87* · C 109 · D 80
- k-06: A 120 · B 80* · C 83

concerns:
- **Who draws f-03.** The README has no figure mount, so I read the handoff ("f-03's mount … draws FIGURES…") as making the page own the drawing. The contract above Fig. 03 says the widget's index.js doesn't need to draw it; if it does, renderCluster replaces the slot's content, so nothing doubles. The widget builder should check that its FIGURES format matches: a snapshot, or `{state, highlight, ariaLabel}`.
- **Script order assumed.** The page links widgets/w-rollout-scrolly/index.css, data.js and index.js (glue calling `ClusterCanvas.lanes`), in Ch 5's order. If the widget builder ships no index.js, the lane never mounts.
- **f-04 caption changed.** The plan's "about one minute to roll out, five to notice and decide, and about one to roll back" adds up to 7, against six minutes of $0 prices. I wrote "nearly five before anyone acted, and about one more to roll back". By the story's times that's 14:02:20 to 14:07, then 14:07 to 14:08:20.
- **f-06 deleted chip changed.** The plan's dashed chip was `catalog:v31 · DELETED AFTER 30 DAYS`. At 2–3 releases a day, v31 would be only 10–15 days older than v61, so the 30-day clean-up wouldn't have deleted it yet. I labelled it "older catalog images · deleted after 30 days" instead. The digests in f-06 are made up, and the sources footer says so. I also added one small label, "← both lines name this image today", on the v63 chip to tie the two halves of the figure together.
- **ac-01 vs the plan's content order.** ac-01 wants §01 to end on Ari's "That depends on how it's bad", but the content list puts the hand-off line after the exchange. I put the hand-off before the exchange.
- **Gated blocks reserve their full height**, about 1,300px of blank space under k-04 on desktop. That is the lane's lock pattern as the plan asks, but a reviewer may find the gap large.
- **f-02 highlight per cell.** The two failure-row cells each get the 3px ink outline, and the row label is in full ink. My first build had a single outline spanning the whole row, but it rendered at the wrong width, so I dropped it.
- **Mobile colour names.** The set-up prose names the version colours: "v62 in magenta, v63 in blue". That's true of the c5 and c2 tokens in light mode; in dark mode c5 is closer to pink.
- **Ch 3 was a Tuesday.** The plan has Thursday-night releases, but Ch 3's update was on a Tuesday. The prose says the Tuesday update "went the same way" rather than calling it a Thursday release.
- **Not yet checked:** the lane itself and f-03 with the real data (the widget builder's job), and dark mode on the real page. Every colour is a token.

relaxed:
- none

dispositions:
- none (first round)
