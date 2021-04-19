const path = require("path");

const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // entry: "./src/Home/main.js", // 定义入口文件
    entry: "./src/index.js", // router
    output: {
        path: path.resolve(__dirname, "dist"), // 打包生成文件地址，必须是绝对路径
        filename: "[name].bundle.js", // 生成的文件名
    },
    module: {
        rules: [
            // ... 其它规则
            {
                test: /\.vue$/,
                loader: "vue-loader",
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
    ],
};
