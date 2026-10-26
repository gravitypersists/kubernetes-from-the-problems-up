status: done_with_concerns

(Report as returned by the builder, recorded by the orchestrator.)

summary: d-17: dispatch stepper maximum 6 → 5 GB, so the tallest state is 7+1 = 8 nodes in two rows of 4; reserve() holds the taller of the two worst states instead of their sum; spacing tightened throughout. All documented states reproduce. Heights before → after: 768 reserved 1184 → 881 (blank under default 375 → 104); 1280 reserved 1269 → 923 (blank 400 → 86); 360 default 1184 → 1144. Gates: page-round-19 PASS, w-sizing-sandbox-round-6 PASS, selftest PASS.

concerns:
- Plan says dispatch 0.5–6 GB; now 0.5–5 GB.
- Remaining ~86px at desktop is the never-placeable bar's reserved slot.
- "notificat…" still truncated on its chips at 1280/768 (pre-existing; needs pool renderer or smaller chip text).
- NODE · 10 ordering glitch can't occur now (max 8 nodes); pool sort unchanged.

relaxed: plan's dispatch range 0.5–6 GB → 0.5–5 GB (smallest change that fits two rows; nothing on the page relies on 6 GB).

dispositions:
- d-17: fixed (above).
- P-09: fixed: "The widget's "Room for Pods on the rented nodes" bar splits the room nobody uses…"
- k-07-B: fixed: feedback now true to the story's numbers (orders reserves 3 GB, uses 5.5 GB; evicted first if its node runs short); options and key unchanged.
