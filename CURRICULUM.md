# Curriculum: “Desired state: Kubernetes from the problems up”

This is the course bible and chapter plan. Each chapter is built in its own didactician run, and runs share no memory, so anything that has to stay consistent across chapters lives here. Every run's brief should point to this file and copy its chapter entry.

---

## 1. Audience and goal

**Reader:** a somewhat technical manager. They know what code, servers, deploys, outages and cloud bills are, but have never operated infrastructure. Their organization doesn't run Kubernetes yet.

**Goal:** the reader can hold a real discussion with senior engineers about Kubernetes. That means following the reasoning, predicting consequences, asking the questions that matter, and weighing trade-offs. They can't operate a cluster, and don't need to: they know which details to leave to their engineers.

**Course-level objectives.** After the course, the reader can:

- **CO-1** Explain the problems Kubernetes solves, and the ones it doesn't, in terms of business symptoms: outages, release speed, cost, team friction.
- **CO-2** Explain the core model (a record of desired state, plus many independent loops that keep pushing reality toward it) and use it to reason about features they haven't seen before.
- **CO-3** Predict, roughly, what the system does in common situations: a machine dies, traffic spikes, a bad release goes out, a team uses too many resources.
- **CO-4** Spot the trade-offs and risks in an engineering proposal or postmortem about Kubernetes, and ask the questions that bring them out.
- **CO-5** Describe what adopting managed Kubernetes costs: in money, in people (a platform team), and in ongoing work like upgrades. Say when it's the wrong tool.

**Deliberately out of scope for the whole course:** `kubectl` usage, writing YAML, installing or self-hosting clusters, exam-style certification material, and deep networking or security internals.

---

## 2. Design principles (apply in every chapter)

1. **Pain first, from three sources.** Each new idea arrives as the answer to a problem the reader has already felt. Don't rely on the reader's own memory of infrastructure pain. Use:
   - **Pain they've seen in meetings:** describe each engineering problem by the symptom a manager sees (an outage, a slow release cycle, idle spend, one team breaking another).
   - **Pain they feel in the page:** a short hands-on widget where the reader does the job by hand before seeing it automated (blueprint B2, goal-free exploration, or predict-then-reveal).
   - **Pain they know from managing people:** management analogies (goals vs. micromanagement, delegation, budgets, signing authority), used where they fit. Each one comes with an explicit _"where this analogy breaks"_ note.
2. **Kubernetes arrives late, and on purpose.** Chapters 1–2 contain no Kubernetes. Chapter 3 names it only after the reader has built up the list of jobs it does.
3. **One model, named once, reused everywhere.** Chapter 4 introduces the reconcile loop as a _pattern_ (observe → compare → act, repeated) and each controller as one _implementation_ of it. Keep the two distinct: the pattern is general, never tied to one scene. From then on, every chapter has a _loop lens_, the pattern filled in for one loop: **which loop is it, what does it want (the desired state), what does it see (the real state), and what does it do when the two differ?** (short form: which loop · wants · sees · does; user decision in Ch 4's run, d-13; reworded in Ch 5's human review, d-11, because "a gap" was too vague: say plainly that the loop compares desired with real state. Ch 4, 6 and 7 still use the old wording until their reviews or a later pass). This is the thread that lets the reader reason past what the course covers. **Loop lens table (course convention, Ch 4 R12):** every chapter from Ch 5 on that adds a loop adds a row to a copy of Ch 4's f-04 (the `CH04_LOOPS` array in Ch 4's `site/assets/page.js`: loop, per, wants, sees, does, job, chapter), so the reader builds up one table across the course. A loop met only by name is drawn as a dashed row with its chapter. Copy the latest chapter's array, not Ch 4's: Ch 7's is `CH07_LOOPS` in Ch 7's `site/assets/page.js` (Ch 6's `CH06_LOOPS` with the dashed Chapter 7 row filled in as the **endpoints loop** (job: connecting) and a **kube-proxy** row, one per node, which writes its own node's forwarding rules rather than the record; the dashed "a loop that adds nodes" row for Ch 8 carried from Ch 5; its `added` / `newPart` fields tag that chapter's changes and are dropped when copied forward). Ch 5's f-06 header and caption use the §2.3 wording (`WANTS · SEES · DOES WHEN THEY DIFFER`); copying a table forward carries that header with it (Ch 5 R18).
4. **Conceptual, with YAML only as illustration.** A short manifest snippet may appear when it makes the model concrete (`replicas: 3` _is_ desired state). The reader is never asked to write or memorize YAML. Where a detail is engineer territory, say so plainly: "your engineers will tune this; what you need to know is…"
5. **Managed Kubernetes is the default** (EKS, GKE, AKS, treated generically). The provider runs the control plane. Self-hosting is mentioned only to explain what managed spares you.
6. **Introduce a term after the reader has met the thing it names.** Use the term ledger (§5) to avoid re-defining terms, and to avoid using one before its chapter.
7. **Every chapter ends with "the conversation."** A realistic thing an engineer might say, and the questions a well-informed manager would ask in response. These become `apply`-type comprehension items, and they rehearse CO-4 throughout the course.
8. **Every chapter opens with retrieval.** One or two quick questions on earlier chapters, preferably ones that need the loop lens. Later chapters mix in items from several earlier chapters. Ch 1 has no retrieval opener; a pre-question may take its place.
9. **Confront misconceptions from the catalog (§6).** Each chapter owns the misconceptions assigned to it. State each one fairly, show a case where it predicts wrongly, then give the correct model.
10. **Sizing.** There is no fixed time budget. Each chapter is sized in ideas, aiming for 3–5 objectives. Set `time_budget_minutes` at intake for each run, based on the chapter's objectives. If a chapter plans out too big, split it rather than compress it. Designers give an honest minutes table per part (including widget time) in the plan's `## Shape`, so overruns show at the checkpoint.
11. **Friendly to readers who jump ahead.** From Ch 2 on, every chapter opens with a one-line cast strip of the characters it uses and a collapsed "I didn't read the last chapter. What happened?" disclosure, before the retrieval check. (User's Ch 2 review.)
12. **Kubernetes kinds are capitalised as the API spells them**, from Ch 4 on: Pod, ReplicaSet, Deployment, Service, StatefulSet, and so on, as the style guide says. "node" stays lowercase, as in the Kubernetes docs' prose. (User decision in Ch 4's run, d-05.)
13. **Refer to things by what they are, not by labels (user's Ch 5 review, R17).** Refer back to an event by what happened ("when node 03 died"), not by a bare time, a nickname or a label ("03:04", "moving day"); a day doesn't "show" anything. Refer forward to "the following widget" or "the figure below", not by its ID (W-01, Fig. 04) in a sentence; IDs stay in header bars and caption labels. Cut back-references that don't help the point. Ch 4, 6 and 7 pick this up in their reviews, like the loop lens wording.

---

## 3. The running company: Fennel

**Fennel** is a fictional grocery-delivery startup. It was chosen because its problems map cleanly onto Kubernetes:

- traffic spikes at predictable times (the Friday dinner rush, holidays);
- money and payment credentials (secrets);
- data that must never be lost (orders);
- several teams that grow apart over time.

Every chapter takes place at a point on Fennel's timeline. Later chapters can refer back to earlier events ("remember the Friday disk outage").

**Established story facts** (keep consistent; add to this list after each chapter ships):

- **Ch 1, the Friday disk outage (Year 0):** the dinner rush fills the disk with logs; it hits 100% at 18:12 and orders fail; Sam is at dinner across town; orders go through again at 20:10. Afterwards Sam sets up, by hand, a nightly 23:00 job that deletes old logs. Sam's server notes were written at setup and last edited 14 months before the outage. Things added by hand and never written down: the photo-resizing tool (May, when product photos launched), the email provider's key (August, when order emails launched), and a web-server setting from a holiday sale that nobody, Sam included, can explain. Rebuilding from the notes produces a server where photo upload and confirmation email fail and the log clean-up is silently missing.
- **Ch 2, "works on my machine" (Year 1):** production runs on one rented machine, plus a staging machine. The photo-resizing tool is 6.2 in production and 7.0 on Riley's laptop; Riley's change works on the laptop and fails in production ("can't reproduce"). Sam's first image is `fennel-app:v42` (with 6.2), so the failure shows on the laptop before release; Riley's `v43` (with 7.0) passes on both. The photo-resizing tool is named **ImageResizer**; both machines have code `main`, Python 3.12 and 12 libraries (§02 drawing, after the user's human review). Fennel's app is stateless: orders live in Fennel's database, outside the app. One Saturday night Riley hand-fixes photo uploads inside a running production container; Tuesday's release replaces the container and the fix vanishes.
- **Ch 3, many containers, many machines (Year 2):** four services (`storefront`, `orders`, `payments`, `dispatch`) on about eight rented machines, with "what runs where" in Sam's spreadsheet. Copies and sizes in room units (machines hold 6): storefront 3 × 2, orders 1 × 3, payments 2 × 1, dispatch 3 × 1. Morgan asks: "We pay for eight machines and half look mostly idle. Could four do it?" On Monday Sam moves everything onto machines 01–04 (01: storefront ×2 + payments; 02: storefront + dispatch ×2; 03: orders + dispatch; 04: payments); the other four sit empty as spares Fennel still pays for ("the spare room is for when something breaks"). Saturday: a dispatch copy crashes at 02:51 and Sam restarts it in place; at 03:04 machine 03 dies, and orders is down until Sam starts `orders` on 04 (the only running machine with room), the lost dispatch copy on 02, and passes on the new addresses; the spreadsheet still says machine 03. Tuesday: with Sam's team-chat message "Nobody deploy anything, I'm updating storefront", storefront goes v12 → v13 in three rounds of start-one, stop-one, using the spare room (first on 04, then twice on 01). Ch 4's "same 3 a.m. failure" should reuse machine 03 at 03:04.
- **Ch 4, desired state (Year 3):** Fennel runs on managed Kubernetes in the provider's **standard mode**: the provider runs the control plane, and Ari's team looks after the nodes. Ari, hired this year as platform lead, led the move. The cluster has **four nodes, 01–04** (numbered as Ch 3's machines). **Moving day:** `orders`, `payments` and `dispatch` are already in the cluster; Ari applies `storefront` last, as a (shortened) `kind: ReplicaSet` manifest with `storefront:v38` and `replicas: 3`; following its defaults (emptiest node first, copies of one service spread), the scheduler puts one `storefront` Pod each on nodes 01, 04 and 02 (01: payments + storefront, 3 free; 02: dispatch ×2 + storefront, 2 free; 03: orders + dispatch, 2 free; 04: payments + storefront, 3 free; in Ch 3's room units). (Changed after Ch 5's research, user decision in Ch 5's run, d-04; it originally ended in Ch 3's Monday layout.) On Monday Jordan asks Ari how Kubernetes knew what to do; Ari: "Nobody told it what to do. We told it what we want." **Saturday 03:04:** node 03 dies again (`orders` + one `dispatch`). With default settings: ~03:04:50 the node loop marks it UNKNOWN; ~03:09:50 it marks node 03's Pods for deletion (the records linger, uncounted); seconds later the ReplicaSet loop writes two new Pods and the scheduler puts `orders` on node 04 (one of two nodes with room, with 01) and `dispatch` on 01; ~03:10–03:11 both are running. `orders`, a single copy, is unavailable to customers for roughly six or seven minutes; nobody is paged. Pod names: `orders-5c8x` (old, node 03) → `orders-q2rw` (new, node 04, listed since 03:10). Kubernetes replaced the Pods, not the machine: afterwards the cluster has **three nodes** and less spare room until a machine is added. **`notifications`** (texts and emails, can lag without disaster) is Fennel's newest service in Year 3; on a Wednesday a missing setting makes it crash-loop, and Ari says "`notifications` keeps crash-looping, but Kubernetes keeps restarting it."
- **Ch 5, scheduling, resources and cost (Year 3):** Fennel's nodes are rented machines with 16 GB of memory and 4 processor cores; Pods can reserve about 13 GB and 3.9 cores of each (the rest is kept back for the system). Ch 3–4's room unit was 2 GB of memory request. Before the move, Fennel had given back Year 2's four spare machines and ran on four. **Requests as set at the move** (per copy; memory · processor): `storefront` 4 GB · 0.5 (3 copies); `orders` 6 GB · 1, limits 7 GB · 1 (1 copy); `payments` 2 GB · 0.25 (2); `dispatch` 2 GB · 1 (3, then 6); `notifications` 2 GB · 0.25 (2). Most teams padded memory "to be safe". **Use at the Friday rush** (per copy): `storefront` 2 GB · 0.3; `orders` 5.5 GB · 0.5; `payments` 0.5 · 0.1; `dispatch` 1 · 0.6; `notifications` 0.5 · 0.1; 19.5 GB in all. **Friday, 17:45** (a Friday after 03:04; cluster on nodes 01, 02, 04; 01: payments, storefront, dispatch, notifications; 02: dispatch ×2, storefront, notifications; 04: payments, storefront, orders): the dispatch team raises `dispatch` from 3 to 6 copies for the rush. The ReplicaSet loop writes three Pod records; the scheduler places one on 01 (more processor free than 02, fewer `dispatch` copies) and one on 02; the third waits, `Pending`, with "0/3 nodes are available: 2 Insufficient cpu, 3 Insufficient memory." (each node 1 GB free; illustrative wording). `dispatch` runs 5 of 6 copies for the busiest part of the evening. At about 18:40 Ari's team adds **nodes 05 and 06** by hand; the waiting Pod goes to 05 (a tie broken at random) and 06 stays empty, nearly empty a month later. `dispatch` stays at 6 copies all week afterwards. The cluster has **five nodes** (01, 02, 04, 05, 06) from then on: 38 of 65 GB reserved, 19.5 GB used at the rush (under a third). **Tuesday:** `orders-q2rw` (request 6 GB, limit 7 GB) is OOM-killed three times, at about 12:40, 18:50 and 20:10; restart count 3; `Terminated · Reason: OOMKilled · Exit code: 137`; customers see errors for a moment each time. Whether it's a leak or growth is left open. **The bill:** the first full month's bill since the move is higher than the last one before it. Morgan: "We moved onto Kubernetes so our machines would be used better. Now we pay for five of them instead of four, and Ari's dashboard says they're less than a third busy, even on a Friday night. What are we paying for?" Fennel uses the provider's standard mode, so the bill counts machines (the control-plane fee is Ch 14's; Ch 5 no longer names it). **Node pools** (Ch 8's to tell now, Ch 5 d-12): Fennel has one general pool (01–06); Ari *proposes* a spot pool (cheaper, can be taken back at short notice; `orders` and `payments` stay off it); a large-memory pool is drawn only as an example. **The conversation:** Ari: "We need to bump memory limits on `orders`." Sandbox (W-02) numbers: requests as above give 4 nodes, 5 with "Keep room to lose a node" on. `payments` is adjustable too: doubling it to 4 GB doesn't add a node; at 7.5 GB it does. Steppers stop at sizes that fit two rows of nodes (`dispatch` at most 5 GB).
- **Ch 6, rollouts and rollbacks (Year 3):** **`catalog`** (product listings and prices) was split out of `storefront` a few weeks after Morgan's first bill, so the team that owns prices could ship without waiting for the website's releases; Riley is on the `catalog` team. **3 copies, requests 2 GB · 0.25 cores each**; the scheduler placed one on node 05 (beside Ch 5's `dispatch` Pod) and two on node 06, so the cluster reserves 44 of 65 GB; `dispatch` still runs 6 copies. **Releases:** before Kubernetes, Thursday-night releases run by Sam ("Nobody deploy anything"); now each team ships when ready, `catalog` two or three times a day. Fennel's build pipeline builds an image on merge, pushes it to Fennel's registry and writes the new tag into the Deployment's image line; tags are never reused; the registry deletes `catalog` images after 30 days. **`catalog`'s Deployment:** default rolling-update settings (with 3 copies: at most one extra, none short); readiness check `httpGet /healthz` (the app is up and can reach its database); liveness check `httpGet /livez` (the app is up and not stuck). **Thursday 10:15:** v62 → v63 in about a minute, unwatched (lane R, "Thursday · catalog"). **Thursday 14:02:** v63 → v64; v64 read prices from a renamed database field, so every price came back empty and showed as $0.00; it passed the team's tests and its readiness check. ~14:02:20 the first v64 Pod ready; ~14:03 rollout complete; 14:05 Morgan in the team chat: "Why are orders coming in at $0.00?"; 14:06 Riley confirms in the app; 14:07 Riley changes the image line back to v63 and the pipeline applies it; ~14:08:20 the last v64 Pod removed. Six minutes of $0 prices; **23 orders** were placed at $0.00, and Jordan and Morgan honoured them. The kept v63 ReplicaSet is what the rollback scaled back up. **Exchanges:** Jordan: "So who's doing what Sam did on Thursday nights?" Ari: "A loop. We tell it which version we want." Jordan: "And if the version is bad?" Ari: "That depends on how it's bad." Friday review, Riley: "The rollout passed health checks, so it wasn't the deploy."
- **Ch 7, services and traffic (Year 3):** **Services since the move:** each Fennel service has had a Service of the same name since it entered the cluster (Ari wrote one short record beside each; `catalog`'s since its split), reachable only inside the cluster. Callers use names: `storefront` calls `orders` and `catalog`. Illustrative addresses: Services `storefront` 10.96.0.12, `catalog` 10.96.0.21, `orders` 10.96.0.25; Pod addresses `10.4.<node>.<n>`: `orders-q2rw` 10.4.4.7; `storefront`'s Pods 10.4.1.6, 10.4.2.9, 10.4.4.5; `catalog`'s Thursday Pods v62 10.4.5.12, 10.4.6.8, 10.4.6.9 → v63 10.4.5.14, 10.4.6.11, 10.4.5.15. **Tuesday's refused calls** (Ch 5's Tuesday): `orders` runs a single copy; at each OOM kill (about 12:40, 18:50 and 20:10) its only Pod was not ready for a few seconds while the node agent restarted its container, the `orders` Service's list was empty, and `storefront`'s log shows `connection refused` from `orders` ("in most clusters, by default"); each time the restarted Pod went back on the list at the same address. Ari's incident note proposes a second copy of `orders` on another node (proposed, not done; leak or growth still open); Ari's team likes anything every order depends on to run in more than one copy. **The way in:** since the move, Fennel has one gateway (Gateway API, with the provider's controller) behind one cloud load balancer and one public address; its only route sends `fennel.example` to `storefront`. Prices quoted: on AWS, a Service of type LoadBalancer usually gets a Network Load Balancer and a gateway usually sits behind an Application Load Balancer, both $0.0225 an hour in one US region (about $16 a month each before use, October 2026); about $99 a month for Fennel's six services. **Exchanges:** Jordan: "Sam used to pass on the new addresses. Who does that now?" Ari: "Nobody. `storefront` doesn't call an address any more. It calls a name." Jordan: "If the name always finds `orders`, what refused us?" A few weeks later, at a planning meeting, Riley's team wants partners' apps to read `catalog`'s prices directly, and Riley says: "We want a separate load balancer for every service."

### Timeline

| Era    | Fennel                                                                                        | Chapters |
| ------ | --------------------------------------------------------------------------------------------- | -------- |
| Year 0 | 2 founders (Jordan, Morgan), 1 engineer (Sam), one app ("the Fennel app") on one rented server | 1        |
| Year 1 | 6 engineers; "works on my machine" problems; containers adopted                               | 2        |
| Year 2 | App split into a few services across about 8 machines, tracked in a spreadsheet; 3 a.m. pages | 3        |
| Year 3 | Adopts managed Kubernetes                                                                     | 4–8      |
| Year 4 | About 40 engineers, 6 teams, 30+ services; real data, compliance questions                    | 9–12     |
| Year 5 | A platform team exists; the hard questions are about cost and strategy                        | 13–14    |

### Cast (use they/them for all characters)

- **Sam**, the founding engineer. Built the first server by hand and remembers every fire.
- **Jordan**, a co-founder in Year 0 (the non-infrastructure one), later the engineering manager. The reader's stand-in: technical enough, never on call for infrastructure.
- **Ari**, the platform lead, hired in Year 3. The senior engineer Jordan learns to have discussions with.
- **Riley**, an engineer who joins in Year 1 and spends their first week installing tools (introduced in Ch 2).
- **Morgan**, the other co-founder in Year 0, handling money; later the finance lead. Asks about the cloud bill.

### Fennel's services (introduced as the company grows)

- In Years 0–1 there is a single app, called "the Fennel app". It is split into services, and `storefront` named, in Ch 3.
- `storefront`: the website and app backend customers use.
- `orders`: takes and stores orders. Stateful, and the most critical.
- `payments`: talks to the payment provider and holds credentials.
- `dispatch`: assigns drivers and tracks deliveries. Spiky and real-time.
- `catalog`: product listings and prices. Split out of `storefront` in Year 3 and introduced in Ch 6.
- `notifications`: texts and emails. Can lag without disaster. Introduced in Ch 4 (Year 3), crash-looping on a missing setting.
- Later: internal tools, a data pipeline, and per-team services as needed.

The difference in criticality between services (`orders` must not lose data, `notifications` can wait) is a recurring teaching device. Use it.

---

## 4. Course structure

| Part                     | Chapters | Role on the guidance continuum                                         |
| ------------------------ | -------- | ---------------------------------------------------------------------- |
| **I. Before Kubernetes** | 1–3      | Concrete narrative; motivation; pain felt by hand                      |
| **II. The core model**   | 4–8      | Worked examples of the loop model across the essential features        |
| **III. The hard parts**  | 9–12     | Guided application: the reader applies the loop lens with less support |
| **IV. Owning it**        | 13–14    | Strategy and trade-offs                                                |
| **Capstone**             | 15       | Mixed practice: unlabeled scenarios drawn from the whole course        |

Chapter dependencies (each chapter assumes everything above it in its own column):

```
1 → 2 → 3 → 4 ─┬→ 5 → 8
               ├→ 6
               └→ 7
          5,6,7 → 9 → 10 → 11 → 12 → 13 → 14 → 15
```

Chapters 5, 6 and 7 depend only on 4 and could be reordered. Chapter 8 (autoscaling) needs 5 (resources).

---

## 5. Term ledger

A term is introduced in the listed chapter and may be used freely afterward. A chapter may _preview_ a later term only by saying "we'll name this later." Update the **Visuals** column after each run, so later runs draw things the same way.

| Term                                                                                                                   | Chapter | Visuals established (fill in after build) |
| ---------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------- |
| server / machine, process, deploy, dependency, "snowflake" server, (configuration) drift, runbook, single point of failure | 1 | Machine = outlined frame with a mono `MACHINE · NAME` bar; the code row in `c1`; other contents as `c2` rows grouped RUNTIME / LIBRARIES & TOOLS / CONFIG / DISK & DATA; clutter and unknowns in `c6` dashed; status as word + colour (PRESENT, MISSING, UNKNOWN, PASS, FAIL, IDENTICAL). Two machines compared row by row (`w-rebuild` stage 4; content in `site/widgets/w-rebuild/data.js`). Incident timeline as a data-driven list with a status band (f-01, `CH01_OUTAGE_TIMELINE` in `assets/page.js`). |                                           |
| virtual machine (VM), briefly                                                                                          | 1       |                                           |
| container, image, registry, immutability, stateless (of an app), (operating system) kernel, briefly | 2 | Extends Ch 1. Image = frame in `c1` stroke on `c1-soft` with a mono `IMAGE · fennel-app:v42` header holding its rows; compact form a chip with no lamp. Container = the same chip plus a square lamp and RUNNING, inside a machine frame (Ch 1's process row, packaged). Registry = frame with a `REGISTRY` bar holding a vertical stack of image chips, older versions at reduced opacity. Kernel = full-width `c2` band `OS KERNEL`, `SHARED BY ALL` under containers; per-VM "whole OS + kernel" inside each `VM` frame. Comparison markers SAME (`good`), DIFFERENT (`warn`; on narrow canvases `=` / `≠` with a legend) in a column between two machine frames whose rows line up (one grid; `renderPair` in Ch 2's `site/widgets/w-samecode-scrolly/`, two scrollytelling lanes). Tests row per machine: PASS, FAIL, NOT RUN, ?, NOT RELEASED (dashed). In / out of the image as mono band labels spanning both columns (IN THE IMAGE, HANDED IN AT START, KEPT OUTSIDE THE APP; data rows dashed), f-01. Term cards for image, immutable, stateless, container. Reusable chips `.cp-machine` / `.cp-img` / `.cp-ctr` in Ch 2's `assets/page.css`; f-02 (f-01 before the human-review revision) drawn from `CH02_REGISTRY` / `CH02_MACHINES` in `assets/page.js`. |
| orchestration, orchestrator, Kubernetes (by name), cluster                                                             | 3       | Extends Ch 2. Container chip height = size in room units (40px per unit on desktop, 28px under 600px; all chips `c1`, told apart by label). Machine body fixed at capacity, unused room one dashed `c6` region `N FREE`. DOWN machine = dashed `ink-3` frame, bar `DOWN` in `bad`, chips kept at reduced opacity marked LOST. Container status words RUNNING (`good`), CRASHED, LOST (`bad`), NEW ADDR (`warn`: running, callers not told), STOPPED (removed next step); where a word doesn't fit, RUNNING is left unmarked (never a lamp alone). Service pills `orders 1 · UP` with UP / DEGRADED / DOWN; a pill can be held as "?" until a check is committed. Connection note line (`storefront → orders: machine 04`) and stale-record note (`SPREADSHEET · …`). Step highlight = 3px ink outline for one step. `CLUSTER` frame = 3px `ink` stroke around machine frames (f-02, static page CSS, not the renderer). Term card `.cp-term`, payoff variant on blueprint ground. Scrollytelling lanes per §8 step 7. Renderer `renderFleet` and complete per-step snapshots in Ch 3's `site/widgets/w-fleet-scrolly/` (`data.js` documents the format) for later chapters to copy. |
| node, Pod, desired state, declarative vs. imperative, reconcile loop / controller, control plane, API server, manifest | 4       | Extends Ch 3. Node = Ch 3's machine frame with a `NODE · NN` bar. Pod = Ch 3's `c1` chip inside an inset `ink` ring (a helper container = two chips in one ring; on phones the ring is thinner, no inset). Pod statuses add NOT STARTED (dashed `c1`, no fill, no lamp: exists only as a record) and STARTING (`warn`). **Written intention = `c4` on `c4-soft`**: the record panel, f-01's goal, f-02's manifest ground. Record rows `WANT n · marks · n RUNNING / SHORT n`, marks computed (filled `good`, hollow dashed, `?` `warn` on an unknown node, struck through = marked for deletion, uncounted). **Loop = `c3` pill with `↻`**, inactive pills dimmed, acting loop at full ink, lens line `SEES · … / DOES · …` (the record panel carries "wants"); node agent = `↻ agent` pill on the node bar. Node status `UNKNOWN` (`warn`, what the record says) vs. physical DOWN frame (reality). CUSTOMERS note line; clock kicker with `~`; no arrows on the scrolly canvas. f-05 control plane = the record with separate loop pills, each connected only to the API server (kit `arrow.js`). f-04 loop lens table from `CH04_LOOPS` in `assets/page.js` (§2.3). Renderer `renderCluster` and the extended snapshot format (documented in `data.js`, including designed-in `restarts`, `version` and an undrawn `waiting` status) in the shared pool, `explainers/_pool/cluster/` (promoted from Ch 4's `w-cluster-scrolly` in Ch 5's run, d-06; data format in `explainers/_pool/README.md`), for later chapters to use. |
| ReplicaSet (lightly), self-healing                                                                                     | 4       | ReplicaSet shown as a shortened `kind: ReplicaSet` manifest (f-02) and as the "ReplicaSet loop" pill. |
| scheduler, requests, limits, bin packing, pending, eviction, OOM-killed                                                | 5       | Extends Ch 4. **Memory in GB replaces room units:** chip height = memory request (one Ch 4 unit = 2 GB); node body = 13 GB room for Pods, `N GB FREE`; processor as a computed `CPU n / 3.9` node footer. **Reserved, used and capped look different in kind:** reserved = the chip outline (on charts a dashed `c4` line), used = solid `c1` fill, use above the request hatched `warn`, cap = solid `ink` line (charts and manifests only). `WAITING · NO ROOM` strip above the nodes with dashed chips and the `n WAITING` record word; scheduler verdicts on node bars (`FITS` / `NO MEMORY` / `NO PROCESSOR`, with free amounts as checked); the recorded reason as a `SCHEDULER` note; a `NEW` tag on added nodes. The sandbox's idle bar "Room for Pods on the rented nodes" in three segments (used at the rush · reserved, not used · not reserved). (Node pools moved to Ch 8, Ch 5 d-12.) Charts (f-05 Tuesday, f-07 leak vs. growth) re-laid out at measured width with direct labels; a kill = ✕ in `bad` with a word. f-06 loop lens table from `CH05_LOOPS` with NEW IN CH 5 tags. Renderer: the pooled `renderCluster` (`explainers/_pool/cluster/`, with Ch 5's additions: verdicts, waiting strip, new nodes, GB units); lane F in Ch 5's `site/widgets/w-friday-scrolly/`; the sandbox model (`model.js`, with a `selftest.mjs`) in Ch 5's `site/widgets/w-sizing-sandbox/`, reusable for per-team totals (Ch 11) or per-time-step capacity (Ch 8). |
| Deployment, rolling update, rollback, readiness probe, liveness probe                                                  | 6       | Extends Ch 5. **Versions by colour and label:** `catalog` chips coloured by version (`PODS[id].series`; v63 `c2` throughout, the other version in a drawing `c5`; the version printed on every chip). READY (`good`) is the running word; **NOT READY** (`warn`, solid chip, hollow lamp, hollow record mark) is running but taking no traffic; STOPPED for an old Pod removed in that step; the CUSTOMERS line names the versions served. **The record's Deployment group:** a header row `DEPLOYMENT · name · WANT n · vNN` over indented ReplicaSet rows, an emptied one `WANT 0 · KEPT` (highlight keys `dep:<name>`, `dep:<name>:version`). f-02 two checks on one Pod (readiness fails → NO TRAFFIC; liveness fails → RESTARTED); f-03 a two-panel revealed figure (crash stalls with v63 serving; $0 version ships); f-04 incident timeline with a `PRICES` status band (`CH06_INCIDENT`); f-05 the record at three moments; f-06 a tag vs. a digest beside Ch 2's registry; f-07 loop lens table from `CH06_LOOPS`. Locked content after a check collapses to a plate until committed. Renderer: the pooled `renderCluster` with Ch 6's optional additions (Deployment group, `notready`, `series`, `STATUS_INLINE`); lane R and f-03's snapshots in Ch 6's `site/widgets/w-rollout-scrolly/`. |
| Service, DNS name, load balancer, ingress / gateway, endpoints, kube-proxy (by name) | 7 | Extends Ch 6. **The Service block** in the record panel (pool-04, `record.service`): header `SERVICE · name · address` in `c4`, over a `READY PODS` list on `surface-2` with a dashed `c3` rule; entries are a series-colour square, version and address; `NONE` in `bad` for an empty list; a leaving entry struck in `ink-3`. Pod addresses plain mono (`PODS[id].addr`); the Service's address mono bold. The calls line `storefront → catalog · answered by …` / `· connection refused`. **A Service is never drawn as a hop:** no arrow passes through a Service block; calls go caller → Pod, with the Service beside the arrow (dashed `c3` leader) as a list the caller looks up (Ch 7 review P-02). f-01 a hand-copied address list as a `c4` band with struck entries; f-02 the Service manifest (address, DNS name, list); f-03 each node's `FORWARDING RULES` band with a `↻ kube-proxy` pill, nothing on the call's path; f-04 two snapshots (Tuesday 12:40: empty `orders` list while its only Pod restarts; seconds later, the same Pod at the same address); f-05 `INTERNET` band, the provider's load balancer as a solid `ink` box on the `CLUSTER` frame's edge, the gateway's rules in the manifest treatment with a `↻ gateway controller` pill; f-06 loop lens table from `CH07_LOOPS`. Narrow chips keep the service name (pool-04 chip rule). Renderer: the pooled `renderCluster` with pool-04; lane S ("Thursday · catalog") and f-04's snapshots in Ch 7's `site/widgets/w-services-scrolly/`. |
| horizontal pod autoscaler (HPA), cluster autoscaler, node pool                                                         | 8       |                                           |
| ConfigMap, Secret, external secret manager                                                                             | 9       |                                           |
| volume, persistent volume, StatefulSet                                                                                 | 10      |                                           |
| namespace, RBAC, resource quota, network policy, multi-tenancy                                                         | 11      |                                           |
| logs, metrics, events, observability                                                                                   | 12      |                                           |
| custom resource (CRD), operator, Helm, GitOps, service mesh (as ecosystem examples)                                    | 13      |                                           |
| shared responsibility, version upgrades, platform team                                                                 | 14      |                                           |

---

## 6. Misconception catalog

Each misconception is owned by one chapter, which confronts it. Later chapters may reuse it in retrieval. Runs refer to misconceptions by these catalog IDs; a run that finds a new one gives it a local ID prefixed `local-` (e.g. `local-01`) and proposes a catalog entry at the checkpoint.

| ID   | Misconception                                                                                                      | Owner |
| ---- | ------------------------------------------------------------------------------------------------------------------ | ----- |
| m-01 | "A container is just a small virtual machine." Containers share the host's kernel; isolation is lighter and weaker | 2     |
| m-02 | "Docker and Kubernetes are the same thing" (or competitors)                                                        | 3     |
| m-03 | "Kubernetes is one master brain that commands every action." Really it is many small independent loops             | 4     |
| m-04 | "Applying a manifest _runs_ something." It records intent; loops act on it                                         | 4     |
| m-05 | "Kubernetes makes our app reliable/scalable by itself." It restarts and replicates; the app must tolerate that     | 4     |
| m-06 | "A pod is a container" / "a specific pod will stick around"                                                        | 4     |
| m-07 | "Setting resources high is the safe choice." It wastes money and can leave pods unschedulable                      | 5     |
| m-08 | "Kubernetes saves money automatically"                                                                             | 5     |
| m-09 | "Rolling updates guarantee a safe release"                                                                         | 6     |
| m-10 | "A Service is a server"                                                                                            | 7     |
| m-11 | "Autoscaling is instant and fixes any slowness." It lags, and won't fix a slow database                            | 8     |
| m-12 | "Secrets are encrypted and secure by default"                                                                      | 9     |
| m-13 | "Kubernetes backs up and protects our data"                                                                        | 10    |
| m-14 | "Namespaces isolate teams securely on their own"                                                                   | 11    |
| m-15 | "If the pod is running, the service is healthy"                                                                    | 12    |
| m-16 | "More ecosystem tools means a more mature setup"                                                                   | 13    |
| m-17 | "Managed Kubernetes means no operations work"                                                                      | 14    |
| m-18 | "Developers will need to become Kubernetes experts" (vs. a platform team hiding it)                                | 14    |
| m-19 | "The code is the app." Its behaviour also depends on the runtime, libraries, config and data on the machine. Ch 1 confronts the problem; Ch 2 revisits it with the fix (packaging) | 1 (Ch 2 revisits) |
| m-20 | "A runbook removes the single-person risk." Runbooks help, but drift means they fall behind the real server          | 1     |
| m-21 | "A bigger server fixes it." Still one hand-built box: no more reproducible, still a single point of failure         | 1     |
| m-22 | "With VMs we can recreate the server any time." A snapshot copies the snowflake, cruft and all; it doesn't explain it | 1     |
| m-23 | "Once everything is containerized, a machine failure is no longer a problem." Containers run on one machine; when it dies, so do they, until something re-creates them elsewhere (Ch 3–4). Container-level precursor of m-05 | 2     |
| m-24 | "If an image passed in staging, it will behave identically in production." The image is identical; settings, secrets, outside services and processor type can still differ. Ch 9 revisits it | 2 (Ch 9 revisits) |
| m-25 | "Kubernetes is Google's Borg, open-sourced (and what Google runs on), so it's right for us." It is Google's third system, built new and open source from the start; the "good enough for Google" leap is Ch 14's question | 3 (Ch 14 revisits) |
| m-26 | "If our machines have enough free room in total, a new or moved container will fit somewhere." Free room split across machines can't hold one large container. Ch 3 designs it out on purpose | 5 |
| m-27 | "An orchestrator is a fancier deploy script: it puts containers on machines when we release." It keeps working between releases. Ch 3 confronts the what; Ch 4 explains the how (rhymes with m-04) | 3 (Ch 4 revisits) |
| m-28 | "Self-healing is instant: when a machine dies, the replacements appear within seconds." With default settings it's about six minutes (~50 s to mark the node, a 5-minute wait, then placement and an image download). Same family as m-11 | 4 (Ch 8 revisits) |
| m-29 | "The scheduler puts new work where the machines are least busy, so a node that looks idle on the dashboard has room." It counts reservations (requests), never live use. Ch 8 and Ch 11 revisit | 5 |
| m-30 | "Going over any limit kills the container, and a limit is the room a Pod is given." Over a processor limit it's slowed; over a memory limit it's killed; room is reserved by the request, not the limit. Ch 12 revisits; Ch 5's §02 now says a Pod can use more than it reserves, so later chapters can assume it (R19) | 5 (Ch 12 revisits) |
| m-31 | "A pending Pod has failed and needs restarting" (or the reverse: "pending is harmless, Kubernetes will sort it out"). The scheduler keeps trying, but nothing makes room unless a node is added or room freed. Ch 8 revisits | 5 (Ch 8 revisits) |
| m-32 | "A failed rollout rolls itself back." Kubernetes stops advancing and reports it; someone (or a tool) has to roll back. Ch 13 revisits (tools that do) | 6 (Ch 13 revisits) |
| m-33 | "Health checks test whether the app works correctly." A check tests what the team wrote it to test and passes on a status code; a healthy-but-wrong version passes. Ch 12 revisits with m-15 | 6 (Ch 12 revisits) |
| m-34 | "Rolling back undoes the bad release, as if it never happened." It changes which version runs; what the bad version wrote stays, and it assumes the old image is still there. Ch 10 revisits | 6 (Ch 10 revisits) |
| m-35 | "A Service checks whether its Pods are healthy." It copies each Pod's own readiness answer and checks nothing itself; a Pod with no readiness check, or one whose check passes while it's wrong, stays on the list. Ch 12 revisits (with m-15 and m-33) | 7 (Ch 12 revisits) |
| m-36 | "A Service balances load, sending each request to the least busy Pod." By default it picks a listed Pod at random when a connection opens, not by load and not per request; long-lived connections stay on one Pod. Ch 8 and Ch 13 revisit | 7 (Ch 8, 13 revisit) |
| m-37 | "Every service needs its own load balancer." Calls inside the cluster need none, and one gateway can route many Services behind a single load balancer; each load balancer is a separate provider machine with its own charge and entry point. Ch 14 revisits | 7 (Ch 14 revisits) |

---

## 7. Chapters

Each entry is a draft brief. At intake, the didactician orchestrator should copy its fields into `brief.md`: `context: part of a course: "Desired state: Kubernetes from the problems up"`, with prerequisites and out-of-scope taken from the entry, and `time_budget_minutes` set for that run.

---

### Part I: Before Kubernetes

### Ch 1: One app, one server

- **Fennel moment:** Year 0. Sam built Fennel's server by hand. One Friday it runs out of disk during the dinner rush and the site is down for two hours.
- **What the manager sees:** an outage tied to a single machine; only Sam knows how the server works; "don't touch it."
- **Pain in the page:** the reader predicts what's on Sam's server, rebuilds it from Sam's notes, runs launch checks, diagnoses the failures, and compares the two machines.
- **Ideas:** an app is a process running on a machine; deploying means getting new code onto that machine; dependencies (the runtime, libraries, config) are part of what makes the app work; hand-built "snowflake" servers are fragile and hard to reproduce; VMs give you more machines but don't remove the snowflake problem.
- **Draft objectives:**
  - o-1 Explain why an app's behavior depends on the machine it runs on, not just its code.
  - o-2 Predict what happens to the business when a single hand-built server fails.
  - o-3 Explain why "just get a bigger server" or "add VMs" doesn't fix reproducibility.
- **Misconceptions:** m-19 (confront the problem; leave the fix, packaging, to Ch 2), m-20, m-21, m-22.
- **Prerequisites:** none beyond the audience.
- **Out of scope:** containers (Ch 2); operating systems in any depth.
- **Retrieval from:** n/a.
- **The conversation:** Sam says, "We should keep a runbook for the server." The question to ask: "If this box vanished tonight, how long until we're back, and who has to be awake?"
- **Research depth:** none or light.

### Ch 2: "Works on my machine": containers

- **Fennel moment:** Year 1. Six engineers. Onboarding takes a week. A bug happens in production that nobody can reproduce on their laptop. Staging and production have quietly drifted apart.
- **What the manager sees:** slow onboarding; "can't reproduce" bugs; releases that fail only in production.
- **Pain in the page:** contrasting cases. The same code on two machines with one dependency version different: predict the outcome, then reveal it.
- **Ideas:** an image packages the app with its dependencies; a container is a running instance of an image; images are immutable and versioned, and stored in a registry; build once, run anywhere; containers vs. VMs (shared kernel, lighter, start in seconds).
- **Draft objectives:**
  - o-1 Explain how packaging the app with its dependencies removes the "works on my machine" class of problem.
  - o-2 Distinguish an image from a running container.
  - o-3 Contrast containers with VMs well enough to see why many containers fit on one machine, and the isolation that costs.
  - o-4 Identify which problems containers _don't_ solve: what happens when the machine dies.
- **Misconceptions:** m-01, m-23, m-24; revisits m-19 with the fix.
- **Prerequisites:** Ch 1.
- **Out of scope:** Dockerfile syntax; container internals (namespaces/cgroups) beyond a single sentence; orchestration.
- **Retrieval from:** Ch 1 (snowflake servers). Suggested opener: why did photo uploads fail on the rebuilt server? (It needs the snowflake idea.)
- **Reuse candidate:** Ch 1's `w-rebuild` stage-4 two-machine comparison (content in its `data.js`) could carry the "same code, one dependency version different" contrasting case, if this chapter's analysis agrees.
- **The conversation:** "Let's containerize everything." The question to ask: "Great for consistency. What happens when the machine running those containers dies?"
- **Research depth:** light.

### Ch 3: Many containers, many machines: the orchestration problem

- **Fennel moment:** Year 2. Fennel has split into `storefront`, `orders`, `payments` and `dispatch`, running across about 8 machines. A spreadsheet says what runs where. Sam gets paged at 3 a.m. when a machine dies and moves containers by hand. Morgan notices half the machines are mostly idle.
- **What the manager sees:** on-call burnout; idle spend; deploys coordinated in a group chat; a spreadsheet as the source of truth.
- **Pain in the page (scrollytelling, user decision in Ch 3's run, d-03/d-07):** three scrollytelling lanes over four machines and nine containers of different sizes: Monday's placing, Saturday's 02:51 crash and 03:04 machine failure, Tuesday's update without downtime. The reader makes Sam's three key decisions as committed checks (where `orders` goes now; whether customers can order once it's running again; start-new-first or stop-first), then sorts Sam's chores into the jobs: placement, restarting, replacing, connecting, updating, scaling. (Originally a hands-on placement widget; replaced because tapping was busywork and stepped states added load.)
- **Ideas:** the work that remains once you have containers is coordination at scale; an _orchestrator_ automates that list of jobs; Kubernetes is named here as one orchestrator, briefly placed in history (it came out of Google's experience with its internal Borg system and is now a community project).
- **Draft objectives:**
  - o-1 List the coordination jobs that appear once many containers run on many machines, having made the key decisions themselves.
  - o-2 Explain how each job shows up as a business symptom (pages, idle cost, risky deploys).
  - o-3 Explain what an orchestrator is, and why Kubernetes is one. Not the same as Docker.
- **Misconceptions:** m-02, m-25, m-27.
- **Prerequisites:** Ch 1–2.
- **Out of scope:** how Kubernetes works (Ch 4); alternatives compared in depth (Ch 14).
- **Retrieval from:** Ch 2 (what containers don't solve). Suggested opener: Ch 2's "the machine running the containers dies at 3 a.m.; what happens?" (m-23).
- **Docker:** Ch 2 says once "you'll hear the name Docker; the next chapter places it", so this chapter must place Docker alongside m-02.
- **Visual reuse:** the lanes reuse Ch 2's f-02 (then f-01) container chip and machine frame, adding chip height for size, drawn by a reusable `renderFleet` renderer from complete per-step snapshots (in Ch 3's `site/widgets/w-fleet-scrolly/`).
- **The conversation:** "We should move to Kubernetes." The question to ask: "Which of these jobs is hurting us most today, and is that worth the cost of the platform?" (Ch 14 gives the full answer.)
- **Research depth:** light.

---

### Part II: The core model

### Ch 4: Say what you want, not what to do: desired state and the reconcile loop

_The central chapter of the course. Everything after it uses its model._

- **Fennel moment:** Year 3. Fennel adopts managed Kubernetes. The same 3 a.m. machine failure happens again, and nobody wakes up.
- **What the manager sees:** the failure from Ch 3 heals itself. Why?
- **Pain in the page:** the Ch 3 scenario again, but now the reader _declares_ "3 copies of `storefront`" and watches a loop notice the gap and close it. Predict-then-reveal: kill a machine and predict what happens.
- **Management analogy:** setting goals vs. handing out task lists; a delegated owner who watches one number and fixes deviations. **Where it breaks:** controllers have no judgment and don't negotiate. They compare and act, forever, and they'll keep restarting a broken app.
- **Ideas:** declarative vs. imperative; the API server as the system of record for intent; controllers as independent loops (observe → compare → act); nodes and pods (a pod wraps one or more containers, and pods are disposable); the control plane, which the managed provider runs; a short manifest snippet showing `replicas: 3` as a written intention.
- **Loop lens (introduced):** "Which loop is it, what does it want, what does it see, and what does it do about a gap?"
- **Draft objectives:**
  - o-1 Explain the difference between declaring a desired state and issuing commands, using a management analogy and noting where it breaks.
  - o-2 Describe the reconcile loop and use it to predict what happens when a machine or a pod dies.
  - o-3 Explain why pods are treated as disposable, and what that requires of the application.
  - o-4 Describe the cluster at a high level (control plane, nodes, pods) and which parts the managed provider runs.
- **Misconceptions:** m-03, m-04, m-05, m-06.
- **Prerequisites:** Ch 1–3.
- **Out of scope:** scheduling details (Ch 5); Deployments and rollouts (Ch 6); networking (Ch 7); etcd beyond "the cluster's record."
- **Picked up from Ch 3:** (a) reuse Ch 3's Monday layout and 03:04 failure of machine 03 as a lane (or a small widget on Ch 3's `renderFleet`) in which the system does what Sam did by hand, after a predict ("machine 03 dies; what happens now?"); (b) suggested retrieval: "which jobs did Sam do at 3:04?" (replacing, connecting); (c) Ch 3's conductor aside promises this chapter shows how the work is split with no single conductor (m-03), and Ch 3 leaves the question "what if the record were the thing the machines act on?", which desired state answers; (d) "K8s" and "Kubernetes means helmsman" are unsourced so far; source them here if wanted. Revisit m-27 (an orchestrator is not a deploy script) through the loops.
- **Retrieval from:** Ch 3 (the jobs list; which job this solves). Call back Ch 1's question, "If this box vanished tonight, how long until we're back, and who has to be awake?" The answer here, "minutes, and nobody", is the payoff.
- **The conversation:** "The app keeps crash-looping, but Kubernetes keeps restarting it." The questions to ask: "So Kubernetes is doing its job. What's wrong with the app? And is restarting hiding the problem from us?"
- **Research depth:** light.

### Ch 5: Who runs where: scheduling, resources and cost

- **Fennel moment:** Morgan asks why the bill went _up_ after moving to Kubernetes. Meanwhile some `dispatch` pods are stuck "pending," and an `orders` pod got killed for using too much memory.
- **What the manager sees:** a cloud bill; pods that won't start; mystery restarts.
- **Pain in the page:** a bin-packing widget. The reader sets requests per service and watches node count (and cost) change. Inflating everything "to be safe" adds nodes and leaves pods pending.
- **Management analogy:** staffing and budgeting. A request is a reserved budget; a limit is a spending cap. **Where it breaks:** the scheduler places work only by what was reserved, not by what is actually used.
- **Ideas:** the scheduler as a loop that places pods on nodes; requests (reservations) vs. limits (caps); bin packing and utilization; pending pods. Node pools moved to Ch 8 (d-12); OOM-kill and eviction; how reservations drive cost.
- **Loop lens:** the scheduler watches for unplaced pods and assigns them to nodes.
- **Draft objectives:**
  - o-1 Explain how requests determine placement, and therefore how many machines you pay for.
  - o-2 Predict the effect of over- and under-requesting resources on cost and reliability.
  - o-3 Interpret "pending" and "OOM-killed" as symptoms and know which questions they raise.
- **Misconceptions:** m-07, m-08, m-26.
- **Prerequisites:** Ch 4.
- **Out of scope:** autoscaling (Ch 8); scheduling constraints like affinity and taints, beyond one sentence that they exist.
- **Retrieval from:** Ch 4 (the loop model), Ch 3 (idle machines).
- **Picked up from Ch 3:** m-26 with Ch 3's research example x-01 (100 GB free in 10 GB pieces can't take a 20 GB job). This chapter's topic is genuinely system dynamics, so a hands-on sandbox (B2) may earn its place here: build it on Ch 3's `renderFleet` with a WAITING state. Ch 3 promises this chapter counts memory and processor separately, and says "some idle room is insurance; how much is Chapter 5's question": pick up headroom explicitly. Spreading a service's copies across machines is the "one sentence that affinity exists".
- **Picked up from Ch 4:** (a) the scheduler is already named as "the loop that picks a node", with "how it chooses is Chapter 5" said twice (lane A4, B5): deliver that; (b) Ch 4 says that with no room a Pod waits, unplaced: the promise "pending" keeps; (c) Ch 4's moving day now follows the scheduler's defaults (one `storefront` Pod each on 01, 04 and 02: emptiest node first, copies spread), so it is a ready-made worked example of scoring, and of why the scheduler isn't trying to use as few nodes as possible (m-08); (d) after 03:04 the cluster runs on three nodes with less spare room (Ch 4's D4 disclosure says "that room is the subject of Chapter 5"): pick up headroom here; (e) Ch 4 says Fennel pays for the computing its Pods run on, which in most modes means paying for the machines themselves; this sets up Morgan's bill. (Ch 5's research: only some fully managed modes bill per Pod, and those bill by what Pods request, not what they use; others still bill per machine.) Ch 4's `renderCluster` (now in `explainers/_pool/cluster/`) has a `waiting` status and `WAITING · NO ROOM` row word designed in but not drawn; a Ch 5 sandbox can drive it instead of Ch 3's `renderFleet`. Add the scheduler's row detail to the loop lens table (§2.3). Retrieval candidates: m-28, k-05 ("what worked out that `orders` should go to node 04?").
- **The conversation:** "We need to bump memory limits on `orders`." The questions to ask: "Is that a leak or real growth? What does it do to our node count?"
- **Research depth:** light.

### Ch 6: Shipping without downtime: rollouts and rollbacks

- **Fennel moment:** releases used to be a Thursday-night event. Now teams ship several times a day. Then a bad `catalog` release goes out and prices show as $0 for six minutes.
- **What the manager sees:** faster releases, and a new kind of incident.
- **Pain in the page:** a step-locked rollout (blueprint B1). Old and new pods swap a few at a time. Predict-then-reveal: a version that crashes is stopped by health checks, but a version that's healthy-but-wrong rolls out completely.
- **Ideas:** a Deployment as a loop that manages versions; rolling updates; readiness probes ("ready for traffic") vs. liveness probes ("still alive"); rollback as declaring the old version again; where code comes from (CI builds an image, then the desired state is updated), kept light.
- **Loop lens:** the Deployment watches "which version should run, how many" and shifts replicas toward it gradually.
- **Draft objectives:**
  - o-1 Explain how a rolling update replaces a version without downtime.
  - o-2 Predict which bad releases health checks will stop and which they won't.
  - o-3 Explain rollback in terms of desired state.
- **Misconceptions:** m-09.
- **Prerequisites:** Ch 4.
- **Out of scope:** canary/blue-green in depth (name them); CI/CD tooling; database migrations (Ch 10 touches state).
- **Retrieval from:** Ch 4 (declare vs. command), Ch 2 (immutable images).
- **Picked up from Ch 3:** Ch 3's lane C is the by-hand rolling update (start one, add its address, stop one; it needs one copy's worth of spare room). Retrieve it ("in Ch 3, Sam did this by hand") and consider reusing its lane controller and snapshots for this chapter's step-locked rollout. Ch 3 names "noticing a container that's running but stuck" only as a later job; probes deliver it.
- **Picked up from Ch 2 (cut there for time):** tags vs. digests: a version label like `latest` can be moved to a newer image; only a digest pins one exact image. And old images can be deleted from a registry, so rolling back assumes someone kept them. Both answer "which exact image is in production, and can we go back to it?"
- **Picked up from Ch 4:** Ch 4 shows `kind: ReplicaSet` (shortened, f-02) and says engineers usually write a Deployment, which wraps it and adds version updates (Chapter 6). Introduce the Deployment as the loop that manages versions _by managing ReplicaSets_, retrieving f-02; `renderCluster`'s record panel can nest two ReplicaSet rows under a Deployment row for the rollout lane, and `PODS[id].version` is already drawn. Level-based behaviour (the loop acts on the current gap, not on events) stayed a Ch 4 disclosure (D2); rollback as "declaring the old version again" is the natural place to say it in the main text. Add the Deployment loop's row to the loop lens table.
- **Picked up from Ch 5:** a rollout needs spare room while old and new Pods run side by side (Ch 3's lane C needed one copy's worth; Ch 5's headroom, "Keep room to lose a node"). The cluster now has five nodes (01, 02, 04, 05, 06) with requests in GB (§3), so Ch 6 can show a rollout's surge Pod waiting for room, or fitting on node 06's spare room. Copy `CH05_LOOPS` forward (§2.3) for the Deployment row; the pooled `renderCluster` draws the waiting strip and `version`.
- **The conversation:** "The rollout passed health checks, so it wasn't the deploy." The question to ask: "What do our health checks actually test? Would they catch wrong behavior, or only crashes?"
- **Research depth:** light.

### Ch 7: Finding each other: services and traffic

- **Fennel moment:** `storefront` needs to call `orders`, but `orders` pods come and go and change addresses all the time. Customers on the internet need one stable way in.
- **What the manager sees:** "connection refused" incidents; questions about load balancer cost.
- **Pain in the page:** a widget where pods appear and disappear with changing addresses. The reader tries to keep a hand-written address list up to date, then a Service does it.
- **Management analogy:** a team's shared inbox or front desk: you contact the team, not a specific person. **Where it breaks:** a Service isn't a thing that runs. It's a routing rule kept up to date by a loop.
- **Ideas:** pods are ephemeral and their addresses change; a Service gives a stable name and spreads traffic across the matching pods; DNS names inside the cluster; getting traffic in from outside (load balancer, ingress/gateway); service mesh named as a later topic.
- **Loop lens:** a loop watches which pods are ready and keeps the Service's list of destinations current.
- **Draft objectives:**
  - o-1 Explain why stable addresses are needed when pods are disposable.
  - o-2 Describe how a Service connects callers to whichever pods are currently ready.
  - o-3 Trace, at a high level, how a customer's request reaches a pod.
- **Misconceptions:** m-10.
- **Prerequisites:** Ch 4. Ch 6 (readiness) helps but isn't required.
- **Out of scope:** network plugins, IP addressing, TLS details, service mesh internals.
- **Retrieval from:** Ch 4 (pods are disposable), Ch 6 (readiness). Ch 3's k-03 ("`orders` is running again; can customers order?", no: storefront still points at the dead machine) is this chapter's hand-written-address pain, already felt once; retrieve it.
- **Picked up from Ch 4:** lane B6 credits "another loop (Chapter 7)" with keeping `storefront` pointed at the new `orders` Pod, and k-06 establishes that a replacement Pod has a new name and address (`orders-5c8x` → `orders-q2rw`). f-04's dashed "another loop" row is this chapter's to fill in (the EndpointSlice controller, Ch 4's research parking lot).
- **Picked up from Ch 6:** readiness decides who gets traffic "by a loop we'll name in Chapter 7" (said in Ch 6's s-05, s-10 and f-07's dashed row, which now reads "sending requests only to ready Pods"): name it (the EndpointSlice controller) and fill in the row, copying `CH06_LOOPS` (§2.3). Every rollout gives a service new Pods with new addresses (Ch 6's closing bridge: `storefront` finding `catalog`'s ready Pods); during a rollout old and new versions serve side by side; a canary by share of traffic needs routing, not just Pod counts. Retrieve Ch 6's k-05 (a Pod that fails its readiness check is taken out of traffic, not restarted). `catalog` (3 copies on nodes 05 and 06, §3) is a ready-made callee.
- **The conversation:** "We want a separate load balancer for every service." The question to ask: "What does each one cost? Could one ingress/gateway route to all of them?"
- **Research depth:** light.

### Ch 8: The Friday dinner rush: autoscaling

- **Fennel moment:** Friday traffic triples between 5 and 7 p.m. Fennel used to over-provision all week for two hours of peak. Now it scales, though once it scaled up too late and `dispatch` lagged during the first twenty minutes.
- **What the manager sees:** a bill that tracks traffic; a "we scaled but still slowed down" incident.
- **Pain in the page:** a goal-free explorer (blueprint B2). The reader sets a traffic curve and scaling settings and watches pods and nodes follow, with visible lag. Predict-then-reveal: autoscaling a service whose bottleneck is the database.
- **Ideas:** scaling pods by a metric (HPA) vs. scaling machines (cluster autoscaler, managed); the two layers working together; lag (new nodes take minutes); scaling down and cost; a bottleneck elsewhere won't be fixed by more pods.
- **Loop lens:** the HPA watches a metric and adjusts the replica count; the cluster autoscaler watches pending pods and adds nodes, then removes idle ones.
- **Draft objectives:**
  - o-1 Explain the two layers of autoscaling and how they chain together.
  - o-2 Predict where lag causes a slowdown during a spike, and what teams do about it.
  - o-3 Explain why scaling pods doesn't help when the bottleneck is elsewhere.
- **Misconceptions:** m-11.
- **Prerequisites:** Ch 4, Ch 5.
- **Out of scope:** vertical autoscaling and event-driven scaling (name them); metrics pipelines.
- **Retrieval from:** Ch 5 (requests drive node count), Ch 4. Ch 3 names scaling but doesn't show it: its chore "kept three storefront copies running all week, because Friday's dinner rush needs three" is this chapter's over-provisioning. This chapter needs a time axis, so probably its own widget, drawing machines with Ch 3's `renderFleet`.
- **Picked up from Ch 4:** retrieve m-28 ("self-healing is instant") next to m-11; same family. f-04 gains two rows (the two autoscalers). Ch 4 never says the cluster adds machines by itself; after 03:04 it ran on three nodes until someone added one, so the cluster autoscaler answers that. Ch 4 cut a thermostat analogy (its x-01) that fits autoscalers better; available here. `renderCluster` nodes may be added or removed between steps.
- **Picked up from Ch 5:** after Friday, `dispatch` runs 6 copies all week for two hours of peak (this chapter's over-provisioning, now in Kubernetes); nodes 05 and 06 stay on the bill until someone removes them (Ch 5's k-05), and the pending `dispatch` Pod waited about an hour for a person to add nodes (lane F): the cluster autoscaler answers both. Fill in f-06's dashed "a loop that adds nodes" row. Retrieve m-31 (pending) next to m-28 and m-11. Ch 5's sandbox model (`w-sizing-sandbox/model.js`) can be run per time step. Parked: right-sizing requests from observed use, recommenders, vertical autoscaling, in-place resize; provider modes that pack Pods for you.
- **Node pools, moved from Ch 5 (Ch 5 human review, d-12):** Ch 5 no longer teaches node pools, because its reader hasn't yet seen how nodes get added (Ari's team adds them by hand). Introduce them here, where a loop adds nodes: a node pool is a group of identical machines the cluster can add to or shrink, and several pools give different machine types (a large-memory pool if one `orders` Pod outgrows a 13 GB node; a cheaper spot pool for work that can be interrupted, keeping `orders` and `payments` off it). Ch 5's cut f-03 and k-06 are a starting point (as written in Revision 0 of Ch 5's plan, `run/history/11-instructional-designer/run/plan/learning-plan.md`); sources c-24, c-25 in Ch 5's `facts.md`. Ch 5 now ends with "`orders` needs a bigger node, which Ari's team would rent by hand"; pick it up as "and the loop that adds nodes has to know which kind to add", which is where pools earn their place, and add the link the user asked for: an autoscaler grows and shrinks each pool. f-03 (a `CLUSTER` frame with a general pool 01 02 04 05 06, a spot pool, a dashed large-memory pool) can show the autoscaler adding nodes into a pool; its visual grammar (thin `ink-3` frame, mono `NODE POOL · …` header, an unrented pool dashed `c6`) moves with it. k-06 (which service stays off a spot pool: `orders`) is reusable as is.
- **Picked up from Ch 6 (small):** a rollout needs room while it runs (one extra Pod by default), so the loop that adds nodes may have to add one for a release to finish; changing a Pod's requests in a Deployment starts a rollout.
- **Picked up from Ch 7:** a new Pod joins its Service's list only once it is ready, so readiness time adds to scaling lag; long-lived connections don't move to new Pods (m-36), so adding copies may not spread existing load until connections reopen; retrieve Ch 7's Service block (`record.service`) for "new Pods join the list". `CH07_LOOPS` (§2.3) is the table to copy.
- **The conversation:** "We'll turn on autoscaling, so we're ready for the holidays." The questions to ask: "How fast do we scale compared with how fast traffic rises? What's the bottleneck after the app: the database, the payment provider?"
- **Research depth:** light.

---

### Part III: The hard parts

### Ch 9: Configuration and secrets

- **Fennel moment:** Year 4. The same `payments` image needs to run in staging and production with different settings. A security review finds payment-provider keys readable by more people than expected.
- **What the manager sees:** an audit finding; "it's in a Secret, so it's secure" said in a meeting.
- **Pain in the page:** contrasting cases. Settings baked into the image vs. supplied at runtime; then a "Secret" decoded in one click to reveal it isn't encrypted by default.
- **Ideas:** separate configuration from the image (one image, many environments); ConfigMaps and Secrets; what a Secret does and doesn't protect by default; access control and encryption at rest as things to turn on; external secret managers from the cloud provider.
- **Loop lens:** declared configuration is delivered to pods; a change in desired config is rolled out, sometimes only by restarting pods.
- **Draft objectives:**
  - o-1 Explain why configuration is kept separate from the image.
  - o-2 Explain what Kubernetes Secrets protect by default and what they don't.
  - o-3 Ask the right questions about who can read secrets and where they're stored.
- **Misconceptions:** m-12.
- **Prerequisites:** Ch 2, Ch 4, Ch 6.
- **Out of scope:** cryptography; specific secret-manager products.
- **Retrieval from:** Ch 2 (immutable images), Ch 6 (rollouts). Ch 2 already said settings are handed to a container at start, so one image serves staging and production; point back to it. Revisit m-24. Ch 3 names "handing each container its settings and passwords" only as a later job.
- **Picked up from Ch 6 (small):** f-03's crash case (a version that crashes on start) is a missing-setting story; changing a configuration object that Pods read doesn't start a rollout by itself (only a change to the Pod template does).
- **The conversation:** "Credentials are in Kubernetes Secrets, so we're fine for the audit." The questions to ask: "Are they encrypted at rest? Who has read access? Should they live in our cloud's secret manager?"
- **Research depth:** standard (security defaults vary by provider and version).

### Ch 10: The database problem: state

- **Fennel moment:** Ari's team debates running the `orders` database inside the cluster vs. using the cloud's managed database. An engineer assumes the cluster "handles" backups.
- **What the manager sees:** a build-vs-buy decision with data-loss risk attached.
- **Pain in the page:** predict-then-reveal. A pod holding data is replaced: what happens to the data with no persistent volume, and with one? Then a contrasting case: a disposable web pod vs. a database replica that needs a stable identity.
- **Ideas:** the disposable-pod model clashes with data that must survive; volumes and persistent volumes (storage that outlives a pod); StatefulSets (stable identities and ordered startup); why many teams keep databases in managed cloud services; backups and recovery are still your problem.
- **Loop lens:** loops keep a pod attached to its storage and identity, but no loop understands your data.
- **Draft objectives:**
  - o-1 Explain why stateful systems strain the disposable-pod model.
  - o-2 Describe how persistent storage and stable identities address it, at a high level.
  - o-3 Weigh running a database in the cluster against a managed database service.
- **Misconceptions:** m-13.
- **Prerequisites:** Ch 4, Ch 5.
- **Out of scope:** storage drivers; database replication internals; operators (Ch 13 refers back here).
- **Retrieval from:** Ch 4 (pods are disposable), Ch 6 (rollouts; schema migrations as a risk). Ch 2 said data written inside a container vanishes when it's replaced and must live outside it (without naming "volume"); point back to it. Note: Ch 1 glossed over data in the rebuild ("copy the data over from last night's backup") and noted that restoring a whole-disk snapshot loses orders taken since; point back to that rather than contradicting it.
- **Picked up from Ch 4:** Ch 4 says anything inside a Pod is gone with it and points here; Fennel's orders data lives in a database outside the app (Ch 2). Ch 4's parking lot: Pods on an unreachable node may keep running unseen while replacements start (why stateful apps need stable identities); the 5-minute wait can be tuned per app (`tolerationSeconds`), e.g. longer for apps with local state.
- **Picked up from Ch 5 (small):** memory-backed temporary storage counts toward a container's memory limit, so writing temporary files can cause an OOM kill. Spreading across zones (the scheduler's second default spread rule) was left out of Ch 5.
- **Picked up from Ch 6:** the 23 orders placed at $0 during Thursday's `catalog` v64 release: data written by a bad version outlives a rollback (m-34). The Recreate strategy, for when two versions can't run side by side (for example around incompatible data changes); schema changes and rollback.
- **Picked up from Ch 7:** headless Services (the name returns every Pod's address, for databases whose copies must be reached one by one); a Service with no selector, or of type ExternalName, for a managed database outside the cluster. `orders` still runs a single copy (Ari's proposed second copy, Ch 7) and is stateful: why a second copy of a stateful service isn't as simple as a replica count.
- **The conversation:** "Let's run Postgres in the cluster. It'll save money." The questions to ask: "Who owns backups, failover and upgrades? What does the managed service cost compared with our people's time?"
- **Research depth:** standard.

### Ch 11: Many teams, one cluster: namespaces, permissions and quotas

- **Fennel moment:** six teams share the cluster. The data team's batch job eats the capacity the `dispatch` team needed on a Friday. An intern's credentials could delete production.
- **What the manager sees:** cross-team incidents; arguments about fairness; security asking about blast radius.
- **Pain in the page:** a shared-cluster widget. With no limits, one team's spike starves the others. The reader adds quotas and watches the effect, then sees that a namespace alone doesn't stop network traffic between teams.
- **Management analogy (strong fit):** departments, budgets and signing authority. **Where it breaks:** namespaces are naming and policy scopes, not walls. Isolation comes only from the policies you add.
- **Ideas:** namespaces as scopes; RBAC (who may do what, where); resource quotas; network policies; one shared cluster vs. a cluster per team or environment (the trade-off between cost and blast radius).
- **Loop lens:** admission checks and quota enforcement act on requests before they're recorded as desired state, a gate in front of the loops. (Introduce this as a small extension of the model.)
- **Draft objectives:**
  - o-1 Explain what namespaces, RBAC and quotas each control.
  - o-2 Predict what happens on a shared cluster with and without quotas.
  - o-3 Weigh one shared cluster against several clusters.
- **Misconceptions:** m-14.
- **Prerequisites:** Ch 4, Ch 5, Ch 7.
- **Out of scope:** policy-engine specifics; identity-provider integration.
- **Retrieval from:** Ch 5 (requests and capacity), Ch 9 (who can read secrets).
- **Picked up from Ch 4:** f-05 draws the API server as the only way into the record; that's where this chapter's "gate in front of the loops" (admission checks, quotas) sits. Ch 4's parking lot: spec and status can have separate permissions (people write what's wanted, controllers write what's observed).
- **Picked up from Ch 5:** requests are claims on shared room, so one team's padding or spike can leave another team's Pods pending (this chapter's Friday `dispatch` starved by a batch job is Ch 5's lane F with a cause); quotas cap a team's total requests; namespace defaults for requests and limits (LimitRange); Pod priority and preemption. Ch 5's sandbox model can count per-team totals. Retrieve m-29.
- **Picked up from Ch 7:** the namespace in a DNS name (`orders.<namespace>.svc.cluster.local`; a short name finds Services only in the caller's own namespace); Gateway API's split of roles between the platform team and product teams, which answers Riley's "control over how they get in" (Ch 7's conversation); network policies (by default, Services let anything connect to anything).
- **The conversation:** "Let's give every team its own cluster." The questions to ask: "What does that do to cost and upgrade work? Which risk are we actually reducing?"
- **Research depth:** light.

### Ch 12: Seeing inside: incidents in a self-healing system

- **Fennel moment:** a postmortem. `notifications` looked "green" all week while silently failing, and Kubernetes kept restarting a pod that crashed every few hours, which hid the problem.
- **What the manager sees:** a postmortem document and a dashboard that looked fine.
- **Pain in the page:** a worked postmortem (blueprint B1). Step through the timeline using events, metrics and logs; at key moments, predict what the system did next.
- **Ideas:** self-healing can hide failures; logs, metrics and events and what each answers; why pods being disposable makes logs disappear unless they're collected centrally; restart counts and events as signals; health at the pod level vs. at the service level.
- **Loop lens:** loops record what they did as events. Reading the record shows which loop acted, and why.
- **Draft objectives:**
  - o-1 Explain how self-healing can mask a recurring failure.
  - o-2 Distinguish what logs, metrics and events each tell you.
  - o-3 Read a simple Kubernetes postmortem and find the questions it leaves unanswered.
- **Misconceptions:** m-15.
- **Prerequisites:** Ch 4–8.
- **Out of scope:** specific observability products; tracing beyond a mention.
- **Retrieval from:** Ch 4 (crash loops), Ch 6 (probes), Ch 8 (scaling lag). Ch 3 names "noticing a container that's running but stuck" and "watching it all" only as later jobs, and its k-03 is an early case of "running is not the same as working" (m-15).
- **Picked up from Ch 4:** Ch 4 introduces `notifications` crash-looping on a missing setting (Year 3), the back-off numbers (10 s doubling to a 5-minute cap; ~15 restarts in the first hour; the docs' example of 200 restarts in 2d9h), `CrashLoopBackOff` (named once), and the question "is restarting hiding the problem from us?". Retrieve k-08 / k-09 and call `notifications`' Year 3 crash loop back from the Year 4 postmortem. `renderCluster` draws a restart counter (`restarts`). Parking lot: eviction is rate-limited and stops if most machines in a zone look unhealthy at once; back-off can be tuned.
- **Picked up from Ch 5:** `orders-q2rw`'s three OOM kills on a Tuesday (restart count 3, `OOMKilled`, exit code 137; repeated kills end in crash-loop back-off) and the open question of Ch 5's conversation (was it a leak?) make a natural postmortem; Ch 5 cut a Tuesday lane and an eviction lane (both buildable on the pooled renderer). Evictions as events; QoS classes and the eviction order in engineers' terms; memory limits enforced "reactively"; the default eviction threshold; spot machines' short graceful shutdown. Retrieve m-30.
- **Picked up from Ch 6:** Morgan noticed the $0 `catalog` incident from the orders, not from a dashboard: monitoring that catches wrong behaviour, not just crashes; probe tuning (startup checks, timing defaults, liveness checks that depend on back-ends and cause cascading restarts); the "failed to progress" condition as something to alert on. Revisit m-33 together with m-15.
- **Picked up from Ch 7:** "is the Service's list empty?" as the first check when a service refuses calls; refused vs. timed out as clues; Pods shutting down while callers still hold connections (graceful shutdown); a cloud load balancer's own health checks are the provider's, not Kubernetes'. m-35 with m-15 and m-33.
- **The conversation:** "Root cause: pod restarted, now resolved." The questions to ask: "Why did it restart? How many times before this? Would we have noticed without the customer report?"
- **Research depth:** light.

---

### Part IV: Owning it

### Ch 13: Teaching the cluster new tricks: extensions and the ecosystem

- **Fennel moment:** Year 5. Ari's team proposes a database operator, GitOps, Helm and a service mesh. Jordan is handed an architecture diagram with fifteen logos on it.
- **What the manager sees:** tool sprawl; a proposal full of names they don't know.
- **Pain in the page:** sorting. The reader classifies each ecosystem tool by the question "which loop is this, or what does it add?" and finds that most are the same model applied to new kinds of things.
- **Ideas:** custom resources let you declare new kinds of desired state; operators are custom loops that encode operating knowledge (for example, a database operator, which connects back to Ch 10); Helm (packaging), GitOps (desired state kept in git, synced by a loop) and service mesh (traffic and security between services) as ecosystem examples; every tool added is something to run and upgrade.
- **Loop lens (payoff):** the reader applies the model to tools the course has never taught.
- **Draft objectives:**
  - o-1 Explain how custom resources and operators extend the same desired-state model.
  - o-2 Use the loop lens to describe an unfamiliar ecosystem tool from a one-paragraph description.
  - o-3 Evaluate a proposed tool by what it solves and what it costs to own.
- **Misconceptions:** m-16.
- **Prerequisites:** Ch 4–11.
- **Out of scope:** installing or comparing specific tools in depth.
- **Retrieval from:** Ch 10 (state), Ch 7 (traffic), Ch 6 (rollouts).
- **Picked up from Ch 4:** Ch 4 says manifests are kept in version control; that plus a loop that syncs them into the cluster is GitOps. The loop lens table (§2.3) is the tool for this chapter's sorting exercise.
- **Picked up from Ch 6:** GitOps makes "change the file back" the only way to roll back (Ch 6's D4: Riley reverted the image line rather than using an undo command); progressive delivery tools (Argo Rollouts, Flagger) that run canaries and roll back on their own (m-32); admission controllers that pin tags to digests.
- **Picked up from Ch 7 (small):** service mesh (per-request balancing, encryption and measurement between services; m-36); Ingress NGINX's retirement (24 March 2026) as the "every tool added is something to run and upgrade" example; Ingress2Gateway; kube-proxy replacements; canaries by share of traffic need routing beyond a plain Service.
- **The conversation:** "We need a service mesh." The questions to ask: "Which problem do we have today that it solves? Who will run and upgrade it?"
- **Research depth:** standard (the ecosystem changes quickly).

### Ch 14: What all this costs: managed Kubernetes, platform teams and when not to use it

- **Fennel moment:** Morgan and Jordan review the year. The cluster needs a version upgrade that interrupts feature work. Developers complain that Kubernetes is too complex. A new product team asks whether it needs Kubernetes at all.
- **What the manager sees:** recurring upgrade projects; headcount for a platform team; developer frustration; a strategy question.
- **Pain in the page:** a decision exercise. Given Fennel at three different stages (Year 1, Year 3, Year 5), choose a hosting approach and see the consequences.
- **Ideas:**
  - what the managed provider handles vs. what you still own (shared responsibility);
  - the version-upgrade treadmill: Kubernetes releases several times a year and each version has a limited support window. Exact cadence and support length to be verified in research;
  - platform teams and internal developer platforms that hide Kubernetes from product engineers;
  - alternatives: PaaS, serverless, plain VMs, managed container services;
  - when Kubernetes is the wrong tool.
- **Draft objectives:**
  - o-1 Describe what remains your responsibility on managed Kubernetes.
  - o-2 Explain why upgrades are ongoing work and how teams plan for them.
  - o-3 Explain the role of a platform team and why most developers shouldn't need deep Kubernetes knowledge.
  - o-4 Argue, for a given company situation, whether Kubernetes is worth it.
- **Misconceptions:** m-17, m-18, m-08 (revisited), m-25 (revisited: "good enough for Google").
- **Prerequisites:** Ch 1–13.
- **Out of scope:** vendor-by-vendor comparisons; pricing specifics.
- **Retrieval from:** Ch 3 (the jobs list), Ch 5 (cost), Ch 13 (ownership cost). From Ch 3: its jobs-to-symptoms figure and its closing question ("Which of these jobs is hurting us most today, and is that worth the cost of the platform?"); m-25; other orchestrators named there only briefly (Docker Swarm, Mesos; Nomad and AWS ECS still unsourced); "Kubernetes doesn't build your application and isn't an all-inclusive PaaS".
- **Picked up from Ch 4:** Ch 4 says upgrades stay partly Fennel's job (deliver it here; m-17). Also from Ch 4: control-plane outages (running apps keep running, nothing heals; D7), standard vs. fully managed provider modes and node auto-repair, where the record is stored (etcd, or other storage on some providers, e.g. GKE; D6), tuning the default waits (D3), and the control-plane fee (EKS per cluster, AKS tiers; not researched in Ch 4).
- **Picked up from Ch 5:** the control-plane fee is first named here (Ch 5 no longer names it, R16); per-Pod pricing specifics in fully managed modes (billed by requests, rounding up, waiting Pods unbilled, crash-looping ones billed; Fargate's one Pod per node, requests = limits); Ch 5's Datadog and CNCF figures and the earlier, non-comparable 2021 survey; spot pricing; right-sizing and cost ownership ("a lack of awareness of responsibility", CNCF's second cause) as platform-team questions; m-08 revisited.
- **Picked up from Ch 6 (small):** disruption budgets during node upgrades; registry retention (Fennel deletes `catalog` images after 30 days) as an ongoing cost and policy question.
- **Picked up from Ch 7 (small):** load-balancer pricing across providers and data-transfer charges (Ch 7 quoted one provider at one date); who runs the gateway's controller; kube-proxy mode changes during upgrades; m-37.
- **The conversation:** "We need two more platform engineers." The questions to ask: "What are they going to automate or own? What's the cost of not doing it: upgrade lag, incidents, developer time?"
- **Research depth:** standard (recent facts: release cadence, support windows, provider responsibilities).

---

### Capstone

### Ch 15: Fennel's hard week

- **Purpose:** varied, interleaved practice. The reader must first decide _which_ idea applies; none of the scenarios is labeled with its chapter.
- **Format:** five to seven short scenarios from one week at Fennel: an incident timeline, an architecture proposal, a cloud-bill spike, a security question, a rollout gone wrong, a "do we need this tool?" request. For each, the reader predicts what's going on and picks the most useful questions to ask, then sees an expert's reasoning (think-then-reveal).
- **Draft objectives:**
  - o-1 Diagnose mixed scenarios using the loop lens and the course's ideas, without being told which ones apply.
  - o-2 Choose the questions that most usefully surface risk or trade-offs in each scenario.
- **Misconceptions:** a mix from the whole catalog, used as tempting wrong answers.
- **Picked up from Ch 6:** the $0 `catalog` incident (a healthy-but-wrong release that rolled out completely) as an unlabelled scenario.
- **Picked up from Ch 7:** Tuesday's refused calls (a single copy, an empty Service list) as an unlabelled clue.
- **Prerequisites:** the whole course.
- **Research depth:** none (it reuses facts verified in earlier chapters; cite them).

---

## 8. Running a chapter through didactician

1. Start a run: `/didactician` with a pointer to this file and the chapter number. Suggested output folder: `explainers/ch-NN-<slug>/`.
2. At intake, the orchestrator fills `brief.md` from the chapter entry:
   - `audience` and `readiness` from §1 (readiness: novice for Kubernetes, intermediate for general software);
   - `context: part of a course: "Desired state: Kubernetes from the problems up"`;
   - `prerequisites` and `out_of_scope` from the entry, plus the term ledger (§5) for terms already introduced;
   - objectives from the draft objectives, refined at intake;
   - `research_depth` as suggested;
   - `time_budget_minutes` chosen for the run;
   - design tokens: the course style guide, `design/control-plane/` (see step 4).
3. Point the designer to §2 (principles), §3 (Fennel) and §6 (the chapter's misconceptions). Tell the researcher and designer to use §6 catalog IDs (new ones as `local-NN`).
4. **Style.** Every chapter uses the Control Plane style guide in `design/control-plane/`. Put it in the handoff to every builder (`page-builder`, `widget-builder`) and to the `pedagogy-ux-reviewer`:
   - use the course's tokens from the shared pool (`pool/tokens.css`, see step 5) in place of the kit's default tokens; don't invent tokens or hard-code colours;
   - follow `design/control-plane/README.md` (voice, colour rules, type, space, figure and widget conventions) and the token usage notes in `tokens.json`;
   - use the treatments in `design/control-plane/components/` (hero, prose, figure plate, slider widget, check) as the reference for those elements, copying from `components/bundle.css`.
   - **Term cards (course convention, Ch 3 run d-08):** each chapter's few critical terms get the `.cp-term` card (specified in Ch 3's plan, `## Figures`), not just a `<dfn>`, so terms look alike across chapters. At most one payoff variant (blueprint ground) per chapter.
     The reviewer checks the page against the style guide as part of the UX review.
5. **Shared pool (course convention).** Shared runtime lives once, in `explainers/_pool/` (tokens, kit components, `toc.js`, `widget.js`, `arrow.js`, `replay.js`; see its README). Each run stays per-chapter: builders read the pool's README, not other chapters.
   - At intake, before the first dispatch, run `npm run sync -- ch-NN-<slug>` so `site/pool/` exists. Don't sync while a builder is working: it writes into `site/`.
   - Tell every builder: reference shared files as `pool/<file>` and don't copy kit files into `site/assets/`. `site/pool/` is read-only; chapter-only CSS and JS go in `site/assets/`. If a builder needs a pool change or wants to reuse another chapter's code, it reports that instead of copying.
   - Pool changes and promotions (moving a chapter's code into the pool once a second chapter needs it) happen after a run, outside it, with every chapter re-gated.
   - The course site is built separately: `npm run build` stitches every chapter whose run reached `deliver` into `dist/`, adding the masthead (prev / next and a "Course map" button that drops down the course map, Fig. 00) and an end-of-chapter plate. The course map sits in the masthead, not the rail, on every screen size (user decision). A run never writes the course chrome; it's in `explainers/_site/`.
6. **Widget height rule (course-wide, user decision in Ch 2's run, d-08).** On screens 600px and wider, a multi-state widget reserves the height of its tallest state, so moving between states never moves the page. Below 600px it does not: each state takes its own height, and on a state change the widget scrolls the new state's header to the top of the viewport. Plans still estimate phone heights honestly. **Exception (Ch 5 run, d-07):** a sandbox whose controls sit at its top doesn't scroll its header to the top on a change under 600px, since that would move the controls away from the reader's hand; stepped and multi-state widgets still follow the rule. Ch 1's `w-rebuild` predates this rule and still reserves its tallest state on phones; bring it in line in a later pass.
7. **Scrollytelling for processes (course convention, Ch 3 run d-08).** Show a process over time as scrollytelling lanes, not as a stepped widget or carousel (user's Ch 2 review). Full spec in Ch 3's plan (`w-fleet-scrolly`).
   - One lane per stage, three to six steps. Desktop: canvas sticky on the left, steps on the right. Under 900px: canvas sticky at the top (≤ 50vh), steps beneath. Under 560px tall: inline snapshots per step.
   - Each step's canvas state is a complete snapshot, so scrolling back restores it.
   - Checks sit in the step column, and the step after a check is gated until the reader commits.
   - Transitions ≤ 300ms, instant under reduced motion, no autoplay.
   - Any placement or drag interaction a chapter does build must also work by tap and by keyboard.
8. After each chapter ships:
   - fill in the **Visuals** column of the term ledger;
   - note any change to Fennel's story (new events, numbers, names) in §3;
   - move anything the chapter cut that a later chapter should pick up into that chapter's entry.
9. **Human review is a formal check (user decision, 2026-10-25).** A chapter ships only after the skill's Stage 4b: a site review session (`human_review.mjs --target site`), the user's confirmation that they're finished, and every `H-` finding closed on their word. Don't move a run to `deliver` or `done` on a deferred review. A chapter waiting for review stays at stage `human-review`. The course build still publishes it, linked from the masthead and the course map and tagged **Under review**. Ch 5, 6 and 7 shipped before this rule and were moved back to `human-review` (their d-09, d-08 and d-13). Curriculum updates already applied from those chapters stay unless their reviews change them.

---

## 9. Open decisions

- **Capstone format:** Ch 15 may be big enough to split into two runs, or to build as a single full-page interactive.
- **Chapter splits:** Ch 4 and Ch 14 are the most likely to run long at the planning stage. Split them rather than compress them.
- **Pool follow-ups from Ch 5's review** (course-level; do them with every chapter re-gated, §8 step 5): in `renderCluster`, label waiting and not-started chips with the service name where they're wide enough (Ch 5 P-11), and give highlighted verdicts and the waiting strip about 4px of inner padding (P-13). The inline TRY AGAIN button's 44px minimum height opens a gap in a check's feedback line; Ch 5 fixed it in its own `page.css` only, and the fix belongs in the pool's check component. Consider promoting the page components every chapter reimplements (cast strip, checks, term card, asides, loop lens table builder) to the pool (Ch 5 R11).
- **Pool after Ch 6:** `renderCluster` gained four optional fields in Ch 6's run (pool-03: `record.deployment`, status `notready`, `PODS[id].series`, `STATUS_INLINE`; documented in `explainers/_pool/README.md` and on the pool test page); each is off when absent, and Ch 1–5 were re-gated on it. Follow-up from Ch 6's review (P-08, part 4): at 360px, chips with an inline status drop the service name (`v63 READY`, not `catalog v63`); fixing it needs a pool change. Ch 6 also collapses locked post-check content to a plate (its `page.css` / `page.js`); a candidate for the pooled check component.
- **Pool after Ch 7:** pool-04 added `record.service` (the Service block: header, `READY PODS` list, `NONE`, struck leaving entries, lane-wide reserved height, highlight keys `svc:<name>`, `svc:<name>:list`, `svc:<name>:<podId>`) and `PODS[id].addr`, documented in `explainers/_pool/README.md` and on the pool test page. It also resolved Ch 6's P-08 chip-label follow-up: one-line chips under `STATUS_INLINE` keep the service name, dropping the lamp, then the version, as width requires. Ch 4 and Ch 5 re-gated unchanged; Ch 6's chip labels changed at 360px and in Fig. 03's narrow crash panels at every width (user decision, Ch 7 d-10).
