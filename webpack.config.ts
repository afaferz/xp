import * as path from 'path';
import * as webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader'
import HtmlWebpackPlugin = require('html-webpack-plugin')


import 'webpack-dev-server';

const isDev = process.env.NODE !== 'production'



export default function (env: any, argv: any) {
    const mode = argv.mode || 'development'

    const config: webpack.Configuration = {
        entry: {
            app: ['./src/index.ts']
        },
        mode: "development",
        module: {
            rules: [
                /* Loader para TS no geral (incluindo o lang="ts" do Vue) */
                {
                    exclude: /(node_modules)/,
                    test: /\.[tj]sx?$/,
                    loader: "ts-loader",
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        appendTsxSuffixTo: [/\.vue$/],
                        ignoreDiagnostics: [7031, 2345]
                    }
                },
                /* Loader do Vue */
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            scss: [
                                'vue-style-loader',
                                'css-loader',
                                'sass-loader',
                            ],
                            sass: [
                                'vue-style-loader',
                                'css-loader',
                                'sass-loader?indentedSyntax',
                            ],
                        },
                    },
                },
                {
                    test: /\.(scss|css|sass)$/,
                    use: ['vue-style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ]
                },
            ]
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js',
            publicPath:JSON.stringify(mode) === 'production' ? '/xp' : '/',
            chunkFilename: '[id].[chunkhash].js'
        },
        plugins: [
            /* Loader do Vue */
            new VueLoaderPlugin(),
            /* Definições de loader */
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(mode),
                BASE_URL: JSON.stringify(mode) === 'production' ? "'/xp'" : "'/'",
                __VUE_OPTIONS_API__: true,
                __VUE_PROD_DEVTOOLS__: true,
            }),
            /* config.plugin('html') */
            new HtmlWebpackPlugin({
                title: 'XP Blog',
                template: path.resolve(__dirname, 'public', 'index.html'),
            }),
        ],
        resolve: {
            alias: {
                '@': '/home/afaferz/dev/vue3/src',
                vue$: 'vue/dist/vue.runtime.esm-bundler.js',
            },

            extensions: ['*', '.tsx', '.ts', '.js', '.vue', '.json'],
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
            },
            historyApiFallback: true,
            hot: 'only',
            compress: true,
            port: 3000,
        },
        performance: {
            hints: false,
        },
    };

    return config
}

// if (process.env.NODE_ENV === 'production') {
//     config.plugins = (config.plugins || []).concat([
//         new webpack.DefinePlugin({
//             'process.env.NODE_ENV': JSON.stringify('production'),
//         }),
//         // new webpack.optimize.UglifyJsPlugin({
//         //     sourceMap: true,
//         //     compress: {
//         //         warnings: false,
//         //     },
//         // }),
//         new webpack.LoaderOptionsPlugin({
//             minimize: true,
//         }),
//     ]);
// }

// export default config;