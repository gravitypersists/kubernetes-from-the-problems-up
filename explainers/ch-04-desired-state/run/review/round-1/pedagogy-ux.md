# Pedagogy & UX review: round 1

## Summary
The chapter teaches. Both lanes work: the gates hold, scrolling back restores each state, and lane B adds one new thing per step on an honest clock. Every owned misconception is stated, shown to fail and corrected, and Ch 1's question gets its "minutes, and nobody" answer. Dark mode is intact and `tokens.css` is an exact copy of the style guide. Four things need work. (1) Several checks give their answer away: k-02's option repeats Fig. 01's caption, and in 5 of 8 checks the right option is the longest. (2) The cluster's record, the chapter's central object, is never introduced cleanly. (3) The loop lens is used but never named. (4) On 360×740 and 390×844 phones, lane B loses its sticky canvas. Estimated reading time is about 23 minutes, against a 20-minute budget.

## Scores
- acceptance criteria: 3 — 15 of 17 met; ac-15 (no giveaways) unmet, ac-16 (precise language) has slips
- cognitive load fit: 4 — lane A pre-trains the three loops, so lane B adds one element per step; but the record panel appears at A1 before any prose says what it is
- engagement where intended: 5 — k-03 and k-04 are committed predictions that gate their lanes; k-06 and k-08 predict; k-09 is a real think-then-reveal
- misconception handling: 5 — m-04, m-03, m-06, m-05, m-27 and local-01 are each stated fairly, shown to fail and corrected (k-03 A, k-05 A, k-06 B, k-08 B, k-04 C, k-04 B)
- split attention and redundancy: 3 — Fig. 01's takeaway is said three times (caption, paragraph, analogy); §08 states the scene and Ari's line twice each; a Pod is drawn three different ways
- mobile UX: 3 — no overflow, tap targets ≥ 44px, text ≥ 13px; but on the two commonest phone sizes the lanes fall back to inline snapshots, and lane A and lane B behave differently on one screen size
- clarity of interaction: 4 — locked steps say "Answer the question above to see what happens"; options, TRY AGAIN and the reveal are obvious; the canvas has no controls, as planned
- visual consistency and polish: 4 — tokens exact, no hard-coded colours, dark mode intact, Ch 3's grammar carried over; small canvas slips (a "NOT YET" chip with no service name, loop pills that vanish at B6, the lens outline drawn over its text)

## Acceptance criteria
- ac-01 met: cast strip (Sam, Jordan, Ari), then D1 collapsed, then k-01 before "node". The scene gives no recovery time. Ari's line is a `.cp-quote`.
- ac-02 met: f-01 has a dashed numbered list next to the goal in record colours, each with its direct label. k-02 comes before the terms. TERM 01 has the declarative/imperative line. The breaks line covers judgement, waiting, restarting forever and acting only on the latest goal.
- ac-03 met: f-02 has the accent annotation on `replicas: 3`, says it is shortened, and its caption names the Deployment (Ch 6). The version-control sentence is present. (The Ch 3 callback line has a precision problem; see the second finding.)
- ac-04 met: probe at 1280, 768, 390 and 360. A2–A5 stay locked until k-03 is committed, and A2 adds only the record row (SHORT 3). A3, A4 and A5 each light one actor with its lens line and highlight its effect. Pods are dashed NOT STARTED at A4 and RUNNING at A5. A5's text has "No part handed another a plan … release or not".
- ac-05 met: B1 shows node 03 DOWN with LOST Pods while the record still reads 1 RUNNING / 3 RUNNING, plus CUSTOMERS "can't place orders". k-04 locks B2–B6. B2 (~03:04:50, "50 seconds … by default") through B6 ("can order", Ch 7 connection note) all match the plan, and no recovery is called "instant" or "immediately".
- ac-06 met: record, f-01 goal and f-02 ground use `c4`; loops are `c3` pills with ↻; NOT STARTED Pods are dashed with no fill. Every status has a word, there are no arrows on the canvas, and the marks are computed (data.js header).
- ac-07 met as written (the fallback is decided by measurement), but the plan's size target (≤ 360px at 360) is missed. See the mobile finding.
- ac-08 met (data.js header documents the format, including the later-chapter fields).
- ac-09 met: s-05 payoff, the single point of failure, "Which of our services run as a single copy?"; D3 and D4 present.
- ac-10 met: f-04 is built from `CH04_LOOPS` and has a dashed Ch 7 row. k-05 comes before the conductor paragraphs. The quotes are present, and the orchestrator point is framed as "what gets done" vs. "how it gets done", not as a contradiction. D5 present.
- ac-11 met: four `.cp-term` cards (01–04 / 04), and only TERM 03 is the payoff variant. Each card's term is a `dfn` with `aria-describedby`. The helmsman aside has its breaks line and no cybernetics.
- ac-12 met: k-06 is binary, then `orders-5c8x` → `orders-q2rw`, the twelve-factor list with the 30 s default, a fair statement of self-healing, and the three limits each pointing to a chapter. "pending" never appears.
- ac-13 met: f-05 has no loop-to-loop connectors and the three ownership labels sit on the drawing. No provider or price appears in the main text.
- ac-14 met: k-08's key is A and its feedback gives 10 s doubling to 5 min and about 15 restarts. `CrashLoopBackOff` appears once. k-09's model answer is the curriculum's wording. The recap has four lines and the bridge goes to Morgan's bill.
- **ac-15 not met:** k-02's right option repeats Fig. 01's caption, and the right option is the longest in k-02, k-03, k-05, k-06 and k-07. See the first finding.
- **ac-16 partly met:** the guard words and timing hedges are clean and Pods never move, but there is an ambiguous "It" in TERM 02, the manifest is equated with the record, and "the lens's three blanks" points at nothing. See the findings.
- ac-17 met: D1–D7 all present and collapsed, and the main text reads without them.

## Reading time
The gate's count is 18.2 minutes, for words only. The body, check options and lane step text come to about 3,900 words (disclosures, feedback and sources left out): about 16–17 minutes of reading. On top of that: 9 checks with their feedback (about 3–4 min), 11 lane steps to look at (about 2.5 min) and 5 figures (about 1.5 min). **My estimate is about 23 minutes (range 22–25) against the 20-minute budget (d-01).** Earlier chapters ran over their plans by a similar amount. Per d-01, this goes to the plan's cut order (`cut-list.md` items 1–4 recover about 1.5 min, items 1–8 about 3), not to trimming prose. It is the user's call.

## Findings

### new
severity: blocking
criterion: ac-15 (no giveaways; options similar in length and equally measured); user standard "checks without 'pick the measured option' giveaways"
location: s-02 f-01 caption + k-02 option C; k-03 option C; k-05 option B; k-07 option C (also k-06 A)
evidence: (a) Fig. 01's caption, directly above k-02, reads "The goal names no machines, so it holds whichever one fails." k-02's right option C reads "Fennel's goal: it names no machines, only what should be running, so it holds whichever machine dies." The reader can match the words instead of reasoning about node 04. (b) Measured option lengths in characters, right answer starred: k-02 A94 B87 *C102; k-03 A59 B74 *C96; k-05 A101 *B134 C95; k-06 *A125 B107; k-07 A104 B72 *C130. The right answer is the longest in 5 of 8 choice checks, and by a wide margin in k-03 (1.6× the shortest), k-05 and k-07. k-03's C and k-07's C are also the only options with a hedge or a second clause ("and nothing else yet"; "and making sure each service survives being replaced").
expected_fix: (1) Cut the takeaway from Fig. 01's caption until after k-02. Make the caption a condition, e.g. "Fig. 01. The same night, written two ways: both were written after machine 03 died." Move "the goal names no machines, so it holds whichever one fails" into k-02's feedback or the paragraph after TERM 01. (2) Even out the lengths so the right answer is not reliably the longest. Shorten k-03 C ("Only a line in the cluster's record: three `storefront` copies wanted."). Give k-03 A a reason, as k-03 B already has one. Trim k-05 B's first sentence. Cut k-07 C's second clause, which is already in its feedback ("Deciding what goes in the record, such as how many copies of `orders` to run."). Lengthen k-07 B to match ("Running the scheduler and the loops that replace Pods when a node dies, since those did Fennel's 3 a.m. work."). Keep the keys as they are.

### new
severity: should
criterion: ac-16 (precise language: don't equate two things in one breath); cognitive load (a term used before the thing it names); o-1 / o-4
location: s-02 last paragraph ("With Kubernetes, a written goal like Fig. 02 is that record."); w-cluster-scrolly A1 (canvas panel "THE CLUSTER'S RECORD · API SERVER"; A1 step text; k-03 option C)
evidence: The record (what's wanted plus what's reported, held behind the API server) is the chapter's central object, but no prose introduces it. s-02 ends by saying the manifest file *is* the record ("a written goal like Fig. 02 is that record"). Then the canvas opens at A1 on a panel labelled "THE CLUSTER'S RECORD · API SERVER" with RUNNING counts in it, and A1's text never mentions the panel. k-03 option C then asks about "a line in the cluster's record". Only A2 says what the API server and the record are ("the front door to the record … wrote it down"). So the reader meets the record three ways (as the manifest file, as an unexplained panel, then as the API server's store) before it is explained. The plan's own rule says to keep the manifest (the file) apart from the record (what's wanted and reported, in the cluster). Mixing them up weakens m-04 ("applying records an intention in the cluster") and o-4 ("the API server as the record of intent").
expected_fix: Change s-02's last line so it doesn't equate the file with the record, and so it doesn't give away k-03. For example: "With Kubernetes, it is: the cluster keeps its own record of what's wanted and what's running, and every part of Kubernetes works from that record." Give A1's step text one clause naming the panel. For example, after "Moving day.": "Kubernetes keeps one record of what Fennel wants and what's running, drawn at the top; `orders`, `payments` and `dispatch` are already in it." No arrow and no "see the label"; the panel's own header carries the name.

### new
severity: should
criterion: CURRICULUM §2.3 (the loop lens, named once and reused everywhere); handoff ask "does the loop lens arrive as a reusable tool"; ac-16 (no referent the reader has to guess)
location: s-04 paragraph after TERM 03 ("Those three blanks are a question…"); s-05 lead to f-04 ("Fig. 04 puts the loops you've watched into the lens's three blanks"); s-08 bridge
evidence: The words "loop lens" never appear in reader-visible text (grep of index.html and data.js: "lens" appears only in comments, a class name and §05's "the lens's three blanks"). §05 says "the lens's three blanks", but nothing called "the lens" has been introduced. "Those three blanks" in §04 points at the card's mono line "which loop · watching what · doing what", which has no blanks drawn. Every later chapter is meant to say "the loop lens" (CURRICULUM §2.3, plan R12), so the name has to land here. The bridge says "From here on, every chapter asks the same three things", which is a meta line about the course (the kind the user flagged in Ch 3) where the tool's name should be.
expected_fix: Name it once in §04, e.g. "Call those three questions the loop lens: which loop, watching what, doing what? You can ask them whenever Kubernetes does something. Each step of moving day answered them…" Then "the lens's three blanks" in §05 has its referent; better still, write "puts the loops you've watched through the loop lens". Rephrase the bridge without the course meta, e.g. "Whenever Kubernetes does something from here on, the loop lens is the first question to ask: which loop, watching what, doing what?" Optionally add "the loop lens" to TERM 03's mono line ("the loop lens: which loop · watching what · doing what").

### new
severity: should
criterion: mobile UX (controls and effect visible together; consistent behaviour); plan s-04/s-05 layout contiguity "sticky"; CURRICULUM §8 step 6
location: w-cluster-scrolly at 360×740 and 390×844 (screenshots probe/rev-w360x740-B5.png, rev-w390x844-A3.png vs rev-w390x844-B2.png)
evidence: Measured canvas heights (both checks committed): at 360×740, lane A 405px and lane B 432px, so both fall back to inline snapshots (canvas display:none; 5 and 6 snaps shown). At 390×844 (the commonest phone viewport), lane A stays sticky at 406px but lane B falls back (432 > 422 = 50vh). The reader sees a sticky canvas in §04 and then a stack of separate pictures in §05, at the chapter's hardest moment. Both lanes are sticky only from about 414×896 up. At 600×900 both fall back again (460 / 525 > 450). The plan's target was ≤ 360px at 360 wide, with the fallback for short viewports (<560px tall), not for mainstream phones. In fallback each lane-B step is a 432px snapshot plus its text, so the reader has to compare stacked pictures instead of watching one drawing change in place.
expected_fix: Shrink the narrow-width canvas until lane B fits in 50vh at 360×740 (≤ 370px) and 390×844 (≤ 422px). That means saving about 60px at 360. Options: under 600px, merge the active loop's pill into the lens block (one line `↻ node loop` above WATCHING/DOING) instead of a separate pill row (about 28px); cut the empty grid band under the notes (visible under CUSTOMERS in rev-w390x844-B2.png); drop the node body unit from 22px to 20px. If lane B still can't fit, make the fit decision per page rather than per lane, so both lanes use the same mode on a given screen.

### new
severity: should
criterion: ac-16 (no unreferenced "it"); user standard (no ambiguous pronouns, Ch 2 review)
location: s-03 TERM 02 card, `.cp-term__def`
evidence: "The wrapper Kubernetes puts around one container, or a few that must run together. It counts, places and replaces Pods." The subject of the first sentence is "The wrapper", so "It" reads as "the wrapper counts, places and replaces Pods". This is the ambiguous pronoun the user flagged in Ch 2 ("its own view…").
expected_fix: "…or a few that must run together. Kubernetes counts, places and replaces Pods, not containers."

### new
severity: should
criterion: visual consistency (one grammar per kind; user's Ch 3 review "things different in kind drawn differently"); split attention
location: s-03 f-03 vs. w-cluster-scrolly chips vs. s-07 f-05 `.cl__pod`
evidence: A Pod is drawn three ways. In f-03 it is an ink frame with a mono header bar ("POD · 1 ADDRESS") and a body holding chips, the same look as the canvas's node frames ("NODE · 01" bar plus body), so f-03's Pod looks like a machine. On the canvas a Pod is a container chip with a thin inset ring (the plan's Pod grammar), and nothing links that ring to f-03. In f-05 Pods are small chip squares. The plan said "The Pod frame is how Pods look on the canvas", but the built canvas doesn't use it, so the f-03 drawing doesn't carry into the lanes where Pods matter.
expected_fix: Draw f-03's Pods in the canvas's grammar: a large chip with the inset ring, with the `1 ADDRESS` tag and the labels beside it, and the helper case as two chips inside one ring. Keep the bar-and-body frame for nodes only. f-05's small squares can stay, but give them the ring too.

### new
severity: nit
criterion: redundancy (prose restating what's on screen)
location: s-08: scene paragraph vs. k-08 prompt; "Ari mentions it to Jordan." + blockquote vs. k-09 prompt
evidence: The scene ends "every time its container starts, it crashes within seconds", and k-08's prompt repeats "Every time a `notifications` container starts, it crashes within seconds, because a setting it needs is missing." Ari's line appears as a blockquote, and then again word for word in k-09's prompt ("Ari says: '…'") a few lines below.
expected_fix: Keep the prompts self-contained, since the user wants think-then-reveal prompts to state their own question. Cut the duplicates outside them: end the scene at "a setting it needs goes missing", and drop the blockquote and "Ari mentions it to Jordan." (or keep the blockquote and start k-09 with "What would you ask Ari?" while the prompt still quotes the line).

### new
severity: nit
criterion: redundancy
location: s-02: f-01 caption, the paragraph after TERM 01, and the analogy's first sentence
evidence: "The task list is right only for the night its author pictured" (caption), "A task list written for another night is simply wrong" (paragraph), and "A task list … works until reality differs from what you pictured" (analogy) make the same point three times within one screen at 1280.
expected_fix: Once the first finding moves the takeaway out of the caption, keep it once, in the paragraph after TERM 01, and let the analogy start from the owner ("You know this from managing people: a goal handed to a good owner…").

### new
severity: nit
criterion: mobile UX (honest phone heights); cognitive load at a consolidation moment
location: s-05 f-04 under 600px (probe/rev-w360-f04.png)
evidence: At 360 the f-04 plate is 1364px tall (the plan estimated about 640). Five stacked cards each carry three labelled blocks (WATCHING / DOING / SAM'S JOB) on separate lines, so the table takes two full screens and the reader can't see two loops side by side.
expected_fix: Tighten the phone cards: put Sam's job in the card header next to the pill (`↻ scheduler · placing`), and put the WATCHING and DOING labels inline with their text instead of on their own lines. Target about 800–900px at 360.

### new
severity: nit
criterion: visual consistency and polish (status word plus colour, consistent statuses; labels on the referent)
location: w-cluster-scrolly B5 (node 02's new `dispatch` Pod), B6 at ≥ 900px, lens block at every acting step
evidence: (a) At B5 the new `dispatch` Pod on node 02 reads "NOT YET" with no service name (a size-1 chip shows its status in place of its label), and NOT YET isn't one of the grammar's status words (NOT STARTED). (b) At B6 on desktop the ReplicaSet loop, scheduler and node loop pills disappear and only "↻ agents · 04, 02" shows, because four pills don't fit one row. At the end of the lane the reader loses sight of the loops they just watched. (c) The 3px step-highlight outline on the lens block sits on the first letter of "WATCHING" (rev-w1280x900-A3.png, rev-w768x1024-B3.png).
expected_fix: (a) Show "dispatch" on the chip and move the status to the lamp plus a short word that fits, or widen the chip label rule so a size-1 NOT STARTED chip keeps its service name. If a short form is needed, use the same short word everywhere it appears. (b) Draw the three loop pills dimmed with the agents pill on a second row, or shorten the agents pill to "↻ agents" (the lens names the nodes). (c) Pad the lens block by sp-half inside the highlight outline.

### new
severity: nit
criterion: ac-16 (precise language)
location: D2 body; k-04 option C; k-01 option B feedback; A5 lens line
evidence: (a) D2: "There's no queue of orders to fall behind on". In this chapter `orders` is a service, so "orders" for instructions misleads. (b) k-04 C: "the count of `orders` Pods was met when Ari applied it". In lane A, Ari applied `storefront`'s manifest, not `orders`'s, so "it" has no right referent. (c) k-01 B feedback: "Those are the two jobs Kubernetes did at 03:04 this year". This shows before the page has said that 03:04 happened again in Year 3 (the scene comes after k-01). (d) A5 lens: "WATCHING · Pods assigned to its node" next to the plural "↻ agents · 01, 02" pill.
expected_fix: (a) "There's no queue of instructions to fall behind on." (b) "Not until someone applies `orders`' manifest again: its count of one Pod was met when it was first applied." (c) "Those are the two jobs this chapter's 03:04 will need." (d) "Pods assigned to each one's node".
