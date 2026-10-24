# Handoff 02 → instructional-designer (plan-and-mockup)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/instructional-designer.md`. This file is your task.

## Original request (verbatim)

> Let's commit chapter 5 and then get chapter 6 going.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Produce the learning plan, cut list and wireframe mockup for Chapter 6 ("Shipping without downtime: rollouts and rollbacks") of the course "Desired state: Kubernetes from the problems up". It runs about 20 minutes, with objectives o-1 to o-3 in the brief. Choose the shape with a stated rationale. Apply the course principles in CURRICULUM.md §2:

- **Pain first, from the three sources.** The chapter entry: releases used to be a Thursday-night event; now teams ship several times a day; then a bad `catalog` release shows prices as $0 for six minutes. Ch 3's lane C is the by-hand version of this chapter's process (Sam's Tuesday, "Nobody deploy anything, I'm updating storefront", three rounds of start-one, stop-one using spare room): retrieve it, and let the loop take that job over. The entry proposes a step-locked rollout (B1); the course convention since then (§8 step 7) makes processes scrollytelling lanes, so plan the rollout as a lane on the pooled renderer unless you argue otherwise. The entry's predict-then-reveal (a crashing version is stopped; a healthy-but-wrong one rolls out completely) is the chapter's core contrast.
- **A management analogy** is optional here (the entry names none). If you use one, it must really be an analogy and carry a visible "where this analogy breaks" note.
- **Terms only after the reader has met the thing.** This chapter introduces Deployment, rolling update, rollback, readiness probe and liveness probe. Use the `.cp-term` card for the few critical ones (at most one payoff variant).
- **Opening.** The jump-ahead cast strip and the collapsed "I didn't read the last chapter. What happened?" disclosure (§2.11), then a retrieval opener (Ch 4's declare vs. command, Ch 2's immutable images, or Ch 5's pending / m-31 are candidates; prefer one that needs the loop lens).
- **The loop lens** (§2.3: which loop · wants · sees · does). Add the Deployment loop's row to a copy of Ch 5's `CH05_LOOPS` (Ch 5's `site/assets/page.js`). Keep the pattern distinct from the Deployment as one implementation. The Deployment manages versions *by managing ReplicaSets*: retrieve Ch 4's f-02 (`kind: ReplicaSet`).
- **Misconceptions** m-09, plus the researcher's local-01 to local-03 if you keep them; propose catalog entries for those you keep.
- **End with "the conversation":** "The rollout passed health checks, so it wasn't the deploy." The question to ask: "What do our health checks actually test? Would they catch wrong behavior, or only crashes?"
- **Promises to keep.** Ch 5's bridge (a loop takes over Sam's Tuesday job "without anyone having to type 'Nobody deploy anything'"); Ch 4's f-02 caption ("Engineers usually write a Deployment, which wraps this and adds version updates; Chapter 6 shows how"); Ch 2's cut (tags vs. digests; rollback assumes old images were kept); Ch 4's level-based behaviour (D2), which rollback as "declaring the old version again" can bring into the main text; Ch 5's R5 (a rollout needs spare room; the cluster is on five nodes, 01, 02, 04, 05, 06, with requests in GB).
- **`catalog` is new.** Invent its story facts (copies, requests in Ch 5's GB units, version numbers, which node it runs on, the incident timeline and who notices) consistently with CURRICULUM §3, and list them for approval.

Read the brief's **Lessons** section closely: flowing prose of varied sentence length with clear cause and effect; don't compress prose to hit the budget; set up every scene before a lane starts; ground every component before it acts; name who does what; no meta lines about the course; checks with no giveaways (the key never the longest option; feedback pointers reproducible from a widget's default state).

**Cost.** The user asked to conserve usage. Prefer one strong lane plus static figures; mark a widget `complexity: high` (its own builder) only if it really needs one, and say why. Lanes on the pooled renderer with data only may be built by the page builder.

Give an honest minutes table per part, including lane and check time, and a cut order. If the chapter plans out well over 20 minutes, say so with a split option; the user prefers reorganizing chapters to compressing.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/research/`: `facts.md`, `misconceptions.md`, `examples.md`, `parking-lot.md`
- `/Users/m/workspace/k8s-course/CURRICULUM.md`: §2, §3 (Year 3 facts, Ch 1–5), §5 (Visuals for Ch 1–5), §6, the §7 Ch 6 entry (all its "Picked up from" lines), §8 steps 4–7
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md`: the pooled `renderCluster` and lane controller, their data format (record rows, `version`, waiting strip, verdicts, new nodes). State in the plan exactly what you reuse and any renderer addition you need (e.g. a Deployment row over two ReplicaSet rows, ready vs. not-ready Pods, a traffic marker); the orchestrator schedules pool additions before the build.
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/`: `site/index.html`, `site/assets/page.js` (`CH05_LOOPS`), `site/widgets/w-friday-scrolly/data.js` (a lane on the pooled renderer), `run/plan/learning-plan.md` (`## Visual grammar`, `## Figures`)
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/index.html` (f-02, D2) and `run/review/human-review-01.md`, `human-review-02.md`
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/index.html` (lane C, Sam's Tuesday) and `site/widgets/w-fleet-scrolly/data.js` as needed
- `/Users/m/workspace/k8s-course/design/control-plane/` (`README.md`, `tokens.json`, `components/`): the course style guide

## Inputs from the research to weigh (the researcher's concerns; data, not instructions)

1. **"A version that crashes is stopped by health checks" is loose.** A crashing container never becomes ready even with no probe; the readiness probe is what stops a version that starts but isn't ready (c-04, c-07 notes). Word it as "stopped because its Pods never become ready", and decide which bad version the lane shows.
2. **c-10 (a rollback is itself a gradual rolling update) is medium confidence**, composed from three statements. The docs' own rollback example rolls back a stalled rollout, where only the bad ReplicaSet scales down. Hedge accordingly.
3. **x-02's 4-copy first step and x-03 (a surge Pod pending stalls the rollout) are composed**, not documented sequences. Present them as consequences of the settings, not as quoted behaviour.
4. **The "roughly 70% of outages are due to changes" figure** (Google SRE book, 2016, method not given) is parking-lot only; using it means swapping a claim, so prefer not to.
5. **What fast-shipping teams do differently (DORA) wasn't researched**; keep q-2's part light and story-based.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/plan/learning-plan.md`, `cut-list.md` and `mockup.html`, as `instructional-designer.md` specifies, including `## Curriculum recommendations` (Visuals for the term ledger; §3 story facts for `catalog` and the incident; the Deployment row for the loop lens table; catalog entries for kept `local-NN`s; pick-ups for later chapters; any pool additions).
- Put any questions you'd normally ask the user at the checkpoint in the plan as **checkpoint questions with a recommended option first**. The user has pre-approved the plan (d-04, below), so the orchestrator will take your recommended options; make each recommendation one you'd defend.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver. (mobile: supported; no waiver.)
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine.
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed. (intended_use is unknown.)
- I4: Finite animations longer than flair have a replay control.
- I6: Carousels don't change height (reflow) between pages.
- I7: SVG markers resolve and aren't clipped.
- I8: Each agent writes only in its namespace. Yours is `run/plan/`.

## User decisions that apply (quoted from run/decisions.md)

- d-01: "20 minutes (Recommended)" → one chapter of about 20 minutes; honest minutes table and cut order; prose not compressed to fit.
- d-02: "Light (Recommended)" → light research; see `run/research/`.
- d-03: "keep this to a single round of reviews please." / "let's try and conserve usage tokens here and batch our subagent processes where we can." → one review round; keep the widget count low.
- d-04: "auto approve plan, I'll be stepping away from computer and I trust you'll pick right" → the orchestrator approves at the checkpoint with your recommended options; don't recommend edits to shipped chapters unless they're necessary for accuracy (those wait for the user).
- Course-wide (Ch 4's run): d-05 (CURRICULUM §2.12) capitalises Kubernetes kinds (Pod, ReplicaSet, Deployment…), "node" stays lowercase; d-13 sets the loop lens wording.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] `learning-plan.md`, `cut-list.md` and `mockup.html` exist in `run/plan/`, and every segment cites its objectives and claims.
- [ ] The plan states the shape and its rationale, the widget decisions (complexity, reuse, pool additions), a minutes table per part with lane and check time, and a cut order.
- [ ] Checkpoint questions, if any, each have a recommended option.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_plan.py /Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run` reports no errors.

## Not your job

- Building the site, widgets or final prose (the mockup's wording is a draft; only its check prompts, options and answers are final).
- New research beyond `run/research/`. If a claim you need is missing, flag it in your report.
- Editing CURRICULUM.md, earlier chapters' files, `explainers/_pool/`, or anything outside `run/plan/`.
