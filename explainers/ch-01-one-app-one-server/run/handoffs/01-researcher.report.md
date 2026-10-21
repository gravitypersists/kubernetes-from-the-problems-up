status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/facts.md: 12 claims; q-1 to q-7 all mapped to claims, with notes on what is only partly covered
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/misconceptions.md: 4 misconceptions: code-is-the-app seed (Ch 2 completes it), runbook-solves-it, bigger-server, VMs-mean-rebuildable
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/examples.md: 5 examples: missing image tool on the new server, Fowler's baseball-bat recovery test, disk-full chain of events, bus factor, photocopied-desk analogy for snapshots
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/parking-lot.md: 10 off-objective one-liners (cattle vs pets, phoenix servers, Puppet/Chef, Chaos Monkey, env-var config for Ch 9, etc.)

summary: Light research: 12/12 claims, 8/8 sources (Fowler's SnowflakeServer and PhoenixServer, Twelve-Factor dependencies and config, PostgreSQL 18 disk-full docs, Google SRE book intro, Google Cloud's horizontal-scalability guidance, Red Hat on VMs), 5 examples, 4 misconceptions, no assets. check_research.py PASS. No question left unresolved. Three facts likely to surprise the audience. (1) Drift is defined as "ad hoc changes ... that go unrecorded", so a runbook falls behind the real server by definition. (2) Google SRE measured roughly 3x faster repair with a written playbook, yet says no playbook "is a substitute for smart engineers". So runbooks help, and you still need Sam. (3) A disk image of a snowflake copies its "cruft ... not to mention mistakes". Images do speed up rebuilds; what they don't give you is understanding of the server.

concerns:
- These points are only partly sourced, and the gaps are stated under `## Questions`. Nothing ranks which items get forgotten on a rebuild (q-1). Nothing documents what managers believe about "the app", so m-01 is model-sourced (q-2). The two-hour outage being plausible and the "logs fill the disk at dinner rush" story are model reasoning and Fennel fiction (q-3, x-03). I marked these questions answered because their core is cited, but the designer shouldn't present those parts as sourced fact.
- The source cap ruled out a separate RTO source. Recovery-time framing uses MTTR from the SRE book (c-08 note). Bus factor is an example sourced to Wikipedia, not a claim. I suggest plain wording ("how long until we're back") rather than RTO or MTTR acronyms.
- c-09 (VM) doesn't directly say "VMs don't remove the snowflake problem". That conclusion is inferred from c-04 and c-06, as the c-09 note says. Keep the partial benefit of snapshots honest (c-10 note).
- c-11 cost wording: Google writes "can increase exponentially". The claim uses "climbs steeply". Don't upgrade it to "exponential".
- The PostgreSQL URL in older references (/docs/current/disk-full.html) now returns 404. The citation uses /docs/18/diskusage.html.

relaxed:
- none
