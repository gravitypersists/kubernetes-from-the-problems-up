status: done

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-08-autoscaling/run/review/round-1/accuracy.md — round-1 accuracy review: 8 findings (1 blocking, 3 should, 4 nit)

summary: I read all of s-01 to s-09 (including the four locked blocks, from the fragments), every check's prompt and feedback, the lane data, the Fig. 06 snapshot, the loop lens and week-chart data, and the footer. I redid every worked number and spot-checked the HPA, cluster autoscaler, GKE and AWS sources. The mechanisms are sound. The blocking finding is in the scale-down answer: it says "no other node has more than 1 GB free", but node 07 is empty with 13 GB free. Three should-fixes: the "seven minutes" baseline, A1's "close enough", and D3's Autopilot claim.

concerns:
- I did not run the probe or drive the page in a browser. All lane, figure, chart and lens data was checked statically from source.
- I could not re-read the exact AWS "under 25 seconds" sentence, because the fetch of the post truncated the "Boot time" paragraph. The same post's 39 percent (13 seconds) figure fits it, and facts.md quotes it. Logged as a nit.
- Whether the cluster autoscaler counts a node it is already removing as a place to move Pods rests on the FAQ's wording plus my knowledge of its planner, not on a quoted sentence. I am confident of it, and it is the basis for the blocking finding's fix.

relaxed:
- none
