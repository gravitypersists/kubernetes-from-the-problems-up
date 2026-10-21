# Examples

### x-01
objective: o-1
example: Same code, new server, broken feature. Fennel's photo-upload step shells out to an image-resizing tool (e.g. ImageMagick) that Sam installed on the old server years ago. The code on the new server is identical, but product photos fail to upload because the tool isn't installed, or is a different version.
why: Shows behaviour changing with the machine while the code stays the same: the "code is the app" seed (m-01). The tool example comes straight from the source. The Fennel details are fiction.
source: https://12factor.net/dependencies

### x-02
objective: o-2
example: Fowler's "certification" fantasy: turn up at the data center and attack the production servers "with a baseball bat, a chainsaw, and a water pistol". The team is graded on "how long it would take for the operations team to get all the applications up and running again."
why: The chapter's closing question ("If this box vanished tonight, how long until we're back, and who has to be awake?") in memorable form, from a credible engineer. Recovery time is the measure, not uptime. Where it breaks: it's a joke, and Fowler says to "forego the baseball bats". The real-world version is deliberately rebuilding servers (later chapters).
source: https://martinfowler.com/bliki/PhoenixServer.html

### x-03
objective: o-2
example: How the Friday disk outage plausibly unfolds. Traffic spikes at dinner, so the web server and app write more log lines and customers upload more. Log files that were never set up to rotate have been growing for months. The disk hits 100%, the database can't record new orders (c-03) and checkout starts erroring. Sam has to notice, log in, find what filled the disk, delete or move files, then restart things and check that orders went through.
why: Turns "out of disk" into a concrete chain a manager can follow, and shows why recovery takes hours rather than minutes: diagnosis plus manual clean-up, done by the one person who knows the box. The database behaviour is sourced. The log-growth story and the two-hour timing are illustrative model reasoning and Fennel fiction.
source: model

### x-04
objective: o-2
example: Bus factor. "A measurement of the risk resulting from information and capabilities not being shared among team members" (also "truck factor" or "lottery factor"). Fennel's server has a bus factor of 1: Sam.
why: Gives managers a term they may already know from people management, attached to the infrastructure risk. Answers "who has to be awake?". Where it breaks: here the knowledge lives partly in the machine itself (drift), not only in Sam's head. Even Sam doesn't know everything that's on it (c-07).
source: https://en.wikipedia.org/wiki/Bus_factor

### x-05
objective: o-3
example: Photocopying a cluttered desk. A disk image or VM snapshot is like photocopying Sam's desk: you get a copy fast, coffee stains and wrong notes included, and you still don't know which papers matter.
why: Makes c-10 concrete: images help you rebuild but carry cruft and mistakes, and give no understanding. Where it breaks: a snapshot is an exact, bootable copy, so it does let you recover faster. The weakness is changing and understanding the server, plus the copy going stale as the live desk changes.
source: model
