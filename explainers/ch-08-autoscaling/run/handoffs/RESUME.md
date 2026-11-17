# Resuming the Chapter 8 run (orchestrator's note, 2026-11-16)

Written because the session may stop for usage limits and be continued by another session or system. Everything needed is on disk; this file says where.

## Where the run stands

- Pipeline: the didactician skill, `/Users/m/workspace/k8s-course/.claude/skills/didactician/SKILL.md`. Project rules: `/Users/m/workspace/k8s-course/CLAUDE.md` and `CURRICULUM.md` §8.
- Stage: **build**. Intake, research (dispatch 01) and the plan (dispatch 02) are done and received. The user approved the plan at the checkpoint (`run/decisions.md` d-04 to d-07). Dispatch 03 was abandoned unspawned.
- **Open dispatch: 04 page-builder** (`run/handoffs/04-page-builder.prompt.md`), on Fable, writing `site/` except `site/pool/`. It also builds the data-only lane `w-rush-scrolly`. There is no widget builder in this run.
- Current state: `python3 .claude/skills/didactician/scripts/init_run.py explainers/ch-08-autoscaling --slug ch-08-autoscaling --depth light --minutes 22` (prints stage and open dispatches; it does not re-initialise).

## If the page builder stalled

1. Read `site/src/PROGRESS.md`: the builder's own checklist, decisions not in the plan, and what is left. Files it finished are in `site/src/`, `site/assets/`, `site/widgets/`.
2. An agent from an ended session can't be continued. Close the old dispatch: `python3 .claude/skills/didactician/scripts/round_gate.py explainers/ch-08-autoscaling receive 04 --abandon "stalled on usage; respawned"`.
3. Authorise a new one: `round_gate.py explainers/ch-08-autoscaling dispatch --role page-builder --loop gate:page --writes site --exclude 'site/pool/*' --label page-build-resume`. Write its handoff from `04-page-builder.prompt.md`, adding: "A previous builder stalled. Read `site/src/PROGRESS.md` and the files already in `site/`; continue from there; don't rewrite finished fragments." Spawn a fresh agent (never a fork) with: "Read and follow `<skill>/agents/page-builder.md`. Your task handoff is `<path>`." Log it as a respawn.
4. Save its report as `run/handoffs/NN-page-builder.report.md`, then `round_gate.py … receive NN`.

## After the page builder reports done

1. Full gate: `node .claude/skills/didactician/scripts/verify.mjs --out explainers/ch-08-autoscaling` (never `--phase page` here). Route failures back to the builder.
2. Stage `review`: two fresh reviewers in parallel, **on Sonnet** (d-06): `accuracy-reviewer` (`--loop review:accuracy`) and `pedagogy-ux-reviewer` (`--loop review:pedagogy-ux`), each `--writes run/review/round-1`. Give them the brief, the plan (pedagogy-ux), `run/research/facts.md` (accuracy), the site, the gate's screenshots, and the style guide `design/control-plane/` (pedagogy-ux). Never builder reports.
3. `findings.py … ingest 1`; one combined fix round to the page builder (user's standing preference: batch, one builder per fix round); re-run the gate.
4. Stage `human-review` (CURRICULUM §8 step 9: a formal check; never ship on "review later"): `human_review.mjs --out explainers/ch-08-autoscaling --target site`. Then the skill's Stage 4b, the closure round, and delivery.
5. After the chapter ships: CURRICULUM.md updates from the plan's `## Curriculum recommendations` (approved in d-05), per §8 step 8.

## Things only this session knew

- Models (d-03, d-06): researcher Sonnet; designer and builders Fable; reviewers Sonnet.
- The brief's o-4 is superseded by the plan's `## Objectives` (d-04).
- Ch 6 and Ch 7 are still at stage `human-review`; this chapter relies on their story facts.
- Concerns to pass to the accuracy reviewer as plan-level assumptions (from the designer's report, `run/handoffs/02-instructional-designer.report.md`): the 180% reading, the HPA reaching 9 "in a couple of quick steps", a Pod's start at about 1.5 minutes, Fennel's four-minute node start, a copy that can't reach the database failing readiness. Give the reviewer the facts and the page, not that report.
- `run/plan/PROGRESS.md` is the designer's finished working note (`status: complete`); harmless.

## Update, 2026-11-16 late (session stopped on the usage limit) — this section supersedes the steps above

- Done: dispatch 05 (respawned page builder) finished the build; full gate PASS (`run/gate/page-round-5.json`). Stage is **review**. Round-1 reviews received (06 accuracy, 07 pedagogy-ux) and ingested: `run/review/round-1/findings.md` (1 blocking A-01, 12 should, 14 nit).
- **Open dispatch: 08 page-builder (fix-round-1)**, handoff `run/handoffs/08-page-builder.prompt.md`. Its agent was stopped seconds after starting when the usage limit hit; it may have made a few edits in `site/`. Snapshot of `site/` before it: `run/history/08-page-builder/`.
- To continue: `round_gate.py … receive 08 --abandon "stopped on usage limit; respawned"`; check `git status`/diff `site/` against `run/history/08-page-builder/` and restore if half-edited; dispatch a fresh page-builder (Fable, `--loop gate:page --writes site --exclude 'site/pool/*' --label fix-round-1-resume`) with the same handoff 08 text; save report, receive, run the full gate.
- Then (user decision d-08): `round_gate.py … stage human-review`; do NOT open a review session; commit `explainers/ch-08-autoscaling/` and push. The run stays at `human-review` (CURRICULUM §8 step 9). Closure round and curriculum updates wait for the user's review.
- Held for the user: P-11 (lens exercise vs rewording objective o-1), P-17 (sources footer), P-19 (pool rail truncation); A-02/P-01 was routed as "keep seven minutes, make the clocks agree" — tell the user.
- The repo also has uncommitted changes under `.agents/skills/didactician/` and `skills-lock.json` that are not this run's: don't include them in the chapter commit without asking.

## Update, 2026-11-17 — supersedes everything above

- Fix round 1 (dispatch 08) is done and received; full gate PASS (`run/gate/page-round-8.json`). Dispositions for every round-1 finding are in `run/handoffs/08-page-builder.report.md`.
- Stage is **human-review**, waiting for the user (d-08: "I'll review later"). No review session has been opened. The chapter is committed and pushed in this state.
- When the user is ready: `node .claude/skills/didactician/scripts/human_review.mjs --out explainers/ch-08-autoscaling --target site`, then the skill's Stage 4b (confirm they're finished, ingest, fix, user closes each H- finding), then the closure round (round 2, fresh reviewers on Sonnet) for the round-1 findings, then deliver, then the CURRICULUM.md updates (§8 step 8).
- Held for the user at their review: P-11 (a lens exercise vs rewording objective o-1), P-17 (sources footer shows two checks' answers at the page's end), P-19 (rail titles truncate; the pool's). A-05 was disputed by the builder (optional nit). A-02/P-01 was routed as "keep the approved seven minutes, count from about 17:33".
- Pool items to raise after the run: a one-line ready chip shows no status word; the record row has no STARTING count and drops READY at 360; the spare-frame word is clipped at 360 (worked around in page.css); rail titles truncate.
