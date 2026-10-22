# Misconceptions

Catalog IDs from CURRICULUM.md §6 where they exist. Ch 3 owns m-02. local-01 to local-03 are new; local-01 and local-03 are candidates for catalog entries at the checkpoint. m-23 (Ch 2) is this chapter's retrieval opener and isn't repeated here.

### m-02
objective: o-3
misconception: "Docker and Kubernetes are the same thing", or the opposite version: "they're rival products, and we have to pick one."
why_tempting: The two names arrive together in every container conversation. Kubernetes was even launched at DockerCon 2014 (c-10 note). Headlines in 2020–22 said "Kubernetes drops Docker" (c-12), which sounds like a breakup between rivals. And Docker did ship its own orchestrator, Docker Swarm, which really did compete with Kubernetes (c-07).
counter: c-11, c-12, c-07, c-08
source: https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/
note: The Kubernetes project wrote the "Don't Panic" post because the runtime change caused this confusion ("So why the confusion and what is everyone freaking out about? We're talking about two different environments here"). The "10 Years" post calls the 1.24 removal one that led "to widespread user confusion". Fair correction: they do different jobs at different layers. Docker builds images and runs containers on one machine (Ch 2). An orchestrator such as Kubernetes keeps many containers running across many machines (c-07, c-08). Images built with Docker follow an open standard and run on Kubernetes (c-11). Most teams use both. A case where the misconception predicts wrongly: "we use Docker, so we already have what Kubernetes gives us". Then a machine dies at 3 a.m., and Docker on that machine can't move its containers anywhere (m-23). The honest nuance: at the orchestration layer only, Docker Swarm and Kubernetes were alternatives, and Kubernetes is by far the more widely adopted (model; don't quantify without a source).

### local-01
objective: o-3
misconception: "Kubernetes is Google's Borg, open-sourced", so "it's what Google runs on, and if it's good enough for Google it's right for us."
why_tempting: The official overview ties Kubernetes to "over 15 years of Google's experience running production workloads" (c-09 note), and retellings shorten that to "Kubernetes is Borg". The Google pedigree is the most quoted fact about it.
counter: c-09, c-10
source: model
note: No fetched source documents the belief itself, hence `model`. The facts: Kubernetes is a new, third system, influenced by Borg and Omega and open source from the start (c-09). As of 2016, Borg was still Google's main internal system (c-09 note). Since 2015 it has belonged to a foundation and been built by thousands of companies (c-10). The "good enough for Google" leap is Ch 14's question (Fennel isn't Google). Here, just state the history accurately and plant the doubt. Proposed catalog wording: "Kubernetes is Google's Borg, open-sourced (and what Google runs on)."

### local-02
objective: o-1
misconception: "If our machines have enough free capacity in total, a new or moved container will fit somewhere."
why_tempting: Capacity is usually reported as a total ("we're only at 40%"), and the idle-machines symptom (c-04) makes it feel like space is plentiful.
counter: c-03, c-05
source: model
note: A container runs on one machine, so it needs enough room on one machine, not in total. Leftovers scattered across machines can leave a larger container nowhere to go (c-03: 100 GB free in 10 GB pieces can't take a 20 GB job). The widget can make the reader hit this in phase 2: a machine dies, total free space is enough, and its biggest container still fits nowhere. The paradox for a manager: idle capacity everywhere *and* no room, both at once. Packing well by hand, again after every change, is the job that gets automated (c-08). Model inference from sourced mechanisms; Ch 5 owns the vocabulary (bin packing, pending).

### local-03
objective: o-3
misconception: "An orchestrator is a fancier deploy script: it puts containers on machines when we release."
why_tempting: Managers meet tools at deploy time, and most automation they know (CI pipelines, release scripts) runs once per release and stops.
counter: c-07, c-01, c-06
source: model
note: The definition says "throughout their lifecycle" (c-07). The jobs that cause pages, replacing after a machine dies and restarting after a crash (c-01), happen between deploys, at 3 a.m. That continuous work is the toil that scales with the service (c-06). The orchestrator keeps doing the jobs all the time, not once. Plant this. *How* it keeps doing them (a record of intent and loops) is Ch 4. Don't explain it here, and avoid the opposite trap of picturing one central brain issuing commands (m-03, c-07 note).
