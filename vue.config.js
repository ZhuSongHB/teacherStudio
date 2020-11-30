const path = require('path');
const resolve = dir => path.join(__dirname, dir);
module.exports = {
	chainWebpack: config => {
		config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
		// 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
		config.resolve.alias
			// .set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('views', resolve('src/views'))
			.set('network', resolve('src/network'))
			.set('common', resolve('src/common'));
	},
	// 测试
	publicPath: '/themes/default/public/assets/teacherstudio/',
	productionSourceMap: false,
};
