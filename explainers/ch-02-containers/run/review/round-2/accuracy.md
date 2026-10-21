# Accuracy review: round 2

## Summary
All five round-1 accuracy findings are fixed in the live site, and I'm closing all five. I confirmed each one in the source and in the rendered page: three probes, at 1280 and 360, through every widget state, Fig. 01, k-05 and k-07. Widget state 2 now presents production's result as hypothetical: a dashed FAIL with no error line, tagged "not released: would fail the same way", and the screen-reader announcement says the same. The tag caution, the "OS files but never the kernel" clause and the reworded k-05 C introduce nothing false. No new blocking findings. One small leftover wording point is recorded under A-02. It doesn't block, and the change is optional.

## Findings

### A-01
severity: should
criterion: o-2
location: s-03 ¶ "One caution: …" (index.html l.74); Fig. 01 registry (page.js CH02_REGISTRY; index.html .flow__reg-note)
evidence: s-03 now reads "One caution: the version label is a name attached to the image, and someone can move that name to a different image. Teams that need certainty use labels they never reuse, or the image's unique fingerprint, which engineers call a digest." This matches c-08 (pull by digest is the only guarantee) and ECR's tag-mutability docs cited in round 1. Probe at 1280, `text:#f-01 .flow__reg-chips`: "fennel-app:v43 / ↑ image: the package; never changes once built", so the claim is now about the image, not the label. `.flow__reg-note`: "each version stays as it was". With the caution sentence nearby, that note reads as the story's registry, not a universal guarantee.
expected_fix: none
verdict: misleading-simplification
status: closed

### A-02
severity: should
criterion: o-1
location: widget w-samecode state 2 (data.js states[1].lead, tags, hypo; index.js resultCell / resultsSay)
evidence: Probe at 1280 and 360: k02-A → Next → k03-C. The lead reads "…Riley's laptop now runs that image, and production would run exactly the same one." Result row text at 360: "FAIL / error: unknown option / caught before release | FAIL / not released: would fail the same way". Production's FAIL is drawn dashed with no error line (acc-r2-s2.png at both widths). The aria-live announcement says "Riley's laptop: photo upload FAIL, error: unknown option. Riley's laptop: caught before release. Production: not released: would fail the same way." The widget no longer shows a released change failing, so "caught before release" is now consistent. State 3 shows PASS on both with v43, which is coherent. Leftover wording, non-blocking: k-03's prompt (plan-verbatim) still opens "Both machines now run the same image, fennel-app:v42". The lead, the tag and option C ("would have failed in production") make the hypothetical clear, so a reader won't come away believing Riley's change went out. If the designer wants it fully consistent, "Both machines now use the same image" or "…would run the same image" would do it. Optional.
expected_fix: none required
verdict: misleading-simplification
status: closed

### A-03
severity: should
criterion: o-3
location: s-05 ¶ "That one difference explains the rest…" (index.html l.193), ¶ l.194; Fig. 02 VM boxes
evidence: s-05 now says "An image often does include an operating system's basic files and tools (engineers will say an image is "based on Debian", for example), but never its kernel, and nothing boots." That matches facts.md q-1's note (base images carry OS user-space, not the kernel) and c-10. l.194 now reads "Without a whole operating system and kernel for every app…". Fig. 02's VM boxes read "whole OS + kernel", so the contrast is now whole OS versus none of the kernel, not OS versus no OS. The container boxes still show only "app / runtime, libraries". Together with the prose clause and the s-03 analogy's "the core of the operating system… an image leaves that out", that's a faithful simplification. The reworded k-05 C ("it runs on the machine's own operating system") is consistent with this: its feedback glosses it as "operating system core", and option A's feedback says the same.
expected_fix: none
verdict: misleading-simplification
status: closed

### A-04
severity: nit
criterion: accuracy
location: s-04 analogy aside (index.html l.116)
evidence: The aside now opens "The usual comparison is to shipping containers." It no longer claims an etymology.
expected_fix: none
verdict: unsupported
status: closed

### A-05
severity: nit
criterion: o-4
location: s-06 k-07 option B feedback (index.html l.225)
evidence: Probe at 1280, k-07 option B: "Half right. Re-creating a container from its image really does take seconds once the machine has the image. But nothing in an image or a container notices the machine died…". That matches c-11's caveat about download time on a fresh machine, and it's consistent with option C's "minutes of restarting".
expected_fix: none
verdict: misleading-simplification
status: closed
