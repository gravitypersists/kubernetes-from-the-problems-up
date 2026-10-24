# Handoff 03 → page-builder (page-build)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. This file is your task.

## Original request (verbatim)

> Let's commit chapter 5 and then get chapter 6 going.

Then: "auto approve plan, I'll be stepping away from computer and I trust you'll pick right". (The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Build the Chapter 6 page ("Shipping without downtime: rollouts and rollbacks") from the approved plan: `run/plan/learning-plan.md` (shape, prose rules, vocabulary guard, segments s-01 to s-10, figures f-01 to f-07, term cards, visual grammar, checks k-01 to k-07, disclosures, acceptance criteria) and `run/plan/mockup.html` (approved content and flow). The mockup's wording is a draft: write the final prose to the plan's prose rules. **Only the mockup's check prompts, options and answers are final.** After writing, measure every choice check's option lengths and make sure no key is the longest option (reword distractors longer or keys shorter without changing meaning); report the lengths, key marked.

**One routing change from the plan.** The plan's `w-rollout-scrolly` widget (lane R, s-03, and f-03's two snapshots) is **not yours**: a widget builder builds it in parallel, together with the three pool renderer additions it needs. You build everything else, including:
- the lane's mount in s-03, per the plan's `## Widgets` entry (canvas header, step column with k-02 between R2 and R3, gated steps R3–R5, the caption) and the pool's lane-mount contract in `explainers/_pool/README.md`; the widget builder supplies `site/widgets/w-rollout-scrolly/` (`data.js` with the steps' text, and any `index.js` / `index.css`);
- f-03's mount in s-06 (revealed after k-04), which draws `FIGURES.crash` and `FIGURES.shipped` from the same `data.js`;
- `site/widgets/manifest.json` listing `w-rollout-scrolly`.
Coordinate through the plan and the pool README, not by editing the widget folder. If the mount contract is ambiguous, pick the reading the README supports, and say so in your report.

The pooled `renderCluster` is gaining three optional fields during your build (a Deployment group in the record panel, a `notready` status, per-Pod `series` colour; plan `## Widgets` → `reuse:`). `site/pool/` may be re-synced while you work; it's read-only for you either way.

Page components: read Ch 5's `site/assets/page.css` / `page.js` as the reference implementation of the course's components (cast strip, `.cp-more` disclosure, `.cp-check` with `didactician:check-commit` and `data-after`, `.cp-term` with the payoff variant, `.cp-aside` with `.cp-breaks`, `.cp-quote`, `.cp-recap`, the `.mf` manifest figure, the loop lens table builder) and reimplement them in this chapter's `site/assets/`; don't edit Ch 5. Apply Ch 5's late fix for the inline TRY AGAIN button (its `page.css`: the 44px minimum height must not open a gap in a feedback line). f-07 is built from `CH06_LOOPS`: copy Ch 5's `CH05_LOOPS` forward (drop its `added` / `newPart` tags) and apply the plan's R3 rows, tagging this chapter's changes.

Afterwards run `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-06-rollouts --phase page`; it must PASS (the lane may be reported pending if it isn't built yet). The orchestrator runs the full gate after both builders report.

## Inputs (read these; don't expect them pasted)

- `run/brief.md`, `run/plan/learning-plan.md`, `run/plan/cut-list.md`, `run/plan/mockup.html`, `run/research/facts.md` (all in `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/`)
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md` (shared code; lane mount contract)
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/` (`index.html`, `assets/page.css`, `assets/page.js`): reference components and Ch 5's lane mount
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/index.html` (f-02's manifest, which f-01 extends)
- `/Users/m/workspace/k8s-course/explainers/ch-02-containers/site/index.html` (the registry drawing f-06 sits beside)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §2, §3, §5, §8 steps 4–7
- The user's human reviews: `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/review/human-review-01.md` and `human-review-02.md`

**Style.** Every chapter uses the Control Plane style guide in `/Users/m/workspace/k8s-course/design/control-plane/`. Use the course tokens from `site/pool/tokens.css`; don't invent tokens or hard-code colours. Follow `README.md`, the `tokens.json` usage notes and the `components/` treatments (`components/bundle.css`). Reference shared files as `pool/<file>`; don't copy kit files into `site/assets/`. Chapter-only CSS and JS go in `site/assets/`.

## Outputs (write only these)

- `site/` except `site/widgets/*/*` and `site/pool/`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, including the option lengths per check.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace (above).

## User decisions that apply (quoted from run/decisions.md)

- d-01: "20 minutes (Recommended)" → the plan is about 22; don't compress prose to fit, and don't cut (the cut order goes to the user).
- d-03: "keep this to a single round of reviews please." → build carefully; there is one review round and one fix round.
- d-04: "auto approve plan, I'll be stepping away from computer and I trust you'll pick right" / d-05: the plan approved with checkpoint options Q1 (a) one chapter, Q2 (a) the `catalog` story facts in R2, Q3 (a) the pool additions, Q4 (a) the shift-handover aside.
- Course-wide: Kubernetes kinds capitalised, "node" lowercase (CURRICULUM §2.12); the loop lens wording in §2.3; Ch 5's d-07 (sandbox scroll exception; not relevant here).

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every segment, figure, term card, disclosure and check in the plan is built, with the lane and f-03 mounted for the widget builder's files.
- [ ] Option lengths are reported per check, and no key is the longest.
- [ ] `verify.mjs --phase page` passes.

## Not your job

- `site/widgets/w-rollout-scrolly/`, the pool, the plan, the research, CURRICULUM.md, other chapters.
- Cutting content for length.
- Committing to git.
