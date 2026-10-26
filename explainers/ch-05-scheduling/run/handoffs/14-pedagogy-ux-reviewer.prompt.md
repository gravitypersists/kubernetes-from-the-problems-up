# Handoff 14 → pedagogy-ux-reviewer (closure round 2)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.agents/skills/didactician/agents/pedagogy-ux-reviewer.md`, including its "Closure rounds" section. This file is your task. You are a fresh reviewer.

## Original request (verbatim)

> we'll want to perform the human review as a formal check from now on. In fact, I'd like to revert ch 5, 6 and 7 back to the human review step.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.agents/skills/didactician`

## Task

Closure round (round 2) for Chapter 5 ("Who runs where: scheduling, resources and cost"). Two things happened since round 1:

1. Builders fixed the round-1 findings in `run/review/round-1/findings.md`. Their dispositions are in `run/handoffs/08-page-builder.report.md`, `09-widget-builder.report.md` and `10-widget-builder.report.md`. No closure round was run then (d-08); this is it.
2. The user reviewed the page and left 42 comments (`run/review/human-site-1/comments.md`, findings H-01 to H-42). The plan was revised (`run/plan/learning-plan.md`, "Revision 1"; `run/handoffs/11-instructional-designer.report.md`) and a builder rebuilt the page and the sandbox (`run/handoffs/12-page-builder.report.md`). The user then looked at the rebuilt page, had no further comments, and closed all 42 H- findings (d-14, d-15).

For **every previous P- finding** (all severities), write a `### P-NN` block with `status: closed | still-open | dispute-upheld` and evidence from the page as it is now. A finding whose text was cut or rewritten by the H- changes is `closed` if the problem no longer exists; say so.

Check the page as a whole now that §06 is gone and the sections renumbered: flow, the prose standard (brief, Lessons), the plan's new reference and repetition rules (Revision 1 in `learning-plan.md`), every check (no key is the longest option: measure them), and the redesigned sandbox at 360, 768 and 1280px with probe.mjs (controls, Reset, labels on chips, hatching that tells use from overflow, the reserved height and the empty space under the default state). Also check the page against the course style guide (`design/control-plane/`) as in round 1.

**Don't close or reopen H- findings, and don't argue with the user's comments**: they are the user's decisions. If a change made for one introduced a problem in your area, raise it as a new finding. New findings are allowed only at `blocking` severity.

## Inputs (read these; don't expect them pasted)

- `run/review/round-1/findings.md` and `run/review/round-1/pedagogy-ux.md`
- the builder reports named above, and `run/review/human-site-1/comments.md`
- `run/plan/learning-plan.md` (Revision 1), `run/research/facts.md`, `run/brief.md`, `run/decisions.md`
- `site/` (`index.html`, `assets/`, `widgets/`, `pool/cluster/`); `run/gate/page-round-16.json` and its screenshots
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §2 (§2.3 loop lens wording), §3, §5, the §7 Ch 5 and Ch 8 entries
- for UX: `/Users/m/workspace/k8s-course/design/control-plane/`

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/review/round-2/pedagogy-ux.md` (format: `/Users/m/workspace/k8s-course/.agents/skills/didactician/templates/review.md`)
- Probe screenshots, if any, in `run/screenshots/probe/` (prefix them `r2-pedagogy-ux-`)
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.agents/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver. (mobile: supported; no waiver.)
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed.
- I8: Each agent writes only in its namespace. Yours is `run/review/round-2/pedagogy-ux.md` and `run/screenshots/probe/`.

## User decisions that apply (quoted from run/decisions.md)

- d-03: "Approve": the plan's invented story facts are approved fiction; check that the mechanisms are true.
- d-07: "Accept the exception (Recommended)": the sandbox doesn't scroll its header to the top on change under 600px.
- d-11: "Course-wide (Recommended)": the loop lens wording in CURRICULUM §2.3.
- d-12: "Move to Chapter 8 (Recommended)": node pools are out of Ch 5.
- d-15: "Close all 42 (Recommended)": H-01 to H-42 are closed by the user.
- d-16: "Run the closure round (Recommended)": this round.

## Done when

- [ ] Every previous P- finding has a status block with evidence.
- [ ] Any new finding is blocking, with location, evidence and expected fix.
- [ ] `pedagogy-ux.md` follows the review template.

## Not your job

- Fixing anything; editing `site/`, the plan or CURRICULUM.md.
