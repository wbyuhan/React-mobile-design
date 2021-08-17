const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const WebpackBar = require('webpackbar') // 进度条

const { PROJECT_PATH } = require('./constant')
const { development, production } = require("./config/env")


const getCssLoaders = () => {

    const cssLoader = [
        development ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: "[local]--[hash:base64:5]"
                },
                sourceMap: development,
            }
        }
    ]
    production && cssLoader.push({
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    production && [
                        'postcss-preset-env',
                        {
                            autoprefixer: {
                                grid: true
                            }
                        }
                    ]
                ]
            }
        }
    })

    return cssLoader
}

module.exports = {

    entry: {
        app: path.resolve(PROJECT_PATH, './src/index.tsx')
    },
    output: {
        // ...other
        assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
        path: path.resolve(PROJECT_PATH, './dist'),
        publicPath: '/',
    },
    cache: {
        type: 'filesystem',
        allowCollectingMemory: true,
    },

    resolve: {
        alias: {
            '@': path.resolve(PROJECT_PATH, './src'),
            '@/components': path.resolve(PROJECT_PATH, './src/components'),
            '@/utils': path.resolve(PROJECT_PATH, './src/utils'),
        },
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [...getCssLoaders()]
            },
            {
                test: /\.less$/,
                use: [
                    ...getCssLoaders(),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: development,
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    ...getCssLoaders(),
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: development,
                        }
                    }
                ]
            },
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024,
                    },
                },
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2?)$/,
                type: 'asset/resource',
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(PROJECT_PATH, './public/index.html'),
            favicon: false
        }),
        new WebpackBar({
            name: 'Link Startou!!!',
            color: '#52c41a'
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
            },
        }),
        new CopyPlugin({
            patterns: [{
                context: 'public',
                from: '*',
                to: path.resolve(PROJECT_PATH, './dist/public'),
                toType: 'dir',
                globOptions: {
                    dot: true,
                    gitignore: true,
                    ignore: ['**/index.html'], // **表示任意目录下
                },
            }, ],
        }),
        new CleanWebpackPlugin(),
    ]
}