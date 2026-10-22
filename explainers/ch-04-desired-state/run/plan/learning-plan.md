# Learning plan: Say what you want, not what to do: desired state and the reconcile loop (Ch 4, Kubernetes for Technical Managers)

<!-- Written by the instructional designer. Parsed by scripts/check_plan.py. Revision 0 (handoff 02). -->

## Shape

A narrative article that follows Fennel into Year 3, built around **two scrollytelling lanes over one drawing of the cluster**. Lane A, "Moving day", shows what happens when Ari writes down "3 copies of `storefront`" and applies it: the record changes first, then three loops each do one small part. Lane B, "Saturday, 03:04", replays Ch 3's machine failure on Kubernetes: the same loops, plus one new one, close the gap with nobody awake, on an honest clock. Around the lanes sit the short pieces of the model: goals vs. task lists and the manifest before them (o-1), Pods just before lane A, and after lane B what a disposable Pod demands of the app, what the loops can't fix (o-3), who runs which part on a managed service (o-4), and the conversation.

**Why this form.** The chapter's core is a process over time, and a relay at that: work passes from loop to loop through the record. The course's form for a process is the step-locked canvas (B1) as scrollytelling lanes (CURRICULUM §8 step 6). Two lanes instead of one long one is **whole-task simplification with pre-training**: lane A shows the relay on the calm case (creating three Pods), so that the reader has met the ReplicaSet loop, the scheduler and the node agent once each before lane B asks them to hold a dead machine, a five-minute wait and a gap all at once. Lane B then adds exactly one new loop (the node loop) and the clock. Each lane is 5 or 6 steps; a single 11-step lane would lose the reader's place and blur creation with recovery.

**Why no hands-on widget (the user's bar).** I considered a "kill a node" sandbox (B2) on Ch 3's `renderFleet`: the reader taps a node and watches the loops respond. Rejected. The outcome is the same every time, so the tap is *Active* busywork (Ch 3's lesson, d-03), and the learning sits in two moments that need a commitment, not a button: "what exists right after apply?" (k-03, m-04) and "how long until customers can order, and who's awake?" (k-04, local-01). Both are committed predictions in the lanes' step column, gating the steps that answer them. Also rejected: a replicas slider (2 → 5 → 3, the level-based example x-03). It adds an idea (level vs. edge) the reader doesn't need to hold the model; it survives as an optional disclosure (D2). Every interactive element on the page is a check; the canvas itself has no controls.

**The main alternative rejected:** splitting into 4a / 4b. The plan sizes at about 20.25 minutes against d-01's 20 (table below), which is not "well over". Earlier chapters overran their plans by 2–3 minutes, so a 22–23 minute build is plausible; `cut-list.md` `## If it runs long` recovers about 3 minutes without losing an objective, a lane or an owned misconception. If the user wants a split anyway, the clean seam is after s-05 (4a: desired state, the loops and 03:04, ≈ 15 min with a short conversation; 4b: disposable Pods, limits, the control plane and managed services, ≈ 6.5 min plus its own opener). I don't recommend it: 4b would be thin, and the conversation (a crash loop) needs the whole model in one place.

**Honest sizing** (CURRICULUM §2.10). Estimated reader time including thinking, checks and lane steps. Disclosures are optional and not counted (about 0.25 min each if opened).

| Part | Minutes |
|---|---|
| hero + s-01 (cast strip, k-01, Year 3 scene, Ari's line) | 2.0 |
| s-02 (f-01 two documents, k-02, TERM 01, the analogy aside, f-02 manifest and its paragraph) | 3.5 |
| s-03 (Pods: a paragraph, f-03, TERM 02) | 1.0 |
| s-04 lane A, "Moving day" (5 steps, k-03), TERM 03 (payoff) with the loop lens, the helmsman aside | 3.0 |
| s-05 lane B, "Saturday, 03:04" (6 steps, k-04), Ch 1's question answered, f-04 loop lens table, k-05, no single conductor | 4.25 |
| s-06 (k-06, what "disposable" asks of the app, what the loops don't fix) | 2.25 |
| s-07 (f-05 cluster sketch, TERM 04, two paragraphs, k-07) | 2.0 |
| s-08 (k-08, k-09, recap, bridge to Ch 5) | 2.25 |
| **total** | **about 20.25** |

toc: yes — eight h2 sections and a 20-minute read; a rail on desktop and a collapsed "Contents" on mobile, as in Ch 1–3.
tokens: user-provided: Control Plane style guide, `design/control-plane/`. Copy `control-plane.css` to `site/assets/tokens.css`; follow README.md, the tokens.json notes and `components/bundle.css`. Copy Ch 3's page skeleton and `site/assets/page.css` / `page.js` (cast strip `.cp-cast`, disclosure `.cp-more`, checks `.cp-check`, term card `.cp-term` with the payoff variant, `.cp-aside` with `.cp-breaks`, `.cp-quote`, `.cp-recap`, `.cp-machine` / `.cp-ctr` / `.cp-cluster`, the check script and its `didactician:check-commit` event) from Ch 3 as committed (5141855). Never edit Ch 3's files.
mobile: supported. Lanes follow §8 step 6: under 900px one column with the canvas sticky at the top; the canvas is designed to fit in about 360px at 360px wide, and wherever the measured canvas would exceed 50vh (or the viewport is under 560px tall) each step shows its own inline snapshot instead. f-01, f-04 and f-05 re-layout under 600px (stacked), they don't scale.

**Course voice** (style guide): second person, present tense, sentence-case headings, no exclamation marks, no emoji. Status always travels as a word plus colour. **Kubernetes kinds are capitalised as the API spells them** (style guide rule): *Pod*, *ReplicaSet*, *Deployment* (the last only in a caption, as a preview). "node" stays lowercase, as in the Kubernetes docs' prose. The loops are named in plain words: *the ReplicaSet loop*, *the scheduler*, *the node loop*, *the node agent*.

**Vocabulary guard** (brief out_of_scope; ledger §5). This chapter introduces: node (s-01), desired state, declarative vs. imperative, manifest (s-02), Pod (s-03), ReplicaSet lightly, API server, reconcile loop / controller (s-04), self-healing (s-06), control plane (s-07). Allowed with a gloss and a pointer: "the scheduler, the loop that picks a node (Chapter 5)"; "kubelet" once, as engineers' name for the node agent (s-07); "Deployment" once, in f-02's caption ("Chapter 6"); `CrashLoopBackOff` once in s-08 as a status string engineers' dashboards show. **Never in the body:** pending (say "waits"), eviction / evicted (say "removed from the record"), requests, limits, bin packing, node pool, OOM, rolling update, rollback, probe / health check, Service (capitalised), DNS, load balancer, ingress, autoscaling / autoscaler, namespace, RBAC, etcd (D6 only), taint / toleration, level-triggered (D2 only), "IP". "Copy" stays the plain word for one running instance of a service; a Pod is introduced as what Kubernetes calls the thing that holds one copy.

**Precise-language rules** (from the user's Ch 2 and Ch 3 reviews; they bind the builder):
- No sentence whose referent the reader has to guess. No "the picture" or "the figure" without its number. No sentence that sends the reader into a figure to find a label.
- No slogan lines. Say which loop does what, to which record, on which node.
- Don't equate two things in one breath: a *service* is a part of Fennel's app; a *copy* of it runs as a *container* inside a *Pod*; the *record* holds what's *wanted* and what's been *reported*; a *node* is a machine in the cluster.
- Every timing carries "with default settings" or "by default" in the same sentence, and the recovery is "minutes", never "instant" or "seconds".
- Analogies only where they are real analogies, each with a visible WHERE THIS ANALOGY BREAKS line in the same aside. Two in the chapter: the delegated owner (s-02, CURRICULUM's management analogy) and the helmsman (s-04, the project's own name). No thermostat (cut).
- Pedantic caveats go in disclosures; the main text stays true without them.
- Callbacks to earlier chapters only where they do work (k-01; "Sam's choice, made by a loop" in B5; Ch 1's question as the payoff; Ch 3's "what if the record were the thing the machines act on?" answered in s-02). No "last chapter said…; commit before you read" meta lines.

**Fiction vs. sourced.** Fennel's Year 3 move, Ari, moving day, the Saturday 03:04 repeat, the cluster's layout, the Pod names, `storefront:v38`, `notifications` and its missing setting are Fennel fiction (to be recorded as story facts, R2). The clock times in lane B are arithmetic on sourced defaults (x-04), always hedged. Sourced mechanisms: record of intent and desired state (c-01, c-02); imperative vs. declarative, and keeping configuration in version control (c-03); level-based (c-04, D2 only); the API server and the record (c-05); controllers (c-06, c-07, c-08, c-09); node timings (c-10, c-11); the ReplicaSet loop (c-12); the scheduler (c-13); crash-loop back-off (c-14); no room → waits (c-15, medium, hedged); Pods (c-16 to c-19); disposability (c-20); components (c-21); managed services (c-22 to c-24); the name (c-25). From earlier chapters by reference: an image is downloaded before it can start (Ch 2 claims 07, 11); files written inside a container die with it (Ch 2 claim 06); a moved container has a new address (Ch 3 claim 02).

## Research concerns, resolved

How each concern from the researcher's report (handoff 02) is handled:

1. **Orchestrator tension with Ch 3** (c-09). Turned into the m-03 reveal in s-05, after the reader has watched the relay twice. Wording: "Chapter 3 called Kubernetes an orchestrator, for the jobs it does, and it is one. Kubernetes' own documentation adds a warning about the word: it isn't a conductor working through a score ('first do A, then B, then C'); it's 'a set of independent, composable control processes'. 'Centralized control is also not required.'" It pays off Ch 3's conductor aside (whose breaks line promised "how that work is split up is the next chapter"). Not a contradiction: Ch 3 defined the word by *what* gets done; this chapter shows *how*.
2. **The `replicas: 3` snippet** (c-12 note). **Choice: `kind: ReplicaSet`, labelled as shortened, with a visible caption line saying engineers usually write a Deployment, which wraps it and adds version updates (Chapter 6).** Reasons: (a) the kind on the page matches the loop the lanes show (the ReplicaSet loop), so the reader holds one name, not two (a Deployment snippet would put an unexplained kind next to a differently named loop, one more element at the moment the manifest is new); (b) it hands Ch 6 a clean story: "you met the ReplicaSet; engineers wrap it in a Deployment, which manages versions by managing ReplicaSets"; (c) the caption keeps the reader honest for a real conversation: they'll recognise a Deployment in a pull request as "the thing that wraps this". The caption is a condition, not a pedantic caveat, so it stays visible rather than in a disclosure.
3. **Timings are upstream defaults** (c-10, c-11). Lane B's clock kickers read `03:04`, `~03:04:50`, `~03:09:50`, `seconds later`, `~03:10–03:11`; the B2/B3 text says "by default" each time; the payoff says "with default settings, roughly six or seven minutes, sometimes less". D3 ("Can it be faster?") holds the cloud-reports-the-machine-gone path and "engineers can change these waits". No provider-specific claim anywhere; never "instant".
4. **"No room → the Pod waits"** (c-15, medium). Said in two places only, both as "waits": the analogy's breaks line in s-02 ("with no room anywhere, a new copy just waits") and s-06's list of what the loops don't fix ("waits, unplaced, until room appears; Chapter 5 names this"). Never "pending", never a timing.
5. **Cybernetics.** Not used anywhere. The helmsman and "K8s" (c-25) are used in a short aside in s-04 with a breaks line.
6. **x-04 (`orders` down for those minutes).** Used as a teaching point, not hidden: lane B keeps a CUSTOMERS line on the canvas ("can't place orders" from 03:04 until B6), and the payoff after lane B says `orders` had one copy, so it was down while it was replaced: the loop restores, it doesn't prevent; "single point of failure" (Ch 1's term) comes back, and Jordan's question "which of our services run as a single copy?" is planted. The chapter entry's "3 copies of `storefront`" is lane A's (moving day), a different event from 03:04, so both stay consistent with §3's Ch 3 facts.

## Objectives

- o-1: explain declaring a desired state ("3 copies of storefront") vs. issuing commands ("start storefront on machine 04"), using the goals-vs.-task-lists analogy and saying where it breaks; say that applying a manifest records an intention rather than running anything (m-04). — checks: k-02, k-03
- o-2: describe the reconcile loop (observe → compare → act, repeated, by many independent controllers rather than one master brain) and use the loop lens to predict what happens when a Pod or a node dies, including roughly how long it takes and what the loop does not fix (m-03, m-27 revisited, local-01). — checks: k-01, k-04, k-05, k-08
- o-3: explain what a Pod is and why Pods are disposable (replaced, not repaired; a replacement is a new Pod), what that requires of the application, and why endless restarts of a broken app are the loop working, not a fix (m-05, m-06). — checks: k-06, k-08, k-09
- o-4: sketch the cluster (control plane with the API server as the record of intent; nodes running Pods) and say which parts a managed provider runs and which remain the company's. — checks: k-07, k-03

k-01 is the retrieval opener (Ch 3's jobs; it feeds f-04's last column). k-03 also serves o-4 (the API server and the record). k-08 interleaves o-2 (the node agent's loop) with o-3 (m-05). k-09 is the conversation, think-then-reveal.

## Diagnosis

- **Readiness:** novice for infrastructure, intermediate for software. Chunks the reader brings from Ch 1–3: an app is a process on a machine; hand-kept records drift (Sam's notes, Sam's spreadsheet); an image packages a service, a container is a running copy of it, on one machine; a container dies with its machine; downloading an image takes time; a moved container has a new address its callers must learn; the six jobs (placing, restarting, replacing, connecting, updating, scaling); an orchestrator does them all the time across a cluster; Kubernetes is one.
- **Element interactivity: high.** The model only makes sense whole: a record of what's wanted, several loops each comparing one thing in it with what they observe, and work passing between them through the record.
- **Hardest moment:** lane B between 03:04 and 03:10. Naively the reader holds: the dead node, what the record still believes, the node loop's two waits, the gap appearing, the ReplicaSet loop, the scheduler, the node agent and the image download: eight elements. Managed by:
  - **pre-training** (lane A runs the ReplicaSet loop, the scheduler and the node agent on the calm case first, so in lane B each is one known chunk);
  - **one new element per step** in lane B: B1 the record lags reality; B2 the node loop and the first wait; B3 the second wait and the gap; B4–B6 the three known loops, in order;
  - **only the changing loop is highlighted**, the rest at reduced opacity, and the lens line on the canvas names it in the same three blanks every time.
  At most two new elements are live at any step, against the novice limit of 3.
- **Second-hardest:** s-07's cluster sketch: control plane parts, nodes, and three ownership bands. Each part has already been met in the lanes; f-05 only arranges and names them, and draws the control plane as separate loops around the record (no single box above the machines, m-03).
- **Misconceptions confronted** (catalog IDs; one local):
  - **m-04** (owned): k-03 in lane A, predict-then-reveal; A2's text; option A's feedback names the "on a good day you can't see the gap" reason it's tempting.
  - **m-03** (owned): seeded in A5 ("nobody handed anybody a plan"), confronted with k-05 after lane B, then the orchestrator-tension paragraph and D5 (the controller manager objection). f-05 draws no loop-to-loop arrows.
  - **m-27** (revisit): k-04 option B; A5's "release or not"; TERM 03's "forever".
  - **local-01, "self-healing is instant"** (proposed for the catalog, R1): k-04 option C, lane B's clock, the payoff line.
  - **m-06** (owned): k-06, predict-then-reveal right after lane B, then the Pod names in prose.
  - **m-05** (owned): stated fairly in s-06 ("self-healing" is the headline everywhere), predicts wrongly in k-08 (a broken app restarted forever), corrected by s-06's list and the conversation.
- **Retrieval opener:** k-01 (Ch 3's 03:04 jobs: replacing and connecting), CURRICULUM §2.8.
- **Analogies:** the delegated owner (s-02) and the helmsman (s-04), each with a WHERE THIS ANALOGY BREAKS line.

## Disclosures

`<details class="d-more cp-more">`, collapsed by default, all optional; the main text reads correctly with all of them closed.
- D1 (s-01) "I didn't read the last chapter. What happened?"
- D2 (s-02) "What if the goal changes twice in a minute?" (x-03, c-04: Kubernetes heads for the latest goal, 2 → 5 → 3 goes straight to 3; engineers call this "level-triggered")
- D3 (s-05) "Can it be faster than six minutes?" (c-11 note, c-10)
- D4 (s-05) "What about machine 03 itself?"
- D5 (s-05) "But engineers talk about 'the controller manager'" (c-07 note)
- D6 (s-07) "What is the cluster's record, exactly?" (c-05 note)
- D7 (s-07) "What if the control plane itself goes down?" (parking lot, principles.md; one sentence, deferred to Ch 14)

## Segments

### s-01 — Year 3: the same 3 a.m.
intent: Re-establish the cast for readers jumping in, retrieve which of Sam's jobs 03:04 needed, then show the manager's view of Year 3: the same failure, nobody woken, and the question "how?", with Ari's one-line answer as the chapter's thesis.
objectives: o-2
claims: c-21, c-22
readiness: novice · interactivity: low (the cast, two jobs from Ch 3, one new word: node) · max-elements: 3
mode: orientation (cast strip, optional recap) → retrieval (choice) → concrete story (pain seen in meetings, now absent) · blueprint: none
layout:
  contiguity: adjacent. Cast strip and D1 at the top of §01, then k-01, then the scene.
  pacing: continuous
  redundancy: D1 summarises Ch 1–3 in four bullets and doesn't re-teach; k-01's feedback names the two jobs once
  scaffold: D1, collapsed: "I didn't read the last chapter. What happened?"
ux: Glance at the cast strip, optionally open D1, commit to k-01, read four short paragraphs and Ari's quoted line. At 360px the cast strip wraps; options are full width.
figure: none
widget: none
checks: k-01
content: these points, in order:
  - **Cast strip** (three people only): "**Sam**, founding engineer; on call for everything until this year. **Jordan**, co-founder, now managing the engineers: that's you, in this story. **Ari**, platform lead, hired this year to move Fennel onto Kubernetes."
  - **D1, "I didn't read the last chapter. What happened?"** Four bullets: (1) Ch 1: one hand-built server; a full disk took the site down for two hours; rebuilding from Sam's notes failed. (2) Ch 2: each service is packed with everything it needs into an *image*; a running copy is a *container*. (3) Ch 3, Year 2: four services (`storefront`, `orders`, `payments`, `dispatch`) as containers on four machines, tracked in Sam's spreadsheet. One Saturday at 03:04 machine 03 died with `orders` and a `dispatch` copy on it; customers couldn't order until Sam, woken by a page, started them on other machines and told `storefront` where `orders` had gone. (4) Software that does that kind of work all the time is an *orchestrator*; Kubernetes is one.
  - k-01.
  - **Year 3.** Fennel now runs on managed Kubernetes from its cloud provider (c-22): the provider runs Kubernetes' own machinery; Fennel's services run on four machines, numbered 01 to 04 as before. Kubernetes calls each machine in a cluster a **node** (`dfn`, c-21). Ari, hired this year as platform lead, led the move.
  - **The same 3 a.m.** One Saturday at 03:04, machine 03, node 03 now, dies again, with `orders` and a `dispatch` copy on it, as a year ago. Nobody's phone rings. Sam sleeps through it and reads about it at breakfast.
  - **What Jordan sees and asks.** On Monday, Jordan asks Ari how Kubernetes knew what to do. Ari: "Nobody told it what to do. We told it what we want." (`.cp-quote`, cite Ari)
  - **Hand-off:** "This chapter is what that sentence means, and what it doesn't promise."
  - No recovery time is given here (k-04 asks for it).

### s-02 — Say what you want, not what to do
intent: Contrast a task list with a written goal on Fennel's own 03:04 case, name desired state and declarative vs. imperative, give the management analogy with its breaks, and show the short manifest that is Fennel's goal written down, answering Ch 3's "what if the record were the thing the machines act on?".
objectives: o-1
claims: c-01, c-03, c-04, c-14, c-15
readiness: novice · interactivity: medium (a list of steps vs. a list of counts; which survives a different failure) · max-elements: 3
mode: contrasting cases (B4-style, same situation, different structure) → compare check → name (term card) → analogy with breaks → concrete artefact (manifest) · blueprint: B4
layout:
  contiguity: inline. f-01's two halves carry the direct labels "says what to do, step by step" and "says what should be running"; f-02's annotations sit on the lines they explain (right margin on desktop, under the line on mobile).
  pacing: continuous. k-02 comes right after f-01, before the term is named.
  redundancy: the prose doesn't re-read f-01's rows; it says why the difference matters. The analogy aside is about the *owner* who acts on a goal, not a second contrast of the documents.
  scaffold: D2, collapsed: "What if the goal changes twice in a minute?"
ux: Look at f-01, commit to k-02, read two short paragraphs, TERM 01, the analogy aside, then f-02 and one paragraph. At 360px f-01 stacks (task list above goal) and f-02's annotations drop under their lines.
figure: f-01 (Sam's task list vs. Fennel's written goal) and f-02 (the storefront manifest). See ## Figures.
widget: none
checks: k-02
content: these points, in order:
  - Lead: two ways to write down what should happen at 03:04 (f-01).
  - f-01, then k-02.
  - **Name it** (c-03): Sam's list says what to do, step by step; engineers call that **imperative**. Fennel's goal says what should be running and leaves the steps to the system: **declarative**. What a declarative goal describes is the cluster's **desired state** (c-01). The task list fits the night its author pictured; the goal fits any night. **TERM 01** card.
  - **The analogy aside** (`.cp-aside`, ANALOGY): "You know this from managing people. A task list ('call the supplier, then rebook the van') works until reality differs from what you pictured. A goal ('every order out by 6 p.m.') handed to a good owner keeps working: the owner watches one number, notices when it slips and fixes it, without being told how." **WHERE THIS ANALOGY BREAKS:** "Kubernetes' owners have no judgement. They don't ask why copies keep dying, don't push back when a goal can't be met (with no room anywhere, a new copy just waits), don't escalate, and will restart a broken app forever. They act only on the latest goal, not on the history of instructions (D2). In a person that would be a problem; in a machine it's the point." (c-04, c-14, c-15; s-06 and s-08 show the last two)
  - **D2** (c-04, x-03): "If someone changes storefront's goal from 2 copies to 5 and then, a minute later, to 3, Kubernetes doesn't work through 5 first. It compares the latest goal with what's running and heads straight for 3. There's no queue of orders to fall behind on. Engineers call this 'level-triggered'."
  - **The manifest** (c-01, c-03). Fennel's goal is written in files called **manifests** (`dfn`). f-02 is `storefront`'s, shortened. `replicas: 3` *is* the desired state. Teams keep manifests in version control, so every change to the goal is reviewed before it goes in and leaves a history (c-03 note). Ch 3's question, answered in one sentence: "Chapter 3 ended on a question: what if the record were the thing the machines act on, instead of a note about them? With Kubernetes, it is." Don't say what "apply" does yet (s-04's k-03 asks).

### s-03 — Pods: what Kubernetes counts
intent: Introduce the Pod as the unit Kubernetes counts, places and replaces (a wrapper around, usually, one container, with one address), just before lane A needs it.
objectives: o-3
claims: c-16, c-17
readiness: novice · interactivity: low (a wrapper; usually one container; one shared address) · max-elements: 2
mode: name-after-meeting (the container, from Ch 2, wrapped) → small labelled figure → term card · blueprint: none
layout:
  contiguity: inline. f-03's labels name the wrapper and the shared address on the drawing.
  pacing: continuous
  redundancy: one paragraph; f-03's caption adds the takeaway, not a description. Disposability is *not* taught here (s-06).
  scaffold: none
ux: Read one paragraph, look at f-03, read TERM 02. At 360px f-03's two Pods stack.
figure: f-03 (a Pod, and a Pod with a helper). See ## Figures.
widget: none
checks: none
content: these points, in order:
  - "One more word before Ari applies the manifest." Kubernetes doesn't count or place containers directly. It wraps each copy's container in a **Pod** (c-16, c-17), and counts, places and replaces Pods. Most Pods hold one container, so in conversation "Pod" and "container" are often used for the same thing. Sometimes a small helper container rides along in the same Pod; the containers in a Pod always run together on one node and share one address.
  - f-03.
  - **TERM 02** card. Back line: "Chapter 2's container, wrapped."
  - The word: "as in a pod of whales, or a pea pod" (c-16) can sit in the card's back line or be dropped; builder's call.

### s-04 — Moving day: what "apply" does
intent: Show, step by step, that applying a manifest writes an intention into the cluster's record and that separate loops then each do one small part, reading and writing the record; then name the pattern (reconcile loop, controller) and introduce the course's loop lens.
objectives: o-1, o-2, o-4
claims: c-01, c-02, c-05, c-06, c-08, c-12, c-13, c-21, c-25
readiness: novice · interactivity: high (the record; a loop comparing wanted with what exists; work passing between loops through the record) · max-elements: 3
mode: predict (m-04) → step-locked worked example (scrollytelling, B1) → name-after-meeting (payoff term card) → the lens as a reusable question → short analogy aside · blueprint: B1
layout:
  contiguity: sticky. The canvas stays in view while lane A's steps scroll beside it (desktop) or beneath it (mobile). The active loop's lens line ("watching … → doing …") is printed on the canvas, and the record row it changes is highlighted at the same time, so cause and effect are both visible without arrows.
  pacing: step-revealed by scrolling; A2–A5 gated on k-03.
  redundancy: step text says what changed and why it matters; it doesn't read the canvas aloud. One or two sentences per step.
  scaffold: none in the lane. The helmsman aside after TERM 03 is optional reading but not collapsed (it carries the name).
ux: Read A1, commit to k-03 (three options) in the step column, scroll A2–A5. Then read TERM 03 and the lens line, and the aside. At 360px the canvas is sticky at the top (or inline per step where it wouldn't fit in 50vh); steps scroll beneath. No horizontal scroll.
figure: TERM 03 (payoff variant) with the lens line under it. See ## Figures.
widget: w-cluster-scrolly (complexity: high) — lane A, "Moving day", 5 steps, gated on k-03
checks: k-03
content: lane A's steps are specified under ## Widgets (w-cluster-scrolly `shows:`). After the lane:
  - **Name the pattern** (c-06, c-07 lightly). "Each of those loops did the same three things: looked at the record and the cluster, compared what's wanted with what's there, and acted to close the gap. Then it went back to looking." That's a **reconcile loop** (`dfn`); a **controller** (`dfn`) is a part of Kubernetes that runs one, for one kind of thing. One pass is "reconciling". The scheduler and the node agent work the same way, though engineers don't usually call them controllers.
  - **TERM 03** (payoff variant, blueprint ground): see ## Figures.
  - **The loop lens.** "From here on, whenever Kubernetes does something, ask three things: which loop, watching what, doing what? The lines on the drawing in §04 already used them." One sentence each on why it works: every feature in later chapters is another loop.
  - **The helmsman aside** (`.cp-aside`, ANALOGY; c-25): "The name fits. Kubernetes is Greek for helmsman or pilot. A helmsman doesn't plot every wave: they hold a heading and correct the wheel whenever the ship drifts. (Engineers write K8s: K, the eight letters in between, s.)" **WHERE THIS ANALOGY BREAKS:** "A ship has one helmsman. A cluster has many loops, each holding its own small heading, and no captain giving them orders. And a helmsman reads the weather; a loop only compares two numbers." No cybernetics.

### s-05 — Saturday, 03:04, again
intent: Replay Ch 3's failure on Kubernetes: the reader predicts the recovery time, then watches each loop take its step on an honest clock (with default settings), sees Ch 1's question answered as "minutes, and nobody", sees that `orders` was down while it was replaced, and confronts the idea of a central brain (m-03).
objectives: o-2
claims: c-07, c-08, c-09, c-10, c-11, c-12, c-13, c-21
readiness: novice · interactivity: high (the record lagging reality; the node loop's two waits; the gap; the three known loops in order; the clock) · max-elements: 3
mode: predict (local-01, m-27) → step-locked worked example (scrollytelling, B1; the three lane-A loops are now known chunks) → payoff → consolidation table (the lens) → explain-check (m-03) → reveal paragraph · blueprint: B1
layout:
  contiguity: sticky, as in s-04. The clock kicker sits on the canvas header and on the step card. The CUSTOMERS line on the canvas shows reality next to the record's view.
  pacing: step-revealed; B2–B6 gated on k-04. k-05 comes after f-04.
  redundancy: B-step text doesn't repeat what lane A explained about the three known loops; it says what's different this time (why the wait, what the scheduler had to choose). f-04 consolidates, and the prose after it doesn't re-list the loops.
  scaffold: D3 "Can it be faster than six minutes?", D4 "What about machine 03 itself?", D5 "But engineers talk about 'the controller manager'", each collapsed
ux: Read B1, commit to k-04, scroll B2–B6. Read the payoff (a short quoted callback), look at f-04, commit to k-05, read two short paragraphs. At 360px: the canvas as in s-04; f-04 becomes stacked cards.
figure: f-04 (the loop lens table). See ## Figures.
widget: w-cluster-scrolly (complexity: high) — lane B, "Saturday, 03:04", 6 steps, gated on k-04
checks: k-04, k-05
content: lane B's steps are specified under ## Widgets. After the lane, in order:
  - **Ch 1's question, answered** (a `.cp-quote`-style callback, then one paragraph). "If this box vanished tonight, how long until we're back, and who has to be awake?" Year 3's answer: with default settings, roughly six or seven minutes, sometimes less; and nobody (c-10, c-11). Then: `orders` was down for those minutes because it runs as a single copy, Chapter 1's single point of failure. The loops restore what's declared; they don't prevent the gap. A question worth asking Ari: "Which of our services run as a single copy?"
  - **D3, "Can it be faster than six minutes?"** (c-11 note, c-10): "It can be. In a cloud, Kubernetes asks the provider whether a silent machine still exists; if it's gone, its Pods are cleaned up without the full five-minute wait. Engineers can also shorten or lengthen the waits, per service. Fennel's numbers here are the defaults. The wait exists because a network glitch looks the same as a dead machine, and replacing too eagerly would run two copies where one was wanted."
  - **D4, "What about machine 03 itself?"**: "Kubernetes replaced the Pods, not the machine. Until a machine is added back, the cluster has three nodes and less spare room. Chapter 5 is about that room."
  - **f-04**, the loop lens table, introduced with one sentence: "Here are the loops you've watched, in the lens's three blanks, with the job of Sam's each one took over."
  - k-05.
  - **No single conductor** (c-07, c-08, c-09): "No part of Kubernetes made a plan for 03:04. The node loop didn't know what a ReplicaSet was; the ReplicaSet loop didn't know why its Pods had gone; the scheduler didn't know there had been a failure. Each read the record, did its one job and wrote the result back, and the next loop picked it up from there. That's how the work is split." Then the orchestrator paragraph (Research concerns §1 wording), quoting c-09 twice, and one sentence on why it's built this way: "simple controllers rather than one, monolithic set of control loops", so one can fail without stopping the rest (c-07).
  - **D5, "But engineers talk about 'the controller manager'"** (c-07 note): "They do. Kubernetes' built-in controllers ship together as one program, to keep things simple to run. Inside it, each controller is still a separate loop watching its own kind of thing, like teams sharing an office building. The scheduler and the node agents are separate programs again."
  - **m-27 closer** (one sentence): none of this needed a release or anyone applying anything; the loops were running all along.

### s-06 — Replaced, not repaired
intent: Confront m-06 (a Pod moves) and m-05 (Kubernetes makes the app reliable by itself): a replacement is a new Pod; say what "disposable" asks of the application; list what the loops can't fix.
objectives: o-3
claims: c-14, c-15, c-18, c-19, c-20
readiness: novice · interactivity: medium (new Pod vs. moved Pod; what dies with a Pod; what the app must tolerate) · max-elements: 3
mode: predict (m-06) → explanation with concrete names → requirements list (supportive information) → misconception confrontation (m-05) with three concrete limits · blueprint: none
layout:
  contiguity: adjacent. k-06 opens the section; the Pod names appear in the sentence right after its reveal.
  pacing: continuous
  redundancy: the four requirements are a short list, each one line; the limits list points to the chapters that own each, without teaching them.
  scaffold: none
ux: Commit to k-06 (two options), read three short paragraphs and two short lists. At 360px everything stacks.
figure: none
widget: none
checks: k-06
content: these points, in order:
  - k-06.
  - **A new Pod** (c-19, c-18). Ari's dashboard showed `orders-5c8x` on node 03 on Friday, and `orders-q2rw` on node 04 since 03:10 (fiction names; replacements get new generated names). A Pod is never moved; it's replaced by a new one made from the same template, with a new name, a new address, and nothing from inside the old one. That's why Kubernetes treats Pods as disposable: people rarely create them by hand; a controller makes them, and each lasts until it's finished, removed, or its node fails. The new address is why `storefront` needed another loop to find it (Chapter 7, already noted in B6).
  - **What "disposable" asks of the app** (c-20, Ch 2 stateless). Introduced as the twelve-factor app's "disposability", a checklist engineers will recognise. Four lines:
    - keep nothing important inside the Pod (Fennel's orders live in its database, outside the app, as Chapter 2 said; where that database should run is Chapter 10);
    - survive being stopped or replaced at any moment;
    - start in seconds, not minutes (the start time adds to every replacement's gap);
    - finish in-flight work when asked to stop (Kubernetes gives a Pod 30 seconds by default).
    One sentence: these are the app's job, not Kubernetes'; they're the questions to ask when a service moves onto the cluster.
  - **Self-healing, honestly** (m-05). State it fairly: "Vendors call what you watched at 03:04 **self-healing** (`dfn`), and after last year's 3 a.m. pages it's easy to hear 'Kubernetes makes our app reliable'." Then the correct model: the loops restore the declared state: they restart crashed containers and replace Pods from dead nodes. What they can't do, three lines:
    - **fix a bug**: an app that crashes on start is restarted, and crashes again, forever (§08 shows this) (c-14);
    - **find room that isn't there**: with no node that has room, a new Pod waits, unplaced, until room appears; Chapter 5 names this (c-15);
    - **bring back what was inside a Pod**: anything written there is gone with it (c-19; Chapter 10).
    And the one from 03:04: a single copy is down while it's replaced.
  - Closing line: "Kubernetes heals the count. Whether the app is healthy is still your engineers' work." (Not a slogan: it's the claim; the builder may reword.)

### s-07 — Who runs what
intent: Assemble what the reader has met into a sketch of the cluster (the control plane: the API server in front of the record, the scheduler and the controllers; the nodes: node agents and Pods), name the control plane, and say what a managed provider runs and what stays Fennel's.
objectives: o-4
claims: c-05, c-21, c-22, c-23, c-24
readiness: novice · interactivity: medium (control plane vs. nodes; three ownership bands) · max-elements: 3
mode: labelled structure figure (every part already met) → term card → apply check · blueprint: none
layout:
  contiguity: inline. f-05 labels each part with the same name the lanes used; the ownership bands are labelled on the drawing ("run by your provider", "yours in standard mode", "always yours").
  pacing: continuous
  redundancy: the prose adds what f-05 can't (why every loop goes through the API server; what "mode" means); it doesn't list the boxes.
  scaffold: D6 "What is the cluster's record, exactly?", D7 "What if the control plane itself goes down?", collapsed
ux: Look at f-05, read two short paragraphs and TERM 04, commit to k-07. At 360px f-05 stacks vertically (control plane above, nodes below, "always yours" strip last).
figure: f-05 (the cluster: control plane, nodes, and who runs each) and TERM 04. See ## Figures.
widget: none
checks: k-07
content: these points, in order:
  - Lead: "You've now met every part of a cluster a manager needs by name." f-05.
  - **The control plane** (c-21, c-05). The record and the loops that work on it, apart from the node agents, are the **control plane** (`dfn`, TERM 04). In front of the record sits the **API server** (`dfn`; met in lane A as the front door): everything that reads or writes the record goes through it, people applying manifests and every loop alike. The node agent on each node is called the kubelet by engineers; it starts what's assigned to its node and reports back.
  - **TERM 04** card.
  - **Managed** (c-22, c-23, c-24). On a managed service, the provider runs the whole control plane in every mode, and upgrades its Kubernetes version. Who looks after the nodes depends on the mode: in each big provider's standard mode, the customer does (Fennel: Ari's team); in fully managed modes, the provider does. Either way, Fennel pays for the machines its Pods run on, and always owns the workloads: what goes into the record, its images and code, its data, who may change what, and watching and answering alerts. One sentence on self-hosting (CURRICULUM §2.5): without a managed service, Fennel's team would run the control plane too, and keep the record safe.
  - **D6** (c-05 note): "Engineers often call it etcd, after the software usually used for it; some providers store it differently. Only the API server reads and writes it; every loop goes through the API server."
  - **D7** (parking lot, principles.md): "Running Pods keep running, but no Pod is replaced or placed until it's back: each part keeps doing what it was last told. What providers promise about this is Chapter 14." (Uses only the principles quote; no SLA claim.)
  - k-07.

### s-08 — The conversation
intent: Rehearse the chapter's discussion move on a crash loop: predict what the loops do with an app that can't start, then form the manager's questions; recap the model and turn to Chapter 5.
objectives: o-2, o-3
claims: c-14
readiness: novice · interactivity: low (one loop, one broken app, the back-off) · max-elements: 3
mode: predict (m-05) → think-then-reveal (apply: the questions to ask) → recap → bridge · blueprint: none
layout:
  contiguity: adjacent. Ari's line is a quoted line directly above k-09.
  pacing: continuous
  redundancy: the recap is four lines and doesn't re-explain
  scaffold: none
ux: Read a two-sentence scene, commit to k-08, read Ari's line, think, reveal k-09, read the recap and the bridge. At 360px everything stacks.
figure: none
widget: none
checks: k-08, k-09
content: these points, in order:
  - **Scene.** Fennel's newest service, `notifications`, sends order texts and emails (introduced here; it can lag without disaster). On Wednesday, a setting it needs goes missing, and every time its container starts, it crashes within seconds. k-08.
  - One sentence after k-08: engineers' dashboards show this state as `CrashLoopBackOff`; the docs' own example shows a Pod at 200 restarts over two days (x-05).
  - **Ari's line** (`.cp-quote`): "notifications keeps crash-looping, but Kubernetes keeps restarting it." Then k-09 (think, then reveal).
  - **Recap**, four lines:
    - "With Kubernetes you write down what you want, the desired state, in manifests. Applying one records the intention; it doesn't run anything."
    - "Many small loops each compare one part of the record with what they observe, and act to close the gap, forever. No part plans for the others; work passes between them through the record."
    - "Kubernetes runs Pods, and Pods are disposable: a dead node's Pods are replaced by new ones, in minutes with default settings, with nobody awake. The app has to tolerate that, and the loops can't fix a broken app."
    - "Your provider runs the control plane. What goes into the record, and whether your app survives being replaced, stays yours."
  - **Bridge** (forward-looking, Part II): "From here on, every chapter asks the same three things: which loop, watching what, doing what? Next: Morgan opens the first cloud bill since the move, and it's gone up. The loop that picked node 04 for `orders` is where that story starts."

## Figures

Simple figures are drawn by the page builder as figure plates (Control Plane `Figure` treatment: mono header bar, blueprint ground, direct labels, numbered caption), following ## Visual grammar. All re-layout under 600px rather than scale; text is never below 13px.

### f-01 — Sam's task list and Fennel's goal (s-02)
- **Model.** Two documents side by side, the same 03:04 situation written two ways.
  - Left, header `SAM'S TASK LIST · AFTER 03:04, YEAR 2`, drawn as a **dashed, unfilled list with step numbers** (Ch 3 f-02's "commands typed" grammar, which the user asked to keep distinct from things that run): `1  Start orders on machine 04.` `2  Start the lost dispatch copy on machine 02.` `3  Change storefront's settings: orders is on 04.` `4  Update the spreadsheet.` Direct label above: "says what to do, step by step".
  - Right, header `FENNEL'S GOAL · WRITTEN FOR THE CLUSTER`, drawn in the **record grammar** (`c4` outline on `c4-soft`, mono rows): `storefront  3 copies` · `orders  1 copy` · `payments  2 copies` · `dispatch  3 copies`. Direct label above: "says what should be running".
  - No arrows; no status colours.
- **Caption (takeaway).** "Fig. 01. The task list is right only for the night its author pictured. The goal names no machines, so it holds whichever one fails."
- **Size.** Desktop `.d-wide`, two columns, about 240px tall. Under 600px stacked (task list first), about 480px at 360px.
- **Reuse.** The right half's row style is the record panel in w-cluster-scrolly and f-05: the same look means "a written intention" everywhere in the chapter.

### f-02 — The storefront manifest (s-02)
- **Model.** A figure plate, header `FIG. 02 · A MANIFEST · STOREFRONT`, holding a code block (mono, `c4-soft` ground to match the record grammar) with these lines, nothing more:
  ```
  kind: ReplicaSet
  metadata:
    name: storefront
  spec:
    replicas: 3
    template:
      # … labels and other details left out
      spec:
        containers:
        - name: storefront
          image: storefront:v38
  ```
  Annotations (direct labels; right margin on desktop, under the line on mobile): `kind: ReplicaSet` → "the kind of record: a set of identical copies"; `replicas: 3` → "**the desired state: three copies**" (the plate's one accent mark); `template:` → "what each copy is"; `image:` → "the image to run (Chapter 2)".
- **Caption.** "Fig. 02. A manifest is a written intention, not a list of steps. Shortened: real ones have a few more lines. Engineers usually write a Deployment, which wraps this and adds version updates; Chapter 6 shows how." (The caption carries the Deployment condition, per Research concerns §2.)
- **Size.** Measure width (not wide), about 280px tall desktop; at 360px the block fits without horizontal scroll (longest line ≤ 28 characters at 13px mono) and annotations sit under their lines, about 420px.
- **Reuse.** Ch 6 retrieves it ("the ReplicaSet you met in Chapter 4") and adds the Deployment around it.

### f-03 — A Pod (s-03)
- **Model.** Two Pods side by side, drawn in the Pod grammar (## Visual grammar): an `ink` outer frame (the Pod), mono header `POD`, holding container chips (`c1` on `c1-soft`, Ch 2's chip).
  - Left (full weight): one chip `storefront`; label on the frame: "one container: the usual case"; a mono tag on the frame edge `1 ADDRESS`.
  - Right (smaller, `ink-3` labels): two chips, `app` (size 2) and `helper` (size 1); label: "sometimes a small helper rides along"; the same `1 ADDRESS` tag, with "shared by both".
- **Caption.** "Fig. 03. Kubernetes counts, places and replaces Pods. The containers in a Pod always run together, on one node, at one address."
- **Size.** Measure width, about 180px tall; stacked under 600px, about 320px.
- **Reuse.** The Pod frame is how Pods look on the canvas; Ch 12 (helper containers) can reuse it.

### f-04 — The loop lens (s-05)
- **Model.** A table inside a figure plate, header `FIG. 04 · WHICH LOOP, WATCHING WHAT, DOING WHAT`. Columns `LOOP` (each with the `↻` loop mark in `c3`), `WATCHING`, `DOING`, `SAM'S JOB, NOW A LOOP'S`. Rows, in the order they acted at 03:04:
  1. **Node loop** · every node's regular check-ins · marks a silent node unknown; after a wait, removes its Pods from the record · *noticing a dead machine*
  2. **ReplicaSet loop** · Pods wanted vs. Pods in the record, per ReplicaSet · writes new Pod records, or removes extras · *replacing*
  3. **Scheduler** · Pods with no node · picks a node with room for each (Chapter 5) · *placing*
  4. **Node agent**, one per node · Pods assigned to its node · downloads the image, starts the containers, restarts any that crash, reports back · *restarting*
  5. (dashed row, `ink-3`) **Another loop, Chapter 7** · where each service's Pods are running · keeps callers' routes current · *connecting*
  Footer line: "Updating and scaling are loops too: Chapters 6 and 8."
- **Display.** Direct labels; the job names in the last column in k-01's and Ch 3's exact words. No status colours.
- **Caption.** "Fig. 04. Each of Sam's 3 a.m. jobs is now a loop's, and each loop does only its own."
- **Size.** Desktop `.d-wide`, about 300px tall. Under 600px: five stacked cards (loop name as mono header; three labelled lines), about 640px at 360px.
- **Reuse (high).** Build from a data array (`CH04_LOOPS` in `assets/page.js`: `{ loop, watching, doing, job, chapter? }`). Every later chapter's "loop lens" can add rows: Ch 5 scheduler detail, Ch 6 Deployment loop, Ch 7 the connecting loop filled in, Ch 8 the two autoscalers, Ch 11 the admission gate, Ch 13 operators. Recommend copying it forward (R12).

### f-05 — The cluster, and who runs what (s-07)
- **Model.** One plate, header `FIG. 05 · CONTROL PLANE AND NODES`.
  - **Top band**, labelled on the band `CONTROL PLANE · RUN BY YOUR PROVIDER, IN EVERY MODE`: the record (a `c4` document panel, label "the cluster's record") with a bar on its front edge labelled `API SERVER`; around it, three separate `c3` loop pills: `↻ ReplicaSet loop`, `↻ node loop` (these two in a thin `ink-3` dashed outline labelled "controllers"), `↻ scheduler`. Each pill has one short two-headed connector to the API server bar; **no connectors between loops** (m-03).
  - **Bottom band**, labelled `NODES · YOURS IN STANDARD MODE; THE PROVIDER'S IN FULLY MANAGED MODES`: four node frames `NODE · 01`–`04`, each with a `↻ agent` tag on its bar and two or three small Pod frames; each agent has a connector up to the API server bar. A small person mark is *not* drawn; instead, one more connector from outside the band labelled "Ari: applies manifests" reaches the API server.
  - **Side strip** (bottom on mobile), labelled `ALWAYS YOURS`: "what goes into the record · your images and code · your data · who may change what · watching alerts".
- **Display.** Direct labels only. Connectors with the kit's `arrow.js` (two-headed), ending on the API server bar's edge. The control plane must not read as one box above the machines: it's a record with separate loops around it.
- **Caption.** "Fig. 05. Every part talks only to the API server, and through it to the record. The provider runs everything in the top band; what goes into the record is always yours."
- **Size.** Desktop `.d-wide`, about 420px tall. Under 600px a stacked variant (control plane, then four nodes as a 2×2 grid, then ALWAYS YOURS), with connectors redrawn vertically, about 760px at 360px.
- **Reuse.** Ch 11 (the admission gate in front of the API server), Ch 14 (shared responsibility; the bands are its starting point).

### Term cards — `.cp-term` (s-02, s-03, s-04, s-07)
Ch 3's treatment, unchanged (course convention, CURRICULUM §8 step 4): outlined plate, mono `accent` kicker `NEW TERM · 0N / 04`, the term large in the heading face, one definition sentence, a mono `ink-3` back line. The prose's first use is a `dfn` with `aria-describedby` pointing to the card.
- **TERM 01 · desired state** (s-02). Definition: "What you want running, written down: 'storefront: 3 copies'. Kubernetes keeps working to make the cluster match it." Under the definition, a mono line: "declarative: say what you want · imperative: say what to do". Back: "You met it in Fig. 01: Fennel's goal."
- **TERM 02 · Pod** (s-03). Definition: "The wrapper Kubernetes puts around one container, or a few that must run together. It counts, places and replaces Pods." Back: "Chapter 2's container, wrapped."
- **TERM 03 · reconcile loop · controller** (s-04), **payoff variant** (blueprint ground; the chapter's only one). Definition: "A loop that compares what the record says is wanted with what it observes, acts to close the gap, and does it again, forever. A controller runs one, for one kind of thing." Under it, in mono, the lens: "which loop · watching what · doing what". Back: "You met three on moving day."
- **TERM 04 · control plane** (s-07). Definition: "The cluster's record and the loops that work on it, behind the API server. On a managed service, your provider runs it." Back: "You met each part in §04 and §05."

## Visual grammar

Extends Ch 1–3's grammar (CURRICULUM §5 Visuals column), which is unchanged. The rule from the user's Ch 3 review drives every new item: **things different in kind look different.** Three kinds matter in this chapter: a written intention, a running thing, and an actor.

- **Node** = Ch 3's machine frame; the bar reads `NODE · 03`. (s-01 says a node is a machine in the cluster; the frame doesn't change.)
- **Pod** = Ch 3's container chip (`c1` stroke on `c1-soft`, height by size, label = service) **inside a thin `ink` ring at a 2px offset**: the wrapper from f-03. Status words as in Ch 3 (RUNNING `good`, LOST `bad`, CRASHED `bad`), plus:
  - **NOT STARTED** (`ink-3`): assigned to a node, not running yet. Drawn **dashed `c1` stroke, no fill, no lamp**: a written thing, not a running one.
  - **STARTING** (`warn`): the node agent is downloading the image and starting it.
- **Running vs. written:** solid with a lamp = running; dashed with no fill = exists only as a record. This is the single cue the reader needs for m-04.
- **The record** (a written intention) = a panel in **`c4` stroke on `c4-soft`** (paper), header `THE CLUSTER'S RECORD · API SERVER`, mono rows, one per service: `storefront  WANT 3  ▪▪▪  3 RUNNING`.
  - One mark per Pod record: filled square (`good`) = the record says running; hollow dashed square = recorded, not running; `?` in `warn` = on a node marked unknown.
  - A row word at the end: `n RUNNING`, or `SHORT n` (`warn`) when there are fewer Pod records than wanted. (A row with matching marks and nothing running reads `0 RUNNING`, never `OK`.)
  - f-01's goal and f-02's code ground use the same `c4`, so "written" has one colour everywhere in the chapter.
- **A loop** (an actor) = a **`c3` pill** (`radius-3`, `c3` stroke on `c3-soft`) with a typographic `↻` and its name: `↻ ReplicaSet loop`, `↻ scheduler`, `↻ node loop`. The node agent is a small `↻ agent` pill on each node's bar.
  - Inactive loops at 0.35 opacity; the acting loop at full ink with the step highlight (3px `ink` outline).
  - Under the pills, the **lens line** for the acting loop, mono: `WATCHING · storefront: 3 wanted, 0 Pods` / `DOING · writes 3 new Pod records`.
- **Reality vs. the record.** A dead machine is Ch 3's DOWN frame (dashed `ink-3`; its Pods LOST at reduced opacity), drawn the moment it dies. What Kubernetes *believes* appears only in the record panel and on the node bar: `03 · UNKNOWN` (`warn`) once the node loop marks it. A **CUSTOMERS** note line under the nodes carries what customers experience (`can't place orders` in `bad`; `can order` in `good`).
- **Clock kicker** on the canvas header and the step card: `03:04`, `~03:04:50`, `~03:09:50`, `SECONDS LATER`, `~03:10–03:11`. The `~` is part of the hedge.
- **Connection note** (Ch 3): `storefront → orders: node 04`, with `kept current by another loop (Ch 7)` in `ink-3`.
- **Step highlight** (Ch 3): 3px `ink` outline on what changed in that step, for that step only. Cause and effect are shown by highlighting the acting loop and the record row or Pods it changed together; **no arrows on the canvas**.
- **Task list** (f-01) = dashed, unfilled, numbered list: Ch 3 f-02's "commands typed" grammar, extended to "instructions written".
- **Term card** `.cp-term` as in Ch 3.

## Widgets

### w-cluster-scrolly
segment: s-04, s-05
complexity: high
blueprint: B1 (step-locked canvas as scrollytelling), two lanes, gated on k-03 and k-04
model: One data-driven drawing of a four-node cluster plus the record and the loops, rendered from a **complete state snapshot per step** (Ch 3's format, extended), so scrolling back to any step restores exactly that state. All data and every reader-visible string live in `data.js`; `renderCluster(el, state, opts)` draws one snapshot.
  - **Nodes** `01`–`04`, capacity 6 room units each (Ch 3's unit; Ch 3's D2 already said one number stands for memory and processor, so no new disclosure).
  - **Services** (size · copies wanted): `storefront` 2 · 3, `orders` 3 · 1, `payments` 1 · 2, `dispatch` 1 · 3 (Ch 3's).
  - **Layout by the end of lane A** (= Ch 3's Monday layout, so the two Saturdays can be compared): 01: storefront, storefront, payments (1 free); 02: storefront, dispatch, dispatch (2 free); 03: orders, dispatch (2 free); 04: payments (5 free). The prose never claims the scheduler would choose this; how it chooses is Chapter 5.
  - **Mechanism rules (claims):** applying writes the service's row into the record and nothing else (c-01, c-02); the ReplicaSet loop compares WANT with the number of Pod records and writes new ones (no node) or removes extras (c-12, c-08); the scheduler writes a node into each Pod record with none, only on nodes with room for the whole Pod and not marked unknown (c-13; Ch 3's "fits whole on one machine"); a node agent starts Pods assigned to its node, downloading the image first if the node lacks it, and reports RUNNING back (c-21, c-08 note; Ch 2 claim 07); the node loop marks a node unknown after 50 s without check-ins by default (c-10), and after a further 5 minutes by default the node's Pods are removed from the record (c-11); Pods on a dead node keep their marks in the record until then (the record lags reality).
  - **Snapshot format** (extends Ch 3's `data.js` header; document it there):
    - `nodes { '01': ['sf1', 'pa1'], … }`, entries `'id'` or `'id:status'`, status one of `running | lost | crashed | notstarted | starting` (Ch 3's `newaddr` and `stopped` stay supported but unused);
    - `down ['03']` physical death (dashed frame, LOST Pods);
    - `nodeStatus { '03': 'unknown' }` what the record says about a node;
    - `record { rows: ['orders', 'payments', 'dispatch', 'storefront'], want: { storefront: 3, … }, pods: { storefront: ['sf1', 'sf2', 'sf3'], … } }`: the Pod records per service; each mark's look is **computed** (in `nodes` and running on a node not marked unknown → filled, even if the node is physically down; in `nodes` but `notstarted`/`starting`, or absent from `nodes` → hollow; on a node marked unknown → `?`); the row word is computed (`SHORT n` if `pods.length < want`, else `n RUNNING`);
    - `loops { shown: ['rs', 'sched', 'node'], active: ['sched'], agents: ['01', '02'], lens: { watching, doing } }`;
    - `notes [{ id, label?, text, tone? }]` (CUSTOMERS line, connection line), `clock 'string'`, `banner?` (Ch 3's);
    - step fields as Ch 3: `id, kicker?, text[], ariaLabel, gate?, highlight[]` with highlight keys `'p:<pod>'`, `'n:<node>'`, `'row:<service>'`, `'loop:<id>'`, `'agent:<node>'`, `'note:<id>'`, `'lens'`.
  - **Room left for later chapters (designed now, unused here):** `nodes` may gain or lose keys between steps (Ch 8 adds nodes); Pod status `waiting` with no node and a row word `WAITING · NO ROOM` (Ch 5); `version` per Pod and more than one row per service (Ch 6: old and new ReplicaSet under one Deployment row); `restarts { podId: n }` shown as `↻ 14` on a chip, with a `CRASHED` / `RESTARTING` cycle (Ch 12); a second note type listing a service's current Pod addresses (Ch 7). None of it is visible in this chapter.
reader_does: Scrolls through two lanes. In lane A commits to k-03 (three options) in the step column; in lane B commits to k-04 (three options). Each commit unlocks the steps after it. Any option unlocks; the check's feedback explains a wrong pick. The canvas has no controls.
shows: Each step's canvas state, what changes, and its text (draft wording; one or two sentences each). Canvas header: `W-01 · THE CLUSTER`, the lane name (`MOVING DAY` / `SATURDAY, 03:04`), the clock kicker in lane B, and `STEP n / N`.
  - **Lane A, "Moving day"** (Year 3; `orders`, `payments` and `dispatch` already run on the cluster; `storefront` is the last service to move)
    - **A1.** Nodes: 01 payments; 02 dispatch ×2; 03 orders, dispatch; 04 payments, all RUNNING. Record rows for orders (WANT 1, 1 RUNNING), payments (2), dispatch (3); no storefront row. Loops `↻ ReplicaSet loop` and `↻ scheduler` shown, inactive; agent pills on each node, inactive. Text: "Moving day. `orders`, `payments` and `dispatch` already run on Fennel's cluster. `storefront` is the last to move. Ari applies its manifest, Fig. 02, and the tool answers `created` in under a second." Then **k-03**.
    - **A2 (gated on k-03).** The record gains `storefront  WANT 3  (no marks)  SHORT 3` (highlighted); nodes unchanged. Text: "The manifest went to the cluster's API server, its front door to the record. The API server checked it and wrote it down. That's all `created` means: Fennel's intention is recorded. Nothing new is running anywhere." 
    - **A3.** `↻ ReplicaSet loop` active. Lens: `WATCHING · storefront: 3 wanted, 0 Pods` / `DOING · writes 3 new Pod records`. The storefront row gains three hollow marks, `0 RUNNING` (highlighted). Text: "Within seconds the ReplicaSet loop notices the row: three wanted, none recorded. It writes three Pod records. It doesn't pick nodes or start anything; that's other loops' work."
    - **A4.** `↻ scheduler` active. Lens: `WATCHING · Pods with no node` / `DOING · writes a node into each: 01, 01, 02`. Three dashed NOT STARTED storefront Pods appear on 01 (two) and 02 (one) (highlighted). Text: "The scheduler sees three Pods with no node and writes one into each record, choosing nodes with room. How it chooses is Chapter 5. It doesn't start anything either."
    - **A5.** Agents on 01 and 02 active. Lens: `WATCHING · Pods assigned to this node` / `DOING · download the image, start the container, report back`. The three Pods go STARTING then RUNNING (one state is enough: RUNNING, with the step text naming the download); the row reads `▪▪▪ 3 RUNNING`. Text: "On nodes 01 and 02, the node agent sees Pods assigned to its node, downloads the `storefront` image, starts the containers and reports back. Now the record matches. Nobody handed anybody a plan: each loop read the record and wrote to it. And they keep watching, release or not."
  - **Lane B, "Saturday, 03:04"** (starts from A5's state)
    - **B1 · 03:04.** Node 03 DOWN (dashed frame); its `orders` and `dispatch` Pods LOST. The node bar shows no status yet; the record is unchanged (orders `▪ 1 RUNNING`, dispatch `▪▪▪ 3 RUNNING`). CUSTOMERS note: `can't place orders` (`bad`). Loops all inactive. Text: "Machine 03, node 03 to Kubernetes, stops. The `orders` Pod and a `dispatch` Pod stop with it, and customers can't place orders. The record still says all is well: nothing has told it otherwise." Then **k-04**.
    - **B2 · ~03:04:50 (gated on k-04).** `↻ node loop` appears (new) and is active. Lens: `WATCHING · every node's check-ins` / `DOING · marks node 03 UNKNOWN`. Node 03's bar reads `UNKNOWN` (`warn`); node 03's marks in the record turn `?`. Text: "Each node's agent checks in regularly. Node 03's check-ins have stopped. After 50 seconds of silence, by default, the node loop marks node 03 as unknown. It doesn't remove anything yet: a network glitch looks just like a dead machine, and the machine may come back."
    - **B3 · ~03:09:50.** Node loop still active. Lens: `WATCHING · node 03, unknown for 5 minutes` / `DOING · removes its Pods from the record`. The `?` marks disappear; rows read `orders  WANT 1  SHORT 1` and `dispatch  WANT 3  ▪▪  SHORT 1` (highlighted); node 03's frame empty. Text: "By default the node loop waits five more minutes. Node 03 hasn't come back, so its Pods are removed from the record. Now the record shows the gap that customers have felt since 03:04."
    - **B4 · seconds later.** `↻ ReplicaSet loop` active. Lens: `WATCHING · orders: 1 wanted, 0 Pods; dispatch: 3 wanted, 2` / `DOING · writes 2 new Pod records`. Rows gain one hollow mark each. Text: "The ReplicaSet loop makes the same comparison as on moving day and finds two gaps. It writes two new Pod records. It doesn't know, or need to know, why the old ones went."
    - **B5.** `↻ scheduler` active. Lens: `WATCHING · 2 Pods with no node` / `DOING · orders → node 04; dispatch → node 02`. Dashed NOT STARTED Pods appear on 04 (`orders`, 3 units) and 02 (`dispatch`) (highlighted, with 04's and 02's free room). Text: "The scheduler sees two Pods with no node. Node 04 is the only node with room for all of `orders`. It's the choice Sam made by hand last year, made by a loop."
    - **B6 · ~03:10–03:11.** Agents on 04 and 02 active. Lens: `WATCHING · Pods assigned to this node` / `DOING · download the image, start, report back`. Both Pods RUNNING; rows `▪ 1 RUNNING` and `▪▪▪ 3 RUNNING`; CUSTOMERS `can order` (`good`); connection note `storefront → orders: node 04 · kept current by another loop (Ch 7)`. Text: "Node 04 has never run `orders`, so its agent downloads the image first, then starts it. Customers can order again, roughly six or seven minutes after 03:04, with default settings. Nobody was woken. Another loop, Chapter 7's, keeps `storefront` pointed at the new `orders` Pod, so connecting is done too."
  - **Every step:** the changed elements get the step highlight for that step only; the canvas `aria-label` is the step's state summary from `data.js` (e.g. "Node 03 marked unknown. The record still lists orders and one dispatch Pod on node 03. Customers can't place orders."); the step text carries the meaning alone, so a screen-reader user reading the text column misses nothing.
size: **Desktop (≥ 900px):** Ch 3's lane layout: inside `.d-wide`, the canvas column left (about 55%), steps right (about 45%).
  - The canvas is sticky at `top: var(--sp-4)` for the length of its lane, about 540px tall: header bar 32; record panel about 112 (header + four rows); loop pills plus the two-line lens line about 72; node bar 32 and body 6 × 32px + 5 × 4px + padding ≈ 228 (unit 32px, down from Ch 3's 40, to make room); notes 40; gaps.
  - Steps are cards at least 40vh tall; a step activates when its top crosses 55% of the viewport; scrolling back re-activates earlier steps with their exact snapshots. At a lane's end the canvas un-sticks showing its final state.
  **600–899px and phones:** one column, canvas sticky at the top, steps beneath as opaque `surface` cards.
  - **At 360px:** unit 22px (body 6 × 22 + 5 × 3 ≈ 147 + padding); four node columns of about 75px; node bar on two lines (`NODE` / `03 · UNKNOWN`); record rows in a 2×2 grid (`storefront 3 ▪▪▪`, with `SHORT n` shown in place of the marks' count when short; the full row words return at ≥ 600px); only the active loop's pill and its lens line (inactive pills hidden); CUSTOMERS and connection notes one line each. Target height ≤ 360px.
  - **Fallback:** if the rendered canvas is taller than 50vh, or the viewport is under 560px tall, the canvas isn't sticky; each step card shows its own inline snapshot from the same renderer (Ch 3's short-viewport behaviour), decided by measurement, not by device.
  - Chip labels: Ch 3's rules (`store-` / `front` on two-unit chips; a size-1 chip in an abnormal state shows its status word in place of its label). The Pod ring must not push four nodes past 360px: draw it inside the chip's box (inset), not outside.
  **Gated steps:** as Ch 3: the step after k-03 / k-04 reserves its height and shows "Answer the question above to see what happens" until committed; the canvas stays on the last unlocked state; gates never re-lock; unlock on `didactician:check-commit`.
  **Motion:** changes over `dur-3` (≤ 300ms, flair length, no replay needed, I4); instant under reduced motion; no autoplay.
  **No-JS:** each lane's final snapshot is not drawn (the canvas needs JS); all step text is visible, and a `<noscript>` line says the drawings need JavaScript (Ch 3's approach).
  No horizontal scroll at 360px; text ≥ 13px (the record's marks are glyphs, not text, and may be 10px squares); check buttons ≥ 44px.
acceptance: ac-04, ac-05, ac-06, ac-07, ac-08, ac-09
reuse: **Decision: copy and extend Ch 3's `w-fleet-scrolly`, not a new engine.** Copy Ch 3's `site/widgets/w-fleet-scrolly/` (`index.js`: `renderFleet`, the geometry and chip-label code, the lane controller with sticky handling, activation, gates and the short-viewport fallback; `index.css`; the `data.js` header) into this run's `site/widgets/w-cluster-scrolly/`, rename `renderFleet` → `renderCluster`, and add: node naming, the Pod ring, NOT STARTED / STARTING, the record panel (replacing Ch 3's service pills; its marks and row words are computed like the pills were), the loop pills and lens line, the agent pills, `nodeStatus`, the CUSTOMERS line and the clock kicker. Never edit Ch 3's files.
  - **Why extend rather than rebuild:** the lane controller, gating and mobile fallback were reviewed and gated in Ch 3 (four widget rounds); the reader sees the same nodes and chips as Ch 3's 03:04, which is the comparison the chapter wants.
  - **Later chapters** (from their CURRICULUM entries); what each would parameterise:
    - **Ch 5 (scheduling, requests, pending):** the strongest candidate for a hands-on sandbox (B2), as Ch 3 recommended. It can drive `renderCluster` with per-Pod sizes set by the reader, `waiting` Pods with no node (`WAITING · NO ROOM` row word), a node count and a cost readout. The record panel already shows "wanted vs. recorded vs. running", which is exactly what pending is. Reuse: renderer + snapshot format; its own action engine.
    - **Ch 6 (rollouts):** a lane in which the record holds a Deployment row above two ReplicaSet rows (old and new version), Pods carry `version`, and the ReplicaSet loop's lens line shows the swap. Reuse: renderer, lane controller, record panel (with nested rows), f-02 as the retrieved snippet.
    - **Ch 7 (services):** lane B6's connection note becomes a real loop: its pill, its lens line ("watching: which Pods are running for orders → doing: keeps the address list current"), and a note listing addresses. k-06's new-address point is its retrieval. Reuse: renderer + a notes type.
    - **Ch 8 (autoscaling):** needs a time axis; probably its own widget, but it can draw the cluster with `renderCluster` (nodes added and removed; WANT changing). Reuse: renderer only.
    - **Ch 12 (crash loops, events):** `restarts` on a chip and a CRASHED/RESTARTING cycle with the back-off clock, the node agent's pill active; s-08's `notifications` as the case. Reuse: renderer + lane controller.
  - **Reader-visible complexity added for reuse:** none.

## Comprehension items

### k-01
segment: s-01
objective: o-2
type: retrieve
prompt: A year ago, at 03:04, machine 03 died with `orders` and a `dispatch` copy on it. Which jobs did Sam have to do before customers could order again?
options: A) Restarting: start `orders` and `dispatch` again on machine 03, the way Sam restarted the crashed `dispatch` copy at 02:51. · B) Replacing, then connecting: start them on machines with room, then tell `storefront` where `orders` had gone. · C) Updating: release a new `storefront` that no longer depended on machine 03. (correct: B; tempting: A, the 02:51 crash)
feedback: A: "Restarting is what Sam did at 02:51: the same container, on the same machine, which was still running. At 03:04 the machine itself was gone, so its containers had to start somewhere else, and then `storefront` had to be told where." B: "Right. Replacing, because machine 03 was gone, and connecting, because `storefront` still sent orders to machine 03. Those are the two jobs Kubernetes did at 03:04 this year." C: "Nothing about `storefront`'s version was wrong. The jobs were starting the lost containers somewhere else (replacing) and telling `storefront` where (connecting)."

### k-02
segment: s-02
objective: o-1
type: compare
prompt: This time it's node 04 that dies at 3 a.m., not node 03. Which of the two documents in Fig. 01 still says the right thing to do, unchanged?
options: A) Sam's task list: it names exact machines and steps, so whoever follows it can't get it wrong. · B) Neither: each was written for the night machine 03 died, so both need rewriting first. · C) Fennel's goal: it names no machines, only what should be running, so it holds whichever machine dies. (correct: C)
feedback: A: "Its first step starts `orders` on machine 04, the machine that just died. A task list is right for the situation its author pictured, and only that one." B: "The goal never mentioned machine 03. With node 04 gone, `payments` has 1 copy of the 2 wanted, so the goal already says what's needed: one more `payments` copy, anywhere with room." C: "Right. The goal says `payments: 2 copies`. With node 04 gone, one is running, so the gap is one copy, wherever there's room. Nobody has to rewrite anything."

### k-03
segment: s-04
objective: o-1
type: predict
prompt: Ari applies the `storefront` manifest, and the tool answers `created` in under a second. At that moment, what is new in the cluster?
options: A) Three `storefront` Pods, already running on nodes with room. · B) A job that will start three `storefront` copies at the next release window. · C) A line in the cluster's record saying three `storefront` copies are wanted, and nothing else yet. (correct: C; tempting: A, m-04; B, m-27)
feedback: A: "That's how a deploy script behaves: when it says done, the thing is running. Applying a manifest only writes the intention into the record. Starting the Pods is other loops' work, which usually begins within seconds, so on a good day you can't see the difference. The next steps show it." B: "There's no queue and no release window. The intention is recorded at once, and the loops that act on it are running all the time, release or not." C: "Right. `created` means the intention is recorded. Watch what happens to that line next."

### k-04
segment: s-05
objective: o-2
type: predict
prompt: Node 03 has just stopped, and nobody will be woken. With Kubernetes' default settings, how long until customers can place orders again?
options: A) Several minutes: Kubernetes first waits to be sure node 03 isn't coming back, then replaces its Pods. · B) Under a minute: as soon as node 03 misses a check-in, its Pods start on other nodes. · C) Not until someone applies the manifest again: the count of `orders` Pods was met when Ari applied it. (correct: A; tempting: B, local-01; C, m-27 / m-04 reversed)
feedback: A: "Right. Kubernetes can't tell a dead machine from a network glitch at first, so by default it waits about 50 seconds to mark the node, then five more minutes before replacing its Pods. Scroll on to watch each step." B: "Restarting a crashed container is that quick. A whole node is different: by default Kubernetes waits about six minutes before replacing its Pods, in case the node comes back. Scroll on to see why." C: "Nobody applies anything. The goal, one `orders` Pod, is still in the record, and the loops compare it with what's there all the time. Once the dead node's Pods are removed from the record, the gap is theirs to close."

### k-05
segment: s-05
objective: o-2
type: explain
prompt: Jordan asks Ari: "When node 03 died, what worked out that `orders` should go to node 04?" Which answer is accurate?
options: A) "The control plane did: it saw node 03 die, made a recovery plan, and told each node what to start." · B) "The scheduler did. It only finds nodes for Pods that don't have one; it saw a new `orders` Pod with no node and picked one with room." · C) "Node 04's agent did: it noticed it had spare room and took over the `orders` Pod from node 03." (correct: B; tempting: A, m-03; C, m-06)
feedback: A: "No part made a plan. The node loop marked node 03 and removed its Pods; the ReplicaSet loop saw a gap and wrote a new Pod record; the scheduler saw a Pod with no node and picked one. Each did its own step, passing work on through the record." B: "Right. The scheduler didn't plan a recovery or even need to know there had been a failure. It saw a Pod with no node, the same thing it saw on moving day, and picked a node with room." C: "Node agents start only Pods already assigned to their node; they don't take work. And nothing was taken over from node 03; the next section says why."

### k-06
segment: s-06
objective: o-3
type: predict
prompt: Since 03:10, an `orders` Pod has been running on node 04. Is it the Pod that was on node 03?
options: A) No: it's a new Pod made from the same template, with a new name and a new address. Anything kept inside the old one is gone. · B) Yes: Kubernetes moved it to node 04, keeping its name and address, so nothing that calls it has to change. (correct: A; tempting: B, m-06)
feedback: A: "Right. Kubernetes never moves a Pod. It replaces it with a new one, wherever there's room. That's why Pods are called disposable, and why something has to tell `storefront` the new address." B: "Virtual machines can be moved like that; Pods can't. The old Pod went with node 03, and the ReplicaSet loop wrote a new one, which got a new name and a new address. That's why `storefront` needed another loop to find it."

### k-07
segment: s-07
objective: o-4
type: apply
prompt: Fennel's cluster runs on a managed service, in the provider's standard mode. Which of these is still Fennel's job?
options: A) Keeping the API server and the cluster's record running, and upgrading them to new Kubernetes versions. · B) Running the scheduler and the loops that replace Pods when a node dies. · C) Deciding what goes in the record, such as how many copies of `orders` to run, and making sure each service survives being replaced. (correct: C; tempting: A and B, the control plane, which is the provider's)
feedback: A: "That's the control plane, which the provider runs in every mode, upgrades included." B: "Those loops are part of the control plane too, so the provider runs them. They did Fennel's 3 a.m. work, but Fennel doesn't run them." C: "Right. The provider runs the loops; what they work towards is Fennel's to decide, and so is whether each app tolerates being replaced. In standard mode, Ari's team also looks after the nodes."

### k-08
segment: s-08
objective: o-3
type: predict
prompt: Every time a `notifications` container starts, it crashes within seconds, because a setting it needs is missing. With default settings, what does Kubernetes do over the next hour?
options: A) Restarts it in place again and again, waiting longer between tries, and never stops. · B) Restarts it a few times, then stops and marks `notifications` as failed, so someone notices. · C) Replaces its Pod on a different node each time, in case the node is what's broken. (correct: A; tempting: B, m-05; C, m-06)
feedback: A: "Right. The node agent restarts it after about 10 seconds, then 20, 40 and so on, up to 5 minutes between tries: roughly 15 restarts in the first hour, then about 12 an hour, for as long as the setting is missing. The loop is working exactly as designed; the app is still broken." B: "There's no give-up point. The node agent keeps restarting it, waiting longer each time up to 5 minutes, indefinitely. Nobody is told unless your team has set up an alert." C: "A crashing container is restarted in place, in the same Pod on the same node. Pods are replaced when their node fails, not when their app does."

### k-09
segment: s-08
objective: o-3
type: apply
prompt: Ari says: "notifications keeps crash-looping, but Kubernetes keeps restarting it." What would you ask? Think of one or two questions, then show the answer.
model_answer: "So Kubernetes is doing its job. What's wrong with the app? And is restarting hiding the problem from us?" Under it, two lines of why: "The loop compares one thing, a running container, and acts on it; it can't see the missing setting, so restarting is all it can do. And a service that restarts quietly can look 'handled' on a dashboard while texts and emails stop going out. Chapter 12 comes back to how teams catch that."
feedback: Under the reveal, one line: "If your question was 'can Kubernetes fix it?', that's the trap this chapter is about: the loops restore the count; they don't repair the app."

## Acceptance criteria

- ac-01 (s-01): §01 opens with the cast strip (Sam, Jordan, Ari, with roles) and D1, collapsed. k-01 comes before any new term. The scene says node 03 died at 03:04 with `orders` and a `dispatch` copy, that nobody was woken, and gives no recovery time. Ari's line "Nobody told it what to do. We told it what we want." appears as a quote. "node" is defined as a machine in the cluster.
- ac-02 (s-02, f-01, k-02): f-01 shows the task list as a dashed numbered list and the goal in the record style, each with its direct label. k-02 is committed before "imperative", "declarative" or "desired state" appear. TERM 01 follows. The analogy aside has a visible WHERE THIS ANALOGY BREAKS line naming no judgement, no negotiation (a copy just waits), restarting a broken app forever, and acting only on the latest goal; it doesn't re-contrast the two documents.
- ac-03 (s-02, f-02): f-02 shows `kind: ReplicaSet` and `replicas: 3` with the annotation "the desired state: three copies", is marked shortened, and its caption says engineers usually write a Deployment, which wraps it (Chapter 6). The prose says manifests are kept in version control and reviewed, and answers Ch 3's "what if the record were the thing the machines act on?" without saying what applying does.
- ac-04 (w-cluster-scrolly, lane A, k-03): A1 ends on k-03; A2–A5 are locked until it's committed. A2 shows only a new record row (WANT 3, SHORT 3), nodes unchanged. A3–A5 each activate one loop (ReplicaSet loop, scheduler, node agents), with its lens line on the canvas and its effect highlighted at the same step. Pods appear dashed (NOT STARTED) before they appear RUNNING. A5's text says no part handed another a plan and that the loops keep watching, release or not.
- ac-05 (w-cluster-scrolly, lane B, k-04): B1 shows node 03 physically down with LOST Pods while the record still shows them running, and a CUSTOMERS line "can't place orders"; it ends on k-04, which locks B2–B6. B2 introduces the node loop (marks node 03 UNKNOWN, ~03:04:50, "50 seconds … by default"); B3 removes node 03's Pods from the record (~03:09:50, "five more minutes … by default") and the rows show SHORT; B4 ReplicaSet loop; B5 scheduler (node 04, the only one with room for `orders`; "Sam's choice, made by a loop"); B6 node agents download and start, CUSTOMERS "can order", the connection note credits another loop (Ch 7). The words "instant", "immediately" and "in seconds" are not used for the recovery.
- ac-06 (w-cluster-scrolly, grammar): a written intention (record rows, f-01's goal, f-02's code ground) uses `c4`; loops are `c3` pills with `↻`; Pods are `c1` chips with the Pod ring; a Pod that exists only as a record is dashed with no fill and no lamp. Every status is a word plus colour. There are no arrows on the canvas. Record marks and row words are computed from the snapshot, never hand-written.
- ac-07 (w-cluster-scrolly, layout and access): desktop canvas left and sticky, steps right; under 900px canvas sticky at the top; where the canvas would exceed 50vh or the viewport is under 560px tall, each step shows an inline snapshot instead. At 360px: four nodes side by side, no horizontal scroll, text ≥ 13px, check buttons ≥ 44px. The canvas `aria-label` follows the active step; the step text carries the meaning alone. Transitions ≤ 300ms, instant under reduced motion, no autoplay.
- ac-08 (w-cluster-scrolly, reuse): copied and extended from Ch 3's `w-fleet-scrolly` into this run's `site/widgets/w-cluster-scrolly/`; Ch 3's files untouched. All snapshots and reader-visible strings live in `data.js`, whose header documents the extended snapshot format including the unused later-chapter fields. No reuse-only control is visible.
- ac-09 (s-05, payoff): right after lane B, Ch 1's question is quoted and answered "with default settings, roughly six or seven minutes, sometimes less; and nobody". The same passage says `orders` was down for those minutes because it has one copy, names it a single point of failure, and gives the question "Which of our services run as a single copy?". D3 holds the faster path and "engineers can change these waits"; D4 says the machine itself isn't replaced.
- ac-10 (s-05, f-04, k-05, m-03): f-04 lists the node loop, ReplicaSet loop, scheduler and node agent with watching / doing / Sam's job, plus a dashed Ch 7 row, and is built from a data array. k-05 comes before the "no single conductor" paragraph. That paragraph quotes the Kubernetes overview ("a set of independent, composable control processes"; "Centralized control is also not required"), says Ch 3's "orchestrator" still holds for the jobs, and doesn't call it a contradiction. D5 answers the controller-manager objection.
- ac-11 (s-03, s-04, s-07, term cards): TERM 01 (desired state, with the declarative / imperative line), TERM 02 (Pod), TERM 03 (reconcile loop · controller, the only payoff variant, with the lens under the definition) and TERM 04 (control plane) render as `.cp-term` right after each term's first use, which is a `dfn` linked to its card; kickers read `NEW TERM · 0N / 04`. The helmsman aside has a WHERE THIS ANALOGY BREAKS line and no mention of cybernetics.
- ac-12 (s-06, k-06, m-06, m-05): k-06 (two options) opens §06; the text after it names the old and new Pods (`orders-5c8x`, `orders-q2rw`) and says a Pod is never moved. The four disposability requirements appear as a short list attributed to the twelve-factor app, with the 30-second default. "Self-healing" is defined, m-05 is stated fairly, and the three limits (a bug, no room → waits, data inside a Pod) each point to their chapter; "pending" doesn't appear.
- ac-13 (s-07, f-05, k-07): f-05 draws the control plane as the record with an API server bar and three separate loop pills, each connected only to the API server, never to each other; nodes with agent pills connected to the API server; the three ownership labels on the drawing. The prose says the provider runs the control plane in every mode, the customer runs the nodes in standard modes and the provider in fully managed ones, and the workloads are always the customer's. No provider is named in the main text; no price appears.
- ac-14 (s-08, k-08, k-09): k-08's key is A, and its feedback gives the back-off (10 s doubling, capped at 5 minutes; about 15 restarts in the first hour). `CrashLoopBackOff` appears once. Ari's line is quoted above k-09, a think-then-reveal whose model answer is the curriculum's two questions, verbatim. The recap is four lines; the bridge names the loop lens and Ch 5's bill.
- ac-15 (all checks): commit-then-reveal, with feedback explaining every option. Options are similar in length and equally measured; no "measured middle" giveaway. k-06 is binary. Keys vary: A (k-04, k-06, k-08), B (k-01, k-05), C (k-02, k-03, k-07). Every prompt states its own question. No scores.
- ac-16 (precise language and accuracy, page-wide): no guarded term appears (## Shape, vocabulary guard). Every recovery timing is hedged with "by default" / "with default settings" in the same sentence. Pods are never said to move. Applying a manifest is never said to run, start or deploy anything. No sentence sends the reader into a figure to find a label; figures are referred to by number. No unreferenced "it" / "that" / "the rest" sentence. Kubernetes kinds are capitalised (Pod, ReplicaSet, Deployment).
- ac-17 (disclosures): D1–D7 exist where listed, are collapsed by default, and are each optional: the main text reads correctly with all of them closed.

## Curriculum recommendations

Recommendations only; CURRICULUM.md is unchanged. Apply after the chapter ships (CURRICULUM §8 step 7).

- **R1 (§6 catalog): add local-01 as m-28, owned by Ch 4, revisited by Ch 8.** "Self-healing is instant: when a machine dies, the replacements appear within seconds." With default settings it's about six minutes (50 s to mark the node, a 5-minute wait, then placement and an image download). Ch 4 confronts it (k-04, lane B's clock); Ch 8's m-11 ("autoscaling is instant") is the same family and should retrieve it.
- **R2 (§3 Fennel, new Year 3 story facts, after build):**
  - Year 3: Fennel runs on **managed Kubernetes in the provider's standard mode**: the provider runs the control plane; **Ari**, hired this year as platform lead, led the move, and Ari's team looks after the nodes. (Standard mode keeps Ch 5's node pools and Ch 8's cluster autoscaler natural.)
  - The cluster has **four nodes, 01–04** (the same machines' numbers as Ch 3). **Moving day:** `orders`, `payments`, `dispatch` moved first; `storefront` last, at `storefront:v38`, `replicas: 3`, as a ReplicaSet manifest (shortened). End layout = Ch 3's Monday layout.
  - **Saturday 03:04, Year 3:** node 03 dies again (`orders` + one `dispatch`). With default settings: ~03:04:50 marked unknown; ~03:09:50 its Pods removed from the record; the ReplicaSet loop writes two new Pods; the scheduler puts `orders` on node 04 (the only room) and `dispatch` on 02; ~03:10–03:11 both running. **`orders` unavailable to customers for roughly six or seven minutes; nobody paged.** Pod names `orders-5c8x` (old) → `orders-q2rw` (new). Afterwards the cluster has three nodes until a machine is added.
  - Ari's line: "Nobody told it what to do. We told it what we want."
  - **`notifications`** is introduced in Year 3 (texts and emails); on a Wednesday a missing setting makes it crash-loop (Ch 4's conversation). Ch 12's Year 4 postmortem can call back to it.
- **R3 (§5 Visuals column, Ch 4 row, after build):** record ## Visual grammar: node = Ch 3's machine frame with `NODE · NN`; Pod = Ch 3's chip inside an inset `ink` ring; NOT STARTED = dashed `c1`, no fill, no lamp; STARTING (`warn`); **written intention = `c4` on `c4-soft`** (the record panel, f-01's goal, f-02's code ground); record rows `WANT n · marks · n RUNNING / SHORT n` with computed marks (filled, hollow, `?`); **loop = `c3` pill with `↻`**, acting loop highlighted, lens line `WATCHING · … / DOING · …`; node agent = `↻ agent` pill on the node bar; `UNKNOWN` node status (`warn`) vs. physical DOWN frame; CUSTOMERS note; clock kicker with `~`; no arrows on the scrolly canvas; f-05's control plane as a record with separate loop pills, each connected only to the API server. Renderer `renderCluster` and the extended snapshot format live in Ch 4's `site/widgets/w-cluster-scrolly/` for later chapters to copy; f-04's loop lens table is built from `CH04_LOOPS` in `assets/page.js`.
- **R4 (Ch 5 entry):** (a) the scheduler is already named as "the loop that picks a node", with "how it chooses is Chapter 5" said twice (A4, B5); (b) "no room → the Pod waits, unplaced" (s-06, c-15, medium) is the promise "pending" keeps; (c) lane A's layout put two `storefront` Pods on node 01 while node 04 had more room, unexplained: Ch 5 can use it ("why not 04?": spreading, scoring); (d) after 03:04 the cluster runs on three nodes with less spare room (D4): Ch 5's headroom question; (e) Ch 4's bridge sets up Morgan's bill. Ch 5's sandbox can drive `renderCluster` (`waiting` status is designed in).
- **R5 (Ch 6 entry):** Ch 4 shows `kind: ReplicaSet` (shortened) and says "engineers usually write a Deployment, which wraps this and adds version updates; Chapter 6". Ch 6 introduces the Deployment as the loop that manages versions *by managing ReplicaSets*, retrieving f-02. The record panel can nest two ReplicaSet rows under a Deployment row for the rollout lane.
- **R6 (Ch 7 entry):** lane B6 credits "another loop (Chapter 7)" with keeping `storefront` pointed at the new `orders` Pod, and k-06 establishes that a replacement Pod has a new address. f-04's dashed row is Ch 7's loop to fill in (the EndpointSlice controller, research parking lot).
- **R7 (Ch 8 entry):** local-01 / m-28 (R1) for retrieval next to m-11; f-04 gains two rows (the two autoscalers). Note that Ch 4 never says the cluster adds machines by itself.
- **R8 (Ch 10 entry):** s-06 says anything inside a Pod is gone with it and points to Ch 10; Fennel's orders data lives in a database outside the app (Ch 2) whose home is Ch 10's debate. Parking lot: Pods on an unreachable node may keep running unseen while replacements start (why stateful apps need stable identities).
- **R9 (Ch 12 entry):** Ch 4 introduces `notifications` crash-looping on a missing setting, the back-off numbers (10 s doubling to 5 minutes; ~15 restarts in the first hour; the docs' 200 restarts in 2d9h example), `CrashLoopBackOff`, and the question "is restarting hiding the problem from us?". Ch 12 retrieves k-08 / k-09. `renderCluster` has room for a restart counter.
- **R10 (Ch 11 entry):** f-05's API server is where Ch 11's "gate in front of the loops" (admission, quotas) sits; spec vs. status permissions (parking lot).
- **R11 (Ch 13 and Ch 14 entries):** Ch 13: manifests in version control (s-02) plus a syncing loop is GitOps. Ch 14: control-plane outages (D7), provider modes and node repair, the record's storage (D6: etcd, or other storage on some providers), tuning the default waits (D3), and the control-plane fee (not researched here).
- **R12 (§2.3 / §8, course convention): the loop lens table.** Every Part II–IV chapter that adds a loop adds a row to a copy of f-04 (`CH04_LOOPS` format: loop, watching, doing, job or chapter), so the reader accumulates one table across the course. Fix the lens wording as "Which loop, watching what, doing what?".
- **R13 (style, course-wide):** follow the style guide's rule that Kubernetes kinds are capitalised (Pod, ReplicaSet, Deployment, and later Service, StatefulSet…), starting in Ch 4; "node" stays lowercase as in the Kubernetes docs' prose. Worth one line in §8 step 4 so later chapters agree.
- **Cut here, for later chapters:** the thermostat analogy (x-01; available to Ch 8, whose autoscalers are thermostat-like); level-based behaviour stays a disclosure (D2), and Ch 6's rollback ("declaring the old version again") is the natural place to say it in the main text; cybernetics (unsourced).
