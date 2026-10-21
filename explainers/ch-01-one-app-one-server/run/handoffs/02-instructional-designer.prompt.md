# Handoff 02 → instructional-designer (ch1-plan)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/instructional-designer.md`. This file is your task.

## Original request (verbatim)

> we're going to start a run to create Ch 1 from CURRICULUM.md. Go ahead and get it started. This will be the first time I'm running this skill not as a standalone, but as a chapter in a bigger course. Weigh this when producing widgets (widgets can be used across chapters. If a widget might be useful in a future chapter, this might justify building it, but use discretion, because an analysis on that chapter might veto that widget for pedagogical reasons). Feel free to recommend changes to curriculum at the checkpoint.

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Produce the learning plan, cut list and wireframe mockup for Chapter 1 ("One app, one server") of "Kubernetes for Technical Managers": 12 minutes, objectives o-1..o-3 in the brief. Choose the shape (article, scrollytelling, widget-led, or a mix) with a stated rationale. The chapter entry specifies a "pain in the page" activity (the reader lists what is on Sam's server, then tries to rebuild it on a new machine from the notes and finds the gaps); design it so it actually teaches o-1 and o-3 rather than decorating them. Follow the course design principles in CURRICULUM.md §2 that apply to Ch 1: pain first from three sources (meeting symptoms, pain felt in the page, management analogies each with a "where this analogy breaks" note); no Kubernetes in this chapter; introduce a term only after the reader has met the thing; end with "the conversation" as apply-type comprehension items; Ch 1 has no retrieval opener (nothing precedes it), though you may decide whether a pre-question helps. Plant the "the code is the app" seed without resolving it (Ch 2 corrects it).

Two course-level asks from the user:

1. **Widget reuse across chapters.** For each widget, decide whether it should be designed with later chapters in mind (e.g. the Fennel server/machine visual could recur in Ch 2's two-machines comparison or Ch 3's placement widget). Reuse can justify building a widget, but this chapter's pedagogy comes first; a later chapter's own analysis may veto reuse. Record in the plan, per widget: reuse candidate chapters (or "none"), what would be parameterised, and why reuse is or isn't worth designing for now. Don't let reuse add reader-visible complexity here.
2. **Curriculum recommendations.** Add a `## Curriculum recommendations` section to `learning-plan.md` listing any changes you'd recommend to CURRICULUM.md (this chapter's entry, the term ledger, Fennel, misconception catalog, or entries for later chapters affected by Ch 1 choices), each with a one-line reason. Do not edit CURRICULUM.md.

Research caveats from the researcher you must respect (from its report):
- Parts are only partly sourced: no source ranks which items get forgotten on a rebuild (q-1); "the code is the app" as a manager belief is model-sourced (q-2); the two-hour outage plausibility and "logs fill the disk at dinner rush" are model reasoning plus Fennel fiction (q-3). Don't present those as sourced fact.
- Prefer plain wording ("how long until we're back") over RTO/MTTR acronyms.
- c-09: "VMs don't remove the snowflake problem" is inferred from c-04 and c-06; keep the partial benefit of snapshots/images honest (c-10).
- c-11: don't upgrade "climbs steeply" to "exponential".

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/brief.md`: brief, objectives, course context.
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/` (facts.md, misconceptions.md, examples.md, parking-lot.md).
- `/Users/m/workspace/k8s-course/CURRICULUM.md`: read §2 (principles), §3 (Fennel), §5 (term ledger), §6 (misconceptions), §7 Ch 1 entry and the Ch 2–4 entries (to avoid pre-empting them and to judge widget reuse).
- `/Users/m/workspace/k8s-course/design/control-plane/README.md` and `components/` (the course style; use it in the mockup where cheap, but the mockup is a wireframe).

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/learning-plan.md`
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/cut-list.md` (including `## If it runs long` with a cut order)
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/mockup.html`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver. (Plan layouts that work at 360px.)
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine.
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed.
- I4: Finite animations longer than flair have a replay control.
- I6: Carousels don't change height (reflow) between pages.
- I8: Each agent writes only in its namespace. Yours is `run/plan/`.

## User decisions that apply (quoted from run/decisions.md)

- d-01: "12 minutes (Recommended)" → size the plan in ideas for a 12-minute read including interaction.
- d-02: "Light (Recommended)" → research is light; claims must reference facts.md ids.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] `learning-plan.md`, `cut-list.md`, `mockup.html` exist and follow the templates.
- [ ] Every widget has a reuse note; `## Curriculum recommendations` section present.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_plan.py /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run` reports no errors.

## Not your job

- Building the site or widgets; writing final prose (mockup wording is a draft, except check prompts/options/answers).
- Editing CURRICULUM.md, research files, or anything outside `run/plan/`.
- Planning content for later chapters beyond the reuse notes and recommendations.
