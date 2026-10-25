# Handoff 05 → accuracy-reviewer (accuracy-r1)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/accuracy-reviewer.md`. This file is your task.

## Original request (verbatim)

> Commit and continue, I will review at a later date. Once done with 6 let's start ch 7.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Round-1 accuracy review of the built Chapter 7 page ("Finding each other: services and traffic") in the course "Desired state: Kubernetes from the problems up". **This is the only review round** (d-03), so make each finding complete enough to fix without a follow-up.

Check every factual statement on the page against `facts.md`. Where `facts.md` doesn't cover a statement, check it against reliable sources you verify yourself (prefer kubernetes.io and the cloud provider's own pages). The review covers:
- prose, figures f-01 to f-06, the support-line aside, disclosures D1–D6, term cards and the sources footer;
- every comprehension item's key, options and feedback (k-01 to k-07);
- all lane text, canvas strings and snapshot data in `site/widgets/w-services-scrolly/data.js`: lane S (S1–S4), plus `FIGURES.restarting` / `FIGURES.ready`, which `site/assets/page.js` draws as f-04;
- the loop lens table data (`CH07_LOOPS`) in `site/assets/page.js`, especially the new endpoints-loop row and the kube-proxy row.

Pay particular attention to these:
- **The Service:** a stable virtual address and DNS name; its selector; the list of ready Pod addresses (EndpointSlices) kept up to date by a control-plane loop; what "ready" means for being on that list; terminating Pods.
- **kube-proxy**, or its equivalent on each node: what it does with the list; whether it's a reconcile loop in the same sense; how traffic is spread.
  - Is "a third of new connections" (or similar) stated with the right hedge: per connection, not per request, and random or roughly even, not strict round-robin, in the default mode?
- **No ready Pods (research c-06, medium confidence):** callers see "connection refused" in most clusters, by default. Check the hedging everywhere it appears, including check feedback.
- **The incident mechanics (d-06, Ch 5's Tuesday OOM restarts on `orders`' single copy):**
  - Does a restarted container keep its Pod's address?
  - Is a Pod whose container is restarting not ready, and therefore off the list?
  - Does the list refill when the container is running again (with or without a readiness probe)?
  - Does the timing ("within seconds, usually", c-05) carry its hedge?
- **Stale addresses vs. the Service:** what a caller holding an old Pod address sees should be hedged, never a key (research concern 2).
- **Load balancers, NodePort, ingress / gateway:**
  - The AWS prices, presented as one provider's figures at a date (2026-10-24), with the arithmetic checked.
  - Ingress frozen, Gateway API recommended, Ingress NGINX retired 24 March 2026, all kept dated and light.
  - One gateway behind one load balancer routing `fennel.example` to `storefront`.
- **The canary-by-traffic-share promise:** only a sentence; it must not imply a plain Service can split traffic by percentage.
- **Simplifications that cross into falsehood.**

Fennel (the company, its people, the services, addresses, times and versions) is declared fiction on the page and needs no sourcing. Three conditions still apply:
- fiction must not be presented as statistics;
- the mechanisms it illustrates must be true;
- its numbers must be consistent everywhere they appear, including with CURRICULUM §3's Ch 3–6 facts. These include `orders-q2rw` after moving day, Tuesday's three OOM restarts in Ch 5, `catalog`'s three copies on nodes 05 and 06, and Thursday's v62 → v63 rollout.

The illustrative addresses are:
- `catalog` `10.96.0.21` and `orders` `10.96.0.25`;
- Pod addresses `10.4.<node>.<n>`, with `orders-q2rw` at `10.4.4.7`.

They must match across f-01, f-02, f-04, f-05, the lane and the prose.

Also check scope: no later-chapter terms used as concepts. The term ledger in CURRICULUM.md §5 lists what Ch 1–6 may use. This chapter introduces Service, DNS name, load balancer, ingress / gateway, the endpoints loop and kube-proxy.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/research/facts.md`, the rest of `run/research/`, and the earlier chapters' `run/research/facts.md` it references
- `/Users/m/workspace/k8s-course/explainers/ch-07-services/site/` (index.html, assets/, widgets/, and `pool/cluster/` for how the drawing labels things)
- `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/screenshots/page-round-4/` and `run/gate/page-round-4.json` (gate results)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §3 (established story facts), §5 term ledger, §7 Ch 7–9 entries (scope)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/review/round-1/accuracy.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`)
- Probe screenshots, if any, in `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/screenshots/probe/` (prefix them `acc-r1-`)
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I8: Each agent writes only in its namespace. Yours is `run/review/round-1/` (your file) and `run/screenshots/probe/`.

## User decisions that apply (quoted from run/decisions.md)

- d-03: "keep this to a single round of reviews please." → this is the only review round.
- d-05: "Approve (Recommended)" → the plan is approved, including its R2 story facts and illustrative addresses. Check that the mechanisms they illustrate are true, not the fiction itself.
- d-06: "Ch 5's Tuesday (Recommended)" → `orders` runs one copy. During each of Ch 5's OOM restarts its Service had no ready Pod, and `storefront`'s calls were refused. "Connection refused" is always hedged ("in most clusters, by default").
- d-01: about 20 minutes → length is not an accuracy issue.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every factual statement on the page, in the lane's data, in f-04's snapshots and in check feedback has been checked. Each problem is a finding with severity, location, evidence and expected fix.
- [ ] `accuracy.md` follows the review template.

## Not your job

- Pedagogy, layout and prose style (the pedagogy-UX reviewer's lane), beyond flagging something misleading.
- Fixing anything; editing the site, plan or research.
