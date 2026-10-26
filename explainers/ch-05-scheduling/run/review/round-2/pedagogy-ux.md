# Pedagogy & UX review: round 2

## Summary
This is a closure round. Of the 19 round-1 P- findings, 16 are closed and 3 nits are still open: P-09, P-11 and P-13. The blocking P-01 is closed: I measured every check and no key is the longest option. Without §06 the page reads in order: §05 → §06 Tuesday → §07 eviction → §08 the conversation. Section, check and figure numbers are consecutive, and every cross-reference (§06, §07, "the sizing widget in §04") points to the right place. The redesigned sandbox meets ac-08 to ac-10 at 360, 768 and 1280, and nothing below it moves on desktop. I raise no new blocking finding. Below blocking, so not raised: with 9 nodes plus the spare, the sandbox draws NODE · 10 second; desktop leaves about 430px blank under the default state; the s-04 sentence "the bar under the widget's nodes" is wrong under 600px (see P-09).

## Scores
- acceptance criteria: 4. ac-01 to ac-21 are met. ac-09's "use as a solid fill" became a hatched fill under the user's H-29, which the user closed. The node-order glitch at 10 nodes is the only defect I saw.
- cognitive load fit: 4. F3 is still pre-trained by f-02, and the verdicts now say "free when checked", so F2 no longer shows two free amounts. The sandbox has 4 steppers and a switch, with controls on the left and the outcome on the right.
- engagement where intended: 4. k-04 is committed before the sandbox and can now be tried in it (`payments` stepper: 7 GB gives 4 + 1, 7.5 GB gives 5 + 1). The k-09 pointer reproduces from Fennel's requests (`orders` 5 → 3 + 1; 5.5 → 4 + 1).
- misconception handling: 4. m-07, m-08, m-26 and local-01 to local-03 are confronted as planned. k-05's distractors no longer depend on "moving Pods", so the caption no longer refutes them.
- split attention and redundancy: 4. The version caveat now appears once, the meta lines are gone, and widgets are named by position. Stranded room is still said in F3, in k-03's feedback and in two sentences after the lane, which is within the plan's limit.
- mobile UX: 4. No overflow at 360 in any of the 16 sandbox states. Controls come first and the count and bar sit right after them. Steppers, switch and Reset are 44px. The lane fallbacks work at 390 and 768.
- clarity of interaction: 4. Reset is in the header, and the live sentence names the change, count, reserved, used and warnings. The waiting chip in lane F still doesn't name `dispatch`.
- visual consistency and polish: 4. Both themes match the guide, and use and overflow have different hatches with an OVER tag and swatch. Highlight outlines still touch their text. The default desktop state has a large empty reserved area.

## Reading time
Measured body text without disclosures, figures and checks: 3,308 words, plus 443 words of lane step text. That is about 16.3 minutes at 230 wpm. Adding about 3.5 minutes for 8 checks with their feedback, about 2.5 for the sandbox and about 1.5 for the lane and figures gives **about 23–24 minutes**. The page says 25, the brief's budget is 26 (d-05), and the plan's Revision 1 estimate was 23–24.

## Acceptance criteria (evidence: probe screenshots `run/screenshots/probe/r2-pedagogy-ux-*`, and a sandbox state sweep at 1280, 768 and 360)
- ac-01 met: cast strip, then D1 (collapsed), then k-01, then the scene with `Pending`, `OOMKilled`, the bill and Morgan's and Ari's quotes.
- ac-02 met: "storefront's two units of room appear as its real memory request: 4 GB" (no arithmetic, per H-04). f-02, then the filter/score rule, then k-02, then the daily-peak quote, then "a Pod can use less than it reserved, or more, as long as its node has room to spare". The budget aside has its breaks line. The lens uses the §2.3 Revision 1 wording.
- ac-03 met: one sentence on placement rules. ac-04 met: the set-up paragraph opens "Since node 03 died".
- ac-05, ac-06, ac-07 met: probed at 390, 768 and 1280. k-03 locks F3–F5, and the reason string and caption are present.
- ac-08 met, from the state sweep: default 4 + 1, 38 of 65 GB, 19.5 GB used. Spare off gives 4. Right-sized (2.5 / 1.5) gives 3 + 1. At use gives 3 + 1 with "Processor, not memory, sets this count". `payments` 4 and 7 give 4 + 1, and 7.5 gives 5 + 1. `orders` 13.5 gives "NO COUNT: A POD FITS ON NO NODE" with `orders` named.
- ac-09 met: Reset in the header, controls on the left, outcome on the right, no stats block, rows read "used N GB at rush", labels on the chips' top border, the bar's three segments labelled, both simplifications in the caption. Use is hatched orange and overflow hatched amber, tagged OVER and named in the first warnings line with a matching swatch (r2-pedagogy-ux-w1280-ss-over.png; dark: r2-pedagogy-ux-dark1280-ss-over.png).
- ac-10 met: at 1280 and 768 the next element's top is the same in all 16 states (14326 / 16567 px). Under 600px the widget grows by design (d-07).
- ac-11 met: "provider" is glossed, and nodes are added by hand. The sandbox intro says "Like the scheduler … unlike the scheduler, it packs" and never "simulates". The bigger-than-any-node sentence is there, per-Pod billing takes two sentences, and Morgan's answer takes three.
- ac-12 met: §05 is one paragraph plus the quoted question, and losing a node is the reason.
- ac-14, ac-15, ac-16 met: limits are introduced plainly and TERM 03's back line no longer points at a figure. f-06 (now Fig. 05) has NEW IN CH 5 on part of a cell. k-09's model answer is verbatim.
- ac-17 met: option lengths in characters, * = key. k-01 99 / 96 / *88; k-02 107 / *96 / 115; k-03 *91 / 90 / 92; k-04 97 / 116 / *108; k-05 96 / *93 / 77; k-07 76 / 74 / *72; k-08 *81 / 78 / 84. No key is the longest. Keys are A (k-03, k-08), B (k-02, k-05) and C (k-01, k-04, k-07).
- ac-18 to ac-21 met: a grep finds no guarded terms. Widget and figure IDs appear only in header bars and caption labels. "Since 03:04, when node 03 died" is the wording the user asked for in H-02.

## Findings

### P-01
severity: blocking
criterion: ac-17 (no giveaways: the right option is never the longest)
location: s-04 k-04, k-05; s-06 k-06 (cut); s-07 k-07; s-08 k-08
evidence: Measured in index.html (characters, * = key): k-04 97 / 116 / *108; k-05 96 / *93 / 77; k-07 76 / 74 / *72; k-08 *81 / 78 / 84. k-06 was cut with §06 (d-12). A reader who always picks the longest option now scores 0 of 7 choice checks (the longest is never the key). k-04's key got longer for H-22 ("potentially"), but B grew to 116 for H-21, so the key is still not the longest.
expected_fix: none
status: closed

### P-02
severity: should
criterion: ac-17 (no option answered by a nearby caption or card) / misconception confrontation (m-08, local-01)
location: s-04 k-05 with the W-02 caption; s-02 k-02 with TERM 01
evidence: k-05 A now reads "After a while it notices the two idle nodes and stops renting them, since fewer nodes cost less." (m-08), and C reads "Starts new copies on 05 and 06 so that every node ends up about equally busy." Neither depends on moving running Pods, so the caption's "a real cluster never moves running Pods" no longer rules them out. TERM 01 now reads "…written in its manifest; the scheduler places Pods by them." It no longer says "never by what they use", so k-02 is a prediction again.
expected_fix: none
status: closed

### P-03
severity: should
criterion: engagement where intended (sandbox serves the conversation) / ac-16
location: s-09 (now §08) k-09 reveal; w-sizing-sandbox
evidence: The pointer now reads "(in the sizing widget in §04, from Fennel's requests, try `orders` at 5 GB and then at 5.5 GB)". State sweep from defaults: `orders` 5 gives "3 NODES FOR THE PODS + 1 SPARE", and 5.5 gives "4 NODES FOR THE PODS + 1 SPARE". Adding the `payments` stepper didn't change the defaults, so the step still reproduces.
expected_fix: none
status: closed

### P-04
severity: should
criterion: precise language (no double counting)
location: s-04, Morgan's answer
evidence: "Fennel rents five nodes because the teams' padded requests filled three nodes on paper while the services used far less, so Ari's team rented two more. One of those, node 06, has sat nearly empty since, a node's worth of spare room…" Node 06 is now part of the first cause, not a second one. The system-room clause was cut for H-34.
expected_fix: none
status: closed

### P-05
severity: should
criterion: no meta lines about the course
location: s-01 last paragraph; s-02 before f-02; s-05; recap line 3
evidence: s-01: "Ari's answer starts with the loop that picked node 04 for `orders` after node 03 died…". s-02 has no "Chapter 3 promised". §05 opens "Nodes go down, as node 03 did in Chapter 4." The recap reads "nothing in Fennel's cluster makes room by itself". No course bookkeeping is left.
expected_fix: none
status: closed

### P-06
severity: should
criterion: ground before you use (§2.11 "I didn't read the last chapter")
location: s-01 D1; s-02 storefront paragraph; F1 step text
evidence: D1 now says "When Ari applied Fennel's manifests to the new cluster, its services were placed on the cluster's four nodes, 01 to 04. Ari applied storefront's manifest last, and Kubernetes put its three Pods on three different nodes." It also covers the Wednesday `notifications` crash loop. "Moving day" no longer appears anywhere: s-02 says "when Ari applied storefront's manifest to the new cluster", and F1 drops the clause (H-09, H-13).
expected_fix: none
status: closed

### P-07
severity: should
criterion: k-08 feedback consistent with W-02
location: s-08 (now §07) k-08 option A feedback
evidence: "…at the rush orders would use far more than it reserved (5.5 GB against 3), and storefront and dispatch would sit right at their reservations… (Set the sizing widget in §04 to half the requests to see the warning.)" State sweep at 2 / 3 / 1 / 1: the live sentence reads "Over its reservation: orders.", which is one warning, as the feedback says.
expected_fix: none
status: closed

### P-08
severity: should
criterion: split attention and redundancy (pedantic caveats)
location: s-03 F3 step text, W-01 caption, paragraph after TERM 02
evidence: F3 ends "…records why, in a line in the format engineers see." The paragraph after TERM 02 ends "…which is in the format engineers see." Only the W-01 caption keeps "its exact wording varies between Kubernetes versions".
expected_fix: none
status: closed

### P-09
severity: nit
criterion: split attention (labels match the prose that points at them)
location: s-04 paragraph after the bin-packing paragraph ("The bar under the widget's nodes splits the room nobody uses…"); `.ssw__idle`
evidence: The original mismatch is fixed. The switch is quoted by its printed label ("the "Keep room to lose a node" switch in the widget above", §05), and "idle bar" is gone. The H-31 rewrite now points to the bar by position, "the bar under the widget's nodes". Under 600px the widget puts the bar above the nodes (count → room bar → nodes, r2-pedagogy-ux-w360-ss-default.png), so on a phone the reader looks under the nodes and finds no bar.
expected_fix: Name the bar without a position: "The widget's room bar splits…", or quote its head: "The widget's "Room for Pods on the rented nodes" bar splits…".
status: still-open

### P-10
severity: nit
criterion: engagement where intended (k-04 → sandbox hand-off); sandbox prompts
location: s-04 k-04 key feedback; third thing to try
evidence: `payments` is now adjustable (H-25). k-04's key feedback ends "the following widget lets you try it", and the second thing to try is "Double payments' request, as in the question above. Does the count change? How far can it go before it costs a node?" The probe confirms it: 4 → 4 + 1, 7 → 4 + 1, 7.5 → 5 + 1. The third prompt is a question: "Push orders past 13 GB. What happens?"
expected_fix: none
status: closed

### P-11
severity: nit
criterion: clarity of interaction (lane chips)
location: w-friday-scrolly F3, F4 (pool `renderCluster` waiting chip)
evidence: At 768 and 1280 the waiting chip in the "WAITING · NO ROOM" strip still reads only "WAITING" and never names `dispatch` (r2-pedagogy-ux-w768-lane-F3.png, r2-pedagogy-ux-w1280-lane-F3.png). Report 09 left it to a pool change, which hasn't been made. The record row ("dispatch … 5 RUNNING · 1 WAITING") still carries the service.
expected_fix: As in round 1, label waiting chips with the service name in the pool renderer (the strip header already carries the status). This is a pool change, so check that Ch 4, 6 and 7 still render unchanged.
status: still-open

### P-12
severity: nit
criterion: cognitive load fit (one moment per frame)
location: w-friday-scrolly F2 at 600–899px
evidence: The wide verdicts now read "3 GB · 1.15 CORES / FREE WHEN CHECKED" (STRINGS.verdict.free). The amount is labelled as the moment of the check, so it no longer contradicts the drawn 1 GB box. At 768, F3's verdicts read "1 GB · 0.9 CORES FREE WHEN CHECKED" (r2-pedagogy-ux-w768-lane-F3.png), which is also true.
expected_fix: none
status: closed

### P-13
severity: nit
criterion: visual consistency and polish (highlight outlines)
location: pool/cluster/cluster.css `.wc .wc-wait.is-hl`, `.wc .wc-n__verdict.is-hl` (both `outline-offset: 0`)
evidence: Unchanged; report 09 left it for the pool. At 768 "WAITING · NO ROOM" starts on the strip's left outline, and "NO MEMORY · NO PROCESSOR" fills its verdict box edge to edge (r2-pedagogy-ux-w768-lane-F3.png). At 1280 "WAITING · NO ROOM" sits on the outline (r2-pedagogy-ux-w1280-lane-F3.png).
expected_fix: In pool/cluster/cluster.css, give the highlighted waiting strip and verdict boxes about 4px of inner padding (or a positive outline-offset with the room reserved). Re-gate the chapters that use the pool.
status: still-open

### P-14
severity: nit
criterion: ac-09 (idle bar labelled on the bar) / style guide (no legends for ≤ 4 series)
location: w-sizing-sandbox `.ssw__ilabels`
evidence: The three labels sit under their own segments with ticks at 1280, 768 and 360, in default, over and inflated states. The stacked swatch legend never appeared in the sweep. The over part is labelled on the bar ("OVER" tag where it fits) and in the warnings line with a swatch (r2-pedagogy-ux-w1280-ss-over.png, r2-pedagogy-ux-w1280-ss-inflated.png).
expected_fix: none
status: closed

### P-15
severity: nit
criterion: visual consistency and polish (sandbox drawing)
location: w-sizing-sandbox chips at low requests; chip name cuts
evidence: In the over state (storefront 1, orders 3), the overflow hatch on node 2 sits under `notificat…`'s name tab without crossing it (r2-pedagogy-ux-w1280-ss-over.png). Names are cut with an ellipsis ("notificat…", "notific…"), as in the lane. Chips too short to name are listed under the drawing ("Too short to name on the drawing: storefront (3 × 1 GB)").
expected_fix: none
status: closed

### P-16
severity: nit
criterion: readable prose
location: hero standfirst; s-01 third paragraph
evidence: The standfirst was rewritten for H-01: "…That same month, a Pod wouldn't start and a service kept restarting. This chapter traces all three problems back to the same two numbers, which each team wrote down for every service…". The garden path is gone. s-01: "…given back the spare machines Sam used to keep and was running on four…".
expected_fix: none
status: closed

### P-17
severity: nit
criterion: visual consistency and polish (check feedback)
location: `.cp-retry`
evidence: TRY AGAIN now sits on its own line under the feedback paragraph, and the sentence has no gap (r2-pedagogy-ux-w360-k08-wrong.png, r2-pedagogy-ux-w768-k03-wrong.png).
expected_fix: none
status: closed

### P-18
severity: nit
criterion: visual consistency and polish (figures)
location: f-07 (now Fig. 06); f-06 (now Fig. 05) at 360
evidence: Fig. 06's "orders per hour" key now sits under the day ticks, off the band and the line (r2-pedagogy-ux-w1280-k09-reveal.png). Fig. 05 at 360: "SAM'S JOB" no longer crowds the card edge, the footnote has side padding, and NEW IN CH 5 tags only "including for Pods that were evicted" (r2-pedagogy-ux-w360-fig05.png).
expected_fix: none
status: closed

### P-19
severity: nit
criterion: reading time (d-05; information only)
location: whole page
evidence: I now estimate about 23–24 minutes (see ## Reading time), against the brief's 26, down from about 30 in round 1. Revision 1's cuts (§06, the Morgan's-answer details, the §05 rebuild) did the work, and no prose was compressed.
expected_fix: none
status: closed
