# Handoff 07 → page-builder (r1-fixes, page and lane data)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. This file is your task.

You are a fresh builder, and you fix both the page and the lane's data. This is one combined fix round, because the user asked to batch work. Two earlier reports tell you how each part is built:
- the page builder's report: `run/handoffs/03-page-builder.report.md`;
- the lane builder's report: `run/handoffs/04-widget-builder.report.md`.

## Original request (verbatim)

> Commit and continue, I will review at a later date. Once done with 6 let's start ch 7.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Fix the round-1 review findings in `/Users/m/workspace/k8s-course/explainers/ch-07-services/run/review/round-1/findings.md`. Fix **all 22**: A-01 to A-07 and P-01 to P-15.

Each finding gives a severity, location, evidence and suggested fix. The suggestions are only suggestions: keep the meaning and the plan's intent, and write to the plan's prose rules (`run/plan/learning-plan.md`, `## Shape`).

**This is the only fix round** (d-03). No closure review follows, so each fix must be complete. Anything you dispute or can't fix goes to the user with your evidence.

Notes on particular findings:
- **P-01 (blocking).** §02's heading, and its entry in the contents rail, must not give away k-02. Use a neutral heading. Also check the standfirst, the meta description and the headings once more for any other check's answer.
- **P-02 (blocking).** f-05 must not draw a Service as a hop that calls pass through. That drawing is the chapter's own misconception (m-10), and the plan's `## Visual grammar` forbids it.
  - Route the arrows gateway → Pod and Pod → Pod.
  - Place each Service block beside its arrow, for example on a dashed leader, as a lookup the caller makes and not a box the call passes through.
  - The gateway, which does run as Pods, may stay a hop.
  - Keep f-05's content and its role in s-07, and check it at 360 and 1280.
- **P-03, option lengths.** The check prompts and options are approved text. To rebalance lengths, you may reword distractors or keys minimally, without changing what any option says or which option is the key.
  - Rebalance so the key's length doesn't give it away: in at least three of the six checks, the key should be the middle length or close to the longest.
  - No key may be the longest.
  - Report every option you reworded, before and after.
- **P-04.** Where a prompt repeats the paragraph above it, change the paragraph, not the prompt, unless you have to.
- **A-01, A-03 (accuracy).**
  - Lane S3 must not claim the Deployment loop waits for the list, or that removal from the list strictly comes before shutdown. They happen at the same time, and a hedge is fine.
  - The recap must keep the d-06 hedge, and must not contradict D5's selector-typo case.
- **A-02.** The prices stand. The page must call the per-Service load balancer what AWS gives a Service of type LoadBalancer, and keep the date and the "one provider's figures" framing.
- **Lane data (P-11, P-14, A-01).** Change `site/widgets/w-services-scrolly/data.js` as data only:
  - keep complete per-step snapshots;
  - keep the k-03 gate;
  - keep the header within its measured fit (the lane builder shortened it for that reason).
  - Don't edit the shared pool (`explainers/_pool/` or `site/pool/`). If a fix needs a pool change, leave it and say so.
- **Page-builder concern from the build.** The lane mount's comment says `NODES` is `['05','06']`, but `data.js` has `[]`, deliberately, because `FIGURES` draws node 04 alone. Correct the comment. Also update the manifest's `mounts.S` text to the lane's actual name.
- **Reading time.** Don't trim prose. Keep the hero's "Read" figure and the rail's `data-minutes` an honest estimate. The reviewer estimates 24–26 minutes, and the page says 24. The cut order goes to the user at delivery.
- **Option lengths after all edits.** Re-measure every choice check's option lengths (k-01 to k-06) and report them, with the key marked.

Afterwards run `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-07-services`. That is the full gate, and it must PASS. Check the changed parts at 360 and 1280, and run the lane forward and back with k-03 locked and unlocked.

## Inputs (read these; don't expect them pasted)

All of these are in `/Users/m/workspace/k8s-course/explainers/ch-07-services/`:
- `run/review/round-1/findings.md`, `accuracy.md`, `pedagogy-ux.md`, and the probe screenshots they cite in `run/screenshots/probe/`;
- `run/plan/learning-plan.md` (the approved plan), `run/plan/cut-list.md`, `run/research/facts.md`;
- `site/` as built, including `site/widgets/w-services-scrolly/`.

Also read:
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md` (shared code; read only)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §2, §3, §8 steps 4–7

**Style.** Use the Control Plane style guide in `/Users/m/workspace/k8s-course/design/control-plane/`. Use course tokens from `site/pool/tokens.css` only, with no invented tokens or hard-coded colours. `site/pool/` is read-only. Chapter-only CSS and JS go in `site/assets/`.

## Outputs (write only these)

- `site/` except `site/pool/`. This includes `site/widgets/w-services-scrolly/`.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`. It must include one disposition per finding ID, plus the option lengths. The dispositions are:
  - `fixed`, saying how;
  - `disputed`, with evidence;
  - `blocked`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace (above).

## User decisions that apply (quoted from run/decisions.md)

- d-05: "Approve (Recommended)" → the plan is approved, including the R2 story facts and addresses. About 20 minutes are planned (22–25 likely). Don't compress prose to fit, and don't cut.
- d-06: "Ch 5's Tuesday (Recommended)" → "connection refused" is always hedged ("in most clusters, by default").
- d-03: "keep this to a single round of reviews please." → this is the only fix round.
- Course-wide (CURRICULUM §2.12): Kubernetes kinds are capitalised, and "node" stays lowercase.

## Findings to address

A-01, A-02, A-03, A-04, A-05, A-06, A-07, P-01, P-02, P-03, P-04, P-05, P-06, P-07, P-08, P-09, P-10, P-11, P-12, P-13, P-14, P-15.

## Done when

- [ ] Every finding has a disposition, and option lengths are reported per check.
- [ ] The full gate (`verify.mjs` without `--phase`) passes.

## Not your job

- The pool, the plan, the research, CURRICULUM.md, other chapters.
- Cutting content for length.
- Committing to git.
