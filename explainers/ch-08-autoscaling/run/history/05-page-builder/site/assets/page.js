/* Ch 08 page script. Classic script; loaded LAST, after pool/widget.js, widgets/w-rush-scrolly/data.js,
   pool/cluster/cluster.js and pool/cluster/lanes.js, because parts 5 and 6 use them.
   1. Comprehension checks, as in Ch 03–07 (Ch 05's assets/page.js is the reviewed reference), so checks
      behave the same in every chapter: commit, then reveal; feedback explains every option. Every commit
      dispatches a bubbling CustomEvent from the check card,
        'didactician:check-commit'  detail { id: 'k-04', option: 'B', correct: true }
      and stamps the card with data-committed="<option key>" (kept after TRY AGAIN). The think-then-reveal
      card (k-08) dispatches the same event with option 'reveal'.
   2. Gated blocks: .cp-gate[data-gate="k-03"] (the rest of §03), [data-gate="k-04"] (everything after the
      lane in §04), [data-gate="k-06"] (Fig. 06 and its paragraph) and [data-gate="k-07"] (Fig. 08 and the
      rest of §07) stay locked, collapsed to a plate, until their check is committed with any option; they
      never re-lock. Opening one dispatches 'didactician:gate-open'.
   3. Fig. 09: the loop lens table, built from CH08_LOOPS.
   4. Fig. 01 and Fig. 07: the week charts, drawn at the plate's measured width.
   5. Fig. 06: one snapshot drawn by the pooled renderCluster from window.ClusterData.FIGURES.after.
   6. Lane A: ClusterCanvas.lanes('w-rush-scrolly', window.ClusterData). The lane is data only
      (widgets/w-rush-scrolly/data.js); this call is its only glue. */
(function () {
  'use strict';

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* feedback text is an attribute; `backticks` mark code */
  function withCode(target, text) {
    text.split('`').forEach(function (part, i) {
      target.appendChild(i % 2 ? el('code', null, part) : document.createTextNode(part));
    });
  }

  function commit(card, option, correct) {
    var id = card.getAttribute('data-check');
    card.setAttribute('data-committed', option);
    card.dispatchEvent(new CustomEvent('didactician:check-commit', {
      bubbles: true,
      detail: { id: id, option: option, correct: correct }
    }));
  }

  function setupChoice(card) {
    var opts = Array.prototype.slice.call(card.querySelectorAll('.cp-option'));
    var fb = card.querySelector('.cp-feedback');
    var after = card.getAttribute('data-after');
    fb.setAttribute('tabindex', '-1');
    var keyOf = function (b) { return b.querySelector('.cp-option__key').textContent; };

    function reset() {
      opts.forEach(function (b) {
        b.disabled = false;
        b.classList.remove('is-right', 'is-wrong');
        b.querySelector('.cp-option__tag').textContent = '';
      });
      fb.hidden = true; fb.className = 'cp-feedback'; fb.textContent = '';
      opts[0].focus();
    }

    opts.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var ok = btn.hasAttribute('data-ok');
        opts.forEach(function (b) { b.disabled = true; });
        btn.classList.add(ok ? 'is-right' : 'is-wrong');
        btn.querySelector('.cp-option__tag').textContent = ok ? 'CORRECT' : 'YOUR PICK';
        if (!ok) {
          var right = opts.filter(function (b) { return b.hasAttribute('data-ok'); })[0];
          right.classList.add('is-right');
          right.querySelector('.cp-option__tag').textContent = 'ANSWER';
        }
        fb.textContent = '';
        fb.className = 'cp-feedback ' + (ok ? 'is-right' : 'is-wrong');
        var p = el('p');
        p.appendChild(el('b', 'cp-feedback__lead', ok ? 'CORRECT' : 'NOT QUITE'));
        withCode(p, btn.getAttribute('data-fb'));
        fb.appendChild(p);
        if (!ok) {
          /* on its own line, after the sentence: its 44px target opens no gap in the line */
          var retry = el('button', 'cp-retry', 'TRY AGAIN');
          retry.type = 'button';
          retry.addEventListener('click', reset);
          fb.appendChild(retry);
        }
        if (after) fb.appendChild(el('p', null, after));
        var others = opts.filter(function (b) { return b !== btn; });
        var det = el('details', 'cp-why');
        det.appendChild(el('summary', null, ok ? 'Why the other answers miss' : 'What the other answers say'));
        var ul = el('ul');
        others.forEach(function (b) {
          var li = el('li');
          li.appendChild(el('b', null, keyOf(b)));
          withCode(li, b.getAttribute('data-fb'));
          ul.appendChild(li);
        });
        det.appendChild(ul);
        fb.appendChild(det);
        fb.hidden = false;
        fb.focus({ preventScroll: true });
        commit(card, keyOf(btn), ok);
      });
    });
  }

  function setupReveal(card) {
    var btn = card.querySelector('.cp-reveal');
    var ans = card.querySelector('.cp-feedback');
    btn.addEventListener('click', function () {
      ans.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      btn.disabled = true;
      btn.textContent = 'Answer shown';
      commit(card, 'reveal', true);
    });
  }

  document.querySelectorAll('.cp-check[data-check]').forEach(function (card) {
    if (card.hasAttribute('data-reveal')) setupReveal(card); else setupChoice(card);
  });

  /* ---- gated blocks ---- */
  var gates = Array.prototype.slice.call(document.querySelectorAll('.cp-gate[data-gate]'));
  function open(gate, animate) {
    if (!gate.classList.contains('is-locked')) return;
    gate.classList.remove('is-locked');
    if (animate) gate.classList.add('is-unlocked');
    gate.dispatchEvent(new CustomEvent('didactician:gate-open', { bubbles: true }));
  }
  gates.forEach(function (gate) {
    var id = gate.getAttribute('data-gate');
    var card = document.querySelector('.cp-check[data-check="' + id + '"]');
    if (card && card.hasAttribute('data-committed')) return;
    gate.classList.add('is-locked');
  });
  document.addEventListener('didactician:check-commit', function (e) {
    gates.forEach(function (gate) { if (gate.getAttribute('data-gate') === e.detail.id) open(gate, true); });
  });
})();

/* ---- Fig. 09 · the loop lens table ---------------------------------------------------------------
   CH08_LOOPS is the course's loop lens table (CURRICULUM §2.3): Ch 07's CH07_LOOPS copied forward, in its
   row order, with Ch 07's added tags dropped and this chapter's changes tagged (plan R3): the HPA joins,
   and the dashed "a loop that adds nodes, Chapter 8" row is now the cluster autoscaler, solid. Later
   chapters copy this array forward. Row fields:
     loop      the loop's name, as the page names it
     per       optional: a short qualifier under the name ("one per node")
     wants     what it works towards (the loop lens: which loop · wants · sees · does when they differ)
     sees      what it observes, in the record or the cluster
     does      what it does when the two differ
     job       the job of Sam's (Ch 03's words) that it took over
     chapter   optional: the chapter that covers this loop; a row with it is drawn dashed (met later)
     added     optional, this chapter only: the fields that are new or changed in this chapter, tagged
               NEW IN CH 8 in their cells (['loop'] tags the whole row, on its name). Drop the tags when
               copying the array forward.
     newPart   optional, this chapter only: { field: 'the new clause' } when only part of a cell is new. */
var CH08_LOOPS = [
  { loop: 'node loop', wants: 'every node reporting in', sees: 'each node’s latest report',
    does: 'marks a silent node unknown; after a wait, marks its Pods for deletion',
    job: 'noticing a dead machine' },
  { loop: 'Deployment loop', wants: 'each Deployment’s Pods running the version its record names, as many as it names',
    sees: 'its ReplicaSets, one per version, and how many of their Pods are ready',
    does: 'for a new version, makes a new ReplicaSet and shifts copies to it a few at a time, keeping enough Pods ready throughout; keeps old ReplicaSets, empty, for going back',
    job: 'updating' },
  { loop: 'ReplicaSet loop', wants: 'each ReplicaSet’s number of Pods', sees: 'the Pod records it has',
    does: 'writes new Pod records, or removes extras, including for Pods that were evicted', job: 'replacing' },
  { loop: 'scheduler', wants: 'every Pod on a node with room for its requests',
    sees: 'Pods with no node, and how much memory and processor each node has left unreserved (never how busy it is)',
    does: 'rules out nodes too full for the Pod, picks the emptiest of the rest, spreading copies; if none has room, leaves the Pod pending, records why, and tries again when the cluster changes',
    job: 'placing' },
  { loop: 'node agent', per: 'one per node', wants: 'its node’s assigned Pods running, and the node itself healthy',
    sees: 'the containers on its node, and how much memory the node has left',
    does: 'starts and restarts containers (including OOM-killed ones) and reports back; when its node runs short of memory, evicts Pods, those furthest over their requests first; runs each container’s checks, restarting a container that fails its liveness check and reporting one that fails its readiness check as not ready',
    job: 'restarting' },
  { loop: 'endpoints loop', wants: 'each Service’s list holding exactly the ready Pods its selector matches',
    sees: 'every Service’s selector, the Pods that match it, and which of them are ready',
    does: 'rewrites the Service’s list of ready Pods’ addresses, taking a Pod off as soon as it stops being ready or starts shutting down',
    job: 'connecting' },
  { loop: 'kube-proxy', per: 'one per node', wants: 'its node’s forwarding rules matching every Service’s list',
    sees: 'every Service and its list, in the record',
    does: 'rewrites its node’s rules, so a call to a Service’s address goes straight to one listed Pod, picked at random by default; in most clusters, an empty list refuses calls',
    job: 'connecting' },
  { loop: 'HPA', per: 'one per autoscaled service',
    wants: 'its service’s Pods, on average, at the target share of the processor they reserve',
    sees: 'what each of those Pods is using',
    does: 'rewrites the number of copies its Deployment wants, in proportion, never outside the minimum and maximum; lowers it only after about five minutes of lower readings, by default',
    job: 'scaling', added: ['loop'] },
  { loop: 'cluster autoscaler', per: 'or your provider’s equivalent',
    wants: 'every Pod on a node, on no more nodes than that takes',
    sees: 'Pods the scheduler couldn’t place, and how much of each node is reserved (never how busy it is)',
    does: 'adds a node from a node pool, up to the pool’s maximum; after about ten minutes, by default, empties and gives back a node whose Pods all fit elsewhere',
    job: 'scaling', added: ['loop', 'wants', 'sees', 'does'] }
];

(function () {
  'use strict';
  var body = document.querySelector('[data-loop-lens]');
  if (!body) return;
  var table = body.closest('table');
  var labels = (table.getAttribute('data-labels') || '').split('|');
  var tagText = table.getAttribute('data-new') || 'New in Ch 8';
  var tag = function (inline) {
    var t = document.createElement('span');
    t.className = 'lens__new' + (inline ? ' lens__new--inline' : ''); t.textContent = tagText;
    return t;
  };
  body.textContent = '';
  CH08_LOOPS.forEach(function (r) {
    var added = r.added || [];
    var tr = document.createElement('tr');
    if (r.chapter) tr.className = 'is-later';
    var th = document.createElement('th');
    th.scope = 'row';
    var pill = document.createElement('span');
    pill.className = 'cp-loop' + (r.chapter ? ' cp-loop--later' : '');
    var mark = document.createElement('span');
    mark.className = 'cp-loop__mark'; mark.setAttribute('aria-hidden', 'true'); mark.textContent = '↻';
    pill.appendChild(mark);
    pill.appendChild(document.createTextNode(r.loop));
    th.appendChild(pill);
    if (r.per) {
      var per = document.createElement('span');
      per.className = 'lens__per'; per.textContent = r.per;
      th.appendChild(per);
    }
    if (added.indexOf('loop') >= 0) th.appendChild(tag());
    tr.appendChild(th);
    ['wants', 'sees', 'does', 'job'].forEach(function (key, i) {
      var td = document.createElement('td');
      if (labels[i]) td.setAttribute('data-label', labels[i]);
      if (key === 'job') td.className = 'lens__job';
      if (added.indexOf(key) >= 0) td.appendChild(tag());
      var part = r.newPart && r.newPart[key], at = part ? r[key].lastIndexOf(part) : -1;
      if (at > 0) {
        td.appendChild(document.createTextNode(r[key].slice(0, at)));
        td.appendChild(tag(true));
        td.appendChild(document.createTextNode(r[key].slice(at)));
      } else td.appendChild(document.createTextNode(r[key]));
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });
})();

/* ---- Fig. 01 and Fig. 07 · one week of dispatch ---------------------------------------------------
   Each .wk[data-week="before" | "after"] plate gets its chart drawn into its <svg class="wk__svg"> at the
   measured width, so every label stays at 13px (graphics.md §5: re-layout, don't scale), and redrawn on
   resize and when a gate opens. Both kinds share one time axis (Monday 00:00 to Sunday 24:00, in days) and
   one scale (0 to 10 copies). Fennel fiction (plan, Conventions: Fennel's numbers); the shape of the week
   is illustrative, which Fig. 01's caption says.
     WORK    copies needed at the 60% target: about 2 on an ordinary evening, 6 at a Friday rush, 9 on the
             push evening (after).
     COPIES  before: 6 all week. After: 3, and 9 from about 17:34 to about 19:20 on the push Friday.
     NODES   before: five rows all week (01, 02, 04, 05, 06). After: four rows all week (01, 02, 04, 06)
             and node 07 from about 17:38 to about 19:30 on Friday. */
var CH08_WEEK = {
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  rushFrom: 4 + 17 / 24, rushTo: 4 + 19 / 24,
  pushFrom: 4 + 17.57 / 24, pushTo: 4 + 19.33 / 24,
  node07From: 4 + 17.64 / 24, node07To: 4 + 19.5 / 24,
  labels: {
    axis: 'Copies of dispatch', work: 'Work', copies: 'Copies', rush: 'Fri 5–7 pm',
    gap: ['Running,', 'not needed'], follow: ['Copies follow', 'the work'], push: '9 · the push',
    nodesBefore: '5 nodes', nodesAfter: '4 nodes', node07: '07 · 2 hours'
  }
};

(function () {
  'use strict';
  var hosts = Array.prototype.slice.call(document.querySelectorAll('.wk[data-week]'));
  if (!hosts.length) return;
  var NS = 'http://www.w3.org/2000/svg';
  var C = CH08_WEEK, L = C.labels;
  function s(tag, attrs, parent, text) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  var measure = (function () {
    var c = document.createElement('canvas').getContext('2d');
    return function (text) { c.font = '700 13px "Space Mono", Menlo, monospace'; return c.measureText(text).width + text.length * 0.78; };
  })();

  /* work, in copies needed at the target, at day d (0 = Monday 00:00) */
  function work(d, after) {
    var day = Math.min(6, Math.floor(d)), h = (d - day) * 24;
    var g = function (mu, sd) { return Math.exp(-Math.pow(h - mu, 2) / (2 * sd * sd)); };
    var v = 0.25 + 0.7 * g(12.5, 1.4) + 1.75 * g(18.75, 1.7);
    if (day !== 4) return v;
    if (!after) {
      /* a Friday rush: a plateau at 6 from about 17:00 to 19:00 */
      var off = Math.max(0, Math.abs(h - 18) - 0.7);
      return Math.max(v, 0.25 + 5.75 * Math.exp(-off * off / (2 * 0.55 * 0.55)));
    }
    /* the push Friday: about 2.5 at 17:30, 9 within four minutes, easing from about 19:00 */
    if (h < 17.5) return Math.min(v + Math.max(0, h - 16) * 0.6, 2.5);
    if (h < 17.57) return 2.5 + (h - 17.5) / 0.07 * 6.5;
    if (h < 19) return 9;
    if (h < 19.3) return 9 - (h - 19) / 0.3 * 6.5;
    return Math.max(v, 2.5 - (h - 19.3) * 0.6);
  }

  function draw(host) {
    var svg = host.querySelector('svg');
    var after = host.getAttribute('data-week') === 'after';
    var W = Math.floor(host.getBoundingClientRect().width - parseFloat(getComputedStyle(host).paddingLeft) - parseFloat(getComputedStyle(host).paddingRight));
    if (W < 120) return;
    var m = { l: 26, r: 70, t: 44, b: 24 };
    var ph = 150, rowH = 8, rowGap = 4, bandH = 5 * rowH + 4 * rowGap;
    var H = m.t + ph + m.b + bandH + 6;
    var pw = W - m.l - m.r;
    var X = function (d) { return m.l + d / 7 * pw; };
    var Y = function (v) { return m.t + (1 - v / 10) * ph; };
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('width', W); svg.setAttribute('height', H);

    /* the Friday rush band, behind everything, and its label above the plot */
    s('rect', { x: X(C.rushFrom), y: m.t, width: Math.max(2, X(C.rushTo) - X(C.rushFrom)), height: ph, 'class': 'a-fri' }, svg);
    var rw = measure(L.rush.toUpperCase());
    var rx = Math.min(Math.max(X((C.rushFrom + C.rushTo) / 2), m.l + rw / 2), W - rw / 2 - 2);
    s('text', { x: rx, y: m.t - 8, 'text-anchor': 'middle' }, svg, L.rush.toUpperCase());
    s('text', { x: 0, y: 12, 'class': 't-b' }, svg, L.axis.toUpperCase());

    /* grid and ticks */
    [3, 6, 9].forEach(function (v) {
      s('line', { x1: X(0), y1: Y(v), x2: X(7), y2: Y(v), 'class': 'l-grid' }, svg);
      s('text', { x: m.l - 6, y: Y(v) + 4, 'text-anchor': 'end' }, svg, String(v));
    });
    s('text', { x: m.l - 6, y: Y(0) + 4, 'text-anchor': 'end' }, svg, '0');
    var dayW = pw / 7;
    for (var i = 0; i < 7; i++) {
      s('line', { x1: X(i), y1: Y(0), x2: X(i), y2: Y(0) + 4, 'class': 'l-axis' }, svg);
      s('text', { x: X(i + 0.5), y: Y(0) + 17, 'text-anchor': 'middle' }, svg, (dayW >= 34 ? C.days[i] : C.days[i].charAt(0)).toUpperCase());
    }

    /* work: area, then line */
    var pts = [];
    for (var d = 0; d <= 7.0001; d += 1 / 96) pts.push([d, work(Math.min(d, 6.9999), after)]);
    var line = pts.map(function (p, j) { return (j ? 'L' : 'M') + X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1); }).join('');
    s('path', { d: line + 'L' + X(7) + ',' + Y(0) + 'L' + X(0) + ',' + Y(0) + 'Z', 'class': 'a-work' }, svg);
    s('line', { x1: X(0), y1: Y(0), x2: X(7), y2: Y(0), 'class': 'l-axis' }, svg);
    s('path', { d: line, 'class': 'l-work' }, svg);

    /* copies: a stepped ink line */
    var cp = after
      ? 'M' + X(0) + ',' + Y(3) + 'H' + X(C.pushFrom).toFixed(1) + 'V' + Y(9) + 'H' + X(C.pushTo).toFixed(1) + 'V' + Y(3) + 'H' + X(7)
      : 'M' + X(0) + ',' + Y(6) + 'H' + X(7);
    s('path', { d: cp, 'class': 'l-copies' }, svg);

    /* labels at the line ends, in the right margin */
    var end = X(7) + 6;
    s('text', { x: end, y: Y(after ? 3 : 6) + 4, 'class': 't-b' }, svg, L.copies.toUpperCase());
    s('text', { x: end, y: Y(0.6) + 4, 'class': 't-c1' }, svg, L.work.toUpperCase());

    /* one direct label in the plot: the gap (before), or the copies line (after) */
    var lines = after ? L.follow : L.gap;
    var room = X(C.rushFrom) - X(0) - 16;
    var one = lines.join(' ').toUpperCase();
    var set = measure(one) <= room ? [one] : lines.map(function (t) { return t.toUpperCase(); });
    var base = after ? Y(3) - 10 - (set.length - 1) * 16 : Y(4) + 4 - (set.length - 1) * 8;
    set.forEach(function (t, j) { s('text', { x: X(0) + 8, y: base + j * 16, 'class': 't-b t-halo' }, svg, t); });
    if (after) {
      s('text', { x: X(C.pushFrom) - 6, y: Y(9) + 4, 'text-anchor': 'end', 'class': 't-b t-halo' }, svg, L.push.toUpperCase());
    }

    /* the nodes band: one row per node, under the axis */
    var top = m.t + ph + m.b;
    for (var r = 0; r < 5; r++) {
      var y = top + (4 - r) * (rowH + rowGap);
      if (after && r === 4) {
        var x7 = X(C.node07From), w7 = Math.max(3, X(C.node07To) - x7);
        s('rect', { x: x7.toFixed(1), y: y, width: w7.toFixed(1), height: rowH, 'class': 'a-node a-node--new' }, svg);
        s('text', { x: x7 - 6, y: y + rowH, 'text-anchor': 'end', 'class': 't-b' }, svg, L.node07.toUpperCase());
      } else {
        s('rect', { x: X(0), y: y, width: pw, height: rowH, 'class': 'a-node' }, svg);
      }
    }
    s('text', { x: end, y: top + bandH / 2 + 10, 'class': 't-b' }, svg, (after ? L.nodesAfter : L.nodesBefore).toUpperCase());
  }

  function drawAll() { hosts.forEach(draw); }
  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; drawAll(); });
  }
  drawAll();
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(schedule);
    hosts.forEach(function (h) { ro.observe(h); });
  } else window.addEventListener('resize', schedule);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  document.addEventListener('didactician:gate-open', schedule);
})();

/* ---- Fig. 06 · Friday, about 19:20 ---------------------------------------------------------------
   One snapshot drawn by the pooled renderCluster from the lane's data file: the slot
   [data-cluster-figure="after"] draws window.ClusterData.FIGURES.after = { state, highlight, ariaLabel },
   nodes only, five columns (three where the slot is under 560px wide, so the five nodes wrap to two rows).
   Drawn at once (the data and the pool scripts load before this file), again when its gate opens (the
   slot has no width while it is locked), on resize and after web fonts load. */
(function () {
  'use strict';
  var slots = Array.prototype.slice.call(document.querySelectorAll('[data-cluster-figure]'));
  if (!slots.length) return;
  var R = null;
  function draw(slot) {
    var CC = window.ClusterCanvas, D = window.ClusterData;
    var e = D && D.FIGURES && D.FIGURES[slot.getAttribute('data-cluster-figure')];
    if (!CC || !CC.create || !e) return;
    var width = Math.floor(slot.clientWidth);
    if (width < 120 || width === slot.__w) return;
    slot.__w = width;
    if (!R) R = CC.create(D);
    var o = { nodesOnly: true, columns: width >= 560 ? 5 : 3 };
    var layout = R.laneLayout(width, [e.state], null, o);
    R.renderCluster(slot, e.state, { width: width, layout: layout, nodesOnly: true, columns: o.columns, highlight: e.highlight || [] });
    if (e.ariaLabel) slot.setAttribute('aria-label', e.ariaLabel);
    slot.setAttribute('data-drawn', '');
  }
  function drawAll(force) { slots.forEach(function (sl) { if (force) sl.__w = 0; draw(sl); }); }
  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; drawAll(false); });
  }
  drawAll(true);
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(schedule);
    slots.forEach(function (sl) { ro.observe(sl); });
  } else window.addEventListener('resize', schedule);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (R) R.reset(); drawAll(true); });
  document.addEventListener('didactician:gate-open', function () { requestAnimationFrame(function () { drawAll(true); }); });
})();

/* ---- lane A · Friday, 17:30: the push --------------------------------------------------------------
   The lane is data only: the pooled lane controller runs it from widgets/w-rush-scrolly/data.js. */
(function () {
  'use strict';
  if (!document.querySelector('[data-widget="w-rush-scrolly"]')) return;
  if (!window.ClusterCanvas || !window.ClusterCanvas.lanes || !window.ClusterData) { console.error('w-rush-scrolly: pool/cluster/lanes.js or data.js missing'); return; }
  window.ClusterCanvas.lanes('w-rush-scrolly', window.ClusterData);
})();
