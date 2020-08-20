const gulp = require("gulp");
const paths = require("../config");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const rigger = require("gulp-rigger");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync");
const yargs = require("yargs");
const gulpif = require("gulp-if");

const argv = yargs.argv;
const production = !!argv.production;

module.exports = function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(plumber())
    .pipe(concat("general.js"))
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(rigger())
    .pipe(babel({presets: ["@babel/preset-env"]}))
    .pipe(gulpif(!production, sourcemaps.write("./maps/")))
    .pipe(rename({dirname: ''}))
    .pipe(gulpif(production, uglify()))
    .pipe(gulpif(production, rename({suffix: ".min"})))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.reload({
      stream: true
    }))
}
