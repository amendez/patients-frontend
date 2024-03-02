

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module',
    '@cssninja/nuxt-toaster'
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi',
        sets: ['mdi']
        
      },
      theme: {
        defaultTheme: 'customTheme',
        themes: {
          customTheme: {
            dark: false,
            colors: {
              background: '#FFFFFF',
              surface: '#FFFFFF',
              'surface-bright': '#FFFFFF',
              'surface-light': '#EEEEEE',
              'surface-variant': '#424242',
              'on-surface-variant': '#EEEEEE',
              primary: '#ed762f',
              secondary: '#f1eade',
              error: '#B00020',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FB8C00',
            },
          },
        },
      },
    }
  }
})
