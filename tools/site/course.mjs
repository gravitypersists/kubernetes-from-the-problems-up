// The course model the site tools share: parts and chapters from CURRICULUM.md §7 (the course
// bible stays the one source for titles and order), joined with what's on disk in explainers/.
import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(import.meta.dirname, '..', '..');
export const EXPLAINERS = path.join(ROOT, 'explainers');
export const POOL = path.join(EXPLAINERS, '_pool');
export const SHELL = path.join(EXPLAINERS, '_site');

// A chapter is live once its run reaches these stages; one waiting for the user's human review is
// published too, tagged Under review; an earlier stage shows as in progress.
const LIVE_STAGES = new Set(['deliver', 'done']);
const REVIEW_STAGES = new Set(['human-review']);

const pad = (n) => String(n).padStart(2, '0');

// Curriculum headings use straight quotes; the pages use typographic ones.
const smart = (s) => s.replace(/"([^"]*)"/g, '“$1”').replace(/'/g, '’');

const decode = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;|&rsquo;/g, '’').replace(/\s+/g, ' ').trim();

// "Say what you want, not what to do: desired state and the reconcile loop" → main + topic.
function split(title) {
  const i = title.indexOf(': ');
  return i < 0 ? { main: title, topic: '' } : { main: title.slice(0, i), topic: title.slice(i + 2) };
}

function chapterDirs() {
  const dirs = new Map();
  for (const name of fs.readdirSync(EXPLAINERS)) {
    const m = /^ch-(\d{2})-/.exec(name);
    if (m && fs.existsSync(path.join(EXPLAINERS, name, 'site', 'index.html'))) dirs.set(Number(m[1]), name);
  }
  return dirs;
}

function readPage(dir) {
  const html = fs.readFileSync(path.join(EXPLAINERS, dir, 'site', 'index.html'), 'utf8');
  const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html);
  const desc = /<meta name="description" content="([^"]*)"/.exec(html);
  const mins = /data-minutes="(\d+)"/.exec(html);
  let stage = 'done';
  try { stage = JSON.parse(fs.readFileSync(path.join(EXPLAINERS, dir, 'run', 'state.json'), 'utf8')).stage; } catch {}
  return { title: h1 && decode(h1[1]), description: desc && decode(desc[1]), minutes: mins && Number(mins[1]), stage };
}

export function loadCourse() {
  const config = JSON.parse(fs.readFileSync(path.join(SHELL, 'site.json'), 'utf8'));
  const text = fs.readFileSync(path.join(ROOT, 'CURRICULUM.md'), 'utf8');
  const start = text.indexOf('\n## 7.'), end = text.indexOf('\n## 8.');
  if (start < 0 || end < 0) throw new Error('CURRICULUM.md: §7 Chapters / §8 headings not found');
  const dirs = chapterDirs();
  const parts = [], chapters = [];
  for (const line of text.slice(start, end).split('\n')) {
    let m;
    if ((m = /^### Part ([IVX]+): (.+)$/.exec(line))) parts.push({ id: m[1], label: `Part ${m[1]}`, name: m[2].trim(), chapters: [] });
    else if (/^### Capstone\s*$/.test(line)) parts.push({ id: 'C', label: 'Capstone', name: 'Mixed practice', chapters: [] });
    else if ((m = /^### Ch (\d+): (.+)$/.exec(line))) {
      if (!parts.length) throw new Error(`CURRICULUM.md: chapter before any part: ${line}`);
      const n = Number(m[1]), dir = dirs.get(n) || null;
      const page = dir ? readPage(dir) : null;
      const title = (page && page.title) || smart(m[2].trim());
      const status = config.status?.[n] || (!dir ? 'pending' : LIVE_STAGES.has(page.stage) ? 'running'
        : REVIEW_STAGES.has(page.stage) ? 'review' : 'creating');
      const ch = { n, no: pad(n), dir, slug: dir, title, ...split(title), status,
        minutes: page?.minutes || null, description: page?.description || '', part: parts.at(-1) };
      parts.at(-1).chapters.push(ch);
      chapters.push(ch);
    }
  }
  for (const [i, ch] of chapters.entries()) { ch.prev = chapters[i - 1] || null; ch.next = chapters[i + 1] || null; }
  for (const ch of chapters) ch.open = ch.status === 'running' || ch.status === 'review';
  const running = chapters.filter((c) => c.status === 'running');
  const review = chapters.filter((c) => c.status === 'review');
  const published = chapters.filter((c) => c.open);
  return { config, parts, chapters, running, review, published, total: chapters.length, pad };
}
