§ 03

"Start with Morgan’s idle machines." This paragraph's prose is stilted and a bit hard to read. Please take a stab rewriting it a bit more clearer.

§ 05

"That’s Morgan’s question about idle machines, asked at Google’s scale." better language please, "Just like Morgan, at Fennel, ..."

§ 06

"Last chapter said you’d hear the name Docker in conversations about containers, and that this chapter would place it. Commit to an answer before you read how." This feels a bit too meta. I don't know how relevant the callback to last chapter is here. How about, something along the lines of: "You might already be familiar with Docker, and the last chapter on containers might have got you thinking how it fits in. Let's formally introduce Docker."

Fig. 02 Machine · Riley’s laptop - throughout this course we've represented boxes in machines as running processes, be they VMs, containers, or just libraries or runtimes. Now we're showing imperative commands "docker build" as though it's in the same category. I think we should give some visual distinction here that docker build is a process.

"Riley then pushes the image to the registry." Let's add a note here or something minimal indicating that it's not advisable to build artifacts on local machines.

I'm a little confused what the overall purpose of this section is for. I think we're trying to set the learner up for understanding where Docker fits in. As far as I understand it, Docker popularized the industry standard image format and specification that allows Kubernetes to manage containers generically. The Fig 02 is fine, but seems to be describing more so the concept of containers, which was purview of ch 02. "Container" is a general, industry-wide concept for virtualization technology, while a "Docker container" is a specific brand and implementation of that concept. Perhaps some light review is necessary here.

§ 07

> After another 3 a.m. page, Sam brings a proposal to the planning meeting. “We should move to Kubernetes.” Sam

Brilliant. Keep that.

I'm not too crazy about the check though. "What’s the most useful thing Jordan can ask?" -> it's actually a bit of a judgment call and no correct answer sort of thing. but then we get the answer and immediately see "Chapter 14 is where the cost side of that question gets answered." This isn't necessarily bad, it might be what a manager immediately wants to jump to. But let's take a moment to consider where we are: Part 1 is finishing, we've established the pain that drove containerization and orchestration as patterns and now we're, hopefully, itching to start understanding the core basics of k8s. Let's revisit this check and ensure we are acknowledging the transition we'll be going through in the course from part 1 to part 2. "Next: Fennel moves to Kubernetes, the same machine dies at 3 a.m., and nobody wakes up. The next chapter is how." is great though. Perhaps something kind of along the lines a bit more inspirational, like "throughout these first years, Fennel's been playing catch up on technical problems. Now it's time to start getting ahead of the game and adopt a mature operational posture" (obviously use different wording than mine here).
