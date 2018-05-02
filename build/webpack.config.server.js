const webpack = require('webpack');
const webpackConfig = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const devMode = !(process.env.NODE_ENV === 'prod');

module.exports = webpackMerge(webpackConfig, {
    entry: {
        index: './src_fe/page/index/server.js',
    },
    target: 'node',
    devtool: '#cheap-module-source-map',
    output: {
        libraryTarget: 'commonjs2',
        path: __dirname + '/../dist',
        filename: '[name].js',
        publicPath: devMode ? '/' : '//s3.pstatp.com/toutiao/ex_index/',
    },
    externals: nodeExternals({
        whitelist: [/\.(css|less|jpg|png|mp4|gif|ttf|eof|scss|sass)$/,/\?vue&type=style/]
    }),
    optimization: {
        minimize: false
    }
});
