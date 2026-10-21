# Parking lot

- "Treat servers like cattle, not pets": common metaphor for snowflakes vs. replaceable servers (https://martinfowler.com/bliki/SnowflakeServer.html, footnote 1)
- Phoenix servers: regularly rebuild servers from scratch to kill drift; term coined by Kornelis Sietsma (https://martinfowler.com/bliki/PhoenixServer.html)
- Automated recipes (Puppet, Chef) and version-controlled server config as the snowflake cure: preview at most, later-chapter territory (https://martinfowler.com/bliki/SnowflakeServer.html)
- The Visible Ops Handbook is credited as the first book on the dangers of snowflakes (https://martinfowler.com/bliki/SnowflakeServer.html)
- Re-applying config only fixes drift in areas the tool manages; drift elsewhere survives (https://martinfowler.com/bliki/PhoenixServer.html)
- Netflix's Chaos Monkey randomly kills servers to test resilience: could fit Ch 12/15 (https://martinfowler.com/bliki/PhoenixServer.html)
- PostgreSQL: if the disk holding the write-ahead log fills, the server may panic and shut down; some file systems perform badly when nearly full (https://www.postgresql.org/docs/18/diskusage.html)
- Storing config in environment variables, kept out of the code: relevant to Ch 9 (https://12factor.net/config)
- When automation replaces manual steps, the manual fallback quietly stops working over time (https://sre.google/sre-book/automation-at-google/)
- Google's Well-Architected guidance: re-architect to horizontal scaling, stateless design: Ch 3/8 material (https://docs.cloud.google.com/architecture/framework/reliability/horizontal-scalability)
