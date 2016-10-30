"use strict";

const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.resolve("./src"),

    entry: {
        vendor: [ "jquery", "./base/lib/bootstrap.min.js", "sweetalert", "pingpp-js" ],
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

    // devtool: "source-map",

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [ "babel" ],
                include: path.join(__dirname, 'src/')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NoErrorsPlugin(),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            swal: "sweetalert",
            pingpp: "pingpp-js"
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
            "/api/*": {
                "target": {
                  "host": "118.178.137.101",
                  "protocol": 'http:',
                  "port": 8000
                },
                ignorePath: false,
                changeOrigin: true,
                secure: false,
                // headers: {
                //     "Referer": "http://music.163.com"
                // }
            }
        }
    }
};
