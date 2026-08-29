/* ============================================================
   NTX AUTOMATION CO — SHARED COMPONENTS
   components.js — injected into every page before </body>
   ============================================================ */

(function () {
  'use strict';

  /* ── NAV HTML ── */
  const NAV_HTML = `
<a class="skip-link" href="#main-content">Skip to main content</a>

<header class="site-header" role="banner">
  <div class="nav-inner">

    <!-- Desktop logo: full horizontal lockup -->
    <a class="nav-logo nav-logo-desktop" href="/" aria-label="NTX Automation Co. — Home">
      <img src="/assets/ntx-logo-lockup.png" alt="NTX Automation Co." class="nav-logo-img" width="590" height="160"/>
    </a>

    <!-- Mobile logo: NTX mark only -->
    <a class="nav-logo nav-logo-mobile" href="/" aria-label="NTX Automation Co. — Home">
      <img src="/assets/ntx-mark.png" alt="NTX Automation Co." class="nav-mark-img" width="462" height="90"/>
    </a>

    <!-- Desktop nav links -->
    <nav aria-label="Primary navigation">
      <ul class="nav-links">
        <li><a href="/services.html">Services</a></li>
        <li><a href="/packages.html">Pricing</a></li>
        <li><a href="/faq.html">FAQ</a></li>
        <li><a href="/about.html">About</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    </nav>

    <!-- Right cluster -->
    <div class="nav-right">
      <a class="btn-nav" href="/contact.html">Get a Free Quote</a>
      <button class="nav-hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="nav-overlay">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<!-- Mobile full-screen overlay -->
<div class="nav-overlay" id="nav-overlay" role="dialog" aria-modal="true" aria-label="Navigation menu" aria-hidden="true">
  <div>
    <ul class="nav-overlay-primary">
      <li><a href="/">Home</a></li>
      <li><a href="/services.html">Services</a></li>
      <li><a href="/packages.html">Pricing</a></li>
      <li><a href="/faq.html">FAQ</a></li>
      <li><a href="/about.html">About</a></li>
      <li><a href="/contact.html">Contact</a></li>
    </ul>
    <ul class="nav-overlay-secondary">
      <li><a href="/demo.html">Automation Demo</a></li>
    </ul>
    <div class="nav-overlay-legal">
      <a href="/privacy.html">Privacy Policy</a>
      <a href="/terms.html">Terms &amp; Conditions</a>
      <a href="/sms-consent.html">SMS Consent</a>
    </div>
  </div>
  <div class="nav-overlay-cta">
    <a class="btn-primary btn-full" href="/contact.html">Get a Free Quote</a>
  </div>
</div>`;

  /* ── FOOTER HTML ── */
  const FOOTER_HTML = `
<footer class="site-footer" role="contentinfo">
  <div class="footer-grid">

    <!-- Brand column -->
    <div>
      <img src="/assets/ntx-logo-lockup.png" alt="NTX Automation Co." class="footer-logo-img" width="590" height="160"/>
      <div class="footer-tagline">Automate. Elevate. Grow.</div>
      <p class="footer-desc">Professional websites and AI-powered customer intake systems for local businesses in Denton and North Texas.</p>
      <div class="footer-email"><a href="mailto:support@ntxautomationco.com">support@ntxautomationco.com</a></div>
    </div>

    <!-- Services column -->
    <div class="footer-col">
      <h4>Services</h4>
      <ul>
        <li><a href="/web-design.html">Web Design &amp; Development</a></li>
        <li><a href="/automation.html">AI Intake &amp; Automation</a></li>
        <li><a href="/photo-video.html">Photo &amp; Video</a></li>
        <li><a href="/website-care.html">Website Care</a></li>
        <li><a href="/demo.html">Automation Demo</a></li>
      </ul>
    </div>

    <!-- Company column -->
    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="/packages.html">Pricing</a></li>
        <li><a href="/faq.html">FAQ</a></li>
        <li><a href="/about.html">About NTX</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    </div>

    <!-- Legal column -->
    <div class="footer-col">
      <h4>Legal</h4>
      <ul>
        <li><a href="/privacy.html">Privacy Policy</a></li>
        <li><a href="/terms.html">Terms &amp; Conditions</a></li>
        <li><a href="/sms-consent.html">SMS Consent</a></li>
      </ul>
    </div>

  </div>

  <div class="footer-bottom">
    <small>Serving Denton &amp; North Texas &nbsp;&middot;&nbsp; &copy; 2026 NTX Automation Co.</small>
    <small>Website by NTX Automation Co.</small>
  </div>
</footer>`;

  /* ── INJECT ── */
  function inject() {
    // Nav — prepend to body as a fragment so source order is preserved:
    // skip link, site header, mobile overlay, then existing <main>.
    const navTemplate = document.createElement('template');
    navTemplate.innerHTML = NAV_HTML;
    document.body.prepend(navTemplate.content);

    // Footer — append to body, after <main>.
    const footerTemplate = document.createElement('template');
    footerTemplate.innerHTML = FOOTER_HTML;
    document.body.appendChild(footerTemplate.content);

    /* ── HAMBURGER / FOCUS MANAGEMENT ── */
    const hamburger = document.querySelector('.nav-hamburger');
    const overlay   = document.querySelector('.nav-overlay');

    function getFocusableInOverlay() {
      return Array.from(overlay.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )).filter(el => !el.hasAttribute('disabled'));
    }

    function openMenu() {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Move focus to first focusable item in overlay
      const focusable = getFocusableInOverlay();
      if (focusable.length) focusable[0].focus();
    }

    function closeMenu() {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      hamburger.focus();
    }

    hamburger.addEventListener('click', () => {
      overlay.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Close on overlay link click
    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
    });

    // Trap focus inside overlay when open
    overlay.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusableInOverlay();
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    /* ── ACTIVE NAV STATE ── */
    const path = window.location.pathname;
    document.querySelectorAll('.nav-links a, .nav-overlay-primary a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === path ||
          (path === '/' && href === '/') ||
          (href !== '/' && path.startsWith(href.replace('.html', '')))) {
        link.classList.add('active');
      }
    });

    /* ── REVEAL OBSERVER (respects prefers-reduced-motion) ── */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
      if (prefersReduced) {
        // Show all immediately without animation
        reveals.forEach(el => el.classList.add('visible'));
      } else {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              observer.unobserve(e.target);
            }
          });
        }, { threshold: 0.08 });
        reveals.forEach(el => observer.observe(el));
      }
    }
  }

  /* Run after DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();


