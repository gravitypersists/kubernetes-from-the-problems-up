status: done

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/review/round-2/accuracy.md: the round-2 closure review. A-01 to A-07 are all `closed`, and there are no new findings.
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/screenshots/probe/a-r2-k02.png: the k-02 answer after the reveal, at 1280px.
- /Users/m/workspace/k8s-course/explainers/ch-01-one-app-one-server/run/screenshots/probe/a-r2-f03.png: figure f-03 with its new one-day timeline, at 1280px.

summary: All seven round-1 accuracy findings are closed. I checked each fix against the current site/index.html and widget data.js, and drove the widget and figure with probe.mjs.
- f-03 (A-01) now runs from Thu 01:00 to 22:00 within one snapshot cycle, so it no longer contradicts "every night".
- k-07 B, its feedback and the f-03 note now say orders taken since the snapshot are lost too (A-02).
- "Dependency" no longer includes the data (A-03).
- The k-02 prompt and answer now match the stage-4 rows (A-04).
- The wording for the VM, "surest way" and "can take the whole site down" now matches the sources (A-05 to A-07).

I also checked the changed k-03 options, the new single-point-of-failure definition, the site reliability engineers wording in k-08 and the trimmed lead-ins. None of them introduced a blocking error.

concerns:
- These two are below blocking severity, so a closure round doesn't allow me to raise them. I note them for the record only.
  - k-06 option A says a 10× disk "postpones this failure by months". If the logs took months to fill the current disk, ten times the disk would more likely buy years. The claim is understated but not false.
  - In f-03 panel 3, the tag "back" on "40 GB of old logs" is slightly odd, because the logs were never removed from the live VM.

relaxed:
- none
