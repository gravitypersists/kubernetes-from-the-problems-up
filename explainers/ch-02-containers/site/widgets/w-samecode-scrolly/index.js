/* w-samecode-scrolly · Ch 02 §02, "Same code, two machines": two scrollytelling lanes over one drawing
   of two machines compared row by row. Classic script; needs assets/widget.js (Didactician.widget) and
   ./data.js (SameCodeData).

   Two parts, as in Ch 03's w-fleet-scrolly (whose lane controller this copies):
   1. renderPair(target, state, opts) draws ONE complete snapshot (format: see data.js): a figure plate
      with a mono header bar; two machine frames (Ch 01/02 grammar: MACHINE · NAME bar, code row in c1,
      other rows in c2), optionally an image frame around both machines' rows; a marker column between
      the machines (SAME / DIFFERENT, or = / ≠ with a legend on narrow canvases); and a tests row per
      machine (word + colour, never colour alone). One CSS grid holds both machines and the markers, so
      the rows line up at every width. Exposed as window.SameCodeCanvas.renderPair.
   2. The lane controller (mount contract in index.html, above the mount): fills [data-step-text] and
      [data-step-snap], activates the step whose top last crossed 55% of the viewport, restores that
      step's snapshot on the lane canvas, and locks gated steps until the page's checks dispatch
      'didactician:check-commit'. Gates never re-lock.
   No libraries, no network. */
(function () {
  'use strict';

  var D = window.SameCodeData;
  var S = D && D.STRINGS;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------- renderPair ---------- */
  /* opts: { width, highlight: [keys], header: { lane, n, total }, lit: bool, enter: bool, hasImage: bool } */
  function renderPair(target, state, opts) {
    opts = opts || {};
    var width = opts.width || target.clientWidth || 320;
    var narrow = width < 440;
    var hl = {};
    (opts.highlight || []).forEach(function (h) { hl[h] = true; });
    var mark = function (node, key) { if (hl[key]) node.classList.add('is-hl'); return node; };
    var hasImage = opts.hasImage != null ? opts.hasImage : !!state.image;

    var root = el('div', 'sc' + (narrow ? ' sc--narrow' : '') + (opts.lit === false ? '' : ' is-lit'));

    if (opts.header) {
      var bar = el('div', 'sc__bar');
      bar.appendChild(el('span', 'sc__title', (narrow ? opts.header.lane : S.widgetShort + ' · ' + opts.header.lane).toUpperCase()));
      bar.appendChild(el('span', 'sc__step', (S.step + ' ' + opts.header.n + ' / ' + opts.header.total).toUpperCase()));
      root.appendChild(bar);
    }

    var ground = el('div', 'sc__ground');
    var grid = el('div', 'sc__grid');
    var place = function (node, col, r1, r2) {
      node.style.gridColumn = String(col);
      node.style.gridRow = r2 ? r1 + ' / ' + (r2 + 1) : String(r1);
      grid.appendChild(node);
      return node;
    };

    /* rows: 1 bars · 2 image header (lanes with an image) · rows · tests */
    var rImg = hasImage ? 2 : 0;
    var rFirst = hasImage ? 3 : 2;
    var rLast = rFirst + D.ROWS.length - 1;
    var rTests = rLast + 1;

    D.MACHINES.forEach(function (m, i) {
      var col = i === 0 ? 1 : 3;
      place(el('div', 'sc-frame'), col, 1, rTests);
      if (hasImage && state.image) place(mark(el('div', 'sc-imgframe'), 'image'), col, rImg, rLast);

      var mb = el('div', 'sc-mbar');
      if (!narrow) mb.appendChild(el('span', 'sc-mbar__k', S.machine));
      mb.appendChild(el('span', 'sc-mbar__id', m.name));
      place(mb, col, 1);

      if (hasImage) {
        var ih = el('div', 'sc-imghead');
        if (state.image) {
          ih.appendChild(el('span', 'sc-imghead__k', S.image));
          ih.appendChild(el('span', 'sc-imghead__id', state.image));
        }
        place(ih, col, rImg);
      }

      D.ROWS.forEach(function (row, k) {
        var cell = el('div', 'sc-cell' + (hasImage && state.image ? ' sc-cell--in' : '') +
          (k === 0 ? ' sc-cell--first' : '') + (k === D.ROWS.length - 1 ? ' sc-cell--last' : ''));
        var chip = mark(el('div', 'sc-row sc-row--' + row.tone), 'row:' + row.id);
        var v = state.values[m.id][row.id];
        if (!narrow) chip.appendChild(el('span', 'sc-row__k', row.key));
        chip.appendChild(el('span', 'sc-row__v', narrow && row.narrowPrefix ? row.narrowPrefix + v : v));
        cell.appendChild(chip);
        place(cell, col, rFirst + k);
      });

      var t = state.tests[m.id] || { st: 'none' };
      var tc = el('div', 'sc-cell sc-cell--tests');
      var tb = mark(el('div', 'sc-test sc-test--' + t.st), 'test:' + m.id);
      tb.appendChild(el('span', 'sc-test__k', S.tests));
      var st = el('span', 'sc-test__st');
      if (t.st === 'pass' || t.st === 'fail') {
        var lamp = el('i', 'sc-lamp'); lamp.setAttribute('aria-hidden', 'true');
        st.appendChild(lamp);
      }
      st.appendChild(document.createTextNode(S.status[t.st]));
      tb.appendChild(st);
      tb.appendChild(el('span', 'sc-test__d', t.detail || ' '));
      tc.appendChild(tb);
      place(tc, col, rTests);
    });

    /* marker column: computed from the two machines' values */
    var a = D.MACHINES[0].id, b = D.MACHINES[1].id;
    D.ROWS.forEach(function (row, k) {
      var mk = el('div', 'sc-mk');
      if (state.markers) {
        var same = state.values[a][row.id] === state.values[b][row.id];
        var w = mark(el('span', 'sc-mk__w ' + (same ? 'is-same' : 'is-diff')), 'row:' + row.id);
        w.textContent = narrow ? (same ? S.sameGlyph : S.differentGlyph) : (same ? S.same : S.different);
        if (narrow) w.setAttribute('title', same ? S.same : S.different);
        if (opts.enter) w.classList.add('is-enter');
        mk.appendChild(w);
      }
      place(mk, 2, rFirst + k);
    });

    ground.appendChild(grid);
    if (narrow) {
      var lg = el('p', 'sc__legend', state.markers ? S.legend : ' ');
      ground.appendChild(lg);
    }
    root.appendChild(ground);

    target.textContent = '';
    target.appendChild(root);
    return root;
  }

  window.SameCodeCanvas = { renderPair: renderPair };

  if (!D || !window.Didactician) { console.error('w-samecode-scrolly: SameCodeData or Didactician missing'); return; }

  /* ---------- the lane controller (copied from Ch 03's w-fleet-scrolly, without the unit fitting) ---------- */
  Didactician.widget('w-samecode-scrolly', function (mount, ctx) {
    var committed = {};
    document.querySelectorAll('.cp-check[data-committed]').forEach(function (c) {
      committed[c.getAttribute('data-check')] = true;
    });

    function fillText(target, paras) {
      target.textContent = '';
      paras.forEach(function (para) {
        var p = el('p');
        para.split('`').forEach(function (part, i) {
          if (i % 2) { p.appendChild(el('code', null, part)); return; }
          part.split('**').forEach(function (bit, j) {
            p.appendChild(j % 2 ? el('dfn', null, bit) : document.createTextNode(bit));
          });
        });
        target.appendChild(p);
      });
    }

    var lanes = [];
    Array.prototype.forEach.call(mount.querySelectorAll('.fs-lane'), function (laneEl) {
      var data = D.LANES[laneEl.getAttribute('data-lane')];
      if (!data) return;
      var lane = { el: laneEl, data: data, canvas: laneEl.querySelector('[data-canvas]'), steps: [], active: -1, shown: -1 };
      Array.prototype.forEach.call(laneEl.querySelectorAll('.fs-step'), function (li) {
        var id = li.getAttribute('data-step');
        var sd = data.steps.filter(function (s) { return s.id === id; })[0];
        if (!sd) { console.error('w-samecode-scrolly: no data for step ' + id); return; }
        var attr = li.getAttribute('data-gate');
        lane.steps.push({
          li: li, id: id, data: sd,
          gate: attr ? attr.split(/\s+/).filter(Boolean) : [],
          snap: li.querySelector('[data-step-snap]'),
          text: li.querySelector('[data-step-text]')
        });
      });
      lane.hasImage = lane.steps.some(function (s) { return !!s.data.state.image; });
      lanes.push(lane);
    });

    var isOpen = function (step) { return step.gate.every(function (id) { return committed[id]; }); };

    lanes.forEach(function (lane) {
      lane.steps.forEach(function (step) {
        if (step.text) fillText(step.text, step.data.text);
        if (!isOpen(step)) step.li.classList.add('is-locked');
      });
    });

    function stepOpts(lane, i, width, extra) {
      var o = {
        width: width, highlight: lane.steps[i].data.highlight, hasImage: lane.hasImage,
        header: { lane: lane.data.name, n: i + 1, total: lane.steps.length }
      };
      for (var k in extra) o[k] = extra[k];
      return o;
    }
    function label(target, step) {
      target.setAttribute('role', 'img');
      target.setAttribute('aria-label', step.data.ariaLabel);
    }

    function drawCanvas(lane, animate) {
      if (!lane.canvas) return;
      var i = Math.max(lane.active, 0);
      var step = lane.steps[i];
      var prev = lane.shown >= 0 ? lane.steps[lane.shown].data.state : null;
      var enter = !!(animate && prev && !prev.markers && step.data.state.markers);
      var root = renderPair(lane.canvas, step.data.state, stepOpts(lane, i, lane.width, { lit: !animate, enter: enter }));
      label(lane.canvas, step);
      lane.shown = i;
      if (animate) {
        /* the step highlight eases in (CSS transition, dur-2 ≤ 300ms; instant under reduced motion) */
        requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add('is-lit'); }); });
      }
    }
    function drawSnaps(lane) {
      lane.steps.forEach(function (step, i) {
        if (!step.snap) return;
        var w = step.snap.clientWidth || (step.text && step.text.clientWidth) || lane.width;
        renderPair(step.snap, step.data.state, stepOpts(lane, i, w, {}));
        label(step.snap, step);
      });
    }
    function layout() {
      lanes.forEach(function (lane) {
        lane.width = (lane.canvas && lane.canvas.clientWidth) || mount.clientWidth || 320;
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
    var first = true;   /* ctx.onResize calls back once at registration; layout() has just run */
    ctx.onResize(function () { if (first) { first = false; return; } relayout(); });
    window.addEventListener('resize', function () {
      var w = window.innerWidth, h = window.innerHeight;
      /* ignore the small height changes of a phone's collapsing address bar */
      if (w === lastW && Math.abs(h - lastH) < 80 && (h < 560) === (lastH < 560)) return;
      lastW = w; lastH = h;
      relayout();
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  });
})();
