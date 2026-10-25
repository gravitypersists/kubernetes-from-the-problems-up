# Facts

Light depth: 12 claims from eight sources, read on 2026-10-24. The Kubernetes pages were read from the kubernetes/website source on GitHub (`main`), which is what kubernetes.io renders; kube-proxy's behaviour with no Pods was read from the kubernetes/kubernetes source; prices from AWS's public pricing page. Earlier chapters' claims are reused by reference and written as "Ch N claim NN" so they don't collide with this file's IDs:

- Ch 4 claim 06 (a controller is a never-ending loop that watches one kind of thing and nudges reality toward the record), Ch 4 claim 08 (loops act by writing into the record; other loops pick it up), Ch 4 claim 12 (the ReplicaSet loop replaces lost Pods with new ones), Ch 4 claim 18 (Pods are disposable). `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/facts.md`
- Ch 6 claim 03 (during a rolling update old and new Pods both run; with 3 copies at least 3 stay available), Ch 6 claim 06 (a failed readiness check takes the Pod out of traffic without restarting it), Ch 6 claim 07 (with no readiness probe, a Pod counts as ready as soon as its containers are running). `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/research/facts.md`
- Ch 3 claim 02 (when a container moves, its address can change, so every caller must be told the new one). `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/facts.md`

## Questions
- q-1: answered — c-01, c-02, c-03, c-04, c-05. How quickly a change reaches callers: c-05's note (hedged: usually within seconds; kube-proxy waits at most 1 s by default before rewriting a node's rules, after the readiness check, Pod status and EndpointSlice updates). During a rolling update: c-04 with Ch 6 claim 03 (old and new ready Pods are both in the list, so callers are spread across both versions); a terminating old Pod drops out of the list (c-04 note). When a Pod stops being ready: Ch 6 claim 06 plus c-04.
- q-2: answered — c-06, c-01, c-04. A selector matching no Pods, or a Service whose Pods are all unready, gets a "reject" rule, so callers see "connection refused" at once (c-06). A Pod's address used directly goes stale on replacement (c-01; usually a timeout, sometimes refused, c-06 note, medium confidence). Traffic before readiness: Ch 6 claim 07 plus c-06's note (refused while the app hasn't started listening). Long-lived connections: c-05 (the Pod is picked when a connection opens) and misconception local-02. Fit for Fennel's incident: examples x-02.
- q-3: answered — c-07. Why DNS points at the Service's one address, not at each Pod (DNS answers get cached past their expiry): c-07's note. Headless Services named only: c-07's note and the parking lot (Ch 10).
- q-4: answered — c-08, c-09, c-10, c-11, c-12. What the provider runs vs. what the team installs: c-08 (the provider's integration creates the load balancer), c-09 note (an Ingress or Gateway does nothing without a controller, which some providers offer and others leave to the team). Cost for Fennel: examples x-04.
- q-5: answered — c-05, c-04, c-08, c-09. Misconceptions m-10, local-01 to local-03. Service mesh in one sentence: parking lot (Ch 13), from Istio's own definition; not promoted to a claim because the claim cap is full and the chapter only names it.

## Claims

### c-01
objective: o-1
claim: Every Pod gets its own network address, and the set of Pods running an app can be different from one moment to the next, so callers can't keep track of the addresses themselves.
source: https://kubernetes.io/docs/concepts/services-networking/service/
quote: "Each Pod gets its own IP address (Kubernetes expects network plugins to ensure this). For a given Deployment in your cluster, the set of Pods running in one moment in time could be different from the set of Pods running that application a moment later." ... "how do the frontends find out and keep track of which IP address to connect to"
confidence: high
note: Same page: "Pods are ephemeral resources (you should not expect that an individual Pod is reliable and durable)." A replacement Pod (Ch 4's `orders-5c8x` → `orders-q2rw`) is a new Pod with a new address; Ch 4 claim 12. Safe simplification: "a new Pod, a new address". What a caller sees if it kept the old address: see c-06's note.

### c-02
objective: o-2
claim: A Service gets one virtual address of its own, the cluster IP, that callers use instead of any Pod's address and that stays the same while the Pods behind it change.
source: https://kubernetes.io/docs/concepts/services-networking/service/
quote: "Kubernetes assigns this Service an IP address (the _cluster IP_), that is used by the virtual IP address mechanism." ... "While the actual Pods that compose the backend set may change, the frontend clients should not need to be aware of that, nor should they need to keep track of the set of backends themselves."
confidence: high
note: "Virtual": no machine or process owns that address; the nodes' forwarding rules (c-05) catch traffic sent to it. The default Service type is ClusterIP, reachable only inside the cluster (same page: "ClusterIP ... This is the default that is used if you don't explicitly specify a `type` for a Service"). A shortened manifest the chapter may show: `kind: Service`, `name: orders`, `selector: app: orders`, a `port`. The selector matches Pod labels; the page's example "targets TCP port 9376 on any Pod with the `app.kubernetes.io/name: MyApp` label".

### c-03
objective: o-2
claim: A loop, the EndpointSlice controller, continually looks for the Pods that match each Service's selector and keeps that Service's list of Pod addresses (its EndpointSlices) up to date.
source: https://kubernetes.io/docs/concepts/services-networking/service/
quote: "The controller for that Service continuously scans for Pods that match its selector, and then makes any necessary updates to the set of EndpointSlices for the Service."
confidence: high
note: The Debug Services task page says the same in loop terms: "Inside the Kubernetes system is a control loop which evaluates the selector of every Service and saves the results into one or more EndpointSlice objects" (https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/). The EndpointSlice page: the control plane's controller sets `endpointslice-controller.k8s.io` as the manager, and runs inside the kube-controller-manager. Loop lens row: wants (the Service's selector) · sees (which matching Pods exist and which are ready) · does (rewrites the Service's address list). Like other loops (Ch 4 claim 08), it only writes the record; kube-proxy on each node acts on it (c-05). "EndpointSlice" can stay an engineer's word; "the Service's list of ready Pods" is safe for this audience.

### c-04
objective: o-2
claim: By default, only Pods that are ready, and not shutting down, are used as destinations for a Service's traffic; a Pod that fails its readiness check drops out of the list.
source: https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/
quote: "The `serving` condition indicates that the endpoint is currently serving responses, and so it should be used as a target for Service traffic. For endpoints backed by a Pod, this maps to the Pod's `Ready` condition." ... "Service proxies will normally ignore endpoints that are `terminating`"
confidence: high
note: "Ready" is "serving and not terminating" (same page). A Pod is marked terminating "when the Pod is first deleted ... but most likely before the Pod's containers exit", so during a rolling update an old Pod leaves the list as soon as it's told to stop. Exception for a disclosure only: if every listed Pod is terminating, proxies "may route traffic to endpoints that are both `serving` and `terminating`" ("helps to ensure that no Service traffic is lost during rolling updates"). A team can override readiness with `publishNotReadyAddresses` (rare; "by default"). The Service relies entirely on the readiness check (Ch 6 claims 06–07): it doesn't test Pods itself, and with no readiness probe a running Pod counts as ready.

### c-05
objective: o-2
claim: On every node, kube-proxy (or a replacement component) turns each Service into forwarding rules on that node, which send each new connection to one of the listed Pods, picked at random by default.
source: https://kubernetes.io/docs/reference/networking/virtual-ips/
quote: "Each instance of kube-proxy watches the Kubernetes control plane for the addition and removal of Service and EndpointSlice objects. For each Service, kube-proxy calls appropriate APIs ... to configure the node to capture traffic to the Service's `clusterIP` and `port`, and redirect that traffic to one of the Service's endpoints" ... "installs iptables rules which, by default, select a backend Pod at random."
confidence: high
note: So no Service process exists to crash or overload: the Service is a record, carried out as rules in each node's operating system (m-10). Same page: "A control loop ensures that the rules on each node are reliably synchronized with the Service and EndpointSlice state". Random in both the default `iptables` mode and the `nftables` mode (which "by default, select a backend Pod at random"); the deprecated `ipvs` mode can do round-robin or least-connection. Not by load, and per connection, not per request: "When a client connects to the Service's virtual IP address the iptables rule kicks in. A backend is chosen (either based on session affinity or randomly)", so a long-lived connection keeps going to the Pod it started on. "Or a replacement": the page says kube-proxy runs "unless you have deployed your own alternative component in place of `kube-proxy`"; some providers' network add-ons do this job themselves (name only; network plugins are out of scope). **Timing (confidence medium):** kube-proxy batches changes and, with the default `minSyncPeriod` of 1 s, "each individual change may end up waiting up to the full `minSyncPeriod`"; the whole chain (a readiness check fails or passes, the Pod's status changes, the EndpointSlice controller rewrites the list, every node rewrites its rules) is usually a matter of seconds, depending mostly on how often the readiness check runs (Ch 6). Hedge as "within seconds, usually".

### c-06
objective: o-1
claim: When a Service has no ready Pods at all, for example because its selector matches none, kube-proxy installs a rule that rejects connections to it, so callers get "connection refused" at once rather than a wait.
source: https://github.com/kubernetes/kubernetes/blob/master/pkg/proxy/iptables/proxier.go
quote: "// The service has no endpoints at all; ... only rules in the \"filter\" table rejecting incoming packets for the service's IPs. internalTrafficFilterTarget = \"REJECT\" internalTrafficFilterComment = fmt.Sprintf(`\"%s has no endpoints\"`, svcPortNameString)"
confidence: medium
note: Read from kube-proxy's iptables mode, the default (c-05). Medium because the "connection refused" wording is inferred: a plain `REJECT` answers with an ICMP "port unreachable", which Linux reports to a connecting program as "connection refused" (Linux connect(2) man page: "ECONNREFUSED A connect() on a stream socket found no one listening on the remote address"; the macOS page: "ignored (because the target is not listening for connections) or explicitly rejected"); replacement proxies may behave differently. The Debug Services page's first check for a Service that doesn't answer is whether its list is empty: "If the `ENDPOINTS` column is `<none>`, you should check that the `spec.selector` field of your Service actually selects for `metadata.labels` values on your Pods." Related cases, from general networking (model knowledge, not separately sourced; keep hedged): a caller that kept a Pod's old address after the Pod was replaced usually waits and times out (nothing answers at that address), or is refused if a new Pod has since been given the address; a Pod that is listed before its app has started listening (no readiness probe, Ch 6 claim 07) refuses connections until it is.

### c-07
objective: o-2
claim: Each Service gets a DNS name of the form `orders.<namespace>.svc.cluster.local` that points at its cluster IP, and a caller in the same namespace can use just `orders`.
source: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/
quote: "\"Normal\" (not headless) Services are assigned DNS A and/or AAAA records ... with a name of the form `my-svc.my-namespace.svc.cluster-domain.example`. This resolves to the cluster IP of the Service." ... "a query for just `data` may be expanded to `data.test.svc.cluster.local`."
confidence: high
note: `cluster.local` is the usual default cluster domain; the page's generic form is `cluster-domain.example`. A namespace can be glossed as "a team's area of the cluster, Chapter 11"; from another namespace a caller writes `orders.<namespace>`. Who keeps the name pointing at the address: the cluster's DNS service, programmed from the Service records ("Kubernetes publishes information about Pods and Services which is used to program DNS"); since the cluster IP doesn't change, the DNS answer doesn't need to. Why the name points at the Service and not at every Pod (virtual-IPs page, the source of c-05): "There is a long history of DNS implementations not respecting record TTLs, and caching the results of name lookups after they should have expired" and "Some apps do DNS lookups only once and cache the results indefinitely." The exception: a headless Service has no cluster IP and its name "resolves to the set of IPs of all of the Pods selected by the Service" (name only; Ch 10).

### c-08
objective: o-3
claim: Setting a Service's type to LoadBalancer makes the cloud provider create an external load balancer for that one Service, so each such Service gets its own load balancer and public address.
source: https://kubernetes.io/docs/concepts/services-networking/service/
quote: "On cloud providers which support external load balancers, setting the `type` field to `LoadBalancer` provisions a load balancer for your Service. The actual creation of the load balancer happens asynchronously" ... "Traffic from the external load balancer is directed at the backend Pods. The cloud provider decides how it is load balanced."
confidence: high
note: The provider's integration (the cloud-controller-manager) "configures the external load balancer to forward traffic to that assigned node port", so it's the provider's machine, created on request, not something the team runs. "One per Service" follows from the field being set per Service; providers bill each one separately (c-12). Internal calls between services (`storefront` → `orders`) need no load balancer: they use the Service's cluster IP (c-02). Ingress isn't needed for non-web traffic; the Ingress page: "Exposing services other than HTTP and HTTPS to the internet typically uses a service of type ... LoadBalancer".

### c-09
objective: o-3
claim: An Ingress, or its successor the Gateway API, gives a cluster one entry point for web traffic that routes requests to many Services by host name or path, behind a single listener.
source: https://kubernetes.io/docs/concepts/services-networking/service/
quote: "Ingress is not a Service type, but it acts as the entry point for your cluster. An Ingress lets you consolidate your routing rules into a single resource, so that you can expose multiple components of your workload, running separately in your cluster, behind a single listener." ... "The Gateway API for Kubernetes provides extra capabilities beyond Ingress and Service."
confidence: high
note: By host or path: the Ingress page (source of c-10) says an Ingress can "give Services externally-reachable URLs, load balance traffic, terminate SSL / TLS, and offer name-based virtual hosting", and its rules match by host (e.g. `foo.bar.com`) and by path (e.g. `/foo`). Neither does anything alone: "You must have an Ingress controller to satisfy an Ingress. Only creating an Ingress resource has no effect"; an Ingress controller fulfils it "usually with a load balancer". Gateway API is "an add-on" with four stable kinds (GatewayClass, Gateway, HTTPRoute, GRPCRoute), where a Gateway is "an instance of traffic handling infrastructure, such as cloud load balancer" and an HTTPRoute maps traffic to backends "often represented as a Service" (https://kubernetes.io/docs/concepts/services-networking/gateway/). Who runs it: the controller is either the cloud provider's (the docs list the AWS and GCE controllers as maintained by the project) or software the team installs and upgrades. In the usual cloud set-up a single cloud load balancer sits in front of that one entry point. Gateway API v1.6.0 was released on 30 June 2026 (Kubernetes blog, 2026-08-03).

### c-10
objective: o-3
claim: The Kubernetes project has frozen the Ingress API and recommends the Gateway API instead; Ingress stays available and won't be removed, but will get no further changes.
source: https://kubernetes.io/docs/concepts/services-networking/ingress/
quote: "The Kubernetes project recommends using Gateway instead of Ingress. The Ingress API has been frozen." ... "The Kubernetes project has no plans to remove Ingress from Kubernetes." ... "The Ingress API is no longer being developed, and will have no further changes or updates made to it."
confidence: high
note: Status as of the page source read on 2026-10-24; the same note heads the Ingress Controllers page. Safe for managers: "Ingress still works and is widely used; new set-ups are pointed at Gateway API". The Kubernetes blog (2025-11-11) calls Gateway API "the modern replacement for Ingress".

### c-11
objective: o-3
claim: Ingress NGINX, one of the most widely used ingress controllers, was retired by the Kubernetes project in March 2026: existing installations keep working, but get no further releases or security fixes.
source: https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/
quote: "In March 2026, Ingress NGINX maintenance will be halted, and the project will be retired. After that time, there will be no further releases, no bugfixes, and no updates to resolve any security vulnerabilities that may be discovered." ... "Existing deployments of Ingress NGINX will not be broken."
confidence: high
note: The retirement happened on schedule: "Kubernetes SIG Network and the Security Response Committee have retired Ingress NGINX on March 24, 2026" (Kubernetes v1.36 sneak peek, https://kubernetes.io/blog/2026/03/30/kubernetes-v1-36-sneak-peek/). Scale (Steering and Security Response Committees' statement, 2026-01-29, https://kubernetes.io/blog/2026/01/29/ingress-nginx-statement/): "According to internal Datadog research, about 50% of cloud native environments currently rely on this tool" and "None of the available alternatives are direct drop-in replacements. This will require planning and engineering time." Cause (2025-11-11 post): "For years, the project has had only one or two people doing development work, on their own time". The Ingress API itself is not retired (c-10); only this one controller. Not to be confused with F5's separately named "NGINX Ingress Controller", which is listed on the Ingress Controllers page and is a different project. A good real-world example for Ch 13–14 ("every tool added is something to run and upgrade"); here, one sentence.

### c-12
objective: o-3
claim: On AWS in the US East (N. Virginia) region, an Application Load Balancer costs $0.0225 an hour, about $16 a month, before usage charges of $0.008 per capacity unit-hour.
source: https://aws.amazon.com/elasticloadbalancing/pricing/
quote: "Adding the hourly charge of $0.0225, the total Application Load Balancer costs are:" ... "resulting in a total charge of $0.00864 per hour (1.08 LCUs * $0.008 per LCU)" ... "$22.42 per month"
confidence: high
note: One provider, one region, read 2026-10-24; label it so on the page, and prices change. The figures come from AWS's worked "US-East-1" example (the page has no plain table in its text); $0.0225 × 730 hours ≈ $16.43 a month per load balancer before usage. A capacity unit (LCU) is whichever is highest of: "25 new connections per second", "3,000 active connections per minute", "1 GB per hour" processed for EC2/container/IP targets, "1,000 rule evaluations per second". AWS's worked example (one new connection a second, five requests a second, 300 KB/s) totals "$22.42 per month". The page's Network Load Balancer examples use the same $0.0225 hourly charge with $0.006 per NLCU (medium: seen in examples only). New AWS customers get a free tier of 750 load-balancer hours a month shared between Classic and Application load balancers. For a handful of services the money is modest (x-04); the stronger case for one gateway is one public entry point to secure, certify and watch.
