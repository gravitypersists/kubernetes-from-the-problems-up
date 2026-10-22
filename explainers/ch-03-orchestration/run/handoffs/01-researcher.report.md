status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/facts.md — 12 claims from 8 sources; q-1 to q-7 answered, with partial coverage spelled out under each question; Ch 1/2 claims reused by reference
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/misconceptions.md — m-02, plus local-01 ("Kubernetes is Borg open-sourced"), local-02 ("enough total free capacity means it fits") and local-03 ("an orchestrator is a fancier deploy script")
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/examples.md — 5 examples: fragmentation numbers, an honest version of Fennel's idle machines, a moved container getting a new address, a shift-supervisor analogy with where it breaks, and Docker and Kubernetes as layers
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/parking-lot.md — 12 off-objective items, mostly for Ch 4, 6, 7 and 14

summary: Light-depth research; `check_research.py` passes (12/12 claims, 8/8 sources, 5/5 examples, no unresolved questions). Main sources: Google's "Borg, Omega, and Kubernetes" paper, two kubernetes.io blog posts ("10 Years", "Don't Panic"), the Kubernetes overview page, Red Hat's orchestration explainer, ENERGY STAR citing NRDC 2014, the SRE book's toil chapter and a Cloudera doc on fragmentation. No media assets; drawn figures serve better. The facts most likely to surprise managers:
1. Kubernetes is Google's third system, built new and open source from the start. It is not Borg released, and as of 2016 Google still ran on Borg.
2. Kubernetes was launched at DockerCon 2014. Since v1.24 (2022) it no longer uses Docker's engine, yet Docker-built images run unchanged.
3. There can be 100 GB free in total and still no room for one 20 GB job.

concerns:
- Deploy-coordination pain (the group chat) has no sourced evidence. Keep it as Fennel fiction with no figure. DORA reports would be the source if a number is wanted.
- On-call evidence is Google SRE practice: toil causes burnout, and Google caps it at 50%. It is not an industry survey. No figure was found for pages or recovery hours.
- The 12–18% utilization figure (c-04) is a 2014 estimate for US corporate data centers, and I read it secondhand via ENERGY STAR because NRDC blocked fetching. It is marked medium; hedge it on the page and don't assign Fennel a percentage.
- In c-05, the PDF's columns came out of order when extracted. The quoted fragments are verbatim, but the bracketed joins rebuilding the sentence are not checked character for character.
- Vocabulary guard: the sources say "nodes", "bin packing", "pending" and "scheduled", which are Ch 4/5 terms. The notes give plain-word substitutes.
- The word "orchestrator" suggests a single conductor, which is m-03 (Ch 4). The Borg/Kubernetes authors explicitly contrast their design with "a centralized orchestration system". Define the orchestrator by the jobs it does, not as one brain.
- m-02 correction: "not competitors" is only mostly true. Docker Swarm did compete at the orchestration layer, so phrase it "not competitors in the usual sense".
- Gaps in the widget's six-job list: health checking (stuck rather than crashed), per-container settings and secrets, and monitoring. These belong to Ch 6, Ch 9 and Ch 12, so mention them at most as "and more".
- Proposed new catalog entries for the checkpoint: local-01 and local-03.

relaxed:
- none
