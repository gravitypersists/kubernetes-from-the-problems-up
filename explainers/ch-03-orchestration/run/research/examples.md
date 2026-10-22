# Examples

### x-01
objective: o-1
example: Fragmentation with real numbers. A group of machines has 100 GB of memory free in total, but split as 10 GB on each of 10 machines, so a job needing 20 GB can't start anywhere. CPU version: 8 cores free in total, as half a core on each of 16 machines, can't take one 4-core job.
why: It makes "fits nowhere though there's room" concrete and countable. That's the widget's phase-2 moment and local-02. It scales down to the widget: 4 machines, a dozen chips. Breaks down: real placement juggles memory *and* processor at once (a machine can have spare CPU but no memory), which the widget may simplify to one size. Say so if it does. Avoid the source's words "pending" and "scheduled" (Ch 5).
source: https://docs.cloudera.com/data-engineering/1.5.5/deployment-architecture/topics/cde-private-cloud-general-guidelines.html

### x-02
objective: o-2
example: Fennel's idle machines, done honestly. Industry estimates put the typical one-app-per-server machine at roughly 12–18% busy (c-04). Fennel's ~8 machines got there the same way: each service was given its own machines plus headroom "to be safe", and spare machines were kept for failures. That's why Morgan sees half of them mostly idle.
why: It connects the sourced figure to the story without claiming a Fennel percentage. It also shows *why* hand placement leaves idle spend: people pad for safety and keep spares, because moving things later is slow and risky. Breaks down: the 12–18% is a 2014 estimate for corporate data centers, not a measurement of anyone's container fleet. Some idle headroom is deliberate and good (room to absorb a failed machine), so "idle" is not all waste. Ch 5 owns how much headroom is right.
source: model

### x-03
objective: o-1
example: A moved container is at a new address. At Google, a container moved to another machine got a new port number, so "service clients do not know the port number assigned to the service a priori and have to be told" (c-02). In Fennel terms: Sam moves `orders` from machine 3 to machine 6 at 3 a.m., and `storefront` still calls machine 3 until someone edits its settings and the spreadsheet.
why: It turns "connecting" from an abstraction into a second chore that rides along with every move. It also explains why the spreadsheet drifts (q-4). Breaks down: modern setups hide this behind stable names (Ch 7). Present it as the problem, not the solution.
source: https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/44843.pdf

### x-04
objective: o-3
example: Management analogy for the orchestrator: a shift supervisor (or, in Fennel's world, a delivery dispatcher) for a team of workers across several sites. Today Sam does it by hand: who works where, cover when someone goes home sick, extra staff for the Friday rush, swapping in the new procedure without closing the shop. An orchestrator is that supervisor's job, done continuously by software, across a pool of machines treated as one (the cluster).
why: Each job maps to a supervisor's chore: placement = rostering, replacing = covering a no-show, scaling = calling in staff for the rush, updating = changing procedure mid-shift, connecting = telling customers which counter to go to. Where it breaks: a human supervisor uses judgement, negotiates and notices when something is "off", while an orchestrator follows rules with no judgement (it will keep restarting a broken app; Ch 4's analogy note). And it's not one all-seeing boss issuing every order (m-03, Ch 4).
source: model

### x-05
objective: o-3
example: Docker vs Kubernetes, as a layering example (not an analogy). A developer runs `docker build` to make a `storefront` image and `docker run` to try it on a laptop: one machine. The same image is pushed to the registry, and the orchestrator decides which of the cluster's machines run copies of it, and keeps them running. Docker made the box; the orchestrator keeps boxes running across the fleet.
why: It places Docker exactly where Ch 2 left it (build and run on one machine) and Kubernetes one layer up, and shows they are used together (c-11). Breaks down: Docker also had its own multi-machine orchestrator (Docker Swarm, c-07), and Kubernetes no longer uses Docker's engine inside the cluster (c-12). Both are fine to omit or give one clause; neither changes the layering for a manager.
source: https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/
