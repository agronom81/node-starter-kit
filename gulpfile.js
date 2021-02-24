const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const nodemon = require("gulp-nodemon");
const minify = require("gulp-minify");
const concat = require("gulp-concat");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const babel = require("gulp-babel");

sass.compiler = require("node-sass");

// Sass compilation
gulp.task("sass", function () {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 3 versions"],
      })
    )
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public/css"));
});

// Sass watching, depending on "sass" task
gulp.task("sass:watch", function () {
  gulp.watch("./src/scss/**/*.scss", gulp.series("sass"));
});

// js
gulp.task("js", function () {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(sourcemaps.init())
    .pipe(concat("app.js"))
    .pipe(minify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public/js"));
});

// JS watching, depending on "js" task
gulp.task("js:watch", function () {
  gulp.watch("./src/js/**/*.js", gulp.series("js"));
});

// Nodemon task:
// Start nodemon once and execute callback (browser-sync)
gulp.task("nodemon", (cb) => {
  let started = false;
  return nodemon({
    script: "app.js",
    ignore: ["gulpfile.js", "node_modules/"],
    ext: "pug js css",
  }).on("start", () => {
    if (!started) {
      cb();
      started = true;
    }
  });
});

// BrowserSync task:
// calls nodemon tasks and pass itself as callback
gulp.task(
  "browser-sync",
  gulp.series("nodemon", () => {
    browserSync.init(null, {
      proxy: "http://localhost:3000",
      files: ["public/**/*.*"],
      port: 5000,
    });
  })
);

// Dev Task:
// Parallel execution of browser-sync/nodemon
// and sass watching
gulp.task("default", gulp.parallel("browser-sync", "sass:watch", "js:watch"));
