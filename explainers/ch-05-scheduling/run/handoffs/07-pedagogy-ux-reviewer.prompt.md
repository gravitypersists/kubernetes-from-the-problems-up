# Handoff 07 → pedagogy-ux-reviewer (pedagogy-ux-r1)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/pedagogy-ux-reviewer.md`. This file is your task.

## Original request (verbatim)

> let's apply the R1-R12 now and start chapter 5 now

Resumed in a later session with:

> yes, close chapter 4 first. commit it, push it, then verify 2 and finish chapter 5

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Round-1 pedagogy and UX review of the built Chapter 5 page ("Who runs where: scheduling, resources and cost") of the course "Desired state: Kubernetes from the problems up": about 26 minutes, objectives o-1 to o-3. Judge it against the brief and the approved plan:
- does each objective get taught and checked (k-01 to k-09);
- does the scrollytelling lane `w-friday-scrolly` (lane F, F1–F5, s-03) work as a lane: scene set up first, the k-03 gate, scroll-back restoring state, the fallbacks at narrow or short viewports;
- does the sandbox `w-sizing-sandbox` (s-04) earn its place as hands-on exploration rather than busywork: is its goal clear, does inflating requests visibly add nodes, cost and waiting Pods, are its controls usable by tap and keyboard, is its state legible at 360px, and is the over-requesting lesson reachable;
- are the misconceptions (m-07, m-08, m-26, m-28 retrieval if used) confronted as planned;
- are reserved (request), used, and capped (limit) drawn so they look different in kind;
- does the loop lens arrive as a reused tool (the scheduler's row, f-06), building on Ch 4's table;
- do Ch 4's promises land (the bridge to Morgan's bill; D4's "that room is the subject of Chapter 5"; "how it chooses is Chapter 5");
- does the page fit its reading time. Report your estimate.

**Course conventions to check:**
- CURRICULUM.md §2, all twelve principles, especially §2.3 (loop lens: which loop · wants · sees · does; the loop lens table), §2.11 (cast strip and "I didn't read the last chapter" disclosure) and §2.12 (Kubernetes kinds capitalised, "node" lowercase);
- §8 step 4: the style guide and term cards, with at most one payoff variant;
- §8 step 5: shared pool (the page loads `pool/…`; nothing from the kit copied into `site/assets/`);
- §8 step 6: widget height rule, with the sandbox exception the user accepted (d-07, below);
- §8 step 7: scrollytelling convention;
- Ch 1–4 as built are the reference for look and behaviour (Ch 4 especially, which shares the cluster drawing).

**Style guide.** Every chapter uses the Control Plane style guide in `/Users/m/workspace/k8s-course/design/control-plane/` (README.md: voice, colour rules, type, space, figure and widget conventions; `tokens.json` usage notes; `components/`). The course tokens come from the shared pool (`site/pool/tokens.css`, a copy of `control-plane.css`); no invented tokens or hard-coded colours in `site/assets/` or the widgets. Check the page against the guide as part of the UX review.

**The user's own review standards.** Read the user's human reviews (`/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/human-review.md`, `…/ch-02-containers/run/review/human-review.md`, `…/ch-03-orchestration/run/review/human-review.md`, `…/ch-04-desired-state/run/review/human-review-01.md` and `human-review-02.md`) and apply the same standards. That user will review this page too. Their recurring points:
- readable prose: varied sentence length, flowing cause and effect, not telegraphic fragments; clear active verbs;
- ground before you use: set up a scene before a lane; say what a component is and does before any analogy; establish something is running before showing it act; name actors precisely;
- precise language: no ambiguous pronouns, no sentences that refer to "the picture" or "the rest" unexplained, no slogans;
- no meta lines about the course;
- analogies that really are analogies, each with a clear "where it breaks";
- pedantic caveats in progressive disclosure;
- key terms with more flair than a `dfn`;
- think-then-reveal prompts that state their own question;
- checks that aren't judgment calls without a right answer, with no giveaways (right option not the longest, not echoing a nearby caption);
- things different in kind drawn differently;
- section purposes that are plain;
- forward-looking transitions.

Drive the page in a browser at 360, 768 and 1280 widths, in light and dark. Commit checks, scroll the lane forward and back, use the sandbox (default, everything inflated, everything minimal), and try a short viewport.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/plan/learning-plan.md`, `cut-list.md`, `mockup.html` (approved plan; check text in the mockup is final)
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/` (index.html, assets/, widgets/w-friday-scrolly/, widgets/w-sizing-sandbox/)
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/screenshots/page-round-4/` and `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/gate/page-round-4.json` (gate results; legibility and pager warnings are for you)
- `/Users/m/workspace/k8s-course/CURRICULUM.md`
- `/Users/m/workspace/k8s-course/design/control-plane/`
- Ch 4 as built, for consistency: `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/`
- The five human reviews listed above.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/review/round-1/pedagogy-ux.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`)
- Probe screenshots in `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/screenshots/probe/` (prefix them `pux-r1-`)
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

- d-03: "Approve" → the plan's shape (one lane, one hands-on sandbox) and its invented story facts are approved; judge execution, not the shape.
- d-04: "(b) Fix Ch 4 (Recommended)" → Ch 4's moving day follows the default scheduler; Ch 5 uses it as a worked example.
- d-05: "keep one chapter, don't cut, I will consider cut in human review (note it in output to consider cutting)" → judge fit against ~26 minutes; report your estimate. Over-length is a finding to route to the plan's cut order (`cut-list.md`, `## If it runs long`), not a reason to recommend trimming prose.
- d-07: "Accept the exception (Recommended)" → sandboxes with controls at the top don't scroll their header to the top on a state change under 600px; stepped and multi-state widgets still follow the rule. Don't raise the sandbox's lack of scroll-to-header as a finding.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every objective, the lane, the sandbox, every check, figure, disclosure and term card has been reviewed at the three widths; each problem is a finding with severity, location, evidence and expected fix.
- [ ] `pedagogy-ux.md` follows the review template and includes a reading-time estimate.

## Not your job

- Fact-checking (the accuracy reviewer's lane), beyond flagging something that looks wrong.
- Fixing anything; editing the site, plan or research.
