# Learning plan: Shipping without downtime: rollouts and rollbacks (Ch 6, Desired state: Kubernetes from the problems up)

<!-- Written by the instructional designer. Parsed by scripts/check_plan.py. Revision 0 (handoff 02). -->

## Shape

A narrative article that follows Fennel's `catalog` team through one Thursday in Year 3: a routine release in the morning (v62 → v63) that nobody has to watch, and a release in the afternoon (v63 → v64) that shows every price as $0.00 for six minutes, then goes back. It is built around **one scrollytelling lane** and static figures around it.
- **Lane R, "Thursday, 10:15: catalog v63"** (blueprint B1, on the pooled `renderCluster`): the Deployment loop makes a new ReplicaSet for v63 and shifts `catalog`'s three Pods to it one at a time, removing each v62 Pod only once a v63 Pod is ready, using one copy's worth of spare room, and keeps the emptied v62 ReplicaSet. It is Sam's Tuesday from Chapter 3, done by a loop in about a minute.
- **The core contrast as a predict-then-reveal** (k-04, then f-03): two ways v64 could be bad. One that crashes on start stalls with the v63 Pods still serving; one that starts, passes its check and shows $0 replaces every Pod. f-03 draws the two outcomes as two snapshots with the same renderer and data file as the lane (no second lane), revealed only after the reader commits.
- **The incident and the rollback as static figures:** a timeline with a price-status band (f-04) and the record at three moments (f-05), which shows that rolling back is declaring v63 again and that the loop reuses the ReplicaSet it kept.

**Why this form.** The chapter's content is a *process* (a rolling update) plus a *distinction* (what checks stop and what they don't). The course's form for a process is a scrollytelling lane (CURRICULUM §8 step 7, which supersedes the entry's "step-locked B1 widget"), and this lane reuses the canvas the reader has met in Chapters 4 and 5, so the nodes, record and loops need no re-teaching. The distinction is a contrasting case (two versions that differ in one feature: whether they crash), which is best seen side by side, so it is a two-panel figure rather than a second process. Rollback is the same process run again, which is the point the chapter wants to make about it ("the same loop, the same way"); a second lane would replay mechanics the reader has just watched, so the plan shows only what is new about rollback (the record changes back; the kept ReplicaSet fills again; data stays) in f-04 and f-05.

**Rejected alternatives.**
- *Two lanes* (a second lane for the $0 rollout and the rollback). About 2 extra minutes and a second step set for the page builder; it would show the mechanism a third time. Kept in the cut list as the first thing to add if the user wants more.
- *A hands-on rollout widget* (the reader sets surge and unavailable and watches). Rejected as busywork for this reader: the settings are engineer territory (§2.4), and the one consequence a manager needs (a rollout needs spare room) is a single predict check (k-03).
- *Opening on the $0 incident as a hook.* It would give away k-04's answer for the bad version before the reader has the model. The chapter opens on the pain of Thursday-night releases instead and ends §01 on Jordan's question, "And if the version is bad?" (Ari: "That depends on how it's bad.").

**Honest sizing** (CURRICULUM §2.10). Estimated reader time including reading, thinking, the lane and the checks. Disclosures are optional and not counted (about 0.25 min each if opened).

| Part | Minutes |
|---|---|
| hero + s-01 (cast strip, D1, k-01, Thursday nights then and now, Jordan and Ari) | 2.5 |
| s-02 (the Deployment: f-01, TERM 01, one ReplicaSet per version, the lens, where a new version comes from) | 2.75 |
| s-03 (scene set-up, lane R: 5 steps ≈ 2.0 incl. k-02, TERM 02, Sam's Tuesday compared) | 3.5 |
| s-04 (room to ship: the defaults, k-03, D2) | 1.25 |
| s-05 (what "ready" means: f-02, TERM 03, liveness, no probe at all, k-05) | 2.5 |
| s-06 (two ways to be bad: k-04, f-03, m-09, local-01, local-02, the handover aside, canary and blue-green) | 3.0 |
| s-07 (Thursday, 14:02: f-04, k-06, rollback, f-05, TERM 04, D4) | 2.75 |
| s-08 (what going back assumes: f-06, tags and digests, what rollback doesn't undo) | 1.25 |
| s-09 (the loops so far: f-07) | 0.75 |
| s-10 (the conversation k-07, recap, bridge) | 1.75 |
| **total** | **about 22** |

Of that, checks are about 3.75 minutes (six choice checks at about 0.5, one think-then-reveal at 0.75) and the lane about 2 minutes (including k-02). Earlier chapters built 1–3 minutes over plan, so the built page will probably read at **23–25 minutes**.

**One chapter, not a split (checkpoint Q1).** About 22 minutes is over d-01's 20 but not by enough to justify a 16th chapter. The only clean seam (before vs. after "what ready means") would leave a Part 1 of about 13 minutes with no misconception confronted, and a Part 2 of about 11 whose predict-then-reveal (k-04) depends on the lane it would no longer contain. `cut-list.md` `## If it runs long` recovers about 3 minutes in ranked order without losing an objective.

toc: yes — ten h2 sections and a read of more than 20 minutes; a rail on desktop and a collapsed "Contents" on mobile, as in Ch 1–5.
tokens: user-provided: Control Plane style guide, `design/control-plane/`. Use the course tokens from the shared pool (`pool/tokens.css`) and the pool's kit files as `pool/<file>` (CURRICULUM §8 steps 4–5); follow README.md, the tokens.json notes and `components/bundle.css`. Chapter-only CSS and JS go in `site/assets/`. The page builder may read Ch 5's `site/assets/page.css` / `page.js` as the reference implementation of the course's page components (cast strip `.cp-cast`, disclosure `.cp-more`, checks `.cp-check` with the `didactician:check-commit` event and `data-after`, term card `.cp-term` with the payoff variant, `.cp-aside` with `.cp-breaks`, `.cp-quote`, `.cp-recap`, manifest figure `.mf`, the loop lens table builder) and reimplement them in this chapter's `site/assets/`; it never edits Ch 5's files.
mobile: supported. The lane follows §8 step 7 (canvas sticky at the top under 900px, ≤ 50vh; inline snapshots per step where it wouldn't fit or the viewport is under 560px tall); it draws two node columns, so chips keep their full labels at 360px. f-03 stacks its two panels under 900px (crash case first). f-01, f-02, f-04, f-05, f-06 and f-07 re-lay out under 600px; they don't scale.

**Course voice** (style guide): second person, present tense, sentence-case headings, no exclamation marks, no emoji. Status always travels as a word plus colour. Kubernetes kinds are capitalised (Pod, ReplicaSet, Deployment); "node" stays lowercase (CURRICULUM §2.12). Loops are named in plain words: *the Deployment loop*, *the ReplicaSet loop*, *the scheduler*, *the node agent*.

**Prose rules (binding on the builder; from the user's human reviews, in the brief's Lessons):**
- Flowing sentences of varied length, with cause and effect spelled out: what was the case, what was wanted, what acted, what changed. No chains of fragments. Clear active verbs.
- **Don't compress prose to hit the time budget.** The minutes above are an estimate, not a word limit.
- **Set up every scene before its lane or figure.** §03 opens with where `catalog` runs (nodes 05 and 06, why only those are drawn), what is about to happen (the pipeline writes v63 into the record at 10:15), and how to read the canvas now that the record has a Deployment row over two ReplicaSet rows and Pods carry their version in colour and label.
- **Ground every component before it acts.** The Deployment is introduced (f-01, TERM 01, one ReplicaSet per version) before the lane shows its loop acting; "ready" is given a one-sentence meaning in the scene set-up ("Kubernetes sends a Pod customers' requests only once it is ready: once it passes a check the team wrote, which §05 opens up") before the lane draws NOT READY and READY; the node agent is named as the one that runs the checks before a check is said to fail; the pipeline is introduced (s-02) before it changes the record (s-03, s-07).
- **No unexplained analogies.** The one analogy (a shift handover, s-06) comes after the mechanism, maps each part explicitly and carries a WHERE THIS ANALOGY BREAKS line in the same aside.
- **Name who does what.** Fennel's build pipeline builds the image and writes the new version into the Deployment's record; the Deployment loop makes and resizes ReplicaSets; the ReplicaSet loop writes and removes Pod records; the scheduler picks a node; the node agent starts the container and runs its checks; "a loop we'll name in Chapter 7" sends traffic only to ready Pods; Riley rolls back; Morgan notices.
- **Keep the pattern distinct from the implementation.** The reconcile loop is Ch 4's general pattern; the Deployment loop is one implementation. Lane R is one scene that illustrates a rolling update; the general rule is stated after it, in TERM 02 and the prose, not tied to `catalog`.
- **No meta lines about the course.** Callbacks do work ("in Chapter 3, Sam did this by hand, and it took the evening"), never bookkeeping ("this keeps Chapter 4's promise"). Story terms from earlier chapters are glossed where first used ("Friday at 17:45 in Chapter 5, when a `dispatch` Pod waited for room").
- Figures don't "write" or "say" things; captions state the takeaway or condition. Refer to figures by number.
- Every default carries "by default" or "with default settings" in the same sentence. Tools and providers stay generic ("tools such as Argo Rollouts").
- Pedantic caveats go in disclosures; the main text stays true without them.

**Vocabulary guard** (brief out_of_scope; ledger §5). This chapter introduces: Deployment (s-02), rolling update (s-03), readiness probe and liveness probe (s-05), rollback (s-07). Allowed with a gloss: "the pipeline" / "CI" once ("the build pipeline, which engineers call CI"), canary and blue-green (one sentence each, s-06), "digest" (s-08), "tag" (Ch 2's word), `/healthz`, `/livez`, `httpGet`, `readinessProbe`, `livenessProbe` inside f-01/f-02 only, "failed to progress" (D3), `kubectl rollout undo` (D4 only, as what engineers type). Named only: GitOps (D4, "Chapter 13"), Argo Rollouts ("for example"). **Never in the body:** Service (capitalised, beyond "Chapter 7"), load balancer, EndpointSlice, kubelet (say "node agent"), `maxSurge` / `maxUnavailable` outside D2, `progressDeadlineSeconds` outside D3, `revisionHistoryLimit` outside s-07's one clause, startup probe, `minReadySeconds`, Recreate, StatefulSet, ConfigMap / Secret (say "a missing setting"), Helm, autoscaling.

**Fiction vs. sourced.** `catalog`, its requests, nodes, versions, the Thursday, every time in lane R and f-04, the 23 orders, the registry's 30-day clean-up and every quoted line are Fennel fiction (story facts, R2). Timings are illustrative ("about a minute"). Sourced mechanisms: a new template makes a new ReplicaSet, scaled up while the old one scales down, and only a template change starts a rollout (c-01); the 25% defaults and their rounding (c-02); old Pods go only once enough new ones are up; 3 copies → at least 3 available, at most 4 (c-03); Pods that never become ready stall the rollout with old Pods running (c-04); a stall is only reported, not rolled back (c-05); liveness → restart, readiness → no traffic, not restarted (c-06); no probe → treated as passing (c-07); a check passes on a status code alone (c-08); kept ReplicaSets, 10 by default, make rollback possible (c-09); rolling back writes an earlier template back, rolled out like any change (c-10, medium confidence, hedged); tags can move, digests can't (c-11); plain Deployments don't do canary or blue-green or roll back by themselves (c-12). From earlier chapters by reference: images are immutable and kept in a registry (Ch 2 claims 04, 07, 08); declare vs. command and level-based behaviour (Ch 4 claims 03, 04); the ReplicaSet loop keeps N Pods (Ch 4 claim 12); crash-loop back-off (Ch 4 claim 14); pending and retries (Ch 5 claims 20, 21).

## Research concerns, resolved

1. **"A crashing version is stopped by health checks" is loose** (c-04, c-07). The plan never says that. It says a version whose Pods *never become ready* stalls the rollout; a crashing container never becomes ready even with no check at all (c-07 note), and the readiness check is what stalls a version that starts but isn't ready. The crashing case is the one f-03 draws (CRASHED, `↻ 3`); f-03's caption adds that a v64 that started but failed its readiness check would stall the same way. k-04's prompt says "crashes as soon as it starts", not "fails its health check".
2. **c-10 is medium confidence.** The main text says: rolling back changes the record back to v63; the Deployment loop treats that like any other change of version, so, with the default settings, it fills the kept v63 ReplicaSet and empties v64's the same gradual way. It does not claim a documented event sequence. f-05 shows the record at three moments, not the rollback's steps. k-06's key says "a few Pods at a time, using the v63 ReplicaSet it kept", which follows from c-01, c-02 and c-09; its feedback carries "with the default settings". D4 holds the stalled-rollout case (only the bad ReplicaSet scales down, since the old one still has every Pod).
3. **x-02 and x-03 are composed.** x-03 (no room → the surge Pod waits, no old Pod is removed) is k-03's answer, stated as a consequence of the settings ("with three copies, the default settings let no old Pod go before a new one is ready, so…"), not as quoted behaviour. x-02 (four copies) appears only in D2, hedged ("roughly two at a time, giving up one copy for a while").
4. **The SRE "70% of outages" figure** stays in the parking lot (cut list); the chapter's pain is Fennel's.
5. **DORA was not researched.** s-01's "several times a day" stays a Fennel story fact with no claim about what such teams do in general.

## Objectives

- o-1: explain how a rolling update replaces one version of a service with the next without downtime: the Deployment, a loop that manages versions by managing ReplicaSets, brings up new Pods a few at a time and removes old ones only as new ones become ready; it needs spare room while both run, and it replaces Sam's by-hand Tuesday and the "Nobody deploy anything" message. — checks: k-01, k-02, k-03
- o-2: predict which bad releases health checks stop and which they don't (a version that crashes or never becomes ready stalls with old Pods serving; a healthy-but-wrong one rolls out completely, m-09), and tell a readiness probe from a liveness probe. — checks: k-04, k-05, k-07
- o-3: explain rollback in terms of desired state (declaring the old version again, rolled out the same way from the kept ReplicaSet), what it assumes (the old image still exists; the tag means what it meant) and what it doesn't undo (data written by the bad version). — checks: k-06, k-07

k-01 is the retrieval opener (Ch 3's Sam's Tuesday through Ch 4's declare vs. command). k-02 gates the lane at its key transition (wait for ready). k-03 ties the rollout to Ch 5's room (x-03). k-05 applies the readiness/liveness distinction to a new case. k-04 is the chapter's core predict-then-reveal (m-09, local-01, local-02). k-06 predicts what rollback does (local-03). k-07 is the conversation, think-then-reveal, and interleaves all three objectives.

## Diagnosis

- **Readiness:** novice for infrastructure, intermediate for software. Chunks the reader brings: the record and the loops; the loop lens; ReplicaSets keep N Pods (Ch 4's f-02); Pods are replaced, never repaired, and get new names; the scheduler places by requests; a node has 13 GB for Pods; pending; the node agent starts and restarts containers, with crash-loop back-off; images are immutable, tagged and kept in a registry; Sam's three rounds of start-one, stop-one in Ch 3, which needed one copy's spare room.
- **Element interactivity: high**, at one moment.
  - **Hardest moment: lane R, steps R2–R3.** The reader must hold: the Deployment's wanted version, two ReplicaSets with their own WANT, four Pods where three are wanted, a Pod that runs but isn't ready, and the rule "remove an old one only when a new one is ready". Naively five or six elements. Managed by:
    - **pre-training:** s-02 introduces the Deployment and "one ReplicaSet per version" on a manifest and in words before the lane; the scene set-up gives "ready" its meaning; k-01 has retrieved "you write the version, a loop works out the steps"; Sam's rounds (Ch 3) are a known schema the lane maps onto;
    - **inline labels on the canvas:** each ReplicaSet row shows its WANT and its marks; each Pod shows its version (label and colour) and READY / NOT READY; a CUSTOMERS line names which versions are serving, so the reader reads the state rather than computing it;
    - **one change per step:** R1 the record and the new ReplicaSet; R2 the extra Pod, not ready; R3 ready, then one old Pod goes; R4 round two; R5 round three and the kept ReplicaSet.
    At most three new elements change in any step.
  - **Second: s-05, two probes.** Two checks with the same shape and different consequences. Managed as contrasting cases in one figure (f-02), same rows for both (what it asks, catalog's version, when it fails), with only the consequence differing, then k-05 applies it.
- **Misconceptions confronted** (catalog ID; three proposed locals):
  - **m-09** (owned), "rolling updates guarantee a safe release": stated fairly in s-01 (Jordan's assumption that a careful loop means a safe release) and in s-06's opening (the fair part: no gap with zero copies; a version that won't start never takes over); shown predicting wrongly by k-04 and f-03 (v64 passes and replaces every Pod); correct model in s-06 (a rollout protects *availability*, never *correctness*); the cases it got right re-explained by the same model (the crash stalls because its Pods never become ready).
  - **local-01, "a failed rollout rolls itself back"** (proposed as m-32): k-04 option D; s-06's "stalled is not rolled back" paragraph; D3.
  - **local-02, "health checks test whether the app works correctly"** (proposed as m-33; Ch 12 revisits as m-15): k-04 option A; s-06's "a check passes on a status code" paragraph; the handover aside's breaks line; k-07.
  - **local-03, "rolling back undoes the bad release, as if it never happened"** (proposed as m-34; Ch 10 revisits): k-06 option A; f-04's last row (23 orders at $0 remain); s-08.
- **Retrieval opener:** k-01 (Ch 3's lane C through Ch 4's declare vs. command). Ch 5's pending is retrieved in k-03; Ch 2's immutable images in s-08; Ch 4's level-based behaviour (D2 there) moves into the main text in s-07.
- **Analogy:** a shift handover at a shop (s-06), optional per the entry and first in the cut order. It earns its place because its breaks line *is* the chapter's point about checks.

## Disclosures

`<details class="d-more cp-more">`, collapsed by default, all optional; the main text reads correctly with all of them closed.
- D1 (s-01) "I didn't read the last chapter. What happened?"
- D2 (s-04) "What about a service with more copies?" (c-02, x-02)
- D3 (s-06) "How long does Kubernetes wait on a stuck rollout?" (c-05)
- D4 (s-07) "Undo with a command, or change the file back?" (c-10 note)

## Segments

### s-01 — Year 3: releases without a release night
intent: Re-establish the cast for readers jumping in, retrieve Sam's by-hand Tuesday through Ch 4's "declare, don't command" (k-01), then show the manager's view of how releases changed (Thursday nights and "Nobody deploy anything" then; several releases a day now) and end on the chapter's question: what stops a bad release?
objectives: o-1
claims: c-01
readiness: novice · interactivity: low (two eras of releasing, one new service, one question) · max-elements: 3
mode: orientation (cast strip, optional recap) → retrieval (choice) → concrete story (pain seen in meetings) · blueprint: none
layout:
  contiguity: adjacent. Cast strip and D1 at the top of §01, then k-01, then the scene.
  pacing: continuous
  redundancy: D1 summarises Ch 5 (and Ch 4's core in one sentence) without re-teaching; the scene names `catalog` and the pipeline without explaining them (s-02 does).
  scaffold: D1, collapsed: "I didn't read the last chapter. What happened?"
ux: Glance at the cast strip, optionally open D1, commit to k-01, read the scene (four or five paragraphs) and the quoted exchange. At 360px the cast strip wraps; options are full width.
figure: none
widget: none
checks: k-01
content: these points, in order:
  - **Cast strip** (five people): "**Jordan**, co-founder, managing the engineers: that's you, in this story. **Ari**, platform lead; runs Fennel's cluster. **Riley**, an engineer on the `catalog` team. **Morgan**, co-founder; runs Fennel's money. **Sam**, the founding engineer, who used to run every release by hand."
  - **D1, "I didn't read the last chapter. What happened?"** In Chapter 4 Fennel moved onto managed Kubernetes: the cluster keeps a record of what Fennel wants running, and many small loops each compare one part of it with what's running and close the gap (the ReplicaSet loop keeps a number of Pods, Kubernetes' wrapper around a running container; the scheduler gives each new Pod a node, a machine in the cluster; the node agent on that node starts it). In Chapter 5 Morgan asked why the first bill after the move went up. The answer was the two numbers each team wrote for its Pods: what each Pod reserves (its requests, in GB of memory and processor cores), which the scheduler places by, and what it may use (its limits). On a Friday at 17:45 a `dispatch` Pod waited, pending, because no node had room, until Ari's team added two more; the cluster has had five nodes since, 01, 02, 04, 05 and 06. To understand any loop, ask: which loop is it, what does it want, what does it see, and what does it do about a gap?
  - k-01.
  - **Then** (draft wording). In Fennel's first years, releases happened on Thursday nights. Each team's changes waited for that night; Sam ran the release by hand, one copy at a time, and posted in the team chat first: "Nobody deploy anything, I'm updating storefront." In Chapter 3 one such update took Sam the evening, and nobody else could ship until it was done.
  - **Now.** A few weeks after Morgan's bill, the team that looks after product listings and prices split them out of `storefront` into a service of its own, `catalog`, so that it could change prices and listings without waiting for the website's releases. Riley's team now ships `catalog` two or three times a day. When a change is merged, Fennel's build pipeline builds a new image and hands it to the cluster, and the release happens while everyone keeps working. Nobody posts in the chat.
  - **Jordan and Ari** (`.cp-quote` pair). Jordan: "So who's doing what Sam did on Thursday nights?" Ari: "A loop. We tell it which version we want." Jordan: "And if the version is bad?" Ari: "That depends on how it's bad."
  - **Hand-off:** this chapter follows one Thursday of `catalog` releases: one that goes the way most releases go, and one that doesn't.

### s-02 — One record per service: the Deployment
intent: Retrieve Ch 4's `kind: ReplicaSet` manifest, show that engineers write a Deployment that wraps it (f-01) and name it; explain that the Deployment loop manages versions by keeping one ReplicaSet per version and resizing them, fill in its loop lens, and say lightly where a new version comes from (the pipeline builds an image and writes its tag into the record).
objectives: o-1
claims: c-01
readiness: novice · interactivity: medium (a Deployment, the ReplicaSets it keeps, the version line that starts a change) · max-elements: 3
mode: retrieval of a known artefact → concrete artefact (manifest) → name (term card) → mechanism in words → the lens filled in → light context (the pipeline) · blueprint: none
layout:
  contiguity: inline. f-01's annotations sit on the lines they explain; the line Ch 4 already showed is marked as such on the figure.
  pacing: continuous
  redundancy: the prose doesn't re-read f-01 line by line; it states what the Deployment adds. The lens paragraph doesn't restate the mechanism paragraph; it puts it in the four blanks.
  scaffold: none
ux: Read two paragraphs, f-01 and TERM 01, then the mechanism, the lens and the pipeline paragraph. At 360px f-01's annotations drop under their lines.
figure: f-01 (`catalog`'s Deployment, shortened); TERM 01. See ## Figures.
widget: none
checks: none
content: these points, in order:
  - **Ch 4's manifest, retrieved.** In Chapter 4, Ari's manifest for `storefront` was a ReplicaSet: a record that says "keep this many identical copies of this Pod", with the image each copy runs. A ReplicaSet keeps a number of copies of one Pod description. Engineers rarely write one themselves.
  - **f-01:** `catalog`'s manifest, which looks almost the same: `kind: Deployment`, `replicas: 3`, and the same description of each copy, including `image: catalog:v62`.
  - **TERM 01** (payoff variant).
  - **What the Deployment adds** (c-01). A Deployment doesn't run Pods itself. For the version it currently wants, it keeps a ReplicaSet, and Chapter 4's ReplicaSet loop keeps that ReplicaSet's Pods running. When someone changes the Pod description, usually the image line, the Deployment's loop makes a *new* ReplicaSet for the new version and then, gradually, makes the new one bigger and the old one smaller. Changing only the number of copies doesn't start this; changing what each copy is does. Engineers write the Deployment; the ReplicaSets are its machinery, and they are left to it.
  - **The Deployment loop, through the loop lens** (pattern vs. implementation): "In Chapter 4's terms, this is one more implementation of the same pattern. It wants the version and the number of copies its record names. It sees its ReplicaSets, one per version, and how many of their Pods are ready. What it does about a gap: it moves copies from the old version's ReplicaSet to the new one, a few at a time." End: "What 'a few at a time' means, and what 'ready' means, are the next two sections."
  - **Where a new version comes from** (light; Ch 2 claims 04 and 07 by reference). When Riley's team merges a change, Fennel's build pipeline (engineers call it CI) builds a new image, `catalog:v63`, and pushes it to Fennel's registry, where images are kept and never change once built (Chapter 2). Then the pipeline does one more thing: it writes the new tag into the image line of `catalog`'s Deployment. That edit to the record is the whole release; everything after it is the loops' work. (Pipelines differ between teams; this is Fennel's.)

### s-03 — Thursday, 10:15: catalog v63
intent: Show, step by step on the Ch 4–5 canvas, the Deployment loop replacing `catalog` v62 with v63: a new ReplicaSet, one extra Pod in spare room, old Pods removed only as new ones become ready, the old ReplicaSet kept empty; gate the key transition on a prediction (k-02); then name the rolling update and compare it with Sam's Tuesday.
objectives: o-1
claims: c-01, c-02, c-03, c-09
readiness: novice · interactivity: high (wanted version; two ReplicaSets' WANT; four Pods for three wanted; ready vs. not ready; the removal rule) · max-elements: 3
mode: scene set-up → step-locked worked example (scrollytelling, B1) with a predict gate → name-after-meeting (term card) → comparison with a known case (Sam's Tuesday) · blueprint: B1
layout:
  contiguity: sticky. The canvas stays in view while lane R's steps scroll beside it (desktop) or beneath it (mobile). Versions, READY / NOT READY, each ReplicaSet's WANT and the CUSTOMERS line are on the canvas, not only in the text.
  pacing: step-revealed by scrolling; R3–R5 gated on k-02.
  redundancy: step text says what changed and why; it reads aloud only the one value each step turns on. After the lane, the prose doesn't replay the steps.
  scaffold: none
ux: Read the scene set-up (two short paragraphs), scroll R1–R2, commit to k-02 (three options) in the step column, scroll R3–R5, then read TERM 02 and the comparison paragraph. At 360px the canvas is sticky at the top (or inline per step where it wouldn't fit in 50vh); two node columns of about 150px; steps scroll beneath. No horizontal scroll.
figure: TERM 02. See ## Figures.
widget: w-rollout-scrolly (complexity: low) — lane R, "Thursday, 10:15", 5 steps on the pooled `renderCluster` and lane controller, data only, gated on k-02
checks: k-02
content: these points, in order:
  - **Scene set-up, before the lane** (two paragraphs). Where `catalog` runs: "When `catalog` arrived in the cluster, the scheduler put its three Pods where there was room, which by then meant the two newest nodes: one on node 05, next to the `dispatch` Pod that waited on that Friday in Chapter 5, and two on node 06. Each `catalog` Pod reserves 2 GB of memory. The other three nodes are nearly full, so the drawing leaves them out." What happens: "At 10:15 on Thursday, the pipeline writes `catalog:v63` into the Deployment's record." How to read the canvas: "The drawing is Chapter 5's, with three changes. The record now has a Deployment row, with the version it wants, over one row per ReplicaSet. Each `catalog` Pod carries its version in its label and its colour. And Pods say READY rather than RUNNING, because from now on that is the difference that matters: Kubernetes sends a Pod customers' requests only once it is ready, which means once it passes a check the team wrote. §05 opens that check up."
  - **Lane R** (steps under ## Widgets).
  - **TERM 02** (rolling update), right after the lane.
  - **Sam's Tuesday, compared** (Ch 3 by reference): the same three rounds of start one, stop one, using one copy's worth of spare room, as Sam did for `storefront`; but it took about a minute instead of an evening, nobody had to post "Nobody deploy anything", other teams kept shipping, and the loop decided "ready" by the team's check rather than by Sam looking. One sentence for later: the emptied v62 ReplicaSet is still in the record, and §07 shows why that matters.

### s-04 — Room to ship
intent: State the default pace of a rolling update (one extra Pod, none short, for three copies) and its cost in spare room, and let the reader predict what happens when no node has room (k-03), connecting releases to Ch 5's headroom.
objectives: o-1
claims: c-02, c-03
readiness: novice · interactivity: low (one extra copy; no copy short; room for it) · max-elements: 2
mode: rule in words → apply to a known situation (Ch 5's full cluster) → debrief · blueprint: none
layout:
  contiguity: adjacent
  pacing: continuous; k-03 comes after the rule and before the sentence that says what happens with no room.
  redundancy: the prose gives the percentages once, then only their meaning for `catalog`.
  scaffold: D2, collapsed: "What about a service with more copies?"
ux: Read two short paragraphs, commit to k-03, read the debrief paragraph; optionally open D2. At 360px options are full width.
figure: none
widget: none
checks: k-03
content: these points, in order:
  - **The pace, by default** (c-02, c-03). With default settings a rolling update may run up to a quarter more Pods than wanted, rounded up, and may let up to a quarter of the wanted Pods be unavailable, rounded down. For `catalog`'s three copies that means one extra Pod and none short: at least three Pods ready to serve at every moment, and at most four in all. Teams can change both numbers; that's for your engineers to tune.
  - **The cost:** while the extra Pod runs, it needs room: for `catalog`, 2 GB of memory and a quarter of a core on some node. In Chapter 5, room kept free on purpose looked like insurance against losing a node; it is also room to ship.
  - k-03 (the Friday-at-17:45 cluster, with no node holding 2 GB free).
  - **Debrief** (x-03, as a consequence of the settings; Ch 5 claims 20–21): nothing breaks and nothing rolls back; the new Pod waits, pending, the old Pods keep serving, and the release simply doesn't happen until someone makes room, as on that Friday. One question for Jordan's list: "Do we keep enough spare room to release during the busiest hour?"
  - **D2, "What about a service with more copies?"** (c-02 note, x-02, hedged): with four copies the defaults allow one extra and one short, so the Deployment may remove one old Pod before any new one is ready and move roughly two at a time, running at three of four for a while; a larger service can make progress even with no spare room, by giving up a copy. Teams can set both numbers, including to zero extra.

### s-05 — What "ready" means
intent: Open up the check behind READY: the readiness probe (ready for traffic; a failing Pod is sent no traffic and not restarted) versus the liveness probe (still alive; a failing container is restarted), both run by the node agent, and what happens with no probe at all; apply the distinction to a new case (k-05).
objectives: o-2
claims: c-06, c-07
readiness: novice · interactivity: medium (two checks with the same form and different consequences; the default when there's none) · max-elements: 3
mode: question from the lane → contrasting cases in one figure → name (term card) → the default case → apply (new case) · blueprint: none
layout:
  contiguity: inline. f-02 puts both probes in one grid with the same rows, so the one row that differs (what happens on failure) lines up.
  pacing: continuous; k-05 after f-02 and TERM 03.
  redundancy: the prose doesn't repeat f-02's rows; it adds who runs the checks, how often, and the no-probe default.
  scaffold: none
ux: Read a paragraph, study f-02 (two columns, same rows), read TERM 03 and two paragraphs, commit to k-05. At 360px f-02 stacks its two columns (readiness first) with the row labels repeated in each.
figure: f-02 (two checks on one Pod); TERM 03. See ## Figures.
widget: none
checks: k-05
content: these points, in order:
  - **The question from the lane:** how did the Deployment loop know the first v63 Pod was ready? It didn't look at the Pod; it read a result. The node agent on each node (Chapter 4's loop that starts containers) runs checks the team wrote into the Deployment's Pod description, again and again, by default every ten seconds, and reports each result.
  - **f-02**, then **TERM 03** (readiness probe).
  - **The readiness probe** (c-06): it asks "ready for traffic?". `catalog`'s asks by requesting a path, `/healthz`, and any success code counts as a pass. While it fails, the Pod keeps running but is sent no customer requests (by a loop we'll name in Chapter 7), and a rollout doesn't count it. It runs for the Pod's whole life, not only at the start, so a Pod that becomes unready later is taken out of traffic and put back when it passes again.
  - **The liveness probe** (c-06; Ch 3's "noticing a container that's running but stuck"): it asks "still alive?". When it fails, the node agent restarts the container, as it restarted `notifications` in Chapter 4. It exists for a container that is running but stuck, such as one waiting forever on itself, which no crash would reveal. (`dfn` for liveness probe; no card.)
  - **No probe at all** (c-07): a container with no check of a kind is treated as passing it. Without a readiness probe, a Pod counts as ready as soon as its container is running.
  - k-05.

### s-06 — Two ways to be bad
intent: Confront m-09 with the chapter's core predict-then-reveal: a v64 that crashes stalls with v63 still serving, while a v64 that passes its check but shows $0 replaces every Pod (k-04, f-03); explain why (availability, not correctness: a check passes on a status code), that a stalled rollout is not rolled back (local-01), that checks test only what they were written to test (local-02); give the handover analogy with its breaks; name canary and blue-green.
objectives: o-2
claims: c-04, c-05, c-07, c-08, c-12
readiness: novice · interactivity: high (two versions differing in one feature; two outcomes; the reason) · max-elements: 3
mode: misconception stated fairly → predict-then-reveal (contrasting cases) → correct model → the model also explains the case the misconception got right → analogy with breaks → what teams add · blueprint: B4
layout:
  contiguity: adjacent. f-03's two panels sit side by side on desktop with matching headers, so the one difference (crash vs. $0) and its outcome line up; the CUSTOMERS line on each panel states the outcome for customers.
  pacing: gated on k-04: f-03 and the paragraphs after it stay locked ("Answer the question above to see the two outcomes") until the reader commits.
  redundancy: the prose after f-03 explains why, not what; it doesn't re-describe the panels.
  scaffold: D3, collapsed: "How long does Kubernetes wait on a stuck rollout?"
ux: Read the fair statement, commit to k-04 (four options), see f-03 and the reveal, read three paragraphs, the analogy aside and the canary/blue-green paragraph. At 360px f-03's panels stack (crash case first), each about 330px tall.
figure: f-03 (two ways v64 could be bad), drawn with the pooled renderer from w-rollout-scrolly's data file; the handover aside. See ## Figures.
widget: none
checks: k-04
content: these points, in order:
  - **The fair part** (m-09 stated). What the reader just saw is a real safety net: at no moment were fewer than three `catalog` Pods ready, and a v63 Pod took over only after its check passed. It's tempting to conclude that a release which finishes rolling out must be fine. Engineers say it too: "it passed its health checks".
  - k-04.
  - **f-03** (gated), then the reveal: the second panel is what happened on Thursday at 14:02.
  - **Why** (c-04, c-08, c-07). A crashing container never becomes ready, with or without a check, so the Deployment loop never has a ready v64 Pod to count, never removes a v63 one, and the rollout stops where it is. The `$0` version started, answered its check with a success code, and was ready by every measure Kubernetes has: a check passes on the response's status code alone, and nothing in Kubernetes looks at what the app sends back. `catalog`'s check asks whether the app is up and can reach its database. It never looks at a price. A rolling update protects *availability*: there are always enough copies running. It knows nothing about *correctness*.
  - **Stalled isn't rolled back** (local-01; c-04, c-05). In the left panel, "stops" means stops advancing: the v64 Pod keeps crash-looping, the v63 Pods keep serving, and Kubernetes waits for someone to roll back or ship a fix. It doesn't go back by itself. D3 holds the timing.
  - **The handover aside** (`.cp-aside`, ANALOGY): "You know this from shift changes. A shop manager sends the morning cashier home only once the afternoon cashier has signed in and opened a till. The Deployment loop does the same: it removes an old Pod only once a new one has passed its check." **WHERE THIS ANALOGY BREAKS:** "A manager at the counter would notice a new cashier charging nothing for the groceries within a minute. The Deployment loop never sees a single sale. It sees only the result of the check the team wrote, and as long as that passes, it carries on."
  - **What teams add** (c-12): to catch wrong behaviour before every customer sees it, teams use releases that go to a small share of customers first while someone (or something) watches (a *canary* release), or run the new version beside the old and test it before switching traffic over all at once (a *blue-green* release). A plain Deployment does neither by itself, and doesn't roll back on its own; tools such as Argo Rollouts add them on top. Fennel uses neither, yet.
  - **D3, "How long does Kubernetes wait on a stuck rollout?"** (c-05): by default, if a rollout makes no progress for 10 minutes, Kubernetes marks it as having failed to progress and keeps retrying; that's all. A pipeline or an add-on tool can watch for that mark and roll back, if a team sets one up.

### s-07 — Thursday, 14:02: six minutes at $0
intent: Tell the incident through a timeline (f-04): v64 rolls out in about a minute, Morgan notices $0 orders, Riley rolls back; let the reader predict what rolling back does (k-06); then explain rollback as declaring v63 again, which the Deployment loop rolls out like any other change from the ReplicaSet it kept (f-05, TERM 04), bringing Ch 4's level-based behaviour into the main text.
objectives: o-3
claims: c-01, c-09, c-10
readiness: novice · interactivity: medium (the record's wanted version; the kept ReplicaSet; the loop acting on the current gap) · max-elements: 3
mode: concrete story (timeline) → predict → mechanism (record at three moments) → name (term card) · blueprint: none
layout:
  contiguity: inline. f-04's price status sits in a band beside each row, labelled with a word; f-05's three record panels share one layout, so only the changed values move.
  pacing: gated on k-06: f-05 and the reveal paragraph stay locked until the reader commits.
  redundancy: the prose doesn't narrate f-04 row by row; it picks out who noticed and how. The reveal doesn't restate f-05's numbers.
  scaffold: D4, collapsed: "Undo with a command, or change the file back?"
ux: Read a paragraph, read f-04 (eight rows), commit to k-06 (three options), see f-05 and the reveal, read TERM 04 and the level-based paragraph; optionally open D4. At 360px f-04 is a single column with the band on the left edge; f-05's panels stack.
figure: f-04 (Thursday 14:02–14:08, a timeline); f-05 (the record, three times); TERM 04. See ## Figures.
widget: none
checks: k-06
content: these points, in order:
  - **The afternoon** (story). v64 changed how `catalog` reads prices from its database. A field had been renamed, so every price came back empty, and the app showed it as $0.00. The change passed the team's tests, the pipeline built `catalog:v64`, and at 14:02 it wrote the new tag into the Deployment.
  - **f-04.**
  - **Who noticed:** not Kubernetes, and not a dashboard: Morgan, three minutes in, from the orders. (A short sentence; Chapter 12 is about noticing.)
  - k-06 (Riley rolls back at 14:07: what does Kubernetes do?).
  - **f-05** (gated) and **the reveal** (c-10, hedged; c-09). Rolling back is a change to the record like any other: it puts v63's Pod description back into the Deployment. The Deployment loop sees what it always looks for, a gap between the version the record wants and the version its Pods run, and closes it. It already has a ReplicaSet for v63, kept with zero Pods since 14:03, so it uses that one, and, with the default settings, it fills it and empties v64's the same gradual way it does any change. That is why the rollback also took about a minute, and why it needed the same spare room.
  - **TERM 04** (rollback).
  - **Level-based, in the main text** (Ch 4 claim 04): the loop doesn't know this is an "undo". It has no list of steps to replay backwards; it compares the latest record with what's running, now, and heads for the record. If the record had changed again mid-way, it would simply have headed for the newer one.
  - **How far back** (c-09): by default a Deployment keeps its last ten old ReplicaSets, emptied, and each is one version it can go back to; once one is deleted, that version is gone from the record.
  - **D4, "Undo with a command, or change the file back?"** (c-10 note): engineers can roll back with a command (`kubectl rollout undo`) that changes the cluster's record directly, or by changing the image line back in the team's files and letting the pipeline apply it. The command is faster, but it leaves the files still naming v64, so the next time the pipeline applies them, v64 rolls out again. Kubernetes' documentation warns against managing one object both ways. Changing the file back is the declarative rollback; GitOps tools (Chapter 13) make it the only way. Riley changed the file back.

### s-08 — What going back assumes
intent: Make the two assumptions behind rollback concrete (the old image is still in the registry; the version tag still means the same image: tags vs. digests, f-06) and state what rollback doesn't undo (the 23 orders placed at $0), each as a question a manager can ask.
objectives: o-3
claims: c-01, c-09, c-11
readiness: novice · interactivity: low (two assumptions, one limit) · max-elements: 3
mode: assumptions made concrete → two questions to ask · blueprint: none
layout:
  contiguity: inline. f-06's annotations sit on the two image lines and on the registry strip they refer to.
  pacing: continuous
  redundancy: the prose states each assumption once and turns it into a question; it doesn't re-describe f-06.
  scaffold: none
ux: Read three short paragraphs and f-06, then the two-question list. At 360px f-06 stacks the manifest lines above the registry strip.
figure: f-06 (a tag and a digest). See ## Figures.
widget: none
checks: none
content: these points, in order:
  - **The record keeps names, not images** (c-09 note; Ch 2 claim 07). The kept v63 ReplicaSet holds the *name* of the image, `catalog:v63`; the image itself lives in Fennel's registry, and the Pods download it when they start. If the image had been deleted, the rolled-back Pods couldn't start: they would wait, retrying, and the rollback would stall like any bad rollout. Fennel's registry deletes `catalog` images after 30 days to save space, so Riley's team can go back about a month, and no further.
  - **f-06**, then **tags and digests** (c-11; Ch 2 claim 08). An image never changes once built (Chapter 2), but the tag pointing at it can: a tag such as `v63` or `latest` can be moved to a different image, and Pods started from it at different times would then run different code. A digest, the image's fingerprint, always names one exact image. Fennel's pipeline never reuses a tag, which is what makes "go back to v63" mean the same v63.
  - **What rollback doesn't undo** (c-01 note: only the Pod description is rolled back; local-03). Twenty-three orders went through at $0 between 14:02 and 14:08, and they stayed that way: rollback changes which version the Pods run, and nothing the bad version already did, such as orders written or emails sent. Jordan and Morgan decided to honour them. Chapter 10 is about data that has to outlive the Pods that wrote it.
  - **Two questions for the list** (`.cp-recap`-style two-line list): "Do we keep old images for as long as we might need to go back, and do our tags ever move?" and "If a bad version runs for six minutes, what will it have written that rolling back won't fix?"

### s-09 — The loops so far
intent: Add the Deployment loop's row to the course's loop lens table (and the readiness clauses to the node agent's and Chapter 7's rows), so the reader sees it as one more implementation of the same pattern beside the others.
objectives: o-1
claims: c-01, c-06
readiness: novice · interactivity: low (one new row; two changed cells) · max-elements: 2
mode: consolidation (the course table) · blueprint: none
layout:
  contiguity: inline. NEW IN CH 6 tags sit in the cells that changed.
  pacing: continuous
  redundancy: one lead-in sentence; the table carries the content; the caption gives the takeaway.
  scaffold: none
ux: Read one sentence, scan f-07 (seven rows; the new one tagged). At 360px the table becomes stacked cards (loop name as a mono header; four labelled lines).
figure: f-07 (the loop lens table, Ch 6). See ## Figures.
widget: none
checks: none
content: these points, in order:
  - Lead-in: "The Deployment loop joins the loops from Chapters 4 and 5. It doesn't replace any of them: it works through the ReplicaSet loop, which works through the scheduler and the node agents."
  - f-07.

### s-10 — The conversation
intent: Rehearse CO-4 with the chapter's conversation (Riley: "The rollout passed health checks, so it wasn't the deploy."), as a think-then-reveal whose model answer interleaves all three objectives; recap; bridge to Ch 7.
objectives: o-2, o-3
claims: c-08, c-10, c-11, c-12
readiness: novice · interactivity: medium (checks vs. correctness; what would catch it; going back) · max-elements: 3
mode: think-then-reveal (apply) → recap → forward bridge · blueprint: none
layout:
  contiguity: adjacent
  pacing: think-then-reveal: the model answer is hidden until "Show the answer".
  redundancy: the recap lists ideas, not the story; it doesn't repeat k-07's model answer.
  scaffold: none
ux: Read a two-line scene, think, reveal k-07's model answer, read the recap (five lines) and the bridge paragraph. At 360px all full width.
figure: none
widget: none
checks: k-07
content: these points, in order:
  - **The scene:** Friday morning, the review of Thursday's incident. Riley, a little defensive: "The rollout passed health checks, so it wasn't the deploy."
  - k-07.
  - **Recap** (`.cp-recap`): a Deployment is a record of which version should run and how many copies; its loop keeps one ReplicaSet per version and shifts copies between them a few at a time, removing old Pods only as new ones become ready, which needs spare room; the readiness probe decides "ready for traffic", the liveness probe "still alive, or restart it"; a version that crashes or never becomes ready stalls with the old version serving, but one that passes its checks and does the wrong thing rolls out completely; rolling back is declaring the old version again, rolled out the same way from the ReplicaSet the Deployment kept, as long as the old image is still there, and it doesn't undo what the bad version did.
  - **Bridge** (forward-looking): "All through this chapter, 'only ready Pods are sent traffic' was the work of a loop we haven't named. Every release gives `catalog` three new Pods, with new names and new addresses, and `storefront` still has to find them, at once, and only the ready ones. Chapter 7 is about how callers find a service whose Pods never stay put."

## Figures

### f-01 — `catalog`'s Deployment, shortened (s-02)
- **Model.** Ch 4's f-02 manifest treatment (`.mf`, `c4` on `c4-soft`, annotations beside lines; Ch 5's f-01 extends it), header `FIG. 01 · A DEPLOYMENT · CATALOG`. Lines: `kind: Deployment` (annotation, key: "the kind of record: a version, and how many copies"), `metadata:` / `name: catalog`, `spec:`, `replicas: 3` ("as in Chapter 4: three copies"), `template:` ("what each copy is; changing it starts a rollout"), a comment `# … labels, checks and other details left out` (the probes appear in f-02), `spec:` / `containers:` / `- name: catalog`, `image: catalog:v62` (annotation, key: "the version to run; the pipeline changes this line"). A thin bracket in the margin around `replicas` and `template` is labelled `CHAPTER 4'S REPLICASET HELD THIS PART`.
- **Caption.** "Fig. 01. Engineers write a Deployment rather than a ReplicaSet. It keeps the same description of each copy and adds what Chapter 4's manifest couldn't do: move from one version to the next. Shortened; real ones have a few more lines."
- **Size.** Desktop prose width, about 340px tall. Under 600px annotations drop under their lines, about 560px.

### f-02 — Two checks on one Pod (s-05)
- **Model.** A static two-column grid (contrasting cases), header `FIG. 02 · TWO CHECKS ON ONE POD`. Above the grid, one `catalog` Pod chip (v63, `c2`, READY) with a `↻ agent` pill beside it labelled `RUNS BOTH, EVERY 10 S BY DEFAULT`. Columns: `READINESS PROBE` | `LIVENESS PROBE`. Rows, labelled on the left (repeated in each card on phones):
  1. `ASKS` · "Ready for traffic?" | "Still alive?"
  2. `CATALOG'S CHECK` (mono, the manifest lines, `c4` ground) · `readinessProbe: httpGet: path: /healthz` with "the app is up and can reach its database" | `livenessProbe: httpGet: path: /livez` with "the app is up and not stuck"
  3. `PASSES WHEN` · "any success code (200–399)" | same
  4. `WHEN IT FAILS` · status word `NO TRAFFIC` (`warn`) + "keeps running; sent no requests; a rollout doesn't count it" | `RESTARTED` (`bad`) + "the node agent restarts the container"
  5. `WITH NO PROBE` · "always passes: ready once running" | "always passes"
  Row 4 is the only row whose two cells differ in kind; it gets the 3px ink highlight outline.
- **Caption.** "Fig. 02. Both checks ask a question the team wrote, and pass on any success code. Only what happens on failure differs: no traffic, or a restart."
- **Size.** Desktop `.d-wide`, about 300px tall. Under 600px two stacked cards (readiness first), about 640px at 360px.

### f-03 — Two ways v64 could be bad (s-06, revealed after k-04)
- **Model.** Two snapshots drawn by the pooled `renderCluster` from `site/widgets/w-rollout-scrolly/data.js` (its `FIGURES` entry; same nodes, services, version colours and strings as lane R; `opts.header` without a step counter), inside one figure plate `FIG. 03 · TWO WAYS v64 COULD BE BAD`. Each panel has a mono head line above its drawing.
  - **Left, `IF v64 CRASHED ON START · 14:03`.** Record: Deployment `catalog · WANT 3 · v64`; ReplicaSet v63 WANT 3 `●●●` `3 READY`; ReplicaSet v64 WANT 1, one hollow mark, `0 READY`. Nodes: 05 `dispatch`, v63, v63; 06 v63, v64 `CRASHED ↻ 3` (`c5`, `bad` word). CUSTOMERS note (good): `served by v63 ×3 · prices correct`. Loop lens line: `SEES · v64 Pod not ready / DOES · waits; removes no v63 Pod`.
  - **Right, `v64 AS SHIPPED · 14:03`.** Record: Deployment `catalog · WANT 3 · v64`; ReplicaSet v63 WANT 0 `KEPT`; ReplicaSet v64 WANT 3 `●●●` `3 READY`. Nodes: 05 `dispatch`, v64, v64; 06 v64, all READY (`c5`). CUSTOMERS note (bad): `served by v64 ×3 · every price $0.00`. Lens: `SEES · 3 v64 Pods ready, as wanted / DOES · nothing more`.
  - Only the CUSTOMERS lines and the v64 chips carry the step highlight.
- **Caption.** "Fig. 03. The rollout stops a version whose Pods never become ready (one that started but failed its readiness check would stall the same way). A version that passes its check rolls out completely, whatever it shows customers."
- **Gate.** Locked until k-04 is committed (the lane's lock pattern: reserved height, "Answer the question above to see the two outcomes"); never re-locks.
- **Size.** Desktop `.d-wide`, two panels side by side, each about 440px wide, about 420px tall. Under 900px stacked (left first), each about 330px tall at 360px. Each panel has its own `aria-label` (the state in words, from `data.js`).

### f-04 — Thursday, 14:02–14:08 (s-07)
- **Model.** Ch 1's incident timeline grammar (a data-driven list with a status band; `CH06_INCIDENT` in `site/assets/page.js`), header `FIG. 04 · THURSDAY, 14:02–14:08`. The band is labelled `PRICES` with a word per row: `CORRECT` (`good`), `SOME $0` (`warn`), `ALL $0` (`bad`). Rows (time mono, `~` where approximate):
  1. 14:02:00 · The pipeline writes `catalog:v64` into the Deployment. · CORRECT
  2. ~14:02:20 · The first v64 Pod passes its check and is sent traffic. Some customers see $0.00. · SOME $0
  3. ~14:03:00 · The rollout completes: three v64 Pods, all ready. The v63 ReplicaSet is kept, empty. · ALL $0
  4. 14:05 · Morgan, in the team chat: "Why are orders coming in at $0.00?" · ALL $0
  5. 14:06 · Riley opens the app: every product shows $0.00. · ALL $0
  6. 14:07 · Riley changes `catalog`'s image line back to v63, and the pipeline applies it. · ALL $0
  7. ~14:08:20 · The last v64 Pod is removed. · CORRECT
  8. (row with no time, `ink-3`) · 23 orders were placed at $0.00 in between. They stay that way. · (no band)
  Row 7's step from v63 back is described only as "the last v64 Pod is removed", so the timeline doesn't give away k-06's answer.
- **Caption.** "Fig. 04. Six minutes of $0 prices: about one minute to roll out, five to notice and decide, and about one to roll back. Times are approximate."
- **Size.** Desktop prose width, about 380px. Under 600px one column with the band on the left edge, about 600px.

### f-05 — The record, three times (s-07, revealed after k-06)
- **Model.** Three small record panels (`c4` on `c4-soft`, Ch 4's record grammar, static HTML), side by side, each headed by its time: `14:01`, `14:04`, `~14:08:30`. Each holds a Deployment row (`DEPLOYMENT · catalog · WANT 3 · vNN`) over two ReplicaSet rows with WANT, marks and word:
  - 14:01 · wants v63 · ReplicaSet v63: WANT 3 `●●●` `3 READY` · ReplicaSet v64: (no row yet; a dashed placeholder `NOT YET CREATED`, `ink-3`)
  - 14:04 · wants **v64** · v63: WANT 0 `KEPT` · v64: WANT 3 `●●●` `3 READY`
  - ~14:08:30 · wants **v63** · v63: WANT 3 `●●●` `3 READY` (the same row, filled again) · v64: WANT 0 `KEPT`
  The changed values in each panel (the wanted version, the two WANTs) get the highlight; a thin `ink-3` connector under the v63 row across all three panels is labelled `THE SAME REPLICASET, KEPT AND REUSED`.
- **Caption.** "Fig. 05. Rolling back changes the wanted version back to v63. The Deployment fills the v63 ReplicaSet it kept, as it would for any new version, and keeps v64's in turn."
- **Gate.** Locked until k-06 is committed.
- **Size.** Desktop `.d-wide`, three panels, about 180px tall. Under 600px stacked, about 520px.

### f-06 — A tag and a digest (s-08)
- **Model.** Static, header `FIG. 06 · WHICH v63?`. Left: two manifest lines (`.mf`, `c4`): `image: catalog:v63` (annotation: "a tag: a name that can be moved") and `image: catalog@sha256:9d2e…41a7` (annotation: "a digest: names one exact image, forever"). Right: Ch 2's registry grammar, a `REGISTRY` frame with a vertical stack of image chips `catalog:v64`, `v63`, `v62`, `v61` (older at reduced opacity, as in Ch 2), each chip with a short digest under its tag; below them a dashed, empty chip `catalog:v31 · DELETED AFTER 30 DAYS` (`ink-3`). A mono line under the frame: `FENNEL'S PIPELINE NEVER REUSES A TAG`.
- **Caption.** "Fig. 06. Going back works only if the old image is still in the registry and its tag still points at it. A digest can't be moved; a tag can, unless the team never reuses one."
- **Size.** Desktop prose width, about 260px. Under 600px stacked (lines above the registry), about 460px.

### f-07 — The loop lens, Ch 6 (s-09)
- **Model.** Ch 5's f-06 table (a copy, not an edit), header `FIG. 07 · WHICH LOOP: WANTS, SEES, DOES`, built from a `CH06_LOOPS` array in this chapter's `site/assets/page.js`: Ch 5's `CH05_LOOPS` copied forward with Ch 5's `added` / `newPart` tags dropped, Ch 6's changes tagged `NEW IN CH 6`:
  1. **node loop** · unchanged.
  2. **Deployment loop** (`added: ['loop']`, new row, placed above the ReplicaSet loop because it works through it) · wants: each Deployment's Pods running the version its record names, as many as it names · sees: its ReplicaSets, one per version, and how many of their Pods are ready · does: for a new version, makes a new ReplicaSet and shifts copies to it a few at a time, removing old Pods only as new ones become ready; keeps old ReplicaSets, empty, for going back · job: updating.
  3. **ReplicaSet loop** · unchanged.
  4. **scheduler** · unchanged.
  5. **node agent** (one per node) · does gains a clause (`newPart`): "…; runs each container's checks: restarts a container that fails its liveness check, and reports one that fails its readiness check as not ready".
  6. (dashed) **another loop, Chapter 7** · sees: "where each service's *ready* Pods are running" (`newPart: 'ready'`); does: "keeps callers' routes current, sending requests only to ready Pods" (`newPart`).
  7. (dashed) **a loop that adds nodes, Chapter 8** · unchanged.
- **Caption.** "Fig. 07. The Deployment loop doesn't run a single Pod itself: it resizes ReplicaSets, and the loops below it do the rest."
- **Size.** Desktop `.d-wide`, about 400px tall. Under 600px stacked cards, about 1000px at 360px.

### Term cards — `.cp-term` (s-02, s-03, s-05, s-07)
Ch 3's treatment, unchanged (CURRICULUM §8 step 4): outlined plate, mono `accent` kicker `NEW TERM · 0N / 04`, the term large in the heading face, one definition sentence, a mono `ink-3` back line. The prose's first use is a `dfn` with `aria-describedby` pointing to the card.
- **TERM 01 · Deployment** (s-02), **payoff variant** (blueprint ground; the chapter's only one). Definition: "A record of which version of a service should run, and how many copies. Its loop gets there by keeping one ReplicaSet per version and resizing them." Back: "What engineers write instead of Chapter 4's ReplicaSet."
- **TERM 02 · rolling update** (s-03). Definition: "Replacing a service's Pods with a new version a few at a time, removing old Pods only as new ones become ready." Back: "Sam's Tuesday, done by a loop."
- **TERM 03 · readiness probe** (s-05). Definition: "A check, written by the team and run by the node agent throughout a Pod's life, that decides whether the Pod may be sent traffic." Back: "Ready for traffic. Not 'correct'."
- **TERM 04 · rollback** (s-07). Definition: "Declaring an earlier version again. The Deployment rolls it out like any other change, from the ReplicaSet it kept." Back: "It changes what runs, not what already happened."
- `dfn` only (no card): Deployment loop (s-02), liveness probe (s-05), canary release, blue-green release (s-06), digest (s-08).

## Visual grammar

Extends Ch 1–5's grammar (CURRICULUM §5 Visuals column), which is unchanged. The rule from the user's reviews drives every new item: **things different in kind look different.** Four pairs matter here: old vs. new version, ready vs. not ready, alive vs. ready, and what's wanted (the record) vs. what's running.

- **Versions look different, by colour and label.** `catalog`'s Pod chips are coloured by version, fixed across the chapter: **v63 = `c2`** (blue) wherever it appears (the lane's arriving version, the version rollback restores); **the other version in a drawing = `c5`** (v62 in lane R; v64 in f-03, f-04's related figures and f-05). v62 and v64 never appear in the same drawing. Every chip also prints its version (`catalog v63`), so colour is never the only channel. Other services' Pods (the one `dispatch` Pod on node 05) keep the course's `c1`. f-06's registry chips follow Ch 2's image grammar, not the version colours.
- **READY vs. NOT READY.** In this chapter a running Pod's status word is `READY` (`good`; with no readiness probe a running Pod is ready, c-07, so the `dispatch` Pod reads READY too). `NOT READY` (`warn`) is a solid chip (the container is running) with a hollow lamp, and its record mark is hollow. The record's row word reads `n READY`. NOT STARTED, CRASHED (`↻ n`), STOPPED (an old Pod removed in that step, Ch 3's word, `ink-3`) keep their Ch 3–4 looks.
- **The record: a Deployment over its ReplicaSets.** `c4` on `c4-soft`, as always. A Deployment header row `DEPLOYMENT · catalog · WANT 3 · v63` (the wanted version in mono, highlighted when it changes) over indented ReplicaSet rows `ReplicaSet v62 · WANT n · marks · n READY`. An emptied ReplicaSet row reads `WANT 0 · KEPT` (`ink-3`): kept, not deleted. A ReplicaSet not yet created has no row.
- **Alive vs. ready** (f-02 only): `RESTARTED` (`bad`) vs. `NO TRAFFIC` (`warn`) as the two outcome words.
- **Who is served:** Ch 4's CUSTOMERS note line under the nodes, naming the versions serving and, in f-03, what customers see (`good` or `bad` tone).
- **Price status** (f-04): a `PRICES` band per timeline row with `CORRECT` / `SOME $0` / `ALL $0`, word plus colour (Ch 1's status band).
- **Loop pill:** `↻ Deployment loop` (`c3`, Ch 4's pill grammar); its lens line `SEES · … / DOES · …`.
- Ch 4–5's nodes, Pod ring, GB units, `N GB FREE`, node agent pills, waiting strip, clock kicker and step highlight are unchanged.

## Widgets

### w-rollout-scrolly
segment: s-03
complexity: low
blueprint: B1 (step-locked canvas as scrollytelling), one lane of 5 steps, gated on k-02; its data file also holds f-03's two snapshots
model: One lane over the Ch 4–5 cluster drawing, rendered by the pooled `renderCluster` and run by the pooled lane controller (`pool/cluster/cluster.js`, `pool/cluster/lanes.js`) from a **complete snapshot per step**, so scrolling back restores any step exactly. Data only: every reader-visible string, the lane and f-03's two snapshots live in `site/widgets/w-rollout-scrolly/data.js`. It needs the three pool additions below, which the orchestrator schedules before the build; with them in place there is no widget code, so the page builder builds it (`complexity: low`).
  - **Units and nodes:** Ch 5's `CAPACITY { memory: 13, cpu: 3.9 }`, `UNIT 'GB'`, `ROOM_UNIT 2`. `NODES: ['05', '06']` only (the scene set-up says why; one note line `NOT DRAWN · NODES 01, 02, 04 · 1 GB FREE EACH`, `mute`, in every step).
  - **Services:** `catalog` 2 GB · 0.25 cores, 3 copies; `dispatch` 2 GB · 1 core (the Pod `di7` from Ch 5, on 05, READY throughout).
  - **Mechanism rules (claims):** a change of image in the Deployment's record makes a new ReplicaSet; the Deployment loop makes the new one bigger and the old one smaller (c-01); with 3 copies and the defaults, at most 4 Pods exist and at least 3 are ready (c-02, c-03); an old Pod is removed only once a new one is ready (c-03), and "ready" is the readiness check passing (c-06); placement follows Ch 5's defaults (room, then spreading copies); the emptied ReplicaSet is kept with 0 Pods (c-09).
  - **Pods:** `c1`–`c3` (v62: on 05; on 06; on 06), `n1`–`n3` (v63), `di7` (dispatch). `PODS[id].version` and `PODS[id].series` (v62: 5, v63: 2; pool addition 3).
  - **Placements (the defaults, worked):** start: 05 `di7`, `c1`; 06 `c2`, `c3` (4 GB each, 9 GB free each). `n1` → 05 (fewer `catalog` copies); `c2` removed (from 06, the node with two v62 Pods); `n2` → 06; `c1` removed; `n3` → 05; `c3` removed. End: 05 `di7`, `n1`, `n3` (6 GB, 7 free); 06 `n2` (2 GB, 11 free).
  - **f-03 snapshots** (`FIGURES.crash`, `FIGURES.shipped`): Pods `b1`–`b3` (v64, series 5) and `x1` (v64, crashed, `restarts: 3`). Crash: 05 `di7`, `n1`, `n3`; 06 `n2`, `x1:crashed`. Shipped: 05 `di7`, `b2`, `b3`; 06 `b1`. Records and notes as in ## Figures f-03.
  - **Strings:** `STRINGS.status.running: 'READY'`, `status.notready: 'NOT READY'`, `status.stopped: 'STOPPED'`, `record.running: 'READY'`, `record.kept: 'KEPT'`, `record.deployment: 'Deployment'`, `record.replicaSet: 'ReplicaSet'`; loop `deploy: { label: 'Deployment loop' }`, `rs: { label: 'ReplicaSet loop' }`, `sched: { label: 'scheduler' }`.
reader_does: Scrolls through one lane. At the end of R2 commits to k-02 (three options) in the step column; the commit unlocks R3–R5. Any option unlocks; the check's feedback explains a wrong pick. The canvas has no controls.
shows: Canvas header `W-01 · THE CLUSTER`, lane name `THURSDAY, 10:15 · CATALOG v63`, the clock kicker, `STEP n / 5`. Step text is draft wording (one to three sentences each; flowing, cause and effect).
  - **R1 · 10:15:00.** Record: Deployment `catalog · WANT 3 · v63` (version highlighted); ReplicaSet v62 WANT 3 `●●●` `3 READY`; new ReplicaSet v63 WANT 1, no marks, `SHORT 1` (row highlighted). `↻ Deployment loop` active; lens `SEES · record wants v63; 3 Pods run v62` / `DOES · makes a v63 ReplicaSet, wanting 1`. Nodes unchanged. CUSTOMERS: `served by v62 ×3`. Text: "At 10:15 the pipeline writes `catalog:v63` into the Deployment's record. The Deployment loop notices that the version it wants is no longer the version its Pods run. It makes a new ReplicaSet for v63 and gives it one copy to keep, on top of v62's three."
  - **R2 · seconds later.** `n1` (v63) on 05, `NOT READY` (highlighted); 05 free 7 GB; v63 row: one hollow mark, `0 READY`. Pills: ReplicaSet loop and scheduler shown, Deployment loop active; lens `SEES · 4 Pods; the v63 Pod not ready` / `DOES · waits`. CUSTOMERS: `served by v62 ×3`. Text: "The ReplicaSet loop writes a record for the new Pod, the scheduler puts it on node 05, where there is room for it, and the node agent starts it. For a moment `catalog` has four Pods, one more than the record wants, and that extra Pod is the spare room a rollout uses. Customers are still sent only to the three v62 Pods, because the new one isn't ready yet." Then **k-02**.
  - **R3 · ~10:15:20 (gated on k-02).** `n1` READY (highlighted); Deployment loop: v62 WANT 3 → **2** (row highlighted); `c2` on 06 `STOPPED` (highlighted). CUSTOMERS: `served by v62 ×2 · v63 ×1`. Lens `SEES · 1 v63 Pod ready` / `DOES · v62 down to 2`. Text: "The v63 Pod passes its check and is sent customers' requests along with the others. Only now does the Deployment loop make v62's ReplicaSet smaller, from three to two, and one v62 Pod is stopped. Three Pods are ready at every moment."
  - **R4 · ~10:15:40.** Round two: v63 WANT 2; `n2` on 06 READY (highlighted); v62 WANT 1; `c1` on 05 STOPPED (highlighted); `c2` gone. CUSTOMERS: `served by v62 ×1 · v63 ×2`. Lens `SEES · 2 v63 Pods ready` / `DOES · v63 up to 2, then v62 down to 1`. Text: "The loop repeats the same round: one more v63 Pod, wait until it's ready, one fewer v62 Pod."
  - **R5 · ~10:16.** Round three done: `n3` on 05 READY; `c3` STOPPED then gone (draw it gone; the step text says it was stopped); v63 WANT 3 `●●●` `3 READY`; v62 row `WANT 0 · KEPT` (highlighted). Lens `SEES · 3 v63 Pods ready, as wanted` / `DOES · nothing more; keeps the v62 ReplicaSet, empty`. CUSTOMERS: `served by v63 ×3`. Text: "A third round, and every `catalog` Pod runs v63. It took about a minute, and nobody else had to wait to ship. The v62 ReplicaSet isn't deleted: the Deployment keeps it, with no Pods, in the record."
  - **Every step:** the step highlight marks only what changed in that step; the canvas `aria-label` is the step's state summary from `data.js`; the step text carries the meaning on its own. A caption under the lane: "Fennel's nodes, versions and timings are fiction. With default settings and three copies, a rolling update runs at most one extra Pod and never fewer than three ready."
size: **Desktop (≥ 900px):** the pooled lane layout inside `.d-wide`: canvas left (about 55%), sticky; steps right. Two node columns at 16px per GB (Ch 5's): node body about 208px plus padding; record panel: a Deployment row and two ReplicaSet rows; notes two lines; total about 520px.
  **600–899px and phones:** one column, canvas sticky at the top (≤ 50vh), steps beneath as opaque cards. **At 360px:** two node columns of about 150px; 11px per GB (body about 143px); chip labels whole (`catalog v63`, status word beside or below); record rows in the narrow form (the Deployment row on its own line; ReplicaSet rows `v62` / `v63` with marks and word); only the acting loop's pill and lens line; about 420px. Where the measured canvas is taller than 50vh or the viewport is under 560px tall, each step shows its own inline snapshot (the pool's fallback, decided by measurement).
  **Gated steps:** R3–R5 reserve their height and show "Answer the question above to see what happens" until k-02 is committed; unlock on `didactician:check-commit`; never re-lock.
  **Motion:** changes over ≤ 300ms (flair length, no replay needed, I4); instant under reduced motion; no autoplay. **No-JS:** step text visible; a `<noscript>` line says the drawing needs JavaScript.
acceptance: ac-04, ac-05, ac-06, ac-08
reuse: **Reuse the pooled `renderCluster` and lane controller; never copy another chapter's widget code.** **Pool additions needed** (course-level, scheduled by the orchestrator before the build, each an optional field that is off when absent, so Ch 4 and Ch 5 draw unchanged; every chapter re-gated):
  1. **Deployment group in the record panel.** `record.deployment: { name: 'catalog', want: 3, version: 'v63', rows: ['v62', 'v63'] }` draws a header row `DEPLOYMENT · catalog · WANT 3 · v63` (`STRINGS.record.deployment`) above the listed rows, which are drawn indented and labelled `ReplicaSet v62` (`STRINGS.record.replicaSet` + the row key; narrow: the key alone). A row in the group with WANT 0 and no Pods reads `KEPT` (`STRINGS.record.kept`, ink-3) instead of `0 READY`. Highlight keys `dep:<name>` and `dep:<name>:version`. Rows outside the group draw as before.
  2. **Status `notready`.** A solid chip (the container runs) with a hollow lamp and the status word `STRINGS.status.notready` in `warn`; `statusBreaks.notready` allowed; its record mark is hollow (already the rule for any status other than running or lost). Needs one CSS rule pair in `cluster.css` (`.wc-st--notready`, the hollow lamp).
  3. **Per-Pod series colour.** `PODS[id].series: 1–6` draws that Pod's chip stroke and fill in `cN` / `cN-soft` instead of `c1`; the ring stays ink. Absent = `c1`.
  - Not needed: a traffic marker (the READY word and the CUSTOMERS note carry it, with existing fields); `stopped` and `crashed` with `restarts` exist.
  - **Later chapters** that would use these: **Ch 7** (ready vs. not ready decides who gets traffic; a Pod's new address after every rollout; `notready` and the CUSTOMERS line); **Ch 8** (a rollout that needs room while the autoscaler adds it); **Ch 9** (a missing setting crash-looping a new version, the stalled panel of f-03); **Ch 12** (probes failing, restarts); **Ch 15** (the $0 incident as a capstone scenario).

## Comprehension items

### k-01
segment: s-01
objective: o-1
type: retrieve
prompt: In Chapter 3, Sam updated `storefront` from v12 to v13 by hand: start one v13 copy, send customers to it, stop one v12 copy, three times over, while nobody else shipped anything. On Kubernetes, what does a team write down to release a new version?
options: A · Sam's steps, saved in a file that the cluster runs from top to bottom at release time. | B · The version it wants running and how many copies; a loop works out the steps. (correct) | C · One command per step of Sam's, typed by whoever releases, but sent to the cluster instead of to each machine.
feedback: A: "That would be a script: it does the steps once, in order, and knows nothing about what's actually running. Chapter 4's record holds what Fennel wants, not how to get there." · B: "Right: Chapter 4's rule. Fennel declares the version and the number of copies, and a loop compares that with what runs and works out the steps. This chapter is about that loop." · C: "That's still commanding, only from further away: someone has to type each step and notice when one goes wrong. On Kubernetes you declare what you want, and a loop works out the steps."

### k-02
segment: s-03
objective: o-1
type: predict
prompt: The v63 Pod is running on node 05 but isn't ready yet, and `catalog` now has four Pods where the record wants three. What does the Deployment loop do next?
options: A · It stops one v62 Pod straight away, since four Pods is one more than the three it wants. | B · It waits until the v63 Pod is ready, and only then stops one v62 Pod. (correct) | C · It starts the other two v63 Pods now, then stops all three v62 Pods once those three are running.
feedback: A: "The fourth Pod is on purpose: it's the one extra the rollout is allowed. Stopping a v62 Pod now would leave only two Pods serving while the new one isn't ready, and with three copies the default settings never let that happen. Scroll on: it waits." · B: "Right. An old Pod goes only once a new one is ready, so three Pods can serve customers at every moment. Scroll on to see it." · C: "That would need six Pods at once, and room for them; with three copies the default settings allow only one extra. It also wouldn't wait for each new Pod to pass its check. Scroll on: it moves one at a time."

### k-03
segment: s-04
objective: o-1
type: apply
prompt: Suppose the cluster were as full as on that Friday at 17:45 in Chapter 5, when a `dispatch` Pod waited for room: no node has 2 GB free. With the default settings, what happens when the pipeline writes `catalog:v63` into the record?
options: A · The Deployment loop stops one of the three v62 Pods first, so that the v63 Pod has room to start in its place. | B · The v63 Pod waits, pending; the three v62 Pods keep serving, and the release waits for room. (correct) | C · Kubernetes marks the rollout as failed straight away and switches `catalog` back to v62, so that customers aren't affected.
feedback: A: "With three copies the default settings allow no Pod short, so no v62 Pod goes until a v63 Pod is ready, and that Pod can't start without room. (With more copies the defaults do allow one short: open 'What about a service with more copies?' below.)" · B: "Right. It's Chapter 5's pending Pod: the scheduler keeps trying, the old version keeps serving, and nothing changes until someone makes room. Nothing breaks, but nothing ships either." · C: "Nothing has failed: the Pod is waiting for room, and the v62 Pods never stopped serving. And Kubernetes doesn't switch back by itself, even when a rollout really is stuck (§06)."

### k-04
segment: s-06
objective: o-2
type: predict
prompt: Two ways v64 could be bad. In the first, it crashes as soon as it starts, because of a missing setting (as `notifications` did in Chapter 4). In the second, it starts, answers its readiness check with a success code, and shows every price as $0.00. With the default settings, what does the rollout do with each?
options: A · It stops both before they replace v63, because a version that shows $0 fails its health check too. | B · It stalls the first with v63 still serving, and replaces every v63 Pod with the second. (correct) | C · It rolls both out completely: the checks only decide when a container is restarted, not when it gets traffic. | D · It rolls the first back to v63 by itself, and rolls the second out to every Pod.
feedback: A: "A check tests what the team wrote it to test, and passes on a success code. `catalog`'s asks whether the app is up and can reach its database; it never looks at a price. So the $0 version passes." · B: "Right. A crashing Pod never becomes ready, so no v63 Pod is ever removed. The $0 version passes its check, so every v63 Pod is replaced. See Fig. 03." · C: "That's the liveness probe. The readiness probe decides whether a Pod gets traffic and whether a rollout counts it, so the crashing version never takes over." · D: "Half right: the first never takes over. But Kubernetes doesn't roll back by itself. It stops advancing, the crashing Pod keeps crash-looping, and someone has to roll back or ship a fix."

### k-05
segment: s-05
objective: o-2
type: apply
prompt: During Friday's rush, one `catalog` Pod loses its connection to the database for a minute. `catalog`'s readiness check asks whether the app can reach its database; its liveness check asks only whether the app is up and not stuck. What happens to that Pod?
options: A · The node agent restarts its container, as it restarted `notifications` in Chapter 4, until the database answers again. | B · Nothing restarts it; customers' requests go to the other two Pods until its check passes again. (correct) | C · The Deployment loop replaces it with a fresh Pod on another node, because one of its three copies has failed.
feedback: A: "Restarting is what a failed liveness check does, and that check still passes: the app is up and not stuck. Only the readiness check fails." · B: "Right. A failed readiness check takes the Pod out of traffic without touching it, and puts it back as soon as it passes. A restart wouldn't have brought the database back." · C: "The Deployment loop doesn't replace Pods that fail a check; it manages versions. The Pod keeps running, sent no traffic, until its readiness check passes."

### k-06
segment: s-07
objective: o-3
type: predict
prompt: At 14:07 Riley changes `catalog`'s image line back to v63, and the pipeline writes it into the record. What does Kubernetes do?
options: A · It returns the whole cluster to the way it was at 14:01, so the orders customers placed at $0 in between are undone too. | B · It replaces v64 with v63 a few Pods at a time, using the v63 ReplicaSet it kept. (correct) | C · It stops all three v64 Pods at once, then starts three v63 Pods from the v63 image.
feedback: A: "Kubernetes keeps no snapshot of the cluster to go back to, and it never touches Fennel's database. The record now says v63, and the loop closes that gap, like any other. The orders stay as they were (§08)." · B: "Right. To the Deployment loop, going back is just another change of version: with the default settings it fills the v63 ReplicaSet it kept and empties v64's, the same gradual way. See Fig. 05." · C: "That would leave no Pod serving for a moment. Going back is a change of version like any other, so the loop moves one Pod at a time, and keeps v64's ReplicaSet, emptied."

### k-07
segment: s-10
objective: o-2
type: apply
prompt: At Friday's review of Thursday's incident, Riley says: "The rollout passed health checks, so it wasn't the deploy." What would you ask Riley, and why? Think of your questions, then show the answer.
model_answer: The question to ask: "What do our health checks actually test? Would they catch wrong behaviour, or only crashes?" `catalog`'s readiness check passes when the app is up and can reach its database, and a check passes on a success code alone, so a version that shows $0 passes by design. "Passed health checks" only proves that v64 started. It was the deploy: the rollout did exactly what it is built to do, and it is built to protect availability, not correctness. Then: "What would have caught wrong prices before every customer saw them: a check that tests a real price, or a release that goes to a small share of customers first while something watches (a canary)?" "Who noticed, and how fast? Morgan noticed from the orders after three minutes; what would have noticed without Morgan?" "Could we have gone back further than v63: are old images kept, and do our tags ever move?" And: "What do we do about the 23 orders?" Rolling back didn't change them.
feedback: The reveal names m-09 once: a rollout that completes has proved only that every new Pod passed its checks. Chapter 12 returns to noticing wrong behaviour.

## Acceptance criteria

- ac-01 (s-01): The cast strip and D1 come before k-01; k-01 is committed before the scene; the scene shows Thursday-night releases with Sam's "Nobody deploy anything" message before it shows today's pipeline, and §01 ends on Ari's "That depends on how it's bad."
- ac-02 (s-02): Ch 4's ReplicaSet is recalled in words before f-01 shows the Deployment; TERM 01 follows f-01; the prose states that a new version gets a new ReplicaSet and that only a change to the Pod description (such as the image line) starts a rollout; the Deployment loop's lens (wants · sees · does) is stated as one implementation of Ch 4's pattern.
- ac-03 (s-02): The pipeline is introduced (builds an image, pushes it to the registry, writes the tag into the record) before any step or figure shows the record changing.
- ac-04 (w-rollout-scrolly): Before R1, a set-up paragraph says where `catalog` runs, why only nodes 05 and 06 are drawn, what is about to change, and what READY means ("sent customers' requests only once it passes a check the team wrote").
- ac-05 (w-rollout-scrolly): At every step at least three `catalog` Pods are READY and at most four `catalog` Pods exist; no v62 Pod is removed in the step its replacement becomes ready or earlier; R5 shows the v62 ReplicaSet row as `WANT 0 · KEPT`, not removed.
- ac-06 (w-rollout-scrolly): v62 and v63 Pods differ in colour and in their printed version; NOT READY and READY differ in word and colour; the record shows a Deployment row with the wanted version over two ReplicaSet rows; scrolling back restores each earlier step exactly; R3–R5 are locked until k-02 is committed.
- ac-07 (s-04, k-03): The default pace is stated with "by default" and its meaning for three copies (one extra, none short); k-03 is answered before the debrief says the new Pod waits pending and the old Pods keep serving; x-02's four-copy case appears only in D2, hedged.
- ac-08 (s-05, f-02): f-02 shows both probes with the same rows, and only the failure row differs (NO TRAFFIC vs. RESTARTED); the prose names the node agent as the one running the checks, gives "every ten seconds by default", says a failing readiness probe doesn't restart the container, and says a container with no probe is treated as passing; "only ready Pods are sent traffic" is attributed to "a loop we'll name in Chapter 7".
- ac-09 (s-06, k-04, f-03): k-04 is committed before f-03 or any sentence saying the $0 version rolled out completely; f-03's two panels differ only in v64's behaviour and outcome; the text explains the stall as "its Pods never become ready" (never "stopped by health checks"), says a check passes on a status code alone, and says a stalled rollout is not rolled back by Kubernetes (local-01).
- ac-10 (s-06): The handover analogy comes after f-03, maps manager → Deployment loop and signing in → passing the check, and carries a WHERE THIS ANALOGY BREAKS line saying the loop never sees what Pods do, only check results. Canary and blue-green each get one accurate sentence and are said not to be built into a plain Deployment.
- ac-11 (s-07, k-06, f-05): f-04 doesn't reveal how the rollback proceeds; k-06 is committed before f-05 and the reveal; the reveal says rolling back changes the record back to v63 and that the Deployment loop reuses the kept v63 ReplicaSet, with "with the default settings" on the gradual pace; the level-based paragraph says the loop acts on the latest record, not on a list of steps.
- ac-12 (s-08): The text says the kept ReplicaSet holds the image's name, not the image; that a tag can be moved and a digest can't; that the 23 $0 orders remain after the rollback; and turns each into a question for Jordan.
- ac-13 (f-07): The loop lens table is Ch 5's array copied forward with Ch 5's tags dropped, a new Deployment loop row (wants, sees, does, job: updating) tagged NEW IN CH 6, and the node agent's and Chapter 7's rows extended for readiness.
- ac-14 (k-01–k-07): Every choice check has feedback for every option that explains why, naming the misconception where one applies; no key is the longest option; no key repeats the wording of a term card or caption above it; every feedback pointer into the lane or a figure is visible from its default state; k-07 states its own question and hides its model answer until revealed.
- ac-15 (page): Terms appear only after the thing they name: Deployment after f-01, rolling update after lane R, readiness probe after the lane has shown READY and NOT READY, rollback after the reader has seen it happen in f-04; no later-ledger term (Service, load balancer, autoscaler, ConfigMap, Secret, StatefulSet, GitOps beyond D4's naming) is used except as "Chapter N".

## Curriculum recommendations

Recommendations only; CURRICULUM.md is unchanged. Apply after the chapter ships (CURRICULUM §8 step 8), except the checkpoint questions, which the orchestrator answers per d-04 with the recommended options.

- **Checkpoint questions** (recommended option first):
  - **Q1, size** (## Shape): **(a) recommended: one chapter**, about 22 minutes planned, with `cut-list.md` `## If it runs long` recovering about 3; (b) split before s-06 into a ~13-minute and a ~11-minute chapter (not recommended: the second's core predict-then-reveal depends on the first's lane, and the first would confront no misconception).
  - **Q2, story facts** (R2): **(a) recommended: approve `catalog` and Thursday's facts as below**; (b) have `catalog` exist since the move (not possible without editing Ch 4–5's drawings, which d-04 rules out).
  - **Q3, pool additions** (w-rollout-scrolly `reuse:`): **(a) recommended: schedule the three optional renderer additions before the build** (Deployment group in the record, `notready`, per-Pod series colour), re-gating every chapter; (b) data only, no pool change: the wanted version as a note line, NOT READY drawn as STARTING, versions told apart by label only. (b) breaks the "different in kind look different" rule for old vs. new and ready vs. not ready, and would mislabel a running Pod as starting.
  - **Q4, analogy** (s-06): **(a) recommended: include the shift-handover aside** (first in the cut order); (b) no analogy (the entry names none).
- **R1 (§5 Visuals column, Ch 6 row, after build):** record ## Visual grammar: `catalog` chips coloured by version (v63 `c2` throughout; the other version in a drawing `c5`; version printed on every chip); READY (`good`) as the running word, NOT READY (`warn`, solid chip, hollow lamp, hollow mark); the record's Deployment header row (`DEPLOYMENT · name · WANT n · vNN`) over indented ReplicaSet rows, an emptied one `WANT 0 · KEPT`; STOPPED for an old Pod removed in that step; the CUSTOMERS line naming the versions served; f-02's two-probe contrast (NO TRAFFIC vs. RESTARTED); f-04's `PRICES` status band; f-05's record at three moments; f-06's tag vs. digest beside Ch 2's registry; f-07 from `CH06_LOOPS`. Renderer: the pooled `renderCluster` with the three Ch 6 additions; lane R in Ch 6's `site/widgets/w-rollout-scrolly/` (with f-03's snapshots).
- **R2 (§3 Fennel, new Ch 6 story facts):**
  - **`catalog`** (product listings and prices): split out of `storefront` a few weeks after Morgan's first bill, so the team that owns prices could ship without waiting for the website's releases. Riley is on the `catalog` team. **3 copies; requests 2 GB · 0.25 cores each.** The scheduler placed them on the two nodes with room: node 05 (next to Ch 5's waiting-then-placed `dispatch` Pod) and node 06 (two). The cluster then reserves 44 of 65 GB. `dispatch` still runs 6 copies (Ch 5's "all week", carried on).
  - **Releases:** before Kubernetes, Thursday-night releases run by Sam ("Nobody deploy anything"); now each team ships when ready; `catalog` ships two or three times a day. Fennel's build pipeline builds an image on merge, pushes it to Fennel's registry, and writes the new tag into the Deployment's image line. Tags are never reused. The registry deletes `catalog` images after 30 days.
  - **`catalog`'s Deployment:** default rolling-update settings (3 copies: one extra, none short); readiness probe `httpGet /healthz` (the app is up and can reach its database); liveness probe `httpGet /livez` (the app is up and not stuck).
  - **Thursday:** 10:15 v62 → v63, about a minute, unwatched (lane R). 14:02 v63 → v64: v64 read prices from a renamed database field, so every price came back empty and showed as $0.00; it passed the team's tests and its readiness check. ~14:02:20 the first v64 Pod ready; ~14:03 rollout complete; 14:05 Morgan in the team chat: "Why are orders coming in at $0.00?"; 14:06 Riley confirms in the app; 14:07 Riley changes the image line back to v63 and the pipeline applies it; ~14:08:20 the last v64 Pod removed. Six minutes of $0 prices. **23 orders** were placed at $0.00; Jordan and Morgan honoured them.
  - **Exchanges:** Jordan: "So who's doing what Sam did on Thursday nights?" Ari: "A loop. We tell it which version we want." Jordan: "And if the version is bad?" Ari: "That depends on how it's bad." Friday review, Riley: "The rollout passed health checks, so it wasn't the deploy."
- **R3 (§2.3 loop lens table):** add the **Deployment loop** row (wants: each Deployment's Pods running the version its record names, as many as it names; sees: its ReplicaSets, one per version, and how many of their Pods are ready; does: for a new version, makes a new ReplicaSet and shifts copies to it a few at a time, removing old Pods only as new ones become ready; keeps old ReplicaSets, empty, for going back; job: updating), above the ReplicaSet loop. Extend the node agent's *does* with the checks (restarts on a failed liveness check; reports not ready on a failed readiness check) and the dashed Chapter 7 row with "ready". Ch 7 copies `CH06_LOOPS` and fills in its row.
- **R4 (§6 catalog):** add three entries, owner Ch 6:
  - **m-32** (local-01) "A failed rollout rolls itself back." Kubernetes stops advancing and reports it; someone (or a tool) has to roll back. Ch 13 revisits (tools that do).
  - **m-33** (local-02) "Health checks test whether the app works correctly." A check tests what the team wrote it to test and passes on a status code; a healthy-but-wrong version passes. Ch 12 revisits (with m-15).
  - **m-34** (local-03) "Rolling back undoes the bad release, as if it never happened." It changes which version runs; what the bad version wrote stays, and it assumes the old image is still there. Ch 10 revisits.
- **R5 (Ch 7 entry):** readiness decides who gets traffic, "by a loop we'll name in Chapter 7" (said in s-05, s-10 and f-07's dashed row): name it (the EndpointSlice controller, Ch 6 parking lot) and fill in the row; every rollout gives a service new Pods with new addresses (s-10's bridge: `storefront` finding `catalog`'s ready Pods); during a rollout old and new versions serve side by side; a canary by share of traffic needs routing, not just Pod counts (c-12 note). Retrieve k-05 (a Pod out of traffic, not restarted).
- **R6 (Ch 10 entry):** the 23 orders at $0: data written by a bad version outlives a rollback (m-34); the Recreate strategy, for when two versions can't run side by side, e.g. around incompatible data changes (Ch 6 parking lot); schema changes and rollback.
- **R7 (Ch 12 entry):** Morgan noticed the $0 incident from the orders, not a dashboard: monitoring that catches wrong behaviour; probe tuning (startup probes, timing defaults, liveness checks that depend on back-ends causing cascading restarts); the "failed to progress" condition as something to alert on; m-33 → m-15.
- **R8 (Ch 13 entry):** GitOps makes "change the file back" the only way to roll back (D4); progressive delivery tools (Argo Rollouts, Flagger) that run canaries and roll back on their own (m-32); admission controllers that pin tags to digests.
- **R9 (Ch 8 and Ch 9 entries, small):** Ch 8: a rollout needs room while it runs, so the loop that adds nodes may have to add one to ship; changing a Pod's requests in a Deployment starts a rollout. Ch 9: f-03's crash case is a missing setting; changing a configuration object that Pods read doesn't start a rollout by itself.
- **R10 (Ch 14 and Ch 15 entries, small):** Ch 14: disruption budgets during node upgrades; registry retention as an ongoing cost and policy question. Ch 15: the $0 incident as an unlabelled capstone scenario.
- **R11 (§8 step 5, the pool):** the three `renderCluster` additions in w-rollout-scrolly's `reuse:`, documented in `explainers/_pool/README.md` and the pool test page, before Ch 6's build, with every chapter re-gated.
