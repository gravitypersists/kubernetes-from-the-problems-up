status: done

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/review/round-2/accuracy.md — the round-2 closure review. A-01 to A-05 are all closed, and there are no new findings.
- /Users/m/workspace/k8s-course/explainers/ch-02-containers/run/screenshots/probe/acc-r2-s2.png, acc-r2-s3.png, acc-r2-f01.png — probe screenshots. acc-r2-s2.png and acc-r2-s3.png were last written by the 360px run, so they show the 360px layout.

summary: I closed all five round-1 accuracy findings. Each fix checked out in the source and on the rendered page. I ran the widget through all three states at 1280 and 360, and checked Fig. 01, k-05 and k-07.
- **A-01:** s-03 now cautions that the version label can be moved and mentions the digest. Fig. 01's note sits on the image, not the label, and reads "each version stays as it was".
- **A-02:** In state 2, production's result is now a hypothetical: a dashed FAIL, no error line, tagged "not released: would fail the same way". The screen-reader announcement matches.
- **A-03:** The page now says an image includes the OS's files but never its kernel. Fig. 02's VM boxes now read "whole OS + kernel".
- **A-04 and A-05:** The wording was changed as asked.

The fixes introduced nothing false. That includes the reworded k-05 option C, which agrees with the A-03 clause.

concerns:
- One optional wording leftover, not blocking: k-03's prompt (verbatim from the plan) still says "Both machines now run the same image, fennel-app:v42". The lead, the tag and option C now make clear that production's result is hypothetical, so readers won't be misled. If the designer wants it fully consistent, "use" or "would run" would fix it. It's noted under A-02.

relaxed:
- none
