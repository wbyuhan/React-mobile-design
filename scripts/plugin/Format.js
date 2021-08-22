const chalk = require("chalk")
const { join, resolve } = require('path');
const { existsSync, readFileSync } = require('fs')
const zlib = require("zlib")
const ui = require("cliui")()

const dir = './dist'
class FormatPlugin {
    constructor(options) {
        this.otpions = options
    }
    makeRow(a, b, c) {
        return ` ${a}\t      ${b}\t ${c}`;
    }
    filesize = (bytes) => {
        bytes = Math.abs(bytes);
        const radix = 1024;
        const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let loop = 0;

        // calculate
        while (bytes >= radix) {
            bytes /= radix;
            ++loop;
        }
        return `${bytes.toFixed(1)} ${unit[loop]}`;
    };
    getGzippedSize(asset) {
        const filepath = resolve(join(dir, asset.name));
        if (existsSync(filepath)) {
            const buffer = readFileSync(filepath);
            console.log('%c 🍷 this.filesize(zlib.gzipSync(buffer).length): ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', this.filesize(zlib.gzipSync(buffer).length));
            return this.filesize(zlib.gzipSync(buffer).length);

        }
        return this.filesize(0);
    }

    apply(compiler) {
            const options = this.options
                // console.log('%c 🥨 options: ', 'font-size:20px;background-color: #465975;color:#fff;', options);
            compiler.hooks.emit.tapAsync('FormatPlugin', (compilation, callback) => {
                        const orderedAssets = compilation.getAssets()
                        ui.div(
                            this.makeRow(chalk.cyan.bold(`File`), chalk.cyan.bold(`Size`), chalk.cyan.bold(`Gzipped`)) + `\n\n` + orderedAssets.map((asset) =>
                                this.makeRow(
                                    /js$/.test(asset.name) ?
                                    asset.suggested ? // warning for large bundle
                                    chalk.yellow(join(dir, asset.name)) :
                                    chalk.green(join(dir, asset.name)) :
                                    chalk.blue(join(dir, asset.name)),
                                    this.filesize(asset.size),
                                    this.getGzippedSize(asset),
                                )
                            ).join(`\n`)
                        )
                        console.log(
                                `${ui.toString()}\n\n  ${chalk.gray(
                    `Images and other types of assets omitted.`,
                )}\n`,
            );
            // callback()
        })

    }

}

module.exports = FormatPlugin