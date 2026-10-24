status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/index.html: standfirst, meta description, §01 hand-off, k-04, k-06, the gates' contents, TERM 02 and TERM 04, h2s for §03 and §07, s-04/05/06/07/08/10 prose, f-03, f-05 and f-06 labels, Read 27 MIN
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/assets/page.css: locked gates collapse to their lock plate, `.nocaps`, f-05 WANT and the connector labels
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/assets/page.js: backticks in feedback now render as code; CH06_LOOPS Deployment row; CH06_INCIDENT rows 3 and 7
- /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/widgets/w-rollout-scrolly/data.js: lane name; R2 and R3 loops, agents, lens and ariaLabel
- Gate: /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/gate/page-round-7.json is a PASS (full gate, no `--phase`)

summary: All 17 findings are fixed in the page and the lane data, and the pool is untouched. Locked gates now hide their content (`display: none`), so each one collapses to a plate 68px tall at 1280 and 86px at 360. All of s-06 after k-04 now sits inside the k-04 gate: f-03, the reveal, D3, the analogy and the canary/blue-green paragraph. All of s-07 after k-06 sits inside the k-06 gate: f-05, the reveal, TERM 04, level-based, how far back, and D4. f-03 draws when its gate opens, and both panels set `data-drawn`.

I checked the result in my own Playwright runs at 1280, 768 and 360:
- The lane's R1–R3 canvas is the same going forward and back, both with k-02 locked and after it is unlocked.
- The canvas heights are unchanged from the earlier snapshot.
- No visible version string is uppercased.
- There are no console errors.

Option lengths in characters (* = key; no key is the longest):
- k-01: A 86 · B 77* · C 109
- k-02: A 88 · B 69* · C 97
- k-03: A 110 · B 92* · C 121
- k-04: A 98 · B 87* · C 109 · D 80
- k-05: A 116 · B 95* · C 109
- k-06: A 120 · B 78* · C 83

concerns:
- **Reading time.** The gate now reports ~20.5 min, down from 21.6, because content in locked gates is hidden when the page loads, so it isn't counted. Main text with both gates open is about 5,900 words. I set Read to 27 MIN, the reviewer's estimate (checks and lane included); the ~120 words I added don't change it. The cut order (cut-list `## If it runs long`, cuts 1–6 save ~2.5 min) goes to the user.
- **A-03's fact isn't in facts.md.** The new wording ("a node downloads it … when it doesn't already have a copy") rests on accuracy.md's quote from the Kubernetes images docs (IfNotPresent), plus Ch 2 c-11's note about download time on a fresh machine.
- **A-02's D3 sentence is an optional addition.** It rests on the notes to c-03 (minReadySeconds, default 0) and c-07, and it doesn't name `minReadySeconds`. The cut list had parked this ("engineer tuning"), so remove it if the orchestrator sees it as beyond the plan.
- **Lane renamed for P-08 (1).** P-10 asked to keep "Thursday · catalog v63", but pool `laneLayout` uppercases the lane name in JS, so a data-only fix had to drop the version. The lane is now "Thursday · catalog". At 1280 the header now fits "W-01 · THURSDAY · CATALOG … STEP 2 / 5".
- **P-08 (4) needs a pool change, so I left it.** At 360 the pooled chip layout drops the name "catalog" to fit the version and READY.
- **f-05 at 600px and up.** The bottom legend is hidden and each dashed connector carries a "SAME" label. To make room, the panel gap went from 24px to 32px. Below 600px the legend stays as it was.
- **h2s differ from the plan's segment titles** (execution only; the HTML comments record the plan's titles). §03 is "Thursday, 10:15: a routine release" and §07 is "Thursday, 14:02: going back".

relaxed:
- none

dispositions:
- A-01: fixed. Replaced §07's "only as far as the record reaches" with a paragraph saying the kept ReplicaSets are the Deployment's history: by default the last ten, and the undo command (D4) can step back only through those. Declaring an older version in the files, as Riley did, reaches further back, because the loop makes a new ReplicaSet, as long as the image is in the registry (§08). TERM 04 and the "In short" bullet now say "…the ReplicaSet it kept, if it still has one". This agrees with §08's "about a month".
- A-02: fixed. §06 now says "A container that crashes as soon as it starts never stays up long enough to be ready…", and "with or without a check" is gone. k-04 B's feedback says "A Pod that crashes on start never becomes ready". The "In short" bullet says "whose Pods crash on start". D3 gained one sentence: a version that runs a few seconds before crashing can briefly count as ready.
- A-03: fixed. §08 now says "a node downloads it from there when it doesn't already have a copy… could have started only on a node that still had a copy; anywhere else it would have waited… could have stalled". Fig. 06's caption says "works reliably only if".
- A-04: fixed. TERM 02 is now "…keeping enough Pods ready throughout: old ones go only as new ones become ready". The "In short" bullet adds "(with three copies and the default settings, an old Pod goes only once a new one is ready)". The f-07 Deployment row now reads "keeping enough Pods ready throughout". The analogy now starts "Here, the Deployment loop works the same way".
- A-05: fixed. §04 now says "…and the loop never adds more than one extra Pod", so "never more than four in all" is gone.
- A-06: fixed. §01 says "waited for a release night", Jordan asks about "release nights", and the standfirst says "save their changes for a release night". The Tuesday line is unchanged.
- A-07: fixed. k-07 now reads "…only proves that v64 started and could reach its database."
- P-01: fixed.
  - The standfirst and meta description now say "one routine and one that went wrong".
  - §01's hand-off is now "This chapter follows one Thursday of those releases, and it starts with a question Jordan put to Ari a few days before."
  - k-04's second case is now "it starts, connects to its database and serves pages normally, but every price shows as $0.00".
  - Option A's feedback now points to Fig. 02, with `catalog` in code; page.js now renders backticks in feedback as code.
  - §07 is retitled "Thursday, 14:02: going back".
  - Options and key are unchanged. A scan of everything before k-04 finds no "$0", "six minutes" or "Thursday night".
- P-02: fixed. Locked gates use `display: none` and collapse to their plate at every width; they open with the cp-in fade. D3, the aside and the canary paragraph moved inside the k-04 gate, so nothing after k-04 is readable before the commit. The lane's locked steps are unchanged.
- P-03: fixed. R2 now has `active ['rs', 'sched']` and `agents ['05']`, with the lens SEES "v63 ReplicaSet: 1 Pod short" / DOES "writes a Pod record; scheduler picks 05", so "waits" is gone. R2's ariaLabel was rewritten without "waits". R3 now has `active ['deploy', 'rs']` and `agents ['06']`, with the lens kept. Every step is still a complete snapshot.
- P-04: fixed. f-04 row 3 no longer mentions the kept ReplicaSet, and row 7 is now "Every `catalog` Pod runs v63 again." The noscript text matches. k-06 B is now "It replaces v64 with v63 a few Pods at a time, the same way it rolled v64 out." (78 characters; A is 120). B's feedback is unchanged.
- P-05: fixed. No prose was trimmed. The hero's Read and the rail's `data-minutes` are now 27. The cut order goes to the user.
- P-06: fixed. The W-01 caption is now "…With three copies and the default settings, the Deployment loop ran one extra Pod at most and kept three ready throughout."
- P-07: fixed. The liveness example is now "waiting for something that will never happen".
- P-08: fixed for (1)–(3), with (4) left because it needs a pool change.
  - (1) `.nocaps` spans keep "v64" and "v63" lowercase in the f-03 bar and heads and in f-06's bar, and the lane name no longer carries a version. A visible-text scan finds no uppercased version string.
  - (2) f-05 shows WANT, via `text-transform` on `.rk__want`.
  - (3) From 600px each connector carries a "SAME" label above the line.
  - (4) Left unchanged: it needs a pool change (see concerns).
- P-09: fixed. The k-07 answer now says "…started and could reach its database", and the follow-up is "If v63 had been bad too, could we have gone back further? Are old images kept, and do our tags ever move?"
- P-10: fixed. §03's h2 is now "Thursday, 10:15: a routine release".
