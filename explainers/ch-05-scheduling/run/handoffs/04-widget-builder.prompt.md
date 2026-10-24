# Handoff 04 → widget-builder (friday-scrolly)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/widget-builder.md`. This file is your task. Your widget id is **`w-friday-scrolly`**.

## Original request (verbatim)

> let's apply the R1-R12 now and start chapter 5 now

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/brief.md`
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`

## Task

Build `w-friday-scrolly`: lane F, "Friday, 17:45", a scrollytelling lane of five steps (F1–F5) in §03. It's specified in the plan's `## Widgets` → `### w-friday-scrolly` (option **(b)** throughout; ignore every "(a)/(c)" alternative) and `## Visual grammar`.

- **Render with the shared pool,** never copying it. Use `ClusterCanvas.create(data)` and `ClusterCanvas.lanes('w-friday-scrolly', ClusterData)`, from `pool/cluster/cluster.js`, `lanes.js` and `cluster.css`. The pool README documents the snapshot format, the eight Ch 5 features (capacity and unit, processor footer, `waiting`, `verdicts`, the `scheduler` note, `newNodes`, `use`, `nodesOnly`) and the options.
- **Your folder holds only** this lane's `data.js` (every reader-visible string, the services, Pods and one complete snapshot per step) and thin glue in `index.js` and `index.css`.
- **The page already owns the mount and its markup.** Follow the MOUNT CONTRACT comment in `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/index.html` (the one for `w-friday-scrolly`, in §03).

**A correction to the plan's numbers, verified by the orchestrator.** After F2, node 01 has 1 GB of memory and 0.9 cores free (CPU 3.0 / 3.9), so the third Pod is short of processor on node 01 too. F3's verdicts are therefore `{ '01': 'mem cpu', '02': 'mem cpu', '04': 'mem' }`. The recorded reason is "0/3 nodes are available: 2 Insufficient cpu, 3 Insufficient memory." (The plan says "1 Insufficient cpu".) The page's §03 prose already quotes the corrected string; use exactly the same one. The node footers are computed by the renderer from the Pods, so they'll agree.

**Verdicts draw narrow on desktop.** The lane reserves five node columns from F1, so verdicts show in the narrow form (`✓ FITS` / `✕ MEM` / `✕ CPU`). The step text must therefore state the free amounts that the plan expected the canvas to show, e.g. F2's 3 GB · 1.9 cores on 01, 3 GB · 1.15 on 02, and 1 GB on 04.

**Step text follows the plan's prose rules.** These come from the user's Ch 4 human reviews, `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/run/review/human-review-01.md` and `-02.md`:
- flowing sentences of varied length, with cause and effect spelled out, and no chains of fragments;
- set the scene before acting;
- name who does what: the dispatch team edits the manifest, the ReplicaSet loop writes Pod records, the scheduler places Pods, and Ari's team adds nodes by hand;
- every default says "by default";
- the reason string is described as the format engineers see, with wording that varies between versions;
- the loop lens line uses the chapter's SEES / DOES labels (Ch 4 data's `STRINGS.lens`).

The plan's step drafts are a guide; keep their facts exact.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/plan/learning-plan.md`: `## Widgets` (w-friday-scrolly), `## Visual grammar`, the k-03 item, `## Acceptance criteria` (ac-05 and others that name the lane), and `## Curriculum recommendations` R2 (story facts).
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/index.html`: the mount contract, §03's prose around the lane, and k-03 in F2's step column.
- `/Users/m/workspace/k8s-course/explainers/_pool/README.md`, and `explainers/_pool/cluster/` (read-only; `test/index.html` shows each feature).
- Ch 4's lanes, as a reference for data style: `/Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/widgets/w-cluster-scrolly/data.js` (read-only). Lane F's starting state continues from Ch 4's end state as edited (`storefront` on 01, 04 and 02; after 03:04, `orders` on 04 and the replacement `dispatch` on 01), plus `notifications` on 01 and 02 as the plan specifies.
- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/run/research/facts.md` (c-01, c-02, c-06, c-07, c-20, c-21; x-06).
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §8 steps 6–7 (the widget height rule, the scrollytelling spec) and `/Users/m/workspace/k8s-course/design/control-plane/`.

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-05-scheduling/site/widgets/w-friday-scrolly/` (data.js, index.js, index.css, as `site/widgets/manifest.json` lists them).
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver
- I2: Static only: no runtime data calls (fetch/XHR/WebSocket/beacon) to undeclared origins, and no backend. CDN loads are fine
- I4: Finite animations longer than flair have a replay control
- I6: Carousels don't change height (reflow) between pages
- I7: SVG markers resolve and aren't clipped
- I8: Each agent writes only in its namespace

## User decisions that apply (quoted from run/decisions.md)

- d-03: "Approve" → build the plan as written, with its story facts (R2), corrected as above for F3.
- d-04: "(b) Fix Ch 4 (Recommended)" → option (b) throughout.
- d-05: "keep one chapter, don't cut, I will consider cut in human review (note it in output to consider cutting)" → build all five steps.
- d-06: "Promote it (Recommended)" → use the pooled renderer and lane controller; never copy them.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] F1–F5 render as complete snapshots from `data.js`; scrolling back restores each step exactly; F3–F5 stay locked until k-03 is committed.
- [ ] Every number on the canvas and in the step text agrees with the plan (as corrected above) and with §03's prose.
- [ ] The lane meets §8 step 7 at every width (sticky canvas, inline fallback under 560px tall) and the height rule (§8 step 6); transitions ≤ 300ms, instant under reduced motion.
- [ ] `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/verify.mjs --out /Users/m/workspace/k8s-course/explainers/ch-05-scheduling --widget w-friday-scrolly` passes.

## Not your job

- The page, its prose, the checks or their cards; the other widget (`w-sizing-sandbox`, built in parallel by another builder: don't touch its folder).
- Changing `explainers/_pool/` or `site/pool/`. If the pooled renderer can't draw something the plan needs, report it with the exact change you'd want, and use the closest supported form meanwhile.
- The plan, research, CURRICULUM.md, Ch 1–4's files; deployment; git commits.
