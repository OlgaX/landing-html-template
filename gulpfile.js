//NPM-MODULES
//--------------------------------------------------
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const changed = require('gulp-changed');
const pugInheritance = require('gulp-pug-inheritance');
const filter = require('gulp-filter');
const util = require('gulp-util');
const fs = require('fs-extra');

const is_prod = util.env.production;

//PATHs
//--------------------------------------------------
const src = './src/';
const dist = './dist/';

//TASK: gulp
//--------------------------------------------------
gulp.task('default', ['sass', 'js', 'pug'], function () {
  is_prod ? gulp.start('img') : gulp.start('browser-sync', 'watch');
});

//TASK: gulp watch
//--------------------------------------------------
gulp.task('watch', function() {
  gulp.watch(src + 'scss/**/*.scss', ['sass']);
  gulp.watch(src + 'js/**/*.js', ['js']);
  gulp.watch(src + 'pug/**/*.pug', ['pug']);
});

//TASK: gulp img
//--------------------------------------------------
gulp.task('img', function() {
  gulp.src(src + 'img/**/*')
    .pipe(plumber())
    .pipe(imagemin({progressive: true}))
    .pipe(gulp.dest(dist + 'img'));
});

//TASK: gulp sass
//--------------------------------------------------
gulp.task('sass', function () {
  gulp.src(src + 'scss/styles.scss')
    .pipe(plumber())
    .pipe(!is_prod ? sourcemaps.init() : util.noop())
    .pipe(sass())
    .pipe(rename({extname: '.min.css'}))
    .pipe(autoprefixer({browsers: ['last 50 versions']}))
    .pipe(is_prod ? cleanCSS({compatibility: 'ie8', keepSpecialComments: 1}) : util.noop() )
    .pipe(!is_prod ? sourcemaps.write() : util.noop())
    .pipe(gulp.dest(dist + 'css'))
});


//TASK: gulp js
//--------------------------------------------------
gulp.task('js', function() {
  return gulp.src(src + 'js/scripts.js')
    .pipe(plumber())
    .pipe(!is_prod ? sourcemaps.init() : util.noop())
    .pipe(rename({extname: '.min.js'}))
    .pipe(uglify())
    .pipe(!is_prod ? sourcemaps.write() : util.noop())
    .pipe(gulp.dest(dist + 'js'));
});

//TASK: gulp pug
//--------------------------------------------------
gulp.task('pug', function() {
  gulp.src(src + 'pug/**/*.pug')
    .pipe(plumber())
    .pipe(changed(dist, {extension: '.html'}))
    .pipe(pugInheritance({basedir: src + 'pug/', skip: 'node_modules'}))
    .pipe(filter(function (file) {
      return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(dist))
});

//TASK: gulp browser-sync
//--------------------------------------------------
//http://www.browsersync.io/docs/options/
gulp.task('browser-sync', function() {
  //watch files
  const files = [
    dist + 'css/*.css',
    dist + 'js/*.js',
    dist + '*.html'
  ];

  //initialize browsersync
  browserSync.init(files, {
    server: {
      baseDir: dist

    },
    injectChanges: true, //inject CSS changes
    notify: false
  });
});

// //TASK: gulp clean
// //--------------------------------------------------
// gulp.task('clean', function(){
//   return fs.remove(dist);
// });
//
// //TASK: gulp copy
// //--------------------------------------------------
// gulp.task('copy', ['clean'], function(){
//   gulp.src([src + 'fonts/**/*', src + 'vendor/**/*'])
//     .pipe(gulp.dest(dist))
// });