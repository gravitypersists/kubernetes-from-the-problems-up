status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/widgets/w-rebuild/data.js — new k-02 question and answer line, rebalanced k-03 options, stage-1 name and a second stage-1 lead for after the reveal
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/widgets/w-rebuild/index.js — stage-1 lead changes after the reveal; on phones, "All six notes" moves below the machine and a new stage starts with its header at the top of the screen
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/widgets/w-rebuild/index.css — open/closed markers on the widget's disclosures, IDENTICAL spanning both columns in stage 4, two 8px gaps trimmed to keep the height constant

summary: Fixed A-04/P-02, P-01 (k-03), P-03, P-06, P-08 and P-09. The gate passes (round 3). I drove a full run through all four stages, both checks and Start over at 1280, 768 and 360; there were no console errors, and the height held constant throughout.

**Final constant heights (for the page builder's min-height):**

| Width | Widget height |
|---|---|
| 1280 | 1023px |
| 768 | 1189px |
| 360 | 1491px |

This held at every state of the run. Opening a "What the other answers say" disclosure can still add height within a stage. A stage change never does.

concerns:
- **Check with the page builder (P-06):** I gave the page-styled `.cp-why` summaries inside the widget their own ▸/▾ marker (a `::before`, scoped to the widget). If the page builder adds a marker for `.cp-why` the same way, my scoped rule wins and the widget shows one marker. If they use `::marker` or `::after` instead, the widget's "why" disclosures would show two markers.
- **k-03's correct answer is now B, not C.** P-01 asks for the key at A in at least one check; that is up to the page checks k-05 to k-08.
- **k-03 option C's feedback had to change.** It used to say only that the app does start. C now says the notes are out of date, which is true, so the feedback first agrees with that and then says why the app still starts. The other two feedback texts are unchanged.

relaxed:
- none

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
