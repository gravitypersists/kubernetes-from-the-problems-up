status: done_with_concerns

(Full report as returned by the designer, recorded by the orchestrator.)

summary: Revision 1 of the plan for the user's site-1 comments. s-06, f-03, k-06 dropped (d-12), o-1 narrowed; §2.3 loop lens wording throughout (d-11); s-04 says who rents nodes; s-05 rebuilt around losing a node; s-02 says a Pod can use more than it reserves; one owner per explanation; sandbox reorganised with payments adjustable (numbers verified: 4 nodes, 5 with the spare; self-test passes on 98,304 settings). New estimate ~22.5 min (likely 23-24).

concerns:
- #28: "simulates how the scheduler operates" is not true (the widget packs tightly; the scheduler spreads by default, c-06/c-07). Plan gives: "The following widget works out how many nodes Fennel needs … Like the scheduler, it places every Pod by its requests …; unlike the scheduler, it packs the Pods as tightly as they will go…". ac-11 bans "simulates the scheduler". Goes back to the user.
- payments doubled to 4 GB (k-04) adds no node (slack); 7.5 GB does. k-04 feedback no longer promises a node.
- brief.md o-1 still includes node pools: orchestrator to narrow.
- Page section numbers shift (Tuesday §06, eviction §07, conversation §08); check counts become /08; builder updates cross-references.
- "Set by" readout survives as one line when processor sets the count.
- D6 (per-Pod billing disclosure) kept, collapsed; main-text paragraph two sentences.
- c-24, c-25 unused here; go to Ch 8.

dispositions: d-11 fixed; d-12 fixed; #2 #4 #6 #9 #10 #11 #13 #16 #17 #18 #19 #20 #21 #22 #23 #24 #25 #26 #27 #29 #30 #31 #32 #33 #34 #35 #36 #37 #38 #39 #40 #41 fixed in the plan; #28 fixed with accuracy caveat; #1 #3 #5 #7 #8 #12 #14 #15 #42 left to the builder.
