/* Ch 02 page script: f-01 registry and machine frames, comprehension checks. Classic script.
   Adapted from Ch 01's page.js (same check behaviour). */
(function () {
  'use strict';

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------- f-01 · One image, many containers ----------
     Reusable data structure (plan f-01 reuse note): Ch 3's placement widget can copy the arrays,
     the two renderers below and the .cp-machine / .cp-ctr / .cp-img CSS in page.css, then add a
     chip size. Fields: registry chips { image, current, label? }; machines { name, containers:
     [{ image, label? }], settings, settingsNote?, note? }. All Fennel story (fiction, d-04). */
  var CH02_REGISTRY = [
    { image: 'fennel-app:v43', current: true, label: 'image: the package; never changes once built' },
    { image: 'fennel-app:v42' },
    { image: 'fennel-app:v41' }
  ];
  var CH02_MACHINES = [
    { name: 'Riley’s laptop', containers: [{ image: 'fennel-app:v43', label: 'container: the image, running' }], settings: 'test' },
    { name: 'Staging', containers: [{ image: 'fennel-app:v43' }], settings: 'staging' },
    { name: 'Production', containers: [{ image: 'fennel-app:v43' }, { image: 'fennel-app:v43' }], note: 'two containers, one image', settings: 'production', settingsNote: 'handed in at start' }
  ];

  function chip(cls, image, running, label) {
    var c = el('span', cls);
    c.appendChild(document.createTextNode(image));
    if (running) {
      var st = el('span', 'st st--good');
      var lamp = el('span', 'lamp'); lamp.setAttribute('aria-hidden', 'true');
      st.appendChild(lamp);
      st.appendChild(document.createTextNode('RUNNING'));
      c.appendChild(st);
    }
    if (!label) return c;
    var w = el('span', 'cp-chipwrap');
    w.appendChild(c);
    w.appendChild(el('span', 'cp-ann', '↑ ' + label));
    return w;
  }

  function renderRegistry(box, list) {
    list.forEach(function (r) {
      box.appendChild(chip('cp-img' + (r.current ? '' : ' is-old'), r.image, false, r.label));
    });
  }

  function renderMachine(m) {
    var f = el('div', 'cp-machine');
    var bar = el('div', 'cp-machine__bar');
    bar.appendChild(el('span', 'cp-label', 'Machine · ' + m.name));
    f.appendChild(bar);
    var body = el('div', 'cp-machine__body');
    var chips = el('div', 'cp-chips');
    m.containers.forEach(function (c) { chips.appendChild(chip('cp-ctr', c.image, true, c.label)); });
    body.appendChild(chips);
    if (m.note) body.appendChild(el('span', 'cp-ann', '↑ ' + m.note));
    var row = el('div', 'mrow mrow--c2');
    row.appendChild(el('span', null, 'settings: ' + m.settings));
    if (m.settingsNote) row.appendChild(el('span', 'mrow__tag', m.settingsNote));
    body.appendChild(row);
    f.appendChild(body);
    return f;
  }

  function pullArrow() {
    var a = el('div', 'flow__arrow');
    a.setAttribute('aria-hidden', 'true');
    a.appendChild(el('span', null, 'pull'));
    a.appendChild(el('span', 'flow__glyph', '→'));
    return a;
  }

  var reg = document.querySelector('[data-registry="ch02"]');
  if (reg) renderRegistry(reg, CH02_REGISTRY);
  var machines = document.querySelector('[data-machines="ch02"]');
  if (machines) {
    CH02_MACHINES.forEach(function (m) {
      var row = el('div', 'flow__row');
      row.appendChild(pullArrow());
      row.appendChild(renderMachine(m));
      machines.appendChild(row);
    });
  }

  /* ---------- comprehension checks: commit, then reveal; feedback explains every option ----------
     Same behaviour as Ch 01. Addition: data-after on the card adds one closing line to every
     outcome (k-01's "A year on…" line), shown once, not repeated in the disclosure. */
  function setupChoice(card) {
    var opts = Array.prototype.slice.call(card.querySelectorAll('.cp-option'));
    var fb = card.querySelector('.cp-feedback');
    var after = card.getAttribute('data-after');
    fb.setAttribute('tabindex', '-1');  /* focus moves here after a pick (P-04), as in the widget's checks */
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
        p.appendChild(document.createTextNode(btn.getAttribute('data-fb')));
        if (!ok) {
          var retry = el('button', 'cp-retry', 'TRY AGAIN');
          retry.type = 'button';
          retry.addEventListener('click', reset);
          p.appendChild(retry);
        }
        fb.appendChild(p);
        if (after) fb.appendChild(el('p', null, after));
        var others = opts.filter(function (b) { return b !== btn; });
        var det = el('details', 'cp-why');
        det.appendChild(el('summary', null, ok ? 'Why the other answers miss' : 'What the other answers say'));
        var ul = el('ul');
        others.forEach(function (b) {
          var li = el('li');
          li.appendChild(el('b', null, keyOf(b)));
          li.appendChild(document.createTextNode(b.getAttribute('data-fb')));
          ul.appendChild(li);
        });
        det.appendChild(ul);
        fb.appendChild(det);
        fb.hidden = false;
        fb.focus({ preventScroll: true });
      });
    });
  }

  document.querySelectorAll('.cp-check[data-check]').forEach(setupChoice);
})();
