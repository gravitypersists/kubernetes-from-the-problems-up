# Pedagogy & UX review: round 1

## Summary
A strong, faithful build. Nothing blocks. The plan is all there: four stages of w-rebuild, nine checks that each commit before they reveal, three figures, and three analogies, each with a line saying where it breaks. All 18 acceptance criteria are met, two with caveats. Misconceptions m-19 to m-22 are each stated fairly, shown failing and corrected. The widget works by mouse, keyboard and touch, at 1280, 768, 390 and 360, in light and dark, and with reduced motion. The most important issues:
1. In every single-answer check the correct option is the longest, so the checks can be gamed.
2. k-02's prompt asks what is needed "to order and get a confirmation email", then marks the photo tool and the log-cleanup job as missed.
3. On phones, "Next: rebuild it" lands with the new machine below the fold.

Estimated time is about 17 minutes against the 12-minute budget (see Time).

## Scores
- acceptance criteria: 4. All 18 met. ac-09 holds once you've scrolled, but the landing position after "Next" hides the effect. ac-14 holds, but f-03's timeline contradicts "snapshot every night".
- cognitive load fit: 4. Pre-training (s-02, stage-1 categories) and the aligned stage-4 rows keep the hardest moment at about 3 elements. Stage 4 is dense but well chunked.
- engagement where intended: 4. The reader predicts, steps, predicts, diagnoses and compares at the core idea, and k-05 to k-09 rehearse the conversation. Option-length cues weaken retrieval in five checks.
- misconception handling: 5. m-19 to m-22 are each stated fairly and shown failing (identical code with broken features; notes that ran cleanly yet missed three things). Each keeps its honest partial truth: more disk postpones the failure, snapshots really do speed recovery, runbooks really do help.
- split attention and redundancy: 4. Labels sit on their referents throughout. The prose before each check repeats the check's own prompt (k-01, k-06, k-07, k-08), and stage 1 is introduced three times.
- mobile UX: 4. No horizontal scroll, text 13px or larger, taps 44px or larger, and stage changes don't move the content below. The landing after "Next: rebuild it" hides the machine, and the widget reserves about 1,500px at 360.
- clarity of interaction: 4. Interactive elements are clear and the FAIL rows read as buttons. The "why" and "All six notes" disclosures have no disclosure marker and look like static labels.
- visual consistency and polish: 4. Control Plane is followed closely: voice, status words plus colour, plates, offset shadows, sentence case, no exclamation marks. Polish nits: f-03's cramped desktop panels, IDENTICAL sitting in one column, and the warn colour used on a non-status label.

## Acceptance criteria (evidence)
- ac-01 met: s-01 opens with checkout errors, emails to Jordan and Sam unreachable. k-01 comes before "The disk had filled with log files". Probe shows the k-01 reveal is gated (pux-w390-light-k01.png).
- ac-02 met: f-01 has the NO ORDERS band from 18:12 to 19:55, the WHO column (SAM from 18:35 on), and the 23:00 row. The sources footer says Fennel's times are fiction.
- ac-03 met: f-02 labels "process: the code, running" and "deploy: copy new code, restart the app", and the `dfn`s follow the figure. A grep finds no container, image, registry, orchestration, Kubernetes, cluster, node or pod (the image tool was renamed "photo-resizing tool").
- ac-04 met: probe shows "Reveal" disabled with 0 picks and enabled after one. The reveal shows 7 items under RUNTIME, LIBRARIES & TOOLS, CONFIG and DISK & DATA (plus CODE), 8 "without it" lines and 5 "You missed this" tags for a 2-card pick.
- ac-05 met: in stage 2, Sam's server reads "Still running (hidden for now)". Each step is marked DONE, and the new machine shows only rows the notes installed. "Run launch checks" is absent until k-03 is answered.
- ac-06 met: exactly the photo and email checks FAIL. Compare stays absent after one diagnosis and appears after both. Choosing "The code" gives "The code is identical on both machines, so it can't be the difference."
- ac-07 met: rows are aligned, the code row reads IDENTICAL, and each missing row has its added line and consequence. The log-cleanup callout reads "No check caught this one…". The holiday-sale row reads UNKNOWN with Sam's quote (pux-w1280-light-s4-widget.png). See the nit on IDENTICAL's placement.
- ac-08 met: every status is a word plus colour. The aria-live region announces picks, steps, checks and diagnoses ("Started over. Stage 1 of 4…"). Under reduced motion all five checks are present within 200ms. "Start over" returns to stage 1 with 0 picks, by mouse and by Shift+Tab then Enter.
- ac-09 met, with a caveat: no overflow at 360 or 390, the smallest text is 13px, no tap target is under 44px, and the content below the widget doesn't move on any stage change at 1280, 768 or 360. It moves only when the reader opens an optional "why" disclosure. The step card and the machine rows fit in one viewport once scrolled, but you land without the machine in view (finding below).
- ac-10 met: dependency, drift and snowflake server each appear once as a `dfn` after the widget, pointing back to the photo uploads, the May/August/Friday changes and the holiday-sale setting. "Nobody has to be careless for it to happen."
- ac-11 met: A1, A2 and A3 each have a WHERE THIS ANALOGY BREAKS line in the same aside.
- ac-12 met: k-05's A covers the code and B covers the notes. Both feedbacks cite the reader's own rebuild, and the prose after k-05 states the two factors.
- ac-13 met: k-06 A's feedback admits postponement and names one machine and the rebuild problem. The prose says "the price climbs steeply".
- ac-14 met: the VM is defined before k-07, and k-07 B and f-03 keep the fast restore. f-03 panel 3 shows "new email setting: MISSING". See the timeline finding.
- ac-15 met: B contains the question verbatim. A's feedback gives "roughly three times faster" and "no playbook is a substitute for engineers". No MTTR or RTO appears (but see the SRE nit).
- ac-16 met: no RTO, MTTR or SPOF. "Single point of failure" appears once, spelled out (k-06 B feedback).
- ac-17 met: the recap ends on "how do you ship all of it?" and doesn't answer it.
- ac-18 met: every choice commits before it reveals, there's no scoring, and each option has a "why" (the non-picked ones sit behind a disclosure; see the affordance finding).

## Time (information, not a finding)
Estimate: about 17 minutes (15 to 19), against the 12-minute budget. The gate's 11.3 minutes counts the page prose only. Here's the arithmetic: about 2,040 words of prose and asides, about 380 words of check prompts and options, about 250 words of feedback read, and about 650 words of widget text come to about 3,300 words, or about 14.5 minutes at 230 wpm. Taps and commit time in the widget and the checks add about 2.5 minutes.

The parts that cost the most:
- w-rebuild: about 4.5 to 5 minutes.
- s-06: about 3 minutes (two long-option checks with feedback of about 370 words, f-03, and A3).
- s-04: about 2 minutes (about 420 words).
- s-01: about 2 minutes (the timeline plus k-01).
- s-05: about 1.7 minutes. Its two asides (156 words) are longer than its prose (131 words).

The cut list's first three items (the Fowler aside, k-09 and A2) would save about 1.5 minutes. The hero meta and the rail both say "12 MIN", so update them to whatever the final length is.

## Findings

### new
severity: should
criterion: engagement where intended / ac-18 (checks must require retrieval)
location: k-03 (widget data.js), k-05, k-06, k-07, k-08 (index.html s-05, s-06, s-07)
evidence: In all five single-answer checks the correct option is the longest and the only hedged "X, but Y" option. It is never option A. Word counts by option: k-03 A 9 / B 5 / C✓ 13; k-05 A 11 / B 13 / C✓ 19; k-06 A 11 / B✓ 19 / C 9; k-07 A 12 / B✓ 32 / C 14; k-08 A 10 / B✓ 21 / C 12. Every distractor is an extreme ("All of them", "None", "No better than today", "Yes. Same code…"). A reader can score 5 of 5 by picking the long, nuanced option without reasoning about the content, which empties the predict-then-reveal confrontations of m-20 to m-22.
expected_fix: Balance the options. Give each distractor the same length and the same "partly right" shape as the key. For example, k-07 A could become "Click a button for a new VM and restore last night's snapshot; it comes back exactly as it was, so nothing is lost." Shorten k-07 B to about 15 words and move the caveats into its feedback. Put the key at A in at least one check. Check text was approved as final at d-03, so raise this with the user at the next checkpoint.

### new
severity: should
criterion: misconception handling / check validity (k-02)
location: w-rebuild stage 1, k-02 prompt (data.js `k02.prompt`) and feedback (`k02.picked`, `k02.missedText`)
evidence: The prompt reads "what has to be on this machine for a customer to order and get a confirmation email?" Neither the photo-resizing tool (staff uploading product photos) nor the nightly log-cleanup job (needed months from now) is needed for a customer to order and get an email. A reader who reasons carefully from the prompt leaves those two unpicked and is then told "You missed this … the site needs every one". The check punishes careful reasoning at the moment that sets up o-1.
expected_fix: Widen the prompt to match the answer key, for example: "Besides the code, what's on this machine that the site needs to keep working? Tap everything you think is there, then reveal." Alternatively, keep the prompt and change the feedback line to "…and the site needs every one, some of them for things beyond ordering (product photos, keeping the disk clear)." Either change touches approved check text, so raise it with the user.

### new
severity: should
criterion: mobile UX / ac-09 (controls and effect visible together)
location: w-rebuild, stage 1 → stage 2 transition at < 600px (index.js `goStage` / `render` focus with `preventScroll:false` on `name2`)
evidence: At 390×800, after tapping "Next: rebuild it" the page lands with the stage name at 403px. The step card is at 572 to 714px and the new machine starts at 799px, below the fold (probe span.mjs; pux-w390-light-s2-step3.png shows the step card with no machine in view). The first "Run step 1 of 6" adds the machine frame off screen, so a novice sees only the card text change. Once the reader scrolls the step card to the top, card and rows fit together. At step 3 the card top to machine bottom is 510px (pux-w360x640-s2-step3-cardtop.png), and the newest rows stay in view at 360×640.
expected_fix: On stage change under 600px, scroll the stage header to the top of the viewport (`scrollIntoView({block:'start'})` on the panel or `.wr__head`), not focus-centred. Also consider moving the "All six notes" disclosure below the machine, so the step card sits directly above the rows as the plan specifies ("the current notes step sits directly above (mobile)… the machine rows").

### new
severity: should
criterion: misconception handling (m-22) / internal consistency of f-03 with k-07
location: s-06, f-03 (index.html `#f-03` panel labels "1 · Mon 01:00", "2 · Wednesday", "3 · Friday")
evidence: The prose and k-07 set up "a snapshot of its disk taken every night", and k-07 B says "Restore last night's snapshot". f-03, though, restores a Monday 01:00 snapshot on Friday and loses Wednesday's fix. With nightly snapshots, Friday's restore would come from Thursday night and keep Wednesday's fix. A careful manager will notice. The figure also overstates staleness (days instead of under a day), which works against the honest partial truth the plan wants kept.
expected_fix: Keep the story inside one day. For example: "1 · 01:00 nightly snapshot taken", "2 · 15:00 Sam changes the email setting by hand", "3 · 22:00 the VM dies; restore last night's snapshot", with panel 3's note "Back in minutes. This afternoon's fix is gone." Alternatively, say explicitly that the snapshot in the figure is weekly. Prefer the first option, because it matches k-07. Flag this to the accuracy reviewer too.

### new
severity: should
criterion: course design principle §2.6 / term ledger §5 (Ch 1 introduces "single point of failure")
location: s-06 (index.html, after k-06; currently only in k-06 option B's feedback)
evidence: CURRICULUM §5 now lists "single point of failure" as a Ch 1 term, and Ch 3 and Ch 4 will rely on it. On the page it appears only in k-06 B's feedback ("It's still a single point of failure…"). A reader who picks A or C sees it only by opening the collapsed "What the other answers say". The concept is in A's feedback ("Everything still runs on one machine, so any problem with it takes the whole site down"), but the term is not reliably introduced.
expected_fix: Name it once in prose after k-06, pointing back to Friday. For example, in the "Bigger machines also run out" paragraph: "Engineers call a machine like this a single point of failure: when it breaks, everything breaks." Keep k-06 B's feedback as it is. Spelling it out once in prose is consistent with ac-16.

### new
severity: should
criterion: clarity of interaction (every interactive element signals it is interactive)
location: `.cp-why summary` (assets/page.css:312), `.wr-all summary` (widgets/w-rebuild/index.css:221), `.wr-m__more > summary`
evidence: These summaries use `display:flex`, which removes the native disclosure triangle, and no replacement marker exists (a grep for marker or summary pseudo-elements finds none). "WHAT THE OTHER ANSWERS SAY", "WHY THE OTHER ANSWERS MISS" and "ALL SIX NOTES" render as bold mono labels, indistinguishable from headings (pux-w1280-light-s2-k03-wrong.png, pux-w360-dark-rm-s2-step6.png). The why-disclosures hold the explanations of the other options that ac-18 relies on, and readers who answer correctly won't know they're there.
expected_fix: Add a visible marker that flips when open, for example `summary::before { content: "▸"; margin-right: var(--sp-1) }` and `details[open] > summary::before { content: "▾" }`, using ink, not accent. Optionally underline the summary as "Start over" is underlined, so it reads as a control.

### new
severity: nit
criterion: split attention and redundancy
location: s-01 before k-01, s-06 before k-06 and k-07, s-07 before k-08 (index.html)
evidence: Each check's prompt repeats the sentence just before it. s-01: "Nobody has touched Fennel's code since Tuesday…" is followed by k-01: "Nobody has changed a line of Fennel's code since Tuesday…". s-07: "The Monday after the outage, Sam raises it with Jordan. 'We should keep a runbook…'" is followed by k-08: "The Monday after the outage, Sam says: 'We should keep a runbook for the server.'" The same happens for "After Friday… Morgan" before k-06 and "Sam has a different idea: move Fennel onto a virtual machine at a cloud provider" before k-07.
expected_fix: The check text is final, so trim the lead-ins instead. Cut "Here's the strange part. Nobody has touched…" to "Here's the strange part." Cut "The Monday after the outage, Sam raises it with Jordan." and keep the quote. Start the s-06 lead-in with "After Friday, everyone reaches for a fix." without naming Morgan's offer.

### new
severity: nit
criterion: split attention and redundancy / clarity
location: w-rebuild stage 1 (s-03 intro paragraph, `stages[0].name` and `lead` in data.js)
evidence: Stage 1 is introduced three times: the prose ("Below is Sam's server as most people picture it: the code, running."), the stage name "SAM'S SERVER", and the lead "Sam's server, as most people picture it.". After the reveal the lead still says "as most people picture it" while the machine shows all eight rows.
expected_fix: Give the stage a name that states the task, for example "What's on Sam's server". Swap the lead after the reveal to something like "Sam's server, as it really is." Alternatively, drop the phrase from the prose paragraph.

### new
severity: nit
criterion: visual consistency and polish / ac-07 (IDENTICAL "on both")
location: w-rebuild stage 4, code row (`.wr-cmp__st--span`)
evidence: IDENTICAL renders as a chip under the SAM'S SERVER column only, with the NEW MACHINE column empty (pux-w1280-light-s4-widget.png, pux-w768-s4-table.png). It reads as a value for Sam's server alone. The plan says "reads IDENTICAL on both".
expected_fix: Make the cell span both status columns visually (`grid-column: span 2` and centre the chip across them), or show IDENTICAL in each column.

### new
severity: nit
criterion: audience fit (unglossed jargon)
location: k-08 option A feedback (index.html s-07): "Google's SRE team found…"
evidence: "SRE" is an unexplained acronym for a reader who has never operated infrastructure. ac-15 and ac-16 ban MTTR, RTO and SPOF in the same spirit.
expected_fix: Write "Google's site reliability engineers found…", or "Google's operations engineers found…".

### new
severity: nit
criterion: visual consistency and polish (Control Plane colour rules)
location: `.cp-aside .cp-breaks b { color: var(--warn) }` (assets/page.css:94); f-03 panels at ≥ 900px
evidence:
- The style guide says status colours "always travel with a word (CORRECT, NOT QUITE, PENDING)". Here `warn`, which means UNKNOWN in f-03 and the widget, colours the decorative label WHERE THIS ANALOGY BREAKS. Separately, a 1280 viewport over s-03 shows the accent four times (§ numeral, the W-01 lamp, the PREDICT chip, TRY AGAIN), against the "at most once per viewport" guidance.
- In f-03 at 1280, the three panels are narrow enough that "hand-made, not in notes" wraps to three mono lines inside the hot row, and the context rows at 40% opacity are hard to read (f03 at 1280 in the gate screenshot).
expected_fix:
- Colour the breaks label `ink-3` or `ink`, not `warn`.
- Optionally make the stage-internal PREDICT chips outlined rather than filled.
- In f-03, put the tag on its own line under the row label, or shorten it to "by hand", and raise the context opacity to about .55.

### new
severity: nit
criterion: mobile UX
location: w-rebuild at < 600px (reserved height via stacked panels plus `holdHeight`)
evidence: At 360 the widget is 1,491px tall from load (1,543px once a why-disclosure is opened). In stage 1, about 470px of the panel below the machine is empty (gate w360.png, the crop around the widget), so the reader scrolls through blank space to reach s-04. The plan estimated about 820px.
expected_fix: Optional. Reduce the tallest stage at narrow widths, for example by folding stage 4's "In the notes · step n" meta into the row, or by collapsing the PRESENT/PRESENT rows behind "Show the 4 rows the notes covered" so stage 4 shows the gaps first. That lets the reserved height come down without reintroducing reflow.
