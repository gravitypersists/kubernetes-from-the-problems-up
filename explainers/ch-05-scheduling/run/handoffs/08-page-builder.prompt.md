# Handoff 08 → page-builder (r1-fixes-page)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. This file is your task. You are a fresh page builder (a respawn: the builder of handoff 03 was in an earlier session). Its report, `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/handoffs/03-page-builder.report.md`, tells you how the page is built.

## Original request (verbatim)

> let's apply the R1-R12 now and start chapter 5 now

Resumed in a later session with:

> yes, close chapter 4 first. commit it, push it, then verify 2 and finish chapter 5

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Fix the round-1 review findings that belong to the page (everything in `site/` outside `site/widgets/<id>/`). **This is the only fix round** (user decision d-08, below): there is no closure review, so each fix must be complete, and anything you dispute or can't fix goes to the user with your evidence.

The findings, with severity, location, evidence and suggested fix, are in `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/review/round-1/findings.md`. The suggested fixes are suggestions: keep the meaning and the plan's intent, and write in the course's prose standard (brief, "Readability"). Two widget builders work in parallel on `w-friday-scrolly` and `w-sizing-sandbox`; don't touch their folders.

Yours:
- **P-01 (blocking)**: no check's key may be the longest option. After your edits, measure every choice check's option lengths (k-01 to k-09) and report them, key marked. Rebalance by rewording keys shorter or distractors longer, never by changing what an option means or which one is right.
- **P-02**: k-05's distractors must not be refuted by the W-02 caption above them, and must still carry m-08. Shorten TERM 01's definition so it no longer gives away k-02.
- **A-01 and P-03** (same issue): k-09's reveal pointer into W-02 must be reproducible from the sandbox's default state. Verify it yourself in the browser, and report the exact steps and the node counts you saw.
- **A-02 and P-07** (same issue): k-08 option A's feedback must match the story numbers (only `orders` goes over when requests are halved).
- **P-04**: Morgan's answer counts node 06 twice; restructure as suggested.
- **P-05**: remove the course-bookkeeping lines listed; keep the content. A-09 overlaps (Chapter 3 never said "insurance"): fix both together.
- **P-06**: ground "moving day" in D1 (and add `notifications`' crash loop there), and gloss it inline in s-02.
- **P-08 (page part)**: remove "the exact wording varies between Kubernetes versions" from the paragraph after TERM 02; the W-01 caption keeps it. (The lane F builder removes it from F3's step text.)
- **A-08 / P-09 (page part)**: the sandbox builder is renaming the idle bar's head to **"Room for Pods on the rented nodes"** (A-08: the bar shows the 65 GB of room for Pods, not the 80 GB rented). In s-04, refer to the bar by that printed name and don't call it "the room Fennel rents". In s-05, call the switch by its printed name, "Keep room to lose a node".
- **P-10**: k-04's feedback pointer (payments isn't adjustable in W-02); the "Push `orders` past 13 GB." prompt asks a question.
- **Nits, fix all (they are cheap)**: A-03, A-04, A-05, A-06, A-07, P-16, P-17 (in `site/assets/page.css`; chapter-local), P-18 (f-07, f-06).
- **Not yours**: P-11, P-13 (pool code; course-level, outside this run), P-12, P-14, P-15 (widgets), P-19 (no action; reading time goes to the user's human review).

Don't trim prose for length (d-05). Keep every fix's word count close to what it replaces.

Afterwards run `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-05-scheduling --phase page`; it must PASS. The orchestrator runs the full gate after all three builders report.

## Inputs (read these; don't expect them pasted)

- `run/review/round-1/findings.md`, `accuracy.md`, `pedagogy-ux.md` (all in `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/`)
- `run/plan/learning-plan.md` (approved plan), `run/research/facts.md` (for A-03, A-04, A-05, A-06)
- `site/` as built; `site/widgets/w-sizing-sandbox/data.js` and `model.js` (read only) to check the k-09 pointer and k-08 numbers
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md` (shared code; read only)
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/index.html` (for A-09: what Ch 3 actually said)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §2, §3, §8 steps 4–7

**Style.** Every chapter uses the Control Plane style guide in `/Users/m/workspace/k8s-course/design/control-plane/`. Use the course tokens from `site/pool/tokens.css`; don't invent tokens or hard-code colours. Follow `README.md`, `tokens.json` usage notes and the `components/` treatments. `site/pool/` is read-only (it's overwritten on sync); chapter-only CSS and JS go in `site/assets/`.

## Outputs (write only these)

- `site/` except `site/widgets/*/*` and `site/pool/`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, with one disposition per finding ID above: `fixed` (say how), `disputed` (with evidence) or `blocked`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace (above).

## User decisions that apply (quoted from run/decisions.md)

- d-03: "Approve" → the plan, its shape and its invented story facts.
- d-04: "(b) Fix Ch 4 (Recommended)" → moving day follows the default scheduler; Ch 5 uses it as a worked example.
- d-05: "keep one chapter, don't cut, I will consider cut in human review (note it in output to consider cutting)" → no cuts, no trimming.
- d-07: "Accept the exception (Recommended)" → the sandbox doesn't scroll its header to the top on change under 600px.
- d-08: "keep this to a single round of reviews please." → this is the only fix round; no closure review.

## Findings to address

P-01, P-02, A-01, P-03, A-02, P-07, P-04, P-05, A-09, P-06, P-08 (page part), A-08 / P-09 (page part), P-10, A-03, A-04, A-05, A-06, A-07, P-16, P-17, P-18.

## Done when

- [ ] Every finding above has a disposition; P-01's option lengths are reported per check.
- [ ] The k-09 pointer is verified in the browser from the sandbox's default state.
- [ ] `verify.mjs --phase page` passes.

## Not your job

- The widgets' folders, the pool, the plan, the research, CURRICULUM.md.
- Cutting content for length.
- Committing to git.
