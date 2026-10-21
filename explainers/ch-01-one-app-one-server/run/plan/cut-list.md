# Cut list: One app, one server (Ch 1)

## Out (researched or considered, deliberately left out)

| What | Why it's out | Cost to add back |
|---|---|---|
| "Cattle, not pets" metaphor (parking lot) | A second metaphor for the same idea as "snowflake", which is the ledger term. Two names for one thing add load. | One sentence in s-04. Better saved for Ch 4, where pods are disposable. |
| Phoenix servers, deliberately rebuilding servers regularly (parking lot) | It's the cure, and the cure belongs to later chapters (Ch 4's disposable pods). Ch 1 is the pain. | A paragraph in s-07, but it would pre-empt Ch 4. |
| Automated server recipes (Puppet, Chef), version-controlled server config (parking lot; c-10 note) | Later-chapter territory. Ch 1 mentions automation only as "by hand unless something automates it (we'll name that later)" in k-07. | A paragraph and a term outside the ledger. Don't add. |
| *The Visible Ops Handbook* as origin of "snowflake" (c-04 note) | Trivia. Fowler's 2012 entry is enough attribution. | One clause in s-04. |
| Re-applied config only fixes drift where the tool manages it (parking lot) | Depends on automation, which is out. | n/a in Ch 1. |
| Netflix Chaos Monkey (parking lot) | Off-objective. Fits Ch 12 or Ch 15. | Move to the Ch 12 or Ch 15 entry. |
| Config in environment variables (parking lot; c-02 note) | Ch 9 owns configuration practice. Ch 1 only needs "config lives on the machine, outside the code". | Ch 9. |
| Manual fallbacks decay once automation takes over (parking lot) | Off-objective for a pre-automation chapter. | Ch 14 (the platform team), possibly. |
| Horizontal scaling and stateless design as the real fix for "bigger server" (parking lot) | Ch 3 and Ch 8 material. Ch 1 stops at "a bigger box is still one box". | Ch 3 and Ch 8. |
| PostgreSQL detail: a full write-ahead-log disk can make the database panic and shut down; nearly-full file systems slow down (parking lot; c-03 quote) | Engineer-level detail. The manager needs "full disk, orders stop" (c-03). | One sentence in s-01. Not recommended. |
| Recovery-time acronyms RTO / MTTR (c-08 note, research concern) | Plain wording ("how long until we're back") fits the reader, and the researcher advised against them. | Engineers will use them, so a later chapter could gloss them in one line (Ch 12 postmortems). |
| A "try a fix" mode in w-rebuild (toggle "bigger machine" / "VM + snapshot" and re-run the rebuild) | Considered for o-3. The two predict checks plus f-03 teach the same distinction in about 1 minute instead of 2–3, and add no new controls to an already four-stage widget. | A fifth widget stage: half a day of widget work and about 2 minutes of reader time. |
| Free-text inventory ("list everything on the server") as literally worded in the chapter entry | No free-text boxes by default (ux-ui §8; readers skip them). Replaced by select-predict (k-02) and diagnosis (k-04). See curriculum recommendation R7. | A think-then-reveal before k-02. Low value. |
| Distractor cards in k-02 (things that *aren't* on the server, e.g. the payment provider's own systems) | They'd teach a boundary (an outside service vs. its key) that's off-objective and add elements. Without distractors, k-02 is easier to game by selecting all, which is accepted for a low-stakes pre-question. | Two cards and their feedback lines. |
| Data recovery and backups during the rebuild | Ch 10 owns backups ("still your problem"). The notes simply include "copy the data over from last night's backup", and it works. | A sixth gap row. It would pull in Ch 10's topic. |
| Operating systems in any depth | Out of scope per brief. The OS appears only as "a fresh operating system" in notes step 1 and "its own operating system" in the VM definition (c-09). | n/a |
| Containers, or any comparison of VMs with containers (c-09 note) | Ch 2. | n/a |

All twelve research claims (c-01 to c-12) are used. Examples x-01 (image tool), x-02 (Fowler's recovery test), x-03 (disk chain), x-04 (bus factor) and x-05 (photocopied desk) are all used.

## If it runs long

These parts are in the plan now. If the built page runs long, cut them in this order (first = cheapest loss).

1. **Fowler's recovery-test aside in s-05 (x-02).** The reader loses a memorable, credible framing of "recovery time is the measure". The question in s-07 still carries it.
2. **k-09 (think-then-reveal: which answer should worry or reassure you).** The reader loses "what good looks like" (a measured, rehearsed recovery time). o-2 is still checked by k-05 and k-08.
3. **Analogy A2, bus factor (s-05).** The reader loses a people-management hook for "who has to be awake". The idea stays in the prose and in k-05's feedback. Two analogies remain, which still satisfies §2.1.
4. **The UNKNOWN holiday-sale row in w-rebuild stage 4, and the "don't touch it" paragraph in s-04.** The reader loses the concrete case for c-07 (even Sam doesn't know which settings matter) and the meeting phrase "don't touch it". Drift and snowflake still stand on the three missing rows. f-03's clutter row would need relabelling.
5. **f-03 (snapshot figure).** The reader loses the visual of a snapshot going stale. k-07's feedback still states it in words, so o-3 is weaker but still covered.
6. **Analogy A3, the photocopied desk (s-06).** Only cut this after f-03 is gone. The reader then has no concrete image for the snapshot's limits.

Not on the list, because cutting them removes an objective or the chapter's pain-in-the-page: w-rebuild stages 1–4, k-01 to k-08, f-01, f-02, s-04's three terms, and analogy A1.
