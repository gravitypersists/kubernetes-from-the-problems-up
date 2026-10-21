status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/widgets/w-rebuild/data.js — every word the reader sees, plus the items, the six notes steps, the five checks with the items each one needs, and the k-02/k-03/k-04 text (final wording; "photo-resizing tool" per the logged ruling). Ch 2 can reuse it through the `versions` / `short` / `hiddenUntil` fields; none of this is visible to the reader.
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/widgets/w-rebuild/index.js — behaviour only. Each check's PASS/FAIL is computed from which items the notes installed. The correct k-04 answer comes from the missing item's `kind`. Nothing is hard-coded per check.
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/widgets/w-rebuild/index.css — every rule scoped to the mount, tokens only, no hard-coded colours.

summary: The widget follows the plan's four stages and its visual grammar: machine frames with a `MACHINE · NAME` bar, the code row in c1, other contents as c2 rows under category labels, the holiday-sale setting in c6 dashed, and every status as a word plus a colour. The three checks reuse the page's own check classes, so they behave exactly like k-01 and k-05..k-09. The four stage panels sit in one grid cell with only the current one shown, so the widget is always as tall as its tallest stage. A guard also stops it shrinking during a visit. As a result, the top of s-04 stayed at the same position through a full run at 1280, 768 and 360. No libraries, no runtime data calls.

How each acceptance criterion was checked (probe.mjs runs plus my own Playwright scripts, light and dark, normal and reduced motion):
- ac-04: Reveal is disabled until a card is tapped (`isDisabled` true at start, `null` after one tap). The reveal shows all seven items in four categories, each with "without it: …". With 2 picked, 5 rows got YOU MISSED THIS (6 tags counting the one in the feedback).
- ac-05: In stage 2 Sam's server is folded to "Still running (hidden for now)". Each step is marked DONE. The new machine shows only notes rows. The Run launch checks button count is 0 before k-03 is answered and 1 after.
- ac-06: Exactly two checks FAIL (photo upload, confirmation email). Compare stays locked after one diagnosis and unlocks after both. Picking "The code" gives "The code is identical on both machines…".
- ac-07: Checked on the stage-4 screenshots. Code reads IDENTICAL in c1. The three missing rows show when they were added and what breaks. The log row says no check caught it and ties it to Friday. The holiday row reads UNKNOWN with Sam's quote. The summary line is verbatim.
- ac-08: Status words everywhere. The live region announced each step, each check, each diagnosis and the stage changes. Under reduced motion all five checks resolve at once. Start over returns to stage 1 with 7 cards and 0 picked.
- ac-09: No overflow at 360. At 360 every control is at least 44px and the smallest text is 13px. The step card and the new machine's rows fit in one 900px-tall screen.
- The disk gauges show 31% and 09%, matching the plan.

concerns:
- **Height is well above the plan's reservation.** The widget holds a constant 1023px at 1280, 1189px at 768 and 1491px at 360. The plan reserved 600px and about 820px (page.css min-height). The content needed for stages 2–4 doesn't fit in less without cutting plan text. The page builder may want to raise the reserved min-height in page.css to about these figures; that only affects the moment before the widget loads. Short stages, especially stage 2 before k-03, leave empty space at the bottom of the panel.
- **The widget can still grow within a stage.** Opening a "What the other answers say" disclosure makes it taller, just as the page's own checks do. Only stage changes are guaranteed not to move the page.
- **Accuracy reviewer, k-02:** the question asks what is needed "for a customer to order and get a confirmation email", but the photo tool and the log-cleanup job aren't needed for that. The feedback says "the site needs every one". I kept the text verbatim.
- **Phone-only adaptations not in the plan:**
  - Once all six steps have run (and in stage 3), the new machine folds to its bar, still showing the RUNNING lamp, with a "Show what the notes installed (05)" disclosure.
  - After the reveal, the k-02 question text is hidden visually but kept for screen readers.
  - On phones, k-03/k-04 answer tags sit under the option text instead of beside it.
- **Small additions on all widths:** a muted "STEP n" tag on new-machine rows, and "IN THE NOTES · STEP n" on matching stage-4 rows. Stage 4 uses the mockup's short row labels; stages 1–3 show the full labels.
- **"Diagnosed" means the reader committed an answer, right or wrong.** A wrong pick also shows the right answer, as on the page, so Compare unlocks after both failures have an answer.
- **Dependency on page.css:** the widget relies on its check, status and label classes (cp-option, cp-feedback, cp-chip, cp-reveal, cp-label, st/lamp). A later chapter reusing the widget needs the same course treatments.
- **Reading time:** the gate reports about 11.3 minutes of text. With the widget's 3–4 minutes the page is over the 12-minute budget, as the page builder already flagged. I kept widget text to the plan's.

relaxed:
- w-rebuild `size:` (600px desktop / about 820px mobile) — exceeded, as above. The "never move the page" goal it serves is kept.
- w-rebuild mobile spec "status columns 72px" — 76px at 360, so PRESENT/MISSING fit without clipping.

dispositions:
- none (first round)
