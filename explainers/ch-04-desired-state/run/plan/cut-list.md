# Cut list: Say what you want, not what to do (Ch 4)

Revision 0 (handoff 02).

## Out (researched or considered, deliberately left out)

| What | Why it's out | Cost to add back |
|---|---|---|
| **A hands-on "kill a node" widget** (B2 sandbox on `renderFleet`: tap a node, watch the loops respond) | The outcome is identical every time, so the tap is Active busywork (the user's bar; Ch 3 d-03). The learning is in two commitments, k-03 (what exists after apply) and k-04 (how long, who's awake), which the lanes carry as gated checks. | A small widget on `renderCluster`: about 1 min of reader time and a builder. Better spent in Ch 5, whose topic is system dynamics (R4). |
| **A replicas control (2 → 5 → 3, level-based behaviour, x-03)** | A new idea (level vs. edge) the reader doesn't need to hold the model, and a control with one lesson. Kept as optional disclosure D2. | A short lane step or check: about 0.5 min. Ch 6's rollback ("declare the old version again") is the natural main-text home (R11 cut note). |
| **The thermostat analogy** (x-01, the docs' own) | A third analogy in one chapter; the delegated owner (curriculum's) and the helmsman (the project's name) already cover goal-holding and continuous correction. The frost-heater detail (independent loops on one room) is nice but is what lane B shows directly. | An aside: about 0.4 min. Suggested for Ch 8 (autoscalers as thermostats). |
| **"Cybernetics" shares the Greek root** | Unsourced (x-06 note, parking lot). | One clause, after sourcing. |
| **A Deployment snippet** (`kind: Deployment`, as in the docs' own example, c-01 note) | An unexplained kind next to a differently named loop at the moment the manifest is new. Chosen instead: `kind: ReplicaSet`, shortened, with the Deployment named in the caption (plan, Research concerns §2). | Swap f-02's first line and add one sentence; Ch 6 does this properly. |
| **A third style, "imperative object configuration"** (c-03) | The chapter needs only the contrast. | One sentence; not recommended. |
| **Declarative's drawback: "harder to debug … when they are unexpected"** (c-03 note) | Real, but it belongs with debugging (Ch 12), where events explain what loops did. | A sentence in s-02 or Ch 12. |
| **Spec vs. status as field names** (c-01 note) | The record panel's WANT / RUNNING columns carry the idea without the field names. | A disclosure: about 0.25 min if opened. |
| **The scheduler's factors, spreading, why node 01 got two `storefront` Pods** | Ch 5's ledger and topic. | Ch 5 (R4). |
| **Eviction, taints, tolerations, `tolerationSeconds`** (c-11) | Ch 5's vocabulary (eviction) and engineer territory. Said as "removed from the record after a wait"; D3 says the waits can be changed. | n/a in this chapter. |
| **The node loop's 5-second check interval** (c-10 note) | A third number in lane B; "after 50 seconds of silence" is enough to explain the delay. | A clause in B2. |
| **"Earlier releases used 40 seconds"** (c-10 note, model recollection) | Unverified, and the reader doesn't need version history. | n/a. |
| **Eviction rate limits when many nodes fail; zone-wide pauses** (parking lot) | Ch 12 / Ch 14 incident material. | Ch 12 or 14 (R11). |
| **Pods on an unreachable node may keep running unseen** (parking lot) | A partitioned-node subtlety that matters for data (Ch 10). | Ch 10 (R8). |
| **Liveness and readiness probes** (parking lot; the overview's "self-healing" bullet) | Ch 6's terms. k-08's feedback stays with crash restarts only. | Ch 6. |
| **The crash back-off's alpha tuning (1 s start, 60 s cap)** (c-14 note) | Defaults are what the reader will see. | Ch 12. |
| **Helper ("sidecar") containers in detail** (c-17 note) | One clause and f-03's small second Pod are enough. | Ch 12 / 13. |
| **Managed node auto-repair** (parking lot, model, not fetched) | Unsourced; D4 says only that Kubernetes doesn't replace the machine. | Ch 14 (R11), after sourcing. |
| **Provider names in the main text (GKE Standard / Autopilot, EKS standard / Auto Mode, AKS Standard / Automatic)** (c-22, c-23) | The curriculum keeps providers generic; "standard mode" and "fully managed modes" carry the split. | A disclosure listing the three providers' mode names: about 0.25 min if opened. |
| **Control-plane fees and pricing** (parking lot) | Not researched; Ch 14's. | Ch 14. |
| **etcd vs. Spanner; backing up the record** (c-05 note, parking lot) | etcd is out of scope beyond "the cluster's record"; D6 names it once. | Ch 14. |
| **Admission checks before the record** (parking lot) | Ch 11's "gate in front of the loops". | Ch 11 (R10). |
| **GitOps** (parking lot) | Ch 13. s-02 plants it ("kept in version control"). | Ch 13 (R11). |
| **"Control through choreography"** (Borg paper, parking lot) | The current docs' own words (c-09) make the same point and need no second source. | A one-line quote in s-05. |
| **"Reconciling" as a heavy term; the word "level-triggered"** | "Reconcile loop" is the ledger term; "level-triggered" stays in D2. | n/a. |
| **The 30-second grace period's mechanics (SIGTERM)** (c-20) | The requirement "finish in-flight work when asked to stop" carries it; the signal name is engineer territory. | n/a. |
| **Twelve-factor's other factors** | Only disposability (and Ch 2's stateless) bear on this chapter. | n/a. |
| **Ch 3's Morgan / Riley in the cast** | Not used in this chapter; the cast strip lists only the people it uses (Sam, Jordan, Ari). Morgan returns in the bridge line only. | n/a. |

Claims: all 25 (c-01 to c-25) are used by at least one segment. Examples: x-02 (s-02 analogy and f-01), x-03 (D2 only), x-04 (lane B and the payoff), x-05 (k-08 feedback and s-08), x-06 (s-04 helmsman aside), x-07 (f-04) are used; **x-01 (thermostat) is cut**. Misconceptions: m-03, m-04, m-05, m-06 confronted; m-27 revisited; local-01 confronted and proposed for the catalog (R1).

## If it runs long

These parts are in the plan now. If the built page runs long, cut them in this order (first = cheapest loss). Items 1–4 recover about 1.5 minutes and items 1–8 about 3, without losing an objective, either lane, or any owned misconception's confrontation. Disclosures D1–D7 are not on this list: they're closed by default and cost nothing unless opened.

1. **The helmsman aside (s-04).** The reader loses the name's meaning, "K8s", and a second image of continuous correction; TERM 03 still carries the idea. About 0.3 min.
2. **f-03 (the Pod figure) → TERM 02 alone.** The reader loses the drawing of the wrapper and the helper container; the card and one sentence still say both, and the canvas shows the Pod ring. About 0.3 min.
3. **k-02 → narrated.** f-01's caption and one sentence say the goal holds whichever machine dies. The reader loses the committed comparison for o-1 (k-03 still checks o-1). About 0.4 min.
4. **Lane A step A5's last sentences → into A4's.** Merge "nobody handed anybody a plan; they keep watching, release or not" into the TERM 03 paragraph. The reader loses that beat at the moment it happens. About 0.25 min (and A2's text shortens to one sentence).
5. **k-07 → one sentence in s-07** ("The provider runs the loops; what they work towards is yours."). o-4 then has only k-03 (the record) as a check. About 0.5 min.
6. **f-05's fully managed band → prose.** f-05 shows the control plane band and "always yours" only; one sentence covers the modes. The reader loses seeing who runs the nodes drawn. About 0.25 min.
7. **k-05 → prose.** The "no single conductor" paragraph opens with the question ("What worked out that orders should go to node 04? No single part did…"). The reader loses the committed m-03 confrontation; f-05's drawing and the orchestrator paragraph keep the correct model. About 0.5 min.
8. **k-08 → folded into the scene.** The back-off numbers move into one sentence before Ari's line; k-09 stays. The reader loses predicting the crash loop (m-05 is still confronted in s-06 and k-09). About 0.5 min.

Not on the list, because cutting them removes an objective, the chapter's core model, its felt pain, its payoff or an owned misconception: the cast strip and k-01; f-01 and TERM 01; the analogy aside and its breaks line (the curriculum requires it); f-02 (the `replicas: 3` intention); both lanes with k-03 and k-04; TERM 03 and the loop lens; the Ch 1 payoff and the single-copy point; f-04; k-06 and the disposability list; the self-healing limits; f-05 and TERM 04; k-09 and the recap.

If the build still runs past about 23 minutes after these, split rather than compress: end Chapter 4 after s-05 (desired state, the loops, 03:04) with a short conversation, and move s-06 to s-08 (disposable Pods, what loops can't fix, who runs what, the crash-loop conversation) into a "Chapter 4b" with its own opener. Tell the user first; the plan's ## Shape explains why one chapter is preferred.
