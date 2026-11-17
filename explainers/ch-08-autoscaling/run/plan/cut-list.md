# Cut list: Ch 8, The Friday dinner rush: autoscaling

Researched or considered, and deliberately left out of the main text. Every research claim (c-01 to c-12) is used by a segment; the items below are examples, notes inside claims, parking-lot lines and design options. "Cost to add back" is what it would take in this chapter.

| What | Why it's out | Cost to add back |
|---|---|---|
| The entry's goal-free explorer (the reader sets a traffic curve and scaling settings and watches Pods and nodes follow) | An honest two-layer simulation is a high-complexity widget with five or more interacting elements for a novice; the trade-offs it would teach are one-way and fit a table and an apply check (f-05, k-05); the chapter is over budget without it | Checkpoint Q2 (b): a small "replay the push" explorer in place of f-05, from 24 precomputed states; a widget builder and about 2 minutes of reader time |
| The explorer on Ch 5's sandbox model, run per time step | Same reasons; and the model packs Pods as tightly as they go, which the real scheduler doesn't, so its node counts would disagree with the lane's | A widget builder (complexity high); about 3 minutes |
| A second lane for scaling down (copies fall, node 07 empties, node 07 goes, node 06 stays) | Two paragraphs, k-06 and one snapshot (f-06) carry it; a lane would add about 1.5 minutes for a process with two waits | 3–4 steps on the same data file; about 1.5 minutes |
| A lane for the ordinary Friday (3 → 6, all on node 06) | It shows the first loop without the second; two sentences in s-04's set-up say it | 3 steps, data only; about 1.25 minutes |
| "Twenty minutes", with stacked causes in the lane (a failed node request, a five-minute retry, a slow image) | The base case is three to eight minutes (x-01, x-02); "it worked and still took seven" answers m-11 more cleanly; the stacked case is two sentences and D4 | Checkpoint Q3 (b): two more lane steps, about 1 minute |
| The spot pool as a taught idea with a check (Ch 5's cut k-06: which service stays off a spot pool) | It is about what kind of machine to rent, not about autoscaling; it stays as one paragraph and a dashed pool in f-03 | Checkpoint Q4 (b): the check and two sentences in s-03, about 1 minute; or Ch 14 (R6) |
| Spot figures: one provider's "up to 90%" ceiling and two-minute notice (c-05 note) | Prices are Ch 14's; "at a couple of minutes' notice" is enough here | One clause in s-03, labelled with provider and date |
| The thermostat analogy (Ch 4's cut x-01) | It fits the HPA alone and says nothing about the second loop, the waits or a bottleneck elsewhere; the staffing rule covers all four | Checkpoint Q8 (b): replaces the staffing aside, same length |
| The HPA reading less than the true demand when Pods are saturated, so it climbs in several rounds | True and interesting, but a second mechanism inside the lane's hardest step; the lane says "in a couple of quick steps" | One sentence in A2 and a disclosure |
| The HPA's scale-up limits (at most 4 Pods or double per 15 seconds) and `behavior` settings (c-08 note; parking lot) | Engineer territory | One sentence in D2 |
| The 30-second and 5-minute start-up allowances for new Pods' readings (c-08 note) | Engineer territory; the lane's one sentence on Pods not yet ready is enough | A disclosure in s-04 |
| Memory, custom and external measurements in more than D2's sentence; the separate measurements add-on (c-02 note) | Out of scope (metrics pipelines, Ch 12) | Ch 12 (R6) |
| Vertical autoscaling and event-driven scaling beyond naming them (naming sentences; parking lot) | Out of scope: name only (D2) | Ch 13 (R6) |
| Right-sizing requests from observed use, recommenders, in-place resize | Out of scope (parked from Ch 5); s-06 says only that padded requests keep nodes on the bill | Ch 14 |
| How the cluster autoscaler chooses between several pools (expanders), and its simulation taking several rounds (c-04 note) | Fennel has one pool; engineer territory | One sentence in D3 |
| Provider-by-provider names and behaviours (GKE, EKS, AKS modes; AKS's five-minute promise) beyond D3 and D4 (c-04, c-07 notes) | The page stays generic; one vendor's figures only where labelled | Ch 14 (R6) |
| Provider autoscaling profiles that trade speed for cost (c-11 note; parking lot) | A provider-side version of f-05's "spare room" row | Ch 14 (R6) |
| Consolidation: replacing a node with a cheaper one (parking lot) | A different tool's behaviour | Ch 14 |
| What blocks a node's removal in detail (c-10 note) | Three items in D5 are enough; disruption budgets are Ch 14's | Ch 14 (R6) |
| Removing the number of copies from a manifest once an HPA owns it (c-03 note) | Manifests and settings are Ch 9's | Ch 9 (R6) |
| A rollout's extra Pod making the cluster autoscaler add a node; changing requests starts a rollout (Ch 6 pick-up) | True, small, and a third scene; "placed like any other Pod" covers it | One sentence in s-03 |
| The Service block drawn in the lane (Ch 7 pick-up: "new Pods join the list") | Nine addresses on a canvas that already carries six new elements; the step text and A6 say the Pods are on the list | Data only (pool-04); about 0.25 minutes of extra reading |
| Other services on autoscalers in the story (`storefront`, `payments`) | One service per loop keeps the numbers checkable; they appear in the conversation as "not yet" | New story facts and a second set of numbers |
| A shared database, so that scaling `catalog` starves `orders` | A new outage of Fennel's most critical service, and Ch 10's and Ch 11's ground | Ch 10 or Ch 11 |
| Database connection poolers as the usual fix (parking lot) | Ch 10 | Ch 10 (R6) |
| Over-provisioning figures (Ch 5's Datadog and CNCF claims, by reference) | Ch 5 gave them; Fennel's own before-and-after is the evidence here | One sentence in s-06 |
| Prices of nodes | No price is needed for "a fifth fewer node-hours"; pricing is Ch 14's | One labelled figure in s-06 |
| The cluster autoscaler and "room to lose a node" (Ch 5): a loop that adds nodes turns a spare machine into a few minutes' wait | A good idea that needs its own paragraph and reopens Ch 5's section | Two sentences in s-03 |

## If it runs long

In the plan now; cut in this order. Cuts 1, 2 and 4 are parts of a segment and are tagged `[cut n]` there; cuts 3, 5 and 6 are whole records (k-05, f-01, f-06). A builder can apply all six without a re-plan. Every objective stays covered after all six.

| # | Cut | What the reader loses | Saves |
|---|---|---|---|
| 1 | The staffing-rule aside (s-05) | The chapter's management analogy and its breaks line (the loop knows one number and has no judgment); s-07 still says the second half | ~0.5 min |
| 2 | The spot pool: its sentence in s-03 and its dashed pool in f-03 | That a cheaper pool which can be taken back exists and which services stay off it; Ch 14 can carry it | ~0.5 min |
| 3 | k-05 and its feedback (s-05); f-05 stays | The practice of choosing a remedy by its cost, and the minimum, maximum and target told apart; k-08's model answer still names the remedy | ~0.5 min |
| 4 | "Two more places the limit can sit" (s-07): the payment provider and long-lived connections | m-36's return (Ch 7 promised it) and the payment provider as a second example; k-08 still names the payment provider | ~0.5 min |
| 5 | f-01, folded into s-01's prose; f-07 keeps its "before" panel | The waste drawn before it is explained; the before-and-after chart still shows it | ~0.25 min |
| 6 | f-06, with k-06's feedback carrying the answer in words | Seeing on the nodes why node 06 can't be emptied | ~0.25 min |
| 7 | D2–D5 removed | Optional depth only: other measurements and other kinds of autoscaling, other node autoscalers, the twenty-minute cases, what else keeps a node | 0 (not counted) |
| 8 | k-02 → the worked case only (not recommended) | The check that the HPA only rewrites a number, which the lane builds on | ~0.5 min |
| 9 | s-08's table reduced to a recap line (not recommended) | Breaks the course's loop lens table convention (§2.3) and Ch 5's and Ch 7's promise of this row | ~0.75 min |

Cuts 1–6 recover about 2.5 minutes, taking the plan from about 25 to about 22.5.
