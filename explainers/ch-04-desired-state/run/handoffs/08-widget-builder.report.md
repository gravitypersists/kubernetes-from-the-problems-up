status: done_with_concerns

artifacts:
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/widgets/w-cluster-scrolly/data.js — new wording for A1, B3 and B6 and the A5/B6 lens; records marked for deletion added from B3 to B6; the header's format notes updated.
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/widgets/w-cluster-scrolly/index.js — draws records marked for deletion as struck-through marks; new chip label rule for size-1 NOT STARTED Pods; desktop pills no longer drop off the row; thinner Pod strokes at small sizes; the 50vh budget; the sticky/inline decision is now made once per page.
- /Users/m/workspace/k8s-course/explainers/ch-04-desired-state/site/widgets/w-cluster-scrolly/index.css — tighter spacing on phones, padded lens block, the struck-through mark style, and updated load-time height reservations.

summary: All five findings are fixed, plus the orchestrator's B6 note. The widget gate passes (`run/gate/w-cluster-scrolly-round-2.json`). I re-ran every step of both lanes at 360×740, 390×844, 768×1024 and 1280×900, in light and dark:
- no overflow, no console errors, canvas text ≥ 13px, no hard-coded colours;
- gates still hold until their check is committed, and any option unlocks them;
- scrolling back still restores the earlier state (A5 → A2 shows `storefront WANT 3 SHORT 3` again).

Measured canvas heights:

| Viewport | Lane A | Lane B | Mode |
|---|---|---|---|
| 360×740 (50vh = 370) | 363px | 369px | both sticky |
| 390×844 (50vh = 422) | 363px | 398px | both sticky |
| 768×1024 | 468px | 512px | both sticky |
| 1280×900 | 488px | 553px | both sticky; CSS reserves 556px for lane B |
| 600×900 and 768×900 | 446 / 450px | 464px | both inline (lane B can't fit 450px) |

concerns:
- The 50vh budget now applies to the drawing itself. The page-owned slot adds 16px of padding, so the sticky slot is 50vh + 16px; my load-time reservations match that.
- Lane B on phones fits by shrinking the node body to an 18px unit, with 1px Pod strokes and no ring inset. The ring is still drawn, just thinner.
- From B3 on, node 03 keeps its two LOST Pods, and the record keeps their two marks struck through and not counted (`deleting` in `data.js`). This matches "marked for deletion; the records linger". The page builder may want D3 or CH04_LOOPS to say the same.
- Stray "NOT YET" check: the `statusShort` entry and the label are gone from `data.js`.

relaxed:
- none

dispositions:
- A-02: fixed — B3's text now says "the node loop marks node 03's Pods for deletion", followed by the new paragraph "The ReplicaSet loop no longer counts Pods marked this way, so the record now shows the gap that customers have felt since 03:04." The lens `doing` reads "marks its Pods for deletion", right under "node 03: 5 minutes unknown"; the full "node 03's" wording wrapped to a third line on phones. The ariaLabel is reworded to match. On the canvas, the old Pods' marks show struck through from B3 to B6, and the row words still read SHORT 1.
- P-02: fixed — A1 now begins: "Moving day. Kubernetes keeps one record of what Fennel wants and what's running, drawn at the top; `orders`, `payments` and `dispatch` are already in it, and already run on Fennel's cluster."
- P-04: fixed — both lanes are now sticky at 360×740 (363 / 369px ≤ 370) and 390×844 (363 / 398px ≤ 422). Space was saved from:
  - the record padding and line heights;
  - a smaller pill row and less loop spacing;
  - the node bar;
  - the notes spacing;
  - unit 18 with 1px Pod strokes.
  The fit decision is also now per page, so on screens where lane B can't fit (600×900, 768×900) both lanes go inline together.
- P-10: fixed —
  - (a) a size-1 NOT STARTED Pod keeps its service name. Its dashed, unfilled outline marks it as only a record, and the aria-label says "not started" in words. "NOT YET" is removed, and NOT STARTED stays the only form of that status.
  - (b) on desktop every loop pill stays visible, dimmed. Where the row is full, the agents pill shortens to "↻ agents" (as at 1280 B6), and the row wraps only if it still doesn't fit.
  - (c) the lens block is padded 4px on each side inside its highlight outline (2px top and bottom; 1px on phones), so the outline no longer sits on "WATCHING".
- P-11: fixed — part (d): the A5 and B6 lens now reads "WATCHING · each node's assigned Pods". It is the same meaning as the suggested "Pods assigned to each one's node", worded shorter so it doesn't wrap on a 360px phone. Parts (a)–(c) are the page builder's.
- Orchestrator note (B6): fixed — B6 now says "If node 04 doesn't already have the `orders` image, its agent downloads it first, then starts the container." The ariaLabel matches, and "has never run `orders`" is gone.
