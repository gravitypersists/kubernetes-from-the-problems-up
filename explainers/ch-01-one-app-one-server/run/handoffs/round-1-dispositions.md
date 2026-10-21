# Round-1 dispositions (extracted verbatim from builder reports 07 and 08)

## Page builder (handoff 07)
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

## Widget builder (handoff 08)
dispositions:
- A-04: fixed — k-02 question is now "Besides the code, what has to be on this machine for the Fennel site to keep working? Tap everything you think is there, then reveal." The answer line is now "…All seven are on Sam’s server, and the site relies on every one: some today, one only when the disk next fills up." (data.js `k02.prompt`, `k02.picked`)
- P-02: fixed — same change as A-04, done once.
- P-01: fixed (k-03) — each option is now a verdict with a partly true reason, at 14, 11 and 12 words, and every option has a "but":
  - A: "Yes. The notes are old, but same code and every step leaves nothing missing."
  - B (correct): "It will start, but some features will be broken or missing."
  - C: "No. The code is fine, but out-of-date notes mean it won’t start."

  The meaning and the correct answer are unchanged; each feedback still holds for its option. I left k-04 alone: its options are three short categories ("The code" / "Something installed on the machine" / "A setting or key in the config"), so the length issue doesn't apply.
- P-03: fixed — on a stage change below 600px, the widget's stage header scrolls to the top of the screen. At 360, after Next, the header lands at 24px (the page's scroll padding), the step card ends at 436px and the machine starts at 469px. "All six notes" now sits below the machine, so the step card is directly above the rows.
- P-06: fixed — "All six notes", "Show what the notes installed" and the "why" disclosures inside the widget now show an ink ▸ that turns to ▾ when open. The page's `.cp-why` CSS has no marker for me to match.
- P-08: fixed — the stage name is now "What’s on Sam’s server". The lead changes to "Sam’s server, as it really is." after the reveal, and the Start over announcement matches.
- P-09: fixed — the IDENTICAL chip now stretches across both status columns, centred.
- P-12: disputed — this isn't a cheap fix. At 360 three stages are close in height: stage 4 is 1409px, stage 1 after the reveal 1376px, and stage 2 with k-03 answered 1285px. Folding stage 4's "In the notes · step n" lines would save about 30px before stage 1 became the tallest. Real savings would mean hiding stage-1 or stage-4 rows, which d-07 ("no content cuts") and the time cap rule out.
