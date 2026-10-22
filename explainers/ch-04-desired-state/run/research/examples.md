# Examples

### x-01
objective: o-2
example: The Kubernetes docs' own analogy for a control loop is a room thermostat. Setting the temperature is telling it the desired state; the room's actual temperature is the current state; the thermostat switches the heating on or off to close the gap, and keeps doing so. When the room reaches the temperature, some thermostats switch on a light, like a controller marking a job finished. A second device, a frost-protection heater, can act on the same room independently.
why: It shows observe → compare → act, repeated forever, with no plan and no memory of how the gap arose. Everyone has used one. The frost heater shows several loops acting on one shared reality without a boss. Where it breaks: a thermostat has one dial and acts directly on the room; Kubernetes loops each own one kind of thing and mostly act by writing to a shared record that other loops read (c-08). And a thermostat has no notion of "replace the heater" when the heater dies; Kubernetes' loops do replace pods.
source: https://kubernetes.io/docs/concepts/architecture/controller/

### x-02
objective: o-1
example: Two ways to run Fennel's Saturday on-call. Task list (imperative): "If machine 03 dies, start orders on 04, restart dispatch on 02, update the addresses." Goal (declarative): "storefront: 3 copies; orders: 1; dispatch: 3. Keep it that way." A delegated owner given the goal watches one number per service (wanted vs. running) and fixes deviations without being told how.
why: Managers already know the difference between micromanaging and delegating outcomes; the task list fails the moment reality differs from what its author pictured (machine 04 is full), while the goal still says what to do. Where it breaks: the "owner" here has no judgment. It doesn't ask why copies keep dying, doesn't negotiate when the goal is impossible (no room: it just waits, c-15), doesn't escalate, and will restart a broken app forever (c-14). It also has no memory of past instructions: it only ever acts on the latest goal (c-04). A human delegate who behaved like this would be a problem; for a machine it is the point.
source: model (Fennel scenario from CURRICULUM.md §3; the imperative/declarative distinction from c-03)

### x-03
objective: o-1
example: The API conventions' own example: someone changes a replica count from 2 to 5, then quickly back to 3. The system doesn't "touch base" at 5 first; it goes straight from wherever it is to 3.
why: Makes "level-based" concrete without the jargon: the loop works from the current goal and current reality, not a queue of orders. A task list would execute "go to 5" then "go to 3". For a manager: a missed or out-of-date message can't leave the system stuck, because there are no messages to miss, only the record to read again. Good as a think-then-reveal ("how many pods start?").
source: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md

### x-04
objective: o-2
example: Fennel's 03:04 failure with default settings, as a hedged timeline. 03:04:00 machine 03 dies and stops reporting. ~03:04:50 the node loop marks it unknown (50 s default; checked every 5 s). ~03:09:50 the 5-minute wait ends; the pods on machine 03 are marked for removal. Seconds later the replica-set loops count 0 of 1 `orders` and 2 of 3 `dispatch` (Ch 3's layout: machine 03 held orders + dispatch) and write new pod records; the scheduler picks machines with room; each chosen machine's node agent downloads the image if it doesn't have it and starts the container. Roughly 03:10–03:11, everything is back. Nobody was paged to do it.
why: Gives the payoff to Ch 1's question ("how long until we're back, and who has to be awake?") an honest number: minutes, not instantly, and nobody. Each step names one loop, which is the loop lens in action. Caveats to keep: the defaults can be tuned by engineers or the provider; if the cloud reports the machine gone, cleanup can start sooner (c-11 note); image download time varies; `orders` is down for those minutes because it has only one copy, a recurring hook for "how many copies does a service need?" (callers finding the new `orders` is Ch 7).
source: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/ (300 s) with https://kubernetes.io/docs/reference/node/node-status/ (50 s); the clock times are model arithmetic on those defaults

### x-05
objective: o-3
example: A crash loop in numbers. A container that crashes on start is restarted after about 10 s, then 20, 40, 80, 160, then every 5 minutes. In the first hour that's roughly 15–16 restarts, then about 12 an hour indefinitely. The Kubernetes docs' sample listing shows a pod at `CrashLoopBackOff` with 200 restarts over 2 days 9 hours.
why: Makes "the loop keeps working while the app stays broken" visible as a number a manager might see on a dashboard (the chapter's conversation). Shows the back-off is the loop being polite to the system, not a fix. The counts are model arithmetic from the documented schedule (ignoring the seconds each attempt runs); the 200-in-2d9h row is the docs' own illustration, not a measurement, and is lower than the arithmetic because real attempts take time to run and fail.
source: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/

### x-06
objective: o-2
example: "Kubernetes" is Greek for helmsman. A helmsman doesn't plot every wave; they hold a heading and keep correcting the wheel whenever the ship drifts off it.
why: It is a genuine analogy for the reconcile loop (hold a target, sense the deviation, correct, repeat) and it is the project's own name, so it costs one sentence and gives a memorable close to the loop idea. Where it breaks: one helmsman is one controller; the cluster has many independent ones and no captain giving them orders (m-03). A helmsman also uses judgment about weather; controllers don't. Model note: the same Greek root (kybernētēs, steersman) gave "cybernetics", the science of feedback control; that link is accurate but unsourced here, so use it only if sourced or keep it out.
source: https://kubernetes.io/docs/concepts/overview/ (the name); the analogy is model

### x-07
objective: o-2
example: The loop lens applied to Ch 3's job list. Restarting (same machine) → the node agent on that machine, watching its pods' containers, restarting crashed ones with back-off. Replacing (machine gone) → the node loop, watching machines' heartbeats, marking a silent machine and removing its pods; then the replica-set loop, watching "wanted vs. running", writing new pods; then the scheduler, watching for pods without a machine, choosing one; then the node agent on that machine, starting them. Connecting → another loop keeps the list of where each service's pods are (Chapter 7). Updating → Chapter 6. Scaling → Chapter 8.
why: Answers the suggested retrieval ("which jobs did Sam do at 3:04?") by mapping each of Sam's jobs to the loops that took it over, and introduces the lens's three blanks (which loop, watching what, doing what) on material the reader already knows. Each named loop is sourced: node controller and EndpointSlice controller (the "connecting" one, not to be named here) in the controller-manager list on the architecture page; replica set c-12; scheduler c-13; node agent c-14, c-21.
source: https://kubernetes.io/docs/concepts/architecture/
