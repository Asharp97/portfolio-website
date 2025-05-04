// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/mdc",
    "@nuxtjs/i18n",
    "nuxt3-lenis",
  ],
  i18n: {
    locales: [
      { code: "en", language: "en-US" },
      { code: "tr", language: "tr-TR" },
    ],
    defaultLocale: "en",
  },

  css: ["~/assets/css/main.css"],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",
});
