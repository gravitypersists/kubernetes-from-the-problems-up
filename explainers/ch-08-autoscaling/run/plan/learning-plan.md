# Learning plan: The Friday dinner rush: autoscaling (Ch 8, Desired state: Kubernetes from the problems up)

<!-- Written by the instructional designer. Parsed by scripts/check_plan.py. Revision 0 (handoff 02). -->

## Shape

A narrative article set late in Fennel's Year 3, built around **one scrollytelling lane** with static figures and predict checks around it; **no explorer widget**. Two decisions that people at Fennel make by hand (how many copies of `dispatch`, how many nodes) are each handed to a loop, taught one at a time (s-02, s-03), and then shown chained, with their waits, on the one Friday the cluster followed too slowly (s-04, lane A, blueprint B1 on the pooled `renderCluster`). After the lane come what teams do about the wait and what each remedy costs (s-05), scaling down and the bill (s-06), the case where more Pods don't help (s-07), the loop lens table (s-08) and the conversation (s-09).

**Why this form.** The chapter's core is a process with waits inside it: a reading, a number in the record, Pod records, no room, a rented machine, Pods starting, Pods ready. The course's form for a process is a lane (CURRICULUM §8 step 7), and this one reuses a scene the reader knows, Chapter 5's Friday (the waiting strip, a new node), so the only new things on the canvas are the two autoscalers. Everything else is a structure or a comparison, which a static figure shows whole.

**Rejected: the entry's goal-free explorer** (the reader sets a traffic curve and scaling settings). It fails the user's test (does the widget serve a pedagogical need, or add load?) on three counts. Fennel's dynamics are discrete and tied to the story (whole Pods, whole nodes, room for exactly three Pods), so an honest simulation of both layers over time is a high-complexity widget with five or more interacting elements for a novice, while a chart-only simplification would hide the two layers this chapter teaches. What a manager needs from it (every remedy buys minutes with money or effort, and none is free) is a set of one-way trade-offs that a table and an apply check (f-05, k-05) carry in about half the reader's time. And the chapter is over its budget without it. The pain felt in the page (§2.1) comes from four predictions the reader commits to before each reveal (k-03, k-04, k-06, k-07). Checkpoint Q2 offers a small "replay the push" explorer in place of f-05. Also rejected: the explorer alone (no worked example of the chain before the reader explores it), and a second lane for scaling down (two sentences, a check and a snapshot carry it).

**Honest sizing** (CURRICULUM §2.10). Reader time including reading, thinking, the lane and the checks; disclosures not counted.

| Part | Minutes |
|---|---|
| hero + s-01 (cast strip, D1, k-01, six copies all week, f-01, Jordan and Ari) | 2.5 |
| s-02 (what the loop measures, f-02, the rule, k-02, TERM 01, lens, what it needs) | 3.0 |
| s-03 (k-03, what the second loop watches, node pools, f-03, TERM 02, TERM 03, lens) | 3.5 |
| s-04 (set-up, lane A: 6 steps incl. k-04 ≈ 3.0, f-04, the debrief) | 5.25 |
| s-05 (f-05, k-05, what Fennel changed, the staffing aside) | 2.5 |
| s-06 (the two waits on the way down, k-06, f-06, f-07, why the bill fell by a fifth) | 3.0 |
| s-07 (k-07, f-08, the general rule, two more cases) | 2.5 |
| s-08 (f-09) | 0.75 |
| s-09 (k-08, recap, bridge) | 2.0 |
| **total** | **about 25** |

Checks are about 4.25 minutes of that (seven choice checks, one think-then-reveal) and the lane about 3. **This does not fit the 22-minute budget**, and earlier chapters built about 10% over plan, so expect 27–29 built. Four objectives at this depth need about 25; the plan does not thin prose to pretend otherwise. Checkpoint Q1: keep one chapter at about 25 (recommended), apply cuts 1–6 of `cut-list.md` `## If it runs long` (about 22.5; the cut items are tagged `[cut n]` in the segments, so no re-plan is needed), or split after s-05.

toc: yes — nine h2 sections and a read of about 25 minutes; a rail on desktop and a collapsed "Contents" on mobile, as in Ch 1–7.
tokens: user-provided: Control Plane style guide, `design/control-plane/`. Use the course tokens from the shared pool (`pool/tokens.css`) and the pool's kit files as `pool/<file>` (CURRICULUM §8 steps 4–5); follow README.md, the tokens.json notes and `components/bundle.css`. Chapter-only CSS and JS go in `site/assets/`.
mobile: supported. The lane follows §8 step 7 (canvas sticky at the top under 900px, ≤ 50vh; inline snapshots per step where it wouldn't fit or the viewport is under 560px tall). Every static figure re-lays out under 600px; none scales. No horizontal scroll at 360px.

## Conventions

Rules that hold in every segment. Builders and reviewers get this section with every record.

**Course voice** (style guide): second person, present tense, sentence-case headings, no exclamation marks, no emoji. Status always travels as a word plus colour. Kubernetes kinds are capitalised (Pod, Deployment, Service, HorizontalPodAutoscaler); "node" and "node pool" stay lowercase (CURRICULUM §2.12). Fennel's services are lowercase in code font (`dispatch`).

**Names of the two new loops.** *The HorizontalPodAutoscaler* at first use and on its term card, then **the HPA**, as engineers say it; in sentences about what it does for one service, "`dispatch`'s autoscaler" is fine. *The cluster autoscaler*, lowercase, as the name of the job and of the common tool. Never "the autoscaler" alone where either could be meant. Other loops keep their names from earlier chapters: the ReplicaSet loop, the scheduler, the node agent, the endpoints loop.

**Prose rules (binding on the builder; from the user's reviews of Ch 4 and Ch 5):**
- Flowing sentences of varied length with cause and effect spelled out. No chains of fragments. Don't compress prose to hit a time; the minutes in `## Shape` are an estimate.
- **Say a thing once.** Each explanation has one owner, below; elsewhere a clause may point back to it, never re-explain it. The user's Ch 5 review: "I don't want to hammer the reader over the head."
- **Refer to things by what they are** (§2.13): "the Friday in Chapter 5 when a `dispatch` Pod waited an hour", never "17:45" or "lane F" alone; "the following widget", "the figure below", never "W-01" or "Fig. 04" in a sentence. A day doesn't "show" anything, and a figure or a manifest doesn't "say" or "write".
- **Set up every scene before its lane or figure**, and **ground every component before it acts**: what it is, where it runs, what it watches, who turned it on.
- **Name who does what.** The dispatch team and Ari wrote the HPA's record; the HPA changes one number; the ReplicaSet loop writes Pod records; the scheduler places them; the cluster autoscaler asks the provider for a node; the provider starts the machine; the node agent starts containers; the endpoints loop lists ready Pods.
- **Keep the pattern distinct from the implementation.** The reconcile loop is Ch 4's pattern; the HPA and the cluster autoscaler are two more implementations, each described with the §2.3 lens: which loop is it, what does it want (the desired state), what does it see (the real state), and what does it do when the two differ.
- **No meta lines about the course.** Callbacks do work or are cut. Story events from earlier chapters are glossed where first used.
- Pedantic caveats go in disclosures; the main text stays true without them.

**Who owns which explanation.**
- The HPA only changes a number, and other loops do the rest: s-02.
- The cluster autoscaler acts on Pods that are waiting and on reservations, never on how busy nodes are (m-29 again): s-03, in k-03's reveal. s-06 points back in one clause.
- The chain, step by step: lane A. Where the minutes went: f-04. Nothing after s-04 retells the lane.
- What each remedy costs: f-05.
- Why the bill follows nodes, and its floors: s-06.
- The HPA knows one measurement, not the traffic and not what is slow: s-07.

**Hedging (binding; accuracy).**
- Every default carries "by default" or "with default settings" in the same sentence: the HPA looks about every 15 seconds and ignores readings within 10% of the target (c-01); it lowers copies only to the highest number it wanted in the last 5 minutes (c-09); the cluster autoscaler checks for waiting Pods about every 10 seconds (c-04) and gives a node back after about 10 minutes (c-10). A managed provider may change them: say "typically" or "on most set-ups" where the sentence is about what a reader's own cluster will do.
- Fennel's clock times are fiction built on those defaults, always with "about" or "~". A new node "typically takes a few minutes" (c-06); Fennel's four minutes is one value inside that. The general figures are "a minute or two for Pods that fit on room already there; roughly three to eight minutes for Pods that need a new node" (x-01), given once, in s-04.
- Image download and app start times, scheduled or predictive scaling and faster-starting Pods are model-sourced (x-01 step 5, x-03): keep them general ("typically tens of seconds to a couple of minutes"; "someone, or a scheduled job, raises the minimum"), with no product names.
- One vendor's figures are labelled with the vendor and date: AWS's "under 25 seconds" for nodes in its EKS Auto Mode (its own post, June 2026; c-07); AWS's "up to 90%" off for spot machines as a ceiling, read November 2026 (c-05 note); one provider's five-minute first retry (c-06 note). Never as universal.
- The cluster autoscaler is one tool among several: "the cluster autoscaler, or your provider's equivalent" at first use; other names only in D3.
- The database case is Fennel's story and illustrative arithmetic, never "a well-known incident". The 100 is "PostgreSQL's typical default" (c-12); the 30 connections per copy is Fennel's.
- No prices. The bill is counted in nodes and node-hours.

**Vocabulary guard** (brief out_of_scope; ledger §5). Introduced here: HorizontalPodAutoscaler / HPA (s-02), cluster autoscaler (s-03), node pool (s-03). Allowed with a gloss: "target", "minimum", "maximum" (plain words; `minReplicas`, `maxReplicas`, `averageUtilization` only inside f-02's manifest, annotated); "spot machines" (s-03); "placeholder Pods that real Pods can push out" (f-05); "connections" to a database; PostgreSQL (once, s-07); "rate limit" glossed as "a ceiling on calls per second" (s-07). Only in disclosures: vertical autoscaling, event-driven scaling and KEDA (D2); Karpenter, node auto-provisioning, Autopilot, Auto Mode (D3); disruption budgets as "Chapter 14" (D5). The course says "copies", not "replicas", outside manifests. **Never in the body:** Metrics Server, metrics pipeline, utilization (say "share of the processor it reserved"), stabilization window (say "looks back five minutes"), flapping, expander, priority, preemption, taint, toleration, affinity, quota, namespace, StatefulSet, volume, ConfigMap, Secret, connection pooler, service mesh, control-plane fee.

**Fennel's numbers (story facts; one source for every segment, figure and check).**
- Nodes: 16 GB, 4-core machines; 13 GB and 3.9 cores for Pods (Ch 5). Requests per copy (memory · processor): `storefront` 4 GB · 0.5; `orders` 6 GB · 1; `payments` 2 GB · 0.25; `dispatch` 2 GB · 1; `notifications` 2 GB · 0.25; `catalog` 2 GB · 0.25.
- **Before:** `dispatch` at 6 copies all week since the Friday in Chapter 5; five nodes (01, 02, 04, 05, 06); 44 of 65 GB reserved.
- **Work for `dispatch`:** an ordinary evening is about a third of a Friday rush: about 1.2 cores of work against 3.6 (Ch 5: six copies using 0.6 each).
- **The settings:** `dispatch`'s HPA: target 60% of the processor each Pod reserves, averaged over its Pods; minimum 3; maximum 10. The cluster autoscaler on Fennel's one node pool, `general`: minimum 3 nodes, maximum 8.
- **The quiet cluster since then (state Q):** four nodes, 38 of 52 GB reserved. 01: `payments`, `storefront`, `dispatch`, `notifications`, `catalog` (12 GB; 1 GB · 1.65 cores free). 02: `dispatch` ×2, `storefront`, `notifications`, `catalog` (12 GB; 1 GB · 0.9 cores free). 04: `payments`, `storefront`, `orders` (12 GB; 1 GB · 2.15 cores free). 06: `catalog` (2 GB; 11 GB · 3.65 cores free). Node 05 was emptied and given back within the first hour.
- **An ordinary Friday:** `dispatch` goes 3 → 6 over about an hour from 17:00; all three extra Pods fit on node 06; no node is added.
- **The push Friday** (the Friday before a holiday weekend): 17:30 marketing sends every customer a notification offering free delivery, without telling Ari's team. ~17:34 the reading is 180%, three times the target, and the HPA writes 9. Seconds later three new Pods are placed on node 06 and three wait. ~17:36 the three on 06 are ready (6 of 9). ~17:38:30 node 07 is ready and takes the other three. ~17:40 all 9 are ready. `dispatch` was short of copies for about seven minutes, and nothing failed. Copies start to fall at about 19:05, are back to 3 by about 19:20, and node 07 is given back at about 19:30.
- **The bill:** 5 nodes all week before; 4 nodes all week after, plus node 07 for two hours that Friday: about a fifth fewer node-hours.
- **`catalog`'s Sunday:** `catalog` has an HPA like `dispatch`'s (target 60%, minimum 3). Its database accepts 100 connections; each `catalog` copy holds up to 30. For about a quarter of an hour its pages take seconds; the reading is 25%; the HPA does nothing.

### Visual grammar

Extends Ch 1–7's grammar (CURRICULUM §5 Visuals column), unchanged. The rule from the user's reviews: **things different in kind look different.** Six distinctions matter here.

- **Work (demand) vs. copies wanted vs. copies ready.** On charts (f-01, f-07): work is a `c1` line with a soft `c1` area under it, in units of "copies needed at the target", labelled at its end `WORK`; copies wanted or running is a stepped `ink` line labelled `COPIES`; nodes rented is a separate stepped band below, in `c6` outline with one cell per node, labelled `NODES`. In the lane: wanted is the record row's `WANT n` (written, `c4`), ready is the row's filled marks and `n READY`.
- **A reading vs. its target.** The gauge (f-02, f-08): a bar whose outline is 100% of what a Pod reserves (Ch 5: reserved = outline), a solid `c1` fill for what is used (Ch 5: used = solid fill), hatched `warn` for use above 100% (Ch 5: over the request), and a `c4` tick with a mono label `TARGET 60%` (written by a person, so `c4`). The reading is a mono number at the fill's end, `NOW 180%`. Minimum and maximum are `c4` brackets on a row of copy marks, labelled `MIN 3`, `MAX 10`.
- **The two autoscalers.** Both are loops: `c3` pills `↻ HPA` and `↻ cluster autoscaler` with the lens line `SEES · … / DOES · …`. What each changes differs in kind and looks it: the HPA changes a number in the record (`c4`, the record row, step highlight on the row); the cluster autoscaler changes the set of node frames.
- **A Pod waiting vs. a node being started vs. a node ready.** A waiting Pod: Ch 5's dashed chip in the `WAITING · NO ROOM` strip. A node being started: a dashed `c6` node frame with `STARTING` in its body and no Pods (the pool's spare-frame look, with this chapter's word). A ready node: Ch 4's solid frame, with Ch 5's `NEW` tag in the step it arrives. A Pod that is placed but not yet ready: `STARTING` (`warn`); ready: `READY` (`good`), as in Ch 6.
- **Node pools** (f-03 only; moved from Ch 5's cut figure): a thin `ink-3` frame around its nodes with a mono header `NODE POOL · GENERAL · 16 GB, 4-CORE MACHINES` and `MIN 3 · MAX 8` in `c4`; rented nodes are small solid node outlines, nodes the pool may still add are dashed `c6` slots; a pool nobody has rented yet is drawn wholly dashed `c6` with `PROPOSED` or `EXAMPLE`.
- **Time passing.** In the lane, Ch 4's clock kicker with `~`. In f-04, a horizontal bar of labelled segments, one per wait, each tagged with who owns it, over a status band (Ch 6's incident timeline look).
- **Outside the cluster's Pods** (f-08): the database is a solid `ink` box on `surface-2` labelled `DATABASE · NOT A POD`, the same look as Ch 7's provider machine, with its connections as a row of cells.
- Ch 4–7's nodes, Pod ring, GB units, `N GB FREE`, processor footer, record rows, notes and step highlight are unchanged. The Service block is not drawn in this chapter's lane.

## Objectives

The IDs are the brief's. o-4's wording is reshaped and node pools move into o-1 (checkpoint Q4): a node pool is part of how the second loop adds a node (which kind, and how many at most), so it belongs with the mechanism; what scaling down does to the bill is its own predictable outcome with its own misconception (local-02).

- o-1: explain the two layers of autoscaling as two loops and how they chain: the HPA reads a measurement of a service's Pods and changes the number of copies wanted in the record; the new Pods are placed by requests like any others; those that don't fit wait, and the cluster autoscaler, which watches for waiting Pods and never for busy nodes, adds a node of a kind and up to a limit that a node pool sets; fill in the loop lens for both. — checks: k-01, k-02, k-03
- o-2: predict where the minutes go when work rises faster than the cluster can follow (the reading and the decision, a Pod's start, a new node's start, readiness), say what customers see meanwhile, and name what teams do about it, each with its cost. — checks: k-04, k-05
- o-3: explain why adding Pods doesn't help when the limit is somewhere else (a database, the payment provider, connections that never reach the new Pods), predict what an HPA does in that case, and ask what the bottleneck is after the app. — checks: k-07, k-08
- o-4: say what scaling down does and doesn't do to the bill: copies come down cautiously, a node is given back only once it can be emptied, and minimums, services that don't scale, whole nodes and requests set the floor. — checks: k-06, k-08

## Diagnosis

- **Readiness:** novice for infrastructure, intermediate for software. Chunks the reader brings: the record and the loops; the loop lens; a Deployment's number of copies; the scheduler places by requests, never by use (m-29); a Pod with no room waits until a node is added or room freed (m-31), and in Ch 5 a person added the nodes an hour later; nodes are rented machines paid for whether busy or not; readiness; a Service lists ready Pods.
- **Element interactivity: high.** The hardest moment is the lane's middle (A3–A5): a reading and its target, the number wanted, Pods placed and Pods waiting, a node being started, and readiness, at least six elements. Managed by:
  - **pre-training:** s-02 teaches the HPA alone and s-03 the cluster autoscaler alone, each with a static figure, a check and a term card, so each enters the lane as one chunk;
  - **a known scene:** the canvas is Ch 5's Friday (waiting strip, scheduler note, a new node), so only the two loops' pills and the reading are new;
  - **one change per step,** with the changed thing highlighted and its value on the canvas;
  - **a gate at the key transition** (k-04, before the node arrives).
- **Second moment: s-06**, two conditions for giving a node back plus two waits. Managed by asking k-06 on a concrete state and showing the answer on the nodes (f-06).
- **Misconceptions confronted** (catalog ID; three proposed locals):
  - **m-11** (owned). "Instant": k-04, lane A, f-04. "Fixes any slowness": k-07, f-08. Stated fairly both times: the HPA's own decision does take well under a minute, and more Pods do fix slowness that comes from too few Pods.
  - **local-01**, "the cluster adds machines when the machines get busy": k-03 and s-03.
  - **local-02**, "with autoscaling we pay only for what we use": k-06, f-07 and s-06.
  - **local-03**, "once autoscaling is on, capacity planning is done; it knows our traffic": s-03 (the maximum is a person's cap on spend), s-07 (one measurement and a target), k-08.
- **Retrieved:** m-31 (k-01), m-29 (k-03's feedback), m-28 (one sentence after the lane), m-26 (k-06), m-36 (s-07).
- **Analogy:** a staffing rule, after the lane (s-05), with its breaks line. First in the cut order.

## Disclosures

`<details class="d-more cp-more">`, collapsed, all optional; the main text reads correctly with all of them closed.
- D1 (s-01) "I didn't read the last chapter. What happened?"
- D2 (s-02) "Does it have to be processor use? And other kinds of autoscaling" (c-02 note; the naming sentences in facts.md)
- D3 (s-03) "My engineers say Karpenter, or node auto-provisioning. Is that this loop?" (c-04 note, c-07)
- D4 (s-04) "Could it take twenty minutes?" (c-06 note, c-07 note, x-02)
- D5 (s-06) "What else stops a node being given back?" (c-10 note)

## Segments

Content bullets give the points in order, in draft wording; the builder writes the prose. Quoted lines of dialogue are story facts and stay as written. `[cut n]` marks an item in `cut-list.md` `## If it runs long`.

### s-01 — Year 3: six copies, all week
intent: Re-establish the cast, retrieve what ended the hour-long wait in Chapter 5 (a person, k-01), and show the waste the chapter starts from: `dispatch` runs six copies all week for two hours of rush, on five nodes, because two decisions are still made by hand.
objectives: o-1
claims: c-04
readiness: novice · interactivity: low (work over a week; copies; who decides) · max-elements: 3
mode: orientation → retrieval (choice) → concrete story (pain seen in meetings) · blueprint: none
layout:
  contiguity: adjacent. Cast strip and D1 first, then k-01, then the scene with f-01 beside its paragraph.
  pacing: continuous
  redundancy: the prose gives the two numbers f-01 turns on (a third; six) and doesn't walk the chart.
  scaffold: D1, collapsed: "I didn't read the last chapter. What happened?"
ux: Glance at the cast strip, optionally open D1, commit to k-01, read four short paragraphs and f-01. At 360px the cast strip wraps and f-01 is full width with its labels at the line ends.
figure: f-01
widget: none
checks: k-01
content: these points, in order:
  - **Hero standfirst** (draft; it must not say what either loop watches, that scaling takes minutes, or that more Pods can fail to help): "Every Friday evening Fennel's orders triple for two hours. This chapter follows the two loops that add copies and machines for the rush and take them away afterwards, the Friday they weren't fast enough, and what it all did to Morgan's bill."
  - **Cast strip:** "**Jordan**, co-founder, managing the engineers: that's you, in this story. **Ari**, platform lead; runs Fennel's cluster. **Morgan**, co-founder; runs Fennel's money. **Riley**, an engineer on the `catalog` team. **Sam**, the founding engineer."
  - **D1:** Chapter 4's record and loops in two sentences, with the lens in §2.3's wording; Chapter 5: the scheduler places each Pod by what it reserves (its requests), never by what it uses, a Pod with no room waits, and Fennel pays for every node it rents; Chapter 6: a Pod takes work only once it is ready; Chapter 7: each service has a Service whose list holds its ready Pods.
  - k-01.
  - **The scene.** Since that Friday, `dispatch` has run six copies all week, though it needs them for about two hours: between five and seven on a Friday, orders triple. Nodes 05 and 06, rented that evening, are still on the bill. (Morgan's question from Chapter 5, glossed in one clause: "five nodes, less than a third busy".)
  - **f-01.**
  - **Two decisions made by hand.** How many copies of `dispatch` to run is the dispatch team's decision; how many nodes to rent is Ari's team's. Both were made once, for the busiest hour, and left.
  - **Jordan and Ari** (`.cp-dialog`). Jordan: "Can't the cluster add copies when it's busy, and take them away when it isn't?" Ari: "It can. Two loops do it between them. Neither is as quick as you'd hope."

### s-02 — A loop that changes a number
intent: Teach the HPA alone: what it measures (each Pod's processor use as a share of what it reserved), what a person writes for it (a target, a minimum, a maximum), its proportional rule, and that all it does is rewrite the number of copies a Deployment wants; then name it and fill in its lens.
objectives: o-1
claims: c-01, c-02, c-03
readiness: novice · interactivity: medium (a reading; a target; the number wanted) · max-elements: 3
mode: concrete case → worked example → apply (choice) → name (term card) → lens · blueprint: none
layout:
  contiguity: inline. f-02's annotations sit on the manifest lines; each gauge case carries its reading, the target tick and the resulting number on the drawing.
  pacing: continuous; TERM 01 and the lens paragraph come after k-02.
  redundancy: the prose works one case; f-02 shows it and two more; the prose doesn't read the other two aloud.
  scaffold: D2, collapsed.
ux: Read two paragraphs, study f-02, commit to k-02, read TERM 01 and two paragraphs; optionally open D2. At 360px f-02's cases stack under the manifest.
figure: f-02; TERM 01 (see t-01)
widget: none
checks: k-02
content: these points, in order:
  - **What it measures** (c-02). Each `dispatch` Pod reserves one processor core (Chapter 5). On an ordinary evening a copy uses about 0.4 of it: 40% of what it reserved. Kubernetes can read that share for every Pod. (One clause: so a service with no requests set gives this loop nothing to read.)
  - **What the team writes** (c-03). The dispatch team, with Ari, adds one short record beside `dispatch`'s Deployment: keep the average at about 60%; never fewer than 3 copies; never more than 10.
  - **f-02.**
  - **The rule, one case** (c-01). The loop compares the reading with the target and scales the number of copies by the same ratio, rounding up: six copies reading 90%, one and a half times the target, become nine. It never goes below the minimum or above the maximum; at the maximum it simply stops (c-03).
  - k-02.
  - **TERM 01** (HorizontalPodAutoscaler, HPA), first use as `dfn`.
  - **Its lens** (pattern vs. implementation). One more loop in the control plane. It wants its service's Pods, on average, at the target. It sees what each Pod is using. When the two differ, it rewrites one number, the copies its Deployment wants. Starting the Pods is the work of loops from earlier chapters: the ReplicaSet loop writes Pod records, the scheduler places them, node agents start them.
  - **What it needs, and its pace** (c-01 note, c-02 note; hedged). By default it looks about every fifteen seconds and leaves a reading within a tenth of the target alone. It reads a share of the request, so a padded request (Chapter 5) makes a busy Pod look idle and the loop act late. The measurement needn't be processor use (D2).
  - **D2:** it can read memory or a measurement the team defines, and with several it takes the largest answer (Chapter 12 on measurements). Two other kinds you'll hear named: vertical autoscaling changes each Pod's requests instead of the number of Pods, and is an add-on; event-driven scaling (KEDA is the usual tool) scales on things like the length of a queue, and can take a service down to zero copies.

### s-03 — A loop that rents machines
intent: Teach the cluster autoscaler alone: confront local-01 with a prediction (busy nodes, no waiting Pod), then give what it watches (Pods the scheduler couldn't place), how it knows what to add (a node pool: one kind of machine, a minimum and a maximum that people set), and its lens; name both.
objectives: o-1
claims: c-04, c-05
readiness: novice · interactivity: medium (waiting Pods; a kind of machine; a limit) · max-elements: 3
mode: ground the component → predict (misconception) → reveal → concrete artefact (f-03) → names (term cards) → lens · blueprint: none
layout:
  contiguity: inline. f-03 labels each pool's machine kind and limits on its frame; the loop's pill sits on the pool it changes.
  pacing: gated on k-03: everything from "What it watches" to the end of the segment collapses to a locked plate until the reader commits.
  redundancy: the caption gives the takeaway; the prose doesn't list f-03's nodes.
  scaffold: D3, collapsed.
ux: Read two paragraphs, commit to k-03, read three paragraphs with f-03 and two term cards; optionally open D3. At 360px f-03's pools stack.
figure: f-03; TERM 02, TERM 03 (see t-01)
widget: none
checks: k-03
content: these points, in order:
  - **Where the first loop leaves off.** When the HPA raises the number, the new Pods are placed like any others, by their requests. On the Friday in Chapter 5 that is where things stopped: one Pod had no room and waited an hour, until Ari's team rented nodes.
  - **The component, grounded** (c-04, c-05). Managed Kubernetes offers a loop for that last step, usually as a setting the platform team switches on: the cluster autoscaler, or your provider's equivalent. It can ask the provider for another node and hand one back. Ari's team switched it on the same week as `dispatch`'s HPA.
  - k-03.
  - **What it watches** (c-04; owner of this explanation). Pods the scheduler has tried and failed to place. It never looks at how busy the nodes are, because the scheduler doesn't either: room is counted in reservations (Chapter 5). The fair part of the other answer: the HPA does start from a reading of use, so the first layer reacts to busy Pods; the second reacts only to Pods without a node.
  - **Two callbacks that do work.** It would have ended that hour's wait in Chapter 5 in minutes. It would not have replaced node 03 when it died in Chapter 4: every Pod found room on the three nodes left, so nothing waited.
  - **Which kind of machine: node pools** (c-04 note, c-05; Ch 5's c-24 by reference). Before asking for a node, the loop works out whether a new one would give the waiting Pods room, so it has to know what a new node would be. A node pool is a group of identical machines that the cluster can add to or shrink. Fennel has one, of the 16 GB machines it has always rented, and Ari's team gave it a minimum of 3 nodes and a maximum of 8. The maximum is a person's decision and a cap on spend: at it, the loop stops and Pods wait (local-03).
  - **f-03.**
  - **TERM 02** (cluster autoscaler, payoff variant), **TERM 03** (node pool).
  - **Several pools, several kinds** (c-05 note; Ch 5's c-24, c-25 by reference). If `orders` ever outgrows a 13 GB node (Chapter 5), no number of general nodes helps: someone has to define a pool of bigger machines first. `[cut 2]` Ari has also proposed a pool of spot machines, which cost less because the provider can take one back at a couple of minutes' notice; `notifications` could live there, `orders` and `payments` would not.
  - **Its lens.** It wants every Pod on a node, on no more nodes than that takes. It sees Pods the scheduler couldn't place, and how much of each node is reserved. When they differ, it adds a node from a pool, up to the pool's maximum, or empties and gives back a node it can do without (how cautiously is s-06's subject).
  - **D3:** names differ by provider and tool. Some newer tools (Karpenter, and the "node auto-provisioning" or fully managed modes built on it or like it) skip pre-made pools and pick a machine to fit the waiting Pods, within limits the team sets, and tend to start nodes faster. They react to the same thing: Pods with no room.

### s-04 — The Friday it took seven minutes
intent: Show both loops chained on one evening, with every wait visible: the HPA decides within a minute, Pods that fit on existing room are ready a minute or two later, Pods that need a new node wait for a machine to start; confront m-11's "instant" at the gate (k-04), then lay out where the seven minutes went and what can stretch them.
objectives: o-1, o-2
claims: c-01, c-04, c-06, c-07, c-08
readiness: novice · interactivity: high (reading and target; number wanted; Pods placed and waiting; a node starting; readiness) · max-elements: 3
mode: scene set-up → step-locked worked example (scrollytelling, B1) with a predict gate → timeline figure → misconception named · blueprint: B1
layout:
  contiguity: sticky. The canvas stays in view while the steps scroll. The reading and target, the row's WANT and READY counts, each Pod's status, the starting node and the customers line are on the canvas, not only in the text.
  pacing: step-revealed by scrolling; A4–A6 gated on k-04.
  redundancy: step text says what changed and why, reading aloud only the one value each step turns on. After the lane, f-04 carries the times; the prose doesn't replay the steps.
  scaffold: D4, collapsed.
ux: Read the set-up (two paragraphs), scroll A1–A3, commit to k-04 in the step column, scroll A4–A6, study f-04, read three paragraphs; optionally open D4. At 360px the canvas is sticky at the top or, where it wouldn't fit in 50vh, each step shows its own inline snapshot (four node columns in A1–A3, five from A4); f-04 becomes a vertical list of waits.
figure: f-04
widget: w-rush-scrolly (complexity: low) — lane A, "Friday, 17:30: the push", 6 steps on the pooled `renderCluster` and lane controller, data only, gated on k-04; its data file also holds f-06's snapshot
checks: k-04
content: these points, in order:
  - **Set-up, before the lane.** What the cluster looks like now: four nodes, because within an hour of the two loops being switched on, `dispatch` went from six copies to three and node 05 was emptied and given back (how is s-06's subject). On an ordinary Friday the rush builds over an hour, `dispatch` goes from three copies to six, and the three extra Pods fit on node 06, each ready a minute or two after it is asked for; nobody notices. What is new on the drawing: the reading and its target as a line under the nodes, and the two loops' pills. Then the evening itself: on the Friday before a holiday weekend, at 17:30, Fennel's marketing team sent every customer a notification offering free delivery, and told nobody on Ari's team.
  - **Lane A** (steps under w-rush-scrolly).
  - **f-04**, introduced by Ari's line. Jordan, on Monday: "We have autoscaling. Why were we slow?" Ari: "Autoscaling worked. It took seven minutes."
  - **The debrief** (m-11; c-06, c-08 note; x-01). The decision was the quick part: the HPA had asked for nine copies within a minute. Everything after it takes the time it takes: a Pod has to download its image, start and pass its readiness check, and a rented machine has to start and join the cluster first. In general, Pods that fit on room already there are typically working in a minute or two, and Pods that need a new node in roughly three to eight minutes, depending mostly on the provider. One sentence of retrieval (m-28): Chapter 4's replacement Pods took about six minutes for the same kind of reason; each loop is quick, and the waits between them are not.
  - **When it's longer** (c-05, c-06 note; hedged). Nothing failed that Friday. If the provider has no machine of that kind free, the request is tried again after a wait of minutes; and if the pool is already at its maximum, the Pods wait until a person raises it.
  - **D4:** on one provider the first retry comes after five minutes and the waits can grow to thirty; AWS has described a customer whose very large scale-up took 23 minutes because of repeated retries; and the cluster autoscaler by default gives a requested node up to 15 minutes to appear before it gives up on it. Twenty minutes is what stacked delays look like, not what autoscaling normally costs.

### s-05 — Buying back the minutes
intent: Give what teams do about the wait, each remedy with what it shortens and what it costs, so the reader sees that every one buys minutes with money or effort; apply it to a new planned rush (k-05); say what Fennel changed.
objectives: o-2
claims: c-01, c-03, c-07, c-11
readiness: novice · interactivity: medium (which wait; what it costs) · max-elements: 3
mode: comparison table → apply (choice) → story close → analogy aside · blueprint: none
layout:
  contiguity: inline. Each row of f-05 names the wait it shortens with the same label and colour mark as that wait's segment in f-04.
  pacing: continuous
  redundancy: one lead-in sentence; the table carries the remedies; the prose doesn't repeat rows.
  scaffold: none
ux: Read one sentence, scan f-05 (five rows), commit to k-05, read one paragraph and the aside. At 360px f-05 becomes five stacked cards.
figure: f-05
widget: none
checks: k-05
content: these points, in order:
  - Lead-in: none of the waits can be removed, but each can be paid down, and each payment is different.
  - **f-05.**
  - k-05.
  - **What Fennel changed.** Marketing now gives Ari's team a day's notice of any push, and `dispatch`'s minimum is raised for the hour around it. The cheapest fix was a conversation.
  - `[cut 1]` **Aside, "A staffing rule, and where it breaks"** (`.cp-aside` with `.cp-breaks`). The HPA is a standing rule for a support team: keep everyone about 60% busy, never fewer than three people on shift, never more than ten. New people need a desk; when the office is full, renting more space takes far longer than calling someone in, and that is the cluster autoscaler. WHERE THIS ANALOGY BREAKS: a manager would have known the push was coming, and would notice if the team were slow because everyone was waiting on the same broken tool. The loop knows one number and has no judgment; and Pods are identical and disposable, which people are not.

### s-06 — Scaling down, and Morgan's bill
intent: Show that the way down is slower and more cautious on purpose (copies after a five-minute look-back; a node only once its Pods all fit elsewhere, after about ten minutes), let the reader predict which node goes back (k-06), and explain why Fennel's bill fell by a fifth and not by two-thirds: it follows nodes, and minimums, services that don't scale, whole machines and requests set the floor (local-02).
objectives: o-4
claims: c-05, c-09, c-10
readiness: novice · interactivity: high (two waits; two conditions; nodes vs. copies) · max-elements: 3
mode: concrete timeline in prose → predict → reveal figure → before-and-after chart → rule · blueprint: none
layout:
  contiguity: inline. f-06 prints on each node why it can or can't go back; f-07 labels work, copies and nodes at their line ends, the two weeks on one time axis.
  pacing: gated on k-06: f-06 and the paragraph after it collapse to a locked plate until the reader commits.
  redundancy: the prose doesn't walk f-07; it gives the one comparison (a fifth against two-thirds) and the reasons.
  scaffold: D5, collapsed.
ux: Read two paragraphs, commit to k-06, see f-06 and one paragraph, study f-07, read two paragraphs; optionally open D5. At 360px f-06's five nodes wrap to two rows and f-07's two weeks stack.
figure: f-06, f-07
widget: none
checks: k-06
content: these points, in order:
  - **Copies come down slowly, on purpose** (c-09). That Friday, orders eased from about seven. By default the HPA lowers the number only as far as the highest it wanted in the last five minutes, so that a brief dip doesn't remove copies the next minute needs. `dispatch` started down at about 19:05 and was back at three by about 19:20.
  - **Nodes come down more slowly still** (c-10). Removing Pods doesn't remove a node. The cluster autoscaler gives a node back only if its Pods reserve less than half of it, every one of them fits on another node, and that has stayed true for about ten minutes, by default.
  - k-06.
  - **f-06** (gated), then one paragraph: node 07 went back at about 19:30, after two hours on the bill. Node 06 stays for the reason it stayed in the first week: its one Pod reserves 2 GB and no other node has more than 1 GB free. A Pod on a node that is given back is replaced on another node, like any Pod (Chapter 4); the loop counts reservations again, not use (one clause pointing back to s-03).
  - **Morgan's question.** Morgan: "Orders drop by two-thirds on a Tuesday. Why doesn't the bill?" Ari: "Because we pay for nodes, and a node goes back only when everything on it fits somewhere else."
  - **f-07.**
  - **Why a fifth, and what sets the floor** (c-05, c-10 note; local-02). Fennel went from five nodes to four: about a fifth fewer node-hours. The copies follow the work closely; the bill follows nodes, in whole machines. Under it sits a floor: the minimums people chose, the services that don't scale at all, and every request, since a node full of padded reservations never looks empty to this loop (Chapter 5's lesson, now with a second consequence). One sentence, hedged: a cluster with many more nodes moves in finer steps, but the floor is made of the same things.
  - **D5:** a Pod that no loop would replace, a Pod using storage on the node itself, or a team's rule limiting how many copies may be down at once (disruption budgets, Chapter 14) can each keep a node; and by default no node is given back within about ten minutes of one being added.

### s-07 — When more Pods don't help
intent: Confront the second half of m-11 ("fixes any slowness"): on `catalog`'s slow Sunday the limit was its database, the HPA saw idle processors and did nothing (k-07), and more copies would have asked the database for connections it doesn't have; generalise to "what is the bottleneck after the app?" and to two more cases.
objectives: o-3
claims: c-01, c-02, c-12
readiness: novice · interactivity: medium (what the loop reads; where requests wait; a fixed limit) · max-elements: 3
mode: concrete story → predict (misconception) → reveal figure → rule → two transfer cases · blueprint: none
layout:
  contiguity: inline. f-08 puts the reading on each Pod, the connection counts on the database, and the arithmetic for nine copies beside it.
  pacing: gated on k-07: f-08 and everything after it collapse to a locked plate until the reader commits.
  redundancy: the prose states the rule after f-08 and doesn't re-read its numbers.
  scaffold: none
ux: Read two paragraphs, commit to k-07, see f-08, read three paragraphs. At 360px f-08's two panels stack.
figure: f-08
widget: none
checks: k-07
content: these points, in order:
  - **The fair part.** When a service is slow because it has too few copies for its work, more copies fix it; that was `dispatch` on the push Friday. So after that Friday the `catalog` team gave `catalog` an HPA of its own, with the same 60% target.
  - **The scene.** On the Sunday evening of the holiday sale, `catalog`'s pages took seconds to load for about a quarter of an hour. Each request was waiting for an answer from the database `catalog` reads its prices from. (One clause: the database is not one of the cluster's Pods in this story; where databases should run is Chapter 10.)
  - k-07.
  - **f-08** (gated).
  - **What the loop could see** (c-01, c-02; owner of this explanation). The HPA knows one measurement and a target. It doesn't know how many customers are waiting or what they're waiting for. A Pod waiting on a database is barely using its processor, so the reading said all was well.
  - **What more copies would have done** (c-12; illustrative arithmetic, labelled). Riley's first thought was to raise `catalog` to nine copies by hand. The database accepts 100 connections at a time, PostgreSQL's typical default, and each `catalog` copy holds up to 30, so three copies already hold 90. Nine would ask for 270. The extra copies couldn't connect, would fail the readiness check that asks whether they can reach the database (Chapter 6), and would never be listed by `catalog`'s Service (Chapter 7); and they would compete with the copies that were working. The fix was on the database's side, which is Chapter 10's subject.
  - **The rule and the question.** Adding Pods helps only when Pods are what's short. The question to ask of any plan to autoscale: what is the bottleneck after the app?
  - `[cut 4]` **Two more places the limit can sit.** `payments` calls a payment provider that accepts only so many calls a second from Fennel (a rate limit): more `payments` Pods mean more callers under the same ceiling. And the work has to reach the new Pods: a Service picks a Pod when a connection opens (Chapter 7), so callers that keep long-lived connections stay on the old Pods, and new copies stand nearly idle until connections reopen.

### s-08 — The loops so far
intent: Fill in the course's loop lens table: the dashed "a loop that adds nodes" row becomes the cluster autoscaler and the HPA joins, so the reader sees both as two more implementations of one pattern, sharing the job Chapter 3 called scaling.
objectives: o-1
claims: c-03, c-04, c-09, c-10
readiness: novice · interactivity: low (one row filled in; one new row) · max-elements: 2
mode: consolidation (the course table) · blueprint: none
layout:
  contiguity: inline. NEW IN CH 8 tags sit in the cells that changed.
  pacing: continuous
  redundancy: one lead-in sentence; the table carries the content.
  scaffold: none
ux: Read one sentence, scan f-09 (nine rows; two tagged). At 360px the table becomes stacked cards.
figure: f-09
widget: none
checks: none
content: these points, in order:
  - Lead-in: "Scaling was the last of Sam's jobs without a loop. It now has two: one changes how many copies a service wants, and one changes how many nodes there are to put them on."
  - f-09.

### s-09 — The conversation
intent: Rehearse CO-4 with the chapter's conversation ("We'll turn on autoscaling, so we're ready for the holidays.") as a think-then-reveal whose model answer interleaves o-2, o-3 and o-4; recap; bridge to Chapter 9.
objectives: o-2, o-3, o-4
claims: c-03, c-05, c-06, c-12
readiness: novice · interactivity: medium (speed against the rise; the bottleneck; the limits and who set them) · max-elements: 3
mode: think-then-reveal (apply) → recap → forward bridge · blueprint: none
layout:
  contiguity: adjacent
  pacing: think-then-reveal: the model answer is hidden until "Show the answer".
  redundancy: the recap lists ideas, not the story, and doesn't repeat k-08's model answer.
  scaffold: none
ux: Read a three-line scene, think, reveal k-08's model answer, read the recap (six lines) and the bridge. At 360px all full width.
figure: none
widget: none
checks: k-08
content: these points, in order:
  - **The scene.** The holiday planning meeting. `storefront`, `payments` and `orders` have no autoscaler yet. Sam: "We'll turn on autoscaling, so we're ready for the holidays."
  - k-08.
  - **Recap** (`.cp-recap`): the HPA reads one measurement of a service's Pods and rewrites the number of copies wanted, between a minimum and a maximum people chose; the cluster autoscaler adds a node when a Pod is waiting for room, never because nodes are busy, of a kind and up to a limit a node pool sets; chained, they take minutes, most of them spent starting machines and Pods; every way of shortening that costs money or effort; on the way down a node goes back only when it can be emptied, so the bill follows nodes and has a floor; more Pods help only when Pods are what's short.
  - **Bridge** (forward-looking; draft): "A year on, Fennel has six teams and thirty services, and `payments` has to run in staging and in production with different settings and different keys. Where those settings and keys live, and who can read them, is Chapter 9."

## Figures

Every figure is drawn for this chapter (no third-party media). All are static except f-06, which the pooled renderer draws from the lane's data file. Header bars follow the style guide (`FIG. 0N` left, a terse subject right). Each has an accessible name stating its takeaway.

### f-01 — One week of `dispatch`, before (s-01)
- **Model.** Static chart, header `FIG. 01 · DISPATCH, ONE WEEK`. Time axis Monday to Sunday, ticks per day; the Friday rush (17:00–19:00) marked with a thin `ink-3` band labelled `FRI 5–7 PM`. Two series in the grammar's chart look: `WORK` (a `c1` line with soft area, in copies needed at a 60% target: about 2 through most evenings, low overnight, rising to 6 at the Friday rush; daily bumps are illustrative) and `COPIES` (a stepped `ink` line, flat at 6). The gap between them carries one direct label, `RUNNING, NOT NEEDED`. Below, the `NODES` band: five cells, all week.
- **Caption.** "Fig. 01. Six copies and five nodes all week, for two hours of rush. The shape of the week is illustrative."
- **Size.** Desktop prose width, about 220px tall. At 360px full width, about 200px; labels sit at line ends, no legend.

### f-02 — `dispatch`'s autoscaler: what the team wrote, and what the loop does with a reading (s-02)
- **Model.** Static, header `FIG. 02 · DISPATCH'S AUTOSCALER`. Two columns.
  - **Left, `WRITTEN BY THE DISPATCH TEAM`:** Ch 4's manifest treatment (`.mf`, `c4` on `c4-soft`, annotations beside lines), shortened: `kind: HorizontalPodAutoscaler` ("one more record"); `scaleTargetRef:` / `kind: Deployment` / `name: dispatch` ("whose number of copies it may change"); `minReplicas: 3` ("never fewer"); `maxReplicas: 10` ("never more"); `metrics:` … `averageUtilization: 60` ("the target: 60% of the processor each Pod reserves, on average").
  - **Right, `THREE READINGS`:** three rows, each a gauge (see Visual grammar: outline = what a Pod reserves, solid `c1` fill = the reading, hatched `warn` above 100%, `c4` tick `TARGET 60%`) followed by a row of copy marks with `c4` brackets `MIN 3` and `MAX 10`, and a one-line result:
    1. `6 COPIES · NOW 90%` → `1.5 × the target → WANTS 9`.
    2. `3 COPIES · NOW 40%` → `WOULD BE 2 · MINIMUM IS 3 → STAYS 3`.
    3. `6 COPIES · NOW 150%` → `WOULD BE 15 · MAXIMUM IS 10 → WANTS 10`.
  Row 1 is the case the prose works; none of the rows is k-02's case (3 copies at 120%).
- **Caption.** "Fig. 02. The team writes a target and two limits; the loop turns each reading into a number of copies. Shortened."
- **Size.** Desktop `.d-wide`, about 320px tall. Under 600px the three readings drop under the manifest, about 620px at 360px.

### f-03 — Fennel's cluster as node pools (s-03, revealed after k-03)
- **Model.** Static, header `FIG. 03 · FENNEL'S NODE POOLS`. One `CLUSTER` frame (Ch 3's 3px `ink` frame) holding three pool frames in the grammar's pool look:
  - `NODE POOL · GENERAL · 16 GB, 4-CORE MACHINES` with `MIN 3 · MAX 8` in `c4`: four small solid node outlines `01 02 04 06` (no Pods drawn; this figure is about kinds of machine and limits), then four dashed `c6` slots, the first labelled `NEXT NODE WOULD GO HERE`. A `↻ cluster autoscaler` pill (`c3`) sits on this frame's header with the line `ADDS AND GIVES BACK NODES OF THIS KIND, BETWEEN 3 AND 8`.
  - `NODE POOL · LARGE MEMORY · 64 GB MACHINES`, wholly dashed `c6`, tagged `EXAMPLE`, labelled "if `orders` outgrew a 13 GB node".
  - `[cut 2]` `NODE POOL · SPOT · CHEAPER, CAN BE TAKEN BACK`, wholly dashed `c6`, tagged `PROPOSED`, labelled "for work that can be interrupted; not `orders` or `payments`".
- **Caption.** "Fig. 03. Every node in a pool is the same kind of machine. The loop can only add kinds that someone has defined, up to the maximum that someone chose."
- **Gate.** Part of s-03's gated block (after k-03).
- **Size.** Desktop `.d-wide`, about 240px tall; under 600px the pools stack, about 460px.

### f-04 — Where the seven minutes went (s-04, after lane A)
- **Model.** Static timeline, header `FIG. 04 · THE PUSH FRIDAY, 17:30–17:40`, in Ch 6's incident-timeline look. A time axis from 17:30 to 17:41 with a mark at 17:30 `PUSH SENT`. Two tracks of labelled segments, each segment tagged with who owns the wait:
  - **Track 1, `3 PODS THAT FITTED ON NODE 06`:** `READING CLIMBS` (17:30–~17:34, `ink-3`, "orders arrive") → `HPA DECIDES` (~17:34 to ~17:34:30, tag `HPA · UNDER A MINUTE`) → `PLACED` (a tick, tag `SCHEDULER · SECONDS`) → `POD STARTS: IMAGE, APP, READINESS CHECK` (to ~17:36, tag `NODE AGENT · ABOUT 1.5 MIN`) → `READY`.
  - **Track 2, `3 PODS THAT NEEDED A NODE`:** the same first two segments (shared, drawn once across both tracks) → `WAITING · NO ROOM` begins → `NODE 07 RENTED AND STARTING` (~17:34:40 to ~17:38:30, tag `PROVIDER · ABOUT 4 MIN`, the widest segment, in the dashed `c6` starting-node look) → `POD STARTS` (to ~17:40, same tag as above) → `READY`.
  - **Status band** beneath, `DISPATCH · COPIES READY`: `3 OF 9` (`bad`, ~17:34–17:36) · `6 OF 9` (`warn`, ~17:36–17:40) · `9 OF 9` (`good`, from ~17:40); before 17:34 `3 OF 3` (`good`).
  Each wait's segment carries a small colour mark that f-05 reuses on the remedy that shortens it.
- **Caption.** "Fig. 04. The decision took under a minute. Most of the seven went on starting a machine, then starting Pods on it. Fennel's times are fiction built on default settings; yours depend mostly on your provider."
- **Size.** Desktop `.d-wide`, about 260px tall. Under 600px a vertical list: each wait a row with its owner and duration, the status band as a column at the left; about 520px at 360px.

### f-05 — Five ways to buy back the minutes (s-05)
- **Model.** Static table (stacked cards under 600px), header `FIG. 05 · WHAT TEAMS DO ABOUT THE WAIT`. Columns `WHAT` · `WHICH WAIT IT SHORTENS` (with f-04's colour mark and label) · `WHAT IT COSTS`. Rows:
  1. **Raise the minimum before a rush you know about** (by hand or by a scheduled job) · all of them: the copies, and the nodes under them, are there first · you pay for them for those hours, and someone has to know the rush is coming (c-03; scheduling is model-sourced, kept general).
  2. **Keep spare room ready** with placeholder Pods that real Pods can push out · the wait for a node · a node's rent all week for room that is usually empty (c-11).
  3. **Lower the target**, say from 60% to 45% · the reading reaches it sooner, and every copy has more slack while others start · more copies, and so more nodes, at every hour (c-01).
  4. **Make Pods start faster** (a smaller image, a quicker start) · the Pod's start, on old nodes and new · engineering time, not rent (model-sourced, kept general).
  5. **A faster way of adding nodes** · the wait for a node: one provider, AWS, says nodes in its newer mode are typically ready in under 25 seconds (its own figure, June 2026) · a migration, and a different tool to run (c-07).
- **Caption.** "Fig. 05. Each remedy shortens a different wait and is paid for differently. None of them makes the wait disappear for nothing."
- **Size.** Desktop `.d-wide`, about 300px tall. Under 600px five cards, about 760px at 360px.

### f-06 — After the rush: which node can go back (s-06, revealed after k-06)
- **Model.** One snapshot drawn by the pooled `renderCluster` from `site/widgets/w-rush-scrolly/data.js` (its `FIGURES` entry; `opts.nodesOnly: true`, five columns), inside a figure plate `FIG. 06 · FRIDAY, ABOUT 19:20`. State: state Q's nodes 01, 02, 04 and 06 (see Conventions, Fennel's numbers) plus node 07 with no Pods. Verdicts on the node bars for the one `catalog` Pod on node 06 (the pool's `verdicts` field): 01 `NO MEMORY`, 02 `NO MEMORY`, 04 `NO MEMORY` (each with `1 GB FREE`). Two notes under the nodes: `NODE 07 · EMPTY · GIVEN BACK AFTER ABOUT 10 MIN` (`good`) and `NODE 06 · ITS POD FITS NOWHERE ELSE · STAYS` (`warn`). Step highlight on node 07's frame and on node 06's `catalog` chip.
- **Caption.** "Fig. 06. A node goes back only when every Pod on it has somewhere else to go. Node 06 is nearly empty and stays."
- **Gate.** Collapsed to a locked plate until k-06 is committed.
- **Size.** Desktop `.d-wide`, about 330px tall. At 360px the five nodes wrap to two rows (three and two), about 520px. `aria-label`: the state in words, from `data.js`.

### f-07 — The same week, before and after (s-06)
- **Model.** Static chart, header `FIG. 07 · ONE WEEK, BEFORE AND AFTER`: f-01's chart twice on one shared time axis and scale, stacked, headed `BEFORE` and `AFTER · THE WEEK OF THE PUSH`. Before: f-01 exactly. After: the same `WORK` line, with the push Friday's peak at 9; `COPIES` now a stepped line at 3 through the week, 6 over the Friday rush and 9 for the push evening; the `NODES` band four cells all week with a fifth cell (labelled `07 · 2 HOURS`) only on Friday evening. Two direct labels on the after panel: `COPIES FOLLOW THE WORK` on the stepped line, and `NODES: 5 → 4, ABOUT A FIFTH LESS` on the band. One more, at the after panel's quiet stretch: `WORK IS A THIRD OF FRIDAY'S · NODES ARE THE SAME 4`.
- **Caption.** "Fig. 07. The copies follow the work. The bill follows the nodes, which move in whole machines and only when one can be emptied."
- **Size.** Desktop `.d-wide`, about 420px tall. At 360px the panels keep their stacking at full width, about 400px.

### f-08 — What `catalog`'s autoscaler saw, and what nine copies would have asked for (s-07, revealed after k-07)
- **Model.** Static, header `FIG. 08 · CATALOG, SUNDAY EVENING`. Two panels.
  - **Left, `WHAT HAPPENED`:** three `catalog` Pod chips (`c1`, READY), each with a small gauge reading `NOW 25%` against the `c4` tick `TARGET 60%` and a mono line `WAITING ON THE DATABASE`. Beside them the database in the grammar's outside look (`DATABASE · NOT A POD`), with a row of ten cells, each standing for ten connections: nine filled and labelled `90 IN USE · 30 PER COPY`, one empty, and `ACCEPTS 100`. Above the Pods, the HPA's line: `↻ HPA · SEES 25%, TARGET 60% · DOES NOTHING`. A `CUSTOMERS · pages take seconds` note in `bad`.
  - **Right, `IF CATALOG HAD GONE TO 9 COPIES`** (tagged `ILLUSTRATIVE`): nine chips; the first three as before; the fourth with `10 OF ITS 30`; five more `NOT READY · CAN'T CONNECT` (`warn`, Ch 6's look). The arithmetic on one line: `9 × 30 = 270 WANTED · 100 ACCEPTED`. The same database box, all ten cells filled.
- **Caption.** "Fig. 08. The loop reads the Pods' processors, and waiting uses little. More copies would have asked the database for connections it doesn't have. The numbers are illustrative."
- **Gate.** Collapsed until k-07 is committed.
- **Size.** Desktop `.d-wide`, about 340px tall. Under 900px the panels stack, about 640px at 360px.

### f-09 — The loop lens, Ch 8 (s-08)
- **Model.** Ch 7's f-06 table (a copy, not an edit), header `FIG. 09 · WHICH LOOP: WANTS, SEES, DOES WHEN THEY DIFFER`, built from a `CH08_LOOPS` array in this chapter's `site/assets/page.js`: Ch 7's `CH07_LOOPS` copied forward in its row order, with Ch 7's `added` tags dropped and this chapter's changes tagged `NEW IN CH 8`. Column heads and caption use §2.3's wording.
  1–7. node loop · Deployment loop · ReplicaSet loop · scheduler · node agent · endpoints loop · kube-proxy: unchanged.
  8. **HPA** (new row, `added: ['loop']`, `per: 'one per autoscaled service'`) · wants: its service's Pods, on average, at the target share of the processor they reserve · sees: what each of those Pods is using · does: rewrites the number of copies its Deployment wants, in proportion, never outside the minimum and maximum; lowers it only after about five minutes of lower readings, by default · job: scaling.
  9. **cluster autoscaler** (the dashed "a loop that adds nodes, Chapter 8" row filled in; solid now; `added: ['loop', 'wants', 'sees', 'does']`, no `chapter`, `per: 'or your provider's equivalent'`) · wants: every Pod on a node, on no more nodes than that takes · sees: Pods the scheduler couldn't place, and how much of each node is reserved (never how busy it is) · does: adds a node from a node pool, up to the pool's maximum; after about ten minutes, by default, empties and gives back a node whose Pods all fit elsewhere · job: scaling.
- **Caption.** "Fig. 09. Scaling, split between two loops. One changes a number in the record; the other changes how many nodes there are."
- **Size.** Desktop `.d-wide`, about 500px tall. Under 600px stacked cards, about 1250px at 360px.

### t-01 — Term cards, `.cp-term` (s-02, s-03)
Ch 3's treatment, unchanged (CURRICULUM §8 step 4): outlined plate, mono `accent` kicker `NEW TERM · 0N / 03`, the term large in the heading face, one definition sentence, a mono `ink-3` back line. The prose's first use is a `dfn` with `aria-describedby` pointing to the card. No definition repeats a check's correct option word for word.
- **TERM 01 · HorizontalPodAutoscaler (HPA)** (s-02, after k-02). Definition: "A loop that keeps one measurement of a service's Pods near a target by raising or lowering the number of copies the service wants, between a minimum and a maximum." Back: "Horizontal: more Pods, not bigger ones."
- **TERM 02 · cluster autoscaler** (s-03, after k-03), **payoff variant** (blueprint ground; the chapter's only one). Definition: "A loop that asks the provider for another node when a Pod has no room, and hands a node back when its Pods all fit elsewhere." Back: "The loop Chapter 5 was missing."
- **TERM 03 · node pool** (s-03). Definition: "A group of identical machines in a cluster, with a smallest and a largest size that people set; nodes are added to it and removed from it." Back: "Some providers say node group."
- `dfn` only: spot machines (s-03).

## Widgets

### w-rush-scrolly
segment: s-04
complexity: low
blueprint: B1 (step-locked canvas as scrollytelling), one lane of 6 steps, gated on k-04; its data file also holds f-06's snapshot
model: One lane over Fennel's four-node cluster (state Q in Conventions), rendered by the pooled `renderCluster` and run by the pooled lane controller (`pool/cluster/cluster.js`, `pool/cluster/lanes.js`) from a **complete snapshot per step**, so scrolling back restores any step exactly. **Data only: no pool change and no widget code** (checkpoint Q5), so the page builder builds it. Every reader-visible string, the lane and f-06's snapshot live in `site/widgets/w-rush-scrolly/data.js`.
  - **Units and nodes:** `CAPACITY { memory: 13, cpu: 3.9 }`, `UNIT 'GB'`, `ROOM_UNIT 2`, `STATUS_INLINE: true`. `NODES ['01', '02', '04', '06']`; node `07` appears in A4's state (and f-06's).
  - **Services** (memory · cores): `storefront` 4 · 0.5; `orders` 6 · 1; `payments` 2 · 0.25; `dispatch` 2 · 1; `notifications` 2 · 0.25; `catalog` 2 · 0.25.
  - **Pods:** 01: `pa1`, `sf1`, `di1`, `no1`, `ca1`. 02: `di2`, `di3`, `sf2`, `no2`, `ca2`. 04: `pa2`, `sf3`, `or1` (`name: 'orders-q2rw'`). 06: `ca3`. New `dispatch` Pods: `di4`, `di5`, `di6` (to 06), `di7`, `di8`, `di9` (to 07). No versions, no addresses, no `use`.
  - **Mechanism rules (claims):** the HPA's number is current copies × reading ÷ target, rounded up, within 3 and 10 (c-01, c-03); it counts Pods that aren't ready yet as using nothing, so it doesn't ask again while they start (c-08); the scheduler places by requests and leaves a Pod waiting when no node has room for both its numbers (Ch 5); the cluster autoscaler acts only on waiting Pods and asks for a node only if one from the pool would hold them (c-04), within the pool's maximum (c-05); a new node takes minutes (c-06); a Pod counts as ready only after it starts and passes its readiness check (Ch 6).
  - **Arithmetic the snapshots must satisfy:** every node's Pods fit 13 GB and 3.9 cores. After A3, node 06 holds `ca3`, `di4`, `di5`, `di6`: 8 GB, 3.25 cores, so 5 GB and 0.65 cores free. A waiting `dispatch` Pod (2 GB · 1 core) then fits nowhere: 01 has 1 GB · 1.65 cores, 02 has 1 GB · 0.9, 04 has 1 GB · 2.15, 06 has 5 GB · 0.65. Node 07 holds three `dispatch` Pods: 6 GB, 3 cores.
  - **Loops:** `hpa: { label: 'HPA' }`, `rs: { label: 'ReplicaSet loop' }`, `sched: { label: 'scheduler' }`, `ca: { label: 'cluster autoscaler' }`; all four shown in every step, the acting one lit.
  - **Record panel:** one row, `rows: ['dispatch']` (the other services don't change and are left out to keep the row the HPA writes alone on the panel).
  - **Strings:** Ch 6's set (`status.running: 'READY'`, `record.running: 'READY'`, `status.starting: 'STARTING'`), Ch 5's waiting and scheduler strings, `newNode: 'New'`, and **`spare: 'Starting'`**: a node being started is drawn with the pool's spare frame (`state.spare: ['07']`: a dashed `c6` frame with the word in its body), which this chapter uses for nothing else.
  - **Notes** (lines under the nodes; at most three per step): `reading` (label `Measured · dispatch`), `sched` (type `scheduler`), `pool` (label `Node pool · general`), `customers` (label `Customers`).
reader_does: Scrolls through one lane. At the end of A3 commits to k-04 (three options) in the step column; the commit unlocks A4–A6. Any option unlocks; the feedback explains a wrong pick. The canvas has no controls.
shows: Canvas header `W-01 · THE CLUSTER`, lane name `FRIDAY, 17:30 · THE PUSH`, the clock kicker, `STEP n / 6`. Step text is draft wording (flowing; cause and effect).
  - **A1 · 17:30.** Nodes: state Q, all READY. Record: `dispatch · WANT 3`, three filled marks, `3 READY`. Loops: `hpa` lit; lens `SEES · average 50%, target 60%` / `DOES · nothing: close enough, and 3 is the minimum`. Notes: `Measured · dispatch · 50% of what each Pod reserves · target 60%`; `Customers · a driver assigned within seconds` (`good`). Highlight: the `reading` note and the row. Text: "At 17:30 `dispatch` runs its minimum of three copies, each using about half the processor it reserves. The push goes out."
  - **A2 · ~17:34.** Nodes unchanged. Record: `WANT 9`, three filled marks, `SHORT 6`. Loops: `hpa` lit; lens `SEES · average 180%, target 60%` / `DOES · writes 9 copies`. Notes: `Measured · dispatch · 180% · target 60%` (`warn`); `Customers · waiting minutes for a driver` (`bad`). Highlight: the row (`row:dispatch`), the `reading` note, the lens. Text: "Orders pour in, and within four minutes each copy is using nearly twice what it reserved: 180%, three times the target. Three times the target means three times the copies, so the HPA rewrites `dispatch`'s number from 3 to 9, in a couple of quick steps. That is all it does."
  - **A3 · seconds later.** Node 06: `ca3`, `di4:starting`, `di5:starting`, `di6:starting`. `waiting: ['di7', 'di8', 'di9']`. Record: `WANT 9`, three filled and six hollow marks, `3 READY · 3 WAITING`. Loops: `sched` lit (`rs` named in the text); lens `SEES · 6 new Pods; room for 3` / `DOES · 3 to node 06; 3 left waiting`. Notes: `reading` as A2; the scheduler note `0/4 nodes are available: 2 Insufficient cpu, 3 Insufficient memory.`; `customers` as A2. Highlight: the three new chips on 06, the waiting strip, the scheduler note. Text: "The ReplicaSet loop writes six new Pod records, and the scheduler places them as it places any Pod, by what they reserve. Node 06 has room for three. For the other three no node has both the memory and the processor, so they wait, as one did on that Friday in Chapter 5." Then **k-04**.
  - **A4 · ~17:36 (gated on k-04).** Node 06: `di4`, `di5`, `di6` READY. Node 07 appears: `nodes['07'] = []`, `spare: ['07']`. Waiting: still three. Record: six filled marks, `6 READY · 3 WAITING`. Loops: `ca` lit; lens `SEES · 3 Pods with no room; one more node would hold them` / `DOES · asks the provider for a node`. Notes: `Node pool · general · 4 nodes, 1 more requested · max 8`; `reading` now `Measured · dispatch · 90% · target 60%` (`warn`); `Customers · waiting longer than usual` (`warn`). Highlight: node 07's frame, the waiting strip, the lens. Text: "Seconds after the three Pods began to wait, the cluster autoscaler noticed them, worked out that one more node from the general pool would hold all three, and asked the provider for it. That machine is still starting. Meanwhile the three Pods on node 06 have downloaded their image, started and passed their readiness check, so six copies share the work. The HPA keeps looking, but it counts Pods that aren't ready yet as already on their way, and asks for no more."
  - **A5 · ~17:38:30.** Node 07 ready: `newNodes: ['07']`, `nodes['07'] = ['di7:starting', 'di8:starting', 'di9:starting']`, no `spare`, no `waiting`. Record: six filled, three hollow, `6 READY`. Loops: `sched` lit, `agents: ['07']`; lens `SEES · 3 waiting Pods; a new node` / `DOES · all 3 to node 07`. Notes: `Node pool · general · 5 nodes · max 8`; `reading` and `customers` as A4. Highlight: node 07 and its three chips. Text: "About four minutes after it was asked for, node 07 joins the cluster. It is a new machine with a new name; node 05 is not coming back. The scheduler places the three waiting Pods on it at once, and they start as the others did."
  - **A6 · ~17:40.** All nine READY. Record: nine filled marks, `9 READY`. Loops: `hpa` lit; lens `SEES · average 60%, target 60%` / `DOES · nothing`. Notes: `Measured · dispatch · 60% · target 60%` (`good`); `Customers · a driver assigned within seconds` (`good`). Highlight: the row, the `reading` note. Text: "By 17:40 all nine copies are ready, each is on `dispatch`'s Service's list, and the reading is back at its target. From the first late assignment to this moment took about seven minutes."
  - **Every step:** the step highlight marks what the step is about; the canvas `aria-label` is the step's state summary from `data.js`; the step text carries the meaning on its own. Caption under the lane: "Fennel's nodes, numbers and timings are fiction, built on Kubernetes' default settings."
size: **Desktop (≥ 900px):** the pooled lane layout inside `.d-wide`: canvas left (about 58%), sticky; steps right. Five node columns reserved from A1 (the pool reserves the lane's largest node count), record panel one row, waiting strip reserved, notes three lines; about 540px.
  **600–899px and phones:** one column, canvas sticky at the top (≤ 50vh), steps beneath as opaque cards. **At 360px:** the canvas is too tall for 50vh with five columns, so expect the pool's measured fallback: each step shows its own inline snapshot, four columns in A1–A3 and five from A4, as Ch 5's lane does; chips show the service name where it fits (the pool's narrow rules), and the step text names every Pod the step is about. About 430px per snapshot.
  **Gated steps:** A4–A6 collapse to a locked plate ("Answer the question above to see what happens") until k-04 is committed; unlock on `didactician:check-commit`; never re-lock.
  **Motion:** changes over ≤ 300ms (flair length, no replay needed, I4); instant under reduced motion; no autoplay. **No-JS:** step text visible; a `<noscript>` line says the drawing needs JavaScript.
acceptance: ac-06, ac-07, ac-08
reuse: Reuse the pooled `renderCluster` and lane controller; never copy another chapter's widget code. The builder checks on the pool's test page that a `spare` node with a custom word and a later `newNodes` entry for the same id draw as specified, and reports instead of patching the pool if they don't. **If the user chooses pool-05 (checkpoint Q5 b):** the `reading` note becomes a `meter` note (`{ type: 'meter', label, value, target, max }`, drawn as f-02's gauge), and node 07 in A4 uses a `starting` node status with a `warn` word on its bar; nothing else in this spec changes.

## Comprehension items

Prompts, options and feedback are final wording. In every choice check the correct option is not the longest, and no option repeats a heading, caption, standfirst or term card that the reader has seen before it.

### k-01
segment: s-01
objective: o-1
type: retrieve
prompt: On a Friday in Chapter 5, the dispatch team raised `dispatch` from 3 copies to 6, and one of the new Pods waited, `Pending`, for about an hour because no node had room for it. What ended the wait?
options: A · The scheduler, which kept retrying until the Pod fitted on a node that looked idle. | B · A loop in the control plane, which saw that the nodes were full and rented another. | C · People on Ari's team, who rented two more nodes by hand. (correct)
feedback: A: "The scheduler did keep trying, but it can't make room, and it counts what Pods reserve, not how idle a node looks. The wait ended when Ari's team rented nodes 05 and 06, about an hour in." · B: "None of the loops you've met so far can rent a node. That evening it took people: Ari's team added nodes 05 and 06 about an hour in. This chapter adds the loop that was missing." · C: "Right. Nothing in the cluster could add a node, so the Pod waited until Ari's team rented nodes 05 and 06. Both have been on the bill ever since."

### k-02
segment: s-02
objective: o-1
type: apply
prompt: It's 17:50 on a Friday. `dispatch` has 3 copies, and its autoscaler (target 60%, minimum 3, maximum 10) reads an average of 120%. What does the autoscaler do?
options: A · Adds one copy, waits to see the effect, and adds another if the reading is still high. | B · Changes the number of copies wanted to 6, and leaves the rest to other loops. (correct) | C · Starts three new `dispatch` Pods itself, on whichever node is emptiest.
feedback: A: "It doesn't feel its way up one copy at a time. A reading of twice the target makes it ask for twice the copies in one go: 6." · B: "Right. Twice the target, so twice the copies: it rewrites 3 to 6 in the record. The ReplicaSet loop, the scheduler and the node agents take it from there." · C: "The number is right, but this loop starts nothing and places nothing. It rewrites 3 to 6 in the record; the ReplicaSet loop writes the Pod records and the scheduler picks their nodes."

### k-03
segment: s-03
objective: o-1
type: predict
prompt: Fennel's cluster now has a loop that can rent another node. On a busy evening every Pod has a node, and the four nodes' processors are 85% busy. What does that loop do?
options: A · Rents a node now, before the processors run out. | B · Nothing: no Pod is waiting for room. (correct) | C · Moves a few Pods over to whichever node is least busy.
feedback: A: "It's a natural guess, because the HPA does react to busy Pods. This loop doesn't look at how busy anything is. It acts only when the scheduler has a Pod it can't place, and here every Pod has a node." · B: "Right. This loop watches for Pods the scheduler couldn't place, and there are none. How busy the nodes are doesn't come into it." · C: "Kubernetes never moves a Pod (Chapter 4), and no loop here evens out busy nodes. This one acts only when a Pod is waiting for room, and none is."

### k-04
segment: s-04
objective: o-2
type: predict
prompt: Three `dispatch` Pods are waiting for room, and this time Fennel's cluster has a loop that can rent a node. About how long until those three Pods are taking work?
options: A · A few seconds: adding a node is automatic now, and the Pods start on it at once. | B · A few minutes: the machine has to start, and then the Pods on it. (correct) | C · About an hour, as in Chapter 5, because someone on Ari's team still has to approve the new node.
feedback: A: "Deciding to add a node is automatic and takes seconds. The node is still a rented machine that has to start and join the cluster, which typically takes minutes, and only then can the Pods start on it. Scroll on." · B: "Right. Asking for the node takes seconds; the machine starting takes minutes; then the Pods have to start and pass their readiness check. Scroll on to see how many." · C: "Nobody has to approve it: the loop asks the provider itself, within seconds, as long as the pool is under its maximum. What takes time is the machine starting, and that is minutes, not an hour. Scroll on."

### k-05
segment: s-05
objective: o-2
type: apply
prompt: Fennel plans a TV advert for next Friday at 19:00, and expects a rush like the push's within a minute or two. Which change gets `dispatch` ready for 19:00 at the lowest cost?
options: A · Raise the maximum from 10 copies to 20, so the autoscaler has room to go higher. | B · Raise the minimum to 9 at 18:45 for that evening, then put it back. (correct) | C · Lower the target from 60% to 30% from now on, so `dispatch` always has copies to spare.
feedback: A: "The maximum wasn't what held `dispatch` back: it needed 9 and was allowed 10. A higher maximum changes how far the autoscaler may go, not how soon the copies are ready." · B: "Right. The nine copies, and the node under three of them, are ready before the advert runs, and Fennel pays for them for an evening instead of all week. It works only because someone knows the advert is coming." · C: "It would help: more copies at every moment means less of a jump. But Fennel would pay for those copies, and the nodes under them, every hour of every week to cover one evening."

### k-06
segment: s-06
objective: o-4
type: predict
prompt: By 19:20 the rush is over and `dispatch` is back at 3 copies. Node 07 is empty. Node 06 holds one small `catalog` Pod, which reserves 2 GB of the node's 13 GB. Nodes 01, 02 and 04 each have 1 GB free. Which nodes does the cluster autoscaler give back?
options: A · Both: node 07 is empty and node 06 nearly so, and neither is worth its rent. | B · Only node 07: the Pod on node 06 has no other node to go to. (correct) | C · Neither: the loop keeps the nodes it has in case the next rush needs them.
feedback: A: "Node 06 is nearly empty, but to give it back the loop needs somewhere to put its Pod, and 3 GB free in three pieces of 1 GB can't hold a Pod that reserves 2 GB (Chapter 5). Node 06 stays." · B: "Right. A node goes back only when every Pod on it fits somewhere else. Node 07 has none, so it goes after about ten minutes, by default. Node 06's one Pod reserves 2 GB, and no other node has more than 1 GB free." · C: "By default it doesn't hold nodes for later: one it can do without goes back after about ten minutes. Keeping spare room for the next rush is a choice people make, and pay for. Here node 07 goes and node 06 stays."

### k-07
segment: s-07
objective: o-3
type: predict
prompt: `catalog` has an autoscaler like `dispatch`'s: a target of 60% of the processor each Pod reserves. One Sunday evening `catalog`'s pages take seconds to load, because every request is waiting for the database to answer. What does `catalog`'s autoscaler do?
options: A · Adds copies, as it did for `dispatch`, because a service that is slow needs more Pods. | B · Nothing: Pods that are waiting use little processor, so the reading stays low. (correct) | C · Adds capacity to the database, since that is where the requests are waiting.
feedback: A: "It can't see that `catalog` is slow. It sees one reading, the Pods' processor use, and Pods waiting on a database use very little: the reading was 25%, under the target. The figure below also shows what more copies would have done." · B: "Right. The reading was 25%, well under the target, so the autoscaler saw nothing to do while customers waited. The figure below also shows what more copies would have done." · C: "An HPA changes one number, the copies of one Deployment. The database isn't a Deployment it manages, and isn't a Pod at all in this story. The reading it does see was 25%, so it did nothing."

### k-08
segment: s-09
objective: o-3
type: apply
prompt: At the holiday planning meeting, Sam says: "We'll turn on autoscaling, so we're ready for the holidays." `storefront`, `payments` and `orders` have no autoscaler yet. What would you ask, and why? Think of your questions, then show the answer.
model_answer: Two questions matter most. "How fast do we scale, compared with how fast the traffic rises?" Fennel has measured its own answer: about a minute or two for copies that fit on room it already rents, and about seven when a node has to be added. A rush that builds over an hour is fine; one that arrives in two minutes, like the push, is not, so for the days Fennel can see coming, ask what the minimums and the spare room will be beforehand and who will raise them. And: "What is the bottleneck after the app: the database, the payment provider?" More `payments` Pods don't raise the number of calls the payment provider accepts, and more `storefront` or `orders` Pods lean on databases that have limits of their own, as `catalog` showed; `orders` running in more than one copy is a question in itself (Chapter 10). Then the settings: "What are the target, the minimum and the maximum for each service, and the node pool's maximum? Who chose them, and what happens when we reach one?" At a maximum the loops stop and Pods wait; the maximum is also the cap on what a bad day can cost. Last, for Morgan: "What will the holidays cost, and what does it fall back to afterwards?" The bill follows nodes, and it comes down only as far as nodes can be emptied.
feedback: The reveal names m-11 once: autoscaling is two loops that take minutes and act on one measurement each, so being ready is still something people plan.

## Acceptance criteria

- ac-01 (s-01, k-01, f-01): The cast strip and D1 come before k-01; k-01 is committed before the scene; f-01 shows work and copies in one unit with a flat line at 6 and five nodes; the hero standfirst doesn't say what either loop watches, that scaling takes minutes, or that more Pods can fail to help.
- ac-02 (s-02, f-02, k-02): The prose says what the HPA measures (a share of what each Pod reserves) before f-02; the worked case in the prose and f-02's three rows are all different from k-02's case; f-02 draws the target as a written mark and the reading as a fill; TERM 01 and the lens paragraph come after k-02; the prose says the HPA only rewrites a number and names the loops that start the Pods.
- ac-03 (s-03, k-03, f-03): The cluster autoscaler is introduced as what it is and who switched it on before k-03, without saying what it watches; k-03 is committed before any sentence saying it acts on waiting Pods; the reveal says it never reads how busy nodes are and grants that the HPA does read use; f-03 labels the general pool's machine kind and `MIN 3 · MAX 8` on its frame and draws unrented pools dashed; the prose says the maximum is set by a person and what happens at it.
- ac-04 (page-wide): Terms appear only after the thing they name: HPA after f-02 and k-02, cluster autoscaler after it has been described, node pool after the sentence explaining why the loop must know what a new node would be. No later-ledger term is used except as "Chapter N", and the vocabulary guard in Conventions holds.
- ac-05 (page-wide): Every default and every timing carries its hedge in the same sentence as Conventions' hedging rules require; every vendor figure names the vendor and date; no price appears; the page never says or implies that scaling up normally takes twenty minutes, nor that it is instant.
- ac-06 (w-rush-scrolly): Before A1, the set-up says why there are four nodes, what an ordinary Friday looks like, what is new on the drawing, and what happened at 17:30. Each loop named in a step was introduced in s-02 or s-03 or an earlier chapter.
- ac-07 (w-rush-scrolly): In every step each node's Pods fit 13 GB and 3.9 cores; the record row's WANT, marks and word agree with the drawn Pods (3 → 9 wanted; 3, 3, 3, 6, 6, 9 ready); the reading and number satisfy the rule (180% at 3 copies gives 9; 90% at 6 ready of 9; 60% at 9); the waiting strip holds three Pods in A3 and A4 and none after; node 07 is drawn as starting in A4 and as a ready, new node from A5; A4–A6 are locked until k-04 is committed; scrolling back restores each step exactly.
- ac-08 (w-rush-scrolly): A Pod waiting, a node starting, a node ready, a Pod starting and a Pod ready each look different and carry a word; the reading and its target are both on the canvas in every step; the acting loop's pill and lens line change with the step.
- ac-09 (s-04, k-04, f-04): k-04 is committed before A4 or any sentence giving a duration; f-04 shows each wait with its owner and length and the copies-ready band (3, 6, 9 of 9); the debrief says the decision was the quick part, gives the general ranges once with "typically", and says nothing failed; the two ways it gets longer are hedged and D4 holds the vendor specifics.
- ac-10 (s-05, f-05, k-05): f-05 pairs every remedy with the wait it shortens (using f-04's label and mark) and with what it costs; no remedy is presented as free or as removing the wait altogether; k-05's feedback says why raising the maximum doesn't help and what the lower target costs.
- ac-11 (s-06, k-06, f-06, f-07): The two waits on the way down are given with "by default"; k-06 is committed before f-06 or any sentence saying node 06 stays; f-06 prints on the nodes why 07 goes and 06 stays; f-07 draws both weeks on one axis and scale, with copies following the work and nodes going from 5 to 4; the prose gives "about a fifth" against "two-thirds" and names the floor (minimums, services that don't scale, whole nodes, requests).
- ac-12 (s-07, k-07, f-08): The fair part (more copies did fix `dispatch`) comes before the scene; k-07 is committed before f-08 or any sentence saying the HPA did nothing; f-08's left panel shows a 25% reading against the 60% target and the database as something that is not a Pod; its right panel is tagged illustrative and shows 270 wanted against 100; the prose labels 100 as PostgreSQL's typical default and never presents the case as a documented incident.
- ac-13 (f-09): The loop lens table is Ch 7's array copied forward with Ch 7's tags dropped; the dashed Chapter 8 row is a solid cluster autoscaler row whose "sees" cell says it never reads how busy nodes are; an HPA row is added; both are tagged NEW IN CH 8 and share the job "scaling"; the header uses §2.3's wording.
- ac-14 (all checks): Every choice check has feedback for every option that explains why, naming the misconception's reasoning where one applies; no key is the longest option; no key repeats a nearby heading, caption, standfirst or term card; every feedback pointer leads to something visible from its default state or unlocked by the check; k-08 states its own question and hides its model answer until revealed.
- ac-15 (s-05): If the staffing aside is built, it comes after the lane, maps the rule, the desks and the office space to the HPA, room on nodes and the cluster autoscaler, and carries a WHERE THIS ANALOGY BREAKS line saying the loop knows one number and has no judgment.
- ac-16 (page-wide): Each explanation listed under "Who owns which explanation" in Conventions is given once, in its owner; no paragraph after s-04 retells the lane's steps; no sentence refers to a figure or widget by ID or to an event by a bare time.

## Curriculum recommendations

Recommendations only; CURRICULUM.md is unchanged. Apply after the chapter ships (§8 step 8), except the checkpoint questions, which the user answers at the checkpoint.

- **Checkpoint questions** (recommended option first):
  - **Q1, size.** The plan is about 25 minutes against a budget of 22 (probably 27–29 built). **(a) recommended: one chapter at about 25.** Four objectives at this depth need it, and Ch 5 was accepted at 26. (b) One chapter with cuts 1–6 of `cut-list.md` `## If it runs long`: about 22.5, with no re-plan, since the cut items are tagged in the segments. (c) Split after s-05: "scaling up" (s-01–s-05, the table, a new conversation; about 18) and "scaling down, the bill and the bottleneck" (about 11–12). Not recommended: the second part is leftovers, and the entry's conversation needs both halves.
  - **Q2, the entry's explorer.** **(a) recommended: none**; one lane, static figures and four committed predictions (reasons in `## Shape`). (b) A small "replay the push" explorer in place of f-05: the reader sets the minimum (3, 6, 9), a spare node (off, on), Pod start (90 s, 30 s) and node start (4 min, 1 min), and sees the copies-ready line against the work, the minutes short and the extra node-hours per week, from 24 precomputed states; about 2 more minutes of reader time and a widget builder. (c) The explorer instead of the lane: not recommended, since the reader would explore a chain nobody has shown them.
  - **Q3, the "twenty minutes".** Research puts a late scale-up that needs a new node at roughly three to eight minutes (x-01); twenty needs causes stacked on top (x-02). **(a) recommended: correct it to about seven minutes, with nothing broken.** "It worked as designed and still took seven minutes" is the cleaner answer to m-11, and two hedged sentences plus D4 say what stretches it to twenty or more. The entry's wording changes (R5). (b) Keep twenty, with causes stacked in the lane (the first node request fails, a five-minute retry on one provider, a slow image): two more steps and about a minute, and the reader may remember the failure instead of the ordinary wait.
  - **Q4, objectives.** **(a) recommended: o-4 becomes scaling down and the bill only, and node pools move into o-1** (reason under `## Objectives`); the spot pool stays at exposure level (a paragraph and a dashed pool, no check). (b) Keep the brief's o-4 and add back Ch 5's spot-pool check (about 1 minute; in the cut list).
  - **Q5, the pool.** **(a) recommended: no pool change**; the lane is data only (the reading as a note line, a starting node drawn with the pool's spare frame and this chapter's word). (b) pool-05, with every chapter re-gated: a `meter` note (a gauge with a target tick, so the lane's reading looks like f-02's) and a `starting` node status with a `warn` word. It teaches a little better and would be reused by Ch 11 and Ch 12.
  - **Q6, story facts** (R2): the push without notice, the settings (60%, 3 to 10; the general pool 3 to 8), node 05 given back and node 07 rented for two hours, `catalog`'s slow Sunday, and Sam as the speaker of the conversation's line. Approve, or change any of them.
  - **Q7, names.** **(a) recommended: "the HPA" and "the cluster autoscaler"**, as engineers will say them in a meeting, each grounded before it is named; (b) plain descriptions only ("the loop that changes the number of copies", "the loop that rents nodes").
  - **Q8, analogy.** **(a) recommended: the staffing rule aside in s-05, with its breaks line** (first in the cut order); (b) Ch 4's cut thermostat (it fits the HPA, but says nothing about the second loop, the waits or the bottleneck); (c) none.
- **R1 (§5 term ledger, Ch 8 row, after build):** Visuals: record Conventions' Visual grammar: work as a `c1` line and area in "copies needed", copies as a stepped `ink` line, nodes as a band of cells (f-01, f-07); the gauge (outline = reserved, solid `c1` = reading, hatched `warn` above 100%, `c4` tick = target) with `MIN` / `MAX` brackets (f-02, f-08); `↻ HPA` and `↻ cluster autoscaler` pills; a node being started as a dashed `c6` frame reading `STARTING`; node pool frames (thin `ink-3`, mono header with machine kind and `MIN · MAX`, unrented slots and pools dashed `c6`); the waits timeline with owners over a copies-ready band (f-04); the database as a solid `ink` box, `NOT A POD` (f-08); f-09 from `CH08_LOOPS`. Renderer: the pooled `renderCluster`, data only; lane A and f-06's snapshot in Ch 8's `site/widgets/w-rush-scrolly/`.
- **R2 (§3 Fennel, new Ch 8 story facts, Year 3):** the "Fennel's numbers" list in Conventions, plus: the two loops were switched on late in Year 3 by Ari's team and the dispatch team; `catalog`'s Pods have settled one each on nodes 01, 02 and 06; a new node gets a new name (07; 05 is not reused); since the push, marketing gives Ari's team a day's notice and `dispatch`'s minimum is raised for the hour around a push; Ari's spot pool is still only proposed. **Exchanges:** Jordan: "Can't the cluster add copies when it's busy, and take them away when it isn't?" Ari: "It can. Two loops do it between them. Neither is as quick as you'd hope." Jordan: "We have autoscaling. Why were we slow?" Ari: "Autoscaling worked. It took seven minutes." Morgan: "Orders drop by two-thirds on a Tuesday. Why doesn't the bill?" Ari: "Because we pay for nodes, and a node goes back only when everything on it fits somewhere else." Sam, at the holiday planning meeting: "We'll turn on autoscaling, so we're ready for the holidays."
- **R3 (§2.3 loop lens table):** the dashed "a loop that adds nodes" row becomes the **cluster autoscaler**, and an **HPA** row is added, both with the job "scaling", worded as in f-09. Later chapters copy `CH08_LOOPS`.
- **R4 (§6 catalog):** add three entries, owner Ch 8:
  - **m-38** (local-01) "The cluster adds machines when the machines get busy." The loop that adds nodes acts only on Pods the scheduler couldn't place, and counts reservations, never use; busy nodes with no waiting Pod get nothing. Same family as m-29.
  - **m-39** (local-02) "With autoscaling we pay only for what we use, so the bill tracks traffic." Copies track the work; the bill follows nodes, which go back only when they can be emptied, above a floor set by minimums, services that don't scale and requests. Ch 14 revisits (with m-08).
  - **m-40** (local-03) "Once autoscaling is on, capacity planning is done: the system knows our traffic." It knows one measurement and a target; people choose the minimums, the maximums and the pool's limit, and limits outside the Pods cap what scaling can do. Ch 11 and Ch 14 revisit.
- **R5 (§7 Ch 8 entry):** reword "a bill that tracks traffic" to "a bill that follows traffic only in whole machines" and "`dispatch` lagged during the first twenty minutes" to "`dispatch` ran short of copies for about seven minutes" (if Q3 a); record that the explorer was replaced by a lane and predictions (if Q2 a), as Ch 3's and Ch 7's entries do.
- **R6 (pick-ups for later chapters):**
  - **Ch 9:** once an HPA owns a Deployment's number of copies, re-applying a manifest that still states a number resets it (parking lot).
  - **Ch 10:** `catalog`'s Sunday (a database's connection limit; the usual fix sits between the app and the database); why adding copies of `orders` is harder than raising a number; a Pod using storage on its own node can keep that node from being given back.
  - **Ch 11:** placeholder Pods work through Pod priority; a pool's maximum and a team's quota as two different caps; one team's autoscaler can use up room or a shared limit another team needs. Retrieve m-38.
  - **Ch 12:** what the HPA reads comes from a separate measurements component; "the reading was 25% while customers waited" as a case of a measurement that looked fine (m-15); scaling lag in a postmortem (the entry already lists it).
  - **Ch 13:** event-driven scaling (KEDA) and scheduled or predictive scaling as ecosystem tools; long-lived connections and a mesh (m-36).
  - **Ch 14:** spot pools and their prices (Ch 5's k-06 is still unused if Q4 a); provider autoscaling profiles and faster provisioners as cost-against-speed choices; disruption budgets and node scale-down; fully managed modes that bill per Pod; m-39 with m-08.
  - **Ch 15:** the push Friday ("we scaled and still slowed down") and `catalog`'s Sunday ("the autoscaler did nothing") as unlabelled scenarios.
- **R7 (§8 step 5, the pool):** none needed if Q5 (a). If (b): pool-05 as specified in w-rush-scrolly's `reuse:`, documented in `explainers/_pool/README.md` and on the pool test page, before Ch 8's build, with every chapter re-gated. Either way, note in the README that the spare frame's word is the chapter's (`STRINGS.spare`), so it can stand for a node being started.



