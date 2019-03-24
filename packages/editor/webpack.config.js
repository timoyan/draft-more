const appPath = process.cwd();
const path = require('path');
const fs = require('fs');

const webpackEnv = "development";
const cssRegex = /\.css$/;

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    mode: webpackEnv,
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        publicPath: "/assets/",
        path: path.resolve(appPath, 'build')
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
        // modules: [paths.appNodeModules, paths.ownNodeModules]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: [/\.tsx?$/,/\.ts?$/], include: [resolveApp('src')], loader: require.resolve('awesome-typescript-loader') },
            {
                test: cssRegex, use: [require.resolve('style-loader'), require.resolve('css-loader')]
            }
        ]
    },
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        hot:true,
        compress: true,
        port: 9000
    }
};