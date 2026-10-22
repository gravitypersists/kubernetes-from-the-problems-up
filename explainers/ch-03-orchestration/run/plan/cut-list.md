# Cut list: Many containers, many machines: the orchestration problem (Ch 3)

Revision 1 (d-03): §02 is now scrollytelling. Rows marked *(rev 1)* are new or changed.

## Out (researched or considered, deliberately left out)

| What | Why it's out | Cost to add back |
|---|---|---|
| *(rev 1)* **The hands-on w-fleet widget** (place nine containers with one tap each; tap to restart, move, stop; pass on addresses; four stepped states in one box) | The user found Ch 2's stepped widget unclear and an unnecessary load (d-03), and w-fleet had the same two problems at a larger scale. Its states replaced one another, so the reader couldn't scroll back, and at its hardest moment it showed about a dozen interface elements for three ideas. Most of its taps were Active, not Constructive. Its three learning moments are kept as committed checks inside the scrolly lanes (k-02, k-03, k-04). | A widget on top of `renderFleet`: about 1.5–2 min of reader time and a separate builder. Recommended only where the topic is system dynamics (Ch 5, R7). |
| *(rev 1)* **Analogy A1, the operations manager rostering staff across shops** | It re-listed the six jobs in a new costume, the repetition the user flagged in Ch 2's "pre-imaged laptop". Replaced by A2, the conductor: shorter, about the word itself, and its breaks note guards against m-03. | An aside: about 0.4 min. Not recommended. |
| *(rev 1)* **The reader placing all nine containers** | Nine taps teach tapping. Placing is still met: lane A shows Sam fitting each container on one machine with enough room, and k-02 makes the reader place `orders` after 03:04. | Not recommended (see the first row). |
| *(rev 1)* **Personalised debrief** (the reader's own counts of placements, moves and addresses) | Personalising needed a free-form widget. With a fixed story, k-05 lists Sam's seven chores directly, which is simpler and the same for every reader. | n/a |
| *(rev 1)* **A "could four do it?" prediction in lane A** | Considered as a binary predict. Its answer is visible two steps later, and it would be the fourth check in §02. The question stays as Morgan's line. | A two-option check in lane A: about 0.4 min. |
| **Fragmentation: "fits nowhere though there's room in total"** (c-03, x-01, local-02) | It would make 03:04 a packing puzzle when the lesson is the jobs. Ch 5 owns the vocabulary. The fixed layout leaves machine 04 with room. **c-03 is the only unused claim.** | A different layout plus a predict step: about 0.75 min. Recommended for Ch 5 (R2, R7). |
| **A scaling stage** (the Friday rush: add copies at 17:00, remove them at 21:00) | About 1 min, and a time axis that scrolly lanes don't give (Ch 8 owns it). Scaling is named through k-05's chore 7. | A fourth lane: about 1 min. |
| **About a dozen containers → nine** | Four machines side by side at 360px with honest sizes; and nine leave about half the room free, which is the idle-spend picture. | Data only, but it changes the layout facts (R4). |
| **A recovery clock at 03:04** | No sourced recovery or page figures; invented minutes would read as claims. | Only with a sourced figure. |
| **The spreadsheet as a visible table** | A table on the canvas costs height at 360px. One stale line ("SPREADSHEET · orders: machine 03") carries the drift. | A small table under the canvas: about 0.3 min, plus mobile height. |
| **Per-service chip colours** | Ch 2 draws all containers in `c1`; labels and sizes suffice. | CSS only. |
| **Spreading a service's copies across machines** | A second placement rule. | Ch 5 ("affinity exists", R7). |
| **Docker, Inc. as a company; Docker Desktop's bundled Kubernetes** | Unsourced here; a third meaning of "Docker" that m-02's correction doesn't need. | One clause after sourcing. |
| **"K8s" and "Kubernetes = helmsman"** | Unsourced here (model). Worth sourcing for managers who read the abbreviation in chat. | One sentence in s-05 after sourcing; suggested for Ch 4 (R6 d). |
| **A Kubernetes timeline figure** | Three sentences of prose carry it; Borg's own dates aren't in the facts. | A small figure: about 0.3 min. |
| **Exact contributor figure (88,000 / 8,000+)** | Dates fast; hedged instead. | One clause. |
| **Nomad, AWS ECS; "not an all-inclusive PaaS"; release cadence** | Unsourced, or Ch 14's scope. | Ch 14 (R12). |
| **Health checks, settings and secrets, monitoring as jobs** | Owned by Ch 6/12, 9 and 12. Named only in D4. | Later chapters (R11). |
| **"Control through choreography" vs. central orchestration; Borg's per-container ports** | Ch 4 (m-03) and Ch 7 background. | Ch 4, Ch 7. |
| **Google's kernel container work; "30% of servers comatose"; toil 33% / 80%; DORA metrics** | A second history thread; unverified; redundant; not fetched. | One clause each, after verification where needed. |
| **A follow-up think-then-reveal after k-09** | Ch 14 answers the cost side. | About 0.75 min. |

Claims: c-01, c-02, c-04 to c-12 are used. **c-03 is cut** (fragmentation). Examples: x-02 (s-03 idle, and Sam's "for when something breaks"), x-03 (k-03 and step B5) and x-05 (s-06) are used. **x-04 is cut** (A1; its "shift supervisor" mapping is the repetition removed). **x-01 is cut** with c-03. Misconceptions: m-02 confronted; m-23 retrieved; local-01 and local-03 confronted; **local-02 cut** to Ch 5.

## If it runs long

These parts are in the plan now. If the built page runs long, cut them in this order (first = cheapest loss). Items 1–4 recover about 1.4 minutes, and items 1–8 about 2.5, without losing an objective, any of the three lanes or the m-02 confrontation. Disclosures D1–D8 are not on this list: they're closed by default and cost nothing unless opened.

1. **k-02 → narrated.** Step B4's text says Sam puts `orders` on machine 04, "the only one with room", and B4 is no longer gated. The reader loses the one moment of placing by hand; the room numbers stay on the canvas. About 0.3 min.
2. **Lane C step C2 (the stop-first contrast) → folded into k-04's feedback.** The reader loses seeing `storefront 0 · DOWN` drawn; the feedback still says it. About 0.2 min.
3. **k-07 → one sentence in s-04** ("It keeps working between releases, Saturday at 3:04 included; a deploy script runs once and stops."). The reader loses the commitment on local-03; TERM 01 still says "all the time". About 0.5 min.
4. **f-02 → prose only.** The reader loses the drawing of Docker on one machine next to the orchestrator across the cluster. k-08 and the concrete prose keep m-02. About 0.4 min.
5. **s-03's 12–18% sentence and D5.** The reader loses the industry anchor for idle spend; Sam's "for when something breaks" and the padding explanation stay. About 0.25 min.
6. **k-06 → think-then-reveal** (same prompt; model answer = option B plus its feedback). It keeps the generation but loses the commitment against "containers solved it". About 0.25 min.
7. **Lane A becomes one step** (the canvas arrives filled; A1's and A2's text merge). The reader loses watching the machines go from empty to full. A2's connecting sentence must survive, because k-03 depends on it. About 0.25 min.
8. **The conductor aside (A2, s-04).** The reader loses the word's origin and the explicit "no single conductor / no judgement" guard (m-03). Cut it only after 1–7. About 0.3 min.

Not on the list, because cutting them removes an objective, the chapter's felt pain, the payoff or an owned misconception: k-01, the cast strip, lanes A–C with k-03 and k-04, k-05, f-01, the term cards, s-05's naming and history, k-08 and the Docker placement, k-09 and the recap.

If the build runs past about 17.5 minutes even after these, split rather than compress: move s-06 (Docker) to the start of Ch 4, and tell the user.
