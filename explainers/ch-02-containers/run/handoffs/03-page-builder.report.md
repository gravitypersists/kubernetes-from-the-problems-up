status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/index.html — the page: hero (kicker "CHAPTER 02 · Part I · Fennel, year 1", READ 14 MIN), ToC, all prose for s-01 to s-06, f-01, f-02, checks k-01, k-04, k-05, k-06, k-07, the w-samecode mount, recap and sources
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/assets/page.css — Ch 1's page.css (hero, prose, asides with the ink-3 "breaks" label, figure plates, checks with the ink ▸/▾ markers) plus reusable `.cp-machine` / `.cp-img` / `.cp-ctr` chips, the f-01 and f-02 layouts, and the mount reservation. Tokens only, no hard-coded colours.
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/assets/page.js — Ch 1's check behaviour ("Why the other answers miss", TRY AGAIN). Adds `data-after`, which shows k-01's shared closing line once. f-01's registry and machines are drawn from the `CH02_REGISTRY` / `CH02_MACHINES` arrays, so Ch 3 can reuse them.
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/assets/tokens.css — an exact copy of design/control-plane/control-plane.css
- site/assets/components.css, replay.js, widget.js (copied from the kit) and toc.js (copied from Ch 1, which strips the § numeral in the rail)
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/widgets/manifest.json — the w-samecode entry (files data.js, index.js, index.css; plan sizes; note that k-02 and k-03 live inside the widget and their text must be used verbatim) and the font CDN

summary: Built the page from the approved plan, using Ch 1's look and behaviour. The prose is written fresh from the plan's intents. All check text matches the plan verbatim; a script compared every prompt, option and feedback string. f-01 and f-02 are HTML/CSS plates. Below an 800px plate width, f-01 stacks vertically. Below 720px, f-02's two panels stack, and under 420px the gutters tighten so CONTAINER stays on one line at 360px. The w-samecode mount reserves the plan's 600px on desktop and 960px under 600px, while it's empty. The gate (`verify.mjs --phase page`, round 2) passes; only w-samecode is reported as pending. I checked screenshots at 360 and 1280 in light and dark mode. Gate reading estimate: about 10.7 min of text. Adding about 3.5 min for the widget gives a total of roughly 14 to 15 min.

concerns:
- "Docker" appears once in the body (s-04, worded as the plan says). The sources footer also names "Docker documentation" five times, as the mockup's sources list does. If the reviewer counts the footer under ac-02, those entries could be renamed by URL.
- ac-13 ("k-05 is committed before f-02 or the kernel gloss appears"): I met this by ordering, not by locking. k-05 sits directly before the gloss and f-02, and the plan's pacing is "continuous". A reader can still scroll past without answering.
- From 600 to 899px, the empty mount reserves 600px. The plan gives no tablet size, so the widget builder should measure that width.
- Small deviations from the plan's figure description:
  - The registry chips are always in a column, newest (v43) first, so the "image: the package, never changes" label sits under v43. The plan says "one row, wrapping" for mobile.
  - On desktop, production's two container chips stack vertically because the column is narrow.
  - The container chips in f-02 carry a lamp and a CONTAINER label, to match the VM label.
- The figure label "every version kept as it was" is the plan's wording. I didn't repeat that claim in the prose, because deleting old images is a cut topic.
- The recap's final line opens with one question ("Who starts the containers again when a machine dies?"), so the "that question" that follows has a clear referent.

relaxed:
- none

dispositions:
- none (first build)
