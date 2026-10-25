# Pedagogy & UX review: round 1

## Summary
This is a strong chapter. The lane works as a lane: the scene is set first, the k-03 gate holds, scrolling back restores each step, and the inline fallback switches on at 360×800 and at 1280×500. f-03 and f-04 land m-10 and the Tuesday incident clearly, and the earlier chapters' promises are kept without bookkeeping lines. Two findings are blocking. First, the §02 heading "Addresses that don't stay put", which also appears in the contents rail above k-02, rules out both of k-02's distractors (P-01). Second, f-05 draws each Service as a hop that the request passes through, which redraws the "box in the middle" that §05 has just removed (P-02). The other issues: every key is the shortest option, three check prompts repeat the paragraph above them word for word, and "Like every loop, it only writes into the record" contradicts kube-proxy two paragraphs later. Estimated reading time is about 24–26 minutes, against a budget of about 20.

## Scores
- acceptance criteria: 4 — 13 of 14 met; ac-13 fails on the §02 heading (P-01); ac-11 is met to the letter, but f-05 conflicts with the plan's own visual grammar (P-02)
- cognitive load fit: 4 — the three-pass split (s-03 record, s-04 loop, s-05 rules) holds, with at most three new elements per pass; the reader faces two 03:04 Saturdays in §01 (P-06)
- engagement where intended: 5 — seven committed checks at the key ideas; k-03 sits mid-lane at the right transition; k-07 states its own question and hides its answer
- misconception handling: 4 — m-10 is stated fairly, shown to predict wrongly (k-04 → f-03), corrected, and its fair part kept; local-01 and local-02 are confronted in place; f-05 reintroduces m-10 in a drawing (P-02)
- split attention and redundancy: 3 — the k-02, k-05 and k-07 prompts repeat the paragraph or quote directly above them (P-04); figures are labelled directly and none needs a legend
- mobile UX: 4 — no overflow; full-width options are well over 44px; f-03 and f-05 re-lay out instead of scaling; at 360×800 the lane uses inline snapshots that read well; small nits only
- clarity of interaction: 5 — checks commit, then explain, then offer "Try again" and "What the other answers say"; lock plates say what unlocks them; the lane has no controls to misread
- visual consistency and polish: 4 — matches Ch 6's lane, check, gate and term-card treatments; no hard-coded colours or invented tokens in `site/assets/`; dark mode is intact for the lane and f-01 to f-06; f-05's hop boxes are the main inconsistency

Reading time (information, not a finding by itself): the gate measures 17.4 minutes of text. Adding about 4 minutes for the checks (six choice checks at about 0.5 each, and about 1 for k-07), about 2.5 for studying f-01 to f-06, and about 1 for reading the lane's canvas, my estimate is **about 24–26 minutes**. That matches the hero's "24 MIN" and the plan's 22–25, and runs about 4–6 minutes over the brief's ~20. If the user wants it shorter, the route is `cut-list.md` `## If it runs long`: cuts 1–6 save about 2.25 minutes without losing an objective. I don't recommend compressing the prose.

What I drove: 1280×900, 768×1024, 360×800 (inline-snapshot fallback) and 1280×500 (short viewport), in light and dark. At each check I committed a wrong option first: k-01 C, k-02 A, k-03 A, k-04 A, k-05 C, k-06 B. I revealed k-07 and opened all six disclosures. I scrolled the lane S1 → S2, tried S3 while it was locked, committed k-03, scrolled on to S3 and S4, then back to S1. The canvas `aria-label` and the active step restored each time. Probe screenshots: `run/screenshots/probe/pux-r1-*`.

Acceptance criteria:
- ac-01 met: cast strip and D1 come before k-01; Sam at 03:04 comes before "nobody passes on an address"; "has reached `orders` and `catalog` through every one of those changes"; the section ends on Jordan's question without the answer.
- ac-02 met in content (f-01 shows four sets, the copy fails from 14:03, the debrief says "usually"); the heading issue is P-01.
- ac-03 met.
- ac-04 met: Service after f-02, endpoints after the set-up, kube-proxy after f-03, load balancer and gateway each after a sentence saying what it is.
- ac-05 met: three set-up paragraphs say which release, what is new on the canvas, why only 05 and 06 are drawn, and what the endpoints loop is and where it runs, all before S1.
- ac-06 met: in S1–S4 the list holds exactly the READY Pods; struck entries appear only in the step they leave; the header reads `10.96.0.21` throughout; the calls line names every listed version; S3 and S4 are locked until k-03; scroll-back restores.
- ac-07 met in the lane.
- ac-08 met.
- ac-09 met.
- ac-10 met.
- ac-11 met to the letter (see P-02).
- ac-12 met.
- ac-13 **not met** (P-01).
- ac-14 met, with a nit on the implicit "rings one person" mapping.

Things checked that need no finding:
- The lane header "Thursday · catalog" is clear. The clock kicker and the §04 heading carry "10:15" and "from `storefront`'s side", and Ch 6's lane R used the same short name (CURRICULUM §3).
- The Service header (record `c4`), the READY PODS list (`surface-2`, dashed `c3`), the calls note and the Pod chips are distinguishable in both themes.
- The 360px narrow chips keep the service name.
- "connection refused" carries "in most clusters, by default" once in the prose and once in k-05's feedback, and doesn't get in the way.
- kube-proxy is introduced after f-03, and "Despite its name, calls don't pass through kube-proxy" is clear.
- The support-line aside comes after the mechanism and has its breaks line.
- The earlier promises are kept without bookkeeping lines: Ch 3's by-hand addresses in s-01; Ch 4's "another loop" and Ch 6's "only ready Pods" in s-04's "This is the loop that put `orders-q2rw` on the `orders` list at 03:10…"; Ch 6's bridge in s-01, k-02, f-01 and lane S4.
- The page loads `pool/…` and copies nothing from the kit into `site/assets/`.
- Locked lane steps reserve height exactly as Ch 6's do.
- k-01's thin length margin (77 vs 78 and 80) is technically within the rule; see P-03 for the pattern across all checks.

## Findings

### new
severity: blocking
criterion: ac-13 (no key echoed by a heading above it); the user's "no giveaways" standard (Ch 4, 5 and 6's blocking P-01)
location: s-02, `h2#addresses-that-dont-stay-put`, and its entry in the contents rail (`.d-rail`, which shows every heading from the top of the page) and in the mobile "Contents" list
evidence: The heading "Addresses that don't stay put" sits directly above k-02, and the rail shows it from the first screen. k-02 asks whether calls to addresses copied at 10:20 still work after the rollback to v63. Option A ("Yes … addresses and all") and option C ("Only some: Kubernetes gives a returning v63 Pod its old address back…") both claim that addresses come back, which the heading rules out. That leaves B, the only "No", so the check reduces to agreeing with the heading. The paragraph before the check adds to this ("Every Pod is given a network address of its own when it starts"), on top of k-01's feedback ("a new Pod doesn't inherit an address"). The builder's suspicion is right.
expected_fix: Retitle §02 with a neutral heading that names the scenario rather than the outcome. Options: "A list copied by hand", "Sam's way, one Thursday", or "What if someone kept the list?". The rail and the mobile contents pick it up automatically. Keep "One name that stays put" for §03, which comes after the reveal. Optionally move "The address belongs to the Pod, not to the node it runs on" into the debrief after f-01; "given a network address of its own when it starts" can stay, since it's prerequisite knowledge.

### new
severity: blocking
criterion: misconception handling (m-10, the chapter's own); visual grammar ("things different in kind look different"; plan ## Visual grammar: "an arrow through the Service would draw m-10")
location: s-07, f-05 (`#f-05 .rt__box.svc`, both blocks), at every width; screenshots `run/screenshots/probe/pux-r1-w1280-f-05.png`, `pux-r1-w360-f-05.png`
evidence: f-05 draws the request as one vertical chain of boxes joined by arrows: phone → cloud load balancer → gateway → `SERVICE · storefront · 10.96.0.12` → `storefront` Pod. The internal branch is drawn the same way: `calls orders` → `SERVICE · orders · 10.96.0.25` → `orders-q2rw`. Each Service is a box with one arrow in and one arrow out, in the same hop grammar as the load balancer and the gateway, which really are on the path. Two sections earlier, §05 told the reader "There is no box in the middle", and f-03 showed the call going from the caller's node's rules straight to the Pod. f-05 is the figure that reveals k-06, so a reader who has just been corrected sees m-10 drawn again. The plan's f-05 model specified this chain, so this is a conflict inside the plan, carried out faithfully, not a builder error. It still contradicts the plan's grammar and §05.
expected_fix: Keep every element and change only how the arrows run. Draw the main arrow gateway → `storefront` Pod, and the branch arrow `storefront` Pod → `orders-q2rw`. Set each Service block beside its arrow, not on it, joined to the arrow by a short dashed `c3` leader. Label the internal leader "via the `orders` Service's list (rules on `storefront`'s node)", and the gateway's "picks a Pod from the `storefront` Service's list". Leave the caption unchanged. At desktop, also move the `INSIDE THE CLUSTER · NO LOAD BALANCER` label from under the `orders-q2rw` chip to the top of the branch, as at 360px. Update the figure's `aria-label` to match ("…reaches a `storefront` Pod picked from its Service's list…"). Record the rule in the plan's ## Visual grammar for later chapters: a Service block is never a hop.

### new
severity: should
criterion: checks (no giveaways: "keys should never be the longest option", and a key shouldn't be identifiable by length either)
location: k-01 to k-06 (`.cp-check .cp-option`)
evidence: Measured option lengths in characters, key marked *:
- k-01: *77 / 78 / 80
- k-02: 103 / *76 / 104
- k-03: 79 / *56 / 81
- k-04: 80 / 79 / *70
- k-05: 83 / *70 / 84
- k-06: *64 / 69 / 69

In all six choice checks the key is the shortest option, and in k-02, k-03 and k-05 it is clearly shorter than both distractors. A test-wise reader learns "pick the short one" by k-03. That is the mirror image of the longest-option giveaway the course rule targets.
expected_fix: In at least three of the six checks, make the key the middle length or within a few characters of the longest, without making it the longest. Example rewrites:
- k-03 B: "Any of the Pods on the list by then, the two v62 Pods as well as the new v63 one." (~80)
- k-05 B: "The rules on `storefront`'s own node, because the `orders` list had no ready Pod on it." (~85)
- k-02: shorten A to "Yes: the rollback brought back the same v63 Pods, addresses and all." (~68)

Recheck the measurements afterwards.

### new
severity: should
criterion: split attention and redundancy (the user's readability reviews: no restating)
location: s-02 (paragraph before k-02 and k-02's prompt); s-06 (paragraph before k-05 and k-05's prompt); s-09 (the scene paragraph and Riley's quote, then k-07's prompt)
evidence: Three check prompts repeat, nearly word for word, the paragraph directly above them:
- s-02 ends "Suppose, then, that someone had done what Sam once did, and copied `catalog`'s three addresses into `storefront`'s settings … at 10:20, just after the morning release." k-02 then opens "Suppose someone had copied `catalog`'s three addresses into `storefront`'s settings at 10:20 on that Thursday, just after the morning release to v63."
- s-06 says `orders-q2rw` ran out of memory at about 12:40 and was restarted in place, and that `storefront`'s log shows `connection refused`. k-05's prompt says the same in the same order.
- s-09 gives the meeting, the partners and Riley's quote. k-07's prompt repeats all three.

The reader reads each scenario twice in a row.
expected_fix: Keep each prompt self-contained (the course rule) and cut the duplicate from the prose.
- s-02: end the paragraph after "…not to the node it runs on." Let k-02's prompt carry the "suppose" (it already names the time and v63).
- s-06: keep the paragraph's "Now back to Jordan's question. `orders` runs a single copy…" and the Chapter 5 gloss, but drop its last sentence about the log, which the prompt states.
- s-09: keep the scene and Riley's quote, and shorten the prompt to "Riley's team wants control over how partners get in. What would you ask Riley, and why? Think of your questions, then show the answer."

### new
severity: should
criterion: precise language; the plan's prose rule "Keep the pattern distinct from the implementation"; loop lens (§2.3)
location: s-04, the paragraph after the lens ("Like every loop, it only writes into the record."), against s-05's kube-proxy paragraphs and f-06's kube-proxy and node agent rows
evidence: s-04 says the endpoints loop, "like every loop, … only writes into the record". Two sections later kube-proxy, introduced as "a small loop", writes into "that node's own forwarding rules", not the record. f-06 already lists the node agent, which starts and restarts containers on its node. So the general claim is false for two of the eight rows in the table this page builds, and the reader who takes it as a rule meets the contradiction in §05. The handoff asks whether kube-proxy is placed clearly as a different kind of loop. The text gets close ("Like the node agent, it runs on every node, and each copy acts only on its own node, working from the record") but never says the difference outright.
expected_fix: Change s-04's sentence to say what this loop does, not every loop: "This loop only writes into the record: it changes the list, not where any call goes. How a call actually follows the list is the subject of §05." In s-05, after "Like the node agent, it runs on every node…", add one clause naming the difference: "…working from the record but writing nothing back to it: its output is its own node's rules."

### new
severity: should
criterion: cognitive load (terms and scenes grounded before use; the user's "name actors precisely" and "glossed for readers who jump ahead")
location: s-01, k-01's prompt and the paragraphs after it ("Think back to 03:04 on a Saturday in Chapter 3…" and "…including at 03:10 that Saturday in Chapter 4…"); s-03 ("Since 03:10 that Saturday in Chapter 4")
evidence: There are two different 03:04 Saturdays (CURRICULUM §3). Ch 3's machine 03 died before Kubernetes. Ch 4's "node 03 dies again" happened on Kubernetes. k-01 opens with "At 03:04 in Chapter 4, node 03 died". The next paragraph says "Think back to 03:04 on a Saturday in Chapter 3, before Fennel had Kubernetes. Machine 03 died…". The one after says "including at 03:10 that Saturday in Chapter 4". "That Saturday", right after the Chapter 3 Saturday, reads as the same day. A reader who skipped Ch 3–4, the reader D1 serves, will merge the two, and D1 doesn't mention Ch 4's 03:04 at all.
expected_fix: Name the second one explicitly the first time the prose meets it. In s-01: "…including at 03:10 on a second Saturday, in Chapter 4, when node 03 died again on Kubernetes and `orders-q2rw` replaced `orders-5c8x`…". In s-03, write "since 03:10 on that second Saturday (Chapter 4)". Add one clause to D1's first bullet: "…when node 03 died again one Saturday at 03:04, a loop replaced its `orders` Pod, `orders-5c8x`, with a new one, `orders-q2rw`, on node 04."

### new
severity: should
criterion: precise language (no ambiguous referents; the user's reviews)
location: s-06, end of the paragraph after f-04: "It also gives Jordan a question for the list."
evidence: By this point "the list" has meant the Service's list of ready Pods some twenty times, including twice in the same paragraph ("the other on the list"). Here it means Jordan's running list of questions for engineers, an unglossed callback. A reader will parse it first as the endpoints list.
expected_fix: "It also gives Jordan a question to take to the engineers." or "…a question for Jordan's list of questions to ask."

### new
severity: nit
criterion: precise language (no unexplained references)
location: s-04, second paragraph after the lane: "It is also the loop behind Chapter 6's answer about a `catalog` Pod that lost its database connection"
evidence: "Chapter 6's answer" refers to a check answer (Ch 6's k-05) that a reader is unlikely to recall as "an answer", and that a jump-ahead reader never saw.
expected_fix: "It is also the loop that, in Chapter 6, took a `catalog` Pod that had lost its database connection off the list while its readiness check failed, and put it back once the check passed."

### new
severity: nit
criterion: no meta lines about the course (user's Ch 5 review)
location: k-01, feedback for A: "…so something else had to make sure `storefront` found it. This chapter is about that something."
evidence: The last sentence is a line about the chapter rather than about the cluster.
expected_fix: End on the content: "…so something else had to make sure `storefront` found it, and nobody had to tell it."

### new
severity: nit
criterion: redundancy (wordiness that hurts clarity)
location: s-07, first sentence: "Every Service so far has an address that works only inside the cluster: by default, a Service can be reached only from inside it."
evidence: The sentence says the same thing twice across the colon.
expected_fix: "By default, a Service's address works only inside the cluster. That's all `storefront` needs to call `orders`. Customers' phones, though, are out on the internet."

### new
severity: nit
criterion: visual consistency (figure says what the prose claims)
location: s-06, f-04 right panel (`[data-cluster-figure="ready"]`); data.js `FIGURES.ready`
evidence: The caption and prose stress "the same Pod, at the same address". But the left panel shows no address, the chip reads only `orders ↻ 1` (never `orders-q2rw`), and the right panel's list shows `10.4.4.7` without a Pod name. "Same" is only checkable against f-02 and f-03, two sections back.
expected_fix: In `FIGURES.ready`, change the lens `DOES` line to "lists it again: 10.4.4.7, as before". Alternatively, change the right panel head to "Seconds later · Ready again · same address 10.4.4.7". Data-only change.

### new
severity: nit
criterion: visual consistency (narrow layout matches wide)
location: s-05, f-03 narrow SVG (`.f3c__svg--narrow`, 360px); screenshot `pux-r1-w360-f-03.png`
evidence: In the wide layout, dashed `c3` copy lines run from the record to both nodes' FORWARDING RULES bands. In the narrow layout only one line runs, into node 04's band. The rules the call actually uses, on node 01, have no visible source.
expected_fix: Add a second dashed `c3` line in the narrow SVG, from the record strip up the left edge to node 01's band, or end the label with "(node 01's too)".

### new
severity: nit
criterion: cognitive load (terms used before the thing they name, for jump-ahead readers)
location: s-04, set-up paragraph 2: "In the record panel, the drawing now shows the `catalog` Service."
evidence: "Record panel" is Ch 4–6 vocabulary. A jump-ahead reader knows "the record" only from D1, and the canvas labels the panel "The cluster's record · one Service".
expected_fix: "At the top of the drawing, in the panel for the cluster's record, it now shows the `catalog` Service."

### new
severity: nit
criterion: visual consistency (loop pills show who acts)
location: w-services-scrolly S2–S4 (`loops.active: ['ep']` in data.js)
evidence: In S2 to S4 the step text credits the Deployment loop with starting and stopping Pods, but its pill stays dimmed in every step and only the endpoints loop is shown acting. A reader matching pill to text sees the wrong actor for the Pod changes.
expected_fix: Set `active: ['deploy', 'ep']` in S2, S3 and S4, keeping the lens line about the endpoints loop. Alternatively, accept this and add "(the Deployment loop's moves are Chapter 6's)" to S2's text. Data-only change.

### new
severity: nit
criterion: ac-14 (explicit mapping)
location: s-05, `.cp-aside` ANALOGY paragraph
evidence: The aside maps number → name and address, and rota → list, but leaves "the phone system rings one person per call" → "one Pod per connection" implicit. That is the half of the mapping that matters for local-02.
expected_fix: Add to the last sentence: "…and a list of who can answer now; each call rings one of them, as each connection reaches one Pod."
