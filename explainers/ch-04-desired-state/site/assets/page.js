/* Ch 04 page script. Classic script; load after assets/arrow.js.
   1. Comprehension checks, copied from Ch 03's page.js (commit 5141855) so checks behave the same in
      every chapter: commit, then reveal; feedback explains every option.
      Every commit dispatches a bubbling CustomEvent from the check card,
        'didactician:check-commit'  detail { id: 'k-03', option: 'C', correct: true }
      and stamps the card with data-committed="<option key>" (kept after TRY AGAIN). The §04/§05 lane
      controller (widgets/w-cluster-scrolly/) listens for it on document to unlock gated steps, and reads
      [data-committed] at init in case a commit happened before it loaded. A think-then-reveal card
      dispatches the same event with option 'reveal'.
   2. f-04: the loop lens table, built from CH04_LOOPS.
   3. f-05: the cluster sketch's connectors (kit arrow.js). */
(function () {
  'use strict';

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function commit(card, option, correct) {
    var id = card.getAttribute('data-check');
    card.setAttribute('data-committed', option);
    card.dispatchEvent(new CustomEvent('didactician:check-commit', {
      bubbles: true,
      detail: { id: id, option: option, correct: correct }
    }));
  }

  /* data-after on the card adds one closing line to every outcome (k-01's "At Fennel, that someone
     is Sam."), shown once, not repeated in the "why" disclosure. */
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
})();

/* ---- f-04 · the loop lens table ----------------------------------------------------------------
   CH04_LOOPS is the course's loop lens (plan R12): one row per loop, in the order they acted at 03:04.
   Later chapters copy this array forward and add rows (Ch 5 scheduler detail, Ch 6 the Deployment loop,
   Ch 7 the connecting loop filled in, Ch 8 the two autoscalers, …). Row fields:
     loop      the loop's name, as the lanes name it
     per       optional: a short qualifier under the name ("one per node")
     watching  what it compares, in the record or the cluster
     doing     what it does when the two differ
     job       the job of Sam's (Ch 03's words) that it took over
     chapter   optional: the chapter that covers this loop; a row with it is drawn dashed (met later) */
var CH04_LOOPS = [
  { loop: 'node loop', watching: 'every node’s regular check-ins',
    doing: 'marks a silent node unknown; after a wait, marks its Pods for deletion',
    job: 'noticing a dead machine' },
  { loop: 'ReplicaSet loop', watching: 'Pods wanted vs. Pods in the record, per ReplicaSet',
    doing: 'writes new Pod records, or removes extras', job: 'replacing' },
  { loop: 'scheduler', watching: 'Pods with no node',
    doing: 'picks a node with room for each (Chapter 5)', job: 'placing' },
  { loop: 'node agent', per: 'one per node', watching: 'Pods assigned to its node',
    doing: 'downloads the image, starts the containers, restarts any that crash, reports back',
    job: 'restarting' },
  { loop: 'another loop', per: 'Chapter 7', watching: 'where each service’s Pods are running',
    doing: 'keeps callers’ routes current', job: 'connecting', chapter: 7 }
];

(function () {
  'use strict';
  var body = document.querySelector('[data-loop-lens]');
  if (!body) return;
  var labels = (body.closest('table').getAttribute('data-labels') || '').split('|');
  body.textContent = '';
  CH04_LOOPS.forEach(function (r) {
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
    tr.appendChild(th);
    [r.watching, r.doing, r.job].forEach(function (text, i) {
      var td = document.createElement('td');
      if (labels[i]) td.setAttribute('data-label', labels[i]);
      if (i === 2) td.className = 'lens__job';
      td.textContent = text;
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });
})();

/* ---- f-05 · connectors -------------------------------------------------------------------------
   Draws each two-headed connector of Fig. 05 into its overlay <svg>, with the kit's arrow.js, from the
   parts' measured positions. Every connector ends on the API server bar ([data-k="api"]); none joins two
   loops (m-03). Loops above the bar connect down to its top edge; node agents connect up to its bottom
   edge; Ari connects to its right end (wide plates) or down to its top edge (narrow plates). Redrawn on
   resize and once the fonts have loaded. Without JS the parts still read; only the connectors are missing. */
(function () {
  'use strict';
  var fig = document.querySelector('[data-cluster-sketch]');
  if (!fig || !window.Didactician || !Didactician.arrow) return;
  var svg = fig.querySelector('.cl__wires');

  function draw() {
    var box = fig.getBoundingClientRect();
    if (!box.width) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.__dMarkers = {};
    svg.setAttribute('viewBox', '0 0 ' + box.width.toFixed(1) + ' ' + box.height.toFixed(1));
    var r = function (el) {
      var b = el.getBoundingClientRect();
      return { l: b.left - box.left, r: b.right - box.left, t: b.top - box.top, b: b.bottom - box.top, w: b.width, h: b.height };
    };
    var api = r(fig.querySelector('[data-k="api"]'));
    var wide = getComputedStyle(fig.querySelector('.cl__grid')).gridTemplateColumns.split(' ').length > 1;
    var opts = { both: true, color: 'var(--ink)', width: 1.5, head: 5, gap: 2 };
    var line = function (x1, y1, x2, y2) { Didactician.arrow(svg, { x: x1, y: y1 }, { x: x2, y: y2 }, opts); };

    /* loops: down to the bar's top edge. Wide: from each pill's centre. Narrow (staircase): from 8px
       inside each pill's left end, which keeps every line clear of the pills below it. */
    fig.querySelectorAll('[data-k="loop"]').forEach(function (el) {
      var p = r(el);
      var x = wide ? p.l + p.w / 2 : p.l + 8;
      line(x, p.b, x, api.t);
    });
    /* node agents: up to the bar's bottom edge */
    fig.querySelectorAll('[data-k="agent"]').forEach(function (el) {
      var p = r(el), x = p.l + p.w / 2;
      line(x, p.t, x, api.b);
    });
    /* Ari, from outside the control-plane band */
    var ari = r(fig.querySelector('[data-k="ari"]'));
    if (wide) {
      var y = Math.min(Math.max(ari.t + ari.h / 2, api.t + 4), api.b - 4);
      line(ari.l, y, api.r, y);
    } else {
      var cp = r(fig.querySelector('.cl__cp'));
      var x = cp.r - 10;
      line(x, ari.b, x, api.t);
    }
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; draw(); });
  }
  draw();
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(fig);
  else window.addEventListener('resize', schedule);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
})();
