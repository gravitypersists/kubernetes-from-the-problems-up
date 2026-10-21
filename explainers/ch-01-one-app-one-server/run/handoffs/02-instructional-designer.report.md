status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/learning-plan.md: the plan. It has 7 segments, 1 high-complexity widget (w-rebuild), 3 static figures (f-01 to f-03), 9 checks and 18 acceptance criteria. It also has a shared visual grammar for drawing machines, the per-widget and per-figure reuse notes, and `## Curriculum recommendations` (R1 to R11).
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/cut-list.md: what's out and why, plus `## If it runs long` (6 ranked cuts and what's protected).
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/plan/mockup.html: a wireframe with real headings and draft prose. Check prompts, options and feedback are final. It includes the full four-stage widget walkthrough, the figures, the cut tables, the assets panel (no third-party assets) and a recommendations summary.

summary: check_plan.py PASS, no warnings. The shape is a narrative article built around one hands-on widget, w-rebuild, which has four stages: (1) predict what's on Sam's server; (2) rebuild it from Sam's six-step notes; (3) run launch checks, where photo upload and confirmation email fail, and diagnose each failure; (4) compare the two machines side by side. The comparison shows the same code on both, three missing items and one setting nobody can explain. One of the missing items is the log clean-up Sam set up by hand after the Friday outage, so the rebuild quietly recreates the outage's cause. o-3 is covered by two predict-then-reveal checks (bigger server; VM plus snapshot) and a snapshot figure, not a second widget. There are three management analogies, each with a "where this analogy breaks" note. No Kubernetes appears. The page ends on an open question that leads into Ch 2.

Widget reuse:
- w-rebuild keeps its data in a separate data.js. Its stage-4 two-machine comparison could serve Ch 2's "same code, one dependency version different" case.
- Ch 3's placement widget should share only the look of a machine, because its model (capacity and placement) is different.
- The f-01 outage timeline is built from a simple data list so Ch 3, 4 or 12 can copy it.

concerns:
- **Facts not in facts.md:** s-02 and the widget use general knowledge that the research doesn't cover: what a process is, what a deploy is, and that servers run scheduled jobs. The accuracy reviewer should treat these as model-level, or a small researcher fill-in can source them.
- **Story assumption (needs confirming at the checkpoint, R5):** in Year 0, Jordan and Morgan are the two founders and Sam is the only engineer. The single app is called "the Fennel app", and `storefront` isn't named until Ch 3.
- **Fiction vs. sourced:** the outage times, the dates the photo tool and email key were added, the log-clean-up job and the holiday-sale setting are Fennel fiction. The plan says not to present them as statistics. The mechanisms behind them are sourced (c-01, c-02, c-03, c-06, c-07).
- **"Plant the seed" interpretation:** I read it as showing "the code is the app" predicting wrongly while leaving the fix (packaging) to Ch 2. o-1 effectively confronts it, which is why R1 proposes cataloguing it as owned by Ch 1.
- **k-02 can be gamed:** it has no distractor cards, so a reader can select all seven. I accepted that for a low-stakes opening prediction; the reason is in cut-list.md.
- **Time budget:** w-rebuild takes about 3 to 4 minutes, which is the main risk to the 12-minute budget. The cut order protects the widget and removes the asides, k-09 and the extra analogies first.
- **Checker output:** check_plan.py itself wrote run/gate/check_plan.txt, which is in the orchestrator's namespace. I didn't write anything outside run/plan/.

relaxed:
- Ch 1 entry, "the reader lists everything installed": replaced free-text listing with a select-then-reveal prediction (k-02) plus diagnosis of the failures (k-04), because there are no free-text boxes by default (ux-ui §8). Recommendation R7 proposes rewording the entry to match.
