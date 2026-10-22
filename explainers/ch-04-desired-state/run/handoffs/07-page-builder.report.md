status: done

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/index.html: text fixes for every finding I own, the 23-minute label, f-01's spreadsheet step dropped, and f-03 redrawn
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/assets/page.css: f-03 in the Pod-ring grammar, f-05's Pod squares with the ring, f-04's phone cards tightened
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/assets/page.js: CH04_LOOPS node-loop `doing` now ends "after a wait, marks its Pods for deletion"

summary: All 21 findings assigned to me are fixed. The page-phase gate (round 5) passes with every check PASS, and the widget is no longer pending. Text-only reading is ~18.4 min, consistent with the 23-minute label. The time now reads 23 MIN in the hero meta and on the ToC rail (`data-minutes="23"`); nowhere else on the page states a time. In Fig. 01 I dropped "Update the spreadsheet" from Sam's task list. That keeps it consistent with Ch 3, where the spreadsheet still said machine 03, and the remaining three steps still make the contrast. Option lengths now, correct answer starred:
- k-02: A93 B86 *C89
- k-03: A87 B73 *C78
- k-05: A100 *B94 C94
- k-06: *A108 B106
- k-07: A101 B109 *C89

No correct option is the longest by a clear margin, and none is the only hedged one. All keys are unchanged. I checked each fix myself at 360 and 1280.

concerns:
- **f-04 on a phone is 938px tall at 360 px wide**, a little over the 800–900 target. To fit "SAM'S JOB" inline next to the pill I'd have had to clip "replacing", so the label stays on its own line in the card header.
- **Edits outside the d-07 list:** I changed k-01 B feedback and k-04 C option (P-11 b, c). Both checks are outside d-07's list of rewordable checks, but the handoff assigned these edits to me. Each check keeps its meaning and key.
- **Ari's quote above k-09 is gone (P-07).** I removed the blockquote, and k-09's prompt still quotes Ari's line word for word. ac-14's "quoted above k-09" is now met by the quote inside the card.

relaxed:
- P-09 target height: ~900px → 938px, so that no label is clipped on a phone

dispositions:
- **A-01: fixed.**
  - §07 now says the provider runs the control plane in every mode and carries out its upgrades. Deciding when to upgrade, and checking that the apps still work, "stays partly Fennel's job; Chapter 14 is about that work".
  - k-07 option A is now "…and replacing their machines when they fail", with feedback "That's the control plane, which the provider runs in every mode."
- **A-02 (page part): fixed.**
  - CH04_LOOPS: the node loop's `doing` now reads "after a wait, marks its Pods for deletion".
  - k-04 C feedback: "Once the dead node's Pods are marked for deletion…"
  - k-05 A feedback: "marked node 03 unknown and, after a wait, marked its Pods for deletion".
  - D3 adds that the old records linger, marked for deletion, and that the ReplicaSet loop stops counting them once they're marked.
- **A-03: fixed.** §07 now reads "pays for the computing its Pods run on: in most modes, that means the machines themselves."
- **A-04: fixed.** §02 now reads "Teams usually keep manifests in version control, so a change to a goal can be reviewed…"
- **A-05: fixed.** D2 is retitled "…twice in quick succession?", says "a moment later", and gives both outcomes (never acts on 5, or turns around), ending at 3 either way.
- **A-06: fixed.**
  - TERM 04: "The API server, the cluster's record behind it, and the loops that work on it."
  - The §07 paragraph puts the API server inside the control plane and ends on the control-plane `dfn`, so TERM 04 now follows it directly.
- **A-07: fixed.** D3 now says only "the five-minute wait" can be changed app by app.
- **A-08: fixed.** k-06 B feedback opens "Pods can't be moved like that." The VM clause is gone.
- **P-01: fixed.**
  - Fig. 01's caption is now a condition: "The same night, written down two ways after machine 03 died."
  - The takeaway moved to after k-02, into the paragraph after TERM 01 and into k-02 C's feedback.
  - Option rewrites:
    - k-02 C is shortened.
    - k-03 A now gives a reason ("since the tool said `created`"), and k-03 C is "Only a line…" with the second clause dropped.
    - k-05 B is trimmed.
    - k-06 A is shortened.
    - k-07 B is lengthened, and k-07 C is one clause ("…how many copies of `orders` to run, and from which image").
- **P-02 (page part): fixed.** §02's last line now reads: "With Kubernetes, it is: the cluster keeps its own record of what's wanted and what's running, and every part of Kubernetes works from that record." It no longer equates Fig. 02 with the record, and it doesn't say what apply does.
- **P-03: fixed.**
  - §04 names the loop lens: "Together they're the loop lens…"
  - TERM 03's mono line reads "the loop lens: which loop · watching what · doing what".
  - §05 now says "through the loop lens".
  - The §08 bridge now reads "Whenever Kubernetes does something from here on, the loop lens is the first question to ask…", with no course meta.
- **P-05: fixed.** TERM 02 now reads "Kubernetes counts, places and replaces Pods, not containers."
- **P-06: fixed.**
  - f-03's Pods are now c1 chips inside an inset ink ring, matching the widget's `.wc-p`. The helper case is two chips in one ring.
  - The POD / 1 ADDRESS labels sit beside the ring, and the bar-and-body frame is gone.
  - f-05's Pod squares already had the ring; they now have a surface ground like the canvas Pods and are slightly larger.
- **P-07: fixed.**
  - The §08 scene now ends at "a setting it needs goes missing."
  - "Ari mentions it to Jordan." and the duplicate blockquote are removed. The k-09 prompt is unchanged and still quotes Ari.
- **P-08: fixed.**
  - The task-list takeaway appears once, in the paragraph after TERM 01.
  - The analogy now starts from handing a good owner a goal instead of a task list, without repeating the "pictured" point.
- **P-09: fixed.**
  - Each phone card's header row now holds the loop pill, with Sam's job on the right.
  - The WATCHING and DOING labels sit inline with their text, and the paddings are tighter.
  - f-04 went from 1364px to 938px at 360 px wide (see "relaxed").
- **P-11 (a)–(c): fixed.** Part (d) is the widget builder's.
  - (a) D2 now says "no queue of instructions".
  - (b) k-04 C now reads "Not until someone applies `orders`' manifest again: its count of one Pod was met when it was first applied."
  - (c) k-01 B's feedback now reads "Those are the two jobs this chapter's 03:04 will need."
