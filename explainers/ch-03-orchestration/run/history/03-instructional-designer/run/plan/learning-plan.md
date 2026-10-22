# Learning plan: Many containers, many machines: the orchestration problem (Ch 3, Kubernetes for Technical Managers)

<!-- Written by the instructional designer. Parsed by scripts/check_plan.py. -->

## Shape

A narrative article that follows Fennel into Year 2, built around **one hands-on widget** that the reader drives in three phases, followed by a debrief, plus two static figures and five short checks. The chapter's argument has an order the reader has to live through rather than read about. First you do the jobs by hand (pain in the page). Then you name them and see what each one costs a manager (pain seen in meetings). Only then does the software that does them get a name, orchestrator, and only after that does Kubernetes. Docker is placed last, against the layer the reader now has words for. A sandbox can't hold that order, and a plain article would turn the jobs into a list the reader nods at (illusion of explanatory depth). So the widget carries o-1, and the prose carries o-2 and o-3.

Rejected alternatives:
- **A full-page explorable** (the machines as a free sandbox, with failure, update and scaling buttons the reader fires at will). It suits system dynamics, but this lesson is a sequence: do the job, then feel what goes wrong next. A free sandbox lets the reader skip the 3 a.m. failure or never try an update, and then the debrief has nothing to point back to. It also leaves no room for o-2 and o-3 in 15 minutes.
- **Scrollytelling with a sticky machine canvas** (a scripted 3 a.m. story that animates while the reader scrolls). It is cheaper to build, but the reader would watch Sam move containers instead of moving them. CURRICULUM §2.1 asks for the job done by hand before it is automated, and Ch 4's payoff ("nobody wakes up") depends on the reader having been the one who woke up.
- **Adapting Ch 1's `w-rebuild` or Ch 2's `w-samecode`.** Both are row comparisons of what's *on* a machine. This chapter's model is *where* things run and how much room they take, which is Ch 2's f-01 picture (machines holding container chips) with a size added. See the w-fleet `reuse:` field.
- **A fourth widget phase for scaling** (the Friday rush: add copies, remove them after). It would cover the sixth job by hand, but it costs about a minute and adds a time axis Ch 8 owns. Scaling is named in the debrief, tied to something the reader did (placing three storefront copies "because Friday needs them").

**Honest sizing (CURRICULUM §2.10; Ch 1 planned 12 and built about 17, Ch 2 planned 14.5 and built 16).** Estimated reader time, including thinking and interaction:

| Part | Minutes |
|---|---|
| hero + s-01 (k-01 retrieval, Year 2 scene) | 2.0 |
| s-02 widget, phase 1: place 9 containers (9 taps), pass on addresses | 1.25 |
| s-02 widget, phase 2: restart one, a machine dies, re-place and reconnect 2–4 | 1.5 |
| s-02 widget, phase 3: update storefront ×3 without downtime (about 7 actions) | 1.0 |
| s-02 debrief, k-02 (think, then reveal the six jobs) | 1.0 |
| s-03 f-01 jobs → symptoms, two short paragraphs, k-03 | 2.0 |
| s-04 orchestrator and cluster, analogy A1, k-04 | 2.0 |
| s-05 Kubernetes named, history | 1.0 |
| s-06 k-05, f-02, Docker placed | 1.75 |
| s-07 k-06, recap, bridge | 1.25 |
| **total** | **about 14.75** |

That is at the budget, not under it. The widget is 4.75 minutes, a third of the chapter, and it is the main overrun risk, as Ch 1's was. The estimate assumes the queue design below (one tap places the next container), about 60–75 s per phase including reading the lead and the outcome, and 60 s for the debrief. Both earlier chapters overran their plans by 1.5 minutes or more, so expect a 16-minute build. `cut-list.md` `## If it runs long` items 1–4 recover about 1.5 minutes and items 1–6 about 2.5, without losing an objective, the widget's three phases or an owned misconception. Scope is three objectives and five ideas: the jobs, their symptoms, orchestrator and cluster, Kubernetes placed in history, and Docker placed. Nothing else is planned.

toc: yes. Seven h2 sections and a 15-minute read, so a rail on desktop and a collapsed "Contents" on mobile. Matches Ch 1 and Ch 2 (§ numerals as section addresses).
tokens: user-provided: Control Plane style guide, `design/control-plane/`. Copy `control-plane.css` to `site/assets/tokens.css`; follow README.md, the tokens.json notes and `components/bundle.css`. Ch 2's `site/` is the reference implementation: copy its page skeleton, `assets/page.css` (check classes, `.cp-machine` / `.cp-ctr` / `.cp-img`, `.cp-aside`, `.cp-recap`) and the check script in `assets/page.js`.
mobile: supported. The widget keeps all four machines side by side at 360px (four columns of about 75px) so the next container and every destination are on one screen. Chip labels are chosen to fit that width (see w-fleet `size:`). f-01 becomes stacked cards under 600px; f-02 stacks vertically. Under 600px the widget follows the course height rule (each state takes its own height and scrolls its header into view on change).

**Course voice (from the style guide):** second person, present tense, sentence-case headings, no exclamation marks, no emoji. Status always travels as a word plus colour (RUNNING, CRASHED, LOST, NEW ADDR, UP, DEGRADED, DOWN, CORRECT, NOT QUITE).

**Vocabulary guard (brief out_of_scope; research notes).** This chapter introduces exactly four terms: *orchestration*, *orchestrator*, *cluster* (s-04) and *Kubernetes* (s-05). The jobs keep plain words: placing, restarting, replacing, connecting, updating, scaling. Never in the body: node, pod, replica (say "copy"), scheduler / scheduling, bin packing, pending, requests, limits, desired state, declarative, reconcile, controller, control plane, self-healing, rolling update, Deployment, readiness / liveness / health check or probe, Service (capitalised), load balancer, DNS, ingress, autoscaling. "Service" appears only lowercase, in its plain sense: one part of Fennel's app (CURRICULUM §3). The chapter title's "orchestration" is fixed by the curriculum and is the only use before s-04.

**Fiction vs. sourced.** Fennel's four services, their copies and sizes, the machine numbers, the 02:51 crash and 03:04 failure, the team-chat message, Morgan's question and storefront v12 → v13 are Fennel fiction. The page attaches no number to them beyond the widget's own room units. Sourced mechanisms:
- a moved container is reachable somewhere new, so callers must be told (c-02);
- the jobs list (c-01, with the update job from the Kubernetes overview in c-01's note);
- manual, repetitive operations work grows with the service and burns people out (c-06; Google's practice, not an industry survey);
- typical one-app-per-server utilization, as a hedged 2014 industry estimate (c-04, medium);
- the definitions of orchestration and cluster (c-07, c-08);
- Kubernetes's history (c-05, c-09, c-10);
- Docker's place (c-11, c-12).

From earlier chapters, by reference: a container dies with its machine (Ch 2 claim 05); a new machine pulls the image first (Ch 2 claims 07 and 11); drift is unrecorded change (Ch 1 claim 06).

## Objectives

- o-1: list the coordination jobs that appear once many containers run on many machines (placing, restarting, replacing after a machine dies, connecting, updating without downtime, scaling), having done several of them by hand. — checks: k-01, k-02
- o-2: explain how each job shows up as a business symptom a manager sees (3 a.m. pages and on-call burnout, idle spend, risky deploys coordinated in a group chat, a spreadsheet as the source of truth that drifts). — checks: k-03, k-06
- o-3: explain what an orchestrator is (software that does those jobs continuously, across a group of machines treated as one: a cluster), name Kubernetes as one, place it briefly in history, and say how Docker relates to it (m-02). — checks: k-04, k-05, k-06

k-01 is the retrieval opener (Ch 2's m-23), and it sets up the replacing job. k-06 interleaves: its distractors reuse local-01 (s-05) and a plausible planning question that skips the decision, and its key is the chapter's conversation question, which needs o-2's jobs-to-symptoms link.

## Diagnosis

- **Readiness:** novice for infrastructure, intermediate for software. From Ch 1–2 the reader has these chunks: an app is a process on a machine; hand-kept records drift; an image packages the app; a container is the image running, on one machine; a registry holds images; containers die with their machine until someone re-creates them elsewhere (m-23).
- **Hardest moment:** w-fleet phase 2, after machine N dies. The reader holds three things: (1) the dead machine's containers are gone and must start somewhere else; (2) each needs a machine with enough free room; (3) each one that moves has a new address, so nothing can reach it until callers are told. That is the novice limit of 3, and it is kept there by pre-training inside the widget. Phase 1 has already chunked (2), placing by room, over nine repetitions, and (3), passing on addresses, once at its end. Phase 2 also introduces restarting first, alone, before the failure, so "restart in place" and "replace elsewhere" arrive one at a time and then contrast. Everything the reader must compare stays on screen: free room on each machine, the next container's size, every chip's status word.
- **Second-hardest:** s-06, Docker's place. The reader holds Docker on one machine (Ch 2), the orchestrator across many (s-04), and the image passing between them. k-05 makes the reader commit to a model first, and f-02 then shows the two layers side by side, with the Ch 2 pieces in Ch 2's drawing.
- **Misconceptions confronted** (catalog IDs; local IDs proposed in ## Curriculum recommendations):
  - **m-23, retrieved** (Ch 2's): k-01 option B ("they restart elsewhere within seconds"), with "half right" feedback that keeps the true part and the download caveat.
  - **m-02, owned here:** k-05 (predict), f-02, the s-06 prose, and the m-02 echo in k-04 option A ("it builds the images too"). Phrased as "not competitors *in the usual sense*", with Swarm as the honest exception.
  - **local-03** ("an orchestrator is a fancier deploy script"): k-04, and the definition's "all the time".
  - **local-01** ("Kubernetes is Google's Borg, open-sourced", and "Google runs on it"): s-05 prose states the retelling fairly and corrects it; k-06 option B.
  - **local-02** ("enough free room in total means it fits"): deliberately **not** confronted here. The widget's sizes are chosen so it can't arise (see w-fleet `model:`). Recommended to Ch 5.
  - **m-03 guard** (Ch 4's "one master brain"): the A1 breaks note says not to picture one boss giving every order, and that Ch 4 shows how the work is divided. Nothing here explains it.
- **Retrieval opener:** k-01, Ch 2's closing question in Year 2 form (CURRICULUM §2.8).
- **Analogy** (with a visible "Where this analogy breaks" line in the same aside): A1, an operations manager rostering staff across a chain of shops (s-04), the chapter's management analogy (§2.1). The x-04 "dispatcher" variant is rejected because `dispatch` is one of Fennel's services, so the analogy would collide with a chip on the reader's screen.

## Segments

### s-01 — Year 2: eight machines and a spreadsheet
intent: Retrieve Ch 2's open question (what happens when the machine dies), then set Year 2's scene as a manager sees it, before any new idea appears.
objectives: o-1, o-2
claims: none from this run's facts; Ch 2 claims 05, 07 and 11 by reference (k-01 and its feedback). The scene is Fennel fiction.
readiness: novice · interactivity: low (the Ch 2 answer, four symptoms) · max-elements: 3
mode: retrieval (choice) → concrete story (pain seen in meetings) · blueprint: none
layout:
  contiguity: adjacent. k-01 opens the section. The scene follows its reveal, and its first line links back ("At Fennel, that someone is Sam.").
  pacing: continuous
  redundancy: don't re-explain containers or images; k-01's feedback names the Ch 2 idea once and the scene moves on
  scaffold: none
ux: Commit to k-01 (three option buttons) and read the feedback. Then read a short scene of about three paragraphs. At 360px everything stacks and the options are full width.
figure: none
widget: none
checks: k-01
content: these points, in order:
  - k-01.
  - **Year 2.** Fennel's one app is now four services: `storefront` (the site and app customers use), `orders`, `payments` and `dispatch` (which assigns drivers). Each runs as one or more copies, each copy a container. Together they run on about eight rented machines. Which container runs on which machine lives in a spreadsheet Sam keeps. The service names are in `code`; "service" is lowercase, in its plain sense.
  - **What Jordan sees** (the four symptoms, as events, not yet as a list): Sam was paged at 3 a.m. twice this month; release days start with Sam's message in the team chat, "Nobody deploy anything, I'm updating storefront"; the spreadsheet was wrong last time it mattered; and Morgan, reading the bill, asks why Fennel pays for eight machines when half of them look mostly idle.
  - **Hand-off to the widget:** "Morgan's question is a fair one. Try it: here are Fennel's containers and four machines."
  - No number for pages, hours or utilization appears here (research caveats).

### s-02 — Run the machines yourself
intent: The reader does Sam's job by hand (placing, restarting, replacing, connecting, updating), feels where each job bites, and then lists the jobs they just did, so the six jobs are named after the reader has met them.
objectives: o-1
claims: c-01, c-02, c-08, c-06; Ch 2 claims 05 and 07 by reference (a container dies with its machine; a new machine pulls the image first)
readiness: novice · interactivity: high (free room vs. container size; a lost machine's containers; new addresses after every move) · max-elements: 3
mode: guided task, done by hand, in three phases with one new job introduced at a time (whole-task simplification), then a generative debrief (think, then reveal) · blueprint: B1-style step-locking across phases, with goal-directed action inside each phase
layout:
  contiguity: inline. Free room is printed on each machine ("4 FREE"), size on each chip, a status word on each chip and on each service. The phase lead and the outcome sit directly above the machines; the next container sits directly above the machines too.
  pacing: step-revealed. Each phase opens only after the previous one's button. Inside phase 2, the machine failure comes only after the reader has restarted the crashed container and tapped "Back to bed". The debrief's list is hidden until the reader taps "Show the list".
  redundancy: the surrounding prose is two sentences before ("Morgan's question…"; "Put each container on a machine with room for it.") and none after. The widget doesn't narrate what the reader can see; its text is the phase lead, one outcome line and the status words.
  scaffold: none. The target reader needs every part. "Start over" is always available; phase 3 has "Try the update again" after a downtime.
ux: About 4.75 minutes. Tap a machine to place the next container; tap a placed container for its actions (Move, Restart, Stop). One button passes on new addresses, and one optional button updates the spreadsheet. At 360px the four machines sit side by side and the next container sits right above them, so placing never needs a scroll. No horizontal scroll.
figure: none (the widget is the figure)
widget: w-fleet (complexity: high) — four machines, nine containers of three sizes; place them, survive a 3 a.m. failure, update storefront without downtime, then list the jobs you did
checks: k-02
content: these points, in order:
  - Two lead-in sentences (above).
  - The widget (all phases; see ## Widgets).
  - No prose between the widget and s-03. The debrief inside the widget ends the section.

### s-03 — What the jobs cost
intent: Connect each job to the symptom a manager actually sees (pages and burnout, idle spend, release-day coordination, the drifting spreadsheet), and show that the work grows with every service.
objectives: o-2
claims: c-02, c-04, c-06; Ch 1 claim 06 by reference (drift)
readiness: novice · interactivity: low (each row pairs one job with one symptom) · max-elements: 3
mode: labelled table (figure) → two short explanations → apply check · blueprint: none
layout:
  contiguity: inline. Each symptom sits on its job's row in f-01; the job names match the debrief's words exactly.
  pacing: continuous
  redundancy: the prose doesn't re-read the table. It adds what the table can't: why the idle room exists (x-02) and why the work grows (c-06).
  scaffold: none
ux: Read f-01 (six rows plus a spreadsheet row), two short paragraphs and a bridge question, then commit to k-03. At 360px f-01 becomes stacked cards (job name as the card header).
figure: f-01, six jobs and what a manager sees. See ## Figures.
widget: none
checks: k-03
content: these points, in order:
  - One lead sentence: each job you did shows up somewhere Jordan can see it.
  - f-01.
  - **Idle machines, honestly** (x-02, c-04 hedged). By hand, people keep room free "to be safe" and keep spare machines, because moving things later is slow and risky, and some of that room is insurance: in phase 2 it was what let you re-place a dead machine's containers. Industry estimates have long put a typical one-app-per-server machine at only a small fraction of its capacity (a 2014 estimate: about 12–18%, for US corporate data centres). Never give Fennel a percentage. How much spare room is right is Ch 5's question (one clause).
  - **Work that grows with the service** (c-06). Google's site reliability engineers call manual, repetitive, automatable operations work *toil*: it grows in step with the service, and too much of it burns people out. Their own rule is to keep it under half of each engineer's time. Present it as Google's practice, not an industry survey. No figure for pages or recovery hours.
  - **The spreadsheet** (c-02, Ch 1 claim 06). It is Sam's server notes from Ch 1 again. A hand-kept record of a system that moves every time something fails falls behind, and at 3 a.m. nobody updates it. Bridge, as a question only: "What if the record were the thing the machines act on, instead of a note about them? Hold that thought for the next chapter." (Don't say "desired state".)
  - **Release days** stay Fennel fiction (the team-chat message), with no figure.
  - k-03.

### s-04 — Software that does the jobs
intent: Name the thing the reader now wants (software that does the six jobs, all the time, across machines treated as one pool) as orchestration, an orchestrator and a cluster, defined by what it does, not by how.
objectives: o-3
claims: c-07, c-01, c-08
readiness: novice · interactivity: medium (the jobs as one chunk; all the time, not once per release; the machines as one pool) · max-elements: 3
mode: name-after-meeting → management analogy with breaks note → apply check (misconception local-03) · blueprint: none
layout:
  contiguity: adjacent. `orchestration`, `orchestrator` and `cluster` are each defined (`dfn`) in the first two paragraphs, and `cluster` points back to "the four machines you just ran".
  pacing: continuous
  redundancy: don't re-list the six jobs in prose; say "the six jobs" and refer to f-01 / the debrief
  scaffold: analogy A1 in a `.cp-aside` labelled ANALOGY, with its WHERE THIS ANALOGY BREAKS line inside the same aside
ux: Read about three short paragraphs and one aside, then commit to k-04. At 360px the aside is full width.
figure: none
widget: none
checks: k-04
content: these points, in order:
  - **Turn:** what Sam needs isn't a faster Sam. It's software that does the six jobs.
  - **Definitions** (c-07, c-01). Doing those jobs automatically, for as long as the containers run, is called `orchestration`. Software that does it is an `orchestrator`. It keeps doing them: at release time, and also at 3 a.m. when a machine dies, with nobody at a keyboard.
  - **Cluster** (c-08). You give an orchestrator a group of machines, physical or virtual, and tell it how big each container is; it fits the containers onto them itself. Engineers call that group, treated as one pool, a `cluster`: the four machines you just ran by hand were one. Say "how big each container is", not "requests".
  - **Defined by what, not how.** One sentence: how an orchestrator does all this is the next chapter's subject.
  - **A1, the operations manager.** "Picture an operations manager for a chain of shops. They roster who works at which shop, cover for anyone who goes home sick, move a flooded shop's staff to the others, keep head office told who is where, bring in a new procedure without closing a shop, and call in extra staff for the Saturday rush. An orchestrator is that job, done by software, around the clock, across a pool of machines." **Where this analogy breaks:** "A real manager uses judgement. They notice when something is off, and ask why the same person keeps going home sick. An orchestrator follows its rules, with no judgement: it will keep restarting an app that's broken. And don't picture one boss handing out every order. The next chapter shows how the work is really divided up."
  - k-04.

### s-05 — Its name is Kubernetes
intent: Pay off the course's promise: name Kubernetes as one orchestrator, after the reader has built the list of jobs it does, and place it briefly and accurately in history.
objectives: o-3
claims: c-09, c-10, c-05, c-07
readiness: novice · interactivity: low (a name, where it came from, who owns it now) · max-elements: 3
mode: name-after-meeting (payoff) → short history with one misconception corrected (local-01) · blueprint: none
layout:
  contiguity: adjacent. The name is in the h2 and in the first sentence, as `Kubernetes` (`dfn`).
  pacing: continuous
  redundancy: don't re-list the jobs; "the six jobs you did by hand" is enough
  scaffold: none
ux: Read about three short paragraphs. No check: the history is low-interactivity facts, and k-06 option B retrieves the local-01 correction at the end. At 360px plain prose.
figure: none
widget: none
checks: none
content: these points, in order:
  - **The payoff.** Open by acknowledging it: this is the name the course has been heading for. The orchestrator this course is about is Kubernetes. It does the six jobs you just did by hand, across a cluster, all the time. (Avoid any adoption figure; none is sourced.)
  - **Where it came from** (c-09, c-05). Google ran its own services in containers for years, on internal systems called Borg and later Omega. Google built Borg partly so different kinds of work could share machines, using more of each one and cutting costs: Morgan's idle-machine question, at Google's scale. Paraphrase c-05; don't quote it.
  - **Not Borg, open-sourced** (local-01, c-09). State the common retelling fairly ("You'll hear that Kubernetes is Google's Borg, released to the world"), then correct it: Kubernetes was Google's third such system, built new, using lessons from the first two, and open source from the start. Borg and Omega stayed inside Google. Either omit "Google still runs on Borg" or date it ("as of 2016").
  - **Who owns it now** (c-10). Google published it in 2014. At version 1.0, in 2015, it handed Kubernetes to a newly formed foundation, the Cloud Native Computing Foundation, part of the Linux Foundation, so no single company owns it. By 2024 it had tens of thousands of contributors from thousands of companies.
  - **Others exist** (c-07). Docker Swarm and Apache Mesos are other orchestrators; Ch 14 compares the options. One sentence.
  - **Bridge:** how Kubernetes does the jobs without anyone at a keyboard is the next chapter. First, the name you've heard alongside it.

### s-06 — Where Docker fits
intent: Deliver Ch 2's promise to place Docker. Confront m-02 (same thing, or rivals) by showing Docker and an orchestrator working at different layers, usually together.
objectives: o-3
claims: c-11, c-12, c-10, c-07
readiness: novice · interactivity: medium (Docker on one machine; the orchestrator across many; the image passing between them) · max-elements: 3
mode: predict (pre-question, misconception confrontation m-02) → labelled two-layer figure → explanation · blueprint: none
layout:
  contiguity: inline. "Docker" and "Kubernetes" are labelled on f-02's two layers in the prose's words. f-02 comes after k-05's reveal so it doesn't give the answer away.
  pacing: continuous. k-05 comes first.
  redundancy: the f-02 caption states the takeaway; the prose doesn't walk the arrows
  scaffold: none
ux: Commit to k-05, look at f-02, read about three short paragraphs. At 360px f-02 stacks vertically and the options stack.
figure: f-02, two layers. See ## Figures.
widget: none
checks: k-05
content: these points, in order:
  - One line of callback: last chapter promised to place Docker. Then k-05.
  - f-02.
  - **What "Docker" is** (c-11). Not one thing but a set of tools for building images and running containers. When Riley runs `docker build`, it makes the `storefront:v13` image; `docker run` starts a container from it on one machine. That's Ch 2's world. (Don't introduce Docker, Inc.; the company is unsourced here.)
  - **One layer up** (c-11, x-05). The image goes to the registry, and an orchestrator such as Kubernetes decides which of the cluster's machines run copies of it, and keeps them running. Docker made the box; the orchestrator keeps boxes running across the machines. Images follow an open standard, so Kubernetes runs them whichever tool built them. Most teams use both.
  - **Born together** (c-10). Kubernetes was announced in 2014 at DockerCon, Docker's own conference, as a way to run containers across many machines.
  - **Not rivals, in the usual sense** (c-07, c-11 note). The one real overlap: Docker also made an orchestrator of its own, Docker Swarm, which did compete with Kubernetes at that layer.
  - **The headlines** (c-12), one sentence at most: since 2022 Kubernetes no longer uses Docker's own engine inside the cluster, which produced "Kubernetes drops Docker" headlines, but images built with Docker run exactly as before. Never write CRI, containerd or dockershim.

### s-07 — The conversation
intent: Rehearse the chapter's discussion move. Answer "We should move to Kubernetes" with the question that ties the platform to the jobs that hurt, then recap and point to Ch 4.
objectives: o-2, o-3
claims: c-09, c-11
readiness: novice · interactivity: low · max-elements: 3
mode: apply (choose the response; interleaved distractors local-01 and a decision-skipping question) → recap → bridge · blueprint: none
layout:
  contiguity: adjacent. Sam's line is a quoted line directly above k-06.
  pacing: continuous
  redundancy: the recap is three lines and doesn't re-explain
  scaffold: none
ux: One check, a three-line recap, a closing line. At 360px everything stacks.
figure: none
widget: none
checks: k-06
content: these points, in order:
  - Sam's line, after another 3 a.m. page: "We should move to Kubernetes." Then k-06.
  - One sentence after k-06: Chapter 14 is where the cost side of that question gets answered.
  - **Recap**, three lines:
    - "Once many containers run on many machines, someone has to place them, restart and replace them, connect them, update them and scale them. By hand, that someone is Sam, at 3 a.m."
    - "Each job lands on a manager's desk: pages and burnout, idle machines, release days run from the team chat, and a spreadsheet that's always behind."
    - "An orchestrator does those jobs all the time, across machines treated as one pool, a cluster. Kubernetes is one, built from Google's experience and now a community project. Docker builds and runs the containers it keeps going."
  - **Bridge:** "Next: Fennel moves to Kubernetes, the same machine dies at 3 a.m., and nobody wakes up. The next chapter is how." (Ch 4's Fennel moment; no mechanism.)

## Figures

Simple figures are drawn by the page builder as figure plates (Control Plane `Figure` treatment: mono header bar, blueprint ground, direct labels, numbered caption), following ## Visual grammar. Both re-layout under 600px rather than scale. Text is never below 13px.

### f-01 — Six jobs, and what a manager sees (s-03)
- **Model.** A two-column table inside a figure plate, header bar `FIG. 01 · THE JOBS, FROM THE MANAGER'S CHAIR`. Column heads `JOB` and `WHAT A MANAGER SEES`. Job names are the debrief's exact words, in mono.
  1. **Placing.** Machines kept half-empty "to be safe", plus spares, because moving things later by hand is slow and risky: idle spend.
  2. **Restarting.** Someone has to notice a crash and act, at any hour: pages.
  3. **Replacing.** A dead machine takes its services down until someone re-places them: 3 a.m. pages, outages, on-call burnout.
  4. **Connecting.** "It's running, but nothing can reach it" after a move, and a spreadsheet that falls behind.
  5. **Updating.** Release days run by hand from the team chat ("nobody deploy anything"): slow, risky releases.
  6. **Scaling.** Paying all week for Friday's peak, or scrambling during it.
  
  A final full-width row, set off by a rule: **The spreadsheet.** "Not a job of its own: the hand-kept record of all six, always a little behind (Ch 1's notes, again)."
  
  Under the table, one muted line: "And more: noticing a container that's running but stuck, handing each one its settings and passwords, watching all of it. Later chapters."
- **Display.** Direct labels only. No lamps or status colours: these are descriptions, not statuses.
- **Caption (takeaway).** "Fig. 01. Each job you did by hand shows up on a manager's desk, and each grows with every new service and machine."
- **Size.** Desktop: prose width or `.d-wide`, about 360px tall. Under 600px: six stacked cards (job name as a mono header, symptom below), about 640px tall at 360px.
- **Reuse.** Ch 14 (retrieval: "which of these jobs hurts most?") and Ch 15. Static: later chapters copy it freely. Not worth parameterising.

### f-02 — Two layers (s-06)
- **Model.** Ch 2's f-01 flow, redrawn and extended to the right. Left to right on desktop:
  1. **One machine.** A machine frame `MACHINE · RILEY'S LAPTOP` with two `c2` rows, "`docker build` → image `storefront:v13`" and "`docker run` → one container", and one container chip `storefront:v13` (lamp + RUNNING). The layer label above it reads `ONE MACHINE · DOCKER`, with a direct label: "builds the image, runs a container".
  2. **Registry.** Arrow "push" → a `REGISTRY` frame with one image chip `storefront:v13` (Ch 2's registry drawing), labelled "the image: an open standard, any tool can run it".
  3. **Many machines.** Arrow "pull" → a `CLUSTER` frame (new, see ## Visual grammar) around four small machine frames `01`–`04`, each holding one to three container chips (`storefront:v13`, `orders`, `payments`, `dispatch`; storefront on three different machines). The layer label above it reads `MANY MACHINES · AN ORCHESTRATOR, E.G. KUBERNETES`, with a direct label: "keeps containers running across the cluster". Under the cluster frame sits a strip of the six job words in mono: `placing · restarting · replacing · connecting · updating · scaling`, then "all the time". Draw it as a strip of words, not as a box or brain sitting above the machines (m-03).
- **Display.** Direct labels, no legend. The two layer labels are the figure's main contrast: same weight, side by side.
- **Caption (takeaway).** "Fig. 02. Docker works on one machine: build the image, run a container. An orchestrator such as Kubernetes works one layer up, keeping containers running across a cluster. The image passes between them, so teams usually use both."
- **Size.** Desktop `.d-wide` (≤ 960px), about 360px tall. Under 600px it stacks vertically: laptop frame → "push ↓" → registry → "pull ↓" → cluster (machines in a 2×2 grid, one or two chips each) → job strip (wrapping). About 760px tall at 360px.
- **Build as HTML/CSS**, copying Ch 2's f-01 renderers (`renderMachine`, `chip`, registry) and `.cp-machine` / `.cp-ctr` / `.cp-img` from Ch 2's `assets/page.js` and `page.css` into this run's `site/assets/`, plus a `.cp-cluster` frame. Data-driven from a small array in `page.js`, as Ch 2 did.
- **Reuse.** Ch 4 (the cluster drawn as machines inside a frame is where the control plane and nodes get named) and Ch 14 (where each tool sits). Worth keeping data-driven, which costs nothing. Static: later chapters may change it freely.

## Visual grammar

This extends Ch 1's and Ch 2's grammar (CURRICULUM §5 Visuals column), which is unchanged:
- machine = an outlined frame with a mono `MACHINE · NAME` bar;
- container = Ch 2's chip: `c1` stroke on `c1-soft`, mono label, with a status;
- registry = a `REGISTRY` frame with image chips;
- clutter and unknown room in `c6` dashed;
- status as word plus colour.

New in Ch 3 (proposed for the Visuals column, R5):
- **Container size.** A chip's height is proportional to its size in room units: 1 unit = 44px, so size 1 = 44px, 2 = 92px, 3 = 140px (4px gaps). All chips stay `c1`, as in Ch 2; services are told apart by their label, not by colour.
- **Machine room.** A machine frame has a fixed body of `capacity` units. Unused room is one dashed `c6` region labelled `N FREE` (Ch 2's "room for more" convention), which is also the tap target for placing.
- **Machine down.** The frame turns dashed `ink-3`, the bar reads `DOWN` in `bad`, and its chips stay in place at reduced opacity, marked `LOST`.
- **Container status words:** RUNNING (`good`), CRASHED (`bad`), LOST (`bad`), NEW ADDR (`warn`; running, but callers haven't been told where).
- **Service status:** one pill per service, `storefront 3 · UP`, with UP (`good`), DEGRADED (`warn`), DOWN (`bad`).
- **Cluster.** A frame drawn in `ink` at 3px emphasis stroke around machine frames, with a mono `CLUSTER` bar (f-02).

## Widgets

### w-fleet
segment: s-02
complexity: high
blueprint: B1-style step-locking across four states (three phases and a debrief), with goal-directed tasks inside each phase and a think-then-reveal at the end
model: Machines hold containers; a container occupies `size` room units on exactly one machine; a machine accepts a container only if its free room ≥ the container's size (c-08: told how big each container is, fit them onto machines; Ch 2 claim 05: a container runs on one machine). A container that starts somewhere new has a new address (c-02), so it doesn't count as serving until the reader passes on new addresses. A service is UP if all its copies are serving, DEGRADED if some are, DOWN if none are. All words, sizes and scripts live in `data.js`; the engine (state + actions) has no DOM code, so a later chapter can drive it (see `reuse:`).
  - **Machines:** `01`–`04`, capacity 6 room units each (24 in total).
  - **Services** (size in room units · copies · label · what customers see when it's DOWN):
    - `storefront` · 2 · 3 copies · shows its version (`v12`; phase 3 adds `v13`) · "the site doesn't load"
    - `orders` · 3 · 1 copy · "customers can't place orders"
    - `payments` · 1 · 2 copies · "orders can't be paid"
    - `dispatch` · 1 · 3 copies · "no drivers get assigned"
    
    Nine containers, 14 of 24 units: about half the room stays free, which the reader sees as dashed space (idle).
  - **Why these numbers** (guarantees, so no phase can dead-end or produce a fits-nowhere moment, local-02, which is cut to Ch 5). Phase 1 always fits: before any placement the free room is at least 10 plus the next container's size, so 11 or more across four machines, and some machine has at least 3 free. Phase 2: survivors' free room = 4 + the dead machine's load ≥ 7 across three machines, so one has ≥ 3 for `orders`, and the size-1 and size-2 orphans always fit after it. Phase 3: the survivors have 4 units free in total, so at least one machine has ≥ 2 and one `v13` copy always fits, but never all three at once. That nudges the reader to start new, then stop old, without the plan teaching it.
  - **Actions** (each logged with a job kind for the debrief):
    - place next (placing; in phase 2, replacing);
    - move a chip (placing; gives it a new address);
    - restart a CRASHED chip (restarting; same machine, no new address);
    - stop a chip (updating, phase 3, old storefront copies only);
    - pass on new addresses (connecting; counts the addresses);
    - update the spreadsheet (record; optional).
  - **Spreadsheet:** a count of rows out of date, incremented by every start or move. Optional to clear.
  - **Phase 1, "Place them".** The queue, one at a time: storefront, storefront, orders, payments, dispatch, storefront, dispatch, payments, dispatch. Each placed chip starts as NEW ADDR. When the queue is empty, the button "Pass on the addresses (9)" appears; after it, every chip is RUNNING, the service pills appear (all UP), and the spreadsheet line appears ("SPREADSHEET · 9 rows to fill in", button "Update the spreadsheet").
  - **Phase 2, "Saturday, 02:51".** Event 1, the crash: the first `dispatch` copy (by machine order) on a machine that does *not* hold `orders` becomes CRASHED. Fallbacks: the first `payments` copy there, then the first `storefront` copy there. Restart puts it back to RUNNING in place. Then the button "Back to bed". Event 2, 03:04, the failure: the machine holding `orders` goes DOWN. Its chips become LOST, and fresh copies of each enter the queue. Each re-placed copy is NEW ADDR until addresses are passed on.
  - **Phase 3, "Tuesday's release".** The queue holds three `storefront:v13`. Old `storefront:v12` chips can be stopped. If storefront's serving count ever reaches 0, that's a downtime event; the lowest serving count is tracked. Success: three v13 copies serving, no v12 left, and no downtime event.
  - **Debrief.** Counts from the log, by job kind.
reader_does: Tap a machine's free room to place the next container (one tap each). Tap a placed container to select it; the action bar then offers Move (then tap a machine), Restart (if CRASHED) or Stop (phase 3, v12 only), plus Cancel. Tap "Pass on new addresses" when chips show NEW ADDR. Optionally tap "Update the spreadsheet". Advance with each phase's button. "Start over" is always available. The reader has a goal in each phase but no puzzle: the numbers guarantee every phase can be finished, so the effort goes into noticing the jobs, not into means-ends search.
  - **Phase 1 lead:** "Morgan's question: Fennel pays for eight machines, and half look mostly idle. Could four do the work? Here are Fennel's nine containers. Put each one on a machine with room for it." Outcome after passing on addresses: "Nine containers on four machines, and about half the room still free. Fennel pays for eight." Button "Next: Saturday, 02:51".
  - **Phase 2 lead:** "Saturday, 02:51. Sam's phone buzzes: a dispatch copy on machine K has crashed. The machine itself is fine." After the restart: "Restarted where it was. Back to sleep?" Button "Back to bed". Then: "03:04. Machine N stops answering. Everything on it is gone." The pills update (orders DOWN), with the customer line ("Customers can't place orders."). After `orders` is re-placed but before addresses are passed on: "orders is running on machine M, but storefront is still sending orders to machine N." After passing on addresses: "Back up. Each container had to be pulled onto its new machine if it wasn't there already, started, and its new address passed on. The room you'd left free is what made space for them." If the spreadsheet is out of date: "The spreadsheet still says machine N." Button "Next: Tuesday's release".
  - **Phase 3 lead:** "Tuesday. storefront v13 is ready. Sam posts in the team chat: 'Nobody deploy anything, I'm updating storefront.' Replace all three v12 copies with v13, without the site going down." On a downtime event: "The site went down: with no storefront copy reachable, customers saw an error page." Button "Try the update again" (restores the phase-3 start). On success: "Done: three copies on v13, and the site never went down." Then, if the lowest serving count was below 3: "At one point only N copies were serving, so fewer copies were sharing the traffic." Button "Next: what did you just do?"
  - **Debrief (k-02):** see ## Comprehension items. The prompt and a "Show the list" button; the list is revealed in place.
shows: Every state is labelled on its referent.
  - Control Plane `cp-widget` panel: lamp, mono bar `W-01 · FOUR MACHINES, BY HAND`, hard offset shadow.
  - State header with counter: `PHASE 2 / 3 · SATURDAY, 02:51`, then `DEBRIEF`.
  - The lead, then the service pills (from the end of phase 1), then the NEXT row ("NEXT · `orders` · needs 3 ■■■", then a muted "then: storefront, dispatch, … (6 more)").
  - The four machine frames: bar `MACHINE 01 · UP` (two lines on narrow screens: `MACHINE` / `01 · UP`), a body of six units with the chips at their sizes and the dashed `N FREE` region.
  - The chips: label (`storefront`, plus `v12` / `v13` for storefront only) and a status word (RUNNING, CRASHED, LOST, NEW ADDR). A selected chip gets a 3px ink outline.
  - The action bar, then the buttons "Pass on new addresses (N)" and "Update the spreadsheet (N rows)" when relevant, then the outcome line, then the phase button.
  - A refused placement shows inline under the machines: "No room on machine 02: needs 3, has 2 free."
  - An `aria-live="polite"` sentence announces each change, for example: "orders placed on machine 3. 1 free left there."; "Machine 2 is down. 3 containers lost. orders is down."; "Addresses passed on. All services up."
  - Under reduced motion, every change is instant (no highlight fades or slides).
size: desktop `.d-wide` (≤ 960px). Header, state header and lead span the top. Below, two columns: a left column of about 280px (service pills in a 2×2 grid, NEXT row, action bar, address and spreadsheet buttons, outcome line, phase button) and, on the right, four machine columns of about 150px each (bar 32px, body 6 × 44px + 5 × 4px gaps = 284px, padding). Reserve min-height 720px (the tallest state, phase 2 with the outcome line), measured by the builder. The debrief state is laid out in the same box: the list in two columns of three jobs. Mobile (< 600px): full width, single column, in order: bar, state header, lead, service pills (2×2), NEXT row, four machine columns side by side (each about 75px wide at 360px; chip inner width about 68px), action bar, buttons, outcome, phase button. Estimated heights at 360px: phase 1 ≈ 860px, phase 2 ≈ 980px, phase 3 ≈ 940px, debrief ≈ 760px open. Per the course height rule, each state takes its own height under 600px and scrolls its state header to the top on change. The NEXT row and the machines together are about 440px, so the next container and every destination are on one phone screen. Chip labels must fit 68px at 13px mono: `payments` and `dispatch` (8 characters) fit on one line; `storefront` breaks as `store-` / `front` on its two-unit chip, with the version on the third line and the status word on the fourth. Size-1 chips carry the label and the status word only, with no lamp under 600px. Text ≥ 13px; touch targets ≥ 44px (the smallest chip is 44px tall); no horizontal scroll at 360px.
acceptance: ac-03, ac-04, ac-05, ac-06, ac-07, ac-08
reuse: **Decision: build new, reusing Ch 2's f-01 visuals (container chip, machine frame), not a widget.** Copy `.cp-machine`, `.cp-machine__bar`, `.cp-machine__body`, `.cp-ctr`, `.cp-chips` and the `st` / lamp status classes from Ch 2's `site/assets/page.css`, and the `chip()` / `renderMachine()` pattern from Ch 2's `site/assets/page.js`, into this run's `site/widgets/w-fleet/`, scoped under `[data-widget="w-fleet"]`. Add: chip height by size, the dashed free-room region, the down machine, the new status words and the service pills. Never edit Ch 2's files.
  - **Pedagogical reasons:** the reader sees Ch 2's containers on Ch 2's machines, now many of them, so the step from Ch 2 is visible. Chip size is the one new visual property, and it's the one the placing job needs.
  - **Files:** `data.js` (`FLEET_CONFIG`: machines, services, phases with leads, queues, events and outcome strings, debrief strings; every reader-visible word), `index.js` (the engine as a plain-object state plus action functions with no DOM access, then a renderer subscribed to it), `index.css`.
  - **Later chapters** (from their CURRICULUM entries), what each would parameterise, and whether to design for it now:
    - **Ch 4 (self-healing).** The same 3 a.m. failure in an *automated* mode: the system notices LOST containers and re-places them with visible steps, while the reader predicts first. Parameterise: a `mode: 'manual' | 'auto'` flag; scripted events (which machine fails, when); a step delay. **Now:** yes to the engine's actions being callable by a script and to events living in config (cheap, and the code is cleaner anyway). No to building any auto driver or UI.
    - **Ch 5 (scheduling, requests, pending, bin packing).** Sizes become reservations; a container that fits nowhere waits (local-02); a cost readout per machine. Parameterise: per-service sizes, machine capacities, the size label (`room` → `request`), a WAITING state for queue items that fit nowhere, adding and removing machines. **Now:** sizes, capacities and the size label in config, yes. The WAITING state and cost, no: they'd add reader-visible behaviour this chapter deliberately avoids.
    - **Ch 6 (rolling update).** Phase 3, automated and step-locked (B1), with a version that crashes vs. one that is healthy but wrong. Parameterise: versions per chip (already needed here); a per-version "healthy" flag; scripted steps. **Now:** versions in data, yes; health, no.
    - **Ch 7 (services).** The NEW ADDR status and "pass on new addresses" are the by-hand version of Ch 7's "keep a hand-written address list current". Ch 7 may reuse the engine's address bookkeeping. **Now:** keep `newAddress` as a per-chip flag (needed here anyway). No caller graph.
    - **Ch 8 (scaling).** Add and remove copies against a traffic curve; add machines with a lag. Parameterise: copies per service over time, machine count changes, timing. **Now:** copies and the machine list in config, yes; time and lag, no.
    - **Ch 15 (capstone).** Short scripted scenarios on the same machines. Config-driven phases make that a data change.
  - **Reader-visible complexity added for reuse:** none. All of it is config and code structure.

## Comprehension items

### k-01
segment: s-01
objective: o-1
type: retrieve
prompt: Last chapter ended on a question. A year later, Fennel runs its containers on eight machines. At 3 a.m. one of those machines dies for good. What happens to the containers that were running on it?
options: A) They stop with the machine, and stay stopped until someone starts each one again on another machine. · B) They start again on one of the other seven machines within seconds, since each can be re-created from its image. · C) They carry on running, because each container is walled off from the machine underneath it. (correct: A; tempting: B, m-23)
feedback: A: "Right. A container is a process on one machine, so it stops with that machine. Nothing in an image or a container notices, picks another machine and starts it there. Someone has to." B: "Half right. Starting a container from its image is quick once the new machine has downloaded that image. But nothing in an image or a container notices the machine died, picks another one and starts them there. Someone has to." C: "The walls are between containers, not between a container and its machine. When the machine goes, so does everything running on it." All three end with the same line: "At Fennel, that someone is Sam."

### k-02
segment: s-02
objective: o-1
type: explain
prompt: You just ran four of Fennel's machines by hand. How many different kinds of job did you do, and what would you call each one? Settle on your list, then show it.
model_answer: Revealed in place inside the widget, one row per job. The job names are fixed; the evidence in brackets is the reader's own, from the log.
  1. **Placing:** finding a machine with room for each container ("You placed 9 containers on 4 machines{, and moved N}.").
  2. **Restarting:** starting a crashed container again where it was ("You restarted dispatch on machine K. The machine was fine, so it stayed put.").
  3. **Replacing:** starting a dead machine's containers on other machines ("Machine N died at 03:04; you started its M containers somewhere else.").
  4. **Connecting:** telling everything that calls a container where it went ("You passed on A new addresses.").
  5. **Updating:** swapping a new version in without downtime ("You swapped storefront's three copies to v13{, and the site never went down | ; the site went down once along the way}.").
  6. **Scaling:** adding and removing copies as demand changes ("You didn't do this one. storefront runs three copies because Friday's dinner rush needs them. Adding copies when traffic climbs and removing them after, every week, is the sixth job.").
  
  Then the spreadsheet line: "The spreadsheet is N rows behind." If N is 0: "You kept the spreadsheet right. Every move needed a row changed; picture doing that after the third page of the night." Then: "Real teams add more: noticing a container that's running but stuck, handing each container its settings and passwords, watching all of it. Later chapters cover those."
feedback: Under the list, one line: "If your list was shorter, the usual misses are restarting vs. replacing (one stays on its machine, one has to move) and connecting, which rode along with every move."

### k-03
segment: s-03
objective: o-2
type: apply
prompt: Next month Fennel adds a fifth service, catalog, with two copies. Nothing else changes, and Sam still does every job by hand. What happens to the work you just did?
options: A) Only the release work grows: catalog adds updates to coordinate, but it's placed once, and 3 a.m. replacing is per machine, not per service. · B) All of it grows: more containers to place and to restart or replace at 3 a.m., more addresses to pass on, more spreadsheet rows to keep right. · C) Very little grows: catalog runs in containers, so its image carries all it needs, and the machines don't care how many services there are. (correct: B; tempting: C, m-23 echo)
feedback: A: "Placing isn't once: every failure, move and update places things again. And a dead machine takes down every service on it, so more services means more to re-place each time." B: "Right. Google's site reliability engineers call this kind of work toil: manual, repetitive, and growing in step with the service. They aim to keep it under half of each engineer's time, because too much of it burns people out. Each new service adds to Sam's share." C: "The image makes catalog easy to run on any machine. It doesn't pick the machine, notice when that machine dies, or tell storefront where catalog went. Those are the jobs, and each new service adds to them."

### k-04
segment: s-04
objective: o-3
type: apply
prompt: Riley says: "So an orchestrator is basically a smarter deploy script." What does that picture leave out?
options: A) That it builds the images too, so the deploy script and the image-building step can both be retired. · B) That it only watches: it pages Sam sooner when a machine dies, while the moving is still done by hand. · C) That it keeps working between releases: restarting, replacing and re-placing containers at 3 a.m., with nobody at a keyboard. (correct: C; tempting: local-03, which the prompt states)
feedback: A: "An orchestrator runs images; it doesn't build them. Building stays with your build tools; more on that in a moment." B: "Watching is part of it, but it does the jobs too: it starts the replacements itself." C: "Right. A deploy script runs when someone releases, then stops. The jobs that cost Sam sleep happen between releases. An orchestrator keeps doing them all the time. How it does that is the next chapter."

### k-05
segment: s-06
objective: o-3
type: predict
prompt: You'll hear "Docker" and "Kubernetes" in the same breath. Before reading on: how do the two relate?
options: A) The same thing under two names: Kubernetes is what Docker grew into once it could run containers on many machines. · B) Different layers, used together: Docker builds images and runs containers on a machine; Kubernetes runs them across many. · C) Rival products for the same job: a team runs its containers on one or the other, much like picking a cloud provider. (correct: B; tempting: A and C, both halves of m-02)
feedback: A: "They're separate projects. Docker appeared in 2013 as a tool for building and running containers. Kubernetes came from Google in 2014, to keep containers running across many machines." B: "Right. Docker works where last chapter lived: build the image, run a container on a machine. Kubernetes works a layer up, keeping many containers running across many machines. Teams usually use both." C: "Not in the usual sense: most teams use both, Docker to build and Kubernetes to run across machines. The one real rivalry was at the many-machines layer, where Docker's own orchestrator, Swarm, competed with Kubernetes."

### k-06
segment: s-07
objective: o-3
type: apply
prompt: At the planning meeting, after another 3 a.m. page, Sam says: "We should move to Kubernetes." What's the most useful thing Jordan can ask?
options: A) "Which of these jobs is hurting us most today, and is that worth the cost of the platform?" · B) "Google built it and runs on it. Can we simply copy the way Google sets it up?" · C) "How long would the move take, and can we finish it before the holiday rush?" (correct: A; tempting: B, local-01; C, skips the decision)
feedback: A: "Right. It ties the platform to pain you can name (3 a.m. replacing, idle machines, release days run from the chat) and asks whether fixing that is worth what the platform costs." B: "Kubernetes was Google's third system, built new and open source, not the one Google ran its own services on (as of 2016, that was still Borg). And Fennel isn't Google: what pays off at Google's size may not at Fennel's." C: "A fair planning question, but it skips the decision. Before 'how long', ask 'what for': which jobs hurt, and is fixing them worth the cost?"

## Acceptance criteria

- ac-01 (s-01, k-01): §01 opens with k-01, a retrieval question on Ch 2's machine-death answer, before any new term. k-01's option B gets "half right" feedback that keeps the true part and names the download. The four Year 2 symptoms appear as events Jordan sees (3 a.m. pages, the team-chat message, the spreadsheet, Morgan's idle machines) before the widget, with no number attached.
- ac-02 (page, vocabulary): "orchestration", "orchestrator" and "cluster" don't appear before s-04, except in the fixed chapter title. "Kubernetes" doesn't appear before s-05: not in the standfirst, the widget, f-01 or any check before s-05. None of the guarded later-ledger terms (## Shape, Vocabulary guard) appears anywhere. "Service" is only lowercase. "Copies", not "replicas".
- ac-03 (w-fleet phase 1): One tap on a machine's free region places the next container. A machine without enough room refuses it with "needs X, has Y free". All nine containers can always be placed. Placed chips read NEW ADDR until "Pass on the addresses" is tapped; only then do the service pills read UP. The spreadsheet line appears and is optional. The outcome line contrasts four machines with the eight Fennel pays for, and gives no percentage.
- ac-04 (w-fleet phase 2): The crash comes first, on a machine that stays up; restart keeps the chip where it was, with no NEW ADDR. Only after "Back to bed" does the machine holding `orders` go DOWN: its chips read LOST, and `orders` reads DOWN with "Customers can't place orders." Re-placed copies read NEW ADDR, and their services stay DOWN or DEGRADED until addresses are passed on, with the "still sending orders to machine N" line in between. The closing line names the pull onto the new machine and the free room that made space. No duration or count of minutes appears anywhere.
- ac-05 (w-fleet phase 3): Three `storefront:v13` copies queue. There is never room for all three at once. Stopping v12 copies can take storefront to zero; when it does, the downtime message and "Try the update again" appear. Success needs three v13 serving, no v12 left and no downtime event. The words "rolling update" don't appear.
- ac-06 (w-fleet debrief, k-02): The prompt states its own question and doesn't reuse any option text. The list stays hidden until "Show the list". It names the six jobs in the plan's words, each with the reader's own evidence from the log. Scaling is marked as not done here and tied to the three storefront copies. The spreadsheet line reflects the reader's actual count. The "and more" line names the three missing jobs without later-chapter terms.
- ac-07 (w-fleet, mobile and access): At 360px the four machines sit side by side with no horizontal scroll, and the NEXT row and all four machines fit in one 600px-tall viewport. Text is ≥ 13px; every chip and button is ≥ 44px tall. Every action works by keyboard (machines' free regions and chips are buttons; Escape cancels a selection). Every status is a word plus colour. An aria-live sentence announces each change. The height rule: ≥ 600px reserves the tallest state; < 600px each state takes its own height and scrolls its header into view on change.
- ac-08 (w-fleet, reuse and grammar): Chips and machine frames use Ch 2's `.cp-ctr` / `.cp-machine` grammar (c1 chips, mono `MACHINE` bars), with chip height proportional to size. Every reader-visible word, size, capacity, queue and event lives in `data.js`. The engine has no DOM access. No reuse-only control is visible to the reader.
- ac-09 (s-03, f-01): f-01 pairs each of the six jobs, in the debrief's words, with a manager-visible symptom, plus the spreadsheet row and the "and more" line. The utilization figure appears only as a hedged industry estimate (2014, US corporate data centres), never as Fennel's. Toil is presented as Google's SRE practice, not a survey. No figure for pages, recovery hours or deploy pain. The spreadsheet paragraph links to Ch 1's drift and ends on the Ch 4 bridge question without "desired state".
- ac-10 (k-03): The key (B) says every job grows with each service. B's feedback names toil (manual, repetitive, growing with the service), burnout and Google's under-half target. C's feedback separates what the image does from what the jobs are.
- ac-11 (s-04, A1): `orchestration`, `orchestrator` and `cluster` are each defined once, by what the software does ("all the time", "across machines treated as one pool"), with `cluster` pointing back to the widget's four machines. No mechanism (loops, records of intent, a central brain) is explained. A1's aside carries a visible "Where this analogy breaks" line that names the lack of judgement and says not to picture one boss giving every order.
- ac-12 (k-04): The key (C) is about working between releases. A's feedback says an orchestrator runs images and doesn't build them.
- ac-13 (s-05): Kubernetes is named first here, with an explicit nod to the course's arc. The history states: Google's third container system after Borg and Omega; built new and open source from the start; published in 2014; given to the CNCF (Linux Foundation) at 1.0 in 2015; a community of many companies by 2024 (dated, hedged). The "Borg, open-sourced" retelling is stated fairly, then corrected. Any "Google runs on Borg" is dated to 2016. Docker Swarm and Apache Mesos are named only as other options, with Ch 14 as the place for comparison.
- ac-14 (s-06, k-05, f-02): k-05 is committed before f-02 or the layering prose appears. f-02 shows Docker on one machine and an orchestrator across a cluster, with the image passing between them through the registry, drawn in Ch 2's style. The text says "not competitors in the usual sense" and names Swarm as the exception. It says Docker-built images follow an open standard and run on Kubernetes. The 2022 change gets at most one sentence, and CRI, containerd and dockershim are never named. The DockerCon 2014 launch appears.
- ac-15 (s-07, k-06): k-06's key (A) is the curriculum's question, verbatim. B carries local-01, and its feedback dates the Borg claim. The recap is three lines, and the page ends on the Ch 4 bridge.
- ac-16 (all checks): Every choice item is commit-then-reveal and explains why each tempting option is wrong. Options within an item are similar in length and equally measured: each states a verdict with a reason, and none is the only hedged middle option. Keys vary: A (k-01, k-06), B (k-03, k-05), C (k-04). No scores. k-02's prompt states its own question.
- ac-17 (accuracy guards, page-wide): Re-creating a container is never called fast without the download. No version label is implied to be unchangeable. Fennel gets no utilization percentage. c-05's quote is paraphrased, not quoted. "Orchestrator" is never described as one central brain.

## Curriculum recommendations

Recommendations only; CURRICULUM.md is unchanged.

- **R1 (§6 catalog): add local-01 as m-25, owned by Ch 3, revisited by Ch 14.** "Kubernetes is Google's Borg, open-sourced (and what Google runs on), so it's right for us." Ch 3 states the history accurately and plants the doubt (s-05, k-06 B). The "good enough for Google" leap is Ch 14's question (Fennel isn't Google), and Ch 15 can use it as a distractor.
- **R2 (§6 catalog): add local-02 as m-26, owned by Ch 5, not Ch 3.** "If our machines have enough free room in total, a new or moved container will fit somewhere." Ch 3 deliberately designs it out of w-fleet (sizes chosen so it can't happen) to keep the 3 a.m. phase about the jobs, not a packing puzzle. It belongs with bin packing, requests and pending, where Ch 5's widget can show "idle room everywhere and no room for this one" (research x-01: 100 GB free in 10 GB pieces can't take a 20 GB job). It sits naturally beside m-07.
- **R3 (§6 catalog): add local-03 as m-27, owned by Ch 3, revisited by Ch 4.** "An orchestrator is a fancier deploy script: it puts containers on machines when we release." Ch 3 confronts the *what* (it works between releases, k-04). Ch 4 explains the *how* (loops that keep running), and it rhymes with m-04 ("applying a manifest runs something").
- **R4 (§3 Fennel, after build): record Ch 3's story facts.**
  - Year 2: four services (`storefront`, `orders`, `payments`, `dispatch`) on about eight rented machines, with "what runs where" in Sam's spreadsheet.
  - Copies: storefront 3, orders 1, payments 2, dispatch 3. Sizes, in the widget's room units: 2, 3, 1, 1.
  - Sam's 3 a.m. page: a dispatch copy crashes at 02:51; at 03:04 the machine running `orders` dies, and orders is down until Sam re-places it and passes on the new addresses.
  - Release days: Sam's team-chat message, "Nobody deploy anything, I'm updating storefront"; storefront v12 → v13.
  - Morgan's question: "We pay for eight machines and half look mostly idle. Could four do it?"
  
  Ch 4's "the same 3 a.m. machine failure happens again" should reuse 03:04 and the `orders` machine.
- **R5 (§5 Visuals column, after build):** record ## Visual grammar's additions: chip height by size (1 unit = 44px), the machine body of fixed capacity with a dashed `c6` "N FREE" region, the DOWN machine with LOST chips, the status words RUNNING / CRASHED / LOST / NEW ADDR, the service pills UP / DEGRADED / DOWN, and the `CLUSTER` frame (f-02). Reason: Ch 4–8 should draw machines, containers and the cluster the same way, and w-fleet is built to be reused.
- **R6 (Ch 4 entry):** (a) Widget reuse: drive w-fleet's engine in an automated mode for "kill a machine and predict what happens", with the same machines, services and 03:04 failure, so the reader sees the system do what they did by hand. (b) Retrieval from Ch 3: "which job did Sam do at 3 a.m.?" (replacing, plus connecting). (c) Ch 3's A1 breaks note promises Ch 4 shows "how the work is really divided up" (m-03), and s-03 leaves a question: "What if the record were the thing the machines act on, instead of a note about them?" Ch 4's desired state answers both. (d) "K8s" (the abbreviation managers see in chat) and "Kubernetes means helmsman" are unsourced here (parking lot); if wanted, source them in Ch 4's research.
- **R7 (Ch 5 entry):** local-02 (R2) with research x-01's numbers; w-fleet with a WAITING state as the reuse path. Ch 3's s-03 says "some idle room is insurance; how much is Ch 5's question", so Ch 5 should pick up headroom explicitly. Spreading copies of one service across machines (Ch 3's phase 2 makes the cost of not doing so visible if both copies of something share the dead machine) is the "one sentence that affinity exists" Ch 5 already plans.
- **R8 (Ch 6 entry):** retrieval from Ch 3: "you updated storefront by hand: start a new copy, then stop an old one". Ch 6's rolling update is that, automated. Note too that the update needed spare room (in phase 3 there was never room for all three new copies at once). Ch 6 may reuse w-fleet phase 3 in step-locked automated form.
- **R9 (Ch 7 entry):** the connecting job and the NEW ADDR status are Ch 7's "hand-written address list" pain, already felt once. Ch 7 can retrieve it ("after every move you had to pass on new addresses").
- **R10 (Ch 8 entry):** scaling is the one job Ch 3 names but doesn't do by hand (tied to storefront's three copies "because Friday needs them"). Ch 8's "used to over-provision all week" is consistent with f-01's scaling row.
- **R11 (Ch 6, 9, 12 entries):** the three jobs Ch 3 mentions only as "and more": noticing a container that's running but stuck (Ch 6 probes; Ch 12), handing each container its settings and passwords (Ch 9), and watching it all (Ch 12).
- **R12 (Ch 14 entry):** retrieval from Ch 3: f-01 and k-06's question; local-01 (R1); other orchestrators named only here (Swarm, Mesos; Nomad and AWS ECS are in the parking lot, unsourced); "Kubernetes does not build your application and is not an all-inclusive PaaS" (research c-08 note).
- **R13 (§8 step 5, widget rule):** add one line: "Placement or drag interactions must also work by tap-to-select / tap-to-place and by keyboard" (Ch 3's w-fleet pattern), so later chapters inherit it.
