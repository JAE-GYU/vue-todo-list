module.exports = {
    runtimeCompiler: true,
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
    configureWebpack: config => {
      config.devtool = "#source-map"
    },
    publicPath: '/',
    devServer: {
      port: 8080,
      proxy: { // proxyTable 설정
        '/': {          
          target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/': '/',
          },
        },       
      },
    },
  };
  