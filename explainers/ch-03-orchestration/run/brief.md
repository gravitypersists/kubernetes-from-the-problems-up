# Brief: Many containers, many machines: the orchestration problem (Ch 3, Kubernetes for Technical Managers)

<!-- Written by the orchestrator. Root spec for the run: every handoff points here.
     Keep the field names exactly; scripts parse `key: value` lines. -->

## Original request

> Let's start ch 3 now, notes from the last run "
> Ch 3 is next. Its entry already has the retrieval opener, the instruction to place Docker, and the note to reuse Ch 2's container drawings for its placement widget."

Standing guidance from the user's original course request (Ch 1 run), which applies to every chapter:

> This will be the first time I'm running this skill not as a standalone, but as a chapter in a bigger course. Weigh this when producing widgets (widgets can be used across chapters. If a widget might be useful in a future chapter, this might justify building it, but use discretion, because an analysis on that chapter might veto that widget for pedagogical reasons). Feel free to recommend changes to curriculum at the checkpoint.

## Course context (read before planning or building)

- Course bible: `/Users/m/workspace/k8s-course/CURRICULUM.md`. This chapter's entry is §7 "Ch 3: Many containers, many machines: the orchestration problem". Principles §2, Fennel §3 (including **Established story facts** from Ch 1 and Ch 2), the term ledger §5 (including the **Visuals** column Ch 1 and Ch 2 filled in), the misconception catalog §6, and the course-wide widget height rule in §8 step 5 all apply. Use §6 catalog IDs for misconceptions; new ones get `local-NN` IDs.
- Chapter entry, copied: Fennel moment: Year 2. Fennel has split into `storefront`, `orders`, `payments` and `dispatch`, running across about 8 machines. A spreadsheet says what runs where. Sam gets paged at 3 a.m. when a machine dies and moves containers by hand. Morgan notices half the machines are mostly idle. What the manager sees: on-call burnout; idle spend; deploys coordinated in a group chat; a spreadsheet as the source of truth. Pain in the page (key widget): the reader places a dozen containers of different sizes onto 4 machines by hand. Then a machine fails and they re-place its containers. Then a new version has to roll out without downtime. Afterwards they list the jobs they just did: placement, restarting, replacing, connecting, updating, scaling. Ideas: the work that remains once you have containers is coordination at scale; an orchestrator automates that list of jobs; Kubernetes is named here as one orchestrator, briefly placed in history (it came out of Google's experience with its internal Borg system and is now a community project). Misconceptions: m-02. Retrieval from: Ch 2 (what containers don't solve); suggested opener: Ch 2's "the machine running the containers dies at 3 a.m.; what happens?" (m-23). Docker: Ch 2 says once "you'll hear the name Docker; the next chapter places it", so this chapter must place Docker alongside m-02. Widget reuse: the placement widget should reuse Ch 2's f-01 container chip and machine frame, adding chip size, rather than adapt `w-rebuild` or `w-samecode`. The conversation: "We should move to Kubernetes." The question to ask: "Which of these jobs is hurting us most today, and is that worth the cost of the platform?" (Ch 14 gives the full answer.)
- **Principle §2.2 applies directly:** Kubernetes arrives late and on purpose. This chapter names it only after the reader has built up the list of jobs it does.
- **The previous chapters, as built:**
  - Ch 2 (most relevant): `/Users/m/workspace/k8s-course/explainers/ch-02-containers/` — the site (`site/index.html`, `site/assets/page.css` with the reusable `.cp-machine` / `.cp-img` / `.cp-ctr` chips, `site/assets/page.js` with `CH02_REGISTRY` / `CH02_MACHINES` for f-01, `site/widgets/w-samecode/`), its plan (`run/plan/learning-plan.md`, including `## Visual grammar` and `## Curriculum recommendations`) and research (`run/research/facts.md`, `parking-lot.md`).
  - Ch 1: `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/` (site, `w-rebuild`, plan, facts).
  - Earlier facts may be cited; re-verify any you rely on heavily. Ch 1–2 terms are usable freely: server / machine, process, deploy, dependency, snowflake server, drift, runbook, single point of failure, virtual machine, container, image, registry, immutability, kernel.
- **Cross-chapter widgets (user's guidance):** reuse can justify building or adapting a widget, but this chapter's pedagogy comes first, and this chapter's analysis may veto reuse. Reuse in this run means copying into this run's `site/` and adapting; never edit Ch 1's or Ch 2's files. Record per widget the reuse decision and candidate later chapters. The placement widget is a strong candidate for reuse: Ch 4 (self-healing: the reader watched themselves do the replacing), Ch 5 (scheduling, requests, bin packing, pending), Ch 6 (rolling update) and Ch 8 (scaling). Design its data model so later chapters can drive it (e.g. an automated mode, sizes as requests) without this chapter teaching those ideas.
- **Lessons from earlier runs (for planning):**
  - Ch 1 was planned at 12 minutes and built at about 17, mostly because of a four-stage widget (~5 min) and long "couldn't we just…" prose. Ch 2 was planned at 14 and relabelled to 16. This chapter's key widget has three phases plus a debrief; size it honestly in the minutes table and give a cut order (e.g. which phase can shrink or become a figure).
  - Checks with the correct answer as the only measured, hedged option between two extremes can be gamed ("pick the middle"); write distractors that are equally measured.
  - Widget heights far beyond the plan's reservation were a problem at 360px. Follow the §8 step 5 height rule (≥600px reserve the tallest state; <600px each state takes its own height and scrolls its header into view on change). A drag-and-drop placement task must also work on a phone and by keyboard: plan a tap-to-select / tap-to-place (or equivalent) interaction, not drag alone.
  - The user's human review of Ch 1 flagged a "think, then show the answer" prompt that was confusing because its question had appeared earlier as a multiple-choice option. Every think-then-reveal prompt must state its own question plainly.
  - The same review worried that readers sense where the course is heading; this chapter is where the course's own subject arrives, so make that payoff land.
  - Ch 2's accuracy review flagged: version labels (tags) can be moved, so don't imply a label like `v43` can never change; images usually include basic OS files, just not a kernel; "re-creating a container takes seconds" ignores downloading the image onto a new machine. Don't repeat these in this chapter.
- **Curriculum feedback:** agents must not edit CURRICULUM.md; the designer lists recommendations in `## Curriculum recommendations` in the plan.
- Style: the Control Plane style guide in `/Users/m/workspace/k8s-course/design/control-plane/` (see design_tokens below and CURRICULUM.md §8 step 4). Ch 1 and Ch 2 are the reference implementations of that style for this course.

## Audience

audience: a somewhat technical manager. They know what code, servers, deploys, outages and cloud bills are, but have never operated infrastructure. Their organization doesn't run Kubernetes yet. Goal of the course: hold a real discussion with senior engineers about Kubernetes.
readiness: novice
readiness_notes: novice for infrastructure, intermediate for general software. From Ch 1 they know: an app is a process on a machine; the code isn't the whole app; hand-built snowflake servers drift and are hard to rebuild; VMs give more machines but copy the snowflake. From Ch 2 they know: an image packages the app with its dependencies, is versioned and kept in a registry; a container is a running instance of an image; containers share the machine's kernel, so many fit on one machine; when the machine dies its containers die too, until something re-creates them elsewhere (m-23). New here: the coordination jobs at scale, orchestration, orchestrator, Kubernetes by name, cluster, and where Docker fits.

## Scope

time_budget_minutes: 17  <!-- was 15; relabelled by user at d-14 (no cuts) -->
context: part of a course: "Kubernetes for Technical Managers" (chapter 3 of 15; Part I "Before Kubernetes", its last chapter)
prerequisites: Ch 1 ("One app, one server") and Ch 2 ("'Works on my machine': containers"): server / machine, process, deploy, dependency, snowflake server, drift, runbook, single point of failure, virtual machine, container, image, registry, immutability, kernel.
out_of_scope: how Kubernetes works (Ch 4: node, pod, desired state, declarative vs. imperative, reconcile loop, controller, control plane, API server, manifest, self-healing); scheduling mechanics, requests/limits, bin packing as a term (Ch 5); rolling updates and probes as Kubernetes features (Ch 6); Services, DNS, load balancers (Ch 7); autoscaling (Ch 8); alternatives compared in depth (Ch 14); course-wide exclusions (kubectl, YAML writing, installing clusters, certification material, deep networking/security internals). Terms this chapter may introduce: orchestration, orchestrator, Kubernetes (by name), cluster. Later ledger terms may not be used except as "we'll name this later". The jobs (placement, restarting, replacing, connecting, updating, scaling) are named in plain words, not with Kubernetes vocabulary.

## Settings

research_depth: light
intended_use: unknown
design_tokens: /Users/m/workspace/k8s-course/design/control-plane/ (Control Plane course style guide; supplied by the user). Copy control-plane.css to site/assets/tokens.css in place of the kit's default tokens; follow README.md, tokens.json usage notes, and components/ (bundle.css) treatments.
mobile: supported
language: en
deployment: none

## Objectives

- o-1: after reading, the reader can list the coordination jobs that appear once many containers run on many machines (placing, restarting, replacing after a machine dies, connecting, updating without downtime, scaling), having made the key decisions themselves (d-07; was "having done several of them by hand").
- o-2: after reading, the reader can explain how each job shows up as a business symptom a manager sees (3 a.m. pages and on-call burnout, idle spend, risky deploys coordinated in a group chat, a spreadsheet as the source of truth that drifts from reality).
- o-3: after reading, the reader can explain what an orchestrator is (software that does those jobs continuously, across a group of machines treated as one: a cluster), name Kubernetes as one, place it briefly in history, and say how Docker relates to it (not the same thing, not competitors in the usual sense) (m-02).

## Research questions

- q-1 (o-1): What are the coordination jobs that operations teams actually had to do by hand (or with scripts) when running containers on several machines without an orchestrator, and which of them does the widget's list (placement, restarting, replacing, connecting, updating, scaling) miss or misname for a manager?
- q-2 (o-1): How does placing containers of different sizes onto machines by hand go wrong in practice (fragmentation, a container that fits nowhere though total capacity is free, overloading one machine), stated accurately without introducing Ch 5's scheduler vocabulary?
- q-3 (o-2): What sourced evidence exists for the business symptoms: typical server/VM utilization before orchestration (idle spend), on-call load from manual recovery, deploy coordination pain? Sourced, hedged ranges, not folklore.
- q-4 (o-2): What goes wrong when a spreadsheet or wiki is the record of "what runs where" (it drifts from reality, like Ch 1's runbook), and how does that connect to the idea of a single source of truth that Ch 4 will build on (without teaching desired state)?
- q-5 (o-3): What is an accurate, manager-level definition of an orchestrator and of a cluster? What else counted as one (e.g. Docker Swarm, Nomad, Mesos, cloud container services), named only briefly?
- q-6 (o-3): Kubernetes's history, accurately and briefly: its relation to Google's Borg (and Omega), when it was open-sourced, its donation to the CNCF, who maintains it now. Which common retellings overstate (e.g. "Kubernetes is Borg open-sourced")?
- q-7 (o-3): What does "Docker" refer to (the company, the tool, the image format), how does it relate to Kubernetes today (Kubernetes runs images built with Docker; container runtimes such as containerd; the dockershim removal), and what do managers commonly believe (m-02: same thing, or competitors)? What level of detail is right for this audience?
