var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {

    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {
        entry: {
            app: ['shared/init/initiate-project-index-and-angular.js'],
            analytics: ['shared/init/analytics.js'],
        },
        output: {
            path: __dirname + '/dist/',
            filename: 'bundle.[name].[hash].js',
        },
        resolve: {
            root: __dirname + '/../angular-frontend-dna/app',
            modulesDirectories: [__dirname + '/../angular-frontend/node_modules', 'node_modules'],
            alias: {
                'project': __dirname + '/../angular-frontend-dna/app',
                'shared': __dirname + '/app',
                'webpack-angular-examplecode': __dirname + '/src',
                'bower_components': __dirname + '/bower_components',
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
                    test: /\.json$/,
                    loader: 'json-loader'
                },
                {
                    test: /\.html$/,
                    loader: 'html',
                    exclude: /(index|stats)\.html$/
                },
                /*
                 * Extract and compile LESS+CSS files to external CSS file
                 */
                {
                    test: /\.less/,
                    loader: ExtractTextPlugin.extract(
                        'style-loader',
                        'css-loader!less-loader'
                    ),
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract(
                        'style-loader',
                        'css-loader'
                    ),
                    exclude: /node_modules/
                },
                // todo: enable css modules for other paths / newer files - ?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]
                /*
                 * Extract and include resources referenced in LESS/CSS-files in the build
                 */
                {
                    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[hash].[ext]'
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[hash].[ext]'
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?&name=fonts/[name].[hash].[ext]'
                },
                {
                    test: /\.(jpg|jpeg|gif|png)$/,
                    exclude: /node_modules/,
                    loader: 'file?limit=1024&name=images/[name].[hash].[ext]'
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url?limit=10000&mimetype=image/svg+xml&name=images/[name].[hash].[ext]'
                },
                /*
                 * Necessary to be able to use angular 1 with webpack https://github.com/webpack/webpack/issues/2049
                 */
                {
                    test: require.resolve('angular'),
                    loader: 'exports?window.angular'
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(['dist'], {
                root: __dirname,
                verbose: true,
                dry: false,
                //exclude: ['shared.js']
            }),
            new webpack.ProvidePlugin({
                'angular': 'angular',
                '_': 'lodash',
                'env': 'shared/scripts/env',
                '$': 'jquery', 'jQuery': 'jquery', 'window.jQuery': 'jquery',
            }),
            new HtmlWebpackPlugin({
                inject: 'body',
                template: __dirname + '/../angular-frontend-dna/app/index.html'
            }),
            new ExtractTextPlugin('[name].[chunkhash].css' /*, {publicPath: '../'}*/),
            new CopyWebpackPlugin([
                {context: './../angular-frontend-dna/app', from: '*.png'},
                {context: './../angular-frontend-dna/app', from: 'favicon.ico'},
                {context: './../angular-frontend-dna/app', from: 'manifest.json'},
                {context: './../angular-frontend-dna/app', from: 'browserconfig.xml'},
            ]),
            //new DashboardPlugin(), // TODO: Move to development-only setup or similar since webpack does not exit after build or --json when this is active
            new Visualizer()
        ],
        devServer: {
            port: 9000,
            hot: true,
            inline: true,
            contentBase: __dirname + '/dist/',
            watchOptions: {poll: 1000, ignored: /node_modules/}
        }

    };

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    if (isTest) {
        config.devtool = 'inline-source-map';
    } else if (isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'inline-source-map';
        //config.devtool = 'eval-source-map'; // Does not play nicely with chrome dev tools - sourcemaps are not understood correctly
    }

    // Add dev-specific plugins
    if (!isProd) {
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    }

    // Add build specific plugins
    if (isProd) {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            // Dedupe modules in the output
            new webpack.optimize.DedupePlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin()
        );
    }

    return config;

}();
