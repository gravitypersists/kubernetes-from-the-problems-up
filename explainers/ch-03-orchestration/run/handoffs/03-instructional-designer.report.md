status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/learning-plan.md — revision 1. §02 is now three scrollytelling lanes (spec'd as w-fleet-scrolly, complexity high). Other additions: a `## Ch 2 review lessons` section, disclosure notes D1–D8, term cards (`.cp-term`), 9 checks, 18 acceptance criteria, and R1–R15 with each recommendation marked changed or new.
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/cut-list.md — revised. The rev-1 cuts are the widget, analogy A1, the reader placing all nine containers, and a "could four do it?" predict. New 8-item `## If it runs long`.
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/mockup.html — rebuilt. It shows each lane as a sticky canvas beside its steps, every check in final wording, the term cards, the disclosures, the cut list and the cut order. No third-party assets.

summary: §02 is now scrollytelling, not a hands-on widget. There are three lanes, one per stage of Sam's week: Monday placing, Saturday's 02:51 crash and 03:04 machine death, Tuesday's v13 update. The canvas renders a complete snapshot at each step, so scrolling back restores any state. w-fleet's three real learning moments became committed checks: k-02 (where would you put orders now?), k-03 (binary: orders is running, can customers order?) and k-04 (binary: which order keeps the site up?). A think-then-reveal (k-05) then has the reader sort Sam's seven chores into the six jobs. All Ch 2 review lessons are applied. Minutes: 14.25. check_plan passes with no warnings.

what changed (for the user):
- The hands-on widget is gone. §02 is three short scrollytelling lanes over a drawing of four machines (Ch 2's chips, with chip height showing size). Earlier states come back when you scroll back.
- The widget's nine placement taps are gone. You now make Sam's three key decisions: which machine `orders` goes on (three machine buttons); whether customers can order once it's running again (two options; storefront still points at the dead machine); start-new-first or stop-first for the update (two options).
- §01 opens with a cast strip (Sam, Jordan, Morgan, Riley) and an "I didn't read the last chapter" disclosure.
- Orchestration/orchestrator, cluster and Kubernetes each get a term card. Kubernetes's card is the payoff: blueprint ground, with the six-job strip.
- The operations-manager analogy is deleted, because it re-listed the jobs. A short aside on the word "orchestrator" (an orchestra's conductor) replaces it. Its breaks note covers "no single conductor" and "no judgement".
- §06 now says concretely what each does: Docker's tools build the image and start containers on the machine they're run on; an orchestrator decides which machines in the cluster run each container and keeps them running. The "layers" and "box" slogans are gone.
- Secondary caveats moved into collapsed notes: the source of the 12–18% figure, Swarm, the 2022 "Kubernetes drops Docker" change, and whether Google runs on Kubernetes. "Learn later" notes cover what a unit of room is, what happens to orders already placed, and whether these are all the jobs.

dispositions:
- d-03 part 1 (widget vs scrollytelling): fixed. Replaced w-fleet with three scrolly lanes with three committed checks inside them; rationale in `## Shape` (taps were Active work; stepped states hid earlier ones; hardest moment showed ~12 interface elements for three ideas; process topic suits B1 step-locked). §2.1 pain now comes from decisions made by hand and consequences seen at once. Reduced widget rejected. Hardest moment (03:04) split into steps B3–B5, ≤2 new elements per step. Minutes table, cut list, cut order, reuse notes (snapshot format, `renderFleet`, lane controller), acceptance criteria, mockup, R5–R10, R13 updated. Full scrolly pattern written (desktop sticky left canvas; <900px sticky top ≤50vh; <560px tall inline snapshots; gated steps; ≤300ms transitions, no autoplay so I4 n/a; no-JS fallback); recommended for CURRICULUM §8 as R13. All d-04 facts kept; one new: fixed Monday layout, machine 03 dies, orders moves to 04 (R4).
- d-03 part 2 (Ch 2 review lessons): fixed. Mapping in `## Ch 2 review lessons`. Cast strip and D1: ac-01. No hidden stepped states: ac-03. Crisp binary predicts: k-03, k-04. No split attention, precise language, no slogans: `## Shape` rules and ac-17. Term flair: `.cp-term` spec, ac-11, ac-13. Caveats to disclosures: D5–D8, ac-18. A1 deleted, replaced by conductor aside. Learn-later notes D2–D4.
- d-05 (R-numbering): R1–R3, R11, R12 unchanged. R4–R10 and R13 marked "changed". R14 (course-wide term card) and R15 (jump-ahead opening convention) new.

concerns:
- o-1 says "having done several of them by hand". The reader now decides three of them by hand (k-02, k-03, k-04) rather than executing all of them; see relaxed.
- Nine checks for 15 minutes is denser than Ch 2. Three are fast in-lane choices, two binary. Cut order items 1–3 can remove or narrate three of them.
- The story no longer depends on the reader's layout: machine 03 always dies and orders always goes to 04, so k-02 is single-answer by design.
- The term card and scrolly patterns are specified independently of Ch 2's in-progress rebuild; one chapter may need aligning (R13, R14).
- Unchanged from round 1: c-03, x-01, local-02 cut to Ch 5; "K8s" and "helmsman" unsourced.

relaxed:
- CURRICULUM §2.1 "pain they feel in the page" / chapter entry "the reader places a dozen containers … by hand" / o-1 "having done several of them by hand" — reader makes Sam's three key decisions in committed checks and sees consequences drawn, per d-03. User should confirm at the checkpoint.
- Chapter entry "about a dozen containers" — nine containers — so four machines fit side by side at 360px.
