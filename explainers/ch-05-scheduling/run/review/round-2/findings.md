# Findings: round 2

_Ingested 2026-10-26T08:02:26-04:00 from accuracy.md, pedagogy-ux.md._

### A-01 · should · closed
criterion: o-2 / o-3 (raising a request can add a node)
location: s-09, k-09 reveal, "(try `orders` at 8 and then 12 GB in W-02)"; widget w-sizing-sandbox
verdict: misleading-simplification
evidence: Probe (1280px, run/screenshots/probe/acc-r1-ss-at-use.png, acc-r1-ss-at-use-orders12.png): starting from the state the page asks for ("Set each request to what that service used at the rush": storefront 2, orders 5.5, dispatch 1), NODES reads 04 (3 + 1 spare) with orders at 5.5, at 8 and at 12. It changes only at 12.5. Starting from Fennel's defaults (4 / 6 / 2), the model gives 4 + spare at every orders value from 5.5 to 13 (model sweep with SizingModel.evaluate, cross-checked with an independent exact solver). The only state where 8 → 12 adds a node is storefront 2.5 / dispatch 1.5, which the self-test uses but the page never names. A reader who follows the pointer sees the node count stay the same while orders doubles, the opposite of what the sentence beside it claims ("that can mean another node on the bill").
expected_fix: Point to a reproducible setting. Either name the state ("with storefront at 2.5 and dispatch at 1.5, try orders at 8 and then 12 GB") or pick values that add a node from the "used at the rush" state the page already sets up (from 2 / 5.5 / 1, orders at 12 → 3 nodes for the Pods, 12.5 → 4). Alternatively drop the parenthesis and say a node is added only once the bigger request no longer fits beside the others.
closure_evidence: Probe at 1280 from the default state: orders lowered to 5 GB gives "3 NODES FOR THE PODS + 1 SPARE"; raised to 5.5 GB gives "4 NODES FOR THE PODS + 1 SPARE". My own exact solver agrees: (4, 5, 2, 2) needs 3 nodes and (4, 5.5, 2, 2) needs 4. Payments' new stepper doesn't affect this, because the pointer starts from Fennel's requests and payments stays at 2 GB. The pointer now shows what the sentence beside it says.

### A-02 · should · closed
criterion: o-2 (under-requesting → evictions); internal consistency of the fiction
location: s-08, k-08 option A feedback: "at the rush several services would use more than they reserved … (W-02's warnings show which services.)"
verdict: contradicted
evidence: The story's rush usage (W-02 data.js `use`) is storefront 2, orders 5.5, dispatch 1, payments 0.5 and notifications 0.5 GB per copy. Halved requests are 2, 3, 1, 1 and 1 GB. Only orders goes over its request; storefront and dispatch land exactly on their use. In W-02, halving the three adjustable requests (storefront 2, orders 3, dispatch 1) gives one warning, for orders only (model: `over: ['orders']`). The mechanism in the key is right, but the feedback's "several services" contradicts the page's own numbers and the widget it sends the reader to.
expected_fix: Say "at the rush orders would use far more than it reserved (and storefront and dispatch would have no margin at all)", or change "several services" to "orders, at least". Keep the pointer to W-02's warnings, which will then match.
closure_evidence: The feedback now reads "at the rush orders would use far more than it reserved (5.5 GB against 3), and storefront and dispatch would sit right at their reservations … (Set the sizing widget in §04 to half the requests to see the warning.)" With payments now adjustable, halving all four requests (2 / 3 / 1 / 1) in the widget gives one warning, "orders requests 3 GB and used 5.5 GB at the rush", plus the hatch line. The model returns over = ['orders']. Payments halved to 1 GB is still above its 0.5 GB use. Text and widget agree.

### A-03 · nit · closed
criterion: c-05 / x-01 (allocatable example)
location: s-02 disclosure "Why can Pods reserve only about 13 GB of a 16 GB node?": "On one provider, for example, a 16 GB node keeps back about 2.7 GB of memory"
verdict: misleading-simplification
evidence: GKE "Plan node sizes" (fetched 2026-10-23, docs.cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes) gives 25%/20%/10% … + 100 MiB only for "node pools created on GKE 1.36 or earlier". Pools created on 1.37 or later use "Min(EarlierMemoryReservation, (15 MiB * MaxPodsPerNode) + BaseOverhead)" (BaseOverhead 500 MiB on COS). At 110 Pods per node that's about 2.1 GiB + 100 MiB ≈ 2.2 GB for a 16 GB node. The facts file flagged this caveat (x-01) but the page states 2.7 GB as the provider's current figure. The "small machines lose a bigger share" point and the ~quarter for 4 GB still hold under both formulas.
expected_fix: Hedge the number: "keeps back roughly 2 to 3 GB of memory, depending on the node pool's version" or "on node pools created on its older versions, about 2.7 GB". Fennel's 13 GB stays fiction in the right range.
closure_evidence: The disclosure now says "a 16 GB node keeps back up to about 2.7 GB of memory, depending on the version it was set up with". GKE's newer formula is a Min with the older one, so "up to" is exact. The 4 GB "about a quarter" holds under both formulas.

### A-04 · nit · closed
criterion: c-04 / q-3 note (defaults when unset)
location: s-07 term card "limits": "They cap use; they reserve nothing."
verdict: misleading-simplification
evidence: facts.md q-3 note, quoting kubernetes.io manage-resources: with a limit but no request, "Kubernetes copies the limit you specified and uses it as the requested value for the resource". So a limit set alone does end up reserving room. The card's absolute "reserve nothing" is true only when a request is also set, which is Fennel's case. A manager who later hears "we only set limits" would draw the wrong conclusion about placement and cost.
expected_fix: Soften to "On their own terms they reserve nothing", or add to D7 one sentence: "If a team sets only a limit, Kubernetes uses it as the request too, so it reserves that much."
closure_evidence: TERM 03 now reads "They cap use; reserving room is the request’s job." The disclosure adds "if a team sets only a limit and no request, Kubernetes uses the limit as the request too, so the container reserves that much", which matches the facts.md q-3 note quoting kubernetes.io.

### A-05 · nit · closed
criterion: c-20 / c-21 (pending)
location: s-03 term card "pending", second line: "Not failed, and not fixed by waiting alone."
verdict: misleading-simplification
evidence: The disclosure "Is 'pending' always about room?" right below says pending also covers image download, which does resolve by waiting. A room-pending Pod is also placed without anyone acting when other Pods finish or are removed (c-21: retried "when a node joining or a Pod being removed"). The prose is careful ("in Fennel's cluster no loop makes room by itself"), but the card generalises it.
expected_fix: "Not failed, and in Fennel's cluster not fixed by waiting alone", or "Not failed; it waits until something makes room."
closure_evidence: The back line is now "Not failed; it waits until something makes room." This is true both for room-pending Pods (c-21: retried when a node joins or a Pod is removed) and with the image-download disclosure below it.

### A-06 · nit · closed
criterion: c-14 / c-15 (survey attribution)
location: s-04 disclosure "How common is this?": "with just over 100 self-selected respondents" … "Over-provisioning, which means reserving more than workloads need"
verdict: unsupported
evidence: The CNCF post (fetched 2026-10-23) says only "received a total of just over 100 responses" and doesn't describe recruitment, so "self-selected" is the researcher's characterisation. The post also doesn't define over-provisioning; its chart caption gives "workloads using more resources than necessary". In this chapter "reserving" means requests specifically, so the gloss narrows the cause to over-requesting, though the survey term plausibly covers over-sized clusters too (Datadog's 54-point "cluster idle" is exactly that).
expected_fix: Drop "self-selected" or write "a small online survey". Gloss over-provisioning as "paying for more capacity than workloads need".
closure_evidence: The text now says "with just over 100 respondents" ("self-selected" is gone). Over-provisioning is glossed as "paying for more capacity than workloads need", which covers over-sized clusters as well as over-requesting.

### A-07 · nit · closed
criterion: brief: invented sizes internally consistent
location: s-02 first paragraph ("every node had room for six units" … "One unit of room in Chapter 4 stood for 2 GB of memory request") vs. "the Pods on a node can reserve only about 13 GB"
verdict: misleading-simplification
evidence: 6 units × 2 GB = 12 GB, while the same section gives each node 13 GB of room for Pods, and W-01 draws 13 GB columns. Because every Ch 3/4 size is a whole number of units, the extra 1 GB changes no Ch 4 placement (I checked moving day and 03:04 at 13 GB / 3.9 cores, and both match d-04's layout). Still, a reader who multiplies will find the two figures disagree.
expected_fix: One clause, e.g. "every node had room for six units (the real figure, 13 GB, leaves 1 GB over that Chapter 4's sizes never used)".
closure_evidence: H-04 (the user's comment) cut the unit arithmetic ("One unit … stood for 2 GB … A node’s six units made 12 GB …"). The paragraph now says only "every node had room for six units" and "storefront’s two units of room appear as its real memory request: 4 GB", and the 13 GB comes in the next paragraph. The page no longer states the 12 GB product or asks the reader to multiply. A reader who works it out alone could still notice the 1 GB difference, but it changes no placement (round-1 check). Putting the reconciling sentence back would undo H-04, which is the user's decision, so I treat the problem as resolved.

### A-08 · nit · closed
criterion: c-05 / c-09 (what Fennel pays for)
location: w-sizing-sandbox idle bar head "The rented room" and readout "Reserved · 38 of 65 GB"; s-04 "W-02's idle bar splits the room Fennel rents"
verdict: misleading-simplification
evidence: Probe at the defaults (acc-r1-ss-default.png): "THE RENTED ROOM … 19.5 GB · 30% / 18.5 GB · 28% / 27 GB · 42%", which sums to 65 GB = 5 × 13 GB of room for Pods. Fennel rents 5 × 16 = 80 GB. The 15 GB kept back for the system, which §04 lists as a third reason for the bill, is outside the bar, so "rented" overstates what the bar shows.
expected_fix: Relabel the head "Room for Pods on the rented nodes" (or similar), or add a fourth, hatched "kept back for the system" segment.
closure_evidence: The bar's head is now "ROOM FOR PODS ON THE RENTED NODES" (r2-accuracy-ss-default.png): 19.5 + 18.5 + 27 = 65 GB = 5 × 13 GB, which matches the head. The H-31 rewrite of the prose ("The bar under the widget’s nodes splits the room nobody uses into two kinds…") no longer calls the bar the rented room.

### A-09 · nit · closed
criterion: cross-chapter consistency
location: s-05: "Chapter 3 called spare room insurance and left 'how much?' to this chapter."
verdict: unsupported
evidence: Ch 3's page (site/index.html) says "Some of that room is worth having … How much spare room is right is a question for Chapter 5", and Ch 3's story fact quotes Sam: "the spare room is for when something breaks". Neither the page nor its widget data uses the word "insurance".
expected_fix: "Chapter 3 said some spare room is worth having and left 'how much?' to this chapter."
closure_evidence: §05 was rewritten for H-35 and H-36: "Nodes go down, as node 03 did in Chapter 4. … Spare nodes are insurance against that". It no longer attributes the word "insurance" to Chapter 3. The Chapter 4 back-reference is accurate (node 03 died at 03:04).

### H-01 · blocking · closed
criterion: human review (site-1, comment #1)
location: text "This chapter traces three problems, a bill that went up, a Pod that wouldn’t start and a service that kept restarting, back to two numbers each team wrote down for its services"
evidence: The user wrote: "this sentence is a little unclear"
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-02 · blocking · closed
criterion: human review (site-1, comment #2)
location: text "Since 03:04,"
evidence: The user wrote: "we're splitting attention here, extraneous load, the reader doesn't need to remember 3:04, they need to remember specifically when node 3 died, "Since 3:04, when node 3 died,""
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-03 · blocking · closed
criterion: human review (site-1, comment #3)
location: text "saying"
evidence: The user wrote: "manifest don't speak. How about "declaring""
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-04 · blocking · closed
criterion: human review (site-1, comment #4)
location: text "One unit of room in Chapter 4 stood for 2 GB of memory request, so storefront’s two units are the 4 GB in Fig. 01. A node’s six units made 12 GB. The real figure, given just below, is about 13 GB, but none of Chapter 4’s sizes needed that last 1 GB."
evidence: The user wrote: "This is too much mental math and juggling of numbers. Maybe "Storefront’s two units of room appear as its real memory request: 4 GB.""
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-05 · blocking · closed
criterion: human review (site-1, comment #5)
location: text "its three Pods went to three different nodes"
evidence: The user wrote: ""Kubernetes put its three pods on three different nodes.""
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-06 · blocking · closed
criterion: human review (site-1, comment #6)
location: text "which loop is it, what does it want, what does it see, and what does it do about a gap"
evidence: The user wrote: "this is still confusing me - can we make it clearer that this is comparing desired state against realized state?"
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-07 · blocking · closed
criterion: human review (site-1, comment #7)
location: text "and the scheduler counts only the rest"
evidence: The user wrote: ""and the scheduler operates only on the rest""
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-08 · blocking · closed
criterion: human review (site-1, comment #8)
location: text "Other providers publish their own numbers."
evidence: The user wrote: "this is kind of dangling information, let's just delete this line"
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-09 · blocking · closed
criterion: human review (site-1, comment #9)
location: text "on moving day"
evidence: The user wrote: "remove "on moving day""
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-10 · blocking · closed
criterion: human review (site-1, comment #10)
location: text "about a gap"
evidence: The user wrote: "something more like a discrepancy between the desired and real state. "a gap" is too vague"
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-11 · blocking · closed
criterion: human review (site-1, comment #11)
location: text "W-01"
evidence: The user wrote: "Instead of W-01, let's say "The following widget""
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-12 · blocking · closed
criterion: human review (site-1, comment #12)
location: text "Its drawing is Chapter 4’s, with one change: it now counts in real units."
evidence: The user wrote: ""It's drawn similar to how it was in Chapter 4's, with one...""
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-13 · blocking · closed
criterion: human review (site-1, comment #13)
location: text ", as it did on moving day."
evidence: The user wrote: "delete this"
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-14 · blocking · closed
criterion: human review (site-1, comment #14)
location: text "None of the three has a node yet, so nothing new is running."
evidence: The user wrote: ""Nothing new is running yet.""
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-15 · blocking · closed
criterion: human review (site-1, comment #15)
location: text "more than the Pod’s 2 GB"
evidence: The user wrote: "more than the Pod's request of 2GB"
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-16 · blocking · closed
criterion: human review (site-1, comment #16)
location: text "Chapter 3 kept its drawings clear of this case on purpose, but on a real cluster it’s common."
evidence: The user wrote: "not sure what reflecting back to chapter 3 gets us here, let's nix it. Noting that this is common is worthwhile though."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-17 · blocking · closed
criterion: human review (site-1, comment #17)
location: text "But the memory came in pieces of 1 GB, one on each node, and a Pod runs on one node, so the pieces never add up: both of its numbers have to fit on the same node."
evidence: The user wrote: "At this point I feel like we're repeating this over and over, consider whether this is getting repetitive please. I don't want to hammer the reader over the head, they'll understand quickly from the widget above."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-18 · blocking · closed
criterion: human review (site-1, comment #18)
location: text "In the provider’s standard mode"
evidence: The user wrote: "what provider means here might seem a bit confusing."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-19 · blocking · closed
criterion: human review (site-1, comment #19)
location: text "are the bill"
evidence: The user wrote: "constitute the bill"
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-20 · blocking · closed
criterion: human review (site-1, comment #20)
location: text "and there are five because of the requests"
evidence: The user wrote: "this is confusing me, are the requests provisioning nodes? We haven't learned about that yet, we are right now talking about pods."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-21 · blocking · closed
criterion: human review (site-1, comment #21)
location: text "What payments actually uses doesn’t change."
evidence: The user wrote: "This is confusing. "uses" here could be construed as using memory, as I think it's intended, but also uses as in using the space afforded to it by the request. Let's pick better wording."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-22 · blocking · closed
criterion: human review (site-1, comment #22)
location: block on "C Each payments Pod blocks twice the room, so nodes fill sooner: more nodes, or Pods left waiting. CORRECT" (selector `#s-04 > div:nth-of-type(1) > ul:nth-of-type(1) > li:nth-of-type(3)`)
evidence: The user wrote: ""potentially more nodes, or Pods left waiting.""
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-23 · blocking · closed
criterion: human review (site-1, comment #23)
location: pen on "§ 04 What Morgan pays for In the provider’s standard mode, which is the one Fennel uses, the bill counts machines. Fennel pays for each node for as long as it e…" (selector `#s-04`; shot review/human-site-1/shots/c13t1ung1i1hqs343pht5.png)
evidence: The user wrote: "let's move the reset button up here. Just make it say "reset""
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-24 · blocking · closed
criterion: human review (site-1, comment #24)
location: block on "MEMORY REQUESTS, PER COPY" (selector `#s-04 > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > p:nth-of-type(1)`)
evidence: The user wrote: "Let's move these controls to the top left of the widget, that way it's immediately clear these are the knobs for the widget."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-25 · blocking · closed
criterion: human review (site-1, comment #25)
location: block on "MEMORY REQUESTS, PER COPY" (selector `#s-04 > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > p:nth-of-type(1)`)
evidence: The user wrote: "It's confusing that payments isn't on this widget. Let's add it."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-26 · blocking · closed
criterion: human review (site-1, comment #26)
location: text "Nodes04what Fennel rents, and pays for in standard mode3 for the Pods + 1 spareSet byProcessorfor the Pods, memory alone needs 2, processor alone 3Reserved25.5 of 52 GBUsed at the rush19.5 GB"
evidence: The user wrote: "All this information is extraneous and noisy, let's delete it. It's captured in the visualization below."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-27 · blocking · closed
criterion: human review (site-1, comment #27)
location: text "used 2 GB · Over"
evidence: The user wrote: ""used 2 GB at rush" (we may need to indicate over elsewhere so it fits)."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-28 · blocking · closed
criterion: human review (site-1, comment #28)
location: block on "W-02 is Ari’s sizing sheet. It opens on Fennel’s requests as the teams set them, and counts the nodes those requests need if the Pods are packed as tightly as they will go, plus one spare node so that Fennel can lose a node, as it did at 03:04. Each Pod’s outline is what it reserves, and the solid fill inside it is what it used at last Friday’s rush. There is no target to reach; here are three things to notice:" (selector `#s-04 > p:nth-of-type(2)`)
evidence: The user wrote: "Let's rewrite this. Don't reference Ari's sizing sheet. Let's do something along the lines of: The following widget simulates how the scheduler operates. We begin by setting the memory requests to those Fennel has been using in this lesson. Then we follow up on the questions, guiding exploration."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-29 · blocking · closed
criterion: human review (site-1, comment #29)
location: block on "THE NODES, PACKED AS TIGHTLY AS THEY GO" (selector `#s-04 > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > p:nth-of-type(1)`)
evidence: The user wrote: "It took me a bit too long to realize the boxes here indicated two colors, one for peak usage, and one for request size. I think the label with the same background color as unused is very confusing. You think maybe we can make the label sit above the box? Or perhaps on the top or bottom border of the box somehow? We should also maybe make the darker red use a hatch mark to make it clearer it's a visualization element."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-30 · blocking · closed
criterion: human review (site-1, comment #30)
location: block on "ROOM FOR PODS ON THE RENTED NODES" (selector `#s-04 > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > p:nth-of-type(1)`)
evidence: The user wrote: "Let's move this "room for pods" visual bar over to the right, so it sits under the right column, that makes the left column the controls and the right column the outcome. Easier design!"
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-31 · blocking · closed
criterion: human review (site-1, comment #31)
location: block on "W-02’s bar headed “Room for Pods on the rented nodes” shows what the Pods used, and splits the room they don’t use into two kinds. The first is room that no Pod has reserved, either because there are more nodes than the reservations need or because the room is stranded in pieces too small for any Pod. The second is room that Pods have reserved and don’t use, because their requests are bigger than the service needs. The “less than a third busy” on Ari’s dashboard counts both kinds together." (selector `#s-04 > p:nth-of-type(5)`)
evidence: The user wrote: "This paragraph is too wordy and just rehashes what the widget above explained, let's avoid a redundancy here. I don't want to delete, it because the "how common is this" below this is really good to have, and it needs to be attached to this somehow, so consider reducing this paragraph. a bunch."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-32 · blocking · closed
criterion: human review (site-1, comment #32)
location: block on "If you’re billed per Pod, the picture shifts, but the lesson stays the same. In most setups you pay for the machines; a few per-Pod options bill for what each Pod requests while it runs, not for what it uses. So padding costs money there too, Pod by Pod. And not every fully managed mode bills per Pod: some still bill per machine." (selector `#s-04 > p:nth-of-type(6)`)
evidence: The user wrote: "This paragraph seems a bit garbled. We can indicate that billing per pod is an option but the lessons stay the same. I'm having trouble identifying the value this paragraph is adding."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-33 · blocking · closed
criterion: human review (site-1, comment #33)
location: text "why it might."
evidence: The user wrote: "why Fennel might want to do that."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-34 · blocking · closed
criterion: human review (site-1, comment #34)
location: text "On top of that, on every node about 3 GB of the 16 GB machine is kept back for the system, where no Pod can reserve it, and Fennel pays for it anyway. The bill also has a small fee per cluster for the control plane, which Chapter 14 covers. Requests closer to what each service uses at its busiest would let Fennel rent fewer nodes, but not as few as possible, and §05 and §08 explain why."
evidence: The user wrote: "We're repeating ourselves too much here. This whole paragraph is overly wordy. We made our point, we taught the reader what the scheduler does, so if we're trying to "bring it home" let's hit on the key point, not some arbitrary arithmetic and details that don't matter right now."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-35 · blocking · closed
criterion: human review (site-1, comment #35)
location: text "Friday showed what a cluster with"
evidence: The user wrote: "Friday is a day, it can't show anything. This is splitting attention again."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-36 · blocking · closed
criterion: human review (site-1, comment #36)
location: block on "§ 05 Room on purpose" (selector `#room-on-purpose`)
evidence: The user wrote: "This section is overly wordy. My take on it, we need extra nodes in case one node goes down. The scheduler, when shifting the pods to other nodes, can run out of room on those nodes. The spare nodes are insurance for this reason. This paragraph isn't even mentioning nodes going down. It's blaming things on Friday. Come on."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-37 · blocking · closed
criterion: human review (site-1, comment #37)
location: block on "§ 06 Machines of different kinds: node pools" (selector `#node-pools`)
evidence: The user wrote: "Hm, I think this section is somewhat well written but I'm a bit confused by them here. They are presented a bit like the solution to "what if orders grows beyond 13gb" but I would assume the answer is "bigger node" - is a node pool necessary to introduce nodes bigger than 13gbs or something? Also, we learned about replicaset manifests setting the requests for memory allocation but we haven't learned anything at all yet about how k8s provisions nodes (and the writing here is pretty inviting to the idea that it doesn't, conveying in several challenges that it's your job to provision nodes) so why are we learning about node pools? Consider maybe this chapter is extraneous, or at least needs some better introduction."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-38 · blocking · closed
criterion: human review (site-1, comment #38)
location: text "A manifest can hold a second number for each resource, and orders’ manifest does. Fig. 04 shows the section that sets both: what each copy reserves, its requests of 6 GB of memory, and the most it may use, its limits of 7 GB."
evidence: The user wrote: "This is an extremely tedious way of introducing the word "limits""
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-39 · blocking · closed
criterion: human review (site-1, comment #39)
location: text "what a copy reserves, and the most it may use."
evidence: The user wrote: "requests are a what the copy reserves, and limits are the maximum it may use on the node."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-40 · blocking · closed
criterion: human review (site-1, comment #40)
location: text "The second number in Fig. 04."
evidence: The user wrote: "Split attention, and highly irrelevant"
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-41 · blocking · closed
criterion: human review (site-1, comment #41)
location: block on "§ 07 Tuesday: when a Pod uses too much" (selector `#tuesday`)
evidence: The user wrote: "This section is actually the first time we learn that pods can go over their requests. This came as a bit of a surprise to me. Let's maybe acknowledge that up front in the section here."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### H-42 · blocking · closed
criterion: human review (site-1, comment #42)
location: text "just as it did with Chapter 4’s crash-looping notifications."
evidence: The user wrote: "just as it does with crash-looping, like we saw in Chapter 4."
expected_fix: What the user asks for in their comment. If the intent is unclear, ask the user; don't guess.

### P-01 · blocking · closed
criterion: ac-17 (no giveaways: the right option is never the longest)
location: s-04 k-04, k-05; s-06 k-06; s-07 k-07; s-08 k-08
evidence: Option text lengths in characters, with * marking the key. k-04: 97 / 106 / *108. k-05: 93 / *103 / 92. k-06: *80 / 79 / 79. k-07: 72 / 74 / *83. k-08: *89 / 78 / 84. In 5 of 8 choice checks the key is the longest option, and in k-05, k-07 and k-08 by 5–11 characters. A reader who picks the longest option scores 5 of 8. Ch 4's P-01 was blocking for the same kind of giveaway.
expected_fix: Make each key no longer than at least one distractor, without changing meaning. Examples: k-07 C → "`storefront` slows down; `orders` is killed and restarted." k-08 A → "Fewer nodes, but Pods over their reservations get evicted when a node runs short." k-05 B → "Nothing: it places only new Pods, and both nodes stay on the bill until someone removes them." Lengthen one distractor slightly in k-04 and k-06 (for example k-06 C: "Neither: Kubernetes replaces Pods when a machine goes, so either service can run there.").
closure_evidence: Measured in index.html (characters, * = key): k-04 97 / 116 / *108; k-05 96 / *93 / 77; k-07 76 / 74 / *72; k-08 *81 / 78 / 84. k-06 was cut with §06 (d-12). A reader who always picks the longest option now scores 0 of 7 choice checks (the longest is never the key). k-04's key got longer for H-22 ("potentially"), but B grew to 116 for H-21, so the key is still not the longest.

### P-02 · should · closed
criterion: ac-17 (no option answered by a nearby caption or card) / misconception confrontation (m-08, local-01)
location: s-04 k-05 with the W-02 caption (`.cp-wcap` directly above it); s-02 k-02 with TERM 01 (`#term-01`)
evidence: The W-02 caption, the line right above k-05, says "while a real cluster never moves running Pods". Both k-05 distractors (A "Moves their Pods onto the fuller nodes…", C "Spreads Pods from the fuller nodes…") depend on moving running Pods, so the caption rules them out and m-08 is never really tested. TERM 01, about two screens above k-02, defines requests as "…The scheduler places Pods by their requests, never by what they use", which is k-02's answer. The plan sequenced "reservations, not use" after k-02 so that k-02 would be a prediction, and the card turns it into recall.
expected_fix: Reword k-05's distractors so the caption doesn't refute them while they still carry m-08. For example A: "After a while it notices the two idle nodes and stops renting them, since fewer nodes cost less." Keep C as the balancer lure without "moves" (for example "Starts new copies on 05 and 06 so that every node ends up about equally busy"). Shorten TERM 01's definition to "The memory and processor a Pod reserves on its node, written in its manifest; the scheduler places Pods by them." "Never by what they use" already appears in k-02's reveal paragraph and in the recap.
closure_evidence: k-05 A now reads "After a while it notices the two idle nodes and stops renting them, since fewer nodes cost less." (m-08), and C reads "Starts new copies on 05 and 06 so that every node ends up about equally busy." Neither depends on moving running Pods, so the caption's "a real cluster never moves running Pods" no longer rules them out. TERM 01 now reads "…written in its manifest; the scheduler places Pods by them." It no longer says "never by what they use", so k-02 is a prediction again.

### P-03 · should · closed
criterion: engagement where intended (sandbox serves the conversation) / ac-16
location: s-09 k-09 reveal, "(try `orders` at 8 and then 12 GB in W-02)"; w-sizing-sandbox
evidence: Probe. From the default or reset state, `orders` at every value from 6.5 to 13 GB gives "5 nodes, set by memory". 8 and 12 change nothing, because node 1 and the 11 GB free on node 4 absorb the growth. A node is added only if storefront is 2.5 and dispatch 1.5 first (then `orders` 11.5 → 4 nodes, 12 → 5). A reader who follows the instruction sees the opposite of "that can mean another node on the bill".
expected_fix: Make the pointer reproducible from where the reader starts. For example: "(in W-02, set `storefront` to 2.5 GB and `dispatch` to 1.5 GB, then try `orders` at 8 and at 12 GB)". Or name the reset state and values that do move the count.
closure_evidence: The pointer now reads "(in the sizing widget in §04, from Fennel's requests, try `orders` at 5 GB and then at 5.5 GB)". State sweep from defaults: `orders` 5 gives "3 NODES FOR THE PODS + 1 SPARE", and 5.5 gives "4 NODES FOR THE PODS + 1 SPARE". Adding the `payments` stepper didn't change the defaults, so the step still reproduces.

### P-04 · should · closed
criterion: precise language (no double counting; the user's Ch 2–4 standards)
location: s-04, Morgan's answer ("So here is the answer to Morgan's question, with the biggest cause first…")
evidence: The first cause is "Fennel rents two extra nodes because … padded requests had filled three nodes", and the second is "Next, node 06 has stayed nearly empty since Friday, which makes it a node's worth of spare room". Node 06 is one of the two extra nodes, so the second cause is part of the first, while the paragraph presents three separate causes, biggest first. A manager can't tell whether 06 is waste from padding or insurance.
expected_fix: Present 06 as part of the first cause. For example: "Fennel rents five nodes instead of three because the teams' padded requests filled three nodes on paper on Friday, so Ari's team rented two more. One of those, node 06, has sat nearly empty since, which makes it a node's worth of spare room: whether to keep it is a choice, and the next section explains why it might be worth it. On top of that, on every node about 3 GB…"
closure_evidence: "Fennel rents five nodes because the teams' padded requests filled three nodes on paper while the services used far less, so Ari's team rented two more. One of those, node 06, has sat nearly empty since, a node's worth of spare room…" Node 06 is now part of the first cause, not a second one. The system-room clause was cut for H-34.

### P-05 · should · closed
criterion: no meta lines about the course (user's Ch 3 human review; brief Lessons "callbacks … not as bookkeeping")
location: s-01 last paragraph; s-02 paragraph before f-02; s-05 both paragraphs; recap line 3
evidence: The page announces that promises are being kept instead of just keeping them. Examples: "This chapter starts where Chapter 4 said it would, with the loop that picked node 04…"; "Chapter 3 promised that the two would be counted separately, and Fig. 02 shows why it matters"; "that missing room is what Chapter 4 said this chapter was about"; "Chapter 3 called spare room insurance and left 'how much?' to this chapter"; recap "nothing in this chapter makes room by itself". The user flagged the same move in Ch 3 ("Last chapter said … and that this chapter would place it … feels a bit too meta").
expected_fix: Keep the content and drop the course bookkeeping. s-01: "Ari's answer starts with the loop that picked node 04 for `orders` at 03:04, and ends with the questions Jordan should ask before anyone changes those two numbers." s-02: delete "Chapter 3 promised that the two would be counted separately, and". s-05: "Since 03:04, Fennel had been running on three nodes with almost nothing spare." / "In Chapter 3, Sam's spare machines were insurance; how much insurance to keep is a decision…". Recap: "nothing in Fennel's cluster makes room by itself".
closure_evidence: s-01: "Ari's answer starts with the loop that picked node 04 for `orders` after node 03 died…". s-02 has no "Chapter 3 promised". §05 opens "Nodes go down, as node 03 did in Chapter 4." The recap reads "nothing in Fennel's cluster makes room by itself". No course bookkeeping is left.

### P-06 · should · closed
criterion: ground before you use (user's Ch 4 human review 02: "What's moving day?"); §2.11 "I didn't read the last chapter"
location: s-01 D1; s-02 moving-day paragraph; w-friday-scrolly F1 text ("as it did on moving day")
evidence: s-02 builds its worked example on "on moving day in Chapter 4, `storefront`'s three Pods went to three different nodes…", and F1 says "as it did on moving day". D1, the jump-in disclosure, mentions manifests, the loops and 03:04, but never moving day. A reader who skipped Ch 4 meets "moving day" with no grounding, which is exactly the user's Ch 4 complaint. (Smaller: s-07's "Chapter 4's crash-looping `notifications`" also isn't in D1.)
expected_fix: Add one sentence to D1's first bullet, for example: "On moving day, Ari applied the manifests to the new cluster and the scheduler placed every service on nodes 01–04." Optionally gloss it inline in s-02 too: "on moving day in Chapter 4, when Fennel first applied its manifests to the new cluster".
closure_evidence: D1 now says "When Ari applied Fennel's manifests to the new cluster, its services were placed on the cluster's four nodes, 01 to 04. Ari applied storefront's manifest last, and Kubernetes put its three Pods on three different nodes." It also covers the Wednesday `notifications` crash loop. "Moving day" no longer appears anywhere: s-02 says "when Ari applied storefront's manifest to the new cluster", and F1 drops the clause (H-09, H-13).

### P-07 · should · closed
criterion: k-08 feedback consistent with W-02 (accuracy reviewer may also want this)
location: s-08 k-08, option A feedback
evidence: The feedback says "at the rush several services would use more than they reserved … (W-02's warnings show which services.)" With the story numbers, halving gives storefront 2 = used 2, dispatch 1 = used 1 and orders 3 against 5.5 used. Only `orders` is over, and W-02 at 2 / 3 / 1 shows exactly one warning (model check: over = ['orders']). A reader who tries it sees one service, not several.
expected_fix: "…but at the rush `orders` would use far more than it reserved (5.5 GB against 3) and others would sit right at their reservations. When a node runs short… (Set W-02 to half the requests to see which.)"
closure_evidence: "…at the rush orders would use far more than it reserved (5.5 GB against 3), and storefront and dispatch would sit right at their reservations… (Set the sizing widget in §04 to half the requests to see the warning.)" State sweep at 2 / 3 / 1 / 1: the live sentence reads "Over its reservation: orders.", which is one warning, as the feedback says.

### P-08 · should · closed
criterion: split attention and redundancy (pedantic caveats belong in the caption or a disclosure)
location: s-03: F3 step text (data.js), the W-01 caption, and the paragraph after TERM 02
evidence: "its exact wording varies between Kubernetes versions" appears three times in about one screen: at the end of F3's second paragraph, in the W-01 caption, and again in "…which is in the format engineers see, though the exact wording varies between Kubernetes versions." The plan put it in the caption only.
expected_fix: Keep the caption and delete the clause from F3's step text and from the paragraph after TERM 02.
closure_evidence: F3 ends "…records why, in a line in the format engineers see." The paragraph after TERM 02 ends "…which is in the format engineers see." Only the W-01 caption keeps "its exact wording varies between Kubernetes versions".

### P-09 · nit · open
criterion: split attention (labels match the prose that points at them)
location: s-04 "W-02's idle bar…"; s-05 "the spare-node switch in W-02"; w-sizing-sandbox `.ssw__idle` head, `.ssw__switch`
evidence: The prose says "idle bar", but the widget heads that bar "THE RENTED ROOM". The prose says "spare-node switch", but the switch reads "Keep room to lose a node". The reader has to search the widget for a name that isn't printed on it.
expected_fix: Either head the bar "The rented room · idle bar" (SHEET.idle.head) or say "W-02's rented-room bar" in the prose. In s-05, write "the 'Keep room to lose a node' switch in W-02".
closure_evidence: The original mismatch is fixed. The switch is quoted by its printed label ("the "Keep room to lose a node" switch in the widget above", §05), and "idle bar" is gone. The H-31 rewrite now points to the bar by position, "the bar under the widget's nodes". Under 600px the widget puts the bar above the nodes (count → room bar → nodes, r2-pedagogy-ux-w360-ss-default.png), so on a phone the reader looks under the nodes and finds no bar.

### P-10 · nit · closed
criterion: engagement where intended (k-04 → sandbox hand-off); sandbox prompts
location: s-04 k-04 key feedback; third "thing to notice"
evidence: k-04's feedback ends "W-02, below, shows how far it goes", but `payments`' request is fixed in W-02, so the reader can't try k-04's case. The third prompt, "Push `orders` past 13 GB.", is the only one that doesn't ask a question.
expected_fix: Change the feedback to "W-02, below, lets you try the same with `storefront`, `orders` and `dispatch`." Make the prompt "Push `orders` past 13 GB. What happens to the count?"
closure_evidence: `payments` is now adjustable (H-25). k-04's key feedback ends "the following widget lets you try it", and the second thing to try is "Double payments' request, as in the question above. Does the count change? How far can it go before it costs a node?" The probe confirms it: 4 → 4 + 1, 7 → 4 + 1, 7.5 → 5 + 1. The third prompt is a question: "Push orders past 13 GB. What happens?"

### P-11 · nit · open
criterion: clarity of interaction / things different in kind drawn differently (lane chips)
location: w-friday-scrolly F2, F3, F4 (pool `renderCluster` waiting and notstarted chips); screenshots pux-r1-w768-lane-F2.png, pux-r1-zoom768-F3-top.png
evidence: The waiting Pod's chip reads only "WAITING", inside a strip already headed "WAITING · NO ROOM", and never says `dispatch`. At 768 the chip is about 420px wide. F2's new Pods read only "NOT STARTED" at 390 and 768. The reader infers the service from the record row.
expected_fix: In the pool renderer, label waiting chips with the service name (the strip header carries the status), and show "dispatch · NOT STARTED" where the chip is wide enough.
closure_evidence: At 768 and 1280 the waiting chip in the "WAITING · NO ROOM" strip still reads only "WAITING" and never names `dispatch` (r2-pedagogy-ux-w768-lane-F3.png, r2-pedagogy-ux-w1280-lane-F3.png). Report 09 left it to a pool change, which hasn't been made. The record row ("dispatch … 5 RUNNING · 1 WAITING") still carries the service.

### P-12 · nit · closed
criterion: cognitive load fit (one moment per frame)
location: w-friday-scrolly F2 at 600–899px (wide verdict form); pux-r1-w768-lane-F2.png
evidence: Node 02's bar reads "FITS · 3 GB · 1.15 CORES FREE", while the drawing under it already shows the second Pod placed and 1 GB free. The VERDICTS note qualifies it, but at the lane's second-hardest step the same node shows two different free amounts. (On desktop the canvas is 477px wide, so it uses the short forms without amounts, which avoids the clash but drops the free amounts the plan wanted on the bars.)
expected_fix: For F2 only, drop the free amounts from the wide verdicts (or phrase them "had 3 GB · 1.15 cores"), since the step text already gives them.
closure_evidence: The wide verdicts now read "3 GB · 1.15 CORES / FREE WHEN CHECKED" (STRINGS.verdict.free). The amount is labelled as the moment of the check, so it no longer contradicts the drawn 1 GB box. At 768, F3's verdicts read "1 GB · 0.9 CORES FREE WHEN CHECKED" (r2-pedagogy-ux-w768-lane-F3.png), which is also true.

### P-13 · nit · open
criterion: visual consistency and polish (highlight outlines)
location: pool/cluster/cluster.css highlight on the waiting strip and verdict boxes; pux-r1-zoom768-F3-top.png, pux-r1-w1280-lane-F3.png
evidence: The 3px highlight border is drawn tight to its content. "WAITING · NO ROOM" and "NO MEMORY · NO PROCESSOR" start on the left border, and "1 GB · 2.15 CORES FREE" touches the right one.
expected_fix: Add about 4px of inner padding (or outline-offset) to highlighted verdicts and the waiting strip.
closure_evidence: Unchanged; report 09 left it for the pool. At 768 "WAITING · NO ROOM" starts on the strip's left outline, and "NO MEMORY · NO PROCESSOR" fills its verdict box edge to edge (r2-pedagogy-ux-w768-lane-F3.png). At 1280 "WAITING · NO ROOM" sits on the outline (r2-pedagogy-ux-w1280-lane-F3.png).

### P-14 · nit · closed
criterion: ac-09 (idle bar labelled on the bar) / style guide ("no legends unless there are more than four series")
location: w-sizing-sandbox `.ssw__ilabels.is-stack`; pux-r1-w768-ss-default-el.png, pux-r1-w1280-ss-inflated.png, pux-r1-w1280-ss-minimal.png
evidence: At 768, and at 1280 when one segment dominates (everything inflated), the three labels fall back to a stacked swatch legend under the bar. In low-request states the "used" segment gains a hatched part (use above reservation) that has no label anywhere.
expected_fix: Before falling back, let the labels wrap to two lines under their segments (or allow the labels to overhang the narrow segment). Label the hatch, for example "of which over its reservation · n GB", or mention it in the warnings.
closure_evidence: The three labels sit under their own segments with ticks at 1280, 768 and 360, in default, over and inflated states. The stacked swatch legend never appeared in the sweep. The over part is labelled on the bar ("OVER" tag where it fits) and in the warnings line with a swatch (r2-pedagogy-ux-w1280-ss-over.png, r2-pedagogy-ux-w1280-ss-inflated.png).

### P-15 · nit · closed
criterion: visual consistency and polish (sandbox drawing)
location: w-sizing-sandbox nodes at low requests (minimal state, node 2); chip labels "notifi-", "pay-"
evidence: In the minimal state, storefront's hatched overflow is drawn over the `notifications` chip above it and crosses its label (pux-r1-w1280-ss-minimal.png, pux-r1-dark1280-ss-minimalish.png). The sandbox cuts labels with a hyphen ("notifi-"), while lane F deliberately uses an ellipsis ("notific…") because a hyphen reads as a word break.
expected_fix: Draw overflow behind neighbouring chips' labels, or stop it at the chip above with a hatch cap. Use the lane's one-line names in SizingData's `breaks` (ellipsis cut).
closure_evidence: In the over state (storefront 1, orders 3), the overflow hatch on node 2 sits under `notificat…`'s name tab without crossing it (r2-pedagogy-ux-w1280-ss-over.png). Names are cut with an ellipsis ("notificat…", "notific…"), as in the lane. Chips too short to name are listed under the drawing ("Too short to name on the drawing: storefront (3 × 1 GB)").

### P-16 · nit · closed
criterion: readable prose (user's Ch 4 human review 01)
location: hero standfirst; s-01 third paragraph
evidence: The standfirst says "This chapter traces that bill, a Pod that wouldn't start and a service that kept restarting back to two numbers…". The long list sits between "traces" and "back to", which makes a garden path. s-01: "Before the move, Fennel had given back the spare machines Sam used to keep and ran on four" can be misread as "Sam used to keep and ran on four".
expected_fix: Standfirst: "…traces three problems, a bill that went up, a Pod that wouldn't start and a service that kept restarting, back to two numbers each team wrote down…". s-01: "Before the move, Fennel had given back the spare machines Sam used to keep and was running on four, and the new bill was higher than any from those days."
closure_evidence: The standfirst was rewritten for H-01: "…That same month, a Pod wouldn't start and a service kept restarting. This chapter traces all three problems back to the same two numbers, which each team wrote down for every service…". The garden path is gone. s-01: "…given back the spare machines Sam used to keep and was running on four…".

### P-17 · nit · closed
criterion: visual consistency and polish (check feedback)
location: `.cp-retry` in assets/page.css (the same rule is in Ch 4, so it's course-wide); every wrong-answer feedback, e.g. pux-r1-w1280-k03-wrongB.png, pux-r1-w360-k-08-commit.png
evidence: The inline TRY AGAIN button has min-height 44px, so it stretches its line box and leaves a visible gap in the middle of the feedback sentence ("each node here has only 1 / [gap] / GB free. TRY AGAIN").
expected_fix: Put the retry button on its own line after the feedback text (display block or inline-flex in its own paragraph), keeping the 44px target.
closure_evidence: TRY AGAIN now sits on its own line under the feedback paragraph, and the sentence has no gap (r2-pedagogy-ux-w360-k08-wrong.png, r2-pedagogy-ux-w768-k03-wrong.png).

### P-18 · nit · closed
criterion: visual consistency and polish (figures)
location: f-07 leak chart; f-06 at 360px
evidence: In f-07, the "orders per hour" label sits on the traffic band and the memory line in the leak chart (pux-r1-w1280-k-09-revealed.png, w360). In f-06 at 360, "SAM'S JOB" in the dashed Chapter 8 card crowds the card's right edge, and the tfoot note has no side padding (pux-r1-w360-f-06.png). The ReplicaSet "does" cell is tagged NEW IN CH 5 as a whole, although only "including for Pods that were evicted" is new.
expected_fix: Move the band label above the band or into the axis margin. Give the stacked-card header and tfoot the card's padding. Tag only the new clause (for example, wrap it in the tag's style) or move the tag after "…extras,".
closure_evidence: Fig. 06's "orders per hour" key now sits under the day ticks, off the band and the line (r2-pedagogy-ux-w1280-k09-reveal.png). Fig. 05 at 360: "SAM'S JOB" no longer crowds the card edge, the footnote has side padding, and NEW IN CH 5 tags only "including for Pods that were evicted" (r2-pedagogy-ux-w360-fig05.png).

### P-19 · nit · closed
criterion: reading time (d-05: route over-length to the cut order; information only)
location: whole page
evidence: My estimate is about 30 minutes (28–32) against the brief's 26, with the gate at 26.6. The overruns are §02 (about 6 minutes against 4.0), §03 with the lane (about 6 against 4.0) and §04 (about 7 against 5.0). Details are in ## Reading time.
expected_fix: No builder action. For the user's human review: `cut-list.md` `## If it runs long`, items 1–7 in order (about −5 minutes). Prose is not to be compressed.
closure_evidence: I now estimate about 23–24 minutes (see ## Reading time), against the brief's 26, down from about 30 in round 1. Revision 1's cuts (§06, the Morgan's-answer details, the §05 rebuild) did the work, and no prose was compressed.
