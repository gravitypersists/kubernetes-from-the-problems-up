# Handoff 06 → pedagogy-ux-reviewer (merged-r1)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/pedagogy-ux-reviewer.md`. This file is your task.

also_accuracy: true

You are the only reviewer of this run (user decision d-09), so you also cover factual accuracy against `facts.md`, following the accuracy part of your role file. Use finding IDs and severities as the review template says; mark accuracy findings clearly as accuracy.

## Original request (verbatim)

> Let's start ch 3 now, notes from the last run "
> Ch 3 is next. Its entry already has the retrieval opener, the instruction to place Docker, and the note to reuse Ch 2's container drawings for its placement widget."

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Round-1 review (pedagogy, UX and accuracy) of the built Chapter 3 page ("Many containers, many machines: the orchestration problem") of the course "Kubernetes for Technical Managers", against the brief and the approved learning plan (its acceptance criteria included).

- **Scrollytelling §02** (`w-fleet-scrolly`): scroll all three lanes forward and back, commit right and wrong answers to k-02, k-03 and k-04, by mouse and keyboard, at 1280px, 360px and a short landscape viewport, both themes, and with reduced motion. Check that the gates, sticky canvas, scrolling back, and heights behave as the plan and CURRICULUM.md §8 steps 5–6 say, and that no step gives away a check's answer before it is committed.
- **Style:** check the page against the Control Plane style guide (`design/control-plane/`: README.md voice/colour/type/space/figure/widget rules, tokens.json usage notes, components/), per CURRICULUM.md §8 step 4, including the new term-card convention.
- **Course principles:** CURRICULUM.md §2 as it applies to Ch 3, including §2.2 (Kubernetes named only after the jobs list) and §2.11 (cast strip, "I didn't read the last chapter" disclosure). Check the vocabulary guard in the plan's `## Shape` (no Ch 4+ terms in reader-visible text).
- **The user's own review standards** (`/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/human-review.md` and `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/human-review.md`): these are the user's taste and the bar this page will be judged by. Check especially for imprecise language (sentences whose referent the reader has to guess, slogan lines, "the picture" without saying which, two things equated in one breath), split-attention sentences that send the reader to a label in a figure, pedantic caveats in the body that belong in a disclosure, analogies that aren't really analogies or repeat what was taught, and think-then-reveal prompts that don't state their own question. Quote the offending text.
- **Accuracy:** every factual claim on the page (prose, figures, disclosures, check feedback, lane text in `site/widgets/w-fleet-scrolly/data.js`) against `facts.md` and the Ch 1/Ch 2 facts it references. Web-verify any core claim that `facts.md` doesn't support, especially Kubernetes history (Borg, Omega, 2014 launch, CNCF, 2022 runtime change) and Docker's relation to Kubernetes. Check that check answers are correct and distractors are actually wrong. Fennel facts are fiction (approved d-04) and need no source, but must not be presented as statistics.
- **Time:** the budget is 15 minutes of reading plus interaction. Report your estimate for the built page and, if it is over, which parts cost the most. Don't cut anything yourself.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/learning-plan.md`, `cut-list.md`, `mockup.html` (approved; mockup prose was a draft, its check text final)
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/facts.md` (and the Ch 1/Ch 2 `facts.md` it references, in `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/` and `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/`)
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/` (index.html, assets/, widgets/)
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/screenshots/page-round-4/` (gate screenshots)
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/decisions.md`
- `/Users/m/workspace/k8s-course/design/control-plane/` (README.md, tokens.json, components/)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §2, §3, §5, §6, §7 Ch 3 entry, §8 steps 4–6. For cross-chapter consistency, compare with Ch 1 as built (`/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/`); Ch 2's site is being rebuilt by another agent right now, so if you compare with it, use commit b661656 (`git -C /Users/m/workspace/k8s-course show b661656:<path>`).

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/review/round-1/pedagogy-ux.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`), covering accuracy as well
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/screenshots/probe/` if you probe
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace

## User decisions that apply (quoted from run/decisions.md)

- d-01: "15 minutes (Recommended)" → the time budget is 15 minutes of reading plus interaction.
- d-03: "…review if the widget is serving a pedagogical need or if we're unnecessarily increasing cognitive load when a scrollytelling portion of the article would do better at showing stages of progression." → §02 is scrollytelling; judge whether it delivers on that concern (load, clarity of the progression).
- d-04: "Yes, use them" → approved Fennel story facts (fiction).
- d-06: "Approve" → the revised plan is the approved spec.
- d-07: "Accept (Recommended)" → the reader makes Sam's key decisions (k-02, k-03, k-04) rather than placing by hand; o-1 reads "having made the key decisions themselves".
- d-08: "R13 scrolly pattern, R14 term card, R15 jump-ahead opening" → course conventions in CURRICULUM.md §2.11, §8 steps 4 and 6.
- d-09: "Extend 25 min" → one merged review round, one fix round, no closure round. Prioritise: be clear about what is blocking.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] The page, all checks and all three lanes have been exercised at desktop, 360px and a short viewport, both themes; findings written with severity (blocking / should / nit), location and expected fix.
- [ ] Every factual claim has been checked against facts.md or the web; accuracy findings included.

## Not your job

- Fixing anything in `site/`; editing the plan or the curriculum.
