# Findings: round 1

_Ingested 2026-10-21T13:37:02-04:00 from accuracy.md, pedagogy-ux.md._

### A-01 · should · open
criterion: o-2
location: s-03 ¶ "Once an image is built…"; s-04 Fig. 01 registry (assets/page.js CH02_REGISTRY label "image: the package, never changes", note "every version kept as it was")
verdict: misleading-simplification
evidence: The prose says "you build a new image with a new version label … so the image that passed the tests is exactly the image that ships". Fig. 01 puts the annotation "image: the package, never changes" on the chip "fennel-app:v43", and the registry note says "every version kept as it was". The image itself is immutable (c-04, verified on Docker's "What is an image?": "Images are immutable. Once an image is created, it can't be modified."). The *label* isn't. c-08 (docker image pull reference) says pulling a tag again gets "the most up-to-date version", and only a digest "guarantee[s] that the image you're using is always the same". AWS ECR's docs (docs.aws.amazon.com/AmazonECR/latest/userguide/image-tag-mutability.html) describe tag immutability as a setting you must turn on: with "Mutable", tags can be overwritten by pushing a different image with the same tag. Registries can also delete old images under retention policies, so "every version kept" is a policy, not a property. A manager will come away believing "v43" always names the same bits, so "which exact image is in production?" looks like it is always answered by the version name. c-08's note flags this as the manager-level takeaway.
expected_fix: Add one sentence after the immutability paragraph, for example: "One caution: the version label is a name attached to the image, and someone can move a name to a different image. Teams that need certainty use labels they never reuse, or the image's unique fingerprint (engineers say digest)." In Fig. 01, change the note to "each version stays as it was" and keep the annotation on the image, not on the label (e.g. "image: the package; never changes once built").

### A-02 · should · open
criterion: o-1
location: widget w-samecode, state 2 "One image" (data.js states[1].lead, tags.laptop "caught before release"; production result shown as FAIL)
verdict: misleading-simplification
evidence: Probe at 1280px. In state 1 I picked A and pressed Next. In state 2 I picked C, and the result row read "FAIL error: unknown option | caught before release" (laptop) and "FAIL error: unknown option" (production). The lead says "Now Riley's laptop and production both run that same image", and the IN THE IMAGE band for fennel-app:v42 includes "Fennel app code, with Riley's change". If production runs v42 and v42 contains Riley's change, then the change has been released and is failing for customers, and "caught before release" is false. Because an image is immutable and contains the code (c-01, c-04), a v42 with Riley's change can't be the image production was already running before the change. Check 03's own key says "the same way the change would have failed in production". That is a hypothetical, and the widget shows it as something that happened.
expected_fix: Make the production column in state 2 hypothetical. One way: change the lead to "…Riley's laptop runs it, and production would run exactly the same image". Then either tag the production result "would fail the same way" (or "not released") or show it as "would FAIL". Alternatively, keep production's result hidden/greyed with a note "same image → same result". Keep "caught before release" on the laptop.

### A-03 · should · open
criterion: o-3
location: s-05 ¶ "That one difference explains the rest…" ("A container skips both"), ¶ "Without a copy of the operating system for every app…"; Fig. 02 container boxes ("app / runtime, libraries" vs VM "OS + kernel"); s-03 list of image contents
verdict: misleading-simplification
evidence: The page consistently says containers lack the *kernel*, which is correct (c-10). But it never says an image usually *does* carry an operating system's basic files and tools. Fig. 02 strips "OS" from the container boxes altogether, and the prose says the machine runs "without a copy of the operating system for every app". facts.md q-1 partial-coverage note: images "start from a base image … so images normally include an OS's user-space libraries and tools. They do **not** include the kernel". The Docker image page says "you can start from the Python image and add additional layers". The pull reference lists a Debian base image at 124 MB, which is why the page's own "tens to hundreds of MB" figure is so large. This audience will hear engineers say "our image is based on Debian/Ubuntu/Alpine" and conclude that contradicts "containers have no OS".
expected_fix: Add one clause in s-05, e.g. "An image often includes an operating system's basic files and tools (engineers say it's 'based on Debian' or 'Alpine'), but never its kernel, and nothing boots." Optionally, add a thin "OS files" row to the Fig. 02 container boxes, or change the VM row to "whole OS + kernel".

### A-04 · nit · open
criterion: accuracy
location: s-04 analogy aside, "The name comes from shipping containers."
verdict: unsupported
evidence: The computing term predates Docker. Solaris Containers shipped in 2004 (Wikipedia, "Solaris Containers"), and no source I found documents that the word was chosen after shipping containers. Docker popularised the shipping metaphor in its explanations, but that metaphor is not an etymology. The analogy itself is fine, and its breaking point is acknowledged.
expected_fix: Rephrase as "The name invites a comparison with shipping containers." or "The usual comparison is to shipping containers."

### A-05 · nit · open
criterion: o-4
location: s-06 check k-07, feedback for option B ("Re-creating a container from its image really does take seconds.")
verdict: misleading-simplification
evidence: In this scenario the containers must start on *another* machine, which may first have to download the image. c-11's note says "Image *download* time on a fresh machine adds to the first start", and the page cites images of "tens to hundreds of MB". Seconds is right once the image is on the machine. Option C's feedback ("minutes of restarting") is consistent with this, and B's isn't quite.
expected_fix: Change it to "Starting a container from its image really does take seconds once the machine has the image." Or simply "is fast."

### P-01 · should · open
criterion: clarity of interaction; ux-ui §9 (keyboard)
location: widget w-samecode, two-column layout (container ≥ 700px; `ws--two`), states 1 and 2; `panel()` in `site/widgets/w-samecode/index.js` (`var after = two ? left : right;`)
evidence: At 1280, a keyboard probe pressed Enter on k-02 option A. Focus moved to `.cp-feedback`. The next Tab presses went to "Why the other answers miss", then to **k-04's option A, outside the widget**. "Next: pack it in an image" sits in the left column (`.ws-left`), which comes before the check card in DOM order, so forward Tab never reaches it. At 360 (one column) the order is correct: feedback → summary → Next. A keyboard or screen-reader user at desktop widths who tabs forward leaves the widget after k-02 and misses states 2–3, which carry o-1's key case. The same happens after k-03 for "Build fennel-app:v43…".
expected_fix: Make "Next" reachable by forward Tab from the feedback at every width. Either (a) in two-column mode, also render the follow-up and the Next button at the end of `.ws-right` (after the feedback) and drop them from `.ws-left`; or (b) keep the visual position but, after a commit, move focus to the feedback and give Next a DOM position after the check card (CSS grid placement can keep it in the left column visually). Re-probe: at 1280, Enter on an option, then Tab, Tab should land on Next.

### P-02 · should · open
criterion: mobile UX; plan w-samecode `size:` (reserve 960px at 360, "report if it exceeds 960 by more than 10%"); Ch 1 lesson in the brief (widget heights far beyond the reservation at 360)
location: widget w-samecode at < 600px; `reserve()` in `index.js`; screenshots `run/screenshots/probe/pux-w390-light-w-s1.png`, `pux-w390-light-w-s3.png`
evidence: The measured widget height is 1742px at 360 and 1666px at 390, 81% above the plan's 960. The tallest form is state 1 after a wrong pick, with feedback, TRY AGAIN, follow-up and Next; panels measure 1634px at 360. Every state reserves that height, so in state 1 before any answer there is about 550px of empty bordered frame under the check (panel 1196px vs 1742px). In state 3 there is about 600px of empty frame under the summary line, and the reader has to scroll through it to reach § 03. It reads as an unfinished or broken box at the point where the reader should move on. At 1280 the height is 952px with little dead space, which is fine.
expected_fix: Reduce the tallest phone state rather than drop the no-reflow rule (ac-07). Options, cheapest first: (a) under 600px, show the category line once per group, as Ch 1 does (LIBRARIES & TOOLS currently repeats on two rows), and put each SAME / DIFFERENT marker on the label line, so the table loses about 4 lines; (b) put the state-1 follow-up "Can't reproduce" inside production's result cell as a tag, as state 2 does with "caught before release", instead of a separate paragraph; (c) in state 3, fill the space with content that earns it, or end the state with a bottom-aligned "Continue to § 03 ↓" link so the empty frame has a visible exit. Report the new height at 360. If it is still far above 960, the designer or user decides whether the stacked-height rule should give way on phones, where `scrollIntoView` already puts each new state's header at the top.

### P-03 · should · open
criterion: misconception handling (m-01); learning-science audit (Constructive commitment, not recognition)
location: s-04 paragraph 2 ("Running an image gives you a container: the app running as a process, walled off by the operating system so that it has its own files, which come from the image…") vs k-05 option C ("A walled-off process: it carries the app's own files but uses the machine's operating system core.")
evidence: s-04 defines a container about 30 lines earlier, and k-05's correct option repeats that definition almost word for word ("walled-off", "process", "its own files"). A reader who still holds m-01 can pick C by matching the phrasing, so their "small VM" belief is never shown failing, and A's feedback, which does the confronting, is never seen. The confrontation then rests on f-02 alone. A is at least as plausible to the target reader as C on its merits, so the wording cue does decide the item.
expected_fix: The check text is final per the approved mockup, so this needs the designer or user. Either (a) re-word k-05 C so it doesn't repeat s-04's wording (for example: "An ordinary running program, fenced off from its neighbours, with no operating system of its own"), or (b) change the s-04 sentence so it no longer gives away k-05's answer: keep "the app running as a process" and move "walled off… its own files" to after k-05's reveal in s-05. Option (b) touches only builder prose, but it moves plan content between segments, so get the designer's sign-off.

### P-04 · nit · open
criterion: clarity of interaction; ux-ui §9 (keyboard focus)
location: page checks k-01, k-04 to k-07; `setupChoice()` in `site/assets/page.js`
evidence: After Enter on a page-check option, focus falls to `<body>` because every option becomes `disabled` (probe at 1280 and 360: "k-04 after Enter focus: BODY"). The next Tab does reach TRY AGAIN, and the feedback is `role="status"`, so screen readers hear it. The widget's own checks already move focus to the feedback. Ch 1 behaves the same way.
expected_fix: Give `.cp-feedback` `tabindex="-1"` and focus it (`preventScroll: true`) after a pick, the same pattern as the widget's checks. Optionally carry the fix back to Ch 1's `page.js` in a later pass (not in this run).

### P-05 · nit · open
criterion: visual consistency and polish
location: w-samecode states 2–3 (code row inside the IN THE IMAGE band); w-samecode row categories
evidence: (1) In states 2 and 3 the code chip (c1-soft fill, c1 stroke) sits on the c1-soft image band, so the code row loses figure-ground against its band. The other rows' c2 chips stand out (`pux-w1280-light-w-s3.png`). (2) The category line repeats on every row ("LIBRARIES & TOOLS" twice), where Ch 1's stage 4 shows each category once over its group (`ch-01…/pux-w1280-light-s4-widget.png`).
expected_fix: (1) Give `.ws-band--image .ws-chip--c1` a `--surface` fill, keeping the c1 stroke, as the band's `cp-img` chip already has. (2) Show each category once per group, as Ch 1 does (this also serves the height fix above).
