# Facts

Light-depth research for Ch 8, "The Friday dinner rush: autoscaling". 12 claims from 7 sources (cap 12 / 8). Kubernetes claims come from the kubernetes/website and kubernetes/autoscaler repositories (`main` / `master`, read as Markdown source and cross-checked on kubernetes.io, fetched 2026-11-16). Provider claims come from AWS and Microsoft documentation fetched the same day. Defaults are the upstream defaults of `kube-controller-manager` and the cluster autoscaler; a managed provider may change them, so say "by default" and "typically" on the page.

Because of the claim cap, several verified details sit in `note:` lines (each names its source URL, all fetched 2026-11-16) instead of getting claims of their own: the HPA's 15-second period and 10 percent tolerance, the Metrics Server's 15-second collection, the provider names, Karpenter's differences, spot figures, the 23-minute AWS anecdote. Ch 5's c-24 and c-25 (node pool, spot) and its Datadog and CNCF cost claims (its c-13 to c-15), Ch 7's readiness and random-per-connection claims (its c-04, c-05) and Ch 4's self-healing timings are reused by reference, not copied.

## Questions
- q-1: answered — c-01, c-02, c-03, c-08, c-09
- q-2: answered — c-04, c-05, c-07, c-10
- q-3: answered — c-06, c-07, c-08, c-09, c-10, c-11
- q-4: answered (the mechanism and the limit are sourced; no named public postmortem was found, so present it as arithmetic, not as a case study) — c-12
- q-5: answered — c-05, c-09, c-10
- q-6: answered — c-04, c-05, c-10, c-12

## Claims

### c-01
objective: o-1
claim: The HorizontalPodAutoscaler multiplies the current number of copies by the ratio of the current measurement to its target and rounds up, so a reading of twice the target doubles the copies.
source: https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/
quote: "if the current metric value is `200m`, and the desired value is `100m`, the number of replicas will be doubled"
confidence: high
note: Formula in the same section: desiredReplicas = ceil[currentReplicas × (currentMetricValue / desiredMetricValue)]. Same page: the loop "runs intermittently (it is not a continuous process)" and "the default interval is 15 seconds"; and "The control plane skips any scaling action if the ratio is sufficiently close to 1.0 (within a configurable tolerance, 0.1 by default)", so a reading within 10 percent of the target changes nothing. The one-line calculation is also the lever for "a lower target = more copies at the same load". Cross-check: the Metrics Server it reads from "collect[s] metrics every 15 seconds" (https://github.com/kubernetes-sigs/metrics-server, README), so the measurement itself can be up to about 15 s old before the HPA's own 15 s period adds more; derived, not a quoted total.

### c-02
objective: o-1
claim: By default the HPA measures processor use as a percentage of the processor each container requested, not of the machine, so a Pod with no request set gives it nothing to act on.
source: https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/
quote: "the controller calculates the utilization value as a percentage of the equivalent resource request on the containers in each Pod" ... "if some of the Pod's containers do not have the relevant resource request set, CPU utilization for the Pod will not be defined and the autoscaler will not take any action for that metric."
confidence: high
note: Ties Ch 5 back in: a padded request makes the same real use look like a low percentage, so the HPA scales later; a tight request makes it scale sooner. The measurement comes from the resource metrics API, "usually provided by an add-on named Metrics Server, which needs to be launched separately", so "what it needs" is requests plus a metrics source. The measurement need not be processor use (memory, custom and external metrics exist); one sentence only (Ch 12).

### c-03
objective: o-1
claim: The HPA does its work by changing the number of copies wanted on its target, such as a Deployment, and never sets it above the maximum or below the minimum its owner configured.
source: https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/
quote: "the HorizontalPodAutoscaler instructs the workload resource (the Deployment, StatefulSet, or other similar resource) to scale back down" ... "provided that this isn't larger than the overall maximum that you configured"
confidence: high
note: At the maximum it simply stops adding copies; the walkthrough says its `ScalingLimited` condition "indicates that the desired scale was capped by the maximum or minimum of the HorizontalPodAutoscaler. This is an indication that you may wish to raise or lower the minimum or maximum" (https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/). Status in 2026: "The current stable version can be found in the `autoscaling/v2` API version" (same concepts page), with `autoscaling/v2` features marked stable since v1.23. The HPA is a built-in part of Kubernetes (the vertical autoscaler is not; see "Naming sentences"). The page also advises removing `spec.replicas` from a manifest once an HPA owns the number, otherwise re-applying the manifest can reset the copies (Ch 9 / Ch 14 territory, parked).

### c-04
objective: o-1
claim: The cluster autoscaler adds nodes only when the scheduler has marked Pods as unschedulable for lack of room; it does not watch how busy the existing nodes are.
source: https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md
quote: "Cluster Autoscaler increases the size of the cluster when: there are pods that failed to schedule on any of the current nodes due to insufficient resources." ... "CPU-usage-based (or any metric-based) cluster/node group autoscalers don't care about pods when scaling up and down."
confidence: high
note: Same FAQ: it checks for unschedulable Pods every 10 seconds (`--scan-interval`), then "creates template nodes for each of the node groups and checks if any of the unschedulable pods would fit on a new node" (a simplified simulation; "may require multiple iterations"); "inside a node group, all machines have identical capacity and have the same set of assigned labels"; with several candidate groups, a configurable strategy (an "expander") picks which to grow. Kubernetes' own node-autoscaling page: "If there are Pods in a cluster that can't be scheduled on existing Nodes, new Nodes can be automatically added"; resource requests "don't directly take into account the real resource usage of the Pods after they start running" (https://kubernetes.io/docs/concepts/cluster-administration/node-autoscaling/), which is m-29 again. Karpenter-style provisioners (as of 2026 the other node autoscaler sponsored by SIG Autoscaling) react to the same trigger but skip pre-made groups: "the autoscaler dynamically chooses the Node configuration based on the pending Pods it's reacting to, as well as pre-configured constraints", and Karpenter "manages each instance directly, without use of additional orchestration mechanisms like node groups" (same Kubernetes page; https://karpenter.sh/docs/concepts/). Provider names, as of 2026 (hedge on the page): GKE and AKS offer a cluster autoscaler per node pool, with a minimum and a maximum size (https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cluster-autoscaler); EKS Auto Mode "Relying on Karpenter auto scaling, ... monitors for unschedulable Pods and makes it possible for new nodes to be deployed" (https://docs.aws.amazon.com/eks/latest/userguide/automode.html); AKS "node auto-provisioning" (and AKS Automatic) "automatically deploys, configures, and manages Karpenter" and "uses pending pod resource requirements to decide the optimal VM configuration" (https://learn.microsoft.com/en-us/azure/aks/node-auto-provisioning); GKE Autopilot provisions node pools automatically. A manager-visible difference: pool-based tools grow a pre-defined kind of machine; provisioner-style tools pick a machine to fit the waiting Pods, and tend to start nodes faster (c-07) and to consolidate.

### c-05
objective: o-4
claim: On AKS, a team sets a minimum and a maximum node count for each autoscaled node pool; the cluster autoscaler adds nodes only up to the maximum and won't shrink the pool below the minimum.
source: https://learn.microsoft.com/en-us/azure/aks/cluster-autoscaler-overview
quote: "it applies the specified scaling rules when the node pool size is lower than the minimum node count, up to the maximum node count" ... "Min size of node pool | Reduce the minimum size of the node pool."
confidence: high
note: GKE says the same in its own words ("you specify a minimum and maximum size for the node pool, and the rest is automatic"); the maximum is therefore a human's cap on spend, and a cluster autoscaler with a pool at its maximum leaves Pods `Pending`. AKS also states the chain in one place: the cluster autoscaler "watches for pods ... that can't be scheduled" and the Horizontal Pod Autoscaler "uses the Metrics Server ... to monitor the resource demand of pods"; "It's a common practice to enable cluster autoscaler for nodes and either the Vertical Pod Autoscaler or Horizontal Pod Autoscaler for pods." Pool definition by reference: Ch 5's c-24 (a group of identical nodes; several pools of different machine types) and, in the autoscaler FAQ, "Inside a node group, all machines have identical capacity and have the same set of assigned labels." Spot pools, labelled with provider and date: AWS's EC2 Spot page advertises "Save up-to 90% on On-Demand prices" (https://aws.amazon.com/ec2/spot/, read 2026-11-16, a ceiling, not a typical figure), and its documentation says EC2 "provides a Spot Instance interruption notice, which gives the instance a two-minute warning before it is interrupted" (https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html). GKE gives no percentage on its Spot page (30-second graceful termination by default; Ch 5 c-25 by reference). AKS: use priority expanders to run Spot and on-demand pools together. Keep `orders` and `payments` off such a pool (Ch 5's story fact).

### c-06
objective: o-2
claim: AWS's EKS best-practices guide says that with the cluster autoscaler new nodes can take multiple minutes to become available, which can raise Pod scheduling delay by an order of magnitude.
source: https://aws.github.io/aws-eks-best-practices/cluster-autoscaling/
quote: "Nodes can take multiple minutes to become available, which can increase pod scheduling latency by an order of magnitude."
confidence: medium
note: Qualitative, one provider's guidance, no benchmark behind it; hence medium. Same guide: "This can be mitigated using overprovisioning, which trades cost for scheduling latency" (c-11). The autoscaler FAQ puts the cause on the provider, not the autoscaler: node creation "almost entirely depends on the cloud provider and the speed of node provisioning, including the TLS bootstrapping process", and the autoscaler waits up to 15 minutes by default (`--max-node-provision-time`) for a requested node to register before giving up on it. A managed provider's own tail: GKE retries failed scale-ups after "an initial five-minute backoff" that can grow to 30 minutes, and AKS says a node pool in backoff may wait "up to 30 minutes" (https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cluster-autoscaler; AKS page above). Plausibility of "twenty minutes": see `examples.md` x-02.

### c-07
objective: o-2
claim: AWS says nodes started by EKS Auto Mode, which uses Karpenter, should show as Ready in under 25 seconds on most instance types, so the node's share of the delay can be well under a minute.
source: https://aws.amazon.com/blogs/containers/faster-nodes-smarter-scaling-whats-new-inside-amazon-elastic-kubernetes-service-amazon-eks-auto-mode/
quote: "Boot time: ... You should see nodes ready in under 25 seconds on most instance types."
confidence: medium
note: One vendor's post (23 June 2026) about its own product; measured on m5.xlarge in us-east-1; it says "Node boot time reduced 39 percent (13 seconds faster)". A node being Ready is not a Pod being ready: in the same post a CPU-bound benchmark took 145 s to reach 1,000 running Pods across 250 nodes (254 s before), so allow for Pod start on top. Counter-example in the same post: "One enterprise customer with over 10,000 pending pods was seeing 23-minute provisioning delays", caused by repeated retries against unavailable capacity; an anecdote, but a documented case of a long delay at scale. AKS Automatic's pod-readiness SLA is a usable upper bound for a managed mode: "99.9% of qualifying pod readiness operations complete within 5 minutes" (https://learn.microsoft.com/en-us/azure/aks/node-auto-provisioning). Both are as of 2026 and differ by provider; don't present either as universal.

### c-08
objective: o-2
claim: When the HPA is deciding to add copies, it assumes Pods that aren't ready yet are using 0 percent of the target, which deliberately dampens the size of the increase.
source: https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/
quote: "if any not-yet-ready pods were present, and the workload would have scaled up without factoring in missing metrics or not-yet-ready pods, the controller conservatively assumes that the not-yet-ready pods are consuming 0% of the desired metric, further dampening the magnitude of a scale up."
confidence: high
note: Pods still starting are also set aside from the average while their start-up use would distort it: "initial readiness delay" default 30 seconds and "CPU initialization period" default 5 minutes (`--horizontal-pod-autoscaler-initial-readiness-delay`, `--horizontal-pod-autoscaler-cpu-initialization-period`; the page advises setting the latter "to cover the startup duration"). The page's default scale-up behaviour: no stabilization window ("the target is scaled up immediately"), at most 4 Pods or 100 percent of the running copies added every 15 seconds. Consequence for the story: the HPA can ask for many copies within a minute; what is slow is everything after the request.

### c-09
objective: o-4
claim: By default the HPA scales down to the highest number it recommended over the last 5 minutes, so a brief dip in traffic doesn't immediately remove copies.
source: https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/
quote: "The controller considers all recommendations within a configurable window choosing the highest recommendation from within that window ... defaults to 5 minutes. This means that scaledowns will occur gradually, smoothing out the impact of rapidly fluctuating metric values."
confidence: high
note: The behaviour section confirms `scaleDown.stabilizationWindowSeconds: 300` by default and `scaleUp.stabilizationWindowSeconds: 0`. The reason is flapping (copies rising and falling with each wobble in the measurement; the page's "Flapping" section). Removing copies does not remove nodes: that is the cluster autoscaler's separate, slower clock (c-10).

### c-10
objective: o-4
claim: By default the cluster autoscaler removes a node only if its Pods' requests are under half its capacity, all its Pods can move elsewhere, and it has stayed that way for 10 minutes.
source: https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md
quote: "The sum of cpu requests and sum of memory requests of all pods running on this node ... are smaller than 50% of the node's allocatable." ... "node was unneeded for less than 10 minutes" (a reason not to remove it)
confidence: high
note: Defaults `--scale-down-utilization-threshold` 0.5 and `--scale-down-unneeded-time` 10m; also no scale-down for 10 minutes after a scale-up (`--scale-down-delay-after-add`) and for 3 minutes after a failed scale-down. What blocks removal, from the FAQ: Pods "not backed by a controller object", a restrictive PodDisruptionBudget, local storage (unless marked), the `safe-to-evict: "false"` annotation, and Pods that cannot be placed elsewhere under scheduling constraints. Note the threshold uses requests, not live use (m-29 once more): a node full of padded requests is never "idle" to the autoscaler. Managed providers expose their own profile settings (AKS: "cluster autoscaler profile"; GKE: autoscaling profiles "balanced" and "optimize-utilization"), and Karpenter-style tools consolidate on their own rules. The bill follows nodes in standard mode, so it falls only when a node is actually removed. Over-provisioning figures: Ch 5's Datadog and CNCF claims, by reference.

### c-11
objective: o-2
claim: Teams can keep spare room ready by running placeholder Pods with very low priority that real Pods push out, which trades cost for shorter delays.
source: https://aws.github.io/aws-eks-best-practices/cluster-autoscaling/
quote: "overprovisioning, which trades cost for scheduling latency. Overprovisioning is implemented using temporary pods with negative priority, which occupy space in the cluster. When newly created pods are unschedulable and have higher priority, the temporary pods will be preempted to make room."
confidence: high
note: The autoscaler FAQ describes the same mechanism ("a deployment running pause pods with very low assigned priority"; the evicted placeholders then become unschedulable and make the autoscaler add a node), so the next spike has a fresh buffer. The guide frames the size as "a tradeoff between performance and cost": you pay for the spare nodes all day. Priority and preemption themselves are Ch 11's: say only "placeholder Pods that real Pods can push out". GKE's default "balanced" profile also "keeps more resources available for incoming Pods, which reduces the time before new Pods become active".

### c-12
objective: o-3
claim: A PostgreSQL server accepts only a fixed number of simultaneous connections, typically 100 by default, so adding application Pods that each open connections can exhaust the database rather than relieve it.
source: https://www.postgresql.org/docs/current/runtime-config-connection.html
quote: "Determines the maximum number of concurrent connections to the database server. The default is typically 100 connections"
confidence: medium
note: The 100 is PostgreSQL's documented default; the inference "more Pods means more connections" is arithmetic (copies × connections per copy against the limit), which practitioner write-ups describe (e.g. an HPA taking API Pods from 3 to 15, each with a 50-connection pool, against `max_connections` 200: 750 wanted; blog-level source, not fetched in full, so not claimed). No named public postmortem was found; present the case as arithmetic, flagged as an illustration. The docs add that "PostgreSQL sizes certain resources based directly on the value of `max_connections`", so raising it is not free (Ch 10: databases and poolers, parked). Why the measurement may not move: processor use is measured on the app's Pods (c-02); if the app waits on the database or the payment provider, its Pods sit at low processor use and the HPA sees nothing to scale (derived from c-01 and c-02, not a quoted claim). Long-lived connections and new Pods: Ch 7's claim (random per new connection) by reference.

## Naming sentences (for q-6; not counted as claims)

- Vertical autoscaling: "a VerticalPodAutoscaler automatically updates a workload management resource ... with the aim of automatically adjusting infrastructure resource requests and limits to match actual usage" and "Unlike HorizontalPodAutoscaler, which is part of the core Kubernetes API, VPA must be installed separately" (https://kubernetes.io/docs/concepts/workloads/autoscaling/vertical-pod-autoscale/). Manager sentence: it gives each Pod a bigger or smaller request instead of adding Pods, and is an add-on.
- Event-driven scaling: "KEDA is a tool that helps Kubernetes scale applications based on real-world events"; it works "alongside Kubernetes' existing Horizontal Pod Autoscaler rather than replacing it", can scale a workload "all the way to zero", and watches "external event sources, like message queues, databases, or APIs" (https://keda.sh/docs/latest/concepts/). Manager sentence: it scales on the length of a queue or similar events, not only on processor use, and can switch a service fully off.
