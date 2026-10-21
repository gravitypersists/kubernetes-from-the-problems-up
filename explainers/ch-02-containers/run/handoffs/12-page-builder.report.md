status: done

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/index.html — the hero now reads 16 MIN, and the ToC rail's `data-minutes` is 16
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/assets/page.css — the empty `w-samecode` mount now reserves 1000px at 900px and wider, 1040px from 600 to 899px, and 1200px under 600px; the comment above the rule now gives the widget's final heights and the phone rule (d-08)
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/widgets/manifest.json — size notes for `w-samecode` now give the final heights and these reservations

summary: I made the two requested changes and nothing else. The time label now reads 16 minutes in both places it appears, the hero and the ToC rail (d-09). The new reservations sit at or just below the widget's final heights (1001px at 1280, 1045px at 768). Under 600px, 1200px covers the first state, which is 1240px at 360 before an answer (d-08: each state takes its own height on phones). The gate (`verify.mjs --phase page`, round 6) passes, with nothing failing and no warnings. Its reading estimate is about 11.9 minutes of text, against the brief's new budget of 16.

concerns:
- none

relaxed:
- none

dispositions:
- none (no findings in this handoff)
