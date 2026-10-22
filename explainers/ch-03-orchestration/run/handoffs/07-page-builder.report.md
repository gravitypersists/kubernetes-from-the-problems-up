status: done

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/index.html — round-1 wording and check fixes (only this file changed)
- /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/gate/page-round-5.json — gate PASS; reading ~13 min text only (brief ~15)

summary: All 12 assigned round-1 findings fixed; all edits in index.html; nothing in site/widgets/w-fleet-scrolly/ changed. Correct answers unchanged for every check; check text reworded only where a finding asked (d-10); existing feedback still fits. No length cuts (d-13). Gate run once after edits.

concerns:
- P-02: the settling sentence belongs in step A3 (widget builder's data.js); page side only makes s-01, f-01 and s-04 consistent.

relaxed:
- none

dispositions:
- A-02: fixed — s-04 breaks line: "In an orchestrator, no single part gives every cue: separate parts each watch for one kind of work and act on it. How that work is split up is the next chapter."
- A-03: fixed — s-05: Google ran its services on Borg for years, then built Omega to try out new ideas, many of which went back into Borg.
- A-04: fixed — "In 2015, at version 1.0, Google announced it would give Kubernetes to a newly formed foundation…".
- P-02: fixed (page side) — s-01 "pays for about eight rented machines"; f-01 placing row "plus whole spare machines that sit empty"; s-04 "The four machines Sam used in §02"; k-01 unchanged (scene before Monday).
- P-04: fixed — D1 ends "…what happens to them when that machine dies? The check below asks it."
- P-05: fixed — k-08 A "Docker's own tool… one step up"; B "Different jobs: …" without "usually"; C "Two ways to run containers in production; a team standardises on one…"; feedback unchanged.
- P-06: fixed — f-01 caption "Each job Sam did by hand shows up on a manager's desk."; k-07 C "That it keeps working between releases, on Saturday night's kind of problem as well as on release days."; cut "with nobody woken up to do it" from s-04.
- P-07: fixed — both k-04 options use "the settings that send customers' traffic to storefront".
- P-10: fixed — f-02 caption "The image is the hand-off: the package Riley builds on one machine is the same package the cluster runs, whichever tool built it." ("package" rather than "file", for precision).
- P-11: fixed — chore 7 "Left three storefront copies running all week, sized for Friday's dinner rush."
- P-12: fixed — k-09 prompt "What's the most useful thing Jordan can ask?"
- P-16: fixed — "…does the six jobs in Fig. 01 by itself."
