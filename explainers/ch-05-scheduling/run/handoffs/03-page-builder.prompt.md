# Handoff 03 → page-builder (page-build)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/page-builder.md`. This file is your task.

## Original request (verbatim)

> let's apply the R1-R12 now and start chapter 5 now

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Build the Chapter 5 page ("Who runs where: scheduling, resources and cost") from the approved learning plan, **written for option (b) throughout**. The user chose (b) at d-04, and Ch 4 has already been edited to the default-scheduler layout. Ignore every "(a)/(c)" alternative and drop D3, which exists only under option (c).

You build:
- the shell, the shared tokens and the ToC;
- the opening cast strip and the "I didn't read the last chapter" disclosure (D1), plus the other disclosures in the plan's `## Disclosures` except D3;
- all prose for s-01 to s-09;
- the four term cards (`.cp-term`; TERM 01 is the chapter's only payoff variant) as `## Figures` specifies;
- figures f-01 to f-07, including f-06, the loop lens table built from `CH05_LOOPS` in `assets/page.js` (a copy of Ch 4's `CH04_LOOPS` with this chapter's rows and the plan's NEW IN CH 5 tags), and the two budget asides, each with its WHERE THIS ANALOGY BREAKS line;
- every comprehension item, k-01 to k-09, including k-03 in lane F's step column;
- the scaffolds and mounts for both widgets;
- `site/widgets/manifest.json`.

**Split with the widget builders.** Both widgets are `complexity: high`, and a separate widget builder builds each one:
- `site/widgets/w-friday-scrolly/`: lane F, a scrollytelling lane on the pooled cluster renderer and lane controller;
- `site/widgets/w-sizing-sandbox/`: W-02, the B2 sandbox.

You own the markup around them:
- lane F's container, its step list and k-03 as a page-level `.cp-check` card at its gate;
- the sandbox's section frame, and k-04 before it and k-05 after it as page checks;
- the `didactician:check-commit` event your check script dispatches on every commit, with the check id, as in Ch 4.

Follow Ch 4's mount contract (the MOUNT CONTRACT comment in Ch 4's `site/index.html` §04) for lane F, adapted to one lane with steps F1–F5 and the gate on k-03. Write a mount contract for the sandbox from the plan's `## Widgets` w-sizing-sandbox entry. Document both in comments in `index.html` and in your report, so the widget builders don't have to guess. Reserve heights per the plan and CURRICULUM.md §8 steps 6–7. f-01 to f-07 are yours: draw them with page-level classes in `site/assets/`, and none may depend on a widget having loaded.

**The shared pool.** Reference shared files as `pool/<file>`: `pool/tokens.css`, `pool/components.css`, `pool/toc.js`, `pool/widget.js`, `pool/arrow.js` if needed, and, for the widgets, `pool/cluster/cluster.css`, `pool/cluster/cluster.js` and `pool/cluster/lanes.js`. The pool README `/Users/m/workspace/k8s-course/explainers/_pool/README.md` documents them, including the cluster drawing's snapshot format and options. `site/pool/` is read-only and is already synced. Never copy kit or pool files into `site/assets/`, and put chapter-only CSS and JS in `site/assets/`. If you need a pool change, report it instead of making it. Load the pooled cluster files from `index.html` in the order the pool README gives, or as Ch 4's `index.html` does now.

**Course consistency.** Ch 4's site (`/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/`, read-only) is the reference implementation of the course's page components: hero, ToC, cast strip `.cp-cast`, disclosures `.cp-more`, checks `.cp-check` with "Why the other answers miss", term card `.cp-term` and its payoff variant, `.cp-aside` with `.cp-breaks`, `.cp-quote`, `.cp-recap`, figure plates, the loop lens table builder, and the sources footer. Reimplement what isn't in the pool in this chapter's `site/assets/`, looking and behaving the same. Never edit Ch 1–4's files.

**Prose.** The mockup gives the approved content and flow. Its prose is a draft: write the real prose yourself to the plan's intents and `content:` points. Only the mockup's check prompts, options and feedback are final, and they must be used verbatim. The plan's `## Shape` **Prose rules** bind you. They come from the user's two human reviews of Ch 4 (`/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/review/human-review-01.md` and `human-review-02.md`); read both.
- Write flowing sentences of varied length, with cause and effect spelled out. No telegraphic chains of fragments.
- Use clear, active verbs.
- **Don't compress prose to hit a time budget** (d-05).
- Set up every scene before its lane or figure. §03 opens with where the cluster stands, who is about to do what, and how to read the canvas in GB and cores.
- Ground every component before it acts.
- No unexplained analogies. Every analogy maps its parts and says where it breaks.
- Name who does what.
- Keep the reconcile-loop pattern distinct from the scheduler as one implementation of it.
- Use the loop lens in its current wording: "which loop is it, what does it want, what does it see, and what does it do about a gap?" (short form: which loop · wants · sees · does).
- No sentence whose referent the reader must guess. No "the figure" without its number. No sentence that sends the reader to a label inside a figure. No meta lines about the course.
- Side caveats go in the planned disclosures.

Show the time label as **26 minutes** (d-05). Use the hero kicker in the course pattern (Ch 4's is "CHAPTER 04 · Part II · Fennel, year 3"; this one is chapter 05).

Other rules:
- Respect the plan's **vocabulary guard** exactly. Kubernetes kinds are capitalised (Pod, ReplicaSet) and "node" is lowercase (CURRICULUM §2.12).
- Every default carries "by default" or "with default settings" in the same sentence. Providers stay generic in the main text: "In most setups you pay for the machines; a few per-Pod options bill for what each Pod requests" (research c-12's wording).
- Fennel's numbers are fiction, approved at d-03; never present them as statistics. Survey figures appear only in D5, each with who measured it, when and how.
- The leak-vs-growth patterns (f-07, k-09's reveal) are an engineers' rule of thumb, not a sourced fact; word them that way. The scheduler's reason string is labelled illustrative, in the format engineers see (the wording varies between versions).
- **Note from the pool promotion:** at desktop width the lane's node verdicts draw in their narrow form (`✓ FITS` / `✕ MEM` / `✕ CPU`), because five node columns are reserved from F1. Wherever the plan relies on the canvas to show free amounts, the prose (and the widget's step text) must state them.
- Use catalog IDs (m-07, m-08, m-26, local-01…) only in comments or data, never in reader-visible text.
- Cite sources from `facts.md` in the sources footer, as Ch 4 does.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/plan/learning-plan.md`: the approved plan.
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/plan/mockup.html`: approved content and flow; checks are final.
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/plan/cut-list.md`: what's out; don't re-add any of it. Don't apply `## If it runs long` either (d-05).
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/research/facts.md`, and the earlier chapters' facts it references.
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md` (the pool, the cluster drawing and the lanes).
- Ch 4's site, read-only: `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/`.
- `/Users/m/workspace/k8s-course/design/control-plane/` (README.md, tokens.json, components/).
- `/Users/m/workspace/k8s-course/CURRICULUM.md`: §2 (including 2.3, 2.11 and 2.12), §3 (Year 3 facts), and §8 steps 4–7.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/`, except the contents of `site/widgets/<id>/` and except `site/pool/` (read-only). You do write `site/widgets/manifest.json`.
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`, including both mount contracts.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I3: Third-party media is cleared (by licence for the intended use, or by the user) and visibly attributed
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace

## User decisions that apply (quoted from run/decisions.md)

- d-03: "Approve" → build the plan as written, including its story facts (R2: 16 GB / 4-core nodes with about 13 GB and 3.9 cores for Pods; the services' requests, limits and use; `notifications` 2 copies; Friday 17:45 and nodes 05 and 06; Tuesday's three OOM-kills of `orders-q2rw`; the bill, five nodes against four machines; Year 2's spares given back before the move).
- d-04: "(b) Fix Ch 4 (Recommended)" → option (b) throughout; Ch 4 now has `storefront` on 01, 04 and 02, and at 03:04 `orders` → 04 and `dispatch` → 01.
- d-05: "keep one chapter, don't cut, I will consider cut in human review (note it in output to consider cutting)" → build every segment; no cuts; time label 26 minutes; report your honest reading-time estimate.
- d-06: "Promote it (Recommended)" → the cluster renderer and lane controller are in the pool (`pool/cluster/`); use them, never copy.
- Course-wide (Ch 4 run d-05, d-13): capitalised kinds; the loop lens wording above.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] All segments, disclosures (except D3), term cards, figures, asides and page checks in the plan are built, and the check text matches the mockup verbatim.
- [ ] Tokens and kit components come from `pool/`, with no invented tokens or hard-coded colours, and nothing copied from the pool into `site/assets/`.
- [ ] Both widget scaffolds and mounts follow the plan's sizes, both mount contracts are documented, and `site/widgets/manifest.json` lists both widgets and their files.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-05-scheduling --phase page` passes. Widgets reported as pending are expected.

## Not your job

- Building either widget (anything inside `site/widgets/w-friday-scrolly/` or `site/widgets/w-sizing-sandbox/`).
- Changing the pool, the plan, research, CURRICULUM.md, the style guide, or Ch 1–4's files.
- Deployment; git commits.
