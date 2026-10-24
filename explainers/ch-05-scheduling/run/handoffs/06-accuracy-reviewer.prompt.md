# Handoff 06 → accuracy-reviewer (accuracy-r1)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/accuracy-reviewer.md`. This file is your task.

## Original request (verbatim)

> let's apply the R1-R12 now and start chapter 5 now

Resumed in a later session with:

> yes, close chapter 4 first. commit it, push it, then verify 2 and finish chapter 5

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Round-1 accuracy review of the built Chapter 5 page ("Who runs where: scheduling, resources and cost") of the course "Desired state: Kubernetes from the problems up". Check every factual statement on the page against `facts.md` and, where a statement isn't covered there, against reliable sources you verify yourself (prefer kubernetes.io and the managed providers' docs). That includes:
- prose, figures f-01 to f-07, the asides, disclosures D1–D7 (whichever exist), term cards, the sources footer;
- every comprehension item's key, options and feedback (k-01 to k-09);
- all lane text, canvas strings and snapshot numbers in `site/widgets/w-friday-scrolly/data.js` (lane F, F1–F5), and all strings, numbers and computed outcomes in `site/widgets/w-sizing-sandbox/` (`data.js`, `index.js`): drive the sandbox and check its arithmetic (nodes needed, what fits, what waits, the cost readout) for the default and a few extreme settings;
- the loop lens table data in `site/assets/page.js`.

Pay particular attention to:
- how the default scheduler chooses: filter then score, by requests not usage; spreading copies as a default; the tie-break; allocatable vs. capacity (the ~13 GB of a 16 GB node);
- lane F's numbers: each node's free memory and processor at every step, the verdicts per node, and the recorded reason ("0/3 nodes are available: 2 Insufficient cpu, 3 Insufficient memory."), including whether its counts are consistent with the drawn state and with how the real message counts nodes;
- requests vs. limits for memory and processor: memory over limit → OOM-killed and restarted; processor over limit → slowed (throttled), not killed; no limit set; defaults when unset;
- node-pressure eviction: which Pods go first, at a manager's level;
- billing: standard modes pay for machines; which per-Pod modes exist and what they bill (requests, not usage); no provider mode implied to behave like another;
- survey figures (D5): each attributed to who measured, when, and how; not presented as general fact;
- pending: meaning, retries, what changes when a node is added (the cluster autoscaler only previewed);
- leak vs. growth (k-09, f-07): presented as a rule of thumb, not a test;
- headroom and the 03:04 repeat on three nodes; node pools;
- simplifications that cross into falsehood.

Fennel (the company, its people, times, sizes and events) is declared fiction on the page and needs no sourcing. But fiction must not be presented as statistics, and the mechanisms it illustrates must be true. The invented sizes (16 GB / 4-core nodes, service requests) must be internally consistent everywhere they appear.

Also check scope: no later-chapter terms used as concepts (autoscaling beyond a "we'll name this later" preview, affinity/taints beyond one sentence, Deployment, rollout, probe, Service, ConfigMap, namespace, quota, StatefulSet). The term ledger in CURRICULUM.md §5 lists what Ch 1–5 may use.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/research/facts.md` (and the rest of `run/research/` if useful), plus earlier chapters' `run/research/facts.md` it references.
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/` (index.html, assets/, widgets/, and `pool/cluster/` for how the drawing labels things)
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/screenshots/page-round-4/` and `run/gate/page-round-4.json` (gate results)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §3 (established story facts, for consistency with Ch 4), §5 term ledger and §7 Ch 5–8 entries (scope)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/review/round-1/accuracy.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`)
- Probe screenshots, if any, in `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/screenshots/probe/` (prefix them `acc-r1-`)
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I8: Each agent writes only in its namespace. Yours is `run/review/round-1/` (your file) and `run/screenshots/probe/`.

## User decisions that apply (quoted from run/decisions.md)

- d-03: "Approve" → the plan and its invented story facts (16 GB / 4-core nodes, the service sizes, Friday's 5 nodes, Tuesday's OOM-kills, Year 2's spare machines given back before the move) are approved fiction. Check that the mechanisms they illustrate are true, not the fiction itself.
- d-04: "(b) Fix Ch 4 (Recommended)" → Ch 4's moving day now follows the default scheduler (storefront on 01, 04, 02; at 03:04 orders → 04, dispatch → 01). Ch 5 uses it as a worked example; check consistency.
- d-05: "keep one chapter, don't cut, I will consider cut in human review" → length is not an accuracy issue.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every factual statement on the page, in both widgets' data and computed output, and in check feedback has been checked, and each problem is a finding with severity, location, evidence and expected fix.
- [ ] `accuracy.md` follows the review template.

## Not your job

- Pedagogy, UX, style or layout (the other reviewer's lane).
- Fixing anything; editing the site, plan or research.
