status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/review/round-1/pedagogy-ux.md — round-1 pedagogy and UX review in the review template: summary, scores, reading-time estimate, acceptance-criteria evidence, and 19 findings (1 blocking, 7 should, 11 nit)
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/screenshots/probe/pux-r1-*.png — 184 probe screenshots: 360, 390, 768 and 1280 wide; light and dark; 1280×650 and 740×360 short viewports; every lane step; sandbox in default, spare off, right-sized, at use, minimal, inflated and `orders` 13.5 states; every figure, check, term card and disclosure

summary: I drove the whole page with my own Playwright scripts, built on the skill's pw helper because probe.mjs can't set dark mode or a short viewport. I committed every check, deliberately picking the tempting wrong answer on most of them; scrolled lane F forward and back; and used the sandbox through all its states and from the keyboard.

The lane works as a lane, and the sandbox earns its place: it reproduces every value in ac-08 and raising a request never lowers the node count. Misconceptions are confronted as planned, and Ch 4's promises land. 17 of 19 acceptance criteria are met; ac-17 is not, and ac-09 is partly met.

Most important issues:
1. **Blocking (ac-17).** The right answer is the longest option in 5 of 8 choice checks (k-04, k-05, k-06, k-07, k-08). Separately, the W-02 caption directly above k-05 rules out both of its distractors, and the TERM 01 card states k-02's answer about two screens before it.
2. **k-09's pointer into W-02 doesn't work.** The reveal says to try `orders` at 8 and then 12 GB, but from the default state it stays at 5 nodes everywhere from 6.5 to 13 GB. A node is added only after `storefront` and `dispatch` are right-sized.
3. **Unclear prose and grounding.** Morgan's answer counts node 06 twice (once among the two extra nodes, again as spare room). Several lines announce that the chapter is keeping a promise, which the user flagged as too meta in Ch 3. D1, the jump-in disclosure, never explains "moving day", although §02's worked example rests on it. k-08's feedback says "several services" would go over, but with the story numbers only `orders` does, and W-02 shows just that one.

Reading time: my estimate is about 30 minutes (28–32), against the brief's 26 and the gate's 26.6. The overruns are §02, §03 with the lane, and §04. Per d-05, that goes to the user's human review via the cut order in cut-list.md (items 1–7 recover about 5 minutes); no trimming is recommended.

concerns:
- The sandbox always rents enough nodes for every Pod, so inflating requests shows more nodes but never Pods left waiting; waiting appears only in lane F, plus the never-placeable `orders` case. That follows the approved plan (d-03), so it isn't a finding, but the handoff asked about waiting Pods.
- No check asks the reader to name which loop is behind a symptom (pending, a memory kill, an eviction). k-01, k-05 and k-07 touch on it only through wrong-loop distractors. That gap comes from the plan, so it isn't raised as a finding.
- k-08's "several services" is also a factual mismatch with the story numbers; the accuracy reviewer may want to confirm it.
- The TRY AGAIN line-gap nit uses the same CSS as Ch 4, so it affects the whole course; the fix belongs in shared code when the page components are promoted.
- Reduced-motion behaviour was checked only by confirming the CSS has `prefers-reduced-motion` rules; I didn't run the page with reduced motion on.

relaxed:
- none
