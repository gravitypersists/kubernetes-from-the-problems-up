This review happened after ### 2026-10-21T13:59:29-04:00 · orchestrator · stage Stage: deliver → **done**

§ 01

Imagine somebody jumps ahead to this chapter, we should be a bit more friendly to that in the intro section. Add an simple click "I didn't read last section, what happened?" In the same vein, let's ensure we re-establish the cast of characters. Sam, the founding engineer and Jordan, the manager.

§ 02

The "Same code, two machines" widget is not very clear, the carousel style layout is confusing and also taxes unnecessarily cognitive load. Let's turn this into a scrollytelling section instead. Make two seperate boxes (one for riley's laptop, one for production), like so (my comments to you in #):

left side (riley's laptop)

- code: main
- runtime: python 3.12
- libraries: 12 libraries
- photo-resizing: ImageResizer 7.0

right side (riley's laptop)

- code: main
- runtime: python 3.12
- libraries: 12 libraries
- photo-resizing: ImageResizer 6.2

as you scroll it into view we see "same" between each row except for the photo-resizer.

With the scrollytelling, let's use the left column to show the two machines side by side, we see the description on the right, then the predict check.

Now we start a new scrollytelling lane, this time. We introduce the concept of image here (we'll expand on it § 03). We see the two machines, except now an image container wrapped around it fennel-app:v42. This reifies the notion that the dependencies are now all synced. Do another "Predict" check which makes it super clear "Will the tests which originally passed on Riley's laptop now pass?" and only offer two options: "The tests will continue passing" or "The tests will now fail." Reinforce that this is what tests are supposed to do, catch issues before they go to prod. Finish on the note that Riley will need to get the ImageResizer updated to 7.0 by making a new image in order to proceed with the update.

§ 03

Remove the sentence "Those are the rows inside the IN THE IMAGE band." It forces a split-attention and probably not worth having. You should rewrite this section given the changes above, we don't need to re-explain things which were better told in the scrollytelling format.

Let's give some pizazz or flair (more than dfn) to "immutable" and ensure we do the same for "stateless" too. The reader will likely sense these are critical words, and they are.

I think this section is quite important but it seems to be doing a lot of cleanup due to mistakes in presentation in § 02, so converting § 02 to scrollytelling should give this section a bit more merit to be what it's about, what goes in the image, what doesn't, and what it means for the image to be stateless and immutable.

"One caution: the version label is a name attached to the image, and someone can move that name to a different image. Teams that need certainty use labels they never reuse, or the image’s unique fingerprint, which engineers call a digest." Pedantic. Let's just show this as a progressive disclosure note if needed. I also don't understand it, and on google search I'm told not to confuse docker tags from labels.

Delete this whole section "ANALOGY Many companies don’t ... WHERE THIS ANALOGY BREAKS... An IT laptop starts drifting on day one.." It appears not to be an analogy and also seems to repeat what we already learned

§ 04

The language in this section is a bit vague.

Instead of saying "A container is that process", it is more precise to say "A container is one or more processes isolated and packaged..." or refer to it as the application's process tree.

The phrasing of "its own view of what's running" suffers from ambiguous pronoun reference and colloquial vagueness. Grammatically, "it" traces back through "the app running as a process" to "a container". It feels slippery because "the app" and "the container" are being equated in the same breath.

For the challenge, consider adding a disclaimer or note or progressive disclosure or something noting that Riley's change is not on a mountable volume, which we'll learn about later. This is a recommendation and not an ask, if it makes sense to omit this for now, for pedagogical reasons, respect that.

§ 05

"That one difference explains the rest." Explains the rest of what? This sentence comes out of left field.

"Every container on a machine shares one kernel, so a flaw in that kernel is shared by all of them, while each VM has its own" Add kernel: "has its own kernel".

"The wall is thinner than a VM’s, not missing, and for a company running only its own code, that trade-off is usually fine." confusing language. "The wall partititioning containers is not missing, it's just a bit thinner. This trade-off is usually fine."

"Nor is it one or the other. In the cloud, the machine running your containers is usually a VM itself. Containers and VMs are layers, not rivals." I don't even know what this is saying, tbh.

"In the cloud, containers usually run inside a VM, which would mean apartments built inside a house; the picture can’t show that. And it says nothing about how fast a container starts." -> wouldn't it mean "which is like a single apartment built inside a house"? Also, "the picture can't show that" - what picture? who says what about how fast a container starts? This is confusing, please rewrite it.
