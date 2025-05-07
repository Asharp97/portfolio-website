// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Ali Elsayed | Machine Learning & Software Engineer", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/mdc",
    "@nuxtjs/i18n",
    "nuxt3-lenis",
    "motion-v/nuxt",
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
