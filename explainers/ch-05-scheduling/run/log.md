# Run log: ch-05-scheduling

Human-readable timeline. Each entry links the files it refers to. Every dispatch has a
prompt and report in `handoffs/` and a pre-dispatch snapshot in `history/`.

### 2026-10-22T19:28:47-04:00 · orchestrator · init
Run initialised: depth `standard`, budget 20 min. Caps: 25 dispatches, 105 agent-minutes; loops {'research': 2, 'checkpoint': 4, 'gate': 6, 'review': 2}.
- [brief.md](brief.md)
- [decisions.md](decisions.md)

### 2026-10-22T19:28:59-04:00 · orchestrator · extend
Caps extended per d-02: +15 agent-min.
- [decisions.md](decisions.md)

### 2026-10-22T19:56:43-04:00 · orchestrator · stage
Stage: intake → **research**

### 2026-10-22T19:56:43-04:00 · orchestrator · dispatch
Dispatch 01 → **researcher** (standard-research), loop research round 1/2. May write: `run/research`. Usage: 1/25 dispatches, 0/120 agent-min.
- [handoffs/01-researcher.prompt.md](handoffs/01-researcher.prompt.md)
- [history/01-researcher](history/01-researcher)

### 2026-10-22T20:10:19-04:00 · orchestrator · receive
Received 01 ← **researcher**: `done_with_concerns`. 9 file(s) changed.
- [handoffs/01-researcher.report.md](handoffs/01-researcher.report.md)

### 2026-10-22T20:10:32-04:00 · orchestrator · stage
Stage: research → **plan**

### 2026-10-22T20:10:32-04:00 · orchestrator · dispatch
Dispatch 02 → **instructional-designer** (plan-and-mockup), loop checkpoint round 1/4. May write: `run/plan`. Usage: 2/25 dispatches, 14/120 agent-min.
- [handoffs/02-instructional-designer.prompt.md](handoffs/02-instructional-designer.prompt.md)
- [history/02-instructional-designer](history/02-instructional-designer)

### 2026-10-22T20:47:36-04:00 · orchestrator · receive
Received 02 ← **instructional-designer**: `done_with_concerns`. 8 file(s) changed.
- [handoffs/02-instructional-designer.report.md](handoffs/02-instructional-designer.report.md)

### 2026-10-22T20:47:36-04:00 · orchestrator · stage
Stage: plan → **checkpoint**

### 2026-10-22T20:50:36-04:00 · orchestrator · user-decision
Checkpoint: plan approved with story facts (d-03); fix Ch 4's moving day (d-04); one chapter, no cuts, ~26 min, cuts considered at human review (d-05); promote renderCluster to the pool (d-06)
- [run/decisions.md](run/decisions.md)

### 2026-10-22T20:53:29-04:00 · orchestrator · routing
Before build: Ch 4 moving day fixed directly (d-04; Ch 4 d-14, gate round 9 PASS); pool promotion of renderCluster dispatched as a course-level step outside the run (d-06)
- [run/handoffs/pool-01.prompt.md](run/handoffs/pool-01.prompt.md)

### 2026-10-22T21:27:18-04:00 · orchestrator · stage
Stage: checkpoint → **build**

### 2026-10-22T21:27:18-04:00 · orchestrator · dispatch
Dispatch 03 → **page-builder** (page-build), loop gate:page round 1/6. May write: `site` except `site/widgets/*/*`. Usage: 3/25 dispatches, 51/120 agent-min.
- [handoffs/03-page-builder.prompt.md](handoffs/03-page-builder.prompt.md)
- [history/03-page-builder](history/03-page-builder)

### 2026-10-22T21:46:05-04:00 · verify · gate
Gate (page) round 1: **PASS**. Reading ~24.3 min (brief: ~26 min; reported, not gated); 253 KB, 23 requests.
- [gate/page-round-1.json](gate/page-round-1.json)
- [screenshots/page-round-1](screenshots/page-round-1)

### 2026-10-22T21:47:56-04:00 · verify · gate
Gate (page) round 2: **PASS**. Reading ~24.3 min (brief: ~26 min; reported, not gated); 236 KB, 23 requests.
- [gate/page-round-2.json](gate/page-round-2.json)
- [screenshots/page-round-2](screenshots/page-round-2)

### 2026-10-22T21:48:35-04:00 · orchestrator · receive
Received 03 ← **page-builder**: `done_with_concerns`. 46 file(s) changed.
- [handoffs/03-page-builder.report.md](handoffs/03-page-builder.report.md)

### 2026-10-22T21:49:03-04:00 · orchestrator · dispatch
Dispatch 04 → **widget-builder** (friday-scrolly), loop gate:w-friday-scrolly round 1/6. May write: `site/widgets/w-friday-scrolly`. Usage: 4/25 dispatches, 72/120 agent-min.
- [handoffs/04-widget-builder.prompt.md](handoffs/04-widget-builder.prompt.md)

### 2026-10-22T21:49:03-04:00 · orchestrator · dispatch
Dispatch 05 → **widget-builder** (sizing-sandbox), loop gate:w-sizing-sandbox round 1/6. May write: `site/widgets/w-sizing-sandbox`. Usage: 5/25 dispatches, 72/120 agent-min.
- [handoffs/05-widget-builder.prompt.md](handoffs/05-widget-builder.prompt.md)

### 2026-10-22T22:00:12-04:00 · verify · gate
Gate (w-friday-scrolly) round 1: **PASS**. Reading ~26.6 min (brief: ~26 min; reported, not gated); 382 KB, 23 requests.
- [gate/w-friday-scrolly-round-1.json](gate/w-friday-scrolly-round-1.json)
- [screenshots/w-friday-scrolly-round-1](screenshots/w-friday-scrolly-round-1)

### 2026-10-22T22:02:25-04:00 · orchestrator · receive
Received 04 ← **widget-builder**: `done_with_concerns`. 25 file(s) changed.
- [handoffs/04-widget-builder.report.md](handoffs/04-widget-builder.report.md)

### 2026-10-22T22:08:33-04:00 · verify · gate
Gate (w-sizing-sandbox) round 1: **PASS**. Reading ~26.6 min (brief: ~26 min; reported, not gated); 398 KB, 23 requests.
- [gate/w-sizing-sandbox-round-1.json](gate/w-sizing-sandbox-round-1.json)
- [screenshots/w-sizing-sandbox-round-1](screenshots/w-sizing-sandbox-round-1)

### 2026-10-22T22:11:50-04:00 · verify · gate
Gate (w-sizing-sandbox) round 2: **PASS**. Reading ~26.6 min (brief: ~26 min; reported, not gated); 360 KB, 23 requests.
- [gate/w-sizing-sandbox-round-2.json](gate/w-sizing-sandbox-round-2.json)
- [screenshots/w-sizing-sandbox-round-2](screenshots/w-sizing-sandbox-round-2)

### 2026-10-22T22:12:38-04:00 · orchestrator · receive
Received 05 ← **widget-builder**: `done_with_concerns`. 50 file(s) changed.
- [handoffs/05-widget-builder.report.md](handoffs/05-widget-builder.report.md)

### 2026-10-22T22:13:19-04:00 · verify · gate
Gate (page) round 3: **PASS**. Reading ~26.6 min (brief: ~26 min; reported, not gated); 395 KB, 23 requests.
- [gate/page-round-3.json](gate/page-round-3.json)
- [screenshots/page-round-3](screenshots/page-round-3)

### 2026-10-22T22:14:59-04:00 · orchestrator · user-decision
Sandbox exempt from the phone scroll-to-header rule (d-07); full gate round 3 PASS; pool-02 legibility fixes dispatched (course-level) before review
- [run/decisions.md](run/decisions.md)

### 2026-10-23T02:47:26-04:00 · verify · gate
Gate (page) round 4: **PASS**. Reading ~26.6 min (brief: ~26 min; reported, not gated); 257 KB, 23 requests.
- [gate/page-round-4.json](gate/page-round-4.json)
- [screenshots/page-round-4](screenshots/page-round-4)

### 2026-10-23T07:39:01-04:00 · orchestrator · routing
pool-02 (course-level) verified complete by orchestrator; builder report never saved: fixes 1–7 in pool README/test page, Ch 4 probe pairs byte-identical (55/55), all chapters re-gated PASS after last pool change, sync in sync, build OK
- [run/handoffs/pool-02.verification.md](run/handoffs/pool-02.verification.md)

### 2026-10-23T07:39:26-04:00 · orchestrator · stage
Stage: build → **review**

### 2026-10-23T07:39:26-04:00 · orchestrator · dispatch
Dispatch 06 → **accuracy-reviewer** (accuracy-r1), loop review:accuracy round 1/2. May write: `run/review/round-1`, `run/screenshots/probe`. Usage: 6/25 dispatches, 96/120 agent-min.
- [handoffs/06-accuracy-reviewer.prompt.md](handoffs/06-accuracy-reviewer.prompt.md)
- [history/06-accuracy-reviewer](history/06-accuracy-reviewer)

### 2026-10-23T07:39:27-04:00 · orchestrator · dispatch
Dispatch 07 → **pedagogy-ux-reviewer** (pedagogy-ux-r1), loop review:pedagogy-ux round 1/2. May write: `run/review/round-1`, `run/screenshots/probe`. Usage: 7/25 dispatches, 96/120 agent-min.
- [handoffs/07-pedagogy-ux-reviewer.prompt.md](handoffs/07-pedagogy-ux-reviewer.prompt.md)
- [history/07-pedagogy-ux-reviewer](history/07-pedagogy-ux-reviewer)

### 2026-10-23T07:41:00-04:00 · orchestrator · extend
Caps extended per d-08: loop review=1.
- [decisions.md](decisions.md)

### 2026-10-23T07:49:12-04:00 · orchestrator · receive
Received 06 ← **accuracy-reviewer**: `done`. 173 file(s) changed.
- [handoffs/06-accuracy-reviewer.report.md](handoffs/06-accuracy-reviewer.report.md)

### 2026-10-23T07:56:53-04:00 · orchestrator · receive
Received 07 ← **pedagogy-ux-reviewer**: `done_with_concerns`. 200 file(s) changed.
- [handoffs/07-pedagogy-ux-reviewer.report.md](handoffs/07-pedagogy-ux-reviewer.report.md)

### 2026-10-23T07:56:53-04:00 · orchestrator · findings
Round 1 ingested: 28 finding(s) touched; open: 1 blocking, 9 should, 18 nit.
- [review/round-1/findings.md](review/round-1/findings.md)

### 2026-10-23T07:57:20-04:00 · orchestrator · dispatch
Dispatch 08 → **page-builder** (r1-fixes-page), loop gate:page round 2/6. May write: `site` except `site/widgets/*/*`. Usage: 8/25 dispatches, 113/120 agent-min.
- [handoffs/08-page-builder.prompt.md](handoffs/08-page-builder.prompt.md)
- [history/08-page-builder](history/08-page-builder)

### 2026-10-23T07:57:24-04:00 · orchestrator · dispatch
Dispatch 09 → **widget-builder** (r1-fixes-friday), loop gate:w-friday-scrolly round 2/6. May write: `site/widgets/w-friday-scrolly`. Usage: 9/25 dispatches, 113/120 agent-min.
- [handoffs/09-widget-builder.prompt.md](handoffs/09-widget-builder.prompt.md)
- [history/09-widget-builder](history/09-widget-builder)

### 2026-10-23T07:57:24-04:00 · orchestrator · dispatch
Dispatch 10 → **widget-builder** (r1-fixes-sandbox), loop gate:w-sizing-sandbox round 2/6. May write: `site/widgets/w-sizing-sandbox`. Usage: 10/25 dispatches, 113/120 agent-min.
- [handoffs/10-widget-builder.prompt.md](handoffs/10-widget-builder.prompt.md)
- [history/10-widget-builder](history/10-widget-builder)

### 2026-10-23T08:01:25-04:00 · verify · gate
Gate (page) round 5: **PASS**. Reading ~26.6 min (brief: ~26 min; reported, not gated); 385 KB, 23 requests.
- [gate/page-round-5.json](gate/page-round-5.json)
- [screenshots/page-round-5](screenshots/page-round-5)

### 2026-10-23T08:03:08-04:00 · verify · gate
Gate (w-friday-scrolly) round 2: **PASS**. Reading ~26.6 min (brief: ~26 min; reported, not gated); 276 KB, 23 requests.
- [gate/w-friday-scrolly-round-2.json](gate/w-friday-scrolly-round-2.json)
- [screenshots/w-friday-scrolly-round-2](screenshots/w-friday-scrolly-round-2)

### 2026-10-23T08:03:58-04:00 · verify · gate
Gate (page) round 6: **PASS**. Reading ~26.7 min (brief: ~26 min; reported, not gated); 402 KB, 23 requests.
- [gate/page-round-6.json](gate/page-round-6.json)
- [screenshots/page-round-6](screenshots/page-round-6)

### 2026-10-23T08:04:37-04:00 · orchestrator · receive
Received 09 ← **widget-builder**: `done_with_concerns`. 34 file(s) changed.
- [handoffs/09-widget-builder.report.md](handoffs/09-widget-builder.report.md)

### 2026-10-23T08:06:31-04:00 · verify · gate
Gate (page) round 7: **PASS**. Reading ~26.7 min (brief: ~26 min; reported, not gated); 387 KB, 23 requests.
- [gate/page-round-7.json](gate/page-round-7.json)
- [screenshots/page-round-7](screenshots/page-round-7)

### 2026-10-23T08:07:41-04:00 · orchestrator · receive
Received 08 ← **page-builder**: `done_with_concerns`. 49 file(s) changed.
- [handoffs/08-page-builder.report.md](handoffs/08-page-builder.report.md)

### 2026-10-23T08:07:44-04:00 · verify · gate
Gate (page) round 8: **PASS**. Reading ~26.7 min (brief: ~26 min; reported, not gated); 384 KB, 23 requests.
- [gate/page-round-8.json](gate/page-round-8.json)
- [screenshots/page-round-8](screenshots/page-round-8)

### 2026-10-23T08:08:27-04:00 · verify · gate
Gate (w-sizing-sandbox) round 3: **PASS**. Reading ~26.7 min (brief: ~26 min; reported, not gated); 397 KB, 23 requests.
- [gate/w-sizing-sandbox-round-3.json](gate/w-sizing-sandbox-round-3.json)
- [screenshots/w-sizing-sandbox-round-3](screenshots/w-sizing-sandbox-round-3)

### 2026-10-23T08:10:45-04:00 · verify · gate
Gate (page) round 9: **PASS**. Reading ~26.7 min (brief: ~26 min; reported, not gated); 154 KB, 23 requests.
- [gate/page-round-9.json](gate/page-round-9.json)
- [screenshots/page-round-9](screenshots/page-round-9)

### 2026-10-23T08:11:28-04:00 · orchestrator · receive
Received 10 ← **widget-builder**: `done_with_concerns`. 60 file(s) changed.
- [handoffs/10-widget-builder.report.md](handoffs/10-widget-builder.report.md)

### 2026-10-23T08:12:10-04:00 · verify · gate
Gate (page) round 10: **PASS**. Reading ~26.7 min (brief: ~26 min; reported, not gated); 391 KB, 23 requests.
- [gate/page-round-10.json](gate/page-round-10.json)
- [screenshots/page-round-10](screenshots/page-round-10)

### 2026-10-23T08:12:22-04:00 · orchestrator · revision
Round-1 fixes (single round, d-08): P-01 blocking fixed (no key is the longest option); all 9 should fixed (A-01/P-03 k-09 pointer, A-02/P-07, P-02, P-04, P-05, P-06, P-08); nits fixed except P-11, P-13 (pool, course-level) and P-19 (reading time, to human review). Full gate round 10 PASS; text-only ~26.7 min, 391 KB. No closure review per d-08; dispositions in handoffs 08–10 reports.
- [run/review/round-1/findings.md](run/review/round-1/findings.md)
- [run/gate/page-round-10.json](run/gate/page-round-10.json)

### 2026-10-23T08:12:22-04:00 · orchestrator · stage
Stage: review → **deliver**

### 2026-10-23T08:12:31-04:00 · orchestrator · delivered
Ch 5 delivered for human review: gate round 10 PASS, ~26.7 min text-only (reviewer est. ~30), cut order offered (cut-list.md items 1–7, ~−5 min); open: P-11, P-13 (pool), P-19; uncommitted
- [site/index.html](site/index.html)

### 2026-10-24T09:08:01-04:00 · orchestrator · curriculum-updated
After-ship updates applied to CURRICULUM.md (§8 step 8): Ch 5 story facts in §3, Visuals column, m-29–m-31 in §6, CH05_LOOPS pointer in §2.3, d-07 exception in §8 step 6, picked-up items for Ch 6, 8, 10, 11, 12, 14, pool follow-ups (P-11, P-13, TRY AGAIN) in §9. User asked to commit without choosing cuts: the chapter ships as built (d-05).
- [CURRICULUM.md](CURRICULUM.md)

### 2026-10-24T09:08:01-04:00 · orchestrator · stage
Stage: deliver → **done**

### 2026-10-24T10:34:16-04:00 · verify · gate
Gate (page) round 11: **PASS**. Reading ~26.7 min (brief: ~26 min; reported, not gated); 401 KB, 23 requests.
- [gate/page-round-11.json](gate/page-round-11.json)
- [screenshots/page-round-11](screenshots/page-round-11)

### 2026-10-24T19:23:52-04:00 · verify · gate
Gate (page) round 12: **PASS**. Reading ~26.7 min (brief: ~26 min; reported, not gated); 281 KB, 23 requests.
- [gate/page-round-12.json](gate/page-round-12.json)
- [screenshots/page-round-12](screenshots/page-round-12)

### 2026-10-24T19:33:34-04:00 · verify · gate
Gate (page) round 13: **PASS**. Reading ~26.7 min (brief: ~26 min; reported, not gated); 389 KB, 23 requests.
- [gate/page-round-13.json](gate/page-round-13.json)
- [screenshots/page-round-13](screenshots/page-round-13)
