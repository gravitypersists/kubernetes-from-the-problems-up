/* w-samecode · W-01 Same code, two machines (segment s-02; checks k-02, k-03).
   Plan blueprint B4 (contrasting cases in aligned rows) with B1-style step-locking:
     1 installed by hand: predict production (k-02), then see it FAIL
     2 one image (fennel-app:v42): predict both machines (k-03), then see FAIL / FAIL
     3 a new image (fennel-app:v43): PASS / PASS, plus the NOT IN THE IMAGE band
   Adapted from Ch 1's w-rebuild stage-4 comparison (statusCell / panel4, its check pattern and its
   stacked-states height technique), copied into this namespace; Ch 1's files are untouched.

   Model: all words and rows come from data.js. Markers (IDENTICAL / SAME / DIFFERENT) and results
   (PASS iff the photo tool on that machine is >= 7.0) are computed from the per-state values,
   never stored. Result cells gated on a check stay hidden until that check is committed.
   Checks follow the page's pattern (assets/page.js): commit, then reveal; CORRECT / NOT QUITE;
   TRY AGAIN on a wrong pick; the other options' feedback in a "why" disclosure.

   Height: the three state panels sit stacked in one grid cell. On every width change the widget
   measures each state in its tallest form (every check answered, each option tried) and reserves
   that height, so neither a state change nor a check reveal moves the page below.
   Below 600px (course rule, CURRICULUM.md §8 step 5) nothing is reserved: only the current state is
   laid out, each state takes its own height, and a state change scrolls its header to the top. */
(function () {
  'use strict';

  Didactician.widget('w-samecode', function (el, ctx) {
    var D = window.DidacticianData && window.DidacticianData['w-samecode'];
    if (!D) throw new Error('w-samecode: data.js did not load');

    var ID = 'w-samecode';
    var TOTAL = D.states.length;
    var M = D.machines;
    var reduced = ctx.reducedMotion;
    var two = null;             // container >= 700px: table left, check right (else one column)
    var narrow = false;         // container < 600px: phone
    var S;

    function fresh() {
      return { state: 1, pick: { k02: null, k03: null }, done: { k02: false, k03: false }, details: {}, focus: null, anim: null };
    }

    /* ---------- model ---------- */
    function val(rowId, n, m) { var v = D.rows[rowId].values[n - 1]; return v ? v[m] : null; }
    function cmpVer(a, b) {
      var x = String(a).split('.').map(Number), y = String(b).split('.').map(Number);
      for (var i = 0; i < Math.max(x.length, y.length); i++) {
        var d = (x[i] || 0) - (y[i] || 0);
        if (d) return d;
      }
      return 0;
    }
    function passes(n, m) { return cmpVer(val(D.result.row, n, m), D.result.min) >= 0; }
    function marker(rowId, n) {
      if (D.rows[rowId].same) return 'identical';
      return val(rowId, n, M[0].id) === val(rowId, n, M[1].id) ? 'same' : 'different';
    }
    function isHypo(n, m) { var hy = D.states[n - 1].hypo; return !!hy && hy.indexOf(m) >= 0; }
    function shown(st, n, m) { var g = D.states[n - 1].hide[m]; return !g || !!st.done[g]; }
    function changed(rowId, n, m) {
      if (n < 2) return false;
      var p = val(rowId, n - 1, m), c = val(rowId, n, m);
      return p != null && c != null && p !== c;
    }
    function isNewRow(rowId, n) { return n > 1 && val(rowId, n - 1, M[0].id) == null && val(rowId, n, M[0].id) != null; }
    function rowsIn(n) {
      var out = [];
      D.states[n - 1].bands.forEach(function (b) { b.rows.forEach(function (r) { out.push({ id: r, band: b }); }); });
      return out;
    }

    /* ---------- tiny DOM helpers ---------- */
    function h(tag, attrs, kids) {
      var e = document.createElement(tag);
      if (attrs) Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === 'class') e.className = v;
        else if (k === 'text') e.textContent = v;
        else e.setAttribute(k, v === true ? '' : v);
      });
      (kids || []).forEach(function (c) {
        if (c == null || c === false) return;
        e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
      });
      return e;
    }
    function fmt(s, v) { return s.replace(/\{(\w+)\}/g, function (m, k) { return v[k] != null ? v[k] : m; }); }
    function st(kind, word) {
      return h('span', { class: 'st st--' + kind }, [h('span', { class: 'lamp', 'aria-hidden': 'true' }), word]);
    }
    function sr(text) { return h('span', { class: 'ws-sr', text: text }); }
    function markerWord(mk) { return mk === 'identical' ? D.ui.identical : mk === 'same' ? D.ui.same : D.ui.different; }
    function markerEl(mk) {
      if (mk === 'identical') return h('span', { class: 'ws-ident', text: D.ui.identical });
      return mk === 'same' ? st('good', D.ui.same) : st('warn', D.ui.different);
    }
    /* a label with an image name in it: the name keeps its case inside uppercase chrome */
    function withImage(label, img) {
      if (!img) return [label];
      var parts = label.split('{img}');
      return [parts[0], h('span', { class: 'ws-lc', text: img }), parts[1] || ''];
    }

    /* ---------- table ---------- */
    function headRow() {
      var r = h('div', { class: 'ws-row ws-row--head', role: 'row' }, [
        h('span', { class: 'ws-item', role: 'columnheader' }, [sr(D.ui.colItem)])
      ]);
      M.forEach(function (m, i) {
        r.appendChild(h('span', { class: 'ws-col ws-m' + (i + 1), role: 'columnheader' }, [h('span', { class: 'cp-label', text: m.column })]));
      });
      r.appendChild(h('span', { class: 'ws-sr', role: 'columnheader', text: D.ui.colMarker }));
      return r;
    }

    function valueCell(n, rowId, m, o) {
      var cls = 'ws-ver';
      if (changed(rowId, n, m)) cls += ' is-changed';
      if (o.flash && o.flash.indexOf(rowId + ':' + m) >= 0) cls += ' is-flash';
      return h('span', { class: 'ws-cell ws-m' + (m === M[0].id ? 1 : 2), role: 'cell' }, [h('span', { class: cls, text: val(rowId, n, m) })]);
    }

    /* Rows: the category once per group, across the row (as Ch 1); then the label beside the two
       values, with the row's marker on the label's line, spanning both machine columns. */
    function row(n, rowId, first, o) {
      var r = D.rows[rowId];
      var mk = marker(rowId, n);
      var el = h('div', { class: 'ws-row' + (first ? ' has-cat' : ''), role: 'row', 'data-row': rowId }, [
        first ? h('span', { class: 'ws-cat cp-label', 'aria-hidden': 'true', text: r.cat }) : null,
        h('span', { class: 'ws-item', role: 'rowheader' }, [
          sr(r.cat + ': '),
          h('span', { class: 'ws-chip ws-chip--' + (r.same ? 'c1' : 'c2'), text: r.label }),
          r.note && !r.same ? h('span', { class: 'ws-note', text: r.note }) : null
        ])
      ]);
      // a marker applies to both machines, so it spans both columns (Ch 1 review fix): IDENTICAL in
      // place of the values for the code row (its note under it); SAME / DIFFERENT under the values
      if (r.same) {
        el.appendChild(h('span', { class: 'ws-cell ws-cell--span', role: 'cell', 'aria-colspan': '2' }, [
          markerEl(mk), r.note ? h('span', { class: 'ws-note', text: r.note }) : null
        ]));
      } else {
        M.forEach(function (m) { el.appendChild(valueCell(n, rowId, m.id, o)); });
        el.appendChild(h('span', { class: 'ws-cell ws-cell--mk', role: 'cell' }, [markerEl(mk)]));
      }
      return el;
    }

    function band(n, b, o) {
      var g = h('div', {
        class: 'ws-band ws-band--' + b.kind + (b.enter && o.entering === n && !reduced ? ' is-entering' : ''),
        role: 'rowgroup'
      });
      g.appendChild(h('div', { class: 'ws-band__hd', role: 'row' }, [
        h('span', { role: 'cell', 'aria-colspan': '4' }, [
          h('span', { class: 'cp-label ws-band__label', text: b.label }),
          b.image ? h('span', { class: 'ws-band__sep', 'aria-hidden': 'true', text: '·' }) : null,
          b.image ? h('span', { class: 'cp-img', text: b.image }) : null
        ])
      ]));
      var prevCat = null;
      b.rows.forEach(function (id) {
        var cat = D.rows[id].cat;
        g.appendChild(row(n, id, cat !== prevCat, o));
        prevCat = cat;
      });
      return g;
    }

    function resultCell(st0, n, m, o) {
      var s = D.states[n - 1];
      var cell = h('span', { class: 'ws-cell ws-cell--res ws-m' + (m === M[0].id ? 1 : 2), role: 'cell' });
      if (!shown(st0, n, m)) {
        cell.appendChild(h('span', { class: 'ws-q', role: 'img', 'aria-label': D.result.hiddenSr, text: D.result.hidden }));
        return cell;
      }
      var ok = passes(n, m);
      var hypo = isHypo(n, m);   // not released: the result this machine would give (same image, same result)
      var flash = o.flash && o.flash.indexOf('result:' + m) >= 0;
      cell.appendChild(h('span', { class: 'ws-res' + (hypo ? ' is-hypo' : '') + (flash ? ' is-flash' : '') }, [ok ? st('good', D.ui.pass) : st('bad', D.ui.fail)]));
      if (!ok && !hypo) cell.appendChild(h('span', { class: 'ws-err', text: D.result.fail }));
      if (s.tags && s.tags[m]) cell.appendChild(h('span', { class: 'ws-tag', text: s.tags[m] }));
      return cell;
    }

    function resultRow(st0, n, o) {
      var s = D.states[n - 1];
      var r = h('div', { class: 'ws-row ws-row--result has-cat', role: 'row', 'data-row': 'result' }, [
        h('span', { class: 'ws-cat cp-label', 'aria-hidden': 'true', text: D.result.cat }),
        h('span', { class: 'ws-item', role: 'rowheader' }, [sr(D.result.cat + ': '), h('span', { class: 'ws-test', text: D.result.label })])
      ]);
      M.forEach(function (m) { r.appendChild(resultCell(st0, n, m.id, o)); });
      // the follow-up belongs to the result it explains: a line across the row, still above the check
      if (s.followup && s.check && st0.done[s.check]) r.appendChild(h('span', { class: 'ws-follow', role: 'cell', 'aria-colspan': '3', text: s.followup }));
      return r;
    }

    function table(st0, n, o) {
      var s = D.states[n - 1];
      var t = h('div', { class: 'ws-tbl', role: 'table', 'aria-label': D.ui.tableLabel }, [headRow()]);
      s.bands.forEach(function (b, i) {
        t.appendChild(band(n, b, o));
        if (i === s.resultAfter) t.appendChild(resultRow(st0, n, o));
      });
      return t;
    }

    /* ---------- check: commit-then-reveal, same behaviour and classes as the page's checks ---------- */
    function checkCard(st0, key) {
      var k = D[key];
      var pick = st0.pick[key];
      var answered = pick != null;
      var picked = answered ? k.options.filter(function (o) { return o.key === pick; })[0] : null;
      var card = h('div', { class: 'ws-check', role: 'group', 'aria-labelledby': ID + '-' + key + 'q' }, [
        h('div', { class: 'cp-check__head' }, [h('span', { class: 'cp-chip', text: k.chip }), h('span', { class: 'cp-label', text: k.label })]),
        h('p', { class: 'ws-q-text', id: ID + '-' + key + 'q', text: k.prompt })
      ]);
      var ul = h('ul', { class: 'cp-options' });
      k.options.forEach(function (o) {
        var cls = 'cp-option', tag = '';
        if (answered && o.key === pick) { cls += o.ok ? ' is-right' : ' is-wrong'; tag = o.ok ? D.ui.correct : D.ui.yourPick; }
        else if (answered && o.ok && !picked.ok) { cls += ' is-right'; tag = D.ui.answer; }
        ul.appendChild(h('li', null, [h('button', {
          type: 'button', class: cls, disabled: answered,
          'data-act': 'pick', 'data-check': key, 'data-key': o.key, 'data-fk': key + '-' + o.key
        }, [
          h('span', { class: 'cp-option__key', text: o.key }),
          h('span', { text: o.text }),
          h('span', { class: 'cp-option__tag', text: tag })
        ])]));
      });
      card.appendChild(ul);
      if (answered) {
        var fb = h('div', { class: 'cp-feedback ' + (picked.ok ? 'is-right' : 'is-wrong'), tabindex: '-1', 'data-fk': key + '-fb' });
        var p = h('p', null, [h('b', { class: 'cp-feedback__lead', text: picked.ok ? D.ui.correct : D.ui.notQuite }), picked.fb]);
        if (!picked.ok) p.appendChild(h('button', { type: 'button', class: 'cp-retry', 'data-act': 'retry', 'data-check': key, 'data-fk': key + '-retry' }, [D.ui.tryAgain]));
        fb.appendChild(p);
        var dk = key + '-why';
        fb.appendChild(h('details', { class: 'cp-why', 'data-dk': dk, open: !!st0.details[dk] }, [
          h('summary', { text: picked.ok ? D.ui.whyOthers : D.ui.whatOthers }),
          h('ul', null, k.options.filter(function (o) { return o.key !== pick; }).map(function (o) {
            return h('li', null, [h('b', { text: o.key }), o.fb]);
          }))
        ]));
        card.appendChild(fb);
      }
      return card;
    }

    function goButton(next) {
      return h('button', { type: 'button', class: 'cp-reveal ws-go', 'data-act': 'next', 'data-fk': 'next' }, [
        h('span', null, withImage(next.label, next.img)), h('span', { 'aria-hidden': 'true', text: '→' })
      ]);
    }

    /* ---------- one state panel ---------- */
    function panel(st0, n, o) {
      var s = D.states[n - 1];
      var answered = s.check && st0.done[s.check];
      var left = h('div', { class: 'ws-left' }, [table(st0, n, o)]);
      var right = h('div', { class: 'ws-right' });
      if (s.check) right.appendChild(checkCard(st0, s.check));
      if (s.summary) right.appendChild(h('p', { class: 'ws-summary', text: s.summary }));
      // the next step comes after the check in the DOM, so forward Tab from the feedback reaches it at
      // every width (review P-01); in two columns CSS places it in the left column, under the table
      var cols = h('div', { class: 'ws-cols' }, [left, right]);
      if (s.next && answered) cols.appendChild(h('div', { class: 'ws-gowrap' }, [goButton(s.next)]));
      var out = [h('p', { class: 'ws-lead', text: s.lead }), cols];
      // last state: a visible way on, at the foot of the reserved frame (review P-02 c)
      if (s.exit) out.push(h('p', { class: 'ws-exit' }, [h('a', { href: s.exit.href, 'data-fk': 'exit' }, [s.exit.label])]));
      return out;
    }

    /* ---------- chrome ---------- */
    var root = h('div', { class: 'ws' });
    var bar = h('div', { class: 'ws__bar' }, [
      h('span', { class: 'ws__lamp', 'aria-hidden': 'true' }),
      h('span', { class: 'cp-label', text: D.widgetNo }),
      h('span', { class: 'cp-label', 'aria-hidden': 'true', text: '·' }),
      h('span', { class: 'cp-label', text: D.title })
    ]);
    var live = h('p', { class: 'ws-sr', 'aria-live': 'polite' });
    var headSlot = h('div');
    var headWrap = h('div', { class: 'ws__headwrap' }, [headSlot]);   // holds the tallest state header, so a shorter name never moves the page
    var stagesSlot = h('div', { class: 'ws__states' });
    root.appendChild(bar); root.appendChild(headWrap); root.appendChild(stagesSlot); root.appendChild(live);
    el.textContent = '';
    el.appendChild(root);

    function headEl(n) {
      var s = D.states[n - 1];
      var pips = [];
      for (var i = 1; i <= TOTAL; i++) pips.push(h('span', { class: 'ws__pip' + (i < n ? ' is-done' : i === n ? ' is-on' : '') }));
      return h('div', { class: 'ws__head' }, [
        h('h3', { class: 'ws__name', tabindex: '-1', 'data-fk': 'name', text: fmt(D.ui.stateOf, { n: n, total: TOTAL }) + ' · ' + s.name }),
        h('span', { class: 'ws__pips', 'aria-hidden': 'true' }, pips),
        h('button', { type: 'button', class: 'ws__restart', 'data-act': 'restart', 'data-fk': 'restart' }, [D.ui.startOver])
      ]);
    }

    function focusables(key) {
      return Array.prototype.filter.call(root.querySelectorAll('[data-fk="' + key + '"]'), function (n) {
        return !n.disabled && n.offsetParent !== null && !n.closest('[inert]');
      });
    }

    function render() {
      var active = document.activeElement;
      var keep = active && root.contains(active) ? active.getAttribute('data-fk') : null;
      var o = S.anim || {};
      headSlot.replaceWith(headSlot = headEl(S.state));
      stagesSlot.textContent = '';
      for (var n = 1; n <= TOTAL; n++) {
        var on = n === S.state;
        stagesSlot.appendChild(h('section', {
          class: 'ws-panel' + (on ? ' is-on' : '') + (on && o.entering === n && !reduced ? ' is-entering' : ''),
          'data-state': String(n), inert: !on, 'aria-hidden': on ? null : 'true'
        }, panel(S, n, on ? o : {})));
      }
      var target = S.focus || keep;
      var toHead = S.focus === 'name';
      S.focus = null;
      if (target) {
        var f = focusables(target)[0];
        if (f) f.focus({ preventScroll: true });
      }
      // phones: a new state starts with its header at the top of the viewport (Ch 1 review P-03)
      if (toHead && narrow && headSlot.scrollIntoView) headSlot.scrollIntoView({ block: 'start' });
      S.anim = null;
    }

    /* Reserve the tallest state: render each state in each of its answered forms off-stage (same
       grid cell, invisible, inert), take the tallest, remove them. Disclosures stay closed. */
    function reserve() {
      headWrap.style.minHeight = '';
      if (narrow) { stagesSlot.style.minHeight = ''; return; }   // phones: no reservation (course rule)
      var hmax = 0;
      for (var n = 1; n <= TOTAL; n++) {
        var probe = headEl(n);
        probe.setAttribute('aria-hidden', 'true'); probe.inert = true;
        probe.style.visibility = 'hidden'; probe.style.position = 'absolute'; probe.style.left = '0'; probe.style.right = '0';
        headWrap.appendChild(probe);
        hmax = Math.max(hmax, probe.offsetHeight);
        headWrap.removeChild(probe);
      }
      headWrap.style.minHeight = hmax + 'px';
      stagesSlot.style.minHeight = '';
      var variants = [];
      D.states.forEach(function (s, i) {
        var keys = s.check ? D[s.check].options.map(function (o) { return o.key; }) : [null];
        keys.forEach(function (k) {
          var v = fresh();
          v.done = { k02: true, k03: true };
          if (s.check) v.pick[s.check] = k;
          variants.push({ n: i + 1, st: v });
        });
      });
      var max = 0;
      variants.forEach(function (v) {
        var sec = h('section', { class: 'ws-panel ws-panel--sizer', 'aria-hidden': 'true', inert: true }, panel(v.st, v.n, {}));
        stagesSlot.appendChild(sec);
        max = Math.max(max, sec.offsetHeight);
        stagesSlot.removeChild(sec);
      });
      stagesSlot.style.minHeight = max + 'px';
    }

    function say(msg) {
      live.textContent = '';
      setTimeout(function () { live.textContent = msg; }, 40);
    }

    function machineName(m) { return M.filter(function (x) { return x.id === m; })[0].column; }

    /* announce result cells: both together when they read the same */
    function resultsSay(n, ms) {
      if (!ms.length) return '';
      var s = D.states[n - 1];
      function detail(m) { return passes(n, m) ? '' : ', ' + D.result.fail; }
      function word(m) { return (passes(n, m) ? D.ui.pass : D.ui.fail).toUpperCase(); }
      var hy = ms.filter(function (m) { return isHypo(n, m); });
      ms = ms.filter(function (m) { return !isHypo(n, m); });
      var out;
      if (!ms.length) out = '';
      else if (ms.length === M.length && ms.every(function (m) { return passes(n, m) === passes(n, ms[0]); })) {
        out = fmt(D.ui.bothSay, { status: word(ms[0]), detail: detail(ms[0]) });
      } else {
        out = ms.map(function (m) { return fmt(D.ui.resultSay, { machine: machineName(m), status: word(m), detail: detail(m) }); }).join(' ');
      }
      ms.forEach(function (m) { if (s.tags && s.tags[m]) out += ' ' + machineName(m) + ': ' + s.tags[m] + '.'; });
      hy.forEach(function (m) { out += ' ' + machineName(m) + ': ' + (s.tags && s.tags[m] ? s.tags[m] : '') + '.'; });
      return out.trim();
    }

    function stateSay(n) {
      var s = D.states[n - 1];
      var parts = [fmt(D.ui.stateSay, { n: n, total: TOTAL, name: s.name }), s.lead];
      var a = M[0].id, b = M[1].id;
      rowsIn(n).forEach(function (x) {
        var r = D.rows[x.id];
        var mk = markerWord(marker(x.id, n)).toUpperCase();
        if (isNewRow(x.id, n)) {
          parts.push(fmt(D.ui.newRowSay, { band: x.band.label, label: r.label, a: val(x.id, n, a), b: val(x.id, n, b), m1: M[0].column, m2: M[1].column, marker: mk, note: r.note || '' }));
        } else if (n === 1 ? marker(x.id, n) === 'different' : (changed(x.id, n, a) || changed(x.id, n, b))) {
          parts.push(val(x.id, n, a) === val(x.id, n, b)
            ? fmt(D.ui.rowBothSay, { label: r.label, value: val(x.id, n, a) })
            : fmt(D.ui.rowEachSay, { label: r.label, a: val(x.id, n, a), b: val(x.id, n, b), m1: M[0].column, m2: M[1].column, marker: mk }));
        }
      });
      var open = M.filter(function (m) { return shown(S, n, m.id); }).map(function (m) { return m.id; });
      var closed = M.filter(function (m) { return !shown(S, n, m.id); });
      if (open.length) parts.push(resultsSay(n, open));
      closed.forEach(function (m) { parts.push(fmt(D.ui.notRunSay, { machine: m.column })); });
      if (s.summary) parts.push(s.summary);
      return parts.join(' ');
    }

    function act(name, b) {
      var key = b.getAttribute('data-key'), ck = b.getAttribute('data-check');
      var n = S.state;
      switch (name) {
        case 'pick': {
          var before = M.filter(function (m) { return shown(S, n, m.id); }).map(function (m) { return m.id; });
          S.pick[ck] = key; S.done[ck] = true; S.focus = ck + '-fb';
          var newly = M.map(function (m) { return m.id; }).filter(function (m) { return before.indexOf(m) < 0 && shown(S, n, m); });
          S.anim = { flash: newly.map(function (m) { return 'result:' + m; }) };
          render();
          var o = D[ck].options.filter(function (x) { return x.key === key; })[0];
          say((newly.length ? resultsSay(n, newly) + ' ' : '') + (o.ok ? D.ui.correct : D.ui.notQuite) + '. ' + o.fb);
          break;
        }
        case 'retry': S.pick[ck] = null; S.focus = ck + '-A'; render(); break;
        case 'next': {
          var next = n + 1;
          var flash = [];
          rowsIn(next).forEach(function (x) { M.forEach(function (m) { if (changed(x.id, next, m.id)) flash.push(x.id + ':' + m.id); }); });
          S.state = next;
          M.forEach(function (m) { if (shown(S, next, m.id)) flash.push('result:' + m.id); });
          S.anim = { entering: next, flash: flash };
          S.focus = 'name';
          render();
          say(stateSay(next));
          break;
        }
        case 'restart': S = fresh(); S.focus = 'name'; render(); say(D.ui.startedOver); break;
      }
    }

    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]');
      if (!b || !root.contains(b) || b.disabled) return;
      act(b.getAttribute('data-act'), b);
    });
    // <details> state survives re-renders ('toggle' doesn't bubble, so listen in the capture phase)
    root.addEventListener('toggle', function (e) {
      var d = e.target;
      if (d && d.tagName === 'DETAILS' && d.getAttribute('data-dk')) S.details[d.getAttribute('data-dk')] = d.open;
    }, true);

    S = fresh();
    ctx.onResize(function (w) {
      var t = w >= 700, c = w < 860, nw = w < 600;
      var changedLayout = t !== two || nw !== narrow || c !== root.classList.contains('ws--compact');
      two = t; narrow = nw;
      root.classList.toggle('ws--two', t);
      root.classList.toggle('ws--compact', c);
      root.classList.toggle('ws--narrow', nw);
      if (changedLayout || !headSlot.firstChild) render();
      reserve();
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(reserve);
  });
})();
