# Findings: round 1

_Ingested 2026-10-24T19:45:20-04:00 from accuracy.md, pedagogy-ux.md._

### A-01 · should · open
criterion: o-2 (what callers see during a rollout)
location: w-services-scrolly lane S, step S3 text (`site/widgets/w-services-scrolly/data.js`, `CLUSTER_LANES.S.steps[2].text`, both paragraphs); screenshot `run/screenshots/probe/acc-r1-s3.png`
verdict: misleading-simplification
evidence: (1) "The v63 Pod passes its check, and within seconds, usually, the endpoints loop has put its address on the list. **Only then** does the Deployment loop tell a v62 Pod on node 06 to stop." The Deployment loop waits for the new Pod to be ready, not for the endpoints loop to list it. The two loops react to the same readiness change independently (Ch 6's own account: the Deployment loop "removes an old Pod only once a new one has passed its check"). "Only then" invents a hand-off between loops, which contradicts the page's own "independent loops" model (Ch 4 claim 08). (2) "That Pod's address comes off the list as soon as it is told to stop, before its container has even exited, **so no new call is sent to a Pod on its way out**." The Pod lifecycle docs say the removal runs concurrently with shutdown: "At the same time as the kubelet is starting graceful shutdown of the Pod, the control plane evaluates whether to remove that shutting-down Pod from EndpointSlice objects" (https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/, Pod Termination Flow). Each node's rules then follow within about a second (c-05 note: kube-proxy may wait "up to the full `minSyncPeriod`", 1 s by default). So a few new connections can still reach a stopping Pod. That is why the docs say apps "should start terminating and finish processing open connections", and research parking-lot entry 11 flags exactly this ("callers ... with slightly stale rules can still hit it for a moment").
expected_fix: (1) Replace "Only then does the Deployment loop tell…" with something like "Seeing the same Pod ready, the Deployment loop tells a v62 Pod on node 06 to stop." (2) Soften the absolute, for example: "That Pod's address comes off the list as soon as it is told to stop, before its container has even exited, so within a moment new calls stop going to a Pod on its way out." If the builder wants the race named, add a disclosure line: apps are written to finish what they have when told to stop (Ch 12). The W-01 caption ("leaves it at once") and the lens-table row are about the list itself, and can stay.

### A-02 · should · open
criterion: o-3 (weigh one load balancer per service against one gateway, including cost)
location: s-07, the paragraph after f-05 ("On one provider, AWS, an Application Load Balancer in one US region was listed at $0.0225 an hour… A separate one for each of Fennel's six services would be about $99 a month"); k-07 answer ("Each Service of type `LoadBalancer` gets its own provider machine… on one provider, AWS, about $16 a month each"); sources footer item 7
verdict: misleading-simplification
evidence: On AWS, a Service of type LoadBalancer doesn't get an Application Load Balancer. The Amazon EKS user guide says: "When you create a Kubernetes `Service` of type `LoadBalancer`, the AWS cloud provider load balancer controller creates AWS Classic Load Balancers by default, but can also create AWS Network Load Balancers", and the recommended AWS Load Balancer Controller "creates AWS Network Load Balancers". Application Load Balancers are what an ingress provisions: "you deploy a Kubernetes `ingress`, which provisions an AWS Application Load Balancer", and "You can't share a Network Load Balancer across multiple services" (https://docs.aws.amazon.com/eks/latest/userguide/network-load-balancing.html, read 2026-10-24). So the page prices the per-Service option with the product that belongs to the gateway option. The arithmetic survives. The AWS pricing page's US-East-1 examples give the Network Load Balancer the same hourly charge, "$0.0225" (with "$0.006 per NLCU"), as the Application Load Balancer, which I re-read on 2026-10-24. 6 × $0.0225 × 730 ≈ $98.55, and 30 × ≈ $492.75, so "about $99" and "about $490" are correct.
expected_fix: Label the price as both products', for example: "On one provider, AWS, a load balancer in one US region (an Application or a Network Load Balancer: a Service of type LoadBalancer usually gets the second, a gateway the first) was listed at $0.0225 an hour on 24 October 2026…". Or say "a Network Load Balancer" for the per-Service figure and "an Application Load Balancer" for the one in front of the gateway, both at $0.0225 an hour. Adjust sources item 7 to match ("Application and Network Load Balancers in US East (N. Virginia) at $0.0225 an hour"). The numbers don't change.

### A-03 · should · open
criterion: d-06 (connection refused always hedged); o-2
location: s-09 recap ("In short"), fifth bullet: "When a Service's list is empty, callers are refused at once, and the fix is more ready Pods, not a different Service."
verdict: misleading-simplification
evidence: Two problems. (1) It drops the hedge that d-06 requires everywhere, and that s-06 and k-05's feedback both carry ("in most clusters, by default"). c-06 is `confidence: medium` and comes from kube-proxy's iptables mode, and D3 itself says replacement components "can differ" on exactly this. (2) "The fix is more ready Pods, not a different Service" is true of Tuesday's incident, but false as the general rule the recap states. D5 on the same page gives the counter-case: a Service "whose selector matches no Pods, for example because of a typo in a label, has an empty list from the start". There, the fix is the Service's selector. A reader keeps the recap, not the disclosure.
expected_fix: For example: "When a Service has no ready Pods, callers are refused at once (in most clusters, by default); on Tuesday the fix was more copies of `orders`, not a different Service." Or scope the second half to "when its Pods are restarting".

### A-04 · should · open
criterion: o-2 / m-10 (what does run for Services to work)
location: s-05, gated paragraph: "For Services to work, two things do have to run: the endpoints loop in the control plane, which the provider runs for Fennel, and kube-proxy on every node. Neither of them sits on a call's path."
verdict: misleading-simplification
evidence: The page has callers use the DNS name (s-03: "which is why `storefront`'s settings say only `orders`"; f-03 step ①). Answering that name takes a third thing that runs: the cluster's DNS, which runs as Pods in the cluster ("Check if the DNS pod is running … `coredns-7b96bf9f76-5hsxb 1/1 Running`"; with no CoreDNS Pod running, lookups fail with "can't resolve", https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/). Cluster DNS failures are a common real incident. A manager told that "two things" must run will not think to ask about it, and the sentence's purpose is to place m-10's fair part correctly. The DNS still isn't on the call's path once the name is answered, so the paragraph's point survives.
expected_fix: Make it three: "…the endpoints loop in the control plane, kube-proxy on every node, and the cluster's DNS, which answers names like `orders` and runs as Pods of its own. None of them sits on a call's path: DNS is asked once for the address, and the call then goes straight to a Pod." Optionally add one D3 sentence: if the DNS stops, callers can't look up names, but calls to an address they already have keep working.

### A-05 · nit · open
criterion: local-02 (spread, not balanced; per connection, random)
location: w-services-scrolly lane S, S3 calls note "answered by v62 ×2 · v63 ×1" (`calls('answered by v62 ×2 · v63 ×1')` in data.js), read straight after k-03, which asks about "three new connections"
verdict: misleading-simplification
evidence: In S1 and S4, "×3" counts Pods, but k-03's prompt has `storefront` open exactly three new connections. Read straight after it, the note can say that the three connections split two to v62 and one to v63. That is a deterministic share, which the page elsewhere correctly says doesn't happen ("picked at random by default"; "roughly a third … on average, by chance"). With random choice, three connections can all land on one Pod.
expected_fix: Make the note count Pods explicitly, for example "answered by 2 v62 Pods · 1 v63 Pod", or "by v62 and v63 Pods, at random". The page contract only requires S3 to show v62 ×2 and v63 ×1 on the list and the calls line, so the list rows can stay as they are.

### A-06 · nit · open
criterion: story consistency (CURRICULUM §3, Ch 4 moving day)
location: s-03 first paragraph: "When Ari moved each of Fennel's services into the cluster, they wrote one more short record beside its Deployment."
verdict: misleading-simplification
evidence: §3 says that on moving day "Ari applies `storefront` last, as a (shortened) `kind: ReplicaSet` manifest". Ch 4's f-02 caption softens this ("Engineers usually write a Deployment, which wraps this"), and Ch 6 says Deployments are "what Fennel's teams write for each of their services", so the conflict is small. Still, "when Ari moved each … beside its Deployment" ties the Service record to the move and to a Deployment that Ch 4's lane never shows.
expected_fix: Drop the timing link, for example: "Beside each service's Deployment, Ari's team keeps one more short record." Or: "When Ari moved each service into the cluster, they wrote one more short record beside it."

### A-07 · nit · open
criterion: d-06 hedge consistency
location: f-06 loop lens table, kube-proxy row, Does cell (`CH07_LOOPS` in `site/assets/page.js`): "…picked at random by default; an empty list refuses calls"
verdict: misleading-simplification
evidence: The cell names kube-proxy, whose default modes do reject (c-06; kube-proxy's endpoint filter keeps only Ready endpoints and falls back to serving-terminating ones, and "hasAnyEndpoints" stays false otherwise, https://github.com/kubernetes/kubernetes/blob/master/pkg/proxy/topology.go), so the cell isn't wrong. But it is the one place besides the recap where the refusal appears unhedged, and the table is copied forward into every later chapter.
expected_fix: "…; by default, an empty list refuses calls".

### P-01 · blocking · open
criterion: ac-13 (no key echoed by a heading above it); the user's "no giveaways" standard (Ch 4, 5 and 6's blocking P-01)
location: s-02, `h2#addresses-that-dont-stay-put`, and its entry in the contents rail (`.d-rail`, which shows every heading from the top of the page) and in the mobile "Contents" list
evidence: The heading "Addresses that don't stay put" sits directly above k-02, and the rail shows it from the first screen. k-02 asks whether calls to addresses copied at 10:20 still work after the rollback to v63. Option A ("Yes … addresses and all") and option C ("Only some: Kubernetes gives a returning v63 Pod its old address back…") both claim that addresses come back, which the heading rules out. That leaves B, the only "No", so the check reduces to agreeing with the heading. The paragraph before the check adds to this ("Every Pod is given a network address of its own when it starts"), on top of k-01's feedback ("a new Pod doesn't inherit an address"). The builder's suspicion is right.
expected_fix: Retitle §02 with a neutral heading that names the scenario rather than the outcome. Options: "A list copied by hand", "Sam's way, one Thursday", or "What if someone kept the list?". The rail and the mobile contents pick it up automatically. Keep "One name that stays put" for §03, which comes after the reveal. Optionally move "The address belongs to the Pod, not to the node it runs on" into the debrief after f-01; "given a network address of its own when it starts" can stay, since it's prerequisite knowledge.

### P-02 · blocking · open
criterion: misconception handling (m-10, the chapter's own); visual grammar ("things different in kind look different"; plan ## Visual grammar: "an arrow through the Service would draw m-10")
location: s-07, f-05 (`#f-05 .rt__box.svc`, both blocks), at every width; screenshots `run/screenshots/probe/pux-r1-w1280-f-05.png`, `pux-r1-w360-f-05.png`
evidence: f-05 draws the request as one vertical chain of boxes joined by arrows: phone → cloud load balancer → gateway → `SERVICE · storefront · 10.96.0.12` → `storefront` Pod. The internal branch is drawn the same way: `calls orders` → `SERVICE · orders · 10.96.0.25` → `orders-q2rw`. Each Service is a box with one arrow in and one arrow out, in the same hop grammar as the load balancer and the gateway, which really are on the path. Two sections earlier, §05 told the reader "There is no box in the middle", and f-03 showed the call going from the caller's node's rules straight to the Pod. f-05 is the figure that reveals k-06, so a reader who has just been corrected sees m-10 drawn again. The plan's f-05 model specified this chain, so this is a conflict inside the plan, carried out faithfully, not a builder error. It still contradicts the plan's grammar and §05.
expected_fix: Keep every element and change only how the arrows run. Draw the main arrow gateway → `storefront` Pod, and the branch arrow `storefront` Pod → `orders-q2rw`. Set each Service block beside its arrow, not on it, joined to the arrow by a short dashed `c3` leader. Label the internal leader "via the `orders` Service's list (rules on `storefront`'s node)", and the gateway's "picks a Pod from the `storefront` Service's list". Leave the caption unchanged. At desktop, also move the `INSIDE THE CLUSTER · NO LOAD BALANCER` label from under the `orders-q2rw` chip to the top of the branch, as at 360px. Update the figure's `aria-label` to match ("…reaches a `storefront` Pod picked from its Service's list…"). Record the rule in the plan's ## Visual grammar for later chapters: a Service block is never a hop.

### P-03 · should · open
criterion: checks (no giveaways: "keys should never be the longest option", and a key shouldn't be identifiable by length either)
location: k-01 to k-06 (`.cp-check .cp-option`)
evidence: Measured option lengths in characters, key marked *: - k-01: *77 / 78 / 80 - k-02: 103 / *76 / 104 - k-03: 79 / *56 / 81 - k-04: 80 / 79 / *70 - k-05: 83 / *70 / 84 - k-06: *64 / 69 / 69 In all six choice checks the key is the shortest option, and in k-02, k-03 and k-05 it is clearly shorter than both distractors. A test-wise reader learns "pick the short one" by k-03. That is the mirror image of the longest-option giveaway the course rule targets.
expected_fix: In at least three of the six checks, make the key the middle length or within a few characters of the longest, without making it the longest. Example rewrites: - k-03 B: "Any of the Pods on the list by then, the two v62 Pods as well as the new v63 one." (~80) - k-05 B: "The rules on `storefront`'s own node, because the `orders` list had no ready Pod on it." (~85) - k-02: shorten A to "Yes: the rollback brought back the same v63 Pods, addresses and all." (~68) Recheck the measurements afterwards.

### P-04 · should · open
criterion: split attention and redundancy (the user's readability reviews: no restating)
location: s-02 (paragraph before k-02 and k-02's prompt); s-06 (paragraph before k-05 and k-05's prompt); s-09 (the scene paragraph and Riley's quote, then k-07's prompt)
evidence: Three check prompts repeat, nearly word for word, the paragraph directly above them: - s-02 ends "Suppose, then, that someone had done what Sam once did, and copied `catalog`'s three addresses into `storefront`'s settings … at 10:20, just after the morning release." k-02 then opens "Suppose someone had copied `catalog`'s three addresses into `storefront`'s settings at 10:20 on that Thursday, just after the morning release to v63." - s-06 says `orders-q2rw` ran out of memory at about 12:40 and was restarted in place, and that `storefront`'s log shows `connection refused`. k-05's prompt says the same in the same order. - s-09 gives the meeting, the partners and Riley's quote. k-07's prompt repeats all three. The reader reads each scenario twice in a row.
expected_fix: Keep each prompt self-contained (the course rule) and cut the duplicate from the prose. - s-02: end the paragraph after "…not to the node it runs on." Let k-02's prompt carry the "suppose" (it already names the time and v63). - s-06: keep the paragraph's "Now back to Jordan's question. `orders` runs a single copy…" and the Chapter 5 gloss, but drop its last sentence about the log, which the prompt states. - s-09: keep the scene and Riley's quote, and shorten the prompt to "Riley's team wants control over how partners get in. What would you ask Riley, and why? Think of your questions, then show the answer."

### P-05 · should · open
criterion: precise language; the plan's prose rule "Keep the pattern distinct from the implementation"; loop lens (§2.3)
location: s-04, the paragraph after the lens ("Like every loop, it only writes into the record."), against s-05's kube-proxy paragraphs and f-06's kube-proxy and node agent rows
evidence: s-04 says the endpoints loop, "like every loop, … only writes into the record". Two sections later kube-proxy, introduced as "a small loop", writes into "that node's own forwarding rules", not the record. f-06 already lists the node agent, which starts and restarts containers on its node. So the general claim is false for two of the eight rows in the table this page builds, and the reader who takes it as a rule meets the contradiction in §05. The handoff asks whether kube-proxy is placed clearly as a different kind of loop. The text gets close ("Like the node agent, it runs on every node, and each copy acts only on its own node, working from the record") but never says the difference outright.
expected_fix: Change s-04's sentence to say what this loop does, not every loop: "This loop only writes into the record: it changes the list, not where any call goes. How a call actually follows the list is the subject of §05." In s-05, after "Like the node agent, it runs on every node…", add one clause naming the difference: "…working from the record but writing nothing back to it: its output is its own node's rules."

### P-06 · should · open
criterion: cognitive load (terms and scenes grounded before use; the user's "name actors precisely" and "glossed for readers who jump ahead")
location: s-01, k-01's prompt and the paragraphs after it ("Think back to 03:04 on a Saturday in Chapter 3…" and "…including at 03:10 that Saturday in Chapter 4…"); s-03 ("Since 03:10 that Saturday in Chapter 4")
evidence: There are two different 03:04 Saturdays (CURRICULUM §3). Ch 3's machine 03 died before Kubernetes. Ch 4's "node 03 dies again" happened on Kubernetes. k-01 opens with "At 03:04 in Chapter 4, node 03 died". The next paragraph says "Think back to 03:04 on a Saturday in Chapter 3, before Fennel had Kubernetes. Machine 03 died…". The one after says "including at 03:10 that Saturday in Chapter 4". "That Saturday", right after the Chapter 3 Saturday, reads as the same day. A reader who skipped Ch 3–4, the reader D1 serves, will merge the two, and D1 doesn't mention Ch 4's 03:04 at all.
expected_fix: Name the second one explicitly the first time the prose meets it. In s-01: "…including at 03:10 on a second Saturday, in Chapter 4, when node 03 died again on Kubernetes and `orders-q2rw` replaced `orders-5c8x`…". In s-03, write "since 03:10 on that second Saturday (Chapter 4)". Add one clause to D1's first bullet: "…when node 03 died again one Saturday at 03:04, a loop replaced its `orders` Pod, `orders-5c8x`, with a new one, `orders-q2rw`, on node 04."

### P-07 · should · open
criterion: precise language (no ambiguous referents; the user's reviews)
location: s-06, end of the paragraph after f-04: "It also gives Jordan a question for the list."
evidence: By this point "the list" has meant the Service's list of ready Pods some twenty times, including twice in the same paragraph ("the other on the list"). Here it means Jordan's running list of questions for engineers, an unglossed callback. A reader will parse it first as the endpoints list.
expected_fix: "It also gives Jordan a question to take to the engineers." or "…a question for Jordan's list of questions to ask."

### P-08 · nit · open
criterion: precise language (no unexplained references)
location: s-04, second paragraph after the lane: "It is also the loop behind Chapter 6's answer about a `catalog` Pod that lost its database connection"
evidence: "Chapter 6's answer" refers to a check answer (Ch 6's k-05) that a reader is unlikely to recall as "an answer", and that a jump-ahead reader never saw.
expected_fix: "It is also the loop that, in Chapter 6, took a `catalog` Pod that had lost its database connection off the list while its readiness check failed, and put it back once the check passed."

### P-09 · nit · open
criterion: no meta lines about the course (user's Ch 5 review)
location: k-01, feedback for A: "…so something else had to make sure `storefront` found it. This chapter is about that something."
evidence: The last sentence is a line about the chapter rather than about the cluster.
expected_fix: End on the content: "…so something else had to make sure `storefront` found it, and nobody had to tell it."

### P-10 · nit · open
criterion: redundancy (wordiness that hurts clarity)
location: s-07, first sentence: "Every Service so far has an address that works only inside the cluster: by default, a Service can be reached only from inside it."
evidence: The sentence says the same thing twice across the colon.
expected_fix: "By default, a Service's address works only inside the cluster. That's all `storefront` needs to call `orders`. Customers' phones, though, are out on the internet."

### P-11 · nit · open
criterion: visual consistency (figure says what the prose claims)
location: s-06, f-04 right panel (`[data-cluster-figure="ready"]`); data.js `FIGURES.ready`
evidence: The caption and prose stress "the same Pod, at the same address". But the left panel shows no address, the chip reads only `orders ↻ 1` (never `orders-q2rw`), and the right panel's list shows `10.4.4.7` without a Pod name. "Same" is only checkable against f-02 and f-03, two sections back.
expected_fix: In `FIGURES.ready`, change the lens `DOES` line to "lists it again: 10.4.4.7, as before". Alternatively, change the right panel head to "Seconds later · Ready again · same address 10.4.4.7". Data-only change.

### P-12 · nit · open
criterion: visual consistency (narrow layout matches wide)
location: s-05, f-03 narrow SVG (`.f3c__svg--narrow`, 360px); screenshot `pux-r1-w360-f-03.png`
evidence: In the wide layout, dashed `c3` copy lines run from the record to both nodes' FORWARDING RULES bands. In the narrow layout only one line runs, into node 04's band. The rules the call actually uses, on node 01, have no visible source.
expected_fix: Add a second dashed `c3` line in the narrow SVG, from the record strip up the left edge to node 01's band, or end the label with "(node 01's too)".

### P-13 · nit · open
criterion: cognitive load (terms used before the thing they name, for jump-ahead readers)
location: s-04, set-up paragraph 2: "In the record panel, the drawing now shows the `catalog` Service."
evidence: "Record panel" is Ch 4–6 vocabulary. A jump-ahead reader knows "the record" only from D1, and the canvas labels the panel "The cluster's record · one Service".
expected_fix: "At the top of the drawing, in the panel for the cluster's record, it now shows the `catalog` Service."

### P-14 · nit · open
criterion: visual consistency (loop pills show who acts)
location: w-services-scrolly S2–S4 (`loops.active: ['ep']` in data.js)
evidence: In S2 to S4 the step text credits the Deployment loop with starting and stopping Pods, but its pill stays dimmed in every step and only the endpoints loop is shown acting. A reader matching pill to text sees the wrong actor for the Pod changes.
expected_fix: Set `active: ['deploy', 'ep']` in S2, S3 and S4, keeping the lens line about the endpoints loop. Alternatively, accept this and add "(the Deployment loop's moves are Chapter 6's)" to S2's text. Data-only change.

### P-15 · nit · open
criterion: ac-14 (explicit mapping)
location: s-05, `.cp-aside` ANALOGY paragraph
evidence: The aside maps number → name and address, and rota → list, but leaves "the phone system rings one person per call" → "one Pod per connection" implicit. That is the half of the mapping that matters for local-02.
expected_fix: Add to the last sentence: "…and a list of who can answer now; each call rings one of them, as each connection reaches one Pod."
