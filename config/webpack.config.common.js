process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const config = {
    entry: [
        // 'react-hot-loader/patch',
        './src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        //publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            templateContent: ({ htmlWebpackPlugin }) =>
                `<!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no">
                            <meta name="theme-color" content="#000000">
                            <!--
                              manifest.json provides metadata used when your web app is added to the
                              homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
                            -->
                            <link rel="manifest" href="manifest.json">
                            <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
                            <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
                            <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
                            <link
                                href="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css"
                                rel="stylesheet"
                            />
                            <title>Land Explorer</title>
                        </head>
                        <body>
                            <div id=\"root\"></div>
                        </body>
                    </html>`,
            filename: 'index.html',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    to: "../dist"
                }
            ],
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.svg$/,
                type: 'asset/resource'
            },
            {
                test: /\.jpg$/,
                type: 'asset/resource',
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        'static': {
            directory: './dist'
        }
    }
};

module.exports = config;