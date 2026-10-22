# Handoff 03 → instructional-designer (revise-scrolly)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/instructional-designer.md`. This file is your task. This is a revision round of your own plan (handoff 02).

## Original request (verbatim)

> Let's start ch 3 now, notes from the last run "
> Ch 3 is next. Its entry already has the retrieval opener, the instruction to place Docker, and the note to reuse Ch 2's container drawings for its placement widget."

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Revise the plan per the user's checkpoint notes (d-03, quoted below). Two parts:

**1. Re-evaluate w-fleet against scrollytelling.** The user reviewed the built Ch 2 and found its multi-state "Same code, two machines" widget (a carousel-style, stepped widget) unclear and an unnecessary cognitive load; Ch 2 is being rebuilt by another agent as scrollytelling (a visual column showing the machines, a text column of steps, predict checks inline). The user asks you to consider the same here: decide whether w-fleet's three-phase hands-on widget serves a real pedagogical need, or whether a scrollytelling section showing the stages of progression (placing, a crash, a machine dying at 03:04, an update without downtime) would teach o-1 better with less load. Make the call on pedagogical grounds and state the rationale in `## Shape`, including what it does to CURRICULUM §2.1's "pain they feel in the page" (the chapter entry asks the reader to do the jobs by hand). Hybrids are allowed (e.g. scrollytelling stages with one or two committed predictions or choices in them, such as "where would you put `orders` now?"), as is keeping a reduced widget, as long as the choice is justified against the user's concern. Whatever you choose:
- the stages stay legible as a progression the reader can scroll back through;
- the six jobs are still named after the reader has met them (the debrief / think-then-reveal);
- re-check the hardest moment (phase 2) against the novice element limit;
- update the minutes table honestly, the cut list and cut order, the reuse notes for later chapters (Ch 4–8 may now reuse a scrollytelling figure, a data model, or nothing), the acceptance criteria and the mockup;
- update `## Curriculum recommendations` where they describe w-fleet (R5–R10, R13), so they match the new design. The user approved the new Fennel story facts (d-04); keep them unless the new design no longer needs one, and say which.

**2. Apply the general lessons from the user's Ch 2 human review** (`/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/human-review.md`; read it in full). Those that carry to this chapter:
- **Jump-ahead-friendly opening.** Give readers who skipped Ch 2 a simple disclosure ("I didn't read the last chapter, what happened?") and re-establish the cast at the start (Sam the founding engineer, Jordan the manager, plus anyone this chapter uses, e.g. Morgan, Riley).
- **No carousels or stepped panels that hide earlier states** where scrolling would show the progression.
- **Predict checks crisp.** Where a prediction is natural, ask it plainly; two options are fine when the real question is binary.
- **No split-attention sentences** that send the reader to a label inside a figure ("Those are the rows inside the … band").
- **Critical terms get flair**, more than a plain `<dfn>`: here orchestration / orchestrator, cluster and Kubernetes. Specify the treatment so the builder can carry it out within the style guide.
- **Pedantic caveats go in a progressive-disclosure note or go out** (the user found Ch 2's tags/digests caveat pedantic and confusing). Check every hedge and "one caution" in the plan against this; accuracy stays, but secondary nuance is disclosed on demand.
- **Analogies must be genuine analogies and must not repeat what was just taught**; otherwise delete them. Re-check A1.
- **Precise language.** No sentences whose referent the reader has to guess ("That one difference explains the rest"), no gnomic summary lines ("Containers and VMs are layers, not rivals" confused the user), no references to "the picture" or similar without saying which. This bears directly on s-06: "Docker and an orchestrator work at different layers" must be shown and said concretely, not as a slogan. Avoid equating two things in the same breath (the user flagged "the app" vs. "the container" in Ch 2).
- **Optional "we'll learn this later" notes** are welcome as progressive disclosure where a sharp reader will wonder (the user suggested one in Ch 2 about volumes, as a recommendation not an ask).

Ch 2's rebuild is in progress in parallel and its site may change; don't rely on its new scrollytelling existing. If you plan scrollytelling, specify the pattern fully here (desktop and 360px behaviour, how steps advance, where checks sit, replay or reduced motion if anything animates, I4) so the two chapters can converge later. Note in `## Curriculum recommendations` if you think a course-wide scrollytelling convention should go into CURRICULUM §8.

## Inputs (read these; don't expect them pasted)

- Your current plan: `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/` (learning-plan.md, cut-list.md, mockup.html)
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/human-review.md` (the user's Ch 2 review)
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/human-review.md` (the user's Ch 1 review; already reflected in the brief)
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/brief.md`, `run/research/`, `run/decisions.md`
- `/Users/m/workspace/k8s-course/CURRICULUM.md` (§2, §8 step 5)
- `/Users/m/workspace/k8s-course/.claude/skills/didactician/references/` (scrollytelling and widget guidance in `widgets.md`, `ux-ui.md`, `cognitive-design-patterns.md`)
- `/Users/m/workspace/k8s-course/design/control-plane/`

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/learning-plan.md`
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/cut-list.md`
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/mockup.html`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`. Include a short "what changed" list for the user, and a disposition for each of the two parts above.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace. Yours is `run/plan/`.

## User decisions that apply (quoted from run/decisions.md)

- d-01: "15 minutes (Recommended)" → size the plan for a 15-minute read, including interaction.
- d-03: "Review the human-review.md I just added into reviews for chapter 2. I'm going to ask an agent to go back and undo the w-01 widget in chapter 2 and implement scrollytelling instead. Consider doing that here please, review if the widget is serving a pedagogical need or if we're unnecessarily increasing cognitive load when a scrollytelling portion of the article would do better at showing stages of progression. " → part 1 and part 2 of the task.
- d-04: "Yes, use them" (the new Fennel story facts: copies and sizes per service, 02:51 crash and 03:04 machine failure, storefront v12→v13, Sam's "Nobody deploy anything", Morgan's "Could four do it?") → keep them where the new design uses them.
- d-05: "Apply 'now' set (Recommended)" (curriculum recommendations; the orchestrator applies them after this revision) → keep the R-numbering stable where possible and mark any recommendation you change or drop.

## Findings to address (revision rounds only)

- none (user checkpoint notes above)

## Done when

- [ ] `## Shape` states the widget-vs-scrollytelling decision and its rationale against d-03, and the minutes table matches the new design.
- [ ] Each Ch 2 review lesson above is applied in the plan or explicitly marked not applicable, with a reason.
- [ ] `cut-list.md`, reuse notes, acceptance criteria, `## Curriculum recommendations` and `mockup.html` match the revised design.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_plan.py /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run` reports no errors.

## Not your job

- Building the site or widgets, or writing the final prose.
- Editing CURRICULUM.md, Ch 1's or Ch 2's files, the research, or anything outside `run/plan/`.
