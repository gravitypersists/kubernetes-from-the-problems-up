# Misconceptions

Catalog IDs from CURRICULUM.md §6 where they exist; new ones are `local-NN` (to propose at the checkpoint).

### m-07
objective: o-2
misconception: Setting resources high is the safe choice: if every service asks for plenty of memory and processor, nothing can run short, and the only cost is a little waste.
why_tempting: It is how people budget under uncertainty ("pad the estimate"), and in a single-server world, spare capacity on your own box really was free insurance. Requests feel like a safety margin for the app, not a claim on shared machines.
counter: c-02, c-03, c-09, c-13, c-15, c-20
source: CNCF microsurvey 2023: over-provisioning was the top-cited cause of higher spend at 70% (https://www.cncf.io/blog/2023/12/20/cncf-cloud-native-finops-cloud-financial-management-microsurvey/); Datadog 2024: 29 points of container spend idle because "resource requests that are larger than their workloads require" (https://www.datadoghq.com/state-of-cloud-costs/)

Notes for the designer: the counter has two halves the brief names. Cost: inflated requests fill nodes on paper, so more nodes are needed and paid for (c-02, c-09), while the real use stays low (c-03; c-13's "workload idle"). Reliability: an inflated Pod can be too big for any node's free room, so it, or the next Pod, waits pending (c-20). The fair part of the belief: requests set too *low* are risky too (eviction first, c-19), so "high" isn't wrong, "high everywhere by default" is. Right-sizing from observed use is the answer (c-23 note).

### m-08
objective: o-2
misconception: Kubernetes saves money automatically: packing containers onto shared machines means we'll use fewer machines, and in a fully managed mode we only pay for what we use.
why_tempting: Ch 3's own story sold orchestration as "fit containers onto machines" (Ch 3 c-05: Google built Borg partly because sharing machines lowers cost), and managed services market themselves on efficiency. "Pay for what you use" is the serverless slogan managers have heard.
counter: c-06, c-09, c-10, c-12, c-13, c-14, c-05
source: CNCF microsurvey 2023: 49% said Kubernetes drove spend up (https://www.cncf.io/blog/2023/12/20/cncf-cloud-native-finops-cloud-financial-management-microsurvey/); the "only pay for what we use" variant is model (it is the inference Ch 4's accuracy review caught: "Fennel pays for the machines" being false for per-Pod modes was over-corrected in the draft to "fully managed modes bill differently")

Notes for the designer: packing only saves money if requests are honest and someone packs. By default the scheduler spreads rather than packs (c-06, c-07); each node keeps some room back (c-05); headroom is deliberate; standard modes bill nodes whatever is reserved (c-09). In per-Pod modes you pay for *requested* size, not usage (c-10, c-11), and some fully managed modes still bill per machine (c-12). Ch 14 revisits m-08 with the platform-team and fee side.

### m-26
objective: o-1
misconception: If our machines have enough free room in total, a new or moved container will fit somewhere.
why_tempting: Free room looks like one pool on a dashboard ("the cluster is at 60%"), and money in several accounts can be added up, so room on several machines seems to add up too.
counter: c-02, c-20
source: Ch 3 research c-03 and x-01 (/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/facts.md, examples.md)

Notes for the designer: the Kubernetes mechanism is that the fit check is per node and per resource (c-02): leftovers on different nodes never combine, and memory and processor must both fit on the same node. The resource page's own example is the extreme case: "if all the nodes have a capacity of `cpu: 1`, then a Pod with a request of `cpu: 1.1` will never be scheduled" (c-20 note). Ch 4's story already has the setup: after 03:04 the cluster runs on three nodes with free room split across them.

### local-01
objective: o-1
misconception: The scheduler puts new work wherever the machines are least busy right now, so a node that looks idle on the dashboard has room.
why_tempting: That is how a person would place work, and monitoring dashboards show usage (how busy), which is the number managers see. "Scheduler" sounds like a load balancer.
counter: c-03, c-02, c-06
source: model (the Kubernetes docs warn against it explicitly: "although actual memory or CPU resource usage on nodes is very low, the scheduler still refuses to place a Pod on a node if the capacity check fails", c-03)

Notes for the designer: this is the core of o-1 and the "where the analogy breaks" note for budgets. Figures must draw *reserved* (request), *used* and *cap* (limit) differently (brief's lesson from earlier runs); a node can be "full" (all reserved) while its usage bar is low. Proposed catalog entry, owner Ch 5.

### local-02
objective: o-2
misconception: Going over a limit kills the container, whatever the resource; and a limit is the room a Pod is given.
why_tempting: "Limit" and "OOM-killed" arrive together in the incident vocabulary, so all limits sound fatal. And "limit" sounds like "allowance", so people read it as the amount set aside.
counter: c-16, c-17, c-04, c-02
source: model

Notes for the designer: two corrections in one. (1) Processor over the limit is slowed, memory over the limit is killed (c-16 vs. c-17): "it got slow" vs. "it restarted". (2) The scheduler sets room aside by the *request*, not the limit (c-02); the limit is only a ceiling enforced on the node (c-04). The budget analogy maps cleanly: a request is the reserved budget, a limit the spending cap; it breaks where processor overspend is throttled rather than refused (x-03). Proposed catalog entry, owner Ch 5.

### local-03
objective: o-3
misconception: A "pending" Pod has failed or got stuck, and someone has to restart it; or, the reverse, pending is harmless because Kubernetes will sort it out.
why_tempting: In most tools "pending" means a job is queued behind others and will run soon, or that something hung. Ch 4 taught that loops fix gaps, which suggests every gap closes by itself.
counter: c-20, c-21, c-19
source: model

Notes for the designer: pending means the scheduler is still trying and will place it as soon as a node has room (c-21); nobody needs to resubmit. But no loop in this chapter *makes* room: if every node's reservations are full, the Pod waits until someone adds a node or frees room (c-20's list of fixes); the cluster autoscaler that adds nodes is Ch 8. So the right reading is "a symptom with a question attached": what is short, and is it short because of real demand or inflated requests? Fennel's stuck `dispatch` Pods are this case. Proposed catalog entry, owner Ch 5.
