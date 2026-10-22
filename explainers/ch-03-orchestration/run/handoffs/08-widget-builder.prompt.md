# Handoff 08 → widget-builder (r1-fixes-widget)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/widget-builder.md`. Your widget id is `w-fleet-scrolly`. This is a revision round of your own build (handoff 05).

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

Address round-1 findings in `site/widgets/w-fleet-scrolly/` (the page builder is fixing the rest of the page in parallel). Full text, evidence and expected fixes: `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/review/round-1/findings.md`. Answer each with a disposition: `fixed`, `disputed` (with evidence) or `blocked`.

## Findings to address

- A-01 (blocking): C4's end state must be reachable under start-one-then-stop-one: 01 sf5, sf6, pa1 (1 FREE); 02 dispatch ×3 (3 FREE); 04 unchanged. Update ariaLabel; C4 text may name machine 01.
- P-01 (should): C3 text and drawing agree about the stopped copy's room.
- P-02 (should): A3 text settles four vs eight per d-12 (Sam moves everything onto these four; the other four sit empty as spares Fennel still pays for); Saturday and Tuesday clearly run on these four.
- P-03 (should): while k-03 is uncommitted, B4's re-created chips must not read NEW ADDR; hold chip statuses with the same `hold.until: 'k-03'`, then show NEW ADDR on commit.
- P-07 (should): replace "the list" in C1/C3 with "the settings that send customers' traffic to storefront" (introduce it once in C1; the page builder uses the same phrase in k-04).
- P-09 (should): at narrow widths no colour-only status: drop the RUNNING lamp so normal is unmarked and every abnormal state has a word, or add the word where it fits.
- P-15 (nit): padding/gap for the B6 note lines inside the reserved height.
- Also from your own report: the desktop canvas (~465px in lane B) is taller than the page's 420px reservation; make the widget's own reservation cover the tallest lane so nothing shifts at load, within your folder.

## Inputs

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/review/round-1/findings.md`
- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/review/round-1/pedagogy-ux.md`
- the site, plan and decisions in `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/`

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/widgets/w-fleet-scrolly/`
- Your report (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`), with a disposition per finding ID.

## Done when

- [ ] Every finding above has a disposition.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-03-orchestration --widget w-fleet-scrolly` passes.

## Not your job

- Anything outside the widget folder; editing the plan or CURRICULUM.md; cutting for length.
