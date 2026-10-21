# Facts

Light depth, Ch 2 "'Works on my machine': containers". Twelve claims from eight sources. Docker's own concept docs and the `docker image pull` reference carry the definitions. Twelve-Factor carries the dev/prod gap. Google Cloud supplies the hedged size and start-up figures, and the Firecracker paper (NSDI '20) covers isolation and why clouds wrap containers in VMs.

Reused from Ch 1 by reference (not copied, so not counted). See `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/facts.md`:
- Ch 1 claim 01 (12factor.net/dependencies): apps depend on machine-installed tools such as ImageMagick, and another machine may have an incompatible version. This is the mechanism behind "works on my machine" (q-2) and behind the Ch 1 photo-upload failure (the opener).
- Ch 1 claim 02 (12factor.net/config): per-deploy config (database addresses, credentials, hostname) varies between deploys and belongs outside the code. It backs claim c-02 below.
- Ch 1 claim 06 (Fowler, PhoenixServer): drift means unrecorded ad hoc changes. It covers the Fennel moment "staging and production have quietly drifted apart".
- Ch 1 claim 09 (Red Hat): what a VM is. This chapter only adds the contrast with containers (c-10 to c-12).

## Questions
- q-1: answered — c-01, c-02, c-06
- q-2: answered — c-03
- q-3: answered — c-04, c-07, c-08, c-09, c-02, c-03
- q-4: answered — c-04, c-05, c-06
- q-5: answered — c-10, c-11
- q-6: answered — c-12, c-10
- q-7: answered — c-05, c-06

Partial coverage, stated plainly:
- q-1: OS-level packages. The image page says an image builds on a base image (e.g. "start from the Python image"), so images normally include an OS's user-space libraries and tools. They do **not** include the kernel (c-10, c-09 note). "Config" is two things. An image can carry default config files (c-01 quote), but per-environment settings and secrets are normally supplied at start (c-02, medium). Config practice is Ch 9 territory.
- q-2: documented mechanism (c-03; Ch 1 claim 01). The concrete bug in x-01 is Fennel fiction. No source documents what managers *believe* causes these bugs, so local-02 and the m-19 revisit are model-sourced.
- q-3: no fetched source says in plain words that a tag "can move". c-08 rests on the pull reference's "pull again ... to get the most up-to-date version" contrasted with "a digest ... is always the same". "latest is only a default name, not a promise of newest" is model judgement (c-08 note).
- q-4: "container vs Docker" is unsourced within the source cap. Docker is a company and its tool, one popular way to build and run containers, and other tools run the same images. That's model knowledge, recorded in the parking lot, and Ch 3 owns m-02. The analogies are in examples.md (x-02 to x-05), each with where it breaks.
- q-5: the figures are typical orders of magnitude from a vendor explainer (c-11, medium). One sourced data point: a Debian base image listed at 124 MB in the pull reference. No sourced per-machine density figure ("N containers vs M VMs"). Don't invent one.
- q-6: Firecracker evidence is the paper's abstract only. The PDF couldn't be text-extracted here, so its boot-time and memory figures are **not** recorded.
- q-7: covered by inference from sourced claims. A container is a process on one machine (c-05), so it stops when the machine dies. Data written inside it is lost when it is replaced (c-06). Restarting crashed containers, placing them across machines and rolling out upgrades are model-level here (local-01). That's deliberate: they are Ch 3's job list, and this chapter should only point at them.

## Claims

### c-01
objective: o-1
claim: An image packages the app's code together with what it needs to run: the language runtime, the libraries and other dependencies, and the files and default settings it starts with.
source: https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/
quote: "A container image is a standardized package that includes all of the files, binaries, libraries, and configurations to run a container. For a PostgreSQL image, that image will package the database binaries, config files, and other dependencies. For a Python web app, it'll include the Python runtime, your app code, and all of its dependencies."
confidence: high
note: This is the fix for m-19. The things Ch 1 found living only on Sam's server (runtime, the photo-resizing tool) now travel with the code. Onboarding link (inference, not a separate claim): a new engineer runs the same image instead of hand-installing dependencies. Docker's container page frames the problem the same way: "How do you make sure you have the same versions as the other developers on your team? Or your CI/CD system? Or what's used in production?" Images start from a base image ("start from the Python image and add additional layers"), so OS-level libraries are inside too, but the kernel isn't (c-10). Don't explain layers (parking lot).

### c-02
objective: o-1
claim: Settings that differ between environments, such as a database password, can be handed to a container when it starts, so one image can run in staging and in production.
source: https://docs.docker.com/get-started/docker-concepts/running-containers/persisting-container-data/
quote: "docker run --name=db -e POSTGRES_PASSWORD=secret -d -v postgres_data:/var/lib/postgresql postgres:18" ... "This will start the database in the background, configure it with a password"
confidence: medium
note: Medium because the source shows the mechanism in an example, not the practice. The principle that per-deploy config lives outside the build comes from Twelve-Factor (Ch 1 claim 02, 12factor.net/config). "So one image can run in staging and production" is the standard consequence, but it's model judgement. The flip side matters for o-4/local-02: config is *not* frozen into the image, so staging and production can still differ in config. Config and secrets practice is Ch 9; say no more than one sentence.

### c-03
objective: o-1
claim: When developers' machines, staging and production run different software stacks, small incompatibilities appear, so code that passed tests in development or staging can still fail in production.
source: https://12factor.net/dev-prod-parity
quote: "The tools gap: Developers may be using a stack like Nginx, SQLite, and OS X, while the production deploy uses Apache, MySQL, and Linux." ... "Differences between backing services mean that tiny incompatibilities crop up, causing code that worked and passed tests in development or staging to fail in production."
confidence: high
note: This is the "releases that fail only in production" symptom. The source's own example is backing services (the database, cache), and those usually run *outside* the app's image. So an image closes the gap for everything inside it, while a different database version in staging vs production can still bite. That's a fair limit to state for o-1/o-4. The same page names a "time gap" and a "personnel gap"; leave them out. Ch 1 claim 01 (ImageMagick version on another machine) is the per-machine version of the same problem.

### c-04
objective: o-2
claim: An image is immutable: once built, it can't be changed, so any change means building a new image.
source: https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/
quote: "Images are immutable. Once an image is created, it can't be modified. You can only make a new image or add changes on top of it."
confidence: high
note: "Add changes on top of it" means building a new image based on the old one; the old image stays as it was. This is why an image can't drift (contrast Ch 1 claim 06): there is no hand-editing a built image. Hand-editing a *running container* is possible, but those changes vanish with the container (c-06). The image is also exactly what's tested and shipped.

### c-05
objective: o-2
claim: A container is an isolated process running on a machine; it gets its files from the image it was started from.
source: https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/
quote: "Seeing as a container is an isolated process, where does it get its files and configuration? How do you share those environments? That's where container images come in."
confidence: high
note: Docker's container page says the same: "A container is simply an isolated process with all of the files it needs to run." One image can start many containers, each independent ("Each container is able to create, modify, and delete files and does so without affecting any other containers": persisting-data page). Ch 1 established "an app is a process on a machine", so a container is that process, packaged and walled off. Inference used for q-7 and o-4: a process runs on one machine, so when that machine dies its containers stop. Nothing in the image or container moves them elsewhere. Internals (namespaces, cgroups) get one sentence at most.

### c-06
objective: o-2
claim: Files a container writes are deleted when the container is deleted, unless they were written to storage kept outside the container (a "volume").
source: https://docs.docker.com/get-started/docker-concepts/running-containers/persisting-container-data/
quote: "When a container starts, it uses the files and configuration provided by the image. Each container is able to create, modify, and delete files and does so without affecting any other containers. When the container is deleted, these file changes are also deleted."
confidence: high
note: Same page: "Volumes are a storage mechanism that provide the ability to persist data beyond the lifecycle of an individual container", and its example is a database you don't want to restart empty. Model-level nuance, safe for this audience: stopping and restarting the *same* container keeps its files. Replacing it with a new container, which every upgrade to a new image does, starts fresh from the image. So Fennel's orders can't live only inside a container. "Volume" is a Ch 10 ledger term; this chapter can say "storage outside the container" and preview the word. A volume on the same machine's disk is still at risk if that machine is lost (model, Ch 10).

### c-07
objective: o-2
claim: Images are kept in a registry, from which machines with access download ("pull") them; Docker Hub is the default public registry, and organisations can run their own private registry.
source: https://docs.docker.com/reference/cli/docker/image/pull/
quote: "Download an image from a registry" ... "By default, docker pull pulls images from Docker Hub." ... "if you have set up a local registry, you can specify its path to pull from it." ... "Registry credentials are managed by docker login."
confidence: high
note: Build once, push the image to the registry, and every environment (laptops, staging, production) pulls the same artifact. That's the mechanism behind "build once, run anywhere". Cloud providers sell hosted private registries (Amazon ECR, Azure Container Registry and others, per Docker's "What is a registry?" page, not cited to stay in the source cap). Registry vs repository is a distinction managers don't need (parking lot).

### c-08
objective: o-2
claim: A tag (such as "latest", the default) is a name that can later point to a newer image, while a digest identifies exactly one image and always gets that same image.
source: https://docs.docker.com/reference/cli/docker/image/pull/
quote: "If no tag is provided, Docker Engine uses the :latest tag as a default." ... "When using tags, you can docker pull an image again to make sure you have the most up-to-date version of that image." ... "When pulling an image by digest, you specify exactly which version of an image to pull. Doing so, allows you to "pin" an image to that version, and guarantee that the image you're using is always the same."
confidence: high
note: Same page: the local listing shows `debian:bookworm` and `debian:latest` with the same image ID, so one image can carry two tags. Tags are labels, not the image itself. "latest" is just the name used when nobody gave one; nothing guarantees it is the newest or the one that was tested (model judgement, widely held). Trade-off the source states: pinning by digest means "Docker does therefore not pull updated versions of an image, which may include security updates." Manager-level takeaway: "which exact image is in production?" has a precise answer only with a digest or a never-reused version tag. Don't show digest strings beyond one illustrative fragment.

### c-09
objective: o-2
claim: "Run anywhere" has limits: an image built for one processor type (such as Intel/AMD "amd64") won't run on a machine with a different type (such as ARM) without emulation or a multi-platform build.
source: https://docs.docker.com/build/building/multi-platform/
quote: "Containers share the host kernel, which means that the code that's running inside the container must be compatible with the host's architecture. This is why you can't run a linux/amd64 container on an arm64 host (without using emulation), or a Windows container on a Linux host."
confidence: high
note: Why: containers share the host's kernel and run directly on its processor (c-10). Example, model-level: Apple-silicon Macs are ARM while many cloud servers are amd64, a real modern "works on my machine" gap. Docker's own concept page overclaims ("Containers can run anywhere! The container that runs on your development machine will work the same way in a data center or anywhere in the cloud!"). Other limits: config supplied at start differs (c-02); outside services such as the database differ (c-03); Linux containers need a Linux kernel, so on Mac/Windows, Docker Desktop runs them inside a Linux VM (model; the multi-platform page mentions "the Docker Desktop VM").

### c-10
objective: o-3
claim: Each VM runs a whole operating system with its own kernel, while containers on one machine share that machine's kernel, which lets the machine run more applications.
source: https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/
quote: "a VM is an entire operating system with its own kernel, hardware drivers, programs, and applications. Spinning up a VM only to isolate a single application is a lot of overhead." ... "If you run multiple containers, they all share the same kernel, allowing you to run more applications on less infrastructure."
confidence: high
note: Gloss for managers: the kernel is the core of the operating system that runs the hardware and every process. Same page: "Quite often, you will see containers and VMs used together", and a VM with a container runtime can run many containerized apps. In the cloud, the "machine" running Fennel's containers is usually itself a VM, so the two are layers, not rivals. Bridge to Ch 3: many containers per machine is what creates the placement problem.

### c-11
objective: o-3
claim: As a rough rule, containers are measured in megabytes and start in seconds, while VMs are measured in gigabytes and take minutes to boot.
source: https://cloud.google.com/discover/containers-vs-vms
quote: "Size | Megabytes (MBs) | Gigabytes (GBs) | Boot time | Seconds | Minutes" ... "Because containers package only the application code and its dependencies without a full guest OS, they start in seconds and use minimal memory"
confidence: medium
note: Medium: it's a vendor explainer's comparison table (the quote reproduces table cells), giving typical orders of magnitude, not measurements. Hedge on the page: "typically", "roughly". Real images with a full language runtime are often hundreds of MB; the pull reference lists a Debian base image at 124 MB. Modern cloud VMs often boot in well under a minute, and purpose-built microVMs (Firecracker, c-12) start much faster, so prefer "seconds vs. tens of seconds to minutes". Why containers are faster: starting a container starts a process; it skips booting an operating system (c-10). Image *download* time on a fresh machine adds to the first start. No sourced density number. Don't invent "10x more containers".

### c-12
objective: o-3
claim: Container isolation is traditionally considered weaker than a VM's, so cloud providers that run many customers' containers on shared machines wrap them in lightweight VMs, as AWS does for Lambda and Fargate.
source: https://www.usenix.org/conference/nsdi20/presentation/agache
quote: "The traditional view is that there is a choice between virtualization with strong security and high overhead, and container technologies with weaker security and minimal overhead. This tradeoff is unacceptable to public infrastructure providers, who need both strong security and minimal overhead." ... "We have deployed Firecracker in two publically-available serverless compute services at AWS (Lambda and Fargate)"
confidence: high
note: Abstract of Agache et al., "Firecracker: Lightweight Virtualization for Serverless Applications", NSDI '20 (AWS authors). Why weaker: containers on a host share one kernel (c-10), so a flaw in that kernel is shared, whereas VMs each have their own (Google Cloud page: "Virtual machines are isolated from each other, which can help to prevent attacks from spreading between guests"; the same page notes running containers inside VMs for "an extra layer of isolation" in regulated industries). Don't overclaim in either direction. Containers are isolated (own files, own process view, resource shares); the wall is thinner, not absent. For a single company running its own code, the trade-off is usually acceptable; the multi-customer case is what drives providers to VMs.
