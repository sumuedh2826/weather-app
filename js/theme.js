(function () {
  var toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  var STORAGE_KEY = "weather-app-theme";

  function getTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);

    var isDark = theme === "dark";
    toggleBtn.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
    toggleBtn.title = isDark ? "Switch to light theme" : "Switch to dark theme";
  }

  toggleBtn.addEventListener("click", function () {
    var nextTheme = getTheme() === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });

  // Sync aria-label on first load
  setTheme(getTheme());
})();