# Handoff 06 → pedagogy-ux-reviewer (pedagogy-ux-r1)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/pedagogy-ux-reviewer.md`. This file is your task.

## Original request (verbatim)

> now we're going to do chapter 4.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Round-1 pedagogy and UX review of the built Chapter 4 page ("Say what you want, not what to do: desired state and the reconcile loop") of the course "Kubernetes for Technical Managers": about 20 minutes, objectives o-1 to o-4. Judge it against the brief and the approved plan:
- does each objective get taught and checked;
- do the two scrollytelling lanes (`w-cluster-scrolly`, s-04 and s-05) work as lanes, with gates, scroll-back restoring state, and the fallbacks at narrow or short viewports;
- are the misconceptions confronted as planned;
- does the Ch 1 payoff land;
- does the loop lens arrive as a reusable tool;
- does the page fit its reading time.

**Course conventions to check:**
- CURRICULUM.md §2, all twelve principles, especially §2.11 (cast strip and "I didn't read the last chapter" disclosure) and §2.12 (Kubernetes kinds capitalised, "node" lowercase);
- §8 step 4: the style guide and term cards, with at most one payoff variant;
- §8 step 5: widget height rule;
- §8 step 6: scrollytelling convention;
- Ch 1–3 as built are the reference for look and behaviour.

**Style guide.** Every chapter uses the Control Plane style guide in `/Users/m/workspace/k8s-course/design/control-plane/` (README.md: voice, colour rules, type, space, figure and widget conventions; `tokens.json` usage notes; `components/`). `site/assets/tokens.css` must be a copy of `control-plane.css`; no invented tokens or hard-coded colours. Check the page against the guide as part of the UX review.

**The user's own review standards.** Read the user's human reviews of Ch 1–3 (`/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/human-review.md`, `…/ch-02-containers/run/review/human-review.md`, `…/ch-03-orchestration/run/review/human-review.md`) and apply the same standards. That user will review this page too. Their recurring points:
- precise language: no ambiguous pronouns, no sentences that refer to "the picture" or "the rest" unexplained, no slogans;
- no meta lines about the course;
- analogies that really are analogies, each with a clear "where it breaks";
- pedantic caveats in progressive disclosure;
- key terms with more flair than a `dfn`;
- think-then-reveal prompts that state their own question;
- checks that aren't judgment calls without a right answer;
- things different in kind drawn differently;
- section purposes that are plain;
- forward-looking transitions.

Drive the page in a browser at 360, 768 and 1280 widths, in light and dark. Commit checks, scroll both lanes forward and back, and try a short viewport.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/plan/learning-plan.md`, `cut-list.md`, `mockup.html` (approved plan; check text in the mockup is final)
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/` (index.html, assets/, widgets/w-cluster-scrolly/)
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/screenshots/page-round-3/` and `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/gate/page-round-3.json` (gate results; legibility and pager warnings are for you)
- `/Users/m/workspace/k8s-course/CURRICULUM.md`
- `/Users/m/workspace/k8s-course/design/control-plane/`
- Ch 3 as built, for consistency: `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/`
- The three human reviews listed above.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/review/round-1/pedagogy-ux.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`)
- Probe screenshots in `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/screenshots/probe/`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace. Yours is `run/review/round-1/` (your file) and `run/screenshots/probe/`.

## User decisions that apply (quoted from run/decisions.md)

- d-01: "One chapter, ~20 min (Recommended)" → judge fit against ~20 minutes; report your estimate. Over-length is a finding to route to the plan's cut order, not a reason to recommend trimming prose.
- d-03: "Approve" → the plan's shape (two lanes, no hands-on widget) is approved; judge execution, not the shape.
- d-04: "Yes, use them (Recommended)" → the Year 3 story facts are approved.
- d-05: "Yes, from Ch 4 on (Recommended)" → Pod, ReplicaSet capitalised; "node" lowercase.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every objective, lane, check, figure, disclosure and term card has been reviewed at the three widths; each problem is a finding with severity, location, evidence and expected fix.
- [ ] `pedagogy-ux.md` follows the review template and includes a reading-time estimate.

## Not your job

- Fact-checking (the accuracy reviewer's lane), beyond flagging something that looks wrong.
- Fixing anything; editing the site, plan or research.
