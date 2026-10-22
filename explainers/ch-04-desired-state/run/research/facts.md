# Facts

Standard depth, Ch 4 "Say what you want, not what to do: desired state and the reconcile loop". 25 claims from 15 sources. Almost all of it comes from the Kubernetes project itself: the kubernetes.io concept pages (read as their Markdown source in the kubernetes/website repo, `main` branch, fetched 2026-10-21) and the project's API conventions. The managed-provider claims come from Google (GKE) and AWS (EKS) docs, with Azure (AKS) cross-checked in notes. Disposability comes from the twelve-factor app.

Quotes from kubernetes.io are verbatim from the page source, with Hugo tooltip markup rendered as its link text (e.g. `{{< glossary_tooltip text="API server" ... >}}` → "API server").

Reused from earlier chapters by reference (not copied, so not counted):
- Ch 2 c-06 (Docker docs): files a container writes are deleted with the container unless kept in outside storage. That is the "lost data" half of q-5. See `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/facts.md`.
- Ch 2 c-07 and c-11: a machine must pull (download) the image from a registry before starting a container; containers start in seconds once the image is there. That is the "image pulled" step of q-4, and c-15 below confirms the download counts inside the waiting time.
- Ch 3 c-02 (Borg, Omega, and Kubernetes): a container that moves gets a new address, so callers must be told. That is the "new address" half of q-6; c-19's note adds the Kubernetes-specific wording. See `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/facts.md`.
- Ch 3 c-07 note: the Borg/Kubernetes authors contrast their design with "a centralized orchestration system" (the "control through choreography" line is in Ch 3's parking lot). c-09 below makes the same point from the current Kubernetes docs.

## Questions
- q-1: answered — c-01, c-02, c-05, c-08
- q-2: answered — c-03, c-04, c-06, c-01
- q-3: answered — c-06, c-07, c-08, c-09, c-21
- q-4: answered — c-10, c-11, c-12, c-13, c-15
- q-5: answered — c-14, c-15, c-19
- q-6: answered — c-16, c-17, c-18, c-19
- q-7: answered — c-20, c-18
- q-8: answered — c-21, c-05, c-13
- q-9: answered — c-22, c-23, c-24
- q-10: answered — c-25

Partial coverage and judgment calls, stated plainly:
- q-1: the sources say what happens at the API level: the request is validated, the desired state ("spec") is stored and "available immediately", and the system then works toward it "over time" (c-02). Nothing in the API server starts containers; other loops act on the new record (c-08). Validation is sourced as "The Kubernetes API server validates and configures data for the api objects" (https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/), kept in c-05's note so it doesn't spend a source. Safe manager phrasing: "applying a manifest writes your intention into the cluster's record. Within seconds, loops notice and start acting on it." Don't say "applying runs it" or "applying creates containers". Admission checks are Ch 11's.
- q-2: the docs' own analogy is a thermostat (x-01), not a manager. The goals-vs-task-lists analogy is model reasoning (x-02). Where it breaks is sourced: controllers compare and act in a "non-terminating loop" (c-06), drive toward the latest target regardless of intermediate changes (c-04: level-based), and restart a broken app indefinitely (c-14). "No judgment, no negotiation" is a fair reading of these, not a quotation.
- q-4: timings are upstream Kubernetes defaults (c-10, c-11). Managed providers can tune them, and no provider page found within the source cap says they do or don't. So the hedged statement is: with default settings, a dead machine's pods are replaced after roughly six minutes (about 50 s to notice, a 5-minute grace period, then seconds to place and a download to start), sometimes faster. See x-04 for the worked timeline. Never say "instantly" or "in seconds".
- q-5: "no room left" is answered at manager level only: the replacement pod waits, unplaced, until room appears (c-15). The word for that is "pending", which is Ch 5's term; the chapter should say "waits" and "Chapter 5".
- q-9: providers' own names for the modes: GKE Standard / Autopilot, EKS standard / EKS Auto Mode, AKS Standard / AKS Automatic. All three run the control plane in every mode. Pricing was not researched (out of scope; Ch 14).
- q-10: the name and the numeronym are sourced from the project (c-25). Whether "helmsman" is a good image for the loop is a design judgment (x-06).

## Claims

### c-01
objective: o-1
claim: In Kubernetes, creating an object is writing down a "record of intent": it tells the system what you want running, which is called the desired state, and the system then keeps working to make it so.
source: https://kubernetes.io/docs/concepts/overview/working-with-objects/
quote: "A Kubernetes object is a "record of intent"--once you create the object, the Kubernetes system will constantly work to ensure that the object exists. By creating an object, you're effectively telling the Kubernetes system what you want your cluster's workload to look like; this is your cluster's *desired state*."
confidence: high
note: Same page: each object has a `spec` (desired state, set by you) and a `status` (current state, "supplied and updated by the Kubernetes system"). Its own worked example is `replicas: 3`: "you might set the Deployment `spec` to specify that you want three replicas … If any of those instances should fail (a status change), the Kubernetes system responds to the difference between spec and status by making a correction--in this case, starting a replacement instance." That is the chapter's whole story in one paragraph. "Manifest" is sourced on the same page: "Most often, you provide the information to `kubectl` in a file known as a _manifest_." The docs' example uses a Deployment (Ch 6's term); see concerns.

### c-02
objective: o-1
claim: When you submit a new desired state, the record is updated immediately, but the real system catches up over time; submitting it doesn't by itself start anything.
source: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md
quote: "When a new version of an object is POSTed or PUT, the `spec` is updated and available immediately. Over time the system will work to bring the `status` into line with the `spec`."
confidence: high
note: The Kubernetes API conventions, the project's own design rules for its API. "Doesn't by itself start anything" is the safe reading of this plus c-08 (controllers, not the API server, cause the action); it is the counter to m-04. "Over time" is usually seconds for a new app, longer if an image must be downloaded. Engineers would say `kubectl apply` "sends the manifest to the API server"; the manager-level version is "writes the intention into the cluster's record".

### c-03
objective: o-1
claim: Kubernetes documents two styles: imperative commands act directly on what is running and leave no record but the live result; declarative configuration describes the wanted objects in files, and the tool works out what to change.
source: https://kubernetes.io/docs/concepts/overview/working-with-objects/object-management/
quote: "When using imperative commands, a user operates directly on live objects in a cluster." ... "Commands do not provide a source of records except for what is live." ... "When using declarative object configuration, a user operates on object configuration files stored locally, however the user does not define the operations to be taken on the files. Create, update, and delete operations are automatically detected per-object by `kubectl`."
confidence: high
note: Same page, advantages of keeping configuration in files: it "can be stored in a source control system such as Git" and can "integrate with processes such as reviewing changes before push and audit trails". That is the manager's hook: declared intent is reviewable and auditable, like Ch 1's runbook that can't drift because it *is* what runs. The page also lists a middle style ("imperative object configuration") and an honest drawback of declarative: "harder to debug and understand results when they are unexpected". Don't teach three styles; the chapter needs only the contrast. Keep `kubectl` out of the text (course exclusion).

### c-04
objective: o-1
claim: Kubernetes acts on the latest desired state, not on the history of changes: if a target goes from 2 to 5 and then to 3, it heads straight for 3 and never needs to pass through 5.
source: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md
quote: "The system will drive toward the most recent `spec` regardless of previous versions of that stanza. For example, if a value is changed from 2 to 5 in one PUT and then back down to 3 in another PUT the system is not required to 'touch base' at 5 before changing the `status` to 3. In other words, the system's behavior is *level-based* rather than *edge-based*. This enables robust behavior in the presence of missed intermediate state changes."
confidence: high
note: Engineers say "level-triggered" (react to the current gap) vs. "edge-triggered" (react to each event). The project's design principles make it a rule: "Functionality must be *level-based*, meaning the system must operate correctly given the desired state and the current/observed state, regardless of how many intermediate state updates may have been missed" (https://github.com/kubernetes/design-proposals-archive/blob/main/architecture/principles.md). Manager meaning: a loop that missed a message, or restarted, just looks again and closes whatever gap is there. This is where the delegated-owner analogy holds best, and where "task list" thinking fails: there is no queue of instructions to lose. "Level-triggered" is jargon; use it at most in a disclosure.

### c-05
objective: o-1
claim: The API server is the front door of the control plane, and everything the cluster records, including every desired state, is kept in one consistent store behind it.
source: https://kubernetes.io/docs/concepts/architecture/
quote: "The API server is the front end for the Kubernetes control plane." ... "[etcd:] Consistent and highly-available key value store used as Kubernetes' backing store for all cluster data."
confidence: high
note: The two sentences are the glossary definitions this page renders for kube-apiserver and etcd. Validation: "The Kubernetes API server validates and configures data for the api objects which include pods, services, replicationcontrollers, and others" (https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/). The project's design principles add: "Only the apiserver should communicate with etcd/store, and not other components" (principles.md, see c-04 note), so every loop reads and writes the record through the API server. The store need not be etcd on managed services: GKE stores cluster state either in etcd "on every control plane virtual machine (VM)" or in Spanner (https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture). The brief's phrase "the cluster's record" is therefore more accurate than "etcd"; don't name etcd in the main text.

### c-06
objective: o-2
claim: A controller is a never-ending loop that watches one kind of thing in the record and keeps nudging the current state toward the desired state written there.
source: https://kubernetes.io/docs/concepts/architecture/controller/
quote: "In robotics and automation, a _control loop_ is a non-terminating loop that regulates the state of a system." ... "A controller tracks at least one Kubernetes resource type. These objects have a spec field that represents the desired state. The controller(s) for that resource are responsible for making the current state come closer to that desired state."
confidence: high
note: Observe → compare → act is the standard gloss and matches this wording ("tracks", "current state … closer to … desired state"); the page itself doesn't use the three words. "Reconcile" is the engineers' verb for one pass of this loop; the page doesn't use it either, but it is standard in Kubernetes code and talks (model). The page also notes the cluster "never reaches a stable state" and that this is fine: "As long as the controllers for your cluster are running and able to make useful changes, it doesn't matter if the overall state is stable or not."

### c-07
objective: o-2
claim: Kubernetes is deliberately built from many simple controllers, each managing one aspect of the cluster, instead of one big interlinked control program, partly so that one controller can fail without stopping the rest.
source: https://kubernetes.io/docs/concepts/architecture/controller/
quote: "As a tenet of its design, Kubernetes uses lots of controllers that each manage a particular aspect of cluster state." ... "It's useful to have simple controllers rather than one, monolithic set of control loops that are interlinked. Controllers can fail, so Kubernetes is designed to allow for that."
confidence: high
note: Counter to m-03. Anticipate the engineer's objection "but there is a controller manager": the built-in controllers do ship in one program, kube-controller-manager. "Logically, each controller is a separate process, but to reduce complexity, they are all compiled into a single binary and run in a single process" (glossary text rendered on https://kubernetes.io/docs/concepts/architecture/). One program hosting many independent loops, like one office building housing many teams; it is still not a brain that plans each action. The scheduler and the node agents are separate programs again (c-13, c-21).

### c-08
objective: o-2
claim: Controllers mostly act by writing a change into the record, not by doing the work themselves; other loops notice the new record and do their part, so work passes between independent loops through the record.
source: https://kubernetes.io/docs/concepts/architecture/controller/
quote: "The Job controller does not run any Pods or containers itself. Instead, the Job controller tells the API server to create or remove Pods. Other components in the control plane act on the new information (there are new Pods to schedule and run), and eventually the work is done." ... "the controller makes some changes to bring about your desired state, and then reports the current state back to your cluster's API server. Other control loops can observe that reported data and take their own actions."
confidence: high
note: The source's example is the Job controller; the ReplicaSet controller works the same way (it creates pod records; it doesn't start containers: "A ReplicaSet delegates local container restarts to some agent on the node such as Kubelet", https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/). This is the mechanism behind "no single conductor" (Ch 3's promise, m-03): no component sends orders down a chain; each loop reacts to what it sees in the record. It answers Ch 3's closing question too: "what if the record were the thing the machines act on?" It is. Also: "Once scheduled, Pod objects become part of the desired state for a kubelet", so even the node agent works from the record.

### c-09
objective: o-2
claim: The Kubernetes docs say it doesn't execute a fixed workflow ("do A, then B, then C"); it is a set of independent control processes that keep driving the current state toward the desired state, with no central control required.
source: https://kubernetes.io/docs/concepts/overview/
quote: "The technical definition of orchestration is execution of a defined workflow: first do A, then B, then C. In contrast, Kubernetes comprises a set of independent, composable control processes that continuously drive the current state towards the provided desired state. It shouldn't matter how you get from A to C. Centralized control is also not required."
confidence: high
note: Same paragraph opens: "Kubernetes is not a mere orchestration system. In fact, it eliminates the need for orchestration." This is in tension with Ch 3, which defined Kubernetes as an orchestrator (by the jobs it does, following Red Hat). Both are defensible: Ch 3 used "orchestrator" for *what* gets done; this page objects to *how* the word suggests (a conductor executing a score). The chapter can turn the tension into the m-03 reveal. See concerns.

### c-10
objective: o-2
claim: When a machine stops reporting in, Kubernetes marks it as unknown after a grace period, 50 seconds by default; a node-watching loop checks every machine every 5 seconds.
source: https://kubernetes.io/docs/reference/node/node-status/
quote: "`Unknown` if the node controller has not heard from the node in the last `node-monitor-grace-period` (default is 50 seconds)"
confidence: high
note: The 5-second check: "By default, the node controller checks the state of each node every 5 seconds" (https://kubernetes.io/docs/concepts/architecture/nodes/). The setting is `--node-monitor-grace-period` on kube-controller-manager ("Default: 50s" in its reference). Earlier Kubernetes releases documented 40 seconds (model recollection, not re-fetched); the current docs say 50, so older blog posts may disagree. Machines report in with regular heartbeats. The setting can be changed, and a managed provider may tune it; no provider statement was found (medium-confidence territory for "what your cluster does", high for "the default is").

### c-11
objective: o-2
claim: By default, pods on a machine that is unreachable or not ready stay assigned to it for 5 more minutes, in case it comes back, before Kubernetes evicts them so they can be replaced.
source: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/
quote: "Kubernetes automatically adds a toleration for `node.kubernetes.io/not-ready` and `node.kubernetes.io/unreachable` with `tolerationSeconds=300`, unless you, or a controller, set those tolerations explicitly. These automatically-added tolerations mean that Pods remain bound to Nodes for 5 minutes after one of these problems is detected."
confidence: high
note: Same 5 minutes, said from the node controller's side: "By default, the node controller waits 5 minutes between marking the node as `Unknown` and submitting the first eviction request" (https://kubernetes.io/docs/concepts/architecture/nodes/). The wait exists because a network blip looks the same as a dead machine; replacing too eagerly would duplicate work. Teams can shorten it per app (engineer territory). A faster path exists: in a cloud, the node controller "asks the cloud provider if the VM for that node is still available. If not, the node controller deletes the node", and pods bound to a node that no longer exists are cleaned up (same nodes page; pod-lifecycle "orphan Pods"). So the 5-minute wait is typical for a hung or unreachable machine and can be shorter when the provider reports the machine gone. Eviction is rate-limited when many machines fail at once (nodes page, "Rate limits on eviction"); that's Ch 12/14 material. "Taint" and "toleration" are scheduling vocabulary (Ch 5 territory); don't use them.

### c-12
objective: o-2
claim: The replica-set loop keeps a stated number of identical pods running, and replaces pods that are deleted or terminated for any reason, including a machine failure, by creating new ones from its template.
source: https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/
quote: "A ReplicaSet's purpose is to maintain a stable set of replica Pods running at any given time." ... "A ReplicaSet then fulfills its purpose by creating and deleting Pods as needed to reach the desired number. When a ReplicaSet needs to create new Pods, it uses its Pod template." ... "a ReplicaSet replaces Pods that are deleted or terminated for any reason, such as in the case of node failure or disruptive node maintenance, such as a kernel upgrade."
confidence: high
note: Loop lens: the replica-set loop, watching "how many pods match vs. how many are wanted", creating or deleting pod records. Same page: "we recommend using Deployments instead of directly using ReplicaSets" and "Think of it similarly to a process supervisor, only it supervises multiple Pods across multiple nodes". In practice Fennel's `storefront` would be a Deployment that owns a ReplicaSet (Ch 6); see concerns. It creates the replacement once the old pods are being deleted (c-11), not the moment the machine stops answering.

### c-13
objective: o-2
claim: A separate loop, the scheduler, watches for pods that have no machine yet and picks a machine for each one.
source: https://kubernetes.io/docs/concepts/architecture/
quote: "[kube-scheduler:] Control plane component that watches for newly created Pods with no assigned node, and selects a node for them to run on."
confidence: high
note: Glossary text rendered on the page. The scheduler only writes the choice into the record; the node agent (kubelet) on the chosen machine then sees the pod assigned to it and starts its containers (c-21; c-08 note). The factors it weighs ("resource requirements, … affinity …") are Ch 5's; here say only "the loop that picks a machine". After placement, the chosen machine may have to download the image first (Ch 2 c-07, c-11; c-15 note).

### c-14
objective: o-2
claim: When a container keeps crashing, the node agent restarts it in place, waiting longer each time (10, 20, 40 seconds and so on, capped at 5 minutes), and keeps doing so; it cannot fix the cause.
source: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/
quote: "After containers in a Pod exit, the kubelet restarts them with an exponential backoff delay (10s, 20s, 40s, …), that is capped at 300 seconds (5 minutes). Once a container has executed for 10 minutes without any problems, the kubelet resets the restart backoff timer for that container."
confidence: high
note: "Cannot fix the cause" rests on the same page's list of causes, all outside the loop's reach: "Application errors that cause the container to exit", "Configuration errors, such as incorrect environment variables or missing configuration files", "Resource constraints". The visible status is `CrashLoopBackOff`: "a container in the Pod fails to start properly and then continually tries and fails in a loop". The page's sample row shows a pod at `CrashLoopBackOff` with `200` restarts over `2d9h` (x-05). The back-off exists so a broken container doesn't overload the system ("prevents a faulty container from overwhelming the system"). Restarts are in place, same pod, same machine: "restarts that make replacement containers inside the same Pod and running on the same node". That matches Ch 3's split of restarting (same machine) vs. replacing (elsewhere). A newer, alpha-stage option shortens the cap to 60 s; defaults are as stated. Health checks that restart a hung app (liveness probes) are Ch 6.

### c-15
objective: o-2
claim: If no machine has room for a new pod, it isn't started anywhere; it waits, unplaced, until room appears, and that waiting time also includes downloading the image.
source: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/
quote: "`Pending` | The Pod has been accepted by the Kubernetes cluster, but one or more of the containers has not been set up and made ready to run. This includes time a Pod spends waiting to be scheduled as well as the time spent downloading container images over the network."
confidence: medium
note: Medium only because "no room → waits" is the combination of this definition with the scheduler's role (c-13) and Ch 3 c-03 (a container must fit on one machine), not one sentence in one source. The design principles say the same in general form: "The scheduler may not be able to schedule pods. Retry, but back off" (principles.md, c-04 note). "Pending" is Ch 5's ledger term: say "waits" and "we'll name this in Chapter 5". Adding machines automatically is Ch 8. For Fennel's Year-3 story, this is why spare room still matters after the move to Kubernetes.

### c-16
objective: o-3
claim: A pod is the smallest thing Kubernetes runs: a wrapper around one or more containers that always run together on the same machine and share a network address and storage.
source: https://kubernetes.io/docs/concepts/workloads/pods/
quote: "_Pods_ are the smallest deployable units of computing that you can create and manage in Kubernetes." ... "A _Pod_ (as in a pod of whales or pea pod) is a group of one or more containers, with shared storage and network resources, and a specification for how to run the containers. A Pod's contents are always co-located and co-scheduled, and run in a shared context."
confidence: high
note: Address: "Each Pod is assigned a unique IP address for each address family. Every container in a Pod shares the network namespace, including the IP address and network ports" (same page). Manager phrasing: "a pod has one address; the containers inside share it." Keep "IP", "namespace" and "network namespace" out. The page offers its own mental model: a pod "models an application-specific "logical host"". And "A Pod is not a process, but an environment for running container(s)", which is the hook against m-06 ("a pod is a container").

### c-17
objective: o-3
claim: One container per pod is the most common case, and then a pod is simply a wrapper around that container; Kubernetes manages pods rather than containers directly.
source: https://kubernetes.io/docs/concepts/workloads/pods/
quote: "The "one-container-per-Pod" model is the most common Kubernetes use case; in this case, you can think of a Pod as a wrapper around a single container; Kubernetes manages Pods rather than managing the containers directly."
confidence: high
note: The other use is "Pods that run multiple containers that need to work together", typically a helper ("sidecar") next to the main app. Mention at most as "sometimes a small helper container rides along". This is why "a pod is a container" (m-06) is almost true in practice and still worth correcting: the unit Kubernetes places, counts and replaces is the pod.

### c-18
objective: o-3
claim: Pods are designed to be disposable: people rarely create them directly; a controller creates them, and a pod stays on its machine only until it finishes, is deleted, is evicted, or the machine fails.
source: https://kubernetes.io/docs/concepts/workloads/pods/
quote: "You'll rarely create individual Pods directly in Kubernetes—even singleton Pods. This is because Pods are designed as relatively ephemeral, disposable entities. When a Pod gets created (directly by you, or indirectly by a controller), the new Pod is scheduled to run on a node in your cluster. The Pod remains on that node until the Pod finishes execution, the Pod object is deleted, the Pod is *evicted* for lack of resources, or the node fails."
confidence: high
note: Counter to m-06's second half ("a specific pod will stick around"). The pod-lifecycle page says the same: "Pods are considered to be relatively ephemeral (rather than durable) entities." "Evicted" is Ch 5's ledger term; paraphrase as "removed to free room".

### c-19
objective: o-3
claim: A pod is never moved to another machine; it is replaced by a new, near-identical pod with a new identity, which may land on a different machine.
source: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/
quote: "A given Pod (as defined by a UID) is never "rescheduled" to a different node; instead, that Pod can be replaced by a new, near-identical Pod. If you make a replacement Pod, it can even have same name (as in `.metadata.name`) that the old Pod had, but the replacement would have a different `.metadata.uid` from the old Pod. Kubernetes does not guarantee that a replacement for an existing Pod would be scheduled to the same node as the old Pod that was being replaced."
confidence: high
note: Replacements made by a replica set get new names too (a generated suffix; model knowledge, not fetched), and each pod gets its own address (c-16 note), so callers must be told about the replacement: Ch 7 ("another loop keeps the connection current; Chapter 7"). What dies with the pod: "If that Pod is deleted for any reason, and even if an identical replacement is created, the related thing (a volume, in this example) is also destroyed and created anew" (same page, "Associated lifetimes"), and files written inside a container die with it (Ch 2 c-06). Hence "lost data" is not something the loop restores (q-5); durable storage is Ch 10.

### c-20
objective: o-3
claim: The twelve-factor app calls processes disposable when they can be started or stopped at a moment's notice; that means starting fast, shutting down cleanly when asked, and surviving sudden death.
source: https://12factor.net/disposability
quote: "The twelve-factor app’s processes are disposable, meaning they can be started or stopped at a moment's notice." ... "Processes should strive to minimize startup time." ... "Processes shut down gracefully when they receive a SIGTERM signal from the process manager." ... "Processes should also be robust against sudden death, in the case of a failure in the underlying hardware."
confidence: high
note: Twelve-factor (Heroku, 2011) is the standard reference engineers will recognise. Its reason for fast startup fits Ch 4 exactly: it "aids robustness, because the process manager can more easily move processes to new physical machines when warranted". Kubernetes' side of "when asked": a pod being stopped gets a grace period, "which defaults to 30 seconds" (https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/), before it is killed. The fourth requirement, keeping important data outside the app, is twelve-factor's factor VI ("Twelve-factor processes are stateless and share-nothing", model recollection, not fetched) and Ch 2's "stateless" term, which the reader already has; reuse it rather than re-sourcing. Manager-level list: no important data inside the pod; tolerate being restarted or replaced at any time; start in seconds, not minutes; finish in-flight work when asked to stop.

### c-21
objective: o-4
claim: A cluster has a control plane (the API server, the cluster's record, the scheduler, the controller manager and, in clouds, a cloud controller manager) and worker machines, each running a node agent (the kubelet) and a container runtime.
source: https://kubernetes.io/docs/concepts/architecture/
quote: "The cloud-controller-manager only runs controllers that are specific to your cloud provider." ... "[kubelet:] An agent that runs on each node in the cluster. It makes sure that containers are running in a Pod." ... "[kube-controller-manager example controllers:] Node controller: Responsible for noticing and responding when nodes go down."
confidence: high
note: The full list is on https://kubernetes.io/docs/concepts/overview/components/: "A Kubernetes cluster consists of a control plane and one or more worker nodes", listing kube-apiserver, etcd, kube-scheduler, kube-controller-manager, cloud-controller-manager (optional); and on nodes kubelet, kube-proxy (optional), container runtime. Names a manager needs: API server, scheduler, controllers, kubelet ("the node agent"), and "the cluster's record". The rest (etcd, kube-proxy, cloud controller manager, container runtime) can sit in a disclosure; kube-proxy belongs to Ch 7. "Node" is the Kubernetes word for a worker machine, physical or virtual: Ch 3's "machine". The kubelet also reports its machine's status back (heartbeats, c-10), which is how the node loop learns a machine is gone.

### c-22
objective: o-4
claim: On a managed service such as GKE, the provider runs the whole control plane (API server, scheduler, controllers, the cluster's record) and upgrades its Kubernetes version, automatically or when the customer asks.
source: https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture
quote: "Control plane: managed by GKE. Runs the Kubernetes API server, workload controllers, Kubernetes scheduler, and cluster state storage." ... "GKE manages the control plane lifecycle from cluster creation to deletion. This includes upgrades to the Kubernetes version running on the control plane, which GKE performs automatically, or manually at your request if you prefer to upgrade earlier than the automatic schedule."
confidence: high
note: The same holds for the other two big providers. EKS: "AWS manages the Kubernetes control plane when you create a cluster with EKS" (https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html). AKS: "The control plane remains Azure-managed in both AKS Automatic and AKS Standard. In both modes, Azure operates critical control plane components such as kube-apiserver, etcd, kube-scheduler, kube-controller-manager, and cloud-controller-manager" (https://learn.microsoft.com/en-us/azure/aks/core-aks-concepts). Kept generic on the page, as the curriculum asks. Upgrade timing and the version treadmill are Ch 14.

### c-23
objective: o-4
claim: Who runs the worker machines depends on the mode: in each provider's standard mode the customer manages them, while fully managed modes (GKE Autopilot, EKS Auto Mode, AKS Automatic) hand node management to the provider.
source: https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html
quote: "EKS standard: AWS manages the Kubernetes control plane when you create a cluster with EKS." ... "EKS Auto Mode: Using the EKS Auto Mode feature, EKS extends its control to manage Nodes (Kubernetes data plane) as well."
confidence: high
note: GKE says it more bluntly: "If you use GKE Standard mode, GKE manages the control plane and system components, and you manage the nodes" and "Nodes: managed by GKE in Autopilot mode, and managed by customers in Standard mode" (https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture). AKS: "AKS Automatic is designed for teams that want reduced operational overhead. It includes preconfigured defaults for node management, scaling, security guardrails, and upgrades" vs. Standard, which "expects explicit node pool design and lifecycle choices" (AKS core concepts). Either way the customer pays for the machines their apps run on: "you pay separately for the AWS resources you use to run your applications on Kubernetes worker nodes" (EKS page); AKS "Agent nodes are billed as standard VMs". "Node pool" is Ch 5's term. Mode names change over time; checked 2026-10-21.

### c-24
objective: o-4
claim: Even on a managed service, the customer still owns the workloads: the application code, container images, data, access rules, and the pods they run, plus watching and responding to alerts.
source: https://cloud.google.com/kubernetes-engine/docs/concepts/shared-responsibility
quote: "[heading:] Customer's responsibilities" ... "Maintain your workloads, including your application code, build files, container images, data, Role-based access control (RBAC)/IAM policy, and containers and pods that you are running." ... "Monitor the cluster and applications and respond to any alerts and incidents"
confidence: high
note: GKE's shared-responsibility page (written for security staff, but the split is general). The same list also puts on the customer: keeping Standard node pools on automatic upgrades, and upgrading manually when auto-upgrades are postponed. Manager framing for Ch 4: the provider runs the loops and the record; the company decides what goes *into* the record (desired state) and owns whether the app tolerates being replaced (c-20). The full shared-responsibility picture, platform teams and m-17 ("managed means no operations work") are Ch 14's.

### c-25
objective: o-2
claim: The name Kubernetes comes from the Greek for helmsman or pilot, and "K8s" is an abbreviation that replaces the eight letters between the "K" and the "s" with the number 8.
source: https://kubernetes.io/docs/concepts/overview/
quote: "The name Kubernetes originates from Greek, meaning helmsman or pilot. K8s as an abbreviation results from counting the eight letters between the "K" and the "s"."
confidence: high
note: Sourced from the project itself, closing Ch 3's parking-lot gap. Whether the helmsman image suits the loop is in x-06. Don't claim the logo (a ship's wheel) or a link to "cybernetics" without a source; the cybernetics connection is model knowledge (x-06 note).
