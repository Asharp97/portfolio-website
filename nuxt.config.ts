// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "nuxt3-lenis", "@nuxt/fonts", "@nuxt/eslint"],
  css: [
    "./assets/style/main.scss",
    "./assets/style/animations.scss",
    "./assets/style/design-system.scss",
    "./assets/style/mob.scss",
    "./assets/style/transitions.scss",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
          additionalData: '@use "./assets/style/variables.scss" as *;',
        },
      },
    },
  },
});
