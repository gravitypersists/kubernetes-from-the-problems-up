/* Ch 01 page script: f-01 timeline rows, f-02 arrows, comprehension checks. Classic script. */
(function () {
  'use strict';

  /* ---------- f-01 · Fennel's Friday outage ----------
     Reusable data structure: later chapters (Sam's 3 a.m. page, a postmortem timeline) can copy the
     array, the renderer below and the .tl CSS in page.css. Fields: time (display string), event,
     who (shown in the WHO column; "Sam" is emphasised), status ("up" | "down"; consecutive "down"
     rows form the NO ORDERS band). All Fennel story; only the database behaviour is sourced (c-03). */
  var CH01_OUTAGE_TIMELINE = [
    { time: 'for months', event: 'Log files grow a little every day. Nobody set them to be cleaned up.', who: 'nobody', status: 'up' },
    { time: '18:05', event: 'The dinner rush starts, the busiest hour of the week.', who: 'customers', status: 'up' },
    { time: '18:12', event: 'The disk hits 100%. The database can’t record new orders, so checkout shows an error.', who: 'the server', status: 'down' },
    { time: '18:20', event: 'The first customer emails reach Jordan.', who: 'Jordan', status: 'down' },
    { time: '18:35', event: 'Sam is at dinner across town. The phone finally gets through.', who: 'Sam', status: 'down' },
    { time: '19:05', event: 'Sam is home and logged in to the server. The site is still down.', who: 'Sam', status: 'down' },
    { time: '19:40', event: 'Sam finds the cause: months of log files.', who: 'Sam', status: 'down' },
    { time: '19:55', event: 'Sam deletes old logs and restarts the app.', who: 'Sam', status: 'down' },
    { time: '20:10', event: 'Orders go through again.', who: 'Sam', status: 'up' },
    { time: '23:00', event: 'Sam sets up a nightly job that deletes old logs, “so this never happens again”. It’s done by hand and never written down.', who: 'Sam', status: 'up' }
  ];
  var BAND_LABEL = 'NO ORDERS';

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function renderTimeline(list, rows) {
    var head = el('li', 'tl__row tl__head');
    head.setAttribute('aria-hidden', 'true');
    head.appendChild(el('span', 'tl__band'));
    head.appendChild(el('span', 'tl__time', 'Time'));
    head.appendChild(el('span', 'tl__event', 'What happens'));
    head.appendChild(el('span', 'tl__who', 'Who'));
    list.appendChild(head);
    rows.forEach(function (r, i) {
      var down = r.status === 'down';
      var li = el('li', 'tl__row' + (down ? ' is-down' : ''));
      var band = el('span', 'tl__band');
      if (down && (i === 0 || rows[i - 1].status !== 'down')) band.appendChild(el('span', 'tl__bandlabel', BAND_LABEL));
      li.appendChild(band);
      var t = el('span', 'tl__time');
      t.appendChild(el('b', null, r.time));
      var st = el('span', 'st ' + (down ? 'st--bad' : 'st--good'));
      var lamp = el('span', 'lamp'); lamp.setAttribute('aria-hidden', 'true');
      st.appendChild(lamp);
      st.appendChild(document.createTextNode(down ? 'DOWN' : 'UP'));
      t.appendChild(st);
      li.appendChild(t);
      li.appendChild(el('span', 'tl__event', r.event));
      var who = el('span', 'tl__who' + (r.who === 'Sam' ? ' is-sam' : ''));
      var sr = el('span', null, 'Who: '); sr.style.position = 'absolute'; sr.style.width = '1px'; sr.style.height = '1px'; sr.style.overflow = 'hidden'; sr.style.clip = 'rect(0 0 0 0)';
      who.appendChild(sr);
      who.appendChild(document.createTextNode(r.who));
      li.appendChild(who);
      list.appendChild(li);
    });
  }

  var tl = document.querySelector('[data-timeline="ch01-friday"]');
  if (tl) renderTimeline(tl, CH01_OUTAGE_TIMELINE);

  /* ---------- f-02 arrows (kit arrow.js: heads end on target, never clipped) ---------- */
  if (window.Didactician && Didactician.arrow) {
    document.querySelectorAll('.f-02-arrows').forEach(function (g) {
      var svg = g.ownerSVGElement;
      JSON.parse(g.getAttribute('data-arrows')).forEach(function (a) {
        Didactician.arrow(svg, { x: a[0], y: a[1] }, { x: a[2], y: a[3] }, { color: 'var(--ink)', width: 1.5, gap: 2, parent: g });
      });
    });
  }

  /* ---------- comprehension checks: commit, then reveal; feedback explains every option ---------- */
  function setupChoice(card) {
    var opts = Array.prototype.slice.call(card.querySelectorAll('.cp-option'));
    var fb = card.querySelector('.cp-feedback');
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
        var lead = el('b', 'cp-feedback__lead', ok ? 'CORRECT' : 'NOT QUITE');
        p.appendChild(lead);
        p.appendChild(document.createTextNode(btn.getAttribute('data-fb')));
        if (!ok) {
          var retry = el('button', 'cp-retry', 'TRY AGAIN');
          retry.type = 'button';
          retry.addEventListener('click', reset);
          p.appendChild(retry);
        }
        fb.appendChild(p);
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
    });
  }

  document.querySelectorAll('.cp-check[data-check]').forEach(function (card) {
    if (card.hasAttribute('data-reveal')) setupReveal(card); else setupChoice(card);
  });
})();
