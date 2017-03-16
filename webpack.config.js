const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        bundle: "./app/app.js"
        // vendor: []
    },
    output: {
        path: path.resolve(__dirname, './dist/assets/'),
        publicPath: '/dist/assets/',
        filename: "[name].js"
    },
     devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react', 'es2015']
                        }
                    }

                ]
            }, {
                test: /(\.scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?sourceMap', 'sass-loader?sourceMap=map']
                })
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    "file-loader?name=images/[name].[ext]", {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new BitBarWebpackProgressPlugin()
    ]
}
