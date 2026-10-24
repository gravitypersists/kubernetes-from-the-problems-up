status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/research/facts.md — 25 claims from 14 sources. Questions q-1 to q-7 are all answered. The file also has reuse-by-reference notes (Ch 4 c-12, c-13, c-14, c-15, c-23; Ch 3 c-03 and x-01) and the judgment calls for each question.
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/research/misconceptions.md — m-07, m-08 and m-26, plus three proposed new ones: local-01 (the scheduler places by actual load), local-02 (going over any limit kills; a limit is the room a Pod gets) and local-03 (pending means failed, or means harmless).
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/research/examples.md — 8 examples:
  - x-01: GKE allocatable arithmetic.
  - x-02: Fargate rounds a Pod's size up.
  - x-03: the budget analogy, with where it breaks.
  - x-04: a restaurant-bookings analogy.
  - x-05: leak vs. growth (model).
  - x-06: an illustrative pending message.
  - x-07: Ch 4's moving day replayed under default scoring.
  - x-08: "inflate everything" worked out in room units.
- /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/research/parking-lot.md — 22 one-liners, each tagged with its later chapter (Ch 8, 10, 11, 12, 14 or engineer territory).

summary: The check passes: claims 25/25, sources 14/15, examples 8/8, no assets. Kubernetes claims come from the kubernetes.io page sources, read the same way as in Ch 4. Provider claims come from GKE and EKS docs; AKS appears only in notes. Each survey figure names who measured it, when and how. Three facts are likely to surprise readers:
1. The scheduler refuses a node whose reservations are full even when real usage is very low (c-03).
2. Per-Pod-billed modes bill what a Pod *requests*, not what it uses (c-10, c-11). And not every fully managed mode bills per Pod: EKS Auto Mode bills per machine (c-12).
3. In one dataset (Datadog, 2024), 83% of container spend was idle room. Of that, 54 points were room on nodes that no Pod had reserved, and 29 points were requests bigger than the workloads needed (c-13).

concerns:
- **The Ch 4 story conflicts with default scheduler behaviour.** On moving day, Ch 4 has the scheduler put two `storefront` Pods on node 01 and one on node 02, while node 04 has 5 units free. By default the scheduler prefers the least-reserved node (c-06) and spreads copies of one service across nodes (c-07). So the likely result is one Pod each on 01, 02 and 04 (x-07). Switching on packing doesn't produce Ch 4's layout either.
  - This affects the "why not 04?" opener in the curriculum and "04 was the only node with room" at 03:04.
  - The designer has two options. One is to admit the simplification in the page: the layout came from Sam's spreadsheet, and by default the scheduler would have spread the Pods. The other is to recommend a §3 story-fact change at the checkpoint.
- **Ch 4 said "fully managed modes bill differently".** That's only partly true. Of the three fully managed modes, only GKE Autopilot bills per Pod, and it bills by requests. EKS Auto Mode bills per machine, and AKS Automatic appears to as well. Confidence on AKS is medium because its pricing page wasn't fetched. Suggested generic wording is in c-12's note.
- **The leak-vs-growth heuristic is model reasoning.** It's x-05, marked `source: model`. The only sourced part is the docs' advice: check for a leak first, then raise the limit and possibly the request (c-23).
- **Both cost figures are single-source.** CNCF had just over 100 self-selected respondents. Datadog's data covers its own AWS customers and counts all containers on EC2, not only Kubernetes. Both are marked `confidence: medium` and need the "one survey's figure" framing.
- **The pending message (x-06) is an adapted illustration.** Its wording changes between Kubernetes versions.
- **`check_research.py` doesn't count the `local-NN` misconceptions.** It reports 3/6 because its pattern matches only `m-NN`, but all six entries are in the file and correctly formatted. The script also wrote `run/gate/check_research.txt`, which is outside my namespace (the script's own output).
- **A note on running Ch 5 at all.** CLAUDE.md asks to stop the user from starting Ch 5 unless the Ch 4 session that updates curriculum facts is finished. CURRICULUM.md does carry Ch 4's story facts and pick-ups, but they're uncommitted, and the brief records that the user asked not to commit yet. It's worth confirming with the user that this counts as concluded.

relaxed:
- none

dispositions:
- none
