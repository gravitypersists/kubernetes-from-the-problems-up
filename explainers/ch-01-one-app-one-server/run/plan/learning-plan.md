# Learning plan: One app, one server (Ch 1, Kubernetes for Technical Managers)

<!-- Written by the instructional designer. Parsed by scripts/check_plan.py. -->

## Shape

A narrative article that follows Fennel's story, built around **one hands-on widget**, plus three static figures and nine short checks. The chapter's core idea is a discovery: the code isn't the whole app, and the notes aren't the whole server. A manager believes that only once they've rebuilt the server themselves and watched it fail, so the widget (`w-rebuild`: predict what's on Sam's server, rebuild it from Sam's notes, run launch checks, diagnose the failures, compare the two machines) carries o-1 and sets up o-2. The prose around it does what prose does well: the outage story (pain seen in meetings), naming things after the reader has met them, the management analogies, and the business consequences. o-3 is a pair of misconceptions ("bigger server", "VMs fix it"), so it gets predict-then-reveal checks followed by a figure, not a second widget.

Rejected alternatives:
- **Full-page explorable** (a server sandbox the reader pokes at freely). A sandbox suits system dynamics, but this lesson is one specific gap discovery. Goal-free exploration would let the reader miss the gaps entirely, and it doesn't fit 12 minutes.
- **Plain article** (describe the rebuild). Reading "the notes missed three things" feeds the illusion of understanding. CURRICULUM §2.1 asks for pain felt in the page, and the rebuild is where the reader feels it.
- **Scrollytelling with a sticky server canvas** across the whole page. It would hold the machine in view for s-02 to s-06, but only s-03 needs a live canvas. The other segments are short, and sticky canvases cost mobile usability (landscape traps).

toc: yes. Seven h2 sections and a 12-minute read, so a rail on desktop and a collapsed "Contents" on mobile help readers re-find the widget and the checks. It also matches the course pattern (§ numerals as section addresses).
tokens: user-provided: Control Plane style guide, `design/control-plane/` (copy `control-plane.css` to `site/assets/tokens.css`; follow README.md, tokens.json notes and `components/bundle.css`).
mobile: supported. All figures re-layout vertically under 600px. The widget uses a row-table layout (item label plus narrow status columns) that fits at 360px without shrinking text, and on phones it shows Sam's notes one step at a time, directly above the machine rows. See the w-rebuild `size:` field.

**Course voice (from the style guide):** second person, present tense, sentence-case headings, no exclamation marks, no emoji. Status always travels as a word plus colour (PRESENT, MISSING, UNKNOWN, PASS, FAIL).

**Interpretation of "plant the seed of 'the code is the app'."** I read it as: surface the belief, show it predicting wrongly (same code, broken features), and leave the *remedy* (packaging the app with what it needs) unresolved for Ch 2. The page ends on the open question "if the app is the code plus everything on the machine, how do you ship all of it?". Ch 1 doesn't answer it. See Curriculum recommendations R1.

**Story conventions this plan assumes** (flagged for the checkpoint, R5): Year 0 Fennel is two founders, Jordan and Morgan, plus Sam. Jordan is the non-infrastructure co-founder (the reader's stand-in, later the engineering manager). Morgan handles money. The single app is called "the Fennel app"; `storefront` isn't named until the split in Ch 3.

**Fiction vs. sourced.** The outage timeline, the times, the photo tool's install date, the email key and the log-cleanup job are Fennel fiction, plausible and illustrative. The page must never present them as statistics. The mechanisms behind them are sourced: a full disk stops the database recording orders (c-03), machine-installed tools (c-01), config outside the code (c-02), and unrecorded changes (c-06, c-07). Three bits of general knowledge aren't in facts.md: what a *process* is, what a *deploy* is, and that servers run *scheduled jobs*. They're flagged under concerns for the accuracy reviewer.

## Objectives

- o-1: explain why an app's behavior depends on the machine it runs on (runtime, libraries, config, disk), not just its code. checks: k-01, k-02, k-03, k-04
- o-2: predict what happens to the business when a single hand-built server fails, and ask the question that exposes the risk: "If this box vanished tonight, how long until we're back, and who has to be awake?" checks: k-05, k-08, k-09
- o-3: explain why "just get a bigger server" or "add VMs" doesn't fix reproducibility. checks: k-06, k-07

## Diagnosis

- **Readiness:** novice for infrastructure, intermediate for software. The reader has "code", "server", "deploy" and "outage" as words, but no picture of what sits on a server besides the code.
- **Hardest moment:** s-03 stage 4 and s-04. Here the reader holds (1) the same code on both machines, (2) the notes against the real server, and (3) gaps that differ in *when* they bite (now vs. months later). That's 3 interacting elements, the limit for a novice. Two supports keep it manageable:
  - **Pre-training:** s-02 chunks "machine" and "process". The widget's stage 1 chunks the server's contents into four categories that match o-1's wording: RUNTIME, LIBRARIES & TOOLS, CONFIG, DISK & DATA. By stage 4 each category counts as one element.
  - **Externalised state:** the comparison is aligned row by row, so the reader never holds a list in memory.
- **Misconceptions confronted** (research IDs, local to this run; see R2):
  - m-01 "the code is the app": seed, confronted in w-rebuild stage 3 and in k-05;
  - m-02 "a runbook solves single-person risk": k-03, k-05, k-08;
  - m-03 "bigger server fixes it": k-06;
  - m-04 "VMs mean we can recreate it any time": k-07.

  Each is stated fairly once, shown failing, then corrected with its honest partial truth kept: runbooks do help (c-08), more disk does postpone the failure, and snapshots do speed recovery (c-10).
- **Retrieval opener:** none (CURRICULUM §2.8 doesn't apply to Ch 1). Instead k-01 is a **pre-question**: it gets the reader to commit to "what else could break it?" before the cause is revealed, which starts the m-01 seed.
- **Management analogies** (CURRICULUM §2.1), each with a "where this analogy breaks" note:
  - A1, the original job description (s-04);
  - A2, bus factor (s-05);
  - A3, photocopying a cluttered desk (s-06).

## Segments

### s-01 — Friday, dinner rush
intent: The reader feels the outage as a manager would (orders failing, one person scrambling) and commits to a guess about why, before any infrastructure idea appears.
objectives: o-2, o-1
claims: c-03
readiness: novice · interactivity: low (the symptom, the timeline) · max-elements: 2
mode: concrete story → pre-question (think-then-reveal) → timeline figure · blueprint: none
layout:
  contiguity: adjacent — the timeline sits directly after the reveal of k-01; each time label sits on its own row, beside its event
  pacing: continuous; k-01 reveal gates nothing but sits before the cause is named in prose
  redundancy: prose doesn't retell the timeline row by row; it states the takeaway (most of the two hours went to reaching Sam and finding the cause)
  scaffold: none
ux: The reader reads a short scene, thinks about k-01 and taps "Show the answer", then scans a vertical timeline. At 360px the timeline is a single column (time, event, who) with no horizontal scroll.
figure: f-01, the Friday outage timeline (static, data-driven). See ## Figures.
widget: none
checks: k-01

### s-02 — What "the server" is
intent: Give the reader a picture of the machine before its contents. The app is a process running on one machine; deploying means getting new code onto that machine.
objectives: o-1
claims: c-01, c-03
readiness: novice · interactivity: low (machine, process, deploy) · max-elements: 3
mode: concrete description → labelled diagram; terms named after the figure shows the thing · blueprint: none
layout:
  contiguity: inline — "process", "disk" and "deploy" labelled on the figure itself, using the same words as the prose
  pacing: continuous
  redundancy: the caption gives the takeaway ("the app is the code *running* on one particular machine"), not a description of the boxes
  scaffold: none
ux: Read and look. At 360px the figure is drawn in a stacked variant: the repo and the deploy arrow above the machine box, not beside it.
figure: f-02, one machine, one process (static). See ## Figures. This figure sets the course's machine visual (see ## Visual grammar).
widget: none
checks: none

### s-03 — What's on Sam's server, and can you rebuild it?
intent: The reader finds out by doing that the server holds far more than the code, then rebuilds it from Sam's notes and sees the same code misbehave on a machine that's missing a few things.
objectives: o-1, o-2
claims: c-01, c-02, c-03, c-06
readiness: novice · interactivity: high (code vs. machine contents, notes vs. reality, when a gap bites) · max-elements: 3
mode: predict (select) → step-through (follow the notes) → predict → run checks → diagnose (apply) → contrasting comparison · blueprint: B1 (step-locked) with B4-style aligned comparison in the final stage
layout:
  contiguity: inline — every status word, consequence ("without it: …") and note sits on the row it describes; the current notes step sits directly above (mobile) or beside (desktop) the machine rows it changes
  pacing: step-revealed; stage 1 reveal gated on k-02; checks (stage 3) gated on k-03; compare (stage 4) gated on diagnosing both failures (k-04)
  redundancy: surrounding prose sets the scene in 2–3 sentences and doesn't narrate the widget; widget text is procedural only (what to do now) and consequences
  scaffold: none (the target reader needs every part); "Start over" resets to stage 1
ux: In about 3–4 minutes, the reader taps cards to predict the inventory, steps through 6 notes, predicts, runs checks, taps each failed check to diagnose it, then reads the aligned comparison. At 360px: a single column, notes shown one step at a time with "Run step 3 of 6", machine rows below, all text ≥ 13px, touch targets ≥ 44px.
figure: none (the widget is the figure)
widget: w-rebuild (complexity: high) — four-stage server inventory / rebuild-from-notes / launch checks / compare widget
checks: k-02, k-03, k-04

### s-04 — Why the notes fell behind
intent: Name what the reader just experienced (dependency, drift, snowflake server) and explain "don't touch it", so the gaps read as a structural property of hand-built servers and not as Sam's carelessness.
objectives: o-1, o-2
claims: c-01, c-02, c-04, c-05, c-06, c-07
readiness: novice · interactivity: low (each term names one thing already seen) · max-elements: 2
mode: name-after-meeting → explanation → management analogy with breaks note · blueprint: none
layout:
  contiguity: adjacent — each term is introduced in the sentence that points back to a specific widget row ("the photo tool", "the Friday-night fix", "the holiday-sale setting")
  pacing: continuous
  redundancy: don't re-list the inventory; refer to rows by name
  scaffold: analogy A1 in a `.cp-aside` (labelled ANALOGY) with its "Where this analogy breaks" line inside the same aside
ux: Read. Three `dfn` terms, each once. One aside. At 360px the aside is full width.
figure: none
widget: none
checks: none

### s-05 — If this box vanished tonight
intent: Move from the server's side to the business's side. When the one hand-built machine is gone, the outage lasts as long as it takes to find what the notes left out, and that depends on one person.
objectives: o-2
claims: c-05, c-07
readiness: novice · interactivity: low (gaps in the notes, the one person who can fill them) · max-elements: 2
mode: apply (predict a new case) → explanation → management analogy with breaks note · blueprint: none
layout:
  contiguity: adjacent — k-05 comes right after the scenario sentence; the two factors are stated right after its reveal
  pacing: continuous
  redundancy: feedback on k-05 points back to the reader's own rebuild, and the prose after it doesn't repeat that feedback
  scaffold: analogy A2 (bus factor) in a `.cp-aside` with its breaks note; Fowler's recovery-test anecdote (x-02) as a one-paragraph `.cp-aside` labelled WHY RECOVERY TIME
ux: Read the scenario, commit to k-05, read the feedback and a short paragraph. At 360px, option buttons stack full width.
figure: none
widget: none
checks: k-05

### s-06 — "Couldn't we just…"
intent: The two fixes a manager reaches for, a bigger server and VMs, each help with something real. Neither makes the server reproducible.
objectives: o-3
claims: c-05, c-09, c-10, c-11, c-12
readiness: novice · interactivity: low per proposal (the proposal, what it changes, what it leaves) · max-elements: 3
mode: two predict-then-reveal checks (misconception confrontation), the second followed by a three-panel figure and analogy · blueprint: none
layout:
  contiguity: adjacent — VM defined in the sentence just before k-07; f-03 directly after k-07's reveal
  pacing: continuous; f-03 placed after k-07 so it doesn't give the answer away
  redundancy: the f-03 caption states the takeaway (fast to restore, copies the clutter, goes stale); prose doesn't walk through the three panels
  scaffold: analogy A3 in a `.cp-aside` with its breaks note
ux: Morgan's proposal, then k-06; Sam's proposal and a plain VM definition, then k-07; then f-03. At 360px f-03 stacks its three panels vertically with a down-arrow between them.
figure: f-03, snapshot of a snowflake (static three-panel strip). See ## Figures.
widget: none
checks: k-06, k-07

### s-07 — The conversation
intent: Rehearse the chapter's discussion move. Answer Sam's "we should keep a runbook" with the question that measures the risk, and know which answer to listen for.
objectives: o-2
claims: c-06, c-08
readiness: novice · interactivity: low · max-elements: 2
mode: apply (choose the response) → apply (think-then-reveal: what answer would worry or reassure you) → recap → open question for Ch 2 · blueprint: none
layout:
  contiguity: adjacent — Sam's line is shown as a quoted line directly above k-08
  pacing: continuous
  redundancy: the recap is three short lines and doesn't re-explain
  scaffold: none
ux: Two checks, a three-line recap and the closing question. At 360px everything stacks.
figure: none
widget: none
checks: k-08, k-09

## Figures

Simple figures are drawn by the page builder as inline SVG figure plates (Control Plane `Figure` treatment: mono header bar, blueprint ground, direct labels, numbered caption), following ## Visual grammar.

### f-01 — Friday outage timeline (s-01)
- **Model:** a vertical list of rows: `time · event · who`. All Fennel fiction except the database behaviour (c-03).
  - "For months": log files grow a little every day, and nobody set them to be cleaned up. (who: nobody)
  - 18:05: the dinner rush starts, the busiest hour of the week. (customers)
  - 18:12: the disk hits 100%. The database can't record new orders (c-03), so checkout shows an error. (the server)
  - 18:20: the first customer emails reach Jordan. (Jordan)
  - 18:35: Sam is at dinner across town. The phone finally gets through. (Sam)
  - 19:05: Sam is home and logged in. The site is still down. (Sam)
  - 19:40: Sam finds the cause: months of log files. (Sam)
  - 19:55: Sam deletes old logs and restarts the app. (Sam)
  - 20:10: orders go through again. (Sam)
  - 23:00: Sam sets up a nightly job that deletes old logs, "so this never happens again". It's done by hand and never written down. This row is a deliberate plant: the reader meets it again as a missing row in w-rebuild stage 4.
- **Display:**
  - a band on the left edge marks 18:12–20:10 as "NO ORDERS", the business view;
  - the "who" column makes it visible that every action after 18:35 is Sam's;
  - status lamps: `bad` with the word DOWN for the 18:12–20:10 rows, `good` with the word UP afterwards.
- **Caption (takeaway):** "Deleting the logs took fifteen minutes. Most of the two hours went to reaching the one person who knew the server, and to that person finding the cause."
- **Size:** prose column width (≤ 66ch on desktop; full width on mobile). It's a list, so no re-layout is needed.
- **Reuse:** candidates Ch 3 (Sam's 3 a.m. page), Ch 4 (the same failure, "nobody wakes up"), Ch 12 (postmortem timeline). Build the row list from a small data array in the page (time, event, who, status) so a later chapter can copy the markup and CSS. Worth it now because it costs nothing extra. It's a static figure, not a widget; later chapters may change it freely.

### f-02 — One machine, one process (s-02)
- **Model:** one machine box labelled `MACHINE · FENNEL'S SERVER (RENTED)`. Inside it:
  - a process block "Fennel app: running" in c1, with a status lamp and the word RUNNING;
  - a disk gauge "DISK" with "orders, logs, uploads" written in it.
  
  Outside the box:
  - left: "customers' requests →" an arrow into the process;
  - top: a small "CODE REPO" box with an arrow into the machine labelled "deploy: copy new code, restart the app".
- **Display:** direct labels only. The word *process* appears as a label on the running block ("process: the code, running"). The word *deploy* appears on the arrow.
- **Caption:** "Figure 2. The app is the code *running*, as a process on one particular machine. Deploying means getting new code onto that machine."
- **Size:** desktop viewBox ≤ 600 wide, about 280 tall. Under 480px, a stacked variant: repo on top, deploy arrow down, machine box below, customers' arrow from the left shortened to a label.
- **Reuse:** this sets the course's machine visual (## Visual grammar); w-rebuild and f-03 reuse its frame. Candidates Ch 2 (two machines), Ch 3 (four machines). Only the drawing conventions are reused, not code.

### f-03 — Snapshot of a snowflake (s-06)
- **Model:** three panels, left to right, each a small machine box with five or six rows in the w-rebuild row style.
  1. **"Monday 01:00: snapshot taken."** The live VM is on the left, with a copy beside it labelled SNAPSHOT. Both hold the same rows, including two clutter rows drawn in c6 dashed: "40 GB of old logs" and "holiday-sale setting (UNKNOWN)". Annotation: "exact copy, clutter included".
  2. **"Wednesday: Sam fixes something by hand."** The live VM gains a row, "new email setting", in c2 with a small "hand-made, not in notes" tag. The snapshot is unchanged.
  3. **"Friday: the VM dies; restore the snapshot."** The restored VM is back (lamp RUNNING, annotation "back in minutes"). The row "new email setting" shows MISSING (`bad` plus the word), and the clutter rows are back.
- **Display:** only the changing row is at full ink in each panel; the other rows are at reduced opacity, per graphics §4.
- **Caption:** "Figure 3. A snapshot gets you back fast. It also brings back the clutter, misses every hand-made change since it was taken, and tells you nothing about which settings matter."
- **Size:** desktop `.d-wide`, three panels in a row, viewBox ≤ 600 per panel or one 960-wide SVG with a stacked variant. Under 600px, the panels stack vertically with a "↓" between them.
- **Reuse:** none planned. Ch 2 may want a "VM vs container" figure, but that's a different comparison, and Ch 2's analysis should decide it.

## Visual grammar

These conventions are shared by f-02, f-03 and w-rebuild, and proposed for the term ledger's Visuals column (R4).
- **Machine:** an ink-outlined rectangle (`--stroke`, `radius-1`) with a mono header bar `MACHINE · <NAME>`. On figures it sits on blueprint ground; in the widget, on the widget panel.
- **The app's code:** c1 (protagonist orange) throughout the course. The running process is the code row with a lamp and the word RUNNING.
- **Things on the machine** (runtime, libraries, tools, config, data): c2 soft fill and c2 stroke, as rows grouped under mono category labels RUNTIME · LIBRARIES & TOOLS · CONFIG · DISK & DATA.
- **Clutter and unknowns:** c6, dashed (the style guide's rule for c6).
- **Status words:** PRESENT (`good`), MISSING (`bad`), UNKNOWN (`warn`), PASS / FAIL (`good` / `bad`). A word always travels with the colour.
- **Sam's notes:** a mono numbered list on `surface-2`, titled `SAM'S NOTES · WRITTEN AT SETUP, LAST EDITED 14 MONTHS AGO`.

## Widgets

### w-rebuild
segment: s-03
complexity: high
blueprint: B1 (step-locked, four stages) with a B4-style aligned comparison in stage 4
model: Two machines (Sam's server and a new machine) share one item list. Each item has a category, label, presence on Sam's server, presence after the notes run, when and why it was added, and a "without it" consequence. Six notes steps add items to the new machine. Five launch checks pass or fail depending on which items are present. Data lives in a separate `data.js` (see below).
  - **Items** (category · label · on Sam's server · installed by the notes · added · without it · claim):
    - CODE · "Fennel app code (from the repo)" · yes · yes (step 4) · setup day · "nothing runs" · (the same version on both machines: show IDENTICAL in stage 4)
    - RUNTIME · "Language runtime the code is written for (say, Python)" · yes · yes (step 2) · setup day · "the app won't start" · c-01
    - LIBRARIES & TOOLS · "Libraries the code uses (web framework, payments library)" · yes · yes (step 4) · setup day · "the app won't start" · c-01
    - LIBRARIES & TOOLS · "Image-resizing tool" · yes · **no** · "installed by hand in May, when product photos launched" · "product photo uploads fail" · c-01, x-01
    - CONFIG · "Config file: database address, site name, payment key" · yes · yes (step 5) · setup day · "the app can't find its database or take payments" · c-02
    - CONFIG · "Email service key" · yes · **no** · "added in August, when order emails launched" · "order confirmation emails don't send" · c-02, c-06
    - CONFIG · "Nightly log-cleanup job" · yes · **no** · "set up by hand last Friday at 23:00, after the outage" · "nothing fails today; in a few months the disk fills and Friday happens again" · c-03, c-06
    - DISK & DATA · "Database and its data (orders, customers)" · yes · yes (step 3) · setup day · "no orders, no customers" · c-03
    - CONFIG · "Web-server setting changed during the holiday sale" · yes · **no** · "Sam: 'I think that was for the sale. Not sure it still matters.'" · "unknown" · c-07. This row is **hidden in stages 1–3** and appears in stage 4 with status UNKNOWN.
  - **Disk gauge** per machine: Sam's server 31% (after Friday's clean-up); new machine 9% after step 3.
  - **Sam's notes** (six steps; each "runs" without error):
    1. Rent a server with a fresh operating system (adds the empty machine frame)
    2. Install the language runtime
    3. Install the database; copy the data over from last night's backup
    4. Download the Fennel code from the repo; install its libraries
    5. Create the config file: database address, site name, payment key
    6. Start the app (the code row lamp turns RUNNING)
  - **Launch checks** (stage 3, run in order, about 300ms apart; instant under reduced motion):
    - Home page loads: PASS (needs code, runtime, libraries, config, database)
    - Search products: PASS
    - Place a test order: PASS
    - Upload a product photo: **FAIL**, "error: resize failed" (needs the image tool)
    - Order confirmation email: **FAIL**, "not sent" (needs the email key)
  
    No check covers the log-cleanup job. That's deliberate: it shows up only in stage 4.
  - **Diagnosis options** (same three for each failed check): "The code" / "Something installed on the machine" / "A setting or key in the config". Correct answers: photo upload → installed on the machine; email → config.
reader_does: Stage 1, select-predict (k-02). Stage 2, step through Sam's notes with "Run step n of 6". Then predict (k-03). Stage 3, run the launch checks and tap each FAIL to diagnose it (k-04). Stage 4, read the aligned comparison. "Start over" is always available.
  - **Stage 1, "Sam's server, as most people picture it."**
    - The machine shows only the code row (RUNNING).
    - Prompt above seven cards (k-02): "Besides the code, what has to be on this machine for a customer to order and get a confirmation email? Tap everything you think is there, then reveal."
    - Cards (unordered, not grouped): language runtime · libraries the code uses · image-resizing tool · config file (database address, site name, payment key) · email service key · nightly log-cleanup job · database and its data.
    - The "Reveal what's on it" button enables after at least one tap.
    - On reveal, all seven move into the machine under their category labels, each with its "without it: …" line.
    - Feedback line: "You picked N of 7. All seven are on Sam's server, and the site needs every one." For each card the reader didn't pick, the row is tagged "you missed this".
    - Then a "Next: rebuild it" button.
  - **Stage 2, "Monday. Jordan asks Sam: if this server died, could we build another? Sam hands over the notes."**
    - Sam's server collapses to a header row: "Sam's server: still running (hidden for now)".
    - The new machine starts as an empty frame.
    - The notes panel shows the six steps. Each "Run step" tick adds that step's rows to the new machine, with a 200ms highlight.
    - After step 6 the code lamp turns RUNNING and a line reads "All six steps ran without an error."
    - Then k-03 appears (commit-then-reveal). Its answer unlocks "Run launch checks".
  - **Stage 3, "Launch checks."**
    - The five checks run in order. Two show FAIL.
    - Each FAIL row is a button: "Why? Tap to diagnose."
    - Tapping it opens the three diagnosis options inline (k-04). On commit, the feedback appears on that row.
    - Once both are diagnosed: "Compare the two machines".
  - **Stage 4, "Compare."**
    - Sam's server and the new machine appear as two status columns on the same rows.
    - The code row reads IDENTICAL on both, highlighted in c1, with the label "Same code."
    - The three missing rows show PRESENT / MISSING, each with its "added …" line and consequence.
    - The log-cleanup row carries a callout: "No check caught this one. It's the fix for Friday's outage, and the new machine doesn't have it."
    - The holiday-sale row appears last: PRESENT / not installed, status UNKNOWN, with Sam's quote.
    - Summary line under the rows: "Same code. Every step in the notes ran. Three things missing, and one nobody can explain."
shows: Every state is labelled on its referent.
  - The machine header shows its name.
  - Rows carry category labels, item labels and status words.
  - The notes panel highlights the current step and marks completed steps "done".
  - The checks panel shows PASS / FAIL words.
  - Diagnosis feedback appears on the row it answers.
  - An `aria-live="polite"` sentence describes each change ("Step 3 of 6 done: database installed, data copied"; "Photo upload: FAIL").
  - Stage heading with counter: `STAGE 2 / 4 · REBUILD FROM THE NOTES`.
  - Control Plane `cp-widget` panel: lamp, mono bar `W-01 · REBUILD SAM'S SERVER`, hard offset shadow.
size: desktop `.d-wide` (≤ 960px). Two columns: notes or checks panel on the left (about 40%), machine rows on the right (about 60%). Reserve min-height 600px; every stage fits inside it, so stage changes never move the page. Mobile (< 600px): full width, single column, in this order: stage header, instruction, the current notes step as one card ("Step 3 of 6: Install the database; copy the data over" plus "Run step"; the full list in a `<details>` "All six notes"), then machine rows (label column flexible, status columns 72px each in stage 4), then the checks panel. Reserve min-height about 820px at 360px. Status columns use words, so stage 4's two columns fit at 360px (labels wrap to two lines rather than shrinking). No horizontal scroll at 360px; text ≥ 13px; touch targets ≥ 44px.
acceptance: ac-04, ac-05, ac-06, ac-07, ac-08, ac-09
reuse: candidates Ch 2 (contrasting cases: the same code on two machines, one dependency version different; this widget's stage-4 aligned two-machine comparison is that layout) and Ch 15 (capstone scenarios). Parameterise in `data.js`: machine names; items (category, label, per-machine presence or version string, added-note, consequence, hidden-until-stage); notes steps; checks with their required items; which stages are enabled. Don't build a generic framework or any reader-visible option for it. Ch 3's placement widget is **not** a reuse target (its model is capacity and placement, not contents); it should share only the machine-frame visual grammar. Worth designing for now because the data has to exist anyway: putting it in a data file costs the builder almost nothing, and Ch 2's own analysis may still decide against reusing it.

## Comprehension items

### k-01
segment: s-01
objective: o-1
type: predict
prompt: Nobody has changed a line of Fennel's code since Tuesday. So what could break checkout on Friday evening?
model_answer: Something about the machine the code runs on. Fennel's code was fine. The server's disk had filled up, and the database could no longer record new orders.
feedback: Think-then-reveal pre-question, with no grading. The reveal leads straight into the timeline. If your first thought was "a bug in the code", that's the usual instinct, and the rest of this chapter is about everything else an app depends on.

### k-02
segment: s-03
objective: o-1
type: predict
prompt: Besides the code, what has to be on this machine for a customer to order and get a confirmation email? Tap everything you think is there, then reveal.
options: (multi-select, all seven correct) language runtime · libraries the code uses · image-resizing tool · config file (database address, site name, payment key) · email service key · nightly log-cleanup job · database and its data
feedback: "You picked N of 7. All seven are on Sam's server, and the site needs every one." Each row shows what breaks without it (see w-rebuild items). For any unpicked card: "You missed this. Most people picture the code and maybe a database. The rest was installed or set up on the machine by hand, so it never shows up in the code."

### k-03
segment: s-03
objective: o-1
type: predict
prompt: All six steps in Sam's notes ran without an error, and the code is the same version as on Sam's server. Will the new machine work like the old one?
options: A) Yes. Same code, and every step in the notes done. · B) No. It won't even start. · C) It will start and mostly work, but some things will be broken or missing. (correct: C; tempting: A)
feedback: A: "That's the trap. The notes list what Sam remembered to write down at setup. The code was never the problem; the question is what else was on Sam's server. Run the checks and see." B: "It does start: the runtime, libraries, config and database are all in the notes. The gaps are subtler than that." C: "Right. The notes cover what existed at setup. Anything added by hand since then isn't in them. Run the checks to find out what."

### k-04
segment: s-03
objective: o-1
type: apply
prompt: (on each FAIL row) Photo upload fails with "resize failed". What's missing on the new machine? / Order confirmation emails aren't sent. What's missing?
options: The code · Something installed on the machine · A setting or key in the config (correct: photo → installed on the machine; email → config; tempting: the code)
feedback: "The code": "The code is identical on both machines, so it can't be the difference. The difference is on the machine." Photo, installed (correct): "Right. The code hands photos to an image-resizing tool that Sam installed by hand in May. The new machine doesn't have it, and the notes never mentioned it." Photo, config: "Close. Config tells the app *where* things are. Here the missing piece is a program the code calls, installed on the machine." Email, config (correct): "Right. The email service key was added to Sam's config when order emails launched. The notes were written before that." Email, installed: "Not this time. Nothing needs installing; the app just doesn't have the key that lets it use the email service."

### k-05
segment: s-05
objective: o-2
type: apply
prompt: Saturday, 2 a.m. The rented server's hardware fails for good. The code is safe in the repo, and Sam has the notes. When is Fennel fully back to normal?
options: A) As soon as someone copies the code onto a new server. · B) As soon as Sam has worked through the notes on a new server. · C) Only after Sam has also tracked down everything the notes leave out, often when customers hit the broken features. (correct: C; tempting: A, B)
feedback: A: "Your rebuilt machine had identical code, and photo uploads still failed. The code is only part of what has to come back." B: "You just did exactly that. The notes ran without an error, and three things were still missing, one of them the fix for Friday's outage." C: "Right. Two things set how long this takes: how much is missing from the notes, and whether the one person who can find it is awake."

### k-06
segment: s-06
objective: o-3
type: predict
prompt: After Friday, Morgan offers to pay for a much bigger server, with ten times the disk. Which of Friday's problems does that solve?
options: A) All of them. The outage was caused by a full disk. · B) It pushes this particular failure months away, but Fennel still runs on one machine that only Sam can rebuild. · C) None. Disk space had nothing to do with it. (correct: B; tempting: A)
feedback: A: "More disk really does postpone this failure, and that's worth something. But Friday exposed two other risks a bigger disk doesn't touch. Everything still runs on one machine, so any problem with it takes the whole site down. And that machine still can't be rebuilt from the notes. A bigger snowflake is still a snowflake." B: "Right. A bigger box buys time on disk and nothing else. It's still a single point of failure, and it was still built by hand." C: "Too harsh. Disk was the trigger, and more of it does delay a repeat. It just leaves the other two risks where they were."

### k-07
segment: s-06
objective: o-3
type: predict
prompt: Sam suggests moving Fennel to a virtual machine at a cloud provider, with a snapshot of its disk taken every night. If that VM vanished tonight, what would getting back look like?
options: A) Click a button for a new VM, and you're done in minutes. · B) Restore last night's snapshot. You're back much faster, but the old clutter comes back too, anything changed by hand since the snapshot is lost, and still nobody is sure which settings matter. · C) No better than today. A VM is just a server with a different name. (correct: B; tempting: A)
feedback: A: "A new VM does arrive in minutes, but it arrives blank. Someone still has to set it up, and that means by hand unless something automates it (we'll name that later). The snapshot is what makes recovery fast, and it comes with caveats." B: "Right. The snapshot is a real improvement: an exact copy you can start. What it can't give you is understanding of the server, and it starts going stale the moment someone changes the live machine by hand." C: "Too harsh. A snapshot is an exact, bootable copy, so recovery really is faster. The problem it leaves is the snowflake itself."

### k-08
segment: s-07
objective: o-2
type: apply
prompt: The Monday after the outage, Sam says: "We should keep a runbook for the server." What's the most useful thing Jordan can say?
options: A) "Great. Once it's written, we're no longer dependent on you." · B) "Yes. And let's test it: if this box vanished tonight, how long until we're back, and who has to be awake?" · C) "Runbooks always go out of date. Let's not spend time on it." (correct: B; tempting: A)
feedback: A: "Written-down steps do help. Google's SRE team found they made repairs roughly three times faster than improvising. But every change made by hand after the runbook is written puts it behind the server, and Google's same team says no playbook is a substitute for engineers who can think on the fly. The runbook reduces the dependence on Sam; it doesn't remove it." B: "Right. It welcomes the runbook and asks for the two numbers that tell you whether it's enough: the time to recover, and how many people can do it." C: "They do drift, but they're much better than nothing. The fix is to test them, not skip them."

### k-09
segment: s-07
objective: o-2
type: apply
prompt: Sam answers your question. What answer should worry you, and what answer would reassure you? Think about it, then show the answer.
model_answer: Worrying: "Depends. If I'm reachable, a few hours, I think." That's a guess, and it depends entirely on one person. Reassuring: "We rehearsed it last month. Jordan followed the notes on a spare machine while I watched without helping. It took fifty minutes, we found two gaps, and we added them to the notes." That's a measured time, from a real rebuild, that didn't rely on Sam's memory.
feedback: Think-then-reveal, with no grading. The point is what to listen for: a measured recovery time from an actual rebuild beats a confident estimate.

## Acceptance criteria

- ac-01 (s-01): The outage appears first as a business symptom (checkout errors at the busiest hour, the time without orders, one person scrambling), and k-01 is asked before the page names the cause.
- ac-02 (f-01): The timeline makes visible that most of the two hours went to reaching Sam and finding the cause, not the fix itself, through the "who" column and the NO ORDERS band. The 23:00 log-cleanup row is present. The times read as Fennel's story, not as an industry statistic.
- ac-03 (s-02): "process" and "deploy" are each introduced after the figure or sentence shows the thing, and are labelled on f-02 in the prose's words. No later-chapter ledger term (container, image, registry, orchestration, Kubernetes, cluster, node, pod) appears anywhere on the page.
- ac-04 (w-rebuild, k-02): The reader must tap at least one card before the inventory is revealed. The reveal shows all seven items in four categories, each with a "without it" consequence, and tags the items the reader didn't pick.
- ac-05 (w-rebuild): During stage 2, Sam's server's contents are hidden. Every notes step reports success, and the new machine shows only what the notes installed. k-03 must be answered before the launch checks run.
- ac-06 (w-rebuild): Exactly two launch checks fail (photo upload, confirmation email). Each must be diagnosed before the comparison unlocks. Choosing "The code" gets feedback that the code is identical on both machines.
- ac-07 (w-rebuild stage 4): The rows are aligned across the two machines. The code row reads IDENTICAL. Each missing row states when and why it was added and what breaks. The log-cleanup row says no check caught it and ties it to Friday's outage. The holiday-sale row reads UNKNOWN with Sam's quote.
- ac-08 (w-rebuild): Every status is a word plus colour (PRESENT / MISSING / UNKNOWN / PASS / FAIL), never colour alone. An aria-live sentence announces each step, check and diagnosis. Under reduced motion the checks appear at once. "Start over" returns to stage 1.
- ac-09 (w-rebuild, mobile): At 360px there's no horizontal scroll. The current notes step and the new machine's rows are visible together without scrolling between them. Text is ≥ 13px, touch targets are ≥ 44px, and stage changes don't move the content below the widget (reserved height).
- ac-10 (s-04): "dependency", "drift" and "snowflake server" are each introduced once (`dfn`), after the widget, each pointing to a row the reader just saw. "Don't touch it" is explained by the UNKNOWN setting (c-07). The gaps are framed as how hand-built servers work, not as Sam's fault.
- ac-11 (analogies): All three management analogies (A1 job description, A2 bus factor, A3 photocopied desk) carry a visible "Where this analogy breaks" line in the same aside.
- ac-12 (k-05, s-05): k-05's tempting options cover "the code is the app" and "the runbook solves it", and the feedback refers to the reader's own rebuild. After the reveal, the page states the two factors that set outage length: what's missing from the notes, and whether the one person is awake.
- ac-13 (k-06, s-06): The feedback admits more disk postpones the failure, and names the single point of failure and the rebuild problem. If the prose mentions cost at the top end, it says it climbs steeply, never "exponentially".
- ac-14 (k-07, f-03): The VM is defined in plain words before k-07. The snapshot's real benefit (a fast restore) is stated alongside its clutter and staleness. f-03 shows a hand-made change after the snapshot coming back MISSING on restore.
- ac-15 (k-08): The correct option contains the chapter's question verbatim. The feedback on the runbook option gives Google's "roughly three times faster" figure *and* its "no substitute for engineers" limit, without the acronyms MTTR or RTO.
- ac-16 (page): No acronyms RTO, MTTR or SPOF. "Single point of failure" is spelled out once if used. Recovery is phrased as "how long until we're back".
- ac-17 (s-07): The page ends on the open question about shipping the code together with everything it needs, and doesn't answer it (no packaging, no images, no containers).
- ac-18 (all checks): Every choice item is commit-then-reveal. Feedback explains why each tempting option is wrong, and no item scores or grades the reader.

## Curriculum recommendations

Recommendations only; CURRICULUM.md is unchanged.

- **R1 (§6 catalog, Ch 1 and Ch 2 entries):** Add "the code is the app" to the catalog as a course-level misconception owned by Ch 1 (the problem side), with Ch 2 revisiting it (the fix: packaging). Reason: Ch 1's o-1 already confronts it head-on, so "none owned, plant the seed" undersells what Ch 1 does. Giving it an ID also lets Ch 2's retrieval and Ch 15's distractors cite it.
- **R2 (§6 catalog, §8):** Also catalogue "a runbook removes single-person risk", "a bigger server fixes it" and "VMs mean we can recreate the server any time" as Ch 1-owned entries, and tell runs to use catalog IDs or prefix local IDs. Reason: Ch 1's research named these m-01..m-04, which collide with catalog m-01..m-04. Ch 15 needs stable IDs for its tempting wrong answers.
- **R3 (§5 term ledger, Ch 1 row):** Add "drift" (configuration drift), "runbook" and "single point of failure". Reason: Ch 1 introduces and needs all three. Ch 2's Fennel moment ("staging and production have quietly drifted apart") relies on drift, and Ch 3 and Ch 4 rely on single point of failure.
- **R4 (§5 Visuals column):** After the build, record ## Visual grammar from this plan for Ch 1: the machine as an outlined frame with a `MACHINE · NAME` bar; the code in c1; things on the machine as c2 rows under RUNTIME / LIBRARIES & TOOLS / CONFIG / DISK & DATA; clutter and unknowns in c6 dashed; status words. Reason: Ch 2 (two machines) and Ch 3 (four machines) should draw machines the same way.
- **R5 (§3 Fennel):** State who Jordan and Morgan are in Year 0. This plan assumes they're the two founders: Jordan the non-infrastructure co-founder who later becomes the engineering manager, Morgan handling money. Also record the single app's name ("the Fennel app"; `storefront` named at the Ch 3 split). Reason: the Year 0 row says "2 founders, 1 engineer", but the cast list doesn't say who the founders are, and Ch 1 needs Jordan and Morgan on stage.
- **R6 (§3 Fennel, after build):** Record the Ch 1 story facts later chapters can refer back to: the outage times (disk full at 18:12, orders back at 20:10); Sam's 23:00 hand-made log-cleanup job; the image-resizing tool (May); the email key (August); the unexplained holiday-sale setting; Sam's notes (written at setup, last edited 14 months ago). Reason: Ch 2 retrieval ("why did photo uploads fail on the rebuilt server?") and Ch 4's "nobody wakes up" callback need them.
- **R7 (Ch 1 entry, pain in the page):** Reword it to "the reader predicts what's on Sam's server, rebuilds it from Sam's notes, runs launch checks, diagnoses the failures, and compares the machines." Reason: that's the designed activity. Free-listing isn't workable on a static page without text boxes, and the diagnosis step is where o-1 is actually practised.
- **R8 (Ch 2 entry):** Note that Ch 1's w-rebuild compare stage is a candidate for Ch 2's "same code, two machines, one dependency version different" contrasting case. Suggest Ch 2's retrieval opener ask about the rebuilt server's photo upload failure, which needs the snowflake idea. Reason: continuity, and cheap reuse if Ch 2's analysis agrees.
- **R9 (Ch 4 entry, conversation and retrieval):** Have Ch 4 explicitly call back Ch 1's question ("how long until we're back, and who has to be awake?"). The answer in Ch 4, "nobody, and minutes", is the payoff. Reason: this ties the reconcile loop to the first business pain the reader felt.
- **R10 (Ch 10 entry):** Note that Ch 1 glosses over data during the rebuild ("copy the data over from last night's backup") and leaves backups to Ch 10. Reason: so Ch 10 can point back instead of contradicting.
- **R11 (§2.8):** Add "Ch 1 has no retrieval opener; a pre-question may take its place." Reason: the principle says "every chapter", and Ch 1 can't follow it.
