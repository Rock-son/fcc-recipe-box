const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const VENDOR_LIBS = ['react', 'react-dom'];

const config = {
    entry: {

    },
    output: {

    },
    module: {
        rules: [

        ]
    },
    plugins: [
        new ExtractTextPlugin.extract({filename: 'style.css'})
    ]

}

module.exports = config;