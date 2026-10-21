# Control Plane: the course style guide

Every chapter page uses this style so the course reads as one piece. It was authored as a design system artifact (https://claude.ai/artifact/P9VJJFKBh4aak599h8VUXd); this folder is the copy that runs read.

**Files**

- `control-plane.css`: the tokens as CSS variables, using the didactician kit's exact names (light, dark, mobile sizes, reduced motion, Google Fonts import). In a didactician run, copy it to `site/assets/tokens.css` **in place of** the kit's default `tokens.css`.
- `tokens.json`: the same tokens with a usage note on each. Read the notes; they say where each token may and may not go.
- `components/bundle.css`: reference treatments (`cp-` classes) for the hero, prose, figure plates, SVG vocabulary, slider widgets and checks. Copy what you need into the page's CSS; every value is a `var(--token)`.
- `components/<Name>/README.md`: what each treatment needs and its rules. `preview.html` beside it shows it working (open it in a browser).

If you change a token, change it in both `tokens.json` and `control-plane.css`.

---

Control Plane is the house style for single-page interactive explainers in a Kubernetes course: long serif prose, blueprinted diagrams, a few instrument-panel widgets and the occasional check. Monochrome first; one signal orange; everything outlined, squared and labelled like a drafted plate.

## Using the tokens

- Drop `control-plane.css` into the kit. It declares every token under `:root` with the kit's exact names, overrides type sizes under 640px, and re-declares colours and `--shadow-1` both under `@media (prefers-color-scheme: dark)` (skipped when `[data-theme="light"]` is set) and under `[data-theme="dark"]`. It also loads the three Google Fonts.
- `components/bundle.css` holds the sample treatments (`cp-` classes). It is reference CSS — copy what you need; every value in it is a `var(--token)`.
- `--accent-ink` means "ink drawn on an accent fill", not "accent used as ink". Use `--accent` itself for orange text.
- Series soft tints `--c5-soft` and `--c6-soft` are extras beyond the kit's list; nothing breaks if they go unused.

## Content fundamentals

- Write to one reader, second person, present tense: "You scale the Deployment to five." Never "we will learn".
- Sentence case for every heading and title. UPPERCASE is reserved for mono chrome — kickers, figure numbers, widget headers, check labels, status words.
- Kubernetes object kinds are capitalised as the API spells them (Pod, ReplicaSet, Deployment). Field names, commands and values go in `code`: `nodeName`, `kubectl apply`, `Pending`.
- Numbers that change are mono and zero-padded to their maximum width (`03`, `12`) so the readout never jitters.
- No emoji, no exclamation marks. Wit lives in the analogies, not the punctuation.

## Visual foundations

**Colour.** The page is greyscale: `bg` ground, `surface` panels, `surface-2` wells; text in `ink` → `ink-2` (standfirst, captions) → `ink-3` (mono labels, meta). `ink-4` and `line` never carry text. `accent` (signal orange) appears at most once per viewport as a mark: the module index, a § numeral, a link, the active slider fill, the check label. Status colours `good`, `bad`, `warn` always travel with a word (CORRECT, NOT QUITE, PENDING) — colour is never the only signal. `bad` is a magenta-red so it never reads as the accent.

**Diagram series.** `c1`–`c6` are an Okabe–Ito-derived set, re-weighted so each pair stays apart in lightness or hue under protan, deutan and tritan simulation in both themes. Give the essay's protagonist `c1` (orange). Shapes: `cN-soft` fill + `cN` stroke at `--stroke`. `c6` (graphite) is always dashed so it can't be mistaken for ink. Label shapes directly in `ink` mono 13px; no legends unless there are more than four series.

**Contrast.** Every text token reaches ≥ 4.5:1 on `bg`, `surface` and `surface-2` in both themes; `c1`–`c6` reach ≥ 3:1 on `bg` and `surface` as marks; `ink` reaches ≥ 4.5:1 on every `cN-soft`. Focus is a solid 2px `focus` outline at 2px offset (≥ 3:1 on all three surfaces).

**Type.** Body in Source Serif 4 at `fs-body`/`lh-body` (18/28, 17/26 under 640px), measure `--measure` (66ch). Headings in Archivo, tight, `font-stretch: 112%` for h1 and 106% for h2 — the stretched grotesk is the Swiss-poster half of the look. Space Mono for all chrome and every number that changes; captions and SVG labels at `fs-caption` (13px). h2 carries a mono `§ 02` numeral in `accent` above it and a 1.5px `ink` rule.

**Space.** 8px grid: `--sp-1` … `--sp-12`, plus `--sp-half` (4px) for hairline gaps. Prose paragraphs `sp-3` apart; h2 gets `sp-8` above; figures, widgets and checks `sp-8` above and below.

**Line, shape, depth.** Everything is outlined in `ink` at `--stroke` (1.5px); 3px for emphasis (the chosen answer, the hero's bottom rule). Corners are `radius-1` (2px) — almost square; `radius-3` only for pills. `--shadow-1` is a hard 4px offset plate, not a blur: only on interactive panels (widgets, checks) so "you can touch this" is legible at a glance. Figures get no shadow.

**Blueprint.** `.cp-blueprint` lays a `line` grid at `sp-4` pitch behind the hero and inside figure plates — never behind body prose. Figure plates get a mono header bar (`FIG. 02` left, a terse subject right).

**Motion.** `--ease-out` everywhere. `dur-1` for hover/press, `dur-2` for feedback reveals and readouts, `dur-3` for step-through frames. All three collapse to 0 under `prefers-reduced-motion`.

**Touch.** Every control is at least `--tap` (44px) tall; option buttons are `tap + sp-1`.

## Iconography

No icon set. Glyphs are typographic: `→` for flow, `×` for counts, `§` for sections, square status lamps (`.cp-lamp`) for live widgets. Diagram arrowheads are solid `ink` triangles.
