# Handoff 05 → page-builder (page-build-resume)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. This file is your task.

## This is a resumed build (read first)

A previous page builder (dispatch 04) stalled when its session ran out of usage. It can't be continued; you are a fresh agent finishing its work. **Don't rewrite finished fragments or assets.**

- Read `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/src/PROGRESS.md` first: its checklist, the decisions it made that aren't in the plan, the class and data names the fragments rely on, and what is left. Then read the files already in `site/` (`src/shell.html`, `src/s-01.html` … `s-09.html`, `assets/page.css`, `assets/page.js`, `widgets/manifest.json`, `widgets/w-rush-scrolly/data.js`).
- State on disk: every fragment and asset is drafted. The page gate (`--phase page`) was run once at 21:43 and passed (`run/gate/page-round-1.json`, screenshots in `run/screenshots/page-round-1/`), but PROGRESS.md was not updated afterwards, so treat that pass as unreviewed: `page.js` and `data.js` are marked "untested".
- What is left, from PROGRESS.md's unticked items and its notes:
  1. Re-run the page gate and look at the screenshots at 360 and 1280, and in dark mode. Check that every figure, check, gate and the lane actually draw and work (the lane's steps A1–A6, the k-04 gate on A4–A6 and on the block after the lane, Fig. 06's cluster slot, the week charts, the loop lens table).
  2. Confirm on screen the pool check that was done only by reading code: a `spare` node with the word `Starting` (step A4), then the same node id in `newNodes` (step A5). If it doesn't draw as the widget spec says, report it; don't patch `site/pool/`.
  3. Replace the guessed lane canvas min-heights (480 / 600px, end of `page.css`) with measured ones, per the widget height rule (CURRICULUM §8 step 6).
  4. Set the hero READ and the rail's `data-minutes` (a provisional 28) to an honest estimate: the gate's text-only time plus the checks and the lane.
  5. Measure every choice check's option lengths (no key the longest; report, don't reword).
  6. Check ac-01 to ac-16 and that every factual statement traces to `facts.md`, reading the drafted prose once as its editor. Fix what fails; leave what passes.
  7. Delete `site/src/PROGRESS.md`, and carry its "Decisions not in the plan" into your report's concerns, along with anything of your own.
- Keep PROGRESS.md current while you work, in case this session stalls too.

## Original request (verbatim)

> (this session) continue the didactician run on ch 08, it was last halted part way through a page builder run
>
> (the run's original request) start a /didactician run on ch 08. Let's use Sonnet or Haiku (your choice) for the researcher, but I think orchestrator and instruction designer should be fable.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`
- Run (`<out>`): `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling`

## Task

Build the Chapter 8 page ("The Friday dinner rush: autoscaling") from the approved plan: segments s-01 to s-09, figures f-01 to f-09, the term cards, checks k-01 to k-08, the disclosures, and the lane widget `w-rush-scrolly`. The mockup (`run/plan/mockup.html`) is approved content and flow; its wording is a draft, so write the prose fresh from the plan. **Only its check prompts, options and answers are final.**

**You also build the lane.** `w-rush-scrolly` is `complexity: low` and data only: its `site/widgets/w-rush-scrolly/data.js` (six step snapshots, the step text, f-06's snapshot) runs on the pooled `renderCluster` and lane controller with no widget code and no pool change (user decision d-04, Q5). Your namespace includes `site/widgets/`. Before relying on it, check on the pool's test page that a `spare` node with the custom word `Starting` and a later `newNodes` entry for the same node id draw as the widget spec says; if they don't, report it (a `concern`, or `blocked` if the lane can't be drawn honestly) rather than patching `site/pool/`, which is read-only.

**Page source is fragments**, as your role file says: `site/src/shell.html` plus one `site/src/s-NN.html` per segment, assembled into `site/index.html` by the scripts. Never edit `index.html`.

**Course site conventions:**
- The loop lens table (f-09) is built from a `CH08_LOOPS` array in `site/assets/page.js`: copy Ch 7's `CH07_LOOPS` forward (drop its `added` / `newPart` tags) and apply the plan's loop lens rows, tagging this chapter's changes NEW IN CH 8. The header uses the current wording (`WANTS · SEES · DOES WHEN THEY DIFFER`, CURRICULUM §2.3).
- Page components (cast strip, the collapsed "I didn't read the last chapter" disclosure, checks with commit before reveal and the collapsed locked plate for gated content, `.cp-term` cards with at most one payoff variant, asides with a "where this breaks" line, quotes, recap, the manifest figure treatment): Ch 5 is the reference implementation the user has reviewed (`ch-05-scheduling/site/assets/page.css`, `page.js`); reimplement what you need in this chapter's `site/assets/`. Don't edit other chapters.
- The hero's reading time and the rail's `data-minutes` are honest estimates including checks and the lane.
- After writing, measure every choice check's option lengths and make sure no key is the longest option (the plan's options are final; if a key is the longest, report it as a concern rather than rewording it). Make sure nothing visible before a check is committed (standfirst, meta description, headings, captions, term cards, asides) gives its answer away.
- CURRICULUM §2.13: refer to things by what they are, not by nicknames, bare times or figure and widget IDs in a sentence.

**Keep the work resumable.** The user may run out of usage credit mid-build. Write each fragment and asset to disk as soon as it is drafted, in reading order, and keep a short `site/src/PROGRESS.md` (what is done, what is left, any decision you made that isn't in the plan); delete it when you finish, since nothing in `site/` that isn't part of the page should ship.

## Inputs (read these; don't expect them pasted)

- Records: `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/kb.py /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling get s-01 s-02 s-03 s-04 s-05 s-06 s-07 s-08 s-09 w-rush-scrolly --closure` prints the segments, the widget, and what they depend on (Shape, Conventions with the visual grammar and Fennel's numbers, figures, checks, claims, acceptance criteria, decisions). `kb.py <out> ids` lists every record. Your task is the whole page, so reading `run/plan/learning-plan.md` whole once is fine.
- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/plan/mockup.html`: approved content and flow.
- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/research/facts.md` (and `examples.md` for x-NN): the only source of factual claims.
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md`: shared code, the cluster data format and the lane mount contract. `site/pool/` in this run is already synced.
- `/Users/m/workspace/k8s-course/design/control-plane/` (`README.md`, `tokens.json`, `components/`, `components/bundle.css`): the course style guide.
- Reference implementations (read what you need, don't copy widget code): `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/` (components; lane F's `widgets/w-friday-scrolly/data.js` as a data-only lane with waiting Pods and new nodes); `/Users/m/workspace/k8s-course/explainers/ch-07-services/site/assets/page.js` (`CH07_LOOPS`, the table builder).
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §2, §3, §5 (Visuals), §8 steps 4–7.

**Style.** Every chapter uses the Control Plane style guide. Use the course tokens from `site/pool/tokens.css` in place of the kit's default tokens; don't invent tokens or hard-code colours. Follow the guide's `README.md` (voice, colour rules, type, space, figure and widget conventions), the `tokens.json` usage notes and the `components/` treatments. Reference shared files as `pool/<file>`; don't copy kit files into `site/assets/`. Chapter-only CSS and JS go in `site/assets/`. If you need a pool change or another chapter's code, report it instead of copying.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/` except `site/pool/`: `src/shell.html`, `src/s-01.html` … `src/s-09.html`, `assets/`, `widgets/manifest.json`, `widgets/w-rush-scrolly/data.js`.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver. (No waiver.)
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine.
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed. (The plan uses drawn figures only.)
- I4: Finite animations longer than flair have a replay control.
- I6: Carousels don't change height (reflow) between pages.
- I7: SVG markers resolve and aren't clipped.
- I8: Each agent writes only in its namespace. Yours is `site/` except `site/pool/`.

## User decisions that apply (quoted from run/decisions.md)

- d-04: "Approve (Recommended)", with the user's plan comments "yes. let's do a." (Q1), "none" (Q2), "…let's go with your recommendation" (Q3), "…let's just do it." (Q4), "let's keep it simple" (Q5) → build the plan as written: one chapter at about 25 minutes, no cuts applied; no explorer; the late Friday takes about seven minutes with nothing broken; objectives as in the plan's `## Objectives` (they replace the brief's o-4); no pool change.
- d-05: "Yes, all three (Recommended)" → the plan's story facts stand; name the loops "the HPA" and "the cluster autoscaler" as the plan says; the staffing-rule aside stays.
- Course-level decisions in CURRICULUM.md apply as written (§2.3 loop lens wording, §2.12 capitalised kinds, §2.13, §8 step 6 widget height rule, §8 step 7 scrollytelling).
- Standing: don't compress prose to hit the time budget.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every segment s-01 to s-09 is a fragment in `site/src/`, with its figures, checks, disclosures and term cards, and the lane mounts and runs in s-04 with steps A4–A6 gated on k-04.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling --phase page` passes.
- [ ] Every acceptance criterion ac-01 to ac-16 that a builder can check is checked, and the report says how.
- [ ] Every factual statement traces to `facts.md`; anything written around a missing fact is listed under `concerns`.
- [ ] `site/src/PROGRESS.md` is removed.

## Not your job

- Editing the plan, the brief, CURRICULUM.md, the skill, `explainers/_pool/`, `site/pool/`, or any other chapter.
- The course chrome (masthead, course map, end-of-chapter plate): `explainers/_site/` adds it at build time.
- Applying cuts from the cut list; new research; deployment.
