"use strict";

const autoprefixer = require('autoprefixer');
const gulp = require("gulp");
const gutil = require("gulp-util");
const open = require("gulp-open");
const postcss = require('gulp-postcss');
const rimraf = require("rimraf");
const rev = require("gulp-rev");
const revReplace = require("gulp-rev-replace");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");


gulp.task("copy-font", cb => {
    return gulp.src([
        "./public/assets/*.woff2",
        "./public/assets/*.woff",
        "./public/assets/*.svg",
        "./public/assets/*.ttf",
        "./public/assets/*.eot"
    ])
    .pipe(gulp.dest("./output/assets"))
});

gulp.task("copy-png", cb => {
    return gulp.src(["./public/**/*.png"])
    .pipe(gulp.dest("./output"))
});

gulp.task("output-clean", cb => {
    rimraf("./output", cb);
});

gulp.task("revision", function(){
  return gulp.src(["./public/assets/**/*.js", "./public/assets/**/*.css"])
    .pipe(rev())
    .pipe(gulp.dest("./output/assets"))
    .pipe(rev.manifest())
    .pipe(gulp.dest("./output"))
});


gulp.task("rev", ["output-clean", "copy-font","copy-png", "revision"], function(){
  const manifest = gulp.src("./output/rev-manifest.json");

  return gulp.src("./public/*.html")
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest("./output"));
});


gulp.task("clean", cb => {
    rimraf("./public/assets", cb);
});

gulp.task("dist", [ "clean" ], cb => {
    webpack(require("./webpack.config.pro.js"), (err, stats) => {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString());
    });
});

gulp.task("dev", [ "clean" ], cb => {
    const config = require("./webpack.config.dev.js");
    const complier = webpack(config);

    new WebpackDevServer(complier, {
        publicPath: config.output.publicPath,
        proxy: config.devServer.proxy,
        hot: true,
        historyApiFallback: true,
        stats: { colors: true },
        contentBase: "./public"
    }).listen(3000, "localhost", err => {
        if (err) {
            throw new gutil.PluginError("webpack-dev-server", err);
        }
        const uri = "http://127.0.0.1:3000/";
        gutil.log("[webpack-dev-server]", uri);
        gulp.src("").pipe(open({ uri }));
    });
});
