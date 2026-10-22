# Handoff 01 → researcher (light-research)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/researcher.md`. This file is your task.

## Original request (verbatim)

> Let's start ch 3 now, notes from the last run "
> Ch 3 is next. Its entry already has the retrieval opener, the instruction to place Docker, and the note to reuse Ch 2's container drawings for its placement widget."

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Light-depth research for Chapter 3 ("Many containers, many machines: the orchestration problem") of "Kubernetes for Technical Managers". Answer research questions q-1 to q-7 in the brief, which serve objectives o-1 to o-3. Verify the claims the chapter will rely on: the coordination jobs that appear when many containers run on many machines; how hand placement goes wrong; sourced, hedged evidence for the business symptoms (idle utilization, on-call load, deploy coordination); what an orchestrator and a cluster are; Kubernetes's history (Borg, Omega, open-sourcing, CNCF) stated without the common overstatements; and what "Docker" refers to and how it relates to Kubernetes today (m-02). Collect the misconceptions a non-infrastructure manager holds, especially catalog m-02 ("Docker and Kubernetes are the same thing, or competitors"). Use §6 catalog IDs where they apply and `local-NN` for new ones. Stay converged on what a 15-minute chapter for managers needs. Numbers must be sourced and hedged; no folklore figures.

Ch 1 and Ch 2 already researched snowflake servers, drift, runbooks, VMs, images, containers, registries, and what containers don't solve. Reuse their claims by reference where they apply rather than re-researching them; they count toward your caps only if you copy them in.

Watch the boundary with Ch 4–8: this chapter names the jobs in plain words and says an orchestrator automates them. It does not explain how Kubernetes works (desired state, reconcile loops, pods, scheduler, probes, Services). Research only enough about those to avoid stating anything Ch 4–8 would contradict.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/brief.md`
- `/Users/m/workspace/k8s-course/CURRICULUM.md`: §1, §3 (Fennel is fiction and needs no sourcing), §5, §6, §7 Ch 3 entry. The Ch 4–8 and Ch 14 entries show what must NOT be pre-empted.
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/` (Ch 1 research)
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/` (Ch 2 research, including `parking-lot.md`)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/`: the files `researcher.md` specifies.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed. (intended_use is unknown.)
- I8: Each agent writes only in its namespace. Yours is `run/research/`.

## User decisions that apply (quoted from run/decisions.md)

- d-01: "15 minutes (Recommended)" → size the research to a 15-minute chapter with 3 objectives.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every research question q-1 to q-7 is answered, or marked unanswerable with a reason.
- [ ] Every factual claim the chapter may rely on is in `facts.md` with a source.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_research.py /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run` passes.

## Not your job

- Writing chapter prose, the plan, widget designs or the mockup.
- Explaining how Kubernetes works internally (Ch 4+), comparing orchestrators in depth (Ch 14), or kubectl/YAML.
- Editing CURRICULUM.md, Ch 1's or Ch 2's files, or anything outside `run/research/`.
