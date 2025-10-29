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


/* ===== Projects modal open/close ===== */
document.addEventListener('click', (e) => {
  // open modal buttons: data-open attribute contains the modal id to show
  const open = e.target.closest('[data-open]');
  if (open) {
    const id = open.getAttribute('data-open');
    const modal = document.getElementById(id);
    if (modal) modal.setAttribute('aria-hidden', 'false');
    return;
  }

  // close modal controls
  const closeBtn = e.target.closest('[data-close]');
  if (closeBtn) {
    // find parent modal backdrop
    const parent = closeBtn.closest('.modal-backdrop');
    if (parent) parent.setAttribute('aria-hidden', 'true');
    return;
  }

  // close by clicking backdrop (but not when clicking inside modal)
  if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
    e.target.setAttribute('aria-hidden', 'true');
  }
});

/* ===== keep using your scroll-direction-aware reveal logic =====
   If you already have the reveal observer script in script.js (from About/Skills),
   project cards already use the .reveal class and will animate correctly.
   The observer handles adding .from-right/.from-left and .revealed.
*/

document.addEventListener("DOMContentLoaded", () => {
  const contactCards = document.querySelectorAll(".contact-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  contactCards.forEach(card => observer.observe(card));
});
