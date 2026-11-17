# Findings: round 1

_Ingested 2026-11-16T22:14:56-05:00 from accuracy.md, pedagogy-ux.md._

### A-01 · blocking · open
criterion: accuracy; o-4; ac-11
location: s-06 k-06 option B feedback; s-06 paragraph after Fig. 06 ("Node 06 stayed, for the same reason..."); Fig. 06 note on node 06 (data.js FIGURES.after, "its Pod fits nowhere else") and caption
verdict: contradicted
evidence: k-06's feedback and the §06 paragraph both say "no other node has more than 1 GB free" / "node 06's one Pod reserves 2 GB". In the same scenario node 07 is empty with 13 GB free (k-06 prompt: "Node 07 is empty"; Fig. 06 data: node 07 draws "13 GB free"). Taken literally, node 06's 2 GB Pod does fit elsewhere, on node 07, so a careful reader sees the answer key contradict the figure. Option A's feedback ("3 GB free in three pieces of 1 GB") makes the same omission. The outcome is right: the cluster autoscaler does not use a node it is already removing as a place to move Pods (Cluster Autoscaler FAQ: it simulates removal, and a candidate's eligibility changes once Pods are moved to a node that is itself being removed). The page never says so.
expected_fix: Say that node 07 is going back, so it doesn't count as somewhere for the Pod to go. For example, in B's feedback and the §06 paragraph: "no node that is staying has more than 1 GB free; node 07 is itself being given back, so it can't take the Pod". Reword Fig. 06's node 06 note and the figure's aria-label the same way ("fits on no node that stays"). Apply the same qualifier in option A's feedback.

### A-02 · should · open
criterion: accuracy; o-2 (the chapter's main timing claim); consistency of Fennel's numbers
location: s-04 A6 text ("took about seven minutes"); Ari's line "It took seven minutes"; Fig. 04 (header "17:30-17:40", axis, segments, caption "Most of the seven..."); k-08 answer ("about a minute or two ... and about seven")
verdict: misleading-simplification
evidence: Read from Fig. 04's own clock, the HPA decides at about 17:34 (column 9) and all nine copies are ready at about 17:40 (column 21 to 23), which is six minutes. From the push at 17:30 it is ten. "Seven" only appears if you start at about 17:33 ("the first late assignment", A6; "within a minute of the reading crossing its target", s-04), and that moment is not drawn on Fig. 04 or in the A2 step. The same mismatch appears in k-08: copies that fit on node 06 are ready about two minutes after the decision (17:34 to 17:36), yet the answer says "a minute or two" for those and "about seven" for the node case, measured from different starting points (about six minutes from the decision, if both started at 17:34). A reader who checks the figure gets 6 or 10, not 7.
expected_fix: Choose one baseline and mark it. Either (a) draw a marker "about 17:33: the reading crosses the target and the first customers wait" on Fig. 04 (wide and narrow), put the 17:33 time in A2 or A6, and state in A6 and the caption that the seven minutes run from there; then make k-08's two figures use the same start ("about three minutes ... and about seven"); or (b) change every "seven" (A6, Ari, caption, k-08, recap, plan story fact) to "about six" and measure from the HPA's decision.

### A-03 · should · open
criterion: accuracy; ac-05 (defaults carry their hedge); the page's own tolerance rule
location: widgets/w-rush-scrolly/data.js, lane A step A1: `lens.doing` ("nothing: close enough, and 3 is the minimum"), the step text ("a little under the target, so the HPA has nothing to do") and the step's ariaLabel ("because that is close enough and 3 is the minimum")
verdict: contradicted
evidence: s-02 teaches that by default the HPA leaves the number alone "while the reading is within a tenth of the target". A1's reading is 50% against a target of 60%, a ratio of 0.83, outside the 0.9 to 1.1 tolerance (the tolerance band at a 60% target is 54% to 66%). The HPA's rule gives ceil(3 x 50/60) = ceil(2.5) = 3, so the number stays at 3 because of rounding and the minimum, not because the reading is "close enough". The page therefore applies its own tolerance rule wrongly in the first step of the lane.
expected_fix: Drop "close enough". Lens: "nothing: 3 copies is already the minimum". Text: "...a little under the target, and the loop would never go below its minimum of three copies, so it has nothing to do." Make the ariaLabel match.

### A-04 · should · open
criterion: accuracy; ac-05 (don't present one provider's behaviour as universal; vendor claims need a source)
location: s-03 D3 ("My engineers say Karpenter, or node auto-provisioning...")
verdict: unsupported
evidence: D3 says tools such as Karpenter and "the 'node auto-provisioning' or fully managed modes that several providers build on it or model on it (names you may hear include Autopilot and Auto Mode)". facts.md c-04 supports this for EKS Auto Mode ("Relying on Karpenter") and AKS node auto-provisioning ("manages ... Karpenter"). For GKE Autopilot it records only that it "provisions node pools automatically", with no link to Karpenter, and I know of no source saying Autopilot is built on or modelled on Karpenter. Autopilot also hides the nodes from the customer, so "the same job done by a different tool... what they react to is the same: Pods with no room" is not something the facts or the GKE source establish for it.
expected_fix: Keep Karpenter, node auto-provisioning (AKS) and Auto Mode (EKS) as the examples of the Karpenter-style family. Either drop "Autopilot" from the parenthesis or move it to a separate clause: "and some providers go further and manage the nodes for you (GKE Autopilot is one)". Delete "or model on it".

### A-05 · nit · open
criterion: accuracy; ac-05
location: s-04, paragraph after Fig. 04: "Pods that need a new node within roughly three to eight minutes"
verdict: ok-but-uncited
evidence: The range is derived in examples.md x-01 (a sum with a model-sourced step, low confidence), not sourced. It is hedged on the page ("as a rule of thumb", "typically", "roughly", "depending mostly on the provider") and the footer says the §04 ranges are typical figures, not measurements, so it is not presented as a statistic. It sits slightly awkwardly beside Fig. 05, which cites AWS nodes ready in under 25 seconds (fast provisioners plus a one-to-two-minute Pod start would come in under three minutes). No change is required; the hedging is adequate.
expected_fix: Optional: "from about two or three minutes with the fastest provisioners to eight or more", which matches D3 and Fig. 05.

### A-06 · nit · open
criterion: accuracy; consistency of Fennel's numbers
location: s-09 k-08 answer ("one that arrives in two minutes, like the push"); s-05 k-05 ("within a minute or two")
verdict: misleading-simplification
evidence: In the lane, the push takes the reading from 50% at 17:30 to 180% in about four minutes (A2: "within four minutes"; chart data: 17.5 to 17.57 h). k-08 says the push "arrives in two minutes".
expected_fix: Say "within a few minutes" in k-08, or "about four minutes" to match A2. k-05's imagined TV advert may keep "a minute or two", since it is a different event.

### A-07 · nit · open
criterion: accuracy; consistency (Fig. 04)
location: s-04 Fig. 04, wide layout vs narrow layout
verdict: misleading-simplification
evidence: The wide timeline starts node 07's rental at column 10 (17:34:30) and ends it at column 18 (17:38:30), exactly 4 minutes. The narrow list says "~17:34:40 to ~17:38:30" (3 min 50 s).
expected_fix: Use the same start in both, for example "~17:34:30".

### A-08 · nit · open
criterion: accuracy; vendor figure with source and date
location: s-05 Fig. 05, last row: "nodes in its newer mode are typically ready in under 25 seconds (its own figure, June 2026)"
verdict: ok-but-uncited
evidence: I could not re-read the exact sentence myself. The fetch tool truncated the post's "Boot time" paragraph. I did confirm the same post (23 June 2026) reports mean Node Ready latency down 39 percent (13 seconds), which implies about 33 s before and about 20 s after and fits "under 25 seconds". facts.md quotes the sentence as "You should see nodes ready in under 25 seconds on most instance types", measured on specific hardware. The page's "typically" is a mild strengthening of "you should see ... on most instance types", and the label as AWS's own figure with its date is there. The page's "readiness before a Pod joins" caveat is in the lane, so this is acceptable.
expected_fix: Optional: "AWS says nodes in its newer mode should be ready in under 25 seconds on most machine types (its own figure, June 2026)".

### P-01 · should · open
criterion: ac-09 (f-04 shows each wait with its length; the figure and the claimed seven minutes must agree); o-2
location: s-04 Fig. 04 and its caption; lane step A6; Ari's line "Autoscaling worked. It took seven minutes."; s-09 k-08 model answer ("about seven when a node has to be added")
evidence: The page's own clocks give six minutes, not seven. Fig. 04's axis starts "PUSH SENT" at 17:30, the HPA decides at 17:34, the copies-ready band reads "3 of 9" from 17:34 and "9 of 9" at 17:40 (screenshot run/screenshots/probe/ped-r1-w1280-f-04.png). The lane agrees (A2 17:34, A6 17:40). The caption says "Most of the seven went on starting a machine" and A6 says "From the first late assignment to this moment took about seven minutes"; "first late assignment" is never shown, and measured from the push it is ten minutes. A manager who adds up the figure does not get seven, and seven is the number the whole chapter's answer to m-11 rests on. The plan's story facts (approved in d-05) have the same gap ("~17:34 … ~17:40 … about seven minutes").
expected_fix: Needs an orchestrator or user call because the number is an approved story fact. Cheapest: move the HPA's decision and the first late assignment to about 17:33 so the span is seven (change the Fig. 04 axis marks, A2's kicker and the "within four minutes" line to match), or change "seven" to "about six" in Ari's line, Fig. 04's caption, A6, the debrief and k-08's model answer. Either way mark on Fig. 04 where the counted span starts (a bracket labelled with the span) so the figure and the sentence agree.

### P-02 · should · open
criterion: ac-09 (k-04 not answered before the commit); ac-01 (standfirst); checks guidance
location: hero standfirst; rail and mobile Contents entry "Buying back the wait" (s-05); s-01 Ari's line
evidence: Before k-04, three visible items say the loops are slow, which removes most of the pull of option A ("A few seconds"). The standfirst reads "the Friday they weren't fast enough". The rail and the mobile Contents list "Buying back the wait" from the first screen (the builder's own comment in s-05 says the plan's title was reworded because the rail shows it, but the new title still presupposes a wait). Ari's closing line in s-01 is "Neither is as quick as you'd hope." Only the last is a plan-fixed quote.
expected_fix: Reword the standfirst clause to something that does not mention speed, for example "the Friday it didn't go smoothly". Retitle s-05 without "wait", for example "What teams change before a rush" (the heading id and rail follow). Leave Ari's line, which is story, or soften to "It's not as simple as it sounds."

### P-03 · should · open
criterion: ac-12 (k-07 not answered before the commit); ac-04
location: s-07 heading "When more Pods don't help" (also the rail and mobile Contents)
evidence: The heading and rail entry, visible from page load, state the conclusion that option A of k-07 ("Adds copies … because a service that is slow needs more Pods") is wrong. The standfirst was kept clean of this on purpose (ac-01); the h2 is not.
expected_fix: Retitle s-07 so it names the scene, for example "catalog's slow Sunday" (heading id and rail follow). Keep the plan's wording inside the gated reveal ("The rule", the bottleneck question).

### P-04 · should · open
criterion: ac-03 (k-03 committed before any sentence saying the loop acts on waiting Pods); checks guidance (nothing before the commit gives its answer away)
location: s-03, the two paragraphs above k-03
evidence: The first paragraph ends "…one new Pod had no room, and it waited for an hour until Ari's team rented two more machines", and the second says the loop can "ask the provider for another node". Read together they say what triggers a rental (a Pod with no room), and k-03's key is "Nothing: no Pod is waiting for room", which repeats "no room"; the prompt itself says "every Pod has a node". The check no longer confronts "rents when machines get busy" (local-01); it tests whether the reader noticed the paragraph above. The same Chapter 5 callback is repeated inside the gate ("Had this loop been running on the Friday in Chapter 5…"), so nothing is lost by moving it.
expected_fix: Trim the first paragraph to "The HPA's work ends at the record. When it raises dispatch's number, the new Pods are placed like any others, by their requests, on whichever nodes have room." and leave the Friday in Chapter 5 to the gated callback paragraph. Prompt, options and feedback stay as the plan has them.

### P-05 · should · open
criterion: ac-14 (no key conspicuous); checks guidance
location: all choice checks: k-01 (key C), k-02, k-03, k-04, k-05, k-06, k-07 (key B each)
evidence: `data-ok` sits on the second option in six of the seven choice checks (k-02 to k-07). After two or three checks a reader who is unsure can score by choosing B, and the check stops measuring retrieval. The key's length is fine (never the longest), which is what the plan guarded against; the position pattern is the remaining tell.
expected_fix: Reorder the options in four checks, without changing wording, so keys are spread across A, B and C: for example k-02 key to A, k-04 key to C, k-06 key to C, k-07 key to A (keep k-03 and k-05 on B, k-01 on C). The option letters are in the markup, and no feedback string refers to a letter, so no feedback text changes; check that each feedback string stays attached to its own option.

### P-06 · should · open
criterion: ac-08 (a Pod ready carries a word); ac-07
location: w-rush-scrolly steps A4, A5, A6 at 1280 (five columns), 768 and 360 inline snapshots
evidence: A Pod starting shows the word STARTING (A3, A5), but a ready Pod shows READY only on some chips. In A4 the three `dispatch` Pods on node 06, which turned ready since A3, are drawn as bare "dispatch" chips with no word, as are the single-line chips for payments, notifications and the other `dispatch` Pods, while storefront, orders and (at 768) catalog show READY (screenshots ped-r1-lane-w1280-A4-pre.png, ped-r1-lane-w768-A5-pre.png). The change the step is about, starting to ready, is therefore a word disappearing. At 360 the chips also truncate to "dispa…", "payme…", "catal…" (ped-r1-w360-step-A4.png), and the record row drops "6 READY" in A4 and "3 READY" in A3, leaving only "3 WAITING". The cause is the pool's inline-status rule for single-line chips, so the fix is the page's, not the pool's.
expected_fix: Make a ready Pod say so. Options, in order of cost: (a) in page.css, let the lane's single-line chips show READY in the 5-column layout by lowering the status font or dropping the node's agent pill row height; (b) one sentence in the set-up under "What is new on the drawing": a Pod with no word is ready, one that is starting says STARTING; (c) keep the row's READY count visible at 360 by shortening the row's words (for example "6 READY · 3 WAIT"). Whichever is chosen, check A4 reads "ready" for node 06's three Pods at 1280, 768 and 360.

### P-07 · should · open
criterion: o-1; ac-07 (the reading and number satisfy the rule); consistency with s-02
location: w-rush-scrolly step A1 (lens line and step text); data.js A1
evidence: A1 reads "SEES · average 50%, target 60% / DOES · nothing: close enough, and 3 is the minimum", and the text says "That is a little under the target, so the HPA has nothing to do." But s-02 teaches that the loop leaves the number alone only "while the reading is within a tenth of the target", and 50% is not within 10% of 60% (it is 17% under). The real reason it does nothing is the minimum: 50/60 of 3 rounds to 3, and the minimum is 3. "Close enough" teaches a rule that contradicts the one the reader just learned, at the first step of the lane.
expected_fix: A1 lens: "DOES · nothing: the rule gives 3, which is also the minimum". A1 text: "…each is using about half the processor it reserves, below the target. The rule would give at most 3 copies, and 3 is the minimum, so the HPA has nothing to do."

### P-08 · nit · open
criterion: ac-07; clarity of interaction
location: w-rush-scrolly record row in A3 ("3 READY · 3 WAITING") and A5 ("6 READY"); data.js
evidence: The record row's words do not add up to the number wanted: in A3 it says 9 wanted, "3 READY · 3 WAITING", while three more Pods are drawn STARTING on node 06; in A5, "6 READY" with three STARTING on node 07. The marks (3 filled, 6 hollow) are right, but a reader who adds the words gets 6 of 9.
expected_fix: Add the missing count to the row's words where it fits ("3 READY · 3 STARTING · 3 WAITING" at 1280 and 768; at 360 keep the marks), or add "STARTING" to the row's vocabulary only in A3 and A5.

### P-09 · nit · open
criterion: ac-08; split attention; cognitive load at the hardest step
location: w-rush-scrolly step A4 (kicker "~17:36", lens, third text paragraph)
evidence: A4 shows two moments at once. The kicker and the ready count are 17:36, but the lit loop and its line "DOES · asks the provider for a node" happened at about 17:34:40 (the text says "Seconds after the three Pods began to wait"), and Fig. 04 puts node 07's request at ~17:34:40. The third paragraph then explains why the HPA does not ask for more while the canvas shows "MEASURED · 90% · target 60%" in warn colour: "It counts the three Pods that aren't ready yet as using nothing, which puts the average it works out at the target already". That is the one place where a reader at the hardest step has to hold a calculation the canvas cannot show.
expected_fix: Give the step the kicker "~17:34:40 and after" or keep 17:36 and word the lens "node 07 is already requested", so lens, clock and Fig. 04 agree. Replace the third paragraph's abstraction with the arithmetic in one clause: "Counting the three Pods that aren't ready as using nothing, the average across all nine is 60%, so it asks for no more." (6 Pods at 90%, 3 at 0, over 9 is 60%). Keep it in the text, no new canvas element.

### P-10 · should · open
criterion: acceptance of plan Fig. 07 ("a fifth cell labelled 07 · 2 HOURS"); visual consistency
location: s-06 Fig. 07, "After" panel, node band
evidence: Node 07's two hours are drawn as a roughly 10px square under the Friday axis label, beside the text "07 · 2 HOURS", not as a fifth cell in the node band (ped-r1-w1280-f07.png; at 360 ped-r1-w360-f-07.png it is a 6px mark). The band shows four rows all week, so the figure meant to show that the bill follows nodes in whole machines does not draw the one extra machine that the "5 → 4, about a fifth less" claim counts.
expected_fix: Draw node 07 as a fifth band row (a short segment as wide as the two hours, in the same outlined style, in the row above the four), labelled `07 · 2 HOURS`, at 1280 and 360.

### P-11 · should · open
criterion: o-1 (fill in the loop lens for both)
location: s-08 Fig. 09 and its lead-in; s-02 and s-03 lens paragraphs
evidence: The objective says the reader "can fill in the loop lens for both", but at no point is the reader asked to produce wants, sees or does for either loop. Both are given as paragraphs (after k-02 and in the gated block of s-03) and again as table rows; k-01 to k-03 test other parts of o-1. The plan's mapping of checks to o-1 does not include a lens exercise.
expected_fix: Cheapest: in s-08 add a think-then-reveal line before the table ("Before you read the two new rows, say what each loop wants, sees and does when they differ"), or reword the objective to "can read the loop lens for both". It needs a plan-level call by the orchestrator; adds under half a minute.

### P-12 · nit · open
criterion: mobile UX
location: s-08 Fig. 09 at 360
evidence: The table becomes stacked cards 3,146px tall (the plan estimated about 1,250). The seven carried-over rows come first and take about 2,200px; the two rows the figure is for, the HPA and the cluster autoscaler, are at the bottom (ped-r1-w360-f-09.png). On desktop it is 1,700px with the new rows last as well.
expected_fix: At under 600px (page.css, or the builder of CH08_LOOPS), render the seven carried-over rows as compact one-line cards (loop name and job only) and the two new rows in full, or put the new rows first with the older ones under a "Loops from earlier chapters" disclosure.

### P-13 · nit · open
criterion: split attention and redundancy
location: s-09 scene and k-08; k-08 reveal and the recap
evidence: Sam's quote and "storefront, payments and orders have no autoscaler yet" appear in the scene paragraph and the quote above k-08, and again word for word in k-08's prompt. The last paragraph of k-08's reveal ("The bill follows nodes, and it comes down only as far as nodes can be emptied") is repeated almost exactly by the recap's fifth bullet, which sits directly below it.
expected_fix: Drop the blockquote and the scene's second sentence, since the prompt states both. Cut the recap bullet's repeated clause or the model answer's last sentence, so the bill is said once on that screen.

### P-14 · nit · open
criterion: visual consistency (marks explained where first used); Visual grammar
location: s-02 Fig. 02, first reading's gauge
evidence: The gauge's outline is the Pod's whole reservation (100%) and the hatched part above it means "over what it reserved" (Visual grammar), but nothing on the first gauge says the outline's end is 100%. "NOW 150% · OVER" on the third reading is the first mention of "over". The key above the readings explains only the copy marks.
expected_fix: Add an end label "100% = what the Pod reserves" to the first gauge (same mono caption style as TARGET), so the hatched part of the third reading and Fig. 08's gauges are readable.

### P-15 · nit · open
criterion: visual consistency; clarity
location: s-06 Fig. 06; s-07 Fig. 08 right panel
evidence: Fig. 06: on each of nodes 01, 02 and 04 the bar reads "NO MEMORY" (at 360 "× MEM", with no legend), which reads as the node's own state; it is a verdict for node 06's `catalog` Pod, and only the caption and the note under the nodes say so. Fig. 08: the fourth `catalog` chip, "10 of its 30", uses the same peach fill as a READY Pod while the prose says most new copies "couldn't connect at all"; whether the fourth is ready is not stated.
expected_fix: Fig. 06: prefix the verdict with the Pod, for example "CATALOG · NO MEMORY" at desktop widths, or add a one-line key "Verdicts are for the catalog Pod on node 06" under the nodes. Fig. 08: give the fourth chip the not-ready look and "NOT READY · 10 OF ITS 30", or say in the aria-label and prose that it is ready on 10 connections.

### P-16 · nit · open
criterion: writing (course voice; the user's Ch 4 review: cause and effect, no unsupported claims)
location: s-06 third paragraph after k-06, and the line before Morgan's dialogue
evidence: "Notice, too, that the test is about reservations again and not about use, as it was when this loop adds a node." mixes tenses and reads as a fragment of two sentences. "None of this was quite what Morgan had expected from autoscaling." states an expectation nothing earlier established.
expected_fix: "The test counts reservations again, not use, just as the loop did when it added a node." and "Morgan, reading the bill, has a question." (or cut the line).

### P-17 · nit · open
criterion: checks guidance (sources footer visible before commits)
location: sources footer (shell.html)
evidence: The footer is visible without opening any check and states, in order, "nodes are added only for Pods that failed to schedule", "new nodes can take multiple minutes" and "nodes ready in under 25 seconds", which are the answers to k-03 and k-04 and a figure used later. It sits at the bottom after s-09, so only a reader who jumps to the end meets it.
expected_fix: No change needed if the user accepts it. Otherwise collapse the list into a `.d-more` disclosure titled "Sources", closed by default.

### P-18 · nit · open
criterion: clarity of interaction (Fig. 04 at 360)
location: s-04 Fig. 04 narrow layout
evidence: The vertical list at 360 lists "~17:36 Those 3 ready" before "~17:34:40 to ~17:38:30 Node 07 rented and starting", so times run out of order, and the widest wait (the provider's four minutes) has no more weight than the one-and-a-half-minute starts (ped-r1-w360-f-04.png).
expected_fix: Group the list by track (a "Pods that fitted on node 06" subhead and a "Pods that needed a node" subhead), each in time order, and print the duration first on each row ("about 4 min").

### P-19 · nit · open
criterion: clarity of interaction (rail)
location: rail (pool/toc.js), desktop
evidence: Rail titles truncate with an ellipsis ("Year 3: six copies, all …", "A loop that changes a nu…", "Scaling down, and Morgan…"); the full titles show only on mobile. This is the shared pool's rail, so the fix is not this chapter's.
expected_fix: Pool: let rail titles wrap to two lines. Chapter side: none; report to the orchestrator for the pool's next pass.
