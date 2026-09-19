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
    if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
      toggleMenu();
    }
  });
});
