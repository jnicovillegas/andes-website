/**
 * ANDES MOBILITY — Main JavaScript
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initCursor();
    initNav();
    initReveal();
    initParallax();
    initForm();
  }

  /* ── CUSTOM CURSOR ──────────────────────────────────────────── */
  function initCursor() {
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursorRing');
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function animRing() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width  = '12px'; cursor.style.height = '12px';
        ring.style.width    = '52px'; ring.style.height   = '52px';
        ring.style.opacity  = '0.5';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width  = '8px';  cursor.style.height = '8px';
        ring.style.width    = '32px'; ring.style.height   = '32px';
        ring.style.opacity  = '1';
      });
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      ring.style.opacity   = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      ring.style.opacity   = '1';
    });
  }

  /* ── NAV ────────────────────────────────────────────────────── */
  function initNav() {
    const navbar     = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!navbar) return;

    // Scroll state
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // Hamburger
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        menuToggle.classList.toggle('open', isOpen);
      });

      document.addEventListener('click', e => {
        if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
          mobileMenu.classList.remove('open');
          menuToggle.classList.remove('open');
        }
      });

      // Close on link click
      mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          menuToggle.classList.remove('open');
        });
      });
    }

    // Smooth anchor scroll offset for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ── SCROLL REVEAL ──────────────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-up, .reveal-line, .card');
    if (!els.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '-30px' });

    els.forEach(el => io.observe(el));
  }

  /* ── PARALLAX QUOTE STRIP ───────────────────────────────────── */
  function initParallax() {
    const quoteBg = document.getElementById('quoteBg');
    if (!quoteBg) return;

    window.addEventListener('scroll', () => {
      const strip  = quoteBg.parentElement;
      const rect   = strip.getBoundingClientRect();
      const offset = rect.top / window.innerHeight;
      quoteBg.style.transform = `translateY(${offset * 60}px)`;
    }, { passive: true });
  }

  /* ── FORM ────────────────────────────────────────────────────── */
  function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = document.getElementById('form-submit');
      const text = btn.querySelector('.submit-text');
      const orig = text.textContent;

      text.textContent    = 'Mission request sent.';
      btn.style.pointerEvents = 'none';
      btn.style.opacity       = '0.5';

      setTimeout(() => {
        text.textContent        = orig;
        btn.style.pointerEvents = '';
        btn.style.opacity       = '';
        form.reset();
      }, 4000);
    });
  }

})();
