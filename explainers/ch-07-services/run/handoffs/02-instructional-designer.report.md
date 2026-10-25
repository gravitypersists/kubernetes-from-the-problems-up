status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-07-services/run/plan/learning-plan.md — the plan: 9 segments, 1 lane (w-services-scrolly, complexity low), 6 figures, 3 term cards, 7 checks, 14 acceptance criteria, the minutes table, visual grammar, the pool-04 spec, 6 checkpoint questions, and R1–R11
- /Users/m/workspace/k8s-course/explainers/ch-07-services/run/plan/cut-list.md — what's out (with the cost of adding each back) and `## If it runs long` (8 ranked cuts, about 3 min)
- /Users/m/workspace/k8s-course/explainers/ch-07-services/run/plan/mockup.html — wireframe with real headings, final check text, figure descriptions, cuts, and an assets panel (no third-party assets)
- /Users/m/workspace/k8s-course/explainers/ch-07-services/run/gate/check_plan.txt — check_plan.py: PASS, no warnings

summary: The chapter is a narrative article told from the caller's side, with one lane and static figures around it.
- **Lane S:** Ch 6's 10:15 release replayed with one new element, the `catalog` Service's list of ready Pods. The endpoints loop keeps the list current while `storefront`'s setting never changes. The lane is gated at mid-rollout on k-03 (which versions answer).
- **No hands-on address-list widget.** That pain was already felt in Ch 3's k-03. It comes from k-02 instead (a hand-copied list after Thursday's rollback to v63), and Fig. 01 reveals the answer.
- **m-10:** a predict check (k-04) plus Fig. 03, one call with no Service program on its path.
- **The incident:** Ch 5's Tuesday is explained (k-05 plus two snapshots). `orders` runs one copy, so each OOM restart left its list empty and the calls were refused.
- **Getting in:** a trace check (k-06) plus Fig. 05, and AWS prices labelled with product, region and date.
- **Loop lens table:** filled in with an endpoints loop row and a kube-proxy row (one per node).
- **Time:** about 20 minutes planned; 22–25 built is likely.

concerns:
- **Pool change needed (Q3).** pool-04 adds an optional Service block to `renderCluster`'s record panel and a `PODS[id].addr` field. It is off when absent, but every chapter must be re-gated. It should be scheduled before the build. The fallback is data-only note lines, which break the rule that things of different kinds look different. I suggest bundling the open §9 360px chip-label fix into the same re-gate.
- **Model knowledge to flag for the accuracy reviewer** (§Research concerns 6):
  - a container restarted in place keeps its Pod's address (k-05 option C's feedback, Fig. 04);
  - a restarting container makes its Pod not ready, so it leaves the list;
  - "roughly a third of new connections" for one Pod in three. This follows from c-05's random choice and is hedged.
- **New story facts need approval (R2):**
  - Fennel has had one gateway (provider's controller) behind one cloud load balancer since the move, with `fennel.example` → `storefront`;
  - Ari proposes a second copy of `orders`;
  - all Pod and Service addresses are illustrative;
  - the exchanges between Jordan, Ari and Riley.
- **c-06 is medium confidence.** "Refused at once" carries "in most clusters, by default" everywhere. No key depends on timeout vs. refusal.
- **Analogy (Q4).** The entry's front desk / shared inbox is refined to "a team's support line", placed after the m-10 reveal. An inbox or desk puts someone in the middle, which is m-10 itself.
- **Names (Q5).** I propose "endpoints loop" and naming kube-proxy directly. The second differs from Ch 6, which said "node agent" instead of "kubelet". The page says calls don't pass through kube-proxy.
- **Sizing.** The load is about the same as Ch 6's (seven checks, one lane, six figures), and Ch 6 was measured at about 27 minutes against 22 planned. The cut order recovers about 3 minutes. A split isn't recommended because the second part would be about 6 minutes.

relaxed:
- none
