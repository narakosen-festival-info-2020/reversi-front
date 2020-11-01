require('dotenv').config()
const { API } = process.env

export default {
  ssr: false,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'AIリバーシ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    bodyAttrs: {
      class: 'body-class'
    }
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],
  styleResources: {
    scss: ['~/assets/css/global.scss']
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
    '@nuxtjs/device',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    // prefix: '/api'
    baseURL: 'https://reversi-back.nitncfes.net',
    credentials: true
  },
  proxy: {
    // '/api': {
    //   target: 'http://localhost:80/',
    //   // target: 'https://reversi-back.nitncfes.net/',
    //   pathRewrite: {
    //     '^/api': '/'
    //   }
    // }
  },
  env: {
    API
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'layouts/error.vue')
      })
    }
  },

  manifest: {
    name: 'AIリバーシ',
    short_name: 'AIリバーシ',
    description: 'AIと戦うリバーシゲームです',
    start_url: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#fff',
    theme_color: '#fff'
  }
}
