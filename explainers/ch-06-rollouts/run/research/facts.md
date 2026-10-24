# Facts

Light depth: 12 claims from four primary sources (the Kubernetes Deployment, probe and container-image pages, read from the kubernetes/website source on 2026-10-24, and the Argo Rollouts docs). Earlier chapters' claims are reused by reference and written as "Ch N claim NN" so they don't collide with this file's IDs:

- Ch 2 claim 04 (images are immutable; a change means a new image), Ch 2 claim 07 (images live in a registry and are pulled from it), Ch 2 claim 08 (a tag such as `latest` can later point to a newer image; a digest always gets the same image). `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/facts.md`
- Ch 4 claim 02 (submitting a new desired state updates the record at once; reality catches up), Ch 4 claim 03 (imperative vs. declarative), Ch 4 claim 04 (level-based: Kubernetes heads for the latest desired state), Ch 4 claim 12 (the ReplicaSet loop keeps N Pods), Ch 4 claim 14 (crash-loop restarts with back-off, capped at 5 minutes). `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/facts.md`
- Ch 5 claim 02 (a Pod fits a node only if its requests fit), Ch 5 claim 20 (a Pod that fits nowhere stays Pending), Ch 5 claim 21 (the scheduler keeps retrying, especially when room appears). `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/research/facts.md`

## Questions
- q-1: answered — c-01, c-02, c-03. Spare room and the pending surge Pod: c-03 plus Ch 5 claims 20–21, worked in examples x-01 to x-03. Trigger rule (template changes start a rollout; scaling doesn't) is in c-01 and its note.
- q-2: answered — c-01 (a new image in the Pod template is what starts a rollout). "CI builds and pushes an image" reuses Ch 2 claims 04 and 07; "the record is updated, by a person, a pipeline or a GitOps tool" reuses Ch 4 claim 02. Not researched at light depth: what teams that ship several times a day do differently (small batches, automated tests); see the parking lot (DORA) if the chapter wants a sourced line.
- q-3: answered — c-06, c-07, c-08, c-04, c-05. Startup probe and the "liveness depends on a database" mistake are in c-06's note and the parking lot.
- q-4: answered — c-04, c-05, c-08, c-12. Misconceptions m-09, local-01 to local-03. The change-causes-outages statistic is in the parking lot with its provenance (Google SRE book, 2016; no method given), not promoted, because it is optional and the claim cap is full.
- q-5: answered — c-09, c-10, c-01. Undo by command vs. reverting the file: c-10's note (Ch 4 claim 03 and the object-management page).
- q-6: answered — c-11, c-09. Old image deleted: example x-05. What rollback doesn't undo: c-01's note (only the Pod template is rolled back) and x-05; Ch 10 owns data and migrations.
- q-7: answered — c-12.

## Claims

### c-01
objective: o-1
claim: When a Deployment's Pod template changes, for example to a new image, the Deployment creates a new ReplicaSet and gradually scales it up while scaling the old ReplicaSet down.
source: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
quote: "Declare the new state of the Pods by updating the PodTemplateSpec of the Deployment. A new ReplicaSet is created, and the Deployment gradually scales it up while scaling down the old ReplicaSet, ensuring Pods are replaced at a controlled rate."
confidence: high
note: Trigger rule, same page: "A Deployment's rollout is triggered if and only if the Deployment's Pod template (that is, `.spec.template`) is changed, for example if the labels or container images of the template are updated. Other updates, such as scaling the Deployment, do not trigger a rollout." Consequence for rollback (same page, "Rolling Back" note): "when you roll back to an earlier revision, only the Deployment's Pod template part is rolled back" — the replica count is not, and nothing outside the Deployment (a database, messages already sent) is touched. The page also says "Do not manage ReplicaSets owned by a Deployment": engineers write the Deployment, the ReplicaSets are its machinery. Safe simplification: "the Deployment is a loop that manages versions by managing ReplicaSets". At the end the old ReplicaSet is kept at 0 Pods (see c-09).

### c-02
objective: o-1
claim: By default a rolling update may run up to 25% more Pods than wanted, rounded up, and let up to 25% of wanted Pods be unavailable, rounded down.
source: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
quote: "maxUnavailable ... The absolute number is calculated from percentage by rounding down. ... The default value is 25%." / "maxSurge ... The absolute number is calculated from the percentage by rounding up. The default value is 25%."
confidence: high
note: Settings `.spec.strategy.rollingUpdate.maxSurge` and `.maxUnavailable`; the page's `kubectl describe` output shows "RollingUpdateStrategy: 25% max unavailable, 25% max surge". They can't both be 0. For 3 copies: surge 0.75 → 1, unavailable 0.75 → 0. For 4 copies: surge 1, unavailable 1. Teams can change both; hedge as "by default". RollingUpdate is the default strategy; the other built-in one, Recreate, stops all old Pods before starting new ones.

### c-03
objective: o-1
claim: A rolling update doesn't remove old Pods until enough new ones have come up: with 3 copies and the defaults, at least 3 Pods stay available and at most 4 exist.
source: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
quote: "It does not kill old Pods until a sufficient number of new Pods have come up, and does not create new Pods until a sufficient number of old Pods have been killed. It makes sure that at least 3 Pods are available and that at max 4 Pods in total are available. In case of a Deployment with 4 replicas, the number of Pods would be between 3 and 5."
confidence: high
note: "Available" means ready (passing its readiness check, c-06/c-07) for at least `minReadySeconds`, which "defaults to 0 (the Pod will be considered available as soon as it is ready)". So with 3 copies the rollout needs room for one extra copy while it runs (Ch 5 headroom). Pedantic caveat for a disclosure only: terminating Pods aren't counted, so briefly "there are more Pods than expected during a rollout" (same page).

### c-04
objective: o-2
claim: If new Pods never become ready, because they crash, fail their readiness check or their image can't be downloaded, the Deployment stops scaling up the new ReplicaSet, and the old Pods keep running.
source: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
quote: "The Deployment controller stops the bad rollout automatically, and stops scaling up the new ReplicaSet. This depends on the rollingUpdate parameters (`maxUnavailable` specifically) that you have specified."
confidence: high
note: The page's example shows three old Pods "Running" next to one new Pod in `ImagePullBackOff`. Factors listed for a stuck rollout: "Insufficient quota; Readiness probe failures; Image pull errors; Insufficient permissions; Limit ranges; Application runtime misconfiguration". "Stops the bad rollout" means it stops advancing, not that it rolls back (c-05). With maxUnavailable > 0 (e.g. 4 copies), up to that many old Pods may already be gone, so the service runs short until fixed. A crashing container is in crash-loop back-off (Ch 4 claim 14) and isn't ready even without any probe; a readiness probe is what stops a version that starts but isn't ready (c-07).

### c-05
objective: o-2
claim: If a rollout makes no progress for its deadline (600 seconds by default), Kubernetes only marks it as failed to progress; it doesn't roll back by itself.
source: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
quote: "Kubernetes takes no action on a stalled Deployment other than to report a status condition with `reason: ProgressDeadlineExceeded`. Higher level orchestrators can take advantage of it and act accordingly, for example, rollback the Deployment to its previous version."
confidence: high
note: Setting `.spec.progressDeadlineSeconds`: "This defaults to 600." and "The Deployment controller will keep retrying the Deployment." The report is a status condition `type: Progressing`, `status: "False"`. Argo Rollouts' docs list the same limitation of plain Deployments: "Can halt the progression, but unable to automatically abort and rollback the update" (https://argo-rollouts.readthedocs.io/en/stable/). A pipeline or add-on tool may watch for the condition and roll back; that is a team's choice, not a default.

### c-06
objective: o-2
claim: When a liveness probe fails, the node agent restarts the container; when a readiness probe fails, the container isn't restarted but its Pod stops receiving traffic.
source: https://kubernetes.io/docs/concepts/workloads/pods/probes/
quote: "Failure: The container failed the diagnostic. For liveness and startup probes, the kubelet kills the container, and the container is subjected to its restart policy. For readiness probes, the kubelet marks the container as not ready, and the Pod stops receiving traffic from matching Services."
confidence: high
note: Purposes, same page: "Readiness probes determine when a container is ready to accept traffic." "Liveness probes determine when to restart a container. For example, liveness probes could catch a deadlock, where an application is running, but unable to make progress." "Startup probes verify whether the application within a container is started"; while one is configured, liveness and readiness checks wait for it. Readiness runs for the Pod's whole life, not just at start. A check fails only after `failureThreshold` failures in a row (default 3), every `periodSeconds` (default 10). The node agent (kubelet) runs the probes. "Matching Services" is Ch 7's term: say "only ready Pods are sent traffic, by a loop we'll name in Chapter 7". Common mistake, same page: liveness checks should "truly indicate unrecoverable application failure"; "Incorrect implementation of liveness probes can lead to cascading failures"; the page suggests the liveness probe pass "when the app itself is healthy" while readiness "additionally checks that each required back-end service is available".

### c-07
objective: o-2
claim: A container with no probe of a given kind is always treated as passing it, so without a readiness probe a Pod counts as ready as soon as its containers are running.
source: https://kubernetes.io/docs/concepts/workloads/pods/probes/
quote: "If a container does not provide a particular probe, the kubelet always considers the result as `Success`."
confidence: high
note: Second half is the direct consequence (Pod "ready" = all its containers ready; pod-lifecycle page, condition `ContainersReady`). So with no probes, a rolling update moves on as soon as each new container starts; a crash still stops it, because a crashed container isn't running (c-04).

### c-08
objective: o-2
claim: An HTTP health check passes whenever the app answers with a success-range status code (200 to 399); Kubernetes doesn't look at what the response says.
source: https://kubernetes.io/docs/concepts/workloads/pods/probes/
quote: "The diagnostic is considered successful if the response has a status code greater than or equal to 200 and less than 400." / "The probe's success is determined solely by the response status code, which is found in the response headers."
confidence: high
note: Other probe types are just as shallow by design: a TCP check passes "if the port is open"; a command check passes "if the command exits with a status code of 0". A probe tests exactly what the team wrote it to test. This is the mechanism behind o-2's "healthy but wrong": a `catalog` version that serves $0 prices still answers 200 on its health path, so it is ready, and the rollout completes. Argo Rollouts' docs: "Readiness probes are unsuitable for deeper, stress, or one-time checks" (https://argo-rollouts.readthedocs.io/en/stable/).

### c-09
objective: o-3
claim: Rollback is possible because a Deployment keeps its old ReplicaSets, 10 by default, each storing one earlier revision; once one is deleted, that revision can no longer be rolled back to.
source: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
quote: "The configuration of each Deployment revision is stored in its ReplicaSets; therefore, once an old ReplicaSet is deleted, you lose the ability to rollback to that revision of Deployment. By default, 10 old ReplicaSets will be kept"
confidence: high
note: Setting `.spec.revisionHistoryLimit`; "Explicitly setting this field to 0, will result in cleaning up all the history of your Deployment thus that Deployment will not be able to roll back." Old ReplicaSets are kept at 0 Pods: the page's `kubectl get rs` output after an update shows the old one with 0 desired, 0 current. A revision is created only when the Pod template changes (c-01 note). Keeping the ReplicaSet keeps the *record* of the old version (its image name), not the image itself: the image must still be in the registry (x-05).

### c-10
objective: o-3
claim: Rolling back writes an earlier revision's Pod template back into the Deployment, which then shifts Pods to the old ReplicaSet the same gradual way it rolls out any change.
source: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
quote: "Rollback to an earlier Deployment revision if the current state of the Deployment is not stable. ... Each rollback updates the revision of the Deployment." / "The Deployment is now rolled back to a previous stable revision. As you can see, a `DeploymentRollback` event for rolling back to revision 2 is generated from Deployment controller."
confidence: medium
note: The page doesn't say "a rollback is a rolling update" in one sentence. It follows from three statements on the page: a rollback changes the Pod template (c-01 note: "only the Deployment's Pod template part is rolled back"), any template change triggers a rollout by the Deployment's strategy (c-01, c-02), and revisions live in kept ReplicaSets (c-09). The page's own rollback example rolls back a *stalled* rollout, so its events show only the bad ReplicaSet being scaled to 0 (the old one still had all 3 Pods). After a *completed* bad rollout (the `catalog` case), the old ReplicaSet is scaled back up a few at a time under the same maxSurge/maxUnavailable rules, so it also needs spare room and isn't instant. Command vs. file: `kubectl rollout undo` changes the cluster's record directly (imperative, Ch 4 claim 03) and leaves the team's manifest file still naming the bad version; the next apply of that file would roll the bad version out again. The Kubernetes docs: "A Kubernetes object should be managed using only one technique. Mixing and matching techniques for the same object results in undefined behavior." (https://kubernetes.io/docs/concepts/overview/working-with-objects/object-management/). Reverting the file in version control and applying it is the declarative rollback; GitOps tools (Ch 13) make that the only path.

### c-11
objective: o-3
claim: A tag such as `v13` can be moved to point at a different image, so Pods started from it at different times can run different code; naming the image by its digest pins one exact image.
source: https://kubernetes.io/docs/concepts/containers/images/
quote: "Tags can be moved to point to different images, but digests are fixed." / "When using image tags, if the image registry were to change the code that the tag on that image represents, you might end up with a mix of Pods running the old and new code. ... Specifying an image by digest pins the code that you run"
confidence: high
note: Same page: "You should avoid using the `:latest` tag when deploying containers in production as it is harder to track which version of the image is running and more difficult to roll back properly. Instead, specify a meaningful tag such as `v1.42.0` and/or a digest." And: "If you don't specify a tag, Kubernetes assumes you mean the tag `latest`." Digest example form: `image@sha256:45b2…`. Ch 2 claim 08 states the same at the Docker level. Manager-level practice: unique, never-reused version tags (many registries can lock tags as immutable; not verified here, keep generic) or digests, plus keeping old images for as long as you might roll back.

### c-12
objective: o-2
claim: A plain Deployment's rolling update can't steer a chosen share of traffic to the new version or abort and roll back on its own; canary and blue-green releases come from extra tooling such as Argo Rollouts.
source: https://argo-rollouts.readthedocs.io/en/stable/
quote: "The native Kubernetes Deployment Object supports the `RollingUpdate` strategy which provides a basic set of safety guarantees (readiness probes) during an update. However the rolling update strategy faces many limitations: ... Inability to control traffic flow to the new version ... Can halt the progression, but unable to automatically abort and rollback the update"
confidence: high
note: One-sentence definitions (Argo Rollouts concepts, https://argo-rollouts.readthedocs.io/en/stable/concepts/): canary: "A Canary deployment exposes a subset of users to the new version of the application while serving the rest of the traffic to the old version. Once the new version is verified to be correct, the new version can gradually replace the old version." Blue-green: "has both the new and old version of the application deployed at the same time. During this time, only the old version of the application will receive production traffic. This allows the developers to run tests against the new version before switching the live traffic to the new version." Plain Kubernetes can approximate a canary by hand: the Deployment page says you "can create multiple Deployments, one for each release, following the canary pattern", where the share of traffic roughly follows the share of Pods. Argo Rollouts is one example (Flagger is another; not verified here); name a tool only as "for example". Its source is a vendor-neutral CNCF project's docs, but it does describe its own product's motivation.
