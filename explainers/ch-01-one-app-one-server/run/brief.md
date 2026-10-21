# Brief: One app, one server (Ch 1, Kubernetes for Technical Managers)

<!-- Written by the orchestrator. Root spec for the run: every handoff points here.
     Keep the field names exactly; scripts parse `key: value` lines. -->

## Original request

> we're going to start a run to create Ch 1 from CURRICULUM.md. Go ahead and get it started. This will be the first time I'm running this skill not as a standalone, but as a chapter in a bigger course. Weigh this when producing widgets (widgets can be used across chapters. If a widget might be useful in a future chapter, this might justify building it, but use discretion, because an analysis on that chapter might veto that widget for pedagogical reasons). Feel free to recommend changes to curriculum at the checkpoint.

## Course context (read before planning or building)

- Course bible: `/Users/m/workspace/k8s-course/CURRICULUM.md`. This chapter's entry is §7 "Ch 1: One app, one server". Principles §2, the running company Fennel §3, the term ledger §5 and the misconception catalog §6 all apply.
- Chapter entry, copied: Fennel moment: Year 0. Sam built Fennel's server by hand. One Friday it runs out of disk during the dinner rush and the site is down for two hours. What the manager sees: an outage tied to a single machine; only Sam knows how the server works; "don't touch it." Pain in the page: the reader lists everything installed on Sam's server, then tries to rebuild it on a new machine from the notes and finds the gaps. Ideas: an app is a process running on a machine; deploying means getting new code onto that machine; dependencies (the runtime, libraries, config) are part of what makes the app work; hand-built "snowflake" servers are fragile and hard to reproduce; VMs give you more machines but don't remove the snowflake problem. Misconceptions: none owned; plant the seed of "the code is the app," which Ch 2 corrects. The conversation: Sam says, "We should keep a runbook for the server." The question to ask: "If this box vanished tonight, how long until we're back, and who has to be awake?"
- **Cross-chapter widgets (user's guidance):** widgets may be reused in later chapters. A widget's likely usefulness in a future chapter can justify building it, but use discretion: a later chapter's own analysis may veto it for pedagogical reasons. Don't build for reuse at the expense of this chapter. If a widget is designed with reuse in mind, say which chapters and what would be parameterised, and keep that out of the reader's view.
- **Curriculum feedback:** the user invites recommended changes to `CURRICULUM.md`. Agents must not edit it; the designer may list recommendations in the plan (a `## Curriculum recommendations` section), which the orchestrator raises at the checkpoint.
- Style: the Control Plane style guide in `/Users/m/workspace/k8s-course/design/control-plane/` (see design_tokens below and CURRICULUM.md §8 step 4).

## Audience

audience: a somewhat technical manager. They know what code, servers, deploys, outages and cloud bills are, but have never operated infrastructure. Their organization doesn't run Kubernetes yet. Goal of the course: hold a real discussion with senior engineers about Kubernetes.
readiness: novice
readiness_notes: novice for infrastructure/Kubernetes, intermediate for general software. They know code gets "deployed" and servers "go down", but not what lives on a server besides the code. New: the app as a process on a machine, dependencies/runtime/config as part of the app, snowflake servers, VMs (briefly).

## Scope

time_budget_minutes: 17  <!-- was 12; raised by user at d-07 (keep all content) -->
context: part of a course: "Kubernetes for Technical Managers" (chapter 1 of 15; Part I "Before Kubernetes")
prerequisites: none beyond the audience. This is the first chapter; no terms from the ledger are assumed.
out_of_scope: containers, images, registries (Ch 2); orchestration and Kubernetes by name (Ch 3; Chapters 1–2 contain no Kubernetes); operating systems in any depth; course-wide exclusions (kubectl, YAML writing, installing clusters, certification material, deep networking/security internals). Terms this chapter may introduce: server / machine, process, deploy, dependency, "snowflake" server, virtual machine (VM, briefly). No other ledger term may be used except as "we'll name this later."

## Settings

research_depth: light
intended_use: unknown
design_tokens: /Users/m/workspace/k8s-course/design/control-plane/ (Control Plane course style guide; supplied by the user). Copy control-plane.css to site/assets/tokens.css in place of the kit's default tokens; follow README.md, tokens.json usage notes, and components/ (bundle.css) treatments.
mobile: supported
language: en
deployment: none

## Objectives

- o-1: after reading, the reader can explain why an app's behavior depends on the machine it runs on (runtime, libraries, config, disk), not just its code.
- o-2: after reading, the reader can predict what happens to the business when a single hand-built server fails, and ask the question that exposes the risk: "If this box vanished tonight, how long until we're back, and who has to be awake?"
- o-3: after reading, the reader can explain why "just get a bigger server" or "add VMs" doesn't fix reproducibility.

## Research questions

- q-1 (o-1): Besides the application code, what concretely has to be present on a typical web-app server for the app to run (runtime, libraries, OS packages, config files, environment variables, secrets, cron jobs, disk layout), and which of these are most often forgotten when rebuilding?
- q-2 (o-1): What do non-infrastructure managers typically get wrong about "the app" — e.g. believing the code in the repo is the whole app — and what concrete, plausible examples show behavior changing with the machine while the code stays the same?
- q-3 (o-2): How does a full disk actually take a web app down (logs, uploads, database writes, temp files), and how plausible is a two-hour outage for a one-server startup? What is the usual recovery path?
- q-4 (o-2): What are "snowflake servers" and "configuration drift" (origin of the term, accepted definitions), and what is the usual business framing of single-machine / single-person risk (bus factor, recovery time objective) in plain terms?
- q-5 (o-3): What does a virtual machine give you (more machines from one physical host, quick provisioning, snapshots/images) and why does it not, by itself, remove hand-configuration and drift? Where do VM snapshots/golden images partially help, so we don't overstate the claim?
- q-6 (o-3): Why doesn't vertical scaling ("a bigger server") address reproducibility or the single point of failure? What are its real limits, stated accurately?
- q-7 (o-2): Why are runbooks/written notes useful but insufficient for reliable rebuilds (they drift from reality, omit implicit steps)? Any credible sources on manual-rebuild failure modes?
