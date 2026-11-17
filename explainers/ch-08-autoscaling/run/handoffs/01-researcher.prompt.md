# Handoff 01 → researcher (light-research)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/researcher.md`. This file is your task.

## Original request (verbatim)

> start a /didactician run on ch 08. Let's use Sonnet or Haiku (your choice) for the researcher, but I think orchestrator and instruction designer should be fable.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Light-depth research for Chapter 8 ("The Friday dinner rush: autoscaling") of the course "Desired state: Kubernetes from the problems up". Answer research questions q-1 to q-6 in the brief, which serve objectives o-1 to o-4. Verify the claims the chapter will rely on:

- the HorizontalPodAutoscaler: what it measures by default and commonly (processor use as a share of each Pod's **request**), the target and the one-line calculation, minimum and maximum, how often it looks, its tolerance, what it writes (the Deployment's number of copies), what it needs (requests set, a source of measurements), what happens at the maximum, how it treats Pods that aren't ready yet, the default scale-down stabilization window and scale-up behaviour; API status as of 2026;
- how nodes get added and removed: the cluster autoscaler acts on Pods that can't be scheduled (not on busy nodes), simulating whether a node from a pool would fit them; scale-down of underused nodes whose Pods fit elsewhere, its default waits, and what blocks it; what the big managed providers offer and call it **as of 2026** (GKE, EKS including Karpenter and Auto Mode, AKS), enough to speak generically and hedge; where the cluster autoscaler and Karpenter-style provisioners differ in ways a manager would notice;
- node pools (node groups): what one is, per-pool minimum and maximum, how the autoscaler chooses a pool; spot / preemptible pools (one provider's discount range and notice period, labelled with provider and date). Ch 5's claims c-24 and c-25 can be reused by reference;
- where the minutes go in a scale-up, each with a sourced default or typical range, hedged: the measurement's delay and the HPA's period, Pod start (placement, image download, app start, readiness), a new node on at least one managed provider (machine start plus joining the cluster), and the scale-down delays. **Judge whether "`dispatch` lagged for the first twenty minutes" is plausible for a late scale-up that needed new nodes**, and give a realistic minute-by-minute range the designer can build a story timeline on;
- what teams do about lag, each with its cost: a higher minimum, scheduled or predictive scaling, spare capacity kept ready (low-priority placeholder Pods), faster-starting Pods, a lower target;
- when more Pods don't help: a shared database or its connection limit, a downstream provider's rate limit, a slow dependency; what happens to the chosen measurement in each case (processor use can stay low while requests queue, so nothing scales; or more Pods add load on the database). Prefer documented incidents or authoritative write-ups; long-lived connections and new Pods (Ch 7's claims by reference);
- scaling down and cost: why Pods are removed cautiously, when a node can be given back and what stops it, and one or two recent sourced figures on how over-provisioned clusters typically are (Ch 5's Datadog and CNCF figures can be reused by reference);
- one accurate sentence each for vertical autoscaling and event-driven scaling (KEDA), to name them correctly.

Collect the misconceptions a non-infrastructure manager holds about autoscaling, especially catalog m-11 (CURRICULUM.md §6) and its relatives m-28, m-29, m-31 and m-36, and new ones as `local-NN` (candidates are listed in q-6). Prefer primary sources: kubernetes.io (Horizontal Pod Autoscaling, the HPA walkthrough, Node Autoscaling / cluster autoscaling concepts), the kubernetes/autoscaler repository's cluster-autoscaler FAQ, karpenter.sh, and the providers' own documentation and pricing pages. Every default must cite the setting or doc that states it, and anything that differs by provider or tool must say so.

Stay converged on what a 22-minute chapter for managers needs; this is **light** depth, so keep `facts.md` to what the chapter will actually use. Anything interesting but out of scope goes to the parking lot, tagged with the later chapter it belongs to (Ch 9 config, Ch 10 state, Ch 11 quotas, priority and preemption, Ch 12 observability and metrics, Ch 13 KEDA and the ecosystem, Ch 14 cost, providers, disruption budgets and upgrades).

Ch 1–7 already researched containers (Ch 2), the reconcile loop and Pod replacement timings (Ch 4), scheduling, requests, pending Pods, node pools and over-provisioning figures (Ch 5), rollouts and readiness (Ch 6), and Services (Ch 7). Reuse their claims by reference rather than re-researching them; they count toward your caps only if you copy them in. Ch 5's and Ch 7's parking lots have items tagged for Ch 8: start there.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/brief.md`
- `/Users/m/workspace/k8s-course/CURRICULUM.md`:
  - §1, §2, §3 (Fennel is fiction and needs no sourcing), §5, §6, and the §7 Ch 8 entry;
  - the Ch 9–14 entries show what must NOT be pre-empted.
- Earlier research, for reuse by reference:
  - `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/research/` (requests, pending, node pools c-24 / c-25, over-provisioning figures, `parking-lot.md`);
  - `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/research/` (readiness and the Service's list, long-lived connections, `parking-lot.md`);
  - `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/` (self-healing timings; the cut thermostat analogy x-01 in `examples.md`);
  - `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/research/` (readiness probes).

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/research/`: the files `researcher.md` specifies.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed. (intended_use is unknown.)
- I8: Each agent writes only in its namespace. Yours is `run/research/`.

## User decisions that apply (quoted from run/decisions.md)

- d-01 / d-02 (inferred from the request, to be confirmed at the checkpoint): 22 minutes, light depth → size the research to a 22-minute chapter with 4 objectives; verify the key claims and find misconceptions; don't survey.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every research question q-1 to q-6 is answered, or marked unanswerable with a reason.
- [ ] Every factual claim the chapter may rely on is in `facts.md` with a source.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_research.py /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run` passes.

## Not your job

- Writing chapter prose, the plan, widget designs, story timelines for Fennel, or the mockup.
- Researching Ch 9–14 topics in depth (config, storage, quotas and priority, observability and metrics pipelines, KEDA and the ecosystem, provider comparisons and pricing). Research only enough to avoid stating anything those chapters would contradict.
- Vertical autoscaling, in-place resize or recommenders beyond one naming sentence; kubectl usage; YAML beyond what an HPA illustration needs.
- Editing CURRICULUM.md, earlier chapters' files, or anything outside `run/research/`.
