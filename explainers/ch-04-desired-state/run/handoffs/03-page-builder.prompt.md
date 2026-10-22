# Handoff 03 → page-builder (page-build)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. This file is your task.

## Original request (verbatim)

> now we're going to do chapter 4.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Build the Chapter 4 page ("Say what you want, not what to do: desired state and the reconcile loop") from the approved learning plan. That covers:
- the shell, tokens and ToC;
- the opening cast strip and the "I didn't read the last chapter" disclosure (D1), and every other disclosure in the plan's `## Disclosures`;
- all prose for s-01 to s-08;
- the four term cards (`.cp-term`; TERM 03 is the chapter's only payoff variant) as specified in the plan's `## Figures`;
- figures f-01 to f-05, including f-04's loop lens table built from `CH04_LOOPS` in `assets/page.js`, and the asides (the delegated-owner analogy and the helmsman aside, each with its WHERE THIS ANALOGY BREAKS line);
- every comprehension item k-01 to k-09, including k-03 and k-04, which sit in the step column of the lanes in s-04 and s-05;
- the s-04 and s-05 scaffolds and mounts for `w-cluster-scrolly` (two lanes);
- `site/widgets/manifest.json`.

**Split with the widget builder.** `w-cluster-scrolly` is `complexity: high`. A separate widget builder will build `site/widgets/w-cluster-scrolly/`, copied and extended from Ch 3's `w-fleet-scrolly` (`renderFleet` → `renderCluster`; the plan's `## Widgets` and `## Visual grammar` say what's added). You own the section markup around it: the lane containers, the positions of k-03 and k-04 as page-level `.cp-check` cards at their gates, and the event the controller listens for to unlock a gate (`didactician:check-commit` with the check id, as in Ch 3; make your check script dispatch it). Follow Ch 3's mount contract (documented in a comment in Ch 3's `site/index.html` and in its widget's `data.js`) unless the plan requires a change, and document the contract for this chapter in a comment in `index.html` and in your report, so the widget builder doesn't have to guess. Reserve heights per the plan and CURRICULUM.md §8 steps 5–6. f-01 to f-05 are yours: draw them with page-level classes in `site/assets/`; none may depend on the widget having loaded.

The mockup is the approved content and flow. Its prose is a draft, so write the real prose yourself to the plan's intents and `content:` points. Only its check prompts, options and feedback are final, and they must be used verbatim.

**Course consistency.** Ch 3 as committed (commit 5141855) is the reference implementation. Copy and adapt its `site/assets/page.css`, `page.js`, `components.css`, `toc.js`, `widget.js` and page skeleton: hero, ToC, cast strip `.cp-cast`, disclosures `.cp-more`, checks `.cp-check` with "Why the other answers miss", term card `.cp-term` and its payoff variant, `.cp-aside` with `.cp-breaks`, `.cp-quote`, `.cp-recap`, figure plates, sources footer, `.cp-machine` / `.cp-ctr` / `.cp-cluster`. The chapters should look and behave the same. Never edit Ch 1–3's files.

**Lessons from the user's reviews of Ch 1–3** (`/Users/m/workspace/k8s-course/explainers/ch-0{1,2,3}-*/run/review/human-review.md`; the plan's `## Shape` turns them into precise-language rules that bind you). In your prose especially:
- no sentence whose referent the reader must guess, no slogan lines, no "the picture" or "the figure" without its number, never equate two things in one breath (service ≠ copy ≠ container ≠ Pod; record of what's wanted vs. what's reported);
- no sentence that sends the reader to a label inside a figure;
- no meta lines about the course ("last chapter said…; commit before you read");
- side caveats go in the planned disclosures, not the body;
- every think-then-reveal prompt states its own question;
- things different in kind look different (a written intention, a running Pod, a loop), per `## Visual grammar`.

Show the time label as 20 minutes, and the hero kicker in the course pattern ("CHAPTER 04 · Part II · Fennel, year 3"; check Ch 3's hero for the exact form).

Other rules:
- Respect the plan's vocabulary guard exactly (never in the body: pending, eviction, requests, limits, rolling update, probe, Service, DNS, load balancer, autoscaling, namespace, etcd outside D6, taint, level-triggered outside D2, and the rest of the list). Kubernetes kinds are capitalised (Pod, ReplicaSet, Deployment), "node" lowercase (user decision d-05).
- Every timing carries "with default settings" or "by default" in the same sentence; recovery is "minutes", never "instant" or "seconds".
- Fennel facts are fiction (approved at d-04); never present them as statistics.
- Ch 2's accuracy review flagged: don't imply a version label can never move; images include basic OS files, just not a kernel; re-creating a container elsewhere includes downloading its image first.
- Use catalog IDs (m-03, m-04, m-05, m-06, m-27, local-01) only in comments or data, never in reader-visible text.
- Cite sources from `facts.md` in the sources footer, as Ch 3 does.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/plan/learning-plan.md`: the approved plan.
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/plan/mockup.html`: approved content and flow; checks final.
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/plan/cut-list.md`: what's out; don't re-add any of it.
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/facts.md`, and the earlier chapters' facts it references.
- Ch 3's site (read-only): `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/`, including `widgets/w-fleet-scrolly/` for the mount contract.
- `/Users/m/workspace/k8s-course/design/control-plane/` (README.md, tokens.json, control-plane.css, components/).
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §2 (incl. 2.11, 2.12), §8 steps 4–6 (style, term cards, widget height rule, scrollytelling convention).

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/`, except the contents of `site/widgets/<id>/`. You do write `site/widgets/manifest.json`.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, including the mount contract.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace

## User decisions that apply (quoted from run/decisions.md)

- d-01: "One chapter, ~20 min (Recommended)" → the built page should fit about 20 minutes of reading plus interaction. Don't trim prose to fit; report your honest estimate.
- d-03: "Approve" → build the plan as written.
- d-04: "Yes, use them (Recommended)" → use the Year 3 story facts (standard managed mode, Ari's team on nodes 01–04; moving day with `storefront:v38`, `replicas: 3`; the 03:04 repeat on a default-settings clock with `orders` down for those minutes; Pod names `orders-5c8x` → `orders-q2rw`; Ari's line "Nobody told it what to do. We told it what we want."; `notifications` crash-looping on a missing setting).
- d-05: "Yes, from Ch 4 on (Recommended)" → capitalise Kubernetes kinds as the API spells them (Pod, ReplicaSet, Deployment); "node" lowercase.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] All segments, disclosures, term cards, figures, asides and page checks in the plan are built, and the check text matches the mockup verbatim.
- [ ] `site/assets/tokens.css` is a copy of `design/control-plane/control-plane.css`, with no invented tokens or hard-coded colours.
- [ ] The s-04 / s-05 scaffolds and the `w-cluster-scrolly` mount follow the plan's sizes, the mount contract is documented, and `site/widgets/manifest.json` lists the widget (files data.js, index.js, index.css).
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-04-desired-state --phase page` passes. The widget being reported as pending is expected.

## Not your job

- Building `w-cluster-scrolly` itself (anything inside `site/widgets/w-cluster-scrolly/`).
- Editing the plan, research, CURRICULUM.md, the style guide, or Ch 1–3's files.
- Deployment.
