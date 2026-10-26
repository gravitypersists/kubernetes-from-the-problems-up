# Learning plan: Who runs where: scheduling, resources and cost (Ch 5, Desired state: Kubernetes from the problems up)

<!-- Written by the instructional designer. Parsed by scripts/check_plan.py. Revision 0 (handoff 02). -->

## Shape

A narrative article that follows Fennel through one week of Year 3 (a Friday dinner rush, a Tuesday of restarts, Morgan's month-end bill) and traces all three symptoms back to the two numbers each team wrote down for its services at the move: what a Pod **reserves** (requests) and what it may **use** (limits). It is built around **one scrollytelling lane** and **one hands-on sandbox**, with static figures around them.
- **Lane F, "Friday, 17:45"** (blueprint B1, on Ch 4's `renderCluster`): the dispatch team doubles `dispatch` for the rush on a three-node cluster; the scheduler places two new Pods, rules out every node for the third, and leaves it waiting until Ari's team adds two nodes. This is the scheduler's loop shown failing, step by step, and it delivers Ch 4's promise ("how it chooses is Chapter 5") and Ch 4's D4 ("that room is the subject of Chapter 5").
- **Sandbox W-02, "Ari's sizing sheet"** (blueprint B2): the reader changes three services' memory requests and a "keep room to lose a node" switch, and watches how many nodes Fennel must rent, what sets that number (memory or processor), and how much of the rented room is used, reserved-but-unused, or reserved by nobody.

**Why this form.** The chapter has two kinds of content. The first is a *process*: a Pod that no node can take, the scheduler retrying, a node arriving. The course's form for a process is a scrollytelling lane (CURRICULUM §8 step 7), and this one reuses Ch 4's canvas, so the reader meets the same nodes, record and loops. The second is a *system with dynamics*: how requests, packed onto nodes, turn into a node count and a bill. The relationship is non-linear (the count moves in steps; below a point, cutting memory requests saves nothing because processor takes over; one oversized Pod can't fit at all), and it is what a manager needs to reason about when someone proposes "pad everything" or "halve everything". The course's form for system dynamics is a goal-free explorer (B2).

**The sandbox call, against the user's bar ("no busywork"; Ch 3 replaced a tapping widget with scrollytelling).** Ch 3's placement widget was rejected because every tap had one right answer, so the reader only executed a fixed outcome. W-02 is different in kind: there is no target layout and no right answer to tap towards, the outcome changes with every setting, and three of its four discoveries can't be read off a static figure (the step-shaped node count, the processor floor, the Pod that can never be placed). It is also the tool the chapter's conversation needs ("What does it do to our node count?"). Guardrails: three steppers and one switch, nothing else; it opens on Fennel's real state (5 nodes), so the first thing the reader sees is the answer to Morgan; a predict check (k-04) comes before it and a transfer check (k-05) after it. If the user still judges it busywork, the cut order (cut-list.md, item 7) replaces it with a static two-panel figure.

**Rejected alternatives.**
- *Sandbox only, no lane* (pending shown as a sandbox state). Rejected: pending is a process with a time dimension (the scheduler keeps retrying; nothing makes room by itself; a node arrives), and its key artefact is the scheduler's recorded reason, which needs the lane's step-by-step filter.
- *Two lanes* (a second one for the `orders` memory kill or an eviction). Rejected for time: Tuesday is shown as a memory-over-time chart (f-05), and eviction as prose plus a check. If the user chooses the split below, Part 2 gains that lane.
- *A restaurant-bookings analogy* (research x-04) alongside the budget one. One analogy, the curriculum's, used in two halves (reserved budget in §02, spending cap in §07), each with its own breaks line.

**Honest sizing** (CURRICULUM §2.10). Estimated reader time including reading, thinking, checks and the reader's time in the lane and the sandbox. Disclosures are optional and not counted (about 0.25 min each if opened).

| Part | Minutes |
|---|---|
| hero + s-01 (cast strip, k-01, the week: Friday, Tuesday, the bill; Morgan's question; Ari's line) | 2.5 |
| s-02 (Ch 4's sizes are requests: f-01 manifest, TERM 01; two counts, f-02; filter then score, moving day; k-02; the budget aside; the scheduler's lens) | 4.0 |
| s-03 lane F (scene set-up, 5 steps ≈ 1.75, k-03), TERM 02, reading the recorded reason, m-26 | 4.0 |
| s-04 (the bill in standard mode, k-04, W-02 sandbox ≈ 2.5, k-05, bin packing, two kinds of idle, per-Pod modes, Morgan's answer) | 5.0 |
| s-05 (headroom: room on purpose) | 1.0 |
| s-06 (node pools: f-03, k-06) | 1.75 |
| s-07 (Tuesday: f-05, f-04 limits snippet, TERM 03, TERM 04, slowed vs. killed, k-07, the spending-cap aside) | 3.0 |
| s-08 (eviction, k-08, f-06 loop lens table) | 2.0 |
| s-09 (the conversation k-09 with f-07, recap, bridge) | 2.5 |
| **total** | **about 25.75** |

Of that, checks are about 4.5 minutes (eight choice checks at about 0.5, one think-then-reveal at 0.75), the lane about 1.75 and the sandbox about 2.5. Earlier chapters built 1–3 minutes over plan, so a single-chapter build would likely read at **26–28 minutes**.

**This is well over d-01's 20 minutes, so I propose a split** (checkpoint question Q2; the user decides). The clean seam is *before a Pod runs* vs. *while it runs*:
- **Part 1, Ch 5 "Who runs where: requests, placement and the bill"** = s-01 (without Tuesday), s-02, s-03, s-04, s-05, plus a short conversation of its own (Morgan: "Let's cut back to three nodes." The questions: "What do our services actually use at their busiest, compared with what they reserve? If we lose a node at the dinner rush, where do its Pods go?"). **About 18.5 minutes.** Keeps o-1 whole, o-2's cost half and headroom, and o-3's "pending". Keeps both Ch 4 promises and the Ch 4 bridge (Morgan's bill).
- **Part 2, a new chapter "Using too much: limits, memory kills and eviction"** = its own cast strip, D1 and a retrieval opener (on requests), s-06 (node pools: "what kind of room"), s-07, s-08, s-09 (the curriculum's conversation, "bump memory limits on `orders`", which needs both requests and limits). **About 11.5 minutes, or about 13.5 with a lane** for Tuesday (memory climbs past its reservation, hits its cap, is killed and restarted in place, then backs off) that a single chapter can't afford. Takes limits, OOM-killed, eviction and node pool in the ledger, local-02, and o-2's reliability half and o-3's OOM-killed.
- **Cost of the split:** a 16th chapter. Either it is numbered "5b" (no renumbering; Ch 1–4's forward references such as "Chapter 6" stay correct) or every later chapter is renumbered (Ch 1–4's forward references, CURRICULUM §4–§7 and the course map change). The ledger row for Ch 5 splits; the Ch 5 conversation moves to Part 2; Ch 8's "Retrieval from: Ch 5 (requests drive node count)" still points at Part 1. I recommend the split, numbered 5b, because the user prefers reorganising to compressing and each part then has room for flowing prose.
- **If the user keeps one chapter:** build this plan; `cut-list.md` `## If it runs long` recovers about 5 minutes in a ranked order, down to about 21, without losing an objective (it does thin node pools, eviction and the sandbox, in that order).

The rest of this plan specifies the single chapter, with each segment tagged **[Part 1]** or **[Part 2]** so that a split revision is mostly a matter of moving segments and adding the two small pieces above.

toc: yes — nine h2 sections and a 25-minute read; a rail on desktop and a collapsed "Contents" on mobile, as in Ch 1–4.
tokens: user-provided: Control Plane style guide, `design/control-plane/`. Use the course tokens from the shared pool (`pool/tokens.css`) and the pool's kit files as `pool/<file>` (CURRICULUM §8 steps 4–5); follow README.md, the tokens.json notes and `components/bundle.css`. Chapter-only CSS and JS go in `site/assets/`. The page builder may read Ch 4's `site/assets/page.css` / `page.js` as the reference implementation of the course's page components (cast strip `.cp-cast`, disclosure `.cp-more`, checks `.cp-check`, term card `.cp-term` with the payoff variant, `.cp-aside` with `.cp-breaks`, `.cp-quote`, `.cp-recap`, the check script and its `didactician:check-commit` event, the loop lens table builder) and reimplement them in this chapter's `site/assets/`; it never edits Ch 4's files. Promoting those page components to the pool is a recommendation (R12), not a build step.
mobile: supported. The lane follows §8 step 7 (canvas sticky at the top under 900px, ≤ 50vh; inline snapshots per step where it wouldn't fit or the viewport is under 560px tall). The sandbox puts its readout strip and controls together at the top on phones, the node drawing below them, so every control's main effect (node count, what sets it, the idle bar, warnings) is visible next to it. f-02, f-03, f-05, f-06 and f-07 re-layout under 600px, they don't scale.

**Course voice** (style guide): second person, present tense, sentence-case headings, no exclamation marks, no emoji. Status always travels as a word plus colour. Kubernetes kinds are capitalised (Pod, ReplicaSet); "node" stays lowercase (CURRICULUM §2.12). The loops are named in plain words: *the scheduler*, *the ReplicaSet loop*, *the node agent*, *the node loop*.

**Prose rules (binding on the builder; from the user's Ch 4 human reviews, in the brief's Lessons):**
- Flowing sentences of varied length, with the cause and effect spelled out: what was the case, what was wanted, what acted, what changed. No chains of fragments. Clear active verbs ("still applies", "doesn't change", "rules out"), never archaic or ambiguous ones.
- **Don't compress prose to hit the time budget.** The minutes above are an honest estimate, not a word limit.
- **Set up every scene before its lane or figure.** §03 opens with a paragraph that says where the cluster stands (three nodes since 03:04), who is about to do what (the dispatch team, for the rush), and how to read the canvas now that it counts memory in GB and processor in cores.
- **Ground every component before it acts.** Requests are introduced, with a manifest, before the scheduler is said to count them; the two counts (memory, processor) are introduced on one node (f-02) before the lane checks three nodes; the node agent's memory watching is introduced before it evicts anything; the operating system is named as the one that kills a container before the node agent is said to restart it.
- **No unexplained analogies.** The budget analogy maps each part explicitly (node → a department's budget; request → a project's reserved budget; scheduler → finance, approving projects only where reservations fit; limit → a spending cap on the project's card) and carries a WHERE THIS ANALOGY BREAKS line in the same aside.
- **Name who does what.** The dispatch team edits the manifest; the ReplicaSet loop writes Pod records; the scheduler picks nodes; Ari's team adds nodes (by hand: nothing in Fennel's cluster adds them automatically; "Chapter 8 introduces a loop that can"); the operating system on the node kills a container that goes over its memory limit; the node agent restarts it, and evicts Pods when its node runs short.
- **Keep the pattern distinct from the implementation.** The reconcile loop is the general pattern (Ch 4); the scheduler is one implementation of it, and this chapter fills in the scheduler's lens in detail.
- Figures don't "write" or "say" things; captions state the takeaway or condition. Refer to figures by number. No sentence sends the reader into a figure to find a label.
- Every default carries "by default" or "with default settings" in the same sentence. Providers stay generic in the main text.
- Pedantic caveats go in disclosures; the main text stays true without them.

**Vocabulary guard** (brief out_of_scope; ledger §5). This chapter introduces: scheduler, in depth (s-02); requests (s-02); pending (s-03); bin packing (s-04); node pool (s-06); limits, OOM-killed (s-07); eviction (s-08). Allowed with a gloss: "spot machines" (s-06), "throttled" once as engineers' word for "slowed" (s-07), the status strings `Pending`, `OOMKilled` and "exit code 137" (once, as what engineers will see), the scheduler's reason strings (`Insufficient memory`, `Insufficient cpu`), `500m` and `Gi` inside the manifest snippets only (annotated). "A loop that adds nodes" with "Chapter 8 names it" (the dashed row in f-06 and two sentences). **Never in the body:** autoscaler / autoscaling (beyond "Chapter 8"), HPA, VPA, affinity, anti-affinity, taint, toleration (c-08's one sentence uses plain words), QoS / Guaranteed / Burstable / BestEffort, priority, preemption, LimitRange, ResourceQuota, namespace, quota, allocatable (say "room for Pods"; D2 may name it once), the plugin names (`LeastAllocated`, `MostAllocated`), cgroup, descheduler, Deployment, Service (capitalised), kubelet (Ch 4 named it; use "node agent").

**Fiction vs. sourced.** Fennel's nodes (16 GB, 4 cores; about 13 GB and 3.9 cores for Pods), every service's requests, limits and measured use, the Friday at 17:45, nodes 05 and 06, the Tuesday restarts, the month's bill and Morgan's and Ari's lines are Fennel fiction (story facts, R2). The scheduler's reason string in lane F follows the documented format and is labelled illustrative (x-06). The leak-vs-growth patterns (f-07) are an engineers' rule of thumb, not a sourced fact (x-05). Sourced mechanisms: filter then score (c-01); per node, per resource fit (c-02); reservations, not use (c-03); a request is not a cap (c-04); room kept back for the system (c-05); emptiest node and spreading by default, packing is a setting (c-06, c-07); placement rules exist (c-08); paying for nodes in standard mode (c-09); per-Pod billing by requests, and not every fully managed mode is per-Pod (c-10, c-11, c-12); the survey figures (c-13, c-14, c-15, single-source, framed as such); processor slowed, memory killed (c-16, c-17); no limit (c-18); eviction order (c-19); pending, its recorded reason and retries (c-20, c-21); how an OOM-kill shows (c-22); the docs' advice after one (c-23); node pools and spot machines (c-24, c-25). From earlier chapters by reference: the scheduler as a loop that finds Pods with no node (Ch 4 c-13); a Pod is never moved, it is replaced (Ch 4); crash-loop back-off (Ch 4 c-14; repeated memory kills end there); the ReplicaSet loop replaces Pods removed for any reason (Ch 4 c-12); free room split across machines (Ch 3 c-03, x-01).

## Research concerns, resolved

How each concern in the researcher's report is handled:

1. **Ch 4's moving-day layout conflicts with default scheduling** (c-06, c-07, x-07). Not resolved silently: it is checkpoint question **Q1**, with three options and their costs below. The plan is written for my recommendation, **(b)**, and specifies the exact differences for the alternative (lane F's data, k-03's numbers, s-02's moving-day paragraph, one disclosure).
   - **(a) Ch 4 unchanged; Ch 5 admits the simplification in the main text, as a teaching moment.** s-02 says: Chapter 4's drawing put two `storefront` Pods on node 01 because that was Sam's layout from the year before, kept so the two Saturdays could be compared; with default settings the scheduler would more likely have put one on each of 01, 04 and 02, because among nodes with room it prefers the emptiest and it spreads copies of one service. It then draws the m-08 lesson: the scheduler wasn't trying to use as few nodes as possible. *Cost:* a correction of an earlier chapter in the main text, which a manager may read as "the course cut a corner"; Ch 4's lane still shows the scheduler choosing 01, 01, 02.
   - **(b) Recommended: change Ch 4 so its moving day follows the defaults, then use it in Ch 5 as the worked example.** Ch 4's lane A puts `storefront` on 01, 04 and 02 (one each). At 03:04, nodes 01 and 04 both have room for `orders`; the scheduler picks 04 (a tie, broken at random), so Ch 4's "node 04" and k-05 still hold, and B5's "the only node with room" becomes "one of two nodes with room". The lost `dispatch` copy goes to 01 (emptier, and no `dispatch` copy yet), not 02. *Cost:* a post-ship edit to Ch 4 (`data.js` lane A4–A5 and B1–B6 states and aria labels, the B5 and B6 step text, CURRICULUM §3's Ch 4 facts), a Ch 4 re-gate, and the loss of Ch 4's "ends in Ch 3's Monday layout" parallel (the Saturdays stay comparable: the same machine, the same time, the same `orders` → 04). It must land before Ch 5's lane is built, because lane F starts from Ch 4's end state. *Gain:* Ch 5, the chapter about how the scheduler chooses, never contradicts the chapter before it, and moving day becomes the clean example of "emptiest node, copies spread" that sets up m-08.
   - **(c) Ch 4 unchanged; a collapsed disclosure in Ch 5 only.** s-02 teaches scoring on a fresh example (the Friday Pods) and a disclosure "Would the scheduler really have put two `storefront` Pods on node 01?" answers as in (a). *Cost:* lowest; but a reader who has just learned the rule can see the contradiction without opening anything, and the curriculum's ready-made opener is dropped.
2. **Only some fully managed modes bill per Pod** (c-10, c-11, c-12). s-04 uses c-12's generic wording in the main text: "In most setups you pay for the machines; a few per-Pod options bill for what each Pod requests." No provider is named in the main text. D6 holds the detail (requests, not use; rounding up; waiting Pods unbilled on one provider). It doesn't contradict Ch 4, whose built text says Fennel pays "for the computing its Pods run on, which in most modes means paying for the machines themselves".
3. **The leak-vs-growth heuristic is model reasoning** (x-05). Presented in k-09's reveal and f-07 as "a rule of thumb engineers use", with "typically" and "a common sign"; f-07's caption says it is not a test. Only the docs' advice is stated as fact, and it is quoted: check for a leak first; if the app behaves as expected, raise the limit "and possibly" the request (c-23).
4. **Both survey figures are single-source** (c-13, c-14, c-15). Kept out of the main text; D5 "How common is this?" gives each with who measured, when and how: one vendor's dataset of its own AWS customers (all containers on EC2, not only Kubernetes) and one community survey of about 100 self-selected respondents. The main text's argument stands on Fennel's numbers and the mechanisms.
5. **The pending message is an adapted illustration** (x-06). Lane F's note line and s-03's reading of it are labelled "in the format engineers see; the exact wording varies between Kubernetes versions" (the caption under the lane, not a disclosure).
6. **Room units fold memory and processor into one number; `notifications` has no size** (x-08). This chapter retires room units: lane F and W-02 draw memory in GB (Ch 4's chips keep their heights: one unit was 2 GB of memory request, said once in s-02) and print processor as a second count per node; f-02 draws both counts on one node. Where the drawings still simplify (processor printed rather than drawn; W-02 lets the reader change only memory requests, for three services), the caption says so. `notifications` gets a size (2 copies; 2 GB and a quarter core each: one Ch 4 unit), recorded as a story fact (R2).

## Objectives

- o-1: explain that the scheduler places each Pod by the room it *reserves* (its requests, counted separately for memory and processor), not by what it uses, and therefore that requests, packed onto nodes, decide how many machines Fennel pays for in standard mode (and what it pays for in per-Pod-billed modes); including why free room split across nodes can't hold one Pod (m-26), and what node pools add. — checks: k-01, k-02, k-03, k-04, k-05, k-06
- o-2: predict the effect of over-requesting (more nodes, idle reserved room, Pods left waiting: m-07, m-08) and of under-requesting or setting limits too low (a slowed processor, memory kills, evictions) on cost and reliability, and say why some unused room is deliberate headroom. — checks: k-04, k-07, k-08
- o-3: interpret "pending", "OOM-killed" and an eviction as symptoms, name which loop is involved using the loop lens, and ask the questions they raise ("Is that a leak or real growth? What does it do to our node count?"). — checks: k-03, k-07, k-08, k-09

k-01 is the retrieval opener (the scheduler's lens from Ch 4's 03:04). k-03 serves o-1 (per-node, per-resource fit, m-26) and o-3 (pending is waiting, not failure, local-03). k-04 and k-05 bracket the sandbox: k-04 predicts the cost of padding (m-07), k-05 tests whether Kubernetes packs or gives nodes back by itself (m-08). k-07 interprets a memory kill against a processor slow-down (local-02). k-08 is the o-2 synthesis (halving requests: fewer nodes, evictions) and retests local-01. k-09 is the conversation, think-then-reveal. Headroom (o-2) has no check of its own: it is shown in the sandbox's switch and in k-08's feedback, and a check would be a judgment call ("how much spare room is right?") with no right answer.

## Diagnosis

- **Readiness:** novice for infrastructure, intermediate for software. Chunks the reader brings from Ch 1–4: a machine has a fixed amount of room; free room on several machines doesn't combine (Ch 3, designed out there); Kubernetes keeps a record of what's wanted, and loops each compare one thing and act; the ReplicaSet loop writes Pod records; the scheduler gives each Pod with no node a node "with room" (Ch 4 deferred *how*); the node agent starts what's assigned to its node and restarts crashed containers; Pods are replaced, never moved; a crash-looping container is restarted with growing waits; the cluster has run on three nodes since 03:04; Fennel pays for the machines in standard mode (Ch 4 §07).
- **Element interactivity: high**, in two places.
  - **Hardest moment: lane F, step F3.** The reader must hold a Pod's two requests (2 GB, 1 core), three nodes' free memory and free processor, the rule "both on the same node", and the fact that the total is enough. Naively that's 2 + 6 + 2 elements. Managed by:
    - **pre-training:** s-02 introduces requests on a manifest, then the two counts on *one* node (f-02, where a dispatch Pod fails on processor alone), then the filter rule in words, before the lane; and k-01 has already retrieved "the scheduler looks for a node with room";
    - **inline labels on the canvas:** each node bar shows its verdict (`FITS`, `NO MEMORY`, `NO PROCESSOR`) and its free amounts in place, so the reader reads three verdicts rather than computing six comparisons;
    - **one new element per step:** F1 the new Pod records (known loop), F2 placements and the filter (new), F3 the waiting state and the recorded reason (new), F4 retrying and "nothing makes room" (new), F5 a node arriving (known idea).
    At most three new elements are live at F3, within the novice limit.
  - **Second-hardest: the sandbox (s-04).** Inputs: three requests and a switch. Outputs: node count, what sets it, the idle bar, warnings. Managed by: opening on Fennel's real state (5 nodes) with every number labelled on the drawing; three short "things to notice" prompts instead of a target; no cost in money (the node count *is* the bill, in standard mode); and processor requests fixed, so only one resource is under the reader's hands while the other appears only as a floor ("set by processor").
- **Third: s-07, request vs. limit vs. use.** Three different numbers about one Pod. Managed by giving each a distinct look (dashed `c4` line = reserved, solid ink line = cap, `c1` line = used) on one chart (f-05), with every line labelled at its end, and by introducing the limit as the *second* number in the same manifest the reader already met (f-04 extends f-01).
- **Misconceptions confronted** (catalog IDs; three proposed locals):
  - **m-07** (owned): stated fairly in s-01 (the teams padded "to be safe") and in k-04 option A; shown predicting wrongly by lane F (padded requests filled three nodes on paper, so a Pod waited and Fennel rented two more nodes) and by the sandbox; the fair part kept: too low is risky too (s-08, k-08).
  - **m-08** (owned): stated fairly by Morgan in s-01 ("We moved so our machines would be used better"); wrong by lane F's five nodes, s-02's spreading, and k-05 (nothing packs or gives nodes back by default); the per-Pod variant ("then we'd pay only for what we use") corrected in s-04 (c-10, c-11).
  - **m-26** (owned): k-03 in lane F (enough in total, not on one node), F3's text, the callback to Ch 3's example after the lane, and the sandbox's "bigger than any node" case.
  - **local-01, "the scheduler places work where machines are least busy"** (proposed as m-29): k-02 (predict), the budget aside's breaks line, k-08 option C.
  - **local-02, "going over any limit kills; a limit is the room a Pod gets"** (proposed as m-30): s-07's three-line chart and two numbers in one manifest, k-07, the spending-cap aside's breaks line.
  - **local-03, "pending means failed, or means harmless"** (proposed as m-31): k-03 option C, F4's text, TERM 02's back line, and the questions after the lane.
- **Retrieval opener:** k-01, the scheduler's lens at Ch 4's 03:04 (CURRICULUM §2.8; the curriculum's k-05 candidate, reworded to need the lens). m-28 is not reused here (it fits Ch 8's lag better).
- **Analogy:** staffing and budgeting (the curriculum's), in two asides: the reserved budget (s-02) and the spending cap (s-07), each with WHERE THIS ANALOGY BREAKS.

## Disclosures

`<details class="d-more cp-more">`, collapsed by default, all optional; the main text reads correctly with all of them closed.
- D1 (s-01) "I didn't read the last chapter. What happened?"
- D2 (s-02) "Why can Pods reserve only about 13 GB of a 16 GB node?" (c-05, x-01)
- D3 (s-02) *only under option (c)*: "Would the scheduler really have put two `storefront` Pods on node 01?" (c-06, c-07, x-07)
- D4 (s-03) "Is 'pending' always about room?" (c-20 note; Ch 4: the image download)
- D5 (s-04) "How common is this?" (c-13, c-14, c-15)
- D6 (s-04) "What does a per-Pod mode charge for, exactly?" (c-10 notes, c-11, x-02)
- D7 (s-07) "What if a team sets no memory limit at all?" (c-18)

## Segments

### s-01 — Year 3: the first bill since the move
intent: Re-establish the cast for readers jumping in, retrieve the scheduler's lens from Ch 4's 03:04, then show the manager's view of one week (Pods that wouldn't start on Friday, an `orders` Pod restarted three times on Tuesday, a bill that went up) and Ari's one-line diagnosis, which is the chapter's thesis. [Part 1; Tuesday moves to Part 2's opener under the split]
objectives: o-1, o-3
claims: c-09, c-20, c-22
readiness: novice · interactivity: low (three symptoms, each named in a manager's words; one quoted question) · max-elements: 3
mode: orientation (cast strip, optional recap) → retrieval (choice, loop lens) → concrete story (pain seen in meetings) · blueprint: none
layout:
  contiguity: adjacent. Cast strip and D1 at the top of §01, then k-01, then the scene.
  pacing: continuous
  redundancy: D1 summarises Ch 4 in five sentences and doesn't re-teach; the scene names each symptom once, in the words Jordan hears it, without explaining it (each later section does).
  scaffold: D1, collapsed: "I didn't read the last chapter. What happened?"
ux: Glance at the cast strip, optionally open D1, commit to k-01, read the scene (about five short paragraphs) and Morgan's and Ari's quoted lines. At 360px the cast strip wraps; options are full width.
figure: none
widget: none
checks: k-01
content: these points, in order:
  - **Cast strip** (three people): "**Morgan**, co-founder; runs Fennel's money and reads the cloud bill. **Jordan**, co-founder, now managing the engineers: that's you, in this story. **Ari**, platform lead; led Fennel's move onto Kubernetes."
  - **D1, "I didn't read the last chapter. What happened?"** In Chapter 4 (Year 3), Fennel moved onto managed Kubernetes. Fennel writes down what it wants running, such as "3 copies of `storefront`", in files called manifests; Kubernetes keeps those goals in the cluster's record, and many small loops each compare one part of the record with what's actually running and act to close any gap: the ReplicaSet loop writes a record for each Pod (Kubernetes' wrapper around a running container), the scheduler gives each new Pod a node (a machine in the cluster), and the node agent on that node starts it. One Saturday at 03:04 node 03 died; with default settings, its Pods were replaced on other nodes within about six or seven minutes, and nobody had to wake up. Since then the cluster has run on three nodes. To understand any loop, ask four things: which loop is it, what does it want, what does it see, and what does it do about a gap?
  - k-01.
  - **The scene, in order of the week.** (Draft wording; the builder writes flowing prose.) Since 03:04 Fennel's cluster has run on three nodes, 01, 02 and 04. On Friday evening, as the dinner rush began, the dispatch team asked for twice as many `dispatch` copies, and one of the new Pods didn't start: Ari's dashboard listed it as `Pending` for most of an hour, until Ari's team rented two more machines and added them to the cluster as nodes 05 and 06. On Tuesday, the `orders` Pod restarted three times between lunch and the end of the dinner rush, and each time customers saw errors for a moment; the dashboard gave the reason as `OOMKilled`. At the end of the month, Morgan opened the first full cloud bill since the move, and it was higher than the last one before it.
  - **What Morgan asks** (`.cp-quote`, cite Morgan): "We moved onto Kubernetes so our machines would be used better. Now we pay for five of them instead of four, and Ari's dashboard says they're less than a third busy, even on a Friday night. What are we paying for?"
  - **Ari's line** (`.cp-quote`, cite Ari): "All three come back to two numbers our teams wrote down for every service when we moved."
  - **Hand-off:** this chapter starts where Chapter 4 said it would, with the loop that picked node 04 for `orders`, and ends with the questions Jordan should ask before anyone changes those numbers.

### s-02 — What the scheduler counts
intent: Show that the sizes in Ch 4's drawings were numbers the teams wrote into their manifests (requests: memory and processor, counted separately), that the scheduler first rules out nodes without room for both and then picks among the rest, and that it counts reservations, never live use (local-01); fill in the scheduler's loop lens and give the first half of the budget analogy with its breaks. [Part 1]
objectives: o-1
claims: c-01, c-02, c-03, c-05, c-06, c-07, c-08
readiness: novice · interactivity: medium (a request has two numbers; a node offers a fixed amount of each; both must fit on one node; reservations, not use) · max-elements: 3
mode: concrete artefact (manifest) → name (term card) → small labelled figure (one node, two counts) → rule in words (filter, then score) → worked example (moving day) → predict (local-01) → analogy with breaks → the lens filled in · blueprint: none
layout:
  contiguity: inline. f-01's annotations sit on the lines they explain; f-02's counts and the verdict are labelled on the node itself, not in a legend.
  pacing: continuous. k-02 comes after the filter rule and before the sentence that says "reservations, not use".
  redundancy: the prose doesn't re-read f-02's numbers; it states the rule the figure shows. The lens paragraph doesn't repeat the filter rule; it puts it in the lens's four blanks.
  scaffold: D2, collapsed: "Why can Pods reserve only about 13 GB of a 16 GB node?" (and D3 under option (c))
ux: Read two paragraphs and f-01, read TERM 01, look at f-02, read the rule and the moving-day paragraph, commit to k-02, read the reveal paragraph, the analogy aside and the lens paragraph. At 360px f-01's annotations drop under their lines and f-02 stacks its two columns' labels under the node.
figure: f-01 (storefront's manifest, with requests) and f-02 (one node, two counts). See ## Figures.
widget: none
checks: k-02
content: these points, in order:
  - **Where Ch 4's sizes came from** (c-02). In Chapter 4's drawings every Pod had a size and every node had room for six units, and the scheduler looked for "a node with room". Kubernetes didn't measure those sizes. Each team wrote them down, in its service's manifest, when Fennel moved: how much memory and how much processor each copy should have set aside. f-01 shows `storefront`'s. Engineers call these numbers the Pod's **requests** (`dfn`, TERM 01). One unit of room in Chapter 4 was 2 GB of memory request, so `storefront`'s two units are its 4 GB.
  - **TERM 01** (payoff variant): see ## Figures.
  - **What a node offers** (c-05). Fennel's nodes are rented machines with 16 GB of memory and 4 processor cores each. Part of each is kept back for the operating system and Kubernetes' own programs, so Pods can reserve about 13 GB and 3.9 cores of each node. D2 holds the why and one provider's numbers.
  - **Two counts, one node** (c-02). Memory and processor are counted separately, and a Pod fits on a node only if *both* of its requests fit in what that node has left unreserved. f-02 shows a node with plenty of memory left whose processor is nearly all reserved: a new `dispatch` Pod doesn't fit there, however much memory is free. (This keeps Chapter 3's promise to count them separately.)
  - **How the scheduler chooses** (c-01, c-06, c-07). The **scheduler** (`dfn`: the loop that gives each new Pod a node) works in two steps. First it rules out every node that doesn't have room for the Pod's requests. Then it scores the nodes that are left and picks the best, choosing at random between ties. With default settings, the best is the node with the most room left unreserved, and the scheduler also prefers to spread copies of the same service across different nodes, though only as a preference: if it can't spread them, it places them anyway.
  - **Moving day, explained** (option (b)): "That's why, on moving day in Chapter 4, `storefront`'s three Pods went to three different nodes. Nodes 01 and 04 had the most room left, so the first Pod went to one of them and the second to the other; the third went to node 02, which had no `storefront` copy yet and more room than 03." Then one sentence for m-08 to collect later: "Notice what the scheduler wasn't trying to do: fit Fennel onto as few nodes as possible." *(Option (a): the same paragraph, framed as "Chapter 4's drawing put two `storefront` Pods on node 01, where Sam had put them a year earlier, so that the two Saturdays could be compared. With default settings the scheduler would more likely have …" Option (c): this paragraph uses the Friday Pods instead and D3 holds the moving-day answer.)*
  - **Placement rules, one sentence** (c-08): "Teams can also add placement rules, such as keeping a service's copies on different nodes, sending some Pods only to particular machines, or keeping ordinary work off special ones; your engineers will tune these."
  - k-02.
  - **Reservations, not use** (c-03): the scheduler never looks at how busy a node is. The Kubernetes documentation says it refuses a node whose reservations are full "although actual memory or CPU resource usage on nodes is very low", and gives the reason: the room is protected for "when resource usage later increases, for example, during a daily peak". So a reservation is a promise to the Pod, kept even when the Pod isn't using it.
  - **The budget aside** (`.cp-aside`, ANALOGY): "You know this from budgeting. Think of each node as a department's budget, each request as the budget a project reserves, and the scheduler as finance, which approves a new project only in a department whose reservations leave room for it. Whether the projects have actually spent their money doesn't come into it." **WHERE THIS ANALOGY BREAKS:** "A finance team would notice a department sitting on unspent money and move it to where it's needed. The scheduler never does: reserved room that a Pod isn't using stays reserved, at 3 a.m. as at the dinner rush, and no other Pod can be placed in it." (The spending-cap half comes in §07.)
  - **The scheduler, through the loop lens** (Ch 4's pattern, one implementation): "In Chapter 4's terms, the scheduler is one implementation of the reconcile loop. It wants every Pod on a node with room for its requests. It sees Pods with no node, and how much memory and processor each node has left unreserved. What it does about a gap: it rules out the nodes that are too full, picks the emptiest of the rest, and writes that node into the Pod's record." End with the open question the next section answers: "And when no node passes the first step?"

### s-03 — Friday, 17:45: a Pod with nowhere to go
intent: Show, step by step on Ch 4's canvas, the scheduler failing to place a Pod on Fennel's three nodes: per-node, per-resource verdicts, a Pod left waiting with a recorded reason, retries that change nothing until Ari's team adds nodes; then name "pending", read the reason like an engineer, and confront m-26 and local-03. [Part 1]
objectives: o-1, o-3
claims: c-01, c-02, c-20, c-21
readiness: novice · interactivity: high (a Pod's two requests; three nodes' free memory and processor; both on one node; the waiting state; retries) · max-elements: 3
mode: scene set-up → step-locked worked example (scrollytelling, B1) with a predict gate (m-26, local-03) → name-after-meeting (term card) → reading an artefact (the recorded reason) → misconception debrief → the questions it raises · blueprint: B1
layout:
  contiguity: sticky. The canvas stays in view while lane F's steps scroll beside it (desktop) or beneath it (mobile). Each node's verdict and free amounts are printed on its bar during the scheduler's steps; the waiting Pod and the recorded reason are drawn on the canvas, not only in the text.
  pacing: step-revealed by scrolling; F3–F5 gated on k-03.
  redundancy: step text says what changed and why it matters; it doesn't read the canvas's numbers aloud except the one comparison each step turns on. After the lane, the prose doesn't replay the steps.
  scaffold: D4, collapsed: "Is 'pending' always about room?"
ux: Read the scene set-up paragraph, scroll F1–F2, commit to k-03 (three options) in the step column, scroll F3–F5. Then read TERM 02, a short paragraph on reading the reason, the m-26 paragraph and the questions. At 360px the canvas is sticky at the top (or inline per step where it wouldn't fit in 50vh); steps scroll beneath. No horizontal scroll.
figure: TERM 02 (pending). See ## Figures.
widget: w-friday-scrolly (complexity: high) — lane F, "Friday, 17:45", 5 steps on the pooled `renderCluster`, gated on k-03
checks: k-03
content: these points, in order:
  - **Scene set-up, before the lane** (the brief's lesson; one paragraph, then one on reading the canvas). "Since 03:04, Fennel's cluster has run on three nodes: 01, 02 and 04. Friday's dinner rush is when `dispatch`, which assigns drivers to orders, is busiest, and at 17:45 the dispatch team decides it wants six copies running tonight instead of three." Then: "The drawing is Chapter 4's, with one change: it now counts in real units. Each node's column is the 13 GB of memory its Pods can reserve, and each Pod's height is its memory request. The line under each node counts processor, which is reserved separately: so many of its 3.9 cores." The record and the loops are as in Chapter 4.
  - **Lane F** (steps under ## Widgets).
  - **TERM 02** (pending), right after the lane.
  - **Reading the reason** (c-20, x-06): the scheduler records why, every time it fails, in a line like the one on the canvas (in the format engineers see; the exact wording varies between Kubernetes versions). Read it left to right: "0/3 nodes are available" means none of the three nodes passed the first step; the rest says, node by node, what was short. It already answers the first question to ask.
  - **m-26, named** (c-02; Ch 3 x-01 by reference): the cluster had more free memory in total than the Pod needed, but in pieces on different nodes, and a Pod runs on one node, so the pieces never add up, and both of its numbers have to fit on the same node. Chapter 3 kept its drawings clear of this case on purpose; on a real cluster it's common. One sentence connects it to Morgan: the leftover pieces on 01, 02 and 04 are room Fennel pays for and no Pod of this size can use.
  - **local-03, the two wrong readings** (c-21): pending isn't a failure (nobody has to resubmit anything: the scheduler keeps trying, and places the Pod as soon as a node has room) and it isn't harmless either (in Fennel's cluster no loop makes room by itself: someone has to add a node or free some room; Chapter 8 introduces a loop that can add nodes). The questions it raises, set as a short two-line list: "What's short, and on how many nodes?" and "Is it short because demand really grew, or because what we reserved is more than we use?" The second question is §04's.
  - **D4, "Is 'pending' always about room?"** (c-20 note; Ch 4 by reference): no; `Pending` also covers the time a placed Pod spends downloading its image before it starts. The recorded reason tells the two apart.

### s-04 — What Morgan pays for
intent: Connect requests to the bill: in standard mode Fennel pays for every node however full; confront m-07 with a prediction, let the reader discover in the sandbox how requests set the node count (in steps, with processor as a floor, with insurance costing a node, with one Pod too big for any node), confront m-08 (nothing packs or gives nodes back by itself), name bin packing and the two kinds of idle, correct the per-Pod variant, and answer Morgan. [Part 1]
objectives: o-1, o-2
claims: c-02, c-03, c-06, c-09, c-10, c-11, c-12, c-13, c-14, c-15
readiness: novice · interactivity: high (requests per service; node count; what sets it; used / reserved-not-used / not reserved; insurance) · max-elements: 3
mode: predict (m-07) → goal-free exploration (sandbox, B2) with three "things to notice" → transfer check (m-08) → name (bin packing) → explanation (two kinds of idle; per-Pod modes) → payoff (Morgan's answer) · blueprint: B2
layout:
  contiguity: adjacent. The sandbox's readouts (node count, what sets it, the idle bar, warnings) sit right next to its controls at every width; each Pod's request and use are drawn on the Pod itself.
  pacing: continuous. k-04 is committed before the sandbox is reached (the sandbox is visible below it, but the prompt asks for the prediction first); k-05 follows the sandbox.
  redundancy: the prose after the sandbox doesn't list what the reader just saw; it names it (bin packing, the two kinds of idle) and adds what the sandbox can't show (billing modes). The sandbox's caption states its two simplifications once.
  scaffold: D5 "How common is this?", D6 "What does a per-Pod mode charge for, exactly?", each collapsed
ux: Read a short paragraph, commit to k-04, read the three "things to notice", use the sandbox (three steppers, one switch, a reset), commit to k-05, read three short paragraphs and Morgan's answer. At 360px the sandbox's readout strip and controls come first, the node drawing below them; steppers are 44px tall; no horizontal scroll.
figure: none (the sandbox carries the visuals)
widget: w-sizing-sandbox (complexity: high) — W-02 "Ari's sizing sheet": three memory requests and an insurance switch → nodes needed, what sets it, and the idle bar
checks: k-04, k-05
content: these points, in order:
  - **Lead** (c-09): in the provider's standard mode, which is Fennel's, the bill counts machines: Fennel pays for each node for as long as it exists, whether its room is reserved, used or empty. So Morgan's five nodes are the bill, and they're five because of the requests: three nodes couldn't hold what the teams had reserved, so Ari's team rented two more on Friday.
  - k-04.
  - **The sandbox, introduced in one paragraph and three prompts.** "W-02 is Ari's sizing sheet. It opens on Fennel's requests as the teams set them, and counts the nodes those requests need if the Pods are packed as tightly as they'll go, plus one spare node so that Fennel can lose one, as it did at 03:04. Each Pod's outline is what it reserves; the dark fill is what it used at last Friday's rush." Things to notice (a short list, not a task): "Set each request to what that service used at the rush. How many nodes does Fennel need now, and what sets that number?" · "Switch off the spare node. What does insurance cost?" · "Push `orders` past 13 GB."
  - **W-02.**
  - k-05.
  - **Bin packing, and what the default doesn't do** (c-06): fitting Pods' reservations onto as few nodes as possible is **bin packing** (`dfn`), and W-02 does it to count the fewest nodes. The scheduler, by default, doesn't: as §02 showed, it prefers the emptiest node and spreads copies out, which is safer for Pods but not the cheapest arrangement. Packing tightly is a setting engineers can switch on; some fully managed modes pack for you. Either way, the scheduler only places new Pods; it never moves running ones to empty a node (Ch 4: Pods are replaced, not moved).
  - **Two kinds of idle** (c-03, c-13): the idle bar in W-02 splits Fennel's unused room in two: room no Pod has reserved (too many nodes for the reservations, or room stranded in pieces), and room that Pods have reserved and don't use (requests bigger than the service needs). Morgan's "less than a third busy" is both together. D5 holds the survey figures.
  - **If you're billed per Pod** (c-10, c-11, c-12): in most setups you pay for the machines; a few per-Pod options bill for what each Pod *requests* while it runs, not for what it uses. So padding costs money there too, Pod by Pod, and some fully managed modes still bill per machine. D6 holds the detail.
  - **Morgan's answer, assembled** (a short paragraph, flowing; three causes, in order of size): two extra nodes, rented on Friday because padded requests had filled three nodes on paper; a node's worth of room kept spare, which is a choice (next section); and on every node, room kept back for the system that no Pod can reserve. A small fee per cluster for the control plane also appears on the bill (Chapter 14). Then the turn: requests closer to what services use at their busiest would let Fennel rent fewer nodes, but not as few as possible, and §05 and §08 say why.
  - **D5, "How common is this?"** (c-13, c-14, c-15): "One vendor's dataset (Datadog's 2024 report, from its own customers' AWS bills, all containers on EC2, May 2023 to April 2024) found 83% of container spend went on idle room: 54 points on room no Pod had reserved, 29 on requests bigger than workloads needed. In one community survey (CNCF, about 100 self-selected respondents, June to November 2023), 49% said Kubernetes had driven their cloud spend up, and over-provisioning was by far the most-cited cause, at 70%. These are single surveys, not industry averages."
  - **D6, "What does a per-Pod mode charge for, exactly?"** (c-10 notes, c-11, x-02): what each running Pod requests, per second on one provider; Pods waiting to be placed aren't billed there, but crash-looping ones are; one provider rounds a Pod up to the next available size (1 core and 8 GB, plus 256 MB for Kubernetes' parts, is billed as 2 cores and 9 GB). Prices are Chapter 14's.

### s-05 — Room on purpose
intent: Turn "idle room" from waste into a decision: some unused room is insurance for losing a node at the busiest hour (Ch 4's three nodes, Friday's lane) and for each Pod's own peaks; how much is a question for engineers and finance together. Keeps Ch 4's D4 promise. [Part 1]
objectives: o-2
claims: c-03, c-09, c-21
readiness: novice · interactivity: low (spare room; a lost node's Pods; the cost of one node) · max-elements: 2
mode: explanation tying two things already seen (lane F, the sandbox's switch) → the question to ask · blueprint: none
layout:
  contiguity: adjacent; it refers to the switch in W-02 by name ("the spare-node switch in W-02") rather than re-drawing it.
  pacing: continuous
  redundancy: two paragraphs and one quoted question; no figure.
  scaffold: none
ux: Read two short paragraphs and one question. At 360px it is plain prose.
figure: none
widget: none
checks: none
content: these points, in order:
  - **What Friday showed** (c-21): a cluster with no spare room handles an ordinary Friday by leaving Pods waiting. Since 03:04 Fennel had been running on three nodes with almost nothing spare, which is the room Chapter 4 said this chapter was about. If a node had died during the rush, its Pods would have been replaced, as at 03:04, but their replacements would have waited, like the `dispatch` Pod did.
  - **Room on purpose** (c-03, c-09): some unused room is insurance. A spare node's worth of room lets the cluster place a lost node's Pods; requests sized to a service's busiest hour leave room unused the rest of the week, which is the point (c-03's daily peak). Chapter 3 called this insurance and left "how much?" to this chapter: the honest answer is that it's a decision, made by engineers and finance together, and the spare-node switch in W-02 shows what it costs.
  - **The question to ask**, quoted: "If we lose a node during the dinner rush, where do its Pods go?"

### s-06 — Machines of different kinds: node pools
intent: Introduce node pools as groups of identical machines, needed when one Pod outgrows a node (the sandbox's `orders` past 13 GB) or when some work can run on cheaper machines that can be taken back; apply it with the criticality device (`orders` vs. `notifications`). [Part 2 under the split]
objectives: o-1
claims: c-08, c-20, c-24, c-25
readiness: novice · interactivity: low (a pool = one machine type; a large-memory pool; a spot pool; who goes where) · max-elements: 3
mode: problem first (a Pod bigger than any node) → name (dfn) → small labelled figure → apply check · blueprint: none
layout:
  contiguity: inline. f-03 labels each pool with its machine type and what it's for on the drawing.
  pacing: continuous
  redundancy: one paragraph per pool kind; f-03's caption adds only the rule (one machine type per pool; placement rules decide who may use it).
  scaffold: none
ux: Read two short paragraphs, look at f-03, commit to k-06. At 360px f-03 stacks its pools vertically.
figure: f-03 (Fennel's cluster as node pools). See ## Figures.
widget: none
checks: k-06
content: these points, in order:
  - **A Pod bigger than any node** (c-20): if `orders` keeps growing, a day may come when its request is bigger than any of Fennel's nodes has room for. The Kubernetes documentation is blunt about that case: such a Pod will never be placed (the sandbox showed it). The answer is a bigger machine type, and a cluster can have more than one.
  - **Node pools** (c-24): a **node pool** (`dfn`) is a group of identical nodes within a cluster; a cluster can have several pools of different machine types, such as a pool of large-memory machines for the Pods that need more memory. Every node in a pool has the same machine type, and pools are added, resized and removed as a whole. (Some providers call them node groups.) The placement rules from §02 send Pods to the right pool (c-08).
  - **Cheaper machines that can be taken back** (c-25): spot machines are rented at a lower price, but the provider can take one back at short notice when it needs the capacity. Teams give them their own pool and send there only the work that can tolerate being interrupted.
  - f-03, then k-06.

### s-07 — Tuesday: when a Pod uses too much
intent: Introduce limits as the second number in the manifest (a cap on use, not a reservation), and show on Tuesday's `orders` chart what happens at the memory cap (the operating system kills the container, the node agent restarts it in place: OOM-killed) as against the processor cap (slowed, never killed); confront local-02 and give the spending-cap half of the analogy. [Part 2 under the split]
objectives: o-2, o-3
claims: c-04, c-16, c-17, c-18, c-22
readiness: novice · interactivity: high (a request, a limit, actual use, over time; memory vs. processor behaviour at the cap) · max-elements: 3
mode: concrete artefact (Ari's dashboard line) → manifest (the second number) → chart (three lines, one Pod, one day) → name (two term cards) → contrast (memory vs. processor) → predict (local-02) → analogy with breaks · blueprint: none
layout:
  contiguity: inline. Every line on f-05 is labelled at its end ("reserved · 6 GB", "cap · 7 GB", "used"); each kill is marked on the line with its restart number.
  pacing: continuous. k-07 comes after the memory-vs-processor paragraph.
  redundancy: the prose says what the chart can't (who kills, who restarts, why memory and processor differ); it doesn't trace the line hour by hour.
  scaffold: D7, collapsed: "What if a team sets no memory limit at all?"
ux: Read a short scene, look at f-04 and TERM 03, look at f-05, read TERM 04 and two paragraphs, commit to k-07, read the analogy aside. At 360px f-05 keeps its full time axis but thins its tick labels (every 4 hours), and its line labels move above the plot.
figure: f-04 (the manifest's second number), f-05 (`orders` on Tuesday), TERM 03 (limits), TERM 04 (OOM-killed). See ## Figures.
widget: none
checks: k-07
content: these points, in order:
  - **Tuesday, on Ari's dashboard** (c-22): the `orders` Pod, `orders-q2rw`, shows a restart count of 3, and its last state reads `Terminated · Reason: OOMKilled · Exit code: 137`. Engineers will recognise 137; what matters for you is the word before it.
  - **The second number** (c-04): f-04 is `orders`' manifest section with both numbers: what each copy reserves (`requests`, 6 GB) and the most it may use (`limits`, 7 GB). A request isn't a cap: a container may use more than it requested while its node has room to spare; only a limit stops it. TERM 03.
  - **f-05**, introduced in one sentence: "Fig. 05 shows `orders`' memory through Tuesday, against those two numbers."
  - **What happened at the cap** (c-17, c-22): each time `orders`' memory reached 7 GB, the operating system on the node stopped the container: it was "OOM-killed", from "out of memory". The node agent then restarted it, in the same Pod on the same node (not a replacement, as at 03:04), and the restart count went up by one. Each restart was a short gap in which customers couldn't place orders. If it keeps happening, the waits between restarts grow, just as Chapter 4's crash-looping `notifications` did. TERM 04.
  - **Processor is different** (c-16): a container that reaches its *processor* limit isn't killed. It is slowed down (engineers say throttled) to its limit, because processor time can be handed out in slices and taken back, and memory a program is holding can't. So the symptom of a processor cap is "it got slow", and the symptom of a memory cap is "it restarted".
  - k-07.
  - **The spending-cap aside** (`.cp-aside`, ANALOGY; second half of §02's): "Back to budgets: if a request is the budget a project reserves, a limit is the spending cap on the project's card. A project may spend beyond its reservation, up to its cap, while the department has money to spare." **WHERE THIS ANALOGY BREAKS:** "Real spending caps work one way. Kubernetes has two: the processor card never declines, it just slows the spending down, while the memory card cuts the project off and starts it again from nothing. And spending above your reservation isn't safe just because it's allowed: when money runs short, the projects over their reservation are cut first (§08)."
  - **D7, "What if a team sets no memory limit at all?"** (c-18): then nothing caps it: the container can use all the memory on its node, and if the node runs out, a container without limits is more likely to be the one killed. Leaving it off isn't the safe choice.

### s-08 — Using more than you reserved
intent: Show the reliability cost of under-requesting: when a node runs short of memory, its node agent evicts Pods, those furthest over their requests first, and on a full cluster their replacements can end up pending; rehearse it on Morgan's "halve everything" idea (k-08); consolidate the chapter's loops in the loop lens table. [Part 2 under the split]
objectives: o-2, o-3
claims: c-04, c-19
readiness: novice · interactivity: medium (a node's memory running short; who is removed first; what replaces them; the cost side) · max-elements: 3
mode: explanation (grounded: the node agent watches its node's memory) → apply check (o-2 synthesis) → consolidation table (the lens) · blueprint: none
layout:
  contiguity: adjacent. f-06 follows the check, and its new or changed cells carry a `NEW IN CH 5` tag in the cell itself.
  pacing: continuous
  redundancy: the eviction paragraph contrasts with §07's kill in one sentence rather than re-explaining it; f-06 is introduced in one sentence and not re-listed in prose.
  scaffold: none
ux: Read two paragraphs, commit to k-08, look at f-06. At 360px f-06 becomes stacked cards.
figure: f-06 (the loop lens table, Ch 5 rows). See ## Figures.
widget: none
checks: k-08
content: these points, in order:
  - **Ground first: what the node agent watches** (c-19). Besides starting and restarting containers (Chapter 4), each node's agent keeps an eye on how much memory its node has left. Ordinarily, Pods using more than they reserved is fine (c-04): there's room to spare.
  - **When a node runs short** (c-19, c-04): if the node's free memory falls too low, its agent removes Pods to protect the node and everything else on it. That's an **eviction** (`dfn`). It goes first for the Pods using the most memory beyond what they reserved; Pods within their requests go last. Unlike §07's kill, an eviction removes the Pod, and the ReplicaSet loop writes a new one (Ch 4), which the scheduler then has to place: on a full cluster, it waits, as on Friday. So a request set below what a service really uses doesn't save that service any room; it puts it first in line.
  - k-08.
  - **f-06**, introduced in one sentence: "Here are the loops you've met so far, through the loop lens, with what this chapter added."

### s-09 — The conversation
intent: Rehearse the chapter's discussion move: Ari's "bump memory limits on `orders`" → the two questions (leak or growth? the node count?), with the rule-of-thumb picture behind the first and the sandbox behind the second; recap and turn to the next chapter. [Part 2 under the split]
objectives: o-3, o-2
claims: c-02, c-09, c-23
readiness: novice · interactivity: medium (leak vs. growth; limit vs. request; node count) · max-elements: 3
mode: think-then-reveal (apply: the questions to ask) → contrasting cases (two weekly patterns, B4-style) → recap → bridge · blueprint: B4
layout:
  contiguity: adjacent. Ari's line is quoted directly above k-09; f-07 sits inside k-09's reveal, under the model answer, with the two patterns side by side and their shared axes aligned.
  pacing: gated on k-09 for f-07 (the picture is part of the answer)
  redundancy: the recap is five lines and doesn't re-explain; the reveal's why-lines don't repeat §07.
  scaffold: none
ux: Read Ari's line, think, reveal k-09 (model answer, two why-lines, f-07), read the recap and the bridge. At 360px f-07's two charts stack, leak first.
figure: f-07 (leak vs. growth, inside k-09's reveal). See ## Figures.
widget: none
checks: k-09
content: these points, in order:
  - **Ari's line** (`.cp-quote`, cite Ari): "We need to bump memory limits on `orders`." Then k-09.
  - **Recap**, five lines:
    - "Each team writes down two numbers per service: what each copy reserves (its requests) and the most it may use (its limits)."
    - "The scheduler places each new Pod by its requests, memory and processor counted separately, on one node that has room for both. It never looks at how busy a node is."
    - "If no node has room, the Pod waits, pending, and the scheduler keeps trying; nothing in this chapter makes room by itself."
    - "Requests, packed onto nodes, decide how many machines you rent. Padding them buys nodes; cutting them below what services use buys evictions. Some spare room is insurance, on purpose."
    - "At its memory limit a container is killed and restarted; at its processor limit it's slowed. Before raising a limit, ask whether it's a leak or real growth, and what it does to the node count."
  - **Bridge** (forward-looking, draft): "Every loop so far has kept the same version of each service running. Next, Fennel's teams start shipping several times a day, and a loop takes over the job Sam once did by hand on a Tuesday night: replacing one version with the next, without anyone typing 'Nobody deploy anything'."

## Figures

Simple figures are drawn by the page builder as figure plates (Control Plane `Figure` treatment: mono header bar, blueprint ground, direct labels, numbered caption), following ## Visual grammar. All re-layout under 600px rather than scale; text is never below 13px. Numbers on figures are Fennel's story numbers (R2).

### f-01 — A manifest's requests (s-02)
- **Model.** A figure plate, header `FIG. 01 · A MANIFEST · STOREFRONT`, a code block on `c4-soft` (Ch 4's manifest ground):
  ```
  # … the rest of storefront's manifest
  containers:
  - name: storefront
    image: storefront:v38
    resources:
      requests:
        memory: 4Gi
        cpu: 500m
  ```
  Annotations on their lines (right margin on desktop, under the line on mobile): `resources:` → "how much each copy needs"; `requests:` → "**set aside for each copy**" (the plate's one accent mark); `memory: 4Gi` → "4 GB of memory"; `cpu: 500m` → "half a processor core (engineers write thousandths of a core)".
- **Caption.** "Fig. 01. A team writes its requests into the manifest. Kubernetes doesn't measure them; it reserves exactly what's written."
- **Size.** Measure width, about 220px tall desktop; at 360px no line is longer than 28 characters at 13px mono and the annotations sit under their lines, about 360px.
- **Reuse.** f-04 is the same block with `limits:` added; Ch 8 and Ch 11 can retrieve it.

### f-02 — One node, two counts (s-02)
- **Model.** One node frame, header bar `NODE · ROOM FOR PODS: 13 GB · 3.9 CORES`, drawn as two side-by-side columns inside the frame:
  - `MEMORY` column, 13 GB tall: three `dispatch` Pod chips of 2 GB each (6 GB), then `7 GB FREE` (Ch 3's dashed free region).
  - `PROCESSOR` column, 3.9 cores tall: the same three Pods as slices of 1 core each (3 cores), then `0.9 FREE`.
  - Beside the frame, a fourth `dispatch` Pod, drawn dashed (a Pod with no node yet), labelled `NEW POD · 2 GB · 1 CORE`, with two verdict lines aligned to the columns: `memory: 2 of 7 free · FITS` (`good`) and `processor: 1 of 0.9 free · DOESN'T FIT` (`warn`), and the result `NOT PLACED HERE` (`warn`).
  - No arrows.
- **Caption.** "Fig. 02. A Pod fits on a node only if both of its requests fit. This node has memory to spare, but its processor is nearly all reserved."
- **Size.** Measure width, about 260px tall desktop. Under 600px the new Pod and its verdicts move below the node, about 420px at 360px.
- **Why a static figure here.** It pre-trains the two counts on one node, so lane F's three-node check is three known verdicts, not six new comparisons.

### f-03 — Fennel's cluster as node pools (s-06)
- **Model.** One `CLUSTER` frame (Ch 3's 3px ink frame) holding two pool frames (thin `ink-3` outline, mono header) and one dashed hypothetical:
  - `NODE POOL · GENERAL · 16 GB, 4-CORE MACHINES`: five small node outlines `01 02 04 05 06`, no Pods drawn (this figure is about machine types, not placement).
  - `NODE POOL · SPOT · CHEAPER, CAN BE TAKEN BACK`: two smaller node outlines, labelled "for work that can be interrupted".
  - `NODE POOL · LARGE MEMORY · 64 GB MACHINES` drawn dashed (`c6`, not yet rented), labelled "if `orders` outgrows the general nodes".
- **Caption.** "Fig. 03. Every node in a pool is the same machine type. Placement rules decide which Pods may use which pool."
- **Size.** Desktop `.d-wide`, about 200px tall; under 600px the pools stack, about 420px.

### f-04 — The manifest's second number (s-07)
- **Model.** f-01's plate, now for `orders` (header `FIG. 04 · A MANIFEST · ORDERS`), with both blocks:
  ```
  resources:
    requests:
      memory: 6Gi
      cpu: "1"
    limits:
      memory: 7Gi
      cpu: "1"
  ```
  Annotations: `requests:` → "set aside for each copy (what the scheduler counts)"; `limits:` → "**the most each copy may use**" (accent); `memory: 7Gi` under limits → "over this, the container is killed"; `cpu: "1"` under limits → "at this, the container is slowed".
- **Caption.** "Fig. 04. Two numbers per resource: what a copy reserves, and the most it may use."
- **Size.** Measure width, about 200px; about 340px at 360px.

### f-05 — `orders` on Tuesday (s-07)
- **Model.** A line chart in a figure plate, header `FIG. 05 · ORDERS · MEMORY, TUESDAY`. x-axis 08:00–22:00; y-axis 0–8 GB.
  - **Used** (`c1` solid line): starts near 4 GB at 08:00, rises through the lunch hours to 7 GB at about 12:40; ✕ in `bad` with `OOMKilled · restart 1`; drops to about 1.5 GB (the restarted container), climbs again; ✕ `restart 2` at about 18:50 and ✕ `restart 3` at about 20:10, in the dinner rush.
  - **Reserved** (`c4` dashed horizontal line at 6 GB), labelled at its right end `RESERVED · REQUEST 6 GB`.
  - **Cap** (solid `ink` horizontal line at 7 GB), labelled `CAP · LIMIT 7 GB`.
  - The band between 6 and 7 GB lightly shaded `warn-soft` (or `c6` hatched), labelled once: "above its reservation: allowed, but first in line if the node runs short (§08)".
  - No legend: every line labelled at its end; no gridlines beyond the 0, 6 and 7 GB references.
- **Caption.** "Fig. 05. Three numbers about one Pod: what it reserves, what it may use, and what it used. A single day can't tell you why the line keeps climbing."
- **Size.** Desktop `.d-wide`, about 280px tall. Under 600px full width, about 240px tall, tick labels every 4 hours, the three line labels stacked above the plot.
- **Data.** Fiction (R2), drawn as a smooth illustrative line with the three kill times above; the builder keeps the data in `site/assets/`.

### f-06 — The loop lens, Ch 5 (s-08)
- **Model.** Ch 4's f-04 table (a copy, not an edit), header `FIG. 06 · WHICH LOOP: WANTS, SEES, DOES`, built from a `CH05_LOOPS` array in this chapter's `site/assets/page.js` (CURRICULUM §2.3 format: loop, per, wants, sees, does, job, chapter), in Ch 4's row order. Changed or new cells carry a mono `NEW IN CH 5` tag:
  1. **node loop** · unchanged from Ch 4.
  2. **ReplicaSet loop** · unchanged, with one added clause in *does*: "…, including for Pods that were evicted" (`NEW IN CH 5`).
  3. **scheduler** (`NEW IN CH 5` on wants, sees, does) · wants: every Pod on a node with room for its requests · sees: Pods with no node, and how much memory and processor each node has left unreserved (never how busy it is) · does: rules out nodes too full for the Pod, picks the emptiest of the rest, spreading copies; if none has room, leaves the Pod pending, records why, and tries again when the cluster changes · job: placing.
  4. **node agent** (one per node; `NEW IN CH 5` on wants, sees, does) · wants: its node's assigned Pods running, and the node itself healthy · sees: the containers on its node, and how much memory the node has left · does: starts and restarts containers (including OOM-killed ones); when its node runs short of memory, evicts Pods, those furthest over their requests first · job: restarting.
  5. (dashed) **another loop, Chapter 7** · unchanged.
  6. (dashed, `NEW IN CH 5`) **a loop that adds nodes, Chapter 8** · wants: no Pod waiting for room · sees: pending Pods · does: adds nodes, and removes idle ones · job: scaling.
  Footer line: "The memory kill itself is the operating system's, on the node; the node agent restarts the container afterwards."
- **Caption.** "Fig. 06. The same loops as in Chapter 4, filled in further. Pending and evictions are gaps the loops see; adding room is a job no loop in Fennel's cluster does yet."
- **Size.** Desktop `.d-wide`, about 360px tall. Under 600px stacked cards (loop name as mono header; four labelled lines), about 900px at 360px.
- **Reuse (course convention, CURRICULUM §2.3).** Ch 6 copies `CH05_LOOPS` forward and adds the Deployment loop; Ch 8 fills in row 6.

### f-07 — Leak or growth? (s-09, inside k-09's reveal)
- **Model.** Two small line charts side by side, same axes (a week, Monday–Sunday; 0–8 GB), each with `orders`' memory (`c1`) over a lightly shaded order-traffic band (`c6` dashed outline, labelled once "orders per hour") and the `CAP · 7 GB` line:
  - Left, header `A COMMON SIGN OF A LEAK`: memory climbs steadily from each restart, overnight too, when there are almost no orders, until it hits the cap and is killed: a sawtooth that ignores the traffic band.
  - Right, header `A COMMON SIGN OF REAL GROWTH`: memory rises and falls with the traffic band each day, highest on Friday; after Monday's change the daily peaks sit higher, and only the busiest ones touch the cap.
- **Caption.** "Fig. 07. A rule of thumb engineers use, not a test: a leak climbs whatever the traffic; growth follows it. Ask to see the week, not the day."
- **Size.** Desktop `.d-wide`, two columns, about 220px tall. Under 600px stacked (leak first), about 460px.
- **Sourcing.** Model reasoning (x-05), so every label says "a common sign"; the accuracy reviewer treats it as illustration.

### Term cards — `.cp-term` (s-02, s-03, s-07)
Ch 3's treatment, unchanged (CURRICULUM §8 step 4): outlined plate, mono `accent` kicker `NEW TERM · 0N / 04`, the term large in the heading face, one definition sentence, a mono `ink-3` back line. The prose's first use is a `dfn` with `aria-describedby` pointing to the card.
- **TERM 01 · requests** (s-02), **payoff variant** (blueprint ground; the chapter's only one). Definition: "The memory and processor a Pod reserves on its node, written in its manifest. The scheduler places Pods by their requests, never by what they use." Under it, in mono: "memory and processor, counted separately". Back: "Chapter 4's 'room', written down."
- **TERM 02 · pending** (s-03). Definition: "A Pod the scheduler hasn't been able to place yet. It waits, and the scheduler keeps trying and records why." Back: "Not failed, and not fixed by waiting alone."
- **TERM 03 · limits** (s-07). Definition: "The most memory and processor a Pod's container may use. They cap use; they reserve nothing." Back: "The second number in Fig. 04."
- **TERM 04 · OOM-killed** (s-07). Definition: "Stopped by the node's operating system for going over its memory limit ('out of memory'), then restarted in place." Back: "Engineers see `OOMKilled`, and exit code 137."
- `dfn` only (no card): scheduler (s-02), bin packing (s-04), node pool (s-06), eviction (s-08).

## Visual grammar

Extends Ch 1–4's grammar (CURRICULUM §5 Visuals column), which is unchanged. The rule from the user's reviews drives every new item: **things different in kind look different.** Three new kinds matter here: what a Pod **reserves**, what it **uses**, and its **cap**.

- **Units replace room units.** Pod chip height = its **memory request** in GB (Ch 4's chip; one Ch 4 unit = 2 GB, so the drawings keep their proportions). A node's body = **13 GB of room for Pods**; unused room = Ch 3's dashed `c6` region `N GB FREE`.
- **Processor = a second count, printed.** On the lane and the sandbox, each node shows a mono footer line `CPU 2.75 / 3.9` (reserved / room for Pods), `ink-2`; it gets the step highlight when the step turns on it. Only f-02 draws processor as a column.
- **Reserved vs. used vs. cap:**
  - *reserved* = the Pod chip itself (outline and `c1-soft` fill), as in Ch 4: a Pod holds its reservation;
  - *used* (sandbox only) = a solid `c1` fill from the chip's bottom, to the height of the Pod's use at last Friday's rush; where use exceeds the request, the fill rises above the chip's top edge, hatched, with a `warn` tag `USES MORE THAN IT RESERVES`;
  - *cap* (limit) = drawn only on f-04 and f-05: a solid `ink` line labelled `CAP · LIMIT`.
  - On charts, *reserved* is a dashed `c4` line (a written number: Ch 4's colour for written intentions), *used* a `c1` line, *cap* a solid `ink` line.
- **WAITING** (Ch 4 designed it in): a Pod with no node is a dashed `c1` chip with no fill and no lamp, drawn in a strip above the nodes headed `WAITING · NO ROOM` (`warn`). Its record row word reads `n RUNNING · n WAITING` (`warn`).
- **The scheduler's verdicts** (lane only, on the scheduler's steps): on each node bar, `FITS` (`good`), `NO MEMORY` or `NO PROCESSOR` or `NO MEMORY · NO PROCESSOR` (`warn`), with the node's free amounts beside them (`1 GB · 0.15 CORES FREE`). Narrow canvas: `✓ FITS`, `✕ MEM`, `✕ CPU`, free amounts dropped (the step text gives the one that matters).
- **The recorded reason** = a mono note line under the nodes, labelled `SCHEDULER`: `0/3 nodes are available: 1 Insufficient cpu, 3 Insufficient memory.` (wraps on narrow).
- **A node added between steps** gets a `NEW` tag on its bar for that step (Ch 4 designed in `nodes` gaining keys).
- **The idle bar** (sandbox): one horizontal bar of all rented room for Pods, three segments with direct labels and GB: `USED AT THE RUSH` (solid `c1`), `RESERVED, NOT USED` (`c1-soft`), `NOT RESERVED` (dashed `c6`, Ch 3's free grammar).
- **Node pool** (f-03): thin `ink-3` group frame with a mono header `NODE POOL · …`; a pool not yet rented is dashed `c6`.
- Ch 4's record panel, loop pills, lens line (`SEES · … / DOES · …`), node agent pills, Pod ring, NOT STARTED / STARTING, clock kicker and step highlight are unchanged.

## Widgets

### w-friday-scrolly
segment: s-03
complexity: high
blueprint: B1 (step-locked canvas as scrollytelling), one lane of 5 steps, gated on k-03
model: One lane over Ch 4's cluster drawing, rendered by the pooled `renderCluster` (see reuse) from a **complete snapshot per step** (Ch 4's format, extended below), so scrolling back restores any step exactly. All data and every reader-visible string live in this widget's `data.js`.
  - **Units:** nodes offer 13 GB and 3.9 cores for Pods. Per-copy requests (memory GB · processor cores): `storefront` 4 · 0.5; `orders` 6 · 1; `payments` 2 · 0.25; `dispatch` 2 · 1; `notifications` 2 · 0.25 (R2).
  - **Mechanism rules (claims):** the ReplicaSet loop writes Pod records to match WANT (Ch 4 c-12); the scheduler takes Pods with no node one at a time, rules out each node where reserved + request exceeds room for Pods in memory *or* processor (c-01, c-02), and among the rest prefers fewer copies of the same service, then the most room left unreserved (c-06, c-07), breaking ties at random; a Pod no node passes stays with no node, WAITING, and the scheduler records a reason in the documented format (c-20, x-06); it retries when the cluster changes, such as a node joining (c-21); running Pods never move (Ch 4).
  - **Starting state, Friday 17:45 (option (b), Ch 4 edited)** — record rows `orders`, `payments`, `dispatch`, `storefront`, `notifications`, all matching what runs:
    - node 01: `payments`, `storefront`, `dispatch`, `notifications` → 10 GB reserved (3 GB free), CPU 2.0 / 3.9
    - node 02: `dispatch`, `dispatch`, `storefront`, `notifications` → 10 GB (3 GB free), CPU 2.75 / 3.9
    - node 04: `payments`, `storefront`, `orders` → 12 GB (1 GB free), CPU 1.75 / 3.9
  - **Starting state under options (a)/(c), Ch 4 unchanged:**
    - node 01: `payments`, `storefront`, `storefront`, `notifications` → 12 GB (1 free), CPU 1.5
    - node 02: `dispatch`, `dispatch`, `storefront`, `dispatch` → 10 GB (3 free), CPU 3.5
    - node 04: `payments`, `orders`, `notifications` → 10 GB (3 free), CPU 1.5
  - **Snapshot format additions** (document in `data.js`'s header, extending Ch 4's): node capacity and units (`capacity: { memory: 13, cpu: 3.9 }`, `unit: 'GB'`); per-service `cpu` beside `size`; node footer `cpu` computed from the Pods (never hand-written); Pod status `waiting` with the Pod listed in a top-level `waiting: ['di7']` (not in any node); record row word computed as `n RUNNING · n WAITING`; `verdicts: { '01': 'mem', '02': 'mem cpu', '04': 'mem' | 'fits' }` drawn on node bars; a `scheduler` note type for the recorded reason; `newNodes: ['05', '06']` for the `NEW` tag. Ch 4's fields unchanged.
reader_does: Scrolls through one lane. At the end of F2 commits to k-03 (three options) in the step column; the commit unlocks F3–F5. Any option unlocks; the check's feedback explains a wrong pick. The canvas has no controls.
shows: Canvas header `W-01 · THE CLUSTER`, lane name `FRIDAY, 17:45`, the clock kicker, `STEP n / 5`. Step text is draft wording (one to three sentences each; flowing, cause and effect).
  - **F1 · 17:45.** Record: `dispatch` WANT 3 → **6** (row highlighted); `↻ ReplicaSet loop` active; lens `SEES · dispatch: 6 wanted, 3 Pods` / `DOES · writes 3 new Pod records`; the row gains three hollow marks. Nodes as in the starting state. Text: "At 17:45 the dispatch team changes `dispatch`'s manifest from three copies to six. Within seconds the ReplicaSet loop notices that six are wanted and three exist, and writes three new Pod records. None of them has a node yet."
  - **F2 · seconds later.** `↻ scheduler` active. Under (b): the first new Pod is checked: verdicts `01 FITS` (3 GB · 1.9 cores free), `02 FITS` (3 GB · 1.15), `04 NO MEMORY` (1 GB); it goes to 01 (fewer `dispatch` copies than 02); the second is checked against what's left: `01 NO MEMORY`, `02 FITS`, `04 NO MEMORY`; it goes to 02. Both drawn NOT STARTED on their nodes (highlighted); free labels update (01: 1 GB, 02: 1 GB, 04: 1 GB). Lens `SEES · 3 Pods with no node` / `DOES · places 2: dispatch → 01, dispatch → 02`. The canvas shows the second Pod's verdicts. Text: "The scheduler takes the new Pods one at a time. For each, it first rules out every node without room for 2 GB of memory and a whole processor core. The first Pod could go to node 01 or 02, and goes to 01, which has fewer `dispatch` copies; the second fits only on 02." Then **k-03**. *(Options (a)/(c): one Pod placed: verdicts `01 NO MEMORY` (1 GB), `02 NO PROCESSOR` (0.4 cores), `04 FITS` → 04; text adjusted; k-03 asks about the other two.)*
  - **F3 (gated on k-03).** Scheduler still active. The third Pod's verdicts: `01 NO MEMORY`, `02 NO MEMORY · NO PROCESSOR` (1 GB · 0.15 cores), `04 NO MEMORY`. The Pod appears in the `WAITING · NO ROOM` strip (highlighted); the `dispatch` row reads `5 RUNNING · 1 WAITING` (the two placed Pods are RUNNING now: their agents started them, unhighlighted); the `SCHEDULER` note: `0/3 nodes are available: 1 Insufficient cpu, 3 Insufficient memory.` Lens `SEES · 1 Pod with no node; no node with room` / `DOES · leaves it unplaced; records why`. Text: "The third Pod fits nowhere. Between them the three nodes have 3 GB of memory free, more than it needs, but in 1 GB pieces, and a Pod has to fit whole on one node. So the scheduler leaves it without a node and writes down why." *(Options (a)/(c): two Pods wait; `4 RUNNING · 2 WAITING`; note `0/3 nodes are available: 1 Insufficient cpu, 2 Insufficient memory.`; text: "…5 GB of memory and over 4 cores free between them, but node 02 has the memory without the processor, and 01 and 04 the processor without the memory.")*
  - **F4 · 18:00–18:40.** The waiting Pod stays; a `DISPATCH` note line in `warn`: `5 of 6 copies running at the rush` (options (a)/(c): `4 of 6`). Lens `SEES · 1 Pod with no node` / `DOES · tries again whenever the cluster changes`. Clock kicker `18:00–18:40`. Text: "Nothing has failed: the scheduler keeps trying, and nobody has to resubmit anything. But nothing changes either, because in Fennel's cluster no loop adds room. For the busiest part of the evening, `dispatch` runs one copy short."
  - **F5 · ~18:40.** Nodes `05` and `06` appear on the right, empty, each with a `NEW` tag and an agent pill (highlighted). The scheduler, seeing the cluster change, checks again: `05 FITS`, `06 FITS`; the Pod goes to 05; its agent starts it; the `dispatch` row reads `6 RUNNING`; the `DISPATCH` note clears; node 06 reads `13 GB FREE`. Lens `SEES · 1 Pod with no node; two new nodes` / `DOES · dispatch → 05`. Text: "At about 18:40 Ari's team adds two nodes, 05 and 06. The scheduler notices the change and places the waiting Pod on 05 within seconds. Fennel now pays for five nodes. The scheduler places only new Pods; it doesn't move running ones, so node 06 stays empty." *(Options (a)/(c): the two Pods go to 05 and 06, one each; "…so 05 and 06 each hold one small Pod".)*
  - **Every step:** the step highlight marks what changed in that step only; the canvas `aria-label` is the step's state summary from `data.js`; the step text carries the meaning alone. A caption under the lane: "Fennel's requests and nodes are fiction. The scheduler's reason is in the format engineers see; its exact wording varies between Kubernetes versions."
size: **Desktop (≥ 900px):** Ch 4's lane layout inside `.d-wide`: canvas left (about 55%), sticky; steps right. The canvas grows from three to five node columns at F5; reserve the five-node width from F1 (empty columns to the right are blank space, not drawn frames), so nothing reflows. Memory at 16px per GB (Ch 4's 32px per 2 GB unit): node body 13 × 16 = 208px plus padding; record panel five rows; total about 600px.
  **600–899px and phones:** one column, canvas sticky at the top, steps beneath as opaque cards. **At 360px:** 11px per GB (body about 143px); three node columns of about 100px through F4; at F5 five columns of about 62px (chip labels follow Ch 4's narrow rules; a size-1 chip shows its status word in place of its label where it doesn't fit); node bars on two lines; verdicts in their narrow form; record rows in a 2×2(+1) grid; only the acting loop's pill and lens line. Where the measured canvas is taller than 50vh or the viewport is under 560px tall, each step shows its own inline snapshot (Ch 4's fallback, decided by measurement).
  **Gated steps:** as Ch 4: F3–F5 reserve their height and show "Answer the question above to see what happens" until k-03 is committed; unlock on `didactician:check-commit`; never re-lock.
  **Motion:** changes over ≤ 300ms (flair length, no replay needed, I4); instant under reduced motion; no autoplay. **No-JS:** step text visible; a `<noscript>` line says the drawing needs JavaScript.
acceptance: ac-04, ac-05, ac-06, ac-07
reuse: **Decision: reuse Ch 4's `renderCluster` and lane controller from the shared pool; never copy Ch 4's files.** Before the build, the orchestrator asks the user to promote Ch 4's `site/widgets/w-cluster-scrolly/` renderer and lane controller into `explainers/_pool/` (the pool README names it as the first candidate), with Ch 4 re-gated on the pooled copy. **What the renderer must add** for this chapter (pool changes, made at promotion so that Ch 4 keeps rendering unchanged when the new fields are absent): (1) per-node capacity and a unit (`capacity`, `unit`), with chip heights scaled by GB and fractional sizes allowed (the sandbox uses 0.5 GB steps); (2) a computed processor footer line per node; (3) the `waiting` strip and the `n WAITING` row word (designed in by Ch 4, not drawn); (4) per-node `verdicts` on the node bar, wide and narrow forms; (5) the `scheduler` note type; (6) the `NEW` tag for added nodes; (7) per-Pod `use` fill with the overflow form (sandbox only); (8) an option to draw only the nodes (no record panel, no loop pills, no header step counter) for the sandbox. The lane controller is reused unchanged.
  - **Later chapters** that would use this lane renderer: **Ch 6** (rollouts: a new version needs spare room while old and new run side by side; nested record rows); **Ch 8** (nodes added and removed between steps, pending Pods driving the added node, now by a loop; requests drive node count); **Ch 11** (one team's spike leaves another team's Pods pending; quotas as a cap on a team's total requests); **Ch 12** (OOM-killed restarts with `restarts`, evictions, a crash loop from repeated kills).
  - **Reader-visible complexity added for reuse:** none.

### w-sizing-sandbox
segment: s-04
complexity: high
blueprint: B2 (goal-free state explorer)
model: Fennel's services with fixed copies — `storefront` ×3, `orders` ×1, `payments` ×2, `dispatch` ×6 (since Friday), `notifications` ×2 — each with a memory request (GB), a processor request (cores, fixed) and its use at last Friday's rush (R2):
  - `storefront` request **adjustable** 0.5–8 GB (default 4) · 0.5 core · used 2 GB, 0.3 core
  - `orders` request **adjustable** 0.5–16 GB (default 6) · 1 core · used 5.5 GB, 0.5 core
  - `dispatch` request **adjustable** 0.5–6 GB (default 2) · 1 core · used 1 GB, 0.6 core
  - `payments` 2 GB (fixed) · 0.25 core · used 0.5 GB, 0.1 core
  - `notifications` 2 GB (fixed) · 0.25 core · used 0.5 GB, 0.1 core
  - Nodes: 13 GB and 3.9 cores of room for Pods each (16 GB, 4-core machines; c-05).
  - **Nodes needed** = the fewest nodes on which every Pod fits, packed as tightly as possible, with each Pod whole on one node and each node's memory and processor reservations within its room (c-02). Compute it exactly (a small backtracking search over the 14 Pods, largest first, skipping nodes in identical states; the designer's prototype needs at most about 8,000 steps per setting, well under a frame), so that raising a request never lowers the count. **Spare node switch** ("keep room to lose a node", default **on**): nodes needed = 1 + the fewest nodes on which everything fits. If any Pod's request is larger than a node's room for Pods, there is no answer: the readout shows `NODES · —` and that Pod is listed as never placeable.
  - **Set by:** compare the count with memory requests alone and with processor requests alone; label `MEMORY`, `PROCESSOR` or `BOTH`, whichever forces the count.
  - **Readouts:** reserved memory = sum of requests; rented room = nodes × 13 GB; used = sum of use at the rush (19.5 GB, constant); the idle bar = used / reserved-not-used / not reserved (GB and %); warnings per service where request < use ("uses more than it reserves: first in line if a node runs short, §08") and per never-placeable Pod.
  - **Expected values (acceptance; from the designer's prototype of this exact model):** defaults (4, 6, 2), switch on → **5 nodes**, set by memory, reserved 38 of 65 GB, used 19.5 (30%); switch off → **4**. Right-sized (2.5, 6, 1.5) → **3**, set by both; switch on → 4. At use (2, 6, 1) → **3**, set by **processor**; switch on → 4. `orders` at 8 with the others right-sized → 3; at 12 → 4. `orders` at 13.5 or more → `—`.
  - **Drawing:** the nodes as the pooled renderer draws them (nodes-only option), each Pod placed where the packing put it, with its request (chip) and use (fill); the node footers show processor. Placement is recomputed from scratch on every change.
  - **Simplifications, stated in the caption:** the sandbox packs tightly to count the fewest nodes; the default scheduler spreads Pods out instead (§02), so a real cluster needs at least this many. Each change places every Pod afresh; a real cluster never moves running Pods. Processor requests, and `payments`' and `notifications`' memory, stay as the teams set them.
reader_does: Changes three memory requests with − / + steppers (0.5 GB steps; each row shows the service's use at the rush beside its request), flips the spare-node switch, or resets to Fennel's requests. No target: three "things to notice" prompts sit above the widget (s-04). k-04 is committed before, k-05 after.
shows: Header bar `W-02 · ARI'S SIZING SHEET`. **Readout strip** (always next to the controls): `NODES 05` (large mono, zero-padded) with the sub-label "what Fennel rents, and pays for in standard mode"; `SET BY · MEMORY | PROCESSOR | BOTH`; `RESERVED 38 OF 65 GB`; `USED AT THE RUSH 19.5 GB`. **Idle bar** under it with its three labelled segments. **Warnings** (`warn`), one line each, only when they apply. **Controls:** three rows `storefront · 3 copies · REQUEST [−] 4 GB [+] · used 2 GB` (likewise `orders · 1 copy`, `dispatch · 6 copies`), the switch `Keep room to lose a node`, and `Reset to Fennel's requests`. **Nodes:** node frames `NODE · 1 … n` (sandbox nodes are numbered, not Fennel's real 01–06), Pods as chips with use fills, `N GB FREE`, CPU footers; a spare node (switch on) is drawn last, dashed, labelled `SPARE`, empty. **Live text:** an `aria-live="polite"` sentence, updated at most once per change: "5 nodes, set by memory. 38 of 65 GB reserved; 19.5 GB used at the rush. Nothing over its reservation."
size: **Desktop (≥ 900px):** `.d-wide`; controls and readouts in a left column (about 40%), nodes on the right in up to two rows of four. Reserve the tallest state's height (two rows of nodes plus the warnings, about 560px; CURRICULUM §8 step 6) so nothing below moves.
  **600–899px:** the same, nodes in rows of four, about 620px reserved.
  **Under 600px:** one column: readout strip and idle bar, then warnings, then controls (steppers 44px tall, the switch a 44px row), then the nodes in rows of four (about 70px each at 360px; chip labels hidden below 80px node width, so each Pod shows only its fill and outline; the steppers carry the names). Readouts and controls sit together, so the main effect of every control is visible next to it; the node drawing below may scroll. Per §8 step 6, phones don't reserve the tallest state's height. Nothing overflows at 360px.
  **Motion:** chip and fill changes ≤ 200ms, instant under reduced motion. **Keyboard:** steppers and switch are native buttons / a checkbox; values announced through the live sentence.
acceptance: ac-08, ac-09, ac-10
reuse: **Decision: a new widget with its own model, drawing nodes with the pooled `renderCluster` (nodes-only option), so the reader sees the same nodes and chips as in lane F.** Keep the model (`model.js`: services, the exact packing, nodes needed, set-by, the idle split) separate from the drawing, so that later chapters can reuse it without the controls. Stays chapter-local until a second chapter needs it; then promote the model to the pool.
  - **Later chapters:** **Ch 8** (requests drive node count, now with a loop adding and removing nodes over a day's traffic: the same model per time step); **Ch 11** (per-team totals: one team's requests crowding another's, and a quota as a cap on a team's total); **Ch 14** (cost: per-node vs. per-Pod billing over the same requests; right-sizing as a platform-team practice).
  - **Reader-visible complexity added for reuse:** none.

## Comprehension items

### k-01
segment: s-01
objective: o-1
type: retrieve
prompt: At 03:04 in Chapter 4, a new `orders` Pod appeared in the cluster's record with no node yet, and soon it was running on node 04. Which loop gave it node 04, and what did that loop see?
options: A) The ReplicaSet loop: it saw that `orders` was one Pod short, so it moved the old Pod over to node 04. · B) Node 04's agent: it saw spare room on its own node, so it claimed the new `orders` Pod for itself. · C) The scheduler: it saw a Pod with no node, and wrote in node 04, a node with room for it. (correct: C; tempting: A, m-06 and the wrong loop; B, the agent "taking" work)
feedback: A: "The ReplicaSet loop wrote the new Pod's record, but it doesn't pick nodes, and it never moves Pods: the one on node 03 was replaced, not moved. Another loop gave the new Pod its node." B: "Node agents start only Pods that are already assigned to their node; they don't claim work. Another loop did the assigning." C: "Right. The scheduler wants every Pod on a node; it saw one with none, and wrote in a node with room for it. What 'room' means, and who decided how much each Pod needs, is where Morgan's bill comes from." After every option, one shared line: "The loop that gives each new Pod a node is the scheduler, and this chapter is about how it chooses."

### k-02
segment: s-02
objective: o-1
type: predict
prompt: On a quiet Tuesday morning, Ari's dashboard shows node 02 at 15% busy. The Pods already on it have reserved all but 1 GB of its memory. A new Pod requests 2 GB. Will the scheduler put it on node 02?
options: A) Yes: at 15% busy node 02 has lots of memory going unused, and the scheduler fills the quietest nodes first. · B) No: the scheduler counts what the Pods on node 02 have reserved, and that leaves less than 2 GB. · C) Only if every other node is busier: the scheduler compares how busy the nodes are right now and picks the quietest. (correct: B; tempting: A and C, local-01)
feedback: A: "That's how a person would place work, and it's the number dashboards show, but the scheduler never reads it. It adds up the requests already on node 02, and with only 1 GB unreserved, a 2 GB Pod doesn't fit there, however quiet the node is." B: "Right. The scheduler counts reservations, not live use. Node 02's Pods could all start using their full reservations at the lunchtime peak, and the scheduler keeps that room for them." C: "The scheduler doesn't compare how busy nodes are at all. It first rules out nodes whose reservations leave too little room, so node 02 is out before 'busy' could matter, and then picks among the rest by what's reserved."

### k-03
segment: s-03
objective: o-1
type: predict
prompt: (Option (b).) The third new `dispatch` Pod needs 2 GB of memory and one processor core. Between them, the three nodes still have 3 GB of memory and about 3 cores free. What happens to it? — (Options (a)/(c): "The other two new `dispatch` Pods need 2 GB and one core each. Between them, the three nodes still have 5 GB and over 4 cores free. What happens to them?", with the options in the plural.)
options: A) It waits, unplaced: no single node has both 2 GB and a whole core free, so it fits nowhere. · B) It starts: between them, the nodes have more than enough free memory and processor for it. · C) It fails, and the scheduler stops trying until the dispatch team applies the manifest again. (correct: A; tempting: B, m-26; C, local-03)
feedback: A: "Right. The scheduler checks each node for both numbers at once, and none passes, so the Pod waits and the scheduler records why. Scroll on." B: "Free room on different nodes doesn't add up. A Pod runs on one node, so its 2 GB and its core both have to be free on that node, and each node here has only 1 GB free." (Options (a)/(c): "…node 02 has 3 GB but less than half a core free, and nodes 01 and 04 have the processor but only 1 GB each.") C: "Nothing has failed, and nobody needs to apply anything again. The Pod waits, and the scheduler keeps trying, as the next steps show."

### k-04
segment: s-04
objective: o-2
type: predict
prompt: After Friday, the payments team doubles its memory request "to be safe". What `payments` actually uses doesn't change. What does change for Fennel?
options: A) Very little: the nodes are no busier than before, so the only cost is some room that goes unused. · B) Payments is better protected: with twice the memory set aside, it can no longer be killed for running out. · C) Each `payments` Pod blocks twice the room on its node, so nodes fill sooner: more nodes, or Pods left waiting. (correct: C; tempting: A, m-07; B, local-02)
feedback: A: "'Unused room' is the cost, but it isn't small. Room that `payments` reserves is room no other Pod can be placed in, even while `payments` isn't using it. On Friday, reservations like this filled three nodes and left a Pod waiting, and Fennel rented two more." B: "A bigger request doesn't change what `payments` uses, and it isn't what decides whether a container is killed for running out; that's the second number, in §07. What a bigger request does is block more room on its node." C: "Right. The scheduler counts the doubled request in full, so each `payments` Pod takes twice the room, and on a full cluster that's another node, or a Pod that waits. W-02, below, shows how far it goes."

### k-05
segment: s-04
objective: o-1
type: predict
prompt: A month on, nodes 05 and 06 are still nearly empty. With default settings, what does Kubernetes do about them?
options: A) Moves their Pods onto the fuller nodes and hands 05 and 06 back, since fewer nodes cost less. · B) Nothing: the scheduler places only new Pods, and Fennel pays for both nodes until someone removes them. · C) Spreads Pods from the fuller nodes onto them, so that every node ends up about equally busy. (correct: B; tempting: A, m-08; C, the scheduler as a balancer)
feedback: A: "Nothing in Fennel's cluster packs Pods or gives nodes back. The scheduler places Pods that have no node, and running Pods are never moved, so 05 and 06 stay as empty as Friday left them, and stay on the bill." B: "Right. The scheduler only places Pods that have no node, and running Pods are never moved. Removing the nodes is up to Ari's team; Chapter 8 introduces a loop that can do it." C: "The scheduler never moves running Pods, to even things out or for any other reason. It only places new ones, so the old nodes stay as full as they were and the new ones as empty."

### k-06
segment: s-06
objective: o-1
type: apply
prompt: Ari proposes a second node pool of spot machines: cheaper, but the provider can take one back at short notice. Which of Fennel's services should stay off it?
options: A) `orders`: it runs as one copy, so customers can't order while it's being replaced. · B) `notifications`: texts and emails would arrive late while its Pods were replaced. · C) Neither: Kubernetes replaces Pods when a machine goes, so either can run there. (correct: A; tempting: C, m-05 / "self-healing makes it free"; B, a real but tolerable cost)
feedback: A: "Right. When a spot machine is taken back, its Pods are replaced on another node, and `orders` has only one copy, so customers couldn't order until the new one was running. `notifications` can lag without disaster, so it suits the spot pool." B: "Late texts and emails are a real cost, but `notifications` is the service Fennel can let lag. `orders` is the one that can't: with one copy, customers can't order until its replacement is running." C: "Kubernetes does replace the Pods, but a replacement takes time to be placed and started, and `orders` runs as one copy, so every machine taken back would mean a gap with no orders. That's fine for `notifications`, not for `orders`."

### k-07
segment: s-07
objective: o-2
type: predict
prompt: At the next sale, `storefront` needs more processor than its limit allows, and `orders` needs more memory than its limit allows. What do customers notice?
options: A) Neither: the scheduler moves each one to a node with more room to spare. · B) Both are killed and restarted, so pages and orders both fail for a moment. · C) `storefront` slows down; `orders` is killed and restarted, failing orders for a moment. (correct: C; tempting: B, local-02; A, the scheduler moving running Pods)
feedback: A: "The scheduler never moves running Pods, and a limit isn't about the node's room: it's a cap on the container itself, enforced wherever it runs." B: "Only memory works that way. At its processor limit a container is slowed, not stopped, because processor time can be handed out in slices. So `storefront` gets slower, while `orders` is killed and restarted." C: "Right. Processor over the limit is slowed down; memory over the limit is killed by the operating system and restarted by the node agent. 'It got slow' and 'it restarted' point at different numbers."

### k-08
segment: s-08
objective: o-2
type: apply
prompt: To cut the bill, Morgan suggests halving every service's memory request. What would you expect at the next Friday rush?
options: A) Fewer nodes, but Pods that use more than they reserve get evicted when a node runs short. · B) Fewer nodes and no other change, since each Pod still gets the memory it uses. · C) No change at all, because the scheduler places Pods by the memory they actually use. (correct: A; tempting: B, the reverse of m-07, "requests are only paperwork"; C, local-01)
feedback: A: "Right. Halved requests fit onto fewer nodes, but at the rush several services would use more than they reserved. When a node runs short, its agent evicts the Pods furthest over their requests first, and on a full cluster their replacements wait. Cheaper, and less reliable. (W-02's warnings show which services.)" B: "Each Pod may use more than it reserved only while the node has room to spare. Pack nodes on halved requests and, at the rush, some run short; then the node agent evicts the Pods furthest over their requests." C: "The scheduler never looks at use; it places Pods by their requests. Halving them really would fit Fennel onto fewer nodes. The risk is what happens at the rush, when those Pods use more than they reserved."

### k-09
segment: s-09
objective: o-3
type: apply
prompt: Ari messages Jordan: "We need to bump memory limits on `orders`." What would you ask? Think of one or two questions, then show the answer.
model_answer: "Is that a leak or real growth? And what does it do to our node count?" Under it, two lines of why, then f-07: "If it's a leak, a higher limit only delays the next kill; and if the request goes up too, Fennel rents room for a bug. If it's real growth, a higher limit may be right, and the Kubernetes documentation's advice is to check for a leak first, then raise the limit, 'and possibly' the request." "Raising only the limit doesn't change where Pods go. Raising the request does: each copy reserves more room, and on nodes that are already full, that can mean another node on the bill (try `orders` at 8 and then 12 GB in W-02)." Then f-07, introduced as "the picture engineers look for".
feedback: Under the reveal, one line: "If your question was 'how much more memory?', that's the engineers' number to work out. The two questions above decide whether more memory is the right fix, and what it costs."

## Acceptance criteria

- ac-01 (s-01): §01 opens with the cast strip (Morgan, Jordan, Ari, with roles) and D1, collapsed; k-01 comes before the scene and before any new term. The scene gives, in the manager's words, Friday's waiting Pod (named `Pending`) and the two added nodes, Tuesday's three `orders` restarts (named `OOMKilled`) and the month's higher bill; Morgan's and Ari's lines appear as quotes, Ari's naming "two numbers our teams wrote down". No mechanism is explained in §01.
- ac-02 (s-02, f-01, f-02, k-02): requests are introduced through f-01 (`storefront`'s manifest, `memory: 4Gi`, `cpu: 500m`, annotated) and TERM 01 (the only payoff variant), and connected to Ch 4's units ("one unit was 2 GB"). f-02 shows one node's memory and processor separately and a Pod that fails on processor alone. The filter-then-score rule is stated before k-02; "reservations, not use" with the documentation's daily-peak reason comes after it. The moving-day paragraph matches the option the user chose at Q1. The budget aside maps node, request, scheduler explicitly and has a WHERE THIS ANALOGY BREAKS line (reserved room is never lent out). The scheduler's lens is filled in as one implementation of Ch 4's pattern, in the four-question wording.
- ac-03 (s-02, c-08): placement rules appear in exactly one plain-words sentence; the words affinity, taint and toleration don't appear.
- ac-04 (w-friday-scrolly, scene and grounding): a set-up paragraph before the lane says the cluster has three nodes since 03:04, who changes what at 17:45 and why, and how to read the canvas in GB and cores. The canvas draws memory in GB (13 GB per node) and a computed processor footer on every node.
- ac-05 (w-friday-scrolly, steps and gate): F1 is the ReplicaSet loop writing three records; F2 shows the scheduler's per-node verdicts on the node bars and places the Pods that fit; F2 ends on k-03, which locks F3–F5. F3 shows the Pod(s) in a `WAITING · NO ROOM` strip, the row word `… WAITING`, and the recorded reason as a `SCHEDULER` note in the documented format. F4 says nothing failed, nobody resubmits, and no loop in Fennel's cluster adds room. F5 adds nodes 05 and 06 (by Ari's team, by hand), places the waiting Pod(s), says Fennel now pays for five nodes and that running Pods aren't moved. The numbers match the option chosen at Q1 (the plan's two tables).
- ac-06 (w-friday-scrolly, layout and access): Ch 4's lane behaviour (sticky canvas, steps at 55%, scrolling back restores exact snapshots, inline snapshots where the canvas exceeds 50vh or the viewport is under 560px tall); five-node width reserved from F1 on desktop; at 360px no horizontal scroll, text ≥ 13px, check buttons ≥ 44px; the canvas `aria-label` follows the step; transitions ≤ 300ms, instant under reduced motion; a caption says the reason's wording varies between versions.
- ac-07 (w-friday-scrolly, reuse): the lane is drawn by the pooled `renderCluster` and lane controller (`pool/…`), not a copy of Ch 4's files; Ch 4's pages render unchanged after promotion; all of this lane's snapshots and strings live in its `data.js`, whose header documents the added fields.
- ac-08 (w-sizing-sandbox, model): with defaults the readout shows 5 nodes, set by memory, 38 of 65 GB reserved, 19.5 GB used; switch off → 4; `storefront` 2.5 and `dispatch` 1.5 → 3 (set by both), 4 with the switch on; `storefront` 2, `dispatch` 1 → 3, set by processor; `orders` 13.5 GB or more → `NODES · —` with `orders` named as never placeable. Raising any request never lowers the node count. A request below a service's use shows its warning line.
- ac-09 (w-sizing-sandbox, display): each Pod's request (chip) and use (fill) are visibly different, with the overflow form when use exceeds the request; the idle bar's three segments are labelled on the bar; readouts and controls are adjacent at every width; the caption states both simplifications (packed tightly vs. the default's spreading; placed afresh vs. running Pods never moving). No money amounts anywhere.
- ac-10 (w-sizing-sandbox, layout and access): three steppers, one switch and a reset, nothing else; steppers and switch ≥ 44px; keyboard operable with native controls; a polite live sentence states nodes, what sets them, reserved, used and warnings; desktop reserves its tallest state; nothing overflows at 360px.
- ac-11 (s-04, m-07, m-08, k-04, k-05): k-04 is committed before W-02; k-05 after it. The prose names bin packing after the sandbox, says the default scheduler spreads rather than packs and never moves running Pods, splits idle room into "not reserved" and "reserved, not used", and gives the per-Pod wording "in most setups you pay for the machines; a few per-Pod options bill for what each Pod requests", naming no provider. Morgan's answer lists the two extra nodes, the spare room and the room kept back per node, with the control-plane fee named only. Survey figures appear only in D5, each with who, when and how.
- ac-12 (s-05): headroom is presented as a decision with a cost (the spare-node switch), connected to Ch 4's three nodes and to lane F, and ends on the quoted question "If we lose a node during the dinner rush, where do its Pods go?"; no check.
- ac-13 (s-06, f-03, k-06): a node pool is defined as a group of identical nodes, with the large-memory and spot cases; f-03 labels each pool's machine type on the drawing; k-06's key is `orders`.
- ac-14 (s-07, f-04, f-05, k-07): limits appear as the second block of the same kind of manifest (f-04); f-05 draws reserved (dashed `c4`), cap (solid ink) and used (`c1`) as three differently drawn, end-labelled lines, with three marked kills. The prose names the operating system as what kills and the node agent as what restarts, in place, and links repeated kills to Ch 4's crash loop. Processor over its limit is "slowed", never killed. TERM 03 and TERM 04 render right after first use. The spending-cap aside has a WHERE THIS ANALOGY BREAKS line covering the two caps and "first cut when money runs short".
- ac-15 (s-08, f-06, k-08): the node agent's memory-watching is stated before it evicts anything; eviction is contrasted with the in-place kill and linked to replacement and pending. f-06 is built from `CH05_LOOPS` (Ch 4's format), marks changed cells `NEW IN CH 5`, keeps the Ch 7 dashed row and adds a dashed Ch 8 row ("a loop that adds nodes"), and footnotes that the kill is the operating system's.
- ac-16 (s-09, k-09, f-07): Ari's line is quoted above k-09; the model answer is the curriculum's two questions verbatim; the why-lines quote c-23 ("and possibly" the request) and point to W-02; f-07 shows the two patterns side by side, labelled "a common sign of …", with a caption saying it's a rule of thumb, not a test. The recap is five lines; the bridge points to the next chapter without naming a later term.
- ac-17 (all checks): commit-then-reveal, with feedback explaining every option. Options are similar in length and equally measured; the right one is never the longest, and no option repeats a nearby caption. Keys vary: A (k-03, k-06, k-08), B (k-02, k-05), C (k-01, k-04, k-07). Every prompt states its own question. No scores.
- ac-18 (precise language and accuracy, page-wide): no guarded term appears (## Shape, vocabulary guard). Every default carries "by default" or "with default settings". The scheduler is never said to look at use, move Pods, or add nodes; nodes are added by Ari's team. No provider is named in the main text; no price appears. Kubernetes kinds are capitalised. Story numbers match R2 everywhere they appear (13 GB, 3.9 cores; the requests; 38 of 65 GB; 19.5 GB).
- ac-19 (disclosures): D1, D2 and D4–D7 exist where listed (D3 only under option (c)), are collapsed by default, and the main text reads correctly with all of them closed.

## Curriculum recommendations

Recommendations only; CURRICULUM.md is unchanged. Apply after the chapter ships (CURRICULUM §8 step 8), except Q1(b) and Q2, which the user decides at the checkpoint.

- **Checkpoint questions for the user:**
  - **Q1, moving day** (Research concerns §1): (b) recommended: edit Ch 4 to the default layout before Ch 5's build; or (a) admit it in Ch 5's main text; or (c) a disclosure in Ch 5 only.
  - **Q2, split** (## Shape): recommended: split into Ch 5 (≈ 18.5 min) and a new Ch 5b (≈ 11.5–13.5 min); or keep one chapter (≈ 26 min planned) and cut from `## If it runs long` if it builds long.
  - **Q3, story facts** (R2): approve the numbers below, which every figure and both widgets use.
- **R1 (§5 Visuals column, Ch 5 row, after build):** record ## Visual grammar: GB replace room units (chip height = memory request; one Ch 4 unit = 2 GB; node = 13 GB for Pods; `N GB FREE`); processor as a computed `CPU n / 3.9` node footer; reserved = the chip, used = solid `c1` fill (overflow hatched, `warn`), cap = solid ink line (charts and manifests only); on charts reserved = dashed `c4`; `WAITING · NO ROOM` strip with dashed chips and the `n WAITING` row word; scheduler verdicts on node bars (`FITS` / `NO MEMORY` / `NO PROCESSOR`); the `SCHEDULER` reason note; `NEW` tag on added nodes; the idle bar's three segments; node pool frames; f-06 as `CH05_LOOPS` with `NEW IN CH 5` tags. Renderer: the pooled `renderCluster` with its Ch 5 additions; the sandbox model in Ch 5's `site/widgets/w-sizing-sandbox/model.js`.
- **R2 (§3 Fennel, new Ch 5 story facts):**
  - **Units.** Fennel's nodes are rented machines with 16 GB of memory and 4 processor cores; Pods can reserve about 13 GB and 3.9 cores of each (the rest is kept back for the system). Ch 3–4's "room unit" was 2 GB of memory request.
  - **Requests, as set at the move** (per copy; memory · processor): `storefront` 4 GB · 0.5; `orders` 6 GB · 1 (limits 7 GB · 1); `payments` 2 GB · 0.25; `dispatch` 2 GB · 1; `notifications` 2 GB · 0.25, **2 copies** (its first size). Most teams padded memory "to be safe".
  - **Use at the Friday rush** (memory · processor): `storefront` 2 GB · 0.3; `orders` 5.5 GB · 0.5 (and climbing); `payments` 0.5 · 0.1; `dispatch` 1 · 0.6; `notifications` 0.5 · 0.1. In all, 19.5 GB.
  - **Friday, 17:45** (a Friday after 03:04; cluster on nodes 01, 02, 04): the dispatch team raises `dispatch` from 3 to 6 copies for the rush. Under Q1(b): two new Pods are placed (01, 02) and one waits, `Pending`, with "0/3 nodes are available: 1 Insufficient cpu, 3 Insufficient memory."; under (a)/(c): one placed (04) and two wait, "…: 1 Insufficient cpu, 2 Insufficient memory." At about 18:40 Ari's team adds **nodes 05 and 06** by hand; the waiting Pod(s) are placed on 05 (and 06). `dispatch` stays at 6 copies all week afterwards (Ch 8's over-provisioning). The cluster has **five nodes** from then on; reserved 38 of 65 GB; under a third busy even at the rush.
  - **Tuesday:** `orders-q2rw` is OOM-killed three times (about 12:40, 18:50, 20:10) at its 7 GB limit; restart count 3; `OOMKilled`, exit code 137; a short gap for customers each time. Ari: "We need to bump memory limits on `orders`." Whether it was a leak or growth is left open (R9).
  - **The bill:** the first full month's bill since the move is higher than the last one before it: five nodes against four machines. Morgan: "We moved onto Kubernetes so our machines would be used better. Now we pay for five of them instead of four … What are we paying for?" Ari: "All three come back to two numbers our teams wrote down for every service when we moved."
  - **Ch 3 / Ch 4 consistency fact (needed for "four before the move"):** by the move, Fennel had given back Year 2's four spare machines and ran on four (Ch 3 says the spares were still paid for in Year 2; nothing says when they went).
  - Under Q1(b) only, Ch 4's moving-day and 03:04 facts change: `storefront` on 01, 04 and 02; at 03:04 `orders` → 04 (one of two nodes with room) and the lost `dispatch` copy → 01.
- **R3 (§2.3 loop lens table):** Ch 5's rows as in f-06: the scheduler's row filled in (wants: every Pod on a node with room for its requests; sees: Pods with no node and each node's unreserved memory and processor, never use; does: rules out, picks the emptiest, spreads; if none fits, leaves it pending, records why, retries on change); the node agent's row extended (sees its node's free memory; restarts OOM-killed containers; evicts the Pods furthest over their requests when the node runs short); the ReplicaSet loop replaces evicted Pods; a dashed "a loop that adds nodes, Chapter 8" row. The OOM kill itself is not a loop (the operating system's).
- **R4 (§6 catalog):** add three entries, owner Ch 5 (Ch 5b under the split for m-30):
  - **m-29** (local-01) "The scheduler puts new work where the machines are least busy, so a node that looks idle on the dashboard has room." It counts reservations, never live use. Ch 8 and Ch 11 revisit.
  - **m-30** (local-02) "Going over any limit kills the container, and a limit is the room a Pod is given." Over a processor limit it's slowed; over a memory limit it's killed; room is reserved by the request, not the limit. Ch 12 revisits.
  - **m-31** (local-03) "A pending Pod has failed and needs restarting; or, the reverse, pending is harmless because Kubernetes will sort it out." The scheduler keeps trying, but nothing makes room unless a node is added or room freed. Ch 8 revisits (the loop that adds nodes).
- **R5 (Ch 6 entry):** a rollout needs spare room while old and new Pods run side by side (Ch 3's lane C needed one copy's worth; Ch 5's headroom); with the cluster on five nodes and requests now visible, Ch 6 can show a rollout waiting for room. Copy `CH05_LOOPS` forward for the Deployment row.
- **R6 (Ch 8 entry):** after Friday, `dispatch` runs 6 copies all week for two hours of peak (Ch 8's Fennel moment, "over-provision all week"); nodes 05 and 06 stay on the bill until someone removes them (k-05) and pending Pods waited for a person to add nodes (lane F): the cluster autoscaler answers both; fill in f-06's dashed row; retrieve m-31 next to m-28 and m-11; W-02's model per time step; per-Pod modes that pack for you (Ch 5 research parking lot).
- **R7 (Ch 11 entry):** requests are claims on shared room, so one team's padding or spike can leave another team's Pods pending (Ch 11's Fennel moment is a Friday `dispatch` starved by a batch job); quotas cap a team's total requests; namespace defaults for requests and limits; Pod priority and preemption (Ch 5 parking lot). W-02's model can count per-team totals.
- **R8 (Ch 12 entry):** `orders`' three OOM-kills on a Tuesday (restart count, `OOMKilled`, exit 137; repeated kills end in crash-loop back-off); evictions as events; QoS classes and the eviction order in engineers' terms; memory limits enforced "reactively" (Ch 5 parking lot); the open question of Ch 5's conversation (was it a leak?) is a natural postmortem.
- **R9 (Ch 14 entry):** the control-plane fee (named only in Ch 5); per-Pod pricing specifics (rounding up, waiting Pods unbilled, crash-looping ones billed); the Datadog and CNCF figures and the earlier 2021 survey; spot pricing; right-sizing and cost ownership ("a lack of awareness of responsibility", CNCF's second cause) as platform-team questions; m-08 revisited.
- **R10 (Ch 10 entry, small):** memory-backed temporary storage counts toward a container's memory limit, so writing temporary files can cause an OOM-kill (Ch 5 parking lot).
- **R11 (§8 step 5, the pool):** promote Ch 4's `renderCluster` and lane controller to `explainers/_pool/` before Ch 5's build, with the eight additions in w-friday-scrolly's `reuse:`, re-gating Ch 4; and, separately, consider promoting the course's page components (cast strip, checks, term card, asides, loop lens table builder) that Ch 1–4 each reimplement.
- **R12 (the split, if chosen at Q2):** add a "Ch 5b: Using too much: limits, memory kills and eviction" entry (§7) with o-2's reliability half and o-3's OOM-killed and eviction, the curriculum's conversation ("bump memory limits on `orders`"), local-02 / m-30, node pools; move limits, eviction, OOM-killed and node pool to a "5b" ledger row; give Ch 5 the conversation "Let's cut back to three nodes" ("What do our services actually use at their busiest, compared with what they reserve? If we lose a node at the dinner rush, where do its Pods go?"); update §4's table and dependency graph (5 → 5b → 8; 5b is a prerequisite of 12).
- **Cut here, for later chapters:** the restaurant-bookings analogy (x-04); an eviction lane and a Tuesday lane (Part 2 under the split); load-aware placement (unresearched).
