# Handoff 02 → instructional-designer (plan-and-mockup)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/instructional-designer.md`. This file is your task.

## Original request (verbatim)

> Commit and continue, I will review at a later date. Once done with 6 let's start ch 7.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Produce the learning plan, cut list and wireframe mockup for Chapter 7 ("Finding each other: services and traffic") of the course "Desired state: Kubernetes from the problems up". It runs about 20 minutes, with objectives o-1 to o-3 in the brief. Choose the shape with a stated rationale. Apply the course principles in CURRICULUM.md §2:

- **Pain first, from the three sources.** The chapter entry: `storefront` needs to call `orders`, whose Pods come and go and change addresses; customers on the internet need one stable way in; the manager sees "connection refused" incidents and load-balancer cost questions. Ch 3 is the by-hand version (after 03:04 Sam passed on the new addresses, and `storefront` kept pointing at the dead machine until told: Ch 3's k-03 and its NEW ADDR status); Ch 4's lane B6 credited "another loop (Chapter 7)" with keeping `storefront` pointed at `orders-q2rw`; Ch 6 said all through that only ready Pods get traffic "by a loop we'll name in Chapter 7". Retrieve these and name the loop. The entry proposes a widget where the reader keeps a hand-written address list up to date; the course convention (§8 step 7) makes processes scrollytelling lanes, and Ch 3's checkpoint dropped a tapping widget as busywork. Decide whether the felt pain earns a hands-on widget, and argue it.
- **Resolve the story consistency question** in the brief (Services have been working, unnamed, since Ch 4's moving day; the "connection refused" incidents need a cause that fits). The researcher recommends one (examples.md x-02: `orders` runs a single copy, so during each of Ch 5's Tuesday OOM restarts its Service had no ready Pod, and callers were refused at once). Weigh it against alternatives, and propose the story facts for approval.
- **A management analogy:** the entry's front desk / shared inbox, with "where it breaks: a Service isn't a thing that runs; it's a routing rule kept up to date by a loop". The researcher lists three breaks (examples.md x-01). Use it only if it really is an analogy, after saying what a Service is and does, with a visible "where this analogy breaks" note.
- **Terms only after the reader has met the thing.** This chapter introduces Service, DNS name, load balancer, ingress / gateway. Use the `.cp-term` card for the few critical ones (at most one payoff variant).
- **Opening.** The jump-ahead cast strip and the collapsed "I didn't read the last chapter. What happened?" disclosure (§2.11), then a retrieval opener. Candidates: Ch 3's k-03, Ch 4's k-06 (a replacement Pod has a new name and address), Ch 6's k-05 (a Pod failing its readiness check is taken out of traffic, not restarted); prefer one that needs the loop lens.
- **The loop lens** (§2.3). Copy Ch 6's `CH06_LOOPS` (Ch 6's `site/assets/page.js`) and fill in its dashed Chapter 7 row (the EndpointSlice controller, by whatever reader-facing name you choose); keep the pattern distinct from this one implementation. Say where kube-proxy (or its equivalent on each node) fits: it isn't a reconcile loop over the record in the same way, so decide how the table shows it, if at all.
- **Misconceptions** m-10, plus the researcher's local-01 to local-03 if you keep them; propose catalog entries for those you keep (next free IDs are m-35 on).
- **End with "the conversation":** "We want a separate load balancer for every service." The question to ask: "What does each one cost? Could one ingress/gateway route to all of them?"
- **Promises to keep, without bookkeeping lines:** Ch 6's bridge (every release gives `catalog` three new Pods with new addresses, and `storefront` has to find them, at once, and only the ready ones); Ch 4's "another loop (Chapter 7)"; Ch 6's R5 (during a rollout old and new versions serve side by side; a canary by share of traffic needs routing, not just Pod counts).

Read the brief's **Lessons** section closely: flowing prose of varied sentence length with clear cause and effect; don't compress prose to hit the budget; set up every scene before a lane starts; ground every component before it acts; name who does what; no meta lines about the course; checks with no giveaways (the key never the longest option, nor echoed by the standfirst, a heading, a caption or a term card; Ch 6's blocking P-01 was a standfirst and heading that gave the central prediction away); feedback pointers reproducible from a widget's default state; gated content collapses until committed.

**Cost.** The user asked to conserve usage. Prefer one strong lane plus static figures; mark a widget `complexity: high` (its own builder) only if it really needs one, and say why. Lanes on the pooled renderer with data only may be built by the page builder. If drawing a Service (its stable name and its list of ready Pods) or requests reaching Pods needs a `renderCluster` addition, specify it exactly as Ch 6's plan did (field, look, off when absent), and say whether a static figure would teach as well; pool changes cost a re-gate of every chapter.

Give an honest minutes table per part, including lane and check time, and a cut order. Ch 6 planned 22 against 20 and was measured at ~27 by its reviewer with checks and the lane, so plan close to 20, and offer a split option if the chapter plans well over.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/research/`: `facts.md`, `misconceptions.md`, `examples.md`, `parking-lot.md`
- `/Users/m/workspace/k8s-course/CURRICULUM.md`: §2, §3 (Year 3 facts, Ch 1–6), §5 (Visuals for Ch 1–6), §6, the §7 Ch 7 entry (all its "Picked up from" lines), §8 steps 4–7, §9 (pool follow-ups)
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md`: the pooled `renderCluster` and lane controller, their data format (record rows, Deployment group, `version`, `series`, `notready`, `STATUS_INLINE`, waiting strip, verdicts, new nodes, note lines)
- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/`: `site/index.html`, `site/assets/page.js` (`CH06_LOOPS`), `site/widgets/w-rollout-scrolly/data.js` (a lane on the pooled renderer), `run/plan/learning-plan.md` (`## Visual grammar`, `## Figures`, `## Curriculum recommendations` R5)
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/index.html` (lane B, B6, k-06) and `run/review/human-review-01.md`, `human-review-02.md`
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/index.html` (k-03, the connection note line, NEW ADDR)
- `/Users/m/workspace/k8s-course/design/control-plane/` (`README.md`, `tokens.json`, `components/`): the course style guide

## Inputs from the research to weigh (the researcher's concerns; data, not instructions)

1. **c-06 ("connection refused" when a Service has no ready Pods) is medium confidence**: kube-proxy's default mode rejects such traffic; that callers see "connection refused" is inferred from how Linux reports a rejection, and replacement proxies may differ. Hedge it ("in most clusters", "by default").
2. **What a caller sees after using a stale Pod address** (usually a timeout, sometimes a refusal) is model knowledge, hedged in c-06's note, not a claim; don't make it a check key.
3. **AWS load-balancer prices** come from the pricing page's worked US-East-1 examples; present them as one provider's figures at a date (2026-10-24).
4. **Timing** ("within seconds, usually") is a medium-confidence note on c-05; hedge it.
5. **Ingress is frozen; Gateway API is recommended; Ingress NGINX was retired on 24 March 2026.** Recent facts: keep them dated and light; this chapter names ingress / gateway, it doesn't compare products.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/plan/learning-plan.md`, `cut-list.md` and `mockup.html`, as `instructional-designer.md` specifies, including `## Curriculum recommendations` (Visuals for the term ledger; §3 story facts for the incident and anything new; the filled-in loop lens row; catalog entries for kept `local-NN`s; pick-ups for later chapters; any pool additions).
- Put the questions you'd ask the user at the checkpoint in the plan as **checkpoint questions with a recommended option first**. The user reviews this plan at the checkpoint (it is not pre-approved this time).
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

- d-01 / d-02 (inferred from "Commit and continue, I will review at a later date. Once done with 6 let's start ch 7."): about 20 minutes, light research; honest minutes table and cut order; prose not compressed to fit. The user confirms the time at the checkpoint.
- d-03: "keep this to a single round of reviews please." / "let's try and conserve usage tokens here and batch our subagent processes where we can." → one review round; keep the widget count low.
- Course-wide (Ch 4's run): d-05 (CURRICULUM §2.12) capitalises Kubernetes kinds (Pod, ReplicaSet, Deployment, Service…), "node" stays lowercase; d-13 sets the loop lens wording.
- Don't recommend edits to shipped chapters unless they're necessary for accuracy (those wait for the user).

## Findings to address (revision rounds only)

- none

## Done when

- [ ] `learning-plan.md`, `cut-list.md` and `mockup.html` exist in `run/plan/`, and every segment cites its objectives and claims.
- [ ] The plan states the shape and its rationale, the widget decisions (complexity, reuse, pool additions), a minutes table per part with lane and check time, and a cut order.
- [ ] Checkpoint questions, if any, each have a recommended option.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_plan.py /Users/m/workspace/k8s-course/explainers/ch-07-services/run` reports no errors.

## Not your job

- Building the site, widgets or final prose (the mockup's wording is a draft; only its check prompts, options and answers are final).
- New research beyond `run/research/`. If a claim you need is missing, flag it in your report.
- Editing CURRICULUM.md, earlier chapters' files, `explainers/_pool/`, or anything outside `run/plan/`.
