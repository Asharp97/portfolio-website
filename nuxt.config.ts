// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: "Ali Elsayed | Machine Learning & Full-Stack Software Engineer",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Machine Learning & Full-Stack Software Engineer with 4+ years of experience. Specialized in TensorFlow, Vue.js, React, NestJS, and Python. Building smart, scalable applications in Istanbul.",
        },
        {
          name: "keywords",
          content:
            "Ali Elsayed, Software Engineer, Machine Learning Engineer, Full-Stack Developer, TensorFlow, Vue.js, React, NestJS, Python, GraphQL, Elasticsearch, Istanbul, Turkey",
        },
        { name: "author", content: "Ali Elsayed" },
        { name: "robots", content: "index, follow" },
        { name: "googlebot", content: "index, follow" },
        {
          name: "google-site-verification",
          content: "WItrFIBRQFf9GZq7qZkZwRQGjbywQL92ftMXB-xi5KI",
        },

        // Open Graph (Facebook, LinkedIn)
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content:
            "Ali Elsayed | Machine Learning & Full-Stack Software Engineer",
        },
        {
          property: "og:description",
          content:
            "Machine Learning & Full-Stack Software Engineer with 4+ years of experience building smart, scalable applications with TensorFlow, Vue.js, React, and Python.",
        },
        { property: "og:url", content: "https://ali-elsayed.vercel.app" },
        { property: "og:site_name", content: "Ali Elsayed Portfolio" },
        { property: "og:locale", content: "en_US" },
        { property: "og:locale:alternate", content: "tr_TR" },
        {
          property: "og:image",
          content: "https://ali-elsayed.vercel.app/og-image.jpg",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content:
            "Ali Elsayed - Machine Learning & Full-Stack Software Engineer",
        },

        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: "https://ali-elsayed.vercel.app/og-image.jpg",
        },
        {
          name: "twitter:title",
          content:
            "Ali Elsayed | Machine Learning & Full-Stack Software Engineer",
        },
        {
          name: "twitter:description",
          content:
            "Machine Learning & Full-Stack Software Engineer specialized in TensorFlow, Vue.js, React, NestJS, and Python.",
        },

        // Additional SEO
        { name: "format-detection", content: "telephone=no" },
        { name: "theme-color", content: "#ffffff" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://ali-elsayed.vercel.app" },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
          fetchpriority: "high",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
          fetchpriority: "high",
        },
        { rel: "dns-prefetch", href: "https://api.iconify.design" },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ali Elsayed",
            jobTitle: "Machine Learning & Full-Stack Software Engineer",
            url: "https://ali-elsayed.vercel.app",
            sameAs: [
              "https://github.com/Asharp97",
              "https://www.linkedin.com/in/ali-elsayed-25974b130/",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Istanbul",
              addressCountry: "TR",
            },
            alumniOf: [
              {
                "@type": "EducationalOrganization",
                name: "Doğuş University",
                url: "https://www.dogus.edu.tr/",
              },
            ],
            knowsAbout: [
              "Machine Learning",
              "TensorFlow",
              "Vue.js",
              "React",
              "NestJS",
              "Python",
              "GraphQL",
              "Elasticsearch",
              "Full-Stack Development",
            ],
          }),
        },
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
    "nuxt-nodemailer",
  ],
  fonts: {
    defaults: {
      fallbacks: {
        "sans-serif": ["system-ui"],
      },
    },
  },
  i18n: {
    locales: [
      { code: "en", language: "en-US", file: "en.json" },
      { code: "tr", language: "tr-TR", file: "tr.json" },
    ],
    defaultLocale: "en",
  },
  nodemailer: {
    from: process.env.SENDER || "ali-hisham@hotmail.com",
    host: process.env.SMTP_SERVER || "smtp-relay.brevo.com",
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    secure: false,
    auth: {
      user: process.env.LOGIN,
      pass: process.env.PASSWORD,
    },
  },
  css: ["~/assets/css/main.css"],

  experimental: {
    renderJsonPayloads: true,
    viewTransition: false,
  },

  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            motion: ["motion-v"],
            swiper: ["swiper/vue", "swiper/modules"],
          },
        },
      },
    },
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ["/", "/sitemap.xml"],
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",
});
