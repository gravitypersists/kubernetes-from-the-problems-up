# Handoff 10 → page-builder (relabel-17)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. Tiny follow-up.

## Original request (verbatim)

> Let's start ch 3 now, notes from the last run "
> Ch 3 is next. Its entry already has the retrieval opener, the instruction to place Docker, and the note to reuse Ch 2's container drawings for its placement widget."

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Change the page's reading-time label (hero and anywhere else it is shown, including meta) from 15 minutes to 17 minutes. Nothing else.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I8: Each agent writes only in its namespace

## User decisions that apply (quoted from run/decisions.md)

- d-14: "Relabel to 17 min (Recommended)" → no cuts; label to 17 minutes.

## Findings to address

- none

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-03-orchestration/site/index.html`
- Your report.

## Done when

- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-03-orchestration` passes.

## Not your job

- Anything else.
