# Parking lot

- The Borg/Kubernetes authors call their design "control through choreography" (many small loops), in contrast to "a centralized orchestration system": Ch 4 material for m-03 (https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/44843.pdf)
- Borg assigned each container a port and Kubernetes chose one IP per pod to avoid that pain: Ch 7 background (same PDF)
- Kubernetes adopted Borg's health-check idea (a /healthz endpoint; unhealthy apps "automatically terminated and restarted"): Ch 4/6 (same PDF)
- Google contributed much of the Linux kernel's container code; containers at Google predate Docker by years (same PDF; https://kubernetes.io/blog/2024/06/06/10-years-of-kubernetes/)
- Up to 30% of servers in corporate data centers were estimated "comatose" (no longer used but still powered) in NRDC 2014: secondhand via press coverage, not verified (https://www.fmlink.com/nrdc-data-center-report-up-to-30-of-servers-no-longer-used-yet-consume-vast-amounts-of-energy/)
- Kubernetes release cadence went from 4 to 3 releases a year (April 2021) and the support window grew to 1 year in 1.19: Ch 14 material (https://kubernetes.io/blog/2024/06/06/10-years-of-kubernetes/)
- "Kubernetes" is Greek for helmsman/pilot, and "K8s" counts the 8 letters between K and s (model)
- Docker, Inc. (formerly dotCloud) is the company. Docker Desktop bundles an optional single-machine Kubernetes for developers (model)
- Other orchestrators to name only: HashiCorp Nomad, AWS ECS, Apache Mesos (largely retired): Ch 14 (model; Mesos and Swarm named at https://www.redhat.com/en/topics/containers/what-is-container-orchestration)
- Kubernetes "does not deploy source code and does not build your application" and "is not a traditional, all-inclusive PaaS": Ch 14 scope (https://kubernetes.io/docs/concepts/overview/)
- Google SRE survey: average SRE toil about 33%, with outliers at 80%: a team-load-balancing point for managers (https://sre.google/sre-book/eliminating-toil/)
- DORA / State of DevOps reports would be the source for deploy-pain metrics (deployment frequency, change failure rate) if a later chapter (Ch 6) wants numbers (model)
