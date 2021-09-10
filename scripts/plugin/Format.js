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
    getGzippedSize(buffer) {
        return this.filesize(zlib.gzipSync(buffer).length);
    }

    apply(compiler) {
            const options = this.options
            compiler.hooks.emit.tapAsync('FormatPlugin', (compilation, callback) => {
                        const orderedAssets = compilation.getAssets()
                        ui.div(
                            this.makeRow(chalk.cyan.bold(`File`), chalk.cyan.bold(`Size`), chalk.cyan.bold(`Gzipped`)) + `\n\n` + orderedAssets.filter((item) => /js$/.test(item.name) || /css$/.test(item.name)).map((asset) =>
                                this.makeRow(
                                    /js$/.test(asset.name) ? chalk.green(join(dir, asset.name)) : /css$/.test(asset.name) ? chalk.blue(join(dir, asset.name)) : '',
                                    this.filesize(Buffer.byteLength(asset.source.source(), 'utf8')),
                                    this.getGzippedSize(asset.source.source()),
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