status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/round-1/accuracy.md — round-1 accuracy review: 1 blocking, 3 should, 3 nit
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/screenshots/probe/acc-k02.png, acc-k03.png, acc-s3.png, acc-s4.png — screenshots from my run through all four stages of w-rebuild at 1280px

summary: I checked every factual statement on the page, in data.js and in the feedback for all nine checks against facts.md. I also checked the Fowler (SnowflakeServer, PhoenixServer), Red Hat and Wikipedia quotes against the live pages, and they are exact. All check answers are correct. No later-chapter terms appear (container, image, registry, orchestration, Kubernetes, cluster, node, pod), and the Fennel fiction is never presented as statistics.

The one blocking finding: Fig. 03 contradicts the page's own setup. The text and Check 07 say snapshots are taken every night, but the figure shows a Wednesday hand-made fix lost when the VM is restored on Friday. A nightly snapshot would have kept that fix. The fix is to put all three panels on one day, relative to last night's snapshot.

The three `should` findings:
- Restoring a snapshot also rolls back orders taken since it, and the page never says so.
- §04 defines the ledger term "dependency" to include "the data on the disk". That plants a wrong reading of Ch 2's "an image packages the app with its dependencies".
- Check 02 asks what's needed "for a customer to order and get a confirmation email", then says all seven items are needed. The widget itself later says the log-cleanup job affects nothing today, and the photo tool is only used for photo uploads.

concerns:
- I did not run findings.py ingest. I assumed assigning finding IDs is the orchestrator's step.
- The data-rollback finding (snapshot restore loses recent orders) is standard snapshot behaviour, but facts.md doesn't cover it. I rated it `should` rather than blocking for that reason.

relaxed:
- none
