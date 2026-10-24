# Pedagogy & UX review: round 1

## Summary
A strong chapter. The lane works as a lane: the scene is set up first, the k-02 gate holds, scrolling back restores every step, and the narrow and short-viewport fallbacks behave. f-03 makes the core contrast land, and the misconceptions, the shift-handover analogy, the loop lens row and the Ch 2–5 callbacks all arrive without bookkeeping. The most important issue is that the chapter's core prediction is answered before the reader commits. The standfirst says a release "showed every price as $0.00 for six minutes", and k-04's prompt says the $0 version "answers its readiness check with a success code", so option A contradicts the prompt (blocking, ac-09). Next: the locked gates leave whole blank screens (about 2,000px at 360), the canvas shows "DOES · waits" while k-02 asks what the loop does next, and f-04's rows cue k-06's key. Reading time is about 27 minutes.

## Scores
- acceptance criteria: 3 — 13 of 15 met; ac-09 unmet (k-04's outcome given away before the commit); ac-14 partly met (k-02 and k-06 keys cued by text the reader sees while answering)
- cognitive load fit: 4 — the lane changes about three things per step, with pre-training in §02 and the set-up; R2 narrates three actors while the canvas highlights a fourth
- engagement where intended: 3 — seven checks, all at key ideas, but k-04 (the core predict-then-reveal) and k-02 can be answered from the page rather than from the model
- misconception handling: 4 — m-09 is stated fairly, shown failing in f-03, corrected (availability, not correctness) and used to explain the crash case; local-01, 02 and 03 each confronted; weakened only by the k-04 giveaway
- split attention and redundancy: 4 — labels sit on their referents everywhere; small issues: the W-01 caption pre-states §04, f-05's connector label is away from the connectors, and the standfirst and §01 repeat the same hand-off line
- mobile UX: 3 — no overflow; 44px+ targets; text in drawings ≥ 13px at 360; fallbacks correct; but the two locked gates reserve 1,990px and 1,998px of blank page at 360 (1,283px and 1,258px at 1280)
- clarity of interaction: 4 — checks, try again, the "what the other answers say" disclosure and the reveal all work; the lane's lock line is clear; the R2 and R3 loop pills don't match the step text
- visual consistency and polish: 4 — the Control Plane look matches Ch 5; light and dark are both intact; tokens only (no hard-coded colours in site/assets or the widget); small case inconsistencies (V63/v63, Want/WANT)

## Reading time
The gate measures 21.6 min (text only). My estimate: about 5,850 words a reader meets (4,900 main text, 370 lane step text, about 350 drawn by JS in f-04 and f-07, about 210 of feedback for the options picked), so about 24 min at 240 wpm, plus about 3 min thinking at seven checks and about 1.5 min studying the canvas, f-02, f-03 and f-07. That makes **about 27 minutes** (range 25–28) against d-01's 20 and the plan's 22. The four disclosures add about 2 min if opened. The hero says "22 MIN". See the reading-time finding (cut order, not prose trimming).

## Acceptance criteria (evidence in probe screenshots `run/screenshots/probe/pux-r1-*`)
- ac-01 met: cast strip and D1 precede k-01; Thursday nights and "Nobody deploy anything" come before the pipeline; §01 ends on Ari's "That depends on how it's bad."
- ac-02 met: §02 recalls Ch 4's ReplicaSet in words, then f-01, then the dfn and TERM 01 (payoff); "Changing only the number of copies doesn't start any of this… changing what each copy is does"; "one more implementation of the same reconcile pattern" with wants · sees · does.
- ac-03 met: the pipeline appears in §01 and is explained in §02 (builds, pushes to the registry, writes the tag) before lane R1.
- ac-04 met: §03's two set-up paragraphs give nodes 05 and 06, why 01, 02 and 04 aren't drawn ("nearly full and nothing on them changes this morning"), the 10:15 change, the colour key ("v62 in magenta, v63 in blue") and what READY means.
- ac-05 met in intent: at every step ≥ 3 `catalog` Pods READY and ≤ 4 exist (R2: c1, c2, c3 READY + n1 NOT READY; R3: c1, c3, n1 READY + c2 STOPPED; R4: c3, n1, n2 + c1 STOPPED); R5 shows `ReplicaSet v62 WANT 0 · KEPT` (`pux-r1-1280x900-light-lane-R5.png`). Note: the ac's wording ("no v62 Pod is removed in the step its replacement becomes ready or earlier") conflicts with the plan's own R3, where n1 turns READY and c2 is STOPPED in the same step. The step text orders them ("Only now, with a new Pod ready…"), so this is a plan wording issue, not a build fault.
- ac-06 met: v62 (`c5`) and v63 (`c2`) differ in colour and print their version; NOT READY (hollow lamp, warn) vs READY (solid lamp, good); a Deployment row over two ReplicaSet rows. Scrolling R5 → R2 → R1 restores the canvas aria-label and the drawing exactly (`…-lane-R1-back.png`). R3–R5 stay `is-locked` until k-02 is committed and unlock on a wrong pick (A).
- ac-07 met: "With default settings… rounded up… rounded down"; for three copies "one extra Pod and… none short"; k-03 comes before the debrief; the four-copy case appears only in D2, hedged ("roughly two at a time").
- ac-08 met: f-02 has the same five rows with only "When it fails" outlined (NO TRAFFIC vs RESTARTED); the node agent, "every ten seconds by default", "the Pod keeps running", "treats the missing check as passing", "a loop we'll name in Chapter 7".
- ac-09 **not met**: f-03 and its paragraphs are gated, but the hero standfirst says the reader will follow a release "that showed every price as $0.00 for six minutes", and k-04's prompt says the $0 version "answers its readiness check with a success code". See the first finding. The rest of ac-09 is met: the panels differ only in v64's behaviour; "A container that crashes never becomes ready"; "A check passes on the response's status code alone"; "It doesn't go back to v63 by itself."
- ac-10 met: the aside comes after f-03 in reading order, maps the manager to the loop and signing in to passing the check, and has a WHERE THIS ANALOGY BREAKS line ("never sees a single sale… only the result of the check"); canary and blue-green get one sentence each, plus "A plain Deployment does neither by itself".
- ac-11 met, with one cue: f-04's row 7 reads "The last v64 Pod is removed" and doesn't give the pace away outright; k-06 gates f-05 and the reveal; "with the default settings… the same gradual way"; the level-based paragraph is there. Row 3 cues k-06's key (finding below).
- ac-12 met: "holds the image's name… not the image itself"; tag vs digest; "Twenty-three orders… stayed that way"; two questions for Jordan's list.
- ac-13 met: f-07 has the Deployment loop row tagged NEW IN CH 6 (job: updating), the node agent's and Chapter 7's readiness clauses tagged, and no Ch 5 tags (`…-f07.png`).
- ac-14 **partly met**: every option has explaining feedback; no key is the longest option (k-01 B 77 characters vs 89/107; k-04 B 86 vs 96/105/74; k-06 B 74 vs 107/76); k-07 states its own question and hides the answer until revealed. But k-02's key is shown on the canvas beside it and k-06's key is cued by f-04 (findings below).
- ac-15 met: Deployment after f-01; rolling update after the lane; readiness probe after the lane showed READY and NOT READY; rollback named after f-04. No later-ledger terms appear (grep: no Service, load balancer, autoscaler, ConfigMap, Secret or StatefulSet; GitOps only in D4). Minor: the W-01 caption uses "rolling update" one line before it is named (nit below).

## Findings

### new
severity: blocking
criterion: ac-09; ac-14; engagement where intended (k-04 is the chapter's core predict-then-reveal for m-09 and local-02)
location: `.cp-hero__standfirst` (and `<meta name="description">`); s-06 k-04 prompt `#k-04-q` and option A; s-01 hand-off paragraph; optional: s-07 h2 `#thursday-1402`
evidence: (1) The standfirst says the chapter follows "one Thursday of `catalog` releases, one routine and one that showed every price as $0.00 for six minutes". A reader arrives at k-04's second case ("shows every price as $0.00") already told that such a release reached customers for six minutes. This is the plan's rejected alternative ("Opening on the $0 incident as a hook… would give away k-04's answer"). (2) k-04's prompt says the second version "starts, answers its readiness check with a success code, and shows every price as $0.00". Two sections earlier the reader learned that passing the readiness check is what makes a rollout count a Pod. So the outcome follows from the prompt, and the misconception option A ("a version that shows $0 fails its health check too") contradicts the prompt as written. Any careful reader rules A out without holding the misconception, so the commit doesn't test whether the reader thinks checks test correctness (local-02). That belief is what f-03 and the "why" paragraph are built to overturn. (3) The §07 heading "Thursday, 14:02: six minutes at $0" sits in the TOC rail from the first screen (desktop: "Thursday, 14:02: six min…"; mobile TOC: full text).
expected_fix: (a) Rewrite the standfirst without the $0 outcome, e.g. "…This chapter follows one Thursday of `catalog` releases, one routine and one that went wrong, to show how Kubernetes replaces one version of a service with the next, which bad releases its health checks stop and which they don't, and what going back really does." Make the same change to the meta description. Then change §01's hand-off so it doesn't repeat the standfirst's sentence, e.g. "It starts with a question Jordan put to Ari a few days before that Thursday." (b) Rewrite k-04's second case so the reader has to work out whether the check passes, from f-02's "the app is up and can reach its database": "In the second, it starts, connects to its database and serves pages normally, but every price shows as $0.00." Keep option A as is; it now carries the misconception honestly. Change A's feedback to point at the evidence: "`catalog`'s readiness check asks whether the app is up and can reach its database (Fig. 02), and v64 is both. A check tests what the team wrote it to test and passes on a success code; it never looks at a price. So the $0 version passes." Also wrap `catalog` in code in that feedback (it's plain text now). Leave B, C, D and their feedback as they are. (c) Optional, if the orchestrator agrees it is execution rather than plan shape: retitle §07 so the TOC doesn't announce the outcome, e.g. "Thursday, 14:02: going back".

### new
severity: should
criterion: mobile UX; CURRICULUM §8 step 6 (no height reservation under 600px); ac-09 (content after a locked gate)
location: `.cp-gate[data-gate="k-04"]` and `.cp-gate[data-gate="k-06"]` (assets/page.css `.cp-gate.is-locked > :not(.cp-gate__lock) { visibility: hidden; }`); `.cp-aside` and D3 after the k-04 gate
evidence: Locked heights measured by probe: k-04 gate 1,283px at 1280, 1,887px at 768, 1,876px at 390, 1,990px at 360; k-06 gate 1,258 / 1,258 / 1,902 / 1,998px. Under the lock line the reader sees whole blank viewports: `pux-r1-360x740-light-k04-gate-top.png` (the lock plate, then empty), `pux-r1-360x740-light-k04-gate-mid.png` (a completely blank screen), `pux-r1-1280x900-light-k04-gate-locked.png` (blank apart from the rail). At 360 that is about 2.7 screens of nothing, which reads as a broken page. Reserving height protects nothing: the gate opens only when the reader commits to the check above it, so the content grows below where the reader is. §8 step 6 says that under 600px a widget does not reserve height. Also, everything after the k-04 gate (D3 and the analogy aside) is visible while the gate is locked. A reader who scrolls past the blank reads the WHERE THIS ANALOGY BREAKS line ("A manager… would notice a new cashier charging nothing… The Deployment loop never sees a single sale… as long as that passes, it carries on") before committing to k-04.
expected_fix: While a gate is locked, hide its content with `display: none` instead of `visibility: hidden`. The gate then collapses to its dashed lock plate (about 90px, as in the 360 screenshot), at every width, or at least under 600px. On commit, show the content with the existing `cp-in` fade. The content opens below the check the reader just answered, so nothing they're looking at moves. Move the handover aside, and D3, inside the k-04 gate, after the "stops" paragraph. If cut 1 of the cut list (the aside) is taken, move only D3. Don't change the lane's locked R3–R5 steps: those follow the Ch 4–5 lane convention.

### new
severity: should
criterion: ac-14 (no key repeated by text near the check); clarity of interaction (canvas matches step text)
location: w-rollout-scrolly `data.js`, steps R2 and R3 (`loops.active`, `loops.agents`, `loops.lens`)
evidence: While the reader answers k-02 ("What does the Deployment loop do next?"), the canvas beside it shows the Deployment loop highlighted with the lens line `SEES · 4 Pods; the v63 Pod not ready` / `DOES · waits` (`pux-r1-1280x900-light-lane-R2.png`, `pux-r1-360x740-light-lane-R2.png`). The key is "It waits until the v63 Pod is ready…", so the answer is printed next to the question. Separately, R2's step text names three actors ("The ReplicaSet loop sees… writes a record… The scheduler puts that Pod on node 05… node 05's agent starts its container"), but the canvas greys out the ReplicaSet loop and scheduler pills and highlights only the Deployment loop and the agents. R3's text has "The ReplicaSet loop marks one v62 Pod for deletion, and node 06's agent stops it", but only the Deployment loop is active and no agent pill is lit.
expected_fix: In R2, make the drawing show the loops the text names, which also removes the giveaway: `active: ['rs', 'sched']`, `agents: ['05']`, lens = the ReplicaSet loop's, e.g. `watching: 'v63 ReplicaSet 1 Pod short'`, `doing: 'writes a new Pod record; the scheduler picks node 05'`. If the lens must belong to the Deployment loop, use `doing: '?  (Check 02)'` instead of `'waits'`. In R3, use `active: ['deploy', 'rs']`, `agents: ['06']`, keeping the lens as is (`1 v63 Pod ready` / `v62 down to 2`). Update R2's ariaLabel to match ("…The ReplicaSet loop has written a Pod record and the scheduler placed it on node 05…"). No pool change is needed.

### new
severity: should
criterion: ac-14 (no key cued by a figure above the check); engagement where intended (k-06)
location: s-07 f-04 rows 3 and 7 (`CH06_INCIDENT` in assets/page.js); k-06 option B
evidence: Right above k-06, f-04's row 3 reads "The rollout completes: three v64 Pods, all ready. The v63 ReplicaSet is kept, empty.", and §03 ended with "the emptied v62 ReplicaSet is still in the record, and §07 shows why that matters". The key B is the only option that mentions it ("…using the v63 ReplicaSet it kept"), so the reader can pick B by matching words rather than by predicting what the loop does. Row 7, "The last v64 Pod is removed" 80 seconds after 14:07, also hints at a gradual replacement against C ("stops all three v64 Pods at once").
expected_fix: Cut "The v63 ReplicaSet is kept, empty." from f-04's row 3 (f-05 shows the kept ReplicaSet after the commit, which is its job). Change row 7 to "~14:08:20 · Every `catalog` Pod runs v63 again." Shorten B to "It replaces v64 with v63 a few Pods at a time, the same way it rolled v64 out." Keep B's feedback, which names the kept ReplicaSet and points to Fig. 05. Check option lengths afterwards (B must stay shorter than A).

### new
severity: should
criterion: reading time vs. brief (d-01: 20 min; plan: about 22)
location: page; hero `.cp-meta` "Read 22 MIN" and `.d-rail[data-minutes="22"]`
evidence: Gate: 21.6 min, text only. My estimate: about 27 min (about 24 reading at 240 wpm for about 5,850 words, plus about 3 thinking at seven checks and about 1.5 studying the lane and figures). See "Reading time" above. Earlier chapters' reviewers' estimates ran 3–4 min over the gate's figure, and this is consistent with that.
expected_fix: Don't trim prose. Put the cut-list's `## If it runs long` order to the user at delivery. Cuts 1–6 recover about 2.5 min (to about 24–25). Cut 1 (the analogy) also removes the aside half of the gate finding above. If the user keeps everything, set the hero's "Read" and the rail's `data-minutes` to the measured figure (about 25–27), as Ch 5 did ("26 MIN").

### new
severity: nit
criterion: split attention and redundancy; ac-15 (terms after the thing they name)
location: s-03 `.cp-wcap` under lane R
evidence: The caption reads "With default settings and three copies, a rolling update runs at most one extra Pod and never fewer than three ready." It uses "rolling update" one line before the paragraph and TERM 02 name it, and it states §04's rule (one extra, none short) before §04 explains it and before k-03 applies it.
expected_fix: Keep the caption to what W-01 showed: "Fennel's nodes, versions and timings are fiction. With three copies and the default settings, the Deployment loop ran one extra Pod at most and kept three ready throughout."

### new
severity: nit
criterion: precise language (user's human reviews)
location: s-05, liveness paragraph (`#dfn-liveness-probe` paragraph)
evidence: "…noticing a container that is running but stuck: one that has stopped making progress, for example because it is waiting on itself, which no crash would ever reveal." "Waiting on itself" is engineer shorthand for a deadlock, and a manager can't picture it.
expected_fix: "…for example because it is waiting for something that will never happen, which no crash would ever reveal."

### new
severity: nit
criterion: visual consistency and polish
location: lane header (`STRINGS.lanes.R`), f-03 panel heads `.f3__head` and bar label; f-05 `.rk__want`, `.rk__link`; 360px chips in lane snapshots and f-03
evidence: (1) Uppercase mono labels turn version strings into "CATALOG V63", "IF V64 CRASHED ON START", "TWO WAYS V64 COULD BE BAD", while chips, record rows and prose say "v63" and "v64". (2) f-05 writes "Want 3" in title case, where the canvas, f-03 and the course's record grammar use "WANT 3". (3) f-05's "THE SAME REPLICASET, KEPT AND REUSED" label sits under the first panel, away from the dashed connectors between the panels that it explains (`pux-r1-1280x900-light-f05.png`). (4) At 360 the `catalog` chips read only "v62 READY" / "v64 READY" (`pux-r1-360x740-light-f03.png`); the plan asked for whole labels ("catalog v63"), and the `dispatch` chip keeps its name.
expected_fix: (1) Wrap version strings in uppercase labels in a `text-transform: none` span (or lowercase them in data), so a version always reads "v63". (2) Use "WANT" in f-05, as in the canvas. (3) Put the label on the connector between the panels: a small mono label centred above the dashed line from 600px, as it already is in the stacked layout. (4) Optional: if the pool can fit "catalog v62" at 360 (two columns of about 150px), use it; otherwise leave it, since versions are printed and only `catalog` has them.

### new
severity: nit
criterion: precise language; consistency with §05
location: s-10 k-07 model answer (`#k-07-a`)
evidence: "'Passed health checks' only proves that v64 started." §05 and f-02 say `catalog`'s readiness check also tests that the app can reach its database, so it proves slightly more than that. Also, the follow-up "Could we have gone back further than v63?" reads oddly, since going back to v63 was all that was needed. The underlying question is whether older versions would still have been there.
expected_fix: "'Passed health checks' only proves that v64 started and could reach its database." and "If v63 had been bad too, could we have gone back further? Are old images kept, and do our tags ever move?"

### new
severity: nit
criterion: section purposes that are plain (user's human reviews)
location: s-03 h2 `#thursday-1015`
evidence: "Thursday, 10:15: catalog v63" names a time and a version but not what the section teaches. In the TOC rail it truncates to "Thursday, 10:15: catalog…", so a reader scanning for "how a rolling update works" can't find it.
expected_fix: e.g. "Thursday, 10:15: a routine release". Keep the lane's own name "Thursday · catalog v63".
