# Handoff 02 → instructional-designer (plan-and-mockup)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/instructional-designer.md`. This file is your task.

## Original request (verbatim)

> Let's start ch 3 now, notes from the last run "
> Ch 3 is next. Its entry already has the retrieval opener, the instruction to place Docker, and the note to reuse Ch 2's container drawings for its placement widget."

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Produce the learning plan, cut list and wireframe mockup for Chapter 3 ("Many containers, many machines: the orchestration problem") of "Kubernetes for Technical Managers": 15 minutes, objectives o-1 to o-3 in the brief. Choose the shape with a stated rationale. The chapter entry's key widget: the reader places about a dozen containers of different sizes onto 4 machines by hand; then a machine fails and they re-place its containers; then a new version rolls out without downtime; afterwards they list the jobs they just did (placement, restarting, replacing, connecting, updating, scaling). Apply the course principles in CURRICULUM.md §2:
- pain first, from the three sources;
- each management analogy comes with a "where this analogy breaks" note;
- Kubernetes arrives late and on purpose: name it only after the reader has built the list of jobs (§2.2);
- a term is introduced only after the reader has met the thing it names (this chapter may introduce orchestration, orchestrator, Kubernetes by name, cluster);
- open with retrieval from Ch 2 (suggested: Ch 2's k-07, "the machine running the containers dies at 3 a.m.; what happens?", m-23);
- end with "the conversation" as apply-type checks ("We should move to Kubernetes." → "Which of these jobs is hurting us most today, and is that worth the cost of the platform?");
- confront m-02, and place Docker (Ch 2 promised "you'll hear the name Docker; the next chapter places it").

Course-level asks:

1. **Widget reuse and design for later chapters.** The placement widget should reuse Ch 2's f-01 container chip and machine frame (`.cp-machine` / `.cp-ctr` in `/Users/m/workspace/k8s-course/explainers/ch-02-containers/site/assets/page.css`; data in `site/assets/page.js`; conventions in Ch 2's `run/plan/learning-plan.md` `## Visual grammar` and CURRICULUM.md §5 Visuals), adding chip size. Copy and adapt into this run's `site/`; never edit Ch 2. This widget is a likely reuse candidate for Ch 4 (self-healing), Ch 5 (scheduling, bin packing, pending), Ch 6 (rolling update) and Ch 8 (scaling). Note per later chapter what would be parameterised (e.g. scripted/automated mode, machine count, sizes) and whether it is worth designing the data model for that now. Reuse must add no reader-visible complexity in this chapter.
2. **Interaction must work on a phone and by keyboard.** Plan a tap-to-select / tap-to-place (or equivalent) placement interaction, not drag alone. Size it honestly at 360px (4 machines and ~12 chips is a lot at that width; consider layout, and fewer chips if needed). Follow the course widget-height rule (CURRICULUM.md §8 step 5).
3. **Curriculum recommendations.** Add a `## Curriculum recommendations` section to `learning-plan.md`. The researcher proposed local-01 ("Kubernetes is Borg open-sourced"), local-02 ("enough total free capacity means it fits") and local-03 ("an orchestrator is a fancier deploy script"). Recommend whether each enters the §6 catalog and under which owner (local-02 may belong to Ch 5). Record any new Fennel story facts you introduce (for §3), and anything cut that a later chapter should pick up. Do not edit CURRICULUM.md.

Lessons from earlier runs that the plan must address (more detail in the brief):
- **Size honestly.** Ch 1 planned 12, built ~17; Ch 2 planned 14, relabelled to 16. The three-phase widget plus debrief is the biggest risk; give a minutes table per part including widget time, and a real cut order (e.g. which widget phase can shrink or become a figure).
- **Checks.** Distractors equally measured and similar in length; don't make the key the only hedged middle option; vary the key's position.
- **Think-then-reveal prompts** state their own question plainly; don't reuse an earlier multiple-choice option as the prompt.
- **The payoff lands.** This is the chapter where the course's subject finally arrives; make naming Kubernetes feel earned, without explaining how it works (Ch 4).

Research caveats from the researcher's report, which you must respect:
- Deploy-coordination pain (the group chat) has no sourced evidence: keep it as Fennel fiction, with no figure.
- On-call evidence is Google SRE practice (toil causes burnout; Google caps toil at 50%), not an industry survey. No figure for pages or recovery hours.
- The 12–18% utilization figure (c-04) is a 2014 estimate for US corporate data centers, confidence medium, read secondhand. Hedge it if used; don't assign Fennel a percentage.
- c-05's quote joins are not character-checked; don't quote it verbatim on the page.
- Vocabulary guard: sources say "nodes", "bin packing", "pending", "scheduled" (Ch 4/5 terms). Use the plain-word substitutes in the research notes.
- "Orchestrator" suggests one conductor (m-03, Ch 4's). Define the orchestrator by the jobs it does, not as one central brain; any conductor/supervisor analogy needs its breaks note to point toward this.
- m-02: say "not competitors in the usual sense" (Docker Swarm did compete at the orchestration layer).
- Gaps in the six-job list (health checking of stuck containers, per-container settings and secrets, monitoring) belong to Ch 6, 9, 12: at most an "and more".

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/` (facts.md, misconceptions.md, examples.md, parking-lot.md), plus Ch 1's and Ch 2's `run/research/facts.md` where this run's facts reference them.
- `/Users/m/workspace/k8s-course/CURRICULUM.md`: §2, §3 (including the established story facts), §5 (including Visuals), §6, §8 step 5, and the §7 Ch 3 entry. Read the Ch 4–8 and Ch 14 entries so you don't pre-empt them, and to judge reuse.
- Ch 2 as built: `/Users/m/workspace/k8s-course/explainers/ch-02-containers/site/` and `run/plan/learning-plan.md`. Ch 1 as built: `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/`.
- `/Users/m/workspace/k8s-course/design/control-plane/` (README.md, components/)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/learning-plan.md`
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/cut-list.md`, including `## If it runs long`
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/mockup.html`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace. Yours is `run/plan/`.

## User decisions that apply (quoted from run/decisions.md)

- d-01: "15 minutes (Recommended)" → size the plan in ideas for a 15-minute read, including interaction. If it doesn't fit honestly, say so and propose what to cut or split rather than compressing.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] `learning-plan.md`, `cut-list.md` and `mockup.html` exist and follow the templates.
- [ ] Every widget has a reuse note (including the Ch 2 chip/frame reuse and later-chapter candidates), and the `## Curriculum recommendations` section is present.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_plan.py /Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run` reports no errors.

## Not your job

- Building the site or widgets, or writing the final prose. The mockup's wording is a draft, except the check prompts, options and answers.
- Editing CURRICULUM.md, Ch 1's or Ch 2's files, the research, or anything outside `run/plan/`.
