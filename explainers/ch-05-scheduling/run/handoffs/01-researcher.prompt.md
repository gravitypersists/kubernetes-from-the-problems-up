# Handoff 01 → researcher (standard-research)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/researcher.md`. This file is your task.

## Original request (verbatim)

> let's apply the R1-R12 now and start chapter 5 now

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Standard-depth research for Chapter 5 ("Who runs where: scheduling, resources and cost") of the course "Desired state: Kubernetes from the problems up". Answer research questions q-1 to q-7 in the brief, which serve objectives o-1 to o-3. Verify the claims the chapter will rely on:
- how the default scheduler chooses a node (filter, then score) and that it places by requests, not actual usage;
- allocatable vs. capacity;
- whether spreading copies is default behaviour, and one accurate sentence on affinity/taints;
- how requests drive cost in standard modes vs. per-Pod-billed modes (verify which modes exist and whether they bill by request or usage);
- requests vs. limits for memory and processor: OOM-kill, throttling, unset defaults, node-pressure eviction and which Pods go first;
- what "pending" means, how its reason surfaces, and whether the scheduler retries;
- how an OOM-kill shows up, and leak vs. growth at a manager's level;
- what a node pool is.

Collect the misconceptions a non-infrastructure manager holds about these ideas, especially catalog m-07, m-08 and m-26 (CURRICULUM.md §6), and why a bill often goes up after a move to Kubernetes. Use §6 catalog IDs where they apply and `local-NN` for new ones. Prefer primary sources: kubernetes.io docs and the EKS, GKE and AKS docs. For any utilization or cost survey figure, cite who measured it, when, and how; it will be presented as one survey's figure. Defaults must cite the setting or doc that states them.

Stay converged on what a 20-minute chapter for managers needs. Anything interesting but out of scope goes to the parking lot, tagged with the later chapter it belongs to (Ch 6–14 entries in CURRICULUM.md; note especially Ch 8 autoscaling and Ch 11 quotas, which this chapter must not pre-empt).

Ch 1–4 already researched containers, orchestration, the reconcile loop, node failure timings, crash-loop back-off and managed-provider responsibilities. Ch 4's `facts.md` and `parking-lot.md` (scheduler factors, `tolerationSeconds`, node auto-repair, per-mode responsibilities) are the most relevant. Reuse their claims by reference rather than re-researching them; they count toward your caps only if you copy them in.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- `/Users/m/workspace/k8s-course/CURRICULUM.md`:
  - §1, §2, §3 (Fennel is fiction and needs no sourcing), §5, §6, and the §7 Ch 5 entry;
  - the Ch 6–14 entries show what must NOT be pre-empted.
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/` (Ch 4 research: `facts.md`, `parking-lot.md`, `misconceptions.md`)
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/` (Ch 3 research, including m-26's example x-01: 100 GB free in 10 GB pieces can't take a 20 GB job)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/research/`: the files `researcher.md` specifies.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed. (intended_use is unknown.)
- I8: Each agent writes only in its namespace. Yours is `run/research/`.

## User decisions that apply (quoted from run/decisions.md)

- d-01: "~20 min (Recommended)" → size the research to a 20-minute chapter with 3 objectives.
- d-02: "Standard, cap 120 min (Recommended)" → research depth is standard (the chapter entry suggested light). The extra depth is for per-mode billing, the OOM-kill/throttling/eviction defaults and the pending mechanics, which Ch 8 and Ch 11 will build on.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every research question q-1 to q-7 is answered, or marked unanswerable with a reason.
- [ ] Every factual claim the chapter may rely on is in `facts.md` with a source.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_research.py /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run` passes.

## Not your job

- Writing chapter prose, the plan, widget designs or the mockup.
- Researching Ch 6–14 topics in depth (autoscaling, quotas, rollouts, Services, storage, observability tooling, pricing specifics). Research only enough to avoid stating anything those chapters would contradict.
- kubectl usage, or YAML beyond what a `resources: requests / limits` illustration needs.
- Editing CURRICULUM.md, earlier chapters' files, or anything outside `run/research/`.
