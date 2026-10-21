# Learning plan: "Works on my machine": containers (Ch 2, Kubernetes for Technical Managers)

<!-- Written by the instructional designer. Parsed by scripts/check_plan.py. -->

## Shape

A narrative article that follows Fennel into Year 1. It is built around **one contrasting-case widget**, with two static figures and seven short checks. The chapter's core move is a single contrast: the same code on two machines, first with the photo tool installed by hand on each, then with both machines running one image. The reader predicts the outcome in each case. The contrast carries o-1. The surprise is in the second case: the image doesn't make Riley's bug go away, it makes the bug show up on the laptop, where it's cheap. That is the honest version of "removes the works-on-my-machine class of problem". The prose then does what prose does well: naming *image*, *registry* and *container* after the reader has met them, what's in the image and what isn't (the m-19 revisit), containers vs VMs (m-01), and the conversation. o-4 is folded into the conversation segment, as d-01 allows, instead of getting a segment of its own.

Rejected alternatives:
- **Full-page sandbox** ("environment builder": set each machine's tool versions, toggle image on or off, run tests). A sandbox suits system dynamics, but this lesson is one contrast. Free exploration would dilute it, and the reader could miss the key case (same image, bug caught on the laptop). It wouldn't fit 14 minutes alongside o-2 to o-4.
- **Reusing all of Ch 1's `w-rebuild`** (inventory, rebuild from notes, checks, compare). Stages 1–3 teach Ch 1's lesson. Replaying them costs about 5 minutes and repeats it. See the w-samecode `reuse:` field for what is reused.
- **Scrollytelling for build → registry → container.** The process has three steps and nothing to manipulate, so a static figure (f-01) carries it, without the mobile cost of a sticky canvas.
- **Plain article.** Reading "the versions differed" feeds the illusion of understanding. CURRICULUM §2.1 asks for pain felt in the page.

**Honest sizing (Ch 1 lesson).** Estimated reader time, including thinking and interaction:

| Part | Minutes |
|---|---|
| hero + s-01 (k-01, Year 1 scene) | 1.5 |
| s-02 widget (three states, two predictions, one button) | 3.5 |
| s-03 image (no check) | 2.0 |
| s-04 f-01 + container + k-04 | 2.5 |
| s-05 k-05 + f-02 + aside | 2.5 |
| s-06 conversation (k-06, k-07, what's left, recap) | 2.5 |
| **total** | **about 14.5** |

That's at the top of the budget, not under it. The widget estimate is realistic: about 60–75 s per predict state and 30 s for the build step. Ch 1's widget had four stages, six notes steps and two diagnoses; this one has three states and one button. If the build runs long, `cut-list.md` `## If it runs long` items 1–3 recover about 2 minutes without losing an objective. All four objectives fit only because o-4 shares the conversation segment. Giving o-4 its own segment would add about 1.5 minutes, so it isn't planned.

toc: yes. Six h2 sections and a 14-minute read, so a rail on desktop and a collapsed "Contents" on mobile. This also matches Ch 1 (§ numerals as section addresses).
tokens: user-provided: Control Plane style guide, `design/control-plane/`. Copy `control-plane.css` to `site/assets/tokens.css`; follow README.md, the tokens.json notes and `components/bundle.css`. Ch 1's `site/` is the reference implementation, so copy its `assets/page.css` check classes and page skeleton.
mobile: supported. f-01 and f-02 re-layout vertically under 600px. The widget uses Ch 1's row-table layout (flexible label column plus two 72px status columns), which fits at 360px without shrinking text. The check panel sits below the rows, and the result row is the last table row, directly above the check, so the reveal is next to the options. See the w-samecode `size:` field.

**Course voice (from the style guide):** second person, present tense, sentence-case headings, no exclamation marks, no emoji. Status always travels as a word plus colour (PASS, FAIL, SAME, DIFFERENT, IDENTICAL, RUNNING).

**Story conventions this plan adds** (flagged for the checkpoint, R4):
- **Riley** (they/them) is a new engineer in Year 1, who joined last month.
- Production's photo-resizing tool is **version 6.2**, installed by hand by Sam in May of Year 0. Ch 1 established the install; the version number is new. Riley's laptop has **7.0**.
- Sam builds Fennel's first image, **`fennel-app:v42`**, to match production. Riley then builds **`fennel-app:v43`** with 7.0.
- In Year 1, production still runs on **one rented machine** (now running containers), plus a separate staging machine.

**Fiction vs. sourced.** Riley, the version numbers, the image names and the Saturday incidents are Fennel fiction. The page must not attribute the version numbers to any real tool's release history (x-01 note). The mechanisms are sourced:
- machine-installed tools differ between machines (Ch 1 claim 01, c-03);
- an image packages code, runtime and libraries (c-01);
- settings are handed in at start (c-02, medium; one or two sentences only);
- images are immutable (c-04);
- a container is an isolated process (c-05);
- its files vanish when it's replaced (c-06);
- images are kept in a registry (c-07);
- processor type limits "run anywhere" (c-09);
- containers vs VMs (c-10, c-11 medium with the hedge kept, c-12).

The machine-dies outcome (k-07) is a stated inference from c-05 and c-06 (researcher's note). "Docker" appears at most once in the body, as "a name you'll hear; the next chapter places it" (Ch 3 owns m-02).

## Objectives

- o-1: explain how packaging the app with its dependencies removes the "works on my machine" class of problem, and connect it back to Ch 1's rebuild. checks: k-01, k-02, k-03
- o-2: distinguish an image (the packaged, immutable, versioned artifact kept in a registry) from a running container. checks: k-04
- o-3: contrast containers with VMs well enough to see why many containers fit on one machine, and what isolation that costs. checks: k-05
- o-4: identify which problems containers don't solve, starting with what happens when the machine running them dies. checks: k-06, k-07

k-01 is the retrieval opener: it serves o-1's "connect it back to Ch 1" clause. k-06 interleaves: its distractors reuse local-02 (s-04) and m-01 (s-05), so it also checks o-2 and o-3 in a new setting.

## Diagnosis

- **Readiness:** novice for infrastructure, intermediate for software. From Ch 1 the reader has these chunks: the app is a process on a machine; the code isn't the whole app (runtime, libraries, tools, config, data); hand-built machines drift; a VM is a whole computer in software with its own operating system. New here: image, container, registry, immutability, kernel (as a gloss).
- **Hardest moment:** w-samecode state 2 (k-03). The reader holds three elements: (1) both machines run the same image, (2) that image contains photo tool 6.2, and (3) Riley's code needs 7.0. That is the novice limit of 3. Two supports keep it manageable. The row table keeps every version visible (externalised state). And state 1 has already chunked "Riley's code needs 7.0" before state 2 changes anything. Only one feature changes between the two cases: where the tool comes from. s-05 is the second-hardest moment (own OS vs shared kernel, size and speed, isolation strength). Pre-training handles it: the kernel is glossed in one sentence before f-02, and k-05 makes the reader commit to a model first.
- **Misconceptions confronted** (catalog IDs; local IDs proposed in ## Curriculum recommendations):
  - **m-19 revisited.** The fix is packaging (w-samecode states 2–3, k-03). The new trap, "the image is the whole app", is planted as a boundary: the NOT IN THE IMAGE band in w-samecode state 3 (settings, data), and s-03.
  - **m-01, owned here.** k-05 (predict), f-02, the s-05 prose, and the k-06 distractor C.
  - **local-01 ("containerized means machine failure is solved").** k-07 option B.
  - **local-02 ("passed in staging means identical in production").** The s-04 aside's breaks note, and k-06 distractor A.

  Each is stated fairly once, shown failing, then corrected, and its honest partial truth is kept. Re-creating a container really is fast (k-07 B). The image really is byte-for-byte identical everywhere (k-06 A). Containers really are isolated (k-05, f-02).
- **Retrieval opener:** k-01. Why did photo uploads fail on the machine rebuilt from Sam's notes? Answering needs the snowflake idea (CURRICULUM §2.8).
- **Analogies** (each with a visible "Where this analogy breaks" line in the same aside):
  - A1, the pre-imaged laptop (s-03): the management/onboarding analogy, §2.1 "pain they know from managing people";
  - A2, shipping containers (s-04): the name's origin, and the source of "run anywhere";
  - A3, houses vs apartments (s-05): Docker's own analogy, x-03.

## Segments

### s-01 — A year later
intent: Reconnect to Ch 1's snowflake lesson through retrieval, then let the reader feel Year 1's symptoms as a manager sees them, before any new idea appears.
objectives: o-1
claims: c-03 (also Ch 1 claims 01 and 06 by reference: machine-installed tools; drift)
readiness: novice · interactivity: low (the Ch 1 cause, three symptoms) · max-elements: 3
mode: retrieval (choice) → concrete story (pain seen in meetings) · blueprint: none
layout:
  contiguity: adjacent. k-01 opens the section. The scene follows its reveal directly, and its first line links back ("That gap, a year on, is on six laptops").
  pacing: continuous
  redundancy: don't re-explain snowflake servers; k-01's feedback names the idea once and the scene moves on
  scaffold: none
ux: Commit to k-01 (three option buttons) and read the feedback. Then read a short scene: Riley's first week spent installing tools from a wiki page; a bug in production nobody can reproduce; staging and production quietly drifting apart. At 360px everything stacks and the options are full width.
figure: none
widget: none
checks: k-01

### s-02 — Same code, two machines
intent: The reader predicts, and is shown, how one dependency version difference produces a "can't reproduce" production bug. Then the reader sees that running one image on both machines makes the two behave identically, so the bug shows up on the laptop before release.
objectives: o-1
claims: c-01, c-02, c-03, c-04
readiness: novice · interactivity: high (same code vs. different tool version; where the tool comes from; same result on both machines) · max-elements: 3
mode: contrasting cases with predict-then-reveal in each case, then one action (build a new image) · blueprint: B4 (contrasting cases, aligned rows) with B1-style step-locking across three states
layout:
  contiguity: inline. Every version, the SAME / DIFFERENT marker and each PASS / FAIL sits on the row it describes. The result row is the last table row, directly above (mobile) or beside (desktop) the check.
  pacing: step-revealed. State 1's production result is hidden until k-02 is committed. State 2 opens only after k-02. Its results are hidden until k-03 is committed. State 3's button appears after k-03.
  redundancy: the surrounding prose is two sentences ("Here is Riley's bug. Predict, then see.") and doesn't narrate the states. Widget text is the state lead, the check, and the feedback.
  scaffold: none (the target reader needs every part). "Start over" returns to state 1.
ux: About 3–3.5 minutes. Read the rows, commit to k-02, see production FAIL. Tap "Next: pack it in an image", commit to k-03, see both FAIL. Tap "Build fennel-app:v43 with photo tool 7.0" and see PASS / PASS plus the NOT IN THE IMAGE rows. At 360px it's one column: state header, lead, rows, result row, check. No horizontal scroll.
figure: none (the widget is the figure)
widget: w-samecode (complexity: high) — three-state, two-machine aligned comparison with two predictions (hand-installed → one image → new image)
checks: k-02, k-03

### s-03 — What goes in the image, and what doesn't
intent: Name the thing the reader just used (an image), say exactly what it contains and what it deliberately leaves out, and explain immutability as the reason it can't drift the way Sam's server did.
objectives: o-1, o-2
claims: c-01, c-02, c-04, c-06
readiness: novice · interactivity: low (each point names something seen in the widget) · max-elements: 3
mode: name-after-meeting → explanation → management analogy with breaks note · blueprint: none
layout:
  contiguity: adjacent. Each statement points back to a widget row by name ("the photo tool row", "the settings row"). The term `image` is defined (`dfn`) in the first paragraph.
  pacing: continuous
  redundancy: don't re-list the widget's rows; refer to them. No figure: the widget's state 3 is the figure for this section.
  scaffold: analogy A1 in a `.cp-aside` labelled ANALOGY, with its WHERE THIS ANALOGY BREAKS line inside the same aside
ux: Read. One `dfn` (image), and "immutable" in plain words with the term once. One aside. At 360px the aside is full width.
figure: none
widget: none
checks: none
content: these points, in order:
  - **What's in it** (c-01). An image is the app's code packed together with what it needs to run: the runtime, the libraries, tools like the photo resizer, and the files it starts with. It's built once, as a file. Anyone who runs it gets exactly those versions.
  - **Onboarding** (c-01 note; inference). A new engineer runs the image instead of spending a week installing things.
  - **What's left out, on purpose** (c-02, c-06). Settings that differ between places, like the database address and passwords, are handed to the app when it starts. That's why one image can serve staging and production (one or two sentences; Ch 9). The data the app writes, like orders, is kept outside too, so replacing the app doesn't wipe it (Ch 10 preview, without the word "volume"). This is the m-19 revisit. The code wasn't the whole app, and the image isn't either.
  - **Immutable** (c-04). Once built, an image can't be changed. A change means a new image with a new version label, as with v42 → v43 in the widget. The old one stays exactly as it was. Tie it back to Ch 1: nobody can hand-edit a built image, so it can't drift. What was tested is exactly what ships.
  - **A1, the pre-imaged laptop.** "Many companies don't hand a new hire a setup checklist. IT gives them a laptop copied from one master setup, so everyone starts the same." **Where this analogy breaks:** "An IT laptop starts drifting on day one, as people install things on it. An image can't be changed at all; each copy starts fresh from it, and any change means a new image. And IT's master copy includes the operating system's core. An image leaves it out, which matters in a moment."

### s-04 — Build once, run many: images and containers
intent: Distinguish the image (a package kept in a registry) from containers (the image running), show one image running as many containers on many machines, and show that changes made inside a container vanish when it's replaced.
objectives: o-2
claims: c-05, c-06, c-07, c-02, c-03, c-09
readiness: novice · interactivity: low to medium (image, registry, container, replaced containers) · max-elements: 3
mode: labelled figure → name-after-meeting → analogy with breaks note → apply check · blueprint: none
layout:
  contiguity: inline. "registry", "image" and "container" are labelled on f-01 in the prose's words. `registry` and `container` are each defined (`dfn`) in the sentence right after the figure.
  pacing: continuous
  redundancy: the f-01 caption gives the takeaway (build once; every machine runs the same package; one image, many containers) and the prose doesn't walk the arrows
  scaffold: analogy A2 in a `.cp-aside` (ANALOGY + WHERE THIS ANALOGY BREAKS); container internals get one sentence
ux: Look at f-01, read about three short paragraphs and the aside, then commit to k-04. At 360px f-01 stacks vertically (build → registry → machines), and the option buttons stack.
figure: f-01, one image, many containers. See ## Figures.
widget: none
checks: k-04
content: these points, in order:
  - f-01.
  - **The registry** (c-07). Riley builds v43 once and puts it in a `registry`, a shared store of images. Laptops, staging and production each download ("pull") that same image.
  - **The container** (c-05). Running an image gives you a `container`: the app running as a process, walled off by the operating system with its own files from the image and its own view of what's running. That's the one sentence on internals. One image can run as many containers, on one machine or many (production in f-01 runs two).
  - **Changes vanish** (c-06). A container can write files, but when it's replaced, which every release does, those changes go with it, and the new container starts fresh from the image. This is the setup for k-04.
  - **A2, shipping containers.** "The name comes from shipping containers. Before them, cargo was loaded piece by piece, differently at every port. After them, any ship, crane or truck moves the same sealed box without caring what's inside." Engineers call this promise "build once, run anywhere." **Where this analogy breaks** (c-09, c-02, c-03): "A shipping container doesn't care which ship carries it. A software container does: it needs a machine with the right kind of processor, and its settings are handed in when it arrives. Outside services, like the database, may differ too. 'Run anywhere' means the inside is the same everywhere, not everything around it." This plants local-02.
  - **Docker** (optional single sentence): "You'll hear the name Docker in these conversations. The next chapter places it."
  - k-04.

### s-05 — Not a small VM
intent: Confront "a container is just a small VM". Show that containers share the machine's operating system core while each VM carries its own, and draw the consequences: smaller, faster to start, more of them per machine, and a thinner wall.
objectives: o-3
claims: c-10, c-11, c-12
readiness: novice · interactivity: medium (own OS vs shared kernel; size and speed; isolation strength) · max-elements: 3
mode: predict (pre-question, misconception confrontation) → labelled comparison figure → explanation → analogy with breaks note · blueprint: none
layout:
  contiguity: inline. "kernel", "shared" and "own OS + kernel" are labelled on f-02. The kernel gloss sits in the sentence directly before f-02, after k-05's reveal.
  pacing: continuous. k-05 comes first. f-02 is placed after k-05's reveal so it doesn't give the answer away.
  redundancy: the f-02 caption states the takeaway and the hedge ("typical, not guarantees"); the prose doesn't re-read the stacks
  scaffold: analogy A3 in a `.cp-aside` with its breaks note
ux: Commit to k-05, read the gloss, look at f-02 (two machine panels side by side), read about three short paragraphs and the aside. At 360px f-02's panels stack vertically, each full width.
figure: f-02, one machine, two ways. See ## Figures.
widget: none
checks: k-05
content: these points, in order:
  - Sam's line: "a container is basically a small VM", then k-05.
  - **Kernel gloss** (c-10 note): "the core of the operating system: the part that runs the hardware and every process on it."
  - f-02.
  - **Smaller and faster** (c-11, medium; keep the hedge). Because a container skips carrying and booting an operating system, it's typically measured in tens to hundreds of megabytes and starts in seconds. A VM is typically gigabytes and takes tens of seconds to minutes. Write "typically" or "roughly". No measured figures.
  - **More per machine** (c-10). Without an operating system copy each, many more apps fit on the same machine. Never give a number or a multiple; no sourced figure exists.
  - **Thinner wall** (c-12). Containers on a machine share one kernel, so a flaw in it is shared. That's why providers that run many customers' containers side by side wrap each customer's in a lightweight VM (AWS does this for some of its services). Don't swing to "containers are insecure": for a company running its own code the trade-off is usually fine.
  - **Layers, not rivals** (c-10 note). In the cloud, the machine running your containers is usually itself a VM, so containers and VMs are layers, not rivals.
  - **A3, houses and apartments.** "A VM is a house: its own foundation, plumbing and wiring. A container is an apartment: its own locked door, sharing the building's foundation and plumbing. Cheaper and denser, and a burst main pipe reaches every flat." **Where this analogy breaks:** "Containers usually run inside a VM, apartments inside a house, which the picture can't show. And it says nothing about how fast a container starts."

### s-06 — The conversation
intent: Rehearse the chapter's discussion move. Answer "Let's containerize everything" with the question about the machine dying, find out what does happen, and leave with the list of jobs containers don't do, as the open question for Ch 3.
objectives: o-4
claims: c-05, c-06, c-02, c-03
readiness: novice · interactivity: low · max-elements: 3
mode: apply (choose the response; interleaved distractors) → predict (misconception confrontation, local-01) → short list → recap → open question · blueprint: none
layout:
  contiguity: adjacent. Sam's line is a quoted line directly above k-06. k-07 follows k-06's reveal ("So ask it."). The "what's left" list comes right after k-07's reveal.
  pacing: continuous
  redundancy: the recap is three lines and doesn't re-explain. The "what's left" list is phrased as questions and doesn't teach Ch 3's answers.
  scaffold: none
ux: Two checks, a four-question list, a three-line recap and a closing line. At 360px everything stacks.
figure: none
widget: none
checks: k-06, k-07
content: these points, in order:
  - Sam's line, then k-06, then k-07.
  - **What containers leave open**, as four questions: "Who notices the machine died? Who starts its containers again, and on which machine? What happens to anything written only on that machine? Once there are many machines, who decides what runs where?" Then: "Those jobs have a name. We'll name it in the next chapter." Use no ledger term from Ch 3 onward: no orchestration, Kubernetes, cluster, node or pod.
  - **Recap**, three lines: "An image packs the app with what it needs, so every machine runs the same thing, and a version gap shows up on your laptop instead of in production." / "An image never changes; containers are copies of it, running, and they start fresh each time." / "Containers share the machine's operating system core: lighter than VMs, with thinner walls, and they still die with their machine."
  - **Open question:** "A year from now, Fennel runs its containers on eight machines, and that question becomes Sam's 3 a.m. job."

## Figures

Simple figures are drawn by the page builder as figure plates (Control Plane `Figure` treatment: mono header bar, blueprint ground, direct labels, numbered caption), following ## Visual grammar. Both figures re-layout under 600px rather than scale. Text is never below 13px.

### f-01 — One image, many containers (s-04)
- **Model.** Left to right on desktop:
  1. **Build.** A small machine frame `MACHINE · RILEY'S LAPTOP` with a line "build fennel-app:v43", then an arrow labelled "push".
  2. **Registry.** A frame `REGISTRY` holding three image chips stacked: `fennel-app:v41`, `fennel-app:v42` and `fennel-app:v43`. v43 is at full ink in c1; v41 and v42 are at reduced opacity. A direct label on the v43 chip reads "image: the package, never changes". A small label under the stack reads "every version kept as it was".
  3. **Pull.** Three arrows labelled "pull" go to three machine frames, stacked vertically:
     - `MACHINE · RILEY'S LAPTOP`: one container chip `fennel-app:v43` with a lamp and RUNNING;
     - `MACHINE · STAGING`: one container chip;
     - `MACHINE · PRODUCTION`: **two** container chips, with the label "two containers, one image".
     
     A direct label on one container chip reads "container: the image, running". Each machine frame also has one small c2 row, "settings: test" / "settings: staging" / "settings: production", with the label "handed in at start" on the production row only.
- **Display.** Direct labels only, no legend. The laptop appears twice, as builder and as runner; the build frame is labelled "build" so this reads as intended.
- **Caption (takeaway).** "Fig. 01. Build the image once and keep it in the registry. Every machine runs containers from that same package, and one image can run as several containers."
- **Size.** Desktop `.d-wide` (≤ 960px), about 340px tall. Under 600px it stacks vertically: build → "push ↓" → the registry (chips in one row, wrapping) → "pull ↓" → the three machine frames stacked, each about 72–96px tall. About 640px tall at 360px.
- **Build as HTML/CSS** (flex layout plus glyph arrows → / ↓, or a small inline SVG for the arrows), not one monolithic SVG. The container chip and the machine frame holding chips then become copyable components. This is the reuse hook for Ch 3.
- **Reuse.** Candidate: Ch 3's placement widget, which needs "a machine holding several containers". The container chip (c1-soft fill, c1 stroke, lamp, mono image label) and the machine-frame-with-chips are exactly that visual. Ch 3 would add chip *size* (resource use) as a parameter. Ch 2 doesn't, because size isn't part of this chapter's model. Worth designing for now because it costs nothing extra: name the classes (e.g. `.cp-machine`, `.cp-ctr`) and keep the chip markup data-driven from a small array in `page.js`, as Ch 1 did for f-01. Ch 6 (rollouts: v42 containers replaced by v43) and Ch 15 are later candidates. Static figure: later chapters may change it freely.

### f-02 — One machine, two ways (s-05)
- **Model.** Two machine panels of the same width, side by side.
  - **Left: `MACHINE · RUNNING 3 VMS`.** From the bottom:
    - a band "HARDWARE: processor, memory, disk";
    - a band "VM SOFTWARE";
    - three VM frames (`VM`), each holding, from the bottom, a c2 row "OS + kernel", a c2 row "runtime, libraries" and a c1 row "app".
    
    A direct label on one VM reads "each VM: a whole operating system · typically gigabytes · boots in tens of seconds to minutes".
  - **Right: `MACHINE · RUNNING 3 CONTAINERS`.** From the bottom:
    - a band "HARDWARE";
    - one wide band "OS KERNEL · SHARED BY ALL", in c2 with a 3px emphasis stroke, the only emphasised element in the right panel;
    - three container chips, each holding a c2 row "runtime, libraries" and a c1 row "app". There is no OS row.
    
    The chips are visibly shorter than the VMs, leaving an empty dashed (c6) region labelled "room for more". This is qualitative: no number, no multiple. A direct label on one chip reads "each container: the app and what it needs · typically tens to hundreds of MB · starts in seconds". A callout on the shared band reads "one shared core: lighter, and a thinner wall between containers".
- **Caption (takeaway + hedge).** "Fig. 02. Each VM carries a whole operating system. Containers share the machine's one kernel, so each is smaller and quicker to start, and the walls between them are thinner. Sizes and times are typical, not guarantees."
- **Size.** Desktop `.d-wide`, two panels each ≤ 460px wide, about 320px tall. Under 600px the panels stack (VMs first, then containers), each full width and about 300px tall. The direct labels move below each panel's frame as two-line captions inside the plate, not overlaid.
- **Reuse.** Candidates: Ch 11 (isolation; namespaces aren't strong walls, m-14) and Ch 14 (alternatives: plain VMs vs containers). Drawing conventions only. Not worth parameterising now.

## Visual grammar

This extends Ch 1's grammar (CURRICULUM §5 Visuals column), which is unchanged:
- machine = an outlined frame with a mono `MACHINE · NAME` bar;
- code in c1;
- things on the machine as c2 rows under RUNTIME / LIBRARIES & TOOLS / CONFIG / DISK & DATA;
- clutter and unknowns in c6 dashed;
- status as word plus colour.

New in Ch 2 (proposed for the Visuals column, R5):
- **Image:** a frame in c1 stroke on c1-soft, with a mono header `IMAGE · fennel-app:v42`, holding the rows it contains. In compact form, a **chip** with the image label and no lamp (registry).
- **Container:** the same chip plus a square lamp and the word RUNNING, inside a machine frame. This carries Ch 1's "process = code row with lamp + RUNNING": a container is that process, packaged.
- **Registry:** a frame with a mono `REGISTRY` bar holding a vertical stack of image chips. Older versions are at reduced opacity, never deleted from the drawing.
- **Kernel:** a full-width c2 band labelled `OS KERNEL`. It is `SHARED BY ALL` under containers, and per-VM as "OS + kernel" inside each `VM` frame.
- **Comparison markers** (w-samecode): SAME (`good`) and DIFFERENT (`warn`) beside a row, and IDENTICAL for the code row (Ch 1's word). PASS / FAIL for the result row. Every status is a word plus colour.
- **Band labels** in the widget: mono uppercase group headers spanning both machine columns: INSTALLED BY HAND ON EACH MACHINE, IN THE IMAGE · fennel-app:v42, NOT IN THE IMAGE.

## Widgets

### w-samecode
segment: s-02
complexity: high
blueprint: B4 (contrasting cases in aligned rows) with B1-style step-locking across three states; two predict-then-reveal gates
model: Two machines, "Riley's laptop" and "Production", share one row list. Each row has a category, a label, a per-state value for each machine, and a computed marker: IDENTICAL for the code, SAME if the values are equal, DIFFERENT if not. Rows are grouped under a per-state band. A result row, "Upload a product photo", gives PASS or FAIL per machine. It is computed from the rule "PASS iff the photo-tool value on that machine is 7.0 or later" (Riley's code uses an option that arrived in 7.0). Nothing is hard-coded per state. All words live in `data.js` (see reuse). Claims: c-01 (image contents), c-02 (settings handed in at start), c-03 (stack differences cause production-only failures), c-04 (immutable; a change means a new image), c-06 (data kept outside).
  - **Rows**: category · label · state 1 (laptop / production) · state 2 · state 3:
    - CODE · "Fennel app code, with Riley's change" · same / same in every state → IDENTICAL, with the note "Same code."
    - RUNTIME · "Language runtime (Python)" · 3.12 / 3.12 in every state → SAME
    - LIBRARIES & TOOLS · "Libraries the code uses" · "same versions" / "same versions" in every state → SAME
    - LIBRARIES & TOOLS · "Photo-resizing tool" · **7.0 / 6.2 → DIFFERENT** · 6.2 / 6.2 → SAME · 7.0 / 7.0 → SAME
    - *(state 3 only)* CONFIG · "Settings (database address, keys)" · "test" / "production" → DIFFERENT, with the note "handed in at start, by design"
    - *(state 3 only)* DISK & DATA · "Data (orders)" · "test orders" / "real orders" → DIFFERENT, with the note "kept outside the container"
  - **Bands**:
    - state 1: all four rows sit under "INSTALLED BY HAND ON EACH MACHINE";
    - state 2: the code, runtime, libraries and photo tool rows sit under "IN THE IMAGE · fennel-app:v42", spanning both columns, drawn as an image frame (## Visual grammar);
    - state 3: the same band reads "IN THE IMAGE · fennel-app:v43", and a second band, "NOT IN THE IMAGE", holds the two new rows.
  - **Result row**:
    - state 1: laptop PASS (shown from the start); production hidden ("?", `aria-label` "not run yet") until k-02 is committed, then FAIL "error: unknown option";
    - state 2: both hidden until k-03 is committed, then FAIL / FAIL. The laptop's FAIL carries the tag "caught before release";
    - state 3: PASS / PASS, shown when the state opens.
reader_does: Commit to k-02. Tap "Next: pack it in an image". Commit to k-03. Tap "Build fennel-app:v43 with photo tool 7.0". "Start over" is always available. There's nothing else to manipulate: the contrast is the lesson, and the commitments make it Constructive.
  - **State 1, "Installed by hand".** Lead: "Riley joined last month and spent the first week installing tools on a new laptop. Riley's change uses a photo option that arrived in version 7.0 of the photo-resizing tool. Production still has 6.2, installed by Sam in Year 0." Rows as above. The photo row's DIFFERENT marker is visible from the start: the reader is meant to notice it. k-02 sits below (mobile) or beside (desktop) the rows. On commit, the production cell flips to FAIL with a 200ms highlight, and the feedback appears in place. A one-line follow-up under the result row reads "Riley runs it again on the laptop: it works. 'Can't reproduce.'" Then the button "Next: pack it in an image".
  - **State 2, "One image".** Lead: "Sam packs the code, runtime, libraries and photo tool into one sealed package, an image called fennel-app:v42. Sam built it to match production, so it holds photo tool 6.2. Now Riley's laptop and production both run that same image." The rows move under the IMAGE band, and the photo row now reads 6.2 / 6.2 SAME, with the changed cell highlighted for 200ms. The result cells are hidden. k-03 appears. On commit: FAIL / FAIL, the "caught before release" tag on the laptop, and the feedback. Then the button "Build fennel-app:v43 with photo tool 7.0".
  - **State 3, "A new image".** Lead: "An image can't be edited. To change the photo tool, Riley builds a new image, fennel-app:v43, with 7.0 inside. v42 stays exactly as it was." The photo row reads 7.0 / 7.0 SAME, and the result is PASS / PASS. The NOT IN THE IMAGE band slides in below with its two rows, both marked DIFFERENT, each with its note. Summary line: "Same image on both machines, so the photo tool can't differ. What's outside the image still can, and that's on purpose."
shows: Every state is labelled on its referent.
  - Stage header with counter: `STATE 2 / 3 · ONE IMAGE`.
  - Machine names as column headers.
  - Version strings in the cells, and markers beside each row.
  - Band labels spanning the columns.
  - PASS / FAIL words in the result row.
  - Check feedback in place, under the options.
  - Control Plane `cp-widget` panel: lamp, mono bar `W-01 · SAME CODE, TWO MACHINES`, hard offset shadow.
  - An `aria-live="polite"` sentence announces each change, for example: "Production: photo upload FAIL, error: unknown option."; "State 2 of 3: one image. Photo tool 6.2 on both machines."; "Both machines: photo upload PASS."
  - Under reduced motion, highlights and the band slide-in are instant.
size: desktop `.d-wide` (≤ 960px). Two columns: the row table on the left (about 58%; label column flexible, two status columns about 96px each, marker column about 88px), and the check panel on the right (about 42%). The state lead runs across the top. Reserve min-height 600px. Mobile (< 600px): full width, single column, in order: bar, state header, lead, row table (label column flexible with the SAME / DIFFERENT marker as a tag under the label; two status columns 72px each), result row, check panel. Reserve min-height **960px at 360px**. That estimate is the tallest state, state 2 with feedback open: about 170px header and lead, 340px table, 380px check and feedback, 52px button. All three states stack in one grid cell (w-rebuild's technique) so the widget is always as tall as its tallest state and state changes never move the page. The builder measures the tallest state at 360px and reports it if it exceeds 960px by more than 10%. No horizontal scroll at 360px; text ≥ 13px; touch targets ≥ 44px.
acceptance: ac-03, ac-04, ac-05, ac-06, ac-07, ac-08
reuse: **Decision: adapt Ch 1's `w-rebuild` stage-4 comparison; don't reuse the whole widget.** Copy `w-rebuild`'s `data.js` schema, its stage-4 aligned-row renderer (`panel4`, `statusCell`, including the existing `versions` hook), its row and status CSS, its check pattern (commit → CORRECT / NOT QUITE → "why the other answers miss") and its stacked-states height technique into this run's `site/widgets/w-samecode/`. Never edit Ch 1's files.
  - **What to drop:** stages 1–3 (inventory, notes, launch checks and diagnosis).
  - **What to add:** a state stepper with per-state cell values, band rows spanning the columns, the image-frame band styling, hidden result cells gated on a check, and the computed SAME / DIFFERENT marker.
  - **Pedagogical reasons:** the aligned two-machine rows are exactly the B4 contrasting-case layout this chapter needs. Drawing the machines the way Ch 1 did makes s-01's retrieval visual: same frame, same rows, same photo tool. Ch 1's rebuild stages would replay Ch 1's lesson and cost about 5 minutes. Reader-visible complexity goes down: three states and one button, against Ch 1's four stages and fifteen-odd taps.
  - **Later candidates:** Ch 15 (capstone scenarios that compare two environments, e.g. "passed in staging, fails in production"), and possibly Ch 9 (the same image with different settings per environment).
  - **What to parameterise in `data.js`:** machine names; rows (category, label, per-state per-machine value, note, band); bands per state; the result rule (a row id and a minimum value); per-state leads, checks and buttons.
  - **Not a target:** Ch 3's placement widget. Its model is capacity and placement, not contents. It should share f-01's container-chip visual instead.
  - **Is reuse worth designing for now?** Only to the extent of keeping all words and rows in `data.js`, which costs almost nothing. No generic framework, and no reader-visible options.

## Comprehension items

### k-01
segment: s-01
objective: o-1
type: retrieve
prompt: In the last chapter you rebuilt Sam's server from Sam's notes, with exactly the same code. Why did uploading a product photo fail on the new machine?
options: A) The notes installed an older copy of the code, from before the photo feature was added. · B) Sam had installed the photo-resizing tool by hand, and the notes never mentioned it. · C) The new machine had less memory than Sam's, so resizing large photos ran out of room. (correct: B)
feedback: A: "The code was identical on both machines; that was the point of the rebuild. The difference was on the machine." B: "Right. The tool lived only on Sam's server, added by hand in May. That's a snowflake server: part of its real setup exists only on the machine itself." C: "Memory wasn't it. The new machine was missing a program altogether: the photo-resizing tool Sam installed by hand in May." All three end with the same line: "A year on, that kind of gap isn't on one server. It's on every laptop."

### k-02
segment: s-02
objective: o-1
type: predict
prompt: Riley's change passes every test on the laptop. The code is identical on both machines. What happens when the change ships to production?
options: A) Photo upload fails in production, while on Riley's laptop it keeps working, so nobody can reproduce it. · B) Photo upload works in production too: the code is identical, and it passed every test on the laptop. · C) The release refuses to install on production at all, because the two machines' tools don't match. (correct: A; tempting: B, m-19)
feedback: A: "Right. Riley's code asks the photo tool for an option only 7.0 understands. Production has 6.2, so uploads fail there and only there. On the laptop it works every time. That's a 'can't reproduce' bug." B: "That's 'the code is the app' again. The tests ran on Riley's laptop, with photo tool 7.0. Production has 6.2, which doesn't know the option Riley's code uses." C: "Nothing checks the tools when new code is copied over. The release installs and runs. It fails later, the first time a customer uploads a photo."

### k-03
segment: s-02
objective: o-1
type: predict
prompt: Both machines now run the same image, fennel-app:v42, which contains photo tool 6.2. Riley tests the same change on the laptop. What happens?
options: A) The tests pass on the laptop and photo upload fails in production, just as it did before the image. · B) Photo upload works on both: the image packages the tool, so the version problem is solved. · C) The tests fail on Riley's laptop, the same way the change would have failed in production. (correct: C; tempting: B)
feedback: A: "Not any more. The laptop no longer uses the 7.0 Riley installed. It runs what's in the image, 6.2, exactly like production." B: "The image doesn't change what's inside it. It holds 6.2, and Riley's code needs 7.0. What it changes is where you find out." C: "Right. Same image, same photo tool, same failure, but now on Riley's laptop, before release, where it costs Riley ten minutes instead of costing customers a broken feature."

### k-04
segment: s-04
objective: o-2
type: apply
prompt: Saturday night, photo uploads break in production. Riley connects to the running container and fixes the problem by hand, inside it. It works. On Tuesday, Fennel releases its next version. What happens to Riley's fix?
options: A) It's gone: Tuesday's release starts new containers from the image, and the image never had the fix. · B) It stays: the fix was made on the production machine, so it remains there for the next release. · C) It spreads: changes made inside a running container are saved back into its image for next time. (correct: A; tempting: B)
feedback: A: "Right. A container starts fresh from its image, and changes made inside it disappear when it's replaced. To keep a fix, put it in a new image. That's also why containers don't drift the way Sam's server did." B: "On Sam's server it would have stayed, and that's exactly how drift built up. Here the fix lived inside one container, and the release replaces it with fresh ones from the image." C: "An image never changes after it's built. Nothing flows back from a container into its image. A fix has to go into a new image, built on purpose."

### k-05
segment: s-05
objective: o-3
type: predict
prompt: Sam says a container is basically a small VM. Before you read on, which of these is closest to what a container actually is?
options: A) A small virtual machine: it boots its own trimmed-down operating system, just a lighter one. · B) A compressed copy of a whole machine: it unpacks on any machine into an exact clone of the original. · C) A walled-off process: it carries the app's own files but uses the machine's operating system core. (correct: C; tempting: A, m-01)
feedback: A: "That's the common picture, and it's why containers get drawn like little VMs. But a container doesn't boot an operating system of its own; it runs on the machine's operating system core. That's exactly why it's small and quick to start." B: "That's closer to last chapter's VM snapshot, clutter and all. An image holds only the app and what it needs, and a container is that image running as a process." C: "Right. A container is a process, like any running app, with walls around it: its own files from the image, its own view of what's running. Underneath, it shares the machine's operating system core with every other container there."

### k-06
segment: s-06
objective: o-4
type: apply
prompt: At the planning meeting, Sam says: "Let's containerize everything." What's the most useful thing Jordan can ask?
options: A) "Great for consistency. So once a release passes staging, can we skip checking production?" · B) "Great for consistency. And what happens when the machine running those containers dies?" · C) "Great for isolation. If containers are walled off like VMs, can we stop paying for VMs?" (correct: B; tempting: A, local-02; C, m-01)
feedback: A: "The image is identical in staging and production. But settings handed in at start, outside services like the database, and the machine's processor can still differ. Passing staging is strong evidence, not proof." B: "Right. It welcomes the consistency, then asks about the one thing containers don't change: they still run on a machine, and machines die." C: "Containers' walls are thinner than a VM's, and in the cloud your containers usually run inside VMs anyway. It's not one or the other."

### k-07
segment: s-06
objective: o-4
type: predict
prompt: So ask it. Saturday, 3 a.m.: the production machine running all of Fennel's containers dies for good. What happens?
options: A) The containers keep running: each is walled off from the machine, so its failure doesn't reach them. · B) The containers restart on another machine within seconds, since each can be re-created from its image. · C) Everything on it stops, until someone starts each of its containers again on another machine. (correct: C; tempting: B, local-01)
feedback: A: "The walls are between containers, not between a container and its machine. A container is a process on that machine; when the machine goes, so do its containers." B: "Half right. Re-creating a container from its image really does take seconds. But nothing in an image or a container notices the machine died, picks another one and starts them there. Someone has to." C: "Right. Containers turn a day of rebuilding into minutes of restarting, a real improvement on Year 0. But someone still has to wake up, know what was running there, and start each one somewhere else. And anything written only on that machine is at risk."

## Acceptance criteria

- ac-01 (s-01, k-01): The page opens its first section with k-01, a retrieval question about Ch 1's rebuilt server, before any new term. The Year 1 symptoms then appear as a manager sees them (a week of onboarding, a production bug nobody can reproduce, staging and production drifting apart) before the widget.
- ac-02 (page): No Kubernetes, and no ledger term from Ch 3 onward (orchestration, orchestrator, Kubernetes, cluster, node, pod, volume, Deployment) anywhere in the body. Later jobs are only "we'll name it in the next chapter". "Docker" appears at most once in the body, without any claim about what it is beyond "a name you'll hear".
- ac-03 (w-samecode state 1, k-02): The rows show the code IDENTICAL, the runtime and libraries SAME, and the photo tool 7.0 vs 6.2 DIFFERENT. The production result is hidden until k-02 is committed, then reads FAIL. The "can't reproduce" line appears after the reveal. k-02's feedback on B names "the code is the app".
- ac-04 (w-samecode state 2, k-03): Only one thing changes between states 1 and 2: the rows now come from one image (the band), and the photo tool reads 6.2 on both machines. Both results stay hidden until k-03 is committed, then both read FAIL. The laptop's FAIL is tagged "caught before release". k-03's feedback on B says the image changes *where you find out*, not the bug.
- ac-05 (w-samecode state 3): The lead says the image can't be edited and v42 is unchanged. The new image v43 gives PASS on both. The NOT IN THE IMAGE band shows settings and data, both DIFFERENT, with the notes "handed in at start, by design" and "kept outside the container".
- ac-06 (w-samecode): Every status is a word plus colour (IDENTICAL, SAME, DIFFERENT, PASS, FAIL), never colour alone. An aria-live sentence announces each reveal and state change. Under reduced motion the highlights are instant. "Start over" returns to state 1 with all results hidden again.
- ac-07 (w-samecode, mobile): At 360px there's no horizontal scroll. The result row is directly above the check panel, so the reveal and the options are visible together. Text is ≥ 13px, touch targets are ≥ 44px, and state changes never move the content below the widget (all states share one reserved height).
- ac-08 (w-samecode, visual grammar): Machines, rows and categories are drawn as in Ch 1's `w-rebuild` stage 4. The IN THE IMAGE band is drawn as an image frame (c1 stroke on c1-soft). The code row is c1.
- ac-09 (s-03): `image` is introduced (`dfn`) after the widget, pointing back to its rows. The page says what's in it (code, runtime, libraries, tools) and what's deliberately not (settings handed in at start; data kept outside), framed as the m-19 revisit ("the image isn't the whole app either"). Immutability is tied to Ch 1's drift. Config gets no more than two sentences.
- ac-10 (s-04, f-01): `registry` and `container` are each introduced once, after f-01 shows them. f-01 shows one image running as two containers on one machine, and the same image on three machines. The page doesn't claim that a version label always points to the same image (tags vs digests are cut).
- ac-11 (s-04, analogies): A2's breaks line names at least the processor type and the settings handed in at start, so "run anywhere" reads as "the inside is the same everywhere".
- ac-12 (k-04): The tempting option (B) connects to Ch 1's drift, and the correct feedback states "to keep a fix, put it in a new image".
- ac-13 (s-05, k-05, f-02): k-05 is committed before f-02 or the kernel gloss appears. f-02 shows per-VM operating systems against one shared kernel. Sizes and start times are hedged ("typically"; tens to hundreds of MB vs gigabytes; seconds vs tens of seconds to minutes). No number or multiple is given for how many containers fit on a machine. The isolation cost is stated without "containers are insecure", and the page says containers usually run inside VMs in the cloud.
- ac-14 (analogies): A1, A2 and A3 each carry a visible "Where this analogy breaks" line in the same aside.
- ac-15 (s-06, k-06, k-07): k-06's correct option contains the chapter's question ("what happens when the machine running those containers dies?"). k-06's distractors carry local-02 and m-01. k-07's option B (local-01) gets "half right" feedback that keeps the true part (re-creation is fast). The "what's left" list is phrased as questions and teaches no Ch 3 mechanism. The page ends on the open question pointing to Ch 3.
- ac-16 (all checks): Every choice item is commit-then-reveal and explains why each tempting option is wrong. Options within an item are similar in length and equally measured: each states a verdict with a reason, and none is the only hedged middle option between two extremes. Keys vary (A: k-02, k-04; B: k-01, k-06; C: k-03, k-05, k-07). No scores.

## Curriculum recommendations

Recommendations only; CURRICULUM.md is unchanged.

- **R1 (§6 catalog): add local-01 as m-23, owned by Ch 2.** "Once everything is containerized, a machine failure is no longer a problem: the containers keep themselves running." Ch 2 confronts it (k-07). Ch 3's retrieval ("what containers don't solve") should reuse it, and Ch 4 resolves it. It is the container-level precursor of m-05 ("Kubernetes makes our app reliable by itself"), so Ch 15 can pair the two as distractors. Owner Ch 2, not Ch 3: Ch 2 is where the reader first holds the belief, the moment images make re-creation feel solved.
- **R2 (§6 catalog): add local-02 as m-24, owned by Ch 2 and revisited by Ch 9.** "If an image passed in staging, it will behave identically in production." Ch 2 plants and confronts it (the A2 breaks note, k-06 distractor). Its strongest remaining cause is settings and secrets that differ per environment, which is Ch 9's ground, so Ch 9 should revisit it, the same pattern as m-19. It also rhymes with m-09 ("rolling updates guarantee a safe release") in Ch 6; Ch 15 can use both.
- **R3 (§5 term ledger, Ch 2 row): add "(operating system) kernel, briefly".** Ch 2 needs it for o-3 (shared kernel vs own OS), glossed in one sentence. Ch 11 (isolation, multi-tenancy) will need it again.
- **R4 (§3 Fennel, after build): record Ch 2's story facts.**
  - **Riley** (they/them), a Year 1 engineer, who joined last month and spent the first week installing tools. Add to the cast.
  - Production's photo tool **6.2** vs Riley's laptop **7.0**.
  - Sam's first image **`fennel-app:v42`**, then Riley's **`v43`**.
  - The Saturday-night hand-fix inside a container that vanished at Tuesday's release (k-04).
  - In Year 1, production runs on **one rented machine**, plus a staging machine.
  
  Ch 3's Year 2 "about 8 machines" follows on.
- **R5 (§5 Visuals column, after build):** record ## Visual grammar's new conventions: the image frame and chip, the container chip with lamp and RUNNING, the registry stack, the kernel band, and the SAME / DIFFERENT markers. Reason: Ch 3's placement widget (a machine holding several containers) and Ch 6's rollout figure should draw containers the same way.
- **R6 (Ch 6 entry): pick up tags vs digests.** "A version label like `latest` can be moved to a newer image; only a digest pins one exact image" (Ch 2 research c-08, x-05), plus "old images can be deleted from a registry, so rolling back assumes someone kept them" (Ch 2 parking lot). Ch 2 cut both for time. Both matter most where Ch 6 talks about rollback ("which exact image is in production, and can we go back to it?"). Ch 6 already lists "Ch 2 (immutable images)" as retrieval.
- **R7 (Ch 3 entry):** (a) The retrieval opener can be Ch 2's k-07 ("the machine running the containers dies at 3 a.m.; what happens?"). (b) Ch 2 says once "you'll hear the name Docker; the next chapter places it", so Ch 3 must deliver that alongside m-02. (c) Ch 3's placement widget should reuse f-01's container chip and machine frame and add chip size, rather than adapt `w-rebuild`/`w-samecode`.
- **R8 (Ch 9 and Ch 10 entries):** Ch 2 states that settings are handed to a container at start, so one image serves staging and production (Ch 9 can point back), and that data written inside a container vanishes when it's replaced and must live outside it, without naming "volume" (Ch 10 can point back).
- **R9 (§2.1 or §8, sizing note):** Ask designers to give an honest minutes table per part in `## Shape`, as this plan does. Ch 1's overrun came from unestimated widget time, and a table makes it visible at the checkpoint.
