# Findings: round 1

_Ingested 2026-10-23T07:56:53-04:00 from accuracy.md, pedagogy-ux.md._

### A-01 · should · open
criterion: o-2 / o-3 (raising a request can add a node)
location: s-09, k-09 reveal, "(try `orders` at 8 and then 12 GB in W-02)"; widget w-sizing-sandbox
verdict: misleading-simplification
evidence: Probe (1280px, run/screenshots/probe/acc-r1-ss-at-use.png, acc-r1-ss-at-use-orders12.png): starting from the state the page asks for ("Set each request to what that service used at the rush": storefront 2, orders 5.5, dispatch 1), NODES reads 04 (3 + 1 spare) with orders at 5.5, at 8 and at 12. It changes only at 12.5. Starting from Fennel's defaults (4 / 6 / 2), the model gives 4 + spare at every orders value from 5.5 to 13 (model sweep with SizingModel.evaluate, cross-checked with an independent exact solver). The only state where 8 → 12 adds a node is storefront 2.5 / dispatch 1.5, which the self-test uses but the page never names. A reader who follows the pointer sees the node count stay the same while orders doubles, the opposite of what the sentence beside it claims ("that can mean another node on the bill").
expected_fix: Point to a reproducible setting. Either name the state ("with storefront at 2.5 and dispatch at 1.5, try orders at 8 and then 12 GB") or pick values that add a node from the "used at the rush" state the page already sets up (from 2 / 5.5 / 1, orders at 12 → 3 nodes for the Pods, 12.5 → 4). Alternatively drop the parenthesis and say a node is added only once the bigger request no longer fits beside the others.

### A-02 · should · open
criterion: o-2 (under-requesting → evictions); internal consistency of the fiction
location: s-08, k-08 option A feedback: "at the rush several services would use more than they reserved … (W-02's warnings show which services.)"
verdict: contradicted
evidence: The story's rush usage (W-02 data.js `use`) is storefront 2, orders 5.5, dispatch 1, payments 0.5 and notifications 0.5 GB per copy. Halved requests are 2, 3, 1, 1 and 1 GB. Only orders goes over its request; storefront and dispatch land exactly on their use. In W-02, halving the three adjustable requests (storefront 2, orders 3, dispatch 1) gives one warning, for orders only (model: `over: ['orders']`). The mechanism in the key is right, but the feedback's "several services" contradicts the page's own numbers and the widget it sends the reader to.
expected_fix: Say "at the rush orders would use far more than it reserved (and storefront and dispatch would have no margin at all)", or change "several services" to "orders, at least". Keep the pointer to W-02's warnings, which will then match.

### A-03 · nit · open
criterion: c-05 / x-01 (allocatable example)
location: s-02 disclosure "Why can Pods reserve only about 13 GB of a 16 GB node?": "On one provider, for example, a 16 GB node keeps back about 2.7 GB of memory"
verdict: misleading-simplification
evidence: GKE "Plan node sizes" (fetched 2026-10-23, docs.cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes) gives 25%/20%/10% … + 100 MiB only for "node pools created on GKE 1.36 or earlier". Pools created on 1.37 or later use "Min(EarlierMemoryReservation, (15 MiB * MaxPodsPerNode) + BaseOverhead)" (BaseOverhead 500 MiB on COS). At 110 Pods per node that's about 2.1 GiB + 100 MiB ≈ 2.2 GB for a 16 GB node. The facts file flagged this caveat (x-01) but the page states 2.7 GB as the provider's current figure. The "small machines lose a bigger share" point and the ~quarter for 4 GB still hold under both formulas.
expected_fix: Hedge the number: "keeps back roughly 2 to 3 GB of memory, depending on the node pool's version" or "on node pools created on its older versions, about 2.7 GB". Fennel's 13 GB stays fiction in the right range.

### A-04 · nit · open
criterion: c-04 / q-3 note (defaults when unset)
location: s-07 term card "limits": "They cap use; they reserve nothing."
verdict: misleading-simplification
evidence: facts.md q-3 note, quoting kubernetes.io manage-resources: with a limit but no request, "Kubernetes copies the limit you specified and uses it as the requested value for the resource". So a limit set alone does end up reserving room. The card's absolute "reserve nothing" is true only when a request is also set, which is Fennel's case. A manager who later hears "we only set limits" would draw the wrong conclusion about placement and cost.
expected_fix: Soften to "On their own terms they reserve nothing", or add to D7 one sentence: "If a team sets only a limit, Kubernetes uses it as the request too, so it reserves that much."

### A-05 · nit · open
criterion: c-20 / c-21 (pending)
location: s-03 term card "pending", second line: "Not failed, and not fixed by waiting alone."
verdict: misleading-simplification
evidence: The disclosure "Is 'pending' always about room?" right below says pending also covers image download, which does resolve by waiting. A room-pending Pod is also placed without anyone acting when other Pods finish or are removed (c-21: retried "when a node joining or a Pod being removed"). The prose is careful ("in Fennel's cluster no loop makes room by itself"), but the card generalises it.
expected_fix: "Not failed, and in Fennel's cluster not fixed by waiting alone", or "Not failed; it waits until something makes room."

### A-06 · nit · open
criterion: c-14 / c-15 (survey attribution)
location: s-04 disclosure "How common is this?": "with just over 100 self-selected respondents" … "Over-provisioning, which means reserving more than workloads need"
verdict: unsupported
evidence: The CNCF post (fetched 2026-10-23) says only "received a total of just over 100 responses" and doesn't describe recruitment, so "self-selected" is the researcher's characterisation. The post also doesn't define over-provisioning; its chart caption gives "workloads using more resources than necessary". In this chapter "reserving" means requests specifically, so the gloss narrows the cause to over-requesting, though the survey term plausibly covers over-sized clusters too (Datadog's 54-point "cluster idle" is exactly that).
expected_fix: Drop "self-selected" or write "a small online survey". Gloss over-provisioning as "paying for more capacity than workloads need".

### A-07 · nit · open
criterion: brief: invented sizes internally consistent
location: s-02 first paragraph ("every node had room for six units" … "One unit of room in Chapter 4 stood for 2 GB of memory request") vs. "the Pods on a node can reserve only about 13 GB"
verdict: misleading-simplification
evidence: 6 units × 2 GB = 12 GB, while the same section gives each node 13 GB of room for Pods, and W-01 draws 13 GB columns. Because every Ch 3/4 size is a whole number of units, the extra 1 GB changes no Ch 4 placement (I checked moving day and 03:04 at 13 GB / 3.9 cores, and both match d-04's layout). Still, a reader who multiplies will find the two figures disagree.
expected_fix: One clause, e.g. "every node had room for six units (the real figure, 13 GB, leaves 1 GB over that Chapter 4's sizes never used)".

### A-08 · nit · open
criterion: c-05 / c-09 (what Fennel pays for)
location: w-sizing-sandbox idle bar head "The rented room" and readout "Reserved · 38 of 65 GB"; s-04 "W-02's idle bar splits the room Fennel rents"
verdict: misleading-simplification
evidence: Probe at the defaults (acc-r1-ss-default.png): "THE RENTED ROOM … 19.5 GB · 30% / 18.5 GB · 28% / 27 GB · 42%", which sums to 65 GB = 5 × 13 GB of room for Pods. Fennel rents 5 × 16 = 80 GB. The 15 GB kept back for the system, which §04 lists as a third reason for the bill, is outside the bar, so "rented" overstates what the bar shows.
expected_fix: Relabel the head "Room for Pods on the rented nodes" (or similar), or add a fourth, hatched "kept back for the system" segment.

### A-09 · nit · open
criterion: cross-chapter consistency
location: s-05: "Chapter 3 called spare room insurance and left 'how much?' to this chapter."
verdict: unsupported
evidence: Ch 3's page (site/index.html) says "Some of that room is worth having … How much spare room is right is a question for Chapter 5", and Ch 3's story fact quotes Sam: "the spare room is for when something breaks". Neither the page nor its widget data uses the word "insurance".
expected_fix: "Chapter 3 said some spare room is worth having and left 'how much?' to this chapter."

### P-01 · blocking · open
criterion: ac-17 (no giveaways: the right option is never the longest)
location: s-04 k-04, k-05; s-06 k-06; s-07 k-07; s-08 k-08
evidence: Option text lengths in characters, with * marking the key. k-04: 97 / 106 / *108. k-05: 93 / *103 / 92. k-06: *80 / 79 / 79. k-07: 72 / 74 / *83. k-08: *89 / 78 / 84. In 5 of 8 choice checks the key is the longest option, and in k-05, k-07 and k-08 by 5–11 characters. A reader who picks the longest option scores 5 of 8. Ch 4's P-01 was blocking for the same kind of giveaway.
expected_fix: Make each key no longer than at least one distractor, without changing meaning. Examples: k-07 C → "`storefront` slows down; `orders` is killed and restarted." k-08 A → "Fewer nodes, but Pods over their reservations get evicted when a node runs short." k-05 B → "Nothing: it places only new Pods, and both nodes stay on the bill until someone removes them." Lengthen one distractor slightly in k-04 and k-06 (for example k-06 C: "Neither: Kubernetes replaces Pods when a machine goes, so either service can run there.").

### P-02 · should · open
criterion: ac-17 (no option answered by a nearby caption or card) / misconception confrontation (m-08, local-01)
location: s-04 k-05 with the W-02 caption (`.cp-wcap` directly above it); s-02 k-02 with TERM 01 (`#term-01`)
evidence: The W-02 caption, the line right above k-05, says "while a real cluster never moves running Pods". Both k-05 distractors (A "Moves their Pods onto the fuller nodes…", C "Spreads Pods from the fuller nodes…") depend on moving running Pods, so the caption rules them out and m-08 is never really tested. TERM 01, about two screens above k-02, defines requests as "…The scheduler places Pods by their requests, never by what they use", which is k-02's answer. The plan sequenced "reservations, not use" after k-02 so that k-02 would be a prediction, and the card turns it into recall.
expected_fix: Reword k-05's distractors so the caption doesn't refute them while they still carry m-08. For example A: "After a while it notices the two idle nodes and stops renting them, since fewer nodes cost less." Keep C as the balancer lure without "moves" (for example "Starts new copies on 05 and 06 so that every node ends up about equally busy"). Shorten TERM 01's definition to "The memory and processor a Pod reserves on its node, written in its manifest; the scheduler places Pods by them." "Never by what they use" already appears in k-02's reveal paragraph and in the recap.

### P-03 · should · open
criterion: engagement where intended (sandbox serves the conversation) / ac-16
location: s-09 k-09 reveal, "(try `orders` at 8 and then 12 GB in W-02)"; w-sizing-sandbox
evidence: Probe. From the default or reset state, `orders` at every value from 6.5 to 13 GB gives "5 nodes, set by memory". 8 and 12 change nothing, because node 1 and the 11 GB free on node 4 absorb the growth. A node is added only if storefront is 2.5 and dispatch 1.5 first (then `orders` 11.5 → 4 nodes, 12 → 5). A reader who follows the instruction sees the opposite of "that can mean another node on the bill".
expected_fix: Make the pointer reproducible from where the reader starts. For example: "(in W-02, set `storefront` to 2.5 GB and `dispatch` to 1.5 GB, then try `orders` at 8 and at 12 GB)". Or name the reset state and values that do move the count.

### P-04 · should · open
criterion: precise language (no double counting; the user's Ch 2–4 standards)
location: s-04, Morgan's answer ("So here is the answer to Morgan's question, with the biggest cause first…")
evidence: The first cause is "Fennel rents two extra nodes because … padded requests had filled three nodes", and the second is "Next, node 06 has stayed nearly empty since Friday, which makes it a node's worth of spare room". Node 06 is one of the two extra nodes, so the second cause is part of the first, while the paragraph presents three separate causes, biggest first. A manager can't tell whether 06 is waste from padding or insurance.
expected_fix: Present 06 as part of the first cause. For example: "Fennel rents five nodes instead of three because the teams' padded requests filled three nodes on paper on Friday, so Ari's team rented two more. One of those, node 06, has sat nearly empty since, which makes it a node's worth of spare room: whether to keep it is a choice, and the next section explains why it might be worth it. On top of that, on every node about 3 GB…"

### P-05 · should · open
criterion: no meta lines about the course (user's Ch 3 human review; brief Lessons "callbacks … not as bookkeeping")
location: s-01 last paragraph; s-02 paragraph before f-02; s-05 both paragraphs; recap line 3
evidence: The page announces that promises are being kept instead of just keeping them. Examples: "This chapter starts where Chapter 4 said it would, with the loop that picked node 04…"; "Chapter 3 promised that the two would be counted separately, and Fig. 02 shows why it matters"; "that missing room is what Chapter 4 said this chapter was about"; "Chapter 3 called spare room insurance and left 'how much?' to this chapter"; recap "nothing in this chapter makes room by itself". The user flagged the same move in Ch 3 ("Last chapter said … and that this chapter would place it … feels a bit too meta").
expected_fix: Keep the content and drop the course bookkeeping. s-01: "Ari's answer starts with the loop that picked node 04 for `orders` at 03:04, and ends with the questions Jordan should ask before anyone changes those two numbers." s-02: delete "Chapter 3 promised that the two would be counted separately, and". s-05: "Since 03:04, Fennel had been running on three nodes with almost nothing spare." / "In Chapter 3, Sam's spare machines were insurance; how much insurance to keep is a decision…". Recap: "nothing in Fennel's cluster makes room by itself".

### P-06 · should · open
criterion: ground before you use (user's Ch 4 human review 02: "What's moving day?"); §2.11 "I didn't read the last chapter"
location: s-01 D1; s-02 moving-day paragraph; w-friday-scrolly F1 text ("as it did on moving day")
evidence: s-02 builds its worked example on "on moving day in Chapter 4, `storefront`'s three Pods went to three different nodes…", and F1 says "as it did on moving day". D1, the jump-in disclosure, mentions manifests, the loops and 03:04, but never moving day. A reader who skipped Ch 4 meets "moving day" with no grounding, which is exactly the user's Ch 4 complaint. (Smaller: s-07's "Chapter 4's crash-looping `notifications`" also isn't in D1.)
expected_fix: Add one sentence to D1's first bullet, for example: "On moving day, Ari applied the manifests to the new cluster and the scheduler placed every service on nodes 01–04." Optionally gloss it inline in s-02 too: "on moving day in Chapter 4, when Fennel first applied its manifests to the new cluster".

### P-07 · should · open
criterion: k-08 feedback consistent with W-02 (accuracy reviewer may also want this)
location: s-08 k-08, option A feedback
evidence: The feedback says "at the rush several services would use more than they reserved … (W-02's warnings show which services.)" With the story numbers, halving gives storefront 2 = used 2, dispatch 1 = used 1 and orders 3 against 5.5 used. Only `orders` is over, and W-02 at 2 / 3 / 1 shows exactly one warning (model check: over = ['orders']). A reader who tries it sees one service, not several.
expected_fix: "…but at the rush `orders` would use far more than it reserved (5.5 GB against 3) and others would sit right at their reservations. When a node runs short… (Set W-02 to half the requests to see which.)"

### P-08 · should · open
criterion: split attention and redundancy (pedantic caveats belong in the caption or a disclosure)
location: s-03: F3 step text (data.js), the W-01 caption, and the paragraph after TERM 02
evidence: "its exact wording varies between Kubernetes versions" appears three times in about one screen: at the end of F3's second paragraph, in the W-01 caption, and again in "…which is in the format engineers see, though the exact wording varies between Kubernetes versions." The plan put it in the caption only.
expected_fix: Keep the caption and delete the clause from F3's step text and from the paragraph after TERM 02.

### P-09 · nit · open
criterion: split attention (labels match the prose that points at them)
location: s-04 "W-02's idle bar…"; s-05 "the spare-node switch in W-02"; w-sizing-sandbox `.ssw__idle` head, `.ssw__switch`
evidence: The prose says "idle bar", but the widget heads that bar "THE RENTED ROOM". The prose says "spare-node switch", but the switch reads "Keep room to lose a node". The reader has to search the widget for a name that isn't printed on it.
expected_fix: Either head the bar "The rented room · idle bar" (SHEET.idle.head) or say "W-02's rented-room bar" in the prose. In s-05, write "the 'Keep room to lose a node' switch in W-02".

### P-10 · nit · open
criterion: engagement where intended (k-04 → sandbox hand-off); sandbox prompts
location: s-04 k-04 key feedback; third "thing to notice"
evidence: k-04's feedback ends "W-02, below, shows how far it goes", but `payments`' request is fixed in W-02, so the reader can't try k-04's case. The third prompt, "Push `orders` past 13 GB.", is the only one that doesn't ask a question.
expected_fix: Change the feedback to "W-02, below, lets you try the same with `storefront`, `orders` and `dispatch`." Make the prompt "Push `orders` past 13 GB. What happens to the count?"

### P-11 · nit · open
criterion: clarity of interaction / things different in kind drawn differently (lane chips)
location: w-friday-scrolly F2, F3, F4 (pool `renderCluster` waiting and notstarted chips); screenshots pux-r1-w768-lane-F2.png, pux-r1-zoom768-F3-top.png
evidence: The waiting Pod's chip reads only "WAITING", inside a strip already headed "WAITING · NO ROOM", and never says `dispatch`. At 768 the chip is about 420px wide. F2's new Pods read only "NOT STARTED" at 390 and 768. The reader infers the service from the record row.
expected_fix: In the pool renderer, label waiting chips with the service name (the strip header carries the status), and show "dispatch · NOT STARTED" where the chip is wide enough.

### P-12 · nit · open
criterion: cognitive load fit (one moment per frame)
location: w-friday-scrolly F2 at 600–899px (wide verdict form); pux-r1-w768-lane-F2.png
evidence: Node 02's bar reads "FITS · 3 GB · 1.15 CORES FREE", while the drawing under it already shows the second Pod placed and 1 GB free. The VERDICTS note qualifies it, but at the lane's second-hardest step the same node shows two different free amounts. (On desktop the canvas is 477px wide, so it uses the short forms without amounts, which avoids the clash but drops the free amounts the plan wanted on the bars.)
expected_fix: For F2 only, drop the free amounts from the wide verdicts (or phrase them "had 3 GB · 1.15 cores"), since the step text already gives them.

### P-13 · nit · open
criterion: visual consistency and polish (highlight outlines)
location: pool/cluster/cluster.css highlight on the waiting strip and verdict boxes; pux-r1-zoom768-F3-top.png, pux-r1-w1280-lane-F3.png
evidence: The 3px highlight border is drawn tight to its content. "WAITING · NO ROOM" and "NO MEMORY · NO PROCESSOR" start on the left border, and "1 GB · 2.15 CORES FREE" touches the right one.
expected_fix: Add about 4px of inner padding (or outline-offset) to highlighted verdicts and the waiting strip.

### P-14 · nit · open
criterion: ac-09 (idle bar labelled on the bar) / style guide ("no legends unless there are more than four series")
location: w-sizing-sandbox `.ssw__ilabels.is-stack`; pux-r1-w768-ss-default-el.png, pux-r1-w1280-ss-inflated.png, pux-r1-w1280-ss-minimal.png
evidence: At 768, and at 1280 when one segment dominates (everything inflated), the three labels fall back to a stacked swatch legend under the bar. In low-request states the "used" segment gains a hatched part (use above reservation) that has no label anywhere.
expected_fix: Before falling back, let the labels wrap to two lines under their segments (or allow the labels to overhang the narrow segment). Label the hatch, for example "of which over its reservation · n GB", or mention it in the warnings.

### P-15 · nit · open
criterion: visual consistency and polish (sandbox drawing)
location: w-sizing-sandbox nodes at low requests (minimal state, node 2); chip labels "notifi-", "pay-"
evidence: In the minimal state, storefront's hatched overflow is drawn over the `notifications` chip above it and crosses its label (pux-r1-w1280-ss-minimal.png, pux-r1-dark1280-ss-minimalish.png). The sandbox cuts labels with a hyphen ("notifi-"), while lane F deliberately uses an ellipsis ("notific…") because a hyphen reads as a word break.
expected_fix: Draw overflow behind neighbouring chips' labels, or stop it at the chip above with a hatch cap. Use the lane's one-line names in SizingData's `breaks` (ellipsis cut).

### P-16 · nit · open
criterion: readable prose (user's Ch 4 human review 01)
location: hero standfirst; s-01 third paragraph
evidence: The standfirst says "This chapter traces that bill, a Pod that wouldn't start and a service that kept restarting back to two numbers…". The long list sits between "traces" and "back to", which makes a garden path. s-01: "Before the move, Fennel had given back the spare machines Sam used to keep and ran on four" can be misread as "Sam used to keep and ran on four".
expected_fix: Standfirst: "…traces three problems, a bill that went up, a Pod that wouldn't start and a service that kept restarting, back to two numbers each team wrote down…". s-01: "Before the move, Fennel had given back the spare machines Sam used to keep and was running on four, and the new bill was higher than any from those days."

### P-17 · nit · open
criterion: visual consistency and polish (check feedback)
location: `.cp-retry` in assets/page.css (the same rule is in Ch 4, so it's course-wide); every wrong-answer feedback, e.g. pux-r1-w1280-k03-wrongB.png, pux-r1-w360-k-08-commit.png
evidence: The inline TRY AGAIN button has min-height 44px, so it stretches its line box and leaves a visible gap in the middle of the feedback sentence ("each node here has only 1 / [gap] / GB free. TRY AGAIN").
expected_fix: Put the retry button on its own line after the feedback text (display block or inline-flex in its own paragraph), keeping the 44px target.

### P-18 · nit · open
criterion: visual consistency and polish (figures)
location: f-07 leak chart; f-06 at 360px
evidence: In f-07, the "orders per hour" label sits on the traffic band and the memory line in the leak chart (pux-r1-w1280-k-09-revealed.png, w360). In f-06 at 360, "SAM'S JOB" in the dashed Chapter 8 card crowds the card's right edge, and the tfoot note has no side padding (pux-r1-w360-f-06.png). The ReplicaSet "does" cell is tagged NEW IN CH 5 as a whole, although only "including for Pods that were evicted" is new.
expected_fix: Move the band label above the band or into the axis margin. Give the stacked-card header and tfoot the card's padding. Tag only the new clause (for example, wrap it in the tag's style) or move the tag after "…extras,".

### P-19 · nit · open
criterion: reading time (d-05: route over-length to the cut order; information only)
location: whole page
evidence: My estimate is about 30 minutes (28–32) against the brief's 26, with the gate at 26.6. The overruns are §02 (about 6 minutes against 4.0), §03 with the lane (about 6 against 4.0) and §04 (about 7 against 5.0). Details are in ## Reading time.
expected_fix: No builder action. For the user's human review: `cut-list.md` `## If it runs long`, items 1–7 in order (about −5 minutes). Prose is not to be compressed.
