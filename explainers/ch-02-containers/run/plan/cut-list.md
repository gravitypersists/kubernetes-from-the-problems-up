# Cut list: "Works on my machine": containers (Ch 2)

## Out (researched or considered, deliberately left out)

| What | Why it's out | Cost to add back |
|---|---|---|
| Tags vs digests: "latest" is only a default label and can be moved to a newer image; a digest pins one exact image (c-08, x-05) | The researcher's most surprising fact, and manager-relevant ("which exact image is in production?"). But it's a whole extra idea (label vs fingerprint), and the 14 minutes are full. Half-mentioning it would confuse more than help. ac-10 stops the page from implying the opposite. | One paragraph plus x-05's analogy in s-04: about 0.75 min. Better in Ch 6, where rollback needs it (recommendation R6). |
| Analogy x-02, "installed app vs open window" for image vs container | f-01 already shows one image running as several containers, and three analogies are enough for 14 minutes. | A two-line aside in s-04: about 0.4 min. |
| Ch 1-style closing think-then-reveal ("what answer should worry you, what would reassure you?") | Time. k-06 and k-07 already rehearse the conversation and its answer. | One think-then-reveal item in s-06: about 0.75 min. |
| A third machine (staging) in w-samecode | The contrasting case needs two cases that differ in one feature. A third column costs width at 360px and adds an element. Staging appears in the s-01 prose and in f-01. | A third status column and its values; 360px layout risk. |
| Full reuse of Ch 1's `w-rebuild` (inventory, rebuild from notes, launch checks, diagnose) | It replays Ch 1's lesson (about 5 min). Only its stage-4 aligned comparison is reused, adapted (see the w-samecode `reuse:` field). | n/a |
| A density slider or "how many fit" counter for containers vs VMs | There's no sourced number (researcher's concern), and an invented one would teach folklore. f-02 shows "room for more" qualitatively. | Only with a sourced figure: a new research claim, then a small widget. |
| A predict check on processor type ("an image built on an ARM laptop won't run on an Intel server", c-09) | It's a real limit, but another idea to chunk. Kept as one clause in A2's breaks note and in k-06 A's feedback. | A check in s-04: about 0.75 min. |
| Image layers: rebuilds and downloads reuse unchanged parts (parking lot) | Engineer-level, and it explains speed, not the model. | One sentence in s-03. Not recommended. |
| Docker vs containers, and the open image standard, OCI (parking lot; m-02) | Ch 3 owns m-02. Ch 2 says only "a name you'll hear; the next chapter places it". | Ch 3. |
| Docker restart policies restart a crashed container on the same machine (parking lot, unverified) | It would blur k-07: restarting on the same machine doesn't help when the machine is gone, and explaining that costs a paragraph. | One sentence in k-07's feedback, after research verifies it. |
| Pinning by digest stops automatic security updates (parking lot) | Depends on tags vs digests, which is cut. | Ch 6, with R6. |
| Supply-chain trust in public images; Docker Hub tiers (parking lot) | Off-objective; security is out of course scope beyond the manager level. | Ch 11 or Ch 13, as a question to ask. |
| Registry vs repository (parking lot) | A distinction managers don't need. | n/a |
| Firecracker microVM boot and memory figures (parking lot) | Not extracted from the paper, so unsourced here. c-12's abstract is enough for "providers wrap containers in lightweight VMs". | A research pass on the PDF. |
| Docker Desktop runs Linux containers inside a Linux VM on Mac and Windows (parking lot) | A true and relevant curiosity ("my Mac runs a VM to run containers"), but a second instance of "layers, not rivals" the page doesn't need. | One sentence in s-05. |
| Dev containers / Compose as the onboarding answer (parking lot) | Tooling detail. s-03 says it in principle: "a new engineer runs the image instead of installing things for a week". | n/a |
| Twelve-Factor's "time gap" and "personnel gap" (parking lot) | Off-objective. c-03's tools gap is the one this chapter fixes. | n/a |
| Old images can be deleted from a registry, so rollback assumes someone kept them (parking lot) | Rollback is Ch 6. | Ch 6 (R6). |
| Container internals: namespaces, cgroups | Out of scope per brief. Kept to the one sentence in s-04 ("walled off by the operating system: its own files, its own view of what's running"). | n/a |
| Dockerfile syntax, how an image is built step by step | Out of scope per brief. | n/a |

Claims: all of c-01 to c-07 and c-09 to c-12 are used. **c-08 is cut** (tags vs digests; see the first row). Examples: x-01 (the w-samecode case), x-03 (A3) and x-04 (A2) are used. x-02 and x-05 are cut (rows above).

## If it runs long

These parts are in the plan now. If the built page runs long, cut them in this order (first = cheapest loss). Items 1–3 together recover about 2 minutes, enough to bring a 16-minute build back to 14, and cost no objective or misconception.

1. **The c-12 paragraph in s-05** (providers wrap multi-customer containers in lightweight VMs). The reader loses *why* clouds run containers inside VMs. The isolation cost stays as one sentence ("one shared kernel, so a flaw in it is shared"), and "containers usually run inside VMs" stays. About 0.4 min.
2. **Analogy A3, houses and apartments (s-05).** The reader loses a memorable image for the shared kernel. f-02 carries the same structure. About 0.4 min.
3. **w-samecode state 3 (build v43, NOT IN THE IMAGE rows).** Fold it into k-03's feedback ("Riley builds a new image, v43, with 7.0; both pass"). The reader loses the visible immutability moment and the widget's view of the m-19 boundary. s-03 still states both in prose, so ac-05 would move to s-03. About 0.6 min, and simpler widget work.
4. **Analogy A2, shipping containers (s-04).** The reader loses the name's origin and the "run anywhere" framing. Its breaks note (processor type, settings, outside services) must survive as one plain sentence in s-04, because it carries local-02 before k-06. About 0.4 min.
5. **Analogy A1, the pre-imaged laptop (s-03).** The reader loses the onboarding hook, the chapter's one management analogy (§2.1). The onboarding sentence stays. Only cut it after 1–4. About 0.4 min.
6. **k-01 as a choice item → think-then-reveal.** It keeps the retrieval but loses the commitment. About 0.25 min.

Not on the list, because cutting them removes an objective, the chapter's pain-in-the-page, or an owned misconception's confrontation: w-samecode states 1–2, k-02 to k-07, f-01, f-02, the s-03 in/out boundary (m-19), and the conversation.
