# Facts

Standard depth, Ch 5 "Who runs where: scheduling, resources and cost". 25 claims from 14 sources (cap 25 / 15). The Kubernetes claims come from kubernetes.io concept, task and reference pages, read as their Markdown source in the kubernetes/website repo (`main` branch, fetched 2026-10-22). Provider claims come from Google Cloud (GKE) and AWS (EKS) docs fetched the same day; AKS is cross-checked in notes. The two cost figures come from one vendor dataset (Datadog) and one community survey (CNCF), each labelled with who measured, when and how.

Quotes from kubernetes.io are verbatim from the page source, with Hugo tooltip markup rendered as its link text (e.g. `{{< glossary_tooltip text="kube-scheduler" ... >}}` → "kube-scheduler").

Reused from earlier chapters by reference (not copied, so not counted):
- Ch 4 c-13 (kubernetes.io architecture): the scheduler is a separate loop that watches for Pods with no node and picks one for each. That is this chapter's loop lens row ("wants: every Pod placed; sees: Pods with no node; does: writes a node into the Pod"). c-01 below adds how it chooses.
- Ch 4 c-15 (kubernetes.io pod lifecycle): a Pod that no node has room for waits, unplaced; "Pending" also covers the image download. Verified again today: the page defines `Pending` as "accepted by the Kubernetes cluster, but one or more of the containers has not been set up and made ready to run. This includes time a Pod spends waiting to be scheduled as well as the time spent downloading container images over the network." So "pending" is not always "no room" (see c-20's note).
- Ch 4 c-14 (pod lifecycle): a crashing container is restarted in place with growing back-off (10, 20, 40 s … capped at 5 min). Verified again today that the same page lists "Resource constraints, where the container might not have enough memory or CPU" among the causes of `CrashLoopBackOff`. So a Pod that is OOM-killed again and again ends up crash-looping (c-22).
- Ch 4 c-12 (ReplicaSet page): the ReplicaSet loop replaces Pods terminated for any reason. The node-pressure eviction page confirms it for evicted Pods: "the control plane (`kube-controller-manager`) creates new pods in place of the evicted pods". An evicted Pod is replaced, and the replacement goes back to the scheduler, so it can end up pending.
- Ch 4 c-23 (EKS docs): standard modes vs. fully managed modes (GKE Autopilot, EKS Auto Mode, AKS Automatic). c-10 to c-12 below correct one inference from it: "fully managed" and "billed per Pod" are not the same thing.
- Ch 3 c-03 and x-01: free room split into leftovers on different machines can't take one larger container (m-26). c-02 below gives the Kubernetes mechanism: the fit check is per node and per resource type.

## Questions
- q-1: answered — c-01, c-02, c-03, c-04, c-05, c-06, c-07, c-08
- q-2: answered — c-09, c-10, c-11, c-12, c-13, c-14, c-15
- q-3: answered — c-16, c-17, c-18, c-19, c-04
- q-4: answered — c-13, c-14, c-15, c-03, c-05, c-09
- q-5: answered — c-20, c-21
- q-6: answered — c-22, c-23
- q-7: answered — c-24, c-25

Partial coverage and judgment calls, stated plainly:
- q-1, "does it ever look at actual usage?": none of the default scheduler's plugins (listed in the scheduler configuration reference, c-06's source) reads live usage; filtering and scoring both use requests and allocatable room (c-02, c-03, c-06). Load-aware placement exists only as add-ons outside the default scheduler, which wasn't researched (parking lot). Safe manager phrasing: "the scheduler counts reservations, not how busy a node is."
- q-1, spreading: the default is a soft preference (c-07), not a guarantee. It applies to Pods owned by a ReplicaSet or Service, so it does apply to Fennel's `storefront`. **This matters for the story**: see concern 1 in the report and x-07. With default scoring (prefer emptier nodes, c-06) plus default spreading (c-07), the scheduler would most likely not have put two `storefront` Pods on node 01 while node 04 had 5 free.
- q-2: two billing models exist. (a) Node-based: you pay for the machines whether or not requests fill them. That covers GKE Standard (c-09), EKS with EC2 nodes, and also the "fully managed" EKS Auto Mode (c-12) and AKS Automatic (its intro page describes managed node pools, with nodes "created based on workload requests" by node autoprovisioning, and gives no per-Pod billing; https://learn.microsoft.com/en-us/azure/aks/intro-aks-automatic, fetched 2026-10-22). (b) Request-based, per Pod: GKE Autopilot's general-purpose Pods (c-10) and EKS on Fargate (c-11). **Neither per-Pod mode bills by actual usage; both bill by requested size.** Pricing amounts are out of scope (Ch 14).
- q-3, "defaults when unset": upstream Kubernetes has no default request or limit. With no limit, a container can use the node's whole memory or CPU (c-18). With a limit but no request, Kubernetes copies the limit into the request (manage-resources page: "Kubernetes copies the limit you specified and uses it as the requested value for the resource"; engineer territory, kept as a note to save a claim). Namespace-level defaults (LimitRange) are Ch 11's. GKE Autopilot fills in default requests when none are set (c-10's note).
- q-4: m-07 and m-08 are evidenced by the CNCF survey (c-14, c-15) and the Datadog dataset (c-13); "why the bill goes up" is assembled from those plus per-node system overhead (c-05, x-01), headroom and the node-based billing model (c-09). The control-plane fee is named only (GKE: "A flat cluster management fee of $0.10 per cluster per hour"; EKS: "per cluster per hour fee"), parked for Ch 14.
- q-5: the scheduler keeps retrying (c-21) and retries when the cluster changes, e.g. a node is added or a Pod is deleted. The exact message wording varies by version (c-20 note, x-06). The cluster autoscaler is Ch 8 (parking lot).
- q-6: the OOM-kill signals are sourced (c-22); the Kubernetes docs' own advice is "check for a leak first, else raise the limit (and possibly the request)" (c-23). **The leak-vs-growth heuristic itself (memory climbing steadily regardless of traffic vs. tracking load) is model reasoning**, recorded as x-05 (`source: model`), not as a claim. "How teams pick requests": the docs say to adjust requests "based on actual usage patterns" (c-23 note); recommenders and vertical autoscaling are Ch 8's to name.
- q-7: answered at manager level from GKE (c-24, c-25). AKS and EKS use the same idea under the names "node pools" (AKS) and "node groups" (EKS); not separately sourced.

## Claims

### c-01
objective: o-1
claim: The default scheduler places a Pod in two steps: it first rules out every node where the Pod can't fit, then scores the remaining nodes and picks the highest-scoring one, choosing at random between ties.
source: https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/
quote: "kube-scheduler selects a node for the pod in a 2-step operation: 1. Filtering 1. Scoring" … "kube-scheduler assigns the Pod to the Node with the highest ranking. If there is more than one node with equal scores, kube-scheduler selects one of these at random."
confidence: high
note: The filter example on the same page: "the PodFitsResources filter checks whether a candidate Node has enough available resources to meet a Pod's specific resource requests." Manager phrasing: "first, which nodes have room for it; then, which of those is the best fit." Don't name plugins in the main text.

### c-02
objective: o-1
claim: A node has room for a Pod only if, for memory and processor separately, the requests of the Pods already placed there plus the new Pod's requests fit within what the node offers.
source: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
quote: "The scheduler ensures that, for each resource type, the sum of the resource requests of the scheduled containers is less than the capacity of the node."
confidence: high
note: "For each resource type" is why memory and processor are counted separately: a node can have spare processor but no memory, and a Pod that fits one but not the other doesn't fit (Ch 3 promised this). It is also the mechanism behind m-26: the check is per node, so leftovers on different nodes never add up. "Capacity" here means allocatable room (c-05). Units: 1 CPU unit = one core; "0.5" or "500m" is half a core (same page).

### c-03
objective: o-1
claim: The scheduler places Pods by what they reserve, not by what they use: it refuses a node whose reservations are full even when that node's actual memory and processor use is very low.
source: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
quote: "Note that although actual memory or CPU resource usage on nodes is very low, the scheduler still refuses to place a Pod on a node if the capacity check fails. This protects against a resource shortage on a node when resource usage later increases, for example, during a daily peak in request rate."
confidence: high
note: This is the "where the analogy breaks" fact for budgets: reserved-but-unspent budget can't be lent out. The docs' own justification (protection for the daily peak) is worth keeping next to it, so that reservations read as deliberate, not as a bug.

### c-04
objective: o-2
claim: A request is a reservation, not a cap: a container may use more than it requested while the node has spare room; only a limit stops it.
source: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
quote: "If the node where a Pod is running has enough of a resource available, it's possible (and allowed) for a container to use more resource than its `request` for that resource specifies."
confidence: high
note: Same page: "The kubelet also reserves at least the _request_ amount of that system resource specifically for that container to use." So the request is both what the scheduler counts and what the node keeps for the container. Using more than requested is allowed but risky: it is what puts a Pod first in line for eviction (c-19). A processor request also works as a share under contention ("workloads with larger CPU requests are allocated more CPU time"); engineer territory.

### c-05
objective: o-1
claim: Pods can't reserve a node's full size: part of each node's memory and processor is kept back for the operating system and Kubernetes' own components, and only the rest, called allocatable, is available to Pods.
source: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
quote: "The amount of resources available to Pods is less than the node capacity because system daemons use a portion of the available resources. Within the Kubernetes API, each Node has a `.status.allocatable` field" … "The `.status.allocatable` field describes the amount of resources that are available to Pods on that node"
confidence: high
note: The scheduler uses allocatable when checking fit (same page: "the scheduler uses the node's `status.allocatable` value when evaluating Pod fitness"; Reserve Compute Resources page: "The scheduler treats 'Allocatable' as the available `capacity` for pods"). Managed providers set the reservation; GKE's sliding scale makes small nodes lose a larger share (x-01). This is one reason a bill rises: you pay for the full machine, Pods can reserve only the allocatable part.

### c-06
objective: o-1
claim: Among nodes with room, the default scheduler's resource score favours the least-reserved node, which tends to spread work out; packing work tightly onto fewer nodes is an option engineers must switch on.
source: https://kubernetes.io/docs/reference/scheduling/config/
quote: "`NodeResourcesFit`: For pod-by-pod scheduling checks if the node has all the resources that the Pod is requesting. The score can use one of three strategies: `LeastAllocated` (default), `MostAllocated` and `RequestedToCapacityRatio`."
confidence: high
note: "Allocated" means reserved by requests, not used. The kube-scheduler config API reference agrees: "The default strategy is LeastAllocated with an equal "cpu" and "memory" weight." The Resource Bin Packing page calls `MostAllocated` a strategy that "support[s] the bin packing of resources", "favoring the ones with higher allocation". Other default scores exist (e.g. `ImageLocality` favours nodes that already have the image; `NodeResourcesBalancedAllocation` favours balanced memory/processor use), so "favours the emptiest node" is a tendency, not a rule. Managed fully-managed modes may pack for you (GKE Autopilot overview: "Autopilot manages Pod bin-packing for you"; AKS Automatic: "Pods are bin packed efficiently"). Bin packing as the reader's mental model ("fitting boxes into bins") stays valid: the scheduler solves a packing problem one Pod at a time, and by default it doesn't try to minimise node count.

### c-07
objective: o-1
claim: By default, the scheduler also prefers to spread copies of the same service across nodes, but only as a soft preference: if spreading isn't possible, it places the copy anyway.
source: https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/
quote: "If you don't configure any cluster-level default constraints for pod topology spreading, then kube-scheduler acts as if you specified the following default topology constraints: … maxSkew: 3 … topologyKey: "kubernetes.io/hostname" … whenUnsatisfiable: ScheduleAnyway"
confidence: high
note: Defaults apply only to Pods that "belong[] to a Service, ReplicaSet, StatefulSet or ReplicationController" and set no constraints of their own, which covers Fennel's ReplicaSets. `ScheduleAnyway` "tells the scheduler to still schedule it while prioritizing nodes that minimize the skew". `maxSkew: 3` per node means the default tolerates quite uneven spreads; it nudges, it doesn't forbid two copies on one node. A second default constraint spreads across zones (maxSkew 5); zones are out of scope. Teams that need copies on different nodes write a hard rule (anti-affinity or a `DoNotSchedule` spread constraint): the "one sentence" territory (c-08).

### c-08
objective: o-1
claim: Besides room, the scheduler also weighs placement rules a team can add, such as hardware requirements or affinity and anti-affinity (keep these Pods together, or apart).
source: https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/
quote: "Factors that need to be taken into account for scheduling decisions include individual and collective resource requirements, hardware / software / policy constraints, affinity and anti-affinity specifications, data locality, inter-workload interference, and so on."
confidence: high
note: Nodes can also be marked so that only Pods that accept the mark land there (taints and tolerations): the scheduler configuration reference lists `TaintToleration` ("Implements taints and tolerations") among the default filters, and the resource page's pending checklist says "If most of your nodes are tainted, and the new Pod does not tolerate that taint, the scheduler only considers placements onto the remaining nodes that don't have that taint." The brief allows one sentence; suggested: "Teams can add placement rules, such as keeping copies apart, sending Pods to particular machines, or keeping ordinary work off special ones; your engineers will tune these." Don't use the words taint or affinity in the main text unless they get a disclosure.

### c-09
objective: o-1
claim: In a provider's standard mode, you pay for the nodes themselves, as rented virtual machines, for as long as they exist, however much of their room Pods have reserved.
source: https://cloud.google.com/kubernetes-engine/pricing
quote: "For Standard node pools and compute classes that don't use the Autopilot setting, you're billed for the nodes' underlying Compute Engine instances according to Compute Engine's pricing , until the nodes are deleted."
confidence: high
note: EKS says the same for EC2 nodes ("you are charged for the instance capacity through Amazon EC2", aws.amazon.com/eks/pricing). Link to o-1: requests decide how many nodes are needed (c-02), and nodes are the bill. Unreserved room on a node, and reserved-but-unused room inside Pods, are both paid for. Plus a per-cluster control-plane fee: name only, Ch 14.

### c-10
objective: o-1
claim: In GKE Autopilot's default per-Pod billing, you pay for the processor, memory and disk that your running Pods request, per second, not for nodes and not for what the Pods actually use.
source: https://cloud.google.com/kubernetes-engine/pricing
quote: "In the Pod-based billing model, you are charged in one-second increments for the CPU, memory, and ephemeral storage resources that your running Pods request in the Pod resource requests , with no minimum duration."
confidence: high
note: Same page: "Autopilot sets a default value if no resource request was defined in the Pod" and "Autopilot increases values that don't meet the required minimums or CPU-to-memory ratios. Set the resource requests to what your workloads require to get the most optimal price." Also: "Pods that are waiting to be scheduled or have successfully terminated are not billed", while Pods in "error or retry loops (such as ImagePullBackOff or CrashLoopBackOff)" are billed. Exception: Pods that select specific hardware (GPUs, a machine series) use "a node-based billing model, in which you're charged based on Compute Engine pricing plus an Autopilot management premium." So over-requesting costs money in both models; in per-Pod billing it costs directly, Pod by Pod.

### c-11
objective: o-1
claim: On EKS with Fargate, each Pod gets its own machine sized from its requests plus 256 MB for Kubernetes' components, rounded up to the next available size, and that provisioned size sets the Pod's cost.
source: https://docs.aws.amazon.com/eks/latest/userguide/fargate-pod-configuration.html
quote: "Fargate adds 256 MB to each Pod's memory reservation for the required Kubernetes components" … "Fargate rounds up to the following compute configuration that most closely matches the sum of vCPU and memory requests" … "The `CapacityProvisioned` annotation represents the enforced Pod capacity and it determines the cost of your Pod running on Fargate."
confidence: high
note: Also: "Since Amazon EKS Fargate runs only one Pod per node, the scenario of evicting Pods in case of fewer resources doesn't occur." Worked rounding example in x-02. AWS's EKS pricing page words it as "pricing is calculated based on the vCPU and memory resources used from the time you start to download your container image until the Amazon EKS pod terminates": "used" there means the provisioned configuration, not measured usage; the Fargate docs above are the precise statement. Fargate is a per-Pod compute option of standard EKS, not one of Ch 4's "fully managed modes".

### c-12
objective: o-1
claim: Not every fully managed mode bills per Pod: EKS Auto Mode bills for the machines it launches, plus a management fee per machine.
source: https://aws.amazon.com/eks/pricing/
quote: "You pay for EKS Auto Mode based on the duration and type of Amazon EC2 instances launched and managed by EKS Auto Mode. The EKS Auto Mode prices below are in addition to the Amazon EC2 instance price, which covers the EC2 instances themselves."
confidence: high
note: AKS Automatic is also node-based as far as its docs show: "AKS Automatic creates nodes based on workload requests using Node Autoprovisioning", with no per-Pod billing described (https://learn.microsoft.com/en-us/azure/aks/intro-aks-automatic); medium confidence on AKS, since the pricing page wasn't fetched. **This corrects a shortcut in Ch 4** ("fully managed modes bill differently"): of Ch 4's three fully managed modes, only GKE Autopilot bills per Pod by default. Safe generic phrasing: "In most setups you pay for the machines; a few per-Pod options bill for what each Pod requests." In node-based managed modes the provider picks the machines, but requests still decide how many it needs.

### c-13
objective: o-2
claim: One vendor's dataset (Datadog, hundreds of AWS customers, May 2023–April 2024) found 83% of container spend went on idle room: 54 points on nodes Pods hadn't reserved, 29 points on requests bigger than workloads needed.
source: https://www.datadoghq.com/state-of-cloud-costs/
quote: "Our research shows that 83 percent of container costs are associated with idle resources. About 54 percent of this wasted spend is on cluster idle, which is the cost of overprovisioning cluster infrastructure. The remaining 29 percent is associated with workload idle, which comes from resource requests that are larger than their workloads require."
confidence: medium
note: Who/when/how: Datadog's "State of Cloud Costs 2024"; "Findings are based on data collected between May 2023 and April 2024"; population "a sample of organizations that have used Datadog Cloud Cost Management to analyze their AWS bill"; method "We calculated the proportions of workload idle, cluster idle, and utilized spend on containerized EC2 instances and averaged those proportions across all organizations running containerized instances". Caveats for the text: a vendor's own customers, AWS only, all containers on EC2 (not only Kubernetes), averaged per organization; present it as "one survey's figure". The 54/29 split maps exactly onto this chapter's two kinds of waste: room on nodes nobody reserved (too many or badly packed nodes, plus headroom) and reserved room nobody uses (over-requesting). Same page: "We don't expect that wasted container spend can be eliminated entirely." Confidence medium only because it is one vendor's dataset; the quote is verbatim.

### c-14
objective: o-2
claim: In a CNCF survey run from June to November 2023 (just over 100 responses), 49% said Kubernetes had driven their cloud spend up, and 28% said it was unchanged.
source: https://www.cncf.io/blog/2023/12/20/cncf-cloud-native-finops-cloud-financial-management-microsurvey/
quote: "Kubernetes has driven cloud spend up for nearly half (49%) of those surveyed in CNCF's latest microsurvey report on cloud native FinOps and cloud financial management (CFM)." … "Just under a third (28%) said their costs were unchanged." … "It was conducted between June and November 2023 and received a total of just over 100 responses."
confidence: medium
note: Small self-selected sample ("designed by CNCF with help from members of the OpenCost team"); present as one survey's figure. InfoQ's report of the same survey gives 24% who saved (https://www.infoq.com/news/2024/03/cncf-finops-kubernetes-overspend/); the CNCF post itself doesn't state that figure in the fetched text. Evidence against m-08 ("saves money automatically"). An earlier CNCF/FinOps Foundation survey (2021, 195 respondents) gave 68%: parking lot, not comparable.

### c-15
objective: o-2
claim: In the same CNCF survey, over-provisioning (reserving more than workloads need) was by far the most-cited cause of higher cloud spend, named by 70% of respondents.
source: https://www.cncf.io/blog/2023/12/20/cncf-cloud-native-finops-cloud-financial-management-microsurvey/
quote: "Over-provisioning came first by a long way at 70%, with a lack of awareness of responsibility at an individual or team level coming second at 45%."
confidence: medium
note: The question asked about causes of overspend; "reserving more than workloads need" is the chapter's gloss of over-provisioning, safe for this audience. Evidence for m-07. The second cause (nobody owning the cost) is a Ch 11/14 thread.

### c-16
objective: o-2
claim: A container that reaches its processor limit is slowed down (throttled), not killed: Kubernetes doesn't stop containers for using too much processor.
source: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
quote: "`cpu` limits are enforced by CPU throttling. When a container approaches its `cpu` limit, the kernel will restrict access to the CPU corresponding to the container's limit." … "container runtimes don't terminate Pods or containers for excessive CPU usage."
confidence: high
note: Mechanism on the same page: "During each scheduling interval (time slice), the Linux kernel checks to see if this limit is exceeded; if so, the kernel waits before allowing that cgroup to resume execution." The symptom a manager hears about is "it got slow", not a restart. Don't say processor pressure ever causes eviction: node-pressure eviction is about memory, disk and similar, not processor (c-19's source lists memory, disk space and inodes).

### c-17
objective: o-2
claim: A container that tries to use more memory than its limit is stopped by the operating system (OOM-killed, from "out of memory"), and Kubernetes restarts it if it is set to restart.
source: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
quote: "If the container tries to allocate more memory than this limit, the Linux kernel out-of-memory subsystem activates and, typically, intervenes by stopping one of the processes in the container that tried to allocate memory. If that process is the container's PID 1, and the container is marked as restartable, Kubernetes restarts the container."
confidence: high
note: Same page: "`memory` limits are enforced by the kernel with out of memory (OOM) kills" and they are "enforced reactively": the kill can come a little after the limit is crossed, when the kernel detects memory pressure. The asymmetry with c-16 (processor: slowed; memory: killed) is the point to teach, because memory can't be taken back from a running program the way processor time can (that reason is model reasoning, safe at this level). The restart is in place on the same node, the same Pod (c-22); contrast eviction (c-19), which removes the Pod.

### c-18
objective: o-2
claim: If no memory limit is set, a container can use all the memory on its node, and in a node-wide memory shortage a container without limits is more likely to be the one killed.
source: https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/
quote: "The Container has no upper bound on the amount of memory it uses. The Container could use all of the memory available on the Node where it is running which in turn could invoke the OOM Killer. Further, in case of an OOM Kill, a container with no resource limits will have a greater chance of being killed."
confidence: high
note: The processor version is on the companion page: "The Container has no upper bound on the CPU resources it can use. The Container could use all of the CPU resources available on the Node where it is running" (https://kubernetes.io/docs/tasks/configure-pod-container/assign-cpu-resource/). Both pages add the alternative: a namespace may have a default limit (LimitRange; Ch 11). Unset requests count as zero reserved room for placement purposes, so such a Pod "fits" anywhere and then competes for whatever is free; the docs state this indirectly through the QoS class `BestEffort` ("a Pod is `BestEffort` only if none of the Containers in the Pod have a memory limit or a memory request, and none of the Containers in the Pod have a CPU limit or a CPU request", https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/), which the eviction page puts first in line (c-19). Upstream defaults when unset: no request, no limit; per-Pod-billed modes fill in defaults (c-10 note).

### c-19
objective: o-2
claim: When a node runs short of memory, its node agent evicts Pods to protect the node, starting with Pods using more than they requested (biggest overshoot first, within priority); Pods within their requests go last.
source: https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/
quote: "The kubelet uses the following parameters to determine the pod eviction order: 1. Whether the pod's resource usage exceeds requests 1. Pod Priority 1. The pod's resource usage relative to requests" … "`Guaranteed` pods and `Burstable` pods where the usage is less than requests are evicted last, based on their Priority."
confidence: high
note: Opening of the page: "When one or more of these resources reach specific consumption levels, the kubelet can proactively fail one or more pods on the node to reclaim resources and prevent starvation." Eviction removes the Pod (phase `Failed`), unlike an OOM-kill's in-place restart; the ReplicaSet loop then creates a replacement that needs placing again (Ch 4 c-12), so evictions on a full cluster can turn into pending Pods. This is the reliability cost of under-requesting: a Pod that routinely uses more than it reserved is first out. Default trigger on Linux: `memory.available<100Mi` (hard threshold, same page; engineer territory). QoS class names and Pod Priority: engineer territory, disclosure at most. If memory runs out before the node agent reacts, the kernel's OOM killer picks, also favouring containers far above their requests (same page, "Node out of memory behavior").

### c-20
objective: o-3
claim: If no node has room for a Pod, it stays unplaced ("Pending"), and each time placement fails the scheduler records an event saying why, such as how many nodes were checked and which resource was short.
source: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
quote: "If the scheduler cannot find any node where a Pod can fit, the Pod remains unscheduled until a place can be found. An Event is produced each time the scheduler fails to find a place for the Pod." … "Warning  FailedScheduling  23s   default-scheduler  0/42 nodes available: insufficient cpu"
confidence: high
note: The page then lists the fixes: "Add more nodes to the cluster", "Terminate unneeded Pods to make room for pending Pods", "Check that the Pod is not larger than all the nodes. For example, if all the nodes have a capacity of `cpu: 1`, then a Pod with a request of `cpu: 1.1` will never be scheduled", and check taints. The memory task page shows the too-big case: the Pod "will remain in the PENDING state indefinitely" with "FailedScheduling  No nodes are available that match all of the following predicates:: Insufficient memory (3)." Message wording varies across versions (see x-06 for an illustration to use). Pending ≠ always "no room": it also covers the image download (Ch 4 c-15). The pending Pod is waiting, not failed or deleted, and nothing is retried by a human.

### c-21
objective: o-3
claim: The scheduler doesn't give up on a pending Pod: it puts it back in its queue and tries again, especially when something changes in the cluster that might make room, such as a node joining or a Pod being removed.
source: https://kubernetes.io/docs/concepts/scheduling-eviction/scheduling-framework/
quote: "A scheduling or binding cycle can be aborted if the Pod is determined to be unschedulable or if there is an internal error. The Pod will be returned to the queue and retried." … "When the QueueingHint finds that the event might make the Pod schedulable, the Pod is put into the active queue or the backoff queue so that the scheduler will retry the scheduling of the Pod."
confidence: high
note: The "node joining / Pod removed" examples are the chapter's gloss of "a certain kind of event or change happens in the cluster" (same page), consistent with the resource page's fixes (add nodes, remove Pods; c-20 note). Retry back-off defaults: 1 s initial, 10 s maximum (kube-scheduler config reference: "the default value (1s)", "the default value (10s)"); engineer territory. Loop lens: the scheduler is a loop, so a pending Pod is a gap it keeps seeing; adding a node is what closes it. Who adds the node (a person, or the cluster autoscaler) is Ch 8: "we'll name this later".

### c-22
objective: o-3
claim: An OOM-kill shows up on the Pod as a last state of "Terminated" with reason "OOMKilled" and exit code 137, and a restart count that climbs each time it happens.
source: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
quote: "Last State:     Terminated / Reason:       OOMKilled / Exit Code:    137" … "the `Restart Count:  5` indicates that the `simmemleak` container in the Pod was terminated and restarted five times (so far). The `OOMKilled` reason shows that the container tried to use more memory than its limit."
confidence: high
note: Manager-level view: the Pod keeps its name and node (an in-place restart, unlike Ch 4's replacement after a node death), the service may blip each time, and repeated kills lead to growing restart delays, i.e. crash-loop back-off (Ch 4 c-14; pod-lifecycle lists "Resource constraints, where the container might not have enough memory" as a cause). Exit code 137 = killed by a signal (128 + 9); state it only as "engineers will see 137". The docs' own example container is literally named `simmemleak` (a simulated memory leak), a nice bridge to c-23.

### c-23
objective: o-3
claim: The Kubernetes docs' advice after an OOM-kill is to check the application for a memory leak first, and only if it behaves as expected to raise its memory limit, and possibly its request.
source: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
quote: "Your next step might be to check the application code for a memory leak. If you find that the application is behaving how you expect, consider setting a higher memory limit (and possibly request) for that container."
confidence: high
note: This is the chapter's conversation in the docs' own words. The node-count question follows from c-02/c-09: raising the limit alone doesn't change placement, but raising the request (the "(and possibly request)") reserves more room per copy, which on full nodes means fewer copies per node and possibly another node. How engineers tell leak from growth is model reasoning (x-05). How teams pick requests: the same page says to "adjust its CPU or memory resources based on actual usage patterns"; tools that recommend requests are Ch 8's to name.

### c-24
objective: o-1
claim: A node pool is a group of identical nodes inside a cluster; a cluster can have several pools of different machine types, such as a pool of large-memory machines for the Pods that need more memory.
source: https://cloud.google.com/kubernetes-engine/docs/concepts/node-pools
quote: "A node pool is a group of nodes within a cluster that all have the same configuration." … "You can then add additional node pools of different sizes and types to your cluster. All nodes in any given node pool are identical to one another. Custom node pools are useful when you need to schedule Pods that require more resources than others, such as more memory or more local disk space."
confidence: high
note: Same page: options per pool include "Spot VMs", "different machine types", local SSDs; pools are created, upgraded, resized and deleted individually ("You cannot configure a single node in a node pool; any configuration changes affect all nodes in the node pool"). The manager's takeaway: machine sizes are chosen per pool, and fitting large Pods (m-26) or cheaper interruptible work is a pool decision. Pods are steered to a pool with the placement rules of c-08. AKS: "node pools"; EKS: "managed node groups" (not separately sourced). In fully managed modes the provider creates pools for you.

### c-25
objective: o-1
claim: Spot machines are rented at a lower price but can be taken back by the cloud provider at any time, so teams put them in their own node pool for work that tolerates interruption.
source: https://cloud.google.com/kubernetes-engine/docs/concepts/spot-vms
quote: "Spot VMs are Compute Engine virtual machine (VM) instances that are priced lower than standard Compute Engine VMs and provide no guarantee of availability." … "When the resources used by Spot VMs are required to run standard VMs, Compute Engine terminates those Spot VMs to use the resources elsewhere."
confidence: high
note: Same page: "Useful for stateless, fault-tolerant workloads that are resilient to the ephemeral nature of these VMs" and "You can use Spot VMs in your clusters and node pools to run stateless, batch, or fault-tolerant workloads that can tolerate disruptions caused by the ephemeral nature of Spot VMs." For Fennel: `notifications` (can lag) fits; `orders` doesn't. AWS and Azure have equivalents (Spot Instances, Spot VMs); not separately sourced. Price discounts are out of scope (Ch 14).
