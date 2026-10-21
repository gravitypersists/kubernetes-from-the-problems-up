status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/facts.md — 12 claims from 8 sources, q-1 to q-7 all answered, with partial coverage stated plainly; reuses Ch 1 claims 01, 02, 06 and 09 by reference without copying them
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/misconceptions.md — m-01, m-19 (revisited) and two new ones: local-01 ("containerized means machine failure is solved"), local-02 ("passed in staging means identical in production")
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/examples.md — 5 examples. x-01 is a Fennel case: same code, different version of the photo-resizing tool, and it fits w-rebuild stage 4. The other four are analogies (x-02 to x-05), each noting where it breaks.
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/parking-lot.md — 11 one-line items
- (no assets.md: drawn figures beat any media found)

summary: Light-depth research came in at the caps: claims 12/12, sources 8/8, examples 5/5. check_research.py passes. Docker's concept docs and the `docker image pull` reference carry the definitions: image contents, immutability, registry, tag vs. digest, CPU-architecture limits, shared kernel. Twelve-Factor dev/prod parity supports "code that passed in staging fails in production". Google Cloud gives hedged figures (megabytes and seconds vs. gigabytes and minutes, confidence medium). The Firecracker NSDI '20 abstract supports weaker isolation and AWS wrapping containers in VMs. No questions left unresolved. Facts most likely to surprise the audience:
1. The "latest" tag can move. Only a digest pins one exact image.
2. Build once, run anywhere breaks across processor types, e.g. an amd64 image on an ARM Mac.
3. Clouds run customers' containers inside lightweight VMs because container isolation is thinner.

concerns:
- check_research.py counts only `m-NN` IDs, so local-01 and local-02 are neither counted nor format-checked. They do follow the format.
- The Firecracker PDF couldn't be text-extracted, so only the abstract is cited. No microVM boot or memory figures are recorded.
- There's no sourced figure for how many containers vs. VMs fit on one machine. The planner must not invent "N times more".
- c-02 (settings like a password handed in at start, so one image serves staging and production) is confidence medium. The source shows the mechanism only in an example; the principle comes from Ch 1's Twelve-Factor config claim.
- "Container vs. Docker" is unsourced within the source cap and sits in the parking lot. Ch 3 owns m-02.
- q-7's machine-dies point is a stated inference: a container is a process on one machine (c-05), and data written inside it is lost when it's replaced (c-06). Restart, placement and upgrades are left to Ch 3 on purpose.

relaxed:
- none
