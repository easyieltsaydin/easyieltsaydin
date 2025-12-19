/* ============================================================
   ANIMATIONS.JS — VISUAL POLISH & INTERACTIONS
   Purpose:
   - Scroll reveal animations
   - Fade / slide effects
   - Subtle professional motion
   - Performance-safe
============================================================ */

"use strict";

/* ================= CONFIG ================= */
const ANIMATION_CONFIG = {
  threshold: 0.15,
  rootMargin: "0px 0px -60px 0px"
};

/* ================= SCROLL REVEAL ================= */
document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
});

/* ================= INIT ================= */
function initScrollReveal() {
  const elements = document.querySelectorAll(
    ".section-title, .section-text, .course-card, .value-list li, .cta-box, .about-image, .about-text"
  );

  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(onReveal, ANIMATION_CONFIG);
  elements.forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

/* ================= OBSERVER CALLBACK ================= */
function onReveal(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}

/* ================= HOVER MICRO-ANIMATIONS ================= */
document.addEventListener("mouseover", e => {
  const card = e.target.closest(".course-card");
  if (!card) return;
  card.style.transform = "translateY(-8px)";
});

document.addEventListener("mouseout", e => {
  const card = e.target.closest(".course-card");
  if (!card) return;
  card.style.transform = "";
});

/* ================= BUTTON PRESS FEEDBACK ================= */
document.addEventListener("click", e => {
  const btn = e.target.closest(".btn");
  if (!btn) return;

  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 150);
});

/* ================= REDUCED MOTION SUPPORT ================= */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (prefersReducedMotion.matches) {
  document.documentElement.classList.add("reduced-motion");
}

/* ================= SAFETY ================= */
window.addEventListener("error", function (e) {
  console.warn("Animation handled:", e.message);
});
