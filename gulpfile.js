const { parallel, series, src, dest, watch } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const minifier = require("gulp-clean-css");
const rename = require("gulp-rename");

const browserSync = require("browser-sync").create();

function compileScss() {
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
  // .pipe(browserSync.reload({ stream: true }))
}

function html() {
  return (
    src("src/*.html", { allowEmpty: true })
      // .pipe(browserSync.reload({ stream: true }))
      .pipe(dest("./dist"))
  );
}

function js() {
  return src("src/js/**/*.js").pipe(uglify()).pipe(dest("./dist/js"));
}

exports.html = html;

function taskWatch() {
  // browserSync.init({ server: { baseDir: "dist" }, injectChanges: true });
  watch("src/*.html", html);
  watch("./src/scss/*.scss", compileScss);
  watch("./src/js/**/*.js", js);
}

exports.taskWatch = taskWatch;

exports.default = series(parallel(html), js, compileScss, taskWatch);
