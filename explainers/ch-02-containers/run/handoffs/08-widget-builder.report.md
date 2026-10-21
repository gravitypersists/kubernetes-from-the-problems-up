status: done_with_concerns

All four findings are dealt with: A-02, P-01 and P-05 are fixed, and P-02 is fixed as far as cutting no content allows. The 360px height is still about 75% over the plan's 960px, so the designer or user has to decide on the stacked-height rule for phones (details under concerns). The verify gate passes at 360, 768 and 1280.

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/widgets/w-samecode/data.js — new state-2 lead, a hypothetical result for production in state 2, and a link on to § 03 at the end of state 3
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/widgets/w-samecode/index.js — new row grid, follow-up line moved into the result row, Next button moved after the check in the page order, hypothetical result handling, the § 03 link
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/widgets/w-samecode/index.css — matching layout changes, the code chip in the image band gets a `--surface` fill
- Gate: /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/gate/w-samecode-round-5.json (PASS at 360, 768 and 1280)

summary: Each category now shows once per group, as in Ch 1. SAME / DIFFERENT sits on the label's line, spanning both value columns; at 860px and wider, a group's first row puts it on the category line instead. In state 2, production's result is now hypothetical. The Next button comes after the check feedback in the page order, and CSS still draws it under the table in two-column layouts. On narrow layouts the rows are tighter and the error line uses the sans font.

Final widget heights. The widget always keeps this height; only the states area is reserved inside it.

| Width | Whole widget | States area | Before this round |
|---|---|---|---|
| 1280 | 1001px | 919px | 952px |
| 768 | 1045px | 963px | 1045px |
| 360 | 1682px | 1574px | 1742px |

At every width (320, 360, 768, 1280), the content below the widget stays at the same y through all nine steps (start, each pick, try again, each state, start over). No element overflows, no text is under 13px, and no button or summary is under 44px. Reduced motion runs with no animations.

concerns:
- **Phone height is still far over the plan.** 1682px at 360 is about 75% above 960. What remains is the verbatim content:
  - the answered check with TRY AGAIN, the disclosure and the Next button: about 700px;
  - the table: about 590px;
  - the state lead: about 130px;
  - the widget's top bar and state header: about 110px.

  Per P-02, the designer or user should decide whether the stacked-height rule gives way on phones. Each new state's header already scrolls to the top there. Without the rule, phone heights would run from about 1100px (before an answer) to 1574px for the states area.
- **Desktop grew a little.** 1280 went from 952 to 1001px, because a group's later rows (like the photo-tool row) now need their own line for the marker.
- **The page builder's mount reservation** should use the heights above.
- **k-03's prompt still says "Both machines now run the same image".** It's check text, so I left it, but it now sits against the hypothetical lead. The designer may want to reword it.
- **The § 03 link** points at `#s-03`, the section's id in index.html. If the page builder renames that section, the link needs updating.

relaxed:
- none

dispositions:
- A-02: fixed — The state-2 lead now ends "Riley’s laptop now runs that image, and production would run exactly the same one."
  - Production's state-2 result is a dashed FAIL with no error line, tagged "↑ not released: would fail the same way". It's set in data.js as `hypo: ['prod']` plus a tag for production.
  - The laptop keeps FAIL, "error: unknown option" and "caught before release".
  - The screen-reader announcement now reads "Production: not released: would fail the same way."
- P-01: fixed — The Next button is now after the check card in the page order; CSS still draws it in the left column under the table when the widget is two columns wide. Probe: Enter on an option, then Tab, Tab reaches it at 1280, 768 and 360, for both k-02 → "Next: pack it in an image" and k-03 → "Build fennel-app:v43…". The third Tab leaves the widget.
- P-02: fixed (partly) — The cheap options are in, and 360 went from 1742 to 1682px with no content cut and the no-reflow rule kept:
  - (a) each category shows once per group, and SAME / DIFFERENT sits on the label's line beside the chip's second line;
  - the code row's "Same code." moved under IDENTICAL;
  - narrow layouts get tighter rows and the sans error line;
  - (b) the "Can’t reproduce." follow-up is now a full-width line inside the result row, still directly above the check;
  - (c) state 3 ends with a bottom-aligned "Continue to § 03 ↓" link, so the empty frame has a visible exit.

  It is still far above 960; the decision this needs is under concerns.
- P-05: fixed — The code chip inside the image band has a `--surface` fill with its c1 border, and each category shows once per group (shared with P-02).
