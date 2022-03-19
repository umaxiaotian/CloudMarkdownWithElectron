/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */

module.exports = {
  ssr: false,
  target: 'static',
  head: {
    title: 'msdeditor',
    meta: [{ charset: 'utf-8' }]
  },
  loading: false,
  plugins: [

  ],
  buildModules: [
    '@nuxt/typescript-build'
  ],
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    preset: 'default',
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
    xhtmlOut: true,
    langPrefix: 'language-',
    quotes: '“”‘’',
    highlight (/* str, lang */) { return '' },
    use: [
      'markdown-it-emoji',
      'markdown-it-highlightjs',
      'markdown-it-plantuml',
      'markdown-it-multimd-table'
    ]
  },
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: '#1867c0',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c'
        }
      }
    }
  }
}
