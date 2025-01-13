// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/fonts",
  ],

  $production: {
    runtimeConfig: {
      public: {
        apiUrl: "https://www.api.kavindra.io/v1",
      },
    },
    app: {
      head: {
        script: [
          { src: 'https://www.api.kavindra.io/v1/scripts/feedback-widget.js' },
          { src: 'https://plausible.io/js/script.file-downloads.outbound-links.pageview-props.revenue.tagged-events.js', async: true, 'data-domain': 'kavindra.io'}
        ],
      },
      pageTransition: { name: "page", mode: "out-in" },
    },
  },

  $development: {
    runtimeConfig: {
      public: {
        apiUrl: "http://localhost:8080/v1",
      },
    },
    app: {
      head: {
        script: [{ src: "http://www.api.kavindra-local.com:8080/v1/scripts/feedback-widget.js" }],
      },
      pageTransition: { name: "page", mode: "out-in" },
    },
  },

  $env: {
    staging: {
      runtimeConfig: {
        public: {
          apiUrl: "https://www.api.kavindra-staging.com/v1",
        },
      },
      app: {
        head: {
          script: [{ src: "https://www.api.kavindra-staging.com/v1/scripts/feedback-widget.js" }],
        },
        pageTransition: { name: "page", mode: "out-in" },
      },
    },
  },

  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
  },

  colorMode: {
    classSuffix: "",
  },

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
    ],
  },
});
