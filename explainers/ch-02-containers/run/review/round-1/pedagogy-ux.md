# Pedagogy & UX review: round 1

## Summary
The page does what the plan says it will. It opens with retrieval (k-01), puts the pain in the page (w-samecode's two predictions, with the surprise in state 2), names image, registry, container and kernel only after the reader has met each one, and ends on the conversation and an open question. All 16 acceptance criteria are met. Every check commits before it reveals, and each wrong option's feedback says why it's wrong. Both themes are intact, and no width overflows. Three issues are worth fixing. (1) At 700px and wider, a keyboard user who answers k-02 or k-03 tabs straight out of the widget and never reaches the "Next" button. (2) At 360–390px the widget reserves 1666–1742px (the plan said 960), so states 1 and 3 show about 550–600px of empty frame. (3) k-05's correct option repeats s-04's definition of a container, which weakens the m-01 confrontation. Estimated time: about 15–16 minutes against a 14-minute budget.

## Scores
- acceptance criteria: 5 — all of ac-01 to ac-16 met, each with probe evidence (below)
- cognitive load fit: 4 — the widget's hardest moment holds 3 elements, and the row table keeps them all visible. s-03 is a dense 433-word stretch of prose with no figure or check
- engagement where intended: 5 — seven commit-then-reveal items at the key ideas. The widget's two predictions are Constructive, and the second one surprises (the bug moves to the laptop)
- misconception handling: 4 — m-19, m-23 and m-24 are stated fairly, shown failing and corrected, with their partial truths kept. k-05 (m-01) can be answered by matching wording from s-04 (finding 3)
- split attention and redundancy: 4 — direct labels throughout, no legends. Captions give the takeaway. Prose doesn't narrate the widget states
- mobile UX: 3 — no overflow, targets ≥ 44px, text ≥ 13px. But the widget is 1742px tall at 360 with large empty regions (finding 2)
- clarity of interaction: 4 — clear PREDICT chips, buttons and a "Start over". The keyboard path skips "Next" at desktop widths (finding 1)
- visual consistency and polish: 4 — matches Ch 1's w-rebuild stage 4 and the Control Plane plates, chips and status words in both themes. Small inconsistencies in finding 5

**Acceptance criteria evidence (probes at 390 and 1280, light and dark, plus 360 dark and 360/1280 with reduced motion and keyboard; screenshots in `run/screenshots/probe/pux-*`):**
- ac-01 met: the s-01 h2 is followed directly by k-01. The three symptoms come next, in a manager's terms.
- ac-02 met: the body contains no Kubernetes, orchestration, cluster, node, pod, volume or Deployment. "Docker" appears once in the body (l.118, "a name you'll hear… next chapter places it"). The Sources list naming Docker documentation is attribution, not body.
- ac-03 met: in state 1, production's cell shows "?" until k-02 is committed, then FAIL "error: unknown option". The "Can't reproduce" follow-up appears after the commit. B's feedback opens "That's 'the code is the app' again" (`pux-w390-light-w-s1-k02B.png`).
- ac-04 met: the only change is the band (IN THE IMAGE · fennel-app:v42) and the laptop's photo value, 7.0 → 6.2, which gets an ink frame. Both results stay "?" until k-03 is committed, then FAIL / FAIL with "↑ caught before release". B's feedback includes "What it changes is where you find out."
- ac-05 met: the lead says "An image can't be edited… v42 stays exactly as it was". PASS / PASS. The NOT IN THE IMAGE band shows both new rows as DIFFERENT, with the planned notes (`pux-w1280-light-w-s3.png`).
- ac-06 met: every status is a word plus a colour. The aria-live region announces each reveal and state change ("Production: photo upload FAIL, error: unknown option…"; "State 2 of 3: One image…"). With reduced motion, the computed `animation-name` is `none` on `.is-flash` and `.is-entering`. "Start over" returns to state 1 with production "?" and announces "Results hidden again."
- ac-07 met: no overflow at 360 or 390. The result row is the last table row, directly above the check card. From result row to last option is 516px at 360, so both fit in one 780px viewport. Text ≥ 13px; no targets under 44px. The offset of the next h2 from the widget stays at 1814px (360) / 1024px (1280) across all states and reveals.
- ac-08 met: column headers, category labels, c1 code chip with IDENTICAL, c2 chips: same as Ch 1 stage 4. The image band is c1 stroke on c1-soft.
- ac-09 to ac-15 met: as specified (image dfn after the widget and pointing back to its rows; config in one sentence; registry and container dfns after f-01; production running two containers; A2's "breaks" line names processor and settings; k-04 B links to drift, and its A feedback says "To keep a fix, put it in a new image"; k-05 comes before the kernel gloss and f-02, and at 1280 f-02 is below the fold while the k-05 options are on screen (`pux-w1280-light-k05-context.png`); sizes are hedged; no density number; "layers, not rivals"; three ANALOGY asides each with WHERE THIS ANALOGY BREAKS; k-07 B gets "Half right…"; the "what's left" list is written as questions; the page ends on the 3 a.m. question).
- ac-16 met: keys are B, A, C, A, C, B, C. Options within each item are parallel ("It's gone: / It stays: / It spreads:"). No scores.

**Time (information, not a finding).** The gate measured 11.6 minutes of reading. My estimate with interaction: about 1,610 words of prose at about 210 wpm (7.5 min), about 520 words of check prompts and options (2.5 min), seven commits plus reading the chosen feedback (about 2.5 min), and looking at f-01, f-02 and the widget's tables (about 2.5 min). That totals **about 15–16 min**, 1–2 minutes over the 14-minute budget. The parts that cost most: s-05 (about 400 words of prose plus f-02 plus k-05, about 3.5 min, where the plan had 2.5); w-samecode (about 3.5 min, as planned); s-03 (433 words, about 2 min, as planned). The plan's cut-list items 1–2 (the c-12 paragraph and A3 in s-05) target the section that overran. Cutting is the user's call.

**Style guide (Control Plane) and CURRICULUM §2:** Second person, sentence-case headings, no exclamation marks or emoji. UPPERCASE appears only in mono chrome. § numerals are in accent. Figure plates have mono bars and a blueprint ground and no shadow. Widgets and checks carry the hard offset shadow. Status words always come with a colour. The page follows §2.1 (pain from three sources, including management analogy A1), §2.2 (no Kubernetes), §2.6 (term after the thing), §2.7 (the conversation), §2.8 (retrieval opener) and §2.9 (owned misconceptions confronted). Its structure (hero meta row, rail, recap, Sources, fiction note) matches Ch 1.

## Findings

### new
severity: should
criterion: clarity of interaction; ux-ui §9 (keyboard)
location: widget w-samecode, two-column layout (container ≥ 700px; `ws--two`), states 1 and 2; `panel()` in `site/widgets/w-samecode/index.js` (`var after = two ? left : right;`)
evidence: At 1280, a keyboard probe pressed Enter on k-02 option A. Focus moved to `.cp-feedback`. The next Tab presses went to "Why the other answers miss", then to **k-04's option A, outside the widget**. "Next: pack it in an image" sits in the left column (`.ws-left`), which comes before the check card in DOM order, so forward Tab never reaches it. At 360 (one column) the order is correct: feedback → summary → Next. A keyboard or screen-reader user at desktop widths who tabs forward leaves the widget after k-02 and misses states 2–3, which carry o-1's key case. The same happens after k-03 for "Build fennel-app:v43…".
expected_fix: Make "Next" reachable by forward Tab from the feedback at every width. Either (a) in two-column mode, also render the follow-up and the Next button at the end of `.ws-right` (after the feedback) and drop them from `.ws-left`; or (b) keep the visual position but, after a commit, move focus to the feedback and give Next a DOM position after the check card (CSS grid placement can keep it in the left column visually). Re-probe: at 1280, Enter on an option, then Tab, Tab should land on Next.

### new
severity: should
criterion: mobile UX; plan w-samecode `size:` (reserve 960px at 360, "report if it exceeds 960 by more than 10%"); Ch 1 lesson in the brief (widget heights far beyond the reservation at 360)
location: widget w-samecode at < 600px; `reserve()` in `index.js`; screenshots `run/screenshots/probe/pux-w390-light-w-s1.png`, `pux-w390-light-w-s3.png`
evidence: The measured widget height is 1742px at 360 and 1666px at 390, 81% above the plan's 960. The tallest form is state 1 after a wrong pick, with feedback, TRY AGAIN, follow-up and Next; panels measure 1634px at 360. Every state reserves that height, so in state 1 before any answer there is about 550px of empty bordered frame under the check (panel 1196px vs 1742px). In state 3 there is about 600px of empty frame under the summary line, and the reader has to scroll through it to reach § 03. It reads as an unfinished or broken box at the point where the reader should move on. At 1280 the height is 952px with little dead space, which is fine.
expected_fix: Reduce the tallest phone state rather than drop the no-reflow rule (ac-07). Options, cheapest first: (a) under 600px, show the category line once per group, as Ch 1 does (LIBRARIES & TOOLS currently repeats on two rows), and put each SAME / DIFFERENT marker on the label line, so the table loses about 4 lines; (b) put the state-1 follow-up "Can't reproduce" inside production's result cell as a tag, as state 2 does with "caught before release", instead of a separate paragraph; (c) in state 3, fill the space with content that earns it, or end the state with a bottom-aligned "Continue to § 03 ↓" link so the empty frame has a visible exit. Report the new height at 360. If it is still far above 960, the designer or user decides whether the stacked-height rule should give way on phones, where `scrollIntoView` already puts each new state's header at the top.

### new
severity: should
criterion: misconception handling (m-01); learning-science audit (Constructive commitment, not recognition)
location: s-04 paragraph 2 ("Running an image gives you a container: the app running as a process, walled off by the operating system so that it has its own files, which come from the image…") vs k-05 option C ("A walled-off process: it carries the app's own files but uses the machine's operating system core.")
evidence: s-04 defines a container about 30 lines earlier, and k-05's correct option repeats that definition almost word for word ("walled-off", "process", "its own files"). A reader who still holds m-01 can pick C by matching the phrasing, so their "small VM" belief is never shown failing, and A's feedback, which does the confronting, is never seen. The confrontation then rests on f-02 alone. A is at least as plausible to the target reader as C on its merits, so the wording cue does decide the item.
expected_fix: The check text is final per the approved mockup, so this needs the designer or user. Either (a) re-word k-05 C so it doesn't repeat s-04's wording (for example: "An ordinary running program, fenced off from its neighbours, with no operating system of its own"), or (b) change the s-04 sentence so it no longer gives away k-05's answer: keep "the app running as a process" and move "walled off… its own files" to after k-05's reveal in s-05. Option (b) touches only builder prose, but it moves plan content between segments, so get the designer's sign-off.

### new
severity: nit
criterion: clarity of interaction; ux-ui §9 (keyboard focus)
location: page checks k-01, k-04 to k-07; `setupChoice()` in `site/assets/page.js`
evidence: After Enter on a page-check option, focus falls to `<body>` because every option becomes `disabled` (probe at 1280 and 360: "k-04 after Enter focus: BODY"). The next Tab does reach TRY AGAIN, and the feedback is `role="status"`, so screen readers hear it. The widget's own checks already move focus to the feedback. Ch 1 behaves the same way.
expected_fix: Give `.cp-feedback` `tabindex="-1"` and focus it (`preventScroll: true`) after a pick, the same pattern as the widget's checks. Optionally carry the fix back to Ch 1's `page.js` in a later pass (not in this run).

### new
severity: nit
criterion: visual consistency and polish
location: w-samecode states 2–3 (code row inside the IN THE IMAGE band); w-samecode row categories
evidence: (1) In states 2 and 3 the code chip (c1-soft fill, c1 stroke) sits on the c1-soft image band, so the code row loses figure-ground against its band. The other rows' c2 chips stand out (`pux-w1280-light-w-s3.png`). (2) The category line repeats on every row ("LIBRARIES & TOOLS" twice), where Ch 1's stage 4 shows each category once over its group (`ch-01…/pux-w1280-light-s4-widget.png`).
expected_fix: (1) Give `.ws-band--image .ws-chip--c1` a `--surface` fill, keeping the c1 stroke, as the band's `cp-img` chip already has. (2) Show each category once per group, as Ch 1 does (this also serves the height fix above).
