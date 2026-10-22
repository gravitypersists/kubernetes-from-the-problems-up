# _pool: shared chapter runtime

One copy of the code every chapter uses. `npm run sync` mirrors this folder into each chapter's
`site/pool/` (gitignored), so a chapter stays self-contained for the didactician gate, which serves
`site/` only. The site build (`npm run build`) ships this folder once, as `dist/pool/`.

| File | What | Source |
| --- | --- | --- |
| `tokens.css` | Control Plane tokens | copy of `design/control-plane/control-plane.css`; change both together |
| `components.css` | kit page skeleton, rail, checks | didactician `kit/components.css` |
| `widget.js` | `Didactician.widget()` mount helper | kit |
| `toc.js` | rail + mobile Contents | kit, plus the course tweak: the rail drops h2 `.cp-sec` numerals |
| `arrow.js`, `replay.js` | arrows, replay control | kit |

**In a run:** reference these as `pool/<file>` from `site/index.html`. Don't edit `site/pool/`:
it's overwritten on sync, and `sync --check` / the build flag an edited copy. Chapter-only changes go
in `site/assets/`. A builder that needs a pool change reports it instead of making it.

**Changing the pool** is a course-level step, outside any run: edit here, `npm run sync`, then
re-gate every chapter (`verify.mjs` on each), because every chapter picks the change up.

**Adding to the pool:** promote code once a second chapter needs it, e.g. a `widgets/` subfolder for
shared renderers. First candidate: Ch 3's scrolly lane controller and `renderFleet`, which Ch 4's
`w-cluster-scrolly` copied and extended.
