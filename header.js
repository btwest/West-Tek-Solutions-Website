document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('site-header');
  if (!header) return;

  const navLinks = window.SITE_NAV || [];
  const linksHtml = navLinks.map(link => `<a href="${link.href}">${link.label}</a>`).join('\n        ');

  header.innerHTML = `
    <div class="logo">
      <a href="/index.html">
        <img src="/assets/westtek-solutions-dark-theme.png" alt="West-Tek Solutions" class="logo-img" />
      </a>
    </div>

    <nav>
        ${linksHtml}
    </nav>

    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle light and dark theme">
      <svg class="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <line x1="12" y1="2" x2="12" y2="4"></line>
        <line x1="12" y1="20" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line>
        <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="4" y2="12"></line>
        <line x1="20" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line>
        <line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line>
      </svg>
      <svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </button>

    <div class="hamburger" id="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;

  // Mobile nav + overlay are shared chrome, created here instead of duplicated in every page.
  let overlay = document.getElementById('overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'overlay';
    document.body.appendChild(overlay);
  }

  let mobileNav = document.getElementById('mobileNav');
  if (!mobileNav) {
    mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.id = 'mobileNav';
    document.body.appendChild(mobileNav);
  }
  mobileNav.innerHTML = linksHtml;

  // Highlight active nav link in both the desktop and mobile nav
  [...header.querySelectorAll('nav a'), ...mobileNav.querySelectorAll('a')].forEach(link => {
    if (link.href === window.location.href) {
      link.style.color = 'var(--spacex-orange)';
    }
  });

  const hamburger = document.getElementById('hamburger');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960 && mobileNav.classList.contains('active')) {
      toggleMenu();
    }
  });

  // Light/dark theme toggle
  const THEME_KEY = 'westtek-theme';
  const themeToggle = document.getElementById('theme-toggle');

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';

    if (next === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      // localStorage unavailable (private browsing, etc.) — theme just won't persist
    }
  });
});
