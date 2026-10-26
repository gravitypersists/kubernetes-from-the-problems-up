# Learning plan: Who runs where: scheduling, resources and cost (Ch 5, Desired state: Kubernetes from the problems up)

<!-- Written by the instructional designer. Parsed by scripts/check_plan.py. Revision 1 (handoff 11: the user's site review, human-site-1, 42 comments; d-10 to d-12). Revision 0 was handoff 02. -->

## Revision 1: what changed and why

The chapter was built and shipped once; the user then reviewed the built page (§01–§07) and left 42 comments (`run/review/human-site-1/comments.md`, findings H-01 to H-42). This revision changes the plan only where those comments change what the chapter teaches or how a part is organised. Pure rewording comments (#1, #3–#5, #7, #8, #12, #14, #15, #18, #19, #21, #22, #27, #29, #42) are the builder's and aren't planned here, except where a segment below now says what its wording must do.
- **Node pools are gone** (d-12, #37): s-06, f-03 and k-06 are cut and moved to Ch 8; o-1 no longer includes "what node pools add". The user's reason: "we haven't learned anything at all yet about how k8s provisions nodes … so why are we learning about node pools?" The sandbox's "`orders` past 13 GB" case keeps its answer in words: such a Pod waits forever, and it needs a bigger node (s-04).
- **The loop lens wording** (d-11, #6, #10): every use is now CURRICULUM §2.3's "which loop is it, what does it want (the desired state), what does it see (the real state), and what does it do when the two differ?" The user: "can we make it clearer that this is comparing desired state against realized state?" and "'a gap' is too vague".
- **Who adds nodes** (#20): s-04 now says that Ari's team rents and adds nodes by hand, and that the requests decide how many nodes Fennel *needs*.
- **Room on purpose** (#35, #36): s-05 is rebuilt around losing a node, in the user's words: "we need extra nodes in case one node goes down. The scheduler, when shifting the pods to other nodes, can run out of room on those nodes. The spare nodes are insurance for this reason."
- **Using more than it reserves** (#41, #38, #39, #40): s-02 says in one sentence that a Pod can use more than it reserves, so s-07 builds on it; limits get a plain introduction.
- **Repetition** (#17, #31, #32, #33, #34): **Who owns which explanation** (in ## Shape, after the prose rules) gives each repeated explanation one owner; s-03's and s-04's repeats are cut.
- **Split attention** (#2, #9, #11, #13, #16, #35, #40): a new prose rule on how to refer back and forward.
- **The sandbox** (#23–#30): reorganised (controls left, outcome right), `payments` added, the stats block removed, reserved vs. used drawn without a confusing label, a new introduction that stays true.
- **Two plan errors the build already corrected, now recorded here:** the recorded reason on Friday reads `0/3 nodes are available: 2 Insufficient cpu, 3 Insufficient memory.` (node 01 is short of both; Revision 0 said "1 Insufficient cpu"), and k-09's sandbox suggestion uses `orders` at 5 and then 5.5 GB (Revision 0's "8 and then 12" started from right-sized requests the reader may not have set).
- **Section numbers shift.** Segment IDs stay (s-01 to s-05, s-07 to s-09; there is no s-06), but on the page Tuesday becomes §06, eviction §07 and the conversation §08. Where this plan writes "§07" or "§08" it means s-07 or s-08; the builder updates every on-page cross-reference (for example the sandbox warning's "(§08)" becomes "(§07)", k-04's "in §07" becomes "in §06"), the ToC and the check numbering (eight checks: "Check 0n / 08").
- **The "[Part 1]" / "[Part 2]" tags** in segment intents are left from Revision 0's split proposal, which the user declined (d-05); ignore them.
- **Checkpoint questions are settled:** Q1 = (b), Ch 4 was edited (d-04); Q2 = one chapter, no cuts at build (d-05). The "(Options (a)/(c) …)" alternates left in lane F's spec below are moot; build only the (b) text.

## Shape

A narrative article that follows Fennel through one week of Year 3 (a Friday dinner rush, a Tuesday of restarts, Morgan's month-end bill) and traces all three symptoms back to the two numbers each team wrote down for its services at the move: what a Pod **reserves** (requests) and what it may **use** (limits). It is built around **one scrollytelling lane** and **one hands-on sandbox**, with static figures around them.
- **Lane F, "Friday, 17:45"** (blueprint B1, on the pooled `renderCluster`): the dispatch team doubles `dispatch` for the rush on a three-node cluster; the scheduler places two new Pods, rules out every node for the third, and leaves it waiting until Ari's team adds two nodes. This is the scheduler's loop shown failing, step by step, and it delivers Ch 4's promise ("how it chooses is Chapter 5") and Ch 4's D4 ("that room is the subject of Chapter 5").
- **Sandbox W-02, "How many nodes?"** (blueprint B2): the reader changes four services' memory requests and a "keep room to lose a node" switch, and watches how many nodes those requests need and how much of the rented room is used, reserved but not used, or reserved by nobody.

**Why this form.** The chapter has two kinds of content. The first is a *process*: a Pod that no node can take, the scheduler retrying, a node arriving. The course's form for a process is a scrollytelling lane (CURRICULUM §8 step 7), and this one reuses Ch 4's canvas, so the reader meets the same nodes, record and loops. The second is a *system with dynamics*: how requests, packed onto nodes, turn into a node count and a bill. The relationship is non-linear (the count moves in steps; below a point, cutting memory requests saves nothing because processor takes over; doubling one request may cost nothing or a whole node; one oversized Pod can't fit at all), and it is what a manager needs to reason about when someone proposes "pad everything" or "halve everything". The course's form for system dynamics is a goal-free explorer (B2).

**The sandbox call, against the user's bar ("no busywork").** Ch 3's placement widget was rejected because every tap had one right answer. W-02 has no target and no right answer; its discoveries (the step-shaped count, the processor floor, doubling `payments` costing nothing until it costs a node, the Pod no node can take) can't be read off a static figure. The user's review reorganised it rather than cutting it (#23–#30), so it stays.

**Rejected alternatives.**
- *Sandbox only, no lane* (pending shown as a sandbox state). Rejected: pending is a process with a time dimension (the scheduler keeps retrying; nothing makes room by itself; a node arrives), and its key artefact is the scheduler's recorded reason, which needs the lane's step-by-step filter.
- *Two lanes* (a second one for the `orders` memory kill or an eviction). Rejected for time: Tuesday is shown as a memory-over-time chart (f-05), and eviction as prose plus a check.
- *A restaurant-bookings analogy* (research x-04) alongside the budget one. One analogy, the curriculum's, used in two halves (reserved budget in §02, spending cap in §07), each with its own breaks line.
- *Keeping node pools, with a better introduction* (#37's second option). Rejected by the user at d-12: a reader who has only seen Ari's team add nodes by hand has no use yet for groups of machines the cluster can grow; Ch 8 has that use.

**Honest sizing** (CURRICULUM §2.10). The page as reviewed read at about 26 minutes against a planned 25.75. Revision 1 removes one section and its check, and shortens five sections; it adds one sentence (s-02) and one stepper (W-02). Disclosures are optional and not counted (about 0.25 min each if opened).

| Part | Minutes (Rev 0 → Rev 1) |
|---|---|
| hero + s-01 (cast strip, D1, k-01, the week, Morgan's question, Ari's line) | 2.5 → 2.5 |
| s-02 (requests on f-01 and TERM 01, said more simply; two counts, f-02; filter then score; storefront's three Pods; k-02; reservations, not use, **plus one sentence: a Pod can use more than it reserves**; the budget aside; the lens) | 4.0 → 4.0 |
| s-03 (set-up, lane F ≈ 1.75 with k-03, TERM 02, the recorded reason, **stranded room in two sentences, not a paragraph**, the two wrong readings) | 4.0 → 3.75 |
| s-04 (who rents nodes; k-04; W-02 ≈ 2.5 with four steppers; k-05; bin packing; **one sentence on unused room + D5; per-Pod billing in two sentences; Morgan's answer cut to its point**) | 5.0 → 4.5 |
| s-05 (**rebuilt: losing a node; three short sentences and the question**) | 1.0 → 0.5 |
| s-06 node pools | 1.75 → **cut** (Ch 8) |
| s-07 (Tuesday; **limits introduced plainly, building on s-02**; f-04, f-05, TERM 03, TERM 04, slowed vs. killed, k-07, the spending-cap aside) | 3.0 → 2.75 |
| s-08 (eviction, k-08, f-06 loop lens table) | 2.0 → 2.0 |
| s-09 (the conversation k-09 with f-07, recap, bridge) | 2.5 → 2.5 |
| **total** | **25.75 → about 22.5** |

Of that, checks are about 4 minutes (seven choice checks at about 0.5, one think-then-reveal at 0.75), the lane about 1.75 and the sandbox about 2.5. Earlier chapters read 1–3 minutes over plan, so expect the rebuilt page to read at **about 23–24 minutes**, against d-05's relabelled 26. Further cuts, if the user wants them, are in `cut-list.md` `## If it runs long`.

toc: yes — eight h2 sections and a 23-minute read; a rail on desktop and a collapsed "Contents" on mobile, as in Ch 1–4.
tokens: user-provided: Control Plane style guide, `design/control-plane/`. Use the course tokens from the shared pool (`pool/tokens.css`) and the pool's kit files as `pool/<file>` (CURRICULUM §8 steps 4–5); follow README.md, the tokens.json notes and `components/bundle.css`. Chapter-only CSS and JS go in `site/assets/`. The page builder may read Ch 4's `site/assets/page.css` / `page.js` as the reference implementation of the course's page components (cast strip `.cp-cast`, disclosure `.cp-more`, checks `.cp-check`, term card `.cp-term` with the payoff variant, `.cp-aside` with `.cp-breaks`, `.cp-quote`, `.cp-recap`, the check script and its `didactician:check-commit` event, the loop lens table builder) and reimplement them in this chapter's `site/assets/`; it never edits Ch 4's files. Promoting those page components to the pool is a recommendation (R12), not a build step.
mobile: supported. The lane follows §8 step 7 (canvas sticky at the top under 900px, ≤ 50vh; inline snapshots per step where it wouldn't fit or the viewport is under 560px tall). The sandbox puts its controls first on phones, then the count, the room bar and the nodes (Revision 1, #24, #30). f-02, f-05, f-06 and f-07 re-layout under 600px, they don't scale.

**Course voice** (style guide): second person, present tense, sentence-case headings, no exclamation marks, no emoji. Status always travels as a word plus colour. Kubernetes kinds are capitalised (Pod, ReplicaSet); "node" stays lowercase (CURRICULUM §2.12). The loops are named in plain words: *the scheduler*, *the ReplicaSet loop*, *the node agent*, *the node loop*.

**Prose rules (binding on the builder; from the user's Ch 4 human reviews, in the brief's Lessons):**
- Flowing sentences of varied length, with the cause and effect spelled out: what was the case, what was wanted, what acted, what changed. No chains of fragments. Clear active verbs ("still applies", "doesn't change", "rules out"), never archaic or ambiguous ones.
- **Don't compress prose to hit the time budget.** The minutes above are an honest estimate, not a word limit.
- **Set up every scene before its lane or figure.** §03 opens with a paragraph that says where the cluster stands (three nodes since node 03 died), who is about to do what (the dispatch team, for the rush), and how to read the canvas now that it counts memory in GB and processor in cores.
- **Ground every component before it acts.** Requests are introduced, with a manifest, before the scheduler is said to count them; the two counts (memory, processor) are introduced on one node (f-02) before the lane checks three nodes; the node agent's memory watching is introduced before it evicts anything; the operating system is named as the one that kills a container before the node agent is said to restart it.
- **No unexplained analogies.** The budget analogy maps each part explicitly (node → a department's budget; request → a project's reserved budget; scheduler → finance, approving projects only where reservations fit; limit → a spending cap on the project's card) and carries a WHERE THIS ANALOGY BREAKS line in the same aside.
- **Name who does what.** The dispatch team edits the manifest; the ReplicaSet loop writes Pod records; the scheduler picks nodes; Ari's team adds nodes (by hand: nothing in Fennel's cluster adds them automatically; "Chapter 8 introduces a loop that can"); the operating system on the node kills a container that goes over its memory limit; the node agent restarts it, and evicts Pods when its node runs short.
- **Keep the pattern distinct from the implementation.** The reconcile loop is the general pattern (Ch 4); the scheduler is one implementation of it, and this chapter fills in the scheduler's lens in detail.
- Figures don't "write" or "say" things; captions state the takeaway or condition. Refer to figures by number. No sentence sends the reader into a figure to find a label. (Revision 1: in sentences, point to the next widget or figure by position, not by ID; see the reference rule below.)
- Every default carries "by default" or "with default settings" in the same sentence. Providers stay generic in the main text.
- Pedantic caveats go in disclosures; the main text stays true without them.
- **Refer back by what happened, forward by position (new, from #2, #9, #11, #13, #16, #35, #40).** Don't make the reader recall a label they don't need. Refer to an earlier event by what happened ("when node 03 died", "when Ari applied `storefront`'s manifest to the new cluster", "the `dispatch` Pod that waited at the dinner rush"), never by a bare time ("since 03:04"), a nickname ("moving day") or a day as an agent ("Friday showed"). Refer to the next widget or figure as "the following widget" or "the figure below", not by its ID ("W-01", "W-02"); widget and figure IDs stay in their header bars and captions, not in sentences. Cut back-references that don't help the point ("Chapter 3 kept its drawings clear of this case", "The second number in Fig. 04", "as it did on moving day"). A day of the week may still set a scene ("On Friday evening, …"); it just doesn't do or show anything.
- **Say it once (new, from #17, #31, #33, #34).** When a widget or figure has just shown something, the prose after it names it or adds what the widget can't show; it doesn't explain it again. Each explanation below has one owner; other segments may point to it in a clause, not re-explain it.

**Who owns which explanation** (binding; from #17, #31, #34):

| Explanation | Owner | Elsewhere, at most |
|---|---|---|
| Stranded room: free room split across nodes can't hold one Pod (m-26) | s-03: lane F's F3 step and k-03's feedback | s-03 after the lane: one sentence that it is common on real clusters and that Fennel pays for those pieces. s-04: the word "stranded" inside the one sentence about unused room. |
| Reserved but unused: the scheduler holds a reservation whether or not it's used | s-02 (reservations, not use; the budget aside) | s-04: the sandbox draws it; one sentence names it with the other kind of unused room and leads into D5 |
| A Pod can use more than it reserves | s-02, one sentence (new, #41) | s-07 builds on it in a clause; s-08 relies on it |
| Room kept back for the system (about 13 of 16 GB) | s-02 and D2 | nowhere else in the main text (cut from s-04's Morgan's answer, #34) |
| The control-plane fee | Ch 14 | cut from this chapter (#34) |
| Spare room as insurance against losing a node | s-05 | the sandbox's switch; k-08's feedback |
| Ari's team adds nodes by hand; a loop that can is Chapter 8 | s-04's lead (#20) | s-03's two wrong readings and k-05's feedback, in a clause |


**Vocabulary guard** (brief out_of_scope; ledger §5). This chapter introduces: scheduler, in depth (s-02); requests (s-02); pending (s-03); bin packing (s-04); limits, OOM-killed (s-07); eviction (s-08). Allowed with a gloss: "provider" (s-04: the cloud company Fennel rents its machines from), "throttled" once as engineers' word for "slowed" (s-07), the status strings `Pending`, `OOMKilled` and "exit code 137" (once, as what engineers will see), the scheduler's reason strings (`Insufficient memory`, `Insufficient cpu`), `500m` and `Gi` inside the manifest snippets only (annotated). "A loop that adds nodes" with "Chapter 8 names it" (the dashed row in f-06 and two sentences). **Never in the body:** node pool, node group, spot machines (moved to Ch 8, d-12), "about a gap" (d-11), autoscaler / autoscaling (beyond "Chapter 8"), HPA, VPA, affinity, anti-affinity, taint, toleration (c-08's one sentence uses plain words), QoS / Guaranteed / Burstable / BestEffort, priority, preemption, LimitRange, ResourceQuota, namespace, quota, allocatable (say "room for Pods"; D2 may name it once), the plugin names (`LeastAllocated`, `MostAllocated`), cgroup, descheduler, Deployment, Service (capitalised), kubelet (Ch 4 named it; use "node agent").

**Fiction vs. sourced.** Fennel's nodes (16 GB, 4 cores; about 13 GB and 3.9 cores for Pods), every service's requests, limits and measured use, the Friday at 17:45, nodes 05 and 06, the Tuesday restarts, the month's bill and Morgan's and Ari's lines are Fennel fiction (story facts, R2). The scheduler's reason string in lane F follows the documented format and is labelled illustrative (x-06). The leak-vs-growth patterns (f-07) are an engineers' rule of thumb, not a sourced fact (x-05). Sourced mechanisms: filter then score (c-01); per node, per resource fit (c-02); reservations, not use (c-03); a request is not a cap (c-04); room kept back for the system (c-05); emptiest node and spreading by default, packing is a setting (c-06, c-07); placement rules exist (c-08); paying for nodes in standard mode (c-09); per-Pod billing by requests, and not every fully managed mode is per-Pod (c-10, c-11, c-12); the survey figures (c-13, c-14, c-15, single-source, framed as such); processor slowed, memory killed (c-16, c-17); no limit (c-18); eviction order (c-19); pending, its recorded reason and retries (c-20, c-21); how an OOM-kill shows (c-22); the docs' advice after one (c-23). From earlier chapters by reference: the scheduler as a loop that finds Pods with no node (Ch 4 c-13); a Pod is never moved, it is replaced (Ch 4); crash-loop back-off (Ch 4 c-14; repeated memory kills end there); the ReplicaSet loop replaces Pods removed for any reason (Ch 4 c-12); free room split across machines (Ch 3 c-03, x-01).

## Research concerns, resolved

How each concern in the researcher's report is handled:

1. **Ch 4's moving-day layout conflicts with default scheduling** (c-06, c-07, x-07). **Resolved at the checkpoint: option (b)** (d-04). Ch 4 was edited so that `storefront`'s three Pods went to 01, 04 and 02, and at 03:04 `orders` went to 04 (one of two nodes with room) and the lost `dispatch` copy to 01. Ch 5 uses it as the worked example of scoring. Options (a) and (c), and every "(Options (a)/(c) …)" alternate below, are moot.
2. **Only some fully managed modes bill per Pod** (c-10, c-11, c-12). s-04 uses c-12's generic wording in the main text: "In most setups you pay for the machines; a few per-Pod options bill for what each Pod requests." No provider is named in the main text. D6 holds the detail (requests, not use; rounding up; waiting Pods unbilled on one provider). It doesn't contradict Ch 4, whose built text says Fennel pays "for the computing its Pods run on, which in most modes means paying for the machines themselves".
3. **The leak-vs-growth heuristic is model reasoning** (x-05). Presented in k-09's reveal and f-07 as "a rule of thumb engineers use", with "typically" and "a common sign"; f-07's caption says it is not a test. Only the docs' advice is stated as fact, and it is quoted: check for a leak first; if the app behaves as expected, raise the limit "and possibly" the request (c-23).
4. **Both survey figures are single-source** (c-13, c-14, c-15). Kept out of the main text; D5 "How common is this?" gives each with who measured, when and how: one vendor's dataset of its own AWS customers (all containers on EC2, not only Kubernetes) and one community survey of about 100 self-selected respondents. The main text's argument stands on Fennel's numbers and the mechanisms.
5. **The pending message is an adapted illustration** (x-06). Lane F's note line and s-03's reading of it are labelled "in the format engineers see; the exact wording varies between Kubernetes versions" (the caption under the lane, not a disclosure).
6. **Room units fold memory and processor into one number; `notifications` has no size** (x-08). This chapter retires room units: lane F and W-02 draw memory in GB (Ch 4's chips keep their heights: one unit was 2 GB of memory request, said once in s-02) and print processor as a second count per node; f-02 draws both counts on one node. Where the drawings still simplify (processor printed rather than drawn; W-02 lets the reader change only memory requests, for four services: Revision 1 adds `payments`), the caption says so. `notifications` gets a size (2 copies; 2 GB and a quarter core each: one Ch 4 unit), recorded as a story fact (R2).

## Objectives

- o-1: explain that the scheduler places each Pod by the room it *reserves* (its requests, counted separately for memory and processor), not by what it uses, and therefore that requests, packed onto nodes, decide how many machines Fennel pays for in standard mode (and what it pays for in per-Pod-billed modes); including why free room split across nodes can't hold one Pod (m-26), and that a Pod bigger than any node is never placed. (Revision 1: "what node pools add" moved to Ch 8, d-12.) — checks: k-01, k-02, k-03, k-04, k-05
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
  - **Second-hardest: the sandbox (s-04).** Inputs: four requests and a switch. Outputs: the node count, the room bar, warnings. Managed by: opening on Fennel's real state (4 nodes + 1 spare) with the count in words and the room bar labelled; three short "things to notice" prompts instead of a target; no cost in money (the node count *is* the bill, in standard mode); and processor requests fixed, so only one resource is under the reader's hands while the other appears only as a floor (the node footers, and one plain line when processor sets the count).
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
  - **D1, "I didn't read the last chapter. What happened?"** In Chapter 4 (Year 3), Fennel moved onto managed Kubernetes. Fennel writes down what it wants running, such as "3 copies of `storefront`", in files called manifests; Kubernetes keeps those goals in the cluster's record, and many small loops each compare one part of the record with what's actually running and act to close any gap: the ReplicaSet loop writes a record for each Pod (Kubernetes' wrapper around a running container), the scheduler gives each new Pod a node (a machine in the cluster), and the node agent on that node starts it. One Saturday at 03:04 node 03 died; with default settings, its Pods were replaced on other nodes within about six or seven minutes, and nobody had to wake up. Since then the cluster has run on three nodes. To understand any loop, ask four things: which loop is it, what does it want (the desired state), what does it see (the real state), and what does it do when the two differ? (Revision 1, d-11, #6: CURRICULUM §2.3's wording, verbatim; the D1 line on moving day may stay, but without the nickname "moving day".)
  - k-01.
  - **The scene, in order of the week.** (Draft wording; the builder writes flowing prose.) Since node 03 died, Fennel's cluster has run on three nodes, 01, 02 and 04. On Friday evening, as the dinner rush began, the dispatch team asked for twice as many `dispatch` copies, and one of the new Pods didn't start: Ari's dashboard listed it as `Pending` for most of an hour, until Ari's team rented two more machines and added them to the cluster as nodes 05 and 06. On Tuesday, the `orders` Pod restarted three times between lunch and the end of the dinner rush, and each time customers saw errors for a moment; the dashboard gave the reason as `OOMKilled`. At the end of the month, Morgan opened the first full cloud bill since the move, and it was higher than the last one before it.
  - **What Morgan asks** (`.cp-quote`, cite Morgan): "We moved onto Kubernetes so our machines would be used better. Now we pay for five of them instead of four, and Ari's dashboard says they're less than a third busy, even on a Friday night. What are we paying for?"
  - **Ari's line** (`.cp-quote`, cite Ari): "All three come back to two numbers our teams wrote down for every service when we moved."
  - **Hand-off:** this chapter starts where Chapter 4 said it would, with the loop that picked node 04 for `orders`, and ends with the questions Jordan should ask before anyone changes those numbers.

### s-02 — What the scheduler counts
intent: Show that the sizes in Ch 4's drawings were numbers the teams wrote into their manifests (requests: memory and processor, counted separately), that the scheduler first rules out nodes without room for both and then picks among the rest, and that it counts reservations, never live use (local-01); fill in the scheduler's loop lens and give the first half of the budget analogy with its breaks. [Part 1]
objectives: o-1
claims: c-01, c-02, c-03, c-04, c-05, c-06, c-07, c-08
readiness: novice · interactivity: medium (a request has two numbers; a node offers a fixed amount of each; both must fit on one node; reservations, not use) · max-elements: 3
mode: concrete artefact (manifest) → name (term card) → small labelled figure (one node, two counts) → rule in words (filter, then score) → worked example (moving day) → predict (local-01) → analogy with breaks → the lens filled in · blueprint: none
layout:
  contiguity: inline. f-01's annotations sit on the lines they explain; f-02's counts and the verdict are labelled on the node itself, not in a legend.
  pacing: continuous. k-02 comes after the filter rule and before the sentence that says "reservations, not use".
  redundancy: the prose doesn't re-read f-02's numbers; it states the rule the figure shows. The lens paragraph doesn't repeat the filter rule; it puts it in the lens's four blanks.
  scaffold: D2, collapsed: "Why can Pods reserve only about 13 GB of a 16 GB node?"
ux: Read two paragraphs and f-01, read TERM 01, look at f-02, read the rule and the moving-day paragraph, commit to k-02, read the reveal paragraph, the analogy aside and the lens paragraph. At 360px f-01's annotations drop under their lines and f-02 stacks its two columns' labels under the node.
figure: f-01 (storefront's manifest, with requests) and f-02 (one node, two counts). See ## Figures.
widget: none
checks: k-02
content: these points, in order:
  - **Where Ch 4's sizes came from** (c-02). In Chapter 4's drawings every Pod had a size and every node had room for six units, and the scheduler looked for "a node with room". Kubernetes didn't measure those sizes. Each team wrote them down, in its service's manifest, when Fennel moved: how much memory and how much processor each copy should have set aside. f-01 shows `storefront`'s. Engineers call these numbers the Pod's **requests** (`dfn`, TERM 01). **Revision 1 (#4):** connect to Chapter 4 in one plain sentence with no arithmetic, near the user's "`storefront`'s two units of room appear as its real memory request: 4 GB." Don't convert a node's six units or explain the missing 1 GB in the main text. (#3: manifests don't speak: "declaring", not "saying".)
  - **TERM 01** (payoff variant): see ## Figures.
  - **What a node offers** (c-05). Fennel's nodes are rented machines with 16 GB of memory and 4 processor cores each. Part of each is kept back for the operating system and Kubernetes' own programs, so Pods can reserve about 13 GB and 3.9 cores of each node. D2 holds the why and one provider's numbers.
  - **Two counts, one node** (c-02). Memory and processor are counted separately, and a Pod fits on a node only if *both* of its requests fit in what that node has left unreserved. f-02 shows a node with plenty of memory left whose processor is nearly all reserved: a new `dispatch` Pod doesn't fit there, however much memory is free. (This keeps Chapter 3's promise to count them separately.)
  - **How the scheduler chooses** (c-01, c-06, c-07). The **scheduler** (`dfn`: the loop that gives each new Pod a node) works in two steps. First it rules out every node that doesn't have room for the Pod's requests. Then it scores the nodes that are left and picks the best, choosing at random between ties. With default settings, the best is the node with the most room left unreserved, and the scheduler also prefers to spread copies of the same service across different nodes, though only as a preference: if it can't spread them, it places them anyway.
  - **Moving day, explained** (option (b)): "That's why, when Ari applied `storefront`'s manifest to the new cluster in Chapter 4, its three Pods went to three different nodes. Nodes 01 and 04 had the most room left, so the first Pod went to one of them and the second to the other; the third went to node 02, which had no `storefront` copy yet and more room than 03." Then one sentence for m-08 to collect later: "Notice what the scheduler wasn't trying to do: fit Fennel onto as few nodes as possible." *(Option (a): the same paragraph, framed as "Chapter 4's drawing put two `storefront` Pods on node 01, where Sam had put them a year earlier, so that the two Saturdays could be compared. With default settings the scheduler would more likely have …" Option (c): this paragraph uses the Friday Pods instead and D3 holds the moving-day answer.)*
  - **Placement rules, one sentence** (c-08): "Teams can also add placement rules, such as keeping a service's copies on different nodes, sending some Pods only to particular machines, or keeping ordinary work off special ones; your engineers will tune these."
  - k-02.
  - **Reservations, not use** (c-03): the scheduler never looks at how busy a node is. The Kubernetes documentation says it refuses a node whose reservations are full "although actual memory or CPU resource usage on nodes is very low", and gives the reason: the room is protected for "when resource usage later increases, for example, during a daily peak". So a reservation is a promise to the Pod, kept even when the Pod isn't using it. **Revision 1 (#41), then one sentence, in plain words** (c-04): a request is a reservation, not a cap: a Pod can use less than it reserved, or more, as long as its node has room to spare; what stops it, and what happens when the room runs out, come later in the chapter. The sandbox in §04 draws Pods above their reservations, so the reader meets this here first.
  - **The budget aside** (`.cp-aside`, ANALOGY): "You know this from budgeting. Think of each node as a department's budget, each request as the budget a project reserves, and the scheduler as finance, which approves a new project only in a department whose reservations leave room for it. Whether the projects have actually spent their money doesn't come into it." **WHERE THIS ANALOGY BREAKS:** "A finance team would notice a department sitting on unspent money and move it to where it's needed. The scheduler never does: reserved room that a Pod isn't using stays reserved, at 3 a.m. as at the dinner rush, and no other Pod can be placed in it." (The spending-cap half comes in §07.)
  - **The scheduler, through the loop lens** (Ch 4's pattern, one implementation): "In Chapter 4's terms, the scheduler is one implementation of the reconcile loop. It wants every Pod on a node with room for its requests (the desired state). It sees Pods with no node, and how much memory and processor each node has left unreserved (the real state). When the two differ, because a Pod has no node, it rules out the nodes that are too full, picks the emptiest of the rest, and writes that node into the Pod's record." (Revision 1, d-11, #10: say "wants" is the desired state and "sees" the real state, and replace "what it does about a gap" with what it does when they differ.) End with the open question the next section answers: "And when no node passes the first step?"

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
  - **Scene set-up, before the lane** (the brief's lesson; one paragraph, then one on reading the canvas). "Since node 03 died, Fennel's cluster has run on three nodes: 01, 02 and 04. Friday's dinner rush is when `dispatch`, which assigns drivers to orders, is busiest, and at 17:45 the dispatch team decides it wants six copies running tonight instead of three." Then: "The following widget follows the next hour step by step as you scroll. It's drawn as in Chapter 4, with one change: it now counts in real units. Each node's column is the 13 GB of memory its Pods can reserve, and each Pod's height is its memory request. The line under each node counts processor, which is reserved separately: so many of its 3.9 cores." The record and the loops are as in Chapter 4.
  - **Lane F** (steps under ## Widgets).
  - **TERM 02** (pending), right after the lane.
  - **Reading the reason** (c-20, x-06): the scheduler records why, every time it fails, in a line like the one on the canvas (in the format engineers see; the exact wording varies between Kubernetes versions). Read it left to right: "0/3 nodes are available" means none of the three nodes passed the first step; the rest says, node by node, what was short. It already answers the first question to ask.
  - **m-26, named, in at most two sentences** (c-02; Revision 1, #16, #17). F3 and k-03's feedback already explained why the 3 GB never add up; the user: "they'll understand quickly from the widget above." So don't explain it again. Say only that free room stranded in pieces like this is common on real clusters, and that the leftover pieces on 01, 02 and 04 are room Fennel pays for that no Pod of this size can use. No "Chapter 3 kept its drawings clear of this case".
  - **local-03, the two wrong readings** (c-21): pending isn't a failure (nobody has to resubmit anything: the scheduler keeps trying, and places the Pod as soon as a node has room) and it isn't harmless either (in Fennel's cluster no loop makes room by itself: someone has to add a node or free some room; Chapter 8 introduces a loop that can add nodes). The questions it raises, set as a short two-line list: "What's short, and on how many nodes?" and "Is it short because demand really grew, or because what we reserved is more than we use?" The second question is §04's.
  - **D4, "Is 'pending' always about room?"** (c-20 note; Ch 4 by reference): no; `Pending` also covers the time a placed Pod spends downloading its image before it starts. The recorded reason tells the two apart.

### s-04 — What Morgan pays for
intent: Connect requests to the bill. Say first who decides how many nodes there are: Ari's team rents and adds them by hand, and the requests decide how many Fennel *needs* (#20). Confront m-07 with a prediction; let the reader discover in the sandbox how requests set the node count (in steps, with processor as a floor, with doubling one request costing nothing until it costs a node, with one Pod too big for any node); confront m-08 (nothing packs or gives nodes back by itself); name bin packing; then answer Morgan in a few sentences, without re-explaining what the sandbox showed (#31, #34). [Revision 1: lead, sandbox intro, the unused-room paragraph, per-Pod billing and Morgan's answer all change; k-04, k-05 and bin packing stay.]
objectives: o-1, o-2
claims: c-02, c-03, c-06, c-09, c-10, c-11, c-12, c-13, c-14, c-15, c-20
readiness: novice · interactivity: high (requests per service; node count; used / reserved-not-used / not reserved; insurance) · max-elements: 3
mode: who rents the nodes → predict (m-07) → goal-free exploration (sandbox, B2) with three "things to notice" → transfer check (m-08) → name (bin packing) → one sentence + D5 → per-Pod billing in two sentences → payoff (Morgan's answer) · blueprint: B2
layout:
  contiguity: adjacent. In the sandbox the controls (left) and the outcome (right) sit side by side on desktop, and the controls come first on phones; each Pod's request and use are drawn on the Pod itself.
  pacing: continuous. k-04 is committed before the sandbox (the prompt asks for the prediction first); k-05 follows the sandbox.
  redundancy: the prose after the sandbox doesn't list or re-explain what the reader just saw (#31). It names bin packing, gives one sentence on the two kinds of unused room (to carry D5), two sentences on per-Pod billing, and Morgan's answer. The sandbox's caption states its two simplifications once.
  scaffold: D5 "How common is this?", D6 "What does a per-Pod mode charge for, exactly?", each collapsed
ux: Read a short lead, commit to k-04, read the introduction and three "things to notice", use the sandbox (four steppers, one switch, a reset), commit to k-05, read three short paragraphs. At 360px the sandbox's controls come first, then the node count, the room bar and the nodes; steppers are 44px tall; no horizontal scroll.
figure: none (the sandbox carries the visuals)
widget: w-sizing-sandbox (complexity: high) — W-02 "How many nodes?": four memory requests and a spare-node switch → the nodes those requests need, and the room bar
checks: k-04, k-05
content: these points, in order:
  - **Lead: who rents the nodes, and what decides how many** (c-09; #18, #19, #20). "Provider" needs a gloss on first use here ("the cloud company Fennel rents its machines from"; builder's wording). In its standard mode, which is Fennel's, the bill counts machines: Fennel pays for each node for as long as it exists, whether its room is reserved, used or empty. So the five nodes constitute Morgan's bill. **Must say:** nothing in Fennel's cluster rents or adds nodes by itself; Ari's team decides how many machines to rent and adds them by hand (Chapter 8 introduces a loop that can). **Must say:** what the requests decide is how many nodes Fennel *needs*: on Friday the reservations didn't fit on three nodes, so a Pod waited until Ari's team added two. **Mustn't** say or imply that requests create or provision nodes ("there are five because of the requests" is the sentence #20 objected to).
  - k-04.
  - **The sandbox, introduced in one paragraph and three prompts** (#28; replaces "W-02 is Ari's sizing sheet"). The user asked for something like "The following widget simulates how the scheduler operates. We begin by setting the memory requests to those Fennel has been using in this lesson", then the questions. That first sentence isn't quite true (the widget packs Pods as tightly as they go; the scheduler, by default, spreads them: c-06, c-07), so use this, which keeps the user's shape and stays true: "The following widget works out how many nodes Fennel needs for a given set of memory requests. Like the scheduler, it places every Pod by its requests, with both of its numbers on one node; unlike the scheduler, it packs the Pods as tightly as they will go, so it counts the fewest nodes Fennel could rent. It starts with the memory requests Fennel's teams have been using in this chapter, and keeps room for one more node so that Fennel can lose one. Each Pod's outline is what it reserves; the fill inside is what it used at last Friday's rush." Then "There is no target. Some things to try:" and the prompts, as a short list (not a task):
    - "Set each request to what that service used at the rush. How many nodes does Fennel need now? Look at the processor line under each node: what stops the count going lower?"
    - "Double `payments`' request, as in the question above. Does the count change? How far can it go before it costs a node?" (answer, from the model: 2 → 4 GB costs nothing, because the four nodes had slack; at 7.5 GB it costs a fifth node, a sixth with the spare. This is why k-04's right answer says "potentially more nodes".)
    - "Push `orders` past 13 GB. What happens?" (The widget names `orders` as never placeable; see the next point.)
    The spare-node prompt of Revision 0 ("What does insurance cost?") moves to s-05, which owns insurance.
  - **W-02.**
  - **A Pod bigger than any node** (c-20; replaces s-06's answer). One or two sentences after the widget, plain words, no new term: a Pod whose request is bigger than the room any node has will never be placed; it waits, pending, for good. The answer is a bigger node: Ari's team would rent a machine with more memory. **Mustn't** introduce node pools, machine types as a term, or "node groups" (they are Ch 8's, d-12).
  - k-05.
  - **Bin packing, and what the default doesn't do** (c-06): fitting Pods' reservations onto as few nodes as possible is **bin packing** (`dfn`), and the widget above does it to count the fewest nodes. The scheduler, by default, doesn't: it prefers the emptiest node and spreads copies out, which is safer for Pods but not the cheapest arrangement. Packing tightly is a setting engineers can switch on; some fully managed modes pack for you. Either way, the scheduler only places new Pods; it never moves running ones to empty a node.
  - **Unused room, one sentence, then D5** (c-03, c-13; #31). Revision 0's paragraph re-explained the room bar; the user: "consider reducing this paragraph. a bunch", but keep it, because D5 needs something to hang on. One sentence, near: "The bar under the nodes splits the room nobody uses into two kinds, room no Pod reserved and room reserved but not used, and the 'less than a third busy' on Ari's dashboard counts both." D5 follows directly.
  - **Billing per Pod, at most two sentences** (c-10, c-11, c-12; #32). Decision: it stays, because m-08's per-Pod variant ("then we'd pay only for what we use") is a real manager's escape hatch, but only as: some setups bill per Pod instead of per machine, and they charge for what each Pod requests, not what it uses, so the lesson is the same: padding costs money. Drop "the picture shifts", "Pod by Pod" and "some fully managed modes still bill per machine" (D6 can keep that). D6 stays, collapsed.
  - **Morgan's answer, cut to its point** (#33, #34). Two or three sentences: Fennel rents five nodes because the teams' padded requests filled three nodes on paper while the services used far less, so Ari's team rented two more; one of them has sat nearly empty since, which is a node's worth of spare room, and whether Fennel wants that spare is a choice (the next section says why Fennel might want it: #33). Requests closer to what each service uses at its busiest would let Fennel rent fewer nodes, but not as few as possible. **Mustn't** repeat the room kept back for the system (s-02 owns it), name the control-plane fee (Ch 14), or send the reader to "§05 and §08".
  - **D5, "How common is this?"** (c-13, c-14, c-15): unchanged from Revision 0: "One vendor's dataset (Datadog's 2024 report, from its own customers' AWS bills, all containers on EC2, May 2023 to April 2024) found 83% of container spend went on idle room: 54 points on room no Pod had reserved, 29 on requests bigger than workloads needed. In one community survey (CNCF, about 100 self-selected respondents, June to November 2023), 49% said Kubernetes had driven their cloud spend up, and over-provisioning was by far the most-cited cause, at 70%. These are single surveys, not industry averages."
  - **D6, "What does a per-Pod mode charge for, exactly?"** (c-10 notes, c-11, x-02): unchanged: what each running Pod requests, per second on one provider; Pods waiting to be placed aren't billed there, but crash-looping ones are; one provider rounds a Pod up to the next available size (1 core and 8 GB, plus 256 MB for Kubernetes' parts, is billed as 2 cores and 9 GB); not every fully managed mode bills per Pod. Prices are Chapter 14's.

### s-05 — Room on purpose
intent: Turn some idle room from waste into a decision, for one reason only: a node can go down (#36). When one does, its Pods are replaced and the scheduler has to place the replacements on the nodes that are left; if those are full, the replacements wait. Spare room is insurance against that, it costs nodes, and how much to keep is a decision. Keep it short. Keeps Ch 4's D4 promise ("that room is the subject of Chapter 5"). [Revision 1: rebuilt from #35 and #36.]
objectives: o-2
claims: c-09, c-21
readiness: novice · interactivity: low (a node goes down; its Pods need room elsewhere; spare room costs nodes) · max-elements: 2
mode: explanation tying two things already seen (a node dying in Ch 4, a Pod waiting for room in lane F) → the cost (the widget's switch) → the question to ask · blueprint: none
layout:
  contiguity: adjacent; it refers to the sandbox's switch by its words ("the "Keep room to lose a node" switch in the widget above"), not by ID.
  pacing: continuous
  redundancy: one short paragraph and one quoted question; no figure. Doesn't retell lane F or Ch 4's night.
  scaffold: none
ux: Read one short paragraph and one question. At 360px it is plain prose.
figure: none
widget: none
checks: none
content: these points, in order (draft; the builder writes it as one flowing paragraph of about three sentences, close to the user's own words, #36):
  - **Why spare nodes** (c-21): nodes go down, as node 03 did in Chapter 4. When one does, its Pods are replaced, and the scheduler has to place the replacements on the nodes that are left; if those nodes are full, the replacements wait for room, like the `dispatch` Pod at the dinner rush. Spare nodes are insurance against that: room kept free so a lost node's Pods have somewhere to go.
  - **What it costs, and who decides** (c-09): the insurance is paid for, a node at a time; the "Keep room to lose a node" switch in the widget above shows what it costs (one node). How much to keep is a decision for engineers and finance together.
  - **The question to ask**, quoted: "If we lose a node during the dinner rush, where do its Pods go?"
  - **Mustn't:** open with "Friday showed" or any day as an agent (#35); bring back the "requests sized to the busiest hour" point (s-02 owns the daily peak); cite Chapter 3's Sam.

### s-07 — Tuesday: when a Pod uses too much
intent: Building on s-02's sentence that a Pod can use more than it reserves, introduce limits plainly as the most each copy may use (a cap on use, not a reservation), and show on Tuesday's `orders` chart what happens at the memory cap (the operating system kills the container, the node agent restarts it in place: OOM-killed) as against the processor cap (slowed, never killed); confront local-02 and give the spending-cap half of the analogy. [Part 2 under the split]
objectives: o-2, o-3
claims: c-04, c-16, c-17, c-18, c-22
revision: Revision 1 (#38, #39, #40, #41): s-07 now builds on s-02's sentence that a Pod can use more than it reserves, and introduces limits plainly.
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
  - **Limits, introduced plainly** (c-04; #38, #39, #41). Open from what the reader already knows (§02 said a Pod can use more than it reserves), then name the cap in one or two sentences, near: "A Pod can use more than it reserves, but not without end. A manifest can also set **limits**: the most memory and processor each copy may use on its node. Here is `orders`' manifest with both: it reserves 6 GB and may use up to 7 GB." Then f-04 and TERM 03. **Mustn't** build up to the word through "a manifest can hold a second number for each resource" or end on "That second number is called the Pod's limits" (#38: "an extremely tedious way of introducing the word"); no "The second number in Fig. 04" anywhere (#40).
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
  - **When a node runs short** (c-19, c-04): if the node's free memory falls too low, its agent removes Pods to protect the node and everything else on it. That's an **eviction** (`dfn`). It goes first for the Pods using the most memory beyond what they reserved; Pods within their requests go last. Unlike §07's kill, an eviction removes the Pod, and the ReplicaSet loop writes a new one (Ch 4), which the scheduler then has to place: on a full cluster, it waits, like the `dispatch` Pod at the dinner rush. So a request set below what a service really uses doesn't save that service any room; it puts it first in line.
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
- **Caption.** "Fig. 04. Requests are what each copy reserves; limits are the most it may use on its node." (#39)
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
- **Model.** Ch 4's f-04 table (a copy, not an edit), header `FIG. 06 · WHICH LOOP: WANTS, SEES, DOES WHEN THEY DIFFER`, column heads `WANTS (DESIRED STATE)` · `SEES (REAL STATE)` · `DOES WHEN THEY DIFFER` (d-11), built from a `CH05_LOOPS` array in this chapter's `site/assets/page.js` (CURRICULUM §2.3 format: loop, per, wants, sees, does, job, chapter), in Ch 4's row order. Changed or new cells carry a mono `NEW IN CH 5` tag:
  1. **node loop** · unchanged from Ch 4.
  2. **ReplicaSet loop** · unchanged, with one added clause in *does*: "…, including for Pods that were evicted" (`NEW IN CH 5`).
  3. **scheduler** (`NEW IN CH 5` on wants, sees, does) · wants: every Pod on a node with room for its requests · sees: Pods with no node, and how much memory and processor each node has left unreserved (never how busy it is) · does: rules out nodes too full for the Pod, picks the emptiest of the rest, spreading copies; if none has room, leaves the Pod pending, records why, and tries again when the cluster changes · job: placing.
  4. **node agent** (one per node; `NEW IN CH 5` on wants, sees, does) · wants: its node's assigned Pods running, and the node itself healthy · sees: the containers on its node, and how much memory the node has left · does: starts and restarts containers (including OOM-killed ones); when its node runs short of memory, evicts Pods, those furthest over their requests first · job: restarting.
  5. (dashed) **another loop, Chapter 7** · unchanged.
  6. (dashed, `NEW IN CH 5`) **a loop that adds nodes, Chapter 8** · wants: no Pod waiting for room · sees: pending Pods · does: adds nodes, and removes idle ones · job: scaling.
  Footer line: "The memory kill itself is the operating system's, on the node; the node agent restarts the container afterwards."
- **Caption.** "Fig. 06. The same loops as in Chapter 4, filled in further. Pending Pods and evictions are differences between desired and real state that the loops act on; adding room is a job no loop in Fennel's cluster does yet."
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
- **TERM 03 · limits** (s-07). Definition: "The most memory and processor a Pod's container may use. They cap use; they reserve nothing." Back: "Over the memory limit: killed. Over the processor limit: slowed." (#40)
- **TERM 04 · OOM-killed** (s-07). Definition: "Stopped by the node's operating system for going over its memory limit ('out of memory'), then restarted in place." Back: "Engineers see `OOMKilled`, and exit code 137."
- `dfn` only (no card): scheduler (s-02), bin packing (s-04), eviction (s-08).

## Visual grammar

Extends Ch 1–4's grammar (CURRICULUM §5 Visuals column), which is unchanged. The rule from the user's reviews drives every new item: **things different in kind look different.** Three new kinds matter here: what a Pod **reserves**, what it **uses**, and its **cap**.

- **Units replace room units.** Pod chip height = its **memory request** in GB (Ch 4's chip; one Ch 4 unit = 2 GB, so the drawings keep their proportions). A node's body = **13 GB of room for Pods**; unused room = Ch 3's dashed `c6` region `N GB FREE`.
- **Processor = a second count, printed.** On the lane and the sandbox, each node shows a mono footer line `CPU 2.75 / 3.9` (reserved / room for Pods), `ink-2`; it gets the step highlight when the step turns on it. Only f-02 draws processor as a column.
- **Reserved vs. used vs. cap:**
  - *reserved* = the Pod chip itself (outline and `c1-soft` fill), as in Ch 4: a Pod holds its reservation;
  - *used* (sandbox only; Revision 1, #29: the service label sits on the chip outline's top border or above the chip, never on the soft fill; overflow is diagonally hatched `warn`, not a darker solid) = a solid `c1` fill from the chip's bottom, to the height of the Pod's use at last Friday's rush; where use exceeds the request, the fill rises above the chip's top edge, hatched, with a `warn` tag `USES MORE THAN IT RESERVES`;
  - *cap* (limit) = drawn only on f-04 and f-05: a solid `ink` line labelled `CAP · LIMIT`.
  - On charts, *reserved* is a dashed `c4` line (a written number: Ch 4's colour for written intentions), *used* a `c1` line, *cap* a solid `ink` line.
- **WAITING** (Ch 4 designed it in): a Pod with no node is a dashed `c1` chip with no fill and no lamp, drawn in a strip above the nodes headed `WAITING · NO ROOM` (`warn`). Its record row word reads `n RUNNING · n WAITING` (`warn`).
- **The scheduler's verdicts** (lane only, on the scheduler's steps): on each node bar, `FITS` (`good`), `NO MEMORY` or `NO PROCESSOR` or `NO MEMORY · NO PROCESSOR` (`warn`), with the node's free amounts beside them (`1 GB · 0.15 CORES FREE`). Narrow canvas: `✓ FITS`, `✕ MEM`, `✕ CPU`, free amounts dropped (the step text gives the one that matters).
- **The recorded reason** = a mono note line under the nodes, labelled `SCHEDULER`: `0/3 nodes are available: 2 Insufficient cpu, 3 Insufficient memory.` (wraps on narrow).
- **A node added between steps** gets a `NEW` tag on its bar for that step (Ch 4 designed in `nodes` gaining keys).
- **The room bar** (sandbox; Revision 1: under the nodes, in the outcome column, headed `ROOM FOR PODS ON THE RENTED NODES`): one horizontal bar of all rented room for Pods, three segments with direct labels and GB: `USED AT THE RUSH` (solid `c1`), `RESERVED, NOT USED` (`c1-soft`), `NOT RESERVED` (dashed `c6`, Ch 3's free grammar).
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
  - **F3 (gated on k-03).** Scheduler still active. The third Pod's verdicts: `01 NO MEMORY`, `02 NO MEMORY · NO PROCESSOR` (1 GB · 0.15 cores), `04 NO MEMORY`. The Pod appears in the `WAITING · NO ROOM` strip (highlighted); the `dispatch` row reads `5 RUNNING · 1 WAITING` (the two placed Pods are RUNNING now: their agents started them, unhighlighted); the `SCHEDULER` note: `0/3 nodes are available: 2 Insufficient cpu, 3 Insufficient memory.` Lens `SEES · 1 Pod with no node; no node with room` / `DOES · leaves it unplaced; records why`. Text: "The third Pod fits nowhere. Between them the three nodes have 3 GB of memory free, more than it needs, but in 1 GB pieces, and a Pod has to fit whole on one node. So the scheduler leaves it without a node and writes down why." *(Options (a)/(c): two Pods wait; `4 RUNNING · 2 WAITING`; note `0/3 nodes are available: 1 Insufficient cpu, 2 Insufficient memory.`; text: "…5 GB of memory and over 4 cores free between them, but node 02 has the memory without the processor, and 01 and 04 the processor without the memory.")*
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
model: Fennel's services with fixed copies — `storefront` ×3, `orders` ×1, `payments` ×2, `dispatch` ×6 (since Friday), `notifications` ×2 — each with a memory request (GB), a processor request (cores, fixed) and its use at last Friday's rush (R2). **Revision 1 (#25): `payments` is adjustable.**
  - `storefront` request **adjustable** 0.5–8 GB (default 4) · 0.5 core · used 2 GB, 0.3 core
  - `orders` request **adjustable** 0.5–16 GB (default 6) · 1 core · used 5.5 GB, 0.5 core
  - `payments` request **adjustable** 0.5–8 GB (default 2) · 0.25 core · used 0.5 GB, 0.1 core
  - `dispatch` request **adjustable** 0.5–6 GB (default 2) · 1 core · used 1 GB, 0.6 core
  - `notifications` 2 GB (fixed) · 0.25 core · used 0.5 GB, 0.1 core
  - Nodes: 13 GB and 3.9 cores of room for Pods each (16 GB, 4-core machines; c-05).
  - **Nodes needed** = the fewest nodes on which every Pod fits, packed as tightly as possible, with each Pod whole on one node and each node's memory and processor reservations within its room (c-02). Computed exactly by the existing `model.js` (no model change: `payments` gets an `adjustable` range in `data.js` and a stepper; `ORDER` becomes storefront, orders, payments, dispatch). **Spare node switch** ("Keep room to lose a node", default **on**): one more node, kept empty. If any Pod's request is larger than a node's room for Pods, there is no count, and that Pod is named as never placeable.
  - **Set by** stays in the model (memory alone vs. processor alone) but is shown only as one plain line, and only when processor matters (see shows).
  - **Do the documented numbers still hold with `payments` adjustable? Yes.** The designer ran the shipped `model.js` with `payments` adjustable 0.5–8 GB: `payments` defaults to 2 GB, so every default is unchanged. Requests as set: **4 nodes, 5 with the spare** (set by memory; reserved 38 of 65 GB with the spare; 19.5 GB used). Right-sized (2.5, 6, 1.5; `payments` 2) → 3, 4 with the spare (both). At use (2, 6, 1; `payments` 2) → 3, set by processor; with `payments` also at its use (0.5) still 3, set by processor. `orders` at 5 → 3 (4 with the spare), at 5.5 → 4 (5), the k-09 suggestion. `orders` at 8 with the others right-sized → 3; at 12 → 4. `orders` at 13.5 or more → no count. **New, `payments` (k-04's case):** from the defaults, `payments` at 4 GB → still 4 (5) nodes, reserved 42 of 52; at 7 → still 4 (5); at **7.5 → 5 (6)**. The self-test passes over all 98,304 settings × 2 (raising any request never lowers the count; the room split adds up), in under 2 s in Node; the hardest setting takes about 24,000 search steps (was about 8,000), still well under a frame. The builder adds `payments` cases to `selftest`.
  - **Drawing:** the nodes as the pooled renderer draws them (nodes-only option), each Pod placed where the packing put it, with its request and use (Visual grammar, revised for #29); the node footers show processor. Placement is recomputed from scratch on every change.
  - **Simplifications, stated in the caption:** the widget packs tightly to count the fewest nodes; the default scheduler spreads Pods out instead (§02), so a real cluster needs at least this many. Each change places every Pod afresh; a real cluster never moves running Pods. Processor requests, and `notifications`' memory, stay as the teams set them.
reader_does: Changes four memory requests with − / + steppers (0.5 GB steps; each row shows the service's use at the rush), flips the spare-node switch, or presses Reset. No target: three "things to try" sit above the widget (s-04). k-04 is committed before, k-05 after.
shows: (Revision 1, from #23–#30; the user: "that makes the left column the controls and the right column the outcome. Easier design!")
  - **Header bar:** `W-02 · HOW MANY NODES?` (not "Ari's sizing sheet", #28), and at its right end a button labelled **`Reset`** (#23: "let's move the reset button up here. Just make it say 'reset'"), which restores Fennel's requests and the switch.
  - **Left column, the controls** (top left, #24): head `MEMORY REQUESTS, PER COPY`; four rows in the order `storefront ×3`, `orders ×1`, `payments ×2`, `dispatch ×6`, each `name ×n` / `used 2 GB at rush` (#27) beside `[−] 4 GB [+]`; then the switch row `Keep room to lose a node · ON/OFF`; then **Warnings** (`warn`), one line each, only when they apply: a service whose request is below its use ("`storefront` requests 1.5 GB and used 2 GB at the rush: first in line if a node runs short (§07)", s-08 now being §07 on the page), a never-placeable Pod ("`orders` requests 14 GB, more than the 13 GB a node has for Pods: no node can ever take it"). The row's "· Over" tag of Revision 0 is dropped (#27: "we may need to indicate over elsewhere so it fits"): in the row, only the request value turns `warn`; the word travels in the warning line, and the drawing shows the hatched overflow.
  - **Right column, the outcome:**
    1. A one-line heading with the count in words, large mono: `4 NODES FOR THE PODS + 1 SPARE` (switch off: `4 NODES FOR THE PODS`; no answer: `NO COUNT: A POD FITS ON NO NODE`). When processor sets the count (set by `processor` or `both`), one plain line under it: "Processor, not memory, sets this count: memory alone would need {n}." Nothing else.
    2. The nodes: node frames `NODE · 1 … n` (sandbox nodes are numbered, not Fennel's 01–06), Pods with request and use (below), `N GB FREE`, CPU footers; a spare node (switch on) is drawn last, dashed, labelled `SPARE`, empty.
    3. **Under the nodes, the room bar** (#30): `ROOM FOR PODS ON THE RENTED NODES`, one bar in three labelled segments with GB and %: `USED AT THE RUSH`, `RESERVED, NOT USED`, `NOT RESERVED`; use above reservations is hatched in the used segment, labelled once.
  - **Removed (#26):** the stats block (`NODES 04` with "what Fennel rents, and pays for in standard mode" and "3 for the Pods + 1 spare", `SET BY`, `RESERVED 25.5 OF 52 GB`, `USED AT THE RUSH 19.5 GB`). The user: "All this information is extraneous and noisy, let's delete it. It's captured in the visualization below." The count survives only as the heading in 1; reserved and used survive as the bar's labels.
  - **Reserved vs. used on each Pod (#29):** the user "took a bit too long to realize the boxes here indicated two colors, one for peak usage, and one for request size", and found "the label with the same background color as unused … very confusing". So: the Pod's outline is its request, its unused reserved part is the soft fill, its use is the solid fill from the bottom; the service label sits **on the outline's top border** (a tab on the paper ground, like a fieldset legend), or above the box where a chip is too short, never on the soft fill. Use above the request rises above the outline **hatched** (diagonal `warn` hatch, not a darker solid red). This is a change to the pooled renderer's `use` option only (sandbox only); lane F has no use fills and must render unchanged.
  - **Live text:** an `aria-live="polite"` sentence, updated at most once per change: "4 nodes for the Pods, plus 1 spare. 38 of 65 GB reserved; 19.5 GB used at the rush. Nothing over its reservation."
size: **Desktop (≥ 900px):** `.d-wide`; header with Reset; controls in a left column (about 35%), outcome on the right (heading, nodes in up to two rows of four, the room bar under them). Reserve the tallest state's height (two rows of nodes, the processor line, the bar; about 600px; CURRICULUM §8 step 6) so nothing below moves.
  **600–899px:** the same two columns, nodes in rows of three or four, about 640px reserved.
  **Under 600px:** one column in reading order: header with Reset, the controls (steppers 44px tall, the switch a 44px row, warnings), then the count heading and its processor line, then the room bar, then the nodes in rows of four (about 70px each at 360px; service labels hidden below 80px node width, so each Pod shows only its outline and fills; the steppers carry the names). The count heading and bar sit directly after the last control, so a change's main effect is one short scroll away and is also announced by the live sentence. Per d-07, the widget doesn't scroll its header to the top on change; phones don't reserve the tallest state's height. Nothing overflows at 360px.
  **Motion:** chip and fill changes ≤ 200ms, instant under reduced motion. **Keyboard:** steppers, switch and Reset are native buttons / a checkbox; values announced through the live sentence.
acceptance: ac-08, ac-09, ac-10
reuse: **Decision unchanged: a new widget with its own model, drawing nodes with the pooled `renderCluster` (nodes-only option).** `model.js` is unchanged by Revision 1; `data.js` gains `payments.adjustable` and the new strings; the pool's `use` drawing gains the border label and hatched overflow (#29), behind the existing sandbox-only option. Stays chapter-local until a second chapter needs it.
  - **Later chapters:** **Ch 8** (requests drive node count, now with a loop adding and removing nodes over a day's traffic: the same model per time step; and node pools, where "a bigger node" becomes a pool of bigger machines); **Ch 11** (per-team totals); **Ch 14** (per-node vs. per-Pod billing over the same requests).
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
prompt: After Friday, the payments team doubles its memory request "to be safe". Its Pods use no more memory than before. (#21: not "what payments actually uses".) What does change for Fennel?
options: A) Very little: the nodes are no busier than before, so the only cost is some room that goes unused. · B) Payments is better protected: with twice the memory set aside, it can no longer be killed for running out. · C) Each `payments` Pod blocks twice the room on its node, so nodes fill sooner: potentially more nodes, or Pods left waiting. (#22) (correct: C; tempting: A, m-07; B, local-02)
feedback: A: "'Unused room' is the cost, but it isn't small. Room that `payments` reserves is room no other Pod can be placed in, even while `payments` isn't using it. On Friday, reservations like this filled three nodes and left a Pod waiting, and Fennel rented two more." B: "A bigger request doesn't change what `payments` uses, and it isn't what decides whether a container is killed for running out; that's the second number, in §07. What a bigger request does is block more room on its node." C: "Right. The scheduler counts the doubled request in full, so each `payments` Pod takes twice the room, and on a full cluster that's another node, or a Pod that waits. Whether it costs a whole node depends on how much room the nodes have left; the following widget lets you try it."

### k-05
segment: s-04
objective: o-1
type: predict
prompt: A month on, nodes 05 and 06 are still nearly empty. With default settings, what does Kubernetes do about them?
options: A) Moves their Pods onto the fuller nodes and hands 05 and 06 back, since fewer nodes cost less. · B) Nothing: the scheduler places only new Pods, and Fennel pays for both nodes until someone removes them. · C) Spreads Pods from the fuller nodes onto them, so that every node ends up about equally busy. (correct: B; tempting: A, m-08; C, the scheduler as a balancer)
feedback: A: "Nothing in Fennel's cluster packs Pods or gives nodes back. The scheduler places Pods that have no node, and running Pods are never moved, so 05 and 06 stay as empty as Friday left them, and stay on the bill." B: "Right. The scheduler only places Pods that have no node, and running Pods are never moved. Removing the nodes is up to Ari's team; Chapter 8 introduces a loop that can do it." C: "The scheduler never moves running Pods, to even things out or for any other reason. It only places new ones, so the old nodes stay as full as they were and the new ones as empty."

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
feedback: A: "Right. Halved requests fit onto fewer nodes, but at the rush several services would use more than they reserved. When a node runs short, its agent evicts the Pods furthest over their requests first, and on a full cluster their replacements wait. Cheaper, and less reliable. (The sizing widget's warnings show which services.)" B: "Each Pod may use more than it reserved only while the node has room to spare. Pack nodes on halved requests and, at the rush, some run short; then the node agent evicts the Pods furthest over their requests." C: "The scheduler never looks at use; it places Pods by their requests. Halving them really would fit Fennel onto fewer nodes. The risk is what happens at the rush, when those Pods use more than they reserved."

### k-09
segment: s-09
objective: o-3
type: apply
prompt: Ari messages Jordan: "We need to bump memory limits on `orders`." What would you ask? Think of one or two questions, then show the answer.
model_answer: "Is that a leak or real growth? And what does it do to our node count?" Under it, two lines of why, then f-07: "If it's a leak, a higher limit only delays the next kill; and if the request goes up too, Fennel rents room for a bug. If it's real growth, a higher limit may be right, and the Kubernetes documentation's advice is to check for a leak first, then raise the limit, 'and possibly' the request." "Raising only the limit doesn't change where Pods go. Raising the request does: each copy reserves more room, and on nodes that are already full, that can mean another node on the bill (in the sizing widget, from Fennel's requests, try `orders` at 5 GB and then at 5.5 GB)." Then f-07, introduced as "the picture engineers look for".
feedback: Under the reveal, one line: "If your question was 'how much more memory?', that's the engineers' number to work out. The two questions above decide whether more memory is the right fix, and what it costs."

## Acceptance criteria

- ac-01 (s-01): §01 opens with the cast strip (Morgan, Jordan, Ari, with roles) and D1, collapsed; k-01 comes before the scene and before any new term. The scene gives, in the manager's words, Friday's waiting Pod (named `Pending`) and the two added nodes, Tuesday's three `orders` restarts (named `OOMKilled`) and the month's higher bill; Morgan's and Ari's lines appear as quotes, Ari's naming "two numbers our teams wrote down". No mechanism is explained in §01.
- ac-02 (s-02, f-01, f-02, k-02): requests are introduced through f-01 (`storefront`'s manifest, `memory: 4Gi`, `cpu: 500m`, annotated) and TERM 01 (the only payoff variant), and connected to Ch 4's units in one sentence with no arithmetic (`storefront`'s two units appear as 4 GB). f-02 shows one node's memory and processor separately and a Pod that fails on processor alone. The filter-then-score rule is stated before k-02; "reservations, not use" with the documentation's daily-peak reason comes after it, followed by one sentence that a Pod can use more than it reserves while its node has room (c-04). The `storefront` paragraph follows option (b) and doesn't say "moving day". The budget aside maps node, request, scheduler explicitly and has a WHERE THIS ANALOGY BREAKS line (reserved room is never lent out). The scheduler's lens is filled in as one implementation of Ch 4's pattern, in CURRICULUM §2.3's Revision 1 wording (wants = the desired state, sees = the real state, does = what it does when the two differ).
- ac-03 (s-02, c-08): placement rules appear in exactly one plain-words sentence; the words affinity, taint and toleration don't appear.
- ac-04 (w-friday-scrolly, scene and grounding): a set-up paragraph before the lane says the cluster has run on three nodes since node 03 died, who changes what at 17:45 and why, and how to read the canvas in GB and cores. The canvas draws memory in GB (13 GB per node) and a computed processor footer on every node.
- ac-05 (w-friday-scrolly, steps and gate): F1 is the ReplicaSet loop writing three records; F2 shows the scheduler's per-node verdicts on the node bars and places the Pods that fit; F2 ends on k-03, which locks F3–F5. F3 shows the Pod(s) in a `WAITING · NO ROOM` strip, the row word `… WAITING`, and the recorded reason as a `SCHEDULER` note in the documented format. F4 says nothing failed, nobody resubmits, and no loop in Fennel's cluster adds room. F5 adds nodes 05 and 06 (by Ari's team, by hand), places the waiting Pod(s), says Fennel now pays for five nodes and that running Pods aren't moved. The numbers are option (b)'s, with the reason `0/3 nodes are available: 2 Insufficient cpu, 3 Insufficient memory.`
- ac-06 (w-friday-scrolly, layout and access): Ch 4's lane behaviour (sticky canvas, steps at 55%, scrolling back restores exact snapshots, inline snapshots where the canvas exceeds 50vh or the viewport is under 560px tall); five-node width reserved from F1 on desktop; at 360px no horizontal scroll, text ≥ 13px, check buttons ≥ 44px; the canvas `aria-label` follows the step; transitions ≤ 300ms, instant under reduced motion; a caption says the reason's wording varies between versions.
- ac-07 (w-friday-scrolly, reuse): the lane is drawn by the pooled `renderCluster` and lane controller (`pool/…`), not a copy of Ch 4's files; Ch 4's pages render unchanged after promotion; all of this lane's snapshots and strings live in its `data.js`, whose header documents the added fields.
- ac-08 (w-sizing-sandbox, model): with defaults the outcome heading reads 4 nodes for the Pods + 1 spare (5 in all), and the room bar 38 of 65 GB reserved, 19.5 GB used; switch off → 4; `storefront` 2.5 and `dispatch` 1.5 → 3, 4 with the switch on; `storefront` 2, `dispatch` 1 → 3, with the processor line shown; `payments` 4 → unchanged (4 + 1), `payments` 7.5 → 5 + 1; `orders` 13.5 GB or more → `NO COUNT` with `orders` named as never placeable. Raising any request never lowers the node count (the self-test covers all four steppers). A request below a service's use shows its warning line.
- ac-09 (w-sizing-sandbox, display): controls (four steppers incl. `payments`, the switch, warnings) in the left column at the top; the outcome (count heading, nodes, then the "Room for Pods on the rented nodes" bar) on the right; `Reset` in the header bar. No stats block. Each Pod's request (outline, label on its top border or above it, never on the soft fill) and use (solid fill) are visibly different, and use above the request is hatched. Rows read `used N GB at rush`. The bar's three segments are labelled on the bar. The caption states both simplifications (packed tightly vs. the default's spreading; placed afresh vs. running Pods never moving). No money amounts anywhere.
- ac-10 (w-sizing-sandbox, layout and access): four steppers, one switch and a Reset, nothing else; steppers, switch and Reset ≥ 44px; keyboard operable with native controls; a polite live sentence states the count, reserved, used and warnings; desktop reserves its tallest state; under 600px the controls come first and the count heading and bar follow them directly; nothing overflows at 360px.
- ac-11 (s-04, m-07, m-08, k-04, k-05): the lead says Ari's team rents and adds nodes by hand and that requests decide how many nodes Fennel needs; no sentence says or implies that requests create nodes. "Provider" is glossed on first use. k-04 is committed before the sandbox; k-05 after it. The sandbox is introduced as working out how many nodes the requests need, like the scheduler in placing by requests and unlike it in packing tightly; no sentence says the widget simulates the scheduler. A sentence after the sandbox says a Pod bigger than any node never gets placed and needs a bigger node, without naming node pools. The prose names bin packing, says the default scheduler spreads rather than packs and never moves running Pods; the two kinds of unused room take one sentence, followed by D5; per-Pod billing takes at most two sentences and names no provider; Morgan's answer is at most three sentences and doesn't mention the room kept back for the system or the control-plane fee. Survey figures appear only in D5, each with who, when and how.
- ac-12 (s-05): one short paragraph and the quoted question "If we lose a node during the dinner rush, where do its Pods go?". Losing a node is the reason given; the replacements need room on the remaining nodes and wait if there is none; spare nodes are insurance with a cost (the "Keep room to lose a node" switch) and how much is a decision. The section doesn't open with a day as an agent ("Friday showed"). No check.
- ac-14 (s-07, f-04, f-05, k-07): s-07 recalls in a clause that a Pod can use more than it reserves, and introduces limits in one or two plain sentences as the most each copy may use on its node; TERM 03's back line doesn't point at Fig. 04. limits appear as the second block of the same kind of manifest (f-04); f-05 draws reserved (dashed `c4`), cap (solid ink) and used (`c1`) as three differently drawn, end-labelled lines, with three marked kills. The prose names the operating system as what kills and the node agent as what restarts, in place, and links repeated kills to Ch 4's crash loop. Processor over its limit is "slowed", never killed. TERM 03 and TERM 04 render right after first use. The spending-cap aside has a WHERE THIS ANALOGY BREAKS line covering the two caps and "first cut when money runs short".
- ac-15 (s-08, f-06, k-08): the node agent's memory-watching is stated before it evicts anything; eviction is contrasted with the in-place kill and linked to replacement and pending. f-06 is built from `CH05_LOOPS` (Ch 4's format) with the Revision 1 header and column heads, marks changed cells `NEW IN CH 5`, keeps the Ch 7 dashed row and adds a dashed Ch 8 row ("a loop that adds nodes"), and footnotes that the kill is the operating system's.
- ac-16 (s-09, k-09, f-07): Ari's line is quoted above k-09; the model answer is the curriculum's two questions verbatim; the why-lines quote c-23 ("and possibly" the request) and point to W-02; f-07 shows the two patterns side by side, labelled "a common sign of …", with a caption saying it's a rule of thumb, not a test. The recap is five lines; the bridge points to the next chapter without naming a later term.
- ac-17 (all checks): commit-then-reveal, with feedback explaining every option. Options are similar in length and equally measured; the right one is never the longest, and no option repeats a nearby caption. Keys vary: A (k-03, k-08), B (k-02, k-05), C (k-01, k-04, k-07). Every prompt states its own question. No scores.
- ac-18 (precise language and accuracy, page-wide): no guarded term appears (## Shape, vocabulary guard), including "node pool". Every default carries "by default" or "with default settings". The scheduler is never said to look at use, move Pods, or add nodes; nodes are added by Ari's team. No provider is named in the main text; no price appears. Kubernetes kinds are capitalised. Story numbers match R2 everywhere they appear (13 GB, 3.9 cores; the requests; 38 of 65 GB; 19.5 GB). The loop lens is always in CURRICULUM §2.3's Revision 1 wording ("…what does it do when the two differ?"); the phrase "about a gap" doesn't appear.
- ac-19 (disclosures): D1, D2 and D4–D7 exist where listed (no D3), are collapsed by default, and the main text reads correctly with all of them closed.
- ac-20 (references, page-wide; Revision 1 prose rule): no sentence refers to a widget or figure by its ID ("W-01", "W-02", "Fig. 04" as a pointer); widgets are "the following widget" / "the widget above". No bare time stands for an event ("since 03:04"); no "moving day"; no day acts ("Friday showed"); no "Chapter 3 kept its drawings clear". Earlier events are named by what happened.
- ac-21 (repetition; Revision 1): each explanation in ## Shape's "Who owns which explanation" table appears in full only in its owner segment; after lane F, stranded room takes at most two sentences.

## Curriculum recommendations

Recommendations only; this run doesn't edit CURRICULUM.md. Revision 0's R1–R11 were applied after the first ship (Q1–Q3 and R12, the split, are settled: d-03 to d-05). Revision 1 adds the items below; the orchestrator applies them when the chapter ships again (CURRICULUM §8 step 8). CURRICULUM already moved node pools to Ch 8 (§7 Ch 8 entry; the §5 ledger) and reworded §2.3 (d-11).

- **R13 (§7 Ch 8 entry, node pools: what Ch 8 can reuse from Ch 5's cut).** Ch 8's entry already points at Ch 5's s-06, f-03 and k-06. What is reusable, as written in Revision 0 of this plan (`run/history/11-instructional-designer/run/plan/learning-plan.md`):
  - **s-06's problem-first opening:** "if `orders` keeps growing, its request may one day be bigger than any node has room for; such a Pod will never be placed (c-20)". Ch 5 now ends that thought at "it needs a bigger node, which Ari's team would rent by hand"; Ch 8 can pick it up as "and the loop that adds nodes has to know which kind to add", which is where pools earn their place.
  - **s-06's definition and the two cases**, sourced (c-24, c-25 in Ch 5's `research/facts.md`): a group of identical nodes, added, resized and removed as a whole (some providers say "node groups"); a large-memory pool; a spot pool (cheaper, can be taken back at short notice) for work that can be interrupted. In Ch 8 add the missing link #37 asked for: an autoscaler grows and shrinks each pool.
  - **f-03** (a `CLUSTER` frame with a general pool of nodes 01 02 04 05 06, a spot pool, and a dashed large-memory pool "if `orders` outgrows the general nodes"), as a starting drawing; Ch 8 would show the autoscaler adding nodes into a pool.
  - **k-06** (which service stays off a spot pool: `orders`, one copy, key A; `notifications` the tolerable one; "Kubernetes replaces Pods" as the m-05-style trap), reusable as is. §3's "`orders` and `payments` stay off it" goes beyond k-06, which only tested `orders`; keep whichever Ch 8 needs.
  - The pool frame visual grammar (thin `ink-3` frame, mono `NODE POOL · …` header, an unrented pool dashed `c6`) moves with it.
- **R14 (§7 Ch 5 entry):** drop "node pools (different machine types)" from **Ideas** (it still lists them). Add one line: "Node pools moved to Ch 8 (d-12)."
- **R15 (§3 Fennel, Ch 5 facts):** the sentence "**Node pools** (Ch 8's to tell now, Ch 5 d-12): …" is Ch 8's story fact now; move it under a Ch 8 heading when Ch 8 is planned, so Ch 5's facts don't list something Ch 5 doesn't tell. Also: the control-plane fee is no longer named in Ch 5 (#34), so "plus a small per-cluster control-plane fee, named only" becomes "(the control-plane fee is Ch 14's)". Add the sandbox fact: `payments` is adjustable; from Fennel's requests, doubling `payments` to 4 GB doesn't add a node; at 7.5 GB it does.
- **R16 (§7 Ch 14 entry, small):** the control-plane fee is first named in Ch 14 now, not "named only in Ch 5" (Revision 0's R9).
- **R17 (§2, a course-wide prose rule; from #2, #9, #11, #13, #16, #35, #40):** add to §2's prose principles the rule in ## Shape: refer back to an event by what happened, not by a time, nickname or label; refer forward to "the following widget"/"the figure below", not by its ID; a day doesn't "show" anything. Ch 4, 6 and 7 use "since 03:04", "moving day" and widget IDs in prose; they pick it up in their reviews, like d-11.
- **R18 (§2.3 loop lens table):** f-06's header and caption in this chapter now use the Revision 1 wording (`WANTS · SEES · DOES WHEN THEY DIFFER`); copying `CH05_LOOPS` forward to Ch 6 should carry the header with it.
- **R19 (§6 catalog, m-30 note):** the user was surprised that a Pod can use more than it reserves (#41). Ch 5 now says so in §02, before the sandbox shows it; later chapters that use m-30 can assume it.
- **Cut here, for later chapters:** the restaurant-bookings analogy (x-04); an eviction lane and a Tuesday lane; load-aware placement (unresearched); node pools, f-03 and k-06 (Ch 8, R13); the control-plane fee (Ch 14).
