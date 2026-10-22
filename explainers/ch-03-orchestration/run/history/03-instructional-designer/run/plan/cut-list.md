# Cut list: Many containers, many machines: the orchestration problem (Ch 3)

## Out (researched or considered, deliberately left out)

| What | Why it's out | Cost to add back |
|---|---|---|
| **Fragmentation, "fits nowhere though there's room in total"** (c-03, x-01, local-02) | The researcher's natural phase-2 moment, and a striking manager insight. But it turns the 3 a.m. phase into a packing puzzle (means-ends search) just when the reader should be noticing the jobs. It also only appears for some layouts the reader builds, so the page couldn't rely on it, and Ch 5 owns the vocabulary (bin packing, pending). w-fleet's sizes are chosen so it can't happen. **c-03 is the only claim not used.** | Change w-fleet's sizes/capacity so phase 2 can strand `orders`, add a WAITING state and a predict check: about 1 min of reader time and a harder widget. Recommended for Ch 5 instead (R2, R7). |
| **A scaling phase** (the Friday rush: add storefront copies at 17:00, remove them at 21:00) | Covers the sixth job by hand, but adds about 1 min and a time axis Ch 8 owns. The debrief names scaling and ties it to the three storefront copies the reader placed "because Friday needs them". | A fourth widget phase (data only: a queue of two extra storefront copies, then two stops): about 1 min. |
| **About a dozen containers** (the chapter entry) → **nine** | Four machines side by side at 360px leave about 68px per chip, and chip height has to carry size at ≥ 44px per unit. Nine containers (14 of 24 units) keep about half the room free (the idle-spend picture) and guarantee every phase can be finished. Twelve would push the room above 70% and make phase 2 a puzzle (see the first row). | Three more size-1 chips: data only, but it breaks the "no dead end" guarantees in w-fleet `model:`. |
| **A recovery clock in phase 2** (minutes ticking as Sam works) | No sourced figure exists for recovery time or pages (research caveat), and invented minutes would read as a claim. The status pills (orders DOWN until re-placed and reconnected) carry the outage without a number. | Only with a sourced figure: a research claim, then a counter in the widget. |
| **An editable spreadsheet panel** (the reader types rows) | Typing is friction readers skip, and a table panel costs width at 360px. Reduced to a count of rows out of date plus an optional "Update the spreadsheet" button, which makes drift felt (most readers will skip it at 3 a.m.). | A small table panel: about 0.5 min, plus mobile layout risk. |
| **Per-service colours on chips** (`c1`–`c4`) | Ch 2's grammar draws every container in `c1`. Four colours add a legend-like mapping to learn. Labels and chip sizes already tell services apart. | CSS only. |
| **"Orders' data when its machine dies"** | Ch 2 established that data is kept outside the container. Raising where `orders`' data lives is Ch 10's subject (state). | One sentence in phase 2's outcome; not recommended. |
| **Spreading copies of one service across machines** (keep copies apart so one failure can't take a service down) | Real and manager-relevant, but a second rule to hold while placing. It still shows up emergently: if the reader stacks both payments copies on the dead machine, payments goes DOWN. | A rule in phase 1 plus a refusal message: about 0.5 min. Ch 5 ("affinity exists", R7). |
| **Second analogy: ports and shipping lines** (extends Ch 2's shipping-container analogy: Docker packs the box, the orchestrator is the shipping line) | One management analogy (A1) is enough for 15 minutes, and f-02 shows the layering directly. | An aside with its breaks note in s-06: about 0.4 min. |
| **Docker, Inc. as a company; Docker Desktop's bundled single-machine Kubernetes** (parking lot) | Model knowledge, not fetched. The company adds a third meaning of "Docker" that m-02's correction doesn't need. | One clause, after the researcher sources it. |
| **"K8s" and "Kubernetes = helmsman"** (parking lot) | Unsourced here (model). "K8s" would help managers decode chat, so it's worth sourcing. | One sentence in s-05 after sourcing; recommended for Ch 4 (R6 d). |
| **A Kubernetes timeline figure** (Borg → Omega → 2014 → 2015 CNCF → 2022 → 2024) | Three sentences of prose carry the history. Borg's own dates aren't in the facts. | A small static figure in s-05: about 0.3 min. |
| **"Google still runs on Borg"** as a present-tense claim (c-09 note) | Sourced only as of 2016. | Usable only with "as of 2016" (k-06 B's feedback does that). |
| **Contributor figure "over 88,000 contributors from 8,000+ companies"** (c-10 note) | A precise number dates fast. Hedged to "tens of thousands of contributors from thousands of companies, by 2024". | Exact figure with its date: one clause. |
| **Other orchestrators beyond Swarm and Mesos** (Nomad, AWS ECS; parking lot) | Model knowledge, not fetched; Ch 14 compares the options. | Ch 14 (R12). |
| **"Kubernetes doesn't build your app and isn't an all-inclusive PaaS"** (c-08 note; parking lot) | Ch 14's scope. k-04 A's feedback carries the "doesn't build images" half. | Ch 14 (R12). |
| **Health checks, settings and secrets, monitoring** (c-01 note; the jobs the six-job list misses) | Owned by Ch 6/12, Ch 9 and Ch 12. Named only in the debrief's and f-01's "and more" line. | n/a (later chapters, R11). |
| **"Control through choreography" vs. a central orchestration system** (parking lot) | Ch 4's material for m-03. Ch 3 only says don't picture one boss (A1 breaks). | Ch 4 (R6 c). |
| **Borg's port per container vs. Kubernetes's address per pod** (parking lot) | Ch 7 background. c-02 gives the manager-level "moved means new address" without it. | Ch 7. |
| **Google's kernel container contributions; containers at Google predate Docker** (parking lot) | A curiosity that adds a second history thread. | One sentence in s-05. |
| **"Up to 30% of servers comatose"** (NRDC 2014, parking lot) | Secondhand and unverified. | Only after verification. |
| **Google SRE toil average 33%, outliers 80%** (c-06 note; parking lot) | One toil figure (the under-half target) is enough. A second invites "so Sam is at 80%". | One clause in s-03. |
| **Release cadence and support windows** (parking lot) | Ch 14. | Ch 14. |
| **DORA metrics for deploy pain** (parking lot) | Not fetched; the group chat stays fiction. | Ch 6, with a research pass. |
| **A follow-up think-then-reveal after k-06** ("Sam answers 'replacing at 3 a.m.'; what would make it worth it?") | Ch 14 answers the cost side; time. | One think-then-reveal in s-07: about 0.75 min. |

Claims: c-01, c-02, c-04 to c-12 are used. **c-03 is cut** (first row). Examples: x-02 (s-03 idle, honestly), x-03 (the phase-2 "still sending orders to machine N" line), x-04 (as A1, with its dispatcher variant rejected because `dispatch` is a Fennel service) and x-05 (s-06 layering) are used. **x-01 is cut** with c-03. Misconceptions: m-02 confronted; m-23 retrieved; local-01 and local-03 confronted; **local-02 cut** to Ch 5.

## If it runs long

These parts are in the plan now. If the built page runs long, cut them in this order (first = cheapest loss). Items 1–4 recover about 1.5 minutes, and items 1–6 about 2.5, without losing an objective, any of the widget's three phases or the m-02 confrontation.

1. **The 2022 runtime sentence in s-06** (c-12: Kubernetes stopped using Docker's engine; Docker-built images still run). The reader loses the explanation for "Kubernetes drops Docker" headlines. About 0.2 min.
2. **Phase 1 pre-places four containers** (`orders` and both `payments` on machines 01–02 from "the spreadsheet"); the reader places the other five. The reader loses some of the felt tedium of placing, but still does the job. Data only. About 0.4 min.
3. **k-04 becomes one sentence in s-04** ("It keeps working between releases, at 3 a.m. included; a deploy script runs once and stops."). The reader loses the commitment on local-03; the definition still says it. About 0.5 min.
4. **f-02 → prose only** (s-06's layering paragraph plus the caption sentence as text). The reader loses the picture of the two layers. k-05 and the prose still confront m-02. About 0.4 min.
5. **The s-03 utilization sentence** (c-04's hedged 2014 estimate). The reader loses the industry anchor for idle spend; x-02's honest explanation (padding plus insurance) stays. About 0.25 min.
6. **k-03 becomes think-then-reveal** (same prompt; model answer = option B plus its feedback). It keeps the generation but loses the commitment against C. About 0.25 min.
7. **Phase 3 shrinks to updating two copies**: storefront drops to 2 copies everywhere (12 of 24 units). No phase can dead-end, but there may then be room for both new copies at once, so the nudge toward "start new, then stop old" weakens. The reader loses some repetition of start-then-stop. About 0.25 min, and a data change.
8. **Analogy A1 (s-04)**: the chapter's only management analogy (§2.1). The reader loses the human picture of the six jobs as one role. Cut it only after 1–7. About 0.4 min.

Not on the list, because cutting them removes an objective, the chapter's pain in the page, the payoff or an owned misconception: k-01 (retrieval opener), w-fleet phases 1–3 and the debrief (k-02), f-01, s-05's naming and history, k-05 and the Docker placement, k-06 and the recap.

If the build runs long by more than items 1–8 can recover (over 17.5 minutes), don't compress further. Split instead: move s-06 (Docker) into a short opening section of Ch 4, which retrieves Ch 3 anyway, and tell the user.
