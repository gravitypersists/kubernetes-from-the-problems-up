status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/index.html — page prose, checks, D1, D2, D5, D7 and term cards revised for the round-1 findings
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/assets/page.css — P-17 retry on its own line; P-18 f-06 phone layout (Sam's job column, tfoot padding) and the inline NEW IN CH 5 tag
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/assets/page.js — P-18: f-07 traffic label moved into the axis margin; f-06 can now tag part of a cell (`newPart`)
- Gate: /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/gate/page-round-7.json — PASS. Only the expected "pending widgets" notice. Reading time is about 26.7 min, text only.
- Probe shots: /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/screenshots/probe/b08-*.png (f-06 at 360, 390 and 1280; f-07 at 360 and 1280; the k-07 retry at 360; the sandbox with orders at 5 GB and 6 GB)

summary: I fixed every page finding in the handoff and touched nothing in the widget folders or the pool. Every check's key is now shorter than at least one distractor. Meanings and key letters are unchanged, except that k-05's distractors were reworded for P-02. I wrote the k-09 pointer again from the model sweep and checked it in the browser from the sandbox's default state. Each fix's word count stays close to the text it replaced, and nothing was trimmed (d-05).

P-01 option lengths in characters (* marks the key):
- k-01: A 99 / B 96 / *C 88
- k-02: A 107 / *B 96 / C 115
- k-03: *A 91 / B 90 / C 92
- k-04: A 97 / B 106 / *C 96
- k-05: A 96 / *B 93 / C 77
- k-06: *A 80 / B 79 / C 87
- k-07: A 76 / B 74 / *C 72
- k-08: *A 81 / B 78 / C 84

k-09 browser check (probe at 1280, fresh load, which is the default state):
- Fennel's requests 4 / 6 / 2: NODES 05, "4 for the Pods + 1 spare".
- Lower `orders` twice to 5 GB: NODES 04, "3 for the Pods + 1 spare". Live line: "orders request 5 GB. 4 nodes, set by both. 37 of 52 GB reserved…"
- Raise once to 5.5 GB: NODES 05, "4 + 1 spare". At 6 GB it is still 05.
- The model sweep confirms that from the defaults, every `orders` value from 5.5 to 13 GB gives 5 nodes, so no raise above 6 can add a node.
- The pointer now reads "(in W-02, from Fennel's requests, try `orders` at 5 GB and then at 5.5 GB)".

concerns:
- At 5 GB, W-02 shows its "orders … over its reservation" warning, because orders used 5.5 GB at the rush. That is accurate and harmless, but the reader will see it on the way. A pointer that adds a node without any warning would need a non-default start, which the handoff ruled out.
- A-04: besides softening TERM 03, I added one sentence to D7 about a limit set without a request (facts.md q-3 note). It is a small addition to that disclosure.
- P-18, f-07: the "orders per hour" key (a swatch plus the label, under the day ticks) is now on both small charts, not only the leak chart, so the stacked phone layout reads the same. Both charts are 18px taller.
- P-18, f-06 on phones: to stop "SAM'S JOB" crowding the card edge, I let a long loop name wrap inside its pill. Only "a loop that adds nodes" wraps, at 360 and 390.
- The sandbox builder has already renamed the bar's head to "Room for Pods on the rented nodes", so s-04's prose matches what the widget prints.

relaxed:
- none

dispositions:
- P-01: fixed — k-04 key C: "on its node" dropped. k-05: key B shortened, and A and C rewritten (see P-02). k-06 C: "service" added. k-07 key C now "`storefront` slows; `orders` is killed and restarts, failing orders briefly.", and A gets "each of them". k-08 key A: "Pods over their reservations get evicted when a node runs short." Measured lengths are above.
- P-02: fixed — k-05 A is now "After a while it notices the two idle nodes and stops renting them, since fewer nodes cost less." (m-08: gives nodes back). C is now "Starts new copies on 05 and 06 so that every node ends up about equally busy." (the balancer lure). Neither depends on moving Pods, so the W-02 caption no longer rules them out, and both feedbacks were rewritten to match. TERM 01's definition is now "…written in its manifest; the scheduler places Pods by them.", so it no longer gives away k-02's answer.
- A-01: fixed — the pointer was replaced and verified in the browser from the default state (see above).
- P-03: fixed — same change as A-01.
- A-02: fixed — k-08 A's feedback now says only `orders` would go over (5.5 GB against 3), with storefront and dispatch right at their reservations, and ends "(Set W-02 to half the requests to see the warning.)". The model at 2 / 3 / 1 gives over = ['orders'].
- P-07: fixed — same change as A-02.
- P-04: fixed — Morgan's answer now reads "Fennel rents five nodes instead of three because … so Ari's team rented two more. One of those two, node 06, has sat nearly empty since, which makes it a node's worth of spare room…; On top of that, on every node about 3 GB…"
- P-05: fixed — s-01's last paragraph now opens "Ari's answer starts with the loop that picked node 04 for `orders` at 03:04…". In s-02, "Chapter 3 promised…" is deleted. In s-05, "what Chapter 4 said this chapter was about" is gone. The recap says "nothing in Fennel's cluster makes room by itself".
- A-09: fixed — together with P-05, s-05 now says "In Chapter 3, Sam kept spare room "for when something breaks". How much of it to keep has no single right answer: it's a decision…". This matches what Ch 3 actually says.
- P-06: fixed — D1's first bullet adds moving day (services moved onto nodes 01 to 04; Ari applied `storefront`'s manifest last; its three Pods went to three different nodes). D1's third bullet adds `notifications`' Wednesday crash loop with back-off. s-02 glosses moving day inline: "when Ari applied `storefront`'s manifest to the new cluster".
- P-08 (page part): fixed — the version-wording clause is removed from the paragraph after TERM 02. The W-01 caption keeps it.
- A-08 / P-09 (page part): fixed — s-04 now says "W-02's bar headed "Room for Pods on the rented nodes" shows what the Pods used, and splits the room they don't use into two kinds". It no longer says "the room Fennel rents". s-05 says "the "Keep room to lose a node" switch in W-02".
- P-10: fixed — k-04's key feedback ends "W-02, below, lets you try the same with storefront, orders and dispatch." The third notice now reads "Push `orders` past 13 GB. What happens to the count?"
- A-03: fixed — D2 now says "keeps back up to about 2.7 GB of memory, depending on the version it was set up with" (examples.md x-01: the newer formula is a Min with the older one).
- A-04: fixed — TERM 03 now reads "They cap use; reserving room is the request's job." D7 adds that a limit set alone is copied into the request.
- A-05: fixed — TERM 02's back line is now "Not failed; it waits until something makes room."
- A-06: fixed — D5 drops "self-selected" and glosses over-provisioning as "paying for more capacity than workloads need".
- A-07: fixed — s-02's first paragraph adds "A node's six units made 12 GB. The real figure, given just below, is about 13 GB, but none of Chapter 4's sizes needed that last 1 GB."
- P-16: fixed — the standfirst now reads "traces three problems, a bill that went up, a Pod that wouldn't start and a service that kept restarting, back to two numbers…". In s-01, "ran on four" became "was running on four".
- P-17: fixed — in assets/page.css, `.cp-retry` is display:block on its own line under the feedback sentence and keeps its 44px target. Checked at 360 (b08-w360-k07wrong.png).
- P-18: fixed — f-07's "orders per hour" moved into the axis margin with a band swatch, off the band and the line. f-06 on phones: Sam's job column is now max-content, and the tfoot note gets the card's side padding. The ReplicaSet "does" cell tags only "including for Pods that were evicted", with an inline tag. Checked at 360, 390 and 1280.
