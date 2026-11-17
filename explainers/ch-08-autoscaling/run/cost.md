# Cost: ch-08-autoscaling

**This run cost 10.8M tokens (run in progress, stage: review).** The biggest share went to fixes (gate) (29%).

## Where it went

    Fixes (gate)         ████████████████████████████████   3.2M   29%
    Review               █████████████████████████░░░░░░░   2.5M   23%
    Plan                 ████████████████████░░░░░░░░░░░░   2.0M   19%
    Orchestrator         █████████████░░░░░░░░░░░░░░░░░░░   1.3M   12%
    Fixes (review)       ███████████░░░░░░░░░░░░░░░░░░░░░   1.1M   10%
    Research             ████████░░░░░░░░░░░░░░░░░░░░░░░░   781k    7%

## The three biggest costs

1. **Reading big files whole: ≈1.1M (10%)**
22 whole reads of files over 20 KB. Most read: run/plan/learning-plan.md (95 KB) 3× by 3 agents; run/brief.md (24 KB) 5× by 5 agents.

2. **Agents continued for more rounds, carrying their earlier work: ≈590k (5%)**
1 continuation, mostly 05 page-builder, started with a median of 233k of context already loaded, and every turn re-read it. 1 of them started after the cache had expired, so that context was written again from scratch first.

3. **Screenshots: ≈292k (3%)**
89 images went into agent contexts (07 pedagogy-ux-reviewer took in 40, 05 page-builder took in 37). Each one stays in context and is re-read on every later turn.

## Most expensive agents

    05 page-builder                     ████████████████████████   2.1M   20%  + 1 continuation
    04 page-builder                     ████████████████████████   2.1M   19%
    02 instructional-designer           ███████████████████████░   2.0M   19%
    07 pedagogy-ux-reviewer             █████████████████████░░░   1.9M   17%
    orchestrator (main session)         ██████████████░░░░░░░░░░   1.3M   12%
    01 researcher                       █████████░░░░░░░░░░░░░░░   781k    7%
    06 accuracy-reviewer                ████████░░░░░░░░░░░░░░░░   664k    6%

---

<details>
<summary>Every dispatch and round (9 rows)</summary>

| who | round | stage | turns | context first → peak | started cold | cost | images |
|---|---|---|---:|---|:-:|---:|---:|
| orchestrator (main session) | orchestrator | Orchestrator | 29 | 108k → 191k |  | 807k |  |
| 01 researcher | spawn | Research | 35 | 35k → 163k |  | 781k |  |
| 02 instructional-designer | spawn | Plan | 26 | 36k → 361k |  | 2.0M |  |
| 04 page-builder | spawn | Fixes (gate) | 36 | 36k → 406k |  | 2.1M | 12 |
| orchestrator (main session) | orchestrator | Orchestrator | 21 | 56k → 123k |  | 450k |  |
| 05 page-builder | spawn | Fixes (gate) | 36 | 33k → 230k |  | 1.1M | 25 |
| 06 accuracy-reviewer | spawn | Review | 21 | 33k → 181k |  | 664k |  |
| 07 pedagogy-ux-reviewer | spawn | Review | 64 | 33k → 274k |  | 1.9M | 40 |
| 08 page-builder | continue | Fixes (review) | 18 | 233k → 311k | yes | 1.1M | 12 |

</details>

<details>
<summary>How cost is counted</summary>

Cost is in input-equivalent tokens: each kind of token is weighted by its price relative to normal input, so cache reads count 0.1, cache writes 1.25 (2 for 1-hour writes) and output 5. That keeps runs comparable when prices or models change. Raw counts are in `cost.json`, and per-turn data is in `usage/`.

The biggest costs are estimates (≈) and overlap, so they don't add up to the total:

- **Carried earlier work:** for each continuation, the context it started with beyond what the agent started with when first spawned, times the turns it was re-read, plus the re-write when the cache had expired. It doesn't count the turns a fresh agent would spend getting its bearings.
- **Screenshots:** each image's estimated tokens (pixels / 750 after the API's downscaling), written once and re-read on every later turn of the same agent.
- **Big files read whole:** files of 20 KB or more read with no line range, at about 4 bytes per token, held the same way.

Orchestrator turns are those between its first and last command touching this run, so a session that did other work in between is counted in full.

</details>
