/* Ch 06 page script. Classic script.
   1. Comprehension checks, as in Ch 03–05 (Ch 05's assets/page.js is the reference implementation), so
      checks behave the same in every chapter: commit, then reveal; feedback explains every option. Every
      commit dispatches a bubbling CustomEvent from the check card,
        'didactician:check-commit'  detail { id: 'k-02', option: 'A', correct: true }
      and stamps the card with data-committed="<option key>" (kept after TRY AGAIN). Lane R's controller
      (widgets/w-rollout-scrolly/, over pool/cluster/lanes.js) listens for it on document to unlock R3–R5,
      and reads [data-committed] at init in case a commit happened before it loaded. The think-then-reveal
      card (k-07) dispatches the same event with option 'reveal'.
   2. Gated blocks: .cp-gate[data-gate="k-04"] (f-03 and its reveal) and [data-gate="k-06"] (f-05 and its
      reveal) stay locked until their check is committed, with any option; they never re-lock.
   3. f-07: the loop lens table, built from CH06_LOOPS (Ch 05's CH05_LOOPS copied forward, with Ch 06's
      rows tagged).
   4. f-04: the incident timeline, built from CH06_INCIDENT (Fennel fiction, plan R2).
   5. f-03: two snapshots drawn by the pooled renderCluster (pool/cluster/cluster.js) from the lane's data
      file, window.ClusterData.FIGURES.crash and .shipped (widgets/w-rollout-scrolly/data.js; contract in
      index.html §06, above the figure). */
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
        p.appendChild(document.createTextNode(btn.getAttribute('data-fb')));
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

/* ---- f-07 · the loop lens table ----------------------------------------------------------------
   CH06_LOOPS is the course's loop lens table (CURRICULUM §2.3): Ch 05's CH05_LOOPS copied forward, in
   its row order, with Ch 05's added / newPart tags dropped and this chapter's additions tagged. Later
   chapters copy this array forward (Ch 7 fills in the "another loop" row; Ch 8 the "loop that adds
   nodes" row). Row fields:
     loop      the loop's name, as the lanes name it
     per       optional: a short qualifier under the name ("one per node", "Chapter 7")
     wants     what it works towards (the loop lens: which loop · wants · sees · does)
     sees      what it observes, in the record or the cluster
     does      what it does about a gap between the two
     job       the job of Sam's (Ch 03's words) that it took over
     chapter   optional: the chapter that covers this loop; a row with it is drawn dashed (met later)
     added     optional, this chapter only: the fields that are new or changed in this chapter, tagged
               NEW IN CH 6 in their cells (['loop'] tags the whole row, on its name). Drop the tags when
               copying the array forward.
     newPart   optional, this chapter only: { field: 'the new clause' } when only part of a cell is new;
               the tag goes inline, just before that clause. */
var CH06_LOOPS = [
  { loop: 'node loop', wants: 'every node reporting in', sees: 'each node’s latest report',
    does: 'marks a silent node unknown; after a wait, marks its Pods for deletion',
    job: 'noticing a dead machine' },
  { loop: 'Deployment loop', wants: 'each Deployment’s Pods running the version its record names, as many as it names',
    sees: 'its ReplicaSets, one per version, and how many of their Pods are ready',
    does: 'for a new version, makes a new ReplicaSet and shifts copies to it a few at a time, removing old Pods only as new ones become ready; keeps old ReplicaSets, empty, for going back',
    job: 'updating', added: ['loop'] },
  { loop: 'ReplicaSet loop', wants: 'each ReplicaSet’s number of Pods', sees: 'the Pod records it has',
    does: 'writes new Pod records, or removes extras, including for Pods that were evicted', job: 'replacing' },
  { loop: 'scheduler', wants: 'every Pod on a node with room for its requests',
    sees: 'Pods with no node, and how much memory and processor each node has left unreserved (never how busy it is)',
    does: 'rules out nodes too full for the Pod, picks the emptiest of the rest, spreading copies; if none has room, leaves the Pod pending, records why, and tries again when the cluster changes',
    job: 'placing' },
  { loop: 'node agent', per: 'one per node', wants: 'its node’s assigned Pods running, and the node itself healthy',
    sees: 'the containers on its node, and how much memory the node has left',
    does: 'starts and restarts containers (including OOM-killed ones) and reports back; when its node runs short of memory, evicts Pods, those furthest over their requests first; runs each container’s checks, restarting a container that fails its liveness check and reporting one that fails its readiness check as not ready',
    job: 'restarting',
    newPart: { does: 'runs each container’s checks, restarting a container that fails its liveness check and reporting one that fails its readiness check as not ready' } },
  { loop: 'another loop', per: 'Chapter 7', wants: 'callers reaching each service’s Pods',
    sees: 'where each service’s ready Pods are running',
    does: 'keeps callers’ routes current, sending requests only to ready Pods', job: 'connecting', chapter: 7,
    newPart: { sees: 'ready Pods are running', does: 'sending requests only to ready Pods' } },
  { loop: 'a loop that adds nodes', per: 'Chapter 8', wants: 'no Pod waiting for room', sees: 'pending Pods',
    does: 'adds nodes, and removes idle ones', job: 'scaling', chapter: 8 }
];

(function () {
  'use strict';
  var body = document.querySelector('[data-loop-lens]');
  if (!body) return;
  var table = body.closest('table');
  var labels = (table.getAttribute('data-labels') || '').split('|');
  var tagText = table.getAttribute('data-new') || 'New in Ch 6';
  var tag = function (inline) {
    var t = document.createElement('span');
    t.className = 'lens__new' + (inline ? ' lens__new--inline' : ''); t.textContent = tagText;
    return t;
  };
  body.textContent = '';
  CH06_LOOPS.forEach(function (r) {
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

/* ---- f-04 · Thursday, 14:02–14:08 ---------------------------------------------------------------
   Ch 01's incident timeline grammar, data-driven. Fennel fiction (plan R2): times are illustrative, and
   `~` marks an approximate one. prices: 'good' CORRECT · 'warn' SOME $0 · 'bad' ALL $0 · null = a closing
   row with no time and no band. The step back to v63 is told only as "the last v64 Pod is removed", so
   the figure doesn't answer k-06 before the reader commits. `code` in backticks. */
var CH06_INCIDENT = {
  label: 'Timeline of Thursday afternoon, 14:02 to 14:08, with the status of catalog’s prices',
  head: { time: 'Time', event: 'What happens', price: 'Prices' },
  words: { good: 'Correct', warn: 'Some $0', bad: 'All $0' },
  rows: [
    { time: '14:02:00', event: 'The pipeline writes `catalog:v64` into the Deployment.', prices: 'good' },
    { time: '~14:02:20', event: 'The first v64 Pod passes its check and is sent traffic. Some customers see $0.00.', prices: 'warn' },
    { time: '~14:03:00', event: 'The rollout completes: three v64 Pods, all ready. The v63 ReplicaSet is kept, empty.', prices: 'bad' },
    { time: '14:05', event: 'Morgan, in the team chat: “Why are orders coming in at $0.00?”', prices: 'bad' },
    { time: '14:06', event: 'Riley opens the app: every product shows $0.00.', prices: 'bad' },
    { time: '14:07', event: 'Riley changes `catalog`’s image line back to v63, and the pipeline applies it.', prices: 'bad' },
    { time: '~14:08:20', event: 'The last v64 Pod is removed.', prices: 'good' },
    { time: '', event: '23 orders were placed at $0.00 in between. They stay that way.', prices: null }
  ]
};

(function () {
  'use strict';
  var list = document.querySelector('[data-timeline="ch06-thursday"]');
  if (!list) return;
  var D = CH06_INCIDENT;
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function sr(text) {
    var s = el('span', null, text);
    s.style.position = 'absolute'; s.style.width = '1px'; s.style.height = '1px'; s.style.overflow = 'hidden'; s.style.clip = 'rect(0 0 0 0)';
    return s;
  }
  function withCode(target, text) {
    text.split('`').forEach(function (part, i) {
      target.appendChild(i % 2 ? el('code', null, part) : document.createTextNode(part));
    });
  }
  list.setAttribute('aria-label', D.label);
  list.textContent = '';
  var head = el('li', 'tl__row tl__head');
  head.setAttribute('aria-hidden', 'true');
  head.appendChild(el('span', 'tl__band'));
  head.appendChild(el('span', 'tl__time', D.head.time));
  head.appendChild(el('span', 'tl__event', D.head.event));
  head.appendChild(el('span', 'tl__price', D.head.price));
  list.appendChild(head);
  D.rows.forEach(function (r) {
    var li = el('li', 'tl__row' + (r.prices ? ' is-' + r.prices : ' is-after'));
    li.appendChild(el('span', 'tl__band'));
    li.appendChild(el('span', 'tl__time', r.time));
    var ev = el('span', 'tl__event');
    withCode(ev, r.event);
    li.appendChild(ev);
    var pr = el('span', 'tl__price');
    if (r.prices) {
      var st = el('span', 'st st--' + r.prices);
      var lamp = el('span', 'lamp'); lamp.setAttribute('aria-hidden', 'true');
      st.appendChild(lamp);
      st.appendChild(sr(D.head.price + ': '));
      st.appendChild(document.createTextNode(D.words[r.prices]));
      pr.appendChild(st);
    }
    li.appendChild(pr);
    list.appendChild(li);
  });
})();

/* ---- f-03 · two ways v64 could be bad -----------------------------------------------------------
   Drawn by the pooled renderCluster from the lane's data file (one renderer over window.ClusterData),
   so the nodes, services, version colours and strings are the lane's. Each [data-cluster-figure="key"]
   slot draws ClusterData.FIGURES[key]: either a snapshot (with `nodes`) or { state, highlight?,
   ariaLabel? }. Both panels share one layout and one reserve, so they read alike and have one height.
   No header bar (the panel heads are the page's); no step counter. Drawn at window load (after the
   widget's data.js and pool/cluster/cluster.js), again when the gate opens, on resize and after web
   fonts load. If the data isn't there yet, the slots stay as reserved space with the page's aria-labels. */
(function () {
  'use strict';
  var slots = Array.prototype.slice.call(document.querySelectorAll('[data-cluster-figure]'));
  if (!slots.length) return;
  var R = null, lastW = 0;
  function entryOf(slot) {
    var D = window.ClusterData;
    var key = slot.getAttribute('data-cluster-figure');
    var e = D && D.FIGURES && D.FIGURES[key];
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
