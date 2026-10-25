status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-07-services/site/index.html — the prose fixes, the §02 and §05 headings, the reworded options, f-05 rebuilt so no Service block is a hop, f-03's narrow SVG with its second copy line, sources item 7, and corrected comments in the mount contract
- /Users/m/workspace/k8s-course/explainers/ch-07-services/site/assets/page.css — f-05's new layout: `.rt__hop`, `.rt__look`, `.rt__leader`, `.rt__stem`, `.rt__call`, the narrow and wide grids. Tokens only.
- /Users/m/workspace/k8s-course/explainers/ch-07-services/site/assets/page.js — the hedge on the `CH07_LOOPS` kube-proxy row
- /Users/m/workspace/k8s-course/explainers/ch-07-services/site/widgets/w-services-scrolly/data.js — S1–S4 calls lines, the S3 text, both loop pills lit in S2–S4, the aria labels, the lens line in `FIGURES.ready`, the header comment. Data only.
- /Users/m/workspace/k8s-course/explainers/ch-07-services/site/widgets/w-services-scrolly/index.css — the desktop reservation raised from 536px to the measured 553px
- /Users/m/workspace/k8s-course/explainers/ch-07-services/site/widgets/manifest.json — `mounts.S` now gives the lane's real name, "Thursday · catalog", and the size note is updated
- Gate: /Users/m/workspace/k8s-course/explainers/ch-07-services/run/gate/page-round-6.json. The full `verify.mjs` passes, with every check PASS.
- Screenshots in /Users/m/workspace/k8s-course/explainers/ch-07-services/run/screenshots/probe/, prefixed `fix-r1-*`: f-05 at 1280, at 360 and in dark mode, f-03 at 360 and 1280, f-04, and the lane S2/S3-locked/S3/S4/back-to-S1 at 1280 and 360, plus the S3 canvas at 1100.

summary: I fixed all 22 findings in one pass. In f-05 the arrows now run gateway → `storefront` Pod → `orders-q2rw`. Each Service block sits beside its arrow on a dashed c3 leader, with a line saying what the caller looks it up for. On desktop the label "Inside the cluster · no load balancer" heads the branch, and the arrow before the `storefront` Pod continues through it, so its head still lands on the Pod. I drove the lane at 1280, 1100 and 360, forward and back, with S3 locked before k-03 and unlocked after any answer. Scrolling back restores S1, and canvas heights are the same in every step. Text alone reads at 17.4 min, the same as before, so the "24 MIN" in the hero and the rail stays an honest estimate. I cut no prose.

Option lengths after all edits, in characters of rendered text (* = key):
- k-01: A*=77, B=74, C=80 (key in the middle)
- k-02: A=86, B*=82, C=81 (middle)
- k-03: A=79, B*=81, C=86 (middle)
- k-04: A=80, B=72, C*=79 (middle)
- k-05: A=83, B*=81, C=84 (3 short of the longest)
- k-06: A*=73, B=70, C=74 (middle)
- No key is the longest.

concerns:
- **A-04: one fact isn't in facts.md.** facts.md doesn't say the cluster's DNS runs as Pods; only the accuracy review's quote does. So the page names DNS as the third thing that has to run ("the cluster's DNS, which answers names like `orders`") without saying where it runs. I also left out the optional D3 sentence about DNS failing.
- **A-02: the product names come from the review, not facts.md.** "A Service of type LoadBalancer usually gets a Network Load Balancer, and a gateway usually sits behind an Application Load Balancer" relies on the EKS user guide quote in the accuracy review. facts.md (c-12 note) supports only the same $0.0225 price for both products. I added the EKS page to sources item 7 under a generic link text, because I couldn't confirm the page's exact title.
- **P-02: the plan needs a rule I can't write.** The reviewer wants "a Service block is never a hop" recorded in the plan's `## Visual grammar` for later chapters. The plan isn't in my namespace, so the designer or coordinator needs to add it.
- **P-01: one more heading changed.** On the re-check of headings, I also changed §05 from "Where a call actually goes" to "Where a call goes". The rail shows that heading from the top of the page, and "actually" hinted at k-04's answer. The standfirst and the meta description give nothing away.
- **P-04 in s-09: Riley's quote is no longer a block quote.** I shortened the scene paragraph to one line instead of shortening the prompt, because k-07 has to state its own question (ac-13). The meeting and Riley's line now appear only in the prompt.
- **The S3 calls line wraps at 1280.** "answered by 2 v62 Pods · 1 v63 Pod" takes two lines on the desktop canvas; the old wording fit on one. Each group is held together with non-breaking spaces, so the line breaks after "·". I raised index.css to the measured 553px, so nothing shifts.
- **Pool files.** The four modified files under explainers/_pool/ predate this round, from the lane builder's pool-04 work. I didn't touch them.

relaxed:
- none

dispositions:
- A-01: fixed — In S3's text in data.js, "Only then does the Deployment loop tell…" became "Seeing the same Pod ready, the Deployment loop tells a v62 Pod on node 06 to stop." "Before its container has even exited, so no new call is sent…" became "while its container is still shutting down, so within a moment new calls stop going to a Pod on its way out." I corrected the header comment in data.js to match.
- A-02: fixed — The cost paragraph in s-07 now says a Service of type `LoadBalancer` usually gets a Network Load Balancer and a gateway usually sits behind an Application Load Balancer. Both are listed at $0.0225 an hour in one US region on 24 October 2026, about $16 a month each. The figures, the date and "on one provider" are unchanged. Sources item 7 now names both products and adds the EKS guide.
- A-03: fixed — The recap bullet now reads: "When a Service has no ready Pods, its callers are refused at once, in most clusters, by default. On Tuesday the fix was more copies of `orders`, not a different Service." That keeps the d-06 hedge and no longer contradicts D5's selector-typo case.
- A-04: fixed — The s-05 paragraph now lists three things that have to run (the endpoints loop, kube-proxy, the cluster's DNS) and says that none sits on a call's path, because a caller asks the DNS for the address first and the call then goes straight to a Pod. See concerns.
- A-05: fixed — The calls lines now count Pods: "answered by 3 v62 Pods", "answered by 2 v62 Pods · 1 v63 Pod", "answered by 3 v63 Pods". S3's aria label no longer says "v62 twice and v63 once"; it says each new connection goes to one listed Pod at random. The list rows are unchanged.
- A-06: fixed — s-03 now reads "When Ari moved each of Fennel's services into the cluster, they wrote one more short record beside it." The Deployment link is gone.
- A-07: fixed — The kube-proxy row in `CH07_LOOPS` now ends "…picked at random by default; in most clusters, an empty list refuses calls".
- P-01: fixed — §02 is now "A list copied by hand", with id `a-list-copied-by-hand`; the rail and the mobile contents pick it up. "The address belongs to the Pod, not to the node" moved into the debrief after f-01. §05 lost "actually". The standfirst and meta description were re-checked and are clean.
- P-02: fixed — Every element of f-05 is kept, and only the arrows and placement changed. Gateway → `storefront` Pod, with the `storefront` Service beside the arrow on a dashed c3 leader, labelled "to a Pod picked from the `storefront` Service's list". `storefront` Pod → `orders-q2rw`, with the `orders` Service on a leader below the arrow on desktop and beside it on mobile, labelled "via the `orders` Service's list (rules on `storefront`'s node)". The branch label heads the branch at both widths. The aria-label is rewritten and the caption is unchanged. Checked at 360, at 1280 and in dark mode.
- P-03: fixed — Before → after:
  - k-01 B: "`orders` working for its callers, so…" → "`orders` working for callers, so…"
  - k-02 A: "Yes: the rollback brought back the v63 Pods from the ReplicaSet the Deployment kept, addresses and all." → "Yes: the rollback brought back v63's Pods from the kept ReplicaSet, addresses and all."
  - k-02 B*: "…and new Pods get new addresses." → "…and new Pods are given new addresses."
  - k-02 C: "Only some: Kubernetes gives a returning v63 Pod its old address back whenever no other Pod has taken it." → "Only some: a returning v63 Pod gets its old address if no other Pod has taken it."
  - k-03 B*: "Any of the Pods on the list by then, whether v62 or v63." → "Any of the Pods on the list by then, the two v62 Pods as well as the new v63 one."
  - k-03 C: "…are ready and the list switches over." → "…are ready and the list then switches over."
  - k-04 B: "…restart it, as it would any Pod." → "…restart it, like any Pod."
  - k-04 C*: "None: each caller's own node sends the call straight to an `orders` Pod." → "…straight to one of the `orders` Pods."
  - k-05 B*: "The rules on `storefront`'s own node, because the `orders` list was empty." → "…since the `orders` list had no ready Pod on it."
  - k-06 A*: "One, at the cluster's edge; the call to `orders` uses its Service." → "One, at the cluster's edge; the call inside, to `orders`, uses its Service."
  - k-06 B: "…in front of `orders` for the call inside." → "…in front of `orders`, for the call inside."
  - k-06 C: "…and one in front of each of the two Services." → "…and one more in front of each of the two Services."
  - The key is unchanged in every check. The key is the middle length in 5 of the 6 checks.
- P-04: fixed — I changed the paragraphs, not the prompts. In s-02 the paragraph now ends on "Try the same on the cluster, with `catalog` on the Thursday of Chapter 6's releases", and the prompt carries the "suppose". In s-06 I dropped the log sentence. In s-09 the scene became one line, and the prompt carries the meeting and Riley's line (see concerns).
- P-05: fixed — s-04 now says "This loop only writes into the record: it changes the list, not where any call goes." In s-05 I added "Unlike the endpoints loop, though, it doesn't write the record: what it writes is its own node's rules."
- P-06: fixed — s-01 now has "Think back further, to 03:04 on a Saturday in Chapter 3…" and "That includes 03:10 on a second Saturday, in Chapter 4, when node 03 died again, this time on Kubernetes, and `orders-q2rw` replaced `orders-5c8x`." s-03 now has "since 03:10 on that second Saturday (Chapter 4)". D1's first bullet adds the `orders-5c8x` → `orders-q2rw` replacement on node 04.
- P-07: fixed — "It also gives Jordan a question to take to the engineers."
- P-08: fixed — "It is also the loop that, in Chapter 6, took a `catalog` Pod that had lost its database connection off the list while its readiness check failed, and put it back once the check passed."
- P-09: fixed — k-01 A's feedback now ends "…so something else had to make sure `storefront` found it, and nobody had to tell it."
- P-10: fixed — "By default, a Service's address works only inside the cluster. That's all `storefront` needs…"
- P-11: fixed — The DOES line in `FIGURES.ready` is now "lists it again: 10.4.4.7, as before". It fits on one line at 1280 and wraps evenly at 360.
- P-12: fixed — In f-03's narrow SVG I narrowed the node frames from 312 to 288 and moved the pills and labels in. A second dashed c3 line now runs from the record up the right-hand gutter into node 01's FORWARDING RULES band. Checked at 360.
- P-13: fixed — "At the top of the drawing, the panel for the cluster's record now shows the `catalog` Service. At the top of its block…"
- P-14: fixed — `active: ['deploy', 'ep']` in S2, S3 and S4, as Ch 6 lit two loops at once. The lens line stays the endpoints loop's, and the aria labels name both loops acting.
- P-15: fixed — The analogy aside adds "Each call rings one of the people on it, as each connection reaches one Pod."
