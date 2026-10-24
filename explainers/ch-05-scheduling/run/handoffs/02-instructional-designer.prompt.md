# Handoff 02 → instructional-designer (plan-and-mockup)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/instructional-designer.md`. This file is your task.

## Original request (verbatim)

> let's apply the R1-R12 now and start chapter 5 now

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Produce the learning plan, cut list and wireframe mockup for Chapter 5 ("Who runs where: scheduling, resources and cost") of the course "Desired state: Kubernetes from the problems up". It runs about 20 minutes, with objectives o-1 to o-3 in the brief, and it's the first chapter to reuse Ch 4's model. Choose the shape with a stated rationale. Apply the course principles in CURRICULUM.md §2:

- **Pain first, from the three sources.** The chapter entry: Morgan's bill went *up* after the move; `dispatch` Pods stuck pending; an `orders` Pod killed for using too much memory. The entry proposes a bin-packing widget in which the reader sets requests per service and watches node count and cost change. Ch 3 and Ch 4 suggest that a hands-on sandbox (B2) may earn its place here, because the topic is genuinely system dynamics. Decide whether it does, against the user's bar (no busywork; Ch 3 replaced a tapping widget with scrollytelling), and say why. Any process over time is a scrollytelling lane (§8 step 7).
- **The management analogy.** Staffing and budgeting: a request is a reserved budget, a limit is a spending cap. Give it a visible "where this analogy breaks" note; the research's x-03 has one.
- **Terms only after the reader has met the thing.** This chapter introduces scheduler (in depth), requests, limits, bin packing, node pool, pending, eviction and OOM-killed. Use the `.cp-term` card for the few critical ones.
- **Opening.** Open with the jump-ahead cast strip and the collapsed "I didn't read the last chapter. What happened?" disclosure (§2.11). Then a retrieval opener on the loop model; m-28 and Ch 4's k-05 ("what worked out that `orders` should go to node 04?") are candidates.
- **The loop lens, in the wording now in §2.3.** "Which loop is it, what does it want, what does it see, and what does it do about a gap?" (short form: which loop · wants · sees · does). Keep the reconcile-loop *pattern* distinct from the scheduler as one *implementation* of it. Add the scheduler's detail, and any new loop you introduce (e.g. the node agent's memory kills, or eviction), as rows in a copy of Ch 4's loop lens table (`CH04_LOOPS` format, CURRICULUM §2.3).
- **Misconceptions** m-07, m-08 and m-26, plus the researcher's local-01 to local-03, if you keep them. Propose catalog entries for those you keep.
- **End with "the conversation":** "We need to bump memory limits on `orders`." The questions to ask: "Is that a leak or real growth? What does it do to our node count?"
- **Promises from Ch 4 to keep.**
  - Ch 4's bridge: Morgan opens the first cloud bill since the move and finds it has gone up; "that story starts with the loop that picked node 04 for `orders`".
  - Ch 4's D4: the cluster has run on three nodes since 03:04, with less spare room; "that room is the subject of Chapter 5". So pick up headroom explicitly.
  - Ch 3's promise: this chapter counts memory and processor separately.

Read the brief's **Lessons** section closely, especially the two Ch 4 human reviews:
- flowing prose of varied sentence length, with clear cause and effect;
- don't compress prose to hit the budget;
- set up every scene before a lane starts;
- ground every component before it acts;
- no unexplained analogies;
- name who does what.

Give an honest minutes table per part, including widget and check time, and a cut order. If the chapter plans out well over 20 minutes, propose a split rather than compressing it; the user prefers reorganizing chapters.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/research/`: `facts.md`, `misconceptions.md`, `examples.md`, `parking-lot.md`
- `/Users/m/workspace/k8s-course/CURRICULUM.md`: §2, §3 (Year 3 facts), §5 (the Visuals column for Ch 1–4), §6, the §7 Ch 5 entry (including "Picked up from Ch 3" and "Picked up from Ch 4"), and §8 steps 4–7
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/`:
  - `site/index.html`, `site/assets/page.js` (`CH04_LOOPS`), `site/assets/page.css`;
  - `site/widgets/w-cluster-scrolly/` (`renderCluster`; the snapshot format in `data.js`, with a `waiting` status designed in but not drawn);
  - `run/plan/learning-plan.md` (`## Visual grammar`, `## Figures`, `## Curriculum recommendations`);
  - `run/review/human-review-01.md` and `human-review-02.md`.
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/learning-plan.md` (the scrollytelling lane spec, `w-fleet-scrolly`, room units) and `site/widgets/w-fleet-scrolly/`, as needed
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md` (shared runtime; what builders may reference as `pool/<file>`)
- `/Users/m/workspace/k8s-course/design/control-plane/` (`README.md`, `tokens.json`, `components/`): the course style guide

## Inputs from the research to weigh (the researcher's concerns; data, not instructions)

1. **Ch 4's moving-day layout conflicts with default scheduling** (facts c-06, c-07; examples x-07).
   - Ch 4's lane A puts two `storefront` Pods on node 01 and one on node 02, while node 04 has 5 free. By default the scheduler favours the least-reserved node and spreads copies, so it would more likely have put one on each of 01, 02 and 04. Packing (`MostAllocated`) doesn't produce Ch 4's layout either.
   - This affects the curriculum's suggested "why not 04?" opener, and Ch 4's lane B5 claim that node 04 was "the only node with room" for `orders` at 03:04.
   - Don't plan around it silently. Lay out the options in the plan with their costs, for example: (a) this chapter admits the simplification honestly, perhaps turning it into a teaching moment; (b) recommend a change to Ch 4's lane A and §3's story facts (a post-ship edit to Ch 4); (c) another option you find.
   - Mark the choice as a checkpoint question for the user. The user decides; Ch 4 is already shipped and human-reviewed.
2. **Only some fully managed modes bill per Pod.** GKE Autopilot does, by requests; EKS Auto Mode bills per machine; AKS Automatic probably does too (medium confidence). Keep providers generic. Use c-12's suggested wording.
3. **The leak-vs-growth heuristic (x-05) is `source: model`.** Only the docs' advice is sourced: check for a leak first, then raise the limit and maybe the request (c-23). Present the heuristic as an engineer's rule of thumb, not as a documented fact.
4. **Both cost survey figures are single-source** (CNCF: about 100 self-selected respondents; Datadog 2024: its own AWS customers, all containers on EC2). Each needs "one survey's figure" framing, or leave them out.
5. **The pending message (x-06) is an adapted illustration;** its wording varies between versions.
6. **Room units fold memory and processor into one number** (x-08), and `notifications` (introduced in Ch 4) has no size yet. If you keep room units, say where the widget simplifies. If you give `notifications` a size, record it as a story fact recommendation.

## Reuse and the shared pool

Per CURRICULUM §8 step 5, builders don't copy another chapter's code. If your plan reuses Ch 4's `renderCluster` or Ch 3's `renderFleet`, say so in the plan, stating exactly what is reused and what the renderer must add (e.g. drawing `waiting`, separate memory and processor). The orchestrator will then ask the user to promote that code into `explainers/_pool/` before the build. Record per widget the reuse decision and candidate later chapters (Ch 8: two autoscalers, nodes added and removed; Ch 11: one team's spike starving another, quotas).

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/plan/learning-plan.md`, `cut-list.md` and `mockup.html`, as `instructional-designer.md` specifies, including `## Curriculum recommendations`:
  - Visuals for the term ledger;
  - §3 story facts (the bill, the pending `dispatch` Pods, the `orders` memory kill, any sizes);
  - loop lens table rows;
  - catalog entries for kept `local-NN`s;
  - pick-ups for later chapters;
  - the moving-day decision above.
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

- d-01: "~20 min (Recommended)". One chapter of about 20 minutes. Give an honest minutes table and a cut order, and propose a split only if it plans out well over 20. Per the user's Ch 4 human review, don't compress prose to fit; reorganizing chapters is preferred.
- d-02: "Standard, cap 120 min (Recommended)". The research is standard depth; see `run/research/`.
- Course-wide, recorded in Ch 4's run: d-05 (CURRICULUM §2.12) capitalises Kubernetes kinds (Pod, ReplicaSet…), while "node" stays lowercase. d-13 sets the loop lens wording above.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] `learning-plan.md`, `cut-list.md` and `mockup.html` exist in `run/plan/`, and every segment cites its objectives and claims.
- [ ] The plan states the shape and its rationale, the widget decisions (including the sandbox call and reuse or pool needs), a minutes table per part with widget and check time, and a cut order.
- [ ] The moving-day conflict is laid out as options for the user, not resolved silently.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_plan.py /Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run` reports no errors.

## Not your job

- Building the site, widgets or final prose (the mockup's wording is a draft; only its check prompts, options and answers are final).
- New research beyond `run/research/`. If a claim you need is missing, flag it in your report.
- Editing CURRICULUM.md, earlier chapters' files, `explainers/_pool/`, or anything outside `run/plan/`.
