import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ssr: false,
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  modules: [
    '@nuxt/icon',
    'shadcn-nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode'
  ],
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
  }
})