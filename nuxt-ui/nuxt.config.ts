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
  },
  $production: {
    runtimeConfig: {
      public: {
        apiUrl: 'https://www.api.kavindra.io/v1'
      }
    },
  },
  $development: {
    runtimeConfig: {
      public: {
        apiUrl: 'http://localhost:8080/v1'
      }
    },
  },
  $env: {
    staging: {
      runtimeConfig: {
        public: {
          apiUrl: 'https://www.api.kavindra-staging.com/v1'
        }
      },
    }
  }
})
