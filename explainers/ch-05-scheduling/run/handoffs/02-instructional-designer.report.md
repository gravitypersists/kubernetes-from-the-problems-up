status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/plan/learning-plan.md — the plan: 9 segments, 2 widgets (both high complexity), 7 figures, 4 term cards, 9 checks, 19 acceptance criteria, Visual grammar, and Curriculum recommendations R1–R12 plus checkpoint questions Q1–Q3.
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/plan/cut-list.md — what's left out, and `## If it runs long`: 7 ranked cuts worth about 5 min.
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/plan/mockup.html — the wireframe. Q1–Q3 come first, then every segment with final check wording and figure descriptions, the cut list, the cut order and the assets panel (no third-party assets).
- check_plan: PASS, no warnings (the checker's own output is in run/gate/check_plan.txt).

summary: The chapter is a narrative article built around one scrollytelling lane and one sandbox.
- **Lane, w-friday-scrolly.** Friday 17:45: the dispatch team doubles `dispatch` on the three nodes left after 03:04. The scheduler marks each node FITS / NO MEMORY / NO PROCESSOR, one Pod waits with a recorded reason, and Ari's team adds nodes 05 and 06 by hand.
- **Sandbox, w-sizing-sandbox (B2).** Three memory-request steppers and a "keep room to lose a node" switch. It shows how many nodes Fennel needs, whether memory or processor sets that number, and how much room is used, reserved-but-unused, or reserved by nobody. It opens on Fennel's real five nodes.
- **Why the sandbox passes the "no busywork" bar.** There's no target to reach, the outcomes vary with the settings, and it shows things a figure can't: the node count moves in steps, processor becomes the floor once memory requests are low, and one Pod can be too big for any node. I prototyped its node-count model in Python, and the expected values are in ac-08.
- **Sizing.** An honest estimate is about 26 minutes, so I propose a split (Q2). Ch 5 would cover placement and the bill (about 18.5 min); a new "Ch 5b" would cover limits, memory kills and eviction (about 11.5–13.5 min). The plan marks each segment Part 1 or Part 2.
- **Moving-day conflict.** Ch 4's layout doesn't match the scheduler's defaults. I laid this out as options (Q1) and recommend (b): fix Ch 4.

concerns:
- **Q1, the moving-day conflict, is the user's call.** (b) means editing Ch 4's data.js lanes A4–A5 and B1–B6, the B5/B6 text and the §3 facts, then re-gating Ch 4. That edit has to land before the lane is built, because the lane starts from Ch 4's end state. The plan gives the lane data and the k-03 numbers for both (b) and the "Ch 4 unchanged" options.
- **Q2, the split.** It is recommended, and I suggest numbering it "5b" so Ch 1–4's forward references stay correct. A split adds a 16th chapter and changes §4–§7 and the ledger (R12). If the user keeps one chapter, the cut order brings it to about 21 min.
- **Pool promotion is needed before the build.** Both widgets use Ch 4's `renderCluster` from the pool. The renderer needs eight additions, listed in w-friday-scrolly `reuse:`, and Ch 4 must still render unchanged afterwards. The orchestrator needs to ask the user for this.
- **Story facts are designer-invented (Q3/R2).** That covers node sizes (13 GB and 3.9 cores for Pods), every request, limit and use figure, `notifications`' first size, and the bill. "The bill went up: 5 nodes vs. 4" needs one new fact: Year 2's four spare machines were given back before the move. Ch 3 says they were still paid for in Year 2.
- **Model-reasoning lines the accuracy reviewer should treat as hedged:**
  - leak vs. growth (x-05), labelled as a rule of thumb;
  - "processor can be handed out in slices; memory a program holds can't" (c-17's note calls it safe);
  - "some providers call them node groups" (not separately sourced);
  - "running Pods are never moved", sourced from Ch 4.
- **The sandbox needs an exact packing search, not a greedy heuristic.** Greedy placement in my prototype sometimes lowered the node count when a request went up. The exact search needs at most about 8,000 steps per setting. The caption says plainly that the sandbox packs tightly while the default scheduler spreads Pods out.
- **CLAUDE.md asks to stop the user starting Ch 5 unless the Ch 4 session that updates curriculum facts is concluded.** CURRICULUM.md does carry the Ch 4 facts, R1–R12 and d-13's wording, but uncommitted. The researcher raised this too; the orchestrator should confirm with the user that this counts as concluded.

relaxed:
- d-01 (~20 min) — not met as one chapter (about 26 planned) — the plan answers this with a split proposal and a cut order instead of compressing prose, as the handoff asked.

dispositions:
- none
