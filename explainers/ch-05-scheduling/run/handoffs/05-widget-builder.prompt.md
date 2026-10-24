# Handoff 05 → widget-builder (sizing-sandbox)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/widget-builder.md`. This file is your task. Your widget id is **`w-sizing-sandbox`**.

## Original request (verbatim)

> let's apply the R1-R12 now and start chapter 5 now

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Build `w-sizing-sandbox`, W-02 "Ari's sizing sheet", a goal-free explorer (blueprint B2) in §04, as specified in the plan's `## Widgets` → `### w-sizing-sandbox` and `## Visual grammar`.

**Controls.** Three memory-request steppers (`storefront`, `orders`, `dispatch`, in 0.5 GB steps, with the plan's ranges and defaults) and one "keep room to lose a node" switch.

**Readouts.**
- how many nodes Fennel needs;
- what sets that number (memory or processor);
- the idle bar: rented room split into used / reserved-but-unused / reserved by nobody;
- the warnings the plan lists, e.g. a Pod bigger than any node.

It opens on Fennel's real state: 5 nodes.

**Keep the model separate from the drawing.** `model.js` defines `window.SizingModel` as pure functions with no DOM: the services, the exact packing, nodes needed, what sets the count, and the idle split, so later chapters (Ch 8, 11, 14) can reuse it. Put data and every reader-visible string in `data.js` (`window.SizingData`), and the controls and wiring in `index.js` / `index.css`.

**Draw the nodes with the shared pool,** never copying it: `ClusterCanvas.create(...)` from `pool/cluster/cluster.js` with `opts.nodesOnly`, plus the capacity/unit, processor footer and `use` features, and the `spare` / `opts.columns` / `opts.labels` options. The pool README documents all of them. Use a separate data object from the lane's: the pool's `create()` makes one renderer per data object, so the two widgets on the page don't collide.

**The page already owns the mount and its frame.** Follow the MOUNT CONTRACT comment for `w-sizing-sandbox` in `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/index.html` (§04). The page owns the three "things to notice" prompts above the mount, the caption below it (which states the simplifications) and the checks k-04 / k-05.

**Packing must be an exact search, not a greedy heuristic.** The designer's prototype found that greedy placement sometimes *lowered* the node count when a request went up, which would teach the wrong thing. The designer estimates at most about 8,000 search steps per setting, and the expected values for given settings are in the plan's acceptance criteria (ac-08). Make the model reproduce every one of them, and include a small self-test that checks them: a function in `model.js`, or a Node script in your folder that the gate doesn't load. Keep each setting change responsive on a phone; memoise if needed.

**Every control's effect is visible next to it.** On phones, the readout strip and controls sit together at the top, with the node drawing below. Controls are reachable by keyboard and by tap, with targets of at least 44px, labelled, and with values announced (`aria-live` on the readouts, politely). State travels as a word plus colour. Follow the widget height rule (CURRICULUM §8 step 6): on screens 600px and wider, reserve the tallest state's height so a setting change never moves the page.

**Note from the pool promotion:** very small requests draw short (a 0.5 GB Pod is about 5px at desktop, and free room under 8px is unlabelled). Make sure the smallest settings still read clearly. Use the pool's `opts.labels` or your own glue, and if the drawing truly can't cope, report the exact pool change you'd want rather than editing the pool.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/plan/learning-plan.md`: `## Widgets` (w-sizing-sandbox), `## Visual grammar`, k-04 and k-05, `## Acceptance criteria` (ac-08 and others naming the sandbox), and `## Curriculum recommendations` R2 (story facts: node size 13 GB and 3.9 cores for Pods; each service's copies, requests and use).
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/index.html`: the mount contract, and §04's prose, prompts and caption around the mount.
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md`, and `explainers/_pool/cluster/` (read-only; `test/index.html` shows each feature).
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/research/facts.md` (c-02, c-03, c-05, c-06; x-08).
- `/Users/m/workspace/k8s-course/.claude/skills/didactician/references/widgets.md` (the B2 blueprint, controls, accessibility).
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §8 step 6 (height rule) and `/Users/m/workspace/k8s-course/design/control-plane/` (the slider/stepper widget treatment in `components/`).

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/widgets/w-sizing-sandbox/` (data.js, model.js, index.js, index.css as `site/widgets/manifest.json` lists them, plus an optional self-test script).
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`. Include the model's results for the ac-08 settings.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace

## User decisions that apply (quoted from run/decisions.md)

- d-03: "Approve" → build the plan as written, with its story facts (R2).
- d-05: "keep one chapter, don't cut, I will consider cut in human review (note it in output to consider cutting)" → build the sandbox in full; it's the last item in the cut order, so the user may weigh it at human review.
- d-06: "Promote it (Recommended)" → draw nodes with the pooled renderer; never copy it.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] The model reproduces every expected value in ac-08 (show them in your report) and is exact; the node count never drops when a request rises.
- [ ] The sandbox opens on 5 nodes; each control's effect is visible beside it at 360, 768 and 1280px; it works by keyboard and by tap; the readouts are announced.
- [ ] No layout shift on a setting change at 600px and wider; no overflow at 360px.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-05-scheduling --widget w-sizing-sandbox` passes.

## Not your job

- The page, its prose, the prompts, the caption, or the checks; the other widget (`w-friday-scrolly`, built in parallel by another builder: don't touch its folder).
- Changing `explainers/_pool/` or `site/pool/` (report needed changes instead).
- The plan, research, CURRICULUM.md, Ch 1–4's files; deployment; git commits.
