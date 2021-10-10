// @ts-check

"use strict";

const {VueLoaderPlugin} = require("vue-loader");
const autoprefixer = require("autoprefixer");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const {VuetifyLoaderPlugin} = require("vuetify-loader");

const paths = {
    src: path.join(__dirname, "src"),
    public: path.join(__dirname, "public")
};

module.exports = (_env, argv) => {
    const isDev = argv.mode === "development";
    const isHot = Boolean(argv.hot);

    return /** @type {import("webpack").Configuration} */ ({
        mode: isDev ? "development" : "production",
        context: paths.src,
        entry: "./main.ts",
        output: {
            path: paths.public,
            filename: `assets/scripts/${isHot ? "[name]" : "[name]-[contenthash:8]"}.js`,
            chunkFilename: `assets/scripts/${isHot ? "[name]" : "[name]-[contenthash:8]"}.chunk.js`,
            publicPath: isHot ? "http://127.0.0.1:3000/" : "/",
            clean: true
        },
        module: {
            // See https://webpack.js.org/configuration/module/#modulenoparse.
            noParse: /^(vue|vue-router)$/u,
            rules: [
                // CSS.
                {
                    test: /\.css$/u,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [autoprefixer]
                                }
                            }
                        }
                    ]
                },
                // Vue. (Note: This rule must be listed before the HTML rule.)
                {
                    test: /\.vue$/u,
                    use: [
                        {
                            loader: "vue-loader",
                            options: {
                                compilerOptions: {
                                    whitespace: isDev ? "preserve" : "condense"
                                }
                            }
                        }
                    ]
                },
                // HTML.
                {
                    test: /\.html$/u,
                    use: [
                        {
                            loader: "html-loader"
                        }
                    ]
                },
                // JavaScript/TypeScript.
                {
                    test: /\.[jt]s$/u,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                appendTsSuffixTo: [/\.vue$/u],
                                transpileOnly: true
                            }
                        }
                    ],
                    include: paths.src
                },
                // Sass.
                {
                    test: /\.s[ac]ss$/u,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [autoprefixer]
                                }
                            }
                        },
                        {
                            loader: "resolve-url-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                }
            ]
        },
        resolve: {
            alias: {
                "@": paths.src
            },
            extensions: [".mjs", ".ts", ".vue", "..."]
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    configFile: path.join(__dirname, "tsconfig.json"),
                    extensions: {
                        vue: {
                            enabled: true,
                            compiler: "@vue/compiler-sfc"
                        }
                    }
                }
            }),
            new HtmlWebpackPlugin({
                template: path.join(paths.src, "index.html")
            }),
            new MiniCssExtractPlugin({
                filename: `assets/styles/${isHot ? "[name]" : "[name]-[contenthash:8]"}.css`,
                chunkFilename: `assets/styles/${
                    isHot ? "[name]" : "[name]-[contenthash:8]"
                }.chunk.css`
            }),
            new VueLoaderPlugin(),
            new VuetifyLoaderPlugin({styles: "expose"})
        ].filter(Boolean),
        optimization: {
            minimizer: ["...", new CssMinimizerPlugin()],
            runtimeChunk: {
                name: "runtime"
            },
            splitChunks: {
                chunks: "all",
                maxSize: 100000
            }
        },
        // The css-minimizer-webpack-plugin will not generate source maps when using `eval-*` values.
        devtool: isDev ? "source-map" : "hidden-source-map",
        devServer: {
            host: "127.0.0.1",
            port: 3000
        }
    });
};
