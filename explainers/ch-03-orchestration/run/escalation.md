# Escalation: agent-time cap reached before review

- **What failed:** cap `agent_minutes` (75, d-02 "Keep default") reached at 84 min after the widget build (dispatch 05). `round_gate` refused the accuracy-reviewer dispatch.
- **State:** the full gate passes (`run/gate/page-round-4.json`); page and scrollytelling built (dispatches 04, 05). Plan went through one user revise (d-03), which cost a second designer round.
- **Tried:** nothing dispatched around the refusal. History: `run/history/04-page-builder/`, `run/history/05-widget-builder/`; handoffs 01–05.
- **Options:**
  1. Extend by ~45 min: two reviewers (accuracy ∥ pedagogy-ux), one fix round, closure review if needed.
  2. Extend by ~25 min: one merged reviewer (pedagogy-ux with `also_accuracy: true`), one fix round, no closure round.
  3. Stop here: deliver as built, with no independent review.
