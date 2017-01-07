var path = require('path');
var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
    devtool: 'eval',
    entry: {
        app: ['./src/core/bootstrap.js'],
    },
    output: {
        path: __dirname + '/../angular-frontend-dna/app/build/',
        filename: 'bundle.js',
    },
    resolve: {
        root: __dirname + '/../',
        modulesDirectories: [__dirname + '/../angular-frontend/node_modules', 'node_modules'],
        alias: {
            'project': __dirname + '/../angular-frontend-dna/app/',
            'shared': __dirname + '/app/',
            'webpack-angular-examplecode': __dirname + '/src/',
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
        contentBase: __dirname + '/../angular-frontend-dna/app/',
        watchOptions: {poll: 1000, ignored: /node_modules/}
    }
};

