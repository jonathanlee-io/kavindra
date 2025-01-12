// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@pinia/nuxt'],
  $production: {
    runtimeConfig: {
      public: {
        apiUrl: 'https://www.api.kavindra.io/v1'
      }
    },
    app: {
      head: {
        script: [
          { src: 'https://www.api.kavindra.io/v1/scripts/feedback-widget.js' },
        ]
      },
      pageTransition: { name: 'page', mode: 'out-in' }
    },
  },
  $development: {
    runtimeConfig: {
      public: {
        apiUrl: 'http://localhost:8080/v1'
      }
    },
    app: {
      head: {
        script: [
          { src: 'https://www.api.kavindra-local.com:8080/v1/scripts/feedback-widget.js' },
        ]
      },
      pageTransition: { name: 'page', mode: 'out-in' }
    },
  },
  $env: {
    staging: {
      runtimeConfig: {
        public: {
          apiUrl: 'https://www.api.kavindra-staging.com/v1'
        }
      },
      app: {
        head: {
          script: [
            { src: 'https://www.api.kavindra-staging.com/v1/scripts/feedback-widget.js' },
          ]
        },
        pageTransition: { name: 'page', mode: 'out-in' }
      },
    }
  }
})
