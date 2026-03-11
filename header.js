document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('site-header');
    if (!header) return;
  
    header.innerHTML = `
      <div class="logo">
        <a href="/index.html">
          <img src="/assets/westtek-solutions-dark-theme.png" alt="West-Tek Solutions" class="logo-img" />
        </a>
      </div>
  
      <nav>
        <a href="/index.html">Home</a>
        <a href="/gallery.html">Shop</a>
        <a href="/about.html">About Us</a>
        <a href="/missionlog.html">Missions</a>

      </nav>
  
      <div class="hamburger" id="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
  
    // Highlight active nav link
    const links = header.querySelectorAll('nav a');
    links.forEach(link => {
      if (link.href === window.location.href) {
        link.style.color = 'var(--spacex-orange)';
      }
    });
  
    // Mobile nav elements (expected to already be in the HTML)
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('overlay');
  
    function toggleMenu() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }
  
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
  
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', toggleMenu);
    });
  
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
        toggleMenu();
      }
    });
  });