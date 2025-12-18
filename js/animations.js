/* ============================================================
   ANIMATIONS.JS
   Purpose:
   - Page load animation
   - Scroll reveal animations
   - Section fade & slide
   - Card stagger effects
   - Performance-friendly (mobile + desktop)
   ============================================================ */

/* ------------------------------------------------------------
   GLOBAL LOADER (PAGE LOAD)
------------------------------------------------------------ */
window.addEventListener("load", () => {
  const loader = document.getElementById("global-loader");

  if (loader) {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.style.display = "none";
    }, 700);
  }
});

/* ------------------------------------------------------------
   INTERSECTION OBSERVER SETUP
------------------------------------------------------------ */
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

/* ------------------------------------------------------------
   ELEMENTS TO ANIMATE
------------------------------------------------------------ */
const revealElements = document.querySelectorAll(
  "section, .course-card, .value-list li, .hero-inner, .cta-box"
);

revealElements.forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

/* ------------------------------------------------------------
   STAGGER ANIMATION FOR COURSE CARDS
------------------------------------------------------------ */
const courseCards = document.querySelectorAll(".course-card");

courseCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 120}ms`;
});

/* ------------------------------------------------------------
   STAGGER ANIMATION FOR VALUE LIST
------------------------------------------------------------ */
const valueItems = document.querySelectorAll(".value-list li");

valueItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 90}ms`;
});

/* ------------------------------------------------------------
   HEADER SCROLL EFFECT
------------------------------------------------------------ */
let lastScrollY = window.scrollY;
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY > lastScrollY && window.scrollY > 120) {
    header.classList.add("header-hidden");
  } else {
    header.classList.remove("header-hidden");
  }

  lastScrollY = window.scrollY;
});

/* ------------------------------------------------------------
   HERO TEXT MICRO-ANIMATION
------------------------------------------------------------ */
const heroHeading = document.querySelector(".hero-heading");

if (heroHeading) {
  const text = heroHeading.innerText;
  heroHeading.innerHTML = "";

  [...text].forEach((char, i) => {
    const span = document.createElement("span");
    span.innerText = char === " " ? "\u00A0" : char;
    span.style.animationDelay = `${i * 25}ms`;
    span.classList.add("hero-char");
    heroHeading.appendChild(span);
  });
}

/* ------------------------------------------------------------
   BUTTON RIPPLE EFFECT
------------------------------------------------------------ */
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const rect = this.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top  = `${e.clientY - rect.top}px`;

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

/* ------------------------------------------------------------
   MOBILE PERFORMANCE SAFETY
------------------------------------------------------------ */
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
});

/* ------------------------------------------------------------
   DEBUG
------------------------------------------------------------ */
console.log("Animations system initialized");
