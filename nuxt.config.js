module.exports = {
  head: {
    title: '工業局應用系統',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css' },
      { rel: 'stylesheet', href: '//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js' },
      { src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js' },
      { src: 'http://malsup.github.io/jquery.blockUI.js' },
      { src: 'https://code.jquery.com/ui/1.12.1/jquery-ui.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.1/moment-with-locales.min.js' },
      { src: '../javascripts/Polyfill/find.js' },
    ]
  },
  loading: {
    color: '#3B8070'
  },
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    // proxyHeaders: false
  },
  build: {
    vendor: ['vue-swal'],
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: ['~/plugins/vue-swal'],
  // router: {
  //   base: '/moeaidbMapNuxt/'
  // },
  generate: {
    minify: {
      minifyJS: false,
    }
  }
}
