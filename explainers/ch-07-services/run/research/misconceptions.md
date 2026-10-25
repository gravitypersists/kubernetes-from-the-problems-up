# Misconceptions

Catalog IDs from CURRICULUM.md §6 where they exist; new ones are `local-NN` (to propose at the checkpoint).

### m-10
objective: o-2
misconception: A Service is a server: a program or box that sits between callers and Pods, receives every request and passes it on, so it can crash, get overloaded, or need its own capacity and copies.
why_tempting: The word "service" already means a running program at Fennel (`orders` is "a service"). A Service has its own address and DNS name, which is what servers have. Diagrams draw it as a box with arrows going through it, and the outside load balancer (c-08) really is a machine the provider runs.
counter: c-02, c-03, c-05
source: CURRICULUM.md §6 m-10 and the chapter entry's "Where it breaks" line; the Kubernetes docs answer it directly: kube-proxy configures each node "to capture traffic to the Service's `clusterIP` and `port`, and redirect that traffic to one of the Service's endpoints" (https://kubernetes.io/docs/reference/networking/virtual-ips/)

Notes for the designer: the fair part is that something does have to run for Services to work: the EndpointSlice controller (one loop in the control plane, c-03) and kube-proxy or its replacement on every node (c-05). But nothing sits in the path of a request as "the Service": the caller's own node sends the connection straight to a Pod. If those parts stop, existing rules keep forwarding while the list goes stale; that's a different failure from "the Service went down". Two names collide on the page: Fennel's services (`orders`, lowercase, code font) and the Kubernetes kind Service (capitalised, §2.12). The chapter should say once that each Fennel service has a Service of the same name.

### local-01
objective: o-2
misconception: The Service checks whether its Pods are healthy and stops sending traffic to broken ones.
why_tempting: Cloud load balancers do run their own health checks, so people expect the same here; and in Ch 6 "only ready Pods get traffic" sounded like a property of the Service.
counter: c-04, c-03
source: model (inferred from how the docs split the work: the Pod's readiness check sets its Ready condition, and the EndpointSlice's `serving` condition "maps to the Pod's `Ready` condition", https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/); Ch 6 claims 06–07

Notes: the Service does no checking of its own. It trusts the Pod's readiness check, so a Pod with no readiness probe, or one whose check passes while the app is wrong (Ch 6's $0 `catalog` v64, m-33), keeps getting traffic. This is the retrieval bridge to Ch 6's k-05.

### local-02
objective: o-2
misconception: A Service balances load: it sends each request to the least busy Pod, or shares requests out evenly.
why_tempting: Docs and engineers say Services "load-balance"; the outside load balancer has real balancing settings; "spreads traffic" sounds like "evens out load".
counter: c-05
source: model (the belief); the counter is the virtual-IPs page: rules "by default, select a backend Pod at random", chosen when "a client connects" (https://kubernetes.io/docs/reference/networking/virtual-ips/)

Notes: random per connection, not per request and not by load. Over many short connections that comes out roughly even. A caller that keeps one connection open for a long time (common for database drivers, gRPC and connection pools) sends all its requests to one Pod, so a newly added Pod may get little traffic until connections reopen. That second half is a pick-up for Ch 8 (adding copies doesn't spread existing connections) and Ch 13 (a service mesh can balance per request; unverified here). Keep it to one sentence plus a disclosure here.

### local-03
objective: o-3
misconception: Every service needs its own load balancer, both for services to call each other and to be reachable from the internet.
why_tempting: Before Kubernetes, putting a load balancer in front of each app was the standard pattern; `type: LoadBalancer` is one line in a manifest, so it feels free; and "load balancer" is the word engineers use for both the internal spreading (c-05) and the outside machine (c-08).
counter: c-02, c-08, c-09, c-12
source: model (the belief); the chapter entry's conversation line "We want a separate load balancer for every service" (CURRICULUM.md §7 Ch 7)

Notes: calls inside the cluster (`storefront` → `orders`) use the Service's cluster IP and need no load balancer. Only the entry points customers reach need one, and one gateway or ingress can route to many Services behind one load balancer (c-09). Each `type: LoadBalancer` Service is a separate provider machine with its own hourly charge (c-12). There are real reasons to have more than one (non-web traffic, separating teams or risk), so the chapter's question stands as a question: "What does each one cost? Could one ingress or gateway route to all of them?"
