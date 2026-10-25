# Handoff 06 → pedagogy-ux-reviewer (pedagogy-ux-r1)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/pedagogy-ux-reviewer.md`. This file is your task.

## Original request (verbatim)

> Commit and continue, I will review at a later date. Once done with 6 let's start ch 7.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Round-1 pedagogy and UX review of the built Chapter 7 page ("Finding each other: services and traffic") in the course "Desired state: Kubernetes from the problems up". The page runs about 20 minutes and covers objectives o-1 to o-3. **This is the only review round** (d-03), so make each finding complete enough to fix without a follow-up.

Judge the page against the brief and the approved plan:
- **Objectives:** is each objective taught and checked (k-01 to k-07)?
- **The lane:** does the scrollytelling lane `w-services-scrolly` (lane S, S1–S4, s-04, "Thursday … from storefront's side") work as a lane? Check:
  - the scene is set up first: what the Service's block in the record panel is, what its READY PODS list shows, why only nodes 05 and 06 are drawn;
  - the k-03 gate after S2;
  - scroll-back restores state;
  - the fallbacks at narrow or short viewports;
  - the Service, its list and the calls note look different in kind from the Pods;
  - the narrow-chip labels at 360px;
  - the header reads "Thursday · catalog" instead of the plan's longer name (shortened to fit). Is that clear enough?
- **The incident:** does the Tuesday incident land (k-05, then f-04's two snapshots: the empty `orders` list while its only Pod restarts, then refilled)? Is "connection refused" hedged without getting in the way?
- **Misconceptions:** are m-10 and the plan's kept local misconceptions confronted as planned?
- **The loop lens:** does it arrive as a reused tool (the endpoints loop's row in f-06, building on Ch 6's table)? Is kube-proxy placed clearly, as something that isn't a reconcile loop over the record in the same way?
- **The support-line analogy:** does it work as an analogy, coming after the reader knows what a Service is, with a clear "where it breaks"?
- **Earlier promises:** do they land without bookkeeping lines?
  - Ch 3's by-hand address passing, after Sam's 03:04 and the NEW ADDR status;
  - Ch 4's "another loop (Chapter 7)";
  - Ch 6's "only ready Pods get traffic, by a loop we'll name in Chapter 7";
  - Ch 6's bridge: every release brings new Pod addresses.
- **The conversation (k-07):** does it ask its question clearly? "We want a separate load balancer for every service." The cost, and one ingress / gateway.
- **Reading time:** does the page fit? The page claims 24 minutes. Report your own estimate, including checks and the lane.
- **Giveaways:** check that nothing visible before a check gives its answer away: the standfirst, meta description, headings, captions, term cards and asides. Ch 6's blocking P-01 was exactly this. The page builder flagged that the heading "Addresses that don't stay put" may lean toward k-02's answer, so judge it. Keys should never be the longest option. k-01's margin is thin: 77 vs 78/80 characters.

**Course conventions to check:**
- CURRICULUM.md §2, all twelve principles. Look especially at:
  - §2.3: the loop lens and its table;
  - §2.11: the cast strip and the "I didn't read the last chapter" disclosure;
  - §2.12: Kubernetes kinds capitalised, "node" lowercase.
- §8 step 4: the style guide and term cards, with at most one payoff variant.
- §8 step 5: the shared pool (the page loads `pool/…`; nothing from the kit copied into `site/assets/`).
- §8 step 6: the widget height rule.
- §8 step 7: the scrollytelling convention.
- Ch 1–6 as built are the reference for look and behaviour. Ch 6 matters most, because it shares the cluster drawing and the component set.

**Style guide.** Every chapter uses the Control Plane style guide in `/Users/m/workspace/k8s-course/design/control-plane/`:
- `README.md`: voice, colour rules, type, space, figure and widget conventions;
- the usage notes in `tokens.json`;
- `components/`.

The course tokens come from the shared pool (`site/pool/tokens.css`). No invented tokens or hard-coded colours belong in `site/assets/` or the widget. Check the page against the guide as part of the UX review.

**The user's own review standards.** Read the user's human reviews and apply the same standards. That user will review this page too. The reviews are:
- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/human-review.md`
- `…/ch-02-containers/run/review/human-review.md`
- `…/ch-03-orchestration/run/review/human-review.md`
- `…/ch-04-desired-state/run/review/human-review-01.md` and `human-review-02.md`

Their recurring points:
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

Drive the page in a browser:
- at 360, 768 and 1280 widths, in light and dark;
- commit checks, with right and wrong options;
- scroll the lane forward and back;
- try a short viewport.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/plan/learning-plan.md`, `cut-list.md`, `mockup.html` (approved plan; check text in the mockup is final)
- `/Users/m/workspace/k8s-course/explainers/ch-07-services/site/` (index.html, assets/, widgets/w-services-scrolly/)
- `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/screenshots/page-round-4/` and `run/gate/page-round-4.json` (gate results; legibility warnings are for you)
- `/Users/m/workspace/k8s-course/CURRICULUM.md`
- `/Users/m/workspace/k8s-course/design/control-plane/`
- Ch 6 as built, for consistency: `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/`
- The five human reviews listed above.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/review/round-1/pedagogy-ux.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`)
- Probe screenshots in `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/screenshots/probe/` (prefix them `pux-r1-`)
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
- d-05: "Approve (Recommended)" → the plan's shape and story facts are approved, so judge execution, not the shape. The approved shape is:
  - one lane;
  - f-04 as a revealed two-panel figure;
  - the support-line aside;
  - the "endpoints loop" and kube-proxy by name;
  - no hands-on address widget.
- d-01 / d-05: about 20 minutes (22–25 likely) → judge fit against ~20 minutes and report your estimate. Over-length is a finding to route to the plan's cut order (`cut-list.md`, `## If it runs long`), not a reason to recommend trimming prose.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every objective, the lane, f-04, every check, figure, disclosure and term card has been reviewed at the three widths. Each problem is a finding with severity, location, evidence and expected fix.
- [ ] `pedagogy-ux.md` follows the review template and includes a reading-time estimate.

## Not your job

- Fact-checking (the accuracy reviewer's lane), beyond flagging something that looks wrong.
- Fixing anything; editing the site, plan or research.
