const webpack = require('webpack');
const devMode = !(process.env.NODE_ENV === 'prod');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader')

const cssLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: true
    }
}
const lessLoader = {
    loader: 'less-loader',
    options: {
        sourceMap: true
    }
}

const sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: true
    }
}
const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: [
            require('autoprefixer')({"browsers": ["Android >= 4.4", "iOS >= 8", "ie >= 9", "firefox >= 15"]})
        ],
        sourceMap: true
    }
}
module.exports = {
    mode: devMode ? 'development' : 'production',
    resolve: {
        extensions: ['.vue', '.js']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: { presets: ['env'], plugins: ['transform-runtime'] }
            },
            {
                test: /\.less$/,
                use: [devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader, cssLoader, postcssLoader, lessLoader]
            },
            {
                test: /\.(sass|scss)$/,
                use: [devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader, cssLoader, postcssLoader, sassLoader]
            },
            {
                test: /\.css$/,
                use: [devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader, cssLoader, postcssLoader]
            },
            {
                test: /\.(png|jpg|svg|mp4|gif|eof)$/, 
                loader: 'url-loader', 
                options: {
                    limit: 4000,
                    name: devMode ? 'dev_static/assets/[name].[ext]' : 'static/assets/[name].[hash:8].[ext]',
                }
            },
            {
                test: /\.(ttf|ico)$/, loader: 'file-loader', options: {
                    name: devMode ? 'static/assets/[name].[ext]' : 'static/assets/[name]-[hash:8].[ext]',
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: devMode ? '"development"' : '"production"'
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'dev_static/css/[name].[hash:8].css',
            chunkFilename: '[id].css',
        }),
        new VueLoaderPlugin()
    ]
};
