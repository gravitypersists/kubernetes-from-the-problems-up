# Pedagogy & UX review: round 1

<!-- Merged round (d-09): pedagogy, UX and accuracy (also_accuracy: true). Accuracy findings carry a verdict line
     and say "Accuracy" in their criterion. Probe evidence: run/screenshots/probe/ (d1280-*, d1280dark-*, m360-*,
     m360dark-*, l740-*, pg360-*, pg1280-*). Lanes driven at 1280×900 (light: wrong answers by mouse; dark +
     reduced motion: wrong answers by keyboard Enter), 360×740 (light: wrong answers by tap; dark + reduced motion:
     keyboard), and 740×360 landscape (right answers). Each pass scrolled A1→C4 before committing, then after,
     then scrolled back B6→B3→A2→A1. No console errors in any pass. -->

## Summary
The scrollytelling answers the user's concern from d-03. Each step changes one or two things, every gate holds until you commit, scrolling back restores each state exactly, and the sticky, short-viewport and dark-mode layouts all work. The jobs are met before they're named, and Kubernetes arrives as a real payoff. One blocking issue: lane C's final drawing (C4) can't be reached by the start-one-then-stop-one procedure the text describes. Machine 02 never has room for a v13 copy, which breaks the fit rule the reader just used in k-02. The main should-fixes are the story's four-versus-eight machines and three check problems: NEW ADDR hints k-03, D1 answers k-01, and k-08 lets you pick the middle. The estimated time is about 17–18 minutes, against 15.

## Scores
- acceptance criteria: 4 — 14 of 18 met in full; ac-02 (ToC), ac-07 (colour-only RUNNING at 360px, no-JS text), ac-08 (f-02 not drawn by renderFleet) and ac-16 (k-08's middle option) each slip on a detail.
- cognitive load fit: 4 — at most 2 new elements per step at the hardest moment (B3–B5); the four-versus-eight machines puzzle is the one avoidable load.
- engagement where intended: 4 — k-02, k-03 and k-04 are real commitments at the key moments, and k-05 is real generation; k-06 and k-07 are answerable by recognising the text just above them.
- misconception handling: 4 — m-02 is stated as two options, shown failing and corrected with f-02; local-01 is stated fairly and corrected; local-03 is confronted. k-08's form weakens the m-02 commitment (k-08 finding).
- split attention and redundancy: 4 — direct labels everywhere, and figures are referred to by number; f-02's caption repeats its own labels, and k-09 repeats the lines just above it.
- mobile UX: 4 — at 360px the canvas is sticky at ≤ 49% of the viewport height, four machines fit, there's no overflow and every button is ≥ 44px; at 740×360 the inline snapshots work; RUNNING is shown by colour only (colour-only finding).
- clarity of interaction: 5 — the locked steps say what to do, any answer unlocks, feedback explains every option, and TRY AGAIN never re-locks.
- visual consistency and polish: 4 — Control Plane grammar held (plates, mono bars, status words, term cards, one payoff card on blueprint ground); the B6 note lines crowd the canvas edge at 360px.

Acceptance criteria, one by one (finding references are by topic, since IDs are assigned at ingest): ac-01 met · ac-02 not met (ToC finding) · ac-03 met (probe: scrolled back B6/B3/A2/A1, and the aria-labels and drawings match the forward pass) · ac-04 met · ac-05 met (B4 locked until k-02, B5/B6 until k-03; "still machine 03" line; no minutes) · ac-06 met as worded, but C4's state is impossible (blocking C4 finding) · ac-07 met except colour-only RUNNING under 440px and no-JS step text · ac-08 partly (f-02 not drawn by renderFleet) · ac-09 met · ac-10 met · ac-11 met · ac-12 met · ac-13 met (CNCF wording nit) · ac-14 met · ac-15 met · ac-16 not met for k-08 · ac-17 met except "the list" · ac-18 met.

Time (information, not a finding). The gate measures 13.1 min of reading. On top of that come nine checks (about 20 s of thinking each, plus about 600 words of feedback when you get some wrong) and about 13 canvas states to look at, roughly 1.5 min. That puts the build at about **17–18 min** against the 15-minute budget. The most expensive parts are §02 (about 1,130 words of steps and k-05, plus four checks: about 6.5 min), §03 (about 530 words plus k-06: about 2.75 min) and §04 (about 2.25 min). Cut-list items 1–4 recover about 1.4 min.

## Findings

### new
severity: blocking
criterion: Accuracy (widget behaviour), ac-06; the fit rule the chapter teaches in k-02
location: w-fleet-scrolly lane C, step C4 (data.js `C4.state`); screenshot run/screenshots/probe/d1280-post-C4.png
evidence: C4's text reads "Two more rounds, the same way: start a v13 copy where there’s room, add its address, stop a v12 copy." The drawing ends with `storefront v13` on machine 02, beside three dispatch copies. Tracing the rounds: after C3, machine 01 has 3 free, machine 02 has 1 free and machine 04 is full. Machine 02 holds sf3 (2 units) plus di1, di2 and di4 (3 units), so it has 1 unit free while its v12 copy is still running. A 2-unit v13 copy can't start there before sf3 stops, which is the stop-first order k-04 just ruled out. Under the stated rule, the only place for rounds 2 and 3 is machine 01. So the last drawing contradicts the rule k-02 taught ("A container has to fit whole on one machine"), and R8 makes this lane the by-hand reference for Ch 6.
expected_fix: Change C4's end state to 01: `sf5`, `sf6`, `pa1` (1 FREE); 02: `di1`, `di2`, `di4` (3 FREE, sf3 stopped and removed); 04 unchanged (full). Update C4's ariaLabel to match ("All three storefront copies are v13, two on machine 01 and one on machine 04 … machine 01, 1 unit free; machine 02, 3 units"). Optionally change the text to "start a v13 copy on machine 01, where there's room".
verdict: contradicted

### new
severity: should
criterion: split attention / text and figure agree (redundancy rule: the step says what changed)
location: w-fleet-scrolly lane C, step C3; screenshot run/screenshots/probe/m360dark-post-C3.png
evidence: C3's text says "the stopped copy’s room on machine 01 is free for the next round". The canvas still draws the stopped `storefront v12` chip in place on machine 01, with the free region reading "1 FREE". The reader is told the room is free, and the drawing shows 1 unit free.
expected_fix: In C3, either remove the stopped chip so machine 01 reads "3 FREE" (C4 already shows 3 FREE there), or keep it one step and change the text to "once the stopped copy is removed, its room on machine 01 is free for the next round". Fix together with the C4 finding above.

### new
severity: should
criterion: cognitive load (story logic); precise language; k-02's premise
location: s-01 Year 2 paragraph and k-01 ("eight machines"); lane A steps A1–A3; k-02 / B4 ("the only one with room"); s-04 ("Sam’s four machines")
evidence: s-01 and k-01 say Fennel runs on "about eight rented machines". A1 asks "Could four do the work?", A2 says "Sam fits the nine containers in by hand", and A3 ends "Fennel pays for eight machines. Sam’s answer to Morgan: ‘The spare room is for when something breaks.’" The page never says whether Sam actually moved everything onto four machines, or what the other four are doing. Saturday and Tuesday then run on just these four. A reader who remembers eight will ask why `orders` can't go to one of the four other paid-for machines, which undercuts B4's "Machine 04 is the only one with room for all of `orders`", the premise of k-02.
expected_fix: Add one sentence to A3 that settles it: Sam moves everything onto these four machines and the other four sit as spares (or are handed back). Then state that only these four are in use on Saturday. For example: "Sam moves everything onto these four; the other four sit empty, ‘just in case’, and Fennel still pays for all eight." This also makes f-01's "plus spare machines" (idle spend) concrete.

### new
severity: should
criterion: check integrity (commit before reveal); handoff "no step gives away a check's answer before it is committed"
location: w-fleet-scrolly lane B step B4, canvas while k-03 is uncommitted; screenshots d1280-post-B4-held.png and m360-commit-k-03.png
evidence: The pills for orders and dispatch are held as "?" until k-03 is committed, but the chips themselves read `orders NEW ADDR` and `dispatch NEW ADDR` (at 360px the dispatch chip shows only "NEW ADDR"). k-03 asks "Can customers place orders now?", and its answer turns on exactly that: the new address isn't known to `storefront`. The status word gives a strong hint and turns the prediction into reading the canvas.
expected_fix: While `hold` applies, draw the re-created chips as RUNNING (or a neutral "STARTED") and switch them to NEW ADDR on commit, as the pills already do. Hold the chip statuses with the same `hold.until: 'k-03'`.

### new
severity: should
criterion: retrieval practice (k-01 should make the reader produce the answer, not recognise it); CURRICULUM §2.11 disclosure
location: s-01, D1 "I didn’t read the last chapter. What happened?", fourth bullet, directly above k-01
evidence: D1's last bullet reads "When a machine dies, the containers on it stop, and they stay stopped until someone starts them on another machine." k-01's key A reads "They stop with the machine, and stay stopped until someone starts each one again on another machine." Any reader who opens D1, which is the point of the jump-ahead convention, sees the answer worded almost the same and placed right above the check.
expected_fix: End D1 on the open question instead of its answer, e.g. "Containers run on a machine. Chapter 2 ended on a question: what happens to them when that machine dies? The check below asks it." Keep the facts in k-01's feedback, which already states them.

### new
severity: should
criterion: ac-16 ("none is the only hedged middle"); brief lesson on "pick the middle" checks
location: s-06, k-08 options
evidence: A: "The same thing under two names…" (one extreme). C: "Rival products for the same job…" (the other extreme). B: "Different jobs, usually used together…" is the only option with a hedge ("usually"), it sits between the two extremes, and it's the longest. That's exactly the gameable pattern the brief warns about from Ch 1 and Ch 2. A reader can get m-02 right without having committed to either half of the misconception.
expected_fix: Make A and C as measured and specific as B, and drop "usually" from B. For example: A "Kubernetes is Docker’s own tool for running its containers on many machines: the same company’s product, one step up." C "Two ways to run containers in production; a team standardises on one, much as it picks one cloud provider." B "Different jobs: Docker’s tools build images and start containers on one machine; Kubernetes decides which of many machines run them." The feedback stays as it is.

### new
severity: should
criterion: engagement where intended (retrieval needs production, not recognition of the text just above)
location: s-03 k-06; s-04 k-07
evidence: k-06's key B ("All of it grows…") restates two things the reader has just read: the f-01 caption "each grows with every new service and machine", and the paragraph above, "toil grows in step with the service it supports". k-07's key C ("…restarting, replacing and reconnecting containers at 3 a.m., with nobody at a keyboard") echoes the prose two blocks up: "At 3 a.m., when a machine dies, it starts the lost containers on other machines and passes on their new addresses, with nobody woken up to do it". It also echoes "with nobody at a keyboard" in the paragraph after TERM 02. Both checks can be passed by matching words.
expected_fix: k-06: cut "and each grows with every new service and machine" from the f-01 caption (the caption then states the manager-desk takeaway only), or move the toil paragraph after k-06 and let k-06's B feedback carry it, as it already does. k-07: reword C in the reader's own terms ("That it keeps working between releases, on Saturday night’s kind of problem as well as release days") and cut "with nobody woken up to do it" from the §04 paragraph. TERM 01's "all the time" already carries the point.

### new
severity: should
criterion: precise language (user's review: a referent the reader has to guess); ac-17
location: s-02 k-04 options A and B; lane C step C3 text
evidence: k-04 A: "…then start three v13 copies and add their addresses to the list." C3: "add its address to the list customers’ traffic goes to". The page hasn't introduced any "list". A2 planted "the settings of the services that call it", and B5/B6 talk about `storefront`’s settings. The reader has to guess what "the list" is, whose it is, and how it relates to those settings.
expected_fix: Introduce it once, in C1's text: "Customers’ traffic goes to the storefront addresses Sam has listed in the settings of the site’s front door." Or use the planted wording throughout: "add its address to the settings that send customers’ traffic to storefront". Use the same phrase in k-04's options and in C3.

### new
severity: should
criterion: ac-02 (Kubernetes not before s-05); CURRICULUM §2.2
location: .d-rail ToC (desktop) and details.d-toc-mobile "Contents" (mobile); probe pg360 TOC text, d1280 screenshots
evidence: From the top of the page, the desktop rail shows "└§ 05 Its name is Kuberne…" and the mobile Contents lists "§ 05 Its name is Kubernetes". So the name, and the fact that a section is about to reveal it, are visible before §01. ac-02 says "Kubernetes doesn't appear before s-05". The page body itself is clean: no Kubernetes before s-05, no orchestration or cluster before s-04 except the fixed title, and no guarded later-ledger term anywhere (scripted check of body text and data.js).
expected_fix: Retitle the s-05 h2 so the name lands in the section, not the ToC, for example "§ 05 Its name" or "§ 05 The name you’ve been waiting for", with the h2 then followed by "…is Kubernetes." Alternatively, ask the user whether the course title makes this moot, and relax ac-02 for the ToC.

### new
severity: should
criterion: ac-07 ("Every status is a word plus colour"); style guide README ("colour is never the only signal")
location: w-fleet-scrolly canvas under about 440px wide; screenshots m360-pre-B3.png, m360dark-post-C3.png
evidence: At 360px, RUNNING containers show only a green lamp (`store-front v12 ■`), and size-1 running chips (`payments`, `dispatch`) show no status at all. The abnormal states still show words (LOST, NEW ADDR, STOPPED). So the lamp is a colour-only signal.
expected_fix: At narrow widths, drop the lamp for RUNNING, so the normal state is unmarked and every abnormal state carries a word. That matches the plan's rule for size-1 chips. Or keep the lamp but add the word where it fits (size-2 and size-3 chips have room for "RUNNING" on their third line).

### new
severity: should
criterion: redundancy (a caption should add what the figure can't)
location: s-06, f-02 figcaption and the two paragraphs after it
evidence: The f-02 direct labels say "builds the image; starts containers on the machine it’s run on" and "decides which machines run each container, and keeps them running". The caption says it again ("Docker’s tools build the image and run containers on the machine they’re used on. An orchestrator such as Kubernetes … decides which machines in the cluster run it, then keeps those containers running."). The next paragraph says it a third time ("Docker’s tools act on the machine they’re run on"; "decides which machines in the cluster run copies of it"), and k-08's B feedback a fourth.
expected_fix: Make the caption the takeaway the drawing can't state, for example: "Fig. 02. The image is the hand-off: the file Riley builds is the same file the cluster runs, whichever tool built it." Keep the paragraphs for the commands and the open standard.

### new
severity: should
criterion: Accuracy; m-03 guard consistent with Ch 4
location: s-04 aside, WHERE THIS ANALOGY BREAKS
evidence: "An orchestrator doesn’t work from one place giving every cue; how its work is split up is the next chapter." In the source (Burns et al., 2016), Kubernetes has a central store behind an API ("Kubernetes picks a middle ground … the centralization makes it easy to enforce common semantics"), and the logic sits in separate components that each watch for changes. Ch 4 will introduce the control plane and API server. A reader told "doesn't work from one place" may then feel contradicted.
expected_fix: "No single part gives every cue: separate parts each watch for one kind of work and act on it. How that work is split up is the next chapter." That's accurate and still guards against m-03.
verdict: misleading-simplification

### new
severity: should
criterion: Accuracy (Kubernetes history)
location: s-05, first history paragraph
evidence: "Google had run its own services in containers, on internal systems it built itself: first one called Borg, and later one called Omega." This suggests Google's services moved onto Omega. The source (the facts.md c-09 source, read from the ACM Queue text) says "Omega, an offspring of Borg, was driven by a desire to improve the software engineering of the Borg ecosystem … Many of Omega’s innovations (including multiple schedulers) have since been folded into Borg." D6 then (rightly) says Google's services ran on Borg as of 2016. The two lines pull against each other.
expected_fix: "Google had run its own services in containers for years, on an internal system called Borg. It later built a second system, Omega, to try out new ideas, many of which went back into Borg." The local-01 paragraph ("Google’s third such system") stays correct.
verdict: misleading-simplification

### new
severity: nit
criterion: Accuracy (dates)
location: s-05, third paragraph ("In 2015, at version 1.0, Google handed it to a newly formed foundation")
evidence: c-10 quotes the announcement: "Alongside 1.0, Google announced that Kubernetes would be donated…". The CNCF's Technical Oversight Committee formally accepted Kubernetes as its first hosted project on 10 March 2016 (https://www.cncf.io/announcements/2016/03/10/cloud-native-computing-foundation-accepts-kubernetes-as-first-hosted-project-technical-oversight-committee-elected/).
expected_fix: "In 2015, at version 1.0, Google announced it would give Kubernetes to a newly formed foundation…". The recap ("now held by a foundation") is fine.
verdict: misleading-simplification

### new
severity: nit
criterion: precise language
location: s-02 k-05 prompt and chore 7
evidence: The prompt says "Here’s everything Sam did between Monday and Tuesday", but chore 7 ("Kept three storefront copies running all week…") is something Sam didn't do, as the reveal itself says ("Sam doesn’t, so Fennel pays all week for Friday’s three"). It's also the only chore the lanes never showed.
expected_fix: Change the prompt to "Here’s everything Sam did, or chose not to do, between Monday and Tuesday", or reword chore 7 as a decision Sam made ("Left three storefront copies running all week, sized for Friday’s dinner rush").

### new
severity: nit
criterion: redundancy
location: s-07, the lead line, the quote and the k-09 prompt
evidence: "After another 3 a.m. page, Sam brings a proposal to the planning meeting." / “We should move to Kubernetes.” / then the check: "At the planning meeting, after another 3 a.m. page, Sam says: “We should move to Kubernetes.”" The same setup appears twice in three lines.
expected_fix: Shorten the k-09 prompt to "What’s the most useful thing Jordan can ask?". The quote sits directly above it (contiguity holds).

### new
severity: nit
criterion: ac-08 (renderFleet shared with f-02)
location: s-06 f-02 (static HTML; page comment "it doesn’t depend on the §02 widget")
evidence: f-02 is hand-written markup with `.cp-machine` / `.cp-ctr`, not drawn by `renderFleet`. The reader can't see the difference. It matters only for the reuse plan (R5, R6: Ch 4 reuses the cluster frame).
expected_fix: Either draw the cluster half with `FleetCanvas.renderFleet` from a static snapshot, or record the deviation in the cut-list so Ch 4 knows the cluster frame is page CSS, not the renderer.

### new
severity: nit
criterion: ac-07 (no-JS: each lane's final state and all step text visible)
location: s-02 `<noscript>` and `[data-step-text]` slots
evidence: All step text lives in data.js, so without JavaScript §02 shows empty step cards and the line "The drawings and step text in this section need JavaScript." That's a deliberate deviation in the mount contract, but it doesn't match ac-07.
expected_fix: Accept the deviation and note it in the cut-list, or render the step text into the HTML at build time and have the widget read it from there.

### new
severity: nit
criterion: visual polish
location: w-fleet-scrolly canvas, step B6 at 360px (m360-post-B6.png) and 1280px (d1280-post-B6.png)
evidence: The two note lines ("storefront → orders: machine 04", "SPREADSHEET · orders: machine 03") sit flush against the canvas's bottom and left edges. Their 3px highlight outlines touch or overlap the canvas border and each other.
expected_fix: Give the notes block `var(--sp-1)` inner padding from the canvas edge and a 4px gap between the two notes; include them in the reserved height.

### new
severity: nit
criterion: precise language
location: s-04, first paragraph
evidence: "It’s software that does the six jobs in Fig. 01 itself." "Itself" can attach to Fig. 01.
expected_fix: "It’s software that does the six jobs in Fig. 01 by itself."
