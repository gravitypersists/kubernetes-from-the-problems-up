# Handoff 12 → page-builder (human-site-1-fixes, page and both widgets)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.agents/skills/didactician/agents/page-builder.md`, and for widget work also `agents/widget-builder.md` in the same folder. This file is your task. You are a fresh builder doing one combined fix round (the user prefers one builder per fix round): the page, the sandbox `w-sizing-sandbox` and, where a comment touches it, the lane `w-friday-scrolly`. Earlier builders' reports tell you how each part is built: `run/handoffs/08-page-builder.report.md`, `09-widget-builder.report.md` (lane) and `10-widget-builder.report.md` (sandbox).

## Original request (verbatim)

> we'll want to perform the human review as a formal check from now on. In fact, I'd like to revert ch 5, 6 and 7 back to the human review step.

> okay, let's open chapter five in review mode

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.agents/skills/didactician`

## Task

The user reviewed the built page in the browser and left 42 comments, now findings **H-01 to H-42** in `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/review/human-site-1/findings.md` (comment `#N` = `H-NN`; the user's own words, with the text or element each is on, are in `comments.md` beside it, and the screenshot for #23 in `shots/`). The page they reviewed is frozen in `run/review/human-site-1/build/`.

`H-` findings are the user's own comments: do what each asks. If you can't, or it conflicts with `facts.md` or an invariant, dispute it with evidence; the user decides, not you. Where the user gave exact wording, use it (fix its grammar if needed, and say so).

The designer has already revised the plan for the comments that change what the chapter teaches (handoff 11; its report is `run/handoffs/11-instructional-designer.report.md`). **Build to `run/plan/learning-plan.md` Revision 1** (its "Revision 1" section lists every change, and the mockup `run/plan/mockup.html` is marked REV 1). In short:

- **Remove §06, node pools** (d-12): the section, f-03, k-06 and every mention of node pools, node groups and spot machines. Renumber the sections after it (Tuesday becomes §06, eviction §07, the conversation §08) and every on-page cross-reference and check count ("/ 08"), including any inside the widgets (e.g. the sandbox warning's "(§08)"). The `orders`-past-13 GB case now says plainly that the Pod is never placed and needs a bigger node.
- **The loop lens wording** (d-11), everywhere it appears, including the loop lens table (f-06) column heads: "which loop is it, what does it want (the desired state), what does it see (the real state), and what does it do when the two differ?" No "about a gap" anywhere.
- **The sandbox (#23–#30)**, as the plan's w-sizing-sandbox spec says: controls top left (`payments` added as adjustable, 0.5–8 GB); outcome on the right with the "Room for Pods on the rented nodes" bar under the nodes; "Reset" in the header; the stats block removed (keep the node count as one heading and the one "set by" line when processor sets the count); the reserved/used label on or above the box border, never on the soft fill; overflow hatched; rows read "used N GB at rush". Keep `model.js`'s self-test passing, and update it for `payments`. Keep the course widget height rule's exception (d-07).
- **#28, the sandbox intro:** use the plan's wording (close to the user's, but true: the widget packs Pods as tightly as they go; the default scheduler spreads them). Don't write "simulates how the scheduler operates". Report the exact sentence you used, so it can go back to the user.
- **Everything else, H-01 to H-42**, as each comment asks and as the plan's new reference and repetition rules say: refer to events by what happened, not by labels; "the following widget" or "the figure below" instead of IDs in prose; one owner per explanation; no back-references that don't help.

The earlier rule "don't trim prose for length" (d-05) is superseded where the user's comments ask for cuts: their comments are their judgement on length. Don't cut anything they didn't ask for or the plan doesn't list.

The reviewers' earlier findings (A-, P-) were fixed in round 1. Don't reopen them, but don't undo their fixes either (for example, P-01: no check's key is the longest option; measure the option lengths of every check after your edits and report them, key marked).

Afterwards run, from `/Users/m/workspace/k8s-course`:
- `node .agents/skills/didactician/scripts/verify.mjs --out explainers/ch-05-scheduling --phase page`
- `node .agents/skills/didactician/scripts/verify.mjs --out explainers/ch-05-scheduling --phase widget --widget w-sizing-sandbox` (and `w-friday-scrolly` if you touched it)
- the sandbox's `selftest.mjs`

All must pass. Drive the sandbox with `probe.mjs` at 360, 768 and 1280px and look at the screenshots yourself: the new layout must hold at each width with no horizontal overflow.

## Inputs (read these; don't expect them pasted)

- `run/review/human-site-1/comments.md`, `findings.md`, `shots/`, `build/`
- `run/plan/learning-plan.md` (Revision 1), `cut-list.md`, `mockup.html`
- `run/handoffs/11-instructional-designer.report.md`
- `run/research/facts.md`
- `site/` as built; `site/widgets/w-sizing-sandbox/` (`model.js`, `data.js`, `selftest.mjs`), `site/widgets/w-friday-scrolly/`
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md` (shared code; read only)
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §2 (§2.3 has the new loop lens wording), §3, §8 steps 4–7

**Style.** Every chapter uses the Control Plane style guide in `/Users/m/workspace/k8s-course/design/control-plane/`. Use the course tokens from `site/pool/tokens.css`; don't invent tokens or hard-code colours. Follow `README.md`, the `tokens.json` usage notes and the `components/` treatments. `site/pool/` is read-only (it's overwritten on sync); chapter-only CSS and JS go in `site/assets/` or the widget's folder. If you need a pool change (for example in `renderCluster`), report it instead of making it.

## Outputs (write only these)

- `site/` except `site/pool/`
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.agents/skills/didactician/templates/report.md`, with one `dispositions` line per finding H-01 to H-42: `fixed` (what changed and where), `disputed` (with evidence) or `blocked`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver. (mobile: supported; no waiver.)
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine.
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed.
- I4: Finite animations longer than flair have a replay control.
- I6: Carousels don't change height (reflow) between pages.
- I7: SVG markers resolve and aren't clipped.
- I8: Each agent writes only in its namespace (above).

## User decisions that apply (quoted from run/decisions.md)

- d-07: "Accept the exception (Recommended)": the sandbox doesn't scroll its header to the top on change under 600px.
- d-10: "Finished with this review": H-01 to H-42 are blocking.
- d-11: "Course-wide (Recommended)": the loop lens rewording.
- d-12: "Move to Chapter 8 (Recommended)": §06 node pools goes.

## Findings to address

H-01 to H-42.

## Done when

- [ ] Every H- finding has a disposition.
- [ ] The #28 sentence and the option lengths per check are in your report.
- [ ] Both `verify.mjs` phases and the sandbox self-test pass, and you've looked at the sandbox at 360, 768 and 1280px.

## Not your job

- Editing the plan, CURRICULUM.md, `explainers/_pool/`, other chapters, or anything under `run/`.
- Closing findings: only the user closes `H-` findings.
