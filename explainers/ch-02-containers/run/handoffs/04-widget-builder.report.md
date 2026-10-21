status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/widgets/w-samecode/data.js: all the text the reader sees: rows with per-state values for each machine, bands, the result rule (photo tool ≥ 7.0), leads, k-02 and k-03 verbatim, announcements. Misconception IDs appear only in comments.
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/widgets/w-samecode/index.js: behaviour only. Markers (IDENTICAL / SAME / DIFFERENT) and PASS / FAIL are worked out from the values, never stored. Results are hidden until the check is committed. The three states are stacked in one grid cell, and the widget reserves the height of its tallest form.
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/widgets/w-samecode/index.css: every rule is scoped to `[data-widget="w-samecode"]` and every colour is a token. It reuses the page's `cp-check__head`, `cp-chip`, `cp-option`, `cp-feedback`, `cp-retry`, `cp-why`, `cp-reveal`, `st` / `lamp` and `cp-img`.
- Gate: /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/gate/w-samecode-round-4.json (PASS at 360/768/1280). Screenshots are in run/screenshots/probe/ (w1280-*, w768-*, w360-*).

summary: I adapted w-rebuild's stage-4 aligned rows, its check pattern and its stacked-states technique; Ch 1's files are untouched. The ink ▸/▾ disclosure markers are kept. A marker that applies to both machines spans both columns. Under 600px the state header scrolls to the top on each state change. Rows are two grid lines: the category with the marker, then the label with the two values. A value that changed since the last state keeps a 3px ink frame, after a 220ms flash. The band in state 2 is an image frame (c1 on c1-soft) with a `cp-img` chip. Layout: two columns when the widget is 700px or wider, one column below that.

Measured heights of the tallest state:

| Viewport | Widget width | Tallest state (states area) | Whole widget | Plan reserve |
|---|---|---|---|---|
| 1280 | 900 | 870 (state 3) | 952 | 600 |
| 768 | 736 | 963 (state 2, k-03 B) | 1045 | 600 |
| 360 | 328 | 1634 (state 1, k-02 B or C) | 1742 | 960 |

At 360 the widget is about 81% over the plan's 960. Why: the plan budgeted 380px for check plus feedback and 52px for the button. With the verbatim k-02 text at 15px in a 309px column, the answered check comes to about 700px, plus the follow-up line and Next button (about 825 in all). The table needs about 600px against the planned 340. Each of the four rows has a category line plus a label that wraps to 2–3 lines, and the result row carries the error text and the tag. The lead is about 130px. I cut no content.

How each acceptance criterion was checked (Playwright scripts in the scratchpad plus probe.mjs, at 320/360/768/1280, with and without reduced motion):
- ac-03: row text read in state 1 shows IDENTICAL, SAME, SAME, then 7.0 / 6.2 DIFFERENT. The production result reads "?" until k-02 is committed, then FAIL "error: unknown option". The "can't reproduce" line appears after the reveal. Feedback B begins "That's 'the code is the app' again".
- ac-04: state 2 shows the IN THE IMAGE · fennel-app:v42 band, 6.2 / 6.2 SAME with the laptop cell framed, and "? ?" until k-03. Then FAIL / FAIL, with "↑ caught before release" on the laptop.
- ac-05: state 3 shows the immutability lead, v43, PASS / PASS, and the NOT IN THE IMAGE band: test / production and test orders / real orders, both DIFFERENT, each with its note.
- ac-06: the aria-live text was read after every action, for example "Production: photo upload FAIL, error: unknown option." and "State 2 of 3: One image. … Photo-resizing tool: 6.2 on both machines." With reduced motion, `document.getAnimations()` is empty. Start over returns to state 1 with results hidden and announces it.
- ac-07: at 320, 360, 768 and 1280, no element of the widget overflows, no text is under 13px and no button or summary is under 44px, in every state. The page content below the widget stays at the same y in all nine steps, at every width. At 360 the gap from the result row to the check is 24px.
- ac-08: checked on the screenshots.
- Keyboard: committing with Enter on a focused option moves focus to the feedback, and TRY AGAIN returns focus to option A.

concerns:
- Page builder: `page.css` reserves 600 / 960px for the empty mount, which is far below the real heights above. The page jumps when the widget loads. Suggest setting the reserves to the measured heights (about 952 at 1280, 1045 at 768, 1742 at 360).
- Deviations from the plan, all for space or the handoff rules:
  - SAME / DIFFERENT sit on the category line, spanning both value columns. The plan had an 88px marker column on desktop and a tag under the label on mobile. This follows the handoff's "spans both columns" fix and saves about 100px.
  - Narrow value columns are 84px, not 72px. The mono "PRODUCTION" header needs 80px at 13px.
  - The category is drawn on every row, so "Libraries & tools" appears twice.
  - Option tags (CORRECT, YOUR PICK, ANSWER) sit under the option text at all widths. The check column is never wider than about 400px.
  - In two columns, the follow-up line and the Next button sit under the result row. In one column they come after the check (ac-07).
  - "error: unknown option" shows on every FAIL, so on both machines in state 2. The rule produces it, and it backs "same failure"; the plan only specified it for production in state 1.
- State 1: the code row sits inside the INSTALLED BY HAND band, as the plan's model says. The mockup drew it above the band.
- No libraries and no CDN loads.

relaxed:
- Plan `size:` reserves (600 desktop, 960 at 360): exceeded, as measured above. Nothing cut, as the handoff instructed.
- Plan `size:` 72px mobile status columns and the 88px desktop marker column: changed as described under concerns.

dispositions:
- none (first round)
