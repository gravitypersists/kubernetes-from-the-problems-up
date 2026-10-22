# Handoff 02 → instructional-designer (plan-and-mockup)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/instructional-designer.md`. This file is your task.

## Original request (verbatim)

> now we're going to do chapter 4.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Produce the learning plan, cut list and wireframe mockup for Chapter 4 ("Say what you want, not what to do: desired state and the reconcile loop") of "Kubernetes for Technical Managers": about 20 minutes, objectives o-1 to o-4 in the brief. This is the course's central chapter and the first of Part II; every later chapter reuses its model and its loop lens ("which loop, watching what, doing what?"). Choose the shape with a stated rationale. Apply the course principles in CURRICULUM.md §2:
- pain first, from the three sources (the chapter entry: the Ch 3 scenario again, now with a declared "3 copies of `storefront`" and a loop closing the gap; predict-then-reveal "machine 03 dies at 03:04; what happens now?");
- the management analogy (goals vs. task lists; a delegated owner watching one number) with a visible "where this analogy breaks" note;
- a term only after the reader has met the thing it names (this chapter introduces node, pod, desired state, declarative vs. imperative, reconcile loop / controller, control plane, API server, manifest, replica set lightly, self-healing); use the `.cp-term` card for the few critical ones;
- open with the jump-ahead cast strip and collapsed "I didn't read the last chapter. What happened?" disclosure (§2.11), then retrieval from Ch 3 (suggested: "which jobs did Sam do at 3:04?": replacing, connecting);
- pay off Ch 1's question, "If this box vanished tonight, how long until we're back, and who has to be awake?", with "minutes, and nobody", accurately hedged;
- end with "the conversation" ("The app keeps crash-looping, but Kubernetes keeps restarting it." → "So Kubernetes is doing its job. What's wrong with the app? And is restarting hiding the problem from us?") as apply-type checks;
- confront m-03, m-04, m-05, m-06, and revisit m-27 through the loops.

Course-level asks:

1. **Reuse Ch 3's visuals and renderer where they serve.** Ch 3's `w-fleet-scrolly` (`/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/widgets/w-fleet-scrolly/`: `renderFleet` in `index.js`, the snapshot format documented in `data.js`) and its `## Visual grammar` in Ch 3's plan, plus CURRICULUM.md §5 Visuals. The entry suggests a lane (or small widget on `renderFleet`) where the system does Sam's 03:04 steps itself. Decide what this chapter needs: e.g. Ch 3's machines now labelled as nodes, containers wrapped as pods, a visible "desired vs. actual" record, and loops drawn as actors distinct from both the record and the running pods. Things different in kind must look different (a written intention ≠ a running pod ≠ a loop). Copy and adapt into this run's `site/`; never edit Ch 3. Note per later chapter (Ch 5, 6, 7, 8, 12) what would be parameterised.
2. **Processes over time are scrollytelling lanes** (CURRICULUM §8 step 6); multi-state widgets follow §8 step 5. A hands-on widget must earn its place against the user's bar ("review if the widget is serving a pedagogical need or if we're unnecessarily increasing cognitive load when a scrollytelling portion of the article would do better"). Say in the plan why each interactive element is there.
3. **Size honestly.** Minutes table per part including widget and check time, and a real cut order. The user chose one ~20-minute chapter (d-01); if it plans out well over 20, propose a 4a / 4b split in the plan rather than compressing.
4. **Curriculum recommendations.** Add `## Curriculum recommendations` to `learning-plan.md`: whether local-01 ("self-healing is instant") enters the §6 catalog; new Fennel story facts for §3 (Year 3, Ari's arrival if used, the 03:04 repeat); the Visuals column entry for this chapter's terms; anything cut that a later chapter should pick up. Do not edit CURRICULUM.md.

Research concerns you must resolve or respect (from the researcher's report; details in `run/research/`):
- **Orchestrator tension with Ch 3.** Ch 3 called Kubernetes an orchestrator; the Kubernetes overview (c-09) says it isn't "a mere orchestration system" and that "centralized control is also not required". Frame it so the tension is the m-03 reveal (an orchestrator by the jobs it does; not a conductor following a score: Ch 3's conductor aside promised this chapter would show how the work is split with no single conductor), not a contradiction of Ch 3.
- **The `replicas: 3` snippet.** The docs' example is `kind: Deployment` (a Ch 6 term) and they advise against using ReplicaSets directly (c-12). Choose: a Deployment snippet with "we'll name this kind in Chapter 6", or a ReplicaSet as a simplification. State the choice and why.
- **Timings are upstream defaults** (~6 minutes to replacement: 50 s grace plus the 5-minute toleration; faster when the cloud reports the VM gone). Hedge as "with default settings"; never "instant", never a provider-specific claim.
- **"No room → the pod waits"** is medium confidence; "pending" is Ch 5's word.
- **Cybernetics link** is unsourced; don't use it. Helmsman and K8s are sourced (examples.md).
- **x-04:** at 03:04 machine 03 held `orders` (its only copy) and one `dispatch` copy, so `orders` is down for those minutes even on Kubernetes. That is a teaching opportunity (one copy is a single point of failure; the loop restores, it doesn't prevent) as well as a story constraint; the chapter entry's "3 copies of storefront" is a different service. Keep the story consistent with CURRICULUM §3's Ch 3 facts.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/brief.md` (includes lessons from earlier runs and the user's human reviews; follow them)
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/` (facts.md, misconceptions.md, examples.md, parking-lot.md), and earlier chapters' `run/research/facts.md` where this run's facts reference them.
- `/Users/m/workspace/k8s-course/CURRICULUM.md`: §2, §3 (established story facts), §4, §5 (including Visuals), §6, §8 steps 4–6, the §7 Ch 4 entry; read the Ch 5–14 entries so you don't pre-empt them and to judge reuse.
- Ch 3 as built: `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/` and `run/plan/learning-plan.md`; Ch 3's human review `run/review/human-review.md` and the d-16 entry in its `run/decisions.md` (the delivered §07 ending this chapter picks up from).
- Ch 2's human review: `/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/human-review.md` (the user's expectations for scrollytelling, term flair and plain language).
- `/Users/m/workspace/k8s-course/design/control-plane/` (README.md, tokens.json, components/)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/plan/learning-plan.md`
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/plan/cut-list.md`, including `## If it runs long`
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/plan/mockup.html`
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

- d-01: "One chapter, ~20 min (Recommended)" → size the plan in ideas for a ~20-minute read including interaction; propose a split only if it plans out well over 20.
- d-02: "Standard, cap 120 min" → research is standard depth; no effect on the plan beyond trusting facts.md.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] `learning-plan.md`, `cut-list.md` and `mockup.html` exist and follow the templates.
- [ ] Every widget or lane has a reuse note (what it takes from Ch 3, and later-chapter candidates), and `## Curriculum recommendations` is present.
- [ ] The plan states how each research concern above was resolved.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_plan.py /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run` reports no errors.

## Not your job

- Building the site, widgets or final prose (the mockup's wording is a draft; its check prompts, options and answers are final).
- New research (flag gaps as concerns instead).
- Editing CURRICULUM.md, earlier chapters' files, or anything outside `run/plan/`.
