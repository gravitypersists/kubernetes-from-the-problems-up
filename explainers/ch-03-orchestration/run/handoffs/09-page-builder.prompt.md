# Handoff 09 → page-builder (k02-qualifier)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. One-line follow-up to handoff 07.

## Original request (verbatim)

> Let's start ch 3 now, notes from the last run "
> Ch 3 is next. Its entry already has the retrieval opener, the instruction to place Docker, and the note to reuse Ch 2's container drawings for its placement widget."

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Follow-up to P-02 (d-12: four empty spare machines now exist). k-02's correct-option feedback in `site/index.html` (line ~186, `data-fb` on option C) reads "Right. Machine 04 is the only one with room for all of orders. …". Qualify it to match the lane text in B4 ("Of the three machines still running, machine 04 is the only one with room…"), e.g. "Right. Of the three machines still running, machine 04 is the only one with room for all of orders. …". Check the k-02 prompt and other options for the same gap and qualify them only if needed. Nothing else.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I8: Each agent writes only in its namespace

## User decisions that apply (quoted from run/decisions.md)

- d-10: "Allow rewording (Recommended)" → check text may be reworded for a finding; same meaning, same key.
- d-12: "Yes (Recommended)" → four machines in use, four empty spares Fennel still pays for.

## Findings to address

- P-02 (follow-up): k-02 feedback qualifier.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/index.html`
- Your report, with a disposition for P-02.

## Done when

- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-03-orchestration` passes.

## Not your job

- Anything else.
