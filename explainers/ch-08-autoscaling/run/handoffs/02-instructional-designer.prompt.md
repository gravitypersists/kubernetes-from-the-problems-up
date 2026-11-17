# Handoff 02 → instructional-designer (plan-and-mockup)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/instructional-designer.md`. This file is your task.

## Original request (verbatim)

> start a /didactician run on ch 08. Let's use Sonnet or Haiku (your choice) for the researcher, but I think orchestrator and instruction designer should be fable.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Produce the learning plan, cut list and mockup for Chapter 8 ("The Friday dinner rush: autoscaling") of the course "Desired state: Kubernetes from the problems up", from the brief, the course bible and this run's research. The whole plan is your task, so read the brief and the research files whole. The brief's "Course context" section lists what the plan must decide and argue; in short:

1. **Shape.** Choose between a lane telling the late-scaling Friday plus a small explorer, the explorer alone, or lanes and figures only (brief, "Course convention vs. the entry's goal-free explorer"), and argue it against the user's standing test: does the widget serve a pedagogical need, or just add load? Give an honest minutes table per part. Four objectives plus node pools plus an explorer may not fit 22 minutes: if it doesn't, say so and propose a split or a cut (CURRICULUM §2.10) as a question for the checkpoint rather than compressing.
2. **Objectives.** o-1 to o-3 are the entry's; o-4 (scaling down, the bill, node pools) was drafted at intake and is not yet confirmed by the user. Keep it, fold it into o-1, or reshape it, and say why; the user confirms the objectives at the checkpoint.
3. **Story facts.** Invent, consistently with CURRICULUM §3, the four things the brief lists under "Story consistency to resolve in the plan", and propose them in `## Curriculum recommendations`.
   - **The "twenty minutes".** The research (x-01, x-02) finds a late scale-up that needs new nodes normally costs roughly 3 to 8 minutes; twenty is plausible only with causes stacked on top. Either give Fennel's late Friday those causes explicitly, minute by minute, or propose a corrected duration. Put the choice to the user as a checkpoint question; the reader must not leave thinking autoscaling normally takes twenty minutes, nor that it is instant (m-11).
   - **Which node autoscaler Fennel runs.** Node start differs a lot by tool (c-06, c-07 are one vendor's statements). Fennel is on a generic managed provider in standard mode with node pools (§2.5, §3); keep the page generic and hedged.
   - **The bottleneck case.** No public postmortem was found; c-12 and x-04 support an illustration only. Present it as Fennel's story, not as a documented industry incident.
4. **The loop lens table.** Copy `CH07_LOOPS` forward (CURRICULUM §2.3), fill in the dashed "a loop that adds nodes" row and add the Pod-count autoscaler's row, in the §2.3 wording.
5. **Node pools.** Introduce them here (Ch 5 d-12), starting from Ch 5's cut f-03 and k-06.
6. **Misconceptions.** m-11 is owned here; m-28, m-31, m-29 and m-36 are revisited. The research proposes local-01 to local-03; decide which the chapter confronts and propose catalog entries.
7. **Pool additions.** List anything `renderCluster` would need (brief, "Shared pool") with a no-pool-change alternative for each, as a checkpoint question.

Hedging the research asks for: defaults are upstream defaults ("by default", "typically"); scheduled and predictive scaling, faster-starting Pods and the image-download and app-start times are model-sourced at low confidence (x-01, x-03), so keep them general; one provider's figures are labelled as such, with a date.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/brief.md`: the root spec, including the lessons from earlier runs and the user's reviews.
- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/research/` (`facts.md`, `examples.md`, `misconceptions.md`, `parking-lot.md`): read whole. Single records later: `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/kb.py /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling get <ids> --closure`.
- `/Users/m/workspace/k8s-course/CURRICULUM.md`: §1–§3, §5 (with the Visuals column), §6, the §7 Ch 8 entry with all its "Picked up from" lines, §8 steps 4–9, §9. The Ch 9–14 entries show what must not be pre-empted.
- `/Users/m/workspace/k8s-course/design/control-plane/` (`README.md`, `tokens.json`, `components/`): the course style guide; the mockup follows it.
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md`: what the shared renderer draws and its data format.
- The user's taste, from the most recent chapter they reviewed: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/review/human-site-1/comments.md` and `human-site-2/comments.md`, and Ch 5's plan as revised afterwards (`ch-05-scheduling/run/plan/learning-plan.md`).
- Previous chapters, as models and for continuity (read what you need, not everything):
  - Ch 7: `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/plan/learning-plan.md` (the most recent plan: `## Visual grammar`, `## Curriculum recommendations`, R5) and `site/assets/page.js` (`CH07_LOOPS`). Not yet reviewed by the user.
  - Ch 5: `ch-05-scheduling/` (lane F in `site/widgets/w-friday-scrolly/`, the sandbox model in `site/widgets/w-sizing-sandbox/model.js`), and its Revision 0 plan with the cut node pool figure f-03 and check k-06: `ch-05-scheduling/run/history/11-instructional-designer/run/plan/learning-plan.md`.
  - Ch 4: `ch-04-desired-state/run/research/examples.md` (the cut thermostat analogy, x-01 there).

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/plan/`: `learning-plan.md`, `cut-list.md`, `mockup.html`, as `instructional-designer.md` specifies.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`. List the checkpoint questions for the user in it, each with your recommended option.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver. (No waiver; plan layouts that are feasible at 360px.)
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine.
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed. (intended_use is unknown; prefer drawn figures.)
- I4: Finite animations longer than flair have a replay control.
- I6: Carousels don't change height (reflow) between pages.
- I8: Each agent writes only in its namespace. Yours is `run/plan/`.

## User decisions that apply (quoted from run/decisions.md)

- d-01 (inferred from the request, not asked; confirmed or changed at the checkpoint): 22 minutes → plan honestly to it; never compress prose to fit; propose a split if it doesn't fit.
- d-02 (inferred): light research depth → the facts file is small; where a fact is missing, write around it and list it as a concern, don't invent one.
- Course-level decisions recorded in CURRICULUM.md apply as written there (loop lens wording §2.3, capitalised kinds §2.12, refer to things by what they are §2.13, node pools moved to Ch 8, widget height rule and its sandbox exception §8.6, scrollytelling for processes §8.7, human review as a formal check §8.9).

## Findings to address (revision rounds only)

- none

## Done when

- [ ] `learning-plan.md`, `cut-list.md` and `mockup.html` exist in `run/plan/` and follow the templates.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_plan.py /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run` passes with no errors.
- [ ] The plan has a `## Shape` minutes table, a `## Visual grammar`, a `## Curriculum recommendations` section (story facts, loop lens rows, ledger Visuals, misconceptions, pick-ups for later chapters, pool notes) and the cut order.
- [ ] Every story fact is consistent with CURRICULUM §3, and every factual claim cites a claim ID from `facts.md`.
- [ ] The report lists the checkpoint questions with recommendations.

## Not your job

- Building the site, widgets or pool changes; writing final prose (the mockup's wording is a draft; only check prompts, options and answers are final).
- New research: report gaps as concerns.
- Editing CURRICULUM.md, the brief, the skill, the pool, or any other chapter's files.
