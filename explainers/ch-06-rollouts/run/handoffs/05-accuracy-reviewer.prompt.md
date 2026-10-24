# Handoff 05 → accuracy-reviewer (accuracy-r1)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/accuracy-reviewer.md`. This file is your task.

## Original request (verbatim)

> Let's commit chapter 5 and then get chapter 6 going.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Round-1 accuracy review of the built Chapter 6 page ("Shipping without downtime: rollouts and rollbacks") of the course "Desired state: Kubernetes from the problems up". **This is the only review round** (d-03): make each finding complete enough to fix without a follow-up. Check every factual statement on the page against `facts.md` and, where a statement isn't covered there, against reliable sources you verify yourself (prefer kubernetes.io). That includes:
- prose, figures f-01 to f-07, the aside, disclosures D1–D4, term cards, the sources footer;
- every comprehension item's key, options and feedback (k-01 to k-07);
- all lane text, canvas strings and snapshot numbers in `site/widgets/w-rollout-scrolly/data.js` (lane R, R1–R5, and `FIGURES.crash` / `FIGURES.shipped`, which `site/assets/page.js` draws as f-03);
- the loop lens table data (`CH06_LOOPS`) and the incident timeline data (`CH06_INCIDENT`) in `site/assets/page.js`.

Pay particular attention to:
- the rolling update: a new ReplicaSet per template change; what does and doesn't start a rollout; the `maxSurge` / `maxUnavailable` defaults and rounding, and their consequence for three copies (at most four Pods, at least three available) at every lane step; old Pods removed only as new ones become ready; the emptied ReplicaSet kept;
- placements and free room in the lane (Ch 5's units: 13 GB and 3.9 cores of room per node; `catalog` 2 GB · 0.25 cores; `dispatch` 2 GB · 1 core), and whether the claimed scheduler choices follow the default behaviour;
- readiness vs. liveness: what each failure does; no probe at all; an HTTP check passing on status code alone; and the researcher's caveat that a crashing version stalls because its Pods never become ready, not because a check "stops" it;
- a stalled rollout: what "failed to progress" does and doesn't do (no automatic rollback); `progressDeadlineSeconds` if mentioned;
- rollback: the template set back; the kept ReplicaSet scaled up; whether it's itself a gradual rollout (research c-10 is medium confidence, so check the hedging); revision history; undo by command vs. reverting the manifest;
- tags vs. digests; what rollback assumes about the registry; what it doesn't undo;
- canary and blue-green: plain Deployments don't do them by themselves;
- simplifications that cross into falsehood.

Fennel (the company, its people, `catalog`, times, versions, the 23 orders, made-up digests) is declared fiction on the page and needs no sourcing. But fiction must not be presented as statistics, the mechanisms it illustrates must be true, and its numbers must be consistent everywhere they appear, including with CURRICULUM §3's Ch 5 facts (five nodes 01, 02, 04, 05, 06; `dispatch`'s 6 copies; node 05's `dispatch` Pod).

Also check scope: no later-chapter terms used as concepts (Service beyond "Chapter 7", load balancer, autoscaling, ConfigMap / Secret, StatefulSet, GitOps beyond a name). The term ledger in CURRICULUM.md §5 lists what Ch 1–5 may use.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/research/facts.md` (and the rest of `run/research/`), plus the earlier chapters' `run/research/facts.md` it references (Ch 2, 4, 5)
- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/` (index.html, assets/, widgets/, and `pool/cluster/` for how the drawing labels things)
- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/screenshots/page-round-5/` and `run/gate/page-round-5.json` (gate results)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §3 (established story facts), §5 term ledger, §7 Ch 6–8 entries (scope)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/review/round-1/accuracy.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`)
- Probe screenshots, if any, in `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/screenshots/probe/` (prefix them `acc-r1-`)
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I8: Each agent writes only in its namespace. Yours is `run/review/round-1/` (your file) and `run/screenshots/probe/`.

## User decisions that apply (quoted from run/decisions.md)

- d-03: "keep this to a single round of reviews please." → this is the only review round.
- d-05 (under d-04, "auto approve plan… I trust you'll pick right"): the plan is approved, including its invented `catalog` story facts (3 copies, 2 GB · 0.25 cores, nodes 05 and 06, Thursday's v62 → v63 and v63 → v64 releases, six minutes of $0 prices, 23 orders). Check that the mechanisms they illustrate are true, not the fiction itself.
- d-01: "20 minutes (Recommended)" → length is not an accuracy issue.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every factual statement on the page, in the lane's data, in f-03's snapshots and in check feedback has been checked, and each problem is a finding with severity, location, evidence and expected fix.
- [ ] `accuracy.md` follows the review template.

## Not your job

- Pedagogy, layout and prose style (the pedagogy-UX reviewer's lane), beyond flagging something misleading.
- Fixing anything; editing the site, plan or research.
