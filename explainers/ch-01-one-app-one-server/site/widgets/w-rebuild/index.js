/* w-rebuild · W-01 Rebuild Sam's server (segment s-03; checks k-02, k-03, k-04).
   Four step-locked stages (plan blueprint B1, with a B4-style aligned comparison at the end):
     1 predict what is on Sam's server (k-02, multi-select, then reveal)
     2 rebuild it from Sam's six-step notes, then predict (k-03)
     3 run the launch checks; diagnose each FAIL (k-04)
     4 compare the two machines row by row
   All words and rows come from data.js. Check outcomes are computed from the model (which items
   the notes installed), not stored. Checks k-03/k-04 follow the page's check pattern
   (assets/page.js): commit, then reveal; CORRECT / NOT QUITE; TRY AGAIN on a wrong pick; the
   other options' feedback in a "why" disclosure.

   Height: the four stage panels sit stacked in one grid cell and only the current one is visible,
   so the widget is always as tall as its tallest stage and a stage change never moves the page. */
(function () {
  'use strict';

  Didactician.widget('w-rebuild', function (el, ctx) {
    var D = window.DidacticianData && window.DidacticianData['w-rebuild'];
    if (!D) throw new Error('w-rebuild: data.js did not load');

    var ID = 'w-rebuild';
    var TOTAL = 4;
    var CHECK_GAP_MS = 300;
    var byId = {};
    D.items.forEach(function (it) { byId[it.id] = it; });
    var cards = D.cardOrder.map(function (id) { return byId[id]; });
    var steps = D.notes.steps;
    var diagByKey = {};
    D.diagnoses.forEach(function (d) { diagByKey[d.key] = d; });

    var reduced = ctx.reducedMotion;
    var narrow = null;
    var timers = [];
    var S;

    function fresh() {
      return {
        stage: 1,
        picked: {}, revealed: false,                 // stage 1 · k-02
        step: 0, hot: [], k03: null, k03done: false, // stage 2 · notes, k-03
        shown: 0, running: false,                    // stage 3 · checks
        diag: {}, diagnosed: {}, open: null,         // stage 3 · k-04
        details: {}, focus: null, anim: null
      };
    }

    /* ---------- model ---------- */
    function onNew(id) { var it = byId[id]; return it.step != null && it.step <= S.step; }
    function passes(c) { return c.needs.every(onNew); }
    function missingFor(c) { return c.needs.filter(function (n) { return !onNew(n); }); }
    function rightDiagnosis(c) {
      var kinds = [];
      missingFor(c).forEach(function (id) {
        var k = byId[id].kind || 'installed';
        if (kinds.indexOf(k) < 0) kinds.push(k);
      });
      return kinds.length === 1 ? kinds[0] : null;
    }
    function failing() { return D.checks.filter(function (c) { return !passes(c); }); }
    function visibleAt(stage) {
      return D.items.filter(function (it) { return !it.hiddenUntil || it.hiddenUntil <= stage; });
    }
    function pickedCount() { return cards.filter(function (it) { return S.picked[it.id]; }).length; }
    function allDiagnosed() { return failing().every(function (c) { return S.diagnosed[c.id]; }); }

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
    function pad2(n) { return (n < 10 ? '0' : '') + n; }
    function st(kind, word) {
      return h('span', { class: 'st st--' + kind }, [h('span', { class: 'lamp', 'aria-hidden': 'true' }), word]);
    }
    function sr(text) { return h('span', { class: 'wr-sr', text: text }); }
    function checkHead(chip, label, apply) {
      return h('div', { class: 'cp-check__head' }, [
        h('span', { class: 'cp-chip' + (apply ? ' cp-chip--apply' : ''), text: chip }),
        h('span', { class: 'cp-label', text: label })
      ]);
    }

    /* ---------- shared pieces ---------- */
    function disk(pct) {
      return h('div', { class: 'wr-disk' }, [
        h('span', { class: 'cp-label', text: D.disk.label }),
        h('span', { class: 'wr-disk__well', 'aria-hidden': 'true' }, [
          h('span', { class: 'wr-disk__fill', style: 'width:' + pct + '%' })
        ]),
        h('span', { class: 'wr-disk__val' }, [pad2(pct) + '%', sr(' ' + D.ui.diskUsed)])
      ]);
    }

    function row(it, o) {
      var tone = it.same ? 'c1' : it.unknown ? 'c6' : 'c2';
      var cls = 'wr-row wr-row--' + tone;
      if (o.hot && o.hot.indexOf(it.id) >= 0) cls += ' is-hot';
      if (o.fresh && o.fresh.indexOf(it.id) >= 0) cls += ' is-new';
      var side = null;
      if (o.tags && o.tags[it.id]) side = h('span', { class: 'wr-tag', text: D.k02.missedTag });
      else if (it.same) side = o.running ? st('good', D.ui.running) : h('span', { class: 'wr-meta', text: D.ui.notStarted });
      else if (o.steps && it.step) side = h('span', { class: 'wr-meta', text: fmt(D.ui.stepN, { n: it.step }) });
      return h('li', { class: cls, 'data-item': it.id }, [
        h('span', { class: 'wr-row__label', text: it.label }),
        side && h('span', { class: 'wr-row__side' }, [side]),
        o.without && h('span', { class: 'wr-row__without', text: D.ui.withoutIt + it.without })
      ]);
    }

    function machine(o) {
      var m = D.machines[o.who];
      var frame = h('div', { class: 'wr-m', role: 'group', 'aria-label': m.column });
      frame.appendChild(h('div', { class: 'wr-m__bar' }, [h('span', { class: 'cp-label', text: m.bar })]));
      var body = h('div', { class: 'wr-m__body' });
      if (o.note) body.appendChild(h('p', { class: 'wr-m__note', text: o.note }));
      var groups = [];
      o.items.forEach(function (it) {
        var g = groups[groups.length - 1];
        if (!g || g.cat !== it.cat) groups.push(g = { cat: it.cat, items: [] });
        g.items.push(it);
      });
      groups.forEach(function (g) {
        body.appendChild(h('div', { class: 'wr-m__group' }, [
          h('p', { class: 'wr-m__cat cp-label', text: g.cat }),
          h('ul', { class: 'wr-m__rows' }, g.items.map(function (it) { return row(it, o); }))
        ]));
      });
      frame.appendChild(body);
      if (o.disk != null) frame.appendChild(disk(o.disk));
      return frame;
    }

    function samCollapsed() {
      var m = D.machines.sam;
      return h('div', { class: 'wr-m wr-m--folded', role: 'group', 'aria-label': m.column }, [
        h('div', { class: 'wr-m__bar' }, [h('span', { class: 'cp-label', text: m.bar }), st('good', D.ui.running)]),
        h('p', { class: 'wr-m__note', text: D.notes.samHidden })
      ]);
    }

    /* o.fold (phones, once all six steps ran): the frame keeps its bar and RUNNING lamp; its rows
       sit in a disclosure so the check below them stays within reach. */
    function newMachine(o) {
      if (S.step === 0) {
        return h('div', { class: 'wr-m wr-m--ghost' }, [h('span', { class: 'cp-label', text: D.notes.noMachine })]);
      }
      var items = visibleAt(2).filter(function (it) { return onNew(it.id); });
      var running = S.step >= steps.length;
      var full = machine({
        who: 'new', items: items, running: running, steps: true,
        hot: o.hot, fresh: o.fresh, note: items.length ? null : D.notes.empty,
        disk: onNew('db') ? D.disk.new : null
      });
      if (!o.fold) return full;
      var m = D.machines.new;
      var dk = 'newm-' + o.fold;
      var more = h('details', { class: 'wr-all wr-m__more', 'data-dk': dk, open: !!S.details[dk] }, [
        h('summary', { text: fmt(D.notes.showInstalled, { n: pad2(items.length) }) })
      ]);
      Array.prototype.slice.call(full.childNodes, 1).forEach(function (n) { more.appendChild(n); });
      return h('div', { class: 'wr-m wr-m--folded', role: 'group', 'aria-label': m.column }, [
        h('div', { class: 'wr-m__bar' }, [h('span', { class: 'cp-label', text: m.bar }), running ? st('good', D.ui.running) : null]),
        more
      ]);
    }

    /* commit-then-reveal choice, same behaviour and classes as the page's checks */
    function choice(cfg) {
      var answered = cfg.pick != null;
      var picked = answered ? cfg.options.filter(function (o) { return o.key === cfg.pick; })[0] : null;
      var ul = h('ul', { class: 'cp-options' });
      cfg.options.forEach(function (o) {
        var cls = 'cp-option', tag = '';
        if (answered && o.key === cfg.pick) { cls += o.ok ? ' is-right' : ' is-wrong'; tag = o.ok ? D.ui.correct : D.ui.yourPick; }
        else if (answered && o.ok && !picked.ok) { cls += ' is-right'; tag = D.ui.answer; }
        var attrs = { type: 'button', class: cls, disabled: answered, 'data-fk': cfg.fk + '-' + o.key };
        Object.keys(cfg.act).forEach(function (k) { attrs[k] = cfg.act[k]; });
        attrs['data-key'] = o.key;
        ul.appendChild(h('li', null, [h('button', attrs, [
          h('span', { class: 'cp-option__key', text: o.key }),
          h('span', { text: o.text }),
          h('span', { class: 'cp-option__tag', text: tag })
        ])]));
      });
      var out = [ul];
      if (answered) {
        var fb = h('div', { class: 'cp-feedback ' + (picked.ok ? 'is-right' : 'is-wrong'), tabindex: '-1', 'data-fk': cfg.fk + '-fb' });
        var p = h('p', null, [h('b', { class: 'cp-feedback__lead', text: picked.ok ? D.ui.correct : D.ui.notQuite }), picked.fb]);
        if (!picked.ok) {
          var ra = { type: 'button', class: 'cp-retry', 'data-fk': cfg.fk + '-retry' };
          Object.keys(cfg.reset).forEach(function (k) { ra[k] = cfg.reset[k]; });
          p.appendChild(h('button', ra, [D.ui.tryAgain]));
        }
        fb.appendChild(p);
        var dk = cfg.fk + '-why';
        fb.appendChild(h('details', { class: 'cp-why', 'data-dk': dk, open: !!S.details[dk] }, [
          h('summary', { text: picked.ok ? D.ui.whyOthers : D.ui.whatOthers }),
          h('ul', null, cfg.options.filter(function (o) { return o.key !== cfg.pick; }).map(function (o) {
            return h('li', null, [h('b', { text: o.key }), o.fb]);
          }))
        ]));
        out.push(fb);
      }
      return out;
    }

    function intro(n) {
      var s = D.stages[n - 1];
      return h('div', { class: 'wr__intro' }, [
        h('h3', { class: 'wr__name cp-label', tabindex: '-1', 'data-fk': 'name' + n, text: s.name }),
        h('p', { class: 'wr__lead', text: n === 1 && S.revealed && s.leadAfter ? s.leadAfter : s.lead })
      ]);
    }

    function goButton(act, label, fk) {
      return h('button', { type: 'button', class: 'cp-reveal wr-go', 'data-act': act, 'data-fk': fk }, [
        h('span', { text: label }), h('span', { 'aria-hidden': 'true', text: '→' })
      ]);
    }

    /* ---------- stage 1 · what's on Sam's server (k-02) ---------- */
    function panel1() {
      var left = h('div', { class: 'wr__left' });
      // after the reveal, phones drop the question text (the feedback stands on its own) to keep
      // the machine's rows close
      var card = h('div', { class: 'wr-check', role: 'group', 'aria-labelledby': ID + '-k02q' }, [
        checkHead(D.ui.predict, D.k02.label),
        h('p', { class: 'wr-q' + (S.revealed && narrow ? ' wr-sr' : ''), id: ID + '-k02q', text: D.k02.prompt })
      ]);
      if (!S.revealed) {
        card.appendChild(h('ul', { class: 'wr-cards' }, cards.map(function (it) {
          var on = !!S.picked[it.id];
          return h('li', null, [h('button', {
            type: 'button', class: 'wr-card', 'aria-pressed': on ? 'true' : 'false',
            'data-act': 'pick', 'data-id': it.id, 'data-fk': 'card-' + it.id
          }, [
            h('span', { class: 'wr-card__box', 'aria-hidden': 'true' }),
            h('span', { class: 'wr-card__text', text: it.card }),
            h('span', { class: 'wr-card__tag', 'aria-hidden': 'true', text: on ? D.ui.picked : '' })
          ])]);
        })));
        var n = pickedCount();
        card.appendChild(h('div', { class: 'wr-row-actions' }, [
          h('button', { type: 'button', class: 'cp-reveal', 'data-act': 'reveal', 'data-fk': 'reveal', disabled: n === 0 }, [D.k02.reveal]),
          h('span', { class: 'wr-meta', 'aria-hidden': 'true', text: fmt(D.ui.pickedOf, { n: pad2(n), total: pad2(cards.length) }) })
        ]));
      } else {
        var k = pickedCount();
        var fb = h('div', { class: 'cp-feedback wr-fb', tabindex: '-1', 'data-fk': 'k02fb' }, [
          h('p', null, [h('b', { text: D.ui.answer }), fmt(D.k02.picked, { n: k })])
        ]);
        if (k < cards.length) fb.appendChild(h('p', null, [h('b', { class: 'wr-tag', text: D.k02.missedTag }), D.k02.missedText]));
        card.appendChild(fb);
      }
      left.appendChild(card);
      // desktop: Next sits under the feedback; phones: after the machine, where the reader ends up
      if (S.revealed && !narrow) left.appendChild(h('div', { class: 'wr__go' }, [goButton('next', D.k02.next, 'next')]));

      var tags = {};
      if (S.revealed) cards.forEach(function (it) { if (!S.picked[it.id]) tags[it.id] = true; });
      var right = h('div', { class: 'wr__right' }, [machine({
        who: 'sam',
        items: S.revealed ? visibleAt(1) : [byId.code],
        running: true, tags: tags, without: S.revealed,
        disk: S.revealed ? D.disk.sam : null
      })]);

      return [intro(1), h('div', { class: 'wr__cols' }, [left, right]),
        S.revealed && narrow && h('div', { class: 'wr__foot' }, [goButton('next', D.k02.next, 'next')])];
    }

    /* ---------- stage 2 · rebuild from the notes (k-03) ---------- */
    function stepList() {
      return h('ol', { class: 'wr-steps' }, steps.map(function (s, i) {
        var done = i < S.step, next = i === S.step;
        return h('li', { class: 'wr-step' + (done ? ' is-done' : next ? ' is-next' : ''), 'aria-current': next ? 'step' : null }, [
          h('span', { class: 'wr-step__n', text: pad2(i + 1) }),
          h('span', { class: 'wr-step__text', text: s.text }),
          h('span', { class: 'wr-step__st' }, [done ? st('good', D.ui.done) : null])
        ]);
      }));
    }

    function notesPanel() {
      var box = h('div', { class: 'wr-notes' }, [h('p', { class: 'wr-notes__title cp-label', text: D.notes.title })]);
      var total = steps.length;
      if (S.step < total) {
        var run = h('button', { type: 'button', class: 'cp-reveal wr-run', 'data-act': 'step', 'data-fk': 'run' },
          [fmt(D.ui.runStep, { n: S.step + 1, total: total })]);
        if (narrow) {
          box.appendChild(h('div', { class: 'wr-stepcard' }, [
            h('p', { class: 'cp-label', text: fmt(D.ui.stepOf, { n: S.step + 1, total: total }) }),
            h('p', { class: 'wr-stepcard__text', text: steps[S.step].text }),
            run
          ]));
        } else {
          box.appendChild(stepList());
          box.appendChild(run);
        }
      } else {
        box.appendChild(h('p', { class: 'wr-notes__done' }, [st('good', fmt(D.ui.doneCount, { n: total, total: total })), ' ', D.notes.allRan]));
        box.appendChild(h('details', { class: 'wr-all', 'data-dk': 'notes-all-done', open: !!S.details['notes-all-done'] }, [
          h('summary', { text: D.notes.allNotes }), stepList()
        ]));
      }
      return box;
    }

    function panel2() {
      var left = h('div', { class: 'wr__left' }, [notesPanel()]);
      if (S.step >= steps.length) {
        var card = h('div', { class: 'wr-check', role: 'group', tabindex: '-1', 'data-fk': 'k03card', 'aria-labelledby': ID + '-k03q' }, [
          checkHead(D.ui.predict, D.k03.label),
          h('p', { class: 'wr-q', id: ID + '-k03q', text: D.k03.prompt })
        ]);
        choice({ fk: 'k03', options: D.k03.options, pick: S.k03, act: { 'data-act': 'k03' }, reset: { 'data-act': 'k03-reset' } })
          .forEach(function (n) { card.appendChild(n); });
        if (S.k03done) card.appendChild(h('div', { class: 'wr__go wr__go--in' }, [goButton('checks', D.k03.run, 'checks')]));
        left.appendChild(card);
      }
      var fresh = S.anim && S.anim.rows;
      var fold = narrow && S.step >= steps.length ? 's2' : null;
      // phones: the step card sits directly above the machine rows; the full list goes below them
      var allNotes = narrow && S.step < steps.length && h('details', { class: 'wr-all wr-all--solo', 'data-dk': 'notes-all', open: !!S.details['notes-all'] }, [
        h('summary', { text: D.notes.allNotes }), stepList()
      ]);
      var right = h('div', { class: 'wr__right' }, [newMachine({ hot: S.hot, fresh: fresh, fold: fold }), allNotes, samCollapsed()]);
      return [intro(2), h('div', { class: 'wr__cols wr__cols--even' }, [left, right])];
    }

    /* ---------- stage 3 · launch checks (k-04) ---------- */
    function checkStatus(c, i) {
      if (i < S.shown) return passes(c) ? st('good', D.ui.pass) : st('bad', D.ui.fail);
      if (i === S.shown && S.running) return h('span', { class: 'st wr-st--run' }, [h('span', { class: 'lamp', 'aria-hidden': 'true' }), D.checksText.running]);
      return h('span', { class: 'st wr-st--idle' }, [D.checksText.queued]);
    }

    function diagPanel(c) {
      var right = rightDiagnosis(c);
      var options = D.diagnoses.map(function (d) { return { key: d.key, text: d.text, ok: d.id === right, fb: c.fb[d.id] }; });
      var box = h('div', { class: 'wr-diag', id: ID + '-diag-' + c.id, role: 'group', 'aria-labelledby': ID + '-dq-' + c.id }, [
        checkHead(D.ui.apply, D.checksText.k04label, true),
        h('p', { class: 'wr-q', id: ID + '-dq-' + c.id, text: c.prompt })
      ]);
      choice({ fk: 'd-' + c.id, options: options, pick: S.diag[c.id] || null,
        act: { 'data-act': 'diag', 'data-check': c.id }, reset: { 'data-act': 'diag-reset', 'data-check': c.id } })
        .forEach(function (n) { box.appendChild(n); });
      return box;
    }

    function panel3() {
      var done = S.shown >= D.checks.length;
      var list = h('ol', { class: 'wr-checks', 'aria-label': D.checksText.label }, D.checks.map(function (c, i) {
        var shown = i < S.shown, fail = shown && !passes(c);
        var line = [
          h('span', { class: 'wr-chk__label' }, [c.label, fail && c.error ? h('span', { class: 'wr-chk__err', text: c.error }) : null]),
          h('span', { class: 'wr-chk__st' }, [checkStatus(c, i)])
        ];
        var li = h('li', { class: 'wr-chk' + (fail ? ' is-fail' : shown ? ' is-pass' : '') });
        if (fail && done) {
          // the FAIL row itself is the button (plan: "Each FAIL row is a button")
          var open = S.open === c.id;
          li.appendChild(h('button', {
            type: 'button', class: 'wr-chk__btn', 'data-act': 'diag-toggle', 'data-check': c.id, 'data-fk': 'dt-' + c.id,
            'aria-expanded': open ? 'true' : 'false', 'aria-controls': open ? ID + '-diag-' + c.id : null
          }, line.concat(h('span', { class: 'wr-chk__why' }, [
            open ? D.checksText.hide : S.diagnosed[c.id] ? D.checksText.again : D.checksText.diagnose
          ]))));
          if (open) li.appendChild(diagPanel(c));
        } else {
          li.appendChild(h('div', { class: 'wr-chk__line' }, line));
        }
        return li;
      }));
      var box = h('div', { class: 'wr-checkbox' }, [list]);
      if (done && allDiagnosed()) box.appendChild(h('div', { class: 'wr__go wr__go--in' }, [goButton('compare', D.checksText.compare, 'compare')]));
      var left = h('div', { class: 'wr__left' }, [box]);
      var right = h('div', { class: 'wr__right' }, [newMachine({ fold: narrow ? 's3' : null }), samCollapsed()]);
      return [intro(3), h('div', { class: 'wr__cols wr__cols--wide' }, [left, right])];
    }

    /* ---------- stage 4 · compare ---------- */
    function statusCell(it, who) {
      var cell = h('span', { class: 'wr-cmp__st', role: 'cell' });
      var has = who === 'sam' ? it.onSam : it.step != null;
      if (it.versions) cell.appendChild(h('span', { class: 'wr-ver', text: it.versions[who] }));
      else if (has) cell.appendChild(st('good', D.compare.present));
      else if (it.unknown) cell.appendChild(h('span', { class: 'wr-na', text: it.newLabel }));
      else { cell.classList.add('is-gone'); cell.appendChild(st('bad', D.compare.missing)); }
      if (it.disk && has) cell.appendChild(disk(D.disk[who]));
      return cell;
    }

    function panel4() {
      var t = h('div', { class: 'wr-cmp', role: 'table', 'aria-label': D.ui.compareLabel });
      t.appendChild(h('div', { class: 'wr-cmp__row wr-cmp__row--head', role: 'row' }, [
        h('span', { class: 'wr-cmp__item', role: 'columnheader' }, [sr(D.ui.colItem)]),
        h('span', { class: 'wr-cmp__col', role: 'columnheader' }, [h('span', { class: 'cp-label', text: D.machines.sam.column })]),
        h('span', { class: 'wr-cmp__col', role: 'columnheader' }, [h('span', { class: 'cp-label', text: D.machines.new.column })]),
        h('span', { class: 'wr-cmp__notehd', role: 'columnheader' }, [sr(D.ui.colNote)])
      ]));
      var items = visibleAt(4);
      items.forEach(function (it, i) {
        var first = i === 0 || items[i - 1].cat !== it.cat;
        var newHas = it.step != null;
        var tone = it.same ? 'c1' : it.unknown ? 'c6' : 'c2';
        var r = h('div', { class: 'wr-cmp__row' + (first ? ' is-first' : '') + (it.same ? ' is-same' : '') + (!newHas ? (it.unknown ? ' is-unknown' : ' is-missing') : ''), role: 'row' });
        // category shown once per group; repeats keep their column on desktop (hidden) and collapse on phones
        r.appendChild(h('span', { class: 'wr-cmp__item', role: 'rowheader' }, [
          h('span', { class: 'wr-cmp__cat cp-label' + (first ? '' : ' is-repeat'), 'aria-hidden': first ? null : 'true', text: it.cat }),
          h('span', { class: 'wr-row wr-row--' + tone }, [h('span', { class: 'wr-row__label', text: it.short || it.label })])
        ]));
        if (it.same) {
          r.appendChild(h('span', { class: 'wr-cmp__st wr-cmp__st--span', role: 'cell', 'aria-colspan': '2' }, [
            h('span', { class: 'wr-ident', text: D.compare.identical })
          ]));
        } else {
          r.appendChild(statusCell(it, 'sam'));
          r.appendChild(statusCell(it, 'new'));
        }
        var note = h('span', { class: 'wr-cmp__note', role: 'cell' });
        if (it.compareNote) note.appendChild(h('b', { class: 'wr-cmp__lead', text: it.compareNote }));
        else if (it.unknown) { note.appendChild(st('warn', D.compare.unknown)); note.appendChild(document.createTextNode(' ' + it.quote)); }
        else if (!newHas) {
          if (it.callout) note.appendChild(h('b', { class: 'wr-callout', text: it.callout }));
          note.appendChild(document.createTextNode((it.callout ? ' ' : '') + it.added + ' ' + D.compare.without + it.without + '.'));
        } else note.appendChild(h('span', { class: 'wr-meta', text: fmt(D.compare.inNotes, { n: it.step }) }));
        r.appendChild(note);
        t.appendChild(r);
      });
      return [intro(4), t, h('p', { class: 'wr-summary', text: D.compare.summary })];
    }

    /* ---------- render ---------- */
    var root = h('div', { class: 'wr' });
    var bar = h('div', { class: 'wr__bar' }, [
      h('span', { class: 'wr__lamp', 'aria-hidden': 'true' }),
      h('span', { class: 'cp-label', text: D.widgetNo }),
      h('span', { class: 'cp-label', text: D.title })
    ]);
    var live = h('p', { class: 'wr-sr', 'aria-live': 'polite' });
    var headSlot = h('div');
    var stagesSlot = h('div', { class: 'wr__stages' });
    root.appendChild(bar); root.appendChild(headSlot); root.appendChild(stagesSlot); root.appendChild(live);
    el.textContent = '';
    el.appendChild(root);

    function headEl() {
      return h('div', { class: 'wr__head' }, [
        h('span', { class: 'cp-label wr__count', text: fmt(D.ui.stageOf, { n: S.stage, total: TOTAL }) }),
        h('span', { class: 'wr__pips', 'aria-hidden': 'true' }, [1, 2, 3, 4].map(function (i) {
          return h('span', { class: 'wr__pip' + (i < S.stage ? ' is-done' : i === S.stage ? ' is-on' : '') });
        })),
        h('button', { type: 'button', class: 'wr__restart', 'data-act': 'restart', 'data-fk': 'restart' }, [D.ui.startOver])
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
      var stageChanged = S.anim && S.anim.stage;
      var flip = S.anim && S.anim.flip;

      headSlot.replaceWith(headSlot = headEl());
      var panels = [panel1, panel2, panel3, panel4].map(function (fn, i) {
        var on = i + 1 === S.stage;
        return h('section', {
          class: 'wr__panel' + (on ? ' is-on' : '') + (on && stageChanged && !reduced ? ' is-entering' : ''),
          'data-stage': String(i + 1), 'aria-labelledby': null, inert: !on, 'aria-hidden': on ? null : 'true'
        }, fn());
      });
      stagesSlot.textContent = '';
      panels.forEach(function (p) { stagesSlot.appendChild(p); });

      var target = S.focus || keep;
      var scroll = !!S.focus && /^name/.test(S.focus);
      S.focus = null;
      if (target) {
        var f = focusables(target)[0];
        // phones: a new stage starts with its header at the top of the viewport (review P-03)
        if (f) f.focus({ preventScroll: !scroll || narrow });
      }
      if (scroll && narrow && headSlot.scrollIntoView) headSlot.scrollIntoView({ block: 'start' });

      if (flip && !reduced && root.animate) {
        var rows = panels[0].querySelectorAll('[data-item]');
        var j = 0;
        Array.prototype.forEach.call(rows, function (r) {
          var a = flip[r.getAttribute('data-item')];
          if (!a || !r.animate) return;
          var b = r.getBoundingClientRect();
          r.animate([
            { transform: 'translate(' + (a.left - b.left) + 'px,' + (a.top - b.top) + 'px)', opacity: 0.3 },
            { transform: 'none', opacity: 1 }
          ], { duration: 420, delay: 40 * j++, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' });
        });
      }
      S.anim = null;
      holdHeight();
    }

    /* The stacked panels already give the tallest stage's height. On top of that the widget never
       shrinks during a visit at one width (e.g. leaving stage 3 with a diagnosis open), so nothing
       below it moves when the stage changes. Reset when the width changes or fonts arrive. */
    var minH = 0;
    function holdHeight() {
      var hNow = stagesSlot.offsetHeight;
      if (hNow > minH) minH = hNow;
      stagesSlot.style.minHeight = minH + 'px';
    }
    function resetHeight() { minH = 0; stagesSlot.style.minHeight = ''; }

    function say(msg) {
      live.textContent = '';
      setTimeout(function () { live.textContent = msg; }, 40);
    }

    function goStage(n) {
      S.stage = n;
      S.anim = { stage: true };
      S.focus = 'name' + n;
    }

    function stageSay(n, extra) {
      return fmt(D.ui.stageSay, { n: n, total: TOTAL, name: D.stages[n - 1].name }) + ' ' + D.stages[n - 1].lead + (extra ? ' ' + extra : '');
    }

    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    function startChecks() {
      clearTimers();
      var n = D.checks.length;
      var fails = failing().length;
      var summary = fmt(D.checksText.done, { pass: n - fails, fail: fails });
      if (reduced) {
        S.shown = n; S.running = false;
        say(D.checks.map(function (c) { return c.label + ': ' + (passes(c) ? D.ui.pass : D.ui.fail) + '.'; }).join(' ') + ' ' + summary);
        return;
      }
      S.shown = 0; S.running = true;
      D.checks.forEach(function (c, i) {
        timers.push(setTimeout(function () {
          S.shown = i + 1;
          if (i === n - 1) S.running = false;
          render();
          say(c.label + ': ' + (passes(c) ? D.ui.pass : D.ui.fail) + '.' + (i === n - 1 ? ' ' + summary : ''));
        }, (i + 1) * CHECK_GAP_MS));
      });
    }

    function act(name, b) {
      var id = b.getAttribute('data-id'), key = b.getAttribute('data-key'), cid = b.getAttribute('data-check');
      var c = cid && D.checks.filter(function (x) { return x.id === cid; })[0];
      switch (name) {
        case 'pick': {
          S.picked[id] = !S.picked[id];
          S.focus = 'card-' + id;
          render();
          say(fmt(S.picked[id] ? D.ui.pickSay : D.ui.unpickSay, { card: byId[id].card, n: pickedCount(), total: cards.length }));
          break;
        }
        case 'reveal': {
          var rects = {};
          Array.prototype.forEach.call(root.querySelectorAll('.wr__panel.is-on .wr-card'), function (cb) {
            rects[cb.getAttribute('data-id')] = cb.getBoundingClientRect();
          });
          S.revealed = true;
          S.anim = { flip: rects };
          S.focus = 'k02fb';
          render();
          var missed = cards.filter(function (it) { return !S.picked[it.id]; }).map(function (it) { return it.card; });
          say(fmt(D.k02.picked, { n: pickedCount() }) + (missed.length ? ' ' + fmt(D.ui.missedSay, { list: missed.join(', ') }) : ''));
          break;
        }
        case 'next': goStage(2); render(); say(stageSay(2)); break;
        case 'step': {
          var s = steps[S.step];
          S.step += 1;
          S.hot = s.start ? ['code'] : s.adds.slice();
          S.anim = { rows: S.hot.slice() };
          var last = S.step >= steps.length;
          S.focus = last ? 'k03card' : 'run';
          render();
          say(fmt(D.ui.stepSay, { n: S.step, total: steps.length, said: s.said }) + (last ? ' ' + D.notes.allRan : ''));
          break;
        }
        case 'k03': {
          S.k03 = key; S.k03done = true; S.focus = 'k03-fb';
          render();
          var o = D.k03.options.filter(function (x) { return x.key === key; })[0];
          say((o.ok ? D.ui.correct : D.ui.notQuite) + '. ' + o.fb);
          break;
        }
        case 'k03-reset': S.k03 = null; S.focus = 'k03-A'; render(); break;
        case 'checks': {
          goStage(3);
          S.hot = [];
          startChecks();
          render();
          if (!reduced) say(stageSay(3));
          break;
        }
        case 'diag-toggle': S.open = S.open === cid ? null : cid; S.focus = 'dt-' + cid; render(); break;
        case 'diag': {
          S.diag[cid] = key; S.diagnosed[cid] = true; S.focus = 'd-' + cid + '-fb';
          render();
          var d = diagByKey[key], ok = d.id === rightDiagnosis(c);
          say(c.short + ': ' + (ok ? D.ui.correct : D.ui.notQuite) + '. ' + c.fb[d.id] + (allDiagnosed() ? ' ' + D.ui.compareReady : ''));
          break;
        }
        case 'diag-reset': delete S.diag[cid]; S.focus = 'd-' + cid + '-A'; render(); break;
        case 'compare': goStage(4); render(); say(stageSay(4, D.compare.summary)); break;
        case 'restart': clearTimers(); S = fresh(); S.focus = 'name1'; render(); say(D.ui.startedOver); break;
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
      var n = w < 600;
      resetHeight();
      if (n === narrow) { holdHeight(); return; }
      narrow = n;
      root.classList.toggle('wr--narrow', n);
      render();
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { resetHeight(); holdHeight(); });
  });
})();
