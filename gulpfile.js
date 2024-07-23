const { parallel, series, src, dest, watch } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
// const autoprefixer = require("gulp-autoprefixer");
const minifier = require("gulp-clean-css");
const rename = require("gulp-rename");

const browserSync = require("browser-sync").create();

function compileScss() {
  return (
    src("./src/scss/*.scss")
      .pipe(sass())
      // .pipe(autoprefixer())
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
      .pipe(dest("./dist/css"))
    // .pipe(browserSync.reload({ stream: true }))
  );
}

function html() {
  return (
    src("src/*.html", { allowEmpty: true })
      // .pipe(browserSync.reload({ stream: true }))
      .pipe(dest("./dist"))
  );
}

exports.html = html;

function taskWatch() {
  // browserSync.init({ server: { baseDir: "dist" }, injectChanges: true });
  watch("src/*.html", html);
  watch("./src/scss/*.scss", compileScss);
}

exports.taskWatch = taskWatch;

exports.default = series(parallel(html), compileScss, taskWatch);
