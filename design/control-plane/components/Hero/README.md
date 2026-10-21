The page hero: kicker, title, standfirst and meta row on a blueprint ground, closed by a 3px ink rule.

**Provide:** a module index (`MOD 03`), one or two kicker crumbs, a title (sentence case, ≤ 8 words), a one- or two-sentence standfirst, and 3–5 meta pairs (`Read`, `Level`, `Widgets`, `Checks`, `Rev`).

**Markup:** `header.cp-hero.cp-blueprint > .cp-hero__inner` containing `p.cp-hero__kicker` (`span.cp-hero__idx` + `span.cp-label`s), `h1.cp-hero__title`, `p.cp-hero__standfirst`, `dl.cp-meta` of `div > dt + dd`.

- Do keep the title to two lines at desktop; `max-width: 16ch` and `text-wrap: balance` do the breaking.
- Do write meta values in UPPERCASE mono and zero-pad levels (`02 / 05`).
- Don't add an image or illustration to the hero — the first figure does that job.
- Don't use the accent anywhere else in the hero.
