/* w-fleet-scrolly · Ch 03 §02, "One week of Sam's job": three scrollytelling lanes over one drawing of
   four machines. Classic script; needs assets/widget.js (Didactician.widget) and ./data.js (FleetData).

   Two parts, both meant to be copied by later chapters (plan w-fleet-scrolly reuse: Ch 4, 6, 7, 8):
   1. renderFleet(target, state, opts)  draws ONE complete snapshot (format: see data.js) into `target`:
      a figure plate with a mono header bar, four machine frames whose bodies hold `capacity` units of
      room, container chips whose height is their size, a dashed "N FREE" region, a DOWN machine with
      LOST chips, service pills computed from the snapshot, and note lines. Exposed as
      window.FleetCanvas.renderFleet. Visual grammar: Ch 02's .cp-machine / .cp-ctr chip (b661656),
      scoped copies in index.css.
   2. The lane controller (mount contract in index.html, above the mount): fills [data-step-text] and
      [data-step-snap], activates the step whose top last crossed 55% of the viewport
      (IntersectionObserver), restores that step's snapshot on the lane canvas, and locks gated steps
      until the page's checks dispatch 'didactician:check-commit'. Gates never re-lock.
   No libraries, no network. */
(function () {
  'use strict';

  var D = window.FleetData;
  var S = D && D.STRINGS;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------- text measurement (mono chrome; widths decide label breaks and pill rows) ---------- */
  var mctx = document.createElement('canvas').getContext('2d');
  var monoFamily = null;
  function family() {
    if (!monoFamily) {
      monoFamily = (getComputedStyle(document.documentElement).getPropertyValue('--font-mono') || '').trim() || 'monospace';
    }
    return monoFamily;
  }
  function textW(s, weight, ls) {
    mctx.font = (weight || 700) + ' 13px ' + family();
    return mctx.measureText(s).width + (ls || 0) * 13 * s.length;
  }

  /* ---------- the snapshot model ---------- */
  function parseEntry(entry) {
    var i = entry.indexOf(':');
    return i < 0 ? { id: entry, status: 'running' } : { id: entry.slice(0, i), status: entry.slice(i + 1) };
  }
  function isDown(state, m) { return (state.down || []).indexOf(m) >= 0; }

  /* UP if at least `copies` containers RUNNING on up machines, DOWN if none, DEGRADED otherwise.
     NEW ADDR, CRASHED, LOST and STOPPED don't serve. */
  function servicePills(state) {
    var running = {};
    D.MACHINES.forEach(function (m) {
      if (isDown(state, m)) return;
      (state.machines[m] || []).forEach(function (entry) {
        var c = parseEntry(entry);
        if (c.status !== 'running') return;
        var svc = D.CONTAINERS[c.id].service;
        running[svc] = (running[svc] || 0) + 1;
      });
    });
    return D.SERVICE_ORDER.map(function (name) {
      var n = running[name] || 0;
      var copies = D.SERVICES[name].copies;
      return { name: name, n: n, status: n >= copies ? 'up' : (n === 0 ? 'down' : 'degraded') };
    });
  }
  function usedRoom(state, m) {
    return (state.machines[m] || []).reduce(function (t, entry) {
      return t + D.SERVICES[D.CONTAINERS[parseEntry(entry).id].service].size;
    }, 0);
  }

  /* ---------- layout ---------- */
  var BORDER = 1.5, LAMP = 12;
  function geometry(width) {
    var narrow = width < 440;   /* phone column: tighter chrome */
    var g = {
      width: width, narrow: narrow,
      pad: narrow ? 4 : 12,          /* plate padding */
      gapM: narrow ? 4 : 8,          /* between machine frames */
      bodyPad: narrow ? 2 : 4,
      chipPadX: narrow ? 2 : 4,
      lh: narrow ? 14 : 16,
      gapU: narrow ? 3 : 4,          /* between stacked units of room */          /* chip line height (text stays 13px) */
      row: narrow ? 4 : 8            /* between the plate's rows */
    };
    g.inner = width - 2 * BORDER - 2 * g.pad;
    g.colW = (g.inner - 3 * g.gapM) / 4;
    g.chipTextW = g.colW - 2 * BORDER - 2 * g.bodyPad - 2 * BORDER - 2 * g.chipPadX;
    return g;
  }

  function pillParts(p, held) {
    return {
      name: p.name,
      n: held ? '' : String(p.n),
      status: held ? S.held : S.service[p.status]
    };
  }
  function pillWidth(parts) {
    var w = textW(parts.name) + textW(parts.status) + 2 * 8 + 2 * BORDER;
    if (parts.n) w += textW(parts.n) + textW('·') + 3 * 4; else w += 4;
    return w;
  }
  /* pill rows: one row if every state of the lane fits, else two rows of two, else one per row */
  var PILL_LAYOUTS = [[[0, 1, 2, 3]], [[0, 1], [2, 3]], [[0], [1], [2], [3]]];
  function pillLayout(g, states) {
    for (var k = 0; k < PILL_LAYOUTS.length; k++) {
      var ok = states.every(function (st) {
        if (!st.pills) return true;
        var parts = servicePills(st).map(function (p) { return pillParts(p, false); });
        return PILL_LAYOUTS[k].every(function (row) {
          var w = row.reduce(function (t, i) { return t + pillWidth(parts[i]); }, 0) + (row.length - 1) * 6;
          return w <= g.inner;
        });
      });
      if (ok) return PILL_LAYOUTS[k];
    }
    return PILL_LAYOUTS[2];
  }
  function lineCount(text, weight, avail) { return textW(text, weight) + 8 > avail ? 2 : 1; }

  /* What a lane's canvas must reserve so every one of its states has the same height (CURRICULUM §8.5):
     pills, note lines and the banner row, sized for the lane's widest content. */
  function reserveFor(g, states) {
    var r = { pills: null, notes: [], banner: 0 };
    if (states.some(function (s) { return s.pills; })) r.pills = pillLayout(g, states);
    states.forEach(function (s) {
      (s.notes || []).forEach(function (n, i) {
        var t = (n.label ? n.label.toUpperCase() + ' · ' : '') + n.text;
        r.notes[i] = Math.max(r.notes[i] || 0, lineCount(t, 400, g.inner));
      });
      if (s.banner) r.banner = Math.max(r.banner, lineCount(s.banner.toUpperCase(), 700, g.inner - 16));
    });
    return r;
  }

  /* ---------- chip label lines ----------
     Full label: name (broken as data.js allows when too wide), version, status word with a lamp.
     When the chip is too short for all of it: an abnormal chip keeps its status word (and its name if
     there's room; the step text names the service); a RUNNING chip keeps its name and shows a lamp
     if there's room for one. */
  function chipLines(c, status, textWidth, maxLines) {
    var svc = D.SERVICES[c.service];
    var fits = function (s, extra) { return textW(s) + (extra || 0) <= textWidth + 0.5; };
    var name = fits(svc.label) ? [svc.label] : svc.breaks.slice();
    var nameLines = name.map(function (t) { return { t: t }; });
    var body = nameLines.slice();
    if (c.version) {
      var last = body[body.length - 1];
      if (fits(last.t + ' ' + c.version)) body[body.length - 1] = { t: last.t + ' ' + c.version };
      else body.push({ t: c.version });
    }
    var word = S.status[status];
    var stLine = { st: status, t: word, lamp: fits(word, LAMP) };
    if (body.length + 1 <= maxLines) return body.concat([stLine]);
    if (status !== 'running') {
      var room = maxLines - 1;
      var keep = body.length <= room ? body : (nameLines.length <= room ? nameLines : []);
      return keep.concat([stLine]);
    }
    var out = body.length <= maxLines ? body : nameLines.slice(0, Math.max(1, maxLines));
    var tail = out[out.length - 1];
    if (fits(tail.t, LAMP)) out[out.length - 1] = { t: tail.t, lamp: 'running' };
    return out;
  }

  /* ---------- renderFleet ---------- */
  /* opts: { width, unit, reserve, highlight: [ids], held: bool, lit: bool,
             header: { lane: 'Saturday night', n: 2, total: 6 } } — all optional. */
  function renderFleet(target, state, opts) {
    opts = opts || {};
    var g = geometry(opts.width || target.clientWidth || 320);
    var u = opts.unit || (g.narrow ? 28 : 40);
    var reserve = opts.reserve || reserveFor(g, [state]);
    var hl = {};
    (opts.highlight || []).forEach(function (h) { hl[h] = true; });
    var mark = function (node, key) { if (hl[key]) node.classList.add('is-hl'); return node; };
    var unitsH = function (n) { return n * u + (n - 1) * g.gapU; };

    var root = el('div', 'wf' + (g.narrow ? ' wf--narrow' : '') + (opts.lit === false ? '' : ' is-lit'));
    root.setAttribute('data-unit', u);
    root.style.setProperty('--wf-pad', g.pad + 'px');
    root.style.setProperty('--wf-gapm', g.gapM + 'px');
    root.style.setProperty('--wf-bodypad', g.bodyPad + 'px');
    root.style.setProperty('--wf-chippad', g.chipPadX + 'px');
    root.style.setProperty('--wf-row', g.row + 'px');
    root.style.setProperty('--wf-gapu', g.gapU + 'px');

    /* header bar: "W-01 · ONE WEEK, BY HAND · SATURDAY NIGHT" … "STEP 2 / 6" */
    if (opts.header) {
      var bar = el('div', 'wf__bar');
      var stepTxt = (S.step + ' ' + opts.header.n + ' / ' + opts.header.total).toUpperCase();
      var full = (S.widget + ' · ' + opts.header.lane).toUpperCase();
      var short = (S.widgetShort + ' · ' + opts.header.lane).toUpperCase();
      var room = g.width - 2 * BORDER - 16 - 8 - textW(stepTxt, 700, 0.08);
      /* the long title only if it fits for the longest lane name, so all lanes read alike */
      var longest = Object.keys(D.FLEET_LANES).reduce(function (t, k) {
        var nm = D.FLEET_LANES[k].name;
        return nm.length > t.length ? nm : t;
      }, opts.header.lane);
      var fitsAll = textW((S.widget + ' · ' + longest).toUpperCase(), 700, 0.08) <= room;
      bar.appendChild(el('span', 'wf__title', fitsAll ? full : short));
      bar.appendChild(el('span', 'wf__step', stepTxt));
      root.appendChild(bar);
    }

    var ground = el('div', 'wf__ground');
    root.appendChild(ground);

    if (reserve.banner) {
      var ban = el('p', 'wf__banner');
      ban.style.minHeight = (reserve.banner * 18 + 4 + 2 * BORDER) + 'px';
      if (state.banner) { ban.appendChild(el('span', 'wf__banner-t', state.banner)); mark(ban.firstChild, 'banner'); }
      ground.appendChild(ban);
    }

    /* machines */
    var row = el('div', 'wf__machines');
    var chipLinesMax = function (size) {
      return Math.max(1, Math.floor((unitsH(size) - 2 * BORDER - 2) / g.lh));
    };
    D.MACHINES.forEach(function (m) {
      var down = isDown(state, m);
      var f = mark(el('div', 'wf-m' + (down ? ' is-down' : '')), 'm:' + m);
      f.setAttribute('data-m', m);
      var mb = el('div', 'wf-m__bar');
      mb.appendChild(el('span', 'wf-m__k', S.machine));
      var id = el('span', 'wf-m__id', m);
      if (down) { id.appendChild(document.createTextNode(' ')); id.appendChild(el('b', 'wf-st wf-st--bad', S.status.down)); }
      mb.appendChild(id);
      f.appendChild(mb);
      var body = el('div', 'wf-m__body');
      body.style.height = (unitsH(D.CAPACITY) + 2 * g.bodyPad) + 'px';
      (state.machines[m] || []).forEach(function (entry) {
        var c = parseEntry(entry);
        var info = D.CONTAINERS[c.id];
        var size = D.SERVICES[info.service].size;
        var chip = mark(el('div', 'wf-c wf-c--' + c.status), 'c:' + c.id);
        chip.setAttribute('data-c', c.id);
        chip.style.height = unitsH(size) + 'px';
        var lines = chipLines(info, c.status, g.chipTextW, chipLinesMax(size));
        if (lines.length === 1 && unitsH(size) - 2 * BORDER < g.lh + 2) chip.classList.add('wf-c--tight');
        lines.forEach(function (ln) {
          var span = el('span', 'wf-c__ln' + (ln.st ? ' wf-st wf-st--' + ln.st : ''));
          if (ln.st && ln.lamp) { var lp = el('i', 'wf-lamp'); lp.setAttribute('aria-hidden', 'true'); span.appendChild(lp); }
          span.appendChild(document.createTextNode(ln.t));
          if (!ln.st && ln.lamp) { var lp2 = el('i', 'wf-lamp wf-st--running'); lp2.setAttribute('aria-hidden', 'true'); span.appendChild(lp2); }
          chip.appendChild(span);
        });
        body.appendChild(chip);
      });
      var free = D.CAPACITY - usedRoom(state, m);
      if (!down && free > 0) {
        var fr = mark(el('div', 'wf-free', free + ' ' + S.free), 'free:' + m);
        fr.style.height = unitsH(free) + 'px';
        body.appendChild(fr);
      }
      f.appendChild(body);
      row.appendChild(f);
    });
    ground.appendChild(row);

    /* service pills, computed from the snapshot */
    if (reserve.pills) {
      var pills = el('div', 'wf__pills');
      var list = servicePills(state);
      var heldSet = {};
      if (opts.held && state.hold) state.hold.pills.forEach(function (n) { heldSet[n] = true; });
      reserve.pills.forEach(function (r) {
        var pr = el('div', 'wf__pillrow');
        r.forEach(function (i) {
          var p = list[i];
          var held = !!heldSet[p.name];
          var parts = pillParts(p, held);
          var pill = mark(el('span', 'wf-pill ' + (held ? 'wf-pill--held' : 'wf-pill--' + p.status)), 'pill:' + p.name);
          pill.appendChild(el('span', 'wf-pill__name', parts.name));
          if (parts.n) {
            pill.appendChild(el('span', 'wf-pill__n', parts.n));
            pill.appendChild(el('span', 'wf-pill__sep', '·'));
          }
          pill.appendChild(el('span', 'wf-pill__st', parts.status));
          pr.appendChild(pill);
        });
        pills.appendChild(pr);
      });
      if (!state.pills) pills.classList.add('is-empty');
      ground.appendChild(pills);
    }

    /* note lines: the connection line, the spreadsheet */
    if (reserve.notes.length) {
      var notes = el('div', 'wf__notes');
      reserve.notes.forEach(function (lines, i) {
        var n = (state.notes || [])[i];
        var slot = el('div', 'wf__noteslot');
        slot.style.minHeight = (lines * 18) + 'px';
        if (n) {
          var p = mark(el('p', 'wf-note' + (n.tone ? ' wf-note--' + n.tone : '')), 'note:' + n.id);
          p.setAttribute('data-note', n.id);
          if (n.label) { p.appendChild(el('b', 'wf-note__k', n.label)); p.appendChild(document.createTextNode(' · ')); }
          p.appendChild(document.createTextNode(n.text));
          slot.appendChild(p);
        }
        notes.appendChild(slot);
      });
      ground.appendChild(notes);
    }

    target.textContent = '';
    target.appendChild(root);
    return root;
  }

  window.FleetCanvas = { renderFleet: renderFleet, servicePills: servicePills, reserveFor: reserveFor, geometry: geometry };

  if (!D || !window.Didactician) { console.error('w-fleet-scrolly: FleetData or Didactician missing'); return; }

  /* ---------- the lane controller ---------- */
  Didactician.widget('w-fleet-scrolly', function (mount, ctx) {
    var committed = {};
    document.querySelectorAll('.cp-check[data-committed]').forEach(function (c) {
      committed[c.getAttribute('data-check')] = true;
    });

    var lanes = [];
    Array.prototype.forEach.call(mount.querySelectorAll('.fs-lane'), function (laneEl) {
      var data = D.FLEET_LANES[laneEl.getAttribute('data-lane')];
      if (!data) return;
      var lane = { el: laneEl, data: data, canvas: laneEl.querySelector('[data-canvas]'), steps: [], active: -1, shown: -1 };
      Array.prototype.forEach.call(laneEl.querySelectorAll('.fs-step'), function (li) {
        var id = li.getAttribute('data-step');
        var sd = data.steps.filter(function (s) { return s.id === id; })[0];
        if (!sd) { console.error('w-fleet-scrolly: no data for step ' + id); return; }
        var attr = li.getAttribute('data-gate');
        lane.steps.push({
          li: li, id: id, data: sd,
          gate: attr != null ? attr.split(/\s+/).filter(Boolean) : (sd.gate || []),
          snap: li.querySelector('[data-step-snap]'),
          text: li.querySelector('[data-step-text]')
        });
      });
      lane.states = lane.steps.map(function (s) { return s.data.state; });
      lanes.push(lane);
    });

    var isOpen = function (step) { return step.gate.every(function (id) { return committed[id]; }); };
    var isHeld = function (state) { return !!(state.hold && !committed[state.hold.until]); };

    /* step text (SLOT 3), with any time kicker */
    lanes.forEach(function (lane) {
      lane.steps.forEach(function (step) {
        if (!step.text) return;
        step.text.textContent = '';
        if (step.data.kicker) step.text.appendChild(el('p', 'wf-kicker', step.data.kicker));
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

    /* sizes: one unit per lane, fitted so the canvas stays within its slot (≤ 50vh under 900px) */
    function canvasBudget(width) {
      var vw = window.innerWidth, vh = window.innerHeight;
      if (vw >= 900) return { maxH: vh - 48, maxU: 40 };
      return { maxH: Math.floor(vh * 0.5) - 16, maxU: width < 440 ? 28 : 40 };
    }
    function fit(target, state, opts, budget) {
      var u = budget.maxU, root;
      for (var k = 0; k < 4; k++) {
        opts.unit = u;
        root = renderFleet(target, state, opts);
        var h = root.offsetHeight;
        if (!h || h <= budget.maxH || u <= 20) break;
        u = Math.max(20, u - Math.ceil((h - budget.maxH) / 6));
      }
      return u;
    }
    function header(lane, i) { return { lane: lane.data.name, n: i + 1, total: lane.steps.length }; }
    function stepOpts(lane, i, width, extra) {
      var st = lane.steps[i];
      var o = { width: width, reserve: lane.reserve, highlight: st.data.highlight, held: isHeld(st.data.state), header: header(lane, i) };
      for (var k in extra) o[k] = extra[k];
      return o;
    }
    function label(target, step) {
      target.setAttribute('role', 'img');
      target.setAttribute('aria-label', isHeld(step.data.state) && step.data.ariaHeld ? step.data.ariaHeld : step.data.ariaLabel);
    }

    function drawCanvas(lane, animate) {
      if (!lane.canvas) return;
      var i = Math.max(lane.active, 0);
      var step = lane.steps[i];
      var root = renderFleet(lane.canvas, step.data.state, stepOpts(lane, i, lane.width, { unit: lane.unit, lit: !animate }));
      label(lane.canvas, step);
      lane.shown = i;
      if (animate) {
        /* the step highlight eases in (CSS transition, dur-2 ≤ 300ms; instant under reduced motion) */
        requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add('is-lit'); }); });
      }
    }
    function drawSnaps(lane) {
      var vh = window.innerHeight;
      lane.steps.forEach(function (step, i) {
        if (!step.snap) return;
        var w = step.snap.clientWidth || (step.text && step.text.clientWidth) || lane.width;
        var opts = stepOpts(lane, i, w, {});
        opts.reserve = reserveFor(geometry(w), lane.states);
        fit(step.snap, step.data.state, opts, { maxH: Math.max(240, Math.floor(vh * 0.6)), maxU: 28 });
        label(step.snap, step);
      });
    }
    function layout() {
      lanes.forEach(function (lane) {
        var w = (lane.canvas && lane.canvas.clientWidth) || mount.clientWidth || 320;
        lane.width = w;
        lane.reserve = reserveFor(geometry(w), lane.states);
        if (lane.canvas && lane.canvas.offsetParent !== null) {
          /* fit on the first state; every state of a lane reserves the same rows, so they share a height */
          lane.unit = fit(lane.canvas, lane.states[0], stepOpts(lane, 0, w, {}), canvasBudget(w));
        } else {
          lane.unit = lane.unit || 28;
        }
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
        var heldHere = lane.steps.some(function (s) { return s.data.state.hold && s.data.state.hold.until === id; });
        if (heldHere) {
          /* the held pills reveal in place on commit */
          if (lane.shown >= 0 && lane.steps[lane.shown].data.state.hold) drawCanvas(lane, true);
          drawSnaps(lane);
        }
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
