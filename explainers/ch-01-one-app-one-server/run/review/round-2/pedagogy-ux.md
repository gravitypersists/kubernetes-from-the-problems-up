# Pedagogy & UX review: round 2

## Summary
Closure round. Of the twelve round-1 findings, ten are closed, one dispute is upheld (P-12), and one is still open (P-01). No regressions reach blocking severity, so there are no new findings. I drove w-rebuild end to end at 390 and 1280 in light mode and at 360 in dark mode, picking the tempting wrong answer once each in k-03 and k-04. I also answered k-05 to k-08 wrongly, opened their "why" disclosures and re-shot f-03. The most important open issue is P-01. Option lengths are now balanced and the keys sit at different letters, but in four of the five single-answer checks (k-03, k-06, k-07, k-08) the key is still the one measured option between an optimistic extreme and a pessimistic one. A test-wise reader can still pick it without reasoning.

## Scores
- acceptance criteria: 5. All 18 are met. ac-07 now shows IDENTICAL across both columns, ac-09's landing after "Next" puts the step card and the machine in view, and ac-14's f-03 is consistent with nightly snapshots.
- cognitive load fit: 4. Unchanged from round 1. The hardest moment (stage 4) is still about 3 interacting elements, in aligned, chunked rows.
- engagement where intended: 4. Commit-then-reveal everywhere. The length cue is gone, but the "pick the moderate option" cue still works in 4 of 5 checks (P-01).
- misconception handling: 5. m-19 to m-22 are still confronted fairly, and f-03 now supports m-22's honest partial truth without contradicting it.
- split attention and redundancy: 4. The lead-ins no longer echo the check prompts. Small leftovers: the s-07 pull quote is repeated in k-08's prompt (the recommended fix kept it), and "Sam's idea uses a different kind of server" now comes before Sam's idea is stated.
- mobile UX: 4. Stage changes land with the header at 24px and the step card directly above the rows. The reserved height still leaves about 470px of blank space below the stage-1 machine at 360 (accepted, see P-12).
- clarity of interaction: 5. Every disclosure on the page and in the widget now shows an ink ▸/▾ marker (r2-w390-s3-code-wrong.png, r2-w1280-k07-why.png, r2-w360-dark-k05-why.png).
- visual consistency and polish: 4. The breaks label is now ink-3, f-03 reads cleanly at 1280, and IDENTICAL spans both columns. A leftover nit: an inline TRY AGAIN makes the last line of feedback sit visibly lower than the others (r2-w1280-k07-why.png, r2-w390-s3-code-wrong.png).

## Acceptance criteria (evidence, changes since round 1 only)
- ac-07 met: "IDENTICAL" is one chip spanning the SAM'S SERVER and NEW MACHINE columns, centred (r2-w1280-s4-cmp.png, r2-w390-s4-cmp.png, r2-w360-dark-s4-cmp.png).
- ac-09 met: after "Next: rebuild it" at 360, `.wr__head` sits at 24px. At 390 the step card and the machine rows are visible together through step 4 without scrolling (r2-w390-s2-start.png, r2-w390-s2-step3.png). No overflow at 360 (scrollWidth 360). The widget reserves 1,491px at load and 1,502px at the end (holdHeight), so nothing below it moves.
- ac-14 met: f-03's panels are Thu 01:00, Thu 15:00 and Thu 22:00. Panel 3 shows "new email setting MISSING" and reads "This afternoon's fix is gone, and so are today's orders." (r2-w1280-f03.png, r2-w390-f03.png).
- ac-16 met: "single point of failure" is now spelled out as a `dfn` in the s-06 prose. It still appears spelled out in k-06 A's feedback. There's no SPOF, RTO or MTTR anywhere.
- ac-18 met: every choice still commits before it reveals, and each wrong pick shows NOT QUITE, the why, TRY AGAIN and the other answers' explanations.
- All other criteria: no change from round 1, and the probes found nothing different.

## Findings

### P-01
severity: should
criterion: engagement where intended / ac-18 (checks must require retrieval)
location: k-03 (widget data.js `k03.options`), k-06, k-07, k-08 (index.html s-06, s-07)
evidence: The length and position cues are fixed. Keys are now B, C, A, B and B (k-03, k-05, k-06, k-07, k-08). Word counts are close: k-03 14/11✓/12, k-05 18/19/17✓, k-06 17✓/17/16, k-07 18/18✓/19. Only k-08 is still noticeably longer (15/21✓/17), which ac-15's verbatim question forces. Picking the longest option now scores 1 of 5. The second half of the round-1 issue is still there: "Every distractor is an extreme." In k-03, A is "Yes…" and C is "No… it won't start" around B, "It will start, but some features…". In k-06, B is "All of them" and C is "None of them" around A, "It postpones this failure… but". In k-07, A is "back where it was" and C is "No better than today" around B, "back fast… but everything since is lost". In k-08, A is "no longer dependent on you" and C is "let's not spend time on it" around B, "Yes. And let's test it". The reasons attached to the distractors are now partly true, but their verdicts are still all-or-nothing, so "pick the hedged middle" still scores 4 of 5 without engaging with the content. Only k-05 resists it, because all three of its options share the same "As soon as… / Only after…" shape. k-03 A also reads as a constructed option ("same code and every step leaves nothing missing" is ungrammatical), which makes it easier to rule out. Probes: r2-w1280-s2-k03-wrong.png, r2-w1280-k07-why.png, r2-w390-k06-wrong.png, r2-w390-k08-wrong.png.
expected_fix: In at least two of k-03, k-06 and k-07, make one distractor a moderate-sounding wrong answer, so that the key is no longer the only hedged option. For example, k-07 A: "Restore last night's snapshot; it's an exact copy, so Fennel is back in minutes with nothing lost." That is a hedge-free overclaim that sits right next to the key. k-03 A: "Mostly. A few settings may differ, but nothing a customer would notice." Each existing feedback would need a matching line. This is round 2 of 2, so the call goes to the user. Leaving it as it is costs some of the retrieval value of the m-20 to m-22 confrontations. It doesn't break any objective.
status: still-open

### P-02
severity: should
criterion: misconception handling / check validity (k-02)
location: w-rebuild stage 1, data.js `k02.prompt`, `k02.picked`
evidence: The prompt now reads "Besides the code, what has to be on this machine for the Fennel site to keep working? Tap everything you think is there, then reveal." After a 1-card pick at 390, the reveal says "All seven are on Sam's server, and the site relies on every one: some today, one only when the disk next fills up." (r2-w390-s1-revealed.png). The answer now matches the question. The photo tool falls under "the site keeping working", and the log-cleanup job is explicitly marked as "only when the disk next fills up", so a careful reader isn't penalised.
expected_fix: n/a
status: closed

### P-03
severity: should
criterion: mobile UX / ac-09
location: w-rebuild stage 1 → 2 at < 600px
evidence: At 360×740 (dark), `.wr__head` is at 24px after "Next: rebuild it". At 390, the step card (STEP 1 OF 6 with its run button) sits directly above the "NO MACHINE YET" frame, both on screen (r2-w390-s2-start.png). At step 4 the card, the four installed rows and the disk bar all fit in one viewport (r2-w390-s2-step3.png). "All six notes" has moved below the machine.
expected_fix: n/a
status: closed

### P-04
severity: should
criterion: misconception handling (m-22) / f-03 consistency with k-07
location: s-06, f-03
evidence: The panels are "1 · THU 01:00 Last night's snapshot taken.", "2 · THU 15:00 Sam fixes something by hand." and "3 · THU 22:00 The VM dies; restore last night's snapshot." The note reads "Back in minutes. This afternoon's fix is gone, and so are today's orders." This matches "every night" in the s-06 prose and k-07 B (r2-w1280-f03.png, r2-w390-f03.png, r2-w360-dark-f03.png).
expected_fix: n/a
status: closed

### P-05
severity: should
criterion: course design §2.6 / term ledger §5 ("single point of failure")
location: s-06 paragraph after k-06
evidence: The prose now reads "Engineers call a machine like this a <dfn>single point of failure</dfn>: when something goes wrong with it, the whole site can go down with it." Every reader sees it, whichever k-06 option they picked, and it points back to Friday ("the real objection is Friday's").
expected_fix: n/a
status: closed

### P-06
severity: should
criterion: clarity of interaction
location: `.cp-why summary` (assets/page.css:321–324); `.wr-all summary`, `.wr-m__more > summary`, widget `.cp-why summary` (widgets/w-rebuild/index.css:297–308)
evidence: Every summary shows an ink ▸ that turns to ▾ when open. Seen in page checks (▾ WHAT THE OTHER ANSWERS SAY, r2-w1280-k07-why.png; ▸ in r2-w390-k08-wrong.png; dark mode in r2-w360-dark-k05-why.png) and in the widget (▸ ALL SIX NOTES, r2-w390-s2-start.png; ▸ WHAT THE OTHER ANSWERS SAY in k-04, r2-w390-s3-code-wrong.png). The marker is ink, not accent. The page and widget rules set the same pseudo-element, so only one marker renders.
expected_fix: n/a
status: closed

### P-07
severity: nit
criterion: split attention and redundancy
location: s-01, s-06, s-07 lead-ins
evidence: s-01 now ends "Here's the strange part.", s-06 opens "After Friday, everyone reaches for a fix." and the VM paragraph opens "Sam's idea uses a different kind of server." None of them restates its check's prompt any more. Two leftovers, below the bar for a new finding: "Sam's idea" now refers ahead to an idea first stated in k-07's prompt, and the s-07 pull quote is repeated verbatim in k-08's prompt (the round-1 fix said to keep the quote). If anyone touches s-06 again, "Sam has another idea, and it uses a different kind of server." would remove the dangling reference.
expected_fix: n/a
status: closed

### P-08
severity: nit
criterion: split attention and redundancy / clarity
location: w-rebuild stage 1 (`stages[0]`)
evidence: The stage name is now "WHAT'S ON SAM'S SERVER". After the reveal the lead reads "Sam's server, as it really is." (probe: `text:.wr__lead` → "Sam's server, as it really is."). The stale "as most people picture it" no longer sits over the eight-row machine.
expected_fix: n/a
status: closed

### P-09
severity: nit
criterion: visual consistency and polish / ac-07
location: w-rebuild stage 4 code row (`.wr-cmp__st--span`)
evidence: IDENTICAL is one chip stretched across both status columns and centred, at 1280, 390 and 360 dark (r2-w1280-s4-cmp.png, r2-w390-s4-cmp.png, r2-w360-dark-s4-cmp.png).
expected_fix: n/a
status: closed

### P-10
severity: nit
criterion: audience fit (unglossed jargon)
location: k-08 option A feedback
evidence: It now reads "Google's site reliability engineers found they made repairs roughly three times faster… the same engineers add that no playbook is a substitute for people who can think on the fly" (r2-w390-k08-wrong.png). There's no acronym.
expected_fix: n/a
status: closed

### P-11
severity: nit
criterion: visual consistency and polish
location: `.cp-aside .cp-breaks b` (assets/page.css:94); f-03
evidence: The WHERE THIS ANALOGY BREAKS label renders in ink-3 grey, no longer in warn amber, so warn now means only UNKNOWN (r2-w1280-aside.png). At 1280 the f-03 tag "hand-made, not in notes" sits in italic sans under the row label, on two lines. Context rows at 0.55 opacity are legible in light and dark (r2-w1280-f03.png, r2-w360-dark-f03.png). The optional point about how often the accent appears in the widget wasn't taken up. It was optional, so this doesn't keep the finding open.
expected_fix: n/a
status: closed

### P-12
severity: nit
criterion: mobile UX
location: w-rebuild at < 600px (stacked panels plus `holdHeight`)
evidence: The builder disputed this: three stages are close in height, so trimming stage 4's meta would save about 30px, and real savings would mean hiding rows, which d-07 rules out. My measurements at 360 agree: `.wr__stages` is 1,409px at load (stage 4 is the tallest) and 1,420px after stage 4. Stage 1 at 390 still shows blank space below the machine (r2-w390-s1-start.png), but nothing reflows, and ac-09's reserved height requires the space. The original fix was marked optional, and the remaining options cost content that the user chose to keep.
expected_fix: n/a
status: dispute-upheld
