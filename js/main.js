/* =============================================================
   MAIN.JS — CORE SITE INTERACTIONS
   Website: Aydin Mahmoudi — Academic IELTS Tutor
   Handles:
   • Mobile navigation toggle
   • Basic accessibility helpers
   ============================================================= */

// -----------------------------
// MOBILE NAVIGATION TOGGLE
// -----------------------------
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
}

// -----------------------------
// CLOSE NAV ON LINK CLICK (MOBILE)
// -----------------------------
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mainNav.classList.contains('nav-open')) {
      mainNav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', false);
    }
  });
});

// -----------------------------
// OPTIONAL: PREVENT EMPTY FORM SUBMIT (FRONT-END SAFETY)
// -----------------------------
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sending is disabled in demo mode.');
  });
}
