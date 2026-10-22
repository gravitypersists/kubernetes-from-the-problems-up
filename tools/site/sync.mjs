// Mirror explainers/_pool/ into each chapter's site/pool/, so a chapter stays self-contained for
// the didactician gate (it serves site/ only) while the pool keeps one copy in git.
//
//   node tools/site/sync.mjs [ch-04-desired-state …]   mirror into all chapters, or the named ones
//   node tools/site/sync.mjs --check                   report drift only; exit 1 if a copy was edited
//
// site/pool/ is gitignored. Each mirror writes .stamp.json (hash per file), so --check can tell a
// copy that a run edited (drift: move the change into _pool/ or the chapter's assets/) from one
// that is only behind _pool/ (stale: re-run sync).
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { EXPLAINERS, POOL } from './course.mjs';

const hash = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 16);

export function walk(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.name.startsWith('.')) return [];
    return e.isDirectory() ? walk(p, base) : [path.relative(base, p)];
  });
}

export const poolHashes = () => Object.fromEntries(walk(POOL).filter((f) => f !== 'README.md').map((f) => [f, hash(path.join(POOL, f))]));

export function chapters(names = []) {
  const all = fs.readdirSync(EXPLAINERS).filter((n) => /^ch-\d{2}-/.test(n) && fs.existsSync(path.join(EXPLAINERS, n, 'site')));
  for (const n of names) if (!all.includes(n)) throw new Error(`no chapter folder explainers/${n}/site`);
  return names.length ? names : all;
}

// → { drift: [files edited in the copy], stale: [files behind _pool], missing: bool }
export function inspect(name, pool = poolHashes()) {
  const dest = path.join(EXPLAINERS, name, 'site', 'pool');
  const stampFile = path.join(dest, '.stamp.json');
  if (!fs.existsSync(stampFile)) return { drift: [], stale: [], missing: true };
  const stamp = JSON.parse(fs.readFileSync(stampFile, 'utf8'));
  const drift = [], stale = [];
  for (const f of new Set([...Object.keys(stamp), ...walk(dest)])) {
    const file = path.join(dest, f);
    if (!fs.existsSync(file) || !(f in stamp) || hash(file) !== stamp[f]) drift.push(f);
  }
  for (const f of new Set([...Object.keys(pool), ...Object.keys(stamp)])) if (pool[f] !== stamp[f] && !drift.includes(f)) stale.push(f);
  return { drift, stale, missing: false };
}

function mirror(name, pool) {
  const dest = path.join(EXPLAINERS, name, 'site', 'pool');
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });
  for (const f of Object.keys(pool)) {
    fs.mkdirSync(path.dirname(path.join(dest, f)), { recursive: true });
    fs.copyFileSync(path.join(POOL, f), path.join(dest, f));
  }
  fs.writeFileSync(path.join(dest, '.stamp.json'), JSON.stringify(pool, null, 2) + '\n');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const argv = process.argv.slice(2);
  const check = argv.includes('--check');
  const pool = poolHashes();
  let bad = 0;
  for (const name of chapters(argv.filter((a) => !a.startsWith('--')))) {
    const r = inspect(name, pool);
    if (r.drift.length) {
      bad++;
      console.error(`${name}: site/pool/ was edited (${r.drift.join(', ')}). Move the change into explainers/_pool/ ` +
        `(course-wide) or the chapter's site/assets/ (local), then sync. Not overwriting.`);
      continue;
    }
    if (check) {
      console.log(`${name}: ${r.missing ? 'not synced' : r.stale.length ? `stale (${r.stale.join(', ')})` : 'in sync'}`);
      continue;
    }
    mirror(name, pool);
    console.log(`${name}: site/pool/ ← _pool/ (${Object.keys(pool).length} files)`);
  }
  process.exit(bad ? 1 : 0);
}
