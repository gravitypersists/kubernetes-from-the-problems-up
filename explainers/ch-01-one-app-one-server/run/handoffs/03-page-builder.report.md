status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/index.html — the Ch 1 page: hero, ToC (rail plus mobile disclosure), s-01..s-07, f-01..f-03, page-built checks k-01 and k-05..k-09, the w-rebuild mount, sources footer
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/assets/tokens.css — unchanged copy of design/control-plane/control-plane.css
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/assets/page.css — Control Plane treatments copied from bundle.css (hero, prose, aside, figure plate, check) plus the figure CSS. Tokens only, no raw colours
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/assets/page.js — f-01 rows rendered from the `CH01_OUTAGE_TIMELINE` array, f-02 arrows drawn with kit arrow.js, check logic
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/assets/{components.css,toc.js,arrow.js,widget.js,replay.js} — kit copies. One change in toc.js: the rail drops the "§ 01" numeral from link text
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/widgets/manifest.json — the w-rebuild entry (segment, mount, size, files data.js/index.js/index.css) and the Google Fonts origins

summary: I built every segment, figure and page-level check in the plan. Prose is written fresh from the plan's intents, and every factual claim comes from facts.md. Sources are linked inline and listed in a footer, which also states that Fennel is fiction.

Each choice check works like this: the reader commits, the chosen and correct options are marked with a word plus a colour, and the feedback for the chosen option appears. A "Why the other answers miss" disclosure then shows the plan's feedback for every other option, so ac-18 holds even when the reader picks the right answer first. Wrong picks also get TRY AGAIN, as the style guide requires.

The figures:
- f-01 is a data-driven list with the NO ORDERS band.
- f-02 is an SVG with a separate stacked drawing for screens under 560px.
- f-03 is three HTML panels that stack under 900px.

The w-rebuild mount reserves a min-height of 600px, or 820px under 600px.

The gate (`verify.mjs --phase page`, round 4) passes, with only w-rebuild reported as pending. I checked screenshots at 360 and 1280 in both themes and clicked through the checks.

concerns:
- **Reading time is over budget.** The gate measures about 10.9 minutes of text. Add the widget's planned 3–4 minutes and the page comes to about 14–15 minutes against the 12-minute budget (d-01). I didn't trim the prose. The plan's cut order is available if the user wants cuts.
- **"Kubernetes" removed from the hero.** The mockup's kicker read "PART I · BEFORE KUBERNETES". I removed it, along with the course title, because ac-03 bans "Kubernetes" anywhere on the page. The hero now reads "CHAPTER 01 · Part I · Fennel, year 0". The orchestrator may want to rule on this.
- **"image" will still appear on the page.** ac-03 bans "image", but the plan's own verbatim text uses "image-resizing tool": the k-02 card, the k-04 feedback and the widget row. My prose says "the photo tool", following the plan's s-04 wording. "image" will appear through the widget's text, and the reviewer should expect it.
- **Check feedback follows the plan, not the mockup.** The mockup's feedback is shortened in places (k-06 A, k-07 A, k-08 A). I used the plan's full wording; prompts and options are identical in both. For k-01 and k-09 I dropped the plan's design notes ("Think-then-reveal… no grading") and kept only the sentences meant for the reader.
- **One promise to the widget builder.** The page loads `widgets/w-rebuild/data.js` before `index.js`, and the manifest lists data.js. The widget builder must create that file, which the plan requires anyway.
- **Unsourced statements for the accuracy reviewer.** These are general knowledge, not from facts.md: what a process is, what a deploy is, the runbook definition in s-07, "a new VM can be created in minutes" (the source says "quick"), the nightly-snapshot service, and "log files are the diary the app and web server keep". The last one is the model-sourced mechanism from x-03. "Single point of failure" appears only in the k-06 feedback.
- **Fowler quotes keep his spelling.** They are verbatim, so "data center" and his " - " punctuation stay. My own prose uses "data centre".

relaxed:
- none

dispositions:
- none (first round)
