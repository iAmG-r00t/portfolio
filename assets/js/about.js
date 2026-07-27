(() => {
  "use strict";

  const toggle = document.getElementById("about-theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const savedDarkMode =
    window.sessionStorage.getItem("portfolioDarkMode") === "on";

  toggle.setAttribute("aria-checked", String(savedDarkMode));
  themeColor.setAttribute("content", savedDarkMode ? "#0b0d0e" : "#5c5751");

  toggle.addEventListener("click", () => {
    const isOn = toggle.getAttribute("aria-checked") !== "true";
    toggle.setAttribute("aria-checked", String(isOn));
    document.documentElement.dataset.darkMode = isOn ? "on" : "off";
    window.sessionStorage.setItem("portfolioDarkMode", isOn ? "on" : "off");
    themeColor.setAttribute("content", isOn ? "#0b0d0e" : "#5c5751");
  });
})();
