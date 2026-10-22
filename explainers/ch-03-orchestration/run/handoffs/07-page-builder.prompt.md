# Handoff 07 → page-builder (r1-fixes-page)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. This is a revision round of your own build (handoff 04).

## Original request (verbatim)

> Let's start ch 3 now, notes from the last run "
> Ch 3 is next. Its entry already has the retrieval opener, the instruction to place Docker, and the note to reuse Ch 2's container drawings for its placement widget."

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace

## User decisions that apply (quoted from run/decisions.md)

- d-10: "Allow rewording (Recommended)" → approved-final check text may change where a finding asks (k-04, k-05, k-06, k-07, k-08, k-09): same meaning, same correct answers.
- d-11: "Relax it (Recommended)" → P-08 (ToC shows "Its name is Kubernetes") needs no change.
- d-12: "Yes (Recommended)" → new story fact: on Monday Sam moves everything onto four machines; the other four sit empty as spares Fennel still pays for.
- d-13: "Decide at delivery" → don't cut anything for length.
- Agent time is nearly exhausted (d-09): fix only the findings listed, keep it tight, and verify once.

## Task

Address round-1 findings in the page (outside `site/widgets/w-fleet-scrolly/`, which another builder is fixing in parallel). Full text, evidence and expected fixes: `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/review/round-1/findings.md`. Answer each with a disposition: `fixed`, `disputed` (with evidence) or `blocked`.

## Findings to address

- A-02 (should): s-04 conductor aside breaks line — reword to "no single part gives every cue: separate parts each watch for one kind of work and act on it…".
- A-03 (should): s-05 history — Borg, then Omega to try out ideas that went back into Borg.
- A-04 (nit): s-05 — "Google announced it would give Kubernetes to a newly formed foundation".
- P-02 (should): make s-01/k-01/s-04 consistent with d-12 (four machines in use, four empty spares still paid for); the lane text (A3) is the widget builder's. Check f-01's idle-spend row reads consistently.
- P-04 (should): D1 ends on Ch 2's open question, not its answer.
- P-05 (should): k-08 options rewritten so A and C are as measured and specific as B, with no hedge in B; similar lengths; feedback unchanged unless it no longer fits.
- P-06 (should): k-06 and k-07 — stop the keys echoing nearby prose (finding's options).
- P-07 (should): k-04 options — replace "the list" with the wording the widget builder will use in C1/C3: "the settings that send customers' traffic to storefront" (use exactly this phrase).
- P-10 (should): f-02 caption becomes the takeaway the drawing can't state.
- P-11 (nit): k-05 prompt / chore 7.
- P-12 (nit): k-09 prompt shortened.
- P-16 (nit): "by itself".
- Not to change: P-08 (d-11), P-13 and P-14 (accepted deviations), and anything in the widget folder.

## Inputs

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/review/round-1/findings.md`
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/review/round-1/pedagogy-ux.md`
- the site, plan and decisions in `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/`

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/` except `site/widgets/w-fleet-scrolly/`
- Your report (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`), with a disposition per finding ID.

## Done when

- [ ] Every finding above has a disposition.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-03-orchestration --phase page` passes.

## Not your job

- The widget folder; editing the plan, research or CURRICULUM.md; cutting for length.
