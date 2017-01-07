var path = require('path');
var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
    devtool: 'eval',
    entry: {
        app: ['./src/core/bootstrap.js'],
    },
    output: {
        path: __dirname + '/build/',
        filename: 'bundle.js',
    },
    resolve: {
        root: __dirname + '/../',
        extensions: ['', '.js']
    },
    module: {
        noParse: [],
        loaders: [
            {
                test: /\.js$/,
                loaders: ['ng-annotate', 'babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin()
    ],
    devServer: {
        hot: true,
        inline: true,
        contentBase: './build/',
        watchOptions: {poll: 1000, ignored: /node_modules/}
    }
};

