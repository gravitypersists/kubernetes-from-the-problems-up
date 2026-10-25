# Handoff 03 → page-builder (page-build)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. This file is your task.

## Original request (verbatim)

> Commit and continue, I will review at a later date. Once done with 6 let's start ch 7.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Build the Chapter 7 page ("Finding each other: services and traffic") from the approved plan: `run/plan/learning-plan.md` (shape, prose rules, vocabulary guard, segments s-01 to s-09, figures f-01 to f-06, term cards, visual grammar, checks k-01 to k-07, disclosures, acceptance criteria) and `run/plan/mockup.html` (approved content and flow). The mockup's wording is a draft: write the final prose to the plan's prose rules. **Only the mockup's check prompts, options and answers are final.** After writing, measure every choice check's option lengths and make sure no key is the longest option (reword distractors longer or keys shorter without changing meaning); report the lengths, key marked. Make sure nothing visible before a check is committed (standfirst, meta description, headings, captions, term cards, asides) gives its answer away (Ch 6's blocking P-01).

**One routing change from the plan.** The plan marks `w-services-scrolly` `complexity: low` for you, but it is the first consumer of a pool addition (pool-04), so a widget builder builds it **in parallel** (handoff 04), together with the pool change: lane S's `site/widgets/w-services-scrolly/data.js` (steps' text, snapshots) and f-04's two snapshots in the same file. You build everything else, including:
- the lane's mount in s-04, per the plan's `## Widgets` entry (canvas header, step column with k-03 after S2, gated steps S3–S4, the caption) and the pool's lane-mount contract in `explainers/_pool/README.md`;
- f-04's mount in s-06 (revealed after k-05), which draws the two snapshots from the same `data.js`, as Ch 6's f-03 did (Ch 6's `site/assets/page.js` shows how it read `window.ClusterData.FIGURES`; follow the same pattern and say in your report which keys you read);
- `site/widgets/manifest.json` listing `w-services-scrolly`.
Coordinate through the plan and the pool README, not by editing the widget folder. If the mount contract is ambiguous, pick the reading the README supports, and say so in your report.

The pooled `renderCluster` is gaining an optional Service block in the record panel and a `PODS[id].addr` field during your build (plan `## Widgets` → `reuse:`), and a fix that keeps the service name on 360px chips. `site/pool/` may be re-synced while you work; it's read-only for you either way.

Page components: read Ch 6's `site/assets/page.css` / `page.js` as the reference implementation of the course's components (cast strip, `.cp-more` disclosure, `.cp-check` with `didactician:check-commit`, `data-after` and the collapsed locked plate, `.cp-term` with the payoff variant, `.cp-aside` with `.cp-breaks`, `.cp-quote`, `.cp-dialog`, `.cp-recap`, the `.mf` manifest figure, the loop lens table builder, the incident timeline builder) and reimplement them in this chapter's `site/assets/`; don't edit Ch 6. f-06 is built from `CH07_LOOPS`: copy Ch 6's `CH06_LOOPS` forward (drop its `added` / `newPart` tags) and apply the plan's R3 rows (the endpoints loop replacing the dashed Chapter 7 row; kube-proxy, one per node), tagging this chapter's changes NEW IN CH 7. The hero's "Read" figure and the rail's `data-minutes` should be an honest estimate including checks and the lane (Ch 6 shipped saying 27 after its reviewer's estimate); don't trim prose to fit (d-05).

Afterwards run `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-07-services --phase page`; it must PASS (the lane may be reported pending if it isn't built yet). The orchestrator runs the full gate after both builders report.

## Inputs (read these; don't expect them pasted)

- `run/brief.md`, `run/plan/learning-plan.md`, `run/plan/cut-list.md`, `run/plan/mockup.html`, `run/research/facts.md` (all in `/Users/m/workspace/k8s-course/explainers/ch-07-services/`)
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md` (shared code; lane mount contract)
- `/Users/m/workspace/k8s-course/explainers/ch-06-rollouts/site/` (`index.html`, `assets/page.css`, `assets/page.js`): reference components, Ch 6's lane mount and f-03 mount
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/index.html` (f-02's manifest treatment) and `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/index.html` (k-03, the connection note line) as the plan references them
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

- d-05: "Approve (Recommended)" → the plan is approved with Q1 (a) one chapter, Q4 (a) the support-line aside, Q5 (a) "endpoints loop" and kube-proxy by name, Q6 (a) no hands-on widget, and the R2 story facts. About 20 minutes planned (22–25 likely): don't compress prose to fit, and don't cut (the cut order goes to the user).
- d-06: "Ch 5's Tuesday (Recommended)" → the incident is Ch 5's Tuesday OOM restarts with an empty `orders` list; "connection refused" always hedged ("in most clusters, by default").
- d-07: "Add it + fix 360px labels (Recommended)" → pool-04 is built by the widget builder in parallel.
- d-03: "keep this to a single round of reviews please." → build carefully; there is one review round and one fix round.
- Course-wide: Kubernetes kinds capitalised, "node" lowercase (CURRICULUM §2.12); the loop lens wording in §2.3.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every segment, figure, term card, disclosure and check in the plan is built, with the lane and f-04 mounted for the widget builder's files.
- [ ] Option lengths are reported per check, and no key is the longest.
- [ ] `verify.mjs --phase page` passes.

## Not your job

- `site/widgets/w-services-scrolly/`, the pool, the plan, the research, CURRICULUM.md, other chapters.
- Cutting content for length.
- Committing to git.
