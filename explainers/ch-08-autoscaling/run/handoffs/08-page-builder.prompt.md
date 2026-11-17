# Handoff 08 → page-builder (fix-round-1)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. This file is your task. You are the same builder that finished dispatch 05; this is the revision round on that page.

## Original request (verbatim)

> (this session) continue the didactician run on ch 08, it was last halted part way through a page builder run
>
> (the run's original request) start a /didactician run on ch 08. Let's use Sonnet or Haiku (your choice) for the researcher, but I think orchestrator and instruction designer should be fable.

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`
- Run (`<out>`): `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling`

## Task

Address the round-1 review findings listed below, in one pass (one combined fix round is the user's standing preference). Answer **every** finding ID in your report with a disposition: `fixed` (say where), `disputed` (with evidence), or `blocked` (with the reason). Then re-run the page gate.

## Inputs (read these; don't expect them pasted)

- Findings: `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/review/round-1/findings.md` (full text of each), or `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/kb.py /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling get A-01 A-02 … --closure` for single records with the segments they are on.
- Reviewer screenshots named in the findings: `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/screenshots/probe/` (`ped-r1-*`).
- The page: `site/src/`, `site/assets/`, `site/widgets/` in the run. `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/research/facts.md` remains the only source of factual claims.
- Style guide and pool rules as in handoff 05 (`/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/handoffs/05-page-builder.prompt.md`): Control Plane tokens from `site/pool/tokens.css`, no invented tokens or hard-coded colours, `site/pool/` read-only.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/` except `site/pool/` (fragments in `src/`, `assets/`, `widgets/w-rush-scrolly/data.js`). Never edit `site/index.html`.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, with a `dispositions:` list covering every ID below.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver. (No waiver.)
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine.
- I4: Finite animations longer than flair have a replay control.
- I7: SVG markers resolve and aren't clipped.
- I8: Each agent writes only in its namespace. Yours is `site/` except `site/pool/`.

## User decisions that apply (quoted from run/decisions.md)

- d-04: "Approve (Recommended)" → the plan stands: the late Friday "takes about seven minutes with nothing broken". **So "seven" stays** (see A-02 / P-01 below). The checks' prompts, option wording and answers are final; option *order* is not.
- d-05: "Yes, all three (Recommended)" → story facts and loop names stand.
- Standing: don't compress prose to hit the time budget. (P-13's and P-16's edits remove repetition the reviewer named; don't trim beyond them.)

## Findings to address (revision rounds only)

Blocking:
- A-01 (blocking): s-06 k-06 feedback for options A and B, the paragraph after Fig. 06, Fig. 06's node 06 note, caption and aria-label (`FIGURES.after` in data.js) — say that node 07 is itself being given back, so it doesn't count as somewhere for the Pod to go ("no node that is staying has more than 1 GB free"). Feedback text may change; prompt and option wording may not.

Should:
- A-02 + P-01 (should, one fix): the seven minutes don't match the drawn clocks. **Orchestrator's routing: keep "about seven minutes" (approved in d-04) and make the clocks agree with it**, the reviewers' option (a). Mark the start of the counted span at about 17:33 (the reading crosses its target and the first customers wait) on Fig. 04 in both layouts, with a bracket or label for the span, and put that moment in the lane (A2 or A6) so "from the first late assignment" points at something shown. Keep the HPA's decision, node request and ready times consistent between Fig. 04, lane steps A2–A6, the debrief, the chart data and k-08's revealed answer. In k-08's model answer, measure both figures from the same start (feedback/reveal text may change; the prompt may not). If this can't be made consistent without changing an approved story fact, return that part `blocked` with what would have to change.
- A-03 + P-07 (should, one fix): lane step A1 — drop "close enough"; the number stays at 3 because the rule gives 3 and 3 is the minimum. Lens line, step text and ariaLabel.
- A-04 (should): s-03 disclosure on Karpenter — keep Karpenter, AKS node auto-provisioning and EKS Auto Mode as the Karpenter-style family; drop "or model on it"; drop Autopilot or move it to its own clause as a provider that manages the nodes for you.
- P-02 (should): reword the standfirst clause so it doesn't say the loops were slow; retitle s-05 without "wait" (heading id and rail follow). Leave Ari's line in s-01.
- P-03 (should): retitle s-07 to name the scene, not the conclusion (heading id and rail follow).
- P-04 (should): s-03, trim the paragraph above k-03 as the finding says; the Chapter 5 callback stays in the gated block.
- P-05 (should): reorder options so keys are spread across A, B and C (the finding's suggestion: k-02 → A, k-04 → C, k-06 → C, k-07 → A). Wording unchanged; each feedback string stays with its own option; check no feedback or prose refers to an option by letter or position. k-04 sits inside lane step A3: check it still commits and opens its gates.
- P-06 (should): a ready Pod must read as ready in the lane at 1280, 768 and 360. Chapter-local only (page.css, data.js, the set-up text); no pool edit. The finding lists three options; (b) plus (c) is acceptable if (a) isn't possible without the pool. Say which you did and what A4 looks like at each width.
- P-10 (should): Fig. 07 "after" — draw node 07's two hours as a fifth band row, labelled, at 1280 and 360.

Nits (fix where cheap; otherwise `disputed` or leave with a reason):
- A-06 (k-08 answer: "within a few minutes" / "about four minutes"), A-07 (same start time for node 07 in both Fig. 04 layouts; do this with A-02), A-08 (optional wording closer to the source), A-05 (optional).
- P-08 (record row words add up in A3 and A5), P-09 (A4: lens, clock and Fig. 04 agree; give the arithmetic in one clause), P-13 (repetition in s-09), P-14 (100% end label on the first gauge), P-15 (Fig. 06 verdicts name the Pod; Fig. 08's fourth chip), P-16 (two sentences in s-06), P-18 (Fig. 04 narrow list grouped by track, in time order), P-12 (loop lens at 360: compact carried-over rows, if cheap and chapter-local).

**Not for you this round (leave as they are; don't act on them):**
- P-11 (a lens exercise or a reworded objective): a plan-level call that waits for the user.
- P-17 (sources footer visible before commits): the user's call.
- P-19 (rail titles truncate): the pool's.

After the fixes, re-check the hero READ / rail `data-minutes` (30) only if the word count moved noticeably.

## Done when

- [ ] Every finding ID above has a disposition in your report.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling --phase page` passes.
- [ ] The changed figures, the lane (A1–A6 at 1280, 768, 360) and the reordered checks have been looked at in a browser, light and dark, with all gates opened.
- [ ] No fact was added that isn't in `facts.md`; anything written around a missing fact is under `concerns`.

## Not your job

- Editing the plan, the brief, CURRICULUM.md, the skill, `explainers/_pool/`, `site/pool/`, or any other chapter.
- P-11, P-17, P-19. Applying cuts from the cut list. New research. Deployment, commits.
