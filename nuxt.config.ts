// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/i18n"],
  css: ["~/assets/css/main.css"],
  i18n: {
    locales: [
      { code: "pt", file: "pt.json", name: "PT-BR" },
      { code: "en", file: "en.json", name: "EN" },
    ],
    defaultLocale: "pt",
    langDir: "../locales",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_locale",
      fallbackLocale: "pt",
    },
  },
  colorMode: {
    preference: "dark",
    fallback: "dark",
    storageKey: "nuxt-color-mode",
    classSuffix: "",
  },
  app: {
    head: {
      script: [
        {
          src: "/theme-detector.js",
          async: true,
        },
      ],
    },
  },
});
