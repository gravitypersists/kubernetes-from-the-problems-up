status: done

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/round-2/pedagogy-ux.md — round-2 Pedagogy & UX closure review. It's in the review format and `findings.py` parses it.
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/screenshots/probe/r2-*.png — round-2 probe screenshots: the widget end to end at 390 and 1280 (light) and 360 (dark), f-03, the k-05 to k-08 wrong picks with their "why" sections open, and the analogy aside.

summary: I closed out P-01 to P-12 against the builders' dispositions and the live site. I drove every widget stage at 390 and 1280 (light) and 360 (dark), picking the tempting wrong answer once each in k-03 and k-04, and I answered k-05 to k-08 wrongly. Results: 10 closed (P-02 to P-11), 1 dispute upheld (P-12), 1 still open (P-01). No new findings: the fixes caused no regression at blocking severity, there is no overflow at 360, and the browser logged no errors. All 18 acceptance criteria are met, including ac-07 (IDENTICAL now spans both columns), ac-09 (after "Next", the step card and the machine are on screen together) and ac-14 (f-03 now covers one day and matches nightly snapshots).

Most important issues:
1. **P-01 still open (should).** Option lengths are balanced and the keys now sit at B/C/A/B/B, so picking the longest option scores only 1 of 5. But in k-03, k-06, k-07 and k-08 the key is still the one hedged option between an optimistic extreme and a pessimistic one. "Pick the measured middle" still scores 4 of 5. Fix: in at least two of k-03, k-06 and k-07, make one wrong option sound just as measured. The review file has example text. This is round 2 of 2, so the user decides.
2. **P-12 dispute upheld.** At 360 the widget reserves 1,409px, and stage 4 is the tallest. The reserved height is needed so content below doesn't jump. Making it shorter would mean cutting rows, and d-07 rules out cuts.
3. **Small leftovers, below the bar for new findings:**
   - "Sam's idea uses a different kind of server." now comes before Sam's idea is stated.
   - The s-07 pull quote is repeated word for word in k-08's prompt.
   - An inline TRY AGAIN makes the last line of feedback sit noticeably lower than the rest.
   - k-03 option A is ungrammatical.

concerns:
- P-01 is a judgement call. The key being the measured option partly reflects the chapter's message that the truth is in between. I kept it at should because it weakens the predict-then-reveal moments for m-20 to m-22, but it breaks no objective.
- Dark mode was checked with my own Playwright script, because probe.mjs has no colour-scheme option. It's saved at /private/tmp/claude-501/-Users-m-workspace-k8s-course/f3623b92-32fe-48ad-bb93-c3a9e37c95b1/scratchpad/dark.mjs and writes only into run/screenshots/probe/.

relaxed:
- none
