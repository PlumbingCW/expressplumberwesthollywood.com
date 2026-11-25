(function () {
  'use strict';
  var root = document.documentElement;
  var burger = document.querySelector('.burger');
  var drawer = document.querySelector('.mob-drawer');
  var overlay = document.querySelector('.mob-overlay');
  var closeBtn = document.querySelector('.mob-close');

  function setMenu(open) {
    if (!drawer || !overlay || !burger) return;
    drawer.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    root.classList.toggle('nav-lock', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (open && closeBtn) closeBtn.focus();
    if (!open && burger) burger.focus();
  }

  if (burger) burger.addEventListener('click', function () { setMenu(!drawer.classList.contains('open')); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
  if (overlay) overlay.addEventListener('click', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) setMenu(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && drawer && drawer.classList.contains('open')) setMenu(false);
  });

  var qs = document.querySelectorAll('.faq-q');
  Array.prototype.forEach.call(qs, function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      panel.style.maxHeight = open ? '0px' : panel.scrollHeight + 'px';
    });
  });
  window.addEventListener('resize', function () {
    Array.prototype.forEach.call(document.querySelectorAll('.faq-q[aria-expanded="true"]'), function (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  });
})();
