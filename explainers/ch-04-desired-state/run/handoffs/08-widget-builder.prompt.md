# Handoff 08 → widget-builder (r1-fixes-widget)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/widget-builder.md`. This file is your task (a revision round; you built `w-cluster-scrolly` in handoff 04).

## Original request (verbatim)

> now we're going to do chapter 4.

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Address the round-1 review findings below that fall in `site/widgets/w-cluster-scrolly/`. Answer each one with a disposition: `fixed`, `disputed` (with evidence), or `blocked`. The full text of each finding, with evidence and expected fix, is in `findings.md`. The page builder is fixing the page in parallel. In particular, it is changing CH04_LOOPS, k-04/k-05 feedback, s-02's last line, and f-03/f-05's Pod drawing toward your canvas's ring grammar. Keep `.cp-pod`-compatible looks, and do only your part.

Also (orchestrator note, from the accuracy reviewer's concerns): lane B6 says node 04 "has never run `orders`". In Ch 3's Year 2 story, Sam ran `orders` on machine 04, and the page doesn't say the cluster's nodes are new machines. Drop or reword the claim so it is consistent. The image download point can stand without it, e.g. "if node 04 doesn't already have the image, it downloads it first".

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/review/round-1/findings.md`
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/review/round-1/pedagogy-ux.md` and the probe screenshots it cites in `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/screenshots/probe/` (`rev-*`)
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/plan/learning-plan.md`, `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/research/facts.md`
- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/` (read-only outside your directory)

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/widgets/w-cluster-scrolly/`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, with a `dispositions:` entry per finding ID.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace. Yours is `site/widgets/w-cluster-scrolly/`.

## User decisions that apply (quoted from run/decisions.md)

- d-08: "No closure round" → no fresh reviewer will re-check your fixes, so verify each one yourself at the widths the findings cite (360×740, 390×844, 768×1024, 1280×900), in light and dark.
- d-09: "Relabel to ~23 min" → make no cuts.

## Findings to address (revision rounds only)

Yours (full text in `findings.md`):
- A-02 (should), widget part: B3 text, lens `doing` and ariaLabel. "removes node 03's Pods from the record" → "marks node 03's Pods for deletion". Add the sentence that the ReplicaSet loop no longer counts Pods marked this way, so the record now shows the gap. The canvas may keep node 03 empty or strike the old marks through.
- P-02 (should), widget part: give A1's step text one clause naming the record panel (e.g. "Kubernetes keeps one record of what Fennel wants and what's running, drawn at the top; `orders`, `payments` and `dispatch` are already in it."). No "see the label".
- P-04 (should): shrink the narrow-width canvas so lane B fits in 50vh at 360×740 (≤ 370px) and 390×844 (≤ 422px), per the finding's options. If it still can't fit, make the sticky/inline fit decision per page, not per lane, so both lanes use the same mode on a given screen.
- P-10 (nit): (a) a size-1 NOT STARTED chip keeps its service name, with one consistent status word; (b) at B6 on desktop, keep the loops visible (dimmed, or the agents pill on a second row / shortened); (c) pad the lens block inside the highlight outline.
- P-11 (nit), part (d): A5 lens "Pods assigned to each one's node".

Page builder's (not yours): A-01, P-01, A-03 to A-08, P-03, P-05 to P-09, P-11 (a–c), and the page part of A-02 and P-02.

## Done when

- [ ] Every finding above has a disposition in your report.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-04-desired-state --widget w-cluster-scrolly` passes, and you report the measured canvas heights for both lanes at 360×740 and 390×844 and which mode (sticky or inline) each lane uses.

## Not your job

- Anything outside `site/widgets/w-cluster-scrolly/`.
- Cutting content.
- Editing the plan, research, CURRICULUM.md, or Ch 1–3's files.
