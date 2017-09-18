const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const PrerenderPlugin = require('prerender-spa-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = {
	entry: path.resolve(__dirname, '../src'),
	output: {
		filename: 'static/js/[name].js',
		path: path.resolve(__dirname, '../')
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	}
};

module.exports = (env) => Object.assign({}, common, {
	module: {
		rules: [
			...common.module.rules,
			{
				test: /\.vue$/,
				use: {
					loader: 'vue-loader',
					options: {
						loaders: {
							css: ExtractTextPlugin.extract({
								use: {
									loader: 'css-loader',
									options: {
										minimize: env === 'production'
									}
								},
								fallback: 'vue-style-loader'
							})
						}
					}
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: `"${env}"`
			}
		}),
		new ExtractTextPlugin('static/css/style.css'),
		new HtmlPlugin({
			template: path.resolve(__dirname, '../src/index.html'),
			filename: 'index.html',
			chunksSortMode: 'dependency',
			minify: env !== 'production' ? false : {
				html5: true,
				removeComments: true,
				keepClosingSlash: false,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				collapseBooleanAttributes: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true
			}
		}),
		...env !== 'production' ? [] : [
			new webpack.optimize.UglifyJsPlugin(),
			new PrerenderPlugin(path.resolve(__dirname, '../'), ['/']),
			new OfflinePlugin({
				AppCache: false
			})
		]
	]
});
