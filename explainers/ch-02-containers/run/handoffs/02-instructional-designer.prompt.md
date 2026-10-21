# Handoff 02 → instructional-designer (ch2-plan)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/instructional-designer.md`. This file is your task.

## Original request (verbatim)

> okay, commit it, clear context of everything you don't need for ch 2 and proceed with building chapter 2 with the didactician skill

(The standing course guidance on reusing widgets and recommending curriculum changes is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Produce the learning plan, cut list and wireframe mockup for Chapter 2 ("'Works on my machine': containers") of "Kubernetes for Technical Managers": 14 minutes, objectives o-1 to o-4 in the brief. Choose the shape with a stated rationale. The chapter entry's "pain in the page" is a contrasting case: the same code on two machines with one dependency version different; predict the outcome, then reveal it. Apply the course principles in CURRICULUM.md §2:
- pain first, from the three sources;
- each management analogy comes with a "where this analogy breaks" note;
- no Kubernetes in this chapter;
- a term is introduced only after the reader has met the thing it names;
- open with retrieval from Ch 1 (suggested: why did photo uploads fail on the rebuilt server?);
- end with "the conversation" as apply-type checks;
- confront m-01, and revisit m-19 with the fix.

Course-level asks:

1. **Widget reuse.** Ch 1's `w-rebuild` (`/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/widgets/w-rebuild/`; its content is in `data.js`, and its spec is in Ch 1's `run/plan/learning-plan.md`) is a curriculum-named candidate for the contrasting case. Decide on pedagogical grounds whether to reuse its stage-4 two-machine comparison (copied and adapted into this run's `site/`), adapt it more heavily, or build something else. Record the decision and why. A veto is allowed. Follow Ch 1's `## Visual grammar` (also recorded in the CURRICULUM.md §5 Visuals column) so machines look the same across chapters. For each widget, note reuse candidates in later chapters (Ch 3's placement widget will need a machine holding several containers), what would be parameterised, and whether reuse is worth designing for now. Reuse must add no reader-visible complexity.
2. **Curriculum recommendations.** Add a `## Curriculum recommendations` section to `learning-plan.md`. The researcher proposed two new misconceptions, local-01 ("containerized means machine failure is solved") and local-02 ("passed in staging means identical in production"). Recommend whether each should enter the §6 catalog, and under which owner. Do not edit CURRICULUM.md.

Lessons from Ch 1 that the plan must address (see the brief):
- **Size honestly.** Ch 1 was planned at 12 minutes and built at about 17. Estimate widget time realistically, and give a real cut order.
- **Checks.** Make distractors equally measured and similar in length. Don't make the key the only hedged middle option between two extremes. Vary the key's position.
- **Widget size.** Plan widget sizes that are realistic at 360px, so the reservation matches the build.

Research caveats from the researcher's report, which you must respect:
- There is no sourced figure for how many containers vs. VMs fit on one machine. Don't invent "N times more".
- Google Cloud's size and start-up figures are hedged (megabytes and seconds vs. gigabytes and minutes; confidence medium). Keep the hedge.
- c-02 (one image serving staging and production, with settings handed in at start) is confidence medium. Keep it brief; Ch 9 owns configuration.
- "Container vs. Docker" is unsourced and belongs to Ch 3 (m-02). Leave it out, or say "we'll name this later".
- The machine-dies point (o-4) is an inference from c-05 and c-06. Restart, placement and upgrades belong to Ch 3: motivate them, don't teach them.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/research/` (facts.md, misconceptions.md, examples.md, parking-lot.md), plus Ch 1's `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/facts.md`, which Ch 2's facts reference.
- `/Users/m/workspace/k8s-course/CURRICULUM.md`: §2, §3 (including the established story facts), §5 (including Visuals), §6, and the §7 Ch 2 entry. Read the Ch 3–4 entries so you don't pre-empt them, and to judge reuse.
- Ch 1 as built: `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/` and `run/plan/learning-plan.md`.
- `/Users/m/workspace/k8s-course/design/control-plane/` (README.md, components/)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/learning-plan.md`
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/cut-list.md`, including `## If it runs long`
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/plan/mockup.html`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I8: Each agent writes only in its namespace. Yours is `run/plan/`.

## User decisions that apply (quoted from run/decisions.md)

- d-01: "14 minutes" → size the plan in ideas for a 14-minute read, including interaction. If 4 objectives don't fit honestly, say so and propose a merge (e.g. fold o-4 into the conversation) rather than compressing.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] `learning-plan.md`, `cut-list.md` and `mockup.html` exist and follow the templates.
- [ ] Every widget has a reuse note, including the `w-rebuild` decision, and the `## Curriculum recommendations` section is present.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_plan.py /Users/m/workspace/k8s-course/explainers/ch-02-containers/run` reports no errors.

## Not your job

- Building the site or widgets, or writing the final prose. The mockup's wording is a draft, except the check prompts, options and answers.
- Editing CURRICULUM.md, Ch 1's files, the research, or anything outside `run/plan/`.
