# pool-02: orchestrator verification (no builder report on file)

The pool-02 builder's report was never saved (the session that dispatched it ended before receiving it). In its place, the orchestrator checked the handoff's done predicate on 2026-10-23 against the files. This is a check of outcomes, not the builder's report.

- **Fixes 1–6:** documented in `explainers/_pool/README.md` § "Narrow-width fallbacks (pool-02)", one numbered item per fix. Pool code last changed 2026-10-22 22:58.
- **Fix 7:** README example and `cluster/test/index.html` carry F2's `'mem cpu'` for node 01 and F3's reason "0/3 nodes are available: 2 Insufficient cpu, 3 Insufficient memory."; the test page has a pool-02 group drawing the fallbacks at a 360px phone's plate width.
- **Ch 4 unchanged:** 55 `pool2-before-*` / `pool2-after-*` probe pairs in `ch-04-desired-state/run/screenshots/probe/`, all byte-identical.
- **Ch 5 fixes visible:** 39 before/after pairs in `ch-05-scheduling/run/screenshots/probe/`. Seen: 390px F5 bars read NODE 01 … NODE 06 (before: clipped); the clipped "1 GB" free labels are gone; at the smallest sandbox requests short chips draw outline and fill only.
- **Re-gated after the last pool change:** ch-01 round 10, ch-02 round 11, ch-03 round 13, ch-05 round 4, ch-04 round 11: all PASS. `npm run sync -- --check`: all in sync. `npm run build`: succeeds.
- **Ch 5 widget folders:** no change needed. Lane F's one-word `breaks` is a deliberate choice (documented in `w-friday-scrolly/data.js`). The sandbox's own glue (Pods under 14px drop their label and get 1px edges, 05 report) now overlaps the pool's 10px rule; harmless, left for review to judge.

Status: complete.
