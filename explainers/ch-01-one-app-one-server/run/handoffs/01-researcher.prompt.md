# Handoff 01 → researcher (ch1-light-research)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/researcher.md`. This file is your task.

## Original request (verbatim)

> we're going to start a run to create Ch 1 from CURRICULUM.md. Go ahead and get it started. This will be the first time I'm running this skill not as a standalone, but as a chapter in a bigger course. Weigh this when producing widgets (widgets can be used across chapters. If a widget might be useful in a future chapter, this might justify building it, but use discretion, because an analysis on that chapter might veto that widget for pedagogical reasons). Feel free to recommend changes to curriculum at the checkpoint.

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Light-depth research for Chapter 1 ("One app, one server") of the course "Kubernetes for Technical Managers". Answer research questions q-1 through q-7 in the brief, all serving objectives o-1..o-3. Verify the handful of factual claims the chapter will lean on (what lives on a server besides code; how a full disk takes an app down; snowflake servers / configuration drift; what VMs do and don't solve; limits of vertical scaling; why runbooks drift), and collect the misconceptions a non-infrastructure manager holds, especially "the code is the app" (a seed this chapter plants and Ch 2 corrects). Keep it converged on what a 12-minute chapter for managers needs; this is not a survey of the field.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/brief.md`: objectives and research questions.
- `/Users/m/workspace/k8s-course/CURRICULUM.md`: §1 audience, §3 Fennel (the fictional company; its story is fiction and needs no sourcing), §5 term ledger, §6 misconceptions, §7 Ch 1 entry. Ch 2 and Ch 3 entries show what must NOT be pre-empted.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/research/` — the files `researcher.md` specifies (formats in `<skill>/templates/research-formats.md`).
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed. (If you propose any media, record licence and clearance; intended_use is unknown.)
- I8: Each agent writes only in its namespace. Yours is `run/research/`.

## User decisions that apply (quoted from run/decisions.md)

- d-01: "12 minutes (Recommended)" → size research to a 12-minute chapter with 3 objectives.
- d-02: "Light (Recommended)" → light depth caps apply (`check_research.py` enforces them).

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every research question q-1..q-7 is answered or explicitly marked unanswerable with reason.
- [ ] Every factual claim the chapter may rely on is in `facts.md` with a source.
- [ ] `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/check_research.py /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run` passes.

## Not your job

- Writing chapter prose, the learning plan, widget designs or the mockup.
- Researching containers, orchestration or Kubernetes (later chapters).
- Editing CURRICULUM.md or anything outside `run/research/`.
