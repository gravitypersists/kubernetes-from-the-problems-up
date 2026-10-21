A comprehension check: a labeled card with a question, large option buttons and inline feedback.

**Provide:** the mode (`PREDICT` before the explanation, `EXPLAIN` after it, `APPLY` on a new scenario), a position (`CHECK 02 / 04`), the question, 3–4 options with one marked correct, and a feedback sentence per option that says *why*.

**Markup:** `section.cp-check` > `.cp-check__head` (`span.cp-chip`, `--explain` or `--apply` variants), `p.cp-check__q`, `ul.cp-options > li > button.cp-option` (`.cp-option__key`, text, `.cp-option__tag`), `div.cp-feedback[role=status]`.

- On answer: disable all options, mark the chosen one `is-right` or `is-wrong`, also reveal the right one with an `ANSWER` tag, and show feedback led by `CORRECT` or `NOT QUITE`.
- Wrong answers get a `TRY AGAIN` link that resets and refocuses the first option.
- Status is always a word plus colour plus a 3px border — never colour alone.
- Feedback explains the misconception behind the wrong option, not just the right answer.
- Don't grade or score; checks are for the reader, not a quiz.
