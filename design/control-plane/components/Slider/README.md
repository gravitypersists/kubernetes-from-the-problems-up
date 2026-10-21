A widget panel with a range slider driving a live mono readout and a small visualization.

**Provide:** a widget number and title for the bar, the parameter name, `min`/`max`/`step`/initial value, a render function for the visualization, and a one-line note that tells the reader what to try.

**Markup:** `section.cp-widget` > `.cp-widget__bar` (`.cp-lamp`, `.cp-label`s) and `.cp-widget__body` with `.cp-readout` (an `output.cp-readout__value` with `aria-live="polite"`), the visualization, `.cp-range-wrap` (`label`, `input.cp-range`, `.cp-scale`), and `p.cp-widget__note`.

- Set `--pct` on the input on every `input` event; it paints the accent fill.
- Zero-pad the readout to the max's width so digits don't jitter.
- The note names the interesting threshold ("drag past 9").
- Keyboard: native range arrows/PageUp/Home/End; don't override them.
- Don't put more than one slider in a panel; use a second widget instead.
