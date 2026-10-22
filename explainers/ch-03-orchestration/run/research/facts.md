# Facts

Light depth, Ch 3 "Many containers, many machines: the orchestration problem". Twelve claims from eight sources. The Google paper "Borg, Omega, and Kubernetes" (ACM Queue, 2016, written by the Kubernetes and Borg designers) covers the history and the "connecting" and utilization points. Two kubernetes.io blog posts ("10 Years of Kubernetes", 2024; "Don't Panic: Kubernetes and Docker", 2020) carry the timeline and Docker's place. The Kubernetes overview page carries the cluster and the sizes. Red Hat's explainer gives the orchestrator definition and the job list. ENERGY STAR (citing NRDC 2014) gives the utilization figure, Google's SRE book gives toil and burnout, and a Cloudera doc gives a worked fragmentation example.

Reused from earlier chapters by reference (not copied, so not counted):
- Ch 1 claim 06 (martinfowler.com/bliki/PhoenixServer.html): drift means ad hoc changes that go unrecorded. The spreadsheet of "what runs where" drifts by the same mechanism as Sam's server notes (q-4). See `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/facts.md`.
- Ch 1 claim 12 (Google Cloud, horizontal scalability): one server is a single point of failure. Eight machines make it eight smaller ones unless something moves the work.
- Ch 2 claim 05 (Docker docs): a container is an isolated process on one machine, so it dies with that machine (m-23, the opener). Ch 2 claim 07: machines pull images from a registry, which is why re-placing a container on a new machine includes a download. Ch 2 claim 11: containers start in seconds, but the download comes first (Ch 2 accuracy finding). See `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/facts.md`.

## Questions
- q-1: answered — c-01, c-02, c-03, c-08
- q-2: answered — c-03, c-08
- q-3: answered — c-04, c-05, c-06
- q-4: answered — c-02
- q-5: answered — c-07, c-08, c-01
- q-6: answered — c-09, c-10
- q-7: answered — c-11, c-12, c-10

Partial coverage, stated plainly:
- q-1: the widget's six jobs (placement, restarting, replacing, connecting, updating, scaling) all appear in c-01's list and the Kubernetes overview (c-08 note). The list leaves out three jobs the sources name. Two of them are **health checking** (noticing a container that is running but stuck, not just one that crashed) and **handing each container its settings and secrets**. The third is **monitoring**, from Borg's tool list (c-02 note). For a manager, "restarting" and "replacing" are worth keeping apart: restart = same machine, replace = elsewhere because the machine is gone. Health checks are Ch 6's and settings are Ch 9's, so name them at most as "and more".
- q-2: one sourced mechanism, fragmentation (c-03). Overloading one machine and the cost of leaving room for failures are model reasoning, recorded in local-02 and x-02, not separately sourced. Ch 5 owns "bin packing", "requests" and "pending"; c-03's source uses "Pending" and "scheduled", which this chapter must not repeat.
- q-3: the **utilization** evidence is sourced and hedged (c-04, c-05). The **on-call** evidence is Google SRE practice (c-06), not an industry survey. No sourced figure exists here for pages per week or hours lost to manual recovery. **Deploy coordination pain** ("deploys coordinated in a group chat") is **unsourced**: no figure was found within the source cap. Keep it as Fennel fiction with no number attached. The DORA / State of DevOps reports would be the place to look if a sourced figure is wanted.
- q-4: no source discusses spreadsheets of "what runs where" specifically. The answer rests on two points. Drift is unrecorded change (Ch 1 claim 06). And, sourced, where a container runs and how to reach it changes whenever it moves (c-02). So a hand-kept record of a system that moves itself is always out of date. Bridge to Ch 4 without teaching desired state: "what if the record were the thing the system reads and acts on, instead of a note about it?" Model framing; the Kubernetes overview's "describe the desired state … change the actual state to the desired state" is Ch 4's to use.
- q-5: Docker Swarm and Apache Mesos are named in c-07's source. HashiCorp Nomad and cloud container services (e.g. AWS ECS) are model knowledge, not fetched. Name them only as "others exist; Ch 14 compares".
- q-7: "Docker" as a **company** (Docker, Inc.) is model knowledge, not fetched. Docker as a **tool/tech stack** and the **image standard** are sourced (c-11). The level of detail: say Docker builds and runs images, its images follow an open standard, and Kubernetes runs those images. The 2022 runtime change gets one sentence at most (c-12). Don't explain CRI, containerd or "dockershim" to this audience.

## Claims

### c-01
objective: o-1
claim: Running many containers on many machines involves recurring jobs: choosing a machine for each container, replacing crashed containers or failed machines, adding and removing copies as demand changes, and routing traffic to containers whose addresses keep shifting.
source: https://www.redhat.com/en/topics/containers/what-is-container-orchestration
quote: "Configuration and scheduling: It evaluates your cluster's servers to choose the optimal host for each container" ... "Container availability: It continuously monitors the cluster and instantly replaces any crashed containers or failed servers." ... "Scaling and workload balancing: It automatically spins up additional container replicas when traffic spikes" ... "distributes network traffic across a shifting pool of container IP addresses."
confidence: high
note: Vendor explainer (Red Hat sells OpenShift, built on Kubernetes). The jobs list is uncontroversial, but the page oversells: "instantly" replaces, "smooth, self-managing operation". Replacement takes time; the image has to be pulled onto the new machine first (Ch 2 claim 07 and its accuracy finding). The same list includes "Monitoring container health" (restarting frozen apps) and "Configuring applications per container" (settings and secrets), which are the jobs the widget's six leave out (q-1). Rolling out a new version without downtime isn't in this list by name, but is in the Kubernetes overview: "Automated rollouts and rollbacks … change the actual state to the desired state at a controlled rate" (https://kubernetes.io/docs/concepts/overview/). Don't use "desired state" here; it's Ch 4's term.

### c-02
objective: o-1
claim: When a container moves to another machine, the address other software uses to reach it can change, so everything that calls it must somehow be told the new address.
source: https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/44843.pdf
quote: "All containers running on a Borg machine share the host's IP address, so Borg assigns the containers unique port numbers as part of the scheduling process. A container will get a new port number when it moves to a new machine and (sometimes) when it is restarted on the same machine." ... "service clients do not know the port number assigned to the service a priori and have to be told"
confidence: high
note: Burns, Grant, Oppenheimer, Brewer, Wilkes, "Borg, Omega, and Kubernetes", ACM Queue 14(1), 2016 (also at https://queue.acm.org/detail.cfm?id=2898444, which blocked fetching; text read from Google's PDF). The source's mechanism (port numbers) is Borg-specific; the manager-level point generalises: a moved container is reachable somewhere new. That's the "connecting" job, and why a hand-kept "what runs where" list goes stale (q-4). Don't explain IPs, ports or DNS (Ch 7). The paper also lists the tools Google built around Borg: "Naming and service discovery", "Application-aware load balancing", "Horizontal … and vertical … autoscaling", "Rollout tools that manage the careful deployment of new binaries and configuration data", "Monitoring tools". That's the same job list, needed even at Google.

### c-03
objective: o-1
claim: Machines can have plenty of free capacity in total yet be unable to take one larger container, because that capacity is split into small leftovers on different machines and a container must fit on a single machine.
source: https://docs.cloudera.com/data-engineering/1.5.5/deployment-architecture/topics/cde-private-cloud-general-guidelines.html
quote: "Memory Fragmentation – For example, a cluster might have 100 GB of free memory, but if this memory is distributed into 10 GB chunks on 10 different nodes, a job requesting an executor with 20 GB of RAM cannot be scheduled." ... "The job remains in the Pending state because no single node can satisfy its request."
confidence: high
note: Vendor doc for a Kubernetes-based data product, but the mechanism is general arithmetic. It follows from Ch 2 claim 05 (a container is a process on one machine). The source also gives a CPU version: "8 available CPU cores … distributed as 0.5 cores on 16 different nodes … a single 4-core executor cannot be scheduled." It's also the widget's natural "fits nowhere" moment. Vocabulary guard: "Pending", "scheduled", "nodes", "requesting" are Ch 4/5 terms. Say "machines", "fits nowhere", "waits". The source's advice (use smaller pieces) is a Ch 5 idea; leave it out.

### c-04
objective: o-2
claim: In conventional data centers, where each application traditionally got its own server, the average server was estimated in 2014 to be doing useful work with only about 12–18% of its capacity.
source: https://www.energystar.gov/products/data_center_equipment/16-more-ways-cut-energy-waste-data-center/consolidate-lightly-utilized-servers
quote: "Because of the "one workload, one box" approach, most servers run at a low "utilization rate" – meaning that just a fraction of their total computing resources are engaged in useful work. A 2014 report by NRDC estimated average server utilization at 12 to 18 percent and noted that it had largely remained static from 2006 through 2012."
confidence: medium
note: Medium: an estimate (NRDC with Anthesis, "Scaling Up Energy Efficiency Across the Data Center Industry", Aug 2014), quoted secondhand via the US EPA's ENERGY STAR page. NRDC's own press release blocked fetching. It describes US corporate and multi-tenant data centers, not hyperscale clouds and not container fleets specifically. Hedge on the page: "industry estimates have long put typical server utilization in the low tens of percent". Don't say "Fennel's machines are 15% used". "One workload, one box" is Ch 1's one-app-one-server picture, a good callback. ENERGY STAR's remedy is consolidation (virtualization, combining workloads), which is the step containers plus an orchestrator automate. No sourced figure for container-era utilization is recorded here; Ch 5 owns that (and m-08).

### c-05
objective: o-2
claim: Google built Borg partly to run different kinds of work on the same machines, because sharing machines raises how much of each machine is used and so lowers cost.
source: https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/44843.pdf
quote: "Borg shares [machines between … ] user-facing services and CPU-hungry batch processes … [as a] way of increasing resource utilization and thereby reducing costs."
confidence: high
note: The PDF's two-column text extracted out of order. The fragments in quotes are verbatim; the bracketed joins restore the sentence ("Borg shares machines between these two types of applications as a way of increasing resource utilization and thereby reducing costs") but are not verified character-for-character. The paper adds that "the benefits of containerization go beyond merely enabling higher levels of utilization". This is the source for the idle-spend link: dense, automated packing is what turns idle machines into fewer machines. Guard against m-08 (Ch 5): sharing makes savings *possible*; it doesn't make them automatic.

### c-06
objective: o-2
claim: Google's site reliability engineers treat manual, repetitive operations work that grows with the service ("toil") as a burnout risk, and aim to keep it under half of each engineer's time.
source: https://sre.google/sre-book/eliminating-toil/
quote: "Toil is the kind of work tied to running a production service that tends to be manual, repetitive, automatable, tactical, devoid of enduring value, and that scales linearly as a service grows." ... "Too much toil leads to burnout, boredom, and discontent." ... "Our SRE organization has an advertised goal of keeping operational work (i.e., toil) below 50% of each SRE's time."
confidence: high
note: Google SRE book (O'Reilly 2016, free online). It's Google's own practice and opinion, not an industry survey. The same page reports "the average time spent toiling is about 33%" with outliers at "80% toil". Sam moving containers by hand at 3 a.m. is textbook toil: manual, repetitive, automatable, and it "scales up linearly with service size" (same page, "O(n) with service growth"). That's the manager's link from "more services, more machines" to "more pages". No sourced figure for pages per week or recovery hours was found (q-3). Ch 1 claim 08 (playbooks cut repair time about threefold) is also from the SRE book if a number is wanted.

### c-07
objective: o-3
claim: Container orchestration means automating the deployment, management, scaling and networking of containers throughout their lifecycle; an orchestrator is the software that does this.
source: https://www.redhat.com/en/topics/containers/what-is-container-orchestration
quote: "Container orchestration is the process of automating the deployment, management, scaling, and networking of containers throughout their lifecycle" ... "Some popular options are Kubernetes, Docker Swarm, and Apache Mesos."
confidence: high
note: "Throughout their lifecycle" carries the manager-level point: an orchestrator keeps doing the jobs continuously, not once per deploy (local-03). Other orchestrators, named only: Docker Swarm (Docker's own), Apache Mesos (largely faded), plus model knowledge, not fetched: HashiCorp Nomad and cloud container services such as AWS ECS. Ch 14 compares them. Same page: "Most container orchestration solutions are built on Kubernetes" (vendor framing; plausible, unmeasured). **Caution for Ch 4 consistency:** the Borg/Kubernetes authors contrast their design with "a centralized orchestration system, which may be easier to construct at first but tends to become brittle" (44843.pdf). The word "orchestrator" suggests one conductor giving every order, which is exactly m-03 (Ch 4). Define it by *what it does* (the jobs), not *how* (one brain).

### c-08
objective: o-3
claim: An orchestrator such as Kubernetes is given a group of machines (a cluster) and told how much processor and memory each container needs, and it fits the containers onto those machines itself.
source: https://kubernetes.io/docs/concepts/overview/
quote: "Automatic bin packing: You provide Kubernetes with a cluster of nodes that it can use to run containerized tasks. You tell Kubernetes how much CPU and memory (RAM) each container needs. Kubernetes can fit containers onto your nodes to make the best use of your resources."
confidence: high
note: Manager-level definition of cluster: a group of machines, physical or virtual, run as one pool (Red Hat: "You can cluster together groups of hosts, either physical or virtual machines … and Kubernetes gives you the platform to easily and efficiently manage those clusters"). Vocabulary guard: "nodes" is Ch 4, and "bin packing" and "requests" are Ch 5. Here say "machines", "how big each container is", "fits them". This is the source for giving the widget's chips a size. Same page, motivation in plain words: "if a container goes down, another container needs to start. Wouldn't it be easier if this behavior was handled by a system?" And on self-healing: "Kubernetes restarts containers that fail, replaces containers …" (wording Ch 4 will build on). The page also says Kubernetes "does not build your application" and "is not a traditional, all-inclusive PaaS", useful against "Kubernetes does everything".

### c-09
objective: o-3
claim: Kubernetes is the third container-management system Google built, after Borg and Omega, and unlike those two internal systems it was open source from the start.
source: https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/44843.pdf
quote: "The first unified container-management system developed at Google was the system we internally call Borg." ... "Omega, [footnote 6] an offspring of Borg" ... "The third container-management system developed at Google was Kubernetes. It was conceived of and developed in a world where external developers were becoming interested in Linux containers, and Google had developed a growing business selling public-cloud infrastructure. Kubernetes is open source—a contrast to Borg and Omega, which were developed as purely Google-internal systems."
confidence: high
note: Counter to the overstatement "Kubernetes is Borg, open-sourced" (local-01). It is a new system shaped by Borg and Omega's lessons ("Each system was heavily influenced by its predecessors"). As of the paper (2016), "Borg remains the primary container-management system within Google"; Google didn't swap Borg for Kubernetes internally. That's dated; say "Google still runs its own services on Borg" only with "as of 2016", or omit. The motive the paper states is commercial as well as technical (Google's cloud business). The Kubernetes overview phrases the heritage as "over 15 years of Google's experience running production workloads at scale with best-of-breed ideas and practices from the community" (https://kubernetes.io/docs/concepts/overview/).

### c-10
objective: o-3
claim: Google published Kubernetes as open source in June 2014, and in 2015, at its 1.0 release, donated it to the newly formed Cloud Native Computing Foundation, a neutral home under the Linux Foundation.
source: https://kubernetes.io/blog/2024/06/06/10-years-of-kubernetes/
quote: "Ten (10) years ago, on June 6th, 2014, the first commit of Kubernetes was pushed to GitHub." ... "culminating in a version 1.0 release on July 21st, 2015. Alongside 1.0, Google announced that Kubernetes would be donated to a newly formed branch of the Linux Foundation called the Cloud Native Computing Foundation (CNCF)."
confidence: high
note: One timeline sentence with two dates; the page should state them together as "open-sourced in 2014, given to a foundation in 2015". Today's maintainers, same post (June 2024): "over 88,000 contributors from more than 8,000 companies". Hedge as "tens of thousands of contributors from thousands of companies" and date it. "Neutral" is a gloss: CNCF is a Linux Foundation project, so no single company owns Kubernetes. Telling detail for m-02: Kubernetes was announced "in a June 10th keynote by Google engineer Eric Brewer at DockerCon 2014". It was launched at Docker's own conference, as a tool for running Docker containers at scale. The name means "helmsman" in Greek (model; parking lot).

### c-11
objective: o-3
claim: "Docker" is a set of tools for building and running containers, and the images it builds follow an open standard (OCI), so Kubernetes runs them no matter which tool built them.
source: https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/
quote: "the thing we call "Docker" isn't actually one thing—it's an entire tech stack" ... "Docker is still a useful tool for building containers, and the images that result from running docker build can still run in your Kubernetes cluster." ... "The image that Docker produces isn't really a Docker-specific image—it's an OCI (Open Container Initiative) image. Any OCI-compliant image, regardless of the tool you use to build it, will look the same to Kubernetes."
confidence: high
note: Placement for m-02: Docker packages and runs containers on one machine (Ch 2's world: build the image, run the container). Kubernetes runs containers across many machines (this chapter's world). They work at different layers and are usually used together: developers build with Docker, and the cluster runs the result. The "10 Years" post dates Docker's arrival to "March of 2013 … an upcoming open source tool called "Docker" for creating and using Linux Containers", and credits it with making containers popular. "Docker" also names the company Docker, Inc. (model, not fetched) and is often used loosely for "containers" in general. Caveat against overcorrecting "not competitors": Docker's own orchestrator, Docker Swarm, did compete with Kubernetes (c-07 source lists it), so "not competitors *in the usual sense*" is the honest phrasing.

### c-12
objective: o-3
claim: Kubernetes originally ran containers using Docker's engine, but since version 1.24 (2022) it uses other container runtimes such as containerd; images built with Docker still run unchanged.
source: https://kubernetes.io/blog/2024/06/06/10-years-of-kubernetes/
quote: "Originally designed to work with Docker and only Docker, now you can plug in any container runtime that adheres to the CRI standard." ... "May 2022 — Kubernetes 1.24 sees … removal of Dockershim, leading to widespread user confusion"
confidence: high
note: The "images still run" half is from the Don't Panic post (c-11): "Docker-produced images will continue to work in your cluster with all runtimes, as they always have." The removal is the event behind headlines like "Kubernetes drops Docker", which fuel m-02 in the other direction ("they've split up / Docker is dead"). For managers, one sentence at most: "Kubernetes no longer uses Docker's engine inside the cluster, but your Docker-built images run as before." Don't explain CRI, containerd or dockershim. Same post notes "containerd" is itself one part of Docker's stack (c-11 source). Removal version confirmed separately: "Dockershim has been removed as of Kubernetes v1.24" (https://kubernetes.io/blog/2022/05/03/dockershim-historical-context/).
