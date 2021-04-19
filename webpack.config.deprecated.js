const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/main.js", // 定义入口文件
    output: {
        path: path.resolve(__dirname, "dist"), // 打包生成文件地址，必须是绝对路径
        filename: "js/[name].bundle.js", // 生成的文件名
    },
    module: {
        rules: [
            // ... 其它规则
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            // 开发环境使用vue-style-loader，方便热重载
            // 生产环境使用MiniCssExtractPlugin，对css进行提取
            {
                test: /\.css$/,
                use: [
                    // process.env.NODE_ENV !== "production"
                    //     ? "vue-style-loader"
                    //     : MiniCssExtractPlugin.loader,
                    // ,
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
            },
            {
                // 图片
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    plugins: [
        // vue-loader
        new VueLoaderPlugin(),
        // 根据template合成index.html，自动引入js和favicon
        new HtmlWebpackPlugin({
            filename: "index.html", // 生成的文件名
            template: "public/index.html", // 模板html
            favicon: "public/favicon.ico", // 图标
            title: "NoCliDemo",
        }),
        // dist清理build产物
        new CleanWebpackPlugin(),
        // css提取到单独文件
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"), // html所在路径
        compress: true, // 是否压缩
        port: 3000, // 端口
        hot: true, // 热部署
        open: true, // 打包完成后自动打开网页
    },
};
