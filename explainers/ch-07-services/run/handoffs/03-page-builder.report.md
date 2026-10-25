status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-07-services/site/index.html — the Chapter 7 page: hero, s-01 to s-09, f-01 to f-06, three term cards, D1 to D6, k-01 to k-07, the lane S mount (with a MOUNT CONTRACT comment) and the f-04 mount (with a FIG. 04 CONTRACT comment), and sources
- /Users/m/workspace/k8s-course/explainers/ch-07-services/site/assets/page.css — Ch 6's components rebuilt for this chapter (cast strip, .cp-more, .cp-check, .cp-term with payoff, .cp-aside/.cp-breaks, .cp-quote, .cp-dialog, .cp-recap, .mf, the lens table, the .cs-* lane scaffold, the collapsing .cp-gate, the .fp two-panel plate), plus Ch 7's figures (.addr, the static .svc Service block, f-01 .ad, f-02 .sv2, f-03 .f3c, f-05 .rt). Tokens only.
- /Users/m/workspace/k8s-course/explainers/ch-07-services/site/assets/page.js — checks (they dispatch `didactician:check-commit`), the gates on k-02, k-04, k-05 and k-06, the f-06 table built from `CH07_LOOPS`, and f-04 drawn with the pooled renderCluster
- /Users/m/workspace/k8s-course/explainers/ch-07-services/site/widgets/manifest.json — lists w-services-scrolly (lane S mount, f-04 figure slots, sizes, pool files)

summary: I wrote the prose fresh from the plan's prose rules. Check prompts, options and feedback are verbatim from the plan. Every block after a check is collapsed until the reader commits, as Ch 6 does. f-01, f-02 and f-05 are HTML. f-03 is a static SVG with two layouts, switched by container width at 760px: one wide, one vertical for phones. Its arrows use the marker from graphics.md. f-06 copies `CH06_LOOPS` forward as `CH07_LOOPS` with the plan's R3 rows, tagged NEW IN CH 7. The f-04 slots read `ClusterData.FIGURES.restarting` and `.ready` (the widget's data.js uses those keys), plus each figure's `ariaLabel` and `head`. If the keys ever differ, the slots fall back to FIGURES' two entries in order. The lane mount follows the pool README: `data-lanes="S"`, steps `S1` to `S4`, and `data-gate="k-03"` on S3 and S4. The lane and f-04 both render correctly with the widget builder's data.js. Read time is set to 24 min: 17.4 min of text at 230 wpm, plus checks, lane and figures, scaled by Ch 6's measured ratio.

Option lengths in characters of rendered text (* = key). No key is the longest option:
- k-01: A*=77, B=78, C=80. The margin is thin, but the wording is the plan's.
- k-02: A=103, B*=76, C=104
- k-03: A=79, B*=56, C=81
- k-04: A=80, B=79, C*=70
- k-05: A=83, B*=70, C=84
- k-06: A*=64, B=69, C=69
- k-07: think-then-reveal, no options

Gate: `verify.mjs --phase page` on the real chapter fails only `console` and `resources`. Both come from `widgets/w-services-scrolly/index.css` returning 404. The widget builder has written data.js and index.js but not index.css yet, so the widget is no longer "pending". That file is in its folder, not mine. I gated a scratch copy with a stub index.css: every check passes, including the full non-page gate. That run is at /private/tmp/claude-501/-Users-m-workspace-k8s-course/d8bc0a64-bd33-45b0-aebe-f1572cb9838e/scratchpad/ch7copy/run/gate/page-round-1.json.

concerns:
- **The gate needs the widget builder's `index.css`** before it can pass on the real chapter.
- **Hints removed before checks.** Before k-06, I left out the plan's "and it needs no load balancer for it", because it states k-06's key. Before k-02, I said only that "the address belongs to the Pod, not to the node", rather than "a new Pod gets a new one", which repeats the key's wording. Before §04 has defined a load balancer, I left out the plan's "as a cloud load balancer does with its own checks", to stay within ac-04. Separately, the heading "Addresses that don't stay put" (the plan's) leans slightly toward k-02's answer. I kept it.
- **Story consistency fixes.** The plan's "Ari's team runs everything that matters in at least two copies" contradicts `orders` running one copy, so I wrote "Ari's team likes anything that every order depends on to run in more than one copy". The plan's "the list has held one address since 03:10" ignores Tuesday's empty moments, so I wrote "the only Pod on that list has been `orders-q2rw`". Nothing establishes whether `orders` has a readiness probe, so the §06 reveal says "the restarted container was running and the Pod was ready again" rather than "passed its check". In the k-01 retrieval paragraph, I called Ch 6's database-loss Pod "Chapter 6's answer about a catalog Pod", because in Ch 6 it was a check's scenario, not a story event.
- **f-03 layout departures.** The record strip sits under the nodes, not on top, so the dashed kube-proxy copy lines go up to each node's floor band without crossing any Pod. The ① and ③ arrows cross a node's title bar.
- **Gates wider than the plan in two places.** The §07 gate also covers the cost paragraphs and D6, and the §05 gate covers everything after f-03, following Ch 6's rule that nothing after a check shows before the commit.
- **Invented details, all Fennel fiction:** the `storefront` Service's three Pod addresses in f-05 (10.4.1.6, 10.4.2.9, 10.4.4.5, on the plan's `10.4.<node>.<n>` pattern), and one line of story colour, "Jordan read the note twice."
- **Where text sits.** D3 says "Some providers replace kube-proxy…" instead of a "(D3)" pointer in the body. The question line in §06 uses `.cp-quote` with the cite "The question to ask", as Ch 6 did.

relaxed:
- none
