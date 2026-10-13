/* ============================================
   PORTFOLIO — Interactive Behaviors
   Muhammed Sadiq T
   ============================================ */

(function () {
  'use strict';

  // ---- DOM References ----
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navDrawer = document.getElementById('nav-drawer');
  const navDrawerClose = document.getElementById('nav-drawer-close');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinkItems = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('.section');
  const reveals = document.querySelectorAll('.reveal');
  const themeToggle = document.getElementById('theme-toggle');

  // ---- Theme: Light / Dark Mode ----
  function getPreferredTheme() {
    var saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Apply immediately (no flash)
  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'dark';
      var next = current === 'dark' ? 'light' : 'dark';

      // Add transitioning class for extra animation hooks
      document.body.classList.add('theme-transitioning');
      applyTheme(next);

      setTimeout(function () {
        document.body.classList.remove('theme-transitioning');
      }, 600);
    });
  }

  // Listen for OS theme changes
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });

  // ---- Navigation: Scroll State ----
  let lastScrollY = 0;
  let ticking = false;

  function handleNavScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(handleNavScroll);
      ticking = true;
    }
  }, { passive: true });

  function setNavOpen(isOpen) {
    if (navToggle) navToggle.classList.toggle('open', isOpen);
    if (navLinks) navLinks.classList.toggle('open', isOpen);
    if (navDrawer) navDrawer.classList.toggle('open', isOpen);
    if (navOverlay) navOverlay.classList.toggle('open', isOpen);
    if (navToggle) navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  // ---- Navigation: Mobile Drawer & Toggle ----
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isOpen = navDrawer ? navDrawer.classList.contains('open') : (navLinks && navLinks.classList.contains('open'));
      setNavOpen(!isOpen);
    });
  }

  if (navDrawerClose) {
    navDrawerClose.addEventListener('click', function () {
      setNavOpen(false);
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', function () {
      setNavOpen(false);
    });
  }

  // Close mobile drawer on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      setNavOpen(false);
    }
  });

  // Close drawer on any navigation link click
  document.querySelectorAll('.nav a, .nav__drawer a').forEach(function (link) {
    link.addEventListener('click', function () {
      setNavOpen(false);
    });
  });

  // ---- Active Section Highlighting ----
  function highlightActiveSection() {
    let currentSection = '';
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', function () {
    requestAnimationFrame(highlightActiveSection);
  }, { passive: true });

  // ---- Scroll Reveal Animations ----
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
      }
    );

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ---- Cursor Glow Effect (Desktop Only) ----
  if (window.matchMedia('(min-width: 768px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const glowFollower = document.createElement('div');
    glowFollower.className = 'cursor-glow';
    glowFollower.style.cssText = `
      position: fixed;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(45, 212, 191, 0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s, background 0.5s;
      opacity: 0;
    `;
    document.body.appendChild(glowFollower);

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glowFollower.style.opacity = '1';
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      glowFollower.style.opacity = '0';
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glowFollower.style.left = glowX + 'px';
      glowFollower.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }

  // ---- Initialize on load ----
  handleNavScroll();
  highlightActiveSection();
})();
