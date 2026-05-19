/**
 * ANDES MOBILITY — Main JavaScript
 * Custom cursor, scroll animations, nav behavior, parallax, form
 */

(function () {
  'use strict';

  /* ── DOM READY ───────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initCursor();
    initNav();
    initReveal();
    initParallaxBgWords();
    initForm();
    initHeroEntrance();
  }

  /* ── CUSTOM CURSOR ──────────────────────────────────────── */
  function initCursor() {
    const cursor   = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let raf;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
      raf = requestAnimationFrame(animateFollower);
    }
    raf = requestAnimationFrame(animateFollower);

    // Hover state for interactive elements
    const hoverEls = document.querySelectorAll(
      'a, button, input, textarea, .service-item, .why-attr'
    );
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity   = '0';
      follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity   = '1';
      follower.style.opacity = '1';
    });
  }

  /* ── NAV SCROLL BEHAVIOR ────────────────────────────────── */
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;

      // Scrolled state
      if (scroll > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScroll = scroll;
    }, { passive: true });

    // Smooth anchor scrolling accounting for fixed nav height
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const navH = nav.offsetHeight;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ── SCROLL REVEAL (IntersectionObserver) ───────────────── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    els.forEach((el) => io.observe(el));
  }

  /* ── PARALLAX BG WORDS ──────────────────────────────────── */
  function initParallaxBgWords() {
    const words = document.querySelectorAll(
      '.hero__bg-word, .statement__bg-word, .services__bg-word, .contact__bg-word'
    );
    if (!words.length) return;

    window.addEventListener('scroll', () => {
      const sy = window.scrollY;
      words.forEach((word) => {
        const section  = word.closest('section, .hero');
        if (!section) return;
        const rect     = section.getBoundingClientRect();
        const relY     = -rect.top * 0.12;
        word.style.transform = word.classList.contains('hero__bg-word')
          ? `translate(-50%, calc(-50% + ${relY}px))`
          : word.classList.contains('statement__bg-word')
          ? `translateY(${relY}px)`
          : word.classList.contains('services__bg-word')
          ? `translate(-50%, calc(-50% + ${relY}px))`
          : `translate(-50%, ${relY}px)`;
      });
    }, { passive: true });
  }

  /* ── HERO ENTRANCE ──────────────────────────────────────── */
  function initHeroEntrance() {
    // Immediately trigger hero reveals (no scroll needed)
    setTimeout(() => {
      const heroReveals = document.querySelectorAll('.hero .reveal');
      heroReveals.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('visible');
        }, i * 160);
      });
    }, 200);
  }

  /* ── FORM ────────────────────────────────────────────────── */
  function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn  = document.getElementById('form-submit');
      const text = btn.querySelector('.form__submit-text');
      const orig = text.textContent;

      text.textContent = 'Mission request sent.';
      btn.style.pointerEvents = 'none';
      btn.style.opacity = '0.5';

      // Reset after 4s
      setTimeout(() => {
        text.textContent = orig;
        btn.style.pointerEvents = '';
        btn.style.opacity = '';
        form.reset();
      }, 4000);
    });
  }

})();
