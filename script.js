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
