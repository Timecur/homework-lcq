const webpack = require('webpack')
const cookiejar = require('cookiejar')
const moment = require('moment')

const VersionPlugin = require('@ipalfish/version-control-plugin')

let cookie

function relayRequestHeaders(proxyReq, req) {
  Object.keys(req.headers).forEach((key) => {
    proxyReq.setHeader(key, req.headers[key])
  })
  if (cookie) {
    proxyReq.setHeader('cookie', cookie)
  }
}

function relayResponseHeaders(proxyRes) {
  const setCookieHeaders = proxyRes.headers['set-cookie'] || []
  const modifiedSetCookieHeaders = setCookieHeaders
    .map(str => new cookiejar.Cookie(str))
    .map((item) => {
      item.secure = false
      return item
    })
    .map(item => item.toString())
  proxyRes.headers['set-cookie'] = modifiedSetCookieHeaders
  proxyRes.headers['Access-Control-Allow-Credentials'] = true
  proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  proxyRes.headers['Access-Control-Allow-Methods'] = 'PUT, POST, GET, DELETE, OPTIONS'
}

if (process.env.NODE_ENV !== 'localdev') {
  const VERSION = new Date().getTime()
  process.env.VERSION = VERSION
  console.log('set version', process.env.VERSION)
}

module.exports = {
  publicPath: process.env.VUE_APP_BASE_PATH,
  outputDir: 'build',
  configureWebpack: (config) => {
    config.output = {
      ...config.output,
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
    }
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [
        ...config.plugins,
      ]
    }
    if (process.env.NODE_ENV !== 'localdev') {
      config.plugins = [
        ...config.plugins,
        new webpack.IgnorePlugin(/env/),
        // 设置版本
        new VersionPlugin({ version: process.env.VERSION }),
      ]
    }
  },
  devServer: {
    // 接口代理设置
    proxy: {
      '/api': {
        target: process.env.VUE_APP_AXIOS_BASE_URL,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
        cookieDomainRewrite: {
          '*': 'localhost', // 把相应的 cookie 域都设置成 localhost
        },
        cookiePathRewrite: {
          '*': '/',
        },
        secure: false,
        onProxyReq: relayRequestHeaders,
        onProxyRes: relayResponseHeaders,
      },
    },
  },
}
