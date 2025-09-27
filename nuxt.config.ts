// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: "Machine Learning & Software Engineer", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preload", href: "/_nuxt/assets/img/noise.jpg", as: "image" }, // Or the path Nuxt serves it from, e.g., /_nuxt/assets/img/noise.webp
      ],
    },
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/i18n",
    "nuxt3-lenis",
    "motion-v/nuxt",
    "nuxt-mail",
  ],
  i18n: {
    locales: [
      { code: "en", language: "en-US", file: "en.json" },
      { code: "tr", language: "tr-TR", file: "tr.json" },
    ],
    defaultLocale: "en",
  },
  mail: {
    message: {
      to: process.env.MY_EMAIL,
      from: process.env.LOGIN,
    },
    smtp: {
      host: process.env.SMTP_SERVER,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.LOGIN,
        pass: process.env.PASSWORD,
      },
    },
  },

  css: ["~/assets/css/main.css"],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",
});
