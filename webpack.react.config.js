var path    	  = require('path'),
	webpack 	  = require('webpack');
	ExtractPlugin = require('extract-text-webpack-plugin');

var DEBUG = process.env.NODE_ENV !== 'production' ? true : false;

module.exports = {

	entry: [
		'webpack-dev-server/client?http://127.0.0.1:8080/',
        'webpack/hot/only-dev-server',
		'./public/client/index'
	],

	output: {
		path: path.join(__dirname, 'public/build'),
        filename: 'bundle.js'
	},

	resolve: {
		modulesDirectories: ['node_modules', 'bower_components'],
		extensions: ['', '.js', '.jsx', '.css']
	},

	module: {

		preLoaders: [{

			//group component imports
			test: /\.jsx?$/,
    		loader: 'baggage?[file].scss',
		}],

		loaders: [{

			//transpile/bundle js
			test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['react-hot', 'babel']
		},{

			//bundle sass
			test: /\.scss/,
            loader: DEBUG ? 'style!css!sass' : ExtractPlugin.extract('style', 'css!sass')
		},{

			//bundle css
			test: /\.css/,
            loader: DEBUG ? 'style!css' : ExtractPlugin.extract('style', 'css')
		},{

			//images and fonts
			test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
			loader: 'url-loader?limit=100000'
		}]
	},

	devtool: 'inline-source-map',

	plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractPlugin('bundle.css')
    ],

    devServer: {
        hot: true,
        host: '127.0.0.1',
        port: 8080,
        historyApiFallback: true
    }
};