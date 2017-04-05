const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = ['react', 'react-dom'];

const config = {
    entry: {
        build: path.join(__dirname, 'src', 'index.js'),
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[chunkhash].js',
        publicPath: 'build/'    // for 'url-loader' - it prepends output.publicPath' to the URL
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        //resolve-url-loader may be chained before sass-loader if necessary
                        use: ['css-loader', 'sass-loader']
                    })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {size: 40000} // size in bytes
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename: 'style.css'}),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: '../index.html'
        })

    ]
}

module.exports = config;