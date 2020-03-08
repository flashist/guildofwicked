const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

console.log("__dirname: " + __dirname);
const BUILD_DIR = "dist";
const DEV = true;

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