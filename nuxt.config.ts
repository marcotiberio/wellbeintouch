// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  runtimeConfig: {
    supabase: {
      serviceRoleKey: '', // set via NUXT_SUPABASE_SERVICE_ROLE_KEY
    },
    public: {
      sanity: {
        projectId: '4ygt7ebp',
        dataset: 'production',
        apiVersion: '2025-03-01',
        useCdn: true,
      },
      supabase: {
        url: '',     // set via NUXT_PUBLIC_SUPABASE_URL
        anonKey: '', // set via NUXT_PUBLIC_SUPABASE_ANON_KEY
      },
    },
  },

  app: {
    head: {
      title: 'We\'ll Be In Touch — Hiring Transparency Index',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A public record of hiring processes — scored on what actually matters. How long it takes. How much of your time it costs. Whether they ever reply.' },
        { property: 'og:title', content: 'We\'ll Be In Touch — Hiring Transparency Index' },
        { property: 'og:description', content: 'A public record of companies that ghost candidates. Scored on how long they take, how much of your time they cost, and whether they ever reply.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://wellbeintouch.fyi' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
