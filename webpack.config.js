const path = require('path');
const webpack = require('webpack');


module.exports = {
	entry: path.resolve(__dirname, './src/main.js'),
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, './static')
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	]
}
