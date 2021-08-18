const { merge } = require('webpack-merge')
const chalk = require('chalk');
const path = require('path')


const common = require('./webpack.common')
const PostCompile = require('post-compile-webpack-plugin')
const { PROJECT_PATH, SERVER_HOST, SERVER_PORT } = require('./constant')
const { REACT_APP_ENV, NODE_ENV } = process.env;
const proxy = require('./proxy');


// 定义自动获取本地ip的方法开始
const os = require('os');

function getNetworkIp() {
    let needHost = ''; // 打开的host
    try {
        // 获得网络接口列表
        let network = os.networkInterfaces();
        for (let dev in network) {
            let iface = network[dev];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address;
                }
            }
        }
    } catch (e) {
        needHost = 'localhost';
    }
    return needHost;
}

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
                open: false,
                hot: true,
                noInfo: true,
                // proxy: proxy['REACT_APP_ENV' || 'dev'],
                historyApiFallback: {
                    index: path.join(PROJECT_PATH, './public/index.html')
                },
                before: require('../mock/mock.server.js')
            },
            plugins: [
                    new PostCompile(() => {
                            console.log(`App running at:
 -Local:   ${chalk.green(`http://localhost:${SERVER_PORT}`)}
 -Network: ${chalk.green(`http://${getNetworkIp()}:${SERVER_PORT}`)}`);
        })
    ],
    optimization: {
        minimize: false,
        minimizer: [],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
        },
    },
})