# Misconceptions

Catalog IDs from CURRICULUM.md §6 where they exist; new ones are `local-NN` (to propose at the checkpoint).

### m-09
objective: o-2
misconception: Rolling updates guarantee a safe release: because new copies are checked before old ones go, a release that finishes rolling out must be fine ("the rollout passed health checks, so it wasn't the deploy").
why_tempting: The rollout really does protect against the failures people remember from Thursday nights: a version that won't start never takes over (c-04), and there's no gap with zero copies (c-03). "Passed health checks" sounds like "passed tests". Dashboards show the rollout as green and complete.
counter: c-03, c-04, c-08, c-07, c-12
source: Argo Rollouts docs call the rolling update's protection "a basic set of safety guarantees (readiness probes)" and say "Readiness probes are unsuitable for deeper, stress, or one-time checks" (https://argo-rollouts.readthedocs.io/en/stable/); the belief itself is CURRICULUM §6 m-09 and the chapter entry's conversation line

Notes for the designer: the fair part is real. The rolling update guarantees *availability* (copies stay up) for versions that fail to start or fail their checks; it guarantees nothing about *correctness*. A check passes on a status code alone (c-08), and with no readiness probe a Pod is ready once it runs (c-07). So the `catalog` $0 version passes and rolls out to every Pod. Worse for the "safe" belief: during a rollout old and new versions both serve traffic (c-03), so some customers see the bad version before it's complete. The question the chapter wants managers to ask follows directly: "what do our checks actually test?"

### local-01
objective: o-2
misconception: A failed rollout rolls itself back: if the new version is broken, Kubernetes notices and returns to the old one.
why_tempting: The docs and tools use words like "the controller stops the bad rollout automatically" (c-04's quote) and "failed"; self-healing (Ch 4) primes readers to expect the system to fix things; and a stalled rollout *looks* like a rollback from outside, since the old Pods are still serving.
counter: c-05, c-04, c-12
source: model (the Kubernetes docs address it head on: "Kubernetes takes no action on a stalled Deployment other than to report a status condition", c-05; Argo Rollouts lists "unable to automatically abort and rollback the update" as a Deployment limitation, c-12)

Notes for the designer: "stops" means stops advancing. The new ReplicaSet's broken Pods stay (crash-looping or not ready), the old ones keep serving, and the Deployment is marked as failed to progress after 10 minutes by default; someone (or a pipeline) must roll back. Proposed catalog entry, owner Ch 6.

### local-02
objective: o-2
misconception: Health checks test whether the app works correctly, so a version that passes them is a good version.
why_tempting: "Health" sounds like a verdict on the whole service, and managers have seen test suites that check behaviour. Engineers' own phrase "it's healthy" blurs the two.
counter: c-08, c-06, c-07
source: model (the probes page: "The probe's success is determined solely by the response status code", c-08)

Notes for the designer: a probe tests exactly what the team wrote it to test, usually "does the process answer on this path", and the readiness probe is about *traffic* ("ready to accept traffic"), the liveness probe about *restart* ("still alive, or restart it"). Neither checks prices. Close to m-15 (Ch 12, "if the pod is running, the service is healthy"); this is the probe-level version, so the chapter can confront it without pre-empting Ch 12's monitoring. Proposed catalog entry, owner Ch 6 (Ch 12 revisits).

### local-03
objective: o-3
misconception: Rolling back undoes the bad release, as if it never happened.
why_tempting: "Undo" in every other tool restores the previous state completely, and in Ch 4 the record really is the whole story for Pods.
counter: c-01, c-10, c-09, c-11
source: model (the Deployment page: "only the Deployment's Pod template part is rolled back", c-01 note)

Notes for the designer: rollback changes which version the Pods run, and nothing else: data the bad version wrote (orders priced at $0), messages it sent, and schema changes stay (Ch 10 owns data; Ch 2 established that Fennel's data lives outside the app). It also takes time (it's a rolling update itself, c-10), needs the old image to still exist and the version label to mean what it meant (c-11, x-05), and a command-line undo leaves the team's file naming the bad version (c-10 note). Proposed catalog entry, owner Ch 6 (Ch 10 revisits).
