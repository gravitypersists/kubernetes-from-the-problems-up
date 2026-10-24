status: done

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/review/round-1/accuracy.md — round-1 accuracy review: 9 findings, none blocking (2 should, 7 nit)
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/screenshots/probe/acc-r1-*.png — 7 probe screenshots: the sandbox at its defaults, at the "used at the rush" setting, with orders at 12 and at 13.5, with the spare off at 390px, and lane F at F3 and F5

summary: I checked every statement in the prose, figures, disclosures, term cards and sources, all nine checks' keys and feedback, lane F's data, W-02's data and model, and the loop lens table. The mechanisms are right. I recomputed lane F with the default score plugins and weights (fit, balanced allocation, spreading); F2's pick of 01, F5's tie and Ch 4's moving day and 03:04 (d-04) all come out as the page says. "0/3 nodes are available: 2 Insufficient cpu, 3 Insufficient memory." matches how the real message counts a node short of both. My own exact solver agrees with W-02's node counts at the defaults, at the extremes, with orders at 13 and 13.5, and with the spare on and off. I web-checked GKE node sizes, the CNCF survey and Datadog.

The two `should` findings:
- **k-09's pointer doesn't show what it claims.** "Try orders at 8 and then 12 GB in W-02" shows no change in node count, whether the reader starts from the defaults or from the "used at the rush" setting. Only storefront 2.5 / dispatch 1.5, a setting the page never names, adds a node.
- **k-08's feedback overcounts.** It says "several services" would go over their requests, but with the story's numbers only `orders` does, and W-02's warnings show only `orders`.

The nits:
- **GKE's 2.7 GB figure needs a hedge.** It applies only to node pools created on GKE 1.36 or earlier. Newer pools keep back about 2.2 GB.
- **The "limits" term card says "they reserve nothing".** That's untrue when a team sets only a limit, because Kubernetes then copies it into the request.
- **The pending card says "not fixed by waiting alone".** That's too absolute: image downloads, for one, do resolve by waiting.
- **The CNCF wording goes beyond the source.** It doesn't support "self-selected", and the page's gloss of over-provisioning is narrower than the survey's term.
- **The node sizes don't quite match Ch 4.** Ch 4's six units × 2 GB = 12 GB, but this page gives each node 13 GB of room.
- **W-02's bar is labelled "The rented room".** It shows only the 65 GB of room for Pods, not the 80 GB Fennel rents.
- **The page says Chapter 3 called spare room "insurance".** Chapter 3 never used the word.

Scope is clean: no later-chapter terms beyond the Ch 8 preview.

concerns:
- I didn't run findings.py ingest, since writing findings.md is the orchestrator's step.

relaxed:
- none
