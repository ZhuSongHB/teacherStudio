const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
	chainWebpack: config => {
		// config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
		// 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
		config.resolve.alias
			// .set('@', resolve('src'))
			.set("assets", resolve("src/assets"))
			.set("components", resolve("src/components"))
			.set("views", resolve("src/views"))
			.set("network", resolve("src/network"))
			.set("common", resolve("src/common"));
	},
	configureWebpack: {
		output: {
			// 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
			filename: `js/[name].js`,
			chunkFilename: `js/[name].js`,
		},
	},
	// 测试
	publicPath: "/themes/default/public/assets/teacherstudio/",
	productionSourceMap: false,
};
