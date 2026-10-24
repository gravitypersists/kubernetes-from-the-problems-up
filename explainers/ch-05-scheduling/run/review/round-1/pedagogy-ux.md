# Pedagogy & UX review: round 1

## Summary
The chapter teaches. Lane F works as a lane: the scene is set first, the k-03 gate locks F3–F5, scrolling back restores each step, and narrow or short screens fall back to inline snapshots. The sandbox earns its place: the reader finds 4 nodes, then 3 set by processor, insurance worth a node, and a Pod no node can take. Misconceptions are confronted as planned, and reserved, used and capped look different. The blocking issue: the right answer is the longest option in 5 of 8 choice checks, and the W-02 caption rules out k-05's distractors. Next: k-09's "`orders` at 8 then 12 GB" changes nothing from the default state, Morgan's answer counts node 06 twice, and some promise-keeping lines are meta.

## Scores
- acceptance criteria: 3 — 17 of 19 met. ac-17 is not met (longest-option pattern, k-05 caption echo). ac-09 is partly met (the idle bar falls back to a legend).
- cognitive load fit: 4 — F3 is pre-trained by f-02, and verdict words sit on the node bars. F2 shows two moments in one frame.
- engagement where intended: 4 — predict before the sandbox, transfer after it, and a gated lane. k-09's pointer into W-02 doesn't work from the default state.
- misconception handling: 4 — m-07, m-08, m-26 and local-01–03 are each stated fairly, shown to fail and corrected. k-02 and k-05 are weakened by nearby giveaways.
- split attention and redundancy: 4 — the version caveat appears three times. The prose names "idle bar" and "spare-node switch", but the widget labels them differently.
- mobile UX: 4 — no overflow at 360, steppers and switch are 44px, and readouts sit with the controls. The fallbacks work at 360, 390, 768, 1280×650 and 740×360.
- clarity of interaction: 4 — the controls are obvious, the live sentence is good, and the keyboard order is right. Waiting and new chips don't name their service.
- visual consistency and polish: 4 — matches Ch 4 and the guide in both themes. Small collisions: highlight borders over text, overflow hatch over a neighbour's label, and the TRY AGAIN line gap.

## Reading time
Measured: 5,135 words of body (disclosures excluded) plus 468 words of lane step text. That is about 24 minutes of reading at 230 wpm, plus about 3 minutes for the 9 checks and their feedback, about 2.5 minutes in the sandbox and about 1.5 minutes looking at the lane and figures. My estimate is **about 30 minutes (28–32)**, against the brief's 26; the gate measured 26.6. The overruns against the plan's table are §02 (1,090 words, about 6 minutes against 4.0), §03 with the lane (about 6 against 4.0) and §04 (about 7 against 5.0). Per d-05 this goes to the user's human review via `cut-list.md` `## If it runs long` (items 1–7 recover about 5 minutes). It is recorded as an information-only finding below, not a request to trim prose.

## Acceptance criteria (evidence in probe screenshots `run/screenshots/probe/pux-r1-*`)
- ac-01 met (w360-cast, hero; k-01 before the scene). ac-02 met (w1280-f-01, f-02, term-01; filter rule before k-02, daily-peak quote after it). ac-03 met (one sentence; guarded words absent, checked by grep).
- ac-04 met (w1280-s03-setup; GB columns and CPU footers on every node). ac-05 met (lane-F1…F5 at 1280/390/360/768; WAITING strip, `5 RUNNING · 1 WAITING`, SCHEDULER note, F5 text). ac-06 met: sticky canvas at 1280×900 (717px canvas), inline fallback at 360, 390, 768, 1280×650 and 740×360; scrolling back to F2 and F1 restores the aria-label; lane text never below 13px; caption present. ac-07 met (`pool/cluster/*` loaded; data.js header documents the fields).
- ac-08 met. Probe values: 5 / memory / 38 of 65 / 19.5; spare off → 4; 2.5, 6, 1.5 → 4 (3 + spare), both; 2, 6, 1 → 4, processor; `orders` 13.5 → `—`, never placeable; `orders` 6.5–13 is monotonic; warnings appear at 0.5 GB. ac-09 partly met (P-new idle-bar legend). ac-10 met (6 steppers 44×44, switch 44 tall, reset 44; Tab moves through the native buttons; the live sentence names the change, nodes, set-by, reserved, used and warnings; desktop and 768 reserve the tallest state, with content below shifting 0px across default, minimal, inflated and `orders` 13.5).
- ac-11–ac-16 met (see findings for k-09's pointer and Morgan's answer). ac-17 **not met**. ac-18 met (no guarded terms, kinds capitalised, "by default" present). ac-19 met (6 disclosures, all collapsed, summaries 44px).

## Findings

### new
severity: blocking
criterion: ac-17 (no giveaways: the right option is never the longest)
location: s-04 k-04, k-05; s-06 k-06; s-07 k-07; s-08 k-08
evidence: Option text lengths in characters, with * marking the key. k-04: 97 / 106 / *108. k-05: 93 / *103 / 92. k-06: *80 / 79 / 79. k-07: 72 / 74 / *83. k-08: *89 / 78 / 84. In 5 of 8 choice checks the key is the longest option, and in k-05, k-07 and k-08 by 5–11 characters. A reader who picks the longest option scores 5 of 8. Ch 4's P-01 was blocking for the same kind of giveaway.
expected_fix: Make each key no longer than at least one distractor, without changing meaning. Examples: k-07 C → "`storefront` slows down; `orders` is killed and restarted." k-08 A → "Fewer nodes, but Pods over their reservations get evicted when a node runs short." k-05 B → "Nothing: it places only new Pods, and both nodes stay on the bill until someone removes them." Lengthen one distractor slightly in k-04 and k-06 (for example k-06 C: "Neither: Kubernetes replaces Pods when a machine goes, so either service can run there.").

### new
severity: should
criterion: ac-17 (no option answered by a nearby caption or card) / misconception confrontation (m-08, local-01)
location: s-04 k-05 with the W-02 caption (`.cp-wcap` directly above it); s-02 k-02 with TERM 01 (`#term-01`)
evidence: The W-02 caption, the line right above k-05, says "while a real cluster never moves running Pods". Both k-05 distractors (A "Moves their Pods onto the fuller nodes…", C "Spreads Pods from the fuller nodes…") depend on moving running Pods, so the caption rules them out and m-08 is never really tested. TERM 01, about two screens above k-02, defines requests as "…The scheduler places Pods by their requests, never by what they use", which is k-02's answer. The plan sequenced "reservations, not use" after k-02 so that k-02 would be a prediction, and the card turns it into recall.
expected_fix: Reword k-05's distractors so the caption doesn't refute them while they still carry m-08. For example A: "After a while it notices the two idle nodes and stops renting them, since fewer nodes cost less." Keep C as the balancer lure without "moves" (for example "Starts new copies on 05 and 06 so that every node ends up about equally busy"). Shorten TERM 01's definition to "The memory and processor a Pod reserves on its node, written in its manifest; the scheduler places Pods by them." "Never by what they use" already appears in k-02's reveal paragraph and in the recap.

### new
severity: should
criterion: engagement where intended (sandbox serves the conversation) / ac-16
location: s-09 k-09 reveal, "(try `orders` at 8 and then 12 GB in W-02)"; w-sizing-sandbox
evidence: Probe. From the default or reset state, `orders` at every value from 6.5 to 13 GB gives "5 nodes, set by memory". 8 and 12 change nothing, because node 1 and the 11 GB free on node 4 absorb the growth. A node is added only if storefront is 2.5 and dispatch 1.5 first (then `orders` 11.5 → 4 nodes, 12 → 5). A reader who follows the instruction sees the opposite of "that can mean another node on the bill".
expected_fix: Make the pointer reproducible from where the reader starts. For example: "(in W-02, set `storefront` to 2.5 GB and `dispatch` to 1.5 GB, then try `orders` at 8 and at 12 GB)". Or name the reset state and values that do move the count.

### new
severity: should
criterion: precise language (no double counting; the user's Ch 2–4 standards)
location: s-04, Morgan's answer ("So here is the answer to Morgan's question, with the biggest cause first…")
evidence: The first cause is "Fennel rents two extra nodes because … padded requests had filled three nodes", and the second is "Next, node 06 has stayed nearly empty since Friday, which makes it a node's worth of spare room". Node 06 is one of the two extra nodes, so the second cause is part of the first, while the paragraph presents three separate causes, biggest first. A manager can't tell whether 06 is waste from padding or insurance.
expected_fix: Present 06 as part of the first cause. For example: "Fennel rents five nodes instead of three because the teams' padded requests filled three nodes on paper on Friday, so Ari's team rented two more. One of those, node 06, has sat nearly empty since, which makes it a node's worth of spare room: whether to keep it is a choice, and the next section explains why it might be worth it. On top of that, on every node about 3 GB…"

### new
severity: should
criterion: no meta lines about the course (user's Ch 3 human review; brief Lessons "callbacks … not as bookkeeping")
location: s-01 last paragraph; s-02 paragraph before f-02; s-05 both paragraphs; recap line 3
evidence: The page announces that promises are being kept instead of just keeping them. Examples: "This chapter starts where Chapter 4 said it would, with the loop that picked node 04…"; "Chapter 3 promised that the two would be counted separately, and Fig. 02 shows why it matters"; "that missing room is what Chapter 4 said this chapter was about"; "Chapter 3 called spare room insurance and left 'how much?' to this chapter"; recap "nothing in this chapter makes room by itself". The user flagged the same move in Ch 3 ("Last chapter said … and that this chapter would place it … feels a bit too meta").
expected_fix: Keep the content and drop the course bookkeeping. s-01: "Ari's answer starts with the loop that picked node 04 for `orders` at 03:04, and ends with the questions Jordan should ask before anyone changes those two numbers." s-02: delete "Chapter 3 promised that the two would be counted separately, and". s-05: "Since 03:04, Fennel had been running on three nodes with almost nothing spare." / "In Chapter 3, Sam's spare machines were insurance; how much insurance to keep is a decision…". Recap: "nothing in Fennel's cluster makes room by itself".

### new
severity: should
criterion: ground before you use (user's Ch 4 human review 02: "What's moving day?"); §2.11 "I didn't read the last chapter"
location: s-01 D1; s-02 moving-day paragraph; w-friday-scrolly F1 text ("as it did on moving day")
evidence: s-02 builds its worked example on "on moving day in Chapter 4, `storefront`'s three Pods went to three different nodes…", and F1 says "as it did on moving day". D1, the jump-in disclosure, mentions manifests, the loops and 03:04, but never moving day. A reader who skipped Ch 4 meets "moving day" with no grounding, which is exactly the user's Ch 4 complaint. (Smaller: s-07's "Chapter 4's crash-looping `notifications`" also isn't in D1.)
expected_fix: Add one sentence to D1's first bullet, for example: "On moving day, Ari applied the manifests to the new cluster and the scheduler placed every service on nodes 01–04." Optionally gloss it inline in s-02 too: "on moving day in Chapter 4, when Fennel first applied its manifests to the new cluster".

### new
severity: should
criterion: k-08 feedback consistent with W-02 (accuracy reviewer may also want this)
location: s-08 k-08, option A feedback
evidence: The feedback says "at the rush several services would use more than they reserved … (W-02's warnings show which services.)" With the story numbers, halving gives storefront 2 = used 2, dispatch 1 = used 1 and orders 3 against 5.5 used. Only `orders` is over, and W-02 at 2 / 3 / 1 shows exactly one warning (model check: over = ['orders']). A reader who tries it sees one service, not several.
expected_fix: "…but at the rush `orders` would use far more than it reserved (5.5 GB against 3) and others would sit right at their reservations. When a node runs short… (Set W-02 to half the requests to see which.)"

### new
severity: should
criterion: split attention and redundancy (pedantic caveats belong in the caption or a disclosure)
location: s-03: F3 step text (data.js), the W-01 caption, and the paragraph after TERM 02
evidence: "its exact wording varies between Kubernetes versions" appears three times in about one screen: at the end of F3's second paragraph, in the W-01 caption, and again in "…which is in the format engineers see, though the exact wording varies between Kubernetes versions." The plan put it in the caption only.
expected_fix: Keep the caption and delete the clause from F3's step text and from the paragraph after TERM 02.

### new
severity: nit
criterion: split attention (labels match the prose that points at them)
location: s-04 "W-02's idle bar…"; s-05 "the spare-node switch in W-02"; w-sizing-sandbox `.ssw__idle` head, `.ssw__switch`
evidence: The prose says "idle bar", but the widget heads that bar "THE RENTED ROOM". The prose says "spare-node switch", but the switch reads "Keep room to lose a node". The reader has to search the widget for a name that isn't printed on it.
expected_fix: Either head the bar "The rented room · idle bar" (SHEET.idle.head) or say "W-02's rented-room bar" in the prose. In s-05, write "the 'Keep room to lose a node' switch in W-02".

### new
severity: nit
criterion: engagement where intended (k-04 → sandbox hand-off); sandbox prompts
location: s-04 k-04 key feedback; third "thing to notice"
evidence: k-04's feedback ends "W-02, below, shows how far it goes", but `payments`' request is fixed in W-02, so the reader can't try k-04's case. The third prompt, "Push `orders` past 13 GB.", is the only one that doesn't ask a question.
expected_fix: Change the feedback to "W-02, below, lets you try the same with `storefront`, `orders` and `dispatch`." Make the prompt "Push `orders` past 13 GB. What happens to the count?"

### new
severity: nit
criterion: clarity of interaction / things different in kind drawn differently (lane chips)
location: w-friday-scrolly F2, F3, F4 (pool `renderCluster` waiting and notstarted chips); screenshots pux-r1-w768-lane-F2.png, pux-r1-zoom768-F3-top.png
evidence: The waiting Pod's chip reads only "WAITING", inside a strip already headed "WAITING · NO ROOM", and never says `dispatch`. At 768 the chip is about 420px wide. F2's new Pods read only "NOT STARTED" at 390 and 768. The reader infers the service from the record row.
expected_fix: In the pool renderer, label waiting chips with the service name (the strip header carries the status), and show "dispatch · NOT STARTED" where the chip is wide enough.

### new
severity: nit
criterion: cognitive load fit (one moment per frame)
location: w-friday-scrolly F2 at 600–899px (wide verdict form); pux-r1-w768-lane-F2.png
evidence: Node 02's bar reads "FITS · 3 GB · 1.15 CORES FREE", while the drawing under it already shows the second Pod placed and 1 GB free. The VERDICTS note qualifies it, but at the lane's second-hardest step the same node shows two different free amounts. (On desktop the canvas is 477px wide, so it uses the short forms without amounts, which avoids the clash but drops the free amounts the plan wanted on the bars.)
expected_fix: For F2 only, drop the free amounts from the wide verdicts (or phrase them "had 3 GB · 1.15 cores"), since the step text already gives them.

### new
severity: nit
criterion: visual consistency and polish (highlight outlines)
location: pool/cluster/cluster.css highlight on the waiting strip and verdict boxes; pux-r1-zoom768-F3-top.png, pux-r1-w1280-lane-F3.png
evidence: The 3px highlight border is drawn tight to its content. "WAITING · NO ROOM" and "NO MEMORY · NO PROCESSOR" start on the left border, and "1 GB · 2.15 CORES FREE" touches the right one.
expected_fix: Add about 4px of inner padding (or outline-offset) to highlighted verdicts and the waiting strip.

### new
severity: nit
criterion: ac-09 (idle bar labelled on the bar) / style guide ("no legends unless there are more than four series")
location: w-sizing-sandbox `.ssw__ilabels.is-stack`; pux-r1-w768-ss-default-el.png, pux-r1-w1280-ss-inflated.png, pux-r1-w1280-ss-minimal.png
evidence: At 768, and at 1280 when one segment dominates (everything inflated), the three labels fall back to a stacked swatch legend under the bar. In low-request states the "used" segment gains a hatched part (use above reservation) that has no label anywhere.
expected_fix: Before falling back, let the labels wrap to two lines under their segments (or allow the labels to overhang the narrow segment). Label the hatch, for example "of which over its reservation · n GB", or mention it in the warnings.

### new
severity: nit
criterion: visual consistency and polish (sandbox drawing)
location: w-sizing-sandbox nodes at low requests (minimal state, node 2); chip labels "notifi-", "pay-"
evidence: In the minimal state, storefront's hatched overflow is drawn over the `notifications` chip above it and crosses its label (pux-r1-w1280-ss-minimal.png, pux-r1-dark1280-ss-minimalish.png). The sandbox cuts labels with a hyphen ("notifi-"), while lane F deliberately uses an ellipsis ("notific…") because a hyphen reads as a word break.
expected_fix: Draw overflow behind neighbouring chips' labels, or stop it at the chip above with a hatch cap. Use the lane's one-line names in SizingData's `breaks` (ellipsis cut).

### new
severity: nit
criterion: readable prose (user's Ch 4 human review 01)
location: hero standfirst; s-01 third paragraph
evidence: The standfirst says "This chapter traces that bill, a Pod that wouldn't start and a service that kept restarting back to two numbers…". The long list sits between "traces" and "back to", which makes a garden path. s-01: "Before the move, Fennel had given back the spare machines Sam used to keep and ran on four" can be misread as "Sam used to keep and ran on four".
expected_fix: Standfirst: "…traces three problems, a bill that went up, a Pod that wouldn't start and a service that kept restarting, back to two numbers each team wrote down…". s-01: "Before the move, Fennel had given back the spare machines Sam used to keep and was running on four, and the new bill was higher than any from those days."

### new
severity: nit
criterion: visual consistency and polish (check feedback)
location: `.cp-retry` in assets/page.css (the same rule is in Ch 4, so it's course-wide); every wrong-answer feedback, e.g. pux-r1-w1280-k03-wrongB.png, pux-r1-w360-k-08-commit.png
evidence: The inline TRY AGAIN button has min-height 44px, so it stretches its line box and leaves a visible gap in the middle of the feedback sentence ("each node here has only 1 / [gap] / GB free. TRY AGAIN").
expected_fix: Put the retry button on its own line after the feedback text (display block or inline-flex in its own paragraph), keeping the 44px target.

### new
severity: nit
criterion: visual consistency and polish (figures)
location: f-07 leak chart; f-06 at 360px
evidence: In f-07, the "orders per hour" label sits on the traffic band and the memory line in the leak chart (pux-r1-w1280-k-09-revealed.png, w360). In f-06 at 360, "SAM'S JOB" in the dashed Chapter 8 card crowds the card's right edge, and the tfoot note has no side padding (pux-r1-w360-f-06.png). The ReplicaSet "does" cell is tagged NEW IN CH 5 as a whole, although only "including for Pods that were evicted" is new.
expected_fix: Move the band label above the band or into the axis margin. Give the stacked-card header and tfoot the card's padding. Tag only the new clause (for example, wrap it in the tag's style) or move the tag after "…extras,".

### new
severity: nit
criterion: reading time (d-05: route over-length to the cut order; information only)
location: whole page
evidence: My estimate is about 30 minutes (28–32) against the brief's 26, with the gate at 26.6. The overruns are §02 (about 6 minutes against 4.0), §03 with the lane (about 6 against 4.0) and §04 (about 7 against 5.0). Details are in ## Reading time.
expected_fix: No builder action. For the user's human review: `cut-list.md` `## If it runs long`, items 1–7 in order (about −5 minutes). Prose is not to be compressed.
