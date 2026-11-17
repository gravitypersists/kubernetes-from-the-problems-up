# Accuracy review: round 1

## Summary
The chapter is accurate on the mechanisms that matter. I redid the arithmetic for every worked number (Fig. 02's 9/2->3/10, k-02's 6, the 180% reading and 3 -> 9, the 90% and 60% readings in A4, node fit and the scheduler message in A3, the bill's one-fifth, the connection sums). I checked the HPA and cluster autoscaler defaults, the GKE backoff, the AWS guide quotes and the vendor dates against the sources, and "3 -> 6 -> 9 in a couple of quick steps" fits the default scale-up policy (4 Pods or 100% per 15 s, so 3 -> 7 -> 9). One blocking problem: the scale-down answer says no other node has more than 1 GB free, while node 07 is empty with 13 GB free. Three should-fixes: the "seven minutes" baseline, "close enough" at A1, and D3's claim about Autopilot. Four nits.

## Findings

### new
severity: blocking
criterion: accuracy; o-4; ac-11
location: s-06 k-06 option B feedback; s-06 paragraph after Fig. 06 ("Node 06 stayed, for the same reason..."); Fig. 06 note on node 06 (data.js FIGURES.after, "its Pod fits nowhere else") and caption
evidence: k-06's feedback and the §06 paragraph both say "no other node has more than 1 GB free" / "node 06's one Pod reserves 2 GB". In the same scenario node 07 is empty with 13 GB free (k-06 prompt: "Node 07 is empty"; Fig. 06 data: node 07 draws "13 GB free"). Taken literally, node 06's 2 GB Pod does fit elsewhere, on node 07, so a careful reader sees the answer key contradict the figure. Option A's feedback ("3 GB free in three pieces of 1 GB") makes the same omission. The outcome is right: the cluster autoscaler does not use a node it is already removing as a place to move Pods (Cluster Autoscaler FAQ: it simulates removal, and a candidate's eligibility changes once Pods are moved to a node that is itself being removed). The page never says so.
expected_fix: Say that node 07 is going back, so it doesn't count as somewhere for the Pod to go. For example, in B's feedback and the §06 paragraph: "no node that is staying has more than 1 GB free; node 07 is itself being given back, so it can't take the Pod". Reword Fig. 06's node 06 note and the figure's aria-label the same way ("fits on no node that stays"). Apply the same qualifier in option A's feedback.
verdict: contradicted

### new
severity: should
criterion: accuracy; o-2 (the chapter's main timing claim); consistency of Fennel's numbers
location: s-04 A6 text ("took about seven minutes"); Ari's line "It took seven minutes"; Fig. 04 (header "17:30-17:40", axis, segments, caption "Most of the seven..."); k-08 answer ("about a minute or two ... and about seven")
evidence: Read from Fig. 04's own clock, the HPA decides at about 17:34 (column 9) and all nine copies are ready at about 17:40 (column 21 to 23), which is six minutes. From the push at 17:30 it is ten. "Seven" only appears if you start at about 17:33 ("the first late assignment", A6; "within a minute of the reading crossing its target", s-04), and that moment is not drawn on Fig. 04 or in the A2 step. The same mismatch appears in k-08: copies that fit on node 06 are ready about two minutes after the decision (17:34 to 17:36), yet the answer says "a minute or two" for those and "about seven" for the node case, measured from different starting points (about six minutes from the decision, if both started at 17:34). A reader who checks the figure gets 6 or 10, not 7.
expected_fix: Choose one baseline and mark it. Either (a) draw a marker "about 17:33: the reading crosses the target and the first customers wait" on Fig. 04 (wide and narrow), put the 17:33 time in A2 or A6, and state in A6 and the caption that the seven minutes run from there; then make k-08's two figures use the same start ("about three minutes ... and about seven"); or (b) change every "seven" (A6, Ari, caption, k-08, recap, plan story fact) to "about six" and measure from the HPA's decision.
verdict: misleading-simplification

### new
severity: should
criterion: accuracy; ac-05 (defaults carry their hedge); the page's own tolerance rule
location: widgets/w-rush-scrolly/data.js, lane A step A1: `lens.doing` ("nothing: close enough, and 3 is the minimum"), the step text ("a little under the target, so the HPA has nothing to do") and the step's ariaLabel ("because that is close enough and 3 is the minimum")
evidence: s-02 teaches that by default the HPA leaves the number alone "while the reading is within a tenth of the target". A1's reading is 50% against a target of 60%, a ratio of 0.83, outside the 0.9 to 1.1 tolerance (the tolerance band at a 60% target is 54% to 66%). The HPA's rule gives ceil(3 x 50/60) = ceil(2.5) = 3, so the number stays at 3 because of rounding and the minimum, not because the reading is "close enough". The page therefore applies its own tolerance rule wrongly in the first step of the lane.
expected_fix: Drop "close enough". Lens: "nothing: 3 copies is already the minimum". Text: "...a little under the target, and the loop would never go below its minimum of three copies, so it has nothing to do." Make the ariaLabel match.
verdict: contradicted

### new
severity: should
criterion: accuracy; ac-05 (don't present one provider's behaviour as universal; vendor claims need a source)
location: s-03 D3 ("My engineers say Karpenter, or node auto-provisioning...")
evidence: D3 says tools such as Karpenter and "the 'node auto-provisioning' or fully managed modes that several providers build on it or model on it (names you may hear include Autopilot and Auto Mode)". facts.md c-04 supports this for EKS Auto Mode ("Relying on Karpenter") and AKS node auto-provisioning ("manages ... Karpenter"). For GKE Autopilot it records only that it "provisions node pools automatically", with no link to Karpenter, and I know of no source saying Autopilot is built on or modelled on Karpenter. Autopilot also hides the nodes from the customer, so "the same job done by a different tool... what they react to is the same: Pods with no room" is not something the facts or the GKE source establish for it.
expected_fix: Keep Karpenter, node auto-provisioning (AKS) and Auto Mode (EKS) as the examples of the Karpenter-style family. Either drop "Autopilot" from the parenthesis or move it to a separate clause: "and some providers go further and manage the nodes for you (GKE Autopilot is one)". Delete "or model on it".
verdict: unsupported

### new
severity: nit
criterion: accuracy; ac-05
location: s-04, paragraph after Fig. 04: "Pods that need a new node within roughly three to eight minutes"
evidence: The range is derived in examples.md x-01 (a sum with a model-sourced step, low confidence), not sourced. It is hedged on the page ("as a rule of thumb", "typically", "roughly", "depending mostly on the provider") and the footer says the §04 ranges are typical figures, not measurements, so it is not presented as a statistic. It sits slightly awkwardly beside Fig. 05, which cites AWS nodes ready in under 25 seconds (fast provisioners plus a one-to-two-minute Pod start would come in under three minutes). No change is required; the hedging is adequate.
expected_fix: Optional: "from about two or three minutes with the fastest provisioners to eight or more", which matches D3 and Fig. 05.
verdict: ok-but-uncited

### new
severity: nit
criterion: accuracy; consistency of Fennel's numbers
location: s-09 k-08 answer ("one that arrives in two minutes, like the push"); s-05 k-05 ("within a minute or two")
evidence: In the lane, the push takes the reading from 50% at 17:30 to 180% in about four minutes (A2: "within four minutes"; chart data: 17.5 to 17.57 h). k-08 says the push "arrives in two minutes".
expected_fix: Say "within a few minutes" in k-08, or "about four minutes" to match A2. k-05's imagined TV advert may keep "a minute or two", since it is a different event.
verdict: misleading-simplification

### new
severity: nit
criterion: accuracy; consistency (Fig. 04)
location: s-04 Fig. 04, wide layout vs narrow layout
evidence: The wide timeline starts node 07's rental at column 10 (17:34:30) and ends it at column 18 (17:38:30), exactly 4 minutes. The narrow list says "~17:34:40 to ~17:38:30" (3 min 50 s).
expected_fix: Use the same start in both, for example "~17:34:30".
verdict: misleading-simplification

### new
severity: nit
criterion: accuracy; vendor figure with source and date
location: s-05 Fig. 05, last row: "nodes in its newer mode are typically ready in under 25 seconds (its own figure, June 2026)"
evidence: I could not re-read the exact sentence myself. The fetch tool truncated the post's "Boot time" paragraph. I did confirm the same post (23 June 2026) reports mean Node Ready latency down 39 percent (13 seconds), which implies about 33 s before and about 20 s after and fits "under 25 seconds". facts.md quotes the sentence as "You should see nodes ready in under 25 seconds on most instance types", measured on specific hardware. The page's "typically" is a mild strengthening of "you should see ... on most instance types", and the label as AWS's own figure with its date is there. The page's "readiness before a Pod joins" caveat is in the lane, so this is acceptable.
expected_fix: Optional: "AWS says nodes in its newer mode should be ready in under 25 seconds on most machine types (its own figure, June 2026)".
verdict: ok-but-uncited

## Checked and found accurate (no action)
- HPA: ceil(current x reading / target); the worked cases; minimum and maximum behaviour; default 15 s period and 10% tolerance (the "within a tenth of the target" wording is correct as a ratio band); not-ready Pods assumed to use 0% when scaling up (A4's 6 x 90% / 9 = 60% arithmetic holds); scale-down uses the highest recommendation of the last 5 minutes; several metrics take the largest; default scale-up policy 4 Pods or 100% per 15 s with no window (fetched from kubernetes.io), so "a couple of quick steps" for 3 -> 9 is right. The HPA changes only the Deployment's number.
- Cluster autoscaler: triggered by Pods that failed to schedule, not by use; a node pool (identical machines) with a minimum and a maximum; stops at the maximum; scale-down needs requests under 50% of allocatable, Pods that can be placed elsewhere, and 10 minutes unneeded, with the 10-minute delay after a scale-up; the node-removal blockers in D5; the 15-minute provision wait; the 10-second scan. All checked against the FAQ.
- Provider claims with date and source: GKE's five-minute backoff growing to 30 minutes, GKE per-pool minimum and maximum (fetched); AKS min/max per pool and up to 30 minutes in backoff; AWS EKS guide quotes (nodes take "multiple minutes ... an order of magnitude"; negative-priority placeholder Pods); AWS spot two-minute warning; 23-minute anecdote (cause matches the post); PostgreSQL default of 100. The page labels the spot warning "as of November 2026".
- Fennel numbers: node room 13 GB and 3.9 cores; 38 GB reserved at 17:30; every node's free memory and cores; the A3 fit (three on node 06, and the other three fail on 01 and 04 for memory, on 02 for both, on 06 for processor, which matches "2 Insufficient cpu, 3 Insufficient memory" with each failing resource counted per node); node 07's 6 GB and 3.0 cores; 5.4 cores of work at 9 copies; 5 x 168 h vs 4 x 168 h + 2 h = 19.8%, "about a fifth"; one third of Friday's work = 2 of 6 copies; 3 copies at 0.4 core = 40%; 100 connections vs 3 x 30 = 90 and 9 x 30 = 270. CH08_LOOPS rows 1 to 7 are identical to Ch 7's with the intended changes, and the two new rows are accurate. The week-chart data matches the lane (work 2.5 at 17:30, 9 within four minutes, node 07 about 17:38 to 19:30).
- The hedging and the fiction disclaimers are in place: the database case is called an illustration, Fennel's times are fiction built on defaults, the GKE and AWS figures are labelled with provider and date. The seven-minute total and the 3 to 8 range are the main exceptions, covered above. No later-chapter term is used as a concept: disruption budgets, Chapter 10 databases and Chapter 12 measurements are named only as pointers, and none of the guarded words appear in the body.
- The probe step was not run in a browser; all lane, Fig. 06, chart and lens data was checked statically from the source files (the data is deterministic and the gate screenshots exist). The four locked blocks were read from the fragments.
