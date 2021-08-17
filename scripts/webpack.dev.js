const { merge } = require('webpack-merge')
const path = require('path')

const common = require('./webpack.common')
const { PROJECT_PATH, SERVER_HOST, SERVER_PORT } = require('./constant')

module.exports = merge(common, {
    mode: "development",
    target: 'web', // 配置 browserslist 字段会导致 webpack-dev-server 的热更新功能直接失效，为了避免这种情况需要给 webpack 配上 target 属性
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'js/[name].js',
        path: path.resolve(PROJECT_PATH, './dist')
    },
    devServer: {
        host: SERVER_HOST,
        port: SERVER_PORT,
        stats: 'errors-only',
        clientLogLevel: 'none',
        compress: true,
        open: true,
        hot: true,
        noInfo: true,
        historyApiFallback: {
            index: path.join(PROJECT_PATH, './public/index.html')
        },
    },
    optimization: {
        minimize: false,
        minimizer: [],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
        },
    },
})