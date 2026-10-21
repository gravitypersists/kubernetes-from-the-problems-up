# Accuracy review: round 2

## Summary
All seven round-1 accuracy findings are closed. The f-03 timeline now fits inside one day after "last night's snapshot", so it agrees with "every night" in s-06 and k-07. k-07 B, its feedback and the f-03 note now say that orders taken since the snapshot are lost too. "Dependency" no longer includes the data. The k-02 prompt now matches its "all seven" answer, and the stage-4 log-job row ("nothing fails today") fits "one only when the disk next fills up". The VM, "surest way" and "can take the whole site down" wordings match their sources. I checked the text that changed (k-03 options, the SPOF definition in s-06, k-08 A's SRE wording, the s-01/s-06/s-07 lead-ins) for regressions and found nothing blocking. I'm raising no new findings.

## Findings

### A-01
severity: blocking
criterion: o-3
location: figure f-03 "Snapshot of a snowflake" (index.html #f-03), read against s-06 "take a snapshot of the VM's whole disk every night" and k-07
evidence: Probe (1280, `scroll:#f-03`, `shot:f03@#f-03` → run/screenshots/probe/a-r2-f03.png). The panels now read "1 · THU 01:00 Last night's snapshot taken.", "2 · THU 15:00 Sam fixes something by hand.", "3 · THU 22:00 The VM dies; restore last night's snapshot." Panel 3's note says "Back in minutes. This afternoon's fix is gone, and so are today's orders." All three panels fall between one nightly snapshot and the next, so the figure no longer contradicts "every night". The loss window it shows (hours since last night) is the right one.
expected_fix: none
verdict: contradicted
status: closed

### A-02
severity: should
criterion: o-3
location: k-07 option B and its data-fb; f-03 panel 3 note
evidence: Option B now reads "Restore last night's snapshot: back fast, clutter included, but everything since is lost, hand-made fixes and orders alike." Its feedback says "it loses everything that changed after it was taken (hand-made fixes, and any orders placed since)". The f-03 note says "so are today's orders". A reader now learns that restoring a whole-disk snapshot also rolls back the database on that disk.
expected_fix: none
verdict: misleading-simplification
status: closed

### A-03
severity: should
criterion: o-1; CURRICULUM §5 "dependency"
location: s-04 first paragraph
evidence: The paragraph now says "Most of them are dependencies: the language runtime, the libraries and tools the code calls, and the config that tells it where its database is and which keys to use. The app also relies on the data on the disk, its orders and customers, which changes every minute." The data is no longer labelled a dependency. That matches c-01/c-02 and the §7 Ch 1 wording ("runtime, libraries, config"), and it won't mislead Ch 2's "image packages the app with its dependencies".
expected_fix: none
verdict: misleading-simplification
status: closed

### A-04
severity: should
criterion: o-1
location: widget w-rebuild k-02 (data.js `k02.prompt`, `k02.picked`)
evidence: Probe (1280: pick runtime and db, then `click:[data-act=reveal]`, run/screenshots/probe/a-r2-k02.png). The prompt renders "Besides the code, what has to be on this machine for the Fennel site to keep working?" and the answer renders "…the site relies on every one: some today, one only when the disk next fills up." That now matches the rows: photo tool "product photo uploads fail" (today), email key "order confirmation emails don't send" (today), log-cleanup job "nothing fails today; in a few months the disk fills" (later). The stage-4 comparison no longer contradicts the answer.
expected_fix: none
verdict: misleading-simplification
status: closed

### A-05
severity: nit
criterion: o-3
location: s-06 VM definition, link to Red Hat
evidence: The linked text now reads "an isolated computer created in software, with its own processor, memory, disk and operating system. Several of them can run on one physical machine". That is close to Red Hat's "an isolated computing environment with its own CPU, memory, network interface, and storage", and it no longer claims "simulated".
expected_fix: none
verdict: ok-but-uncited
status: closed

### A-06
severity: nit
criterion: o-2
location: s-04 third paragraph
evidence: The sentence now reads "With no second machine to try it on, the surest way to find out is to remove it and see what breaks, on the server that takes every order." The absolute "only way" is gone, and the claim is now conditional on Fennel's single-machine setup, which c-07 supports.
expected_fix: none
verdict: misleading-simplification
status: closed

### A-07
severity: nit
criterion: o-3
location: k-06 option B data-fb (the "All of them" option; the key moved to A)
evidence: The feedback now reads "Everything still runs on one machine, so a problem with it can take the whole site down." That matches c-12's "can cause … a system-wide outage". The new s-06 definition, "a single point of failure: when something goes wrong with it, the whole site can go down with it", and the k-06 A feedback ("It's still a single point of failure") are also hedged correctly against c-12.
expected_fix: none
verdict: misleading-simplification
status: closed
