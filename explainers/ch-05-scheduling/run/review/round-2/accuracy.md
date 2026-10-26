# Accuracy review: round 2

## Summary
Closure round. All nine round-1 accuracy findings are closed: the builders' fixes are on the page, or the H- rewrites removed the problem. I checked every changed factual statement against facts.md (c-01 to c-23; x-02 for the Fargate example), and I drove the sandbox in the browser (probe at 1280 and 360) and against an exact packing solver I wrote myself. Every count the page or a prompt depends on matches: defaults 4+1, payments 4 and 7 → 4+1, 7.5 → 5+1, at-use 3+1 set by processor, orders 5 → 3+1, orders 5.5 → 4+1, orders 13.5 never placed, halved → orders only over. Node pools left no dangling reference on the page. Section, figure and check numbers are consistent. No new blocking findings.

## Findings

### A-01
severity: should
criterion: o-2 / o-3 (raising a request can add a node)
location: s-09 (§08), k-09 reveal: "(in the sizing widget in §04, from Fennel’s requests, try `orders` at 5 GB and then at 5.5 GB)"
evidence: Probe at 1280 from the default state: orders lowered to 5 GB gives "3 NODES FOR THE PODS + 1 SPARE"; raised to 5.5 GB gives "4 NODES FOR THE PODS + 1 SPARE". My own exact solver agrees: (4, 5, 2, 2) needs 3 nodes and (4, 5.5, 2, 2) needs 4. Payments' new stepper doesn't affect this, because the pointer starts from Fennel's requests and payments stays at 2 GB. The pointer now shows what the sentence beside it says.
expected_fix: none
verdict: misleading-simplification
status: closed

### A-02
severity: should
criterion: o-2; internal consistency of the fiction
location: s-08 (§07), k-08 (now Check 07) option A feedback
evidence: The feedback now reads "at the rush orders would use far more than it reserved (5.5 GB against 3), and storefront and dispatch would sit right at their reservations … (Set the sizing widget in §04 to half the requests to see the warning.)" With payments now adjustable, halving all four requests (2 / 3 / 1 / 1) in the widget gives one warning, "orders requests 3 GB and used 5.5 GB at the rush", plus the hatch line. The model returns over = ['orders']. Payments halved to 1 GB is still above its 0.5 GB use. Text and widget agree.
expected_fix: none
verdict: contradicted
status: closed

### A-03
severity: nit
criterion: c-05 / x-01 (allocatable example)
location: s-02 disclosure "Why can Pods reserve only about 13 GB of a 16 GB node?"
evidence: The disclosure now says "a 16 GB node keeps back up to about 2.7 GB of memory, depending on the version it was set up with". GKE's newer formula is a Min with the older one, so "up to" is exact. The 4 GB "about a quarter" holds under both formulas.
expected_fix: none
verdict: misleading-simplification
status: closed

### A-04
severity: nit
criterion: c-04 / q-3 note (limit without a request)
location: s-07 (§06) TERM 03 and the disclosure "What if a team sets no memory limit at all?"
evidence: TERM 03 now reads "They cap use; reserving room is the request’s job." The disclosure adds "if a team sets only a limit and no request, Kubernetes uses the limit as the request too, so the container reserves that much", which matches the facts.md q-3 note quoting kubernetes.io.
expected_fix: none
verdict: misleading-simplification
status: closed

### A-05
severity: nit
criterion: c-20 / c-21 (pending)
location: s-03 TERM 02 "pending", back line
evidence: The back line is now "Not failed; it waits until something makes room." This is true both for room-pending Pods (c-21: retried when a node joins or a Pod is removed) and with the image-download disclosure below it.
expected_fix: none
verdict: misleading-simplification
status: closed

### A-06
severity: nit
criterion: c-14 / c-15 (survey attribution)
location: s-04 disclosure "How common is this?"
evidence: The text now says "with just over 100 respondents" ("self-selected" is gone). Over-provisioning is glossed as "paying for more capacity than workloads need", which covers over-sized clusters as well as over-requesting.
expected_fix: none
verdict: unsupported
status: closed

### A-07
severity: nit
criterion: brief: invented sizes internally consistent
location: s-02 first paragraph
evidence: H-04 (the user's comment) cut the unit arithmetic ("One unit … stood for 2 GB … A node’s six units made 12 GB …"). The paragraph now says only "every node had room for six units" and "storefront’s two units of room appear as its real memory request: 4 GB", and the 13 GB comes in the next paragraph. The page no longer states the 12 GB product or asks the reader to multiply. A reader who works it out alone could still notice the 1 GB difference, but it changes no placement (round-1 check). Putting the reconciling sentence back would undo H-04, which is the user's decision, so I treat the problem as resolved.
expected_fix: none
verdict: misleading-simplification
status: closed

### A-08
severity: nit
criterion: c-05 / c-09 (what Fennel pays for)
location: w-sizing-sandbox idle bar; s-04 prose after the widget
evidence: The bar's head is now "ROOM FOR PODS ON THE RENTED NODES" (r2-accuracy-ss-default.png): 19.5 + 18.5 + 27 = 65 GB = 5 × 13 GB, which matches the head. The H-31 rewrite of the prose ("The bar under the widget’s nodes splits the room nobody uses into two kinds…") no longer calls the bar the rented room.
expected_fix: none
verdict: misleading-simplification
status: closed

### A-09
severity: nit
criterion: cross-chapter consistency
location: s-05 (§05 Room on purpose)
evidence: §05 was rewritten for H-35 and H-36: "Nodes go down, as node 03 did in Chapter 4. … Spare nodes are insurance against that". It no longer attributes the word "insurance" to Chapter 3. The Chapter 4 back-reference is accurate (node 03 died at 03:04).
expected_fix: none
verdict: unsupported
status: closed

## Changed text checked (no finding)

- **Loop lens (§01, §02, Fig. 05):** "which loop is it, what does it want (the desired state), what does it see (the real state), and what does it do when the two differ?" is word for word the CURRICULUM §2.3 wording. §02's scheduler lens and Fig. 05's headers ("Wants (desired state) / Sees (real state) / Does when they differ") use the same wording. The scheduler row ("tries again when the cluster changes") matches c-21.
- **§02's new sentence:** "a Pod can use less than it reserved, or more, as long as its node has room to spare" is c-04 ("it's possible (and allowed) for a container to use more resource than its request"). The next clause defers what stops it to §06 and §07, which deliver it.
- **§04 billing:** "the bill counts machines … for as long as it exists" is c-09. "Nothing in Fennel's cluster rents or adds nodes by itself" is story fiction, consistent with Fig. 05's dashed Ch 8 row and k-05. The per-Pod sentence ("They charge for what each Pod requests, not for what it uses") is c-10/c-11. In D6: per-second billing of CPU, memory and ephemeral storage, waiting Pods unbilled and crash-looping Pods billed are c-10 and its note. The Fargate example (1 core + 8 GB → 8.25 GB → the 2 vCPU · 9 GB configuration, since 1 vCPU tops out at 8 GB) is c-11/x-02. "Not every fully managed mode bills per Pod" is c-12.
- **#28 widget intro and W-02 caption:** the intro says the widget is like the scheduler in placing by requests with both numbers on one node, and unlike it in packing tightly. It doesn't claim to be the scheduler, and the caption says the default scheduler spreads (c-06, c-07). "A real cluster needs at least this many" is correct, because the widget's count is an exact minimum (independent solver agrees on every state I tried).
- **Sandbox prompts and model:** "Set each request to what that service used at the rush … what stops the count going lower?" With 2 / 5.5 / 0.5 / 1 the widget shows 3 + 1 and "Processor, not memory, sets this count: memory alone would need 2". The CPU total of 9.5 cores over 3.9 per node forces 3 nodes. "Double payments’ request … How far can it go before it costs a node?" 4 GB and 7 GB stay at 4 + 1; 7.5 GB gives 5 + 1 (probe and solver). This matches k-04's "potentially more nodes" and its feedback ("Whether it costs a whole node depends on how much room the nodes have left"). "Push orders past 13 GB": at 13.5 the widget shows "No count" and "no node can ever take it". The prose after the widget ("never placed: it stays pending for good") is c-20's note ("will never be scheduled"). Extremes: all at 0.5 → 3 + 1 (processor), with storefront, orders and dispatch warned. All at max with orders 13 → 9 + 1. Orders 16 → no count. `selftest.mjs` passes (98,304 settings, monotone). There is no horizontal overflow at 360 in the default, maximum, unplaceable or minimum states (scrollWidth 360).
- **§05 (losing a node):** replacements go to the remaining nodes and wait if those are full. This is c-21 plus Ch 4's c-12, and it matches §03's pending mechanism.
- **§06 limits introduction:** "the most memory and processor each copy may use on its node". Fig. 03's annotations (killed over the memory limit, slowed at the processor limit) and TERM 03's back line are c-16/c-17.
- **Node pools removed:** no visible "node pool", "spot", "large memory" or pools source remains in index.html, page.js or the widget data. The Sources list dropped "About node pools" and "Spot VMs". The bigger-node sentence after W-02 doesn't name pools.
- **Numbering:** sections run §01 to §08 and every cross-reference matches (§02 for a Pod using more than it reserves, §06 for the kill and limits, §07 for eviction in Fig. 04, the warnings and the analogy, §04 for the sizing widget). Figures run Fig. 01 to 06, and Sources refers to Fig. 06. Checks run 01 to 08 / 08, and the hero says "Checks 08".
