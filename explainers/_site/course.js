/* Course chrome behaviour. Everything here is an enhancement: the masthead, the map and the
   end-of-chapter plate are static HTML and work without it.
   - masthead map: Escape, outside click and following a link close it
   - home: "Continue with chapter NN" for a returning reader (localStorage, per viewer) */
(function () {
  'use strict';
  var html = document.documentElement;
  var each = function (sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); };
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  };

  // ---- masthead map --------------------------------------------------------------------------
  each('details.cn-bar__map', function (d) {
    var close = function () { if (d.open) { d.open = false; d.querySelector('summary').focus(); } };
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.addEventListener('click', function (e) { if (d.open && !d.contains(e.target)) d.open = false; });
    d.addEventListener('click', function (e) { if (e.target.closest('.cn-bar__panel a')) d.open = false; });
  });

  // ---- continue where you left off ------------------------------------------------------------
  var here = html.getAttribute('data-cn-chapter');
  if (here) store.set('cn-last', here);
  var cta = document.querySelector('[data-cn-continue]');
  var data = document.getElementById('cn-data');
  var last = store.get('cn-last');
  if (cta && data && last && last !== '01') {
    try {
      var ch = JSON.parse(data.textContent).filter(function (c) { return c.no === last; })[0];
      if (ch) { cta.href = ch.href; cta.textContent = 'Continue with chapter ' + ch.no + ' →'; }
    } catch (e) { /* leave the default */ }
  }
})();
