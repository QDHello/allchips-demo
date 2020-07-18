const path = require('path')
const name = "Vue Typescript Admin"
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-test-demo/' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  pwa: {
    name: name
  },
  // 第三方插件选项
  pluginOptions: {
    // 将样式文件注入多重引入模块，这样在文件中引用就不用通过import关键词来引用，需要同时安装插件style-resources-loader 和 vue-cli-plugin-style-resources-loader
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    },
    chainWebpack (config) {
      // Provide the app's title in webpack's name field, so that
      // it can be accessed in index.html to inject the correct title.
      config.set('name', name)
    }
  }
}