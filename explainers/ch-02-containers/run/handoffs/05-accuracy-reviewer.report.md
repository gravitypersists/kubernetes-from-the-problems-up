status: done

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/round-1/accuracy.md: round-1 accuracy review, 3 should and 2 nit findings, none blocking
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/screenshots/probe/acc-s2.png, acc-s2c.png, acc-s3.png: w-samecode probe screenshots, states 2 and 3

summary: I checked every statement in the prose, both figures (including the page.js registry and machine labels), the w-samecode data and its computed results, and all 7 checks. I checked them against facts.md, Ch 1's facts, and web spot-checks: Docker's image and tagging docs, AWS ECR tag mutability, and Solaris Containers. The core claims are accurate, every check has the right answer keyed, and all feedback is true. No later-chapter terms appear, and Docker is named once. Should-fix findings:
(1) The page presents the version label as part of the immutable image. Fig. 01 annotates "fennel-app:v43" as "never changes" and says "every version kept as it was", but tags can be moved unless a registry makes them immutable.
(2) Widget state 2 shows production running v42 with Riley's change and failing, while the laptop result is tagged "caught before release". The two contradict each other.
(3) The page implies images carry no OS files at all. They usually carry the OS's basic files, just not its kernel.
Nits: "the name comes from shipping containers" is unsupported, and k-07 B feedback says re-creating a container "takes seconds", which ignores downloading the image to a new machine.

concerns:
- Finding 1 is graded should, not blocking. The page's explicit statements are about images and are true, and the tag conflation is implicit. The orchestrator may upgrade it, since it touches o-2.
- Light depth, so I didn't re-verify high-confidence claims beyond spot-checks. The Google Cloud page couldn't be fetched (truncated). The page's softened figures ("tens to hundreds of MB", "tens of seconds to minutes") match c-11's note.

relaxed:
- none
