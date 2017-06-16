// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: 'http://static.hehenian.com/m/v5/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes: 
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // proxyTable:{},
    proxyTable: {
      '*': {
        target: 'http://m.hehenian.com',
        changeOrigin: true,
        filter: function (pathname, req) {
          return pathname.indexOf('.do') > -1;
        },
        onProxyRes(proxyRes, req, res) {//cookie 跨域问题
          var oldCookie = proxyRes.headers['set-cookie']
          if (oldCookie == null || oldCookie.length == 0) {
            delete proxyRes.headers['set-cookie']
            return;
          }
          var oldCookieItems = oldCookie[0].split(';')
          var newCookie = ''
          for (var i = 0; i < oldCookieItems.length; ++i) {
            if (newCookie.length > 0)
              newCookie += ';'
            // if (oldCookieItems[i].indexOf('domain=') >= 0)
            if (/domain=/i.test(oldCookieItems[i]))
              newCookie += 'domain=localhost'
            else
              newCookie += oldCookieItems[i]
          }
          console.log(newCookie)
          proxyRes.headers['set-cookie'] = [newCookie]
          // proxyRes.headers['x-addedygc'] = 'foobar';     // add new header to response 
          // delete proxyRes.headers['connection'];       // remove header from response 
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
