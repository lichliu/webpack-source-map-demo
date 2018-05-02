const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const clientConfig = require('./webpack.config.client')
const serverConfig = require('./webpack.config.server')

const readFile = (fs, file) => {
    try {
        return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
    } catch (e) { }
}

module.exports = function setupDevServer() {
    let bundle
    let template
    let clientManifest

    let ready
    const readyPromise = new Promise(r => { ready = r })
    const update = () => {
        if (bundle && clientManifest) {
            ready()
        }
    }

    // 在前端入口文件加入webpack-hot-middleware/client插件，也可以配置在webpack.config.client里
    for(let key in clientConfig.entry) {
        if (typeof clientConfig.entry[key]  == 'string') {
            clientConfig.entry[key] = ['webpack-hot-middleware/client', clientConfig.entry[key]]
        } else {
            clientConfig.entry[key].push('webpack-hot-middleware/client');
        }
    }
    clientConfig.output.filename = 'dev_static/[name].js'
    // 加入热更新所需插件
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

    // 使用dev middleware，将静态文件编译到内存中
    const clientCompiler = webpack(clientConfig)
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true
    })
    // todo 使用export
    global.devMiddleware = devMiddleware;

    clientCompiler.plugin('done', stats => {
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        if (stats.errors.length) return
        clientManifest = true
        // 将html文件写入到本地
        var files = devMiddleware.fileSystem.readdirSync(clientConfig.output.path);
        files.forEach((file) => {
            if(/\.html/i.test(file)) {
                fs.writeFileSync(path.join(clientConfig.output.path, file), readFile(devMiddleware.fileSystem, file))
            }
        })
        update()
    })
    // 使用热更新
    const hmr = require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 });
    // todo export
    global.hmr = hmr;
    // watch and update server renderer
    const serverCompiler = webpack(serverConfig)

    // 服务端代码编译
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err
        stats = stats.toJson()
        if (stats.errors.length) return
        bundle = true
        update()
    })

    return readyPromise
}