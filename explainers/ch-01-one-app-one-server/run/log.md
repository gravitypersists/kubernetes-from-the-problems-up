# Run log: ch-01-one-app-one-server

Human-readable timeline. Each entry links the files it refers to. Every dispatch has a
prompt and report in `handoffs/` and a pre-dispatch snapshot in `history/`.

### 2026-10-20T22:41:09-04:00 · orchestrator · init
Run initialised: depth `light`, budget 12 min. Caps: 18 dispatches, 75 agent-minutes; loops {'research': 2, 'checkpoint': 4, 'gate': 6, 'review': 2}.
- [brief.md](brief.md)
- [decisions.md](decisions.md)

### 2026-10-20T22:41:41-04:00 · orchestrator · user_decision
Intake: 12 min, light research (d-01, d-02)
- [run/decisions.md](run/decisions.md)

### 2026-10-20T22:41:41-04:00 · orchestrator · stage
Stage: intake → **research**

### 2026-10-20T22:41:41-04:00 · orchestrator · dispatch
Dispatch 01 → **researcher** (ch1-light-research), loop research round 1/2. May write: `run/research`. Usage: 1/18 dispatches, 0/75 agent-min.
- [handoffs/01-researcher.prompt.md](handoffs/01-researcher.prompt.md)
- [history/01-researcher](history/01-researcher)

### 2026-10-20T22:47:22-04:00 · orchestrator · receive
Received 01 ← **researcher**: `done_with_concerns`. 9 file(s) changed.
- [handoffs/01-researcher.report.md](handoffs/01-researcher.report.md)

### 2026-10-20T22:47:22-04:00 · orchestrator · stage
Stage: research → **plan**

### 2026-10-20T22:47:22-04:00 · orchestrator · dispatch
Dispatch 02 → **instructional-designer** (ch1-plan), loop checkpoint round 1/4. May write: `run/plan`. Usage: 2/18 dispatches, 6/75 agent-min.
- [handoffs/02-instructional-designer.prompt.md](handoffs/02-instructional-designer.prompt.md)
- [history/02-instructional-designer](history/02-instructional-designer)

### 2026-10-20T23:00:12-04:00 · orchestrator · receive
Received 02 ← **instructional-designer**: `done_with_concerns`. 8 file(s) changed.
- [handoffs/02-instructional-designer.report.md](handoffs/02-instructional-designer.report.md)

### 2026-10-20T23:00:12-04:00 · orchestrator · stage
Stage: plan → **checkpoint**

### 2026-10-20T23:32:22-04:00 · orchestrator · user_decision
Checkpoint: plan approved; Fennel founders confirmed; apply curriculum recs R1,R2,R3,R5,R7,R11 now (d-03..d-05)
- [run/decisions.md](run/decisions.md)

### 2026-10-20T23:32:42-04:00 · orchestrator · curriculum_update
Applied R1,R2,R3,R5,R7,R11 to CURRICULUM.md (m-19..m-22 added; ledger, Fennel cast, Ch1 entry, §2.8, §6/§8 ID rule)
- [../../CURRICULUM.md](../../CURRICULUM.md)

### 2026-10-20T23:32:48-04:00 · orchestrator · stage
Stage: checkpoint → **build**

### 2026-10-20T23:32:48-04:00 · orchestrator · dispatch
Dispatch 03 → **page-builder** (ch1-page), loop gate:page round 1/6. May write: `site` except `site/widgets/*/*`. Usage: 3/18 dispatches, 19/75 agent-min.
- [handoffs/03-page-builder.prompt.md](handoffs/03-page-builder.prompt.md)
- [history/03-page-builder](history/03-page-builder)

### 2026-10-20T23:44:13-04:00 · verify · gate
Gate (page) round 1: **PASS**. Reading ~10.9 min (brief: ~12 min; reported, not gated); 368 KB, 18 requests.
- [gate/page-round-1.json](gate/page-round-1.json)
- [screenshots/page-round-1](screenshots/page-round-1)

### 2026-10-20T23:46:40-04:00 · verify · gate
Gate (page) round 2: **PASS**. Reading ~10.9 min (brief: ~12 min; reported, not gated); 383 KB, 18 requests.
- [gate/page-round-2.json](gate/page-round-2.json)
- [screenshots/page-round-2](screenshots/page-round-2)

### 2026-10-20T23:47:06-04:00 · verify · gate
Gate (page) round 3: **PASS**. Reading ~10.9 min (brief: ~12 min; reported, not gated); 361 KB, 18 requests.
- [gate/page-round-3.json](gate/page-round-3.json)
- [screenshots/page-round-3](screenshots/page-round-3)

### 2026-10-20T23:48:06-04:00 · verify · gate
Gate (page) round 4: **PASS**. Reading ~10.9 min (brief: ~12 min; reported, not gated); 248 KB, 18 requests.
- [gate/page-round-4.json](gate/page-round-4.json)
- [screenshots/page-round-4](screenshots/page-round-4)

### 2026-10-20T23:49:07-04:00 · orchestrator · receive
Received 03 ← **page-builder**: `done_with_concerns`. 50 file(s) changed.
- [handoffs/03-page-builder.report.md](handoffs/03-page-builder.report.md)

### 2026-10-20T23:49:07-04:00 · orchestrator · routing
Post-approval wording change (no change to objectives/segments/shape/assets): 'image-resizing tool' -> 'photo-resizing tool' in widget text, to satisfy plan ac-03 and match page prose; kept course title/Kubernetes out of hero per ac-03

### 2026-10-20T23:49:07-04:00 · orchestrator · dispatch
Dispatch 04 → **widget-builder** (w-rebuild), loop gate:w-rebuild round 1/6. May write: `site/widgets/w-rebuild`. Usage: 4/18 dispatches, 35/75 agent-min.
- [handoffs/04-widget-builder.prompt.md](handoffs/04-widget-builder.prompt.md)

### 2026-10-21T00:04:52-04:00 · verify · gate
Gate (w-rebuild) round 1: **PASS**. Reading ~11.3 min (brief: ~12 min; reported, not gated); 266 KB, 18 requests.
- [gate/w-rebuild-round-1.json](gate/w-rebuild-round-1.json)
- [screenshots/w-rebuild-round-1](screenshots/w-rebuild-round-1)

### 2026-10-21T00:16:34-04:00 · verify · gate
Gate (w-rebuild) round 2: **PASS**. Reading ~11.3 min (brief: ~12 min; reported, not gated); 399 KB, 18 requests.
- [gate/w-rebuild-round-2.json](gate/w-rebuild-round-2.json)
- [screenshots/w-rebuild-round-2](screenshots/w-rebuild-round-2)

### 2026-10-21T00:17:29-04:00 · orchestrator · receive
Received 04 ← **widget-builder**: `done_with_concerns`. 16 file(s) changed.
- [handoffs/04-widget-builder.report.md](handoffs/04-widget-builder.report.md)

### 2026-10-21T00:17:49-04:00 · verify · gate
Gate (page) round 5: **PASS**. Reading ~11.3 min (brief: ~12 min; reported, not gated); 403 KB, 18 requests.
- [gate/page-round-5.json](gate/page-round-5.json)
- [screenshots/page-round-5](screenshots/page-round-5)

### 2026-10-21T00:17:56-04:00 · orchestrator · stage
Stage: build → **review**

### 2026-10-21T00:17:56-04:00 · orchestrator · dispatch
Dispatch 05 → **accuracy-reviewer** (review-accuracy-r1), loop review:accuracy round 1/2. May write: `run/review/round-1`. Usage: 5/18 dispatches, 63/75 agent-min.
- [handoffs/05-accuracy-reviewer.prompt.md](handoffs/05-accuracy-reviewer.prompt.md)

### 2026-10-21T00:17:56-04:00 · orchestrator · dispatch
Dispatch 06 → **pedagogy-ux-reviewer** (review-pux-r1), loop review:pedagogy-ux round 1/2. May write: `run/review/round-1`. Usage: 6/18 dispatches, 63/75 agent-min.
- [handoffs/06-pedagogy-ux-reviewer.prompt.md](handoffs/06-pedagogy-ux-reviewer.prompt.md)

### 2026-10-21T00:23:36-04:00 · orchestrator · receive
Received 05 ← **accuracy-reviewer**: `done_with_concerns`. 60 file(s) changed.
- [handoffs/05-accuracy-reviewer.report.md](handoffs/05-accuracy-reviewer.report.md)

### 2026-10-21T00:30:09-04:00 · orchestrator · receive
Received 06 ← **pedagogy-ux-reviewer**: `done_with_concerns`. 91 file(s) changed.
- [handoffs/06-pedagogy-ux-reviewer.report.md](handoffs/06-pedagogy-ux-reviewer.report.md)

### 2026-10-21T00:30:09-04:00 · orchestrator · findings
Round 1 ingested: 19 finding(s) touched; open: 1 blocking, 9 should, 9 nit.
- [review/round-1/findings.md](review/round-1/findings.md)

### 2026-10-21T08:08:39-04:00 · orchestrator · user_decision
Review round 1: check-text fixes approved incl. P-01 (d-06); keep all content, relabel time ~17 min (d-07)
- [run/decisions.md](run/decisions.md)

### 2026-10-21T08:08:39-04:00 · round_gate · refused
Dispatch `page-builder/r1-fixes-page` refused (exit 2): agent-time cap reached (75/75 min). Escalate.

### 2026-10-21T08:08:39-04:00 · round_gate · refused
Dispatch `widget-builder/r1-fixes-widget` refused (exit 2): agent-time cap reached (75/75 min). Escalate.

### 2026-10-21T08:09:17-04:00 · orchestrator · extend
Caps extended per d-08: +45 agent-min.
- [decisions.md](decisions.md)

### 2026-10-21T08:09:17-04:00 · orchestrator · dispatch
Dispatch 07 → **page-builder** (r1-fixes-page), loop gate:page round 2/6. May write: `site` except `site/widgets/*/*`. Usage: 7/18 dispatches, 75/120 agent-min.
- [handoffs/07-page-builder.prompt.md](handoffs/07-page-builder.prompt.md)
- [history/07-page-builder](history/07-page-builder)

### 2026-10-21T08:09:17-04:00 · orchestrator · dispatch
Dispatch 08 → **widget-builder** (r1-fixes-widget), loop gate:w-rebuild round 2/6. May write: `site/widgets/w-rebuild`. Usage: 8/18 dispatches, 75/120 agent-min.
- [handoffs/08-widget-builder.prompt.md](handoffs/08-widget-builder.prompt.md)
- [history/08-widget-builder](history/08-widget-builder)

### 2026-10-21T08:12:40-04:00 · verify · gate
Gate (page) round 6: **PASS**. Reading ~11.5 min (brief: ~17 min; reported, not gated); 406 KB, 18 requests.
- [gate/page-round-6.json](gate/page-round-6.json)
- [screenshots/page-round-6](screenshots/page-round-6)

### 2026-10-21T08:13:21-04:00 · verify · gate
Gate (page) round 7: **PASS**. Reading ~11.5 min (brief: ~17 min; reported, not gated); 393 KB, 18 requests.
- [gate/page-round-7.json](gate/page-round-7.json)
- [screenshots/page-round-7](screenshots/page-round-7)

### 2026-10-21T08:14:01-04:00 · verify · gate
Gate (w-rebuild) round 3: **PASS**. Reading ~11.5 min (brief: ~17 min; reported, not gated); 396 KB, 18 requests.
- [gate/w-rebuild-round-3.json](gate/w-rebuild-round-3.json)
- [screenshots/w-rebuild-round-3](screenshots/w-rebuild-round-3)

### 2026-10-21T08:14:25-04:00 · orchestrator · receive
Received 07 ← **page-builder**: `done_with_concerns`. 25 file(s) changed.
- [handoffs/07-page-builder.report.md](handoffs/07-page-builder.report.md)

### 2026-10-21T08:14:41-04:00 · orchestrator · receive
Received 08 ← **widget-builder**: `done_with_concerns`. 26 file(s) changed.
- [handoffs/08-widget-builder.report.md](handoffs/08-widget-builder.report.md)

### 2026-10-21T08:15:01-04:00 · verify · gate
Gate (page) round 8: **PASS**. Reading ~11.5 min (brief: ~17 min; reported, not gated); 307 KB, 18 requests.
- [gate/page-round-8.json](gate/page-round-8.json)
- [screenshots/page-round-8](screenshots/page-round-8)

### 2026-10-21T08:15:09-04:00 · orchestrator · dispatch
Dispatch 09 → **accuracy-reviewer** (review-accuracy-r2), loop review:accuracy round 2/2. May write: `run/review/round-2`. Usage: 9/18 dispatches, 81/120 agent-min.
- [handoffs/09-accuracy-reviewer.prompt.md](handoffs/09-accuracy-reviewer.prompt.md)

### 2026-10-21T08:15:09-04:00 · orchestrator · dispatch
Dispatch 10 → **pedagogy-ux-reviewer** (review-pux-r2), loop review:pedagogy-ux round 2/2. May write: `run/review/round-2`. Usage: 10/18 dispatches, 81/120 agent-min.
- [handoffs/10-pedagogy-ux-reviewer.prompt.md](handoffs/10-pedagogy-ux-reviewer.prompt.md)

### 2026-10-21T08:17:33-04:00 · orchestrator · receive
Received 09 ← **accuracy-reviewer**: `done`. 18 file(s) changed.
- [handoffs/09-accuracy-reviewer.report.md](handoffs/09-accuracy-reviewer.report.md)

### 2026-10-21T08:21:44-04:00 · orchestrator · receive
Received 10 ← **pedagogy-ux-reviewer**: `done`. 41 file(s) changed.
- [handoffs/10-pedagogy-ux-reviewer.report.md](handoffs/10-pedagogy-ux-reviewer.report.md)

### 2026-10-21T08:21:44-04:00 · orchestrator · findings
Round 2 ingested: 19 finding(s) touched; open: 0 blocking, 1 should, 0 nit.
- [review/round-2/findings.md](review/round-2/findings.md)

### 2026-10-21T08:21:51-04:00 · orchestrator · stage
Stage: review → **deliver**

### 2026-10-21T08:23:17-04:00 · orchestrator · user_decision
Delivery: ship as-is with P-01 open (d-09); applied R4, R6, R8-R10 to CURRICULUM.md (d-10)
- [run/decisions.md](run/decisions.md)

### 2026-10-21T08:23:17-04:00 · orchestrator · delivered
Ch 1 delivered: site/ ~17 min, 307 KB; 0 blocking; P-01 should open; P-12 dispute upheld
- [site/index.html](site/index.html)

### 2026-10-21T08:23:17-04:00 · orchestrator · stage
Stage: deliver → **done**

### 2026-10-22T21:20:36-04:00 · verify · gate
Gate (page) round 9: **PASS**. Reading ~11.5 min (brief: ~17 min; reported, not gated); 434 KB, 18 requests.
- [gate/page-round-9.json](gate/page-round-9.json)
- [screenshots/page-round-9](screenshots/page-round-9)

### 2026-10-23T02:29:09-04:00 · verify · gate
Gate (page) round 10: **PASS**. Reading ~11.5 min (brief: ~17 min; reported, not gated); 387 KB, 18 requests.
- [gate/page-round-10.json](gate/page-round-10.json)
- [screenshots/page-round-10](screenshots/page-round-10)

### 2026-10-24T10:32:16-04:00 · verify · gate
Gate (page) round 11: **PASS**. Reading ~11.5 min (brief: ~17 min; reported, not gated); 269 KB, 18 requests.
- [gate/page-round-11.json](gate/page-round-11.json)
- [screenshots/page-round-11](screenshots/page-round-11)
