status: done

Below 600px the widget no longer reserves its tallest state, so P-02 is closed and the gate passes. Heights at 768 and 1280 are unchanged.

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/widgets/w-samecode/index.js: `reserve()` now returns early under 600px. It clears the states-area min-height and reserves nothing. The header comment states the course rule (CURRICULUM.md §8 step 5).
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/widgets/w-samecode/index.css: one rule, `.ws--narrow .ws-panel:not(.is-on) { display: none; }`. The hidden states no longer share the grid cell, so each state takes its own height.
- Gate: /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/gate/w-samecode-round-6.json (PASS at 360, 768 and 1280)

summary: Under 600px each state is now only as tall as its content, and an answer grows the widget the way page checks do. The scroll-to-header on a state change still works: after Next and after Start over, the state header sits at 24px from the top of the viewport. At 600px and wider, nothing changed. No text or other layout changed.

Widget heights at 360px (measured):

| State | Before an answer | After a wrong pick (TRY AGAIN shown) | After the right answer |
|---|---|---|---|
| 1 | 1240 | 1682 | 1661 |
| 2 | 1246 | 1674 | 1653 |
| 3 | 1177 (no check) | — | — |

- Start over returns state 1 to 1240.
- Before this change, every state at 360 was a constant 1682.
- At 320 and 360, in every state, nothing overflows, no text is under 13px and no tap target is under 44px. There were no console errors.

768 and 1280 are unchanged: 1045px and 1001px, the same in every state and answer.

concerns:
- none

relaxed:
- ac-07's "state changes never move the content below the widget" no longer holds below 600px, by user decision d-08 and the course rule in CURRICULUM.md §8 step 5. It still holds at 600px and wider.

dispositions:
- P-02: fixed. Phones now follow the course rule. Each state takes its own height (1177–1682px, table above), and the scroll-to-header is kept. 768 and 1280 still reserve the tallest state, unchanged at 1045 and 1001px.
