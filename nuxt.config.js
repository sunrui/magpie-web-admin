export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'magpie-web-admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui',
    // {src: '~plugins/down', ssr: false},
    {src: '~plugins/axios', ssr: false},
    {src: '~plugins/console', ssr: false},
    {src: '~plugins/https', ssr: false},
    {src: '~plugins/meta', ssr: false},
    {src: '~plugins/route', ssr: false},
    {src: '~plugins/stat', ssr: false},
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    // sass: ['@/assets/px2rem.scss'],
    less: [],
    stylus: []
  },
  proxy: [
    [
      '/api',
      {
        target: 'http://localhost:8080',
        // target: 'https://shop.lt.city/api',
        pathRewrite: {
          '^/api': '/',
          changeOrigin: true
        }
      }
    ]
  ],
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
  }
}
