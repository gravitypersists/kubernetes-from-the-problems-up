# Round 1 dispositions (no closure round, per d-09)

| ID | Sev | Owner | Disposition |
|---|---|---|---|
| A-01 | blocking | widget (08) | fixed. Orchestrator traced C3→C4 by hand: round 2 start v13 on 01 (1 free), stop v12 on 01 (3 free); round 3 start v13 on 01 (1 free), stop v12 on 02 (3 free). End state matches data.js C4. |
| A-02 | should | page (07) | fixed |
| A-03 | should | page (07) | fixed |
| A-04 | nit | page (07) | fixed |
| P-01 | should | widget (08) | fixed |
| P-02 | should | page (07, 09) + widget (08) | fixed (A3 text, B4 qualifier, s-01/f-01/s-04, k-02 prompt and feedback) |
| P-03 | should | widget (08) | fixed |
| P-04 | should | page (07) | fixed |
| P-05 | should | page (07) | fixed (d-10) |
| P-06 | should | page (07) | fixed (d-10) |
| P-07 | should | page (07) + widget (08) | fixed |
| P-08 | should | — | waived by user (d-11, ac-02 relaxed for the ToC) |
| P-09 | should | widget (08) | fixed |
| P-10 | should | page (07) | fixed |
| P-11 | nit | page (07) | fixed |
| P-12 | nit | page (07) | fixed |
| P-13 | nit | — | accepted deviation: f-02 is static page CSS, not renderFleet (note for Ch 4 in R5) |
| P-14 | nit | — | accepted deviation: §02 needs JavaScript; noscript line |
| P-15 | nit | widget (08) | fixed |
| P-16 | nit | page (07) | fixed |

Not independently re-verified: the user chose no closure round (d-09). Full gate PASS (page-round-7).
