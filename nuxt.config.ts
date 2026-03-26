// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  colorMode: {
    preference: "system",
    fallback: "light",
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
