# Examples

### x-01
objective: o-1
example: Fennel, Year 1 (fiction). A new engineer's laptop has version 7 of the photo-resizing tool (Ch 1's hand-installed tool), freshly installed. Production still has version 6, the one Sam installed by hand in Year 0. The engineer's new code uses an option that only version 7 understands. Tests pass on the laptop and photo upload fails in production; nobody can reproduce it locally. Same code, one dependency version different. With an image, the tool's version is chosen once, inside the image, and the laptop, staging and production all run that same image.
why: This is the "contrasting cases" pain in the page (predict, then reveal), and it reuses Ch 1's established photo tool, so retrieval and the new idea meet in one case. It fits `w-rebuild` stage 4's row-by-row comparison (a LIBRARIES & TOOLS row that differs). Mechanism sourced: Ch 1 claim 01 (12factor.net/dependencies names ImageMagick and version incompatibility) and c-03. The version numbers and the option are invented for Fennel. Don't attribute them to a real tool's release history.
source: model

### x-02
objective: o-2
example: Image vs container as "the app installed on your laptop" vs "the app open in a window". You can open two windows of the same program (two containers from one image). Scribbles in an unsaved window vanish when you close it (c-06), and the installed program is untouched (c-04).
why: It makes "one artifact, many running instances" and "running copies don't change the original" visible to someone who has never run a server. Breaks down: (1) an image carries much more than the program, including the runtime, libraries and OS packages (c-01); (2) an installed program can be patched in place, but an image can't be changed at all, so a change means a new image (c-04); (3) each container is walled off from the others (c-05), unlike two windows of one app.
source: model

### x-03
objective: o-3
example: Docker's own analogy: VMs are houses, containers are apartments. Each house has its own foundation, plumbing and wiring (its own OS and kernel). Apartments share the building's foundation and plumbing (the host kernel) but have their own locked doors.
why: It shows at once why containers are cheaper and denser (shared infrastructure, c-10) and why their isolation is thinner (a burst pipe in the shared plumbing floods every flat, a shared-kernel flaw; c-12). Breaks down: containers routinely run *inside* VMs (apartments inside a house), and the analogy says nothing about start-up time. Don't stretch it to security policy.
source: https://www.docker.com/blog/containers-are-not-vms/

### x-04
objective: o-2
example: The name's origin: the standard shipping container. Before it, cargo was loaded piece by piece and handled differently at every port. After it, any ship, crane or truck moves the same sealed box without caring what's inside. Software images aim for the same: a sealed, standard package that any machine with a container runtime can run.
why: It's the most common framing managers will hear, and it carries "standard package, the same everywhere" (c-01, c-07). Breaks down exactly where c-09 says. A real shipping container doesn't care about the ship, but a software container does depend on the host's processor type and its kernel (c-09, c-10), and some of its settings are handed in at the destination (c-02). Use it, then name the break; that's itself the "build once, run anywhere has limits" lesson.
source: model

### x-05
objective: o-2
example: Tag vs digest as "a link called 'Q3 plan, latest'" vs "the fingerprint of one saved version". Anyone can repoint the "latest" link at a new draft. The fingerprint is computed from the content itself, so it matches one exact version forever and changes if a single byte changes.
why: It makes c-08 concrete and gives managers the question "which exact image is in production?". The fingerprint part is accurate: Docker's image ID "is a SHA256 digest covering the image's configuration and layers" (docker image pull reference). Breaks down: a document's version history is kept for you, but old images can be deleted from a registry if nobody keeps them (model; parking-lot material).
source: https://docs.docker.com/reference/cli/docker/image/pull/
