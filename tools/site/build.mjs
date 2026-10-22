// Stitch the chapters into one static site.
//
//   node tools/site/build.mjs [--out dist] [--serve [port]]
//
// dist/index.html            course home: cover + the course map (Fig. 00)
// dist/pool/                 explainers/_pool/, once (chapters' site/pool/ copies are not shipped)
// dist/course/               explainers/_site/ chrome (course.css, course.js)
// dist/ch-NN-slug/           each live chapter's site/, with pool/ → ../pool/ and the course chrome
//                            (masthead with the course map, end-of-chapter plate) injected as static HTML
//
// No dependencies and no client-side rendering: every link is in the HTML. Chapter folders are
// never modified.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { EXPLAINERS, POOL, ROOT, SHELL, loadCourse } from './course.mjs';
import { chapters as chapterNames, inspect, poolHashes } from './sync.mjs';

const argv = process.argv.slice(2);
const flag = (name) => { const i = argv.indexOf(name); return i < 0 ? null : (argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : true); };
const OUT = path.resolve(ROOT, typeof flag('--out') === 'string' ? flag('--out') : 'dist');

const course = loadCourse();
const { config, parts, chapters, running, total, pad } = course;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const statusWord = { running: 'Running', pending: 'Pending', creating: 'Creating' };

// ---- Fig. 00: the course map ------------------------------------------------------------------
// Fig. 02's grammar: a spec box (the Deployment) connected to plates (nodes) holding tiles (Pods).
// Here the course is the spec, parts are plates, chapters are tiles; unbuilt chapters are Pending.

function pod(ch, { here, base }) {
  const isHere = here === ch.n;
  const word = isHere ? 'You are here' : statusWord[ch.status];
  const top = `<span class="cn-pod__top"><span class="cn-pod__no">Ch ${ch.no}</span>${ch.minutes ? `<span class="cn-pod__min">${ch.minutes} min</span>` : ''}</span>`;
  const body = `${top}<span class="cn-pod__title">${esc(ch.main)}</span>` +
    (ch.topic ? `<span class="cn-pod__topic">${esc(ch.topic)}</span>` : '') +
    `<span class="cn-pod__status"><i class="cn-lamp" aria-hidden="true"></i>${word}</span>`;
  if (ch.status === 'running') {
    return `<a class="cn-pod is-running${isHere ? ' is-here' : ''}" href="${base}${ch.slug}/"${isHere ? ' aria-current="page"' : ''}>${body}</a>`;
  }
  return `<div class="cn-pod is-${ch.status}">${body}</div>`;
}

function meter(n, of) { return `<b>${'█'.repeat(n)}</b>${'░'.repeat(of - n)}`; }

function courseMap({ id, here = null, base }) {
  const live = running.length;
  const spec = `<div class="cn-spec">
      <p class="cn-spec__kind">Course</p>
      <dl class="cn-spec__dl">
        <div><dt>chapters</dt><dd>${pad(total)}</dd></div>
        <div><dt>running</dt><dd>${pad(live)}</dd></div>
        <div><dt>pending</dt><dd>${pad(total - live)}</dd></div>
      </dl>
      <p class="cn-spec__meter" aria-hidden="true">${meter(live, total)}</p>
    </div>`;
  const plates = parts.map((p) => {
    const up = p.chapters.filter((c) => c.status === 'running').length;
    return `<li class="cn-part">
        <i class="cn-link" aria-hidden="true"></i>
        <h3 class="cn-part__bar"><span class="cn-part__id">${esc(p.label)}</span><span class="cn-part__name">${esc(p.name)}</span><span class="cn-part__count">${pad(up)}/${pad(p.chapters.length)} running</span></h3>
        <ol class="cn-pods">${p.chapters.map((c) => `<li>${pod(c, { here, base })}</li>`).join('')}</ol>
      </li>`;
  }).join('\n      ');
  const caption = here
    ? `The whole course: ${total} chapters in ${parts.length - 1} parts and a capstone. Raised tiles are running; dashed ones are Pending, planned but not written yet.`
    : `The course as a cluster. ${total} chapters are wanted and ${live} are running; the rest are Pending, written down as wanted but not built yet.`;
  return `<figure class="cn-map" id="${id}" aria-labelledby="${id}-cap">
  <div class="cn-map__plate">
    <div class="cn-map__bar" aria-hidden="true"><span>Fig. 00</span><span>Course → parts → chapters</span></div>
    <div class="cn-map__ground">
    ${spec}
    <ol class="cn-parts">
      ${plates}
    </ol>
    </div>
  </div>
  <figcaption id="${id}-cap"><span class="cn-label">Fig. 00</span><span>${caption}</span></figcaption>
</figure>`;
}

// ---- masthead ----------------------------------------------------------------------------------

const MARK = `<svg class="cn-mark" viewBox="0 0 16 16" aria-hidden="true"><rect x="5" y="0" width="11" height="10" rx="1"/><rect class="cn-mark__b" x="5" y="12" width="11" height="4" rx="1"/><rect x="0" y="5" width="3" height="11" rx="1"/></svg>`;

function step(ch, dir) {
  const arrow = dir === 'prev' ? '←' : '→';
  if (!ch) return `<span class="cn-bar__${dir} is-off" aria-hidden="true">${arrow}</span>`;
  const label = `<span class="cn-bar__n">${ch.no}</span><span class="cn-bar__t">${esc(ch.main)}</span>`;
  const inner = dir === 'prev' ? `<span aria-hidden="true">←</span>${label}` : `${label}<span aria-hidden="true">→</span>`;
  const what = `${dir === 'prev' ? 'Previous' : 'Next'}: chapter ${ch.no}, ${ch.main}`;
  if (ch.status !== 'running') return `<span class="cn-bar__${dir} is-off" title="${esc(what)} (pending)">${inner}<span class="cn-bar__pend">Pending</span></span>`;
  return `<a class="cn-bar__${dir}" href="../${ch.slug}/" rel="${dir}" aria-label="${esc(what)}">${inner}</a>`;
}

function masthead(ch) {
  const home = `<a class="cn-bar__home" href="${ch ? '../' : './'}">${MARK}<span class="cn-bar__course">${esc(config.title)}</span><span class="cn-bar__short">${esc(config.short)}</span></a>`;
  if (!ch) {
    return `<nav class="cn-bar" aria-label="Course"><div class="cn-bar__inner">${home}<span class="cn-bar__pos">${pad(running.length)}/${pad(total)} running</span></div></nav>`;
  }
  return `<nav class="cn-bar" aria-label="Course"><div class="cn-bar__inner">
  ${home}
  <div class="cn-bar__step">${step(ch.prev, 'prev')}<span class="cn-bar__pos">Ch ${ch.no}<span>/${pad(total)}</span></span>${step(ch.next, 'next')}</div>
  <details class="cn-bar__map"><summary><span class="cn-bar__maplong">Course map</span><span class="cn-bar__mapshort">Map</span></summary>
    <div class="cn-bar__panel">${courseMap({ id: 'cn-map-top', here: ch.n, base: '../' })}</div>
  </details>
</div></nav>`;
}

// ---- end-of-chapter plate ------------------------------------------------------------------------

function nextPlate(ch) {
  const nx = ch.next;
  let head, lead = '';
  if (!nx) {
    head = 'That’s the course';
    lead = `<p class="cn-next__lead">You’ve reached the end. The map is below if you want to go back to a chapter.</p>`;
  } else if (nx.status === 'running') {
    head = `Next: ${esc(nx.main)}`;
    lead = `<a class="cn-next__card" href="../${nx.slug}/">
      <span class="cn-next__no">Chapter ${nx.no}${nx.minutes ? ` · ${nx.minutes} min` : ''}</span>
      <span class="cn-next__title">${esc(nx.title)}</span>
      ${nx.description ? `<span class="cn-next__desc">${esc(nx.description.replace(/^Chapter \d+\.\s*/, ''))}</span>` : ''}
      <span class="cn-next__go">Start chapter ${nx.no} →</span>
    </a>`;
  } else {
    head = `Chapter ${nx.no} isn’t written yet`;
    lead = `<p class="cn-next__lead">Next in the course is <b>${esc(nx.title)}</b>. It’s Pending: planned, not built yet. Here’s where it fits.</p>`;
  }
  return `<section class="cn-next" aria-labelledby="cn-next-h">
  <div class="cn-next__inner">
    <p class="cn-label">End of chapter ${ch.no}</p>
    <h2 class="cn-next__h" id="cn-next-h">${head}</h2>
    ${lead}
    ${courseMap({ id: 'cn-map-end', here: ch.n, base: '../' })}
  </div>
</section>`;
}

// ---- pages ---------------------------------------------------------------------------------------

const FAVICON = `<link rel="icon" href="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="16" height="16" fill="#111110"/><rect x="7" y="3" width="6" height="6" fill="#c43c00"/></svg>')}">`;

function chapterPage(ch) {
  const src = path.join(EXPLAINERS, ch.dir, 'site');
  const dest = path.join(OUT, ch.slug);
  fs.cpSync(src, dest, { recursive: true, filter: (p) => path.relative(src, p) !== 'pool' });
  let html = fs.readFileSync(path.join(src, 'index.html'), 'utf8');
  const need = (re, what) => { if (!re.test(html)) throw new Error(`${ch.dir}/site/index.html: can't find ${what}`); };

  html = html.replace(/(\s(?:href|src)=")pool\//g, '$1../pool/');
  need(/<html\b/, '<html>');
  html = html.replace(/<html\b/, `<html data-cn-chapter="${ch.no}"`);
  need(/<\/head>/, '</head>');
  html = html.replace(/<\/head>/, `${FAVICON}\n<link rel="stylesheet" href="../course/course.css">\n</head>`);
  need(/<body\b[^>]*>/, '<body>');
  html = html.replace(/<body\b[^>]*>/, (m) => `${m}\n${masthead(ch)}\n`);
  // The plate goes after the page grid (rail + main), so it spans the page and stays out of the rail's ToC.
  need(/<\/main>\s*<\/div>/, '</main> followed by the .d-page </div>');
  html = html.replace(/<\/main>\s*<\/div>/, (m) => `${m}\n\n${nextPlate(ch)}\n`);
  need(/<\/body>/, '</body>');
  html = html.replace(/<\/body>/, `<script src="../course/course.js" defer></script>\n</body>`);
  fs.writeFileSync(path.join(dest, 'index.html'), html);
}

function coverArt() {
  // The style guide's cover (components/Cover): ink slab, the one accent block, an ink-4 strip, and
  // a plus-grid cut into the slab at sp-4 pitch.
  let marks = '';
  for (let x = 232; x <= 456; x += 32) for (let y = 24; y <= 184; y += 32) marks += `<path d="M${x - 4} ${y} H${x + 4} M${x} ${y - 4} V${y + 4}"/>`;
  return `<svg viewBox="0 0 480 288" aria-hidden="true" focusable="false">
  <rect class="cn-art__deep" x="200" y="-8" width="288" height="216" rx="2"/>
  <rect class="cn-art__hot" x="24" y="96" width="160" height="168" rx="2"/>
  <rect class="cn-art__tint" x="200" y="224" width="288" height="72" rx="2"/>
  <g class="cn-art__mark">${marks}</g>
</svg>`;
}

function homePage() {
  const first = running[0];
  const minutes = running.reduce((s, c) => s + (c.minutes || 0), 0);
  const data = JSON.stringify(running.map((c) => ({ no: c.no, href: `${c.slug}/`, main: c.main })));
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(config.title)}: ${esc(config.subtitle)}</title>
<meta name="description" content="${esc(config.description)}">
${FAVICON}
<link rel="stylesheet" href="pool/tokens.css">
<link rel="stylesheet" href="pool/components.css">
<link rel="stylesheet" href="course/course.css">
</head>
<body class="d-body cn-home">
${masthead(null)}
<header class="cn-hero">
  <div class="cn-hero__inner">
    <div class="cn-hero__words">
      <p class="cn-hero__kicker"><span class="cn-hero__idx">Course</span><span class="cn-label">${total} chapters · ${parts.length - 1} parts and a capstone</span></p>
      <h1 class="cn-hero__title">${esc(config.title)}<span class="cn-hero__sub">${esc(config.subtitle)}</span></h1>
      <p class="cn-hero__standfirst">Your engineers want Kubernetes. This course follows Fennel, a made-up grocery-delivery startup, from one hand-built server to a cluster, so you can follow the reasoning, predict what the system will do, and ask the questions that matter.</p>
      <dl class="cn-meta">
        <div><dt>Chapters</dt><dd>${pad(total)}</dd></div>
        <div><dt>Running</dt><dd>${pad(running.length)}</dd></div>
        <div><dt>Read so far</dt><dd>${minutes} MIN</dd></div>
        <div><dt>For</dt><dd>TECHNICAL MANAGERS</dd></div>
      </dl>
      ${first ? `<a class="cn-cta" href="${first.slug}/" data-cn-continue>Start with chapter ${first.no} →</a>` : ''}
    </div>
    <div class="cn-hero__art">${coverArt()}</div>
  </div>
</header>
<main class="cn-home__main" id="main">
  <h2 class="cn-home__h"><span class="cn-sec">§ 00</span>The course map</h2>
  <p class="cn-home__lead">Each chapter starts from a problem Fennel runs into and ends with a conversation you could have with your engineers. Read them in order; Chapters 5, 6 and 7 can go in any order once you’ve read Chapter 4.</p>
  ${courseMap({ id: 'cn-map', base: '' })}
</main>
<footer class="cn-foot"><p>Fennel, its people and its incidents are fiction, made up to illustrate how the systems work. Each chapter lists its sources at the end.</p></footer>
<script type="application/json" id="cn-data">${data.replace(/</g, '\\u003c')}</script>
<script src="course/course.js" defer></script>
</body>
</html>
`;
}

// ---- build ---------------------------------------------------------------------------------------

const pool = poolHashes();
let problems = 0;
for (const name of chapterNames()) {
  const r = inspect(name, pool);
  if (r.drift.length) { problems++; console.error(`✗ ${name}: site/pool/ was edited (${r.drift.join(', ')}). The site ships _pool/, so that edit would be lost. Move it into explainers/_pool/ or the chapter's site/assets/.`); }
  else if (r.stale.length) console.warn(`! ${name}: site/pool/ is behind _pool/ (${r.stale.join(', ')}); run npm run sync before gating it.`);
}
if (problems) process.exit(1);

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.cpSync(POOL, path.join(OUT, 'pool'), { recursive: true, filter: (p) => path.basename(p) !== 'README.md' });
fs.mkdirSync(path.join(OUT, 'course'));
for (const f of ['course.css', 'course.js']) fs.copyFileSync(path.join(SHELL, f), path.join(OUT, 'course', f));
for (const ch of running) chapterPage(ch);
fs.writeFileSync(path.join(OUT, 'index.html'), homePage());
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

const size = (dir) => fs.readdirSync(dir, { withFileTypes: true }).reduce((s, e) => s + (e.isDirectory() ? size(path.join(dir, e.name)) : fs.statSync(path.join(dir, e.name)).size), 0);
console.log(`built ${path.relative(ROOT, OUT)}/: home + ${running.length} chapters (${running.map((c) => c.no).join(', ')}), ` +
  `${total - running.length} pending; ${(size(OUT) / 1024).toFixed(0)} KB`);

const serveAt = flag('--serve');
if (serveAt) {
  const port = typeof serveAt === 'string' ? Number(serveAt) : 4173;
  const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };
  http.createServer((req, res) => {
    let file = path.join(OUT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!file.startsWith(OUT)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  }).listen(port, '127.0.0.1', () => console.log(`serving http://127.0.0.1:${port}/`));
}
