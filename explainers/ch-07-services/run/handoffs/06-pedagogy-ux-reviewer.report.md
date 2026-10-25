status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-07-services/run/review/round-1/pedagogy-ux.md — the round-1 pedagogy and UX review in the template format: 15 findings (2 blocking, 5 should, 8 nit), a verdict for each acceptance criterion, scores and a reading-time estimate. findings.py parses it.
- /Users/m/workspace/k8s-course/explainers/ch-07-services/run/screenshots/probe/pux-r1-* — probe screenshots at 1280×900, 768×1024, 360×800 and 1280×500, light and dark: hero, every check committed wrong, every lane step (locked, unlocked, scrolled back), every section and f-01 to f-06.

summary: I committed a wrong option at every check, revealed k-07 and opened all six disclosures. I scrolled the lane forward, tried S3 locked, then scrolled back. Lane S works as a lane:
- the scene is set up before S1;
- the k-03 gate holds;
- scrolling back restores each step;
- inline snapshots switch on at 360×800 and 1280×500.

13 of the 14 acceptance criteria are met; ac-13 fails. The earlier chapters' promises land without bookkeeping lines. kube-proxy and the endpoints loop are clear, and the support-line aside has its breaks line. The lane header "Thursday · catalog" is clear and matches the name Ch 6's lane used. No hard-coded colours in `site/assets/`, the pool is used correctly, and dark mode is intact. My reading-time estimate is about 24–26 minutes, consistent with the page's "24 MIN" but over the brief's ~20. Route any cut through `cut-list.md` cuts 1–6 (about 2.25 minutes saved).

Most important issues:
1. Blocking (P-01): the §02 heading "Addresses that don't stay put", also shown in the contents rail, rules out both of k-02's distractors (A and C both say addresses come back). Fix: retitle §02 with a neutral heading, for example "A list copied by hand".
2. Blocking (P-02): f-05 draws each Service as a hop with arrows in and out, between the gateway and the Pod and in the internal call. That redraws the "box in the middle" that §05 and f-03 just removed, which is m-10, the chapter's own misconception. Fix: route the arrows gateway → Pod and Pod → Pod, with each Service block beside its arrow on a dashed leader. The plan's f-05 model specified this chain, so the conflict starts in the plan, not with the builder.
3. Should:
   - The key is the shortest option in all six choice checks (P-03), a length giveaway of its own.
   - The k-02, k-05 and k-07 prompts repeat the paragraph above them almost word for word (P-04).
   - "Like every loop, it only writes into the record" is contradicted by kube-proxy two sections later (P-05).
   - The two 03:04 Saturdays (Ch 3 and Ch 4) blur in §01 (P-06).
   - "a question for the list" is ambiguous in a chapter where "the list" means the endpoints list (P-07).

concerns:
- The review cites IDs P-01 to P-07. They assume findings.py numbers findings in file order starting at P-01, which is how it parses them.
- I marked P-02 blocking even though the plan (approved at d-05) specified f-05's chain. The fix changes only how the arrows run, not the plan's shape, and the plan's own visual grammar forbids drawing an arrow through a Service. The orchestrator may downgrade it if it treats that as a plan-shape question.
- The reading-time estimate adds my own allowances for checks, figures and the lane to the gate's 17.4 minutes of text. It is an estimate, not a measurement.

relaxed:
- none
