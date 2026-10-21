# Accuracy review: round 1

## Summary
The page is accurate on everything the objectives rest on. The image contents, immutability, registry push/pull, container as a walled-off process, files lost when a container is replaced, the shared kernel versus a VM's own kernel, the hedged size and start-up figures, the weaker isolation that leads AWS to use Firecracker, and "containers die with their machine" all match facts.md (c-01 to c-12) and the sources. All seven checks have the right answer keyed, and their feedback is true. I drove w-samecode through all three states. Its PASS/FAIL logic matches the story. No later-chapter terms are used as concepts, and Docker is named once. Nothing blocks. The most important issue is that the page links "never changes" to the version label: the figure annotates the tag fennel-app:v43 as "the package, never changes", and the page never says tags can be moved. There are also two smaller should-fixes: a contradiction inside widget state 2, and the page implying that images carry no OS files at all.

## Findings

### new
severity: should
criterion: o-2
location: s-03 ¶ "Once an image is built…"; s-04 Fig. 01 registry (assets/page.js CH02_REGISTRY label "image: the package, never changes", note "every version kept as it was")
evidence: The prose says "you build a new image with a new version label … so the image that passed the tests is exactly the image that ships". Fig. 01 puts the annotation "image: the package, never changes" on the chip "fennel-app:v43", and the registry note says "every version kept as it was". The image itself is immutable (c-04, verified on Docker's "What is an image?": "Images are immutable. Once an image is created, it can't be modified."). The *label* isn't. c-08 (docker image pull reference) says pulling a tag again gets "the most up-to-date version", and only a digest "guarantee[s] that the image you're using is always the same". AWS ECR's docs (docs.aws.amazon.com/AmazonECR/latest/userguide/image-tag-mutability.html) describe tag immutability as a setting you must turn on: with "Mutable", tags can be overwritten by pushing a different image with the same tag. Registries can also delete old images under retention policies, so "every version kept" is a policy, not a property. A manager will come away believing "v43" always names the same bits, so "which exact image is in production?" looks like it is always answered by the version name. c-08's note flags this as the manager-level takeaway.
expected_fix: Add one sentence after the immutability paragraph, for example: "One caution: the version label is a name attached to the image, and someone can move a name to a different image. Teams that need certainty use labels they never reuse, or the image's unique fingerprint (engineers say digest)." In Fig. 01, change the note to "each version stays as it was" and keep the annotation on the image, not on the label (e.g. "image: the package; never changes once built").
verdict: misleading-simplification

### new
severity: should
criterion: o-1
location: widget w-samecode, state 2 "One image" (data.js states[1].lead, tags.laptop "caught before release"; production result shown as FAIL)
evidence: Probe at 1280px. In state 1 I picked A and pressed Next. In state 2 I picked C, and the result row read "FAIL error: unknown option | caught before release" (laptop) and "FAIL error: unknown option" (production). The lead says "Now Riley's laptop and production both run that same image", and the IN THE IMAGE band for fennel-app:v42 includes "Fennel app code, with Riley's change". If production runs v42 and v42 contains Riley's change, then the change has been released and is failing for customers, and "caught before release" is false. Because an image is immutable and contains the code (c-01, c-04), a v42 with Riley's change can't be the image production was already running before the change. Check 03's own key says "the same way the change would have failed in production". That is a hypothetical, and the widget shows it as something that happened.
expected_fix: Make the production column in state 2 hypothetical. One way: change the lead to "…Riley's laptop runs it, and production would run exactly the same image". Then either tag the production result "would fail the same way" (or "not released") or show it as "would FAIL". Alternatively, keep production's result hidden/greyed with a note "same image → same result". Keep "caught before release" on the laptop.
verdict: misleading-simplification

### new
severity: should
criterion: o-3
location: s-05 ¶ "That one difference explains the rest…" ("A container skips both"), ¶ "Without a copy of the operating system for every app…"; Fig. 02 container boxes ("app / runtime, libraries" vs VM "OS + kernel"); s-03 list of image contents
evidence: The page consistently says containers lack the *kernel*, which is correct (c-10). But it never says an image usually *does* carry an operating system's basic files and tools. Fig. 02 strips "OS" from the container boxes altogether, and the prose says the machine runs "without a copy of the operating system for every app". facts.md q-1 partial-coverage note: images "start from a base image … so images normally include an OS's user-space libraries and tools. They do **not** include the kernel". The Docker image page says "you can start from the Python image and add additional layers". The pull reference lists a Debian base image at 124 MB, which is why the page's own "tens to hundreds of MB" figure is so large. This audience will hear engineers say "our image is based on Debian/Ubuntu/Alpine" and conclude that contradicts "containers have no OS".
expected_fix: Add one clause in s-05, e.g. "An image often includes an operating system's basic files and tools (engineers say it's 'based on Debian' or 'Alpine'), but never its kernel, and nothing boots." Optionally, add a thin "OS files" row to the Fig. 02 container boxes, or change the VM row to "whole OS + kernel".
verdict: misleading-simplification

### new
severity: nit
criterion: accuracy
location: s-04 analogy aside, "The name comes from shipping containers."
evidence: The computing term predates Docker. Solaris Containers shipped in 2004 (Wikipedia, "Solaris Containers"), and no source I found documents that the word was chosen after shipping containers. Docker popularised the shipping metaphor in its explanations, but that metaphor is not an etymology. The analogy itself is fine, and its breaking point is acknowledged.
expected_fix: Rephrase as "The name invites a comparison with shipping containers." or "The usual comparison is to shipping containers."
verdict: unsupported

### new
severity: nit
criterion: o-4
location: s-06 check k-07, feedback for option B ("Re-creating a container from its image really does take seconds.")
evidence: In this scenario the containers must start on *another* machine, which may first have to download the image. c-11's note says "Image *download* time on a fresh machine adds to the first start", and the page cites images of "tens to hundreds of MB". Seconds is right once the image is on the machine. Option C's feedback ("minutes of restarting") is consistent with this, and B's isn't quite.
expected_fix: Change it to "Starting a container from its image really does take seconds once the machine has the image." Or simply "is fast."
verdict: misleading-simplification
