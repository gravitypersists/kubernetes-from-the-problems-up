/* w-sizing-sandbox/index.js · W-02 "How many nodes?" (Ch 05 §04, blueprint B2, a goal-free explorer).
   Revision 1 (the user's site review, H-23 to H-30): Reset in the header bar; the controls (four
   steppers incl. payments, the switch, warnings) in the left column; the outcome on the right: the
   count heading (and one processor line when processor matters), the nodes, then the room bar under
   them. No stats block. Under 600px one column: controls, count, room bar, nodes.
   The controls, outcome and live sentence, and the node drawing through the pooled renderer
   (pool/cluster/cluster.js, nodes-only). The model is window.SizingModel (model.js); data and every
   reader-visible string are window.SizingData (data.js). Nothing here decides a count: it asks the
   model and draws the answer. */
Didactician.widget('w-sizing-sandbox', function (el, ctx) {
  'use strict';
  var D = window.SizingData;
  var M = window.SizingModel;
  var T = D.SHEET;
  var C = window.ClusterCanvas;

  /* the renderer's own copy of the data: its SERVICES' sizes follow the steppers; SizingData itself
     is never changed */
  var RD = {};
  Object.keys(D).forEach(function (k) { RD[k] = D[k]; });
  RD.SERVICES = {};
  Object.keys(D.SERVICES).forEach(function (s) {
    var o = {}; Object.keys(D.SERVICES[s]).forEach(function (k) { o[k] = D.SERVICES[s][k]; });
    RD.SERVICES[s] = o;
  });
  var R = C.create(RD);

  var DEFAULT = {};
  D.ORDER.forEach(function (s) { DEFAULT[s] = D.SERVICES[s].size; });
  var req = {};
  D.ORDER.forEach(function (s) { req[s] = DEFAULT[s]; });
  var spare = true;
  var lastChange = null;   /* { svc } | { spare } | { reset } */

  /* ---------- helpers ---------- */
  function fill(tpl, v) { return tpl.replace(/\{(\w+)\}/g, function (m, k) { return v[k] != null ? v[k] : m; }); }
  function gb(x) { var r = Math.round(x * 10) / 10; return (r % 1 === 0 ? r.toFixed(0) : r.toFixed(1)); }
  function pad2(n) { return n < 10 ? '0' + n : String(n); }
  function mk(tag, cls, text) { var e = C.el(tag, cls, text); return e; }
  function copiesText(n) { return fill(n === 1 ? T.copies.one : T.copies.many, { n: n }); }
  var wideMQ = window.matchMedia ? window.matchMedia('(min-width: 600px)') : { matches: true };

  /* ---------- the frame ---------- */
  el.textContent = '';
  var root = mk('div', 'ssw');
  var bar = mk('div', 'ssw__bar');
  var title = mk('span', 'ssw__title', T.title);
  bar.appendChild(title);
  var reset = mk('button', 'ssw__reset', T.reset);
  reset.type = 'button';
  reset.setAttribute('aria-label', T.resetLabel);
  bar.appendChild(reset);
  root.appendChild(bar);
  var body = mk('div', 'ssw__body');
  root.appendChild(body);
  var side = mk('div', 'ssw__side');
  var main = mk('div', 'ssw__main');
  body.appendChild(side);
  body.appendChild(main);

  /* the outcome heading: the count in words, and one line when processor matters */
  var count = mk('p', 'ssw__count');
  var setLine = mk('p', 'ssw__setby');
  /* idle bar */
  var idle = mk('div', 'ssw__idle');
  idle.appendChild(mk('p', 'ssw__head', T.idle.head));
  var ibar = mk('div', 'ssw__ibar');
  var segUsed = mk('i', 'ssw__seg ssw__seg--used');
  var segOver = mk('i', 'ssw__seg-over');
  var overTag = mk('span', 'ssw__seg-tag', T.idle.overTag);   /* names the hatch where it is wide enough */
  segOver.appendChild(overTag);
  segUsed.appendChild(segOver);
  var segRes = mk('i', 'ssw__seg ssw__seg--res');
  var segFree = mk('i', 'ssw__seg ssw__seg--free');
  [segUsed, segRes, segFree].forEach(function (s) { s.setAttribute('aria-hidden', 'true'); ibar.appendChild(s); });
  idle.appendChild(ibar);
  var ilabels = mk('div', 'ssw__ilabels');
  idle.appendChild(ilabels);
  var inone = mk('p', 'ssw__inone', T.idle.none);
  idle.appendChild(inone);

  /* controls */
  var ctl = mk('div', 'ssw__ctl');
  ctl.appendChild(mk('p', 'ssw__head', T.controlsHead));
  var rows = {};
  D.ORDER.forEach(function (s) {
    var svc = D.SERVICES[s];
    var row = mk('div', 'ssw__row');
    row.setAttribute('role', 'group');
    var info = mk('div', 'ssw__svc');
    var nm = mk('b', 'ssw__name', svc.label);
    var cp = mk('span', 'ssw__copies', fill(T.copiesShort, { n: svc.copies }));
    cp.setAttribute('aria-hidden', 'true');
    nm.appendChild(cp);
    info.appendChild(nm);
    row.setAttribute('aria-label', svc.label + ', ' + copiesText(svc.copies) + ', ' + fill(T.usedAt, { use: gb(svc.use) }));
    /* "used 5.5 GB" and "at rush" each kept whole, so a narrow row breaks between them */
    var meta = mk('span', 'ssw__meta', fill(T.usedAt, { use: gb(svc.use) }).replace(/ /g, '\u00a0').replace('GB\u00a0at', 'GB at'));
    info.appendChild(meta);
    row.appendChild(info);
    var st = mk('div', 'ssw__step');
    var minus = mk('button', 'ssw__btn', '−');
    minus.type = 'button';
    minus.setAttribute('aria-label', fill(T.lower, { svc: svc.label }));
    var out = mk('output', 'ssw__val');
    out.id = 'ssw-val-' + s;
    var plus = mk('button', 'ssw__btn', '+');
    plus.type = 'button';
    plus.setAttribute('aria-label', fill(T.raise, { svc: svc.label }));
    minus.setAttribute('aria-describedby', out.id);
    plus.setAttribute('aria-describedby', out.id);
    st.appendChild(minus); st.appendChild(out); st.appendChild(plus);
    row.appendChild(st);
    ctl.appendChild(row);
    function stepBy(dir) {
      var a = svc.adjustable;
      var v = Math.round((req[s] + dir * a.step) * 100) / 100;
      if (v < a.min - 1e-9 || v > a.max + 1e-9) return;
      req[s] = v;
      lastChange = { svc: s };
      update();
    }
    minus.addEventListener('click', function () { stepBy(-1); });
    plus.addEventListener('click', function () { stepBy(1); });
    rows[s] = { row: row, out: out, minus: minus, plus: plus };
  });
  var sw = mk('label', 'ssw__switch');
  var cb = mk('input', 'ssw__cb');
  cb.type = 'checkbox';
  cb.setAttribute('role', 'switch');
  cb.checked = spare;
  sw.appendChild(cb);
  sw.appendChild(mk('span', 'ssw__track'));
  sw.appendChild(mk('span', 'ssw__swl', T.spare));
  var swState = mk('b', 'ssw__sws');
  swState.setAttribute('aria-hidden', 'true');   /* the switch's own checked state says it */
  sw.appendChild(swState);
  cb.addEventListener('change', function () { spare = cb.checked; lastChange = { spare: true }; update(); });
  ctl.appendChild(sw);
  reset.addEventListener('click', function () {
    D.ORDER.forEach(function (s) { req[s] = DEFAULT[s]; });
    spare = true; cb.checked = true;
    lastChange = { reset: true };
    update();
  });
  side.appendChild(ctl);

  /* warnings */
  var warn = mk('div', 'ssw__warn');
  warn.appendChild(mk('p', 'ssw__head', T.warnHead));
  var wlist = mk('ul', 'ssw__wlist');
  warn.appendChild(wlist);
  side.appendChild(warn);

  /* the outcome: count heading, the nodes, then the room bar under them (#30); on phones the bar
     comes before the nodes (CSS order), so a change's main effect is one short scroll away */
  var head = mk('div', 'ssw__outhead');
  head.appendChild(count);
  head.appendChild(setLine);
  main.appendChild(head);
  var nodesBox = mk('div', 'ssw__nodes');
  var dhead = mk('p', 'ssw__head ssw__dhead', T.drawHead);
  nodesBox.appendChild(dhead);
  var never = mk('div', 'ssw__never');
  nodesBox.appendChild(never);
  var draw = mk('div', 'ssw__draw');
  nodesBox.appendChild(draw);
  var tooShort = mk('p', 'ssw__short');
  nodesBox.appendChild(tooShort);
  main.appendChild(nodesBox);
  main.appendChild(idle);

  var live = mk('p', 'ssw__live');
  live.setAttribute('aria-live', 'polite');
  root.appendChild(live);
  el.appendChild(root);

  /* ---------- what one setting shows ---------- */
  function snapshot(ev) {
    var nodes = {}, use = {}, spareIds = [];
    ev.placement.forEach(function (ids, i) {
      var nid = String(i + 1);
      nodes[nid] = ids.map(function (id) { return id + ':placed'; });
      ids.forEach(function (id) { use[id] = D.SERVICES[D.PODS[id].service].use; });
      if (ev.spare && i === ev.placement.length - 1) spareIds.push(nid);
    });
    return { nodes: nodes, use: use, spare: spareIds };
  }

  function overWarnings(ev) {
    return ev.over.map(function (s) {
      var svc = D.SERVICES[s];
      return fill(T.warnOver, { svc: svc.label, req: gb(req[s] != null ? req[s] : svc.size), use: gb(svc.use) });
    });
  }
  function neverWarnings(ev) {
    return ev.never.map(function (n) {
      return fill(T.warnNever, { svc: D.SERVICES[n.service].label, req: gb(n.request), room: gb(D.CAPACITY.memory) });
    });
  }
  /* the idle bar's hatched part, named in words: what was used above the requests (P-14) */
  function hatchWarnings(ev) {
    return ev.feasible && ev.idle && ev.idle.usedOver > 0 ? [fill(T.warnHatch, { gb: gb(ev.idle.usedOver) })] : [];
  }
  function drawWarnings(lines, hatch) {
    wlist.textContent = '';
    (hatch || []).forEach(function (t) {
      var li = mk('li', 'ssw__w ssw__w--hatch');
      var sw = mk('i', 'ssw__w-mark');
      sw.setAttribute('aria-hidden', 'true');
      li.appendChild(sw);
      li.appendChild(document.createTextNode(t));
      wlist.appendChild(li);
    });
    if (!lines.length) {
      if (!(hatch || []).length) wlist.appendChild(mk('li', 'ssw__w ssw__w--none', T.warnNone));
      return;
    }
    lines.forEach(function (t) { wlist.appendChild(mk('li', 'ssw__w', t)); });
  }
  function drawNever(ev) {
    never.textContent = '';
    if (!ev.never.length) { never.hidden = true; return; }
    never.hidden = false;
    never.appendChild(mk('p', 'ssw__never-k', T.neverHead));
    ev.never.forEach(function (n) {
      /* the request against a node's room, to one scale: the request overhangs the node */
      var row = mk('div', 'ssw__nv');
      var max = Math.max(n.request, D.CAPACITY.memory);
      var nodeBar = mk('i', 'ssw__nv-room');
      nodeBar.style.width = (D.CAPACITY.memory / max * 100) + '%';
      nodeBar.appendChild(mk('span', null, fill(T.neverRoom, { room: gb(D.CAPACITY.memory) })));
      var podBar = mk('i', 'ssw__nv-pod');
      podBar.style.width = (n.request / max * 100) + '%';
      podBar.appendChild(mk('span', null, fill(T.neverBody, { svc: D.SERVICES[n.service].label, req: gb(n.request) })));
      row.appendChild(podBar);
      row.appendChild(nodeBar);
      never.appendChild(row);
    });
  }

  /* the idle bar's labels, under their segments (P-14). Forms, first that fits: amounts on one line,
     then amounts on two lines (GB, then %). In each, a label starts at its segment's left edge and is
     pushed right past the one before; where the last one would pass the bar's end, they are pulled back
     left, 12px apart, so a label may overhang a neighbouring segment, but each keeps at least 8px (or the whole
     segment, if narrower) under its own, marked by a tick. Only where neither form fits: one row each,
     in bar order, with the segment's own fill as the mark. */
  function labelForm(parts, form, W) {
    ilabels.textContent = '';
    var labs = parts.map(function (p) {
      var lab = mk('span', 'ssw__il ssw__il--' + p.key);
      lab.appendChild(mk('span', 'ssw__il-mark'));
      p.name.forEach(function (t) { lab.appendChild(mk('span', 'ssw__il-ln', t)); });
      var pct = Math.round(p.pct);
      if (form === 'two') {
        lab.appendChild(mk('span', 'ssw__il-ln ssw__il-amt', fill(T.idle.amountGb, { gb: gb(p.gb) })));
        lab.appendChild(mk('span', 'ssw__il-ln ssw__il-amt', fill(T.idle.amountPct, { pct: pct })));
      } else {
        lab.appendChild(mk('span', 'ssw__il-ln ssw__il-amt', fill(T.idle.amount, { gb: gb(p.gb), pct: pct })));
      }
      ilabels.appendChild(lab);
      return lab;
    });
    if (form === 'stack') { ilabels.classList.add('is-stack'); return true; }
    var gap = 12, n = parts.length;   /* 1.5 mono characters: neighbouring amounts never read as one */
    var w = labs.map(function (l) { return l.offsetWidth; });
    var x = [];
    for (var i = 0; i < n; i++) x[i] = Math.max(parts[i].L, i ? x[i - 1] + w[i - 1] + gap : 0);
    if (x[n - 1] + w[n - 1] > W) {
      x[n - 1] = W - w[n - 1];
      for (i = n - 2; i >= 0; i--) x[i] = Math.min(x[i], x[i + 1] - gap - w[i]);
    }
    if (x[0] < -0.5) return false;
    for (i = 0; i < n; i++) {
      var need = Math.min(8, parts[i].R - parts[i].L);
      if (x[i] > parts[i].R - need + 0.5 || x[i] + w[i] < parts[i].L + need - 0.5) return false;
    }
    labs.forEach(function (lab, k) {
      lab.style.left = x[k] + 'px';
      var a = Math.max(x[k], parts[k].L), b = Math.min(x[k] + w[k], parts[k].R);
      var tick = mk('i', 'ssw__il-tick');
      tick.setAttribute('aria-hidden', 'true');
      tick.style.left = Math.min(a, W - 2) + 'px';
      tick.style.width = Math.max(2, b - a) + 'px';
      ilabels.appendChild(tick);
    });
    return true;
  }

  function drawIdle(ev) {
    var feasible = ev.feasible;
    idle.classList.toggle('is-none', !feasible);
    ilabels.textContent = '';
    ilabels.classList.remove('is-stack');
    if (!feasible) { [segUsed, segRes, segFree].forEach(function (sg) { sg.style.width = '0'; }); return; }
    var room = ev.rented;
    var parts = [
      { key: 'used', gb: ev.idle.used, seg: segUsed, name: T.idle.used },
      { key: 'res', gb: ev.idle.reservedUnused, seg: segRes, name: T.idle.reservedUnused },
      { key: 'free', gb: ev.idle.notReserved, seg: segFree, name: T.idle.notReserved }
    ];
    /* segment edges in the label row's px: the bar's inside starts after its stroke */
    var cw = ibar.clientWidth || 1;
    var B = (ibar.offsetWidth - ibar.clientWidth) / 2;
    var W = ilabels.clientWidth || cw;
    var x = 0;
    parts.forEach(function (p) {
      p.pct = room ? p.gb / room * 100 : 0;
      p.seg.style.width = p.pct + '%';
      p.L = B + x / 100 * cw;
      x += p.pct;
      p.R = B + x / 100 * cw;
    });
    segOver.style.width = ev.idle.used ? (ev.idle.usedOver / ev.idle.used * 100) + '%' : '0';
    /* the hatch's own tag, only where the hatch holds it with room to spare */
    var overPx = ev.idle.usedOver / room * cw;
    overTag.style.display = '';
    overTag.style.visibility = 'hidden';
    var tagFits = ev.idle.usedOver > 0 && overTag.offsetWidth + 8 <= overPx;
    overTag.style.visibility = '';
    overTag.style.display = tagFits ? '' : 'none';
    ['one', 'two', 'stack'].some(function (f) { return labelForm(parts, f, W); });
  }

  function setRow(s, ev) {
    var r = rows[s], a = D.SERVICES[s].adjustable;
    r.out.textContent = fill(T.gb, { v: gb(req[s]) });
    r.minus.setAttribute('aria-disabled', req[s] <= a.min + 1e-9 ? 'true' : 'false');
    r.plus.setAttribute('aria-disabled', req[s] >= a.max - 1e-9 ? 'true' : 'false');
    r.row.classList.toggle('is-over', ev.over.indexOf(s) >= 0);
  }

  var drawW = 0;
  function render(ev, highlight) {
    var w = draw.clientWidth || 320;
    var narrow = w < 440;
    var unit = narrow ? 22 : 28;
    /* four columns: five would cut every service name ("dispat…") at desktop widths; the most nodes any
       setting needs (8, spare included; d-17) then take two rows, which reserve() holds from 600px */
    var cols = 4;
    var colW = (w - 12) / cols;
    var opts = { width: w, nodesOnly: true, columns: cols, unit: unit, labels: colW >= 80, highlight: highlight || [], lit: false };
    Object.keys(D.SERVICES).forEach(function (s) { RD.SERVICES[s].breaks = D.SERVICES[s].breaks; });
    var snap = snapshot(ev);
    var rootEl = R.renderCluster(draw, snap, opts);
    /* a chip with room for one line keeps the whole name, cut with "…" by the pool's CSS, rather than
       the first half of a break ("store-"): drawn again with whole names for those services */
    var cut = {};
    Array.prototype.forEach.call(rootEl.querySelectorAll('.wc-p'), function (p) {
      var svc = D.PODS[p.getAttribute('data-p')].service;
      var names = p.querySelectorAll('.wc-c__ln:not(.wc-st)');
      if (names.length && names.length < RD.SERVICES[svc].breaks.length && names[0].textContent !== D.SERVICES[svc].label) cut[svc] = true;
    });
    if (Object.keys(cut).length) {
      Object.keys(cut).forEach(function (s) { RD.SERVICES[s].breaks = [D.SERVICES[s].label]; });
      rootEl = R.renderCluster(draw, snap, opts);
    }
    /* Pods under 14px: the pool already draws them unlabelled (pool-02, item 5), but with its 2px
       strokes and ring inset a 0.5–1 GB Pod would be all stroke, and a 3px step outline a blot. So
       here: 1px edges and no step highlight, so outline and fill still read. A line under the drawing
       names every Pod whose chip shows no name */
    var short = {};
    Array.prototype.forEach.call(rootEl.querySelectorAll('.wc-p'), function (p) {
      var svc = D.PODS[p.getAttribute('data-p')].service;
      if (p.offsetHeight < 14) {
        p.classList.add('ssw-tiny');
        p.classList.remove('is-hl');
        Array.prototype.forEach.call(p.querySelectorAll('.is-hl'), function (x) { x.classList.remove('is-hl'); });
      }
      if (!p.querySelector('.wc-c__ln:not(.wc-st)')) short[svc] = (short[svc] || 0) + 1;
    });
    var names = Object.keys(D.SERVICES).filter(function (s) { return short[s]; }).map(function (s) {
      return fill(T.tooShortItem, { svc: D.SERVICES[s].label, n: short[s], gb: gb(RD.SERVICES[s].size) });
    });
    tooShort.textContent = opts.labels && names.length ? fill(T.tooShort, { list: list(names) }) : '';
    if (highlight && highlight.length) {
      requestAnimationFrame(function () { rootEl.classList.add('is-lit'); });
    }
    drawW = w;
    return rootEl;
  }

  function nodesWord(n) { return n === 1 ? T.node.one : T.node.many; }
  function countText(ev) {
    if (!ev.feasible) return T.countNone;
    return fill(ev.spare ? T.countSpare : T.count, { n: ev.base, nodes: nodesWord(ev.base) });
  }
  /* one plain line, only when processor matters (the model's "set by") */
  function setByText(ev) {
    if (!ev.feasible || ev.setBy === 'memory') return '';
    if (ev.setBy === 'processor') return fill(T.setByProcessor, { mem: ev.memOnly });
    return ev.memOnly === ev.base && ev.cpuOnly === ev.base ? T.setByBothEach : T.setByBothTogether;
  }

  function list(items) {
    if (items.length < 2) return items.join('');
    return items.slice(0, -1).join(T.comma) + T.and + items[items.length - 1];
  }
  function liveSentence(ev) {
    var change = '';
    if (lastChange && lastChange.svc) change = fill(T.liveChange, { svc: D.SERVICES[lastChange.svc].label, v: gb(req[lastChange.svc]) });
    else if (lastChange && lastChange.spare) change = fill(T.liveSpare, { state: spare ? T.spareOn.toLowerCase() : T.spareOff.toLowerCase() });
    else if (lastChange && lastChange.reset) change = T.liveReset;
    var w = ev.over.length ? fill(T.liveOver, { list: list(ev.over.map(function (s) { return D.SERVICES[s].label; })) }) : T.liveOk;
    if (!ev.feasible) {
      var nv = list(ev.never.map(function (n) { return fill(T.liveNever, { svc: D.SERVICES[n.service].label, req: gb(n.request) }); }));
      return fill(T.liveNone, { change: change, never: nv, warn: w });
    }
    var c = fill(ev.spare ? T.liveCountSpare : T.liveCount, { n: ev.base, nodes: nodesWord(ev.base) });
    var by = setByText(ev);
    return fill(T.live, {
      change: change, count: c + (by ? '. ' + by.replace(/\.$/, '') : ''),
      reserved: gb(ev.reserved), rented: gb(ev.rented), used: gb(ev.used), warn: w
    });
  }

  var current = null;
  function update() {
    D.ORDER.forEach(function (s) { RD.SERVICES[s].size = req[s]; });
    R.reset();
    var ev = M.evaluate(D, req, spare);
    current = ev;

    /* the outcome heading */
    count.textContent = countText(ev);
    setLine.textContent = setByText(ev);
    setLine.hidden = !setLine.textContent;
    if (lastChange && count.prev != null && count.prev !== count.textContent) {
      head.classList.remove('is-changed'); void head.offsetWidth; head.classList.add('is-changed');
    }
    count.prev = count.textContent;

    D.ORDER.forEach(function (s) { setRow(s, ev); });
    swState.textContent = spare ? T.spareOn : T.spareOff;
    sw.classList.toggle('is-on', spare);

    drawWarnings(neverWarnings(ev).concat(overWarnings(ev)), hatchWarnings(ev));
    drawNever(ev);
    dhead.textContent = ev.feasible ? T.drawHead : T.drawHeadNone;
    drawIdle(ev);

    var hl = [];
    if (lastChange && lastChange.svc) D.SERVICES[lastChange.svc].pods.forEach(function (id) { hl.push('p:' + id); });
    if (lastChange && lastChange.spare && spare) hl.push('n:' + ev.placement.length);
    render(ev, hl);

    if (lastChange) live.textContent = liveSentence(ev);
  }

  /* ---------- layout and the height rule ----------
     From 600px (CURRICULUM §8 step 6) the sheet reserves its tallest state: the warnings list at its
     longest and the drawing at its tallest (two rows of nodes; d-17), so no setting change
     moves the page. Below 600px nothing is reserved; the controls sit above everything that changes
     height, so they never move under the reader's finger. */
  function reserve() {
    warn.style.minHeight = '';
    main.style.minHeight = '';
    if (!wideMQ.matches) return;
    var worst = [
      { over: ['storefront', 'orders', 'dispatch'], never: [] },
      { over: ['storefront', 'dispatch'], never: [{ service: 'orders', request: D.SERVICES.orders.adjustable.max }] }
    ];
    var save = req;
    var wMax = 0;
    worst.forEach(function (wc) {
      req = {};
      D.ORDER.forEach(function (s) { req[s] = D.SERVICES[s].adjustable.min; });
      req.orders = wc.never.length ? D.SERVICES.orders.adjustable.max : D.SERVICES.orders.adjustable.min;
      drawWarnings(neverWarnings({ never: wc.never }).concat(overWarnings({ over: wc.over })),
        wc.never.length ? [] : hatchWarnings({ feasible: true, idle: { usedOver: 88.5 } }));
      wMax = Math.max(wMax, warn.offsetHeight);
    });
    req = save;
    warn.style.minHeight = wMax + 'px';
    /* the drawing: the taller of its two tallest states (d-17: two rows of four in both). (a) every
       request at its maximum with orders at a node's room, spare on: the most nodes any setting needs,
       with the longest processor line; (b) orders past a node's room: the never-placeable bar above the
       other Pods' nodes. */
    function measure(r, neverOn) {
      var ev = M.evaluate(D, r, true);
      D.ORDER.forEach(function (s) { RD.SERVICES[s].size = r[s]; });
      R.reset();
      render(ev, []);
      drawNever(neverOn ? ev : { never: [] });
      dhead.textContent = neverOn ? T.drawHeadNone : T.drawHead;
      count.textContent = neverOn ? T.countNone : countText(ev);
      setLine.textContent = neverOn ? '' : T.setByBothTogether;
      setLine.hidden = neverOn;
      return main.offsetHeight;
    }
    var bigReq = {};
    D.ORDER.forEach(function (s) { bigReq[s] = D.SERVICES[s].adjustable.max; });
    var neverH = measure(bigReq, true);
    bigReq.orders = D.CAPACITY.memory;
    var fullH = measure(bigReq, false);
    main.style.minHeight = Math.max(neverH, fullH) + 'px';
  }

  function layout(width) {
    root.classList.toggle('ssw--wide', width >= 720);
    root.classList.toggle('ssw--narrow', width < 400);
    title.textContent = width < 300 ? T.titleShort : T.title;
    var keep = lastChange;
    lastChange = null;
    reserve();
    update();
    lastChange = keep;
  }

  ctx.onResize(function (w) { layout(w || el.clientWidth); });
  if (wideMQ.addEventListener) wideMQ.addEventListener('change', function () { layout(el.clientWidth); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { layout(el.clientWidth); });
  /* a drawing whose column changed width without the mount changing (fonts, scrollbars) */
  if ('ResizeObserver' in window) {
    new ResizeObserver(function () {
      if (current && Math.abs((draw.clientWidth || 0) - drawW) >= 1) { var k = lastChange; lastChange = null; render(current, []); lastChange = k; }
    }).observe(draw);
  }
});
