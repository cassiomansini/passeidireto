var devFolder = 'devApp/'
  , buildFolder = 'build/'
  ;

var gulp        = require('gulp');
var concat      = require('gulp-concat');

// general modules
var plumber     = require('gulp-plumber');

// html modules

var htmlmin     = require('gulp-htmlmin');

// image modules

var imagemin    = require('gulp-imagemin');
var pngquant    = require('imagemin-pngquant');

// css modules
var stylus      = require('gulp-stylus');
var jeet        = require('jeet');
var nib         = require('nib');
var rupture     = require('rupture');
var koutoSwiss  = require('kouto-swiss');
var prefixer    = require('autoprefixer-stylus');
var sourcemaps  = require('gulp-sourcemaps');

// js modules
var uglify      = require('gulp-uglify');       // minifica js
var jshint      = require('gulp-jshint');       // modulo para validar javascript
var stripDebug  = require('gulp-strip-debug');  // remover os consoles.log para deploy
var stylish     = require('jshint-stylish');

// dev modules
var rename      = require('gulp-rename');
 
gulp.task('scripts', function() {
  return gulp.src(devFolder+'js/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(buildFolder+'assets/js'))
  ;
});

gulp.task('styles', function(){
  console.log()
  return gulp.src(devFolder+'stylus/include.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use:[nib(), koutoSwiss(), prefixer(), jeet(), rupture()],
      compress: true
    }))
    .pipe(rename("passeidireto.css"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildFolder+'assets/css/'))
  ;    
});

gulp.task('minifyHtml', function() {
  return gulp.src(devFolder+'*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeEmptyElements: false, removeEmptyAttributes: true, removeComments: true}))
    .pipe(gulp.dest(buildFolder))
});

gulp.task('images', function () {
  return gulp.src(devFolder+'img/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}, {cleanupIDs: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(buildFolder+'assets/img/'));
});

/////////////////////////////////////////////////////////////////////////

gulp.task('build', ['styles', 'minifyHtml', 'images', 'scripts']);

gulp.task('default', ['styles', 'minifyHtml', 'images', 'scripts'], function(){
  gulp.watch(devFolder+'stylus/**/*.styl', ['styles']);
  gulp.watch(devFolder+'*.html', ['minifyHtml']);
  gulp.watch(devFolder+'img/*', ['images']);
  gulp.watch(devFolder+'js/*', ['scripts']);
});