# Handoff 06 → pedagogy-ux-reviewer (pedagogy-ux-r1)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/pedagogy-ux-reviewer.md`. This file is your task.

## Original request (verbatim)

> Let's commit chapter 5 and then get chapter 6 going.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Round-1 pedagogy and UX review of the built Chapter 6 page ("Shipping without downtime: rollouts and rollbacks") of the course "Desired state: Kubernetes from the problems up": about 20 minutes, objectives o-1 to o-3. **This is the only review round** (d-03): make each finding complete enough to fix without a follow-up. Judge it against the brief and the approved plan:
- does each objective get taught and checked (k-01 to k-07);
- does the scrollytelling lane `w-rollout-scrolly` (lane R, R1–R5, s-03) work as a lane: scene set up first (where `catalog` runs, why only nodes 05 and 06 are drawn, how to read the Deployment row and the version colours), the k-02 gate, scroll-back restoring state, the fallbacks at narrow or short viewports;
- does the core contrast land (k-04 then f-03: a crashing v64 stalls with v63 still serving; a $0 v64 rolls out completely), and are the locked blocks after k-04 and k-06 reasonable (they reserve their full height: about 1,300px of blank space on desktop under k-04);
- are the misconceptions (m-09, local-01 to local-03) confronted as planned;
- are old vs. new version, ready vs. not ready, alive vs. ready, and the record vs. what's running drawn so they look different in kind;
- does the loop lens arrive as a reused tool (the Deployment loop's row in f-07, building on Ch 5's table);
- do the earlier chapters' promises land without bookkeeping lines (Ch 5's bridge: a loop takes over Sam's by-hand update "without anyone having to type 'Nobody deploy anything'"; Ch 4's "Engineers usually write a Deployment… Chapter 6 shows how"; tags vs. digests from Ch 2; level-based behaviour from Ch 4's D2; a rollout needing spare room from Ch 5);
- does the shift-handover analogy really work as an analogy, with a clear "where it breaks";
- does the page fit its reading time? Report your estimate.

**Course conventions to check:**
- CURRICULUM.md §2, all twelve principles, especially §2.3 (loop lens; the loop lens table), §2.11 (cast strip and "I didn't read the last chapter" disclosure) and §2.12 (Kubernetes kinds capitalised, "node" lowercase);
- §8 step 4: the style guide and term cards, with at most one payoff variant;
- §8 step 5: shared pool (the page loads `pool/…`; nothing from the kit copied into `site/assets/`);
- §8 step 6: widget height rule;
- §8 step 7: scrollytelling convention;
- Ch 1–5 as built are the reference for look and behaviour (Ch 5 especially, which shares the cluster drawing).

**Style guide.** Every chapter uses the Control Plane style guide in `/Users/m/workspace/k8s-course/design/control-plane/` (README.md: voice, colour rules, type, space, figure and widget conventions; `tokens.json` usage notes; `components/`). The course tokens come from the shared pool (`site/pool/tokens.css`); no invented tokens or hard-coded colours in `site/assets/` or the widget. Check the page against the guide as part of the UX review.

**The user's own review standards.** Read the user's human reviews (`/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/human-review.md`, `…/ch-02-containers/run/review/human-review.md`, `…/ch-03-orchestration/run/review/human-review.md`, `…/ch-04-desired-state/run/review/human-review-01.md` and `human-review-02.md`) and apply the same standards. That user will review this page too. Their recurring points:
- readable prose: varied sentence length, flowing cause and effect, not telegraphic fragments; clear active verbs;
- ground before you use: set up a scene before a lane; say what a component is and does before any analogy; establish something is running before showing it act; name actors precisely;
- precise language: no ambiguous pronouns, no sentences that refer to "the picture" or "the rest" unexplained, no slogans;
- no meta lines about the course;
- analogies that really are analogies, each with a clear "where it breaks";
- pedantic caveats in progressive disclosure;
- key terms with more flair than a `dfn`;
- think-then-reveal prompts that state their own question;
- checks that aren't judgment calls without a right answer, with no giveaways (right option not the longest, not echoing a nearby caption or term card);
- things different in kind drawn differently;
- section purposes that are plain;
- forward-looking transitions.

Drive the page in a browser at 360, 768 and 1280 widths, in light and dark. Commit checks (right and wrong options), scroll the lane forward and back, and try a short viewport.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/plan/learning-plan.md`, `cut-list.md`, `mockup.html` (approved plan; check text in the mockup is final)
- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/` (index.html, assets/, widgets/w-rollout-scrolly/)
- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/screenshots/page-round-5/` and `run/gate/page-round-5.json` (gate results; legibility warnings are for you)
- `/Users/m/workspace/k8s-course/CURRICULUM.md`
- `/Users/m/workspace/k8s-course/design/control-plane/`
- Ch 5 as built, for consistency: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/`
- The five human reviews listed above.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/review/round-1/pedagogy-ux.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`)
- Probe screenshots in `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/screenshots/probe/` (prefix them `pux-r1-`)
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

- d-03: "keep this to a single round of reviews please." → this is the only review round.
- d-05 (under d-04, "auto approve plan, I'll be stepping away from computer and I trust you'll pick right"): the plan's shape (one lane, f-03 as a revealed two-panel figure, rollback as static figures, the shift-handover aside) and its invented `catalog` story facts are approved; judge execution, not the shape.
- d-01: "20 minutes (Recommended)" → judge fit against ~20 minutes (the plan estimates ~22); report your estimate. Over-length is a finding to route to the plan's cut order (`cut-list.md`, `## If it runs long`), not a reason to recommend trimming prose.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every objective, the lane, f-03, every check, figure, disclosure and term card has been reviewed at the three widths; each problem is a finding with severity, location, evidence and expected fix.
- [ ] `pedagogy-ux.md` follows the review template and includes a reading-time estimate.

## Not your job

- Fact-checking (the accuracy reviewer's lane), beyond flagging something that looks wrong.
- Fixing anything; editing the site, plan or research.
