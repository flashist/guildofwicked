const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// CONSTANTS
const BUILD_DIR = "dist";
const NODE_MODULES_DIR = `${__dirname}/node_modules`;
//
const DEV = true;
console.log("NODE_MODULES_DIR: ", NODE_MODULES_DIR);

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".js", ".ts", ".json"],
        alias: {
            "fcore": path.resolve(NODE_MODULES_DIR, 'fcore/'),
            "fsuite": path.resolve(NODE_MODULES_DIR, 'fsuite/'),
            "fconsole": path.resolve(NODE_MODULES_DIR, 'fconsole/')
        }
    },
    output: {
        path: `${__dirname}/${BUILD_DIR}`,
        publicPath: `/${BUILD_DIR}/`,
        filename: 'bundle.js'
    },
    plugins: [
        new CopyPlugin(
            [
                {
                    from: "src/index.html"
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
        port: 9000,
        openPage: "index.html"
    };

} else {
    module.exports.mode = "production";
    module.exports.plugins.unshift(
        new CleanWebpackPlugin()
    );
}