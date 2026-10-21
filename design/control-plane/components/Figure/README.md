A figure plate: ink-outlined frame, mono header bar, blueprint ground, a directly labeled inline SVG, and a numbered caption below.

**Provide:** a figure number, a terse subject for the bar (`DEPLOYMENT → PODS → NODES`), an inline `svg.cp-svg` with `role="img"`, `<title>` and `<desc>`, and a one- or two-sentence caption that states the takeaway.

**SVG vocabulary** (classes in `bundle.css`): `.c1`–`.c6` series shapes (soft fill + series stroke; `.c6` dashed), `.s1`–`.s6` solid series fills, `.plate` neutral container, `.k` ink connector, `.kl` dashed ink-4 guide, `.arrow` arrowhead fill, `text` 13px mono ink, `text.t-label` bold uppercase, `text.t-mute` ink-3.

- Label shapes directly, next to or inside the shape — no legends for ≤ 4 series.
- Author viewBoxes ≤ 600 wide so 13px labels survive the phone column; for wider diagrams ship a stacked variant for < 480px.
- Draw connectors after containers so arrowheads are never hidden.
- Never rely on hue alone: pair series colour with position, label, or dash.
