(() => {
  "use strict";

  const bootScreen = document.getElementById("boot-screen");
  const bootOutput = document.getElementById("boot-output");
  const bootStatus = document.getElementById("boot-status");
  const skipButton = document.getElementById("boot-skip");
  const themeToggle = document.getElementById("theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const tagline = document.querySelector(".tagline");
  const taglineText = tagline.textContent.trim().replace(/\s+/g, " ");
  const copyrightYear = document.getElementById("copyright-year");

  copyrightYear.textContent = new Date().getFullYear();
  const savedDarkMode =
    window.sessionStorage.getItem("portfolioDarkMode") === "on";
  themeToggle.setAttribute("aria-checked", String(savedDarkMode));
  themeColor.setAttribute("content", savedDarkMode ? "#090b0d" : "#574f49");

  const bootLines = [
    '<span class="ok">[ ok ]</span> waking display adapter',
    '<span class="ok">[ ok ]</span> mounting /home/gr00t',
    '<span class="ok">[ ok ]</span> loading curiosity modules',
    '<span class="ok">[ ok ]</span> checking reverse_engineering.so',
    '<span class="ok">[ ok ]</span> starting weird-scripts.service',
    '<span class="ok">[ ok ]</span> syncing field notes',
    '<span class="ok">[ ok ]</span> initializing terminal',
    '<span class="accent">system ready.</span>',
  ];

  let lineIndex = 0;
  let bootTimer;
  let hasFinished = false;
  let introStarted = false;
  const hasAnimatedIntro =
    window.sessionStorage.getItem("portfolioIntroAnimated") === "true";

  tagline.textContent = "";

  const revealIntroCopy = () => {
    document.documentElement.classList.add("copy-complete");
  };

  const startIntroAnimation = () => {
    if (introStarted) return;
    introStarted = true;

    if (reducedMotion || hasAnimatedIntro) {
      tagline.textContent = taglineText;
      revealIntroCopy();
      return;
    }

    tagline.classList.add("is-typing");
    let characterIndex = 0;
    const typingTimer = window.setInterval(() => {
      characterIndex += 1;
      tagline.textContent = taglineText.slice(0, characterIndex);

      if (characterIndex >= taglineText.length) {
        window.clearInterval(typingTimer);
        tagline.classList.remove("is-typing");
        window.sessionStorage.setItem("portfolioIntroAnimated", "true");
        window.setTimeout(revealIntroCopy, 220);
      }
    }, 46);
  };

  const finishBoot = () => {
    if (hasFinished) return;
    hasFinished = true;
    window.clearInterval(bootTimer);
    bootStatus.textContent = "ready";
    bootScreen.classList.add("is-complete");
    document.body.classList.remove("is-booting");
    window.sessionStorage.setItem("portfolioBooted", "true");
    window.setTimeout(startIntroAnimation, reducedMotion ? 0 : 500);
  };

  const addBootLine = () => {
    if (lineIndex >= bootLines.length) {
      window.setTimeout(finishBoot, 750);
      return;
    }

    const line = document.createElement("p");
    line.innerHTML = bootLines[lineIndex];
    bootOutput.appendChild(line);
    bootOutput.scrollTop = bootOutput.scrollHeight;
    lineIndex += 1;
  };

  const startBoot = () => {
    window.clearInterval(bootTimer);
    lineIndex = 0;
    hasFinished = false;
    bootOutput.textContent = "";
    bootStatus.textContent = "scanning";
    bootScreen.classList.remove("is-complete");
    document.body.classList.add("is-booting");
    addBootLine();
    bootTimer = window.setInterval(addBootLine, 430);
  };

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasBooted = window.sessionStorage.getItem("portfolioBooted") === "true";

  if (reducedMotion || hasBooted) {
    finishBoot();
  } else {
    startBoot();
  }

  skipButton.addEventListener("click", finishBoot);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !hasFinished) finishBoot();
  });

  themeToggle.addEventListener("click", () => {
    const isOn = themeToggle.getAttribute("aria-checked") !== "true";
    themeToggle.setAttribute("aria-checked", String(isOn));
    document.documentElement.dataset.darkMode = isOn ? "on" : "off";
    window.sessionStorage.setItem("portfolioDarkMode", isOn ? "on" : "off");
    themeColor.setAttribute("content", isOn ? "#090b0d" : "#574f49");
  });
})();
