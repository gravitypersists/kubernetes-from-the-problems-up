# Accuracy review: round 1

## Summary
The page is accurate on the parts that carry the objectives. Lane B's node-failure sequence, its default timings (50 s, then 5 min, then seconds plus the image download, so roughly six or seven minutes, never "instant"), the crash-loop back-off and restart counts, what `created` means, the Pod and its replacement, the helmsman and K8s etymology, and every quotation all check out against the facts file and against live kubernetes.io sources. One blocking problem: §07 and k-07 teach that version upgrades are entirely the provider's job. On EKS the customer starts the upgrade and must prepare for it, and Chapter 14 of this course is built on upgrades being the company's ongoing work. Six smaller wording fixes follow. The most useful of them is "removes node 03's Pods from the record": the docs say the Pods are marked for deletion and their records stay until the node is confirmed gone.

## Findings

### new
severity: blocking
criterion: o-4
location: s-07, paragraph after TERM 04 ("On a managed service, the provider runs the whole control plane, in every mode, and upgrades it to new Kubernetes versions."); k-07 option A ("Keeping the API server and the cluster’s record running, and upgrading them to new Kubernetes versions.") and its feedback ("That’s the control plane, which the provider runs in every mode, upgrades included.")
evidence: Facts c-22 supports automatic upgrades for GKE only ("which GKE performs automatically, or manually at your request"). The page generalises this to every managed service, and k-07 marks upgrading as *not* Fennel's job. AWS, "Update existing cluster to new Kubernetes version" (https://docs.aws.amazon.com/eks/latest/userguide/update-cluster.html, fetched 2026-10-22): "When a new Kubernetes version is available in Amazon EKS, you can update your Amazon EKS cluster"; "You can submit the request to upgrade your EKS control plane version using: eksctl, the AWS console, the AWS CLI"; "we recommend that you test the behavior of your applications against a new Kubernetes version before you update your production clusters"; step 1 is "checking the Kubernetes APIs used by resources deployed into the cluster", and nodes must be upgraded to match. GKE's own shared-responsibility page (c-24 note) also gives the customer node-pool upgrade duties. The course itself contradicts the check: CURRICULUM §7 Ch 14 opens with "The cluster needs a version upgrade that interrupts feature work", and m-17 is "Managed Kubernetes means no operations work". A reader who gets k-07 "right" leaves believing upgrades are not Fennel's concern.
expected_fix: Paragraph: "On a managed service, the provider runs the whole control plane, in every mode, and carries out its upgrades to new Kubernetes versions. Deciding when to upgrade, and checking that Fennel's apps still work on the new version, stays partly Fennel's job; Chapter 14 is about that work." k-07 option A: drop "upgrading", e.g. "Keeping the API server and the cluster’s record running, and replacing their machines when they fail." Feedback: "That’s the control plane, which the provider runs in every mode."
verdict: misleading-simplification

### new
severity: should
criterion: o-2
location: widget w-cluster-scrolly lane B, step B3 text ("the node loop removes node 03’s Pods from the record"), its lens `doing` ("removes node 03’s Pod records") and ariaLabel; assets/page.js CH04_LOOPS node-loop `doing` ("after a wait, removes its Pods from the record"); k-04 option C feedback ("Once the dead node’s Pods are removed from the record"); k-05 option A feedback ("marked node 03 and removed its Pods")
evidence: After the 5-minute wait the node controller *requests eviction*. It does not delete the records. Nodes page (fetched 2026-10-22): "the node controller waits 5 minutes between marking the node as `Unknown` and submitting the first eviction request." Taint-and-toleration page: "The decision to delete the pods cannot be communicated to the kubelet until communication with the API server is re-established. In the meantime, the pods that are scheduled for deletion may continue to run on the partitioned node." The old Pod records stay, marked as being deleted (engineers see `Terminating`). The Pod garbage collector removes them only once the node object is gone ("orphan Pods - bound to a node which no longer exists", pod-lifecycle page). The ReplicaSet loop simply stops counting them: "the total number of all pods can temporarily exceed `.spec.replicas`" (ReplicaSet page, "Terminating Pods"). The page's chain of steps (gap appears, ReplicaSet loop fills it within seconds) is right. But "removed from the record" tells the reader the old Pods are gone and over, and an engineer's screen will contradict that.
expected_fix: Change "removes … from the record" to "marks node 03’s Pods for deletion" (lens: "marks node 03’s Pods for deletion"; CH04_LOOPS: "after a wait, marks its Pods for deletion"; k-04/k-05 feedback likewise). Add one B3 sentence: "The ReplicaSet loop no longer counts Pods marked this way, so the record now shows the gap that customers have felt since 03:04." Optionally add to D3: "The old Pod records linger, marked for deletion, until node 03 is confirmed gone." The canvas can keep drawing node 03 empty, or show the two old marks struck through.
verdict: misleading-simplification

### new
severity: should
criterion: o-4
location: s-07, paragraph after TERM 04: "Either way, Fennel pays for the machines its Pods run on."
evidence: Facts c-23 sources this for EKS ("you pay separately for the AWS resources you use to run your applications on Kubernetes worker nodes") and AKS ("Agent nodes are billed as standard VMs") only. GKE Autopilot, one of the three "fully managed modes" the page groups together, mostly does not bill for machines. GKE Autopilot overview (https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview, fetched 2026-10-22): general-purpose Pods use a "Pod-based billing model". Only Pods that select specific hardware are billed by node ("you pay for the underlying hardware and a node management premium"). Chapter 5 builds its cost story on this line, so it should hold in every mode.
expected_fix: "Either way, Fennel pays for the computing its Pods run on: in most modes, that means the machines themselves."
verdict: misleading-simplification

### new
severity: should
criterion: o-1
location: s-02, paragraph before f-02: "Teams keep manifests in version control, so every change to a goal is reviewed before it goes in, and leaves a history."
evidence: Facts c-03 (object-management page) says configuration files "can be stored in a source control system such as Git" and "can integrate with processes such as reviewing changes before push and audit trails". The page turns "can" into "every change … is reviewed". Review is a team practice, not a property of manifests. Imperative changes made directly against the cluster bypass it ("Commands do not provide a source of records except for what is live", c-03). A manager could leave believing declarative configuration guarantees review.
expected_fix: "Teams usually keep manifests in version control, so a change to a goal can be reviewed before it goes in, and leaves a history."
verdict: misleading-simplification

### new
severity: should
criterion: o-1
location: s-02, disclosure D2 ("What if the goal changes twice in a minute?"): "Say someone changes storefront’s goal from 2 copies to 5 and then, a minute later, to 3. Kubernetes doesn’t have to pass through 5 first. … so it ends at 3."
evidence: The API conventions (c-04) say only that the system "is not required to 'touch base' at 5". Their example has no time gap. The page's own lane A3 says the ReplicaSet loop acts "within seconds". So with a minute between the two changes, the loop will almost certainly have already written three more Pod records for 5, and will then remove two. The reader will come away thinking 5 is skipped even a minute later. That's false, and it misstates what level-triggered means: the loop heads for whatever the goal is *when it looks*.
expected_fix: Close the gap and say what happens either way, e.g. "…from 2 copies to 5 and then, a moment later, to 3. If the loop hasn’t looked in between, it never acts on 5 at all: it compares the latest goal with what’s running and heads for 3. If it already started heading for 5, it just turns around. Either way it ends at 3, because there’s no queue of orders to work through." Retitle the summary to match ("twice in quick succession").
verdict: misleading-simplification

### new
severity: should
criterion: o-4
location: s-07, TERM 04 definition ("The cluster’s record and the loops that work on it, behind the API server.") and the paragraph above it ("The record and the loops that work on it, apart from the node agents, make up the control plane. In front of the record sits the API server…")
evidence: Neither the definition nor the defining sentence includes the API server in the control plane. "Behind the API server" even reads as if the API server sat outside it. Kubernetes lists kube-apiserver as a control-plane component (c-21: components page, "A Kubernetes cluster consists of a control plane and one or more worker nodes", listing kube-apiserver first; c-05: "The API server is the front end for the Kubernetes control plane"). Fig. 05 and k-07 A do put it inside, so the page contradicts itself, and the term card is what readers will remember.
expected_fix: TERM 04: "The API server, the cluster’s record behind it, and the loops that work on it. On a managed service, your provider runs it." Paragraph: "The API server, the record behind it, and the loops that work on it, apart from the node agents, make up the control plane."
verdict: misleading-simplification

### new
severity: nit
criterion: o-2
location: s-05, disclosure D3: "Engineers can also shorten or lengthen the waits, app by app."
evidence: Only the 5-minute wait can be set per app (`tolerationSeconds`, taint-and-toleration page: "You can specify `tolerationSeconds` for a Pod to define how long that Pod stays bound to a failing or unresponsive Node"). The 50-second wait is one cluster-wide control-plane setting (`--node-monitor-grace-period` on kube-controller-manager, c-10 note), which a managed provider usually doesn't let customers change.
expected_fix: "Engineers can also shorten or lengthen the five-minute wait, app by app."
verdict: misleading-simplification

### new
severity: nit
criterion: o-3
location: s-06, k-06 option B feedback: "Virtual machines can be moved like that; Pods can’t."
evidence: True: VMs can be live-migrated between hosts, for example by vMotion or Compute Engine live migration. But no claim in facts.md or in Ch 1–3 sources it. The Pod half is c-19.
expected_fix: None needed for accuracy. Either keep it as common knowledge or drop the VM clause ("Pods can’t be moved like that.").
verdict: ok-but-uncited
