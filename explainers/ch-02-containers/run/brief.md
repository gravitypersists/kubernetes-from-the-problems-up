# Brief: "Works on my machine": containers (Ch 2, Kubernetes for Technical Managers)

<!-- Written by the orchestrator. Root spec for the run: every handoff points here.
     Keep the field names exactly; scripts parse `key: value` lines. -->

## Original request

> okay, commit it, clear context of everything you don't need for ch 2 and proceed with building chapter 2 with the didactician skill

Standing guidance from the user's original course request (Ch 1 run), which applies to every chapter:

> This will be the first time I'm running this skill not as a standalone, but as a chapter in a bigger course. Weigh this when producing widgets (widgets can be used across chapters. If a widget might be useful in a future chapter, this might justify building it, but use discretion, because an analysis on that chapter might veto that widget for pedagogical reasons). Feel free to recommend changes to curriculum at the checkpoint.

## Course context (read before planning or building)

- Course bible: `/Users/m/workspace/k8s-course/CURRICULUM.md`. This chapter's entry is §7 "Ch 2: 'Works on my machine': containers". Principles §2, Fennel §3 (including **Established story facts** from Ch 1), the term ledger §5 (including the **Visuals** column Ch 1 filled in) and the misconception catalog §6 all apply. Use §6 catalog IDs for misconceptions; new ones get `local-NN` IDs.
- Chapter entry, copied: Fennel moment: Year 1. Six engineers. Onboarding takes a week. A bug happens in production that nobody can reproduce on their laptop. Staging and production have quietly drifted apart. What the manager sees: slow onboarding; "can't reproduce" bugs; releases that fail only in production. Pain in the page: contrasting cases. The same code on two machines with one dependency version different: predict the outcome, then reveal it. Ideas: an image packages the app with its dependencies; a container is a running instance of an image; images are immutable and versioned, and stored in a registry; build once, run anywhere; containers vs. VMs (shared kernel, lighter, start in seconds). Misconceptions: m-01; revisits m-19 with the fix. Retrieval from: Ch 1 (snowflake servers); suggested opener: why did photo uploads fail on the rebuilt server? Reuse candidate: Ch 1's `w-rebuild` stage-4 two-machine comparison could carry the "same code, one dependency version different" case, if this chapter's analysis agrees. The conversation: "Let's containerize everything." The question to ask: "Great for consistency. What happens when the machine running those containers dies?"
- **The previous chapter, as built:** `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/` — the site (`site/index.html`, `site/widgets/w-rebuild/`), its plan (`run/plan/learning-plan.md`, including `## Visual grammar`) and research (`run/research/facts.md`). Ch 1's facts may be cited; re-verify any you rely on heavily. Ch 1 terms are now usable freely: server / machine, process, deploy, dependency, snowflake server, (configuration) drift, runbook, single point of failure, virtual machine.
- **Cross-chapter widgets (user's guidance):** reuse can justify building or adapting a widget, but this chapter's pedagogy comes first, and this chapter's analysis may veto reuse. `w-rebuild` keeps its content in `data.js` and depends on Ch 1's check classes in `site/assets/page.css`. Reuse in this run means copying into this run's `site/` and adapting; never edit Ch 1's files. Record per widget the reuse decision and candidate later chapters (e.g. Ch 3's placement widget needs a machine that holds several containers).
- **Lessons from Ch 1's run (for planning):** Ch 1 was planned at 12 minutes and built at about 17, mostly because of a four-stage widget (~5 min) and long "couldn't we just…" prose. Size this chapter's plan honestly to 14 minutes, with a cut order. Reviewers also found that checks with the correct answer as the only measured, hedged option between two extremes can be gamed ("pick the middle"); write distractors that are equally measured. Widget heights far beyond the plan's reservation were a problem at 360px.
- **Curriculum feedback:** agents must not edit CURRICULUM.md; the designer lists recommendations in `## Curriculum recommendations` in the plan.
- Style: the Control Plane style guide in `/Users/m/workspace/k8s-course/design/control-plane/` (see design_tokens below and CURRICULUM.md §8 step 4). Ch 1 is the reference implementation of that style for this course.

## Audience

audience: a somewhat technical manager. They know what code, servers, deploys, outages and cloud bills are, but have never operated infrastructure. Their organization doesn't run Kubernetes yet. Goal of the course: hold a real discussion with senior engineers about Kubernetes.
readiness: novice
readiness_notes: novice for infrastructure, intermediate for general software. From Ch 1 they know: an app is a process on a machine; the code isn't the whole app (runtime, libraries, config, data live on the machine); hand-built snowflake servers drift and are hard to rebuild; a VM gives more machines but a snapshot copies the snowflake. New here: images, containers, registries, immutability, containers vs. VMs.

## Scope

time_budget_minutes: 16  <!-- was 14; relabelled by user at d-09 (no cuts) -->
context: part of a course: "Kubernetes for Technical Managers" (chapter 2 of 15; Part I "Before Kubernetes")
prerequisites: Ch 1 ("One app, one server"): server / machine, process, deploy, dependency, snowflake server, drift, runbook, single point of failure, virtual machine.
out_of_scope: Dockerfile syntax; container internals (namespaces/cgroups) beyond a single sentence; orchestration, and Kubernetes by name (Ch 3; Chapters 1–2 contain no Kubernetes); course-wide exclusions (kubectl, YAML writing, installing clusters, certification material, deep networking/security internals). Terms this chapter may introduce: container, image, registry, immutability. Later ledger terms (orchestration, orchestrator, Kubernetes, cluster, node, pod, …) may not be used except as "we'll name this later". Config/secrets practice belongs to Ch 9; data/state to Ch 10.

## Settings

research_depth: light
intended_use: unknown
design_tokens: /Users/m/workspace/k8s-course/design/control-plane/ (Control Plane course style guide; supplied by the user). Copy control-plane.css to site/assets/tokens.css in place of the kit's default tokens; follow README.md, tokens.json usage notes, and components/ (bundle.css) treatments.
mobile: supported
language: en
deployment: none

## Objectives

- o-1: after reading, the reader can explain how packaging the app with its dependencies removes the "works on my machine" class of problem (and connect it back to Ch 1's rebuild).
- o-2: after reading, the reader can distinguish an image (the packaged, immutable, versioned artifact kept in a registry) from a running container.
- o-3: after reading, the reader can contrast containers with VMs well enough to see why many containers fit on one machine, and what isolation that costs.
- o-4: after reading, the reader can identify which problems containers don't solve, starting with what happens when the machine running them dies.

## Research questions

- q-1 (o-1): What exactly does a container image contain (app code, runtime, libraries, OS-level packages) and what does it deliberately not contain (config and secrets supplied at runtime, persistent data)? Stated accurately for a manager.
- q-2 (o-1): What are well-documented, plausible examples of "works on my machine" bugs caused by a dependency version difference between environments, and what do managers typically believe causes them?
- q-3 (o-2): How do image immutability, tags/versions and registries work at a level a manager needs (including that a tag like "latest" can move, while a digest can't)? What does "build once, run anywhere" really guarantee, and where does it break (e.g. CPU architecture, kernel features, external services, config)?
- q-4 (o-2): What do novices commonly confuse about image vs. container (and container vs. "Docker")? Which analogies are accurate enough, and where does each break?
- q-5 (o-3): What is accurate to say about containers sharing the host kernel vs. VMs each running their own OS: start-up time, size, density on one machine? Use sourced, hedged numbers or ranges, not folklore.
- q-6 (o-3): What isolation do containers give up compared with VMs, stated without overclaiming (m-01: "a container is just a small VM")? Why do cloud providers often run containers inside VMs anyway?
- q-7 (o-4): What problems remain after containerizing: the machine dying, data on the machine, restarting crashed containers, placing containers across machines, upgrades? (Only enough to motivate Ch 3; don't teach orchestration.)
