/* ============================================
   PORTFOLIO — Interactive Behaviors
   Muhammed Sadiq T
   ============================================ */

(function () {
  'use strict';

  // ---- Reduced Motion Check ----
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.matchMedia('(min-width: 768px)');

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
  const preloader = document.getElementById('preloader');
  const scrollProgress = document.getElementById('scroll-progress');
  const bottomNav = document.getElementById('bottom-nav');
  const backToTop = document.getElementById('back-to-top');
  const toast = document.getElementById('toast');

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

  // ---- Preloader ----
  function dismissPreloader() {
    if (!preloader) return;
    preloader.classList.add('loaded');
    document.body.style.overflow = '';
    setTimeout(function () {
      preloader.style.display = 'none';
    }, 600);
  }

  // Dismiss on window load or after 3s max (whichever comes first)
  if (preloader) {
    document.body.style.overflow = 'hidden';
    window.addEventListener('load', function () {
      // Small delay so the fill bar animation completes visually
      setTimeout(dismissPreloader, 400);
    });
    // Safety timeout — never block the page more than 3s
    setTimeout(dismissPreloader, 3000);
  }

  // ---- Scroll Progress Bar ----
  function updateScrollProgress() {
    if (!scrollProgress) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const progress = (window.scrollY / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }

  // ---- Navigation: Scroll State + Bottom Nav + Back to Top ----
  let lastScrollY = 0;
  let scrollTicking = false;
  let prevScrollDirection = 0; // positive = down, negative = up

  function handleScrollEffects() {
    const scrollY = window.scrollY;
    const delta = scrollY - lastScrollY;

    // Top nav: add scrolled class
    if (nav) {
      if (scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    // Mobile bottom nav: hide on scroll down, show on scroll up
    if (bottomNav && !isDesktop.matches) {
      if (delta > 8 && scrollY > 200) {
        bottomNav.classList.add('hidden');
      } else if (delta < -8) {
        bottomNav.classList.remove('hidden');
      }
    }

    // Back to top button: show after scrolling past hero
    if (backToTop) {
      if (scrollY > window.innerHeight * 0.8) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // Scroll progress
    updateScrollProgress();

    lastScrollY = scrollY;
    scrollTicking = false;
  }

  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      requestAnimationFrame(handleScrollEffects);
      scrollTicking = true;
    }
  }, { passive: true });

  // ---- Back to Top: Click Handler ----
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Navigation: Mobile Drawer ----
  function setNavOpen(isOpen) {
    if (navToggle) navToggle.classList.toggle('open', isOpen);
    if (navLinks) navLinks.classList.toggle('open', isOpen);
    if (navDrawer) navDrawer.classList.toggle('open', isOpen);
    if (navOverlay) navOverlay.classList.toggle('open', isOpen);
    if (navToggle) navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

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

    // Update both top nav and bottom nav links
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

  // ---- Animated Stat Counters ----
  function animateCounter(el) {
    const text = el.textContent.trim();
    // Parse: "2+", "5+", "1,000+", "50+"
    const hasPlus = text.includes('+');
    const numericStr = text.replace(/[^0-9.]/g, '');
    const target = parseInt(numericStr, 10);
    if (isNaN(target) || target === 0) return;

    const hasComma = text.includes(',');
    const duration = 1600; // ms
    const startTime = performance.now();

    // Overshoot factor for spring feel
    const overshoot = 1.12;

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function springEase(t) {
      if (t < 0.85) {
        // Overshoot phase
        return easeOutExpo(t / 0.85) * overshoot;
      } else {
        // Settle back from overshoot to 1.0
        const settleT = (t - 0.85) / 0.15;
        return overshoot - (overshoot - 1) * settleT;
      }
    }

    function formatNumber(n) {
      const num = Math.round(n);
      if (hasComma) {
        return num.toLocaleString('en-US');
      }
      return num.toString();
    }

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = springEase(progress);
      const current = easedProgress * target;

      el.textContent = formatNumber(current) + (hasPlus ? '+' : '');

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure final value is exact
        el.textContent = (hasComma ? target.toLocaleString('en-US') : target.toString()) + (hasPlus ? '+' : '');
      }
    }

    // Start from 0
    el.textContent = '0' + (hasPlus ? '+' : '');
    requestAnimationFrame(step);
  }

  // Observe stat cards
  if ('IntersectionObserver' in window) {
    const statNumbers = document.querySelectorAll('.stat-card__number');
    const statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach(function (el) {
      statObserver.observe(el);
    });
  }

  // ---- Experience Timeline Dot Pulse ----
  if ('IntersectionObserver' in window) {
    const expDots = document.querySelectorAll('.exp-card__dot');
    const dotObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('pulsed');
            dotObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px 0px -20px 0px' }
    );

    expDots.forEach(function (dot) {
      dotObserver.observe(dot);
    });
  }

  // ---- Magnetic 3D Tilt Hover on Cards (Desktop Only) ----
  if (isDesktop.matches && !prefersReducedMotion) {
    const magneticCards = document.querySelectorAll('.stat-card, .skill-group, .project-card, .contact__intent');

    magneticCards.forEach(function (card) {
      // Add spotlight div
      const spotlight = document.createElement('div');
      spotlight.className = 'magnetic-card__spotlight';
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(spotlight);

      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Tilt: max 4 degrees
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
        card.style.transition = 'transform 0.1s ease-out';

        // Spotlight follows cursor
        spotlight.style.opacity = '1';
        spotlight.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(45, 212, 191, 0.08) 0%, transparent 60%)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        spotlight.style.opacity = '0';
      });
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

  // ---- Toast Notification Helper ----
  let toastTimeout = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      toast.classList.remove('visible');
    }, 2500);
  }

  // ---- Email Copy to Clipboard ----
  const emailLink = document.getElementById('contact-email');
  if (emailLink) {
    emailLink.addEventListener('click', function (e) {
      e.preventDefault();
      const email = 'msadiqt.dev@gmail.com';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          showToast('✓ Email copied to clipboard');
        }).catch(function () {
          // Fallback: open mailto
          window.location.href = 'mailto:' + email;
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          showToast('✓ Email copied to clipboard');
        } catch (err) {
          window.location.href = 'mailto:' + email;
        }
        document.body.removeChild(textArea);
      }
    });
  }

  // ---- Cursor Glow Effect (Desktop Only) ----
  if (isDesktop.matches && !prefersReducedMotion) {
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

  // ---- Konami Code Easter Egg ----
  (function () {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let index = 0;

    document.addEventListener('keydown', function (e) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === code[index]) {
        index++;
        if (index === code.length) {
          index = 0;
          launchConfetti();
        }
      } else {
        index = key === code[0] ? 1 : 0;
      }
    });

    function launchConfetti() {
      const colors = ['#2dd4bf', '#818cf8', '#f472b6', '#fbbf24', '#34d399', '#60a5fa'];
      const particleCount = 80;
      const container = document.createElement('div');
      container.style.cssText = 'position:fixed;inset:0;z-index:10000;pointer-events:none;overflow:hidden';
      document.body.appendChild(container);

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * 100;
        const drift = (Math.random() - 0.5) * 200;
        const duration = Math.random() * 1.5 + 1.5;
        const delay = Math.random() * 0.5;
        const rotation = Math.random() * 720 - 360;

        particle.style.cssText = `
          position: absolute;
          top: -10px;
          left: ${startX}%;
          width: ${size}px;
          height: ${size * (Math.random() > 0.5 ? 1 : 0.6)}px;
          background: ${color};
          border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
          opacity: 1;
          animation: confettiFall ${duration}s ${delay}s ease-in forwards;
        `;

        // Generate unique keyframes per particle
        const animName = 'confetti_' + i;
        const style = document.createElement('style');
        style.textContent = `
          @keyframes ${animName} {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(${window.innerHeight + 50}px) translateX(${drift}px) rotate(${rotation}deg); opacity: 0; }
          }
        `;
        document.head.appendChild(style);
        particle.style.animation = `${animName} ${duration}s ${delay}s ease-in forwards`;
        container.appendChild(particle);

        // Cleanup per style
        setTimeout(function () {
          if (style.parentNode) style.parentNode.removeChild(style);
        }, (duration + delay) * 1000 + 100);
      }

      showToast('🎉 You found the easter egg!');

      // Remove container after all particles fall
      setTimeout(function () {
        if (container.parentNode) container.parentNode.removeChild(container);
      }, 3500);
    }
  })();

  // ---- Initialize on load ----
  handleScrollEffects();
  highlightActiveSection();
  updateScrollProgress();
})();
