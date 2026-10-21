status: done

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/index.html — s-03 version-label caution; s-05 OS-files clause; Fig. 02 VM rows; the A2 aside wording; k-05 option C; k-07 option B feedback; Fig. 01 registry note
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/assets/page.js — Fig. 01's v43 label in `CH02_REGISTRY`; focus moves to the feedback after a pick
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/assets/page.css — new reserved heights for the empty `w-samecode` mount
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/site/widgets/manifest.json — size notes updated to the new reservations

summary: I fixed all six findings within their scope and changed no other check text. The `w-samecode` mount now reserves 940px at 900px and wider, 1040px from 600 to 899px, and 1640px under 600px. These sit at or just below the measured 952, 1045 and 1742px, because the phone height is still coming down under P-02. The reservation only applies while the mount is empty. The gate (`verify.mjs --phase page`, round 4) passes with no warnings, now that the widget exists. Its reading estimate is about 11.9 min of text. I also checked: Fig. 02 at 360px ("whole OS + kernel" wraps cleanly, no overflow), and k-04's feedback getting `tabindex="-1"` after a pick.

concerns:
- A-03: I named only Debian ("based on Debian", for example). Debian is backed by facts.md (c-01 note, and the Debian base image in the pull reference). Alpine, which the finding also suggested, isn't in the facts file, so I left it out.
- P-03: k-05 option A and option B are unchanged. They already match the new C in shape ("noun phrase: it …") and length (93, 101 and 99 characters). Option C's feedback is also unchanged and still fits the new wording.

relaxed:
- none

dispositions:
- A-01: fixed — s-03 has a new sentence after the immutability paragraph. It says the version label is a name that someone can move to a different image, and that teams who need certainty use labels they never reuse, or the image's digest. In Fig. 01, the v43 annotation now reads "image: the package; never changes once built" (page.js `CH02_REGISTRY`), and the registry note reads "each version stays as it was" (index.html).
- A-03: fixed — s-05's "That one difference…" paragraph now adds: "An image often does include an operating system's basic files and tools (engineers will say an image is "based on Debian", for example), but never its kernel, and nothing boots." "Without a copy of the operating system for every app" became "Without a whole operating system and kernel for every app". Fig. 02's VM rows now read "whole OS + kernel".
- A-04: fixed — the A2 aside now opens "The usual comparison is to shipping containers."
- A-05: fixed — k-07 option B feedback now reads "…really does take seconds once the machine has the image."
- P-03: fixed (d-07) — k-05 option C now reads "An ordinary program, fenced off from its neighbours: it runs on the machine's own operating system." The meaning is the same, and it no longer echoes s-04's wording ("walled-off", "process", "own files").
- P-04: fixed — `setupChoice()` in site/assets/page.js gives `.cp-feedback` `tabindex="-1"` and calls `fb.focus({ preventScroll: true })` after a pick. TRY AGAIN still sends focus back to option A. Ch 1 is untouched.
