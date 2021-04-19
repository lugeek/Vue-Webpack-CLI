# vue-从零搭建

1. `nvm use 15.14.0` 切换到最新的Node，NPM7.7.6
2. `npm init -y` 初始化node工程
3. `npm install -P vue` vue.js
4. `npm install -D vue-template-compiler@xxx` 模板预编译为渲染函数（template => ast => render），和vue版本一致。
5. `npm install -D vue-loader` Vue单文件组件
    1. 通过`npm list —depth=2`可以看到依赖
    2. touch webpack.config.js
    3. mkdir public
    4. mkdir src
    5. mkdir dist
6. `npm install -D webpack webpack-cli` 安装webpack
    1. webpack.config.js 

    ```jsx
    const path = require('path');

    module.exports = {
        entry: "./src/main.js", // 定义入口文件
        output: {
            path: path.resolve(__dirname, "dist"), // 打包生成文件地址，必须是绝对路径
            filename: "[name].build.js", // 生成的文件名 main.build.js
        },
    };
    ```

    1. public/index.html

    ```jsx
    <!DOCTYPE html>
    <html lang="">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width,initial-scale=1.0" />
            <title>demo</title>
        </head>
        <body>
            <noscript>
                <strong
                    >We're sorry but demo doesn't work properly without JavaScript
                    enabled. Please enable it to continue.</strong
                >
            </noscript>
            <div id="app"></div>
            <!-- built files will be auto injected -->
            <script src="../dist/main.build.js"></script>
        </body>
    </html>
    ```

    2. src/main.js 

    ```jsx
    console.log('Hello Webpack');
    ```

    3. package.json 

    ```jsx
    {
      "name": "NoCliDemo",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack --mode=production"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {
        "vue": "^2.6.12"
      },
      "devDependencies": {
        "vue-loader": "^15.9.6",
        "vue-template-compiler": "^2.6.12",
        "webpack": "^5.32.0",
        "webpack-cli": "^4.6.0"
      }
    }
    ```

    4. `npm run build` 构建出 dist/main.bundle.js

7. `npm install -D clean-webpack-plugin` 用于删除旧的dist中的build产物
    1. webpack.config.js

    ```jsx
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');

    module.exports = {
        plugins: [
    				// ......
            // dist清理build产物
            new CleanWebpackPlugin(),
        ],
    };
    ```

8. `npm install -D html-webpack-plugin` html生成，插入js和css
    1. webpack.config.js

    ```jsx
    const path = require("path");
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    const HtmlWebpackPlugin = require("html-webpack-plugin");

    module.exports = {
        entry: "./src/main.js", // 定义入口文件
        output: {
            path: path.resolve(__dirname, "dist"), // 打包生成文件地址，必须是绝对路径
            filename: "[name].bundle.js", // 生成的文件名
        },
        plugins: [
            // 根据template合成index.html，自动引入js和favicon
            new HtmlWebpackPlugin({
                filename: "index.html", // 生成的文件名
                template: "public/index.html", // 模板html
                favicon: "public/favicon.ico", // 图标
                title: "NoCliDemo",
            }),
            // dist清理build产物
            new CleanWebpackPlugin(),
        ],
    };
    ```

    2. public/index.html 

    ```jsx
    <!DOCTYPE html>
    <html lang="">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width,initial-scale=1.0" />
            <title><%= htmlWebpackPlugin.options.title %></title>
        </head>
        <body>
            <noscript>
                <strong
                    >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript
                    enabled. Please enable it to continue.</strong
                >
            </noscript>
            <div id="app"></div>
            <!-- built files will be auto injected -->
        </body>
    </html>
    ```

    3. dist/index.html 引入了title、favicon、script

    ```jsx
    <!DOCTYPE html>
    <html lang="">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width,initial-scale=1.0" />
            <title>NoCliDemo</title>
        <link rel="icon" href="favicon.ico"><script defer src="main.bundle.js"></script></head>
        <body>
            <noscript>
                <strong
                    >We're sorry but NoCliDemo doesn't work properly without JavaScript
                    enabled. Please enable it to continue.</strong
                >
            </noscript>
            <div id="app"></div>
            <!-- built files will be auto injected -->
        </body>
    </html>
    ```

9. `npm install -D webpack-dev-server` 热重载本地服务
    1. webpack.config.js 

    ```jsx
    module.exports = {
        devServer: {
            contentBase: path.join(__dirname, "dist"), // html所在路径
            compress: true, // 是否压缩
            port: 3000, // 端口
            hot: true, // 热部署
            open: true, // 打包完成后自动打开网页
        },
    };
    ```

    2. package.json

    ```jsx
    "scripts": {
        "serve": "webpack serve --mode=development"
      },
    ```

    3. `npm run serve` 启动

10. 配置vue-loader
    1. webpack.config.js 

    ```jsx
    const path = require("path");
    const { VueLoaderPlugin } = require("vue-loader");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const { CleanWebpackPlugin } = require("clean-webpack-plugin");

    module.exports = {
        entry: "./src/main.js", // 定义入口文件
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
        ],
        devServer: {
            contentBase: path.join(__dirname, "dist"), // html所在路径
            compress: true, // 是否压缩
            port: 3000, // 端口
            hot: true, // 热部署
            open: true, // 打包完成后自动打开网页
        },
    };
    ```

    2. src/App.vue 

    ```jsx
    <template>
        <div class="example">{{ msg }}</div>
    </template>

    <script>
    export default {
        data() {
            return {
                msg: "Hello vue!",
            };
        },
    };
    </script>

    <style>
    .example {
        color: red;
    }
    </style>
    ```

    3. src/main.js 

    ```jsx
    import Vue from "vue";
    import App from "./App.vue";

    new Vue({
        el: "#app",
        render: (h) => h(App),
    });
    /*
    new Vue({
      render: function (createElement) {
        return createElement(App);
      },
    });
    缩写：
    new Vue({
      render(createElement) {
        return createElement(App);
      },
    });
    缩写：
    new Vue({
      render: (h) => h(App),
    });
    */
    ```

    4. `npm run serve` 报错，style无法加载

11. `npm install -D css-loader style-loader vue-style-loader` css插件，vue-style-loader是fork自style-loader，多了服务端渲染能力。
    1. webpack.config.js 

    ```jsx
    module.exports = {
        // ...
        module: {
            rules: [
                // ... 其它规则
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                },
                // 它会应用到普通的 `.css` 文件
                // 以及 `.vue` 文件中的 `<style>` 块
                {
                    test: /\.css$/,
                    use: ["vue-style-loader", "css-loader"],
                },
            ],
        },
    };
    ```

12. `npm install -D file-loader url-loader` 图片插件，url-loader是基于file-loader的封装，对小图进行encode，不需要进行网络请求了。
    1. webpacl.config.js 

    ```jsx
    module: {
        rules: [
            // ... 其它规则
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"],
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
        ],
    },
    ```

    2. src/App.vue 

    ```jsx
    <template>
        <div class="example">{{ msg }} <img :src="url" /></div>
    </template>

    <script>
    import logo from './assets/logo.png';
    export default {
        data() {
            return {
                msg: "Hello vue!",
                url: logo
            };
        },
    };
    </script>

    <style>
    .example {
        color: red;
    }
    </style>
    ```

    3. result , 图片被encode了

    ```jsx
    <div class="example">Hello vue! <img src="data:image/png;base64,iVBO....."></div>
    ```

13. Babel
    1. `npm install -D @babel/core @babel/cli @babel/preset-env babel-loader` babel
        1. origin 

        ```jsx
        /* --- 箭頭函式、ES6 變數、ES6 陣列方法 --- */
        let color = [1, 2, 3, 4, 5];
        let result = color.filter((item) => item > 2);

        /* --- Class 語法糖 --- */
        class Circle {}

        /* --- Promise 物件 --- */
        const promise = Promise.resolve();

        export default function getData() {
            return new Promise((resolve, reject) => {
                resolve("ok");
            });
        }
        ```

        2. before 

        ```jsx
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ getData)\n/* harmony export */ });\n/* --- 箭頭函式、ES6 變數、ES6 陣列方法 --- */\nlet color = [1, 2, 3, 4, 5];\nlet result = color.filter((item) => item > 2);\n\n/* --- Class 語法糖 --- */\nclass Circle {}\n\n/* --- Promise 物件 --- */\nconst promise = Promise.resolve();\n\nfunction getData() {\n    return new Promise((resolve, reject) => {\n        resolve(\"ok\");\n    });\n}\n\n\n//# sourceURL=webpack://NoCliDemo//production/./src/api.js?");
        ```

        3. webpack.config.js

        ```jsx
        module: {
            rules: [
                // ... 其它规则
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader",
                    },
                },
            ],
        },
        ```

        4. babel.config.json , @babel/preset-env包含所有最新规范，等价于'env'

        ```jsx
        {
            "presets": [
                [
                    "@babel/preset-env"
                ]
            ]
        }
        ```

        4. after 

        ```jsx
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () =>
                /* binding */ getData /* harmony export */,
        });
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        /* --- 箭頭函式、ES6 變數、ES6 陣列方法 --- */ var color = [1, 2, 3, 4, 5];
        var result = color.filter(function (item) {
            return item > 2;
        });
        /* --- Class 語法糖 --- */ var Circle = function Circle() {
            _classCallCheck(this, Circle);
        };
        /* --- Promise 物件 --- */ var promise = Promise.resolve();
        function getData() {
            return new Promise(function (resolve, reject) {
                resolve("ok");
            });
        } //# sourceURL=webpack://NoCliDemo//production/./src/api.js?
        ```

        5. 这种方式‘⇒'被替换了，babel只负责对语法进行编译，不转换新的API包括，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象。

    2. `npm install -P core-js regenerator-runtime/runtime` @babel/polyfill
        1. babel.config.json

        ```jsx
        {
          "presets": [
            [
              "@babel/preset-env",
              {
                "useBuiltIns": "entry"
              }
            ]
          ]
        }
        ```

        2. 在代码上方import 

        ```jsx
        import "core-js/stable";
        import "regenerator-runtime/runtime";

        const promise = Promise.resolve();
        ```

        3. entry会将所有的 polyfill 全部引入，这样会导致结果的包大小非常大，不推荐

    3. `npm install -P core-js@3` 使用usage方式
        1. babel.config.json 

        ```jsx
        {
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "useBuiltIns": "usage",
                        "corejs": {
                            "version": 3,
                            "proposals": true
                        }
                    }
                ]
            ]
        }
        ```

        2. after 

        ```jsx
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () =>
                /* binding */ getData /* harmony export */,
        });
        /* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js"
        );
        /* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__
        );
        /* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            /*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js"
        );
        /* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__
        ); /* harmony import */
        var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
            /*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js"
        );
        /* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(
            core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_2__
        );
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        /* --- 箭頭函式、ES6 變數、ES6 陣列方法 --- */ var color = [1, 2, 3, 4, 5];
        var result = color.filter(function (item) {
            return item > 2;
        });
        /* --- Class 語法糖 --- */ var Circle = function Circle() {
            _classCallCheck(this, Circle);
        };
        /* --- Promise 物件 --- */ var promise = Promise.resolve();
        function getData() {
            return new Promise(function (resolve, reject) {
                resolve("ok");
            });
        } //# sourceURL=webpack://NoCliDemo//production/./src/api.js?
        ```

        3. result: 这种方式方便……

    4. `npm install -D @babel/plugin-transform-runtime`
        1. `npm install -P @babel/runtime`

            ```jsx
            {
                "presets": [
                    [
                        "@babel/preset-env",
                        {
                            "useBuiltIns": "false"
                        }
                    ]
                ],
                "plugins": [
                    [
                        "@babel/plugin-transform-runtime",
                        {
                            "corejs": false,
                            "helpers": true,
                            "regenerator": true
                        }
                    ]
                ]
            }
            ```

        2. `npm install -P @babel/runtime-corejs2`

            ```jsx
            {
                "presets": [
                    [
                        "@babel/preset-env",
                        {
                            "useBuiltIns": "false"
                        }
                    ]
                ],
                "plugins": [
                    [
                        "@babel/plugin-transform-runtime",
                        {
                            "corejs": 2,
                            "helpers": true,
                            "regenerator": true
                        }
                    ]
                ]
            }
            ```

        3. `npm install -P @babel/runtime-corejs3`

            ```jsx
            {
                "presets": [
                    [
                        "@babel/preset-env",
                        {
                            "useBuiltIns": "false"
                        }
                    ]
                ],
                "plugins": [
                    [
                        "@babel/plugin-transform-runtime",
                        {
                            "corejs": 3,
                            "helpers": true,
                            "regenerator": true
                        }
                    ]
                ]
            }
            ```

            4. babel@7中，preset-env可以同时转换Syntax 和 API，通过useBuiltIns控制。

            5. runtime适合开发库，因为是引入局部变量；preset-env适合开发application

14. `npm install -D mini-css-extract-plugin` 将 CSS 提取到单独的文件中
    1. webpack.config.js 

    ```jsx
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    module.exports = {
        entry: "./src/main.js", // 定义入口文件
        output: {
            path: path.resolve(__dirname, "dist"), // 打包生成文件地址，必须是绝对路径
            filename: "[name].bundle.js", // 生成的文件名
        },
        module: {
            rules: [
                // ... 其它规则
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
            ],
        },
        plugins: [
            // ....
            // css提取到单独文件
            new MiniCssExtractPlugin({
                filename: "style.css",
            }),
        ],
    };
    ```

    2. 增加main.css 

    ```jsx
    .mini-css-extract {
        color: #FFF;
    }
    ```

    3. main.js 导入 

    ```jsx
    import './main.css'
    ```

    4. `npm run build` 生成 `style.css` 

    ```jsx
    .example {
        color: red;
    }

    .mini-css-extract {
        color: #FFF;
    }
    ```

    5. html中自动添加css 

    ```jsx
    <link href="style.css" rel="stylesheet">
    ```

15. `npm install -D webpack-merge` 开发环境/生产环境配置分离
    1. `mkdir build` 
    2. `touch webpack.base.conf.js` 基础公共配置 

    ```jsx
    const path = require("path");

    const { VueLoaderPlugin } = require("vue-loader");
    const HtmlWebpackPlugin = require("html-webpack-plugin");

    module.exports = {
        entry: "./src/main.js", // 定义入口文件
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
    ```

    3. `touch webpack.dev.conf.js` 开发环境配置 

    ```jsx
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
                    use: ["vue-style-loader", "css-loader"],
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
    ```

    4. `touch webpack.prod.conf.js` 生产环境配置 

    ```jsx
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
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
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
    ```

    5. package.json 配置 

    ```jsx
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "webpack --config ./build/webpack.prod.conf.js",
      "dev": "webpack --config ./build/webpack.dev.conf.js",
      "serve": "webpack serve --config ./build/webpack.dev.conf.js"
    }
    ```

16. `npm install -D less less-loader` less加载
    1. webpack.dev.conf.js 

    ```jsx
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ["vue-style-loader", "css-loader", "less-loader"],
            },
        ],
    },
    ```

    2.  webpack.prod.conf.js 

    ```jsx
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
        ],
    },
    ```

    3. 测试 

    ```jsx
    // App.vue - <style>
    <style lang="less" scoped>
    @bb: 100rem;
    .example {
        color: red;
    }
    .style-less {
        height: 100/@bb;
    }
    </style>

    // main2.less
    @b: 46.875rem;

    .less-test {
        width: 100/@b;
    }

    // result
    .example[data-v-7ba5bd90] {
      color: red;
    }
    .style-less[data-v-7ba5bd90] {
      height: 100/100rem;
    }

    .mini-css-extract {
      color: #FFF;
    }

    .less-test {
      width: 100/46.875rem;
    }
    ```

17. `npm install -D postcss-loader autoprefixer` 自动为css增加前缀
    1. webpack.config 

    ```jsx
    module: {
            rules: [
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
    ```

    2. postcss.config.js 

    ```jsx
    module.exports = {
        plugins: [require("autoprefixer")],
    };
    ```

    3. 测试 

    ```jsx
    /* autoprefix test */
    ::placeholder {
        color: gray;
    }

    // 结果
    /* autoprefix test */
    ::-moz-placeholder {
      color: gray;
    }
    :-ms-input-placeholder {
      color: gray;
    }
    ::placeholder {
      color: gray;
    }
    ```

18. `npm install -D browserslist` 浏览器和node版本适配，可以共享给其他工具，比如`autoprefixer` 
    1. package.json 

    ```jsx
    // autoprefixer 会自动读取browserslist配置，添加需要兼容的前缀。
    "browserslist": [
      "android >= 4.0",
      "ios_saf >= 7.0"
    ]
    ```

    2. 测试 

    ```jsx
    .browserslist-autoprefix {
        display: flex;
        filter: blur(5px);
    }

    //result
    .browserslist-autoprefix {
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      -webkit-filter: blur(5px);
      filter: blur(5px);
    }
    ```

19. `npm install -P vue-router` 路由
    1. 新建两个子页面，Home和About 

    ```jsx
    // about
    <template>
      <div>
        <h1>{{ title }}</h1>
      </div>
    </template>

    <script>
      export default {
        data() {
          return {
            title: 'This is an about page',
          };
        },
      };
    </script>
    ```

    2. 新建routes配置 

    ```jsx
    // /src/routes.js
    import Home from './Home/App.vue';

    const routes = [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('./About/About.vue'), // 懒加载
      },
    ]

    export default routes;
    ```

    3. 新建App.vue 

    ```jsx
    <template>
        <div>
            <h1>Hello App!</h1>
            <p>
                <!-- 使用 router-link 组件来导航. -->
                <!-- 通过传入 `to` 属性指定链接. -->
                <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
                <router-link to="/">Go to Home</router-link>
                <router-link to="/about">Go to About</router-link>
            </p>
            <router-view></router-view>
        </div>
    </template>

    <script>
    export default {
        data() {
            return {};
        },
    };
    </script>
    ```

    4. 新建index.js入口 

    ```jsx
    import Vue from "vue";
    import VueRouter from 'vue-router'
    import App from "./App.vue";
    import routes from "./routes";

    Vue.use(VueRouter);

    const router = new VueRouter({
        routes: routes,
    });

    new Vue({
        router, // ES6 缩写，等同于 router: router
        render: (h) => h(App),
    }).$mount("#app");
    ```

    5. webpack的entry配置 

    ```jsx
    // entry: "./src/Home/main.js", // 原先的入口文件
    entry: "./src/index.js", // router
    ```

20. `npm install -D eslint eslint-plugin-vue` eslint
    1. .eslintrc.js 

    ```jsx
    module.exports = {
        extends: [
            // add more generic rulesets here, such as:
            // 'eslint:recommended',
            "plugin:vue/vue3-recommended",
            // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
        ],
        rules: {
            // override/add rules settings here, such as:
            // 'vue/no-unused-vars': 'error'
        },
    };
    ```