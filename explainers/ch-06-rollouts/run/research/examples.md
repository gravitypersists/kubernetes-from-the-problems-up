# Examples

Fennel numbers (`catalog` copies, requests, versions) are fiction for the designer to set; the arithmetic below holds for any requests.

### x-01
objective: o-1
example: A 3-copy service with the default settings. Surge = 25% of 3 = 0.75, rounded up to 1; unavailable = 0.75, rounded down to 0. So the Deployment starts 1 new Pod (4 in all), waits until it is ready, removes 1 old Pod, starts the next new one, and so on: three rounds of start-one, wait, stop-one. The documented event sequence for 3 copies is exactly this: new ReplicaSet "to 1", old "to 2", new "to 2", old "to 1", new "to 3", old "to 0".
why: It is Sam's by-hand Tuesday from Ch 3 (three rounds of start one v13, stop one v12, using one copy's worth of spare room), now done by a loop. It also shows why the rollout needs spare room for exactly one extra copy. Where it breaks: the loop decides "ready" by the readiness check, not by a person looking; and steps can overlap slightly (terminating Pods aren't counted, c-03 note).
source: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ (event list under "Updating a Deployment"; c-02, c-03)

### x-02
objective: o-1
example: A 4-copy service with the defaults: surge 1, unavailable 1, so between 3 and 5 Pods (documented). Because one old Pod may go before any new one is ready, the Deployment can stop 1 old Pod and start 2 new ones almost at once, then continue as new ones become ready: it moves about two at a time.
why: Shows that "a few at a time" scales with size, and that a larger service can make progress even with no spare room, by giving up one copy (it runs at 3 of 4 for a while). Use only if the lane needs a second size; the exact first step is from the controller's arithmetic, not a documented sequence.
source: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ ("In case of a Deployment with 4 replicas, the number of Pods would be between 3 and 5"; the "start 2, stop 1" first step is model arithmetic from the maxUnavailable/maxSurge descriptions, medium confidence)

### x-03
objective: o-1
example: The surge Pod can't be placed. With 3 copies (unavailable 0), the new Pod needs room for its requests on some node; if none has room, it waits as Pending (Ch 5 claim 20) and no old Pod is removed (c-03). The rollout sits with 3 old Pods serving and 1 new Pod waiting; the scheduler retries, and the Pod is placed when room appears (Ch 5 claim 21). If nothing changes for 10 minutes, the Deployment reports failed to progress (c-05). Nothing breaks for customers; the release just doesn't happen.
why: Ties Ch 5's headroom to releases: "keep room to lose a node" is also room to ship. It's a second kind of stuck rollout that isn't the new version's fault. Fennel's five-node cluster (01, 02, 04, 05, 06) can show it fitting on node 06's spare room, or waiting.
source: model (composed from c-02, c-03, c-05 and Ch 5 claims 20–21; the Deployment page's list of stall causes names quota and limit ranges but not node room explicitly, so keep it hedged)

### x-04
objective: o-2
example: Two bad `catalog` releases, same rollout settings. Version A crashes on start (a missing setting, like `notifications` in Ch 4): its first new Pod crash-loops, never becomes ready, and the rollout stalls with all old Pods serving (c-04); customers notice nothing. Version B starts fine and answers 200 on its health path but shows every price as $0: each new Pod passes its readiness check (c-08), so the rollout replaces every old Pod and completes. While it runs, old and new Pods both serve, so some customers see $0 before others do.
why: This is the chapter's predict-then-reveal, and it isolates the variable: the checks catch "doesn't start" and "not ready", never "wrong". Where it breaks: a team could write a check that tests prices; the point is that most checks don't, and nothing in Kubernetes does it for them.
source: model (scenario; mechanisms from c-04, c-07, c-08)

### x-05
objective: o-3
example: Rolling back assumes two things about the registry. If someone deleted the old image, the rolled-back Pods can't start: they wait in `ImagePullBackOff`, retrying with a growing delay up to 5 minutes, and the rollback stalls like any bad rollout. If the old version's tag was moved to a different image, the "old" version that comes back isn't the one that used to run. Fennel's `catalog:v13` named by digest (`catalog@sha256:…`) avoids the second; keeping old images avoids the first.
why: Makes "can we go back?" a concrete question a manager can ask: "do we keep old images, and do our tags ever move?" It answers the Ch 2 pick-up (tags vs. digests) at the moment it matters.
source: https://kubernetes.io/docs/concepts/containers/images/ ("The status `ImagePullBackOff` means that a container could not start because Kubernetes could not pull a container image ... Kubernetes raises the delay between each attempt until it reaches a compiled-in limit, which is 300 seconds (5 minutes)"; the stall follows from c-04; tag moves from c-11)
