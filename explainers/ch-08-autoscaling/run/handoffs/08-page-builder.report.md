status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/src/shell.html — standfirst and meta description reworded
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/src/s-02.html — k-02 reordered; 100% label and key line on Fig. 02
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/src/s-03.html — paragraph above k-03 trimmed; Karpenter disclosure rewritten
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/src/s-04.html — k-04 reordered; set-up sentences; Fig. 04 span bracket and regrouped narrow list
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/src/s-05.html — retitled; AWS wording
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/src/s-06.html — k-06 feedback and order; paragraph, caption and label for Fig. 06
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/src/s-07.html — retitled; k-07 reordered; Fig. 08 fourth chip
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/src/s-08.html — one-line note for the compact table on phones
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/src/s-09.html — scene shortened; k-08 answer and one recap bullet
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/assets/page.css, /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/assets/page.js — span bracket, track subheads, gauge label, node 07's chart row, compact lens rows
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/widgets/w-rush-scrolly/data.js — lane steps A1, A2, A4, A6; note lines; Fig. 06 notes
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/gate/page-round-7.json — final page gate, PASS

summary: No file was half-edited when the run was cut off; the fix round started from the page as I reported it. All findings are addressed in one pass and the page gate passes (round 7, no warnings). I looked at the changed figures, the lane and the reordered checks in Chromium with all gates open: lane A1–A6 at 1280, 768 and 360, light and dark at 1280 and 360. There were no console errors or overflow, and k-04 still commits inside step A3 and opens its gates. "Seven minutes" stays, and the clocks now show where it starts. Lane heights are unchanged from the measured values, and the read time stays at 30 minutes.

concerns:
- **A-01 adds a fact that is not in `facts.md`:** that the cluster autoscaler doesn't count a node it is giving back as somewhere to put a Pod. I wrote it on the accuracy reviewer's direction (they cite the Cluster Autoscaler FAQ); `facts.md` c-10 says only that the Pods must fit elsewhere.
- **The note label "Measured · dispatch" is now "Measured"**, a departure from the plan's string. With the ready count added to that line, the longer label wrapped and pushed 430px phones off the sticky canvas; the short label keeps every height as measured.
- **P-06 is solved by words, not by the chips.** The pool decides chip text, so a one-line ready chip still shows only its name.
- **P-12 hides text on phones.** Under 600px the seven carried-over loops show name and job only, with a line saying so; their wants, sees and does cells are not reachable there.
- **"About three minutes" in k-08's answer is derived, not in the plan:** it is 17:33 to 17:36 on the page's own clocks.
- Fig. 04's caption, Fig. 06's caption and one recap bullet now differ from the plan's wording, as the findings required.
- Not acted on, as instructed: P-11, P-17, P-19.

relaxed:
- none

dispositions:
- A-01: fixed — k-06 feedback for "Both" and "Only node 07" now says node 07 is being given back itself, so it can't take the Pod. The paragraph after Fig. 06, its node 06 and node 07 notes, caption and both aria-labels say the same. Prompt and option wording unchanged.
- A-02: fixed — "seven" kept. Fig. 04 has a bracket from ~17:33 to ~17:40 labelled "About 7 minutes" (wide) and a "~17:33 · reading passes its target · the 7 minutes start here" row (narrow). Step A2 puts 17:33 in its text, A6 says "from the first late assignment, at about 17:33". k-08's answer measures both figures from that start: about three minutes and about seven. No approved story fact changed.
- P-01: fixed — same change as A-02.
- A-03: fixed — A1 lens reads "nothing: the rule gives 3, the minimum"; step text and aria-label match.
- P-07: fixed — same change as A-03.
- A-04: fixed — the disclosure names Karpenter, node auto-provisioning on AKS and Auto Mode on EKS as the family; "or model on it" is gone; GKE Autopilot has its own clause as a provider that manages the nodes for you.
- A-05: disputed — left as is. The reviewer says no change is required, and the suggested "two or three minutes with the fastest provisioners" is not in `facts.md` or x-01.
- A-06: fixed — k-08's answer says the push arrives "within a few minutes".
- A-07: fixed — node 07's rental starts at ~17:34:30 in both Fig. 04 layouts and in step A4's text.
- A-08: fixed — Fig. 05 reads "should be ready in under 25 seconds on most machine types (its own figure, June 2026)".
- P-02: fixed — standfirst and meta description say "the one Friday that didn't go smoothly"; §05 is "What teams change before a rush" (id `what-teams-change-before-a-rush`). Ari's line is unchanged.
- P-03: fixed — §07 is "catalog's slow Sunday" (id `catalogs-slow-sunday`).
- P-04: fixed — the paragraph above k-03 ends at "on whichever nodes have room"; the Chapter 5 Friday is told once, in the gated block.
- P-05: fixed — keys are now k-01 C, k-02 A, k-03 B, k-04 C, k-05 B, k-06 C, k-07 A. Wording unchanged, each feedback string stayed with its option, and nothing refers to an option by letter or position. No key is the longest.
- P-06: fixed, by options (b) and (c); (a) is not possible without the pool. The set-up now says a Pod drawn with only its name is ready, and one that isn't always says so. The "Measured" note carries the ready count in every step. A4 reads "6 READY · 3 WAITING" on the record row plus "6 ready" on the note at 1280 and 768; at 360 the row still shows only "3 WAITING", and the note shows "6 ready".
- P-08: fixed in the set-up text, not the row — the record row's words come from the pool and have no STARTING count. The set-up now says the words count ready and waiting Pods, so a starting Pod is a hollow mark.
- P-09: fixed — A4 keeps ~17:36; its lens reads "has asked for a node; waiting"; the text dates the request at about 17:34:30 and gives the arithmetic ("the average it works out across all nine is 60%").
- P-10: fixed — Fig. 07's "after" panel has a fifth band row, dashed for the week and solid for node 07's two hours, labelled "07 · 2 HOURS", at 1280 and 360. The solid part is still narrow, because two hours is about 1% of a week.
- P-12: fixed — at 360 the table is 1,395px (was 3,146).
- P-13: fixed — the Sam blockquote and the scene's second sentence are gone; the recap bullet no longer repeats the answer's last sentence.
- P-14: fixed — the first gauge carries "100%" at the outline's end, and a key line says each bar's outline is 100% of the processor a Pod reserves. The full sentence doesn't fit on the gauge at 360.
- P-15: fixed — Fig. 06 has a key line, "Nodes 01, 02, 04 · no memory for node 06's catalog Pod"; Fig. 08's fourth chip reads "Ready · 10 of its 30", and the prose and aria-label say it is ready on a third of its connections.
- P-16: fixed — both sentences replaced with the reviewer's wording.
- P-18: fixed — the narrow list is grouped under three track subheads, each in time order, with the duration first on each wait.
