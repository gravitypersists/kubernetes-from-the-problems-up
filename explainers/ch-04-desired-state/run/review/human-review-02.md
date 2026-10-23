Written after ### 2026-10-22T12:34:34-04:00 · orchestrator · revision

§ 04

"It’s moving day." What's moving day? I read the section and still can't figure it out. It appears to be a day where we've defined a storefront manifest and we're bringing it into the cluster. Let's add a very short paragraph before the scrollytelling section establishing this.

"Ari applies the storefront manifest, and the tool answers created in under a second." - what is "the tool" here? I'm pretty sure it's Kubernetes. Is Ari applying it, or is Kubernetes? It's a little confusing.

This scrollytelling section is doing a lot of heavy lifting. Let's try and break it down a little bit.

- Before introducing the "apply" let's establish that the reconcile loop is running. This gives us an opportunity
- "The manifest went to the cluster’s API server, the front door to the record, which checked it and wrote it down." So much is wrong with this. The reader's never been introduced to a cluster API server. We're introducing it here as the "front door to the record" - what is a the "record" to a learner here? "front door" is an analogy and without proper grounding the learner can interpret this in way too many open-ended and potentially wrong ways.

"the loop lens: which loop · watching what · doing what" the excessive use of what/which here is too vague. From what I understand, reconciliation loop is an architectural pattern based on "observe, compare, act" and while we're learning about the replicaset reconciliation loop now, we'll learn about other loops in the future. So it's important we begin establishing the pattern and the implementation of the pattern as distinct.

"Each loop on moving day followed the same pattern." <- this is potentially creating a flawed association to the learner that this is specific to "Moving day" when it's a general architectural pattern of k8s.

§ 05

Similar to the previous chapter, let's establish first the learner understands that "Each node’s agent checks in regularly" which also gets ahead of the gap here, because we can answer "checks in where?"

