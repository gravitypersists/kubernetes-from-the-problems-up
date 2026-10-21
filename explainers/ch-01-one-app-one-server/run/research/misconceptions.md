# Misconceptions

None of these are in CURRICULUM.md §6 (Ch 1 owns none). m-01 is the seed Ch 2 corrects. Plant it, don't fully resolve it.

### m-01
objective: o-1
misconception: The code in the repository is the app; if we have the code, we have the app.
why_tempting: Managers see code reviewed, versioned and "shipped". Everything else on the server (runtime, libraries, tools, config files, credentials, scheduled jobs) is invisible to them and never shows up in a pull request.
counter: c-01, c-02
source: model
note: Seed only (Ch 2 owns the full correction with images). In Ch 1, show that the same code on a machine missing one tool or one config file doesn't work (x-01). Leave the fix ("package it with its dependencies") for Ch 2.

### m-02
objective: o-2
misconception: If Sam writes a good runbook, the single-person risk is solved.
why_tempting: Documentation is the standard management answer to knowledge silos, and it does help (c-08). The runbook looks complete to the person who wrote it.
counter: c-06, c-07, c-08
source: model
note: Fair version: runbooks are valuable (roughly 3x faster repair per Google SRE). But unrecorded changes (drift) and settings nobody knows matter (c-07) mean the notes and the server diverge. Rebuilding from the notes is the test that exposes the gaps, which is the chapter's widget.

### m-03
objective: o-3
misconception: The outage was a capacity problem, so a bigger server fixes it.
why_tempting: The trigger was literally "ran out of disk", and buying more is a quick, budgetable fix.
counter: c-11, c-12, c-05
source: model
note: More disk does postpone this particular failure. But the business is still one machine away from an outage (c-12), and that machine is still impossible to rebuild quickly (c-05).

### m-04
objective: o-3
misconception: Moving to VMs (or "the cloud") means we can recreate the server any time.
why_tempting: VMs really are quick to create (c-09), and snapshots exist, so rebuilding sounds like a button press.
counter: c-09, c-10, c-06
source: model
note: A new VM is a blank machine. Someone still has to set it up, by hand unless something automates it. A snapshot of a snowflake copies its cruft and starts going stale as soon as the live server changes. State the partial benefit honestly (c-10 note).
