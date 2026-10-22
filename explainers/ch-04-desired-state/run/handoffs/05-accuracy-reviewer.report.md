status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/review/round-1/accuracy.md — round-1 accuracy review: 8 findings (1 blocking, 5 should, 2 nit)
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/screenshots/probe/acc-r1-A4.png, acc-r1-B3.png, acc-r1-B6.png — probe screenshots of lanes A and B

summary: I checked the prose, figures f-01 to f-05, disclosures D1–D7, all nine checks with their feedback, the lane data in data.js and CH04_LOOPS against facts.md. I also re-checked the key claims against live sources: the kubernetes/website markdown, AWS EKS docs and GKE docs. I drove both lanes with probe.mjs; what the canvas shows matches data.js, and the room arithmetic is right. These all hold up: the 50 s, 5 min and ~6–7 min timings and their hedging, the order of the loops, the back-off and ~15 restarts in the first hour, the 200/2d9h example, what `created` means, Pods never moved, the 30 s grace period, etymology and K8s, every quotation, and scope (etcd only in D6, no later-chapter terms).

One blocking finding: §07 and k-07 teach that version upgrades are wholly the provider's job. On EKS the customer starts the upgrade and prepares for it, and the course's own Ch 14 and m-17 depend on upgrades being the company's work.

Should:
- "removes Pods from the record" should be "marks them for deletion" (in B3, CH04_LOOPS, k-04 and k-05).
- "Fennel pays for the machines" is false for GKE Autopilot, which bills per Pod.
- "every change is reviewed" overstates what version control guarantees.
- D2's "a minute later" breaks the 2→5→3 example.
- The control-plane definition leaves out the API server.

concerns:
- These are fiction-consistency points, not accuracy findings. I'm passing them on and not routing them:
  - Fig. 01's task list includes "Update the spreadsheet", but CURRICULUM §3 says the spreadsheet still said machine 03 afterwards.
  - Lane B6 says "Node 04 has never run `orders`", but in Year 2 Sam ran `orders` on machine 04. That's fine if the cluster's nodes are new machines; the page doesn't say so.
- I didn't run findings.py ingest, because its output (findings.md) is outside my namespace. The orchestrator should run it.

relaxed:
- none
