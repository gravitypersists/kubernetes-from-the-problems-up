# Misconceptions

Five from the course catalog (CURRICULUM.md §6) that this chapter owns or revisits, plus one local. Each states the belief fairly and points to the claims that counter it.

### m-03
objective: o-2
misconception: Kubernetes is one master brain that decides and commands every action: it sees a machine die, works out a recovery plan and tells each part what to do.
why_tempting: The word "orchestrator" (Ch 3) suggests a conductor with a score. Diagrams show a single "control plane" box above the machines, and engineers talk about "the controller manager" in the singular. Human recovery (Sam at 03:04) was one person running a plan, so the automated version is imagined the same way.
counter: c-07, c-08, c-09, c-13, c-21
source: https://kubernetes.io/docs/concepts/overview/ ("Kubernetes is not a mere orchestration system … Centralized control is also not required"); the docs correct it explicitly, which signals that the belief is common
note: Show the failure as a relay through the record: the node loop marks the machine, the replica-set loop counts and writes new pod records, the scheduler picks machines, each node agent starts what's assigned to it. Nobody hands a plan to anybody. Anticipate the objection "but the controller manager is one program" (c-07 note: one program, many independent loops).

### m-04
objective: o-1
misconception: Applying a manifest runs something, like executing a deploy script: once it "succeeds", the app is running.
why_tempting: In most tools a command does the thing (Ch 3's by-hand steps, deploy scripts, "click deploy"). The command line answers at once with something like "created", which reads as "done". And for a healthy app, things do start within seconds, so the difference is invisible on a good day.
counter: c-01, c-02, c-08, c-15
source: model (consistent with the docs' care to call an object a "record of intent", c-01)
note: The case where it predicts wrongly: apply "3 copies" when there's no room, or with a broken image. The apply succeeds (the intention is recorded), and the pods wait or crash-loop. Also the reverse case: nobody re-applies anything when machine 03 dies, yet the copies come back, because the intention is still recorded. Rhymes with m-27.

### m-05
objective: o-3
misconception: Kubernetes makes our app reliable by itself: if something breaks, Kubernetes fixes it, so restarts mean the problem is handled.
why_tempting: "Self-healing" is the headline feature on the Kubernetes overview page and every vendor page. After the Ch 3 pain, the 03:04 recovery with nobody awake looks like reliability has been bought. A restart count can sit quietly on a green dashboard.
counter: c-14, c-15, c-19, c-20
source: https://kubernetes.io/docs/concepts/overview/ (the "Self-healing" bullet: "Kubernetes restarts containers that fail, replaces containers …"); catalog entry m-05
note: The loop restores the declared count and restarts what crashes; it doesn't repair a bug, find room that doesn't exist, or bring back data that lived in the pod. A crash loop is the loop working exactly as designed while the app stays broken (the chapter's conversation). Restarts can hide a recurring failure; Ch 12 owns that.

### m-06
objective: o-3
misconception: A pod is just a container under another name, and a particular pod (with its name and address) sticks around; after a machine dies, "the pod moves" to another machine.
why_tempting: Most pods hold exactly one container (c-17), so "pod" and "container" are used interchangeably in conversation. Words like "rescheduled" and "moved" are common in casual talk, and VMs, which the reader knows, really can be migrated between machines.
counter: c-16, c-17, c-18, c-19
source: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/ (the docs put "rescheduled" in quotes to deny it: "A given Pod … is never "rescheduled" to a different node")
note: The prediction that fails: "after the failure, storefront-2 is running on machine 04 at the same address." Really: a new pod, new identity, wherever there's room, at a new address (Ch 7 handles callers). Anything stored inside the old pod is gone.

### m-27
objective: o-2
misconception: An orchestrator is a fancier deploy script: it puts containers on machines when we release, and then it's done until the next release.
why_tempting: Most tools people know run on demand: build, deploy, done. Releases are when engineers talk about Kubernetes, so that's when it seems to act.
counter: c-06, c-09, c-10, c-12
source: catalog entry m-27 (Ch 3 confronted the what; this chapter revisits it through the loops)
note: The loops are "non-terminating" (c-06): they keep comparing between releases, which is why machine 03's failure at 03:04 on a Saturday is handled with no release and no human.

### local-01
objective: o-2
misconception: Self-healing is instant: when a machine dies, the replacements appear within seconds.
why_tempting: Vendor pages say so (Red Hat: "instantly replaces any crashed containers or failed servers", Ch 3 c-01 note). Containers start in seconds (Ch 2 c-11), and a crashed container is restarted almost at once (c-14), so a whole machine's failure is assumed to be the same.
counter: c-10, c-11, c-13, c-15
source: https://www.redhat.com/en/topics/containers/what-is-container-orchestration (an example of the overstatement)
note: With default settings: about 50 s to mark the machine unknown, then a 5-minute wait in case it comes back, then placement and an image download: roughly six minutes, sometimes faster (x-04). The honest payoff to Ch 1's question is "minutes, and nobody has to be awake", not "instantly". Proposed catalog entry: owner Ch 4; Ch 8 revisits with autoscaling lag (m-11).
