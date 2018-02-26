/******************************************************************************
 *
 * Project: Commit Viewer
 * Description: Webpack config file
 *
 * 1 - Packages
 * 2 - Properties
 * 3 - Plugins
 * 		3.1 - Common
 * 		3.2 - Production
 * 4 - Config
 *
 *****************************************************************************/

/******************************************************************************
 * 1 - Packages
 *****************************************************************************/

var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

/******************************************************************************
 * 2 - Properties
 *****************************************************************************/

var title = "Commit Viewer";
var isProduction = process.env.NODE_ENV.trim() == "production";
var publicName = "CommitViewer";
var entry = "src/js/CommitViewer.js";
var plugins = [];

/******************************************************************************
 * 3 - Plugins
 *****************************************************************************/

/******************************************************************************
 * 3.1 - Common
 *****************************************************************************/

/**
 * Define Plugin:
 * To define a system wide variable that tells if we are inproduction
 * mode or not, as well as the base image path to be used.
 * This is needed because in OutSystems we are storing the
 * images in a different path then we use locally.
 */
plugins.push(
	new webpack.DefinePlugin({
		PRODUCTION: JSON.stringify(isProduction),
		"process.env.NODE_ENV": JSON.stringify(
			process.env.NODE_ENV || "development"
		)
	})
);

/**
 * Extract Text Plugin:
 * To extract text from the webpack build. In this case we are extracting the css to be included as a separate file.
 */
plugins.push(
	new ExtractTextPlugin({
		filename: "css/main.css",
		allChunks: true
	})
);

/**
 * HTML Plugin:
 * To generate a default index.html file to be used as the root file.
 */
plugins.push(
	new HtmlWebpackPlugin({
		title: title,
		template: "src/index.ejs",
		inject: false
	})
);

/******************************************************************************
 * 3.2 - Production
 *****************************************************************************/

if (isProduction) {
	/**
	 * Uglify Plugin: To uglify/minimize the code to be optimized and ready for production use
	 */
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false, // Suppress uglification warnings
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true
			},
			output: {
				comments: false
			},
			exclude: [/\.min\.js$/gi] // Skip pre-minified libs
		})
	);
}

/******************************************************************************
 * 4 - Config
 *****************************************************************************/

module.exports = {
	context: __dirname,
	devtool: isProduction ? false : "eval-source-map", // As documented here: https://webpack.js.org/configuration/devtool/
	resolve: {
		extensions: [".jsx", ".js", ".json"]
	},
	entry: path.resolve(__dirname, entry),
	output: {
		libraryTarget: "var",
		library: [publicName],
		path: path.resolve(__dirname, "build"),
		filename: "js/[name].js",
		sourceMapFilename: "js/[name].map"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader?sourceMap&minimize=true!postcss-loader!sass-loader?sourceMap",
				})
			}
		]
	},
	plugins: plugins
};
