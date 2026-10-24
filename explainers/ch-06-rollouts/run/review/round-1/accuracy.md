# Accuracy review: round 1

## Summary
The page is accurate on almost every point it makes. The defaults and rounding, the four-Pod ceiling, the lane's waits, which v62 Pod goes first, the free GB, the stalled rollout that doesn't roll back, readiness vs. liveness, the HTTP status-code rule, the kept ReplicaSet, undo vs. file revert, tags vs. digests and canary/blue-green all hold, and so do Fennel's numbers against CURRICULUM §3. One statement teaches something false and touches o-3. §07 says "going back works only as far as the record reaches" (ten kept ReplicaSets). That is wrong for the file revert Riley used, and it contradicts §08's "about a month" for a team that ships 2–3 times a day. Three `should` findings tighten absolutes about crashes, image downloads and the rolling-update definition.

## Findings

### new
severity: blocking
criterion: o-3 (rollback in terms of desired state, and what it assumes)
location: s-07, paragraph after TERM 04 ("Going back works only as far as the record reaches, though. By default, a Deployment keeps its last ten old ReplicaSets, emptied, and each one is a version it can go back to; once one is deleted, that version is gone from the record."). Related wording: TERM 04 definition "…from the ReplicaSet it kept"; s-08 "Riley's team can go back about a month, and no further."
evidence: The page defines rollback as "declaring an earlier version again" and shows Riley doing it by changing the image line in the files (s-07, D4). Declaring an image tag works whether or not a ReplicaSet for it is still kept. If none matches the template, the Deployment simply creates a new ReplicaSet, as it does for any template change (c-01; Deployment docs, "Rollover": "Each time a new Deployment is observed by the Deployment controller, a ReplicaSet is created to bring up the desired Pods"). The ten-ReplicaSet limit (c-09: "once an old ReplicaSet is deleted, you lose the ability to rollback to that revision") applies to rolling back by revision, which is the `kubectl rollout undo` path in D4. As written, the reader concludes that a Deployment can only ever return to its last ten versions. The page then contradicts itself. Riley's team ships "two or three times a day" (s-01), so ten kept ReplicaSets cover about 3–5 days, yet s-08 says the team "can go back about a month, and no further", the registry's 30-day limit. Only one of the two limits can be the real one for Riley's method, and it is the image retention.
expected_fix: Rewrite the paragraph so that the kept ReplicaSet is a convenience and the record of revisions, not a precondition for declaring an old version. For example: "The kept ReplicaSets are also the Deployment's history: by default it keeps the last ten, and the undo command (below) can step back only through those. Declaring an older version in the file works further back than that, because the loop simply makes a new ReplicaSet for it, as long as the image is still in the registry (§08)." Keep TERM 04 and "In short" consistent with that: "…from the ReplicaSet it kept, if it still has one" or "…like any other change (here, from the ReplicaSet it kept)". Then s-08's "about a month" is correct as it stands.
verdict: contradicted

### new
severity: should
criterion: o-2 (which bad releases health checks stop)
location: s-06 prose "A container that crashes never becomes ready, with or without a check, so the Deployment loop never has a ready v64 Pod to count…"; k-05 correct-option feedback "A crashing Pod never becomes ready, so no v63 Pod is ever removed."; s-05 is fine.
evidence: For a container that crashes the instant it starts, as in k-05's scenario, this holds in practice. The page states it as universal, though, and "with or without a check" invites the conclusion that crashes need no readiness probe. Without a readiness probe, a container counts as ready as soon as it is running (c-07). A version that runs for a few seconds before crashing (say, it fails on its first database call) can therefore be ready briefly and counted as available, and the rollout can advance on it. The Deployment docs define `minReadySeconds` for exactly this case: "the minimum number of seconds for which a newly created Pod should be ready without any of its containers crashing, for it to be considered available. This defaults to 0 (the Pod will be considered available as soon as it is ready)" (kubernetes/website, concepts/workloads/controllers/deployment.md, "Min Ready Seconds"). facts.md c-04/c-07 notes state the absolute without this caveat.
expected_fix: Limit the claim to the scenario and drop "with or without a check": "A container that crashes as soon as it starts never stays up long enough to be ready, so the Deployment loop never has a ready v64 Pod to count…". Optionally add to D3 one line such as "A version that runs for a few seconds before crashing can briefly count as ready, which is one reason teams write a readiness check and can ask for a Pod to stay ready for a while before it counts." In k-05's feedback, "A Pod that crashes on start never becomes ready" is enough. The key (B) is unaffected.
verdict: misleading-simplification

### new
severity: should
criterion: o-3 (what rollback assumes: the old image still exists)
location: s-08 first paragraph: "the image lives in Fennel's registry, and each new Pod downloads it from there when it starts. If the image had been deleted, the rolled-back Pods couldn't have started; they would have waited, retrying, and the rollback would have stalled like any bad rollout."
evidence: By default, a container with a version tag (not `:latest`) and no pull policy written gets `IfNotPresent`: "the image is pulled only if it is not already present locally". Kubernetes images docs: "if you omit the `imagePullPolicy` field, and you specify a tag for the container image that isn't `:latest`, the `imagePullPolicy` is automatically set to `IfNotPresent`" (kubernetes/website, concepts/containers/images.md, "Image pull policy"). On Thursday, nodes 05 and 06 had been running `catalog:v63` until 14:03, so in the story they very likely still had it locally. A rollback onto them would have started even if the registry copy were gone. "Each new Pod downloads it… when it starts" is therefore false by default, and the counterfactual is overstated. The lesson still holds: a node that never had the image, or has cleaned it out, must download it, so teams keep old images.
expected_fix: Change the sentence to "…and a node downloads it from there when it doesn't already have a copy. If the image had been deleted, a rolled-back Pod could start only on a node that still had a copy; anywhere else it would wait, retrying, and the rollback could stall like any bad rollout." Fig. 06's caption ("Going back works only if the old image is still in the registry") can stay as the safe rule, or say "reliably only if".
verdict: misleading-simplification

### new
severity: should
criterion: o-1 (how a rolling update replaces a version)
location: TERM 02 definition "Replacing a service's Pods with a new version a few at a time, removing old Pods only as new ones become ready."; "In short" bullet 1 "removing old Pods only as new ones become ready"; f-07 `CH06_LOOPS` Deployment row `does` ("removing old Pods only as new ones become ready"); s-06 analogy ("it removes an old Pod only once a new one has passed its check").
evidence: These are general definitions, but the rule is true only when `maxUnavailable` rounds to 0, which with the defaults means fewer than four copies (c-02). The page's own D2 says that with four copies the loop "may then remove an old Pod before any new one is ready". The docs' wording is "does not kill old Pods until a sufficient number of new Pods have come up" (c-03), meaning enough new Pods, not each one. A reader who meets a service with more copies is left holding a definition that the page itself shows to be false.
expected_fix: Qualify the general statements and keep the catalog-specific ones as they are. TERM 02: "Replacing a service's Pods with a new version a few at a time, keeping enough Pods ready throughout: old ones go only as new ones become ready." "In short" and the f-07 row: "removing old Pods only as fast as new ones become ready (with three copies and the defaults, one for one)". The analogy is in catalog's three-copy context and can stay if it says "Here, the Deployment loop works the same way".
verdict: misleading-simplification

### new
severity: nit
criterion: o-1
location: s-04 paragraph 1: "…at least three Pods are ready to serve customers, and there are never more than four in all."
evidence: The limit counts Pods that aren't shutting down. Deployment docs: "Kubernetes doesn't count terminating Pods… As a result, you might notice that there are more Pods than expected during a rollout, and that the total resources consumed by the Deployment is more than `replicas + maxSurge` until the `terminationGracePeriodSeconds` of the terminating Pods expires." The same docs show the controller scaling the old ReplicaSet to 2 and the new one to 2 in one step, so a stopping v62 Pod can briefly sit beside four others. The lane itself never shows more than four, so this matters only for the "in all" wording and the spare-room arithmetic (a stopping Pod still holds its room).
expected_fix: "…and never more than four running at once" or "never more than one extra". If a caveat is wanted, put one sentence in D2: "A Pod that's shutting down isn't counted, so for a few seconds there can briefly be one more, still holding its room."
verdict: misleading-simplification

### new
severity: nit
criterion: fiction consistency (CURRICULUM §3)
location: s-01: "Every team's changes waited for Thursday night, when Sam put the new versions out by hand… The update you may remember from Chapter 3, storefront from v12 to v13 on a Tuesday, went the same way."
evidence: CURRICULUM §3 puts Fennel's by-hand releases on Tuesdays: Ch 2's "Tuesday's release replaces the container" and Ch 3's Tuesday v12 → v13. "Every team's changes waited for Thursday night" contradicts them, and the next sentence calls the Tuesday update "the same way" without reconciling the day.
expected_fix: Soften to "a release was an evening event, usually on a Thursday night" or "Every team's changes waited for a release night", keeping "went the same way" for the Tuesday.
verdict: misleading-simplification

### new
severity: nit
criterion: o-2
location: s-10, k-07 answer: "“Passed health checks” only proves that v64 started."
evidence: catalog's readiness check, as the page defines it (Fig. 02, s-05), also proves that the app could reach its database. "Only proves that v64 started" understates what a check proves, though the paragraph's point (it proves nothing about prices) is right.
expected_fix: "…only proves that v64 started and could reach its database."
verdict: misleading-simplification
