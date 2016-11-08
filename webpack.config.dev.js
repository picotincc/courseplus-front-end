"use strict";

const autoprefixer = require('autoprefixer');
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.resolve("./src"),

    entry: {
        vendor: [ "babel-polyfill", "jquery", "./base/lib/bootstrap.min.js", "sweetalert", "pingpp-js", "pubsub-js", "perfect-scrollbar" ],
        user: [ "./user/index.js", "./user/resource/index.less" ],
        home: [ "./home/index.js", "./home/resource/index.less" ],
        course: [ "./course/index.js", "./course/resource/index.less" ],
        pay: [ "./pay/index.js", "./pay/index.less" ]
    },

    output: {
        path: path.resolve("./public/assets"),
        publicPath: "/assets",
        filename: "[name]/bundle.js"
    },

    resolve: {
        extensions: [ "", ".js", ".less" ]
    },

    devtool: "source-map",

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [ "babel" ],
                include: path.join(__dirname, 'src/')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader")
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },

    postcss: [ autoprefixer() ],

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NoErrorsPlugin(),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            swal: "sweetalert",
            pingpp: "pingpp-js",
            PubSub: "pubsub-js",
            Ps: "perfect-scrollbar"
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: Infinity
        }),

        new ExtractTextPlugin("./[name]/resource/bundle.css")
    ],

    devServer: {
        proxy: {
            "http://118.178.137.101:8000/api/*": {
                "target": {
                  "host": "118.178.137.101",
                  "protocol": 'http:',
                  "port": 8000
                },
                ignorePath: false,
                changeOrigin: true,
                secure: false,
            }
        }
    }
};
