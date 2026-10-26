# Handoff 15 → page-builder (r2-sizing-fixes, page and sandbox)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.agents/skills/didactician/agents/page-builder.md`, and `agents/widget-builder.md` for the sandbox. This file is your task. You are a fresh builder; `run/handoffs/12-page-builder.report.md` describes the current build (paths relative to `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/`).

## Original request (verbatim)

> one small comment, w-02 needs to be resized now that it has a new layout, it's spaced too large. I assume that the reviews kicked off will identify that, but if not, please make sure it gets slotted into the round of fixes.

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.agents/skills/didactician`

## Task

A small, final fix round after closure round 2. Three items:

1. **d-17, the sandbox is spaced too large (the user's request; must be fixed).** `w-sizing-sandbox` reserves about 1265px at desktop (and about 1185px at 360px) for its tallest state: 9 nodes plus the spare in rows of 4, plus the never-placeable bar. At the default state (4 + 1 nodes) that leaves about 430px of empty frame at 1280 and about 420px at 768. The plan (`run/plan/learning-plan.md`, w-sizing-sandbox) estimated about 600px with two rows. Make the widget compact and well proportioned in its new two-column layout. Options, your call with reasons:
   - lower the steppers' maxima (e.g. `payments`' 8 GB, or the others) so the tallest state fits two rows, keeping every documented state working: defaults 4+1; `payments` 4 GB → 4+1, 7.5 GB → 5+1 (k-04 and the sandbox prompt use it); at-rush use → 3+1 set by processor; `orders` 5 → 3+1, 5.5 → 4+1 (k-09); `orders` past 13 GB → never placed; halved requests → only `orders` over. If you lower a maximum, check every sentence and prompt on the page that relies on it.
   - or more columns, smaller nodes, tighter spacing inside the frame;
   - or a combination.
   The course height rule still applies (CURRICULUM §8 step 6: from 600px the widget reserves its tallest state, so nothing below moves), with this chapter's exception for the sandbox (d-07). Tighten the vertical spacing generally too (header, controls, gaps), not just the reserved height. Service names must stay readable on the chips (don't truncate to "dispat…"). Measure the widget's height in the default and tallest states at 360, 768 and 1280 before and after, and report the numbers.
2. **P-09 (nit, cheap):** in s-04, "The bar under the widget's nodes splits…" is wrong under 600px, where the bar comes before the nodes. Name the bar by its printed head instead: "The widget's "Room for Pods on the rented nodes" bar splits…" (see `run/review/round-2/pedagogy-ux.md`).
3. **k-07 option B's feedback (accuracy, cheap):** it says "Pack nodes on halved requests and, at the rush, some run short", a shortage Fennel's numbers don't produce (with halved requests only `orders` goes over; see `run/review/round-2/accuracy.md`, concerns). Make the feedback true to the story's numbers, without changing the options, the key or option lengths enough to make the key the longest.

Don't change anything else. Keep the self-test passing.

Afterwards run, from `/Users/m/workspace/k8s-course`:
- `node .agents/skills/didactician/scripts/verify.mjs --out explainers/ch-05-scheduling --phase page`
- `node .agents/skills/didactician/scripts/verify.mjs --out explainers/ch-05-scheduling --phase widget --widget w-sizing-sandbox`
- the sandbox's `selftest.mjs`

All must pass. Drive the sandbox with `probe.mjs` at 360, 768 and 1280 (default and tallest states) and look at the screenshots yourself.

## Inputs

- `run/review/round-2/findings.md`, `pedagogy-ux.md`, `accuracy.md`
- `run/plan/learning-plan.md` (Revision 1; w-sizing-sandbox spec), `run/decisions.md` (d-07, d-17)
- `site/index.html`, `site/widgets/w-sizing-sandbox/`
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §8 step 6; `/Users/m/workspace/k8s-course/design/control-plane/`

## Outputs (write only these)

- `site/` except `site/pool/` (if a fix needs a pool change, report it instead).
- Your report in your final message, in the format of `/Users/m/workspace/k8s-course/.agents/skills/didactician/templates/report.md`, with a disposition for d-17, P-09 and k-07-B, and the before/after heights.

## Invariants (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver. (mobile: supported; no waiver.)
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine.
- I8: Each agent writes only in its namespace (above).

## User decisions that apply (quoted from run/decisions.md)

- d-07: "Accept the exception (Recommended)": the sandbox doesn't scroll its header to the top on change under 600px.
- d-17: "one small comment, w-02 needs to be resized now that it has a new layout, it's spaced too large…"
- H-23 to H-30 (closed by the user, d-15): the sandbox layout the user asked for. Keep it.

## Done when

- [ ] The sandbox is compact at all three widths, with heights reported before and after.
- [ ] P-09 and k-07-B fixed.
- [ ] Both verify phases and the self-test pass.
