# Handoff 04 → page-builder (page-build)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. This file is your task.

## Original request (verbatim)

> Let's start ch 3 now, notes from the last run "
> Ch 3 is next. Its entry already has the retrieval opener, the instruction to place Docker, and the note to reuse Ch 2's container drawings for its placement widget."

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Build the Chapter 3 page ("Many containers, many machines: the orchestration problem") from the approved learning plan. That covers:
- the shell, tokens and ToC;
- the opening cast strip and the "I didn't read the last chapter" disclosure (D1), and every other disclosure D2–D8;
- all prose for s-01 to s-07;
- the term cards (`.cp-term`, including the Kubernetes payoff variant) as specified in the plan's `## Figures`;
- figures f-01 and f-02;
- every comprehension item k-01 to k-09, including k-02, k-03 and k-04, which sit in the step column of the §02 scrollytelling lanes;
- the §02 scaffold and mount for `w-fleet-scrolly`;
- `site/widgets/manifest.json`.

**Split with the widget builder.** `w-fleet-scrolly` is `complexity: high`; a separate widget builder will build `site/widgets/w-fleet-scrolly/` (`data.js` with the lane/step snapshots and step text, `index.js` with `renderFleet` and the scrolly controller, `index.css`). You own the §02 section markup around it: the lane containers, the positions of k-02, k-03 and k-04 as page-level `.cp-check` cards at their gates, and the event the controller listens for to unlock a gate (the plan names `didactician:check-commit` with the check id; make your check script dispatch it). Define the mount contract (DOM structure, ids, data attributes, where step text and canvases are rendered) in a comment in `index.html` and in your report, so the widget builder can follow it without guessing. Reserve heights per the plan and CURRICULUM.md §8 step 5–6. f-02 is yours: draw it with page-level chip classes in `site/assets/`; it must not depend on the widget having loaded.

The mockup is the approved content and flow. Its prose is a draft, so write the real prose yourself to the plan's intents. Only its check prompts, options and feedback are final, and they must be used verbatim.

**Course consistency.** Ch 2 is the most recent reference implementation, but another agent is rebuilding Ch 2's site right now. Read Ch 2's files **as of commit b661656** (`git -C /Users/m/workspace/k8s-course show b661656:explainers/ch-02-containers/site/assets/page.css`, etc.), not the working tree. Copy and adapt its `assets/page.css` and `assets/page.js` patterns (hero, ToC, check behaviour with "Why the other answers miss", figure plates, asides with "where this analogy breaks", disclosures with ink ▸/▾ markers, sources footer, `.cp-machine` / `.cp-ctr` chips) so the chapters look and behave the same. Don't copy Ch 2's `w-samecode` stepped-widget pattern: the user rejected it. Never edit Ch 1's or Ch 2's files.

**Lessons from the user's reviews of Ch 1 and Ch 2** (`/Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/human-review.md`, `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/human-review.md`; the plan's `## Ch 2 review lessons` maps them). In your prose especially:
- precise language: no sentence whose referent the reader must guess, no slogan lines ("layers, not rivals"), no "the picture" without saying which, never equate two things in one breath;
- no sentence that sends the reader to a label inside a figure;
- side caveats go in the planned disclosures, not the body;
- every think-then-reveal prompt states its own question.

Show the time label as 15 minutes, and the hero kicker in the course pattern ("CHAPTER 03 · Part I · Fennel, year 2").

Other rules:
- Respect the plan's vocabulary guard (no node, pod, replica, scheduler, desired state, etc.). The chapter introduces exactly orchestration / orchestrator, cluster and Kubernetes, at the places the plan says.
- Fennel facts are fiction (approved at d-04); never present them as statistics.
- Respect the sourcing caveats in the plan: the 12–18% figure is a hedged 2014 estimate (with D5); no figure for deploy pain or recovery hours; "Google still runs on Borg" only "as of 2016"; Docker and Kubernetes are "not competitors in the usual sense".
- Ch 2's accuracy review flagged: don't imply a version label can never move; images usually include basic OS files, just not a kernel; re-creating a container elsewhere includes pulling its image first.
- Use catalog IDs (m-02, m-23, m-25, m-27; the plan's local-01 is now m-25 and local-03 is now m-27) only in comments or data, never in reader-visible text.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/learning-plan.md`: the approved plan.
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/mockup.html`: approved content and flow; checks final.
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/plan/cut-list.md`: what's out; don't re-add any of it.
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/research/facts.md`, and the Ch 1/Ch 2 facts it references.
- Ch 2's site at commit b661656 (read-only, via `git show`), and `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/site/` (read-only).
- `/Users/m/workspace/k8s-course/design/control-plane/` (README.md, tokens.json, control-plane.css, components/).
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §8 steps 4–6 (style, widget height rule, scrollytelling convention, term cards).

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/`, except the contents of `site/widgets/<id>/`. You do write `site/widgets/manifest.json`.
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

- d-01: "15 minutes (Recommended)" → the built page should fit about 15 minutes of reading plus interaction. Don't trim prose to fit; report the estimate.
- d-03: "…review if the widget is serving a pedagogical need or if we're unnecessarily increasing cognitive load when a scrollytelling portion of the article would do better at showing stages of progression." → §02 is scrollytelling (plan revision 1), not a hands-on widget.
- d-04: "Yes, use them" (copies and sizes per service, 02:51 crash and 03:04 machine failure, storefront v12→v13, Sam's "Nobody deploy anything", Morgan's "Could four do it?") → use these story facts.
- d-06: "Approve" → build the revised plan as written.
- d-07: "Accept (Recommended)" → the reader makes Sam's key decisions (k-02, k-03, k-04) rather than placing by hand.
- d-08: "R13 scrolly pattern, R14 term card, R15 jump-ahead opening" → these are now course conventions (CURRICULUM.md §2.11, §8 steps 4 and 6); build them so later chapters can copy them.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] All segments, disclosures, term cards, figures and page checks in the plan are built, and the check text matches the mockup verbatim.
- [ ] `site/assets/tokens.css` is a copy of `design/control-plane/control-plane.css`, with no invented tokens or hard-coded colours.
- [ ] The §02 scaffold and `w-fleet-scrolly` mount follow the plan's sizes, the mount contract is documented, and `site/widgets/manifest.json` lists the widget (files data.js, index.js, index.css).
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-03-orchestration --phase page` passes. The widget being reported as pending is expected.

## Not your job

- Building `w-fleet-scrolly` itself (anything inside `site/widgets/w-fleet-scrolly/`).
- Editing the plan, research, CURRICULUM.md, the style guide, or Ch 1's or Ch 2's files.
- Deployment.
