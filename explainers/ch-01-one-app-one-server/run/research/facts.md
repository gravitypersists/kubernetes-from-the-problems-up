# Facts

Light depth, Ch 1 "One app, one server". Eight sources, chosen so each one carries several of the chapter's load-bearing facts.

## Questions
- q-1: answered — c-01, c-02, c-07
- q-2: answered — c-01, c-02
- q-3: answered — c-03
- q-4: answered — c-04, c-05, c-06, c-08
- q-5: answered — c-09, c-10
- q-6: answered — c-11, c-12
- q-7: answered — c-06, c-07, c-08

Partial coverage, stated plainly:
- q-1: no source ranks which items are "most often forgotten" on a rebuild. The best-supported candidates are config kept outside the repo (c-02 note) and hand-made changes nobody wrote down (c-06, c-07). The ranking itself is model judgement.
- q-2: no source documents managers' beliefs about "the app". The misconception (m-01) is model-sourced. The machine-dependence examples are sourced (c-01, x-01).
- q-3: the mechanism (a full disk stops the database recording new work) and the recovery path are sourced (c-03 and its note). That a two-hour outage is plausible for a one-server startup is model judgement: it's Fennel fiction and needs no sourcing. The "logs and uploads fill the disk" story is model (x-03).
- q-4: "bus factor" is covered as an example (x-04, Wikipedia), not as a claim, to stay within the source cap. Recovery-time framing uses MTTR (c-08) rather than RTO; see the c-08 note.

## Claims

### c-01
objective: o-1
claim: Apps often depend on software installed on the machine, not shipped with the code (libraries, system tools such as image converters), and another machine may lack it or have an incompatible version.
source: https://12factor.net/dependencies
quote: "Twelve-factor apps also do not rely on the implicit existence of any system tools. Examples include shelling out to ImageMagick or curl. While these tools may exist on many or even most systems, there is no guarantee that they will exist on all systems where the app may run in the future, or whether the version found on a future system will be compatible with the app."
confidence: high
note: The Twelve-Factor App is a prescription ("never relies on implicit existence of system-wide packages"). It's cited here because it names the hidden dependencies that hand-built servers actually have. Safe simplification: the language runtime (e.g. Ruby, Python) is the most basic machine-installed dependency; the same page lists "the language runtime" as a prerequisite installed outside the codebase. Don't mention dependency manifests or isolation tools; that edges into Ch 2.

### c-02
objective: o-1
claim: An app's configuration (database addresses, credentials for outside services, the site's hostname) changes from one deployment to another and is meant to live outside the code.
source: https://12factor.net/config
quote: "An app's config is everything that is likely to vary between deploys (staging, production, developer environments, etc). This includes: Resource handles to the database, Memcached, and other backing services; Credentials to external services such as Amazon S3 or Twitter; Per-deploy values such as the canonical hostname for the deploy"
confidence: high
note: In the quote, the source's bullet-list items are joined with semicolons. Bearing on q-1: the same page says config files kept out of version control show "a tendency for config files to be scattered about in different places and different formats, making it hard to see and manage all the config in one place". That's why config is a likely gap when rebuilding from notes. Don't expand into secrets management (Ch 9) or environment variables as a practice.

### c-03
objective: o-2
claim: A full disk usually doesn't corrupt a database, but it can stop the database doing useful work, such as recording new orders.
source: https://www.postgresql.org/docs/18/diskusage.html
quote: "A filled data disk will not result in data corruption, but it might prevent useful activity from occurring. If the disk holding the WAL files grows full, database server panic and consequent shutdown might occur."
confidence: high
note: PostgreSQL stands in for "the database". The "such as recording new orders" gloss is a safe simplification. Recovery path (same page): "If you cannot free up additional space on the disk by deleting other things, you can move some of the database files to other file systems". So recovery is manual: someone has to find what filled the disk and free or move space. The page also advises acting early: "do not wait until the disk is completely full to take action." Old URL /docs/current/disk-full.html now returns 404; the section now lives on this page.

### c-04
objective: o-2
claim: A "snowflake server" is a server made unique by an accumulation of hand-applied patches, upgrades and configuration changes.
source: https://martinfowler.com/bliki/SnowflakeServer.html
quote: "You have to ensure the operating system and any other dependent software is properly patched to keep it up to date. Hosted applications need to be upgraded regularly. Configuration changes are regularly needed to tweak the environment ... This requires some mix of command-line invocations, jumping between GUI screens, and editing text files. The result is a unique snowflake - good for a ski resort, bad for a data center."
confidence: high
note: Origin: Martin Fowler's bliki entry (10 July 2012) popularised the term. It credits The Visible Ops Handbook as "the pioneering book that talked about the dangers of snowflakes". Fowler's footnote mentions the related "cattle, not pets" metaphor (parking lot).

### c-05
objective: o-2
claim: Because a snowflake server is hard to reproduce, if its hardware fails it is difficult to bring up another server that does the same job.
source: https://martinfowler.com/bliki/SnowflakeServer.html
quote: "The first problem with a snowflake server is that it's difficult to reproduce. Should your hardware start having problems, this means that it's difficult to fire up another server to support the same functions."
confidence: high

### c-06
objective: o-2
claim: "Configuration drift" means ad hoc changes to a system's configuration that go unrecorded; drift is how ordinary servers turn into snowflakes.
source: https://martinfowler.com/bliki/PhoenixServer.html
quote: "The primary advantage of using phoenix servers is to avoid configuration drift: ad hoc changes to a systems configuration that go unrecorded. Drift is the name of a street that leads to SnowflakeServers"
confidence: high
note: Bearing on q-7: every unrecorded change is a gap between the runbook and the real server, so notes drift from reality by definition. That's a direct inference from the definition, not a separate sourced claim. Also: Ch 2's Fennel moment ("staging and production have quietly drifted apart") reuses this term, so define it plainly here.

### c-07
objective: o-2
claim: On a long-lived hand-built server, even its maintainers can't tell which settings matter and which are leftovers, so changes have unpredictable side effects.
source: https://martinfowler.com/bliki/SnowflakeServer.html
quote: "Snowflakes soon become hard to understand and modify. Upgrades of one bit software cause unpredictable knock-on effects. You're not sure what parts of the configuration are important, or just the way it came out of the box many years ago."
confidence: high
note: This is the mechanism behind "don't touch it". It also explains why a runbook omits steps (q-7): the writer can't record what they don't know matters. Fowler adds "Their fragility leads to long, stressful bouts of debugging."

### c-08
objective: o-2
claim: Google's SRE team found that writing down response steps in advance (a "playbook") cuts time-to-repair roughly threefold compared with improvising.
source: https://sre.google/sre-book/introduction/
quote: "When humans are necessary, we have found that thinking through and recording the best practices ahead of time in a “playbook” produces roughly a 3x improvement in MTTR as compared to the strategy of “winging it.”"
confidence: medium
note: Medium because it's Google's internal observation, not a controlled study, and it concerns responding to alerts, not rebuilding a server. The same source states the limit: "no playbook, no matter how comprehensive it may be, is a substitute for smart engineers able to think on the fly". So runbooks help but don't remove the need for the knowledgeable person (Sam). Business framing from the same page: "The most relevant metric in evaluating the effectiveness of emergency response is how quickly the response team can bring the system back to health—that is, the MTTR." Plain-language framing for managers: "how long until we're back". RTO (the target for that time) isn't separately sourced; avoid the acronym, or treat it as model-level.

### c-09
objective: o-3
claim: A virtual machine is an isolated computer simulated in software, with its own operating system; one physical machine can run several, and new ones can be created quickly.
source: https://www.redhat.com/en/topics/virtualization/what-is-a-virtual-machine
quote: "A virtual machine (VM) is an isolated computing environment with its own CPU, memory, network interface, and storage" ... "VMs contain their own OS" ... "With the ability to run multiple OSs on a single piece of physical hardware" ... "Spinning up new server instances is a quick process with VMs."
confidence: high
note: The quote is three excerpts from the same page, joined by "...". The "doesn't remove the snowflake problem" part follows from c-04/c-06: a VM still has an OS, libraries and config that someone sets up and changes, by hand unless something else automates it. The source doesn't say this directly. Don't compare with containers (Ch 2).

### c-10
objective: o-3
claim: Saving a disk image of a hand-built server helps you rebuild it, but the image also copies its accumulated junk and mistakes.
source: https://martinfowler.com/bliki/SnowflakeServer.html
quote: "Making disk images of the snowflake can help to some extent with this. But such images easily gather cruft as unnecessary elements of the configuration, not to mention mistakes, perpetuate."
confidence: high
note: Don't overstate this one. Images and VM snapshots do partly help: Fowler says recipes let you rebuild the server "(which you could also do with imaging)". What an image doesn't give you is understanding: "The point of using a recipe is not just that you can easily rebuild the server ... but you can also easily understand its configuration and thus modify it more easily." A snapshot also starts going stale as soon as someone hand-changes the live server (drift, c-06). Recipes/automation are later-chapter territory, so mention them at most as "we'll name this later".

### c-11
objective: o-3
claim: Moving to a bigger server has a hard ceiling: machine sizes are not unlimited, and costs climb steeply at the top end.
source: https://docs.cloud.google.com/architecture/framework/reliability/horizontal-scalability
quote: "The problem is that there are hard limits on how much a database can grow. VM sizes are not unlimited. The database can reach a point when it's no longer possible to add more resources." ... "Besides these scaling limits, vertical scaling tends to be more expensive. The cost can increase exponentially as machines with greater amounts of compute power and memory are acquired."
confidence: medium
note: Medium for the cost half: Google writes "can increase exponentially", which is loose. "Climbs steeply" is the safe wording; don't say "exponentially" as fact. The hard-limit half is high confidence. Keep the point to one sentence. For a Year-0 startup the ceiling is far away, and the stronger o-3 argument is c-12 plus reproducibility.

### c-12
objective: o-3
claim: However large, one server is still a single point of failure: any problem with it can take down the whole service for every user.
source: https://docs.cloud.google.com/architecture/framework/reliability/horizontal-scalability
quote: "Even if resources were unlimited, a large VM can become a single point of failure. Any problem with the primary database VM can cause error responses or cause a system-wide outage that affects all users."
confidence: high
note: Pair this with the reproducibility point: a bigger snowflake is still a snowflake. Rebuilding it is just as hard (c-05), and it was hand-built the same way (c-04).
