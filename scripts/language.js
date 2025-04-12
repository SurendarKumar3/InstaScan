let translateInstance = null;
let retryCount = 0;
let scriptLoaded = false;

function initializeGoogleTranslate() {
  try {
    if (
      !window.google ||
      !google.translate ||
      !google.translate.TranslateElement
    ) {
      throw new Error("Google Translate API not loaded");
    }

    if (translateInstance) {
      document.getElementById("google_translate_element").innerHTML = "";
    }

    translateInstance = new google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "kn,te,ta,ml,en",
        layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
      },
      "google_translate_element"
    );

    setupMutationObserver();
  } catch (error) {
    console.error("Initialization failed:", error);
    if (retryCount < 3) {
      retryCount++;
      setTimeout(loadGoogleTranslateScript, 2000 * retryCount);
    }
  }
}

function setupMutationObserver() {
  const observer = new MutationObserver((mutations, obs) => {
    const dropdown = document.querySelector(".goog-te-menu-value");
    if (dropdown) {
      obs.disconnect();
      setupClickHandlers();
      retryCount = 0; // Reset retry counter on success
    }
  });

  observer.observe(document.getElementById("google_translate_element"), {
    childList: true,
    subtree: true,
  });

  // Timeout for observer
  setTimeout(() => {
    observer.disconnect();
  }, 5000);
}

function setupClickHandlers() {
  const handleTranslateClick = () => {
    const dropdown = document.querySelector(".goog-te-menu-value");
    if (dropdown) {
      dropdown.click();
    } else {
      console.warn("Dropdown element not found");
      initializeGoogleTranslate();
    }
  };

  // Remove existing listeners to prevent duplicates
  document
    .getElementById("languageSwitcher")
    .removeEventListener("click", handleTranslateClick);
  document
    .getElementById("desktopLanguageSwitcher")
    .removeEventListener("click", handleTranslateClick);

  // Add new listeners
  document
    .getElementById("languageSwitcher")
    .addEventListener("click", handleTranslateClick);
  document
    .getElementById("desktopLanguageSwitcher")
    .addEventListener("click", handleTranslateClick);
}

function googleTranslateElementInit() {
  scriptLoaded = true;
  initializeGoogleTranslate();
}

function loadGoogleTranslateScript() {
  if (scriptLoaded) return;

  const existingScript = document.querySelector(
    'script[src*="translate.google.com"]'
  );
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement("script");
  script.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  script.onerror = () => {
    console.error("Failed to load Google Translate script");
    if (retryCount < 3) {
      retryCount++;
      setTimeout(loadGoogleTranslateScript, 2000 * retryCount);
    }
  };

  document.head.appendChild(script);
}

// Start loading process when document is ready
if (document.readyState === "complete") {
  loadGoogleTranslateScript();
} else {
  window.addEventListener("load", loadGoogleTranslateScript);
}
