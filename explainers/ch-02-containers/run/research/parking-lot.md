# Parking lot

- Docker is one company and tool. Other tools run the same images because the image format is an open standard (Open Container Initiative). Unverified here; Ch 3 owns m-02 (Docker vs Kubernetes). (model; opencontainers.org)
- Images are built in layers, so rebuilds and downloads reuse unchanged layers. That's why rebuilding is fast and storage is shared. (https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/)
- Docker restart policies restart a crashed container on the *same* machine. Not fetched; useful only to say this doesn't cover a dead machine. (https://docs.docker.com/engine/containers/start-containers-automatically/)
- Pinning by digest stops you getting security updates automatically: a real trade-off. (https://docs.docker.com/reference/cli/docker/image/pull/)
- Public images carry supply-chain trust questions; Docker Hub offers Official/Hardened/Verified tiers. (https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/)
- Registry vs repository: a repository is a collection of related images within a registry. (https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-registry/)
- Firecracker microVM boot-time and memory figures exist in the NSDI '20 paper but weren't extractable here. (https://www.usenix.org/system/files/nsdi20-paper-agache.pdf)
- On Mac and Windows, Docker Desktop runs Linux containers inside a Linux VM. (https://docs.docker.com/build/building/multi-platform/)
- Container-based dev environments (Compose, dev containers) are the usual answer to week-long onboarding; tooling detail is out of scope. (model)
- Twelve-Factor's "time gap" and "personnel gap" between dev and prod. (https://12factor.net/dev-prod-parity)
- Old images can be deleted from registries, so "roll back to last month's image" assumes someone kept it. Relevant to Ch 6 rollbacks. (model)
