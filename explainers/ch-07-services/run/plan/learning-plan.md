# Learning plan: Finding each other: services and traffic (Ch 7, Desired state: Kubernetes from the problems up)

<!-- Written by the instructional designer. Parsed by scripts/check_plan.py. Revision 0 (handoff 02). -->

## Shape

A narrative article set in Fennel's Year 3, told from the caller's side: `storefront` calls `orders` and `catalog` all day, and customers call `storefront` from their phones, while the Pods behind every service keep being replaced. It is built around **one scrollytelling lane** and static figures around it.
- **The pain, seen and felt.** The opener retrieves Ch 3's 03:04 (Sam passed on the new addresses by hand) and Ch 4's replacement Pod through the loop lens (k-01), then states the manager's symptom: on Ch 5's Tuesday, `storefront`'s log shows `connection refused` from `orders` three times. The felt pain is a predict check (k-02: a hand-copied list of `catalog`'s addresses after Thursday's rollback), revealed by a static figure of `catalog`'s addresses changing through one Thursday (f-01).
- **The Service, grounded before it is named or compared** (s-03): what Ari wrote (a name, a selector, a port) and what Kubernetes adds (a stable address, a DNS name, a list of ready Pods), as one figure (f-02), then the term card.
- **Lane S, "Thursday, 10:15, from `storefront`'s side"** (blueprint B1, on the pooled `renderCluster`): Ch 6's routine release once more, with one new element drawn, the `catalog` Service's list of ready Pods, kept current by the endpoints loop while `storefront`'s setting never changes. Gated at mid-rollout on k-03 (which Pods answer when old and new are both ready).
- **Where a call goes (m-10)** as a predict-then-reveal (k-04, then f-03: one call from `storefront` to `orders`, with no Service program anywhere on its path), followed by the analogy aside with its breaks.
- **Tuesday's incident explained** (k-05, then f-04: two snapshots from the lane's data file, the `orders` list empty while its only Pod restarts, then refilled).
- **Getting in from the internet** (s-07): the cloud load balancer and the gateway, a trace check (k-06) revealed by a static trace figure (f-05), and one provider's prices at a date.
- **The loop lens table** (f-06) and **the conversation** (k-07).

**Why this form.** The chapter's content is a *mechanism with a process inside it* (a list that follows the Pods as they change) plus *a route* (a request from a phone to a Pod). The course's form for a process is a scrollytelling lane (CURRICULUM §8 step 7), and the best scene for it is one the reader already knows: Ch 6's lane R, the same nodes, Pods and timings, with only the Service's list added. That makes the lane a whole-task layering (4C/ID): the reader holds Ch 6's rollout as one chunk and watches one new element respond to it, so each change on the list sits next to the Pod change that caused it (READY → listed; STOPPED → off). A static table of the list at four moments would show the same values but split the cause (the Pods) from the effect (the list), and lose the gate at mid-rollout. The route is a structure, not a process, so it is a static figure. The two cause-and-effect surprises (no server in the path; an empty list refuses calls) are predict-then-reveal with figures, as in Ch 6.

**Rejected alternatives.**
- *The entry's hands-on widget* (Pods appear and disappear; the reader keeps a hand-written address list current, then a Service does it). The pain is real (§2.1), but the reader has already felt it once, in Ch 3's k-03 (`orders` running at a new address while `storefront` kept calling machine 03), and the doing would be typing or tapping addresses, which Ch 3's checkpoint rejected as busywork. What the reader must take away is a prediction ("a hand-kept list is behind after every replacement, even after a rollback to the same version"), and a committed prediction with a surprising reveal (k-02 → f-01) gets the same surprise at about a fifth of the reader's time and with no widget builder. In the cut list, and checkpoint Q6.
- *A lane on Tuesday's incident instead of the rollout.* It would teach the empty list, but not the list following a rollout (Ch 6's bridge, R5's "old and new side by side") or the endpoints loop at work over several changes. The incident is a single moment and its recovery, which two snapshots show (f-04).
- *Two lanes* (rollout and incident). About 1.5 extra minutes and a second step set, for a second process the reader can get from two snapshots.
- *Opening on the load-balancer bill.* Cost is the chapter's last idea and needs the Service and the gateway first; it frames the conversation instead.

**Honest sizing** (CURRICULUM §2.10). Estimated reader time including reading, thinking, the lane and the checks. Disclosures are optional and not counted (about 0.25 min each if opened).

| Part | Minutes |
|---|---|
| hero + s-01 (cast strip, D1, k-01, Sam's 03:04 and now, Tuesday's log, Jordan and Ari) | 2.5 |
| s-02 (addresses that don't stay put: one paragraph, k-02, f-01, debrief) | 1.75 |
| s-03 (the Service: f-02, TERM 01, DNS name, the two meanings of "service", D2) | 2.25 |
| s-04 (scene set-up, lane S: 4 steps ≈ 1.75 incl. k-03, the endpoints loop's lens, it doesn't check health, side by side and the canary) | 3.5 |
| s-05 (the fair part, k-04, f-03, kube-proxy, spread at random, the analogy aside, D3–D4) | 2.5 |
| s-06 (Tuesday: k-05, f-04, why, the fix and the question, D5) | 2.0 |
| s-07 (getting in: inside only by default, TERM 02, TERM 03, Fennel's set-up, k-06, f-05, what each costs, D6) | 3.0 |
| s-08 (the loops so far: f-06) | 0.75 |
| s-09 (the conversation k-07, recap, bridge) | 1.75 |
| **total** | **about 20** |

Of that, checks are about 3.75 minutes (six choice checks at about 0.5, one think-then-reveal at 0.75) and the lane about 1.75 (including k-03). This chapter carries Ch 6's load (seven checks, one lane, six figures, three term cards), and Ch 6 planned 22 and was measured at about 27 by its reviewer, so the built page will probably read at **22–25 minutes**. `cut-list.md` `## If it runs long` recovers about 3 minutes in ranked order without losing an objective.

**One chapter, not a split (checkpoint Q1).** The only seam (inside the cluster, s-01–s-06, vs. getting in from outside, s-07–s-09) would leave a second part of about 6 minutes, too small for a chapter, and the conversation needs both halves (internal calls need no load balancer).

toc: yes — nine h2 sections and a read of about 20 minutes or more; a rail on desktop and a collapsed "Contents" on mobile, as in Ch 1–6.
tokens: user-provided: Control Plane style guide, `design/control-plane/`. Use the course tokens from the shared pool (`pool/tokens.css`) and the pool's kit files as `pool/<file>` (CURRICULUM §8 steps 4–5); follow README.md, the tokens.json notes and `components/bundle.css`. Chapter-only CSS and JS go in `site/assets/`. The page builder may read Ch 6's `site/assets/page.css` / `page.js` as the reference implementation of the course's page components (cast strip `.cp-cast`, disclosure `.cp-more`, checks `.cp-check` with the `didactician:check-commit` event, `data-after` and the collapsed locked plate, term card `.cp-term` with the payoff variant, `.cp-aside` with `.cp-breaks`, `.cp-dialog`, `.cp-recap`, manifest figure `.mf`, the loop lens table builder) and reimplement them in this chapter's `site/assets/`; it never edits Ch 6's files.
mobile: supported. The lane follows §8 step 7 (canvas sticky at the top under 900px, ≤ 50vh; inline snapshots per step where it wouldn't fit or the viewport is under 560px tall); two node columns, as in Ch 6. f-04 stacks its two panels under 900px. f-01, f-02, f-03, f-05 and f-06 re-lay out under 600px; they don't scale.

**Course voice** (style guide): second person, present tense, sentence-case headings, no exclamation marks, no emoji. Status always travels as a word plus colour. Kubernetes kinds are capitalised (Pod, Deployment, Service); "node" stays lowercase (CURRICULUM §2.12). Fennel's services stay lowercase in code font (`orders`); the Kubernetes kind is "Service" (s-03 says once that each Fennel service has a Service of the same name). Loops are named in plain words: *the endpoints loop*, *the Deployment loop*, *the node agent*; *kube-proxy* is named as engineers say it (s-05).

**Prose rules (binding on the builder; from the user's human reviews, in the brief's Lessons):**
- Flowing sentences of varied length, with cause and effect spelled out: what was the case, what changed, what acted, what the caller got. No chains of fragments. Clear active verbs.
- **Don't compress prose to hit the time budget.** The minutes above are an estimate, not a word limit.
- **Set up every scene before its lane or figure.** §04 opens with which release this is (Ch 6's 10:15, glossed for readers who skipped it), where `catalog` runs, what is new on the canvas (the Service's block, the list), and the loop that keeps the list, named and grounded before it acts. §06 sets up Tuesday (Ch 5's restarts, glossed) before k-05.
- **Ground every component before it acts.** The Service is shown as a record and what Kubernetes adds (s-03) before the lane shows its list change; the endpoints loop is introduced in the scene set-up (where it runs, what it watches, since when) before the lane shows it acting; kube-proxy is introduced (what it is, where it runs, what it writes) in s-05 before f-03 credits it with anything; the cloud load balancer and the gateway are each said to be what they are (a provider's machine; a set of routing rules carried out by a controller) before the trace uses them.
- **No unexplained analogies.** The one analogy (a team's support line) comes after the mechanism and after m-10's reveal, maps each part explicitly, and carries a WHERE THIS ANALOGY BREAKS line in the same aside.
- **Name who does what.** Ari wrote each Service at the move; Kubernetes assigns its address; the cluster's DNS answers its name; the endpoints loop keeps its list; kube-proxy on every node turns lists into forwarding rules; the node's operating system forwards each connection; the Deployment loop starts and stops Pods (Ch 6); the node agent restarts a container (Ch 4–5); the provider runs the load balancer and, at Fennel, the gateway's controller.
- **Keep the pattern distinct from the implementation.** The reconcile loop is Ch 4's general pattern; the endpoints loop and kube-proxy are implementations. Lane S is one scene; the general rule (the list holds exactly the ready Pods a selector matches) is stated after it, not tied to `catalog`.
- **No meta lines about the course.** Callbacks do work ("at 03:04 in Chapter 3, Sam passed on the new addresses by hand"), never bookkeeping ("this keeps Chapter 6's promise"). Story terms from earlier chapters are glossed where first used ("Thursday's 10:15 release in Chapter 6, when `catalog` went from v62 to v63"; "the Tuesday in Chapter 5 when `orders` ran out of memory three times").
- Figures don't "write" or "say" things; captions state the takeaway or condition. Refer to figures by number.
- Every default carries "by default" or "with default settings" in the same sentence; "connection refused" carries "in most clusters" or "by default" (c-06, medium confidence); timing is "within seconds, usually" (c-05). Prices are "on one provider, AWS, in one region, as listed on 24 October 2026". Tools and providers stay generic otherwise.
- Pedantic caveats go in disclosures; the main text stays true without them.

**Vocabulary guard** (brief out_of_scope; ledger §5). This chapter introduces: Service (s-03), DNS name (s-03), load balancer (s-07), ingress / gateway (s-07). Proposed for the ledger (R1): endpoints (s-04, `dfn`), endpoints loop (s-04), kube-proxy (s-05, named). Allowed with a gloss: cluster IP (s-03, once: "engineers call it the cluster IP"), selector and label (s-03), `type: LoadBalancer` (s-07), "EndpointSlice" (once, in s-04's set-up, as what engineers' tools call the lists), "a team's area of the cluster, Chapter 11" (D2 only, for the namespace in a DNS name), "headless Service" (D2 only, "Chapter 10"), service mesh (one sentence in s-05, "Chapter 13"), Ingress NGINX (D6 only). Pod addresses and Service addresses appear as illustrative numbers (`10.4.5.12`, `10.96.0.21`) with no explanation of their form. **Never in the body:** iptables, nftables, IPVS, network plugin / CNI, NodePort, subnet, TLS beyond "secure" (s-07 mentions certificates in one clause), network policy, namespace beyond D2, session affinity, `externalTrafficPolicy`, HPA / autoscaler (s-09's bridge says "Chapter 8" only), StatefulSet, ConfigMap / Secret, Helm, GitOps.

**Fiction vs. sourced.** Every address, the Services' manifests as Ari wrote them, Fennel's gateway set-up, `fennel.example`'s routes, the Tuesday log lines, Riley's proposal and every quoted line are Fennel fiction (story facts, R2); addresses are illustrative. Sourced mechanisms: every Pod has its own address and the set of Pods changes, so callers can't track them (c-01); a Service has a stable virtual address of its own, the cluster IP (c-02); a loop keeps each Service's list of matching Pods current (c-03); only ready, not-terminating Pods are listed, by default (c-04); kube-proxy on every node turns each Service into forwarding rules that pick a listed Pod at random per connection, by default (c-05); a Service with no ready Pods gets a reject rule, so callers are refused at once (c-06, medium, hedged); DNS names resolve to the cluster IP, short name within the same area (c-07); `type: LoadBalancer` makes the provider create one load balancer per Service (c-08); an ingress or gateway routes many Services behind one entry point, and needs a controller (c-09); Ingress is frozen, Gateway recommended (c-10); Ingress NGINX retired (c-11); one provider's price (c-12). From earlier chapters by reference: a replacement Pod has a new name and address (Ch 4 claims 12, 18); loops act by writing into the record (Ch 4 claim 08); old and new Pods run side by side during a rolling update (Ch 6 claim 03); a failed readiness check takes a Pod out of traffic without restarting it, and with no readiness probe a Pod counts as ready once running (Ch 6 claims 06, 07); a moved container's address changes and callers must be told (Ch 3 claim 02); an OOM-killed container is restarted in place (Ch 5).

## Research concerns, resolved

1. **c-06 is medium confidence.** The main text says, in §06 and k-05's feedback, that with no ready Pod on the list "the rules on the caller's node refuse the call at once, in most clusters, by default". It never says every cluster behaves so; D3 says some providers replace kube-proxy with their own component, which may behave differently. No check key depends on the exact word "refused": k-05 asks *what* refused (the symptom is given in the prompt), and its key turns on the empty list.
2. **Stale direct addresses.** What a caller sees after using a replaced Pod's address (usually a wait and a timeout, sometimes a refusal) appears only in s-02's debrief, hedged ("usually"), and in D5. k-02's key says the copied addresses "lead nowhere", not how the failure shows.
3. **AWS prices** appear once, in s-07, labelled "on one provider, AWS, for its Application Load Balancer in one US region, as listed on 24 October 2026", with "before charges for use" and "other providers price differently". The figures are the hourly charge ($0.0225, about $16 a month) and products of it (x-04). k-07's model answer repeats them with the same label.
4. **Timing** is "within seconds, usually" (lane S step S3, s-04's lens paragraph), never a number.
5. **Ingress and Gateway.** The main text names "an ingress or, in newer set-ups, a gateway" and says the Kubernetes project now recommends the gateway (c-10) in one clause; Fennel uses a gateway with the provider's controller (R2). The freeze and Ingress NGINX's retirement on 24 March 2026 are dated, in D6, framed as a question for engineers ("which controller do we run, and who keeps it updated?"). No product comparison.
6. **Model knowledge the plan relies on, flagged for the accuracy reviewer:** (a) a container restarted in place keeps its Pod's address (k-05 option C's feedback, f-04's right panel), which follows from c-01 (the address is the Pod's) and Ch 5's "restarted in place" with the same Pod name `orders-q2rw`; (b) a restarting container makes its Pod not ready, so it leaves the list (c-04's "maps to the Pod's Ready condition"); (c) "roughly a third of new connections" for one Pod in three follows from random choice per connection (c-05), hedged "roughly" and "on average".

## Objectives

- o-1: explain why callers need a stable name and address when Pods are disposable: every replacement (Ch 4) and every release, rollbacks included (Ch 6), gives a service new Pods with new addresses, and a hand-kept list (Sam's, Ch 3) is always behind; predict what a caller that uses a Pod's address directly gets when that Pod is replaced. — checks: k-01, k-02
- o-2: describe how a Service connects callers to whichever Pods are ready: a stable name and address, a selector, and a list of ready Pods kept current by the endpoints loop; the Service is a record carried out as rules on every node, not a server (m-10); what callers get during a rollout (old and new side by side) and when no Pod is ready (refused at once). — checks: k-03, k-04, k-05
- o-3: trace at a high level how a customer's request reaches a Pod (cloud load balancer, gateway, Service, ready Pod; internal calls need no load balancer) and weigh one load balancer per service against one gateway in front of many, including what each costs. — checks: k-06, k-07

k-01 is the retrieval opener (Ch 4's replacement Pod, through the loop lens). k-02 is o-1's predict (a hand-copied list after a rollback; the misconception that a kept ReplicaSet keeps Pods). k-03 gates the lane at its key transition (mid-rollout, both versions on the list). k-04 is m-10's predict-then-reveal. k-05 explains Tuesday's incident and interleaves m-10 with restart vs. replace. k-06 traces a request (local-03). k-07 is the conversation, think-then-reveal, and interleaves o-2 and o-3.

## Diagnosis

- **Readiness:** novice for infrastructure, intermediate for software. Chunks the reader brings: the record and many loops, each writing into the record; the loop lens; Pods are replaced, never moved or repaired, with a new name and address (Ch 4's k-06); the node agent restarts a crashed or OOM-killed container in place (Ch 4–5); a Deployment shifts Pods between versions a few at a time, and only ready Pods are sent traffic "by a loop we'll name in Chapter 7" (Ch 6); Ch 6's lane R as a scene (nodes 05 and 06, v62 → v63, the extra Pod, NOT READY then READY, STOPPED); Sam's 03:04 by-hand connecting (Ch 3's NEW ADDR). From general software: what an address, a DNS name and a website's domain are, roughly; what a log line is.
- **Element interactivity: high**, at two moments.
  - **Hardest moment: s-03 into the lane (S2–S3).** The Service's parts must be held together: a name callers use, a stable address behind the name, a selector that says which Pods belong, a list of the ready ones, the loop that keeps the list, and (later) the rules that carry it out. Naively six or seven elements. Managed by:
    - **segmenting into three passes:** s-03 gives what callers use and what the record holds (name → address; selector; a list), with no mechanism; s-04 adds only the loop that keeps the list, on a scene the reader knows; s-05 adds only how a call uses the list (rules on each node). At most three new elements per pass.
    - **a known scene as one chunk:** lane S is Ch 6's lane R, the same Pods and timings, so the Pods' behaviour costs nothing; the only new thing on the canvas is the Service's block.
    - **inline labels on the canvas:** the Service's name and address sit in the block's header, the list's entries name each Pod's version and address, the Pods show READY / NOT READY / STOPPED, and a `storefront → catalog` line names what answers, so the reader reads the state instead of computing it.
    - **one change per step:** S1 the starting list; S2 a new Pod not listed; S3 one added, one removed; S4 every address replaced, the header unchanged.
  - **Second: s-07, the route in.** Four things of different kinds (a provider's machine, routing rules with a controller behind them, a Service, a Pod) in one path. Managed by introducing each in a sentence and a term card before the trace, drawing each kind differently in f-05, and asking the trace as a prediction (k-06) before the figure.
- **Misconceptions confronted** (catalog ID; three proposed locals):
  - **m-10** (owned), "a Service is a server": stated fairly at the start of s-05 (the word "service" already means a running program at Fennel; a Service has an address and a name, as servers do; diagrams draw a box); shown predicting wrongly by k-04 (how many copies to run) and f-03 (no Service program on the call's path); correct model in s-05 (a record plus rules on every node, carried out by kube-proxy from the endpoints loop's list); the case the misconception got right (something has to run) re-explained by the same model, the fair part (the endpoints loop and kube-proxy do run; D3 what happens if they stop). Interleaved again in k-05 (option A) and the analogy's breaks line.
  - **local-01, "the Service checks whether its Pods are healthy"** (proposed m-35): s-04's paragraph after the lens (the loop copies each Pod's readiness answer; a Pod with no readiness probe is listed as soon as its container runs; Ch 6's $0 v64 Pods passed their check and were listed); the analogy's breaks line.
  - **local-02, "a Service balances load"** (proposed m-36): k-03's feedback (random per connection); s-05's "spread, not balanced" paragraph; D4 (long-lived connections stay on one Pod).
  - **local-03, "every service needs its own load balancer"** (proposed m-37): k-06 options B and C; s-07's "inside only by default" paragraph; k-07's model answer.
- **Retrieval opener:** k-01 (Ch 4's `orders-5c8x` → `orders-q2rw` through the ReplicaSet loop's lens). Ch 3's 03:04 is recalled in s-01's prose; Ch 6's k-05 (a Pod out of traffic, not restarted) in s-04's lens paragraph; Ch 6's kept ReplicaSet is k-02's distractor; Ch 5's Tuesday is s-06's scene.
- **Analogy:** a team's support line (s-05, after f-03), a refinement of the entry's "shared inbox or front desk" (checkpoint Q4): a support line rings one person per call, which maps to one Pod per connection; an inbox or a front desk puts someone in the middle, which is m-10. Its breaks line is m-10 and local-01.

## Disclosures

`<details class="d-more cp-more">`, collapsed by default, all optional; the main text reads correctly with all of them closed.
- D1 (s-01) "I didn't read the last chapter. What happened?"
- D2 (s-03) "What's the full name, and why doesn't DNS just list the Pods?" (c-07 note)
- D3 (s-05) "What if kube-proxy stops?" (c-05 note; m-10's fair part)
- D4 (s-05) "Why does one Pod get most of the calls?" (c-05 note; local-02)
- D5 (s-06) "Other ways to get 'connection refused'" (c-06 note; x-02 alternatives)
- D6 (s-07) "Ingress or gateway?" (c-10, c-11)

## Segments

### s-01 — Year 3: who passes on the addresses now?
intent: Re-establish the cast for readers jumping in, retrieve Ch 4's replacement Pod through the loop lens (k-01), recall Sam's by-hand connecting at 03:04 in Ch 3, show that on Kubernetes addresses change far more often and yet nobody passes them on, and end on the manager's puzzle: Tuesday's `connection refused` lines in `storefront`'s log.
objectives: o-1
claims: c-01
readiness: novice · interactivity: low (one job from Ch 3; how often addresses change now; one symptom) · max-elements: 3
mode: orientation (cast strip, optional recap) → retrieval through the loop lens (choice) → concrete story (pain seen in meetings) · blueprint: none
layout:
  contiguity: adjacent. Cast strip and D1 at the top of §01, then k-01, then the scene.
  pacing: continuous
  redundancy: D1 summarises Ch 6 (and Ch 4's core in one sentence) without re-teaching; the scene names the Tuesday symptom without explaining it (§06 does).
  scaffold: D1, collapsed: "I didn't read the last chapter. What happened?"
ux: Glance at the cast strip, optionally open D1, commit to k-01, read the scene (four or five paragraphs) and the quoted exchange. At 360px the cast strip wraps; options are full width.
figure: none
widget: none
checks: k-01
content: these points, in order:
  - **Hero standfirst** (draft; it must not say how a Service works, that it isn't a server, or why the calls were refused): "Fennel's services call one another all day, and customers call `storefront` from their phones, while the Pods behind every service keep being replaced. This chapter shows how a call still finds its way, why `storefront`'s calls to `orders` were refused one Tuesday, and what it costs to let customers in."
  - **Cast strip** (five people): "**Jordan**, co-founder, managing the engineers: that's you, in this story. **Ari**, platform lead; runs Fennel's cluster. **Riley**, an engineer on the `catalog` team. **Morgan**, co-founder; runs Fennel's money. **Sam**, the founding engineer, who once passed on every new address by hand."
  - **D1, "I didn't read the last chapter. What happened?"** In Chapter 4 Fennel moved onto managed Kubernetes: the cluster keeps a record of what Fennel wants running, and many small loops each compare one part of it with what's running and close the gap; a Pod (Kubernetes' wrapper around a running container) is never moved or repaired, only replaced by a new one. In Chapter 6 the `catalog` team began shipping two or three times a day: a Deployment's loop replaces a service's Pods with the new version a few at a time, removing an old Pod only once a new one is ready, which means it passes a check the team wrote. A Pod that isn't ready keeps running but is sent no requests. On one Thursday, a routine release at 10:15 took about a minute, and one at 14:02 showed every price as $0.00 for six minutes until Riley rolled back. To understand any loop, ask: which loop is it, what does it want, what does it see, and what does it do about a gap?
  - k-01.
  - **Then** (draft wording). At 03:04 on a Saturday in Chapter 3, before Kubernetes, machine 03 died and took `orders` with it. Sam started `orders` again on machine 04, but customers still couldn't order: `storefront`'s settings said machine 03, and `storefront` kept sending orders there until Sam passed on the new address. Connecting the services was one of Sam's jobs, done by hand, at three in the morning.
  - **Now** (c-01). On Kubernetes, addresses change far more often than machines die. Every replacement gives a service a new Pod at a new address, as `orders-q2rw` was in Chapter 4, and every release gives it new Pods too: `catalog` ships two or three times a day, with three new Pods each time. Yet nobody passes on an address. Since `storefront` moved into the cluster, it has reached `orders` and `catalog` through all of it, including at 03:10, without anyone updating its settings.
  - **Jordan and Ari** (`.cp-dialog`). Jordan: "Sam used to pass on the new addresses. Who does that now?" Ari: "Nobody. `storefront` doesn't call an address any more. It calls a name."
  - **The puzzle** (story; Ch 5's Tuesday glossed). On the Tuesday when `orders` ran out of memory three times and was restarted each time (Chapter 5), customers saw errors for a moment at about 12:40, 18:50 and 20:10. Ari's incident note adds what `storefront`'s log showed at each of those moments: `connection refused`, from `orders`. Jordan: "If the name always finds `orders`, what refused us?" Hand-off: "To answer that, start with how `storefront` finds `orders` at all."

### s-02 — Addresses that don't stay put
intent: Make the scale of the address problem concrete with one service and one day: after Thursday's releases and even after the rollback to v63, every copied address of `catalog` leads nowhere; let the reader predict it (k-02) before f-01 shows the whole day, then state what callers need instead.
objectives: o-1
claims: c-01
readiness: novice · interactivity: low (a copied list; new Pods; new addresses) · max-elements: 3
mode: concrete case → predict (pain felt in the page) → reveal figure → rule · blueprint: none
layout:
  contiguity: inline. f-01's struck entries sit on the list they belong to, with the reason beside each.
  pacing: gated on k-02: f-01 and the debrief collapse to a locked plate until the reader commits.
  redundancy: the debrief doesn't read f-01 column by column; it gives the count and the rule.
  scaffold: none
ux: Read one paragraph, commit to k-02 (three options), see f-01 and read the debrief (two paragraphs). At 360px f-01 becomes a vertical list of four time blocks.
figure: f-01 (`catalog`'s addresses through one Thursday). See ## Figures.
widget: none
checks: k-02
content: these points, in order:
  - **A Pod's own address** (c-01; Ch 3 claim 02). Each Pod gets a network address of its own when it starts, not its node's, and a new Pod gets a new one. Suppose, as Sam once did, someone had copied `catalog`'s three addresses into `storefront`'s settings on that Thursday at 10:20, just after the morning release.
  - k-02.
  - **f-01** (gated).
  - **Debrief** (c-01; c-06 note, hedged). Over one Thursday, `catalog` had four complete sets of addresses, and the rollback brought back version v63 but not one of its morning addresses: a rollback makes new Pods from the kept ReplicaSet, and new Pods get new addresses. A caller holding a copied address would usually wait and then time out, because nothing answers there any more. A list kept by hand would have been wrong for most of the day, at every service, every day.
  - **What callers need instead:** one name and one address per service that stay the same however often its Pods change, with something else keeping track of which Pods are behind it. That's what Ari meant by "it calls a name".

### s-03 — One name that stays put: the Service
intent: Ground the Service before naming it: the small record Ari wrote for each service at the move (a name, a selector, a port), and what Kubernetes adds to it (a stable address, a DNS name, a list of the ready Pods behind it); then name it (TERM 01), separate it from Fennel's word "service", and introduce the DNS name.
objectives: o-2
claims: c-02, c-03, c-07
readiness: novice · interactivity: medium (a name, an address behind it, a selector, a list) · max-elements: 3
mode: concrete artefact (manifest and what Kubernetes adds) → name (term card) → one more term (DNS name) · blueprint: none
layout:
  contiguity: inline. f-02's annotations sit on the lines they explain; the three things Kubernetes adds sit beside the record, each labelled with who keeps it.
  pacing: continuous
  redundancy: the prose doesn't re-read f-02 line by line; it says what the selector does and why the address matters.
  scaffold: D2, collapsed: "What's the full name, and why doesn't DNS just list the Pods?"
ux: Read two paragraphs, study f-02, read TERM 01 and two paragraphs; optionally open D2. At 360px f-02's right column drops under the manifest.
figure: f-02 (the `orders` Service: what Ari wrote, what Kubernetes adds); TERM 01. See ## Figures.
widget: none
checks: none
content: these points, in order:
  - **What Ari wrote at the move** (c-02). Beside each service's Deployment, Ari wrote one more short record. For `orders` it gives a name, `orders`; a selector, `app: orders`, which says which Pods belong: any Pod carrying that label, and `orders`' Deployment gives the label to every Pod it makes; and the port callers use.
  - **f-02.**
  - **What Kubernetes adds** (c-02, c-03, c-07). Kubernetes gives the record an address of its own, `10.96.0.25` (engineers call it the cluster IP), which stays the same for as long as the record exists, however often the Pods change. The cluster's DNS answers the name `orders` with that address, so `storefront`'s settings say only `orders`. And Kubernetes keeps, beside the record, a list of the addresses of the Pods that match the selector and are ready. Since 03:10 in Chapter 4, that list has held one address: `orders-q2rw`'s.
  - **TERM 01** (Service, payoff variant), with its first use as `dfn`.
  - **Two meanings of "service"** (m-10's ground). At Fennel, `orders` is a service: a program the team writes and runs as Pods. Each of Fennel's services also has a Service of the same name, the record in f-02. This chapter writes the program in code font and the record with a capital S.
  - **The DNS name** (`dfn`; c-07). The name a caller uses is a DNS name, the same kind of name as a website's, except that only the cluster's own DNS answers it. Inside Fennel's cluster, `orders` is enough; D2 has the full form.
  - **D2, "What's the full name, and why doesn't DNS just list the Pods?"** (c-07 note): the full name is `orders.<area>.svc.cluster.local`, where the area is a team's area of the cluster (Chapter 11), and a caller in the same area can use just `orders`. DNS could have answered with every Pod's address, but many programs remember a DNS answer long after they should, so they would keep calling Pods that had gone; one address that never changes avoids that. (An exception, for databases whose copies must be reached one by one, is Chapter 10's.)

### s-04 — Thursday, 10:15, from storefront's side
intent: Show, on Ch 6's lane R scene, the endpoints loop keeping the `catalog` Service's list current through a rolling update while `storefront`'s setting never changes: a new Pod listed only once ready, a stopping Pod removed at once, both versions on the list mid-rollout (gate k-03); then fill in the loop's lens, say it checks nothing itself (local-01), and connect it to Ch 6's $0 minutes and to canaries.
objectives: o-2
claims: c-03, c-04, c-05
readiness: novice · interactivity: high (the list; which Pods are ready; one added, one removed; the unchanged name and address) · max-elements: 3
mode: scene set-up → step-locked worked example (scrollytelling, B1) with a predict gate → the loop lens filled in → misconception (local-01) → consequences (side by side; canary) · blueprint: B1
layout:
  contiguity: sticky. The canvas stays in view while lane S's steps scroll beside it (desktop) or beneath it (mobile). The Service's name and address, the list's entries, each Pod's READY / NOT READY / STOPPED and the `storefront → catalog` line are on the canvas, not only in the text.
  pacing: step-revealed by scrolling; S3–S4 gated on k-03.
  redundancy: step text says what changed and why; it reads aloud only the one value each step turns on. After the lane, the prose doesn't replay the steps.
  scaffold: none
ux: Read the scene set-up (two short paragraphs), scroll S1–S2, commit to k-03 (three options) in the step column, scroll S3–S4, then read four paragraphs. At 360px the canvas is sticky at the top (or inline per step where it wouldn't fit in 50vh); two node columns of about 150px; the Service block's entries two to a line; steps scroll beneath. No horizontal scroll.
figure: none
widget: w-services-scrolly (complexity: low) — lane S, "Thursday, 10:15, from storefront's side", 4 steps on the pooled `renderCluster` and lane controller, data only once pool-04 is in place, gated on k-03; its data file also holds f-04's two snapshots
checks: k-03
content: these points, in order:
  - **Scene set-up, before the lane** (two paragraphs; Ch 6 glossed). Which release: "This is Thursday's 10:15 release from Chapter 6 again, when `catalog` went from v62 to v63 in about a minute: the Deployment loop started one v63 Pod, waited until it was ready, stopped one v62 Pod, and repeated that three times. This time the drawing adds what `storefront` relies on." What's new on the canvas: "The record panel now shows the `catalog` Service: its name and address at the top, which `storefront` uses, and under them its list of ready Pods, each entry giving the Pod's version and address. The other nodes are nearly full and not drawn, as in Chapter 6." The loop, grounded before it acts (c-03): "Keeping that list is the job of one more loop, which has been running in the control plane since the move, beside the loops from earlier chapters. It watches every Service's selector and the Pods that match it, and rewrites the Service's list whenever one of them becomes ready, stops being ready, or goes. Engineers call the list the Service's endpoints and the loop the EndpointSlice controller; here it's the endpoints loop."
  - **Lane S** (steps under ## Widgets).
  - **The loop, through the loop lens** (pattern vs. implementation; c-03, c-04): "In Chapter 4's terms, it is one more implementation of the same pattern. It wants each Service's list to hold exactly the ready Pods its selector matches. It sees every Service's selector, the Pods that match, and which of them are ready. What it does about a gap: it rewrites the list." Then the callbacks that do work: "It's the loop that put `orders-q2rw` on the `orders` list at 03:10 in Chapter 4, so `storefront` found the new Pod with nobody passing anything on, and the one that took a `catalog` Pod off the list when it lost its database connection in Chapter 6 and put it back when its check passed. Like every loop, it only writes into the record; how calls follow the list is §05." A change usually reaches callers within seconds (c-05 note, hedged).
  - **It checks nothing itself** (local-01; c-04; Ch 6 claim 07). It's tempting to think a Service watches over its Pods' health, as a cloud load balancer does with its own checks. It doesn't: the endpoints loop copies each Pod's ready or not-ready answer from the check the team wrote (Chapter 6), and does no checking of its own. A Pod with no readiness check is listed as soon as its container runs, even if the app inside isn't answering yet; and at 14:02 in Chapter 6, the v64 Pods that showed $0 prices passed their check, so the loop listed them.
  - **Side by side, and why a canary needs more** (x-03; c-05; Ch 6's 14:02 and its canary). That is also why some customers saw $0 prices before the 14:02 rollout had finished: for about forty seconds, the list held v63 and v64 Pods together, and each new connection went to whichever it picked. And it's why a canary release, which Chapter 6 described as sending a small share of customers to a new version first, takes more than starting one new Pod: with one v64 Pod among three, roughly a third of new connections would reach it, on average, at random; sending exactly one customer in twenty to it takes routing rules that a plain Service doesn't have.

### s-05 — Where a call actually goes
intent: Confront m-10: state it fairly, let the reader predict how many copies of a Service to run (k-04), reveal with f-03 that a call goes from the caller's own node straight to a Pod, introduce kube-proxy as the per-node loop that turns lists into forwarding rules, say how a Pod is picked (at random, per connection, not by load: local-02), give the support-line analogy with its breaks, and name service mesh.
objectives: o-2
claims: c-02, c-05
readiness: novice · interactivity: high (the name and address; the rules on the caller's node; the Pod) · max-elements: 3
mode: misconception stated fairly → predict-then-reveal → correct model (figure) → the fair part → analogy with breaks · blueprint: none
layout:
  contiguity: inline. f-03's numbered path steps are labelled on the path itself; the rule written on node 01 sits on node 01.
  pacing: gated on k-04: f-03 and the paragraphs after it collapse to a locked plate until the reader commits.
  redundancy: the prose after f-03 explains who writes the rules and why nothing can be overloaded; it doesn't re-trace the figure.
  scaffold: D3, collapsed: "What if kube-proxy stops?"; D4, collapsed: "Why does one Pod get most of the calls?"
ux: Read the fair statement, commit to k-04 (three options), see f-03 and the reveal, read three paragraphs and the analogy aside; optionally open D3 and D4. At 360px f-03 is a vertical path (DNS, node 01 with its rules, then node 04), about 560px tall.
figure: f-03 (one call from `storefront` to `orders`); the support-line aside. See ## Figures.
widget: none
checks: k-04
content: these points, in order:
  - **The fair part** (m-10 stated). Ari's team runs everything that matters in at least two copies, and every call from `storefront` to `orders` uses the `orders` Service. The Service has an address and a name, as a server does, and at Fennel "service" has always meant a program that runs. So it's natural to picture it as a box in the middle, taking each call and passing it on.
  - k-04.
  - **f-03** (gated), then **the reveal** (c-05, c-02 note). There is no box in the middle. The address `10.96.0.25` belongs to no machine and no program. On every node, a small loop called kube-proxy reads each Service and its list from the record and writes them into the node's own forwarding rules. When `storefront` connects to `10.96.0.25`, the operating system of `storefront`'s own node catches the connection and sends it straight to one of the listed Pods. Nothing called "the `orders` Service" exists to crash, slow down or need copies; the `orders` Pods are what need copies.
  - **kube-proxy, grounded** (c-05; name only): engineers call it kube-proxy for historical reasons; calls don't pass through it, it writes the rules they follow. Like the node agent, there is one on every node, and it acts on its own node from the record. Some providers replace it with a component of their own that does the same job (D3).
  - **The fair part, kept** (m-10 counter): something does run for Services to work, the endpoints loop in the control plane, which the provider runs, and kube-proxy on every node. But neither sits on a call's path. D3 says what happens if one stops.
  - **Spread, not balanced** (local-02; c-05). Engineers often say a Service "load-balances", and it does spread calls, but not by load: by default the rule picks one of the listed Pods at random each time a caller opens a connection, without knowing how busy any of them is. Over many short connections that comes out roughly even. (Service mesh, one sentence: "Teams that need calls balanced one by one, or encrypted and measured between services, add a layer called a service mesh, one of Chapter 13's tools.")
  - **The support-line aside** (`.cp-aside`, ANALOGY): "You know this arrangement from a team's support line. Customers call one number, not a person's phone, and the phone system rings one of the people on today's rota. People join, go home and come back, and the number never changes. A Service is the number and the rota together: one name and address, and a list of who can answer now." **WHERE THIS ANALOGY BREAKS:** "A support line runs through a switchboard that every call passes, and someone decides who is fit to be on the rota. A Service has neither. Each caller's own node connects the call straight to a Pod, and the endpoints loop judges nobody: it lists whichever Pods pass their own readiness checks."
  - **D3, "What if kube-proxy stops?"** (c-05 note): the rules it already wrote keep forwarding calls, but they stop following the list, so calls can go to Pods that have since gone, while new Pods get none. That's a different failure from "the Service went down", and the questions for engineers are different too. Some providers replace kube-proxy with their own network component; it does the same job, but details such as what a caller gets when the list is empty can differ.
  - **D4, "Why does one Pod get most of the calls?"** (c-05 note; local-02 notes, hedged): the Pod is picked when a connection opens, not for each request, and some callers (database drivers, connection pools, some app frameworks) keep one connection open for a long time, sending every request down it to one Pod. A Pod added later may get little traffic until connections reopen. Chapter 8 returns to this.

### s-06 — Tuesday, 12:40: connection refused
intent: Answer s-01's puzzle: let the reader explain what refused `storefront`'s calls while `orders`' only Pod restarted (k-05), reveal with f-04 that the `orders` list was empty and then refilled with the same address, and give the fix (more than one copy) and the manager's question.
objectives: o-2
claims: c-04, c-06
readiness: novice · interactivity: medium (one copy; not ready while restarting; an empty list; refused at once) · max-elements: 3
mode: concrete incident → explain (choice) → reveal (two snapshots) → fix and question · blueprint: none
layout:
  contiguity: adjacent. f-04's two panels sit side by side on desktop with matching headers, so the list (NONE vs. one address) and the caller line (refused vs. answered) line up.
  pacing: gated on k-05: f-04 and the paragraphs after it collapse to a locked plate until the reader commits.
  redundancy: the prose explains why the list was empty and what follows; it doesn't re-describe the panels.
  scaffold: D5, collapsed: "Other ways to get 'connection refused'"
ux: Read a paragraph, commit to k-05 (three options), see f-04 and read three paragraphs; optionally open D5. At 360px f-04's panels stack, each about 300px tall.
figure: f-04 (Tuesday, 12:40, two moments), drawn with the pooled renderer from w-services-scrolly's data file. See ## Figures.
widget: none
checks: k-05
content: these points, in order:
  - **The scene** (Ch 5 glossed; story). `orders` runs a single copy, `orders-q2rw` on node 04. On Tuesday at about 12:40 its memory reached its limit, the operating system killed its container, and the node agent restarted it in place, as Chapter 5 showed. For those seconds, `storefront`'s log shows `connection refused`.
  - k-05.
  - **f-04** (gated) and **the reveal** (c-04, c-06, hedged). While its container was down and starting again, `orders`' only Pod wasn't ready, so the endpoints loop took it off the list, and the `orders` Service had no Pod to send anything to. With an empty list, the rule on each caller's node refuses a call at once rather than holding it, in most clusters, by default, which is what `storefront` logged. Seconds later the restarted Pod passed its check and went back on the list at the same address, because a restart keeps the Pod, and its address, where a replacement doesn't. The same happened at 18:50 and 20:10.
  - **The fix is in the Pods, not the Service.** The Service did exactly its job: it sent calls to every ready `orders` Pod, and for a few seconds there were none. With two copies on different nodes, one restarting Pod would have left the other on the list, and customers would have noticed nothing. Why `orders` keeps running out of memory is still Chapter 5's open question. Ari's note ends with a proposal: run a second copy of `orders` (R2).
  - **A question for Jordan's list** (`.cp-recap`-style line): "Which of our services run a single copy, and what do their callers get while it restarts?"
  - **D5, "Other ways to get 'connection refused'"** (c-06 note; x-02 alternatives, hedged): a Service whose selector matches no Pods, for example because of a typo in a label, has an empty list from the start, so its callers are refused while every Pod looks healthy; engineers' first check is whether its list (shown in an `ENDPOINTS` column) is empty. A Pod with no readiness check is listed as soon as its container runs and may refuse calls until its app is listening. A caller that kept a replaced Pod's old address usually waits and times out instead.

### s-07 — From a customer's phone to a Pod
intent: Show that Services are reachable only inside the cluster by default, introduce the two ways in from the internet (a cloud load balancer per Service; one gateway or ingress routing many Services behind one load balancer), give Fennel's set-up, let the reader trace a request and the internal call it causes (k-06, then f-05), and state what each way in costs with one provider's figures at a date.
objectives: o-3
claims: c-02, c-08, c-09, c-10, c-11, c-12
readiness: novice · interactivity: medium (a provider's machine; routing rules with a controller; a Service; a Pod) · max-elements: 3
mode: problem (customers are outside) → two options, each grounded then named (term cards) → Fennel's choice → predict (trace) → reveal figure → cost · blueprint: none
layout:
  contiguity: inline. f-05 labels each hop on the hop itself, with who runs it; the routing rules sit inside the gateway's box.
  pacing: gated on k-06: f-05 collapses to a locked plate until the reader commits; the cost paragraphs follow it.
  redundancy: the prose doesn't narrate f-05 hop by hop; it adds who runs each part and what it costs.
  scaffold: D6, collapsed: "Ingress or gateway?"
ux: Read four short paragraphs with TERM 02 and TERM 03 between them, commit to k-06 (three options), see f-05, read two paragraphs on cost; optionally open D6. At 360px f-05 is already vertical; the internal branch drops below the main path.
figure: f-05 (one order, from a phone to a Pod); TERM 02; TERM 03. See ## Figures.
widget: none
checks: k-06
content: these points, in order:
  - **Inside only, by default** (c-02 note; c-08 note). Every Service so far has an address that works only inside the cluster: by default, a Service can be reached only from the cluster's own nodes. That's all `storefront` needs to reach `orders`, and it needs no load balancer for it. But customers' phones are on the internet, outside.
  - **One way in per Service** (c-08). A team can set a Service's `type` to `LoadBalancer`, and the provider then creates a load balancer for that one Service: a machine the provider runs, with a public address, that passes incoming connections on to the Service's Pods. Each Service set up this way gets its own load balancer, its own public address and its own hourly charge. **TERM 02** (load balancer). (One clause: engineers also say a Service "load-balances", as §05 did; here a load balancer is the provider's machine.)
  - **One way in for many** (c-09, c-10). For web traffic, a cluster can have one entry point instead: a set of routing rules that sends each request to a Service by the name or path it asks for, such as `fennel.example` to `storefront`. The rules do nothing by themselves; a controller, run by the provider or installed and kept up to date by the team, carries them out, usually behind a single cloud load balancer. The older form is called an ingress; the newer, which the Kubernetes project now recommends, a gateway. **TERM 03** (gateway).
  - **Fennel's set-up** (story, R2): since the move, Fennel has had one gateway, using the provider's controller, behind one cloud load balancer with Fennel's one public address; its only route so far sends `fennel.example` to `storefront`.
  - k-06.
  - **f-05** (gated).
  - **What each way in costs** (c-12, x-04; labelled). On one provider, AWS, an Application Load Balancer in one US region was listed at $0.0225 an hour on 24 October 2026, about $16 a month, before charges for the traffic it handles. One for each of Fennel's six services would be about $99 a month before use, against about $16 for the one in front of the gateway; at the thirty or more services Fennel expects next year, about $490. Other providers price differently.
  - **The bigger cost isn't the money** (x-04 why; c-09). At Fennel's size the sums are modest. Each load balancer is also one more public entry point to secure, give a certificate, watch and keep track of, and one gateway keeps all of that in one place. There are real reasons for more than one (traffic that isn't web traffic, which a gateway doesn't carry, or keeping one kind of traffic apart from another), and they're worth asking about, not assuming.
  - **D6, "Ingress or gateway?"** (c-10, c-11; dated): the Kubernetes project froze the Ingress API and recommends the Gateway API instead; Ingress keeps working and won't be removed, but gets no new features. Separately, one of the most widely used ingress controllers, Ingress NGINX, was retired on 24 March 2026: existing installations keep running but get no more fixes, including security fixes, and moving off it takes planning. The questions for engineers: which controller do we run, and who keeps it up to date? Fennel's gateway uses the provider's controller, so the provider does.

### s-08 — The loops so far
intent: Fill in the course's loop lens table: the dashed Chapter 7 row becomes the endpoints loop, and kube-proxy joins as a per-node loop, so the reader sees both as more implementations of the same pattern.
objectives: o-2
claims: c-03, c-05
readiness: novice · interactivity: low (one row filled in; one new row) · max-elements: 2
mode: consolidation (the course table) · blueprint: none
layout:
  contiguity: inline. NEW IN CH 7 tags sit in the cells that changed.
  pacing: continuous
  redundancy: one lead-in sentence; the table carries the content; the caption gives the takeaway.
  scaffold: none
ux: Read one sentence, scan f-06 (eight rows; two tagged). At 360px the table becomes stacked cards (loop name as a mono header; four labelled lines).
figure: f-06 (the loop lens table, Ch 7). See ## Figures.
widget: none
checks: none
content: these points, in order:
  - Lead-in: "The connecting job Sam did by hand at 03:04 is now split between two loops: one in the control plane keeps each Service's list, and one on every node turns the lists into rules."
  - f-06.

### s-09 — The conversation
intent: Rehearse CO-4 with the chapter's conversation (Riley: "We want a separate load balancer for every service."), as a think-then-reveal whose model answer interleaves o-2 and o-3; recap; bridge to Ch 8.
objectives: o-3, o-2
claims: c-08, c-09, c-12
readiness: novice · interactivity: medium (cost; one gateway; internal calls; who runs it) · max-elements: 3
mode: think-then-reveal (apply) → recap → forward bridge · blueprint: none
layout:
  contiguity: adjacent
  pacing: think-then-reveal: the model answer is hidden until "Show the answer".
  redundancy: the recap lists ideas, not the story; it doesn't repeat k-07's model answer.
  scaffold: none
ux: Read a two-line scene, think, reveal k-07's model answer, read the recap (five lines) and the bridge paragraph. At 360px all full width.
figure: none
widget: none
checks: k-07
content: these points, in order:
  - **The scene:** a planning meeting. Partners' apps want to read `catalog`'s prices directly, and Riley's team wants to control how they get in. Riley: "We want a separate load balancer for every service."
  - k-07.
  - **Recap** (`.cp-recap`): every replacement and every release gives a service new Pods at new addresses, so callers use a name instead; a Service is a record that gives a set of Pods one stable name and address, picked out by a selector; the endpoints loop keeps its list of ready Pods current, copying each Pod's own readiness answer; kube-proxy on every node turns the lists into rules, so a call goes from the caller's node straight to one Pod, picked at random, with no server in between; when the list is empty, callers are refused at once, and the fix is more ready Pods; from the internet, a cloud load balancer is the provider's machine, one per Service of that type, and one gateway can route many Services behind a single one.
  - **Bridge** (forward-looking): "On a Friday evening, Fennel's orders triple between five and seven. Every extra Pod the cluster starts for the rush will join its Service's list the moment it is ready, and `storefront` will never know it was added. What decides to start them, and whether they arrive in time, is Chapter 8."

## Figures

### f-01 — `catalog`'s addresses, one Thursday (s-02, revealed after k-02)
- **Model.** Static HTML, header `FIG. 01 · CATALOG'S ADDRESSES, ONE THURSDAY`. Four time blocks left to right, each headed by a time and the version running: `09:00 · v62`, `10:16 · v63`, `14:03 · v64`, `14:08 · v63 again`. Each block holds three Pod address chips (mono, outlined `ink`, no fill, no version colour: f-01 is about addresses, and colour would make the two v63 sets look alike), each printing its address and version: 09:00 `10.4.5.12`, `10.4.6.8`, `10.4.6.9`; 10:16 `10.4.5.14`, `10.4.6.11`, `10.4.5.15`; 14:03 `10.4.6.13`, `10.4.5.17`, `10.4.5.18`; 14:08 `10.4.6.15`, `10.4.5.20`, `10.4.6.16`. Under the blocks, a full-width band `COPIED INTO STOREFRONT'S SETTINGS AT 10:20` in `c4` on `c4-soft` (written by a person) holding the three 10:16 addresses; under each later block the band shows the copy's state in that block: `10:16 · ALL 3 ANSWER` (`good`), `14:03 · NONE ANSWERS` (`bad`), `14:08 · NONE ANSWERS` (`bad`), with the three copied addresses struck through. The 14:08 block's three chips and the band's last cell carry the 3px ink highlight.
- **Caption.** "Fig. 01. Each release, and the rollback, gave `catalog` three new Pods with new addresses. Going back to v63 brought back the version, not its addresses. Addresses are illustrative."
- **Gate.** Collapsed to a locked plate ("Answer the question above to see the whole day") until k-02 is committed; never re-locks.
- **Size.** Desktop `.d-wide`, about 260px tall. Under 600px a vertical list of the four blocks, each with its band cell under it, about 620px at 360px.

### f-02 — The `orders` Service: what Ari wrote, what Kubernetes adds (s-03)
- **Model.** Static, header `FIG. 02 · THE ORDERS SERVICE`. Two columns.
  - **Left, `WRITTEN BY ARI`:** Ch 4's manifest treatment (`.mf`, `c4` on `c4-soft`, annotations beside lines): `kind: Service` ("a Service: a record, like the others"), `metadata:` / `name: orders` ("the name callers use"), `spec:` / `selector:` / `app: orders` ("which Pods belong: those with this label"), `ports:` / `- port: 80` ("the port callers use"). Under it, a second, smaller `.mf` excerpt headed `FROM ORDERS' DEPLOYMENT`: `labels:` / `app: orders` ("every Pod it makes carries this").
  - **Right, `ADDED AND KEPT BY KUBERNETES`:** three labelled rows, each a different look for a different kind: `ADDRESS · 10.96.0.25` (ink, mono bold; sub-line "given once; the same for as long as the Service exists"); `DNS NAME · orders → 10.96.0.25` (ink, mono; sub-line "answered by the cluster's DNS"); `READY PODS · 10.4.4.7 (orders-q2rw)` on `surface-2` with a 1.5px dashed `c3` left rule (the same look as the lane's list row, pool-04; sub-line "kept current by a loop: §04").
- **Caption.** "Fig. 02. Ari wrote a name, a selector and a port. Kubernetes adds a stable address, a DNS name for it, and a list of the ready Pods behind it. Shortened; addresses are illustrative."
- **Size.** Desktop `.d-wide`, about 300px tall. Under 600px the right column drops under the left, about 560px.

### f-03 — One call, from `storefront` to `orders` (s-05, revealed after k-04)
- **Model.** Static SVG or HTML with the kit's `arrow.js`, header `FIG. 03 · ONE CALL, STOREFRONT TO ORDERS`. Top: a thin record strip (`c4` on `c4-soft`) `RECORD · SERVICE orders · 10.96.0.25 · READY PODS 10.4.4.7`, with a `↻ endpoints loop` pill (`c3`) beside the list. Below it, two node frames side by side, `NODE · 01` and `NODE · 04` (Ch 4's node grammar; only the Pods named here drawn, other room as `ink-3` text `OTHER PODS NOT DRAWN`). In node 01: one `storefront` Pod chip (`c1`, READY), and along the node's floor a band `FORWARDING RULES` (`surface-2`, `ink-2` mono) reading `10.96.0.25 → 10.4.4.7`, with a `↻ kube-proxy` pill (`c3`) on the band. In node 04: the `orders-q2rw` Pod chip (`c1`, READY, its address `10.4.4.7` printed under the chip). A small box above node 01, `CLUSTER DNS · orders → 10.96.0.25`. Numbered path, each step labelled on its line: ① `storefront` asks the DNS for `orders` and gets `10.96.0.25`; ② it connects to `10.96.0.25`; its own node's rules catch the connection and pick a listed Pod; ③ the connection goes straight to `orders-q2rw` on node 04. One dashed `c3` line from the record strip down to node 01's rules band, labelled `KUBE-PROXY COPIES EVERY LIST INTO EACH NODE'S RULES` (node 04 has the same band, drawn empty of detail). No box labelled "Service" stands anywhere on the path.
- **Caption.** "Fig. 03. The Service's address belongs to no machine or program. The caller's own node sends the call straight to a ready Pod, using rules copied from the Service's list. Addresses are illustrative."
- **Gate.** Collapsed until k-04 is committed.
- **Size.** Desktop `.d-wide`, about 360px tall. Under 600px a vertical path (DNS box, node 01 with its rules, arrow down, node 04; the record strip on top), about 560px at 360px.

### f-04 — Tuesday, 12:40: two moments (s-06, revealed after k-05)
- **Model.** Two snapshots drawn by the pooled `renderCluster` from `site/widgets/w-services-scrolly/data.js` (its `FIGURES` entry; nodesOnly false; `opts.header` without a step counter), inside one figure plate `FIG. 04 · TUESDAY, 12:40`. One node, 04 (Ch 5's layout on that Tuesday: `payments`, `storefront`, `orders`; 12 of 13 GB reserved). Each panel has a mono head line above its drawing.
  - **Left, `~12:40 · RESTARTING`.** Node 04: `pa2` (`payments`), `sf2` (`storefront`), `or1` (`orders`, `crashed` with `restarts: 1`, status word `OOM-KILLED`). Record: the `orders` Service block, `SERVICE · orders · 10.96.0.25`, list `NONE` (`bad`). Loop lens: `SEES · orders' only Pod not ready / DOES · empties the list`. Notes: `storefront → orders · connection refused` (`bad`); `NOT DRAWN · NODES 01, 02, 05, 06` (`mute`).
  - **Right, `SECONDS LATER · READY AGAIN`.** Node 04: `or1` READY (`restarts: 1` kept). List: `orders 10.4.4.7` (highlighted). Lens: `SEES · the Pod ready again / DOES · lists it, same address`. Notes: `storefront → orders · answered` (`good`).
  - Only the list rows and the `storefront → orders` lines carry the step highlight.
- **Caption.** "Fig. 04. With one copy, each restart left the `orders` Service with no ready Pod, and calls were refused at once. The restarted Pod came back on the list at the same address: it was restarted, not replaced."
- **Gate.** Collapsed until k-05 is committed.
- **Size.** Desktop `.d-wide`, two panels side by side, each about 440px wide, about 330px tall. Under 900px stacked (left first), each about 300px at 360px. Each panel has its own `aria-label` (the state in words, from `data.js`).

### f-05 — One order, from a phone to a Pod (s-07, revealed after k-06)
- **Model.** Static HTML/SVG with `arrow.js`, header `FIG. 05 · ONE ORDER, FROM A PHONE TO A POD`. A vertical path, top to bottom, each hop a different look for a different kind, each labelled with who runs it:
  1. `PHONE · fennel.example` on the blueprint ground, in a band labelled `INTERNET`.
  2. `CLOUD LOAD BALANCER` — a solid `ink`-outlined box with a mono `PROVIDER'S MACHINE` tag and `ONE PUBLIC ADDRESS`. It sits on the `CLUSTER` frame's edge (Ch 3's 3px `ink` cluster frame).
  3. Inside the frame, `GATEWAY` — a box holding its routing rules in the manifest treatment (`c4` on `c4-soft`): `fennel.example → storefront` (the route this request takes, highlighted) and a dashed placeholder `(more routes can be added)`, with a `↻ gateway controller` pill (`c3`) labelled `RUN BY THE PROVIDER, AT FENNEL`.
  4. `SERVICE · storefront · 10.96.0.12` in the pool-04 Service-block look (header `c4`, list row `surface-2` with the dashed `c3` rule, three addresses).
  5. One `storefront` Pod chip (`c1`, READY).
  6. A branch to the right from that Pod, labelled `INSIDE THE CLUSTER · NO LOAD BALANCER`: `calls orders` → `SERVICE · orders · 10.96.0.25` (same look) → the `orders-q2rw` chip.
- **Caption.** "Fig. 05. A customer's request passes one load balancer, at the edge; calls between services inside the cluster pass none. On some providers, the cloud load balancer carries the gateway's rules itself."
- **Gate.** Collapsed until k-06 is committed.
- **Size.** Desktop prose width plus the branch (`.d-wide`), about 520px tall. Under 600px the branch drops below the main path, about 760px at 360px.

### f-06 — The loop lens, Ch 7 (s-08)
- **Model.** Ch 6's f-07 table (a copy, not an edit), header `FIG. 06 · WHICH LOOP: WANTS, SEES, DOES`, built from a `CH07_LOOPS` array in this chapter's `site/assets/page.js`: Ch 6's `CH06_LOOPS` copied forward in its row order with Ch 6's `added` / `newPart` tags dropped, Ch 7's changes tagged `NEW IN CH 7`:
  1. **node loop** · unchanged.
  2. **Deployment loop** · unchanged.
  3. **ReplicaSet loop** · unchanged.
  4. **scheduler** · unchanged.
  5. **node agent** (one per node) · unchanged.
  6. **endpoints loop** (the dashed "another loop, Chapter 7" row filled in; solid now; `added: ['loop', 'wants', 'sees', 'does']`, no `per`, no `chapter`) · wants: each Service's list holding exactly the ready Pods its selector matches · sees: every Service's selector, the Pods that match it, and which of them are ready · does: rewrites the Service's list of ready Pods' addresses, taking a Pod off as soon as it stops being ready or starts shutting down · job: connecting.
  7. **kube-proxy** (new row, `added: ['loop']`, `per: 'one per node'`) · wants: its node's forwarding rules matching every Service's list · sees: every Service and its list, in the record · does: rewrites its node's rules, so a call to a Service's address goes straight to one listed Pod, picked at random by default; an empty list refuses calls · job: connecting.
  8. (dashed) **a loop that adds nodes, Chapter 8** · unchanged.
- **Caption.** "Fig. 06. Sam's connecting job, split between two loops: one keeps each Service's list in the record, and one on every node turns the lists into rules. Neither sits on a call's path."
- **Size.** Desktop `.d-wide`, about 440px tall. Under 600px stacked cards, about 1100px at 360px.

### Term cards — `.cp-term` (s-03, s-07)
Ch 3's treatment, unchanged (CURRICULUM §8 step 4): outlined plate, mono `accent` kicker `NEW TERM · 0N / 03`, the term large in the heading face, one definition sentence, a mono `ink-3` back line. The prose's first use is a `dfn` with `aria-describedby` pointing to the card.
- **TERM 01 · Service** (s-03), **payoff variant** (blueprint ground; the chapter's only one). Definition: "A record that gives a set of Pods, picked out by a selector, one name and address that stay the same while the Pods change, with a list of which of them are ready." Back: "What `storefront` has been calling since the move."
- **TERM 02 · load balancer** (s-07). Definition: "A machine the cloud provider runs, with a public address, that passes incoming connections on to what's behind it; a Service of type LoadBalancer gets one of its own." Back: "The provider's machine, billed by the hour."
- **TERM 03 · gateway (or ingress)** (s-07). Definition: "One entry point for a cluster's web traffic, whose rules send each request to a Service by the name or path it asks for; a controller carries the rules out." Back: "One way in, for many Services."
- `dfn` only (no card): DNS name (s-03), cluster IP (s-03, once), endpoints and endpoints loop (s-04), kube-proxy (s-05), service mesh (s-05).

## Visual grammar

Extends Ch 1–6's grammar (CURRICULUM §5 Visuals column), which is unchanged. The rule from the user's reviews drives every new item: **things different in kind look different.** Five pairs matter here: a Pod's address vs. the Service's address; the Service as written vs. the list a loop keeps; the list vs. the calls that flow; ready vs. not ready; inside the cluster vs. the internet.

- **Addresses.** A Pod's address is plain mono `ink-2` (`10.4.5.12`), printed in list entries, in f-01's chips and under f-03's chip. The Service's address is mono bold `ink` (`10.96.0.21`), always in the Service's header next to its name, and never highlighted as a change (it never changes). Every address is illustrative and the captions say so.
- **The Service block** (pool-04, and its static copies in f-02, f-03, f-05). A header row in the record's `c4` on `c4-soft` (written intention: the Service as Ari wrote it) reading `SERVICE · catalog · 10.96.0.21`; under it a list row `READY PODS` on `surface-2` with a 1.5px dashed `c3` left rule (`c3` is the loop colour: kept by a loop, not written by a person), one entry per listed Pod: a small filled square in the Pod's series colour, its version (if any) and its address. An empty list reads `NONE` in `bad`. An entry removed in this step is shown struck through in `ink-3` for that step only.
- **Calls that flow:** Ch 4's note line under the nodes, now `storefront → catalog · answered by v62 ×2 · v63 ×1` (`good`), or `· connection refused` (`bad`). The note names what answers; it never draws an arrow through the Service.
- **Versions, READY / NOT READY / STOPPED:** Ch 6's grammar unchanged (v63 = `c2` throughout; v62 = `c5`; READY `good`; NOT READY `warn`, solid chip, hollow lamp; STOPPED `ink-3`). f-01 deliberately uses no version colour.
- **On every node, the rules** (f-03 only): a `FORWARDING RULES` band along the node's floor (`surface-2`, `ink-2` mono) with a `↻ kube-proxy` pill (`c3`). kube-proxy is never drawn as a box on a call's path.
- **Inside vs. outside** (f-05): an `INTERNET` band on blueprint ground above Ch 3's 3px `ink` `CLUSTER` frame; the cloud load balancer straddles the frame's edge as a solid `ink` box tagged `PROVIDER'S MACHINE`; the gateway's rules in the manifest treatment with a `↻ gateway controller` pill.
- **Loop pills:** `↻ endpoints loop` and `↻ kube-proxy` (`c3`, Ch 4's pill grammar); the lane's lens line `SEES · … / DOES · …`.
- Ch 4–6's nodes, Pod ring, GB units, `N GB FREE`, clock kicker and step highlight are unchanged.

## Widgets

### w-services-scrolly
segment: s-04
complexity: low
blueprint: B1 (step-locked canvas as scrollytelling), one lane of 4 steps, gated on k-03; its data file also holds f-04's two snapshots
model: One lane over Ch 6's lane R scene, rendered by the pooled `renderCluster` and run by the pooled lane controller (`pool/cluster/cluster.js`, `pool/cluster/lanes.js`) from a **complete snapshot per step**, so scrolling back restores any step exactly. Data only: every reader-visible string, the lane and f-04's two snapshots live in `site/widgets/w-services-scrolly/data.js`. It needs one pool addition (pool-04, below), which the orchestrator schedules before the build; with it in place there is no widget code, so the page builder builds it (`complexity: low`).
  - **Units and nodes:** Ch 5–6's `CAPACITY { memory: 13, cpu: 3.9 }`, `UNIT 'GB'`, `ROOM_UNIT 2`, `STATUS_INLINE: true`. Lane: `NODES ['05', '06']` (one note line `NOT DRAWN · NODES 01, 02, 04`, `mute`, in every step). f-04: node `04` only, given in its own states.
  - **Services:** `catalog` 2 GB · 0.25 cores; `dispatch` 2 GB · 1 core (`di7`, on 05, READY throughout); for f-04, `orders` 6 GB · 1, `payments` 2 GB · 0.25, `storefront` 4 GB · 0.5.
  - **Mechanism rules (claims):** the list holds exactly the Pods that match the Service's selector and are ready (c-03, c-04); a Pod that isn't ready isn't listed; a Pod told to stop leaves the list at once, before its container exits (c-04 note); the Service's name and address never change (c-02); each new connection goes to one listed Pod at random by default (c-05), so the calls line names every version on the list; with an empty list calls are refused at once, by default (c-06). The Pods' own moves are Ch 6's lane R, unchanged (Ch 6 claims 03, 06).
  - **Pods** (`PODS[id].addr` is pool-04's new field): `c1` v62 series 5 `10.4.5.12` (05); `c2` v62 series 5 `10.4.6.8` (06); `c3` v62 series 5 `10.4.6.9` (06); `n1` v63 series 2 `10.4.5.14` (05); `n2` v63 series 2 `10.4.6.11` (06); `n3` v63 series 2 `10.4.5.15` (05); `di7` dispatch. f-04: `pa2` payments, `sf2` storefront, `or1` orders `10.4.4.7`. The same addresses appear in f-01 and f-02.
  - **Service blocks:** `catalog` `10.96.0.21`; `orders` `10.96.0.25`.
  - **Loops:** `ep: { label: 'endpoints loop' }`, `deploy: { label: 'Deployment loop' }`. Record panel: `rows: []` plus `service` (pool-04); the Deployment group is left out to keep the new element alone on the panel (the step text names the Deployment loop where it acts).
  - **Strings:** Ch 6's set (`status.running: 'READY'`, `status.notready: 'NOT READY'`, `status.stopped: 'STOPPED'`, `status.crashed: 'OOM-KILLED'`), plus pool-04's `record.service: 'Service'`, `record.list: 'Ready Pods'`, `record.none: 'None'`.
reader_does: Scrolls through one lane. At the end of S2 commits to k-03 (three options) in the step column; the commit unlocks S3–S4. Any option unlocks; the check's feedback explains a wrong pick. The canvas has no controls.
shows: Canvas header `W-01 · THE CLUSTER`, lane name `THURSDAY, 10:15 · CATALOG, FROM STOREFRONT'S SIDE`, the clock kicker, `STEP n / 4`. Step text is draft wording (one to three sentences each; flowing, cause and effect).
  - **S1 · 10:15:00.** Nodes: 05 `di7`, `c1`; 06 `c2`, `c3` (all READY). Service block: `SERVICE · catalog · 10.96.0.21`; list `v62 10.4.5.12 · v62 10.4.6.8 · v62 10.4.6.9`. Loops: `ep` active, `deploy` shown; lens `SEES · 3 Pods match, all ready` / `DOES · lists all 3`. Notes: `storefront → catalog · answered by v62 ×3` (`good`). Highlight: the Service header and the list. Text: "Before the release, the `catalog` Service's list holds the addresses of its three v62 Pods. `storefront`'s settings name only `catalog`, which the cluster's DNS answers with `10.96.0.21`, the address at the top of the block."
  - **S2 · seconds later.** `n1` (v63) on 05, `NOT READY` (highlighted); list unchanged. Loops: `deploy` and `ep` shown, `ep` active; lens `SEES · a 4th matching Pod, not ready` / `DOES · leaves it off the list`. Notes: `answered by v62 ×3`. Text: "As in Chapter 6, the Deployment loop starts a v63 Pod on node 05. It carries the label `app: catalog`, so the selector matches it, but it hasn't passed its readiness check yet, so the endpoints loop leaves it off the list and no call reaches it." Then **k-03**.
  - **S3 · ~10:15:20 (gated on k-03).** `n1` READY; `c2` on 06 `STOPPED`. List: `v62 10.4.5.12 · v62 10.4.6.9 · v63 10.4.5.14`, with `v62 10.4.6.8` struck (leaving). Lens `SEES · v63 Pod ready; a v62 Pod stopping` / `DOES · adds one, removes one`. Notes: `answered by v62 ×2 · v63 ×1`. Highlight: `n1`, `c2`, the two changed entries, the calls line. Text: "The v63 Pod passes its check, and within seconds, usually, its address is on the list. When the Deployment loop then stops a v62 Pod, that Pod's address comes off the list as soon as it's told to stop, before its container has even exited, so no new call is sent to a Pod on its way out. For now, `storefront`'s calls are answered by both versions."
  - **S4 · ~10:16.** Two more rounds done: 05 `di7`, `n1`, `n3`; 06 `n2` (all READY). List: `v63 10.4.5.14 · v63 10.4.6.11 · v63 10.4.5.15`, with `v62 10.4.6.9` struck (the last to leave). Lens `SEES · 3 Pods match, all ready` / `DOES · lists all 3`. Notes: `answered by v63 ×3`. Highlight: the list and the Service header. Text: "Two more rounds, and every address on the list has changed. The line at the top of the block, the name and address `storefront` uses, didn't change once, and nobody had to tell `storefront` anything."
  - **Every step:** the step highlight marks what the step is about; the canvas `aria-label` is the step's state summary from `data.js`, naming the list's entries in words; the step text carries the meaning on its own. A caption under the lane: "Fennel's nodes, versions, addresses and timings are fiction. By default, a Service's list holds only its ready Pods, and a Pod that is shutting down leaves it at once."
size: **Desktop (≥ 900px):** the pooled lane layout inside `.d-wide`: canvas left (about 55%), sticky; steps right. Two node columns at Ch 6's scale; record panel: the Service header and a list row of up to four entries (two lines reserved lane-wide); notes three lines; total about 500px.
  **600–899px and phones:** one column, canvas sticky at the top (≤ 50vh), steps beneath as opaque cards. **At 360px:** two node columns of about 150px, as in Ch 6; the Service header on one line (`SERVICE · catalog` / `10.96.0.21` on two where it doesn't fit); list entries two to a line (`■ v62 10.4.5.12`); only the acting loop's pill and lens line; about 440px. Where the measured canvas is taller than 50vh or the viewport is under 560px tall, each step shows its own inline snapshot (the pool's fallback, decided by measurement).
  **Gated steps:** S3–S4 collapse to a locked plate ("Answer the question above to see what happens") until k-03 is committed; unlock on `didactician:check-commit`; never re-lock.
  **Motion:** changes over ≤ 300ms (flair length, no replay needed, I4); instant under reduced motion; no autoplay. **No-JS:** step text visible; a `<noscript>` line says the drawing needs JavaScript.
acceptance: ac-05, ac-06, ac-07, ac-10
reuse: **Reuse the pooled `renderCluster` and lane controller; never copy another chapter's widget code.** **Pool addition needed (pool-04)** (course-level, scheduled by the orchestrator before the build; an optional field that is off when absent, so Ch 4–6 draw unchanged; every chapter re-gated):
  1. **Service block in the record panel.** `record.service: { name, addr, list: [podId…], leaving?: [podId…] }` draws, below the record's other rows (or alone, when `rows` is `[]`), a header row `SERVICE · catalog` with the address in mono bold (`STRINGS.record.service`), in the record's `c4` on `c4-soft`; and under it a list row labelled `READY PODS` (`STRINGS.record.list`) on `surface-2` with a 1.5px dashed `c3` left rule, holding one entry per listed Pod in list order: a filled square in that Pod's series colour (`c1` when it has none), its `version` if any, and its `PODS[id].addr`. Pods in `leaving` are drawn after the listed ones, struck through in `ink-3`, and not counted. An empty list draws `STRINGS.record.none` in `bad`. Entries wrap; the list row reserves, lane-wide, the line count of its fullest state, so the lane never changes height. Narrow canvas (< 440px): the address goes on a second header line where the header doesn't fit; entries drop the separator dots and sit two to a line at a 360px phone's snapshot width.
  2. **`PODS[id].addr`** (string): used only by the Service block; chips don't print it.
  3. **Highlight keys** `svc:<name>` (the header), `svc:<name>:list` (the list row), `svc:<name>:<podId>` (one entry).
  4. **Strings** `record.service`, `record.list`, `record.none`, needed only when `record.service` is present.
  - Not needed: a traffic arrow (the calls note line carries what answers, and an arrow through the Service would draw m-10); a second Service per state (none of this chapter's drawings needs one; an array can come later).
  - **Optional, same re-gate:** the open §9 follow-up (Ch 6 P-08: at 360px, chips with an inline status drop the service name), since every chapter is re-gated for pool-04 anyway.
  - **Fallback if the user declines pool-04 (checkpoint Q3 b):** the Service drawn as two note lines (`SERVICE · catalog · 10.96.0.21` and `READY PODS · v62 10.4.5.12 · …`, `mute`), data only. It teaches the change but makes the list look like the calls line, which the visual grammar rules out.
  - **Later chapters** that would use the Service block: **Ch 8** (new Pods join the list only once ready; scaling lag), **Ch 10** (a Service for a database; the headless exception), **Ch 11** (Services in teams' areas), **Ch 12** (an empty list as the first thing to check in an incident), **Ch 15** (Tuesday's refused calls as a capstone clue).

## Comprehension items

### k-01
segment: s-01
objective: o-1
type: retrieve
prompt: At 03:04 in Chapter 4, node 03 died with `orders-5c8x` on it, and by 03:10 the ReplicaSet loop's replacement, `orders-q2rw`, was running on node 04. Through the loop lens: what does the ReplicaSet loop want, and does that include telling `storefront` where the new Pod is?
options: A · A set number of `orders` Pods. Where callers send their calls isn't part of it. (correct) | B · `orders` working for its callers, so it gives the new Pod the old Pod's address. | C · Every Pod back as it was, so it moves the old Pod's name and address to node 04.
feedback: A: "Right. The ReplicaSet loop compares a count with a count. `orders-q2rw` was a new Pod with a new name and a new address, so something else had to make sure `storefront` found it. This chapter is about that something." · B: "Its lens has no callers in it: it wants a number of Pods and sees the Pod records it has. And a new Pod doesn't inherit an address: `orders-q2rw` got its own." · C: "Kubernetes never moves a Pod (Chapter 4). The ReplicaSet loop wrote a new one, `orders-q2rw`, with a new name and a new address; all it checked was the count."

### k-02
segment: s-02
objective: o-1
type: predict
prompt: Suppose someone had copied `catalog`'s three addresses into `storefront`'s settings at 10:20 on that Thursday, just after the morning release to v63. At 14:02 the $0 version, v64, replaced every Pod, and at 14:07 Riley rolled back to v63. After 14:08, with three v63 Pods serving again, do calls to the copied addresses work?
options: A · Yes: the rollback brought back the v63 Pods from the ReplicaSet the Deployment kept, addresses and all. | B · No: the rollback started three new v63 Pods, and new Pods get new addresses. (correct) | C · Only some: Kubernetes gives a returning v63 Pod its old address back whenever no other Pod has taken it.
feedback: A: "The kept ReplicaSet holds a description of v63's Pods, not the Pods themselves: it had none from 14:03. Going back made three new Pods from it, each with a new name and a new address. Fig. 01 shows the whole day." · B: "Right. An address belongs to one Pod. The rollback made three new v63 Pods, so the addresses copied at 10:20 lead nowhere, as they had since 14:03. Fig. 01 shows the whole day." · C: "Kubernetes keeps no addresses for Pods to come back to; each new Pod simply gets one when it starts. The copied addresses lead nowhere. Fig. 01 shows the whole day."

### k-03
segment: s-04
objective: o-2
type: predict
prompt: About twenty seconds later, the v63 Pod has passed its readiness check, and the Deployment loop has told one v62 Pod to stop. `storefront` then opens three new connections to `catalog`. Which Pods can answer them?
options: A · Only the v63 Pod, because a Pod that has just become ready takes the new calls. | B · Any of the Pods on the list by then, whether v62 or v63. (correct) | C · Only the v62 Pods, until all three v63 Pods are ready and the list switches over.
feedback: A: "The list doesn't favour new Pods. Each new connection goes to one of the listed Pods, picked at random by default, so the two v62 Pods still on it answer most calls. Scroll on." · B: "Right. The list holds whichever Pods are ready: two v62 Pods and the new v63 one. Each new connection goes to one of them, picked at random by default, so for about a minute `storefront` gets answers from both versions. Scroll on." · C: "The list changes Pod by Pod, as each one becomes ready or is told to stop; nothing waits for the release to finish. So v63 answers some calls from now on. Scroll on."

### k-04
segment: s-05
objective: o-2
type: predict
prompt: Every call from `storefront` to `orders` uses the `orders` Service, and Ari's team wants to be sure the Service itself can't become the weak point. How many copies of the `orders` Service should they run?
options: A · Two or more, on different nodes, as for any service that every order depends on. | B · One is enough: if it crashed, Kubernetes would restart it, as it would any Pod. | C · None: each caller's own node sends the call straight to an `orders` Pod. (correct)
feedback: A: "That's the right instinct for a server, but no server sits there. The Service's address belongs to no machine: the caller's own node sends each call straight to a ready `orders` Pod. It's the `orders` Pods that need copies. See Fig. 03." · B: "Nothing called the `orders` Service is running, so there's nothing to crash or restart. The caller's own node sends each call straight to a ready `orders` Pod. See Fig. 03." · C: "Right. There's no Service program to copy. Kubernetes turns the Service's list into forwarding rules on every node, so a call leaves `storefront`'s node already headed for one `orders` Pod. Fig. 03 follows one call."

### k-05
segment: s-06
objective: o-2
type: explain
prompt: On Tuesday at about 12:40, `orders-q2rw`, the only `orders` Pod, ran out of memory and the node agent restarted its container. For those seconds, `storefront`'s log shows `connection refused`. What refused the calls?
options: A · The `orders` Service, overloaded by calls that piled up while its only Pod restarted. | B · The rules on `storefront`'s own node, because the `orders` list was empty. (correct) | C · The restarted Pod, which came back at a new address that `storefront` didn't know yet.
feedback: A: "No Service program sits on the path to fill up (§05), and nothing held the calls. While the only `orders` Pod wasn't ready, the `orders` list was empty, and the rule on `storefront`'s own node refused each call at once. See Fig. 04." · B: "Right. While the only `orders` Pod wasn't ready, the endpoints loop had nothing to list, and with an empty list the rule on the caller's node refuses a call at once rather than hold it, in most clusters, by default. Fig. 04 shows both moments." · C: "A restart isn't a replacement. The node agent restarted the container inside the same Pod, which kept its name and its address. For a few seconds the Pod wasn't ready, so it wasn't on the list. See Fig. 04."

### k-06
segment: s-07
objective: o-3
type: apply
prompt: A customer places an order on their phone at `fennel.example`. The request reaches a `storefront` Pod, which then calls `orders` to store the order. How many load balancers do the request and that call pass through between them?
options: A · One, at the cluster's edge; the call to `orders` uses its Service. (correct) | B · Two: one at the edge, and one in front of `orders` for the call inside. | C · Three: one at the edge, and one in front of each of the two Services.
feedback: A: "Right. The cloud load balancer in front of the gateway is the only one. Inside the cluster, `storefront` reaches `orders` by its name and its Service's address, which needs no load balancer. Fig. 05 traces it." · B: "Calls inside the cluster need no load balancer: `storefront` reaches `orders` through the `orders` Service, whose rules sit on `storefront`'s own node. Only the way in from the internet needs one. Fig. 05 traces it." · C: "A Service is not a load balancer, and only a Service of type `LoadBalancer` gets one. Fennel's Services stay inside the cluster, behind the one load balancer in front of the gateway. Fig. 05 traces it."

### k-07
segment: s-09
objective: o-3
type: apply
prompt: At a planning meeting, Riley's team wants partners' apps to read `catalog`'s prices directly, and wants control over how they get in. Riley says: "We want a separate load balancer for every service." What would you ask Riley, and why? Think of your questions, then show the answer.
model_answer: The question to ask: "What does each one cost? Could one gateway route to all of them?" Each Service of type `LoadBalancer` gets its own provider machine with its own public address and hourly charge: on one provider, AWS, about $16 a month each before use (October 2026), so about $99 for Fennel's six services against about $16 for the one Fennel already has, and about $490 at thirty services. The money is modest; the bigger cost is six public entry points to secure, give certificates, watch and keep track of. And Fennel's gateway can already route by name or path, so partners could reach `catalog` through it with one more route. Then: "Which of our services do customers or partners actually call from outside?" Only those need a way in at all: `orders`, `payments` and `dispatch` are called from inside the cluster, through their Services, and need no load balancer. "Can each team manage its own routes on the shared gateway, so nobody waits on Ari's team?" That's the control Riley is really asking for. And: "Is there a reason for a separate one here, such as traffic that isn't web traffic, or keeping partners' traffic apart?" If there is, one more load balancer may be worth its cost.
feedback: The reveal names local-03 once: calls between services never need a load balancer, and one gateway can route many Services behind a single one. Chapter 14 returns to what the whole platform costs.

## Acceptance criteria

- ac-01 (s-01): The cast strip and D1 come before k-01; k-01 is committed before the scene; the scene recalls Sam passing on the new addresses at 03:04 in Ch 3 before it says that on Kubernetes nobody passes them on; it says `storefront` has reached `orders` and `catalog` since the move (Services have been working all along); §01 ends on Jordan's "what refused us?" without saying why.
- ac-02 (s-02, k-02, f-01): k-02 is committed before f-01 or any sentence saying the rollback brought new addresses; f-01 shows four sets of three addresses, the two v63 sets different, and the 10:20 copy failing from 14:03; the debrief hedges what a caller with a stale address sees ("usually"), and no check key depends on timeout vs. refusal.
- ac-03 (s-03, f-02): f-02 shows what Ari wrote (name, selector, port; the Pod label from the Deployment) apart from what Kubernetes adds (address, DNS name, ready list), each of the three added things in a different look; TERM 01 follows f-02; the prose says once that each Fennel service has a Service of the same name and how the page tells them apart.
- ac-04 (page): Terms appear only after the thing they name: Service after f-02, endpoints after the lane's set-up has described the list, kube-proxy after f-03's reveal describes the rules, load balancer and gateway after the prose has said what each is; no later-ledger term (autoscaler, namespace beyond D2, StatefulSet, network policy, service mesh beyond one sentence) is used except as "Chapter N".
- ac-05 (w-services-scrolly): Before S1, a set-up paragraph says which release this is (Ch 6's 10:15, glossed), what is new on the canvas (the Service's header and its list), and what the endpoints loop is, where it runs and what it watches, before any step shows it acting.
- ac-06 (w-services-scrolly): At every step the list holds exactly the drawn Pods that are READY, never a NOT READY or STOPPED one (a stopped Pod's entry appears only struck through, in the step it leaves); the Service's name and address are the same in every step; the calls line names every version on the list; S3–S4 are locked until k-03 is committed; scrolling back restores each earlier step exactly.
- ac-07 (w-services-scrolly): The Service's header (written, `c4`), its list (kept by a loop, `surface-2` with a dashed `c3` rule) and the calls line (what answers) look different from one another and from the Pod chips; no arrow or box puts the Service on a call's path.
- ac-08 (s-04): The endpoints loop's lens (wants · sees · does) is stated as one implementation of Ch 4's pattern after the lane; the prose credits it with Ch 4's 03:10 (`orders-q2rw` found) and Ch 6's Pod taken out of traffic; it says the loop copies each Pod's readiness answer and checks nothing itself (local-01); the canary sentence says random spreading makes a share of traffic by Pod count only rough, hedged.
- ac-09 (s-05, k-04, f-03): m-10 is stated fairly before k-04; k-04 is committed before f-03 or any sentence saying no program sits on the path; f-03 shows the caller's own node's rules sending the call to the Pod, with no box labelled Service on the path; the prose names kube-proxy as a per-node loop that writes rules, not a step calls pass through; the spreading paragraph says "at random, per connection, by default", not by load (local-02).
- ac-10 (s-06, k-05, f-04): k-05's prompt gives the symptom and asks what refused the calls; k-05 is committed before f-04 or the explanation; f-04's left panel shows the `orders` list as NONE with the Pod OOM-KILLED and the calls line refused, the right panel the same Pod and address back on the list; the prose carries "in most clusters, by default" on the refusal and says a restart keeps the Pod's address; the fix is given as more copies, not a change to the Service.
- ac-11 (s-07, k-06, f-05): The prose says Services are reachable only inside the cluster by default before it introduces the two ways in; TERM 02 and TERM 03 each follow a sentence saying what the thing is and who runs it; k-06 is committed before f-05; f-05 draws the provider's machine, the gateway's rules with their controller, the Services and the Pods each differently, and marks the internal call "no load balancer"; prices are labelled with provider, product, region and date, and called modest next to the other costs of many entry points.
- ac-12 (f-06): The loop lens table is Ch 6's array copied forward with Ch 6's tags dropped; the dashed Chapter 7 row becomes a solid endpoints loop row; a kube-proxy row (one per node) is added; both are tagged NEW IN CH 7 and share the job "connecting".
- ac-13 (k-01–k-07): Every choice check has feedback for every option that explains why, naming the misconception where one applies; no key is the longest option; no key repeats the wording of a term card, heading, standfirst or caption above it (in particular, the standfirst and §05's heading don't say a Service isn't a server, and nothing before k-05 says an empty list refuses calls); every feedback pointer into the lane or a figure is visible from its default state or from the figure the check unlocks; k-07 states its own question and hides its model answer until revealed.
- ac-14 (s-05 aside): The support-line analogy comes after f-03, maps number → name and address, rota → list, ringing one person → one Pod per connection, and carries a WHERE THIS ANALOGY BREAKS line saying there is no switchboard on the path and nobody judges who is on the rota.

## Curriculum recommendations

Recommendations only; CURRICULUM.md is unchanged. Apply after the chapter ships (CURRICULUM §8 step 8), except the checkpoint questions, which the user answers at the checkpoint.

- **Checkpoint questions** (recommended option first):
  - **Q1, size** (## Shape): **(a) recommended: one chapter**, about 20 minutes planned (probably 22–25 built), with `cut-list.md` `## If it runs long` recovering about 3; (b) split after s-06 (not recommended: the second part would be about 6 minutes, and the conversation needs both halves).
  - **Q2, the "connection refused" incident** (R2): **(a) recommended: Ch 5's Tuesday, explained.** `orders` runs one copy, so during each of the three OOM restarts its Service had no ready Pod and `storefront`'s calls were refused at once. It explains an established fact ("errors for a moment") instead of adding an outage, keeps Services working since the move, and teaches the chapter's key move (the fix is in the Pods). (b) A new internal tool whose Service selector has a typo, so it matches no Pods and is refused on every call while every Pod looks healthy: vivid, but a new event, and it teaches a configuration slip rather than how Services behave (kept in D5). (c) A caller that copied a Pod's address and kept it after a replacement: fits "connection refused" poorly (usually timeouts), and it would mean someone at Fennel bypassed the Services.
  - **Q3, pool addition** (w-services-scrolly `reuse:`): **(a) recommended: schedule pool-04 before the build** (the Service block in the record panel and `PODS[id].addr`, optionally with the open 360px chip-label follow-up in the same re-gate); (b) data only, no pool change: the Service as two note lines (it makes the list look like the calls line, which the visual grammar rules out, and Ch 8 and Ch 12 would face the same choice again).
  - **Q4, analogy** (s-05): **(a) recommended: a team's support line, after the m-10 reveal, with its breaks line** (it maps one call to one person, as a Service maps one connection to one Pod; first in the cut order); (b) the entry's shared inbox or front desk (both put someone in the middle who handles every message, which is m-10 itself); (c) no analogy.
  - **Q5, names** (s-04, s-05, f-06): **(a) recommended: "the endpoints loop", with "endpoints" for the Service's list, and "kube-proxy" by its own name** (endpoints is the word engineers and their tools use, "the Service has no endpoints"; kube-proxy is what engineers will say in a meeting, and the page says calls don't pass through it); (b) "the EndpointSlice controller" throughout (exact, but heavier); (c) plain descriptions only ("the loop that keeps each Service's list"; "the rule writer on each node").
  - **Q6, the entry's hands-on widget** (## Shape): **(a) recommended: no hands-on address-list widget**; the pain comes from k-02 and f-01 (a hand-copied list after a rollback) and Ch 3's k-03, already felt; (b) build the entry's widget (the reader keeps an address list current while Pods come and go, then a Service takes over): a widget builder and about 2 more minutes of reader time.
- **R1 (§5 term ledger, Ch 7 row, after build):** add **endpoints** (a Service's list of ready Pods' addresses) and name **kube-proxy** beside Service, DNS name, load balancer, ingress / gateway. Visuals: record ## Visual grammar: the Service block (header `SERVICE · name · address` in `c4`, list row `READY PODS` on `surface-2` with a dashed `c3` rule, entries in the Pod's series colour with version and address, `NONE` in `bad`, a leaving entry struck); Pod addresses plain mono vs. the Service's address mono bold; the calls line `storefront → catalog · answered by …` / `· connection refused`; f-01's hand-copied list as a `c4` band with struck entries; f-03's `FORWARDING RULES` band with a `↻ kube-proxy` pill and no Service on the call's path; f-05's `INTERNET` band, the provider's load balancer as a solid `ink` box on the `CLUSTER` frame's edge, the gateway's rules in the manifest treatment with a `↻ gateway controller` pill; f-06 from `CH07_LOOPS`. Renderer: the pooled `renderCluster` with pool-04; lane S and f-04's snapshots in Ch 7's `site/widgets/w-services-scrolly/`.
- **R2 (§3 Fennel, new Ch 7 story facts):**
  - **Services since the move:** each Fennel service has had a Service of the same name since it entered the cluster (written by Ari; `catalog`'s since its split), reachable only inside the cluster. Callers use names: `storefront` calls `orders` and `catalog`. Illustrative addresses: Services `storefront` 10.96.0.12, `catalog` 10.96.0.21, `orders` 10.96.0.25; Pods `10.4.<node>.<n>`, `orders-q2rw` 10.4.4.7; `catalog`'s Thursday addresses as in f-01.
  - **Tuesday's refused calls** (Ch 5's Tuesday): at each OOM kill (about 12:40, 18:50 and 20:10), `orders`' only Pod was not ready for a few seconds while its container restarted, the `orders` Service's list was empty, and `storefront`'s log shows `connection refused` from `orders`; each time the restarted Pod went back on the list at the same address. Ari's incident note proposes a second copy of `orders` on another node (proposed, not done; whether it's a leak or growth stays open).
  - **The way in:** since the move, Fennel has one gateway (Gateway API, with the provider's controller) behind one cloud load balancer and one public address; its only route sends `fennel.example` to `storefront`.
  - **Exchanges:** Jordan: "Sam used to pass on the new addresses. Who does that now?" Ari: "Nobody. `storefront` doesn't call an address any more. It calls a name." Jordan: "If the name always finds `orders`, what refused us?" At a planning meeting, with partners' apps wanting `catalog`'s prices, Riley: "We want a separate load balancer for every service."
- **R3 (§2.3 loop lens table):** the dashed "another loop, Chapter 7" row becomes the **endpoints loop** (wants: each Service's list holding exactly the ready Pods its selector matches; sees: every Service's selector, the Pods that match it, and which are ready; does: rewrites the Service's list of ready Pods' addresses, taking a Pod off as soon as it stops being ready or starts shutting down; job: connecting). Add **kube-proxy** (one per node; wants: its node's forwarding rules matching every Service's list; sees: every Service and its list; does: rewrites its node's rules, so a call to a Service's address goes straight to one listed Pod, at random by default, and an empty list refuses calls; job: connecting). Ch 8 copies `CH07_LOOPS` and fills in its row.
- **R4 (§6 catalog):** add three entries, owner Ch 7:
  - **m-35** (local-01) "A Service checks whether its Pods are healthy." It copies each Pod's own readiness answer and checks nothing itself; a Pod with no readiness check, or one whose check passes while it's wrong, stays on the list. Ch 12 revisits (with m-15 and m-33).
  - **m-36** (local-02) "A Service balances load, sending each request to the least busy Pod." By default it picks a listed Pod at random when a connection opens, not by load and not per request; long-lived connections stay on one Pod. Ch 8 and Ch 13 revisit.
  - **m-37** (local-03) "Every service needs its own load balancer." Calls inside the cluster need none, and one gateway can route many Services behind a single load balancer; each one is a separate provider machine with its own charge and entry point. Ch 14 revisits.
- **R5 (Ch 8 entry):** every new Pod joins its Service's list only once it is ready, so readiness time adds to scaling lag; long-lived connections don't move to new Pods (m-36), so adding copies may not spread existing load until connections reopen; retrieve the Service block for "new Pods join the list".
- **R6 (Ch 10 entry):** headless Services (the name returns every Pod's address, for databases whose copies must be reached one by one); a Service with no selector or of type ExternalName for a managed database outside the cluster (Ch 7 parking lot).
- **R7 (Ch 11 entry):** the namespace in a DNS name (`orders.<namespace>.svc.cluster.local`; a short name searches only the caller's own area); Gateway API's split of roles between the platform team and product teams, which answers Riley's "control over how they get in"; network policies (Services connect anything to anything by default).
- **R8 (Ch 12 entry):** "is the Service's list empty?" as the first check when a service refuses calls; refused vs. timed out as clues; Pods shutting down while callers still hold connections or stale rules (graceful shutdown); a cloud load balancer's own health checks are the provider's, not Kubernetes'.
- **R9 (Ch 13 and Ch 14 entries, small):** Ch 13: service mesh (per-request balancing, encryption and measurement between services); Ingress NGINX's retirement as the "every tool added is something to run and upgrade" example (about half of environments relied on a controller kept by one or two people); Ingress2Gateway; kube-proxy replacements. Ch 14: cross-provider load-balancer pricing and data-transfer charges; who runs the gateway's controller; kube-proxy mode changes during upgrades.
- **R10 (Ch 15 entry, small):** Tuesday's refused calls (a single copy, an empty list) as an unlabelled capstone clue.
- **R11 (§8 step 5, the pool):** pool-04 (the Service block and `PODS[id].addr`, as in w-services-scrolly's `reuse:`), documented in `explainers/_pool/README.md` and on the pool test page, before Ch 7's build, with every chapter re-gated; optionally with the §9 360px chip-label follow-up (Ch 6 P-08) in the same pass.
