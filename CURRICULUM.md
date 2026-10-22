# Kubernetes for Technical Managers: Curriculum

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
3. **One model, named once, reused everywhere.** Chapter 4 introduces the reconcile loop. From then on, every chapter has a _loop lens_: which loop, watching what, doing what. This is the thread that lets the reader reason past what the course covers.
4. **Conceptual, with YAML only as illustration.** A short manifest snippet may appear when it makes the model concrete (`replicas: 3` _is_ desired state). The reader is never asked to write or memorize YAML. Where a detail is engineer territory, say so plainly: "your engineers will tune this; what you need to know is…"
5. **Managed Kubernetes is the default** (EKS, GKE, AKS, treated generically). The provider runs the control plane. Self-hosting is mentioned only to explain what managed spares you.
6. **Introduce a term after the reader has met the thing it names.** Use the term ledger (§5) to avoid re-defining terms, and to avoid using one before its chapter.
7. **Every chapter ends with "the conversation."** A realistic thing an engineer might say, and the questions a well-informed manager would ask in response. These become `apply`-type comprehension items, and they rehearse CO-4 throughout the course.
8. **Every chapter opens with retrieval.** One or two quick questions on earlier chapters, preferably ones that need the loop lens. Later chapters mix in items from several earlier chapters. Ch 1 has no retrieval opener; a pre-question may take its place.
9. **Confront misconceptions from the catalog (§6).** Each chapter owns the misconceptions assigned to it. State each one fairly, show a case where it predicts wrongly, then give the correct model.
10. **Sizing.** There is no fixed time budget. Each chapter is sized in ideas, aiming for 3–5 objectives. Set `time_budget_minutes` at intake for each run, based on the chapter's objectives. If a chapter plans out too big, split it rather than compress it. Designers give an honest minutes table per part (including widget time) in the plan's `## Shape`, so overruns show at the checkpoint.
11. **Friendly to readers who jump ahead.** From Ch 2 on, every chapter opens with a one-line cast strip of the characters it uses and a collapsed "I didn't read the last chapter. What happened?" disclosure, before the retrieval check. (User's Ch 2 review.)

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
- `catalog`: product listings and prices.
- `notifications`: texts and emails. Can lag without disaster.
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
| node, pod, desired state, declarative vs. imperative, reconcile loop / controller, control plane, API server, manifest | 4       |                                           |
| replica set (lightly), self-healing                                                                                    | 4       |                                           |
| scheduler, requests, limits, bin packing, node pool, pending, eviction, OOM-killed                                     | 5       |                                           |
| Deployment, rolling update, rollback, readiness probe, liveness probe                                                  | 6       |                                           |
| Service, DNS name, load balancer, ingress / gateway                                                                    | 7       |                                           |
| horizontal pod autoscaler (HPA), cluster autoscaler                                                                    | 8       |                                           |
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

---

## 7. Chapters

Each entry is a draft brief. At intake, the didactician orchestrator should copy its fields into `brief.md`: `context: part of a course: "Kubernetes for Technical Managers"`, with prerequisites and out-of-scope taken from the entry, and `time_budget_minutes` set for that run.

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
- **Loop lens (introduced):** "Which loop, watching what, doing what?"
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
- **Ideas:** the scheduler as a loop that places pods on nodes; requests (reservations) vs. limits (caps); bin packing and utilization; node pools (different machine types); pending pods; OOM-kill and eviction; how reservations drive cost.
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
- **Prerequisites:** the whole course.
- **Research depth:** none (it reuses facts verified in earlier chapters; cite them).

---

## 8. Running a chapter through didactician

1. Start a run: `/didactician` with a pointer to this file and the chapter number. Suggested output folder: `explainers/ch-NN-<slug>/`.
2. At intake, the orchestrator fills `brief.md` from the chapter entry:
   - `audience` and `readiness` from §1 (readiness: novice for Kubernetes, intermediate for general software);
   - `context: part of a course: "Kubernetes for Technical Managers"`;
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
6. **Widget height rule (course-wide, user decision in Ch 2's run, d-08).** On screens 600px and wider, a multi-state widget reserves the height of its tallest state, so moving between states never moves the page. Below 600px it does not: each state takes its own height, and on a state change the widget scrolls the new state's header to the top of the viewport. Plans still estimate phone heights honestly. Ch 1's `w-rebuild` predates this rule and still reserves its tallest state on phones; bring it in line in a later pass.
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

---

## 9. Open decisions

- **Capstone format:** Ch 15 may be big enough to split into two runs, or to build as a single full-page interactive.
- **Chapter splits:** Ch 4 and Ch 14 are the most likely to run long at the planning stage. Split them rather than compress them.
