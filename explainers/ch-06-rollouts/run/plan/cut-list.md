# Cut list: Ch 6, Shipping without downtime: rollouts and rollbacks

Researched or considered, and deliberately left out of the main text. Every research claim (c-01 to c-12) is used by a segment, so nothing here is an unused claim; the items are examples, parking-lot lines and design options. "Cost to add back" is what it would take in this chapter.

| What | Why it's out | Cost to add back |
|---|---|---|
| A second lane for the $0 rollout and the rollback (v63 → v64 → v63, step by step) | Time, and it would show the same mechanism a second and third time; f-03, f-04 and f-05 show only what is new (the outcome, the timeline, the kept ReplicaSet) | A 5-step lane on the same data file and pool additions; about 2 min. First thing to add if the user wants more |
| A hands-on rollout widget (the reader sets extra and short Pods and watches) | Engineer territory (§2.4); the one consequence a manager needs (spare room) is k-03 | A widget builder; about 2 min of reader time |
| Opening on the $0 incident as a hook | Would give away k-04's answer before the reader has the model | Swap s-01's scene for a two-line teaser; no extra time |
| The Google SRE "roughly 70% of outages are due to changes" figure (parking lot) | One source's figure with no method; the chapter's pain is Fennel's; using it means swapping a claim | Promote to facts.md, one sentence in s-01 framed "Google's SRE team has said…" |
| What fast-shipping teams do differently (DORA: small batches, automated tests) | Not researched at light depth (q-2's second half) | A research pass and a paragraph in s-01 |
| Rollover: a change mid-rollout heads straight for the newest version (parking lot) | s-07's level-based paragraph says it in one clause without the term | A disclosure in s-07; about 0.25 min |
| The Recreate strategy (stop all old Pods first; downtime) | Belongs with data changes that can't run side by side (Ch 10) | One sentence in D2 |
| Terminating Pods aren't counted, so briefly there are more Pods than the limits suggest (c-03 note) | Pedantic; the lane's "at most four" is true of the Pods that count | A disclosure in s-03 |
| `minReadySeconds` (a Pod must stay ready a while before it counts) | Engineer tuning | One sentence in D2 |
| Startup probes; probe timing defaults beyond "every ten seconds" (failure threshold 3, timeout 1 s) | Engineer territory; Ch 12 | A disclosure in s-05; Ch 12 (R7) |
| Liveness checks that depend on back-ends causing cascading restarts | A common mistake worth a manager's question, but a third probe idea in s-05 overloads it; Ch 12 | One paragraph in s-05; about 0.5 min |
| How a failed readiness check removes a Pod from traffic (the EndpointSlice controller) | Ch 7's; said here as "a loop we'll name in Chapter 7" | Ch 7 (R5) |
| Pause and resume a rollout | Engineer tooling | — |
| Tools that roll back on their own (Argo Rollouts, Flagger), progressive delivery | Named once in s-06 and D3; in depth is Ch 13 | Ch 13 (R8) |
| Admission controllers rewriting tags to digests | Ch 13 | Ch 13 |
| The trade-off of pinning digests (no automatic security rebuilds under the same tag) | A real trade-off but a second idea in s-08; Ch 9 / Ch 14 | One sentence in s-08 |
| Changing a Pod's requests in a Deployment starts a rollout | Ch 8 | Ch 8 (R9) |
| Editing a configuration object doesn't start a rollout | Ch 9 | Ch 9 (R9) |
| Disruption budgets during node upgrades | Ch 14 | Ch 14 (R10) |
| GitOps in depth (undo by command gets reverted to the files) | Named only in D4; Ch 13 | Ch 13 (R8) |
| A crashing version as a real Fennel event (rather than f-03's "if v64 had crashed") | One incident is enough story; the crash case is a contrast, grounded in Ch 4's `notifications` | A dated event in R2 and one sentence in s-06 |
| Rolling back a *stalled* rollout (only the bad ReplicaSet scales down; the docs' own example) | The chapter's rollback is after a completed rollout; the stalled case would be a third scenario | A sentence in D3 or D4 |

## If it runs long

In the plan now; cut in this order. Each cut keeps every objective covered.

| # | Cut | What the reader loses | Saves |
|---|---|---|---|
| 1 | The shift-handover analogy aside (s-06) | The management bridge for m-09; its breaks line ("the loop never sees a sale") is said once in s-06's "why" paragraph instead | ~0.5 min |
| 2 | f-06 (tag and digest figure, s-08) → inline code in the prose | A visual of the registry and the deleted old image; the two assumptions stay in words | ~0.25 min |
| 3 | k-03 (no room: what happens?) → one debrief sentence | The rehearsal of Ch 5's pending in a release; o-1's spare-room point stays as a statement | ~0.5 min |
| 4 | f-05 (record at three moments) → one sentence in the reveal | Seeing the kept v63 ReplicaSet fill again; k-06's feedback then points to f-04 and the prose | ~0.5 min |
| 5 | Lane step R4 merged into R5 ("two more rounds") | The second round drawn on its own; four steps instead of five | ~0.25 min |
| 6 | k-05 (readiness vs. liveness, applied) | The only check on the probe distinction (o-2's second half); f-02 still shows it | ~0.5 min |
| 7 | D2–D4 removed | Optional depth only (more copies; the 10-minute deadline; command vs. file) | 0 (not counted) |
| 8 | s-09's table reduced to a sentence in the recap (not recommended) | Breaks the course's loop lens table convention (§2.3) | ~0.75 min |

Cuts 1–6 recover about 2.5 minutes; with 8, about 3.25.
