/* Ch 03 page script: comprehension checks. Classic script.
   Adapted from Ch 02's page.js (commit b661656) and Ch 01's think-then-reveal, so checks behave the
   same in every chapter: commit, then reveal; feedback explains every option.

   New in Ch 03: every commit dispatches a bubbling CustomEvent from the check card,
     'didactician:check-commit'  detail { id: 'k-02', option: 'C', correct: true }
   and stamps the card with data-committed="<option key>" (kept after TRY AGAIN). The §02 scrolly
   controller (widgets/w-fleet-scrolly/) listens for it on document to unlock gated steps, and reads
   [data-committed] at init in case a commit happened before it loaded. A think-then-reveal card
   dispatches the same event with option 'reveal'. */
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
