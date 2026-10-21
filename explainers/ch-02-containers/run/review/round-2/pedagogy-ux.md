# Pedagogy & UX review: round 2

## Summary
Closure round. Four of my five round-1 findings are closed, each confirmed by a probe (P-01, P-03, P-04, P-05). P-02 is still open. The builder did all three cheap fixes. State 3 now ends on a visible "Continue to § 03 ↓" exit, so it no longer reads as a dead end. But the widget is still 1682px tall at 360 (was 1742; the plan says 960). Before the reader commits in states 1 and 2, about 470–550px of empty bordered frame sits under the check. Closing that needs a user or designer decision on ac-07's shared-height rule on phones (see P-02). I found no regressions: no overflow at 360, 390, 768 or 1280, both themes intact, no console errors, and the gate passes with 11.9 min of reading. No new findings.

## Scores
- acceptance criteria: 5 — ac-01 to ac-16 are still met. Re-probed ac-03, ac-04, ac-05, ac-06 and ac-07 after the widget changes (below)
- cognitive load fit: 4 — no change. The widget's hardest moment still holds 3 elements. s-03 is still a dense stretch of prose
- engagement where intended: 5 — no change. The seven commit-then-reveal items are intact
- misconception handling: 5 — k-05 C no longer echoes s-04's wording, so a reader who holds m-01 has to understand the options to choose between them (P-03)
- split attention and redundancy: 4 — no change
- mobile UX: 3 — the state-3 exit helps. States 1 and 2 at 360 still show about 470–550px of empty frame before the commit (P-02)
- clarity of interaction: 5 — forward Tab now reaches "Next" at every width, and page checks move focus to their feedback (P-01, P-04)
- visual consistency and polish: 5 — the code chip has a surface fill inside the image band, and categories appear once per group, as in Ch 1 (P-05)

**Probes this round** (custom Playwright drivers using the skill's `scripts/lib/pw.mjs`; screenshots in `run/screenshots/probe/r2-*`). I drove the whole widget at 360 and 390 light, 390 dark, 768 light, and 1280 light and dark. In each state I first picked the tempting wrong answer (k-02 B, k-03 B), then TRY AGAIN, then the right answer, then Next, and in state 3 Start over and the exit link. I ran a keyboard pass at 360 and 1280 through the widget and through k-01 and k-04 to k-07. The widget measured the same height and the next h2 kept the same offset through every state and reveal (360: 1682 / 1754; 390: 1632 / 1704; 768: 1045 / 1117; 1280: 1001 / 1073), so ac-07's no-reflow rule still holds. `scrollWidth` equals the viewport at every width. No targets under 44px, no text under 13px in the widget, and no console errors.

**ac re-check after the widget changes:** ac-04 still holds. Both results stay "?" until k-03 is committed. Then the laptop reads FAIL "error: unknown option" "↑ caught before release", and production reads a dashed FAIL "↑ not released: would fail the same way" (`r2-w1280-light-s2-k03C.png`, `r2-w390-dark-s2-k03C.png`). The dashed outline and the "would" wording make the hypothetical legible without extra prose. ac-05 holds in state 3, with PASS / PASS and the NOT IN THE IMAGE band showing both rows DIFFERENT with their notes (`r2-w360-light-s3.png`, `r2-w1280-dark-s3.png`).

**Time (information):** the gate measured 11.9 min of reading (11.6 in round 1). The fixes added about two sentences of prose. My interaction-inclusive estimate is still about 15–16 min against the 14-min budget.

## Findings

### P-01
severity: should
criterion: clarity of interaction; ux-ui §9 (keyboard)
location: widget w-samecode, states 1–2, two-column (≥ 700px) and one-column layouts
evidence: Probe at 1280 and 360. Focus on k02-A, then Enter. Focus moves to `.cp-feedback`, then Tab 1 to "Why the other answers miss", then Tab 2 to "Next: pack it in an image" (inside the widget), then Tab 3 to k-04 option A. With k03-C, Enter, Tab, Tab I reach "Build fennel-app:v43 with photo tool 7.0" the same way. Activating Next moves focus to the new state's heading ("State 2 / 3 · One image"). In state 3, Tab goes from the heading to "Start over" and then to "Continue to § 03 ↓". At 1280 the button still renders in the left column under the table (`r2-w1280-light-s2-k03C.png`), so the visual layout is unchanged.
expected_fix: none; resolved.
status: closed

### P-02
severity: should
criterion: mobile UX; plan w-samecode `size:` (reserve 960px at 360); ac-07 (all states share one reserved height)
location: widget w-samecode at < 600px, states 1 and 2 before the commit; `reserve()` in `site/widgets/w-samecode/index.js`; `run/screenshots/probe/r2-w360-s1-initial-full.png`, `r2-w360-light-s3.png`
evidence: The builder applied (a), (b) and (c), and they work. Each category shows once per group, with SAME / DIFFERENT on the label line. "Can't reproduce." is a line inside the result row. State 3 ends with a bottom-aligned "Continue to § 03 ↓" (44px tall, reachable by keyboard), so its remaining empty frame now has a visible exit. That part of the finding is resolved. The height barely moved, though: 1682px at 360 (was 1742) and 1632 at 390 (was 1666), still 75% above the plan's 960. The tallest state is still state 1 after a wrong pick (panel 1574px at 360). Before any answer, the state-1 panel is 1132px, which leaves about 550px of empty bordered frame under the check card. State 2 before commit is 1138px, about the same. In the screenshot, the check card ends about two thirds of the way down the frame, and an empty box runs to the frame's foot. A reader who reaches the check usually answers it, so this matters less than the state-3 dead end did. A reader who scrolls on without committing still meets a box that looks unfinished. At 768 and 1280 the dead space is small (about 100px), which is fine.
expected_fix: The builder can't close this without changing an acceptance criterion, so it needs a user or designer decision. Options: (1) Accept the empty frame and keep ac-07 as written. The residual cost is cosmetic and appears only before a commit, and the state-3 exit covers the case that mattered most. (2) Relax ac-07's shared-height rule below 600px only. Each state takes its natural height, and `scrollIntoView` already puts each new state's header at the top on narrow screens (index.js l.323), so the content below the widget is off-screen whenever it moves. Keep the rule at ≥ 600px, where it costs about 100px. I recommend (2): the rule exists so content doesn't jump under the reader's eyes, and on phones it doesn't. Either way, record the decision. Ch 1's w-rebuild had the same problem, so the decision should cover the course.
status: still-open

### P-03
severity: should
criterion: misconception handling (m-01); learning-science audit (Constructive commitment, not recognition)
location: s-04 ¶2 (index.html l.113) vs k-05 option C (l.144)
evidence: Under d-07, k-05 C now reads "An ordinary program, fenced off from its neighbours: it runs on the machine's own operating system." s-04 still says "the app running as a process, walled off by the operating system so that it has its own files…". None of the three distinctive cues from round 1 ("walled-off", "process", "its own files") is in the option now. To pick C, the reader has to see that "ordinary program… runs on the machine's own operating system" rules out A's "boots its own trimmed-down operating system", and that comparison is the m-01 distinction itself. C's feedback still names "process", "walls" and "operating system core", so the vocabulary is tied together after the commit, which is the right moment. The meaning matches the plan's key (`r2-w360-k05-right.png`).
expected_fix: none; resolved.
status: closed

### P-04
severity: nit
criterion: clarity of interaction; ux-ui §9 (keyboard focus)
location: page checks k-01, k-04 to k-07; `setupChoice()` in `site/assets/page.js` (l.97, l.147)
evidence: Probe at 360 and 1280, on all five page checks. Enter on a wrong option moves focus to `DIV.cp-feedback is-wrong`, not to BODY. Tab then reaches TRY AGAIN, and Enter on TRY AGAIN returns focus to option A. Enter on the right option moves focus to `DIV.cp-feedback is-right`. `preventScroll` keeps the view still. Ch 1 is untouched, as the finding allowed.
expected_fix: none; resolved.
status: closed

### P-05
severity: nit
criterion: visual consistency and polish
location: w-samecode states 2–3, image band code row; row categories
evidence: (1) In states 2 and 3 the code chip inside the IN THE IMAGE band now has a surface fill with its c1 border. It stands out from the c1-soft band in light (`r2-w1280-light-s2-k03C.png`) and dark (`r2-w1280-dark-s3.png`, `r2-w390-dark-s2-k03C.png`). (2) "LIBRARIES & TOOLS" appears once over its two rows, with the marker on the category line at 1280 and on the label line at 360, as in Ch 1's stage 4.
expected_fix: none; resolved.
status: closed
