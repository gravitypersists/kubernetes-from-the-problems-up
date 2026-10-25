/* Ch 07 page script. Classic script.
   1. Comprehension checks, as in Ch 03–06 (Ch 06's assets/page.js is the reference implementation), so
      checks behave the same in every chapter: commit, then reveal; feedback explains every option. Every
      commit dispatches a bubbling CustomEvent from the check card,
        'didactician:check-commit'  detail { id: 'k-03', option: 'B', correct: true }
      and stamps the card with data-committed="<option key>" (kept after TRY AGAIN). Lane S's controller
      (widgets/w-services-scrolly/, over pool/cluster/lanes.js) listens for it on document to unlock S3–S4,
      and reads [data-committed] at init in case a commit happened before it loaded. The think-then-reveal
      card (k-07) dispatches the same event with option 'reveal'.
   2. Gated blocks: .cp-gate[data-gate="k-02"] (f-01 and §02's debrief), [data-gate="k-04"] (f-03 and the
      rest of §05), [data-gate="k-05"] (f-04 and the rest of §06) and [data-gate="k-06"] (f-05 and the rest
      of §07) stay locked, collapsed to a plate, until their check is committed with any option; they never
      re-lock.
   3. f-06: the loop lens table, built from CH07_LOOPS (Ch 06's CH06_LOOPS copied forward, with this
      chapter's rows tagged).
   4. f-04: two snapshots drawn by the pooled renderCluster (pool/cluster/cluster.js) from the lane's data
      file, window.ClusterData.FIGURES (widgets/w-services-scrolly/data.js; contract in index.html §06,
      above the figure). */
(function () {
  'use strict';

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* feedback text is an attribute; `backticks` mark code, as in the timeline data below */
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

  /* data-after on the card adds one closing line to every outcome, shown once, not repeated in the
     "why" disclosure. */
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
          /* on its own line, after the sentence (Ch 05's fix): its 44px target opens no gap in the line */
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
    gate.removeAttribute('aria-hidden');
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

/* ---- f-06 · the loop lens table ----------------------------------------------------------------
   CH07_LOOPS is the course's loop lens table (CURRICULUM §2.3): Ch 06's CH06_LOOPS copied forward, in
   its row order, with Ch 06's added / newPart tags dropped and this chapter's changes tagged (plan R3):
   the dashed "another loop, Chapter 7" row is now the endpoints loop, solid, and kube-proxy joins as a
   loop that runs on every node. Later chapters copy this array forward (Ch 8 fills in the "loop that adds
   nodes" row). Row fields:
     loop      the loop's name, as the page names it
     per       optional: a short qualifier under the name ("one per node", "Chapter 8")
     wants     what it works towards (the loop lens: which loop · wants · sees · does)
     sees      what it observes, in the record or the cluster
     does      what it does about a gap between the two
     job       the job of Sam's (Ch 03's words) that it took over
     chapter   optional: the chapter that covers this loop; a row with it is drawn dashed (met later)
     added     optional, this chapter only: the fields that are new or changed in this chapter, tagged
               NEW IN CH 7 in their cells (['loop'] tags the whole row, on its name). Drop the tags when
               copying the array forward.
     newPart   optional, this chapter only: { field: 'the new clause' } when only part of a cell is new;
               the tag goes inline, just before that clause. */
var CH07_LOOPS = [
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
    job: 'connecting', added: ['loop', 'wants', 'sees', 'does'] },
  { loop: 'kube-proxy', per: 'one per node', wants: 'its node’s forwarding rules matching every Service’s list',
    sees: 'every Service and its list, in the record',
    does: 'rewrites its node’s rules, so a call to a Service’s address goes straight to one listed Pod, picked at random by default; an empty list refuses calls',
    job: 'connecting', added: ['loop'] },
  { loop: 'a loop that adds nodes', per: 'Chapter 8', wants: 'no Pod waiting for room', sees: 'pending Pods',
    does: 'adds nodes, and removes idle ones', job: 'scaling', chapter: 8 }
];

(function () {
  'use strict';
  var body = document.querySelector('[data-loop-lens]');
  if (!body) return;
  var table = body.closest('table');
  var labels = (table.getAttribute('data-labels') || '').split('|');
  var tagText = table.getAttribute('data-new') || 'New in Ch 7';
  var tag = function (inline) {
    var t = document.createElement('span');
    t.className = 'lens__new' + (inline ? ' lens__new--inline' : ''); t.textContent = tagText;
    return t;
  };
  body.textContent = '';
  CH07_LOOPS.forEach(function (r) {
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

/* ---- f-04 · Tuesday, 12:40: two moments ----------------------------------------------------------
   Drawn by the pooled renderCluster from the lane's data file (one renderer over window.ClusterData),
   so the node, services, strings and the Service block are the lane's (pool-04). Each
   [data-cluster-figure="key"] slot draws ClusterData.FIGURES[key]: either a snapshot (with `nodes`) or
   { state, highlight?, ariaLabel?, head? }. The keys read are "restarting" (the left panel, ~12:40) and "ready"
   (the right panel, seconds later). If the data file names its two figures differently, the slots fall
   back to FIGURES' entries in order (first key → left panel, second → right), so the page and the widget
   folder can't silently disagree. Both panels share one layout and one reserve, so they read alike and
   have one height. No header bar (the panel heads are the page's); no step counter. Drawn at window load
   (after the widget's data.js and pool/cluster/cluster.js), again when the gate opens, on resize and
   after web fonts load. If the data isn't there yet, the slots stay as reserved space with the page's
   aria-labels. */
(function () {
  'use strict';
  var slots = Array.prototype.slice.call(document.querySelectorAll('[data-cluster-figure]'));
  if (!slots.length) return;
  var R = null, lastW = 0;
  function entryOf(slot, i) {
    var D = window.ClusterData;
    var F = D && D.FIGURES;
    if (!F) return null;
    var key = slot.getAttribute('data-cluster-figure');
    var e = F[key];
    if (!e) {
      var keys = Object.keys(F);
      if (keys.length === slots.length) e = F[keys[i]];
    }
    if (!e) return null;
    return e.nodes ? { state: e } : e;
  }
  function draw(force) {
    var CC = window.ClusterCanvas;
    if (!CC || !CC.create || !window.ClusterData) return;
    var entries = slots.map(entryOf);
    if (entries.some(function (e) { return !e || !e.state; })) return;
    if (!R) R = CC.create(window.ClusterData);
    var width = Math.floor(Math.min.apply(null, slots.map(function (s) { return s.clientWidth; })));
    if (width < 120) return;
    if (!force && width === lastW) return;
    lastW = width;
    var states = entries.map(function (e) { return e.state; });
    var layout = R.laneLayout(width, states, null, {});
    var reserve = slots[0].offsetParent !== null ? R.measureReserve(slots[0], states, { width: width, layout: layout }) : null;
    slots.forEach(function (slot, i) {
      R.renderCluster(slot, entries[i].state, { width: width, layout: layout, reserve: reserve, highlight: entries[i].highlight || [] });
      if (entries[i].ariaLabel) slot.setAttribute('aria-label', entries[i].ariaLabel);
      /* the data file may carry the panel's head line (F.head); it replaces the page's copy of it */
      var head = slot.parentNode && slot.parentNode.querySelector('.fp__head');
      if (head && entries[i].head) head.textContent = entries[i].head;
      slot.setAttribute('data-drawn', '');
    });
  }
  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; draw(false); });
  }
  window.addEventListener('load', function () {
    draw(true);
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(schedule);
      slots.forEach(function (s) { ro.observe(s); });
    } else window.addEventListener('resize', schedule);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (R) R.reset(); draw(true); });
  });
  document.addEventListener('didactician:gate-open', function () { requestAnimationFrame(function () { draw(true); }); });
})();
