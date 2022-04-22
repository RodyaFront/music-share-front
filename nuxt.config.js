import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,

  head: {
    titleTemplate: '%s - music-share',
    title: 'music-share',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['@/theme/index.scss'],

  plugins: [],

  components: true,

  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/moment'],

  modules: [],

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#29ab7a',
        },
        dark: {
          primary: '#53e3ab',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {},
}
