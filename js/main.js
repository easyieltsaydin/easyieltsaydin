/* ============================================================
   MAIN.JS — CORE WEBSITE LOGIC
   Handles:
   - Page loader
   - Navigation behavior
   - Mobile menu
   - Active links
   - Global UX fixes
============================================================ */

"use strict";

/* ================= GLOBAL READY ================= */
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initMobileNav();
  highlightActiveNav();
  fixBrokenTextWrap();
});

/* ================= LOADER ================= */
function initLoader() {
  const loader = document.getElementById("global-loader");
  if (!loader) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.display = "none";
    }, 2200);
  });
}

/* ================= MOBILE NAV ================= */
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
    nav.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ================= ACTIVE NAV LINK ================= */
function highlightActiveNav() {
  const links = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || (href === "index.html" && currentPage === "")) {
      link.classList.add("active");
    }
  });
}

/* ================= TEXT WRAP FIX ================= */
/* Prevents ugly mid-word line breaks on resize */
function fixBrokenTextWrap() {
  const protectedElements = document.querySelectorAll(".no-split");

  protectedElements.forEach(el => {
    el.style.wordBreak = "normal";
    el.style.overflowWrap = "normal";
    el.style.hyphens = "none";
  });
}

/* ================= SMOOTH SCROLL (SAFE) ================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ================= SAFETY CHECK ================= */
/* Ensures JS errors never break page */
window.addEventListener("error", function (e) {
  console.warn("Handled JS error:", e.message);
});

/* ================= FUTURE EXTENSION ================= */
/*
  This file is intentionally modular.
  Language logic → settings.js
  Animations → animations.js
*/
