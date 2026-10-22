/* w-cluster-scrolly · Ch 04 §04 "Moving day" and §05 "Saturday, 03:04": two scrollytelling lanes over
   one drawing of Fennel's four-node cluster, the cluster's record and the loops that work on it.
   Classic script; needs assets/widget.js (Didactician.widget) and ./data.js (ClusterData).

   Copied from Ch 03's w-fleet-scrolly (renderFleet and its lane controller) and extended; Ch 03's
   files are untouched. Two parts, both meant to be copied by later chapters (plan reuse: Ch 5, 6, 7,
   8, 12):
   1. renderCluster(target, state, opts)  draws ONE complete snapshot (format: see data.js) into
      `target`: a figure plate with a mono header bar (widget, lane, clock kicker, STEP n / N); the
      cluster's record (c4 on c4-soft: one row per service, WANT n, computed Pod marks and row word);
      the loop pills (c3, ↻) with the acting loop's lens line; the node frames (Ch 03's machine frame,
      NODE · NN, an "↻ agent" pill and the record's view of the node on the bar), whose bodies hold
      CAPACITY units of room, Pods (Ch 03's chip inside an inset ink ring, height = size), "N FREE",
      and a DOWN body for a dead machine; and the CUSTOMERS / connection note lines. Exposed as
      window.ClusterCanvas.renderCluster, with laneLayout() and measureReserve() so a lane's states
      can share one height (CURRICULUM §8 step 5).
   2. The lane controller (mount contract in index.html, above the first mount): collects the lanes
      of BOTH mounts, fills [data-step-text] and [data-step-snap], activates the step whose top last
      crossed 55% of the viewport (IntersectionObserver), restores that step's snapshot on the lane
      canvas, and locks gated steps until the page's checks dispatch 'didactician:check-commit'.
      Gates never re-lock. Where a lane's fitted canvas would still be taller than its budget (50vh
      under 900px, the viewport above), every mount gets data-cs-fit="inline" and each step shows
      its own snapshot instead (index.css): decided by measurement, not by device, and per page, so
      both lanes behave the same way on one screen.
   No libraries, no network. */
(function () {
  'use strict';

  var D = window.ClusterData;
  var S = D && D.STRINGS;
  var ID = 'w-cluster-scrolly';

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------- text measurement (13px mono chrome; widths decide label breaks and fallbacks) ---------- */
  var mctx = document.createElement('canvas').getContext('2d');
  var monoFamily = null;
  function family() {
    if (!monoFamily) {
      monoFamily = (getComputedStyle(document.documentElement).getPropertyValue('--font-mono') || '').trim() || 'monospace';
    }
    return monoFamily;
  }
  /* ls = letter-spacing in em */
  function textW(s, weight, ls) {
    mctx.font = (weight || 700) + ' 13px ' + family();
    return mctx.measureText(s).width + (ls || 0) * 13 * s.length;
  }

  /* ---------- the snapshot model ---------- */
  function parseEntry(entry) {
    var i = entry.indexOf(':');
    return i < 0 ? { id: entry, status: 'running' } : { id: entry.slice(0, i), status: entry.slice(i + 1) };
  }
  function has(list, x) { return (list || []).indexOf(x) >= 0; }
  function nodeIds(state) {
    var ids = Object.keys(state.nodes || {});
    D.NODES.forEach(function (n) { if (ids.indexOf(n) < 0) ids.push(n); });
    return ids.sort();
  }
  function podService(id) { return D.PODS[id].service; }
  function usedRoom(state, n) {
    return (state.nodes[n] || []).reduce(function (t, entry) {
      return t + D.SERVICES[podService(parseEntry(entry).id)].size;
    }, 0);
  }
  /* where each Pod is, and its status, from `nodes` */
  function podIndex(state) {
    var idx = {};
    nodeIds(state).forEach(function (n) {
      (state.nodes[n] || []).forEach(function (entry) {
        var p = parseEntry(entry);
        idx[p.id] = { node: n, status: p.status };
      });
    });
    return idx;
  }
  /* The record's marks and row word, computed (plan ## Visual grammar; data.js header). */
  function recordRows(state) {
    var rec = state.record || { rows: [], want: {}, pods: {} };
    var idx = podIndex(state);
    var unknown = state.nodeStatus || {};
    return rec.rows.map(function (svc) {
      var pods = rec.pods[svc] || [];
      var want = rec.want[svc] || 0;
      var marks = pods.map(function (id) {
        var at = idx[id];
        if (!at) return 'rec';
        if (unknown[at.node] === 'unknown') return 'unk';
        return (at.status === 'running' || at.status === 'lost') ? 'run' : 'rec';
      });
      /* records marked for deletion: still in the record, drawn struck through, not counted */
      ((rec.deleting || {})[svc] || []).forEach(function () { marks.push('del'); });
      var run = marks.filter(function (m) { return m === 'run'; }).length;
      var unk = marks.filter(function (m) { return m === 'unk'; }).length;
      var word;
      if (pods.length < want) word = [{ t: S.record.short + ' ' + (want - pods.length), tone: 'warn', rank: 3 }];
      else {
        word = [{ t: run + ' ' + S.record.running, tone: run >= want ? 'good' : 'mute', rank: 1 }];
        if (unk) word.push({ t: unk + ' ' + S.record.unknown, tone: 'warn', rank: 2 });
      }
      return { svc: svc, want: want, marks: marks, word: word };
    });
  }
  function wordText(parts) { return parts.map(function (p) { return p.t; }).join(' · '); }
  function compactWord(parts) {
    return [parts.reduce(function (a, b) { return b.rank > a.rank ? b : a; })];
  }

  /* ---------- layout ---------- */
  var BORDER = 1.5, LAMP = 12, MARK = 10, MARKGAP = 4, NARROW_LS = -0.02;
  var widestOneLine = null;   /* the widest label a size-1 chip must show on one line */
  function geometry(width, n, unit) {
    var narrow = width < 440;   /* phone column: tighter chrome */
    var g = {
      width: width, narrow: narrow, n: n || 4,
      pad: narrow ? 3 : 6,          /* plate padding */
      gapM: narrow ? (width < 340 ? 2 : 3) : 8,   /* between node frames */
      bodyPad: narrow ? 1 : 3,
      ringPad: narrow ? 1 : 2,      /* the Pod ring's inset */
      chipPadX: narrow ? 1 : 3,
      lh: narrow ? 14 : 16,         /* chip line height (text stays 13px) */
      gapU: narrow ? 3 : 4,         /* between stacked units of room */
      row: narrow ? 3 : 6,          /* between the plate's blocks */
      barPadX: narrow ? 2 : 4,
      pillPadX: narrow ? 3 : 6,
      recPadX: narrow ? 4 : 8,
      recGap: narrow ? 6 : 12,
      chipLs: narrow ? NARROW_LS : 0,
      bw: BORDER                    /* the Pod ring's and chip's stroke */
    };
    /* small units (fitting a canvas into 50vh): 1px Pod strokes and no ring inset, so a size-1 Pod
       still holds one 13px line (CSS: .wc--thin) */
    if (unit && unit < (narrow ? 20 : 22)) { g.bw = 1; g.ringPad = 0; g.thin = true; }
    if (narrow) { g.gapU = unit && unit < 20 ? 2 : 3; }
    g.inner = width - 2 * BORDER - 2 * g.pad;
    g.colW = (g.inner - (g.n - 1) * g.gapM) / g.n;
    var text = function () { return g.colW - 2 * BORDER - 2 * g.bodyPad - 4 * g.bw - 2 * g.ringPad - 2 * g.chipPadX; };
    g.chipTextW = text();
    if (narrow) {
      /* the narrowest columns (an inline snapshot on a phone): give up the ring's inset before a
         one-line label (a size-1 Pod's name) has to be cut */
      if (widestOneLine == null) {
        widestOneLine = 0;
        Object.keys(D.SERVICES).forEach(function (k) {
          if (D.SERVICES[k].size === 1) widestOneLine = Math.max(widestOneLine, textW(D.SERVICES[k].label, 700, NARROW_LS));
        });
      }
      if (g.chipTextW + 0.5 < widestOneLine) { g.ringPad = 0; g.chipTextW = text(); }
    }
    g.barTextW = g.colW - 2 * BORDER - 2 * g.barPadX;
    g.recInner = g.inner - 2 * BORDER - 2 * g.recPadX;
    return g;
  }
  function pillW(g, label) { return textW(S.loopMark + ' ' + label, 700) + 2 * g.pillPadX + 2 * BORDER; }
  function barId(g, n) { return g.narrow ? S.node + ' ' + n : S.node + ' · ' + n; }
  /* the node bar's second part: the agent pill, the record's status word, or both if they fit */
  function barRowW(g, ns, agentW) {
    if (!ns) return { pill: true, w: agentW };
    var stW = textW(S.nodeStatus[ns], 700, 0.04);
    return agentW + 4 + stW <= g.barTextW ? { pill: true, w: agentW + 4 + stW } : { pill: false, w: stW };
  }
  function agentsLabel(nodes) { return S.agents + ' · ' + nodes.join(', '); }

  /* Choices that depend on the canvas width and must hold for EVERY state of a lane, so all of a
     lane's states read alike and share one height: header title, record title and row words, which
     loop pills to draw, whether note tails fit. */
  function laneLayout(width, states, header) {
    var maxN = Math.max.apply(null, states.map(function (s) { return nodeIds(s).length; }));
    var g = geometry(width, maxN);
    var L = { width: width, narrow: g.narrow };

    /* header bar: [title] … [clock] [step] */
    var barInner = width - 2 * BORDER - 16;
    var clocks = states.map(function (s) { return s.clock || ''; });
    var clockW = Math.max.apply(null, clocks.map(function (c) { return c ? textW(c.toUpperCase(), 700, 0.08) : 0; }));
    var total = header ? header.total : states.length;
    var stepFull = (S.step + ' ' + total + ' / ' + total).toUpperCase();
    var stepShort = total + ' / ' + total;
    var lane = header ? header.lane.toUpperCase() : '';
    var titles = [
      (S.widget + ' · ' + lane).toUpperCase(),
      (S.widgetShort + ' · ' + lane).toUpperCase(),
      S.widgetShort.toUpperCase()
    ];
    var tries = [[0, 0], [1, 0], [1, 1], [2, 0], [2, 1]];
    L.title = 2; L.stepShort = true;
    for (var k = 0; k < tries.length; k++) {
      var tw = textW(titles[tries[k][0]], 700, 0.08) + 8;
      var sw = textW(tries[k][1] ? stepShort : stepFull, 700, 0.08);
      var cw = clockW ? clockW + 12 : 0;
      if (tw + cw + sw <= barInner) { L.title = tries[k][0]; L.stepShort = !!tries[k][1]; break; }
    }
    L.hasClock = clockW > 0;

    /* record: title, column widths, full or compact row words */
    L.recTitle = textW(S.record.title.toUpperCase(), 700, 0.06) <= g.recInner ? S.record.title : S.record.titleShort;
    var rows = [], maxMarks = 0;
    states.forEach(function (s) {
      recordRows(s).forEach(function (r) { rows.push(r); maxMarks = Math.max(maxMarks, r.marks.length, r.want); });
    });
    var nameW = 0, wantW = 0, fullW = 0, compW = 0;
    rows.forEach(function (r) {
      nameW = Math.max(nameW, textW(r.svc, 700));
      wantW = Math.max(wantW, textW(S.record.want + ' ' + r.want, 400));
      fullW = Math.max(fullW, textW(wordText(r.word), 700));
      compW = Math.max(compW, textW(wordText(compactWord(r.word)), 700));
    });
    var marksW = Math.max(1, maxMarks) * (MARK + MARKGAP) - MARKGAP;
    var fixed = nameW + wantW + marksW + 3 * g.recGap;
    L.cols = { name: Math.ceil(nameW), want: Math.ceil(wantW), marks: Math.ceil(marksW), gap: g.recGap };
    L.fullWord = fixed + fullW <= g.recInner;
    L.maxRows = Math.max.apply(null, states.map(function (s) { return (s.record || { rows: [] }).rows.length; }));

    /* loop pills: on a wide canvas all of them, dimmed unless acting, wherever a state's pills fit
       one row (renderCluster checks per state); on a narrow canvas only the acting one */
    L.pills = g.narrow ? 'active' : 'fit';

    /* node bar on one row (NODE · 01, then the agent pill and/or UNKNOWN) where that fits for every
       node in every state; else two rows */
    var agentW = pillW(g, S.agent);
    L.barOneRow = states.every(function (s) {
      return nodeIds(s).every(function (n) {
        return textW(barId(g, n), 700, 0.04) + 6 + barRowW(g, (s.nodeStatus || {})[n], agentW).w <= g.barTextW;
      });
    });

    /* notes: the ink-3 tail on a wide canvas (it may wrap); dropped on a narrow one */
    L.noteSub = !g.narrow;
    L.hasNotes = states.some(function (s) { return (s.notes || []).length; });
    L.hasBanner = states.some(function (s) { return !!s.banner; });
    L.hasStatus = states.some(function (s) { return Object.keys(s.nodeStatus || {}).length; });
    return L;
  }

  /* ---------- chip label lines ----------
     Full label: name (broken as data.js allows when too wide), version, restarts, status word with a
     lamp. When the chip is too short for all of it: an abnormal chip keeps its status word (and its
     name if there's room; the step text names the service); a RUNNING chip keeps its name and is left
     unmarked, so colour is never the only signal. */
  function chipLines(pod, status, restarts, g, maxLines) {
    var svc = D.SERVICES[pod.service];
    var fits = function (s, extra) { return textW(s, 700, g.chipLs) + (extra || 0) <= g.chipTextW + 0.5; };
    var name = fits(svc.label) ? [svc.label] : svc.breaks.slice();
    var nameLines = name.map(function (t) { return { t: t }; });
    var body = nameLines.slice();
    var extras = [];
    if (pod.version) extras.push(pod.version);
    if (restarts) extras.push(S.loopMark + ' ' + restarts);
    extras.forEach(function (x) {
      var last = body[body.length - 1];
      if (fits(last.t + ' ' + x)) body[body.length - 1] = { t: last.t + ' ' + x };
      else body.push({ t: x });
    });
    var word = S.status[status];
    var stLines;
    if (fits(word, status === 'notstarted' ? 0 : LAMP) || !S.statusBreaks[status]) {
      stLines = [{ st: status, t: word, lamp: status !== 'notstarted' && fits(word, LAMP) }];
    } else {
      stLines = S.statusBreaks[status].map(function (t) { return { st: status, t: t, lamp: false }; });
    }
    if (body.length + stLines.length <= maxLines) return body.concat(stLines);
    if (status !== 'running') {
      if (stLines.length > maxLines) {
        /* one line, and the word doesn't fit there: a NOT STARTED Pod keeps its name, since its dashed,
           unfilled outline already says "only a record" (the canvas aria-label says it in words);
           other statuses keep their word, as in Ch 03 */
        if (status === 'notstarted' && !fits(word)) return nameLines.slice(0, 1);
        stLines = [{ st: status, t: word, lamp: false }];
      }
      var room = maxLines - stLines.length;
      var keep = body.length <= room ? body : (nameLines.length <= room ? nameLines : []);
      return keep.concat(stLines);
    }
    /* RUNNING is the normal state: with no room for its word, it stays unmarked (no colour-only lamp) */
    return body.length <= maxLines ? body : nameLines.slice(0, Math.max(1, maxLines));
  }

  /* ---------- renderCluster ---------- */
  /* opts: { width, unit, layout (laneLayout), reserve (measureReserve), highlight: [keys], lit: bool,
             header: { lane: 'Moving day', n: 2, total: 5 }, bleed: bool } — all optional.
     `width` must be the width the plate will have (bleed: the target's width plus its bleed). */
  function renderCluster(target, state, opts) {
    opts = opts || {};
    var width = opts.width || target.clientWidth || 320;
    var L = opts.layout || laneLayout(width, [state], opts.header);
    var u = opts.unit || (L.narrow ? 22 : 32);
    var g = geometry(width, Math.max(nodeIds(state).length, 1), u);
    var R = opts.reserve || {};
    var hl = {};
    (opts.highlight || []).forEach(function (h) { hl[h] = true; });
    var mark = function (node, key) { if (hl[key]) node.classList.add('is-hl'); return node; };
    var unitsH = function (n) { return n * u + (n - 1) * g.gapU; };
    var minH = function (node, h) { if (h) node.style.minHeight = h + 'px'; return node; };
    var loops = state.loops || { shown: [], active: [], agents: [] };
    var agents = loops.agents || [];

    var root = el('div', 'wc' + (g.narrow ? ' wc--narrow' : '') + (g.thin ? ' wc--thin' : '') + (opts.bleed ? ' wc--bleed' : '') + (opts.lit === false ? '' : ' is-lit'));
    root.setAttribute('data-unit', u);
    [['pad', g.pad], ['gapm', g.gapM], ['bodypad', g.bodyPad], ['ringpad', g.ringPad], ['chippad', g.chipPadX],
     ['row', g.row], ['gapu', g.gapU], ['barpad', g.barPadX], ['pillpad', g.pillPadX], ['recpad', g.recPadX]
    ].forEach(function (v) { root.style.setProperty('--wc-' + v[0], v[1] + 'px'); });

    /* header bar: "W-01 · THE CLUSTER · SATURDAY, 03:04" … "~03:04:50" "STEP 2 / 6" */
    if (opts.header) {
      var bar = el('div', 'wc__bar');
      var h = opts.header;
      var lane = h.lane.toUpperCase();
      var title = [(S.widget + ' · ' + lane), (S.widgetShort + ' · ' + lane), S.widgetShort][L.title].toUpperCase();
      bar.appendChild(el('span', 'wc__title', title));
      if (L.hasClock) bar.appendChild(el('span', 'wc__clock', (state.clock || '').toUpperCase()));
      bar.appendChild(el('span', 'wc__step', L.stepShort ? h.n + ' / ' + h.total : (S.step + ' ' + h.n + ' / ' + h.total).toUpperCase()));
      root.appendChild(bar);
    }

    var ground = el('div', 'wc__ground');
    root.appendChild(ground);

    if (L.hasBanner) {
      var ban = minH(el('p', 'wc__banner'), R.banner);
      if (state.banner) ban.appendChild(mark(el('span', 'wc__banner-t', state.banner), 'banner'));
      ground.appendChild(ban);
    }

    /* the cluster's record: a written intention (c4 on c4-soft) */
    var rec = minH(el('div', 'wc-rec'), R.rec);
    rec.style.setProperty('--wc-cols', L.cols.name + 'px ' + L.cols.want + 'px ' + L.cols.marks + 'px minmax(0, 1fr)');
    rec.style.setProperty('--wc-recgap', L.cols.gap + 'px');
    rec.appendChild(el('p', 'wc-rec__head', L.recTitle));
    var rowsEl = el('div', 'wc-rec__rows');
    recordRows(state).forEach(function (r) {
      var row = mark(el('div', 'wc-rec__row'), 'row:' + r.svc);
      row.setAttribute('data-row', r.svc);
      row.appendChild(el('span', 'wc-rec__name', r.svc));
      row.appendChild(el('span', 'wc-rec__want', S.record.want + ' ' + r.want));
      var mk = el('span', 'wc-rec__marks');
      r.marks.forEach(function (m) {
        var s = el('i', 'wc-mark wc-mark--' + m, m === 'unk' ? '?' : null);
        mk.appendChild(s);
      });
      row.appendChild(mk);
      var word = el('span', 'wc-rec__word');
      (L.fullWord ? r.word : compactWord(r.word)).forEach(function (p, i) {
        if (i) word.appendChild(el('span', 'wc-rec__sep', ' · '));
        word.appendChild(el('span', 'wc-tone--' + p.tone, p.t));
      });
      row.appendChild(word);
      rowsEl.appendChild(row);
    });
    rec.appendChild(rowsEl);
    ground.appendChild(rec);

    /* loops: pills (an actor: c3, ↻) and the acting loop's lens line */
    var lp = minH(el('div', 'wc-loops'), R.loops);
    var pills = el('div', 'wc-loops__pills');
    var acting = (loops.active || []).length || agents.length;
    var pillList = (loops.shown || []).map(function (id) {
      return { key: 'loop:' + id, label: D.LOOPS[id].label, on: has(loops.active, id) };
    });
    var rowW = function () { return pillList.reduce(function (t, p) { return t + pillW(g, p.label) + 6; }, -6); };
    if (agents.length) {
      var ag0 = { key: 'agents', label: agentsLabel(agents), on: true,
        hl: agents.some(function (n) { return hl['agent:' + n]; }) };
      pillList.push(ag0);
      /* the nodes are named by the lit agent pills on their bars; drop them here if the row is full */
      if (L.pills !== 'active' && rowW() > g.inner - 4) ag0.label = S.agents;
    }
    var onlyActive = L.pills === 'active';
    pillList.forEach(function (p) {
      if (onlyActive && acting && !p.on) return;
      var pill = el('span', 'wc-pill' + (p.on ? ' is-on' : ''));
      if (hl[p.key] || p.hl) pill.classList.add('is-hl');
      pill.appendChild(el('span', 'wc-pill__mark', S.loopMark));
      pill.appendChild(el('span', 'wc-pill__name', p.label));
      pills.appendChild(pill);
    });
    lp.appendChild(pills);
    if (loops.lens) {
      var lens = mark(el('div', 'wc-lens'), 'lens');
      [['watching', loops.lens.watching], ['doing', loops.lens.doing]].forEach(function (x) {
        var line = el('p', 'wc-lens__line');
        line.appendChild(el('b', 'wc-lens__k', S.lens[x[0]]));
        line.appendChild(document.createTextNode(' · ' + x[1]));
        lens.appendChild(line);
      });
      lp.appendChild(lens);
    }
    ground.appendChild(lp);

    /* nodes */
    var row = el('div', 'wc__nodes');
    var ids = nodeIds(state);
    row.style.gridTemplateColumns = 'repeat(' + ids.length + ', minmax(0, 1fr))';
    var chipLinesMax = function (size) {
      var inner = unitsH(size) - 4 * g.bw - 2 * g.ringPad - 2;
      return Math.max(1, Math.floor(inner / g.lh));
    };
    var agentW = pillW(g, S.agent);
    ids.forEach(function (n) {
      var down = has(state.down, n);
      var ns = (state.nodeStatus || {})[n];
      var f = mark(el('div', 'wc-n' + (down ? ' is-down' : '')), 'n:' + n);
      f.setAttribute('data-n', n);
      var nb = minH(el('div', 'wc-n__bar' + (L.barOneRow ? ' wc-n__bar--row' : '')), R.bar);
      nb.appendChild(el('span', 'wc-n__id', barId(g, n)));
      var r2 = el('span', 'wc-n__row');
      if (barRowW(g, ns, agentW).pill) {
        var ag = el('span', 'wc-pill wc-pill--agent' + (has(agents, n) ? ' is-on' : ''));
        mark(ag, 'agent:' + n);
        ag.appendChild(el('span', 'wc-pill__mark', S.loopMark));
        ag.appendChild(el('span', 'wc-pill__name', S.agent));
        r2.appendChild(ag);
      }
      if (ns) r2.appendChild(mark(el('b', 'wc-n__st wc-tone--warn', S.nodeStatus[ns]), 'status:' + n));
      nb.appendChild(r2);
      f.appendChild(nb);

      var body = el('div', 'wc-n__body');
      body.style.height = (unitsH(D.CAPACITY) + 2 * g.bodyPad) + 'px';
      (state.nodes[n] || []).forEach(function (entry) {
        var c = parseEntry(entry);
        var info = D.PODS[c.id];
        var size = D.SERVICES[info.service].size;
        var pod = mark(el('div', 'wc-p wc-p--' + c.status), 'p:' + c.id);
        pod.setAttribute('data-p', c.id);
        pod.style.height = unitsH(size) + 'px';
        var chip = el('div', 'wc-c');
        var lines = chipLines(info, c.status, (state.restarts || {})[c.id], g, chipLinesMax(size));
        if (lines.length === 1 && unitsH(size) - 4 * g.bw - 2 * g.ringPad < g.lh + 2) chip.classList.add('wc-c--tight');
        lines.forEach(function (ln) {
          var span = el('span', 'wc-c__ln' + (ln.st ? ' wc-st wc-st--' + ln.st : ''));
          if (ln.st && ln.lamp) { var lmp = el('i', 'wc-lamp'); lmp.setAttribute('aria-hidden', 'true'); span.appendChild(lmp); }
          span.appendChild(document.createTextNode(ln.t));
          chip.appendChild(span);
        });
        pod.appendChild(chip);
        body.appendChild(pod);
      });
      var free = D.CAPACITY - usedRoom(state, n);
      if (free > 0) {
        if (down) {
          /* reality: the machine is dead. What the record believes about it is on the bar. */
          var dn = el('div', 'wc-down', S.down);
          dn.style.height = unitsH(free) + 'px';
          body.appendChild(dn);
        } else {
          var fr = mark(el('div', 'wc-free', free + ' ' + S.free), 'free:' + n);
          fr.style.height = unitsH(free) + 'px';
          body.appendChild(fr);
        }
      }
      f.appendChild(body);
      row.appendChild(f);
    });
    ground.appendChild(row);

    /* note lines: what customers experience, and the connection line */
    if (L.hasNotes) {
      var notes = minH(el('div', 'wc__notes'), R.notes);
      (state.notes || []).forEach(function (nt) {
        var p = mark(el('p', 'wc-note'), 'note:' + nt.id);
        p.setAttribute('data-note', nt.id);
        if (nt.label) { p.appendChild(el('b', 'wc-note__k', nt.label)); p.appendChild(document.createTextNode(' · ')); }
        p.appendChild(el('span', nt.tone ? 'wc-tone--' + nt.tone : null, nt.text));
        if (nt.sub && L.noteSub) {
          p.appendChild(document.createTextNode(' · '));
          p.appendChild(el('span', 'wc-tone--mute', nt.sub));
        }
        notes.appendChild(p);
      });
      ground.appendChild(notes);
    }

    target.textContent = '';
    target.appendChild(root);
    return root;
  }

  /* Render every state of a lane into `target` at this width and take each block's tallest height,
     so that every state reserves the same rows and the lane's canvas never changes height. */
  function measureReserve(target, states, opts) {
    var R = { rec: 0, loops: 0, notes: 0, banner: 0, bar: 0 };
    var pick = function (root, sel, key, all) {
      var nodes = all ? root.querySelectorAll(sel) : [root.querySelector(sel)];
      Array.prototype.forEach.call(nodes, function (n) { if (n) R[key] = Math.max(R[key], n.offsetHeight); });
    };
    states.forEach(function (st) {
      var o = {};
      for (var k in opts) o[k] = opts[k];
      o.reserve = null; o.highlight = []; o.lit = false;
      var root = renderCluster(target, st, o);
      pick(root, '.wc-rec', 'rec');
      pick(root, '.wc-loops', 'loops');
      pick(root, '.wc__notes', 'notes');
      pick(root, '.wc__banner', 'banner');
      pick(root, '.wc-n__bar', 'bar', true);
    });
    /* min-height is a border-box height here (box-sizing in index.css) */
    return R;
  }

  window.ClusterCanvas = {
    renderCluster: renderCluster, laneLayout: laneLayout, measureReserve: measureReserve,
    recordRows: recordRows, geometry: geometry
  };

  if (!D || !window.Didactician) { console.error(ID + ': ClusterData or Didactician missing'); return; }

  /* ---------- the lane controller ---------- */
  Didactician.widget(ID, function (first, ctx) {
    /* Didactician.widget hands over only the first mount; this chapter has two (one per section) */
    var mounts = Array.prototype.slice.call(document.querySelectorAll('[data-widget="' + ID + '"]'));
    mounts.forEach(function (m) { m.__dInit = true; });

    var committed = {};
    document.querySelectorAll('.cp-check[data-committed]').forEach(function (c) {
      committed[c.getAttribute('data-check')] = true;
    });

    var lanes = [];
    mounts.forEach(function (mount) {
      Array.prototype.forEach.call(mount.querySelectorAll('.cs-lane'), function (laneEl) {
        var data = D.CLUSTER_LANES[laneEl.getAttribute('data-lane')];
        if (!data) { console.error(ID + ': no data for lane ' + laneEl.getAttribute('data-lane')); return; }
        var lane = { mount: mount, el: laneEl, data: data, canvas: laneEl.querySelector('[data-canvas]'), steps: [], active: -1, shown: -1 };
        Array.prototype.forEach.call(laneEl.querySelectorAll('.cs-step'), function (li) {
          var id = li.getAttribute('data-step');
          var sd = data.steps.filter(function (s) { return s.id === id; })[0];
          if (!sd) { console.error(ID + ': no data for step ' + id); return; }
          var attr = li.getAttribute('data-gate');
          lane.steps.push({
            li: li, id: id, data: sd,
            gate: attr != null ? attr.split(/\s+/).filter(Boolean) : (sd.gate || []),
            snap: li.querySelector('[data-step-snap]'),
            text: li.querySelector('[data-step-text]')
          });
        });
        lane.states = lane.steps.map(function (s) { return s.data.state; });
        if (lane.steps.length) lanes.push(lane);
      });
    });

    var isOpen = function (step) { return step.gate.every(function (id) { return committed[id]; }); };

    /* step text (SLOT 3), with any clock kicker */
    lanes.forEach(function (lane) {
      lane.steps.forEach(function (step) {
        if (!step.text) return;
        step.text.textContent = '';
        if (step.data.kicker) step.text.appendChild(el('p', 'wc-kicker', step.data.kicker));
        step.data.text.forEach(function (para) {
          var p = el('p');
          para.split('`').forEach(function (part, i) {
            p.appendChild(i % 2 ? el('code', null, part) : document.createTextNode(part));
          });
          step.text.appendChild(p);
        });
        if (!isOpen(step)) step.li.classList.add('is-locked');
      });
    });

    /* sizes: one unit per lane, fitted so the canvas stays within its budget */
    function budget(width) {
      var vw = window.innerWidth, vh = window.innerHeight;
      if (vw >= 900) return { maxH: vh - 48, maxU: 32, minU: 24 };
      /* under 900px the drawing itself stays within 50vh (mount contract, Heights) */
      return { maxH: Math.floor(vh * 0.5), maxU: width < 440 ? 22 : 32, minU: width < 440 ? 18 : 20 };
    }
    function header(lane, i) { return { lane: lane.data.name, n: i + 1, total: lane.steps.length }; }
    function baseOpts(lane, i, width, layout, reserve, unit, bleed) {
      return { width: width, layout: layout, reserve: reserve, unit: unit, header: header(lane, i), highlight: lane.steps[i].data.highlight, bleed: !!bleed };
    }
    /* lay out one target (canvas or snapshot) for a lane: layout choices, reserve, unit */
    function plan(lane, target, width, b, bleed) {
      var layout = laneLayout(width, lane.states, header(lane, 0));
      var measurable = target.offsetParent !== null;
      var reserve = measurable ? measureReserve(target, lane.states, baseOpts(lane, 0, width, layout, null, b.maxU, bleed)) : null;
      var u = b.maxU, h = 0;
      for (var k = 0; k < 6; k++) {
        var root = renderCluster(target, lane.states[0], baseOpts(lane, 0, width, layout, reserve, u, bleed));
        h = root.offsetHeight;
        if (!h || h <= b.maxH || u <= b.minU) break;
        u = Math.max(b.minU, u - Math.ceil((h - b.maxH) / 6));
      }
      return { layout: layout, reserve: reserve, unit: u, height: h };
    }
    function label(target, step) {
      target.setAttribute('role', 'img');
      target.setAttribute('aria-label', step.data.ariaLabel);
    }

    function drawCanvas(lane, animate) {
      if (!lane.canvas || !lane.fit) return;
      var i = Math.max(lane.active, 0);
      var step = lane.steps[i];
      var o = baseOpts(lane, i, lane.width, lane.fit.layout, lane.fit.reserve, lane.fit.unit);
      o.lit = !animate;
      var root = renderCluster(lane.canvas, step.data.state, o);
      label(lane.canvas, step);
      lane.shown = i;
      if (animate) {
        /* the step highlight eases in (CSS transition, dur-2 ≤ 300ms; instant under reduced motion) */
        requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add('is-lit'); }); });
      }
    }
    function drawSnaps(lane) {
      var vh = window.innerHeight;
      var snaps = lane.steps.filter(function (s) { return s.snap; });
      if (!snaps.length) return;
      var probe = snaps[0].snap;
      var w = probe.clientWidth || (snaps[0].text && snaps[0].text.clientWidth) || lane.width;
      /* on a phone the step card's padding leaves too little room for four node columns: the snapshot
         bleeds into that padding (index.css, .wc--bleed) */
      var bleed = w < 340 ? 10 : 0;
      w += 2 * bleed;
      var fit = plan(lane, probe, w, { maxH: Math.max(240, Math.floor(vh * 0.8)), maxU: w < 440 ? 22 : 28, minU: 20 }, bleed);
      lane.steps.forEach(function (step, i) {
        if (!step.snap) return;
        renderCluster(step.snap, step.data.state, baseOpts(lane, i, w, fit.layout, fit.reserve, fit.unit, bleed));
        label(step.snap, step);
      });
    }
    function layout() {
      var inline = false;
      lanes.forEach(function (lane) {
        lane.mount.removeAttribute('data-cs-fit');
        var w = (lane.canvas && lane.canvas.clientWidth) || lane.mount.clientWidth || 320;
        lane.width = w;
        if (lane.canvas && lane.canvas.offsetParent !== null) {
          var b = budget(w);
          lane.fit = plan(lane, lane.canvas, w, b);
          /* still too tall at the smallest unit: show each step's own snapshot instead */
          if (lane.fit.height > b.maxH) inline = true;
        } else {
          /* hidden by the page's short-viewport rule: keep drawing it, unmeasured */
          lane.fit = { layout: laneLayout(w, lane.states, header(lane, 0)), reserve: null, unit: w < 440 ? 22 : 28 };
        }
      });
      /* decided per page, not per lane: on a given screen both lanes behave the same way */
      lanes.forEach(function (lane) {
        if (inline) lane.mount.setAttribute('data-cs-fit', 'inline');
        drawCanvas(lane, false);
        drawSnaps(lane);
      });
    }

    /* activation: the last unlocked step whose top has crossed 55% of the viewport height */
    function update() {
      var line = window.innerHeight * 0.55;
      lanes.forEach(function (lane) {
        var idx = -1;
        for (var i = 0; i < lane.steps.length; i++) {
          var s = lane.steps[i];
          if (!isOpen(s)) break;                 /* a locked step can't become active */
          if (s.li.getBoundingClientRect().top <= line) idx = i;
        }
        if (idx === lane.active) return;
        lane.steps.forEach(function (s, j) { s.li.classList.toggle('is-active', j === idx); });
        lane.active = idx;
        if (Math.max(idx, 0) !== lane.shown) drawCanvas(lane, true);
      });
    }
    var queued = false;
    function schedule() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; update(); });
    }

    /* gates: unlock on the page's commit event; never re-lock */
    document.addEventListener('didactician:check-commit', function (e) {
      var id = e.detail && e.detail.id;
      if (!id || committed[id]) return;
      committed[id] = true;
      lanes.forEach(function (lane) {
        lane.steps.forEach(function (s) {
          if (s.li.classList.contains('is-locked') && isOpen(s)) {
            s.li.classList.remove('is-locked');
            s.li.classList.add('is-unlocked');
          }
        });
      });
      schedule();
    });

    layout();
    update();

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(schedule, { rootMargin: '0px 0px -45% 0px', threshold: 0 });
      lanes.forEach(function (lane) { lane.steps.forEach(function (s) { io.observe(s.li); }); });
    }
    window.addEventListener('scroll', schedule, { passive: true });

    var lastW = window.innerWidth, lastH = window.innerHeight;
    function relayout() { layout(); schedule(); }
    var firstCall = true;   /* ctx.onResize calls back once at registration; layout() has just run */
    ctx.onResize(function () { if (firstCall) { firstCall = false; return; } relayout(); });
    window.addEventListener('resize', function () {
      var w = window.innerWidth, h = window.innerHeight;
      /* ignore the small height changes of a phone's collapsing address bar */
      if (w === lastW && Math.abs(h - lastH) < 80 && (h < 560) === (lastH < 560)) return;
      lastW = w; lastH = h;
      relayout();
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { monoFamily = null; widestOneLine = null; relayout(); });
  });
})();
