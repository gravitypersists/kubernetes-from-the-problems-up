# Handoff 01 → researcher (ch2-light-research)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/researcher.md`. This file is your task.

## Original request (verbatim)

> okay, commit it, clear context of everything you don't need for ch 2 and proceed with building chapter 2 with the didactician skill

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Light-depth research for Chapter 2 ("'Works on my machine': containers") of "Kubernetes for Technical Managers". Answer research questions q-1 to q-7 in the brief, which serve objectives o-1 to o-4. Verify the claims the chapter will rely on: what an image contains and leaves out, immutability, tags vs. digests, registries, where "build once, run anywhere" breaks, containers vs. VMs (shared kernel, start-up, size, density, isolation), and what containers don't solve. Collect the misconceptions a non-infrastructure manager holds, especially catalog m-01 ("a container is just a small virtual machine") and m-19 ("the code is the app", which this chapter revisits with the fix). Use §6 catalog IDs where they apply and `local-NN` for new ones. Stay converged on what a 14-minute chapter for managers needs. Numbers must be sourced and hedged; no folklore figures.

Ch 1 already researched snowflake servers, drift, VMs and snapshots: `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/facts.md`. Reuse its claims by reference where they apply, rather than re-researching them; they count toward your caps only if you copy them in.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/brief.md`
- `/Users/m/workspace/k8s-course/CURRICULUM.md`: §1, §3 (Fennel is fiction and needs no sourcing), §5, §6, §7 Ch 2 entry. The Ch 3 and Ch 4 entries show what must NOT be pre-empted.
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/` (Ch 1 research)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/`: the files `researcher.md` specifies.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed. (intended_use is unknown.)
- I8: Each agent writes only in its namespace. Yours is `run/research/`.

## User decisions that apply (quoted from run/decisions.md)

- d-01: "14 minutes" → size the research to a 14-minute chapter with 4 objectives.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every research question q-1 to q-7 is answered, or marked unanswerable with a reason.
- [ ] Every factual claim the chapter may rely on is in `facts.md` with a source.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_research.py /Users/m/workspace/k8s-course/explainers/ch-02-containers/run` passes.

## Not your job

- Writing chapter prose, the plan, widget designs or the mockup.
- Researching orchestration or Kubernetes (Ch 3 onward), Dockerfile syntax, or container internals beyond one sentence.
- Editing CURRICULUM.md, Ch 1's files, or anything outside `run/research/`.
