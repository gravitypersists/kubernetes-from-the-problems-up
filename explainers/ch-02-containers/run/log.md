# Run log: ch-02-containers

Human-readable timeline. Each entry links the files it refers to. Every dispatch has a
prompt and report in `handoffs/` and a pre-dispatch snapshot in `history/`.

### 2026-10-21T09:13:20-04:00 · orchestrator · init
Run initialised: depth `light`, budget 14 min. Caps: 18 dispatches, 75 agent-minutes; loops {'research': 2, 'checkpoint': 4, 'gate': 6, 'review': 2}.
- [brief.md](brief.md)
- [decisions.md](decisions.md)

### 2026-10-21T09:13:56-04:00 · orchestrator · user_decision
Intake: 14 min, light research (curriculum), default caps (d-01, d-02)
- [run/decisions.md](run/decisions.md)

### 2026-10-21T09:13:56-04:00 · orchestrator · stage
Stage: intake → **research**

### 2026-10-21T09:13:56-04:00 · orchestrator · dispatch
Dispatch 01 → **researcher** (ch2-light-research), loop research round 1/2. May write: `run/research`. Usage: 1/18 dispatches, 0/75 agent-min.
- [handoffs/01-researcher.prompt.md](handoffs/01-researcher.prompt.md)
- [history/01-researcher](history/01-researcher)

### 2026-10-21T09:23:03-04:00 · orchestrator · receive
Received 01 ← **researcher**: `done_with_concerns`. 9 file(s) changed.
- [handoffs/01-researcher.report.md](handoffs/01-researcher.report.md)

### 2026-10-21T09:23:03-04:00 · orchestrator · stage
Stage: research → **plan**

### 2026-10-21T09:23:03-04:00 · orchestrator · dispatch
Dispatch 02 → **instructional-designer** (ch2-plan), loop checkpoint round 1/4. May write: `run/plan`. Usage: 2/18 dispatches, 9/75 agent-min.
- [handoffs/02-instructional-designer.prompt.md](handoffs/02-instructional-designer.prompt.md)
- [history/02-instructional-designer](history/02-instructional-designer)

### 2026-10-21T09:37:39-04:00 · orchestrator · receive
Received 02 ← **instructional-designer**: `done_with_concerns`. 8 file(s) changed.
- [handoffs/02-instructional-designer.report.md](handoffs/02-instructional-designer.report.md)

### 2026-10-21T09:37:39-04:00 · orchestrator · stage
Stage: plan → **checkpoint**

### 2026-10-21T09:42:10-04:00 · orchestrator · user_decision
Checkpoint: plan approved; Ch 2 Fennel facts approved; apply curriculum R1,R2,R3,R6-R9 now (d-03..d-05)
- [run/decisions.md](run/decisions.md)

### 2026-10-21T09:42:27-04:00 · orchestrator · curriculum_update
Applied R1,R2,R3,R6,R7,R8,R9 to CURRICULUM.md (m-23, m-24; kernel; Ch 3/6/9/10 pointers; sizing table)
- [../../CURRICULUM.md](../../CURRICULUM.md)

### 2026-10-21T09:42:27-04:00 · orchestrator · stage
Stage: checkpoint → **build**

### 2026-10-21T09:42:27-04:00 · orchestrator · dispatch
Dispatch 03 → **page-builder** (ch2-page), loop gate:page round 1/6. May write: `site` except `site/widgets/*/*`. Usage: 3/18 dispatches, 24/75 agent-min.
- [handoffs/03-page-builder.prompt.md](handoffs/03-page-builder.prompt.md)
- [history/03-page-builder](history/03-page-builder)

### 2026-10-21T09:50:11-04:00 · verify · gate
Gate (page) round 1: **PASS**. Reading ~10.7 min (brief: ~14 min; reported, not gated); 280 KB, 17 requests.
- [gate/page-round-1.json](gate/page-round-1.json)
- [screenshots/page-round-1](screenshots/page-round-1)

### 2026-10-21T09:52:25-04:00 · verify · gate
Gate (page) round 2: **PASS**. Reading ~10.7 min (brief: ~14 min; reported, not gated); 239 KB, 17 requests.
- [gate/page-round-2.json](gate/page-round-2.json)
- [screenshots/page-round-2](screenshots/page-round-2)

### 2026-10-21T09:53:11-04:00 · orchestrator · receive
Received 03 ← **page-builder**: `done_with_concerns`. 28 file(s) changed.
- [handoffs/03-page-builder.report.md](handoffs/03-page-builder.report.md)

### 2026-10-21T09:53:11-04:00 · orchestrator · dispatch
Dispatch 04 → **widget-builder** (w-samecode), loop gate:w-samecode round 1/6. May write: `site/widgets/w-samecode`. Usage: 4/18 dispatches, 34/75 agent-min.
- [handoffs/04-widget-builder.prompt.md](handoffs/04-widget-builder.prompt.md)

### 2026-10-21T10:10:39-04:00 · verify · gate
Gate (w-samecode) round 1: **PASS**. Reading ~11.6 min (brief: ~14 min; reported, not gated); 283 KB, 17 requests.
- [gate/w-samecode-round-1.json](gate/w-samecode-round-1.json)
- [screenshots/w-samecode-round-1](screenshots/w-samecode-round-1)

### 2026-10-21T10:11:01-04:00 · verify · gate
Gate (w-samecode) round 2: **PASS**. Reading ~11.6 min (brief: ~14 min; reported, not gated); 410 KB, 17 requests.
- [gate/w-samecode-round-2.json](gate/w-samecode-round-2.json)
- [screenshots/w-samecode-round-2](screenshots/w-samecode-round-2)

### 2026-10-21T10:13:05-04:00 · verify · gate
Gate (w-samecode) round 3: **PASS**. Reading ~11.6 min (brief: ~14 min; reported, not gated); 290 KB, 17 requests.
- [gate/w-samecode-round-3.json](gate/w-samecode-round-3.json)
- [screenshots/w-samecode-round-3](screenshots/w-samecode-round-3)

### 2026-10-21T10:13:54-04:00 · verify · gate
Gate (w-samecode) round 4: **PASS**. Reading ~11.6 min (brief: ~14 min; reported, not gated); 297 KB, 17 requests.
- [gate/w-samecode-round-4.json](gate/w-samecode-round-4.json)
- [screenshots/w-samecode-round-4](screenshots/w-samecode-round-4)

### 2026-10-21T10:14:47-04:00 · orchestrator · receive
Received 04 ← **widget-builder**: `done_with_concerns`. 40 file(s) changed.
- [handoffs/04-widget-builder.report.md](handoffs/04-widget-builder.report.md)

### 2026-10-21T10:15:06-04:00 · verify · gate
Gate (page) round 3: **PASS**. Reading ~11.6 min (brief: ~14 min; reported, not gated); 283 KB, 17 requests.
- [gate/page-round-3.json](gate/page-round-3.json)
- [screenshots/page-round-3](screenshots/page-round-3)

### 2026-10-21T10:15:24-04:00 · orchestrator · stage
Stage: build → **review**

### 2026-10-21T10:15:24-04:00 · orchestrator · dispatch
Dispatch 05 → **accuracy-reviewer** (review-accuracy-r1), loop review:accuracy round 1/2. May write: `run/review/round-1`. Usage: 5/18 dispatches, 56/75 agent-min.
- [handoffs/05-accuracy-reviewer.prompt.md](handoffs/05-accuracy-reviewer.prompt.md)

### 2026-10-21T10:15:24-04:00 · orchestrator · dispatch
Dispatch 06 → **pedagogy-ux-reviewer** (review-pux-r1), loop review:pedagogy-ux round 1/2. May write: `run/review/round-1`. Usage: 6/18 dispatches, 56/75 agent-min.
- [handoffs/06-pedagogy-ux-reviewer.prompt.md](handoffs/06-pedagogy-ux-reviewer.prompt.md)

### 2026-10-21T10:20:49-04:00 · orchestrator · receive
Received 05 ← **accuracy-reviewer**: `done`. 90 file(s) changed.
- [handoffs/05-accuracy-reviewer.report.md](handoffs/05-accuracy-reviewer.report.md)

### 2026-10-21T13:37:02-04:00 · orchestrator · receive
Received 06 ← **pedagogy-ux-reviewer**: `done_with_concerns`. 127 file(s) changed.
- [handoffs/06-pedagogy-ux-reviewer.report.md](handoffs/06-pedagogy-ux-reviewer.report.md)

### 2026-10-21T13:37:02-04:00 · orchestrator · concern
Pedagogy reviewer self-reported reading one line (a height figure) of the widget builder report; findings independently measured; accepted

### 2026-10-21T13:37:02-04:00 · orchestrator · findings
Round 1 ingested: 10 finding(s) touched; open: 0 blocking, 6 should, 4 nit.
- [review/round-1/findings.md](review/round-1/findings.md)

### 2026-10-21T13:38:41-04:00 · orchestrator · extend
Caps extended per d-07: +235 agent-min.
- [decisions.md](decisions.md)

### 2026-10-21T13:38:41-04:00 · orchestrator · extend
Caps extended per d-06: .
- [decisions.md](decisions.md)

### 2026-10-21T13:38:41-04:00 · orchestrator · user_decision
Cap extended per d-06 (45 min of work over inflated clock -> cap 310); k-05 option C reword approved (d-07)
- [run/decisions.md](run/decisions.md)

### 2026-10-21T13:38:41-04:00 · orchestrator · dispatch
Dispatch 07 → **page-builder** (r1-fixes-page), loop gate:page round 2/6. May write: `site` except `site/widgets/*/*`. Usage: 7/18 dispatches, 258/310 agent-min.
- [handoffs/07-page-builder.prompt.md](handoffs/07-page-builder.prompt.md)
- [history/07-page-builder](history/07-page-builder)

### 2026-10-21T13:38:41-04:00 · orchestrator · dispatch
Dispatch 08 → **widget-builder** (r1-fixes-widget), loop gate:w-samecode round 2/6. May write: `site/widgets/w-samecode`. Usage: 8/18 dispatches, 258/310 agent-min.
- [handoffs/08-widget-builder.prompt.md](handoffs/08-widget-builder.prompt.md)
- [history/08-widget-builder](history/08-widget-builder)

### 2026-10-21T13:39:13-04:00 · orchestrator · correction
The +235 min cap extension was recorded against d-07 by mistake; its authority is d-06 (the +0 entry against d-06 is a marker)

### 2026-10-21T13:40:22-04:00 · verify · gate
Gate (page) round 4: **PASS**. Reading ~11.9 min (brief: ~14 min; reported, not gated); 239 KB, 17 requests.
- [gate/page-round-4.json](gate/page-round-4.json)
- [screenshots/page-round-4](screenshots/page-round-4)

### 2026-10-21T13:40:50-04:00 · orchestrator · receive
Received 07 ← **page-builder**: `done`. 14 file(s) changed.
- [handoffs/07-page-builder.report.md](handoffs/07-page-builder.report.md)

### 2026-10-21T13:44:31-04:00 · verify · gate
Gate (w-samecode) round 5: **PASS**. Reading ~11.9 min (brief: ~14 min; reported, not gated); 321 KB, 17 requests.
- [gate/w-samecode-round-5.json](gate/w-samecode-round-5.json)
- [screenshots/w-samecode-round-5](screenshots/w-samecode-round-5)

### 2026-10-21T13:45:32-04:00 · orchestrator · receive
Received 08 ← **widget-builder**: `done_with_concerns`. 28 file(s) changed.
- [handoffs/08-widget-builder.report.md](handoffs/08-widget-builder.report.md)

### 2026-10-21T13:45:51-04:00 · verify · gate
Gate (page) round 5: **PASS**. Reading ~11.9 min (brief: ~14 min; reported, not gated); 380 KB, 17 requests.
- [gate/page-round-5.json](gate/page-round-5.json)
- [screenshots/page-round-5](screenshots/page-round-5)

### 2026-10-21T13:46:04-04:00 · orchestrator · dispatch
Dispatch 09 → **accuracy-reviewer** (review-accuracy-r2), loop review:accuracy round 2/2. May write: `run/review/round-2`. Usage: 9/18 dispatches, 265/310 agent-min.
- [handoffs/09-accuracy-reviewer.prompt.md](handoffs/09-accuracy-reviewer.prompt.md)

### 2026-10-21T13:46:04-04:00 · orchestrator · dispatch
Dispatch 10 → **pedagogy-ux-reviewer** (review-pux-r2), loop review:pedagogy-ux round 2/2. May write: `run/review/round-2`. Usage: 10/18 dispatches, 265/310 agent-min.
- [handoffs/10-pedagogy-ux-reviewer.prompt.md](handoffs/10-pedagogy-ux-reviewer.prompt.md)

### 2026-10-21T13:48:59-04:00 · orchestrator · receive
Received 09 ← **accuracy-reviewer**: `done`. 68 file(s) changed.
- [handoffs/09-accuracy-reviewer.report.md](handoffs/09-accuracy-reviewer.report.md)

### 2026-10-21T13:50:12-04:00 · orchestrator · receive
Received 10 ← **pedagogy-ux-reviewer**: `done_with_concerns`. 70 file(s) changed.
- [handoffs/10-pedagogy-ux-reviewer.report.md](handoffs/10-pedagogy-ux-reviewer.report.md)

### 2026-10-21T13:50:12-04:00 · orchestrator · findings
Round 2 ingested: 10 finding(s) touched; open: 0 blocking, 1 should, 0 nit.
- [review/round-2/findings.md](review/round-2/findings.md)

### 2026-10-21T13:50:12-04:00 · orchestrator · stage
Stage: review → **deliver**

### 2026-10-21T13:56:21-04:00 · orchestrator · user_decision
Delivery: relax phone height rule as course rule + apply to w-samecode (d-08); relabel 16 min (d-09); apply R4/R5 and commit (d-10)
- [run/decisions.md](run/decisions.md)

### 2026-10-21T13:56:21-04:00 · orchestrator · dispatch
Dispatch 11 → **widget-builder** (phone-height-rule), loop gate:w-samecode round 3/6. May write: `site/widgets/w-samecode`. Usage: 11/18 dispatches, 269/310 agent-min.
- [handoffs/11-widget-builder.prompt.md](handoffs/11-widget-builder.prompt.md)
- [history/11-widget-builder](history/11-widget-builder)

### 2026-10-21T13:56:56-04:00 · orchestrator · curriculum_update
Applied R4 (Riley, Ch 2 story facts), R5 (visuals) and the phone height rule (§8 step 5) to CURRICULUM.md (d-08, d-10)
- [CURRICULUM.md](CURRICULUM.md)

### 2026-10-21T13:57:40-04:00 · verify · gate
Gate (w-samecode) round 6: **PASS**. Reading ~11.9 min (brief: ~16 min; reported, not gated); 435 KB, 17 requests.
- [gate/w-samecode-round-6.json](gate/w-samecode-round-6.json)
- [screenshots/w-samecode-round-6](screenshots/w-samecode-round-6)

### 2026-10-21T13:58:10-04:00 · orchestrator · receive
Received 11 ← **widget-builder**: `done`. 10 file(s) changed.
- [handoffs/11-widget-builder.report.md](handoffs/11-widget-builder.report.md)

### 2026-10-21T13:58:10-04:00 · orchestrator · dispatch
Dispatch 12 → **page-builder** (relabel-reserve), loop gate:page round 3/6. May write: `site` except `site/widgets/*/*`. Usage: 12/18 dispatches, 270/310 agent-min.
- [handoffs/12-page-builder.prompt.md](handoffs/12-page-builder.prompt.md)
- [history/12-page-builder](history/12-page-builder)

### 2026-10-21T13:58:50-04:00 · verify · gate
Gate (page) round 6: **PASS**. Reading ~11.9 min (brief: ~16 min; reported, not gated); 277 KB, 17 requests.
- [gate/page-round-6.json](gate/page-round-6.json)
- [screenshots/page-round-6](screenshots/page-round-6)

### 2026-10-21T13:59:10-04:00 · orchestrator · receive
Received 12 ← **page-builder**: `done`. 11 file(s) changed.
- [handoffs/12-page-builder.report.md](handoffs/12-page-builder.report.md)

### 2026-10-21T13:59:29-04:00 · verify · gate
Gate (page) round 7: **PASS**. Reading ~11.9 min (brief: ~16 min; reported, not gated); 387 KB, 17 requests.
- [gate/page-round-7.json](gate/page-round-7.json)
- [screenshots/page-round-7](screenshots/page-round-7)

### 2026-10-21T13:59:29-04:00 · orchestrator · delivered
Ch 2 delivered: ~16 min, 0 open findings after P-02 fixed via course phone-height rule (d-08); no third review
- [site/index.html](site/index.html)

### 2026-10-21T13:59:29-04:00 · orchestrator · stage
Stage: deliver → **done**

### 2026-10-21T21:44:54-04:00 · verify · gate
Gate (page) round 8: **PASS**. Reading ~14.4 min (brief: ~16 min; reported, not gated); 254 KB, 17 requests.
- [gate/page-round-8.json](gate/page-round-8.json)
- [screenshots/page-round-8](screenshots/page-round-8)

### 2026-10-21T21:47:52-04:00 · verify · gate
Gate (page) round 9: **PASS**. Reading ~14.2 min (brief: ~16 min; reported, not gated); 275 KB, 17 requests.
- [gate/page-round-9.json](gate/page-round-9.json)
- [screenshots/page-round-9](screenshots/page-round-9)

### 2026-10-21T22:41:17-04:00 · orchestrator · user_decision
Human review applied (d-11): §02 now scrollytelling (w-samecode-scrolly), §03 rewritten with term cards, §01 cast + jump-ahead, §04/§05 wording; gate round 9 PASS; relabelled 18 min; no fresh review
- [run/review/human-review.md](run/review/human-review.md)
- [run/gate/page-round-9.json](run/gate/page-round-9.json)
- **decision:** d-11

### 2026-10-22T21:21:01-04:00 · verify · gate
Gate (page) round 10: **PASS**. Reading ~14.2 min (brief: ~18 min; reported, not gated); 283 KB, 17 requests.
- [gate/page-round-10.json](gate/page-round-10.json)
- [screenshots/page-round-10](screenshots/page-round-10)

### 2026-10-23T02:29:34-04:00 · verify · gate
Gate (page) round 11: **PASS**. Reading ~14.2 min (brief: ~18 min; reported, not gated); 368 KB, 17 requests.
- [gate/page-round-11.json](gate/page-round-11.json)
- [screenshots/page-round-11](screenshots/page-round-11)

### 2026-10-24T10:32:40-04:00 · verify · gate
Gate (page) round 12: **PASS**. Reading ~14.2 min (brief: ~18 min; reported, not gated); 370 KB, 17 requests.
- [gate/page-round-12.json](gate/page-round-12.json)
- [screenshots/page-round-12](screenshots/page-round-12)

### 2026-10-24T19:22:16-04:00 · verify · gate
Gate (page) round 13: **PASS**. Reading ~14.2 min (brief: ~18 min; reported, not gated); 423 KB, 17 requests.
- [gate/page-round-13.json](gate/page-round-13.json)
- [screenshots/page-round-13](screenshots/page-round-13)

### 2026-10-24T19:31:57-04:00 · verify · gate
Gate (page) round 14: **PASS**. Reading ~14.2 min (brief: ~18 min; reported, not gated); 383 KB, 17 requests.
- [gate/page-round-14.json](gate/page-round-14.json)
- [screenshots/page-round-14](screenshots/page-round-14)
