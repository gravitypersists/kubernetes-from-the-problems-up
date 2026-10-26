# Handoff 11 → instructional-designer (human-review-replan)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.agents/skills/didactician/agents/instructional-designer.md` (its "Revisions" section applies). This file is your task. You are a fresh designer (a respawn: the designer of handoff 02 was in an earlier session). Its report, `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/handoffs/02-instructional-designer.report.md`, and the current plan tell you what was decided and why.

## Original request (verbatim)

> we'll want to perform the human review as a formal check from now on. In fact, I'd like to revert ch 5, 6 and 7 back to the human review step.

> okay, let's open chapter five in review mode

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.agents/skills/didactician`

## Task

The chapter is built and shipped once. The user has now reviewed the built page (§01–§07) and left 42 comments. Most are wording and layout, and a builder will fix those after you. **Your job is the part that changes the plan**: revise `learning-plan.md`, `cut-list.md` and `mockup.html` so the builder has a plan that matches the user's decisions. Don't rewrite segments the comments don't touch.

The user's comments are in `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/review/human-site-1/comments.md` (numbered `#1`–`#42`; the same numbers are findings `H-01`–`H-42` in `run/review/human-site-1/findings.md`). Read all of them: together they say a lot about what the user wants from this chapter's prose. Quote them; don't paraphrase them into your own words.

### 1. Drop s-06, node pools (d-12, from #37)

- Remove s-06, f-03 and k-06 from the plan. Narrow o-1 so it no longer includes "what node pools add"; re-check o-1's checks list and the acceptance criteria (ac-13 goes).
- Remove node pool from the vocabulary guard's "introduces" list; "node pool" is now never in the body.
- The sandbox's "`orders` past 13 GB" case lost its answer with s-06. Decide what the page now says when one Pod outgrows a node: a Pod that can never be placed waits forever. The user expects "a bigger node", so say that plainly, in words, without introducing pools.
- Update the minutes table (about −1.75 min), the cut list (item 2 is gone; renumber), and the `## Curriculum recommendations`: CURRICULUM.md already moved node pools to Ch 8 (§7 Ch 8 entry, the §5 ledger), so say what Ch 8 can reuse from your cut s-06, f-03 and k-06, and drop any recommendation that assumed s-06.

### 2. The loop lens wording (d-11, from #6 and #10)

The course-wide wording in CURRICULUM.md §2.3 is now: "which loop is it, what does it want (the desired state), what does it see (the real state), and what does it do when the two differ?" (short form unchanged: which loop · wants · sees · does). Update every place the plan quotes or uses "what does it do about a gap", including f-06's table header or notes and any check that leans on the word "gap". The user found the old wording confusing twice: make the desired-versus-real comparison explicit wherever the lens is used.

### 3. Segment intents that the comments change

Revise the intent and claims of these segments; leave the exact wording to the builder, but say what each segment must and mustn't do:

- **Who adds nodes (#20).** The page says the five nodes exist "because of the requests". The user asked whether requests provision nodes, since the page hasn't taught that. Make it explicit in s-04 (and wherever it's implied) that people (Ari's team) rent and add nodes by hand, and the requests decide how many nodes they *need*; a loop that adds nodes is Chapter 8.
- **Room on purpose, s-05 (#35, #36).** The user's take, verbatim: "we need extra nodes in case one node goes down. The scheduler, when shifting the pods to other nodes, can run out of room on those nodes. The spare nodes are insurance for this reason." Rebuild s-05 around that. Losing a node is the reason; Friday is not. Keep it short.
- **Pods can use more than they reserve (#41).** The user was surprised in s-07 that a Pod can go over its request. Introduce it earlier, where requests are first explained (s-02 or wherever it fits naturally), in a sentence, so s-07 builds on it instead of revealing it. Make sure #38's "tedious" introduction of limits gets an intent the builder can write simply (#38, #39).
- **Repetition (#17, #31, #33, #34).** The user says the chapter repeats itself: stranded room is explained again after the widget shows it, and the end of s-04 rehashes details. Mark in the plan which segment owns each explanation (stranded room, reserved-but-unused, the room kept back for the system, the control-plane fee) and cut the repeats. #31 says the "how common is this" survey material must stay, attached to a much shorter paragraph. #32: the per-Pod billing paragraph is garbled and its value unclear: decide whether it stays, as at most one or two sentences, saying billing per Pod is an option and the lesson is the same.
- **Split attention (#2, #9, #13, #16, #35, #40, #11).** The user objects to references that make the reader recall something they don't need: a bare time ("03:04"), "moving day", "Chapter 3 kept its drawings clear", "Friday showed", "The second number in Fig. 04", widget IDs like "W-01" in prose. Add a rule to the plan's writing notes: refer to an earlier event by what happened ("when node 03 died"), not by a label; refer to the next widget or figure as "the following widget"/"the figure below", not by its ID; and cut back-references that don't help the point.
- **The sandbox, W-02 (#23–#30).** The user wants it reorganised: controls (memory requests, with `payments` added as an adjustable service) top left; outcome on the right, with the "Room for Pods on the rented nodes" bar under the right column; a "Reset" button at the top; the stats block (`Nodes 04 … Used at the rush 19.5 GB`) removed as noise; reserved vs used told apart without a label that shares the unused colour (label above or on the box border; overflow hatched); "used 2 GB at rush" in the rows. Update w-sizing-sandbox's spec, acceptance criteria and the mockup to match, and check that adding `payments` keeps the model's documented numbers true (requests as set: 4 nodes, 5 with the spare). Rewrite the paragraph that introduces it (#28): it shouldn't be "Ari's sizing sheet". **Accuracy caution:** the user suggested "the following widget simulates how the scheduler operates". The sandbox counts the nodes these requests need if Pods are packed as tightly as possible; the real scheduler by default spreads Pods (emptiest node first). Give the builder an intro that is close to the user's wording and still true, and flag the difference in your report so it can go back to the user.

Comments that are pure rewording (#1, #3–#5, #7, #8, #12, #14, #15, #18, #19, #21, #22, #27, #29, #42) are the builder's; don't plan them, unless one changes what a segment teaches.

Don't grow the chapter. The page read at about 26 minutes; the user said at the start of the run they'd judge cuts in review, and their comments mostly cut. Give an honest new minutes estimate.

## Inputs (read these; don't expect them pasted)

- `run/review/human-site-1/comments.md` and `findings.md`; the screenshot for #23 is in `run/review/human-site-1/shots/`
- `run/review/human-site-1/build/index.html`: the page exactly as the user reviewed it
- `run/plan/learning-plan.md`, `cut-list.md`, `mockup.html` (yours to revise)
- `run/brief.md` (Lessons section), `run/decisions.md` (d-10 to d-12 are new)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §2 (§2.3 has the new loop lens wording), §3 Ch 5 facts, the §7 Ch 5 and Ch 8 entries
- `run/research/facts.md` for any claim you rely on
- `site/widgets/w-sizing-sandbox/` (`model.js`, `data.js`) to check what adding `payments` does to the numbers

## Outputs (write only these)

- `run/plan/learning-plan.md`, `cut-list.md`, `mockup.html`, revised in place.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.agents/skills/didactician/templates/report.md`, with a `dispositions` line for every comment you acted on (by `#N`) and for d-11 and d-12.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver. (mobile: supported; no waiver.)
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine.
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed.
- I4: Finite animations longer than flair have a replay control.
- I6: Carousels don't change height (reflow) between pages.
- I7: SVG markers resolve and aren't clipped.
- I8: Each agent writes only in its namespace. Yours is `run/plan/`.

## User decisions that apply (quoted from run/decisions.md)

- d-10: "Finished with this review": the 42 comments are blocking findings H-01 to H-42.
- d-11: "Course-wide (Recommended)": the loop lens rewording above.
- d-12: "Move to Chapter 8 (Recommended)": drop s-06, f-03, k-06; narrow o-1.
- d-03 / d-04 (earlier): one chapter, no cuts at build; the user judges cuts in review. Their comments are that judgement.
- d-07: course widget height rule; sandboxes with controls at the top don't scroll their header to the top on change under 600px.

## Done when

- [ ] The plan, cut list and mockup reflect d-11, d-12 and the segment changes above, and every segment still cites its objectives and claims.
- [ ] w-sizing-sandbox's spec matches #23–#30, and the plan states whether the documented numbers still hold with `payments` adjustable.
- [ ] `python3 /Users/m/workspace/k8s-course/.agents/skills/didactician/scripts/check_plan.py /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run` reports no errors.

## Not your job

- Building the site or widgets, or final prose.
- Editing CURRICULUM.md (already done for d-11 and d-12), other chapters, `explainers/_pool/`, or anything outside `run/plan/`.
