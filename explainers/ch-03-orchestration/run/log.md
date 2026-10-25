# Run log: ch-03-orchestration

Human-readable timeline. Each entry links the files it refers to. Every dispatch has a
prompt and report in `handoffs/` and a pre-dispatch snapshot in `history/`.

### 2026-10-21T16:22:07-04:00 · orchestrator · init
Run initialised: depth `light`, budget 15 min. Caps: 18 dispatches, 75 agent-minutes; loops {'research': 2, 'checkpoint': 4, 'gate': 6, 'review': 2}.
- [brief.md](brief.md)
- [decisions.md](decisions.md)

### 2026-10-21T16:23:06-04:00 · orchestrator · decision
Intake: 15 min budget (d-01), default agent cap (d-02); depth light per curriculum
- [run/decisions.md](run/decisions.md)

### 2026-10-21T16:23:06-04:00 · orchestrator · stage
Stage: intake → **research**

### 2026-10-21T16:23:10-04:00 · orchestrator · dispatch
Dispatch 01 → **researcher** (light-research), loop research round 1/2. May write: `run/research`. Usage: 1/18 dispatches, 0/75 agent-min.
- [handoffs/01-researcher.prompt.md](handoffs/01-researcher.prompt.md)
- [history/01-researcher](history/01-researcher)

### 2026-10-21T16:30:35-04:00 · orchestrator · receive
Received 01 ← **researcher**: `done_with_concerns`. 9 file(s) changed.
- [handoffs/01-researcher.report.md](handoffs/01-researcher.report.md)

### 2026-10-21T16:30:38-04:00 · orchestrator · stage
Stage: research → **plan**

### 2026-10-21T16:30:38-04:00 · orchestrator · dispatch
Dispatch 02 → **instructional-designer** (plan-and-mockup), loop checkpoint round 1/4. May write: `run/plan`. Usage: 2/18 dispatches, 7/75 agent-min.
- [handoffs/02-instructional-designer.prompt.md](handoffs/02-instructional-designer.prompt.md)
- [history/02-instructional-designer](history/02-instructional-designer)

### 2026-10-21T16:54:01-04:00 · orchestrator · receive
Received 02 ← **instructional-designer**: `done_with_concerns`. 8 file(s) changed.
- [handoffs/02-instructional-designer.report.md](handoffs/02-instructional-designer.report.md)

### 2026-10-21T16:54:01-04:00 · orchestrator · stage
Stage: plan → **checkpoint**

### 2026-10-21T17:39:24-04:00 · orchestrator · decision
Checkpoint 1: revise (d-03, reconsider w-fleet vs scrollytelling per Ch 2 human review); story facts approved (d-04); curriculum 'now' set approved, applied after revision (d-05)
- [run/decisions.md](run/decisions.md)

### 2026-10-21T17:39:24-04:00 · orchestrator · dispatch
Dispatch 03 → **instructional-designer** (revise-scrolly), loop checkpoint round 2/4. May write: `run/plan`. Usage: 3/18 dispatches, 31/75 agent-min.
- [handoffs/03-instructional-designer.prompt.md](handoffs/03-instructional-designer.prompt.md)
- [history/03-instructional-designer](history/03-instructional-designer)

### 2026-10-21T17:51:57-04:00 · orchestrator · receive
Received 03 ← **instructional-designer**: `done_with_concerns`. 8 file(s) changed.
- [handoffs/03-instructional-designer.report.md](handoffs/03-instructional-designer.report.md)

### 2026-10-21T17:57:04-04:00 · orchestrator · decision
Checkpoint 2: plan approved (d-06); decide-not-do accepted (d-07); R13–R15 conventions approved (d-08)
- [run/decisions.md](run/decisions.md)

### 2026-10-21T17:57:50-04:00 · orchestrator · curriculum
Applied CURRICULUM 'now' set: R1–R3 (m-25..m-27), R6–R12 (later-chapter notes), R13 (§8 step 6 scrolly), R14 (term card), R15 (§2.11 jump-ahead); Ch 3 entry updated per d-07; R4, R5 after ship

### 2026-10-21T17:57:50-04:00 · orchestrator · stage
Stage: checkpoint → **build**

### 2026-10-21T17:57:50-04:00 · orchestrator · dispatch
Dispatch 04 → **page-builder** (page-build), loop gate:page round 1/6. May write: `site` except `site/widgets/*/*`. Usage: 4/18 dispatches, 43/75 agent-min.
- [handoffs/04-page-builder.prompt.md](handoffs/04-page-builder.prompt.md)
- [history/04-page-builder](history/04-page-builder)

### 2026-10-21T18:11:29-04:00 · verify · gate
Gate (page) round 1: **PASS**. Reading ~11.4 min (brief: ~15 min; reported, not gated); 273 KB, 16 requests.
- [gate/page-round-1.json](gate/page-round-1.json)
- [screenshots/page-round-1](screenshots/page-round-1)

### 2026-10-21T18:12:33-04:00 · verify · gate
Gate (page) round 2: **PASS**. Reading ~11.4 min (brief: ~15 min; reported, not gated); 245 KB, 16 requests.
- [gate/page-round-2.json](gate/page-round-2.json)
- [screenshots/page-round-2](screenshots/page-round-2)

### 2026-10-21T18:13:36-04:00 · verify · gate
Gate (page) round 3: **PASS**. Reading ~11.4 min (brief: ~15 min; reported, not gated); 246 KB, 16 requests.
- [gate/page-round-3.json](gate/page-round-3.json)
- [screenshots/page-round-3](screenshots/page-round-3)

### 2026-10-21T18:14:26-04:00 · orchestrator · receive
Received 04 ← **page-builder**: `done_with_concerns`. 26 file(s) changed.
- [handoffs/04-page-builder.report.md](handoffs/04-page-builder.report.md)

### 2026-10-21T18:14:37-04:00 · orchestrator · routing
Page build concerns accepted without user delta (no change to objectives/segments/shape/assets): later-step locking, noscript line for §02 (ac-07 relaxed), f-02 static (ac-08 relaxed), wording precision edits. Listed for final report.

### 2026-10-21T18:14:37-04:00 · orchestrator · dispatch
Dispatch 05 → **widget-builder** (fleet-scrolly), loop gate:w-fleet-scrolly round 1/6. May write: `site/widgets/w-fleet-scrolly`. Usage: 5/18 dispatches, 60/75 agent-min.
- [handoffs/05-widget-builder.prompt.md](handoffs/05-widget-builder.prompt.md)

### 2026-10-21T18:28:52-04:00 · verify · gate
Gate (w-fleet-scrolly) round 1: **PASS**. Reading ~13.1 min (brief: ~15 min; reported, not gated); 284 KB, 16 requests.
- [gate/w-fleet-scrolly-round-1.json](gate/w-fleet-scrolly-round-1.json)
- [screenshots/w-fleet-scrolly-round-1](screenshots/w-fleet-scrolly-round-1)

### 2026-10-21T18:37:15-04:00 · verify · gate
Gate (w-fleet-scrolly) round 2: **PASS**. Reading ~13.1 min (brief: ~15 min; reported, not gated); 256 KB, 16 requests.
- [gate/w-fleet-scrolly-round-2.json](gate/w-fleet-scrolly-round-2.json)
- [screenshots/w-fleet-scrolly-round-2](screenshots/w-fleet-scrolly-round-2)

### 2026-10-21T18:38:05-04:00 · verify · gate
Gate (w-fleet-scrolly) round 3: **PASS**. Reading ~13.1 min (brief: ~15 min; reported, not gated); 267 KB, 16 requests.
- [gate/w-fleet-scrolly-round-3.json](gate/w-fleet-scrolly-round-3.json)
- [screenshots/w-fleet-scrolly-round-3](screenshots/w-fleet-scrolly-round-3)

### 2026-10-21T18:38:46-04:00 · orchestrator · receive
Received 05 ← **widget-builder**: `done_with_concerns`. 22 file(s) changed.
- [handoffs/05-widget-builder.report.md](handoffs/05-widget-builder.report.md)

### 2026-10-21T18:39:11-04:00 · verify · gate
Gate (page) round 4: **PASS**. Reading ~13.1 min (brief: ~15 min; reported, not gated); 387 KB, 16 requests.
- [gate/page-round-4.json](gate/page-round-4.json)
- [screenshots/page-round-4](screenshots/page-round-4)

### 2026-10-21T18:39:26-04:00 · orchestrator · stage
Stage: build → **review**

### 2026-10-21T18:39:26-04:00 · round_gate · refused
Dispatch `accuracy-reviewer/accuracy-r1` refused (exit 2): agent-time cap reached (84/75 min). Escalate.

### 2026-10-21T18:39:34-04:00 · orchestrator · escalation
Agent-time cap reached (84/75) before review; asking the user
- [run/escalation.md](run/escalation.md)

### 2026-10-21T18:48:19-04:00 · orchestrator · extend
Caps extended per d-09: +109 agent-min.
- [decisions.md](decisions.md)

### 2026-10-21T18:48:19-04:00 · orchestrator · dispatch
Dispatch 06 → **pedagogy-ux-reviewer** (merged-r1), loop review:pedagogy-ux round 1/2. May write: `run/review/round-1`. Usage: 6/18 dispatches, 84/184 agent-min.
- [handoffs/06-pedagogy-ux-reviewer.prompt.md](handoffs/06-pedagogy-ux-reviewer.prompt.md)

### 2026-10-21T18:48:25-04:00 · orchestrator · extend
Caps extended per d-09: +-75 agent-min.
- [decisions.md](decisions.md)

### 2026-10-21T18:48:53-04:00 · orchestrator · decision
Cap extended per d-09 to 109 agent-min (extend is additive: first call over-applied +109, corrected with -75)
- [run/decisions.md](run/decisions.md)

### 2026-10-21T18:59:13-04:00 · orchestrator · receive
Received 06 ← **pedagogy-ux-reviewer**: `done_with_concerns`. 228 file(s) changed.
- [handoffs/06-pedagogy-ux-reviewer.report.md](handoffs/06-pedagogy-ux-reviewer.report.md)

### 2026-10-21T18:59:13-04:00 · orchestrator · findings
Round 1 ingested: 20 finding(s) touched; open: 1 blocking, 12 should, 7 nit.
- [review/round-1/findings.md](review/round-1/findings.md)

### 2026-10-21T19:49:59-04:00 · orchestrator · decision
Round-1 deltas: check rewording allowed (d-10), ac-02 relaxed for ToC (d-11), four-machine story fact (d-12), cuts at delivery (d-13); P-13/P-14 accepted as recorded deviations
- [run/decisions.md](run/decisions.md)

### 2026-10-21T19:49:59-04:00 · orchestrator · dispatch
Dispatch 07 → **page-builder** (r1-fixes-page), loop gate:page round 2/6. May write: `site` except `site/widgets/*/*`. Usage: 7/18 dispatches, 95/109 agent-min.
- [handoffs/07-page-builder.prompt.md](handoffs/07-page-builder.prompt.md)
- [history/07-page-builder](history/07-page-builder)

### 2026-10-21T19:49:59-04:00 · orchestrator · dispatch
Dispatch 08 → **widget-builder** (r1-fixes-widget), loop gate:w-fleet-scrolly round 2/6. May write: `site/widgets/w-fleet-scrolly`. Usage: 8/18 dispatches, 95/109 agent-min.
- [handoffs/08-widget-builder.prompt.md](handoffs/08-widget-builder.prompt.md)
- [history/08-widget-builder](history/08-widget-builder)

### 2026-10-21T19:51:40-04:00 · verify · gate
Gate (page) round 5: **PASS**. Reading ~13 min (brief: ~15 min; reported, not gated); 425 KB, 16 requests.
- [gate/page-round-5.json](gate/page-round-5.json)
- [screenshots/page-round-5](screenshots/page-round-5)

### 2026-10-21T19:52:04-04:00 · orchestrator · receive
Received 07 ← **page-builder**: `done`. 13 file(s) changed.
- [handoffs/07-page-builder.report.md](handoffs/07-page-builder.report.md)

### 2026-10-21T19:54:19-04:00 · verify · gate
Gate (w-fleet-scrolly) round 4: **PASS**. Reading ~13.2 min (brief: ~15 min; reported, not gated); 396 KB, 16 requests.
- [gate/w-fleet-scrolly-round-4.json](gate/w-fleet-scrolly-round-4.json)
- [screenshots/w-fleet-scrolly-round-4](screenshots/w-fleet-scrolly-round-4)

### 2026-10-21T19:54:49-04:00 · orchestrator · receive
Received 08 ← **widget-builder**: `done_with_concerns`. 18 file(s) changed.
- [handoffs/08-widget-builder.report.md](handoffs/08-widget-builder.report.md)

### 2026-10-21T19:55:15-04:00 · verify · gate
Gate (page) round 6: **PASS**. Reading ~13.2 min (brief: ~15 min; reported, not gated); 161 KB, 16 requests.
- [gate/page-round-6.json](gate/page-round-6.json)
- [screenshots/page-round-6](screenshots/page-round-6)

### 2026-10-21T19:55:33-04:00 · orchestrator · dispatch
Dispatch 09 → **page-builder** (k02-qualifier), loop gate:page round 3/6. May write: `site` except `site/widgets/*/*`. Usage: 9/18 dispatches, 100/109 agent-min.
- [handoffs/09-page-builder.prompt.md](handoffs/09-page-builder.prompt.md)
- [history/09-page-builder](history/09-page-builder)

### 2026-10-21T19:56:16-04:00 · verify · gate
Gate (page) round 7: **PASS**. Reading ~13.2 min (brief: ~15 min; reported, not gated); 284 KB, 16 requests.
- [gate/page-round-7.json](gate/page-round-7.json)
- [screenshots/page-round-7](screenshots/page-round-7)

### 2026-10-21T19:56:37-04:00 · orchestrator · receive
Received 09 ← **page-builder**: `done`. 9 file(s) changed.
- [handoffs/09-page-builder.report.md](handoffs/09-page-builder.report.md)

### 2026-10-21T19:56:37-04:00 · orchestrator · review
Round-1 dispositions: 17 fixed, P-08 waived (d-11), P-13/P-14 accepted deviations; no closure round (d-09); A-01 traced by orchestrator
- [run/review/round-1/dispositions.md](run/review/round-1/dispositions.md)

### 2026-10-21T19:56:37-04:00 · orchestrator · stage
Stage: review → **deliver**

### 2026-10-21T19:59:05-04:00 · orchestrator · dispatch
Dispatch 10 → **page-builder** (relabel-17), loop gate:page round 4/6. May write: `site` except `site/widgets/*/*`. Usage: 10/18 dispatches, 101/109 agent-min.
- [handoffs/10-page-builder.prompt.md](handoffs/10-page-builder.prompt.md)
- [history/10-page-builder](history/10-page-builder)

### 2026-10-21T19:59:47-04:00 · verify · gate
Gate (page) round 8: **PASS**. Reading ~13.2 min (brief: ~17 min; reported, not gated); 387 KB, 16 requests.
- [gate/page-round-8.json](gate/page-round-8.json)
- [screenshots/page-round-8](screenshots/page-round-8)

### 2026-10-21T19:59:58-04:00 · orchestrator · receive
Received 10 ← **page-builder**: `done`. 9 file(s) changed.
- [handoffs/10-page-builder.report.md](handoffs/10-page-builder.report.md)

### 2026-10-21T20:00:24-04:00 · verify · gate
Gate (page) round 9: **PASS**. Reading ~13.2 min (brief: ~17 min; reported, not gated); 269 KB, 16 requests.
- [gate/page-round-9.json](gate/page-round-9.json)
- [screenshots/page-round-9](screenshots/page-round-9)

### 2026-10-21T20:00:24-04:00 · orchestrator · delivered
Ch 3 delivered: relabelled 17 min (d-14), 17 findings fixed, P-08 waived, P-13/P-14 accepted; CURRICULUM R4/R5 applied (d-15)
- [site/index.html](site/index.html)

### 2026-10-21T20:00:24-04:00 · orchestrator · stage
Stage: deliver → **done**

### 2026-10-21T22:54:49-04:00 · verify · gate
Gate (page) round 10: **PASS**. Reading ~13.6 min (brief: ~17 min; reported, not gated); 277 KB, 16 requests.
- [gate/page-round-10.json](gate/page-round-10.json)
- [screenshots/page-round-10](screenshots/page-round-10)

### 2026-10-21T22:55:15-04:00 · orchestrator · user_decision
Human review applied (d-16): §03 idle-machines paragraph rewritten, §05 Morgan/Google line, §06 opener reframed, f-02 commands styled as commands, build-server note; gate round 10 PASS; no fresh review
- [run/review/human-review.md](run/review/human-review.md)
- [run/gate/page-round-10.json](run/gate/page-round-10.json)

### 2026-10-21T23:02:00-04:00 · verify · gate
Gate (page) round 11: **PASS**. Reading ~14.4 min (brief: ~17 min; reported, not gated); 396 KB, 16 requests.
- [gate/page-round-11.json](gate/page-round-11.json)
- [screenshots/page-round-11](screenshots/page-round-11)

### 2026-10-21T23:02:08-04:00 · orchestrator · user_decision
Human review follow-up (d-16): §06 container vs Docker + OCI 2015 (sourced), §07 new k-09 and Part I → II transition; gate round 11 PASS
- [run/review/human-review.md](run/review/human-review.md)
- [run/gate/page-round-11.json](run/gate/page-round-11.json)

### 2026-10-22T21:21:27-04:00 · verify · gate
Gate (page) round 12: **PASS**. Reading ~14.4 min (brief: ~17 min; reported, not gated); 247 KB, 16 requests.
- [gate/page-round-12.json](gate/page-round-12.json)
- [screenshots/page-round-12](screenshots/page-round-12)

### 2026-10-23T02:30:00-04:00 · verify · gate
Gate (page) round 13: **PASS**. Reading ~14.4 min (brief: ~17 min; reported, not gated); 377 KB, 16 requests.
- [gate/page-round-13.json](gate/page-round-13.json)
- [screenshots/page-round-13](screenshots/page-round-13)

### 2026-10-24T10:33:07-04:00 · verify · gate
Gate (page) round 14: **PASS**. Reading ~14.4 min (brief: ~17 min; reported, not gated); 381 KB, 16 requests.
- [gate/page-round-14.json](gate/page-round-14.json)
- [screenshots/page-round-14](screenshots/page-round-14)

### 2026-10-24T19:22:42-04:00 · verify · gate
Gate (page) round 15: **PASS**. Reading ~14.4 min (brief: ~17 min; reported, not gated); 396 KB, 16 requests.
- [gate/page-round-15.json](gate/page-round-15.json)
- [screenshots/page-round-15](screenshots/page-round-15)

### 2026-10-24T19:32:24-04:00 · verify · gate
Gate (page) round 16: **PASS**. Reading ~14.4 min (brief: ~17 min; reported, not gated); 260 KB, 16 requests.
- [gate/page-round-16.json](gate/page-round-16.json)
- [screenshots/page-round-16](screenshots/page-round-16)
