const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

console.log("__dirname: " + __dirname);
const BUILD_DIR = "dist";

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, BUILD_DIR),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin(
            [
                {
                    from: "src/index.html"
                }
            ]
        )
    ]
};