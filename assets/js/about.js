(() => {
  "use strict";

  const toggle = document.getElementById("about-theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const themeLabel = toggle.querySelector(".about-theme-toggle__label");
  const isNightTime = document.documentElement.dataset.timeOfDay === "night";
  const getDarkMode = () => {
    const preference = window.sessionStorage.getItem("portfolioDarkMode");
    return preference === "on" || (preference === null && isNightTime);
  };
  const updateThemeToggle = (isDark) => {
    toggle.setAttribute("aria-checked", String(isDark));
    toggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
    themeLabel.textContent = isDark ? "dark mode" : "light mode";
    themeColor.setAttribute("content", isDark ? "#0b0d0e" : "#5c5751");
  };

  updateThemeToggle(getDarkMode());
  window.addEventListener("pageshow", () => {
    const isDark = getDarkMode();
    document.documentElement.dataset.darkMode =
      window.sessionStorage.getItem("portfolioDarkMode") || "auto";
    updateThemeToggle(isDark);
  });

  toggle.addEventListener("click", () => {
    const useDarkMode = toggle.getAttribute("aria-checked") !== "true";
    const preference = useDarkMode ? "on" : "off";
    document.documentElement.dataset.darkMode = preference;
    window.sessionStorage.setItem("portfolioDarkMode", preference);
    updateThemeToggle(useDarkMode);
  });
})();
