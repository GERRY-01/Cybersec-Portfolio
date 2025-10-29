function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("open");
}
// existing toggleMenu() should remain

// Scroll-direction-aware reveal animations
// === Scroll Direction-Aware Reveal Animation ===
(function() {
  const reveals = document.querySelectorAll('.reveal');
  let lastScrollY = window.scrollY;

  // Detect scroll direction
  let scrollDir = 'down';
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    scrollDir = currentScrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = currentScrollY;
  });

  const observerOptions = {
    threshold: 0.2 // element visible by 20%
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting) {
        // Remove any old direction class
        el.classList.remove('from-left', 'from-right');

        // Add direction-based class before animation
        if (scrollDir === 'down') {
          el.classList.add('from-right');
        } else {
          el.classList.add('from-left');
        }

        // Trigger reveal animation
        setTimeout(() => el.classList.add('revealed'), 50);
      } else {
        // Reset when scrolled out of view (optional)
        el.classList.remove('revealed');
      }
    });
  }, observerOptions);

  reveals.forEach(el => observer.observe(el));
})();

// Insert after your existing scroll-direction-aware observer block or replace the relevant part.
// This snippet focuses on skill cards.

(function() {
  const skillCards = document.querySelectorAll('.skill-card.reveal');
  let lastScrollY = window.scrollY || 0;
  let scrollDir = 'down';

  // update scroll direction
  window.addEventListener('scroll', () => {
    const current = window.scrollY || 0;
    scrollDir = current > lastScrollY ? 'down' : 'up';
    lastScrollY = current;
  }, { passive: true });

  const options = { threshold: 0.18 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        // apply direction offset based on current scroll direction
        el.classList.remove('from-left', 'from-right');
        if (scrollDir === 'down') el.classList.add('from-right');
        else el.classList.add('from-left');

        // tiny timeout to ensure class applied before reveal (forces reflow)
        setTimeout(() => el.classList.add('revealed'), 30);
      } else {
        // reset so it can animate again on re-entry
        el.classList.remove('revealed', 'from-left', 'from-right');
      }
    });
  }, options);

  skillCards.forEach(card => observer.observe(card));
})();
