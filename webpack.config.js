var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: {
        app: ['./src/core/bootstrap.js'],
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'bundle.js',
    },
    resolve: {
        root: __dirname + '/../',
        modulesDirectories: [__dirname + '/../angular-frontend/node_modules', 'node_modules'],
        alias: {
            'project': __dirname + '/../angular-frontend-dna/app',
            'shared': __dirname + '/app',
            'webpack-angular-examplecode': __dirname + '/src',
        },
        extensions: ['', '.js']
    },
    resolveLoader: {
        modulesDirectories: [__dirname + '/../angular-frontend/node_modules', 'node_modules'],
    },
    module: {
        noParse: [],
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    'ng-annotate',
                    'babel-loader?' + JSON.stringify({
                        presets: [
                            'babel-preset-es2015',
                            'babel-preset-react',
                            'babel-preset-stage-0',
                        ].map(require.resolve),
                        "plugins": [
                            "babel-plugin-add-module-exports"
                        ].map(require.resolve)
                    })],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: /index\.html$/
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            /*
             * Extract and compile LESS files to external CSS file
             */
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader!less-loader'
                ),
                exclude: /node_modules/
            },
            // todo: enable css modules for other paths / newer files - ?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?&name=fonts/[name].[ext]'
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                exclude: /node_modules/,
                loader: 'file?limit=1024&name=images/[name].[ext]'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: __dirname + '/../angular-frontend-dna/app/index.html'
        }),
        new ExtractTextPlugin('[name].[chunkhash].css' /*, {publicPath: '../'}*/),
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin()
    ],
    devServer: {
        hot: true,
        inline: true,
        contentBase: __dirname + '/dist/',
        watchOptions: {poll: 1000, ignored: /node_modules/}
    }
};

