## Review round 1 fixes: Chapter 1 page

status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/index.html — f-03 timeline and notes, prose fixes in s-01 and s-04 to s-07, rebalanced checks k-05 to k-08, time label changed to 17 minutes
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/assets/page.css — markers on the `.cp-why` disclosures, breaks label colour, f-03 tag and opacity, new w-rebuild height reservation

summary: I fixed every finding assigned to me. The page gate (`verify.mjs --phase page`, round 7) passes with no warnings, and w-rebuild is no longer reported as pending. I checked f-03 and the k-06 reveal in screenshots at 1280. Check text changed only where A-02, A-07 and P-01 require it, as d-06 allows. Every answer means the same and stays correct, and each option's feedback is still true for that option. The time label now reads 17 minutes in the hero and in the ToC rail. The gate measures about 11.5 minutes of text, not counting the widget.

The w-rebuild height is now reserved only while the mount is empty (`:empty`), so it can't leave a blank gap once the widget mounts. The reserved heights are just under the widget builder's measurements:

| Screen width | Reserved | Measured by widget builder |
|---|---|---|
| 900px and wider | 1000px | about 1023px at 1280 |
| 600–899px | 1160px | about 1189px at 768 |
| under 600px | 1300px | about 1491px at 360 |

The narrow figure is set lower because P-12 may reduce the widget's height.

concerns:
- **P-01 is only partly met for k-08.** Its correct option still has the most words (21, against 15 and 18 for the other two). It has to contain the chapter question word for word (ac-15). I lengthened the wrong options to the same "partly right" shape, but the key can't get shorter.
- **The k-07 feedback for option B is now longer.** To shorten option B to 18 words, I moved its caveats into its feedback: the clutter, the lost changes and orders, and that nobody knows which settings matter. Their substance is unchanged and still on the page.
- **Correct answers now sit at C, A, B, B** for k-05, k-06, k-07 and k-08. The widget's k-03 key is separate.

relaxed:
- none

dispositions:
- A-01: fixed — the f-03 panels now cover one day: "1 · Thu 01:00 Last night's snapshot taken", "2 · Thu 15:00 Sam fixes something by hand", "3 · Thu 22:00 The VM dies; restore last night's snapshot". Panel 3's note reads "Back in minutes. This afternoon's fix is gone, and so are today's orders." The clutter and UNKNOWN rows are unchanged.
- P-04: fixed — same change as A-01.
- A-02: fixed — k-07 option B now reads "Restore last night's snapshot: back fast, clutter included, but everything since is lost, hand-made fixes and orders alike." Its feedback names "hand-made fixes, and any orders placed since". The f-03 panel 3 note says today's orders are gone.
- A-03: fixed — the s-04 first paragraph now says "Most of them are dependencies: the language runtime, the libraries and tools…, and the config… The app also relies on the data on the disk, its orders and customers, which changes every minute."
- A-05: fixed — the VM link text now reads "an isolated computer created in software", followed by "Several of them can run on one physical machine".
- A-06: fixed — s-04 now says "With no second machine to try it on, the surest way to find out is to remove it and see what breaks…"
- A-07: fixed — the feedback for the "All of them" option in k-06 now says "so a problem with it can take the whole site down".
- P-01: fixed for the page checks (k-05, k-06, k-07, k-08); the widget builder handles k-03.
  - Each wrong option is now 15–19 words and has the key's "X, since/so Y" shape. For example, k-07 A now reads "Click a button for a new VM, which is ready in minutes, and Fennel is back where it was."
  - The key moved to A in k-06.
  - Each option's feedback is unchanged and still true for that option, apart from the A-07 wording above.
  - k-08 is only partly balanced; see concerns.
- P-05: fixed — the s-06 paragraph after k-06 now names it once: "Engineers call a machine like this a single point of failure: when something goes wrong with it, the whole site can go down with it." The term is marked as a definition (`dfn`).
- P-06: fixed — `.cp-why summary` shows a ▸ marker that turns to ▾ when open, in ink. The browser's own marker is suppressed.
- P-07: fixed — I trimmed the lead-ins that repeated the check prompts:
  - s-01 now ends "Here's the strange part."
  - s-06 opens "After Friday, everyone reaches for a fix."
  - The VM paragraph opens "Sam's idea uses a different kind of server."
  - s-07 opens directly with Sam's quote.
- P-10: fixed — "Google's SRE team" is now "Google's site reliability engineers", and "the same engineers add that no playbook is a substitute for people who can think on the fly".
- P-11: fixed — the "WHERE THIS ANALOGY BREAKS" label now uses `ink-3` instead of `warn`. The f-03 tag "hand-made, not in notes" sits on its own line in italic sans, so it now takes two lines instead of three mono lines at 1280. Context rows are at 0.55 opacity instead of 0.4. I didn't touch the optional PREDICT chip outlines, which are inside the widget.
