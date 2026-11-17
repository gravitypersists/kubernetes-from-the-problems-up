status: done

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/review/round-1/pedagogy-ux.md — round-1 review in review-template format: 20 `### new` findings (0 blocking, 9 should, 11 nit), scores, and a reading-time section. I did not run `findings.py ingest`, so IDs are not assigned yet.
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/screenshots/probe/ — probe screenshots, all prefixed `ped-r1-`.

summary: I walked every segment s-01 to s-09 in a browser at 360, 768 and 1280, and the lane at 1280, 1024, 768 and 360. I committed each check with the tempting wrong option first, opened all four gates, and tried keyboard, reduced motion, dark mode, tap targets and scroll-back. The page teaches the four objectives well: the loops are taught one at a time before the lane chains them, every check commits before it reveals with per-option feedback, and scrolling the lane back and forward restored every step exactly. Gates hold, 360 has no overflow, and the style guide is followed. Ready for a fix round on the should-level findings.

Most important findings, all `should`:
1. **"Seven minutes" does not match the clocks.** Fig. 04 and the lane show the HPA deciding at 17:34 and all nine copies ready at 17:40, which is six minutes (ten from the push). Ari's line, the Fig. 04 caption, step A6 and k-08's model answer all say seven. The number is an approved story fact (d-05), so the orchestrator or user has to pick the fix: move the decision to about 17:33, or say "about six".
2. **Three checks are partly answered before the commit.**
   - k-03: the Chapter 5 callback ("one new Pod had no room, and it waited") sits in the paragraph above the check. The key "no Pod is waiting for room" repeats it.
   - k-04: the standfirst says "the Friday they weren't fast enough", and the rail lists "Buying back the wait".
   - k-07: the heading and rail entry "When more Pods don't help" state the conclusion.
3. **Six of seven keys are option B** (k-02 to k-07). Reordering options in four checks fixes it with no wording change.
4. **ac-08 is partly unmet.** Ready Pods in the lane carry no status word. For example, the three `dispatch` Pods on node 06 in A4 are bare chips, so "starting to ready" is only a word disappearing. The cause is the pool's inline-status rule, so the fix is chapter-local.
5. **Smaller `should` items:**
   - Lane step A1 says "close enough" for 50% against a 60% target, which contradicts the 10% tolerance taught in s-02. The real reason is the minimum.
   - Fig. 07 draws node 07 as a roughly 10px square instead of a fifth band row.
   - Nothing makes the reader produce the loop lens, though o-1 says "fill in the lens". This needs a plan-level call.

Reading time: 30 minutes is honest to slightly low. I counted about 6,700 words a reader actually meets (about 29 minutes at 230 words a minute), plus about 4 minutes of thinking at checks and the lane, so 30 to 35 for a careful first read. The gate's 19.6 undercounts because gated blocks are locked when it measures. The page drags in the second half of s-03 (about 800 words behind the gate, no figure or check), in s-04's 190-word debrief paragraph, and in s-09, where the model answer and the recap overlap. The cut-list order already covers it.

concerns:
- The "seven minutes" inconsistency and the o-1 lens exercise start in the approved plan (d-04, d-05), not in the build, so the orchestrator or user has to decide before a builder acts.
- At 768 the lane shows inline per-step snapshots rather than a sticky canvas. That follows the pool's fit rule (the canvas can't fit in 50vh), so I did not report it. At 1280 the canvas fits down to 700px tall.
- The shared pool's rail truncates section titles at desktop width ("A loop that changes a nu…"). Logged as a nit that is the pool's to fix, not this chapter's.
- I did not read the accuracy review, to stay independent. I only flagged accuracy-looking items where they also affect pedagogy.

relaxed:
- none
