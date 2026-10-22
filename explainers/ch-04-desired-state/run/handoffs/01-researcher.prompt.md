# Handoff 01 → researcher (standard-research)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/researcher.md`. This file is your task.

## Original request (verbatim)

> now we're going to do chapter 4.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Standard-depth research for Chapter 4 ("Say what you want, not what to do: desired state and the reconcile loop") of "Kubernetes for Technical Managers", the course's central chapter. Answer research questions q-1 to q-10 in the brief, which serve objectives o-1 to o-4. Verify the claims the chapter will rely on: what applying a manifest actually does; declarative vs. imperative as the Kubernetes docs describe it; how controllers work and that there is no single master brain; which loops act when a node dies, in what order, and sourced, hedged default timings (so "minutes, and nobody wakes up" is accurate, never "instant"); what the loop does not fix (crash-looping apps and back-off, no room left, lost data); what a pod is and what replacement changes; what disposability requires of an app; the control-plane and node components a manager needs by name; what managed providers (EKS, GKE, AKS, treated generically) run vs. what the customer owns; and the sourced etymology of "Kubernetes" and "K8s".

Collect the misconceptions a non-infrastructure manager holds about these ideas, especially catalog m-03, m-04, m-05, m-06 and m-27 (CURRICULUM.md §6). Use §6 catalog IDs where they apply and `local-NN` for new ones. Prefer primary sources (kubernetes.io docs, the provider docs, the Kubernetes design proposals, the Borg/Omega/Kubernetes paper); timings must cite the setting and its default. Stay converged on what a 20-minute chapter for managers needs; anything interesting but out of scope goes to the parking lot, tagged with the later chapter it belongs to (Ch 5–14 entries in CURRICULUM.md).

Ch 1–3 already researched snowflake servers, containers, images, registries, orchestration, Borg history and Docker. Reuse their claims by reference where they apply rather than re-researching them; they count toward your caps only if you copy them in.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/brief.md`
- `/Users/m/workspace/k8s-course/CURRICULUM.md`: §1, §2, §3 (Fennel is fiction and needs no sourcing), §5, §6, §7 Ch 4 entry. The Ch 5–14 entries show what must NOT be pre-empted.
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/` (Ch 3 research, including `parking-lot.md`, which lists "K8s" and "helmsman" as unsourced)
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/` and `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/` (earlier research, by reference)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/`: the files `researcher.md` specifies.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed. (intended_use is unknown.)
- I8: Each agent writes only in its namespace. Yours is `run/research/`.

## User decisions that apply (quoted from run/decisions.md)

- d-01: "One chapter, ~20 min (Recommended)" → size the research to a 20-minute chapter with 4 objectives.
- d-02: "Standard, cap 120 min" → research depth is standard (the chapter entry suggested light); the extra depth is for the control-plane, node-failure timing and managed-provider claims, which recur all through Part II.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every research question q-1 to q-10 is answered, or marked unanswerable with a reason.
- [ ] Every factual claim the chapter may rely on is in `facts.md` with a source.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_research.py /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run` passes.

## Not your job

- Writing chapter prose, the plan, widget designs or the mockup.
- Researching Ch 5–14 topics in depth (scheduling mechanics, rollouts, Services, autoscaling, secrets, storage, multi-tenancy, observability tooling, operators, upgrade cadence, pricing). Research only enough to avoid stating anything those chapters would contradict.
- kubectl usage or YAML beyond what a `replicas: 3` illustration needs.
- Editing CURRICULUM.md, earlier chapters' files, or anything outside `run/research/`.
