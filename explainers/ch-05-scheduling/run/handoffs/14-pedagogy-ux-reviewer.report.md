status: done

(Report as returned by the pedagogy/UX closure reviewer, recorded by the orchestrator.)

summary: Closure round 2. 16 of 19 P- findings closed; P-09, P-11, P-13 still-open nits. P-01 (blocking) closed: no key is the longest (k-04 key 108 vs B 116). ac-08 numbers and the k-09 pointer reproduce. No overflow at 360. Numbering consistent after §06 removal. ac-01..ac-21 met. Reading ~23–24 min. No new blocking findings.

concerns (below blocking, not in the review file):
- At 9 nodes + spare the sandbox draws NODE · 10 second (1, 10, 2…9): pool/cluster/cluster.js nodeIds() sorts ids as strings. Pool change; Ch 4, 6, 7 need re-gating.
- Desktop sandbox reserves ~1265px (3 rows + never-placeable bar); default state leaves ~430px empty at 1280, ~420px at 768 (plan: ~600px, two rows).
- P-09 also covers: s-04's "the bar under the widget's nodes" is wrong under 600px, where the bar comes before the nodes.
- Read builder reports as the handoff asked; checked each disposition against the page.
- ac-09 says use is a solid fill; build hatches use per the user's H-29; counted as met.

relaxed: none
