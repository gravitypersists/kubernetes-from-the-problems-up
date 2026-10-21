# Accuracy review: round 1

## Summary
The page is accurate for its audience. Every sourced claim (Fowler, Twelve-Factor, PostgreSQL, Google SRE, Google Cloud, Red Hat, Wikipedia) matches facts.md. I re-checked the direct quotes against the live Fowler, Red Hat and Wikipedia pages and they are exact. The answers to all nine checks are correct, and no later-chapter term is used as a concept. One blocking problem: Fig. 03 contradicts the page's own setup. The text and Check 07 say snapshots are taken every night, but the figure loses a Wednesday fix when the VM is restored on Friday, which a nightly snapshot would have kept. Three `should` findings cover where the page's model goes beyond the facts: restoring a snapshot also rolls back orders, "dependency" is stretched to cover the data, and Check 02 says all seven items are needed to place an order.

## Findings

### new
severity: blocking
criterion: o-3
location: figure f-03 "Snapshot of a snowflake" (panels "1 · Mon 01:00", "2 · Wednesday", "3 · Friday"), read against s-06 paragraph "take a snapshot of the VM's whole disk every night" and k-07 (question "with a snapshot of its disk taken every night"; option B "Restore last night's snapshot")
evidence: The figure shows a single snapshot taken Mon 01:00, a hand-made fix on Wednesday, then on Friday "The VM dies; restore the snapshot … Back in minutes. Wednesday's fix is gone." The page has just told the reader snapshots are taken every night. Under that setup, the Wednesday-night and Thursday-night snapshots both contain Wednesday's fix, so restoring last night's snapshot on Friday would bring it back. As drawn, the figure shows a regime where its own claim is false, and it overstates the loss from days to hours. The real point (anything changed by hand since the latest snapshot is lost, c-10 note, c-06) survives only with a consistent timeline. A careful reader will notice the contradiction, and someone who doesn't will take away a wrong idea of the loss window.
expected_fix: Put all three panels on one day relative to last night's snapshot. For example: "1 · Thu 01:00 · Last night's snapshot taken", "2 · Thu 15:00 · Sam fixes something by hand", "3 · Thu 22:00 · The VM dies; restore last night's snapshot … Back in minutes. This afternoon's fix is gone." Keep the "UNKNOWN" and clutter rows as they are. The alternative of dropping "every night" from s-06 and k-07 would also need k-07 option B reworded, so fixing the figure is the cheaper change.
verdict: contradicted

### new
severity: should
criterion: o-3
location: k-07 option B and its feedback; f-03 panel 3; s-06 paragraph introducing snapshots
evidence: The page defines the snapshot as a copy of "the VM's whole disk", and Fig. 02 and the widget put the orders database on that disk ("DISK: orders, logs, uploads"; "Database and its data (orders, customers)"). Restoring a whole-disk snapshot therefore also rolls back the database: orders taken since the snapshot are lost unless the database is kept somewhere else. Option B lists what a restore loses as "anything changed by hand since the snapshot". A manager will come away thinking a snapshot restore costs only some hand-made settings, when for a one-machine shop it can also cost up to a day of orders. CURRICULUM §3 names orders as "data that must never be lost". facts.md doesn't cover this. It is standard behaviour of disk snapshots.
expected_fix: Add the data loss in one short phrase. In option B: "…anything changed since the snapshot is lost (hand-made fixes, and any orders taken since then), and still nobody is sure which settings matter." Add a matching phrase to f-03 panel 3's note if space allows. No new section is needed. Ch 10 owns state in depth.
verdict: misleading-simplification

### new
severity: should
criterion: o-1; CURRICULUM §5 term ledger ("dependency", introduced in Ch 1)
location: s-04 first paragraph: "Each one is a dependency: the language runtime, the libraries and tools the code calls, the config that tells it where its database is and which keys to use, and the data on the disk."
evidence: This is where the page defines the ledger term "dependency", and the definition includes "the data on the disk". Engineering usage, and the sources, treat these as different kinds of thing. Twelve-Factor separates dependencies (c-01) from config (c-02), and it separates both from backing services such as the database. CURRICULUM §7 Ch 1 lists dependencies as "the runtime, libraries, config", with no data. The definition will mislead later: Ch 2 teaches that "an image packages the app with its dependencies", and a reader who counts the orders data as a dependency will conclude the image contains the database, which is the misconception Ch 10 has to undo. The surrounding o-1 point (the app needs things that live on the machine, including its data) is right. Only the label is too broad.
expected_fix: Keep the list but separate the data. For example: "Most of them are dependencies: the language runtime, the libraries and tools the code calls, and the config that tells it where its database is and which keys to use. The app also relies on the data on the disk, its orders and customers, which changes every minute." The rest of the paragraph can stay.
verdict: misleading-simplification

### new
severity: should
criterion: o-1
location: widget w-rebuild, k-02 (data.js `k02.prompt`, `k02.picked`)
evidence: The prompt reads "Besides the code, what has to be on this machine for a customer to order and get a confirmation email?" and the answer reads "All seven are on Sam's server, and the site needs every one." Two of the seven aren't needed for that task. The photo-resizing tool is only used for product photo uploads ("without it: product photo uploads fail"). The nightly log-cleanup job is, in the widget's own stage-4 words, something without which "nothing fails today". Probe step: complete k-02, then reach stage 4. The comparison table contradicts the k-02 answer. The answer teaches a reader who picked only the order-path items that they were wrong, when they were right.
expected_fix: Widen the prompt to match the answer: "Besides the code, what has to be on this machine for the Fennel site to keep working?" Soften the answer to "All seven are on Sam's server, and the site relies on every one: some today, one only when the disk next fills up." The alternative is to keep the prompt and say that the photo tool and log job serve other jobs.
verdict: misleading-simplification

### new
severity: nit
criterion: o-3
location: s-06 paragraph defining VM: linked text "a computer simulated in software" (href Red Hat)
evidence: The linked Red Hat page never defines a VM as simulated. It says "an isolated computing environment with its own CPU, memory, network interface, and storage" (checked live, 2026-10-21). The link reads as if Red Hat said it. Strictly, virtualization runs the code directly on the real processor and is not simulation. Engineers draw that line, but it doesn't change anything the reader needs here.
expected_fix: Reword the linked text closer to the source, for example "an isolated computer created in software, carved out of a physical one".
verdict: ok-but-uncited

### new
severity: nit
criterion: o-2
location: s-04 third paragraph: "The only way to find out is to remove it and see what breaks, on the server that takes every order."
evidence: "The only way" is too absolute. Engineers can also investigate a setting by reading it, checking logs, or trying the change on a copy. c-07 supports uncertainty about which settings matter, not the claim that removing a setting is the sole test. A manager who repeats "the only way is to try it in production" to a senior engineer will be corrected.
expected_fix: "With no second machine to try it on, the surest way to find out is to remove it and see what breaks, on the server that takes every order."
verdict: misleading-simplification

### new
severity: nit
criterion: o-3
location: k-06 option A feedback: "Everything still runs on one machine, so any problem with it takes the whole site down."
evidence: c-12 (Google Cloud) says any problem "can cause … a system-wide outage". Not every problem with the machine takes the site down.
expected_fix: "…so a problem with it can take the whole site down."
verdict: misleading-simplification
