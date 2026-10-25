# Accuracy review: round 1

## Summary
The page is accurate on what it sets out to teach, and nothing in it blocks. The Service as a record with a stable cluster IP, the endpoints loop, kube-proxy's per-node rules, random choice per connection, the restart that keeps its address, the refusal on an empty list, the dated Ingress and Ingress NGINX facts, and the price arithmetic all check out against facts.md and the sources I re-read. All illustrative addresses match across f-01, f-02, f-03, f-04, f-05, lane S and the prose, and the story numbers match CURRICULUM §3. I found five `should` findings. The most important: lane S3 says no new call ever reaches a stopping Pod, and implies that the Deployment loop waits for the list. Also, the per-Service load-balancer cost is priced as an Application Load Balancer, which on AWS is the ingress/gateway product.

## Findings

### new
severity: should
criterion: o-2 (what callers see during a rollout)
location: w-services-scrolly lane S, step S3 text (`site/widgets/w-services-scrolly/data.js`, `CLUSTER_LANES.S.steps[2].text`, both paragraphs); screenshot `run/screenshots/probe/acc-r1-s3.png`
evidence: (1) "The v63 Pod passes its check, and within seconds, usually, the endpoints loop has put its address on the list. **Only then** does the Deployment loop tell a v62 Pod on node 06 to stop." The Deployment loop waits for the new Pod to be ready, not for the endpoints loop to list it. The two loops react to the same readiness change independently (Ch 6's own account: the Deployment loop "removes an old Pod only once a new one has passed its check"). "Only then" invents a hand-off between loops, which contradicts the page's own "independent loops" model (Ch 4 claim 08). (2) "That Pod's address comes off the list as soon as it is told to stop, before its container has even exited, **so no new call is sent to a Pod on its way out**." The Pod lifecycle docs say the removal runs concurrently with shutdown: "At the same time as the kubelet is starting graceful shutdown of the Pod, the control plane evaluates whether to remove that shutting-down Pod from EndpointSlice objects" (https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/, Pod Termination Flow). Each node's rules then follow within about a second (c-05 note: kube-proxy may wait "up to the full `minSyncPeriod`", 1 s by default). So a few new connections can still reach a stopping Pod. That is why the docs say apps "should start terminating and finish processing open connections", and research parking-lot entry 11 flags exactly this ("callers ... with slightly stale rules can still hit it for a moment").
expected_fix: (1) Replace "Only then does the Deployment loop tell…" with something like "Seeing the same Pod ready, the Deployment loop tells a v62 Pod on node 06 to stop." (2) Soften the absolute, for example: "That Pod's address comes off the list as soon as it is told to stop, before its container has even exited, so within a moment new calls stop going to a Pod on its way out." If the builder wants the race named, add a disclosure line: apps are written to finish what they have when told to stop (Ch 12). The W-01 caption ("leaves it at once") and the lens-table row are about the list itself, and can stay.
verdict: misleading-simplification

### new
severity: should
criterion: o-3 (weigh one load balancer per service against one gateway, including cost)
location: s-07, the paragraph after f-05 ("On one provider, AWS, an Application Load Balancer in one US region was listed at $0.0225 an hour… A separate one for each of Fennel's six services would be about $99 a month"); k-07 answer ("Each Service of type `LoadBalancer` gets its own provider machine… on one provider, AWS, about $16 a month each"); sources footer item 7
evidence: On AWS, a Service of type LoadBalancer doesn't get an Application Load Balancer. The Amazon EKS user guide says: "When you create a Kubernetes `Service` of type `LoadBalancer`, the AWS cloud provider load balancer controller creates AWS Classic Load Balancers by default, but can also create AWS Network Load Balancers", and the recommended AWS Load Balancer Controller "creates AWS Network Load Balancers". Application Load Balancers are what an ingress provisions: "you deploy a Kubernetes `ingress`, which provisions an AWS Application Load Balancer", and "You can't share a Network Load Balancer across multiple services" (https://docs.aws.amazon.com/eks/latest/userguide/network-load-balancing.html, read 2026-10-24). So the page prices the per-Service option with the product that belongs to the gateway option. The arithmetic survives. The AWS pricing page's US-East-1 examples give the Network Load Balancer the same hourly charge, "$0.0225" (with "$0.006 per NLCU"), as the Application Load Balancer, which I re-read on 2026-10-24. 6 × $0.0225 × 730 ≈ $98.55, and 30 × ≈ $492.75, so "about $99" and "about $490" are correct.
expected_fix: Label the price as both products', for example: "On one provider, AWS, a load balancer in one US region (an Application or a Network Load Balancer: a Service of type LoadBalancer usually gets the second, a gateway the first) was listed at $0.0225 an hour on 24 October 2026…". Or say "a Network Load Balancer" for the per-Service figure and "an Application Load Balancer" for the one in front of the gateway, both at $0.0225 an hour. Adjust sources item 7 to match ("Application and Network Load Balancers in US East (N. Virginia) at $0.0225 an hour"). The numbers don't change.
verdict: misleading-simplification

### new
severity: should
criterion: d-06 (connection refused always hedged); o-2
location: s-09 recap ("In short"), fifth bullet: "When a Service's list is empty, callers are refused at once, and the fix is more ready Pods, not a different Service."
evidence: Two problems. (1) It drops the hedge that d-06 requires everywhere, and that s-06 and k-05's feedback both carry ("in most clusters, by default"). c-06 is `confidence: medium` and comes from kube-proxy's iptables mode, and D3 itself says replacement components "can differ" on exactly this. (2) "The fix is more ready Pods, not a different Service" is true of Tuesday's incident, but false as the general rule the recap states. D5 on the same page gives the counter-case: a Service "whose selector matches no Pods, for example because of a typo in a label, has an empty list from the start". There, the fix is the Service's selector. A reader keeps the recap, not the disclosure.
expected_fix: For example: "When a Service has no ready Pods, callers are refused at once (in most clusters, by default); on Tuesday the fix was more copies of `orders`, not a different Service." Or scope the second half to "when its Pods are restarting".
verdict: misleading-simplification

### new
severity: should
criterion: o-2 / m-10 (what does run for Services to work)
location: s-05, gated paragraph: "For Services to work, two things do have to run: the endpoints loop in the control plane, which the provider runs for Fennel, and kube-proxy on every node. Neither of them sits on a call's path."
evidence: The page has callers use the DNS name (s-03: "which is why `storefront`'s settings say only `orders`"; f-03 step ①). Answering that name takes a third thing that runs: the cluster's DNS, which runs as Pods in the cluster ("Check if the DNS pod is running … `coredns-7b96bf9f76-5hsxb 1/1 Running`"; with no CoreDNS Pod running, lookups fail with "can't resolve", https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/). Cluster DNS failures are a common real incident. A manager told that "two things" must run will not think to ask about it, and the sentence's purpose is to place m-10's fair part correctly. The DNS still isn't on the call's path once the name is answered, so the paragraph's point survives.
expected_fix: Make it three: "…the endpoints loop in the control plane, kube-proxy on every node, and the cluster's DNS, which answers names like `orders` and runs as Pods of its own. None of them sits on a call's path: DNS is asked once for the address, and the call then goes straight to a Pod." Optionally add one D3 sentence: if the DNS stops, callers can't look up names, but calls to an address they already have keep working.
verdict: misleading-simplification

### new
severity: nit
criterion: local-02 (spread, not balanced; per connection, random)
location: w-services-scrolly lane S, S3 calls note "answered by v62 ×2 · v63 ×1" (`calls('answered by v62 ×2 · v63 ×1')` in data.js), read straight after k-03, which asks about "three new connections"
evidence: In S1 and S4, "×3" counts Pods, but k-03's prompt has `storefront` open exactly three new connections. Read straight after it, the note can say that the three connections split two to v62 and one to v63. That is a deterministic share, which the page elsewhere correctly says doesn't happen ("picked at random by default"; "roughly a third … on average, by chance"). With random choice, three connections can all land on one Pod.
expected_fix: Make the note count Pods explicitly, for example "answered by 2 v62 Pods · 1 v63 Pod", or "by v62 and v63 Pods, at random". The page contract only requires S3 to show v62 ×2 and v63 ×1 on the list and the calls line, so the list rows can stay as they are.
verdict: misleading-simplification

### new
severity: nit
criterion: story consistency (CURRICULUM §3, Ch 4 moving day)
location: s-03 first paragraph: "When Ari moved each of Fennel's services into the cluster, they wrote one more short record beside its Deployment."
evidence: §3 says that on moving day "Ari applies `storefront` last, as a (shortened) `kind: ReplicaSet` manifest". Ch 4's f-02 caption softens this ("Engineers usually write a Deployment, which wraps this"), and Ch 6 says Deployments are "what Fennel's teams write for each of their services", so the conflict is small. Still, "when Ari moved each … beside its Deployment" ties the Service record to the move and to a Deployment that Ch 4's lane never shows.
expected_fix: Drop the timing link, for example: "Beside each service's Deployment, Ari's team keeps one more short record." Or: "When Ari moved each service into the cluster, they wrote one more short record beside it."
verdict: misleading-simplification

### new
severity: nit
criterion: d-06 hedge consistency
location: f-06 loop lens table, kube-proxy row, Does cell (`CH07_LOOPS` in `site/assets/page.js`): "…picked at random by default; an empty list refuses calls"
evidence: The cell names kube-proxy, whose default modes do reject (c-06; kube-proxy's endpoint filter keeps only Ready endpoints and falls back to serving-terminating ones, and "hasAnyEndpoints" stays false otherwise, https://github.com/kubernetes/kubernetes/blob/master/pkg/proxy/topology.go), so the cell isn't wrong. But it is the one place besides the recap where the refusal appears unhedged, and the table is copied forward into every later chapter.
expected_fix: "…; by default, an empty list refuses calls".
verdict: misleading-simplification
