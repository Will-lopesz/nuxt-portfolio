(function () {
  const storageKey = "nuxt-color-mode";
  const html = document.documentElement;

  let theme = localStorage.getItem(storageKey);

  if (!theme || theme === "system") {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    theme = isDark ? "dark" : "light";
  }

  if (theme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
})();
