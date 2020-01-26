import { Context, Configuration } from "@nuxt/types";

const envPath = `../.env.${process.env.NODE_ENV || 'local'}`

const {API_URL,SECRET_ID,SECRET_KEY} = process.env;

export default  {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {src: '~plugins/auth0-js.ts', ssr: false },
  ],
  auth0: {
    domain: 'dev-v587ce-s.auth0.com',
    clientID: 'msRYL7DFMLBjDINPAmGys6Y4IYv7AfkZ',
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    ['@nuxt/typescript-build', {
      typeCheck: true,
      ignoreNotFoundWarnings: true
    }]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config : Configuration, ctx : Context) {
      if (ctx.isDev && ctx.isClient) {
        config.devtool = 'inline-cheap-module-source-map';
        // Run ESLint on save
        if (config.module) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(ts|js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          });
        }

        // Run StyleLint on save
        /* eslint import/no-extraneous-dependencies: 0 */
        /* eslint global-require: 0 */
        if (config.plugins) {
          const StylelintPlugin = require('stylelint-webpack-plugin');
          config.plugins.push(new StylelintPlugin({
            files: [
              '**/*.vue',
              '**/*.css',
              '**/*.scss',
            ],
          }));
        }
      }
    }
  },
  srcDir:"src/",
  router: {
    base: process.env.BASE_URL || '',
  },

  env: {
    API_URL,
    SECRET_ID,
    SECRET_KEY,
  },

  generate: {
    dir: '../public'
  }
}
