// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@pinia/nuxt'],
  app: {
    head: {
      script: [
        { src: 'https://www.api.kavindra.io/v1/scripts/feedback-widget.js' },
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  }
})
