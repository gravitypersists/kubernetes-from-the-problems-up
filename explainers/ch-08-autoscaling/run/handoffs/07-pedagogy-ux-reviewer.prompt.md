# Handoff 07 → pedagogy-ux-reviewer (pedagogy-ux-r1)

## Your role

Read and follow `/Users/m/workspace/k8s-course/.claude/skills/didactician/agents/pedagogy-ux-reviewer.md`. This file is your task.

## Original request (verbatim)

> (this session) continue the didactician run on ch 08, it was last halted part way through a page builder run
>
> (the run's original request) start a /didactician run on ch 08. Let's use Sonnet or Haiku (your choice) for the researcher, but I think orchestrator and instruction designer should be fable.

(The standing course guidance is quoted in the brief.)

## Root spec

- Brief: `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/brief.md` (its o-4 is superseded: the plan's `## Objectives` are the objectives, user decision d-04)
- Skill base directory: `/Users/m/workspace/k8s-course/.claude/skills/didactician`
- Run (`<out>`): `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling`

## Task

Round-1 pedagogy and UX review of the built Chapter 8 page ("The Friday dinner rush: autoscaling") in the course "Desired state: Kubernetes from the problems up". `also_accuracy: false` (a separate accuracy reviewer is running). Make each finding complete enough to fix without a follow-up question.

Judge the page against the brief and the approved plan, as the reader described in the brief would meet it:
- **Does it teach the plan's objectives** (`## Objectives` in the plan; they replace the brief's o-4)? Walk every segment s-01 to s-09 in order, in a browser, committing each check as a reader would. Four blocks are locked until a check is committed (after k-03, k-04, k-06, k-07), and lane steps A4–A6 are locked until k-04: review what is behind them too.
- **Checks k-01 to k-08:** the prompts, options and keys are final in the plan. Judge whether anything visible before a check is committed gives its answer away (headings, rail entries, the standfirst, captions, term cards, asides, the sources footer), whether the feedback teaches, and whether any key is conspicuous (for example the longest option).
- **The lane `w-rush-scrolly`** (s-04, steps A1–A6): the course's scrollytelling convention (CURRICULUM §8 step 7) and widget height rule (§8 step 6). Check it at 1280, 768 and 360 wide, scrolling forward and back, by keyboard, and under reduced motion. Each step's canvas must be a complete snapshot; the step text must match what the canvas shows; the reader must be able to tell a node that is starting from one that is ready and new.
- **Figures Fig. 01 to Fig. 09:** does each one carry its idea, readable at 360px and in dark mode, with its marks explained where they are first used and used consistently across figures (the plan's `### Visual grammar`)?
- **Acceptance criteria ac-01 to ac-16** in the plan.
- **Course principles** (CURRICULUM §2), in particular §2.3 (the loop lens table and its wording), §2.12 (capitalised kinds), §2.13 (refer to things by what they are, not by nicknames, bare times or figure and widget IDs in a sentence), and the misconceptions the plan says this chapter addresses (CURRICULUM §6).
- **Style.** Every chapter uses the Control Plane style guide in `/Users/m/workspace/k8s-course/design/control-plane/`. Check the page against it as part of the UX review: the course tokens from `site/pool/tokens.css` are used (no invented tokens or hard-coded colours); `README.md` (voice, colour rules, type, space, figure and widget conventions) and the `tokens.json` usage notes are followed; the `components/` treatments (hero, prose, figure plate, check) are the reference for those elements. Term cards use `.cp-term`, with at most one payoff variant in the chapter (CURRICULUM §8 step 4).
- **Reading time.** The hero and the rail state 30 minutes; the plan was approved at about 25 with no cuts applied, and the user's standing rule is that prose is never compressed to fit. Say whether the stated time is honest for the built page, and if the page reads long, point to where it drags rather than asking for trimming; the cut order is in `run/plan/cut-list.md`.
- Accessibility basics: keyboard reach and focus for checks, gates, disclosures and the lane; text alternatives for the figures and charts; contrast in both themes.

The course chrome (masthead, course map, end-of-chapter plate) is added at build time and is not on this page; don't report its absence.

## Inputs (read these; don't expect them pasted)

- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/brief.md`
- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/plan/learning-plan.md` (your task is the whole page, so read it whole; `python3 /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/kb.py /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling get <ids> --closure` prints single records), `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/plan/cut-list.md`, and `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/plan/mockup.html` (approved content and flow; its wording was a draft, only its check prompts, options and answers are final)
- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/site/` (`index.html`, `src/`, `assets/`, `widgets/`; `pool/` is shared course code, read-only for this run: a problem that can only be fixed in the pool should say so)
- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/screenshots/page-round-5/` and `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/gate/page-round-5.json` (gate results). Take your own screenshots with `node /Users/m/workspace/k8s-course/.claude/skills/didactician/scripts/probe.mjs` as your role file describes.
- `/Users/m/workspace/k8s-course/design/control-plane/` (`README.md`, `tokens.json`, `components/`, `components/bundle.css`): the course style guide
- `/Users/m/workspace/k8s-course/CURRICULUM.md` §1, §2, §3, §5, §6, §7 (Ch 8 entry), §8 steps 4–7

## Outputs (write only these)

- `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/review/round-1/pedagogy-ux.md` (format: `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/review.md`)
- Probe screenshots in `/Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/screenshots/probe/` (prefix them `ped-r1-`)
- Your report goes in your final message, in the format of `/Users/m/workspace/k8s-course/.claude/skills/didactician/templates/report.md`.

## Invariants that apply to you (verbatim; only the user can relax them)

- I1: No horizontal overflow at 360px, unless the user confirmed a mobile waiver. (No waiver.)
- I4: Finite animations longer than flair have a replay control.
- I6: Carousels don't change height (reflow) between pages.
- I8: Each agent writes only in its namespace. Yours is `run/review/round-1/` (your file) and `run/screenshots/probe/`.

## User decisions that apply (quoted from run/decisions.md)

- d-04: "Approve (Recommended)", with the user's plan comments "yes. let's do a." (Q1), "none" (Q2), "…let's go with your recommendation" (Q3), "…let's just do it." (Q4), "let's keep it simple" (Q5) → the plan is approved as written: one chapter at about 25 minutes, no cuts applied; no explorer; the late Friday takes about seven minutes with nothing broken; objectives as in the plan's `## Objectives`; no pool change.
- d-05: "Yes, all three (Recommended)" → the plan's story facts stand; the loops are named "the HPA" and "the cluster autoscaler"; the staffing-rule aside stays.
- Course-level decisions in CURRICULUM.md apply as written (§2.3, §2.12, §2.13, §8 step 6 widget height rule, §8 step 7 scrollytelling).
- Standing: don't compress prose to hit the time budget.

## Findings to address (revision rounds only)

- none

## Done when

- [ ] Every segment, check, figure and lane step has been walked in a browser at 360 and 1280 (and the lane at 768), with the locked blocks opened. Each problem is a finding with severity, criterion, location (segment or widget ID), evidence (a screenshot where it is visual) and expected fix.
- [ ] `pedagogy-ux.md` follows the review template.

## Not your job

- Factual accuracy against sources (the accuracy reviewer's lane), beyond flagging something that looks wrong.
- Fixing anything; editing the site, plan, research or pool.
