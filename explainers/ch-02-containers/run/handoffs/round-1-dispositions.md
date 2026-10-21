# Round-1 dispositions (extracted verbatim from builder reports 07 and 08)

## Page builder (handoff 07)
dispositions:
- A-01: fixed — s-03 has a new sentence after the immutability paragraph. It says the version label is a name that someone can move to a different image, and that teams who need certainty use labels they never reuse, or the image's digest. In Fig. 01, the v43 annotation now reads "image: the package; never changes once built" (page.js `CH02_REGISTRY`), and the registry note reads "each version stays as it was" (index.html).
- A-03: fixed — s-05's "That one difference…" paragraph now adds: "An image often does include an operating system's basic files and tools (engineers will say an image is "based on Debian", for example), but never its kernel, and nothing boots." "Without a copy of the operating system for every app" became "Without a whole operating system and kernel for every app". Fig. 02's VM rows now read "whole OS + kernel".
- A-04: fixed — the A2 aside now opens "The usual comparison is to shipping containers."
- A-05: fixed — k-07 option B feedback now reads "…really does take seconds once the machine has the image."
- P-03: fixed (d-07) — k-05 option C now reads "An ordinary program, fenced off from its neighbours: it runs on the machine's own operating system." The meaning is the same, and it no longer echoes s-04's wording ("walled-off", "process", "own files").
- P-04: fixed — `setupChoice()` in site/assets/page.js gives `.cp-feedback` `tabindex="-1"` and calls `fb.focus({ preventScroll: true })` after a pick. TRY AGAIN still sends focus back to option A. Ch 1 is untouched.

## Widget builder (handoff 08)
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
