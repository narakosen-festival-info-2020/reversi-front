module.exports = {
	devServer: {
		proxy: "http://localhost:80"
	},  productionSourceMap: false,
  chainWebpack: config => {
      config.plugins.delete('html')
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
      config.output.filename('js/[name].js')
			config.output.chunkFilename('js/[id].js')
  }
};