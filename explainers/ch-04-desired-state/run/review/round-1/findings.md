# Findings: round 1

_Ingested 2026-10-22T09:02:25-04:00 from accuracy.md, pedagogy-ux.md._

### A-01 · blocking · open
criterion: o-4
location: s-07, paragraph after TERM 04 ("On a managed service, the provider runs the whole control plane, in every mode, and upgrades it to new Kubernetes versions."); k-07 option A ("Keeping the API server and the cluster’s record running, and upgrading them to new Kubernetes versions.") and its feedback ("That’s the control plane, which the provider runs in every mode, upgrades included.")
verdict: misleading-simplification
evidence: Facts c-22 supports automatic upgrades for GKE only ("which GKE performs automatically, or manually at your request"). The page generalises this to every managed service, and k-07 marks upgrading as *not* Fennel's job. AWS, "Update existing cluster to new Kubernetes version" (https://docs.aws.amazon.com/eks/latest/userguide/update-cluster.html, fetched 2026-10-22): "When a new Kubernetes version is available in Amazon EKS, you can update your Amazon EKS cluster"; "You can submit the request to upgrade your EKS control plane version using: eksctl, the AWS console, the AWS CLI"; "we recommend that you test the behavior of your applications against a new Kubernetes version before you update your production clusters"; step 1 is "checking the Kubernetes APIs used by resources deployed into the cluster", and nodes must be upgraded to match. GKE's own shared-responsibility page (c-24 note) also gives the customer node-pool upgrade duties. The course itself contradicts the check: CURRICULUM §7 Ch 14 opens with "The cluster needs a version upgrade that interrupts feature work", and m-17 is "Managed Kubernetes means no operations work". A reader who gets k-07 "right" leaves believing upgrades are not Fennel's concern.
expected_fix: Paragraph: "On a managed service, the provider runs the whole control plane, in every mode, and carries out its upgrades to new Kubernetes versions. Deciding when to upgrade, and checking that Fennel's apps still work on the new version, stays partly Fennel's job; Chapter 14 is about that work." k-07 option A: drop "upgrading", e.g. "Keeping the API server and the cluster’s record running, and replacing their machines when they fail." Feedback: "That’s the control plane, which the provider runs in every mode."

### A-02 · should · open
criterion: o-2
location: widget w-cluster-scrolly lane B, step B3 text ("the node loop removes node 03’s Pods from the record"), its lens `doing` ("removes node 03’s Pod records") and ariaLabel; assets/page.js CH04_LOOPS node-loop `doing` ("after a wait, removes its Pods from the record"); k-04 option C feedback ("Once the dead node’s Pods are removed from the record"); k-05 option A feedback ("marked node 03 and removed its Pods")
verdict: misleading-simplification
evidence: After the 5-minute wait the node controller *requests eviction*. It does not delete the records. Nodes page (fetched 2026-10-22): "the node controller waits 5 minutes between marking the node as `Unknown` and submitting the first eviction request." Taint-and-toleration page: "The decision to delete the pods cannot be communicated to the kubelet until communication with the API server is re-established. In the meantime, the pods that are scheduled for deletion may continue to run on the partitioned node." The old Pod records stay, marked as being deleted (engineers see `Terminating`). The Pod garbage collector removes them only once the node object is gone ("orphan Pods - bound to a node which no longer exists", pod-lifecycle page). The ReplicaSet loop simply stops counting them: "the total number of all pods can temporarily exceed `.spec.replicas`" (ReplicaSet page, "Terminating Pods"). The page's chain of steps (gap appears, ReplicaSet loop fills it within seconds) is right. But "removed from the record" tells the reader the old Pods are gone and over, and an engineer's screen will contradict that.
expected_fix: Change "removes … from the record" to "marks node 03’s Pods for deletion" (lens: "marks node 03’s Pods for deletion"; CH04_LOOPS: "after a wait, marks its Pods for deletion"; k-04/k-05 feedback likewise). Add one B3 sentence: "The ReplicaSet loop no longer counts Pods marked this way, so the record now shows the gap that customers have felt since 03:04." Optionally add to D3: "The old Pod records linger, marked for deletion, until node 03 is confirmed gone." The canvas can keep drawing node 03 empty, or show the two old marks struck through.

### A-03 · should · open
criterion: o-4
location: s-07, paragraph after TERM 04: "Either way, Fennel pays for the machines its Pods run on."
verdict: misleading-simplification
evidence: Facts c-23 sources this for EKS ("you pay separately for the AWS resources you use to run your applications on Kubernetes worker nodes") and AKS ("Agent nodes are billed as standard VMs") only. GKE Autopilot, one of the three "fully managed modes" the page groups together, mostly does not bill for machines. GKE Autopilot overview (https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview, fetched 2026-10-22): general-purpose Pods use a "Pod-based billing model". Only Pods that select specific hardware are billed by node ("you pay for the underlying hardware and a node management premium"). Chapter 5 builds its cost story on this line, so it should hold in every mode.
expected_fix: "Either way, Fennel pays for the computing its Pods run on: in most modes, that means the machines themselves."

### A-04 · should · open
criterion: o-1
location: s-02, paragraph before f-02: "Teams keep manifests in version control, so every change to a goal is reviewed before it goes in, and leaves a history."
verdict: misleading-simplification
evidence: Facts c-03 (object-management page) says configuration files "can be stored in a source control system such as Git" and "can integrate with processes such as reviewing changes before push and audit trails". The page turns "can" into "every change … is reviewed". Review is a team practice, not a property of manifests. Imperative changes made directly against the cluster bypass it ("Commands do not provide a source of records except for what is live", c-03). A manager could leave believing declarative configuration guarantees review.
expected_fix: "Teams usually keep manifests in version control, so a change to a goal can be reviewed before it goes in, and leaves a history."

### A-05 · should · open
criterion: o-1
location: s-02, disclosure D2 ("What if the goal changes twice in a minute?"): "Say someone changes storefront’s goal from 2 copies to 5 and then, a minute later, to 3. Kubernetes doesn’t have to pass through 5 first. … so it ends at 3."
verdict: misleading-simplification
evidence: The API conventions (c-04) say only that the system "is not required to 'touch base' at 5". Their example has no time gap. The page's own lane A3 says the ReplicaSet loop acts "within seconds". So with a minute between the two changes, the loop will almost certainly have already written three more Pod records for 5, and will then remove two. The reader will come away thinking 5 is skipped even a minute later. That's false, and it misstates what level-triggered means: the loop heads for whatever the goal is *when it looks*.
expected_fix: Close the gap and say what happens either way, e.g. "…from 2 copies to 5 and then, a moment later, to 3. If the loop hasn’t looked in between, it never acts on 5 at all: it compares the latest goal with what’s running and heads for 3. If it already started heading for 5, it just turns around. Either way it ends at 3, because there’s no queue of orders to work through." Retitle the summary to match ("twice in quick succession").

### A-06 · should · open
criterion: o-4
location: s-07, TERM 04 definition ("The cluster’s record and the loops that work on it, behind the API server.") and the paragraph above it ("The record and the loops that work on it, apart from the node agents, make up the control plane. In front of the record sits the API server…")
verdict: misleading-simplification
evidence: Neither the definition nor the defining sentence includes the API server in the control plane. "Behind the API server" even reads as if the API server sat outside it. Kubernetes lists kube-apiserver as a control-plane component (c-21: components page, "A Kubernetes cluster consists of a control plane and one or more worker nodes", listing kube-apiserver first; c-05: "The API server is the front end for the Kubernetes control plane"). Fig. 05 and k-07 A do put it inside, so the page contradicts itself, and the term card is what readers will remember.
expected_fix: TERM 04: "The API server, the cluster’s record behind it, and the loops that work on it. On a managed service, your provider runs it." Paragraph: "The API server, the record behind it, and the loops that work on it, apart from the node agents, make up the control plane."

### A-07 · nit · open
criterion: o-2
location: s-05, disclosure D3: "Engineers can also shorten or lengthen the waits, app by app."
verdict: misleading-simplification
evidence: Only the 5-minute wait can be set per app (`tolerationSeconds`, taint-and-toleration page: "You can specify `tolerationSeconds` for a Pod to define how long that Pod stays bound to a failing or unresponsive Node"). The 50-second wait is one cluster-wide control-plane setting (`--node-monitor-grace-period` on kube-controller-manager, c-10 note), which a managed provider usually doesn't let customers change.
expected_fix: "Engineers can also shorten or lengthen the five-minute wait, app by app."

### A-08 · nit · open
criterion: o-3
location: s-06, k-06 option B feedback: "Virtual machines can be moved like that; Pods can’t."
verdict: ok-but-uncited
evidence: True: VMs can be live-migrated between hosts, for example by vMotion or Compute Engine live migration. But no claim in facts.md or in Ch 1–3 sources it. The Pod half is c-19.
expected_fix: None needed for accuracy. Either keep it as common knowledge or drop the VM clause ("Pods can’t be moved like that.").

### P-01 · blocking · open
criterion: ac-15 (no giveaways; options similar in length and equally measured); user standard "checks without 'pick the measured option' giveaways"
location: s-02 f-01 caption + k-02 option C; k-03 option C; k-05 option B; k-07 option C (also k-06 A)
evidence: (a) Fig. 01's caption, directly above k-02, reads "The goal names no machines, so it holds whichever one fails." k-02's right option C reads "Fennel's goal: it names no machines, only what should be running, so it holds whichever machine dies." The reader can match the words instead of reasoning about node 04. (b) Measured option lengths in characters, right answer starred: k-02 A94 B87 *C102; k-03 A59 B74 *C96; k-05 A101 *B134 C95; k-06 *A125 B107; k-07 A104 B72 *C130. The right answer is the longest in 5 of 8 choice checks, and by a wide margin in k-03 (1.6× the shortest), k-05 and k-07. k-03's C and k-07's C are also the only options with a hedge or a second clause ("and nothing else yet"; "and making sure each service survives being replaced").
expected_fix: (1) Cut the takeaway from Fig. 01's caption until after k-02. Make the caption a condition, e.g. "Fig. 01. The same night, written two ways: both were written after machine 03 died." Move "the goal names no machines, so it holds whichever one fails" into k-02's feedback or the paragraph after TERM 01. (2) Even out the lengths so the right answer is not reliably the longest. Shorten k-03 C ("Only a line in the cluster's record: three `storefront` copies wanted."). Give k-03 A a reason, as k-03 B already has one. Trim k-05 B's first sentence. Cut k-07 C's second clause, which is already in its feedback ("Deciding what goes in the record, such as how many copies of `orders` to run."). Lengthen k-07 B to match ("Running the scheduler and the loops that replace Pods when a node dies, since those did Fennel's 3 a.m. work."). Keep the keys as they are.

### P-02 · should · open
criterion: ac-16 (precise language: don't equate two things in one breath); cognitive load (a term used before the thing it names); o-1 / o-4
location: s-02 last paragraph ("With Kubernetes, a written goal like Fig. 02 is that record."); w-cluster-scrolly A1 (canvas panel "THE CLUSTER'S RECORD · API SERVER"; A1 step text; k-03 option C)
evidence: The record (what's wanted plus what's reported, held behind the API server) is the chapter's central object, but no prose introduces it. s-02 ends by saying the manifest file *is* the record ("a written goal like Fig. 02 is that record"). Then the canvas opens at A1 on a panel labelled "THE CLUSTER'S RECORD · API SERVER" with RUNNING counts in it, and A1's text never mentions the panel. k-03 option C then asks about "a line in the cluster's record". Only A2 says what the API server and the record are ("the front door to the record … wrote it down"). So the reader meets the record three ways (as the manifest file, as an unexplained panel, then as the API server's store) before it is explained. The plan's own rule says to keep the manifest (the file) apart from the record (what's wanted and reported, in the cluster). Mixing them up weakens m-04 ("applying records an intention in the cluster") and o-4 ("the API server as the record of intent").
expected_fix: Change s-02's last line so it doesn't equate the file with the record, and so it doesn't give away k-03. For example: "With Kubernetes, it is: the cluster keeps its own record of what's wanted and what's running, and every part of Kubernetes works from that record." Give A1's step text one clause naming the panel. For example, after "Moving day.": "Kubernetes keeps one record of what Fennel wants and what's running, drawn at the top; `orders`, `payments` and `dispatch` are already in it." No arrow and no "see the label"; the panel's own header carries the name.

### P-03 · should · open
criterion: CURRICULUM §2.3 (the loop lens, named once and reused everywhere); handoff ask "does the loop lens arrive as a reusable tool"; ac-16 (no referent the reader has to guess)
location: s-04 paragraph after TERM 03 ("Those three blanks are a question…"); s-05 lead to f-04 ("Fig. 04 puts the loops you've watched into the lens's three blanks"); s-08 bridge
evidence: The words "loop lens" never appear in reader-visible text (grep of index.html and data.js: "lens" appears only in comments, a class name and §05's "the lens's three blanks"). §05 says "the lens's three blanks", but nothing called "the lens" has been introduced. "Those three blanks" in §04 points at the card's mono line "which loop · watching what · doing what", which has no blanks drawn. Every later chapter is meant to say "the loop lens" (CURRICULUM §2.3, plan R12), so the name has to land here. The bridge says "From here on, every chapter asks the same three things", which is a meta line about the course (the kind the user flagged in Ch 3) where the tool's name should be.
expected_fix: Name it once in §04, e.g. "Call those three questions the loop lens: which loop, watching what, doing what? You can ask them whenever Kubernetes does something. Each step of moving day answered them…" Then "the lens's three blanks" in §05 has its referent; better still, write "puts the loops you've watched through the loop lens". Rephrase the bridge without the course meta, e.g. "Whenever Kubernetes does something from here on, the loop lens is the first question to ask: which loop, watching what, doing what?" Optionally add "the loop lens" to TERM 03's mono line ("the loop lens: which loop · watching what · doing what").

### P-04 · should · open
criterion: mobile UX (controls and effect visible together; consistent behaviour); plan s-04/s-05 layout contiguity "sticky"; CURRICULUM §8 step 6
location: w-cluster-scrolly at 360×740 and 390×844 (screenshots probe/rev-w360x740-B5.png, rev-w390x844-A3.png vs rev-w390x844-B2.png)
evidence: Measured canvas heights (both checks committed): at 360×740, lane A 405px and lane B 432px, so both fall back to inline snapshots (canvas display:none; 5 and 6 snaps shown). At 390×844 (the commonest phone viewport), lane A stays sticky at 406px but lane B falls back (432 > 422 = 50vh). The reader sees a sticky canvas in §04 and then a stack of separate pictures in §05, at the chapter's hardest moment. Both lanes are sticky only from about 414×896 up. At 600×900 both fall back again (460 / 525 > 450). The plan's target was ≤ 360px at 360 wide, with the fallback for short viewports (<560px tall), not for mainstream phones. In fallback each lane-B step is a 432px snapshot plus its text, so the reader has to compare stacked pictures instead of watching one drawing change in place.
expected_fix: Shrink the narrow-width canvas until lane B fits in 50vh at 360×740 (≤ 370px) and 390×844 (≤ 422px). That means saving about 60px at 360. Options: under 600px, merge the active loop's pill into the lens block (one line `↻ node loop` above WATCHING/DOING) instead of a separate pill row (about 28px); cut the empty grid band under the notes (visible under CUSTOMERS in rev-w390x844-B2.png); drop the node body unit from 22px to 20px. If lane B still can't fit, make the fit decision per page rather than per lane, so both lanes use the same mode on a given screen.

### P-05 · should · open
criterion: ac-16 (no unreferenced "it"); user standard (no ambiguous pronouns, Ch 2 review)
location: s-03 TERM 02 card, `.cp-term__def`
evidence: "The wrapper Kubernetes puts around one container, or a few that must run together. It counts, places and replaces Pods." The subject of the first sentence is "The wrapper", so "It" reads as "the wrapper counts, places and replaces Pods". This is the ambiguous pronoun the user flagged in Ch 2 ("its own view…").
expected_fix: "…or a few that must run together. Kubernetes counts, places and replaces Pods, not containers."

### P-06 · should · open
criterion: visual consistency (one grammar per kind; user's Ch 3 review "things different in kind drawn differently"); split attention
location: s-03 f-03 vs. w-cluster-scrolly chips vs. s-07 f-05 `.cl__pod`
evidence: A Pod is drawn three ways. In f-03 it is an ink frame with a mono header bar ("POD · 1 ADDRESS") and a body holding chips, the same look as the canvas's node frames ("NODE · 01" bar plus body), so f-03's Pod looks like a machine. On the canvas a Pod is a container chip with a thin inset ring (the plan's Pod grammar), and nothing links that ring to f-03. In f-05 Pods are small chip squares. The plan said "The Pod frame is how Pods look on the canvas", but the built canvas doesn't use it, so the f-03 drawing doesn't carry into the lanes where Pods matter.
expected_fix: Draw f-03's Pods in the canvas's grammar: a large chip with the inset ring, with the `1 ADDRESS` tag and the labels beside it, and the helper case as two chips inside one ring. Keep the bar-and-body frame for nodes only. f-05's small squares can stay, but give them the ring too.

### P-07 · nit · open
criterion: redundancy (prose restating what's on screen)
location: s-08: scene paragraph vs. k-08 prompt; "Ari mentions it to Jordan." + blockquote vs. k-09 prompt
evidence: The scene ends "every time its container starts, it crashes within seconds", and k-08's prompt repeats "Every time a `notifications` container starts, it crashes within seconds, because a setting it needs is missing." Ari's line appears as a blockquote, and then again word for word in k-09's prompt ("Ari says: '…'") a few lines below.
expected_fix: Keep the prompts self-contained, since the user wants think-then-reveal prompts to state their own question. Cut the duplicates outside them: end the scene at "a setting it needs goes missing", and drop the blockquote and "Ari mentions it to Jordan." (or keep the blockquote and start k-09 with "What would you ask Ari?" while the prompt still quotes the line).

### P-08 · nit · open
criterion: redundancy
location: s-02: f-01 caption, the paragraph after TERM 01, and the analogy's first sentence
evidence: "The task list is right only for the night its author pictured" (caption), "A task list written for another night is simply wrong" (paragraph), and "A task list … works until reality differs from what you pictured" (analogy) make the same point three times within one screen at 1280.
expected_fix: Once the first finding moves the takeaway out of the caption, keep it once, in the paragraph after TERM 01, and let the analogy start from the owner ("You know this from managing people: a goal handed to a good owner…").

### P-09 · nit · open
criterion: mobile UX (honest phone heights); cognitive load at a consolidation moment
location: s-05 f-04 under 600px (probe/rev-w360-f04.png)
evidence: At 360 the f-04 plate is 1364px tall (the plan estimated about 640). Five stacked cards each carry three labelled blocks (WATCHING / DOING / SAM'S JOB) on separate lines, so the table takes two full screens and the reader can't see two loops side by side.
expected_fix: Tighten the phone cards: put Sam's job in the card header next to the pill (`↻ scheduler · placing`), and put the WATCHING and DOING labels inline with their text instead of on their own lines. Target about 800–900px at 360.

### P-10 · nit · open
criterion: visual consistency and polish (status word plus colour, consistent statuses; labels on the referent)
location: w-cluster-scrolly B5 (node 02's new `dispatch` Pod), B6 at ≥ 900px, lens block at every acting step
evidence: (a) At B5 the new `dispatch` Pod on node 02 reads "NOT YET" with no service name (a size-1 chip shows its status in place of its label), and NOT YET isn't one of the grammar's status words (NOT STARTED). (b) At B6 on desktop the ReplicaSet loop, scheduler and node loop pills disappear and only "↻ agents · 04, 02" shows, because four pills don't fit one row. At the end of the lane the reader loses sight of the loops they just watched. (c) The 3px step-highlight outline on the lens block sits on the first letter of "WATCHING" (rev-w1280x900-A3.png, rev-w768x1024-B3.png).
expected_fix: (a) Show "dispatch" on the chip and move the status to the lamp plus a short word that fits, or widen the chip label rule so a size-1 NOT STARTED chip keeps its service name. If a short form is needed, use the same short word everywhere it appears. (b) Draw the three loop pills dimmed with the agents pill on a second row, or shorten the agents pill to "↻ agents" (the lens names the nodes). (c) Pad the lens block by sp-half inside the highlight outline.

### P-11 · nit · open
criterion: ac-16 (precise language)
location: D2 body; k-04 option C; k-01 option B feedback; A5 lens line
evidence: (a) D2: "There's no queue of orders to fall behind on". In this chapter `orders` is a service, so "orders" for instructions misleads. (b) k-04 C: "the count of `orders` Pods was met when Ari applied it". In lane A, Ari applied `storefront`'s manifest, not `orders`'s, so "it" has no right referent. (c) k-01 B feedback: "Those are the two jobs Kubernetes did at 03:04 this year". This shows before the page has said that 03:04 happened again in Year 3 (the scene comes after k-01). (d) A5 lens: "WATCHING · Pods assigned to its node" next to the plural "↻ agents · 01, 02" pill.
expected_fix: (a) "There's no queue of instructions to fall behind on." (b) "Not until someone applies `orders`' manifest again: its count of one Pod was met when it was first applied." (c) "Those are the two jobs this chapter's 03:04 will need." (d) "Pods assigned to each one's node".
