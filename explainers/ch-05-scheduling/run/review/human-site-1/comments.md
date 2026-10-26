# Human review: site, round 1

_Submitted 2026-10-25T23:04:18-04:00 · index.html · 42 comment(s). Reviewed on the frozen copy in `build/` (sha256:087548250e75e570f4a4bb48ce990c3d06f58f48bb3b37acd698245571f2ba63). Each block is the user's own words._

### #1 · open
type: highlight
quote: "This chapter traces three problems, a bill that went up, a Pod that wouldn’t start and a service that kept restarting, back to two numbers each team wrote down for its services"
context: …es is higher than the last one before the move. [This chapter traces three problems, a bill that went up, a Pod that wouldn’t start and a service that kept restarting, back to two numbers each team wrote down for its services] , and shows how Kubernetes uses them to decide w…

> this sentence is a little unclear

### #2 · open
type: highlight
quote: "Since 03:04,"
context: …s where Morgan’s bill comes from. [Since 03:04,] Fennel’s cluster has run on three nodes: 01, 02…

> we're splitting attention here, extraneous load, the reader doesn't need to remember 3:04, they need to remember specifically when node 3 died, "Since 3:04, when node 3 died,"

### #3 · open
type: highlight
quote: "saying"
context: …into its service’s manifest when Fennel moved, [saying] how much memory and how much processor each cop…

> manifest don't speak. How about "declaring"

### #4 · open
type: highlight
quote: "One unit of room in Chapter 4 stood for 2 GB of memory request, so storefront’s two units are the 4 GB in Fig. 01. A node’s six units made 12 GB. The real figure, given just below, is about 13 GB, but none of Chapter 4’s sizes needed that last 1 GB."
context: …ngineers call these numbers the Pod’s requests. [One unit of room in Chapter 4 stood for 2 GB of memory request, so storefront’s two units are the 4 GB in Fig. 01. A node’s six units made 12 GB. The real figure, given just below, is about 13 GB, but none of Chapter 4’s sizes needed that last 1 GB.] Fig. 01A mani…

> This is too much mental math and juggling of numbers. Maybe "Storefront’s two units of room appear as its real memory request: 4 GB."

### #5 · open
type: highlight
quote: "its three Pods went to three different nodes"
context: …04: Ari applied storefront’s manifest last, and [its three Pods went to three different nodes] . Many small loops each compare one…

> "Kubernetes put its three pods on three different nodes."

### #6 · open
type: highlight
quote: "which loop is it, what does it want, what does it see, and what does it do about a gap"
context: …To understand any loop, ask four things: [which loop is it, what does it want, what does it see, and what does it do about a gap] ? RET…

> this is still confusing me - can we make it clearer that this is comparing desired state against realized state?

### #7 · open
type: highlight
quote: "and the scheduler counts only the rest"
context: …oo. So part of each node is kept back for them, [and the scheduler counts only the rest] , which engineers call the node’s allocatable ro…

> "and the scheduler operates only on the rest"

### #8 · open
type: highlight
quote: "Other providers publish their own numbers."
context: …node keeps back about a quarter of its memory. [Other providers publish their own numbers.] Memory and processor are counted…

> this is kind of dangling information, let's just delete this line

### #9 · open
type: highlight
quote: "on moving day"
context: …them, it places them anyway. That’s why, [on moving day] in Chapter 4, when Ari applied storefront’s man…

> remove "on moving day"

### #10 · open
type: highlight
quote: "about a gap"
context: …sor each node has left unreserved. What it does [about a gap] is rule out the nodes that are too full, pick t…

> something more like a discrepancy between the desired and real state. "a gap" is too vague

### #11 · open
type: highlight
quote: "W-01"
context: …hanges the number in dispatch’s manifest. [W-01] follows the next hour step by step as you scrol…

> Instead of W-01, let's say "The following widget"

### #12 · open
type: highlight
quote: "Its drawing is Chapter 4’s, with one change: it now counts in real units."
context: …llows the next hour step by step as you scroll. [Its drawing is Chapter 4’s, with one change: it now counts in real units.] Each node’s column stands for the 13 GB of memo…

> "It's drawn similar to how it was in Chapter 4's, with one..."

### #13 · open
type: highlight
quote: ", as it did on moving day."
context: …notices the gap and writes three new Pod records [, as it did on moving day.] None of the three has a node yet, so nothing ne…

> delete this

### #14 · open
type: highlight
quote: "None of the three has a node yet, so nothing new is running."
context: …three new Pod records, as it did on moving day. [None of the three has a node yet, so nothing new is running.] W…

> "Nothing new is running yet."

### #15 · open
type: highlight
quote: "more than the Pod’s 2 GB"
context: …them, the three nodes had 3 GB of memory free, [more than the Pod’s 2 GB] , and about 3 cores. But the memory came in piec…

> more than the Pod's request of 2GB

### #16 · open
type: highlight
quote: "Chapter 3 kept its drawings clear of this case on purpose, but on a real cluster it’s common."
context: …th of its numbers have to fit on the same node. [Chapter 3 kept its drawings clear of this case on purpose, but on a real cluster it’s common.] It matters to Morgan, too, because those leftov…

> not sure what reflecting back to chapter 3 gets us here, let's nix it. Noting that this is common is worthwhile though.

### #17 · open
type: highlight
quote: "But the memory came in pieces of 1 GB, one on each node, and a Pod runs on one node, so the pieces never add up: both of its numbers have to fit on the same node."
context: …e, more than the Pod’s 2 GB, and about 3 cores. [But the memory came in pieces of 1 GB, one on each node, and a Pod runs on one node, so the pieces never add up: both of its numbers have to fit on the same node.] Chapter 3 kept its drawings clear of this case…

> At this point I feel like we're repeating this over and over, consider whether this is getting repetitive please. I don't want to hammer the reader over the head, they'll understand quickly from the widget above.

### #18 · open
type: highlight
quote: "In the provider’s standard mode"
context: …§ 04 What Morgan pays for [In the provider’s standard mode] , which is the one Fennel uses, the bill counts…

> what provider means here might seem a bit confusing.

### #19 · open
type: highlight
quote: "are the bill"
context: …reserved, used or empty. So Morgan’s five nodes [are the bill] , and there are five because of the requests: on…

> constitute the bill

### #20 · open
type: highlight
quote: "and there are five because of the requests"
context: …or empty. So Morgan’s five nodes are the bill, [and there are five because of the requests] : on Friday, three nodes couldn’t hold everythin…

> this is confusing me, are the requests provisioning nodes? We haven't learned about that yet, we are right now talking about pods.

### #21 · open
type: highlight
quote: "What payments actually uses doesn’t change."
context: …s team doubles its memory request “to be safe”. [What payments actually uses doesn’t change.] What does change for Fennel?…

> This is confusing. "uses" here could be construed as using memory, as I think it's intended, but also uses as in using the space afforded to it by the request. Let's pick better wording.

### #22 · open
type: block
on: "C Each payments Pod blocks twice the room, so nodes fill sooner: more nodes, or Pods left waiting. CORRECT"
selector: `#s-04 > div:nth-of-type(1) > ul:nth-of-type(1) > li:nth-of-type(3)`

> "potentially more nodes, or Pods left waiting."

### #23 · open
type: pen
on: "§ 04 What Morgan pays for In the provider’s standard mode, which is the one Fennel uses, the bill counts machines. Fennel pays for each node for as long as it e…"
selector: `#s-04`
shot: shots/c13t1ung1i1hqs343pht5.png

> let's move the reset button up here. Just make it say "reset"

### #24 · open
type: block
on: "MEMORY REQUESTS, PER COPY"
selector: `#s-04 > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > p:nth-of-type(1)`

> Let's move these controls to the top left of the widget, that way it's immediately clear these are the knobs for the widget.

### #25 · open
type: block
on: "MEMORY REQUESTS, PER COPY"
selector: `#s-04 > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > p:nth-of-type(1)`

> It's confusing that payments isn't on this widget. Let's add it.

### #26 · open
type: highlight
quote: "Nodes04what Fennel rents, and pays for in standard mode3 for the Pods + 1 spareSet byProcessorfor the Pods, memory alone needs 2, processor alone 3Reserved25.5 of 52 GBUsed at the rush19.5 GB"
context: …? W-02 · Ari’s sizing sheet [Nodes04what Fennel rents, and pays for in standard mode3 for the Pods + 1 spareSet byProcessorfor the Pods, memory alone needs 2, processor alone 3Reserved25.5 of 52 GBUsed at the rush19.5 GB] Room for Pods on the rented nodesOverUsed atthe…

> All this information is extraneous and noisy, let's delete it. It's captured in the visualization below.

### #27 · open
type: highlight
quote: "used 2 GB · Over"
context: …on no nodeMemory requests, per copystorefront ×3 [used 2 GB · Over] −1 GB+orders ×1used 5.5 GB · Over−1 GB+dispatch…

> "used 2 GB at rush" (we may need to indicate over elsewhere so it fits).

### #28 · open
type: block
on: "W-02 is Ari’s sizing sheet. It opens on Fennel’s requests as the teams set them, and counts the nodes those requests need if the Pods are packed as tightly as they will go, plus one spare node so that Fennel can lose a node, as it did at 03:04. Each Pod’s outline is what it reserves, and the solid fill inside it is what it used at last Friday’s rush. There is no target to reach; here are three things to notice:"
selector: `#s-04 > p:nth-of-type(2)`

> Let's rewrite this. Don't reference Ari's sizing sheet. Let's do something along the lines of:
> 
> The following widget simulates how the scheduler operates. We begin by setting the memory requests to those Fennel has been using in this lesson.
> 
> Then we follow up on the questions, guiding exploration.

### #29 · open
type: block
on: "THE NODES, PACKED AS TIGHTLY AS THEY GO"
selector: `#s-04 > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > p:nth-of-type(1)`

> It took me a bit too long to realize the boxes here indicated two colors, one for peak usage, and one for request size. I think the label with the same background color as unused is very confusing. You think maybe we can make the label sit above the box? Or perhaps on the top or bottom border of the box somehow? We should also maybe make the darker red use a hatch mark to make it clearer it's a visualization element.

### #30 · open
type: block
on: "ROOM FOR PODS ON THE RENTED NODES"
selector: `#s-04 > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > p:nth-of-type(1)`

> Let's move this "room for pods" visual bar over to the right, so it sits under the right column, that makes the left column the controls and the right column the outcome. Easier design!

### #31 · open
type: block
on: "W-02’s bar headed “Room for Pods on the rented nodes” shows what the Pods used, and splits the room they don’t use into two kinds. The first is room that no Pod has reserved, either because there are more nodes than the reservations need or because the room is stranded in pieces too small for any Pod. The second is room that Pods have reserved and don’t use, because their requests are bigger than the service needs. The “less than a third busy” on Ari’s dashboard counts both kinds together."
selector: `#s-04 > p:nth-of-type(5)`

> This paragraph is too wordy and just rehashes what the widget above explained, let's avoid a redundancy here. I don't want to delete, it because the "how common is this" below this is really good to have, and it needs to be attached to this somehow, so consider reducing this paragraph. a bunch.

### #32 · open
type: block
on: "If you’re billed per Pod, the picture shifts, but the lesson stays the same. In most setups you pay for the machines; a few per-Pod options bill for what each Pod requests while it runs, not for what it uses. So padding costs money there too, Pod by Pod. And not every fully managed mode bills per Pod: some still bill per machine."
selector: `#s-04 > p:nth-of-type(6)`

> This paragraph seems a bit garbled. We can indicate that billing per pod is an option but the lessons stay the same. I'm having trouble identifying the value this paragraph is adding.

### #33 · open
type: highlight
quote: "why it might."
context: …pare is a choice, and the next section explains [why it might.] On top of that, on every node about 3 GB of the…

> why Fennel might want to do that.

### #34 · open
type: highlight
quote: "On top of that, on every node about 3 GB of the 16 GB machine is kept back for the system, where no Pod can reserve it, and Fennel pays for it anyway. The bill also has a small fee per cluster for the control plane, which Chapter 14 covers. Requests closer to what each service uses at its busiest would let Fennel rent fewer nodes, but not as few as possible, and §05 and §08 explain why."
context: …ce, and the next section explains why it might. [On top of that, on every node about 3 GB of the 16 GB machine is kept back for the system, where no Pod can reserve it, and Fennel pays for it anyway. The bill also has a small fee per cluster for the control plane, which Chapter 14 covers. Requests closer to what each service uses at its busiest would let Fennel rent fewer nodes, but not as few as possible, and §05 and §08 explain why.] § 05 Room on purpose Friday showed what a…

> We're repeating ourselves too much here. This whole paragraph is overly wordy. We made our point, we taught the reader what the scheduler does, so if we're trying to "bring it home" let's hit on the key point, not some arbitrary arithmetic and details that don't matter right now.

### #35 · open
type: highlight
quote: "Friday showed what a cluster with"
context: …§ 05 Room on purpose [Friday showed what a cluster with] no spare room does on an ordinary busy evening:…

> Friday is a day, it can't show anything. This is splitting attention again.

### #36 · open
type: block
on: "§ 05 Room on purpose"
selector: `#room-on-purpose`

> This section is overly wordy. My take on it, we need extra nodes in case one node goes down. The scheduler, when shifting the pods to other nodes, can run out of room on those nodes. The spare nodes are insurance for this reason. 
> 
> This paragraph isn't even mentioning nodes going down. It's blaming things on Friday. Come on.

### #37 · open
type: block
on: "§ 06 Machines of different kinds: node pools"
selector: `#node-pools`

> Hm, I think this section is somewhat well written but I'm a bit confused by them here. They are presented a bit like the solution to "what if orders grows beyond 13gb" but I would assume the answer is "bigger node" - is a node pool necessary to introduce nodes bigger than 13gbs or something? Also, we learned about replicaset manifests setting the requests for memory allocation but we haven't learned anything at all yet about how k8s provisions nodes (and the writing here is pretty inviting to the idea that it doesn't, conveying in several challenges that it's your job to provision nodes) so why are we learning about node pools? Consider maybe this chapter is extraneous, or at least needs some better introduction.

### #38 · open
type: highlight
quote: "A manifest can hold a second number for each resource, and orders’ manifest does. Fig. 04 shows the section that sets both: what each copy reserves, its requests of 6 GB of memory, and the most it may use, its limits of 7 GB."
context: …at matters for you is the word before it. [A manifest can hold a second number for each resource, and orders’ manifest does. Fig. 04 shows the section that sets both: what each copy reserves, its requests of 6 GB of memory, and the most it may use, its limits of 7 GB.] A request isn’t a cap. A container may use more…

> This is an extremely tedious way of introducing the word "limits"

### #39 · open
type: highlight
quote: "what a copy reserves, and the most it may use."
context: …Fig. 04Two numbers per resource: [what a copy reserves, and the most it may use.] New term · 03 / 04…

> requests are a what the copy reserves, and limits are the maximum it may use on the node.

### #40 · open
type: highlight
quote: "The second number in Fig. 04."
context: …e; reserving room is the request’s job. [The second number in Fig. 04.] Fig. 05 shows orders’ memory through Tuesday, ag…

> Split attention, and highly irrelevant

### #41 · open
type: block
on: "§ 07 Tuesday: when a Pod uses too much"
selector: `#tuesday`

> This section is actually the first time we learn that pods can go over their requests. This came as a bit of a surprise to me. Let's maybe acknowledge that up front in the section here.

### #42 · open
type: highlight
quote: "just as it did with Chapter 4’s crash-looping notifications."
context: …agent waits longer and longer between restarts, [just as it did with Chapter 4’s crash-looping notifications.] New term · 04 / 04 OOM-…

> just as it does with crash-looping, like we saw in Chapter 4.
