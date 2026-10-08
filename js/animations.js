/**
 * NEW STAR INFOSIS — ANIMATIONS & REVEALS (animations.js)
 * IntersectionObserver scroll reveal and subtle UI micro-animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
});

/**
 * Scroll Reveal Animation via IntersectionObserver
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}
