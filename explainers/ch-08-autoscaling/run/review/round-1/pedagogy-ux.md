# Pedagogy & UX review: round 1

## Summary
The page teaches its four objectives well. Each loop is taught alone before the lane chains them, all eight checks commit before they reveal and give per-option feedback, the lane's snapshots are complete (scrolling back and forward restored every step exactly) and its gates hold, no horizontal overflow at 360, dark mode and reduced motion are intact, and the style guide is followed. No finding is blocking. The most important problems: (1) the central number, "seven minutes", cannot be read off the clocks the page shows (they give six); (2) three checks are partly answered before they are committed (k-03, k-04, k-07), through the paragraph above k-03, the standfirst and the rail titles; (3) six of seven keys are option B, and ready Pods in the lane carry no status word (ac-08). Stated time: 30 minutes is honest to slightly low.

## Scores
- acceptance criteria: 4 — ac-01 to ac-07 and ac-09 to ac-16 met; ac-08 partly unmet (ready Pods carry no word, finding 6); ac-09 and ac-12 hold but their checks are partly pre-answered (findings 1 to 3).
- cognitive load fit: 4 — the lane's A4 is the hardest moment and the pre-training in s-02 and s-03 works; A4's "unready Pods count as using nothing" sentence is the one overload (finding 9).
- engagement where intended: 4 — eight commits, four of them gating real content; the reader predicts before each reveal. The lens is shown filled in and never produced by the reader (finding 11).
- misconception handling: 4 — m-11 stated fairly both times and shown failing (k-04 with the lane, k-07 with Fig. 08); local-01, local-02 and local-03 each confronted; m-28, m-31, m-36 retrieved. Pre-answering (findings 1 to 3) weakens the confrontation.
- split attention and redundancy: 4 — labels sit on the figures, captions carry takeaways; s-09 repeats itself (finding 14) and the unlabelled 100% outline (finding 17) is the one split.
- mobile UX: 4 — 360 is clean, tap targets 44px or more, the lane uses inline snapshots; Fig. 09 is 3,146px tall (finding 12) and the chips truncate to "dispa…" (finding 6).
- clarity of interaction: 4 — everything interactive is a visible card or button; Try again, locks and keyboard focus work; the "same position" pattern in the keys is the one lapse (finding 4).
- visual consistency and polish: 4 — tokens only, one payoff term card, c1/c4/c6 used as the visual grammar says; Fig. 07's node 07 mark is too small to read (finding 10).

## Reading time
The hero and rail say 30 minutes. A count of everything a reader actually meets (prose, figure text, check prompts and one feedback each, the lane's steps, k-08's answer; disclosures and the Fig. 09 table skimmed or excluded) gives about 6,700 words, which is about 29 minutes at 230 words a minute, before about 4 minutes of thinking at the checks and the lane. So 30 is honest to slightly low for a careful first read (30 to 35), and the plan's 25 was low. The gate's 19.6 undercounts because the gated blocks are locked when it measures. Where it drags, without asking for trimming: the second half of s-03 (about 800 words behind the gate: the two callbacks, node pools, the several-pools and spot paragraph, the lens paragraph) is the longest stretch with no figure or check; s-04's debrief is one 190-word paragraph carrying five ideas; s-09 spends about 330 words on the model answer and then a six-bullet recap that restates it. If the user ever wants the chapter shorter, the plan's cut order (staffing aside, spot pool, k-05, the two more cases in s-07) is the right one; none is needed for comprehension.

## Findings

### new
severity: should
criterion: ac-09 (f-04 shows each wait with its length; the figure and the claimed seven minutes must agree); o-2
location: s-04 Fig. 04 and its caption; lane step A6; Ari's line "Autoscaling worked. It took seven minutes."; s-09 k-08 model answer ("about seven when a node has to be added")
evidence: The page's own clocks give six minutes, not seven. Fig. 04's axis starts "PUSH SENT" at 17:30, the HPA decides at 17:34, the copies-ready band reads "3 of 9" from 17:34 and "9 of 9" at 17:40 (screenshot run/screenshots/probe/ped-r1-w1280-f-04.png). The lane agrees (A2 17:34, A6 17:40). The caption says "Most of the seven went on starting a machine" and A6 says "From the first late assignment to this moment took about seven minutes"; "first late assignment" is never shown, and measured from the push it is ten minutes. A manager who adds up the figure does not get seven, and seven is the number the whole chapter's answer to m-11 rests on. The plan's story facts (approved in d-05) have the same gap ("~17:34 … ~17:40 … about seven minutes").
expected_fix: Needs an orchestrator or user call because the number is an approved story fact. Cheapest: move the HPA's decision and the first late assignment to about 17:33 so the span is seven (change the Fig. 04 axis marks, A2's kicker and the "within four minutes" line to match), or change "seven" to "about six" in Ari's line, Fig. 04's caption, A6, the debrief and k-08's model answer. Either way mark on Fig. 04 where the counted span starts (a bracket labelled with the span) so the figure and the sentence agree.

### new
severity: should
criterion: ac-09 (k-04 not answered before the commit); ac-01 (standfirst); checks guidance
location: hero standfirst; rail and mobile Contents entry "Buying back the wait" (s-05); s-01 Ari's line
evidence: Before k-04, three visible items say the loops are slow, which removes most of the pull of option A ("A few seconds"). The standfirst reads "the Friday they weren't fast enough". The rail and the mobile Contents list "Buying back the wait" from the first screen (the builder's own comment in s-05 says the plan's title was reworded because the rail shows it, but the new title still presupposes a wait). Ari's closing line in s-01 is "Neither is as quick as you'd hope." Only the last is a plan-fixed quote.
expected_fix: Reword the standfirst clause to something that does not mention speed, for example "the Friday it didn't go smoothly". Retitle s-05 without "wait", for example "What teams change before a rush" (the heading id and rail follow). Leave Ari's line, which is story, or soften to "It's not as simple as it sounds."

### new
severity: should
criterion: ac-12 (k-07 not answered before the commit); ac-04
location: s-07 heading "When more Pods don't help" (also the rail and mobile Contents)
evidence: The heading and rail entry, visible from page load, state the conclusion that option A of k-07 ("Adds copies … because a service that is slow needs more Pods") is wrong. The standfirst was kept clean of this on purpose (ac-01); the h2 is not.
expected_fix: Retitle s-07 so it names the scene, for example "catalog's slow Sunday" (heading id and rail follow). Keep the plan's wording inside the gated reveal ("The rule", the bottleneck question).

### new
severity: should
criterion: ac-03 (k-03 committed before any sentence saying the loop acts on waiting Pods); checks guidance (nothing before the commit gives its answer away)
location: s-03, the two paragraphs above k-03
evidence: The first paragraph ends "…one new Pod had no room, and it waited for an hour until Ari's team rented two more machines", and the second says the loop can "ask the provider for another node". Read together they say what triggers a rental (a Pod with no room), and k-03's key is "Nothing: no Pod is waiting for room", which repeats "no room"; the prompt itself says "every Pod has a node". The check no longer confronts "rents when machines get busy" (local-01); it tests whether the reader noticed the paragraph above. The same Chapter 5 callback is repeated inside the gate ("Had this loop been running on the Friday in Chapter 5…"), so nothing is lost by moving it.
expected_fix: Trim the first paragraph to "The HPA's work ends at the record. When it raises dispatch's number, the new Pods are placed like any others, by their requests, on whichever nodes have room." and leave the Friday in Chapter 5 to the gated callback paragraph. Prompt, options and feedback stay as the plan has them.

### new
severity: should
criterion: ac-14 (no key conspicuous); checks guidance
location: all choice checks: k-01 (key C), k-02, k-03, k-04, k-05, k-06, k-07 (key B each)
evidence: `data-ok` sits on the second option in six of the seven choice checks (k-02 to k-07). After two or three checks a reader who is unsure can score by choosing B, and the check stops measuring retrieval. The key's length is fine (never the longest), which is what the plan guarded against; the position pattern is the remaining tell.
expected_fix: Reorder the options in four checks, without changing wording, so keys are spread across A, B and C: for example k-02 key to A, k-04 key to C, k-06 key to C, k-07 key to A (keep k-03 and k-05 on B, k-01 on C). The option letters are in the markup, and no feedback string refers to a letter, so no feedback text changes; check that each feedback string stays attached to its own option.

### new
severity: should
criterion: ac-08 (a Pod ready carries a word); ac-07
location: w-rush-scrolly steps A4, A5, A6 at 1280 (five columns), 768 and 360 inline snapshots
evidence: A Pod starting shows the word STARTING (A3, A5), but a ready Pod shows READY only on some chips. In A4 the three `dispatch` Pods on node 06, which turned ready since A3, are drawn as bare "dispatch" chips with no word, as are the single-line chips for payments, notifications and the other `dispatch` Pods, while storefront, orders and (at 768) catalog show READY (screenshots ped-r1-lane-w1280-A4-pre.png, ped-r1-lane-w768-A5-pre.png). The change the step is about, starting to ready, is therefore a word disappearing. At 360 the chips also truncate to "dispa…", "payme…", "catal…" (ped-r1-w360-step-A4.png), and the record row drops "6 READY" in A4 and "3 READY" in A3, leaving only "3 WAITING". The cause is the pool's inline-status rule for single-line chips, so the fix is the page's, not the pool's.
expected_fix: Make a ready Pod say so. Options, in order of cost: (a) in page.css, let the lane's single-line chips show READY in the 5-column layout by lowering the status font or dropping the node's agent pill row height; (b) one sentence in the set-up under "What is new on the drawing": a Pod with no word is ready, one that is starting says STARTING; (c) keep the row's READY count visible at 360 by shortening the row's words (for example "6 READY · 3 WAIT"). Whichever is chosen, check A4 reads "ready" for node 06's three Pods at 1280, 768 and 360.

### new
severity: should
criterion: o-1; ac-07 (the reading and number satisfy the rule); consistency with s-02
location: w-rush-scrolly step A1 (lens line and step text); data.js A1
evidence: A1 reads "SEES · average 50%, target 60% / DOES · nothing: close enough, and 3 is the minimum", and the text says "That is a little under the target, so the HPA has nothing to do." But s-02 teaches that the loop leaves the number alone only "while the reading is within a tenth of the target", and 50% is not within 10% of 60% (it is 17% under). The real reason it does nothing is the minimum: 50/60 of 3 rounds to 3, and the minimum is 3. "Close enough" teaches a rule that contradicts the one the reader just learned, at the first step of the lane.
expected_fix: A1 lens: "DOES · nothing: the rule gives 3, which is also the minimum". A1 text: "…each is using about half the processor it reserves, below the target. The rule would give at most 3 copies, and 3 is the minimum, so the HPA has nothing to do."

### new
severity: nit
criterion: ac-07; clarity of interaction
location: w-rush-scrolly record row in A3 ("3 READY · 3 WAITING") and A5 ("6 READY"); data.js
evidence: The record row's words do not add up to the number wanted: in A3 it says 9 wanted, "3 READY · 3 WAITING", while three more Pods are drawn STARTING on node 06; in A5, "6 READY" with three STARTING on node 07. The marks (3 filled, 6 hollow) are right, but a reader who adds the words gets 6 of 9.
expected_fix: Add the missing count to the row's words where it fits ("3 READY · 3 STARTING · 3 WAITING" at 1280 and 768; at 360 keep the marks), or add "STARTING" to the row's vocabulary only in A3 and A5.

### new
severity: nit
criterion: ac-08; split attention; cognitive load at the hardest step
location: w-rush-scrolly step A4 (kicker "~17:36", lens, third text paragraph)
evidence: A4 shows two moments at once. The kicker and the ready count are 17:36, but the lit loop and its line "DOES · asks the provider for a node" happened at about 17:34:40 (the text says "Seconds after the three Pods began to wait"), and Fig. 04 puts node 07's request at ~17:34:40. The third paragraph then explains why the HPA does not ask for more while the canvas shows "MEASURED · 90% · target 60%" in warn colour: "It counts the three Pods that aren't ready yet as using nothing, which puts the average it works out at the target already". That is the one place where a reader at the hardest step has to hold a calculation the canvas cannot show.
expected_fix: Give the step the kicker "~17:34:40 and after" or keep 17:36 and word the lens "node 07 is already requested", so lens, clock and Fig. 04 agree. Replace the third paragraph's abstraction with the arithmetic in one clause: "Counting the three Pods that aren't ready as using nothing, the average across all nine is 60%, so it asks for no more." (6 Pods at 90%, 3 at 0, over 9 is 60%). Keep it in the text, no new canvas element.

### new
severity: should
criterion: acceptance of plan Fig. 07 ("a fifth cell labelled 07 · 2 HOURS"); visual consistency
location: s-06 Fig. 07, "After" panel, node band
evidence: Node 07's two hours are drawn as a roughly 10px square under the Friday axis label, beside the text "07 · 2 HOURS", not as a fifth cell in the node band (ped-r1-w1280-f07.png; at 360 ped-r1-w360-f-07.png it is a 6px mark). The band shows four rows all week, so the figure meant to show that the bill follows nodes in whole machines does not draw the one extra machine that the "5 → 4, about a fifth less" claim counts.
expected_fix: Draw node 07 as a fifth band row (a short segment as wide as the two hours, in the same outlined style, in the row above the four), labelled `07 · 2 HOURS`, at 1280 and 360.

### new
severity: should
criterion: o-1 (fill in the loop lens for both)
location: s-08 Fig. 09 and its lead-in; s-02 and s-03 lens paragraphs
evidence: The objective says the reader "can fill in the loop lens for both", but at no point is the reader asked to produce wants, sees or does for either loop. Both are given as paragraphs (after k-02 and in the gated block of s-03) and again as table rows; k-01 to k-03 test other parts of o-1. The plan's mapping of checks to o-1 does not include a lens exercise.
expected_fix: Cheapest: in s-08 add a think-then-reveal line before the table ("Before you read the two new rows, say what each loop wants, sees and does when they differ"), or reword the objective to "can read the loop lens for both". It needs a plan-level call by the orchestrator; adds under half a minute.

### new
severity: nit
criterion: mobile UX
location: s-08 Fig. 09 at 360
evidence: The table becomes stacked cards 3,146px tall (the plan estimated about 1,250). The seven carried-over rows come first and take about 2,200px; the two rows the figure is for, the HPA and the cluster autoscaler, are at the bottom (ped-r1-w360-f-09.png). On desktop it is 1,700px with the new rows last as well.
expected_fix: At under 600px (page.css, or the builder of CH08_LOOPS), render the seven carried-over rows as compact one-line cards (loop name and job only) and the two new rows in full, or put the new rows first with the older ones under a "Loops from earlier chapters" disclosure.

### new
severity: nit
criterion: split attention and redundancy
location: s-09 scene and k-08; k-08 reveal and the recap
evidence: Sam's quote and "storefront, payments and orders have no autoscaler yet" appear in the scene paragraph and the quote above k-08, and again word for word in k-08's prompt. The last paragraph of k-08's reveal ("The bill follows nodes, and it comes down only as far as nodes can be emptied") is repeated almost exactly by the recap's fifth bullet, which sits directly below it.
expected_fix: Drop the blockquote and the scene's second sentence, since the prompt states both. Cut the recap bullet's repeated clause or the model answer's last sentence, so the bill is said once on that screen.

### new
severity: nit
criterion: visual consistency (marks explained where first used); Visual grammar
location: s-02 Fig. 02, first reading's gauge
evidence: The gauge's outline is the Pod's whole reservation (100%) and the hatched part above it means "over what it reserved" (Visual grammar), but nothing on the first gauge says the outline's end is 100%. "NOW 150% · OVER" on the third reading is the first mention of "over". The key above the readings explains only the copy marks.
expected_fix: Add an end label "100% = what the Pod reserves" to the first gauge (same mono caption style as TARGET), so the hatched part of the third reading and Fig. 08's gauges are readable.

### new
severity: nit
criterion: visual consistency; clarity
location: s-06 Fig. 06; s-07 Fig. 08 right panel
evidence: Fig. 06: on each of nodes 01, 02 and 04 the bar reads "NO MEMORY" (at 360 "× MEM", with no legend), which reads as the node's own state; it is a verdict for node 06's `catalog` Pod, and only the caption and the note under the nodes say so. Fig. 08: the fourth `catalog` chip, "10 of its 30", uses the same peach fill as a READY Pod while the prose says most new copies "couldn't connect at all"; whether the fourth is ready is not stated.
expected_fix: Fig. 06: prefix the verdict with the Pod, for example "CATALOG · NO MEMORY" at desktop widths, or add a one-line key "Verdicts are for the catalog Pod on node 06" under the nodes. Fig. 08: give the fourth chip the not-ready look and "NOT READY · 10 OF ITS 30", or say in the aria-label and prose that it is ready on 10 connections.

### new
severity: nit
criterion: writing (course voice; the user's Ch 4 review: cause and effect, no unsupported claims)
location: s-06 third paragraph after k-06, and the line before Morgan's dialogue
evidence: "Notice, too, that the test is about reservations again and not about use, as it was when this loop adds a node." mixes tenses and reads as a fragment of two sentences. "None of this was quite what Morgan had expected from autoscaling." states an expectation nothing earlier established.
expected_fix: "The test counts reservations again, not use, just as the loop did when it added a node." and "Morgan, reading the bill, has a question." (or cut the line).

### new
severity: nit
criterion: checks guidance (sources footer visible before commits)
location: sources footer (shell.html)
evidence: The footer is visible without opening any check and states, in order, "nodes are added only for Pods that failed to schedule", "new nodes can take multiple minutes" and "nodes ready in under 25 seconds", which are the answers to k-03 and k-04 and a figure used later. It sits at the bottom after s-09, so only a reader who jumps to the end meets it.
expected_fix: No change needed if the user accepts it. Otherwise collapse the list into a `.d-more` disclosure titled "Sources", closed by default.

### new
severity: nit
criterion: clarity of interaction (Fig. 04 at 360)
location: s-04 Fig. 04 narrow layout
evidence: The vertical list at 360 lists "~17:36 Those 3 ready" before "~17:34:40 to ~17:38:30 Node 07 rented and starting", so times run out of order, and the widest wait (the provider's four minutes) has no more weight than the one-and-a-half-minute starts (ped-r1-w360-f-04.png).
expected_fix: Group the list by track (a "Pods that fitted on node 06" subhead and a "Pods that needed a node" subhead), each in time order, and print the duration first on each row ("about 4 min").

### new
severity: nit
criterion: clarity of interaction (rail)
location: rail (pool/toc.js), desktop
evidence: Rail titles truncate with an ellipsis ("Year 3: six copies, all …", "A loop that changes a nu…", "Scaling down, and Morgan…"); the full titles show only on mobile. This is the shared pool's rail, so the fix is not this chapter's.
expected_fix: Pool: let rail titles wrap to two lines. Chapter side: none; report to the orchestrator for the pool's next pass.
