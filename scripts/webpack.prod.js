const path = require('path')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")

const common = require('./webpack.common')
const { PROJECT_PATH } = require('./constant')

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    target: 'browserslist',
    output: {
        filename: 'js/[name].[contenthash:8].js',
        path: path.resolve(PROJECT_PATH, './dist')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].chunk.css',
        })

    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    compress: { pure_funcs: ['console.log'] },
                }
            })
        ]
    }
})