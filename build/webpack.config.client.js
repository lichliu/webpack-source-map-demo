const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = !(process.env.NODE_ENV === 'prod');

module.exports = webpackMerge(webpackBaseConfig, {
    entry: {
        vendor: ['vue'],
        index: './src_fe/page/index/index.js',
    },
    output: {
        path: __dirname + '/../dist',
        filename: devMode ? 'static/js/[name].js' : 'static/js/[name]-[contenthash:8].js',
        publicPath: devMode ? '/' : '//s3.pstatp.com/toutiao/ex_index/',
    },
    target: 'web',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor'
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['vendor', 'index'],
            template: 'src_fe/page/index/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: '500.html',
            template: 'src_fe/page/500/index.html',
            chunks: []
        }),
        new HtmlWebpackPlugin({
            filename: '404.html',
            template: 'src_fe/page/404/index.html',
            chunks: []
        })
    ],
    devtool: devMode ? 'source-map' : 'no'
});
