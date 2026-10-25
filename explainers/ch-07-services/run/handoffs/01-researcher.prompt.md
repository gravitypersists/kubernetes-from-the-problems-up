# Handoff 01 → researcher (light-research)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/researcher.md`. This file is your task.

## Original request (verbatim)

> Commit and continue, I will review at a later date. Once done with 6 let's start ch 7.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Light-depth research for Chapter 7 ("Finding each other: services and traffic") of the course "Desired state: Kubernetes from the problems up". Answer research questions q-1 to q-5 in the brief, which serve objectives o-1 to o-3. Verify the claims the chapter will rely on:
- what a Service is: a stable virtual address and DNS name, a selector on Pod labels; the EndpointSlice controller (the loop that keeps the list of a Service's Pods: what it watches, that only ready Pods receive traffic by default, how terminating Pods are treated); kube-proxy (or a replacement) on each node turning Services into routing rules, so there is no Service process; how traffic is spread by default (not by load); how quickly a change reaches callers, hedged;
- what a caller sees during a rolling update, and when a Pod stops being ready;
- what goes wrong around Services: a caller using a Pod's address directly; a selector matching no Pods; traffic before readiness; long-lived connections pinned to one Pod. Which produce "connection refused" and which timeouts; enough to choose a plausible cause for the chapter's incident;
- DNS names inside the cluster (short name and full form, kept light; headless Services named only, for Ch 10);
- getting traffic in: Service type LoadBalancer (one cloud load balancer per Service), Ingress and the Gateway API (one entry point routing by host or path to many Services), and their **current status as of 2026** (whether Ingress is frozen, the state of widely used ingress controllers, Gateway API's standing): verify against kubernetes.io and the projects' own announcements, with dates;
- one major provider's load-balancer price (hourly plus data or capacity units), labelled with provider, region and date; it will be presented as one provider's figure;
- service mesh: one accurate sentence, to name it.

Collect the misconceptions a non-infrastructure manager holds about these ideas, especially catalog m-10 (CURRICULUM.md §6), and new ones as `local-NN`. Prefer primary sources: kubernetes.io docs (Service, EndpointSlices, DNS for Services and Pods, Ingress, Gateway API, virtual IPs and service proxies), the Gateway API project site, provider pricing pages. Defaults must cite the setting or doc that states them.

Stay converged on what a 20-minute chapter for managers needs; this is **light** depth, so keep `facts.md` to what the chapter will actually use. Anything interesting but out of scope goes to the parking lot, tagged with the later chapter it belongs to (Ch 8 autoscaling, Ch 9 config, Ch 10 state and headless Services, Ch 11 namespaces and network policies, Ch 12 observability, Ch 13 service mesh, GitOps and Helm, Ch 14 cost and providers).

Ch 1–6 already researched containers and images (Ch 2), the reconcile loop and Pod replacement (Ch 4; its parking lot names the EndpointSlice controller), scheduling (Ch 5), and rollouts and readiness probes (Ch 6, `run/research/facts.md`: probes, "a missing probe counts as passing", readiness takes a Pod out of traffic without a restart). Reuse their claims by reference rather than re-researching them; they count toward your caps only if you copy them in.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/brief.md`
- `/Users/m/workspace/k8s-course/CURRICULUM.md`:
  - §1, §2, §3 (Fennel is fiction and needs no sourcing), §5, §6, and the §7 Ch 7 entry;
  - the Ch 8–14 entries show what must NOT be pre-empted.
- Earlier research, for reuse by reference: `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/` (Pod replacement, the parking lot's EndpointSlice note), `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/research/` (probes, rollouts, canary notes), `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/` (the connecting job).

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/research/`: the files `researcher.md` specifies.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed. (intended_use is unknown.)
- I8: Each agent writes only in its namespace. Yours is `run/research/`.

## User decisions that apply (quoted from run/decisions.md)

- d-01 / d-02 (inferred from "Commit and continue, I will review at a later date. Once done with 6 let's start ch 7."): 20 minutes, light depth → size the research to a 20-minute chapter with 3 objectives; verify the key claims and find misconceptions; don't survey.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every research question q-1 to q-5 is answered, or marked unanswerable with a reason.
- [ ] Every factual claim the chapter may rely on is in `facts.md` with a source.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_research.py /Users/m/workspace/k8s-course/explainers/ch-07-services/run` passes.

## Not your job

- Writing chapter prose, the plan, widget designs or the mockup.
- Researching Ch 8–14 topics in depth (autoscaling, config, storage, namespaces and network policies, observability, service mesh internals, GitOps). Research only enough to avoid stating anything those chapters would contradict.
- Network plugins, IP addressing, TLS, kubectl usage, or YAML beyond what a Service / Ingress / Gateway illustration needs.
- Editing CURRICULUM.md, earlier chapters' files, or anything outside `run/research/`.
