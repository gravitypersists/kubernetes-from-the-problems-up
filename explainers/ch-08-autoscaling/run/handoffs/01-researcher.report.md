status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/research/facts.md — 12 claims, 6 sources, q-1 to q-6 answered, plus a "Naming sentences" section for vertical autoscaling and KEDA
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/research/examples.md — 5 examples: minute-by-minute range, plausibility of twenty minutes, remedies with costs, database arithmetic, scale-down timeline
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/research/misconceptions.md — m-11, local-01 (nodes added when busy), local-02 (pay only for what you use), local-03 (no capacity planning needed)
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/research/parking-lot.md — 15 lines tagged Ch 9 to Ch 14

summary: `check_research.py` passes (claims 12/12, sources 6/8). Light-depth caps forced one claim per key fact, so some verified details sit in notes with their URLs. Notes carry the HPA's 15 s period and 0.1 tolerance, the provider names (GKE, EKS Auto Mode, AKS node auto-provisioning), Karpenter differences, AWS spot figures, and the 23-minute AWS anecdote. Ch 5, 7 and 4 claims are reused by reference.

Facts most likely to surprise:
1. The HPA decides within about a minute, and by default can add up to 4 Pods or 100% of the copies every 15 s. The delay is in everything after that: node, image, readiness.
2. Node start varies a lot. AWS says EKS Auto Mode nodes (Karpenter-based) are Ready in under 25 s. AWS's own guide says pool-based autoscaling can take "multiple minutes".
3. The cluster autoscaler adds nodes only for Pods that can't be placed, and removes them only below 50% of requests (not live use) after 10 minutes.

On the twenty-minute question: a base-case late scale-up that needs new nodes is roughly 3 to 8 minutes (see x-01). Twenty minutes is plausible only with something stacked on top, for example a failed node request with a 5-minute backoff, a large image, or a slow app start (x-02). I recommend telling the designer to give the story those causes rather than present twenty minutes as normal.

concerns:
- The light caps (12 claims, 8 sources) pushed scheduled and predictive scaling, faster-starting Pods, and the image-download and app-start step into x-01 and x-03 as model-sourced, low confidence. Hedge them on the page.
- No named public postmortem on "more Pods exhaust the database" was found. c-12 sources only the PostgreSQL default of 100 connections; the arithmetic in x-04 is illustrative, so present it as an illustration.
- c-06 and c-07 are single-vendor statements (AWS), at medium confidence. They differ by provider and tool, so the page must not generalise them.
- Defaults are upstream Kubernetes and cluster-autoscaler defaults, fetched 2026-11-16. Managed providers can change them, so use "by default" and "typically".
- The facts.md notes carry some cross-check quotes from pages beyond the cited source, which the claim cap made unavoidable.
- misconceptions.md has 4 entries (m-11 plus local-01 to local-03). The checker counts only `m-` headings, so it reports 1/4.
- `git status` showed `.agents/skills/didactician/` files as modified. I did not touch them.

relaxed:
- none
