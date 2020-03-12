const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// CONSTANTS
const BUILD_DIR = "dist";
const NODE_MODULES_DIR = `${__dirname}/node_modules`;
//
const DEV = true;
console.log("DEV: ", DEV);

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /node_modules[/\\]createjs/,
                loaders: [
                    'imports-loader?this=>window',
                    'exports-loader?window.createjs'
                ]
            }
        ],
    },
    resolve: {
        extensions: [".js", ".ts", ".json"],
        alias: {
            "createjs": path.resolve(NODE_MODULES_DIR, 'createjs/builds/1.0.0/createjs.js'),

            "fcore": path.resolve(NODE_MODULES_DIR, 'fcore/'),
            "fsuite": path.resolve(NODE_MODULES_DIR, 'fsuite/'),
            "fconsole": path.resolve(NODE_MODULES_DIR, 'fconsole/')
        }
    },
    output: {
        filename: 'bundle.js',
        publicPath: `/${BUILD_DIR}/`,
        path: path.resolve(__dirname, `${BUILD_DIR}`)
    },
    plugins: [
        new CopyPlugin(
            [
                {
                    from: "src/index.html"
                },
                {
                    from: "assets/*"
                },
                {
                    from: "assets/!(sources)/**"
                }
            ]
        )
    ]
};

if (DEV) {
    module.exports.mode = "development";
    module.exports.devtool = 'inline-source-map';
    module.exports.devServer = {
        contentBase: path.join(__dirname, `${BUILD_DIR}`),
        open: true,
        index: "index.html",
        port: 9000,
        compress: true,
        overlay: true
    };
    module.exports.watch = true;
    module.exports.watchOptions = {
        poll: true
    };

    console.log("DIST: ", path.join(__dirname, `${BUILD_DIR}`));

} else {
    module.exports.mode = "production";
    module.exports.plugins.unshift(
        new CleanWebpackPlugin()
    );
}