status: done

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-07-services/run/review/round-1/accuracy.md — round-1 accuracy review in the review-template format: 4 should, 3 nit, 0 blocking
- /Users/m/workspace/k8s-course/explainers/ch-07-services/run/screenshots/probe/acc-r1-{s1,s2,s3,s4,f01,f04,f05}.png — probe captures of lane S steps S1–S4 (k-03 committed), f-01, f-04 and f-05

summary: I checked the prose, f-01 to f-06, D1–D6, the term cards, the sources footer, k-01 to k-07 (keys, options and feedback), lane S's data and canvas text, FIGURES and CH07_LOOPS against facts.md and CURRICULUM §3. I drove the lane and gates with probe.mjs and web-verified the core claims myself. Confirmed:
- A Pod with no ready endpoints gets a reject rule (kube-proxy source: only Ready endpoints count, falling back to serving-terminating ones).
- A restarted container keeps its Pod's address.
- The AWS $0.0225/h price, and the arithmetic: ≈$16, ≈$99, ≈$490.
- The dated Ingress and Ingress NGINX facts.
- The canary sentence is hedged per connection, random and "on average", and never implies a plain Service can split traffic by percentage.
- Addresses and story numbers are consistent everywhere.
- No later-chapter terms are used as concepts.

Should-level findings:
1. Lane S3 says "Only then" the Deployment loop stops a Pod, as if it waited for the list. It also says "no new call is sent to a Pod on its way out", but the docs say removal runs at the same time as shutdown.
2. The per-Service load balancer is priced as an ALB. On AWS, a Service of type LoadBalancer gets an NLB or Classic LB, while ALBs are for ingress. The NLB has the same hourly price, so the numbers stand.
3. The recap's "list empty → refused; fix is more Pods" drops the d-06 hedge, and the selector-typo case in D5 contradicts the second half.
4. "Two things do have to run" leaves out the cluster DNS, which runs as Pods.

concerns:
- One simplification I deliberately did not flag. The page says the endpoints loop "takes a Pod off the list". In reality, EndpointSlices keep not-ready and terminating Pods with ready=false, and the proxies skip them. I judged it faithful for this audience, since the effective list is the ready Pods. Mentioning it, if anything, belongs in a disclosure.
- I did not run findings.py ingest; I assume the orchestrator does that.

relaxed:
- none
