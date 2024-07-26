const { parallel, series, src, dest, watch } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const terser = require("gulp-terser");
const minifier = require("gulp-clean-css");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const replace = require("gulp-replace");

function html() {
  return src("src/*.html", { allowEmpty: true })
    .pipe(replace(/\.\.\/src\/img\//g, "./img/"))
    .pipe(replace(/\.\.\/dist\//g, "./"))
    .pipe(dest("./dist"));
}

function scss() {
  return src("./src/scss/*.scss")
    .pipe(sass())
    .pipe(minifier())
    .pipe(
      rename(function (path) {
        return {
          dirname: path.dirname + "",
          basename: path.basename + ".min",
          extname: ".css",
        };
      })
    )
    .pipe(dest("./dist/css"));
}

function js() {
  return src("./src/js/*.js")
    .pipe(replace(/\.\.\/src\/img\//g, "./img/"))
    .pipe(terser())
    .pipe(dest("./dist/js"));
}

function imgs() {
  return src("./src/img/*.png", { encoding: false })
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 2 }),
        imagemin.mozjpeg({ quality: 80, progressive: true }),
      ])
    )
    .pipe(dest("./dist/img"));
}

function taskWatch() {
  watch("src/*.html", html);
  watch("./src/scss/*.scss", scss);
  watch("./src/js/*.js", js);
  watch("./src/img/*.png", js);
}

exports.taskWatch = taskWatch;

exports.default = series(parallel(html), js, scss, imgs, taskWatch);
