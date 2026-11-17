# PROGRESS: instructional designer, Ch 8 (handoff 02)

status: complete
updated: all three plan files are complete on disk and `check_plan.py` passes with no errors or warnings. The sections below are the working notes kept for the record; the plan files are the source of truth.

A fresh designer can resume from this file plus the three plan files as they stand. Nothing outside `run/plan/` has been touched.

## Read so far (all whole unless noted)

- `agents/instructional-designer.md`, the handoff `02-instructional-designer.prompt.md`, `run/brief.md`, `run/decisions.md`.
- `run/research/`: `facts.md` (c-01 to c-12 + naming sentences), `examples.md` (x-01 to x-05), `misconceptions.md` (m-11, local-01 to local-03), `parking-lot.md`.
- Skill: `templates/learning-plan.md`, `templates/mockup.html`, `templates/report.md`, `scripts/check_plan.py`, `scripts/_common.py`, `scripts/kb.py`, `references/learning-science-patterns.md`, `cognitive-design-patterns.md`, `ux-ui.md`, `widgets.md` (first part). Not read: `graphics.md` (skim if time).
- `CURRICULUM.md` whole. `explainers/_pool/README.md` whole. `design/control-plane/README.md`.
- Ch 7 plan (`ch-07-services/run/plan/learning-plan.md`): Shape, Objectives, Diagnosis, Disclosures, s-01 to s-04, s-08, s-09, Figures, Visual grammar, Widgets, checks, acceptance criteria, Curriculum recommendations; its cut-list; `CH07_LOOPS` in `site/assets/page.js` (lines 162–187).
- Ch 5: `run/review/human-site-1/comments.md` (42 comments) and `human-site-2`; Revision 1 header of its plan; Revision 0's f-03 and k-06 (node pools); lane F data (Pod ids, F5); the sandbox `model.js` header; facts c-13, c-14, c-24, c-25.
- Ch 4 research x-01 (thermostat).
- Pool check: `cluster.js` draws `state.spare: ['NN']` as a dashed c6 node frame whose body reads `STRINGS.spare`; so a node being started can be drawn data-only with `STRINGS.spare = 'Starting'`.

## Format notes (from the scripts)

- kb.py prints `## Shape` and `## Conventions` to every agent; other free sections are only listed. So the visual grammar goes INSIDE `## Conventions` as `### Visual grammar` (the handoff's done-when names `## Visual grammar`; report this placement). Figures are records `### f-NN — title`. Any `#`–`###` heading ends the record before it. Acceptance criteria are `- ac-NN (target): …`.
- check_plan needs: segments `### s-NN — Title` with `objectives:`, `claims:`, `widget:`, `checks:`; widgets with `complexity:`; objectives listed as `- o-N: … — checks: k-..`; cut-list with `## If it runs long`; mockup with `id="assets"` and no template placeholders.

## Decisions made, and why

### Shape: (c) one lane plus static figures and predict checks; no explorer
- The chain (reading → number of copies → Pod records → no room → waiting → node rented → Pods placed → start → ready) is a process, so it is one scrollytelling lane on the pooled `renderCluster` (§8 step 7), six steps, gated mid-way.
- The entry's goal-free explorer is cut. Reasons: (1) Fennel's dynamics are discrete and story-bound (whole Pods, whole nodes, room that fits exactly three Pods); an honest simulation of two layers over time is a high-complexity widget with five or more interacting elements for a novice; a chart-only simplification would hide the two layers the chapter teaches. (2) What a manager must take from it (each remedy buys minutes with money or effort; none is free) is a set of monotonic trade-offs that a table plus an apply check (k-05) carries in about half the reader's time. (3) The chapter is already over budget without it. (4) User's taste in Ch 5's review: less noise, less repetition. "Pain in the page" (§2.1) is met by predict-then-reveal checks (k-03, k-04, k-06, k-07).
- Alternative offered at the checkpoint (Q2 b): a small "replay the push" explorer that replaces f-05's table (controls: minimum 3/6/9, spare node on/off, Pod start 90 s/30 s, node start 4 min/1 min; precomputed 24 states; outputs minutes short and extra node-hours per week): about +2 minutes and a widget builder. (b) the explorer alone and a second lane for scale-down are in the cut list.

### Size: about 25 minutes planned against a budget of 22
- Table: hero + s-01 2.5 · s-02 3.0 · s-03 3.5 · s-04 5.25 · s-05 2.5 · s-06 3.0 · s-07 2.5 · s-08 0.75 · s-09 2.0 = 25.0. Checks about 4.25 of that, lane about 3. Built page probably 27–29.
- It does not fit 22. Q1: (a) recommended: one chapter at about 25; (b) apply cuts 1–6 of the cut order (about 22.5), no re-plan needed because cut items are tagged in the segments; (c) split after s-05 (8a about 18, 8b about 11–12; not recommended, 8b is leftovers and the conversation needs both halves).

### Objectives
- o-1 to o-3 kept. o-4 reshaped: scaling down and the bill only (copies come down after a five-minute look-back, nodes go back only when emptied after about ten minutes, floors: minimums, services that don't scale, whole nodes, requests; the maximum as a spend cap). Node pools fold into o-1, because a pool (kind of machine, minimum, maximum) is part of how the second loop adds a node. The spot pool is exposure level: one paragraph in s-03 and a dashed pool in f-03, no check (Ch 5's k-06 goes to the cut list as an add-back, about 1 minute). User confirms at checkpoint (Q4).
- Checks: o-1 k-01, k-02, k-03 · o-2 k-04, k-05 · o-3 k-07, k-08 · o-4 k-06, k-08.

### Story facts (all Year 3, consistent with §3; to propose in `## Curriculum recommendations`)
- Work: an ordinary evening is a third of a Friday rush. `dispatch`: about 1.2 cores of work on an ordinary evening, 3.6 at a Friday rush (Ch 5: 6 copies × 0.6).
- Before: `dispatch` 6 copies all week; five nodes 01, 02, 04, 05, 06; 44 of 65 GB reserved.
- Late in Year 3 Ari's team and the dispatch team turn on: (1) `dispatch`'s HorizontalPodAutoscaler: target 60% of the processor each Pod reserves (average), minimum 3, maximum 10; (2) the cluster autoscaler on Fennel's one node pool, "general" (16 GB, 4-core machines; 13 GB · 3.9 cores for Pods), minimum 3, maximum 8.
- Result: `dispatch` 6 → 3; node 05 emptied and given back. Quiet state Q, four nodes, 38 of 52 GB reserved:
  - 01: payments, storefront, dispatch, notifications, catalog = 12 GB (1 free), CPU 2.25 (1.65 free)
  - 02: dispatch ×2, storefront, notifications, catalog = 12 GB (1 free), CPU 3.0 (0.9 free)
  - 04: payments, storefront, orders = 12 GB (1 free), CPU 1.75 (2.15 free)
  - 06: catalog = 2 GB (11 free), CPU 0.25 (3.65 free)
  - (`catalog`'s Pods, replaced at every release, have settled one each on 01, 02, 06.) Node 06 can't be given back: its one 2 GB Pod fits nowhere else (m-26 again).
- Ordinary Friday: 3 → 6 over about an hour; the three extra Pods (2 GB · 1 core each) all fit on node 06; no node is added.
- The push Friday (Friday before a holiday weekend): 17:30 marketing sends every customer a push notification (free delivery this weekend) without telling Ari's team. Timeline (all "~", built on defaults):
  - 17:30 push; `dispatch` 3 copies, reading 50%.
  - ~17:34 reading 180% (three times the target) → HPA writes 9 (ceil(3 × 180/60)).
  - seconds later: six Pod records; three placed on 06 (STARTING); three WAITING, `0/4 nodes are available: 2 Insufficient cpu, 3 Insufficient memory.` (cpu: 02, 06; memory: 01, 02, 04; after the three land, 06 has 5 GB and 0.65 cores free).
  - ~17:34:40 cluster autoscaler asks the provider for one general-pool node (one node holds all three).
  - ~17:36 the three on 06 ready: 6 of 9.
  - ~17:38:30 node 07 (a new machine, new name) ready; the three Pods placed on it.
  - ~17:40 all 9 ready and on `dispatch`'s Service list; reading back to 60%.
  - `dispatch` short of copies for about seven minutes; drivers assigned late. Nothing failed. Ari: "Autoscaling worked. It took seven minutes."
  - After: copies start to fall ~19:05, back to 3 by ~19:20, node 07 given back ~19:30 (about two hours rented).
  - Since then: marketing gives Ari's team a day's notice of a push, and `dispatch`'s minimum is raised for the hour around it.
- Bill: node-hours per week 5 × 168 = 840 before, 4 × 168 + 2 = 674 after, about a fifth less. Morgan: "Orders drop by two-thirds on a Tuesday. Why doesn't the bill?" No prices.
- Bottleneck case: `catalog` gets an autoscaler like `dispatch`'s (target 60%, minimum 3). One Sunday evening of the holiday sale its pages take seconds for about a quarter of an hour: every request waits on the database, which accepts 100 connections (PostgreSQL's typical default, c-12); each `catalog` copy holds up to 30, so three copies hold 90. Reading 25%; the autoscaler does nothing. Riley wants 9 copies by hand; Ari points out 9 × 30 = 270 against 100, and that copies that can't reach the database fail their readiness check (Ch 6) and never join the Service's list (Ch 7). Illustrative arithmetic, Fennel's story, not an industry incident. The fix is on the database's side (Ch 10). `orders` untouched.
- Conversation: at the holiday planning meeting, Sam (proposed speaker; `storefront`, `payments`, `orders` have no autoscaler yet): "We'll turn on autoscaling, so we're ready for the holidays."

### "Twenty minutes"
- Recommended (Q3 a): corrected to about seven minutes with nothing broken, which is the cleaner m-11 lesson ("it worked as designed and still took minutes"). Main text adds two hedged sentences on what stretches it (provider has no machine free and retries after a wait: one provider's initial five-minute backoff; pool at its maximum: Pods wait until a person raises it), details in a disclosure (D4, c-06 and c-07 notes, x-02). Curriculum entry wording to change.
- Alternative (Q3 b): keep twenty with stacked causes (failed node request, five-minute retry, slow image): two more lane steps, about +1 minute; risk: the reader remembers the failure, not the normal lag.

### Which node autoscaler
- Generic: "the cluster autoscaler", offered by the provider as a setting on a node pool. One hedged sentence that newer provisioners pick a machine to fit the waiting Pods without pre-made pools and tend to start nodes faster; names (Karpenter, node auto-provisioning, Autopilot / Auto Mode) only in disclosure D3. Node start "about four minutes" is Fennel fiction inside the sourced "multiple minutes" (c-06); AWS's under-25-seconds figure labelled one vendor, June 2026 (c-07).

### Misconceptions
- m-11 owned: "instant" confronted by k-04 + lane + f-04; "fixes any slowness" by k-07 + f-07.
- local-01 (adds machines when machines get busy): confronted by k-03 in s-03. Propose m-38.
- local-02 (we only pay for what we use; bill tracks traffic): k-06, f-06 and s-06. Propose m-39. Also recommend rewording the entry's "a bill that tracks traffic".
- local-03 (autoscaling replaces capacity planning; it knows our traffic): s-03 (maximum is a person's cap), s-07 (it knows one measurement), k-08. Propose m-40.
- Retrieved: m-31 (k-01), m-29 (k-03 feedback, s-06), m-28 (one sentence after the lane), m-26 (k-06), m-36 (s-07: new Pods and long-lived connections; keeps Ch 7's "Chapter 8 comes back to this").
- Nuance to use in s-03: the cluster autoscaler would NOT have replaced node 03 in Ch 4 (every Pod found room on three nodes); it would have ended Ch 5's hour-long wait in minutes.

### Analogy
- A staffing rule ("keep every agent about 60% busy; never fewer than 3, never more than 10"; new hires need a desk, renting office space takes longer, more agents don't help when everyone waits on the same billing system), as an aside in s-05 after the lane, with a WHERE THIS ANALOGY BREAKS line (the loop has no judgment and knows one number; Pods are identical and disposable). First in the cut order. Thermostat (Ch 4 x-01) goes to the cut list.

### Pool additions
- Recommended (Q5 a): none; the lane is data only. Reading vs. target as a note line `MEASURED · dispatch · 180% of request · target 60%`; the number the HPA writes is the existing record row `WANT 9`; a node being started is `spare: ['07']` with `STRINGS.spare = 'Starting'`; the ready node gets `newNodes`; pool size as a note line. Node pool frames, the gauge (Ch 5's used / reserved / over grammar with a c4 tick at the target) and timelines are chapter-local static figures.
- Alternative (Q5 b): pool-05, a `meter` note type (bar with a target tick) and a `starting` node status with a warn word; every chapter re-gated. Later users: Ch 11, Ch 12.
- The Service block is not drawn in the lane (nine addresses would be clutter); "on its Service's list" is in the step text and a note line.

## Segment list as it stands

- s-01 Year 3: six copies all week (cast, D1, k-01 retrieval of m-31, f-01 a week of work vs. copies, Jordan and Ari) · o-1
- s-02 A loop that changes a number (what it measures, f-02 manifest + three gauge cases, the rule, k-02, TERM 01 HPA, lens, what it needs, D2 other kinds of autoscaling) · o-1
- s-03 A loop that rents machines (k-03 local-01, what it watches, node pool with minimum and maximum, f-03, TERM 02 cluster autoscaler (payoff), TERM 03 node pool, lens, spot paragraph [cut 2], D3) · o-1
- s-04 The Friday it took seven minutes (set-up, lane w-rush-scrolly A1–A6 gated on k-04, f-04 where the minutes went, m-11, m-28, what stretches it, D4) · o-1, o-2
- s-05 Buying back the minutes (f-05 table of five remedies with costs, k-05, what Fennel did, staffing aside [cut 1]) · o-2
- s-06 Scaling down, and Morgan's bill (five-minute and ten-minute waits, k-06, f-06 which node can go back (pooled snapshot with verdicts), f-07 the same week before and after, floors, D5) · o-4
- s-07 When more Pods don't help (k-07, f-08 what `catalog`'s autoscaler saw and what nine copies would ask for, payments' provider, long-lived connections m-36 [cut 4]) · o-3
- s-08 The loops so far (f-09 loop lens table from `CH08_LOOPS`) · o-1
- s-09 The conversation (k-08 think-then-reveal, recap, bridge to Ch 9) · o-2, o-3, o-4

Checks (prompts and options drafted in my notes; final wording goes in the plan): k-01 what ended the hour's wait (key: people on Ari's team) · k-02 3 copies at 120% (key: changes the number wanted to 6, other loops do the rest) · k-03 nodes 85% busy, no Pod waiting (key: nothing) · k-04 how long until the three waiting Pods take work (key: a few minutes) · k-05 TV advert next Friday (key: raise the minimum to 9 at 18:45 for the evening) · k-06 which nodes go back (key: only 07) · k-07 what `catalog`'s autoscaler does (key: nothing, waiting uses little processor) · k-08 the conversation.

Loop lens rows: HPA (wants its service's Pods on average at the target share of the processor they reserve; sees what each ready Pod uses; does rewrites the Deployment's number of copies in proportion, within minimum and maximum, lowering only after about five minutes of lower readings by default; job scaling). Cluster autoscaler, the dashed row filled (wants every Pod on a node, on no more nodes than that takes; sees Pods the scheduler couldn't place and how much of each node is reserved, never how busy it is; does adds a node from a pool up to its maximum, and after about ten minutes by default empties and gives back a node whose Pods all fit elsewhere; job scaling).

## Checkpoint questions to raise (recommended first)

- Q1 size: (a) about 25 minutes, one chapter; (b) cuts 1–6, about 22.5; (c) split after s-05.
- Q2 explorer: (a) none; (b) small replay explorer replacing f-05; (c) explorer instead of the lane (not recommended).
- Q3 twenty minutes: (a) corrected to about seven, nothing broken; (b) twenty with stacked causes.
- Q4 objectives: confirm o-4 reshaped and node pools inside o-1; spot pool at exposure level (or add back Ch 5's k-06).
- Q5 pool: (a) no pool change; (b) pool-05 meter and starting status.
- Q6 story facts: the push, the settings, node 05 given back and node 07, `catalog`'s Sunday, Sam as the conversation's speaker; reword the entry's "a bill that tracks traffic".
- Q7 names: "the HPA" and "the cluster autoscaler" as engineers say them, vs. plain descriptions.
- Q8 analogy: staffing rule (recommended), thermostat, or none.

## Left to do, in order

1. Write `learning-plan.md` in parts: (1) Shape, Conventions (with Visual grammar), Objectives, Diagnosis, Disclosures; (2) Segments s-01 to s-09; (3) Figures f-01 to f-09 and term cards; (4) Widgets (w-rush-scrolly); (5) Comprehension items; (6) Acceptance criteria; (7) Curriculum recommendations.
2. Write `cut-list.md` (cuts, `## If it runs long`).
3. Write `mockup.html` from the template (overview, questions, segments, cuts, assets).
4. Run `python3 .claude/skills/didactician/scripts/check_plan.py explainers/ch-08-autoscaling/run`; fix errors.
5. Mark this file `status: complete`; report in `templates/report.md` format via the hand-back.
