# Misconceptions

Catalog IDs from CURRICULUM.md §6 where they exist. Ch 2 owns m-01 and revisits m-19 (owned by Ch 1) with the fix. local-01 and local-02 are new; both are candidates for catalog entries at the checkpoint.

### m-01
objective: o-3
misconception: "A container is just a small virtual machine": it has its own operating system, the same isolation, only lighter.
why_tempting: Both look like "a separate computer for one app" from the outside: own files, own processes, own network address, and they're often drawn as similar boxes. Many explainers present them as two sizes of the same thing.
counter: c-10, c-11, c-12
source: https://www.docker.com/blog/containers-are-not-vms/
note: The Docker blog post's title, "Containers are not VMs", shows the confusion is common enough that the vendor wrote against it; CURRICULUM.md §6 lists it as m-01. Fair correction: a container is a walled-off process sharing the host's kernel (c-10). That's why it's small and quick (c-11), and why its wall is thinner (c-12). Don't swing to "containers are insecure"; providers wrap them in VMs for *multi-customer* isolation. Also: containers often run *inside* VMs (c-10 note), so "containers or VMs?" is usually a false choice.

### m-19
objective: o-1
misconception: (revisited) "The code is the app." Ch 2 fixes it by packaging, but the fix invites a new version of the trap: "the image is the whole app."
why_tempting: After Ch 1, the reader knows the runtime and libraries matter. An image visibly bundles them (c-01), so it's natural to think everything the app needs is now inside one sealed box.
counter: c-01, c-02, c-06
source: model
note: The image carries code, runtime and libraries (c-01), which fixes the Ch 1 photo-tool failure. It deliberately leaves out per-environment settings and secrets, handed in at start (c-02), and the data the app writes, which must live outside the container (c-06). Plant this boundary; Ch 9 (config) and Ch 10 (data) own the details.

### local-01
objective: o-4
misconception: Once everything is containerized, a machine failure is no longer a problem: the containers will keep themselves running.
why_tempting: Containers do make the software trivially re-creatable: pull the image, start it, done in seconds (c-07, c-11). That feels like the Ch 1 "box vanishes" problem is solved.
counter: c-05, c-06
source: model
note: A container is a process on one machine (c-05): if the machine dies, its containers die with it, and nothing in the image notices, picks another machine and starts them there. Data written inside them is gone (c-06). Rebuilding is now fast; *someone or something* still has to do it, at 3 a.m., for every container on that machine. That's the chapter's closing question and Ch 3's job list (placement, restarting, replacing, updating). Docker can restart a crashed container on the *same* machine (parking lot, unverified here). Say only that it doesn't help when the machine itself is gone.

### local-02
objective: o-2
misconception: If an image passed in staging, it will behave identically in production: "build once, run anywhere" means identical behaviour everywhere.
why_tempting: The image really is byte-for-byte the same artifact everywhere (c-04, c-07), and vendor copy says so outright ("will work the same way in a data center or anywhere in the cloud", Docker concept page, c-09 note).
counter: c-02, c-03, c-08, c-09
source: model
note: What's identical is what's *inside* the image. Still different: settings and secrets handed in at start (c-02); outside services such as the database (c-03); which image a tag points to if someone pulls "latest" again (c-08); and the processor type of the machine (c-09). The honest guarantee is "the app and its dependencies are the same", which removes the biggest class of "works on my machine" bugs, not all of them. Good material for an equally-measured check distractor set.
