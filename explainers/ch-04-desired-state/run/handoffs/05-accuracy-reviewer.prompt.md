# Handoff 05 → accuracy-reviewer (accuracy-r1)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/accuracy-reviewer.md`. This file is your task.

## Original request (verbatim)

> now we're going to do chapter 4.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Round-1 accuracy review of the built Chapter 4 page ("Say what you want, not what to do: desired state and the reconcile loop") of the course "Kubernetes for Technical Managers". Check every factual statement on the page against `facts.md` and, where a statement isn't covered there, against reliable sources you verify yourself (prefer kubernetes.io and the managed providers' docs). That includes:
- prose, figures f-01 to f-05, the asides and disclosures D1–D7, the sources footer;
- every comprehension item's key, options and feedback;
- all lane text and canvas strings in `site/widgets/w-cluster-scrolly/data.js`, and the loop lens table data `CH04_LOOPS` in `site/assets/page.js`.

Pay particular attention to:
- the node-failure sequence and every timing in lane B and the Ch 1 payoff: which loop acts, in what order, default settings, the hedging, and no "instant";
- what applying a manifest does;
- the claim that no single component commands every action;
- what a Pod is and what replacement changes;
- crash-loop back-off numbers;
- what managed providers run vs. what the customer owns;
- the "Kubernetes"/"K8s" etymology;
- the shortened `kind: ReplicaSet` manifest and its caption;
- simplifications that cross into falsehood (e.g. how the record treats a dead node's Pods).

Fennel (the company, its people, times and events) is declared fiction on the page and needs no sourcing. But fiction must not be presented as statistics, and the mechanisms it illustrates must be true.

Also check scope: no later-chapter terms used as concepts (pending, eviction, requests, limits, rolling update, probe, Service, DNS, load balancer, autoscaling, namespace, etcd outside the one disclosure, taint). The term ledger in CURRICULUM.md §5 lists what Ch 1–4 may use.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/facts.md` (and the rest of `run/research/` if useful), plus the earlier chapters' `run/research/facts.md` it references.
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/` (index.html, assets/, widgets/w-cluster-scrolly/)
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/screenshots/page-round-3/` (gate screenshots)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §5 term ledger and §7 Ch 4–8 entries (scope)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/review/round-1/accuracy.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`)
- Probe screenshots, if any, in `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/screenshots/probe/`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I8: Each agent writes only in its namespace. Yours is `run/review/round-1/` (your file) and `run/screenshots/probe/`.

## User decisions that apply (quoted from run/decisions.md)

- d-04: "Yes, use them (Recommended)" → the Year 3 Fennel story facts are approved fiction (standard managed mode, nodes 01–04, moving day, the 03:04 repeat, Pod names, Ari's line, `notifications` crash-looping). Check that the mechanisms they illustrate are true, not the fiction itself.
- d-05: "Yes, from Ch 4 on (Recommended)" → Kubernetes kinds are capitalised (Pod, ReplicaSet); "node" lowercase. Not an accuracy issue.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every factual statement on the page, in the widget data and in check feedback has been checked, and each problem is a finding with severity, location, evidence and expected fix.
- [ ] `accuracy.md` follows the review template.

## Not your job

- Pedagogy, UX, style or layout (the other reviewer's lane).
- Fixing anything; editing the site, plan or research.
