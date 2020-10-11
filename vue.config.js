const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  devServer: {
    proxy: "http://localhost:80"
  },
  publicPath: './',
  lintOnSave: true,
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  outputDir: process.env.NODE_ENV === 'production' ? 'release' : 'debug',
  pages: {
    index: {
      entry: './src/main.js',
      template: 'public/index.html',
      filename: 'index.html'

    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {

      config.optimization.delete('splitChunks')

      config.output
        .filename('[name].js')

      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit: 4096,
          name: 'img/[name].[ext]'
        })

      config.module
        .rule('svg')
        .test(/\.(svg)(\?.*)?$/)
        .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'img/[name].[ext]'
        })

      config.module
        .rule('media')
        .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit: 4096,
          name: 'media/[name].[ext]'
        })

      config.module
        .rule('fonts')
        .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit: 4096,
          name: 'fonts/[name].[ext]'
        })

      config.plugin('extract-css')
        .use(MiniCssExtractPlugin, [{
          filename: '[name].css',
          chunkFilename: ''
        }])

      config.plugin('html-index')
        .tap(args => {
          args[0].minify = {
            removeComments: false,
            collapseWhitespace: false,
            removeAttributeQuotes: false,
            collapseBooleanAttributes: false,
            removeScriptTypeAttributes: false
          };
          return args
        })
    }
  },
  configureWebpack: config => {}

}