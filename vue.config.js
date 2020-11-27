const path = require('path')
module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1272a2'
        },
        javascriptEnabled: true,
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
    .set('@', path.join(__dirname, 'src/'))
  },
  devServer: {
    // 设置代理
    proxy: {
      '/api': {
        target: 'https://api.isoyu.com/api/',//服务器地址
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
