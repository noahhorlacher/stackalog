import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  modules: [
    '@nuxt/icon',
    'shadcn-nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode',
    'nuxt-auth-utils'
  ],
  ssr: false,
  nitro: {
    experimental: {
      database: true,
      tasks: true
    },
    database: {
      default: {
        connector: 'mysql2',
        options: {
          name: 'stackalog',
        }
      }
    },
  },
  shadcn: {
    prefix: ''
  },
  googleFonts: {
    families: {
      Poppins: true
    }
  },
  colorMode: {
    classSuffix: '',
  },
  app: {
    head: {
      title: 'Stackalog',
      htmlAttrs: {
        lang: 'de',
      }
    }
  }
})