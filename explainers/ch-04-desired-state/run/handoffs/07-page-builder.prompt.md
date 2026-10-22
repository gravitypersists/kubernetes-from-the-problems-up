# Handoff 07 → page-builder (r1-fixes-page)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. This file is your task (a revision round; you built the page in handoff 03).

## Original request (verbatim)

> now we're going to do chapter 4.

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Address the round-1 review findings below that fall in your namespace (the page outside `site/widgets/w-cluster-scrolly/`). Answer each one with a disposition: `fixed`, `disputed` (with evidence), or `blocked`. The full text of each finding, with evidence and expected fix, is in `findings.md`. The widget builder is fixing the lane text and canvas in parallel. Where a finding spans both (A-02, P-02, P-11), do only your part.

Also:
- **Relabel the time to 23 minutes** (user decision d-09): the hero/meta time label and anywhere else the page states the reading time.
- **Fig. 01 consistency** (orchestrator note, from the accuracy reviewer's concerns): Sam's task list includes "Update the spreadsheet", but Ch 3's established story (CURRICULUM.md §3) says the spreadsheet still said machine 03 afterwards. Make the list consistent: e.g. keep the item but don't imply it got done, or drop it. Your call; report what you did.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/review/round-1/findings.md`: all findings with evidence and expected fixes.
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/plan/learning-plan.md`, `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/facts.md`
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/`
- `/Users/m/workspace/k8s-course/design/control-plane/`

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/`, except the contents of `site/widgets/<id>/`.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, with a `dispositions:` entry per finding ID.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace

## User decisions that apply (quoted from run/decisions.md)

- d-07: "Allow rewording (Recommended)" → for A-01 and P-01 you may change approved check text (k-02, k-03, k-05, k-06, k-07 options and feedback, and the Fig. 01 caption). Keep each check's key and meaning. Even out lengths so the right answer isn't reliably the longest, and don't make it the only hedged or two-clause option.
- d-08: "No closure round" → no fresh reviewer will re-check your fixes, so verify each one yourself against the finding's evidence.
- d-09: "Relabel to ~23 min" → time label 23 minutes; make no cuts.

## Findings to address (revision rounds only)

Yours (full text in `findings.md`):
- A-01 (blocking): §07 and k-07 teach that upgrades are wholly the provider's job. Fix the prose and k-07 option A and its feedback as the finding suggests, with a Ch 14 pointer.
- P-01 (blocking): check giveaways. Move the takeaway out of Fig. 01's caption until after k-02, and even out option lengths in k-02, k-03, k-05, k-06 and k-07. Keys unchanged.
- A-02 (should), page part: CH04_LOOPS node-loop `doing` → "after a wait, marks its Pods for deletion"; k-04 option C and k-05 option A feedback likewise; optionally D3's sentence about lingering records.
- A-03 (should): "Fennel pays for the machines" → computing, "in most modes, the machines themselves".
- A-04 (should): version control "can" be reviewed, not "every change is".
- A-05 (should): D2's "a minute later" → "a moment later", plus both outcomes; retitle the summary.
- A-06 (should): the API server goes inside the control plane, in TERM 04 and the paragraph above it.
- P-02 (should), page part: s-02's last line must not equate the manifest file with the record, and must not give away k-03.
- P-03 (should): name "the loop lens" once in §04; fix "the lens's three blanks" in §05 and the course-meta bridge in §08; optionally add it to TERM 03's mono line.
- P-05 (should): TERM 02's "It counts, places and replaces Pods" → "Kubernetes counts, places and replaces Pods, not containers."
- P-06 (should): draw f-03's Pods in the canvas's Pod grammar (chip with inset ink ring), not a node-like bar-and-body frame. Give f-05's Pod squares the ring too. Coordinate visually with `.cp-pod` in page.css, which the widget matches.
- A-07 (nit), A-08 (nit), P-07 (nit), P-08 (nit), P-09 (nit: f-04 phone height, target ~800–900px at 360), P-11 (nit) parts (a) D2, (b) k-04 C, (c) k-01 B feedback: fix where cheap.

Widget builder's (not yours): A-02 lane B3 text and lens; P-02 A1 step text; P-04; P-10; P-11 (d).

## Done when

- [ ] Every finding above has a disposition in your report.
- [ ] The time label reads 23 minutes.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-04-desired-state --phase page` passes.

## Not your job

- Anything inside `site/widgets/w-cluster-scrolly/`.
- Cutting content (d-09: no cuts).
- Editing the plan, research, CURRICULUM.md, or Ch 1–3's files.
