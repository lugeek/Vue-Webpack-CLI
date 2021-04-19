// 载入 webpack-merge (第一步)
const { merge } = require("webpack-merge");
// 载入需合并的配置项 (第二步)
const baseWebpackConfig = require("./webpack.base.conf");

const path = require("path");

module.exports = merge(baseWebpackConfig, {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    module: {
        rules: [
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            // 开发环境使用vue-style-loader，方便热重载
            // 生产环境使用MiniCssExtractPlugin，对css进行提取
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader", "less-loader", "postcss-loader"],
            },
            {
                test: /\.less$/,
                use: ["vue-style-loader", "css-loader", "less-loader", "postcss-loader"],
            },
        ],
    },
    plugins: [],
    devServer: {
        contentBase: path.join(__dirname, "dist"), // html所在路径
        compress: true, // 是否压缩
        port: 3000, // 端口
        hot: true, // 热部署
        open: true, // 打包完成后自动打开网页
    },
});
