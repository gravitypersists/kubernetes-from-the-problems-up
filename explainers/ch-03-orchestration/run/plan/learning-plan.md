# Learning plan: Many containers, many machines: the orchestration problem (Ch 3, Kubernetes for Technical Managers)

<!-- Written by the instructional designer. Parsed by scripts/check_plan.py. Revision 1 (handoff 03, d-03). -->

## Shape

A narrative article that follows Fennel into Year 2. **§02 is now scrollytelling, not a widget** (decision d-03, below). It runs as three short lanes, one per stage of Sam's week: Monday's placing, Saturday night's crash and dead machine, and Tuesday's update. In each lane a sticky drawing of four machines changes step by step beside the text, and the reader commits to a choice or prediction at the three moments that matter. After the lanes, a think-then-reveal asks the reader to sort Sam's week into kinds of job, and that is where the six jobs get their names. The rest keeps its order: what each job costs a manager (o-2), the software that does the jobs (orchestrator, cluster), Kubernetes named and placed in history, then Docker placed (o-3), then the conversation.

**The decision: scrollytelling with three committed checks, replacing the hands-on widget.** The rationale, against the user's concern (d-03):
- **What the widget was for.** The handoff-02 widget, w-fleet, had the reader place nine containers with one tap each, restart, move, stop and pass on addresses, across four stepped states. Most of that was *Active* work: tapping a machine nine times teaches the reader how to tap, not what placing costs. The learning was in a few moments: the realisation that a moved container can't be reached until its callers are told, that an update needs an order, and that a dead machine's containers need room somewhere else. Those are Constructive moments (predict, choose). They need a commitment, not a sandbox.
- **What the widget cost.** At its hardest moment w-fleet showed nine chips, four machines, four service pills, a NEXT queue, an action bar, an address button and a spreadsheet counter, plus a lead and an outcome line. That is far more interface than the three ideas it carried, which is the extraneous load the user saw in Ch 2's stepped widget. Its phases also replaced one another in one box, so the reader couldn't scroll back to see what Monday looked like before Saturday. That is the user's other Ch 2 complaint.
- **What scrollytelling does better here.** The topic is a process over time, a week of events, and the curriculum's blueprint for a process is B1, a step-locked canvas. Each step changes one or two things on the drawing and says so in the text next to it. Every earlier state comes back when the reader scrolls back. The three moments that carry the lesson become crisp, separate commitments, two of them binary: where `orders` goes after 03:04 (k-02), whether customers can order once it's running again (k-03), and which order of swapping keeps the site up (k-04).
- **What it does to CURRICULUM §2.1, "pain they feel in the page".** The reader no longer does every job by hand. They make Sam's decisions by hand at the three points where a wrong decision hurts, and they see each consequence immediately on the drawing: orders DOWN, storefront still sending to the dead machine, the site down if you stop first. The tedium of nine placements is gone. The pain the curriculum is after, that this work is relentless and every move creates more work, is carried instead by a visible accumulation: the debrief lists everything Sam did in one week. I judge that trade worthwhile: the reader still commits before seeing outcomes, and the felt surprises are kept (k-03 especially). The brief's o-1 wording, "having done several of them by hand", now means *decided* by hand; see `relaxed` in the report.
- **Rejected:** keeping a reduced widget (for example, re-place `orders` by tapping a machine on the canvas). k-02 does the same with three buttons, works identically by keyboard and on a phone, and doesn't make the canvas interactive. That keeps the canvas a figure and the builder's job simpler. Also rejected: one long scrolly lane for the whole week, which would be 13 steps under a single sticky canvas and too long to hold the reader's place. The three lanes are each 3–6 steps.

**Honest sizing** (CURRICULUM §2.10). Estimated reader time, including thinking and checks. The disclosure notes are optional and not counted; each adds about 0.25 min if opened.

| Part | Minutes |
|---|---|
| hero + s-01 (cast line, k-01, Year 2 scene) | 2.25 |
| s-02 lane A, Monday: could four do it? (3 steps) | 0.75 |
| s-02 lane B, Saturday night (6 steps, k-02, k-03) | 2.0 |
| s-02 lane C, Tuesday's release (5 steps, k-04) | 1.0 |
| s-02 debrief k-05 (sort Sam's week into jobs; think, then reveal) | 0.75 |
| s-03 f-01, two short paragraphs, k-06 | 2.0 |
| s-04 term cards, the conductor aside, k-07 | 1.75 |
| s-05 Kubernetes term card, history | 1.0 |
| s-06 k-08, f-02, three short paragraphs | 1.5 |
| s-07 k-09, recap, bridge | 1.25 |
| **total** | **about 14.25** |

§02 drops from 4.75 min (widget) to 4.5 (lanes plus debrief). The saving is small, because three checks now sit inside it, but the time is now spent on commitments rather than taps, and the estimate is less risky: there's no free interaction to run long. Ch 1 and Ch 2 both overran their plans, so allow for a 15–16 minute build. `cut-list.md` `## If it runs long` items 1–4 recover about 1.4 minutes, and items 1–8 about 2.5, without losing an objective, a lane or m-02.

toc: yes. Seven h2 sections and a 15-minute read, so a rail on desktop and a collapsed "Contents" on mobile, as in Ch 1 and Ch 2.
tokens: user-provided: Control Plane style guide, `design/control-plane/`. Copy `control-plane.css` to `site/assets/tokens.css`; follow README.md, the tokens.json notes and `components/bundle.css`. Copy Ch 2's page skeleton and `assets/page.css` (check classes, `.cp-machine` / `.cp-ctr` / `.cp-img`, `.cp-aside`, `.cp-recap`) and its check script from Ch 2 as last committed (b661656). Ch 2 is being rebuilt in parallel, and nothing here may depend on its new scrollytelling.
mobile: supported. Scrollytelling under 900px: one column, with the canvas sticky at the top (≤ 50vh) and the steps scrolling beneath it. On short viewports (under 560px tall, such as a phone in landscape) the canvas isn't sticky; each step shows its own small snapshot instead (see w-fleet-scrolly `size:`). f-01 becomes stacked cards under 600px; f-02 stacks vertically.

**Course voice (from the style guide):** second person, present tense, sentence-case headings, no exclamation marks, no emoji. Status always travels as a word plus colour (RUNNING, CRASHED, LOST, NEW ADDR, UP, DEGRADED, DOWN, CORRECT, NOT QUITE).

**Vocabulary guard (brief out_of_scope; research notes).** This chapter introduces exactly four terms: *orchestration* / *orchestrator* and *cluster* (s-04), and *Kubernetes* (s-05). The jobs keep plain words: placing, restarting, replacing, connecting, updating, scaling. These never appear in the body: node, pod, replica (say "copy"), scheduler / scheduling, bin packing, pending, requests, limits, desired state, declarative, reconcile, controller, control plane, self-healing, rolling update, Deployment, readiness / liveness / health check or probe, Service (capitalised), load balancer, DNS, ingress, autoscaling. "Service" appears only lowercase, in its plain sense: one part of Fennel's app. The chapter title's "orchestration" is fixed by the curriculum and is the only use before s-04.

**Precise-language rules** (from the user's Ch 2 review; they bind the builder):
- No sentence whose referent the reader has to guess ("That explains the rest").
- No slogan lines ("layers, not rivals"; "Docker made the box…"). Say who does what, on how many machines.
- Never "the picture" or "the figure" without its number. No sentence that sends the reader into a figure to find a label.
- Don't equate two things in one breath. A *service* is a part of Fennel's app. A *copy* of it is a *container*, started from that service's *image*. Use the word that's meant.

**Fiction vs. sourced.** Fennel's four services, their copies and sizes, the machine layout, the 02:51 crash and 03:04 failure, the team-chat message, Morgan's question and storefront v12 → v13 are Fennel fiction (approved, d-04). The page attaches no number to them beyond the drawing's own room units. Sourced mechanisms:
- a moved container is reachable somewhere new, so its callers must be told (c-02);
- the jobs list (c-01);
- manual, repetitive operations work grows with the service and burns people out (c-06);
- typical one-app-per-server utilization (c-04, medium, hedged);
- the definitions of orchestration and cluster (c-07, c-08);
- Kubernetes's history (c-05, c-09, c-10);
- Docker's place (c-11, c-12).

From earlier chapters, by reference: a container dies with its machine (Ch 2 claim 05); a machine pulls an image before starting it (Ch 2 claims 07, 11); drift is unrecorded change (Ch 1 claim 06).

## Ch 2 review lessons

How each lesson from the user's Ch 2 human review is applied here (handoff 03, part 2):

- **Jump-ahead-friendly opening.** Applied in s-01: a one-line cast strip (Sam, Jordan, Morgan, Riley) and a disclosure, "I didn't read the last chapter. What happened?", both placed before k-01 (ac-01).
- **No carousels or stepped panels that hide earlier states.** Applied: the widget's stepped states are replaced by scrolly lanes. Every state comes back when the reader scrolls back, and each lane leaves its final state in place when it ends (ac-03, ac-07). The page has no carousel.
- **Crisp predict checks; two options when the question is binary.** Applied: k-03 and k-04 are two-option predictions, and k-02 is a three-button choice between machines. Each prompt states its question plainly. The other items keep three options because each has two tempting wrong answers (k-08: "same thing" and "rivals" are the two halves of m-02).
- **No split-attention sentences.** Applied as a precise-language rule (## Shape) and in ac-17. f-01 and f-02 captions state takeaways; the prose never points into a figure to find a label.
- **Critical terms get flair.** Applied: a term-card treatment for orchestration / orchestrator, cluster and Kubernetes, specified under ## Figures as `.cp-term` (ac-11, ac-13).
- **Pedantic caveats go in progressive disclosure, or out.** Applied. Every hedge in revision 0 was checked:
  - the utilization source moves to disclosure D5;
  - "not competitors in the usual sense" stays in the text, but the Swarm nuance moves to D8;
  - the 2022 runtime change moves to D7 (it was a main-text sentence);
  - "how much spare room is right" stays as a five-word clause pointing to Ch 5;
  - "if it wasn't there already" (the image download) goes, because in the designed layout `orders`' image really isn't on machine 04, so the plain sentence is exact;
  - "Google practice, not an industry survey" goes as a caveat; attributing the claim to Google's engineers is enough.
- **Analogies must be genuine and not repeat what was just taught.** Applied: A1, the operations manager, is deleted. It re-listed the six jobs in a new costume, which is exactly the repetition the user objected to. It is replaced by A2, a short aside on the word itself (an orchestra's conductor), which is a genuine analogy. It teaches something new: why the word, and its breaks note guards against m-03 and states the "no judgement" property. Only its breaks note carries the lesson, and the aside is three sentences.
- **Precise language.** Applied as rules (## Shape). s-06 is rewritten so the Docker / orchestrator difference is said concretely: one machine vs. many, who builds, who decides where, who keeps things running. k-08's key says the same (ac-14).
- **Optional "we'll learn this later" notes.** Applied as disclosures D2 (what a unit of room is: Ch 5), D3 (what about orders already placed: Ch 2 and Ch 10) and D4 (is that every job: Ch 6, 9, 12).

**Disclosures** (`<details class="d-more">`, collapsed by default, all optional; the target reader needs none of them to follow):
- D1 (s-01) "I didn't read the last chapter. What happened?"
- D2 (s-02, lane A) "What's a unit of room?"
- D3 (s-02, lane B) "What about the orders customers had already placed?"
- D4 (s-02, debrief) "Is that every job?"
- D5 (s-03) "Where does the 12–18% come from?"
- D6 (s-05) "Does Google run on Kubernetes?"
- D7 (s-06) "You may have read 'Kubernetes drops Docker'"
- D8 (s-06) "Didn't Docker make an orchestrator too?"

## Objectives

- o-1: list the coordination jobs that appear once many containers run on many machines (placing, restarting, replacing after a machine dies, connecting, updating without downtime, scaling), having done several of them by hand. — checks: k-01, k-02, k-03, k-04, k-05
- o-2: explain how each job shows up as a business symptom a manager sees (3 a.m. pages and on-call burnout, idle spend, risky deploys coordinated in a group chat, a spreadsheet as the source of truth that drifts). — checks: k-06, k-09
- o-3: explain what an orchestrator is (software that does those jobs continuously, across a group of machines treated as one: a cluster), name Kubernetes as one, place it briefly in history, and say how Docker relates to it (m-02). — checks: k-07, k-08, k-09

k-01 is the retrieval opener (Ch 2's m-23). k-02 to k-04 are the decisions the reader makes for Sam, and k-05 names the jobs. k-09 interleaves: its distractors carry local-01 (s-05) and a planning question that skips the decision.

## Diagnosis

- **Readiness:** novice for infrastructure, intermediate for software. From Ch 1 and Ch 2 the reader has these chunks: an app is a process on a machine; hand-kept records drift; an image packages a service with what it needs; a container is a running copy of an image, on one machine; a registry holds images; containers die with their machine until someone starts them elsewhere (m-23).
- **Hardest moment, re-checked:** lane B after 03:04. Revision 0 asked the reader to hold three things at once: the lost containers, room on the survivors, and new addresses. The lanes now separate them into consecutive steps:
  - **B3:** machine 03 is down, and its two containers are LOST. That's one new element, with the service pills turning it into "customers can't place orders".
  - **B4 (k-02):** where can `orders` go? The free room on each machine is printed on the canvas and on k-02's buttons, so the reader compares numbers already on screen. That's one new element.
  - **B5 (k-03):** once `orders` runs on machine 04, can customers order? This is the connecting idea, planted in lane A step A2 (Sam writes each container's machine into its callers' settings) and now applied. That's one new element.
  
  At most two new elements are live at any step, against the novice limit of 3, and everything the reader must compare is visible on the canvas.
- **Second-hardest:** s-06, Docker's place. The reader holds Docker on one machine (Ch 2), the orchestrator across many (s-04), and the image passing between them. k-08 makes the reader commit first; f-02 then shows the two side by side, drawn in Ch 2's style.
- **Misconceptions confronted** (catalog IDs; local IDs proposed in ## Curriculum recommendations):
  - **m-23, retrieved** (Ch 2's): k-01 option B, with "half right" feedback.
  - **m-02, owned here:** k-08 (predict), f-02 and the s-06 prose, plus k-07 option A ("it builds the images too").
  - **local-03** ("an orchestrator is a fancier deploy script"): k-07, and the term card's "all the time".
  - **local-01** ("Kubernetes is Borg, open-sourced", and "Google runs on it"): s-05 prose, D6 and k-09 option B.
  - **local-02** ("enough free room in total means it fits"): still designed out. The layout gives no fits-nowhere moment, and it is recommended to Ch 5.
  - **"Running means working"** (precursor of m-15, Ch 12): k-03's option A, met here as an event, not catalogued.
  - **m-03 guard:** A2's breaks note.
- **Retrieval opener:** k-01, Ch 2's closing question in Year 2 form (CURRICULUM §2.8).
- **Analogy:** A2, an orchestra's conductor (s-04), with a visible "Where this analogy breaks" line in the same aside.

## Segments

### s-01 — Year 2: eight machines and a spreadsheet
intent: Re-establish the cast for readers jumping in, retrieve Ch 2's open question (what happens when the machine dies), then set Year 2's scene as a manager sees it, before any new idea.
objectives: o-1, o-2
claims: none from this run's facts; Ch 2 claims 05, 07 and 11 by reference (k-01 and D1). The scene is Fennel fiction.
readiness: novice · interactivity: low (the cast, the Ch 2 answer, four symptoms) · max-elements: 3
mode: orientation (cast strip, optional recap) → retrieval (choice) → concrete story (pain seen in meetings) · blueprint: none
layout:
  contiguity: adjacent. The cast strip and D1 sit at the top of §01, then k-01, then the scene. The scene's first line follows k-01's reveal ("At Fennel, that someone is Sam.").
  pacing: continuous
  redundancy: D1 summarises Ch 1 and Ch 2 in four short bullets and doesn't re-teach them. k-01's feedback names the Ch 2 idea once.
  scaffold: D1, collapsed: "I didn't read the last chapter. What happened?"
ux: Glance at the cast strip; optionally open D1; commit to k-01; read about three short paragraphs. At 360px the cast strip wraps to two lines, and the options are full width.
figure: none
widget: none
checks: k-01
content: these points, in order:
  - **Cast strip** (a compact mono-labelled list, not a figure): "**Sam**, founding engineer; built Fennel's first server and is on call for everything. **Jordan**, co-founder, now managing the engineers: that's you, in this story. **Morgan**, co-founder, runs the money. **Riley**, engineer since Year 1." Use they/them throughout.
  - **D1, "I didn't read the last chapter. What happened?"** Four bullets:
    - Ch 1: Fennel ran on one server Sam built by hand. When its disk filled during a Friday dinner rush, the site was down for two hours, and rebuilding the server from Sam's notes failed, because things had been added by hand and never written down.
    - Ch 2: Fennel now packs each piece of its software, with everything it needs to run, into an *image*.
    - A running copy of an image is a *container*. Many containers can share one machine.
    - When a machine dies, the containers on it stop, and stay stopped until someone starts them on another machine.
  - k-01.
  - **Year 2.** Fennel's one app is now four services: `storefront` (the site and app customers use), `orders`, `payments` and `dispatch` (which assigns drivers). Each service runs as one or more copies, and each copy is a container started from that service's image. Together they run on about eight rented machines. A spreadsheet Sam keeps says which container runs on which machine.
  - **What Jordan sees**, as events: Sam was paged at 3 a.m. twice this month; release days start with Sam's message in the team chat, "Nobody deploy anything, I'm updating storefront"; the spreadsheet was wrong the last time it mattered; and Morgan, reading the bill, asks why Fennel pays for eight machines when half of them look mostly idle.
  - **Hand-off:** "Here is one week of Sam's job, step by step."
  - No number for pages, hours or utilization.

### s-02 — One week of Sam's job
intent: Show Sam's week in three stages the reader can scroll back through (placing; a crash and a dead machine; an update without downtime). Have the reader make Sam's three key decisions and see each consequence, then sort the week into kinds of job, so the six jobs are named after the reader has met them.
objectives: o-1
claims: c-01, c-02, c-08, c-06; Ch 2 claims 05 and 07 by reference (a container dies with its machine; a machine pulls an image before starting it)
readiness: novice · interactivity: high (free room vs. container size; a dead machine's containers; a moved container's new address; the order of an update) · max-elements: 3
mode: step-locked worked example (scrollytelling) with three committed choices or predictions at the transitions, then a generative debrief (think, then reveal) · blueprint: B1
layout:
  contiguity: sticky. The canvas stays in view while its lane's steps scroll beside it on desktop, or beneath it on mobile. Every number the reader needs (free room per machine, a container's size, a service's copies and status) is printed on the canvas, and k-02's buttons repeat the free room they offer.
  pacing: step-revealed by scrolling. Outcome steps are gated: B5 on k-02, B6 on k-03, C3 on k-04. A gated step shows "Answer the question above to see what happens" until the reader commits.
  redundancy: step text says what changed and why it matters, and doesn't describe what the canvas plainly shows. One or two sentences per step. No lead-in prose before lane A beyond the hand-off line.
  scaffold: D2 in lane A ("What's a unit of room?"), D3 in lane B ("What about the orders customers had already placed?"), D4 in the debrief ("Is that every job?"), each collapsed
ux: Scroll. Each step changes one or two things on the drawing, highlighted for 300ms and named in the step text. Commit to k-02 (three machine buttons), k-03 (two options) and k-04 (two options) in the text column; each unlocks the next step. After lane C, commit mentally to k-05 and reveal. At 360px the canvas is sticky at the top (≤ 50vh) and the steps scroll beneath it; on short viewports each step shows its own snapshot. No horizontal scroll.
figure: none (the scrolly canvas is the figure)
widget: w-fleet-scrolly (complexity: high) — three scrollytelling lanes over one data-driven drawing of four machines, with gated steps after k-02, k-03 and k-04
checks: k-02, k-03, k-04, k-05
content: the three lanes and their steps are specified under ## Widgets (w-fleet-scrolly `shows:`). After lane C comes k-05 (a page-level think-then-reveal, not part of the canvas), then D4. The section ends there.

### s-03 — What the jobs cost
intent: Connect each job to the symptom a manager actually sees (pages and burnout, idle spend, release-day coordination, the drifting spreadsheet), and show that the work grows with every service.
objectives: o-2
claims: c-02, c-04, c-06; Ch 1 claim 06 by reference (drift)
readiness: novice · interactivity: low (each row pairs one job with one symptom) · max-elements: 3
mode: labelled table (figure) → two short explanations → apply check · blueprint: none
layout:
  contiguity: inline. Each symptom sits on its job's row in f-01, and the job names match k-05's reveal exactly.
  pacing: continuous
  redundancy: the prose adds what f-01 can't (why the idle room exists; why the work grows) and doesn't re-read the table
  scaffold: D5, collapsed: "Where does the 12–18% come from?"
ux: Read f-01, two short paragraphs and a bridge question, then commit to k-06. At 360px f-01 becomes stacked cards.
figure: f-01, six jobs and what a manager sees. See ## Figures.
widget: none
checks: k-06
content: these points, in order:
  - One lead sentence: each job in Sam's week shows up somewhere Jordan can see it.
  - f-01.
  - **Idle machines, honestly** (x-02, c-04). By hand, people keep room free "to be safe" and keep spare machines, because moving things later is slow and risky. Some of that room is insurance: on Saturday it was where `orders` went. How much is right is a Chapter 5 question. One industry estimate put the typical one-app-per-server machine at only 12–18% busy. D5 holds the detail: a 2014 estimate by the NRDC, quoted by the US EPA's ENERGY STAR programme, for US corporate data centres, one app per server, not container fleets. Never give Fennel a percentage.
  - **Work that grows with the service** (c-06). Google's site reliability engineers call manual, repetitive operations work that could be automated *toil*. It grows in step with the service; too much of it burns people out; and they aim to keep it under half of each engineer's time.
  - **The spreadsheet** (c-02, Ch 1 claim 06). It's Sam's server notes from Ch 1 again. A hand-kept record of a system that changes every time something fails falls behind, and on Saturday at 3 a.m. it did: it still says `orders` is on machine 03. Bridge, as a question only: "What if the record were the thing the machines act on, instead of a note about them? Hold that thought for the next chapter." (Not "desired state".)
  - k-06.

### s-04 — Software that does the jobs
intent: Name what the reader now wants (software that does the six jobs, all the time, across machines treated as one pool) as orchestration, an orchestrator and a cluster, defined by what it does, not how, with each term given a term card.
objectives: o-3
claims: c-07, c-01, c-08
readiness: novice · interactivity: medium (the jobs as one chunk; all the time, not once per release; the machines as one pool) · max-elements: 3
mode: name-after-meeting (term cards) → analogy on the word, with its breaks note → apply check (misconception local-03) · blueprint: none
layout:
  contiguity: adjacent. Each term's card sits directly after the sentence that first uses it, and that first use is a `dfn` linked to the card.
  pacing: continuous
  redundancy: don't re-list the six jobs; say "the six jobs" and refer to f-01 by number
  scaffold: A2 in a `.cp-aside` labelled ANALOGY, with its WHERE THIS ANALOGY BREAKS line inside the same aside
ux: Read two short paragraphs, two term cards and one aside, then commit to k-07. At 360px the cards and the aside are full width.
figure: term cards TERM 01 (orchestration / orchestrator) and TERM 02 (cluster). See ## Figures, `.cp-term`.
widget: none
checks: k-07
content: these points, in order:
  - **Turn:** what Sam needs isn't a faster Sam. It's software that does the six jobs.
  - **Orchestration, orchestrator** (c-07, c-01). Doing those jobs automatically, for as long as the containers run, is called orchestration, and software that does it is an orchestrator. It doesn't only act when someone releases: at 3 a.m., when a machine dies, it does the replacing and the connecting itself. **TERM 01** card: "orchestration · orchestrator. Doing the six jobs automatically, all the time, for as long as the containers run; and the software that does it."
  - **Cluster** (c-08). You give an orchestrator a group of machines, physical or virtual, and tell it how big each container is; it fits the containers onto the machines itself. That group, treated as one pool of room, is a cluster. The four machines in §02 were one. **TERM 02** card: "cluster. A group of machines an orchestrator treats as one pool of room for containers." Say "how big each container is", not "requests".
  - **Defined by what, not how:** one sentence saying that how an orchestrator does all this is the next chapter's subject.
  - **A2, the conductor.** "The word comes from music. A conductor keeps dozens of players starting, stopping and changing together, so the orchestra sounds like one instrument." **Where this analogy breaks:** "A conductor is one person giving every cue from the front, and every player still uses their own judgement. An orchestrator has no single conductor; how its work is split up is the next chapter. And none of it uses judgement: it follows rules, so it will keep restarting an app that's broken."
  - k-07.

### s-05 — Its name is Kubernetes
intent: Pay off the course's promise: name Kubernetes as one orchestrator, after the reader has built the list of jobs it does, with the strongest term treatment on the page, and place it briefly and accurately in history.
objectives: o-3
claims: c-09, c-10, c-05, c-07
readiness: novice · interactivity: low (a name, where it came from, who owns it now) · max-elements: 3
mode: name-after-meeting (payoff term card) → short history with one misconception corrected (local-01) · blueprint: none
layout:
  contiguity: adjacent. The name is in the h2, then the TERM 03 card right after the first sentence.
  pacing: continuous
  redundancy: the card's job strip names the six jobs; the prose doesn't list them again
  scaffold: D6, collapsed: "Does Google run on Kubernetes?"
ux: Read one sentence, the TERM 03 card and about three short paragraphs. No check: these are low-interactivity facts, and k-09 option B retrieves the Borg correction at the end. At 360px the card is full width.
figure: term card TERM 03 (Kubernetes, payoff variant). See ## Figures, `.cp-term`.
widget: none
checks: none
content: these points, in order:
  - **The payoff.** "This is the name the course has been heading for." The orchestrator this course is about is Kubernetes. **TERM 03** card (payoff variant): "Kubernetes. An orchestrator: software that does the six jobs across a cluster, all the time." Under the definition sits the job strip: `placing · restarting · replacing · connecting · updating · scaling`.
  - **Where it came from** (c-09, c-05). Google ran its own services in containers for years, on internal systems called Borg and later Omega. It built Borg partly so different kinds of work could share machines, using more of each machine and cutting costs: Morgan's question, at Google's scale. Paraphrase c-05; don't quote it.
  - **Not Borg, open-sourced** (local-01, c-09). "You'll hear that Kubernetes is Google's Borg, released to the world. It isn't: it was Google's third such system, built new with lessons from the first two, and open source from the start. Borg and Omega stayed inside Google."
  - **Who owns it now** (c-10). Google published it in 2014. At version 1.0, in 2015, Google handed it to a newly formed foundation, the Cloud Native Computing Foundation, part of the Linux Foundation, so no single company owns it. By 2024 it had tens of thousands of contributors from thousands of companies.
  - **D6, "Does Google run on Kubernetes?"** "Google's own services ran on Borg, at least as of 2016, when its designers last wrote about it. Kubernetes was built for everyone else, including Google's cloud customers."
  - **Others exist** (c-07): Docker Swarm and Apache Mesos are other orchestrators; Chapter 14 compares the options. One sentence.
  - **Bridge:** how Kubernetes does the jobs with nobody at a keyboard is the next chapter. First, a name you'll hear alongside it.

### s-06 — Where Docker fits
intent: Deliver Ch 2's promise to place Docker. Confront m-02 (same thing, or rivals) by saying concretely what each does: Docker's tools build an image and start containers on the one machine they're run on; an orchestrator decides which machines in a cluster run each container and keeps them running.
objectives: o-3
claims: c-11, c-12, c-10, c-07
readiness: novice · interactivity: medium (Docker on one machine; the orchestrator across many; the image passing between them) · max-elements: 3
mode: predict (pre-question, misconception confrontation m-02) → labelled figure → concrete explanation · blueprint: none
layout:
  contiguity: inline. f-02's two halves are labelled with the prose's exact phrases ("Docker: on one machine", "an orchestrator: across the cluster"). f-02 comes after k-08's reveal.
  pacing: continuous. k-08 comes first.
  redundancy: the prose says what f-02 can't (which commands, what the standard does, when they met) and doesn't walk the arrows
  scaffold: D7 ("You may have read 'Kubernetes drops Docker'") and D8 ("Didn't Docker make an orchestrator too?"), collapsed
ux: Commit to k-08, look at f-02, read three short paragraphs, optionally open D7 or D8. At 360px f-02 stacks vertically and the options stack.
figure: f-02, Docker on one machine, an orchestrator across the cluster. See ## Figures.
widget: none
checks: k-08
content: these points, in order:
  - One line of callback: the last chapter said you'd hear the name Docker, and that this chapter would place it. Then k-08.
  - f-02.
  - **What Docker does** (c-11). "Docker" is a set of tools for building images and running containers. On Riley's laptop, `docker build` makes the `storefront:v13` image, and `docker run` starts a container from it on that laptop. Docker's tools act on the machine they're run on. Don't introduce Docker, Inc.
  - **What the orchestrator does with the result** (c-11, x-05). Riley pushes the image to the registry. From there, an orchestrator such as Kubernetes decides which machines in the cluster run copies of it, starts them, and keeps doing the six jobs for them. Images follow an open standard, so Kubernetes runs an image no matter which tool built it. So the two aren't competitors in the usual sense: most teams use Docker's tools to build images and an orchestrator to run them across their machines.
  - **Where they met** (c-10). Kubernetes was announced in 2014 at DockerCon, Docker's own conference.
  - **D7, "You may have read 'Kubernetes drops Docker'"** (c-12). "Since 2022, Kubernetes no longer uses Docker's own software to start containers on its machines; it uses other software that does the same job. Images built with Docker run exactly as before." Never write CRI, containerd or dockershim.
  - **D8, "Didn't Docker make an orchestrator too?"** (c-07). "Yes: Docker Swarm, which did compete with Kubernetes at the orchestrator's job. That's the one place they were rivals."

### s-07 — The conversation
intent: Rehearse the chapter's discussion move. Answer "We should move to Kubernetes" with the question that ties the platform to the jobs that hurt, then recap and point to Ch 4.
objectives: o-2, o-3
claims: c-09, c-11
readiness: novice · interactivity: low · max-elements: 3
mode: apply (choose the response; interleaved distractors) → recap → bridge · blueprint: none
layout:
  contiguity: adjacent. Sam's line is a quoted line directly above k-09.
  pacing: continuous
  redundancy: the recap is three lines and doesn't re-explain
  scaffold: none
ux: One check, a three-line recap, a closing line. At 360px everything stacks.
figure: none
widget: none
checks: k-09
content: these points, in order:
  - Sam's line, after another 3 a.m. page: "We should move to Kubernetes." Then k-09.
  - One sentence after k-09: Chapter 14 is where the cost side of that question gets answered.
  - **Recap**, three lines:
    - "Once many containers run on many machines, someone has to place them, restart and replace them, connect them, update them and scale them. By hand, that someone is Sam, at 3 a.m."
    - "Each job lands on a manager's desk: pages and burnout, idle machines, release days run from the team chat, and a spreadsheet that's always behind."
    - "An orchestrator does those jobs all the time, across a cluster of machines. Kubernetes is one, built from Google's experience and now owned by a foundation. Docker's tools build the images it runs."
  - **Bridge:** "Next: Fennel moves to Kubernetes, the same machine dies at 3 a.m., and nobody wakes up. The next chapter is how."

## Figures

Simple figures are drawn by the page builder as figure plates (Control Plane `Figure` treatment: mono header bar, blueprint ground, direct labels, numbered caption), following ## Visual grammar. Both re-layout under 600px rather than scale. Text is never below 13px.

### f-01 — Six jobs, and what a manager sees (s-03)
- **Model.** A two-column table inside a figure plate, header bar `FIG. 01 · THE JOBS, FROM THE MANAGER'S CHAIR`. Column heads `JOB` and `WHAT A MANAGER SEES`. Job names are k-05's exact words, in mono.
  1. **Placing.** Machines kept half-empty "to be safe", plus spares, because moving things later by hand is slow and risky: idle spend.
  2. **Restarting.** Someone has to notice a crash and act, at any hour: pages.
  3. **Replacing.** A dead machine takes its services down until someone starts them elsewhere: 3 a.m. pages, outages, on-call burnout.
  4. **Connecting.** "It's running, but nothing can reach it" after a move, and a spreadsheet that falls behind.
  5. **Updating.** Release days run by hand from the team chat ("Nobody deploy anything"): slow, risky releases.
  6. **Scaling.** Paying all week for Friday's peak, or scrambling during it.
  
  A final full-width row, set off by a rule: **The spreadsheet.** "Not a job of its own: the hand-kept record of all six, always a little behind, like Sam's server notes in Ch 1."
- **Display.** Direct labels only; no lamps or status colours (these are descriptions, not statuses).
- **Caption (takeaway).** "Fig. 01. Each job Sam did by hand shows up on a manager's desk, and each grows with every new service and machine."
- **Size.** Desktop: `.d-wide`, about 340px tall. Under 600px: six stacked cards (job name as a mono header, symptom below), about 620px tall at 360px.
- **Reuse.** Ch 14 (retrieval: "which of these jobs hurts most?") and Ch 15. Static; not worth parameterising.

### f-02 — Docker on one machine, an orchestrator across the cluster (s-06)
- **Model.** Ch 2's f-01 flow, redrawn and extended to the right. Left to right on desktop:
  1. **On one machine.** A machine frame `MACHINE · RILEY'S LAPTOP` with two `c2` rows, "`docker build` → image `storefront:v13`" and "`docker run` → a container, on this laptop", plus one container chip `storefront:v13` (lamp + RUNNING). Above it, a mono label `DOCKER: ON ONE MACHINE` and the direct label "builds the image; starts containers on the machine it's run on".
  2. **Registry.** An arrow "push" → a `REGISTRY` frame with one image chip `storefront:v13`, labelled "an open standard: any orchestrator can run it".
  3. **Across the cluster.** An arrow "pull" → a `CLUSTER` frame around four small machine frames `01`–`04` holding container chips (`storefront:v13` on three different machines, plus `orders`, `payments`, `dispatch`). Above it, a mono label `AN ORCHESTRATOR (E.G. KUBERNETES): ACROSS THE CLUSTER` and the direct label "decides which machines run each container, and keeps them running". Under the cluster frame, a strip of the six job words in mono, then "all the time". It's a strip of words, not a box or brain above the machines (m-03).
- **Display.** Direct labels, no legend. The two mono labels are the main contrast, at the same weight.
- **Caption (takeaway).** "Fig. 02. Docker's tools build the image and run containers on the machine they're used on. An orchestrator such as Kubernetes takes that image from the registry and decides which machines in the cluster run it, then keeps those containers running."
- **Size.** Desktop `.d-wide` (≤ 960px), about 360px tall. Under 600px it stacks vertically: laptop frame → "push ↓" → registry → "pull ↓" → cluster (machines 2×2) → job strip (wrapping). About 760px tall at 360px.
- **Build as HTML/CSS**, using the same machine/chip renderer as w-fleet-scrolly (`renderFleet`, see ## Widgets), plus Ch 2's registry markup and a `.cp-cluster` frame.
- **Reuse.** Ch 4 (the cluster frame is where the control plane and nodes get named) and Ch 14. Static.

### Term cards — `.cp-term` (s-04, s-05)
The "flair" for critical terms, beyond a plain `dfn`, within the style guide:
- **Treatment.** An outlined plate: `ink` stroke at `--stroke`, `surface` ground, `radius-1`, no shadow (it isn't interactive), measure width, `sp-6` above and below.
  - Top line: a mono kicker in `accent`, `NEW TERM · 01 / 03`. This is the plate's one accent mark.
  - The term set large in the heading face (Archivo, `font-stretch: 112%`, about 32px desktop / 28px mobile, tight leading). Two terms in one card are separated by a mono `·`.
  - One definition sentence in the body serif.
  - Under it, a mono `ink-3` line pointing back to where the reader met the thing: "You met it in §02: Sam's week."
- **The prose's first use** of each term is a `dfn` with `id` and `aria-describedby` pointing to its card, so the term and its card are announced together.
- **Payoff variant (TERM 03, Kubernetes).** The same plate on blueprint ground (`.cp-blueprint`), the term about 40px desktop / 32px mobile, and the six-job strip in mono under the definition. It is the only term card on blueprint ground, which marks it as the chapter's arrival.
- **No animation.** A static plate needs no replay (I4).
- **Reuse.** Course-wide (R14): Ch 2's rebuild needs the same thing for "immutable" and "stateless".

## Visual grammar

This extends Ch 1's and Ch 2's grammar (CURRICULUM §5 Visuals column), which is unchanged:
- machine = an outlined frame with a mono `MACHINE · NAME` bar;
- container = Ch 2's chip: `c1` stroke on `c1-soft`, mono label, with a status;
- registry = a `REGISTRY` frame with image chips;
- unused or unknown room in `c6` dashed;
- status as word plus colour.

New in Ch 3 (proposed for the Visuals column, R5):
- **Container size.** Chip height is proportional to size in room units: 1 unit = 40px on desktop and 28px under 600px (4px gaps). The canvas isn't interactive, so the 44px touch rule doesn't apply. All chips stay `c1`; services are told apart by label.
- **Machine room.** A machine's body is fixed at `capacity` units. Unused room is one dashed `c6` region labelled `N FREE`.
- **Machine down.** A dashed `ink-3` frame with the bar reading `DOWN` in `bad`; its chips stay in place at reduced opacity, marked `LOST`.
- **Container status words:** RUNNING (`good`), CRASHED (`bad`), LOST (`bad`), NEW ADDR (`warn`: running, but its callers don't know where yet), STOPPED (ink-3, shown for one step, then removed).
- **Service status:** one pill per service, `orders 1 · UP`, with UP (`good`), DEGRADED (`warn`), DOWN (`bad`).
- **Step highlight:** what changed in a step gets a 3px ink outline for that step only.
- **Cluster:** a frame at 3px `ink` stroke around machine frames, with a mono `CLUSTER` bar (f-02).
- **Term card:** `.cp-term` (## Figures).

## Widgets

### w-fleet-scrolly
segment: s-02
complexity: high
blueprint: B1 (step-locked canvas, scrollytelling), three lanes, three gated steps
model: A drawing of machines holding containers, rendered from a **state snapshot** for each step. Each step's state is complete (not a diff), so scrolling back or forward to any step shows exactly that state. A container occupies `size` room units on exactly one machine (c-08: fit containers onto machines by size; Ch 2 claim 05: a container runs on one machine). A container started somewhere new is NEW ADDR until its callers are told (c-02). A service is UP if all its copies are RUNNING, DEGRADED if some are, DOWN if none are; the pills are computed from the snapshot, not hand-written. All data and every reader-visible word live in `data.js`; `renderFleet(el, state)` draws one snapshot and is shared with f-02.
  - **Machines:** `01`–`04`, capacity 6 units each.
  - **Services** (size · copies · version shown): `storefront` 2 · 3 · v12, then v13; `orders` 3 · 1; `payments` 1 · 2; `dispatch` 1 · 3. Nine containers, 14 of 24 units.
  - **Monday layout** (fixed, so the story is the same for every reader):
    - 01: storefront v12, storefront v12, payments (5 used, 1 FREE);
    - 02: storefront v12, dispatch, dispatch (4 used, 2 FREE);
    - 03: orders, dispatch (4 used, 2 FREE);
    - 04: payments (1 used, 5 FREE).
  - **Why this layout:** after machine 03 dies, only machine 04 has room for `orders` (needs 3; 01 has 1 free, 02 has 2), so k-02 has one right answer whose reason is printed on the canvas. Machine 04 holds no `orders` image, so "pulled onto machine 04" is exact. On Tuesday the free room is 01: 1, 02: 1, 04: 2, so there's room for exactly one extra storefront copy, which makes k-04's question real. No step has a fits-nowhere moment (local-02 stays in Ch 5).
reader_does: Scrolls through three lanes. In lane B, commits to k-02 (three machine buttons, each labelled with its free room) and k-03 (two options). In lane C, commits to k-04 (two options). Each commit unlocks the gated step after it, whose canvas state shows the outcome. Any option unlocks it, and the check's feedback explains a wrong pick. The canvas itself has no controls.
shows: Each step's canvas state, what changes, and its text (draft wording; one or two sentences each). Canvas header: `W-01 · ONE WEEK, BY HAND`, plus the lane name (`MONDAY` / `SATURDAY NIGHT` / `TUESDAY`) and the step counter (`STEP 2 / 6`).
  - **Lane A, "Monday: could four do it?"**
    - **A1.** Four empty machines, `6 FREE` each. Text: "Morgan's question: Fennel pays for eight machines, and half look mostly idle. Could four do the work? Each of these machines has six units of room. Each container takes one to three, depending on how much memory and processor time it needs." D2 sits under this step: "What's a unit of room? Real machines run out of memory and processor time separately; here they're one number to keep the picture simple. Chapter 5 counts them properly."
    - **A2.** All nine containers in the Monday layout, each outlined as it appears. Text: "Sam fits them in by hand: each container needs one machine with enough room for all of it. Then Sam writes each container's machine into the spreadsheet, and into the settings of the services that call it, so `storefront` knows where to send orders." This plants connecting.
    - **A3.** The same layout; the service pills appear, all UP; the free regions are emphasised (`1 FREE`, `2 FREE`, `2 FREE`, `5 FREE`). Text: "Nine containers fit on four machines, with 10 of 24 units still free. Fennel pays for eight. Sam's answer to Morgan: 'The spare room is for when something breaks.'"
  - **Lane B, "Saturday night"** (starts from A3)
    - **B1, 02:51.** The `dispatch` chip on 02 turns CRASHED; the dispatch pill reads `2 · DEGRADED`. Text: "Sam's phone buzzes: a `dispatch` copy on machine 02 has crashed. The machine itself is fine."
    - **B2.** The chip is RUNNING again, on the same machine; the pills are all UP. Text: "Sam restarts it where it was. Nothing else has to change. Back to bed."
    - **B3, 03:04.** Machine 03 is DOWN; its `orders` and `dispatch` chips read LOST; the pills read `orders 0 · DOWN` and `dispatch 2 · DEGRADED`. Text: "Machine 03 stops answering. Customers can't place orders, and nothing will change until Sam does something." Then k-02.
    - **B4 (gated on k-02).** `orders` on 04 and the lost `dispatch` on 02, both NEW ADDR; machine 04 reads `2 FREE`, and 02 reads `1 FREE`. Text: "Machine 04 is the only one with room for all of `orders`. Sam pulls its image onto 04 and starts it there, and puts the lost `dispatch` copy on 02." D3 sits under this step: "What about the orders customers had already placed? Chapter 2 showed that the data a container writes is kept outside it. Where Fennel keeps it, and how it's protected when a machine dies, is Chapter 10." Then k-03.
    - **B5 (gated on k-03).** The same state; the orders pill still reads `0 · DOWN` (NEW ADDR chips aren't serving); a mono line on the canvas under machine 03's frame reads "storefront → orders: still machine 03". Text: "Not yet. `storefront`'s settings still say machine 03, so checkout still fails."
    - **B6.** Both chips RUNNING; the pills all UP; the canvas line now reads "storefront → orders: machine 04"; a muted note under the canvas reads "SPREADSHEET · orders: machine 03" (stale). Text: "Sam passes on the new addresses, and customers can order again. The spare room on machine 04 is what made space for `orders`. Sam leaves the spreadsheet for the morning; it still says machine 03."
  - **Lane C, "Tuesday's release"** (starts from B6, with machine 03 still DOWN)
    - **C1.** The three `storefront v12` chips are outlined; the free regions read 01 `1 FREE`, 02 `1 FREE`, 04 `2 FREE`. Text: "storefront v13 is ready. Sam posts in the team chat: 'Nobody deploy anything, I'm updating storefront.' Three v12 copies have to become v13 without the site going down, and there's room for one extra copy, on machine 04." Then k-04.
    - **C2 (gated on k-04).** The contrast case, shown as what would have happened: all three storefront chips STOPPED; the pill reads `storefront 0 · DOWN`. Text: "Stop all three first, and the site doesn't load until the new copies are started and their addresses passed on."
    - **C3.** Back to C1's state, then round 1: `storefront v13` on 04 (NEW ADDR, then RUNNING), and one v12 on 01 STOPPED; the pill reads `storefront 3 · UP` throughout. Text: "Sam's way: start one v13 copy on machine 04, add its address to the list customers' traffic goes to, then stop one v12 copy. The stopped copy frees room on machine 01."
    - **C4.** Rounds 2 and 3 in one step, ending at 01: storefront v13 + payments; 02: storefront v13 + dispatch ×3; 04: orders + payments + storefront v13. The pill reads `storefront 3 · UP`. Text: "Two more rounds, the same way. The site never went down. It took Sam the evening, and nobody else shipped anything until it was done."
  - **Every step:**
    - the changed elements get the step highlight (3px outline) for that step only;
    - the canvas `aria-label` is set to the step's state summary, a string in `data.js` (e.g. "Machine 03 down. orders and one dispatch copy lost. orders down; dispatch degraded.");
    - the step text carries the meaning on its own, so a screen-reader user reading the text column misses nothing.
size: **Desktop (≥ 900px):** each lane is a two-column grid inside `.d-wide`: the canvas column on the left (about 55%), the step column on the right (about 45%), following the user's Ch 2 layout (machines left, description right).
  - The canvas is sticky at `top: var(--sp-4)` for the length of its lane, about 420px tall: lane header 32px; four machine columns of about 120px with a 32px bar and a body of 6 × 40px + 5 × 4px = 260px; the free label; the service pills in one row; the connection line.
  - Steps are cards spaced so only one is in the activation band at a time (each card at least 40vh tall, padding included).
  - A step becomes active when its card's top crosses 55% of the viewport height (IntersectionObserver). Scrolling back re-activates earlier steps, and their snapshots are restored exactly.
  - At the end of a lane the canvas un-sticks and scrolls away showing that lane's final state, so the page reads as a sequence of three drawings when skimmed.
  
  **600–899px and phones:** one column. The canvas is sticky at the top, at most 50vh tall; steps scroll beneath it as opaque `surface` cards with a top margin so the active one sits just below the canvas.
  - **At 360px:** four machine columns of about 75px; bar on two lines (`MACHINE` / `03 · DOWN`); body 6 × 28px + 5 × 4px = 188px; pills in a 2×2 grid. The canvas is about 316px, under 50vh on a 667px-tall phone.
  - Chip labels must fit about 68px at 13px mono. `payments` and `dispatch` fit; `storefront` breaks as `store-` / `front` on its two-unit chip, with `v12` on a third line. A size-1 chip in an abnormal state shows its status word (CRASHED, LOST, NEW ADDR) in place of its label, since the adjacent step text names the service.
  - **Short viewports (height < 560px, e.g. a phone in landscape):** the canvas isn't sticky. Each step card shows its own inline snapshot above its text, from the same `renderFleet`.
  
  **Gated steps:** the step card after k-02, k-03 or k-04 reserves its height and shows one locked line, "Answer the question above to see what happens", until the reader commits. The canvas stays on the previous state until then. On commit, the card's content fades in (`dur-2`), and the canvas takes the step's state when it is active.
  
  **Motion:** changes animate over `dur-3` (about 300ms; flair-length, so no replay control is needed, I4); `prefers-reduced-motion` makes them instant. Nothing autoplays.
  
  **No-JS:** each lane renders its final snapshot statically, and all step text is visible.
  
  No horizontal scroll at 360px; text ≥ 13px; check buttons ≥ 44px.
acceptance: ac-03, ac-04, ac-05, ac-06, ac-07, ac-08
reuse: **Decision: no hands-on widget. Build a data-driven scrolly canvas that reuses Ch 2's f-01 visuals (container chip, machine frame).** Copy `.cp-machine`, `.cp-machine__bar`, `.cp-machine__body`, `.cp-ctr`, `.cp-chips` and the `st` / lamp classes from Ch 2's `site/assets/page.css` (commit b661656), and the `chip()` / `renderMachine()` pattern from its `site/assets/page.js`, into this run's `site/widgets/w-fleet-scrolly/` (scoped) and `site/assets/` (for f-02). Add chip height by size, the dashed free region, the down machine, the new status words, the service pills and the connection line. Never edit Ch 2's files.
  - **Files:** `data.js` (`FLEET_LANES`: lanes → steps → `{ state, text, ariaLabel, gate?: 'k-02', highlight: [...] }`, plus machines and services), `index.js` (`renderFleet(el, state)`, the pill and status computation, and the scrolly controller with sticky handling, activation, gates and the short-viewport fallback), `index.css`. k-02, k-03 and k-04 are page-level `.cp-check` cards placed by the page builder in the step column. The scrolly controller listens for their commit event (`didactician:check-commit` with the check id) to unlock gates.
  - **Later chapters** (from their CURRICULUM entries). What changes now that there's no engine: what's reusable is the **snapshot format, `renderFleet` and the lane controller**, not interactive actions.
    - **Ch 4 (self-healing):** the same Monday layout and 03:04 failure as a lane in which the system does B4–B6 itself, with a predict before. Ch 4 may want an interactive "kill a machine" moment; if so it builds a small widget on `renderFleet`. Reuse: snapshot data plus renderer, high value, costs nothing now.
    - **Ch 5 (scheduling, requests, pending, bin packing):** bin packing is system dynamics, so Ch 5 is the chapter that may justify a real sandbox (B2). It would add a WAITING state, per-service sizes and cost, and its own action engine on top of `renderFleet`. Not designed for now: the snapshot format leaves room for `status: 'waiting'` and `machine: null`, and that's all.
    - **Ch 6 (rolling update):** lane C is the by-hand version. Ch 6's step-locked rollout (B1) can reuse the lane controller and add a per-version "healthy" flag. Reuse: high.
    - **Ch 7 (services):** the connection line and NEW ADDR are the hand-written address list Ch 7 automates. Reuse: the snapshot fields, low cost.
    - **Ch 8 (scaling):** needs a time axis (a traffic curve), which a scrolly lane doesn't give. Probably its own widget; it can still draw machines with `renderFleet`. Reuse: renderer only.
    - **Ch 15:** short scripted lanes.
  - **Worth designing now:** the snapshot format, the renderer and the lane controller, all needed here anyway. Not worth designing now: any action engine or mode switch.
  - **Reader-visible complexity added for reuse:** none.

## Comprehension items

### k-01
segment: s-01
objective: o-1
type: retrieve
prompt: Last chapter ended on a question. A year later, Fennel runs its containers on eight machines. At 3 a.m. one of those machines dies for good. What happens to the containers that were running on it?
options: A) They stop with the machine, and stay stopped until someone starts each one again on another machine. · B) They start again on one of the other seven machines within seconds, since each can be re-created from its image. · C) They carry on running, because each container is walled off from the machine underneath it. (correct: A; tempting: B, m-23)
feedback: A: "Right. A container runs on one machine, so it stops with that machine. Nothing in an image or a container notices, picks another machine and starts it there. Someone has to." B: "Half right. Starting a container from its image is quick once the new machine has downloaded that image. But nothing in an image or a container notices the machine died, picks another one and starts them there. Someone has to." C: "The walls are between containers, not between a container and its machine. When the machine goes, so does everything running on it." All three end with the same line: "At Fennel, that someone is Sam."

### k-02
segment: s-02
objective: o-1
type: apply
prompt: Machine 03 is gone, and `orders` needs 3 units of room. Where would you put it now?
options: A) Machine 01, 1 unit free · B) Machine 02, 2 units free · C) Machine 04, 5 units free (correct: C; each button shows the machine number and its free room)
feedback: A: "Machine 01 has 1 unit free, and orders needs 3, all on one machine. It can't be split across machines." B: "Machine 02 has 2 units free, one short. A container has to fit whole on one machine." C: "Right. Machine 04 is the only one with room for all of orders. That's the spare room Sam kept 'for when something breaks'."

### k-03
segment: s-02
objective: o-1
type: predict
prompt: `orders` is running again, on machine 04. Can customers place orders now?
options: A) Yes: orders is running again, so checkout works as it did before 03:04. · B) Not yet: storefront still sends orders to machine 03, where nothing is running. (correct: B; tempting: A, "running means working")
feedback: A: "It's running, but storefront can't find it. On Monday, Sam wrote 'machine 03' into storefront's settings, and nothing has changed them since. A container that moves is at a new address, and everything that calls it has to be told." B: "Right. On Monday, Sam wrote 'machine 03' into storefront's settings. Until someone passes on the new address, checkout keeps failing, with orders running the whole time."

### k-04
segment: s-02
objective: o-1
type: predict
prompt: There's room for only one extra storefront copy. Which order of steps keeps the site up while all three copies become v13?
options: A) Stop the three v12 copies, then start three v13 copies and add their addresses to the list. · B) Start one v13 copy and add its address, then stop one v12 copy; repeat three times. (correct: B)
feedback: A: "For a while nothing is serving customers: the old copies are gone and the new ones aren't started or reachable yet. The site doesn't load." B: "Right. Three copies serve customers the whole time. It takes longer, and it needs that one copy's worth of spare room."

### k-05
segment: s-02
objective: o-1
type: explain
prompt: Here's everything Sam did between Monday and Tuesday. How many different kinds of job are in this list, and what would you call each one? Settle on your answer, then show it. (The card lists: 1 · Found a machine with room for each of nine containers. 2 · Wrote each one's machine into the spreadsheet and into the settings of the services that call it. 3 · Restarted the crashed dispatch copy where it was. 4 · Started orders and dispatch on other machines after machine 03 died. 5 · Passed orders' new address to storefront. 6 · Swapped storefront's three copies to v13, one at a time. 7 · Kept three storefront copies running all week, because Friday's dinner rush needs three.)
model_answer: Six kinds of job, in these words (k-05 and f-01 use the same names):
  - **Placing** (1, and part of 4): finding a machine with room for each container.
  - **Restarting** (3): starting a crashed container again where it was.
  - **Replacing** (4): starting a dead machine's containers on other machines.
  - **Connecting** (2, 5): telling everything that calls a container where it is.
  - **Updating** (6): swapping in a new version without downtime.
  - **Scaling** (7): matching the number of copies to demand. Sam doesn't: Fennel pays all week for Friday's three. Doing it by hand would mean adding copies every Friday and removing them after.
  
  Then: "The spreadsheet isn't a job of its own. It's the record of all six, and right now it still says orders is on machine 03."
feedback: Under the reveal, one line: "If your list was shorter, the usual misses are restarting vs. replacing (one stays on its machine, one has to move) and connecting, which came along with every move." Then D4, "Is that every job?": "Real teams add more: noticing a container that's running but stuck, handing each container its settings and passwords, and watching all of it. Chapters 6, 9 and 12 cover those."

### k-06
segment: s-03
objective: o-2
type: apply
prompt: Next month Fennel adds a fifth service, catalog, with two copies. Nothing else changes, and Sam still does every job by hand. What happens to the work in Sam's week?
options: A) Only the release work grows: catalog adds updates to coordinate, but it's placed once, and 3 a.m. replacing is per machine, not per service. · B) All of it grows: more containers to place and to restart or replace at 3 a.m., more addresses to pass on, more spreadsheet rows to keep right. · C) Very little grows: catalog runs in containers, so its image carries all it needs, and the machines don't care how many services there are. (correct: B; tempting: C, m-23 echo)
feedback: A: "Placing isn't once: every failure, move and update places things again. And a dead machine takes down every service on it, so more services means more to re-place each time." B: "Right. Google's site reliability engineers call this kind of work toil: manual, repetitive, and growing in step with the service. They aim to keep it under half of each engineer's time, because too much of it burns people out. Each new service adds to Sam's share." C: "The image makes catalog easy to run on any machine. It doesn't pick the machine, notice when that machine dies, or tell storefront where catalog went. Those are the jobs, and each new service adds to them."

### k-07
segment: s-04
objective: o-3
type: apply
prompt: Riley says: "So an orchestrator is basically a smarter deploy script." What does that leave out?
options: A) That it builds the images too, so the deploy script and the image-building step can both be retired. · B) That it only watches: it pages Sam sooner when a machine dies, while the moving is still done by hand. · C) That it keeps working between releases: restarting, replacing and reconnecting containers at 3 a.m., with nobody at a keyboard. (correct: C; tempting: local-03, which the prompt states)
feedback: A: "An orchestrator runs images; it doesn't build them. Building stays with your build tools; §06 shows which." B: "Watching is part of it, but it does the jobs too: it starts the replacements and passes on the addresses itself." C: "Right. A deploy script runs when someone releases, then stops. Most of Sam's Saturday happened between releases. An orchestrator keeps doing the jobs all the time. How it does that is the next chapter."

### k-08
segment: s-06
objective: o-3
type: predict
prompt: You'll hear "Docker" and "Kubernetes" in the same breath. Before reading on: how do the two relate?
options: A) The same thing under two names: Kubernetes is what Docker grew into once it could run containers on many machines. · B) Different jobs, usually used together: Docker's tools build images and start containers on one machine; Kubernetes runs them across many machines. · C) Rival products for the same job: a team runs its containers on one or the other, much like picking a cloud provider. (correct: B; tempting: A and C, both halves of m-02)
feedback: A: "They're separate projects. Docker appeared in 2013 as a set of tools for building and running containers. Kubernetes came from Google in 2014, to keep containers running across many machines." B: "Right. Docker's tools work on the machine you use them on: build the image, start a container there. Kubernetes decides which of many machines run each container, and keeps them running. Teams usually use both." C: "Most teams use both: Docker's tools to build images, Kubernetes to run them across their machines. Docker did make its own orchestrator, Swarm, and that is where the two competed."

### k-09
segment: s-07
objective: o-3
type: apply
prompt: At the planning meeting, after another 3 a.m. page, Sam says: "We should move to Kubernetes." What's the most useful thing Jordan can ask?
options: A) "Which of these jobs is hurting us most today, and is that worth the cost of the platform?" · B) "Google built it and runs on it. Can we simply copy the way Google sets it up?" · C) "How long would the move take, and can we finish it before the holiday rush?" (correct: A; tempting: B, local-01; C, skips the decision)
feedback: A: "Right. It ties the platform to pain you can name (3 a.m. replacing, idle machines, release days run from the chat) and asks whether fixing that is worth what the platform costs." B: "Kubernetes was Google's third system, built new and open source; Google's own services ran on Borg, at least as of 2016. And Fennel isn't Google: what pays off at Google's size may not at Fennel's." C: "A fair planning question, but it skips the decision. Before 'how long', ask 'what for': which jobs hurt, and is fixing them worth the cost?"

## Acceptance criteria

- ac-01 (s-01): §01 opens with the cast strip (Sam, Jordan, Morgan, Riley, with roles) and D1, "I didn't read the last chapter. What happened?", collapsed by default. Then k-01 comes before any new term. k-01's option B gets "half right" feedback that names the download. The four Year 2 symptoms appear as events Jordan sees, with no number attached.
- ac-02 (page, vocabulary): "orchestration", "orchestrator" and "cluster" don't appear before s-04, except in the fixed chapter title. "Kubernetes" doesn't appear before s-05: not in the standfirst, §02, f-01 or any check before s-05. No guarded later-ledger term appears anywhere. "Service" is only lowercase, and it's "copies", never "replicas".
- ac-03 (w-fleet-scrolly, progression): §02 is three scrolly lanes (Monday, Saturday night, Tuesday) with the steps listed in the widget spec. Scrolling back to any step restores exactly its state. Each lane leaves its final state in view when it ends. There's no carousel, stepper or in-place state replacement outside the scroll.
- ac-04 (lane A): A2 says each container needs one machine with room for all of it, and that Sam writes each container's machine into the spreadsheet and into its callers' settings. A3 shows 10 of 24 units free, contrasts four machines with the eight Fennel pays for, and gives Sam's "for when something breaks". There's no percentage.
- ac-05 (lane B, k-02, k-03): B1–B2 show a restart in place (no NEW ADDR). B3 shows machine 03 DOWN, its chips LOST and `orders` DOWN. k-02 offers three machine buttons labelled with their free room, and only 04 is right. B4 stays locked until k-02 is committed; B5 until k-03 is committed. After B4, `orders` stays DOWN while NEW ADDR, and the canvas shows "storefront → orders: still machine 03". B6 shows all UP after the addresses are passed on, and the stale spreadsheet. No duration in minutes appears.
- ac-06 (lane C, k-04): C1 states that there's room for one extra copy. k-04 has two options. C2, locked until the commit, shows the stop-first contrast as `storefront 0 · DOWN`. C3–C4 show start-then-stop with `storefront 3 · UP` throughout. The words "rolling update" never appear.
- ac-07 (w-fleet-scrolly, layout and access):
  - Desktop (≥ 900px): the canvas is left and sticky, and the steps are right. Under 900px: the canvas is sticky at the top at ≤ 50vh. Under 560px tall: inline snapshots per step.
  - At 360px: no horizontal scroll; four machines side by side; text ≥ 13px; check buttons ≥ 44px.
  - Every status is a word plus colour. The canvas `aria-label` follows the active step, and the step text carries the meaning alone.
  - Transitions are ≤ 300ms and instant under reduced motion; nothing autoplays. Without JS, each lane's final state and all step text are visible.
- ac-08 (w-fleet-scrolly, reuse and grammar): chips and machine frames use Ch 2's `.cp-ctr` / `.cp-machine` grammar, with chip height proportional to size. All snapshots and every reader-visible string live in `data.js`. `renderFleet` is shared with f-02. No reuse-only control is visible.
- ac-09 (s-02, k-05): k-05 sits after lane C and lists Sam's seven chores inside the card. Its prompt states its own question and reuses no option text. The reveal names the six jobs in f-01's words, mapped to the chore numbers, plus the spreadsheet line. D4 names the three missing jobs without later-chapter terms.
- ac-10 (s-03, f-01, k-06): f-01 pairs each of the six jobs with a manager-visible symptom, plus the spreadsheet row. The 12–18% figure appears once, attributed as "one industry estimate", with its source detail only in D5; Fennel gets no percentage. Toil is attributed to Google's site reliability engineers. There's no figure for pages, recovery hours or deploy pain. The spreadsheet paragraph names "machine 03" from §02 and ends on the Ch 4 bridge question. k-06's key is B.
- ac-11 (s-04): TERM 01 (orchestration · orchestrator) and TERM 02 (cluster) render as `.cp-term` cards right after each term's first use, which is a `dfn` linked to its card. Each is defined by what it does. `cluster` points back to "the four machines in §02". No mechanism is explained. A2's aside carries a visible "Where this analogy breaks" line: no single conductor, and no judgement. The six jobs aren't re-listed in prose.
- ac-12 (k-07): the key (C) is about working between releases. A's feedback says an orchestrator doesn't build images.
- ac-13 (s-05): Kubernetes is first named here, with the nod to the course's arc and the TERM 03 payoff card (blueprint ground, job strip). The history covers: Google's third container system after Borg and Omega; built new and open source from the start; published in 2014; given to the CNCF (Linux Foundation) at 1.0 in 2015; tens of thousands of contributors from thousands of companies by 2024. The "Borg, open-sourced" retelling is stated fairly, then corrected. "Google runs on Borg" appears only in D6 and k-09, dated 2016.
- ac-14 (s-06, k-08, f-02): k-08 is committed before f-02 or the prose. The text and f-02 say concretely that Docker's tools build the image and start containers on the machine they're used on, and that an orchestrator decides which machines in the cluster run each container and keeps them running. No slogan line ("layers, not rivals", "made the box"). The text says "not competitors in the usual sense: most teams use both". The Swarm nuance (D8) and the 2022 change (D7) are disclosures only, with no CRI, containerd or dockershim. DockerCon 2014 appears.
- ac-15 (s-07, k-09): k-09's key (A) is the curriculum's question, verbatim. B carries local-01, with the 2016 date. The recap is three lines, and the page ends on the Ch 4 bridge.
- ac-16 (all checks): commit-then-reveal, with feedback explaining every option. Options are similar in length and equally measured; none is the only hedged middle. k-03 and k-04 are binary. Keys vary: A (k-01, k-09), B (k-03, k-04, k-06, k-08), C (k-02, k-07). No scores.
- ac-17 (precise language and accuracy, page-wide):
  - No sentence sends the reader to find a label inside a figure, and figures are referred to by number only.
  - No unreferenced "that" / "the rest" sentence, and no slogan line.
  - "Service", "copy", "container" and "image" are never used interchangeably.
  - Re-creating a container is never called fast without the download.
  - Fennel gets no utilization percentage, and c-05 is paraphrased.
  - "Orchestrator" is never described as one central brain.
- ac-18 (disclosures): D1–D8 exist where listed, are collapsed by default, and are each optional: the main text reads correctly with all of them closed.

## Curriculum recommendations

Recommendations only; CURRICULUM.md is unchanged. R-numbers are kept from revision 0. **Changed** marks a recommendation revised for the scrollytelling design; **new** marks an addition.

- **R1 (§6 catalog), unchanged: add local-01 as m-25, owned by Ch 3, revisited by Ch 14.** "Kubernetes is Google's Borg, open-sourced (and what Google runs on), so it's right for us." Ch 3 corrects the history (s-05, D6, k-09 B); Ch 14 owns the "good enough for Google" leap.
- **R2 (§6 catalog), unchanged: add local-02 as m-26, owned by Ch 5.** "If our machines have enough free room in total, a new or moved container will fit somewhere." Ch 3's layout avoids it on purpose; Ch 5's bin-packing material is where it belongs (research x-01). It sits beside m-07.
- **R3 (§6 catalog), unchanged: add local-03 as m-27, owned by Ch 3, revisited by Ch 4.** "An orchestrator is a fancier deploy script." Ch 3 confronts the *what* (k-07); Ch 4 explains the *how*, which rhymes with m-04.
- **R4 (§3 Fennel, after build), changed (adds the fixed layout).** The approved facts (d-04) are all kept and all used: four services on about eight machines, with Sam's spreadsheet; copies storefront 3, orders 1, payments 2, dispatch 3 and sizes 2, 3, 1, 1 (room units); the 02:51 dispatch crash and the 03:04 failure of the machine running `orders`; Sam's "Nobody deploy anything, I'm updating storefront"; storefront v12 → v13; Morgan's "Could four do it?". New with this revision: the exact Monday layout (01: storefront ×2 + payments; 02: storefront + dispatch ×2; 03: orders + dispatch; 04: payments). At 03:04, machine **03** dies; `orders` is re-placed on **04** and the lost dispatch on 02. `storefront` still pointed at machine 03 until Sam passed on the address, and the spreadsheet still says machine 03. Tuesday: three rounds of start-one, stop-one, using the one copy's worth of spare room on 04. Ch 4's "same 3 a.m. failure" should reuse machine 03 and 03:04.
- **R5 (§5 Visuals column, after build), changed.** Record ## Visual grammar: chip height by size (40px per unit on desktop, 28px on mobile; the canvas is non-interactive); the fixed-capacity machine body with a dashed `c6` "N FREE"; the DOWN machine with LOST chips; RUNNING / CRASHED / LOST / NEW ADDR / STOPPED; the service pills UP / DEGRADED / DOWN; the connection line ("storefront → orders: machine 04"); the step highlight; the `CLUSTER` frame; the `.cp-term` card. Note that `renderFleet` and the snapshot format live in Ch 3's `site/widgets/w-fleet-scrolly/` for later chapters to copy.
- **R6 (Ch 4 entry), changed.** (a) Reuse: Ch 3's Monday layout and 03:04 failure, as a lane (or a small widget built on `renderFleet`) in which the system does steps B4–B6 itself, after a predict ("machine 03 dies; what happens now?"). This replaces revision 0's "automated mode of w-fleet". (b) Retrieval from Ch 3: "which jobs did Sam do at 3:04?" (replacing, connecting). (c) Ch 3's conductor aside promises that Ch 4 shows how the work is split up with no single conductor (m-03), and s-03 leaves the question "what if the record were the thing the machines act on?" Desired state answers both. (d) "K8s" and "helmsman" are unsourced (parking lot); source them in Ch 4's research if wanted.
- **R7 (Ch 5 entry), changed.** local-02 (R2) with x-01's numbers. Ch 5 is the chapter whose topic (bin packing, requests, pending) is genuinely system dynamics, so it is where a hands-on sandbox (B2) may earn its place. Build it on Ch 3's `renderFleet` with a WAITING state, not on a revived w-fleet. Ch 3's D2 promises that Ch 5 counts memory and processor separately. Ch 3's "some idle room is insurance; how much is Chapter 5's question" should be picked up. Spreading a service's copies across machines remains Ch 5's "affinity exists" sentence.
- **R8 (Ch 6 entry), changed.** Ch 3's lane C is the by-hand version of the rolling update: start one, add its address, stop one, and it needs one copy's worth of spare room. Ch 6 retrieves it ("in Ch 3, Sam did this by hand") and can reuse the lane controller and snapshots for its step-locked rollout (B1).
- **R9 (Ch 7 entry), changed.** k-03 ("orders is running; can customers order?") and the connection line are Ch 7's hand-written-address-list pain, already felt once; Ch 7 retrieves k-03. It is also an early instance of "running is not the same as working" (m-15, Ch 12).
- **R10 (Ch 8 entry), changed.** Scaling is the one job Ch 3 names but doesn't show: k-05 chore 7, "kept three storefront copies running all week, because Friday's dinner rush needs three". Ch 8's "used to over-provision all week" is that chore. Ch 8 needs a time axis, so probably its own widget, drawing machines with `renderFleet`.
- **R11 (Ch 6, 9, 12 entries), unchanged.** The three jobs Ch 3 names only in D4: noticing a container that's running but stuck (Ch 6, Ch 12), handing each container its settings and passwords (Ch 9), watching it all (Ch 12).
- **R12 (Ch 14 entry), unchanged.** Retrieval from Ch 3: f-01 and k-09's question; local-01 (R1); other orchestrators named only here (Swarm, Mesos; Nomad and AWS ECS are unsourced); "Kubernetes doesn't build your application and isn't an all-inclusive PaaS".
- **R13 (§8, course-wide conventions), changed.** Replaces revision 0's tap-to-place rule with a scrollytelling convention, so Ch 2's rebuild and Ch 3 converge. Add to §8, alongside step 5:
  - "Show a process over time as scrollytelling lanes, not as a stepped widget or carousel. One lane per stage, three to six steps. Desktop: canvas sticky on the left, steps on the right. Under 900px: canvas sticky at the top (≤ 50vh), steps beneath. Under 560px tall: inline snapshots per step.
  - "Each step's canvas state is a complete snapshot, so scrolling back restores it.
  - "Checks sit in the step column, and the step after a check is gated until the reader commits.
  - "Transitions ≤ 300ms, instant under reduced motion, no autoplay.
  - "Any placement or drag interaction a chapter does build must also work by tap and by keyboard."
- **R14 (§8 step 4 / §5), new: a course-wide term card.** Adopt `.cp-term` (## Figures) for each chapter's critical terms, so Ch 2's "immutable" and "stateless" and Ch 3's orchestration, cluster and Kubernetes look alike. One payoff variant (blueprint ground) at most per chapter.
- **R15 (§2, opening), new: a jump-ahead convention.** From Ch 3 on, every chapter opens with a one-line cast strip of the characters it uses, and a collapsed "I didn't read the last chapter. What happened?" disclosure, before the retrieval check. This comes from the user's Ch 2 review, and Ch 2's rebuild is adding the same.
