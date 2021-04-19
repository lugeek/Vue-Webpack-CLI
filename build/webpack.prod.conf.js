// 载入 webpack-merge (第一步)
const { merge } = require("webpack-merge");
// 载入需合并的配置项 (第二步)
const baseWebpackConfig = require("./webpack.base.conf");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(baseWebpackConfig, {
    mode: "production",
    devtool: "source-map",
    output: {
        filename: "js/[name].[hash].js", // 覆盖 baseWebpackConfig 配置
    },
    module: {
        rules: [
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            // 开发环境使用vue-style-loader，方便热重载
            // 生产环境使用MiniCssExtractPlugin，对css进行提取
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader", "postcss-loader"],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader", "postcss-loader"],
            },
        ],
    },
    plugins: [
        // dist清理build产物
        new CleanWebpackPlugin(),
        // css提取到单独文件
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
        }),
    ],
});
