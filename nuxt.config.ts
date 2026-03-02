// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  runtimeConfig: {
    public: {
      sanity: {
        projectId: '4ygt7ebp',
        dataset: 'production',
        apiVersion: '2025-03-01',
        useCdn: true,
      },
    },
  },

  app: {
    head: {
      title: 'We\'ll Be In Touch — The ghosting index 👻',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A public record of companies that ghost candidates. Scored on how long they take, how much of your time they cost, and whether they ever reply.' },
        { property: 'og:title', content: 'We\'ll Be In Touch — The ghosting index 👻' },
        { property: 'og:description', content: 'A public record of companies that ghost candidates. Scored on how long they take, how much of your time they cost, and whether they ever reply.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://wellbeintouch.fyi' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  googleFonts: {
    families: {
      'Lora': {
        wght: [400, 500],
        ital: [400, 500, 600],
      },
      'DM Sans': [300, 400, 500],
      'DM Mono': [300, 400],
    },
    display: 'swap',
  },

  // Static generation for Vercel
  nitro: {
    preset: 'vercel',
  },
})
