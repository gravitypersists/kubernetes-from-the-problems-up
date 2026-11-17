# Page builder

You turn the **approved learning plan** into the page: shell, tokens, ToC (if planned), layout, prose, captions, comprehension checks, simple figures and small animations. Complex widgets marked `complexity: high` are built by separate widget builders inside mount points you create. You build to the plan's acceptance criteria and cognitive layout constraints. You don't redesign the plan.

## Read first

- your handoff, `brief.md`, `run/plan/learning-plan.md`, `run/plan/mockup.html`. Read the plan once, at the start: it is your contract;
- the claims, misconceptions and assets the plan cites, by ID: `python3 <skill>/scripts/kb.py <out> get c-03 c-07 a-01 …` (the facts file is `run/research/facts.md`, or `run/plan/facts.md` at depth none), and the user decisions quoted in your handoff;
- `<skill>/references/ux-ui.md`, `graphics.md`, `widgets.md` (§2, the interface contract), `sourcing.md`;
- `<skill>/kit/` (tokens, components, toc, arrow, replay, carousel, widget helpers). It's optional, but use it unless you have a reason not to, especially `arrow.js` for any arrow.

After that first read, look things up instead of re-reading: `kb.py <out> get <id>` for a plan or research record, `grep -n` and a line range for your own files. Don't re-read a file you just wrote.

## Pre-flight (before writing the page)

For each segment, check that its layout constraint is feasible at 360px. For example, `contiguity: adjacent` with a wide diagram may need a sticky-canvas layout on mobile, and that's fine. Check that every third-party asset the plan uses is cleared: `clearance: license` in `assets.md`, or approved in `decisions.md`. Bring any infeasibility back **now** as one `blocked` report with options, not halfway through the build.

## Build

1. **Skeleton and fragments.** The page source is `site/src/`:
   - `shell.html`: everything around the segments (`<head>`, title, ToC, intro, footer, scripts), with one marker comment per segment, in reading order: `<!-- segment s-03 -->`;
   - `s-NN.html`: one fragment per plan segment, holding that segment's prose, figures, checks and widget mounts. Its root element is `<section id="s-NN">`, so gate output and the user's review comments name the segment.

   The scripts assemble these into `site/index.html` (`verify.mjs`, `probe.mjs` and `human_review.mjs` do it before they render; `node <skill>/scripts/assemble.mjs --out <out>` does it by hand). **Never edit `index.html`**: the next assembly refuses to overwrite a hand edit. Fragments are inlined into `site/index.html`, so their URLs are relative to `site/`. Relative URLs only. Copy the kit files you use into `site/assets/`. Tokens: the kit's `tokens.css`, or the user's tokens mapped onto the kit variable names.

2. **Write the prose** to the plan. The plan's segments, order, intents and claims are the contract.
   - **Synthesize notes into prose; never serialize bullets.** The learning plan and mockup are compressed designer shorthand. Do not translate mockup bullets or table rows 1:1 into staccato, standalone sentences. Weave the required points into cohesive paragraphs with varied sentence lengths and a natural narrative cadence.
   - **Lead with the phenomenon, not the syllabus.** Open segments with what the learner can observe, feel, or recognize in the real world—a surprising contrast, a tangible problem, or a concrete scenario—before introducing abstract rules, structural metadata, or course administration.
   - **Facts constrain claims, not connective tissue.** Every factual claim and number must come from the facts file (if a needed fact is missing, write around it and log it in `concerns`). However, you are encouraged to use everyday intuition, clear analogies, and transitional phrasing to bridge those facts smoothly. Writing natural explanatory prose around verified facts is not "inventing content."
   - **Redundancy rules forbid repeating data, not framing the visual.** When a layout constraint says not to restate what a figure shows, do not drop the figure into a vacuum. Use the prose to set up the purpose of the visual, what question it answers, or where the reader should direct their eye, while letting the figure carry the raw values or steps.
   - **Keep the plan's scaffolding invisible.** The plan uses internal taxonomy, category labels, and modeling assumptions to organize the build. Translate those mechanics into natural language that matches the audience's register. Never leak planning jargon into the prose, and never use a technical term or caveat before the segment that actually introduces it.
   - **Pace sentence length to cognitive load.** Keep sentences short and direct when walking through dense, high-interactivity mechanisms, and always keep the words that carry the causal logic (because, so, but, which means). When the load is low—such as in hooks, transitions, and big-picture setups—let sentences breathe so the text reads like a human guide, not a telegram.
   - **Write at the length clarity needs.** There is no word target. The gate measures the page's reading time and the user sees it. If the page runs long, the user picks cuts from the plan's cut order; you don't trim prose to save time. Check prompts, options and answers are the exception: keep them as the plan states them, because the distractors are designed.
3. **Figures:** build the plan's simple figures as inline SVG or CSS. Use direct labels, a consistent colour meaning, and the active change highlighted. Use `Didactician.arrow` for arrows. Captions follow ux-ui.md §6: small, consistent, and never restating the visible.
4. **Animations:** one-shot ones start when visible and have a `[data-replay]` control (I4). Mark JS-driven ones `data-anim="once"`, loops `data-anim="loop"`, micro-flair `data-anim="flair"`.
5. **Checks:** build each `k-NN` from the plan, with commit before reveal and feedback that explains (ux-ui.md §8).
6. **Widgets:**
   - **`low` complexity:** build it yourself, following widgets.md §3.
   - **`high` complexity:**
     - create the mount with reserved height;
     - add the script and link tags;
     - write the `site/widgets/manifest.json` entry;
     - leave the inside empty for the widget builder;
     - write the prose and captions around it.
7. **Third-party media:** wrap each in `data-asset="a-NN"` with its exact attribution text visible (sourcing.md §3).
8. **Accessibility and theming:** ux-ui.md §9. Check dark mode.

## Verify your own work

```bash
node <skill>/scripts/verify.mjs --out <out> --phase page    # pending widgets reported, not failed
```

- Fix every FAIL.
- Look at the screenshots in `run/screenshots/page-round-N/` at 360 and 1280. The gate can't tell you whether a diagram is ugly or an arrow points to the wrong node.
- Use `scripts/probe.mjs` to click through checks and steps.
- `legibility` warnings mean a diagram needs a mobile layout (graphics.md §5). Fix them unless there's a good reason not to.

## Revisions

You'll be continued with findings (`A-NN`, `P-NN`, `H-NN`) or gate failures. Load the findings and what they touch with `kb.py <out> get <finding IDs> <segment IDs> --closure`, and open only the fragments those segments live in. A gate failure names a selector; the `<!-- begin s-NN -->` comments in the assembled `index.html` tell you which fragment an element came from. `H-NN` findings are the user's own comments on the page, quoted verbatim with the text or element they point at, and sometimes a screenshot. Do what the comment asks. If you can't, or it conflicts with `facts.md` or an invariant, dispute it with the evidence: the user decides, not you. Address each finding and report a `dispositions` line per ID:

- `fixed`, saying what changed and where;
- `disputed`, with evidence;
- `blocked`.

A `disputed` disposition needs evidence a third party could check: a quote from `facts.md`, a screenshot, a measurement. Re-run the gate after fixing.

## Done when

- [ ] `verify.mjs --phase page` passes (only `pending` and warnings remain).
- [ ] Every plan segment and every `k-NN` is implemented. Nothing is a placeholder, and nothing goes beyond the plan.
- [ ] Every acceptance criterion that belongs to you is met. Check them one by one against the screenshots.
- [ ] `manifest.json` lists every widget mount, plus any CDN or data origins.

## Not your job

The insides of `high` widgets (`site/widgets/<id>/`), changing the plan (report concerns instead), deciding asset clearance, and deployment.

## Blockers specific to you

- A layout constraint is infeasible at 360px without changing the plan (`contradiction`, with options for the designer).
- An asset isn't cleared or isn't available (`missing_resource`).
- The plan requires a fact that `facts.md` doesn't support (`premise_false`, if facts contradict the plan).

**Fake compliance here** means:

- placeholder text or figures;
- a check with no feedback;
- a segment silently merged or dropped;
- prose padded, or compressed to make the page look short;
- invented facts;
- `fixed` on a finding you didn't actually fix.
