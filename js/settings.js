/* ============================================================
   SETTINGS.JS — USER PREFERENCES SYSTEM
   Controls:
   - Settings panel toggle
   - Dark / Light mode
   - Preference persistence
   - Accessibility support
============================================================ */

"use strict";

/* ================= ELEMENTS ================= */
const settingsToggle = document.getElementById("settings-toggle");
const settingsPanel  = document.getElementById("settings-panel");
const body           = document.body;

/* ================= STATE ================= */
let settingsOpen = false;

/* ================= TOGGLE PANEL ================= */
if (settingsToggle && settingsPanel) {
  settingsToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    settingsOpen = !settingsOpen;

    if (settingsOpen) {
      settingsPanel.classList.add("open");
      settingsToggle.classList.add("active");
    } else {
      closeSettings();
    }
  });
}

/* ================= CLOSE FUNCTION ================= */
function closeSettings() {
  settingsPanel.classList.remove("open");
  settingsToggle.classList.remove("active");
  settingsOpen = false;
}

/* ================= CLICK OUTSIDE ================= */
document.addEventListener("click", (e) => {
  if (!settingsOpen) return;
  if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
    closeSettings();
  }
});

/* ================= ESC KEY ================= */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && settingsOpen) {
    closeSettings();
  }
});

/* ================= THEME TOGGLE ================= */
function toggleTheme() {
  body.classList.toggle("dark-mode");

  const theme = body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", theme);
}

/* ================= LOAD SAVED THEME ================= */
(function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }
})();

/* ================= LANGUAGE SELECT ================= */
const languageSelect = document.getElementById("language-select");

if (languageSelect) {
  const savedLang = localStorage.getItem("language");
  if (savedLang) languageSelect.value = savedLang;

  languageSelect.addEventListener("change", () => {
    localStorage.setItem("language", languageSelect.value);
    console.log("Language set to:", languageSelect.value);
    // Hook for future translation system
  });
}

/* ================= ACCESSIBILITY ================= */
settingsToggle?.setAttribute("aria-expanded", "false");

settingsToggle?.addEventListener("click", () => {
  settingsToggle.setAttribute(
    "aria-expanded",
    settingsOpen ? "true" : "false"
  );
});

/* ================= DEBUG ================= */
console.log("Settings system initialized");
