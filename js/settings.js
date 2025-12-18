/* ============================================================
   SETTINGS.JS
   Controls:
   - Settings gear toggle
   - Dark / Light mode
   - LocalStorage persistence
   - Smooth UI behavior
   ============================================================ */

/* ------------------------------------------------------------
   ELEMENT REFERENCES
------------------------------------------------------------ */
const settingsToggle = document.getElementById("settings-toggle");
const settingsPanel  = document.getElementById("settings-panel");
const bodyElement    = document.body;

/* ------------------------------------------------------------
   SETTINGS PANEL TOGGLE
------------------------------------------------------------ */
let settingsOpen = false;

if (settingsToggle && settingsPanel) {
  settingsToggle.addEventListener("click", () => {
    settingsOpen = !settingsOpen;

    if (settingsOpen) {
      settingsPanel.classList.add("open");
      settingsToggle.classList.add("active");
    } else {
      settingsPanel.classList.remove("open");
      settingsToggle.classList.remove("active");
    }
  });
}

/* ------------------------------------------------------------
   CLOSE SETTINGS WHEN CLICKING OUTSIDE
------------------------------------------------------------ */
document.addEventListener("click", (event) => {
  if (!settingsPanel || !settingsToggle) return;

  const clickedInsidePanel = settingsPanel.contains(event.target);
  const clickedToggle     = settingsToggle.contains(event.target);

  if (!clickedInsidePanel && !clickedToggle && settingsOpen) {
    settingsPanel.classList.remove("open");
    settingsToggle.classList.remove("active");
    settingsOpen = false;
  }
});

/* ------------------------------------------------------------
   DARK / LIGHT MODE
------------------------------------------------------------ */
function toggleTheme() {
  bodyElement.classList.toggle("dark-mode");

  if (bodyElement.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

/* ------------------------------------------------------------
   LOAD SAVED THEME ON PAGE LOAD
------------------------------------------------------------ */
(function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    bodyElement.classList.add("dark-mode");
  }
})();

/* ------------------------------------------------------------
   ACCESSIBILITY: ESC KEY CLOSES SETTINGS
------------------------------------------------------------ */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && settingsOpen) {
    settingsPanel.classList.remove("open");
    settingsToggle.classList.remove("active");
    settingsOpen = false;
  }
});

/* ------------------------------------------------------------
   DEBUG (REMOVE LATER IF YOU WANT)
------------------------------------------------------------ */
console.log("Settings system loaded successfully");
