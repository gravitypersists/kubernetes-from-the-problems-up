# Handoff 01 → researcher (light-research)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/researcher.md`. This file is your task.

## Original request (verbatim)

> Let's commit chapter 5 and then get chapter 6 going.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Light-depth research for Chapter 6 ("Shipping without downtime: rollouts and rollbacks") of the course "Desired state: Kubernetes from the problems up". Answer research questions q-1 to q-7 in the brief, which serve objectives o-1 to o-3. Verify the claims the chapter will rely on:
- how a Deployment performs a rolling update (new ReplicaSet scaled up, old scaled down), the `maxSurge` / `maxUnavailable` defaults and their rounding, worked for 3 and 4 copies; that old Pods go only as new ones become ready; what triggers a rollout and what doesn't;
- what happens when a surge Pod can't be placed for lack of room (ties to Ch 5's pending);
- readiness vs. liveness (and startup) probes: what each checks, what failure does, the behaviour with no probes;
- a rollout of a crashing or never-ready version: it stops progressing, `progressDeadlineSeconds` and what "failed to progress" does (and that it doesn't roll back by itself);
- rollback in desired-state terms (template set back, old ReplicaSet scaled up, the revision history limit), and whether a rollback is itself a rolling update; undo by command vs. reverting the manifest in version control;
- tags vs. digests: a tag can be moved, a digest pins one image; what rollback assumes about the registry;
- canary and blue-green: one accurate sentence each, and whether plain Deployments do them;
- where a new version comes from (CI builds an image; the desired state is updated), kept light.

Collect the misconceptions a non-infrastructure manager holds about these ideas, especially catalog m-09 (CURRICULUM.md §6), and new ones as `local-NN`. Prefer primary sources: kubernetes.io docs (Deployments, probes, container images). For any statistic about changes causing incidents, cite who measured it, when and how; it will be presented as one source's figure, and it's optional. Defaults must cite the setting or doc that states them.

Stay converged on what a 20-minute chapter for managers needs; this is **light** depth, so keep `facts.md` to what the chapter will actually use. Anything interesting but out of scope goes to the parking lot, tagged with the later chapter it belongs to (Ch 7 traffic and Services, Ch 8 autoscaling, Ch 9 config, Ch 10 state and migrations, Ch 12 observability, Ch 13 GitOps and Helm).

Ch 1–5 already researched containers, images and registries (Ch 2), the reconcile loop, ReplicaSets and crash-loop back-off (Ch 4), and scheduling, requests and pending (Ch 5). Reuse their claims by reference rather than re-researching them; they count toward your caps only if you copy them in.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/brief.md`
- `/Users/m/workspace/k8s-course/CURRICULUM.md`:
  - §1, §2, §3 (Fennel is fiction and needs no sourcing), §5, §6, and the §7 Ch 6 entry;
  - the Ch 7–14 entries show what must NOT be pre-empted.
- Earlier research, for reuse by reference: `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/` (images, tags, registry; its parking lot has tags vs. digests), `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/` (ReplicaSets, level-based loops, back-off), `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/research/` (pending, requests).

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/research/`: the files `researcher.md` specifies.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed. (intended_use is unknown.)
- I8: Each agent writes only in its namespace. Yours is `run/research/`.

## User decisions that apply (quoted from run/decisions.md)

- d-01: "20 minutes (Recommended)" → size the research to a 20-minute chapter with 3 objectives.
- d-02: "Light (Recommended)" → light depth: verify the key claims and find misconceptions; don't survey.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every research question q-1 to q-7 is answered, or marked unanswerable with a reason.
- [ ] Every factual claim the chapter may rely on is in `facts.md` with a source.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_research.py /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run` passes.

## Not your job

- Writing chapter prose, the plan, widget designs or the mockup.
- Researching Ch 7–14 topics in depth (Services and traffic, autoscaling, config, storage and migrations, observability tooling, GitOps). Research only enough to avoid stating anything those chapters would contradict.
- kubectl usage beyond naming `rollout undo` for what it does, or YAML beyond what a Deployment / probe illustration needs.
- Editing CURRICULUM.md, earlier chapters' files, or anything outside `run/research/`.
