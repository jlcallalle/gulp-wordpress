var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber'); 
var browserSync = require('browser-sync').create();

// Project related.
var projectURL              = 'http://localhost:8888/wordpress/www/';  // Local project URL of your already running WordPress site. Could be something like local.dev or localhost:8888.
var projectPHPWatchFiles    = './**/*.php'; // Path to all PHP files.

  dir = {
    src: 'src', 
    dist: './', 
    nm: 'node_modules'
  },
  files = { 
    JS: [
      `${dir.nm}/jquery/dist/jquery.min.js`,
      `${dir.nm}/owl.carousel/dist/owl.carousel.min.js`
    ],
    frontCSS: '../../../frontend/public/css/main.css',
    fonts: [`${dir.nm}/font-awesome/fonts/*.*`]
  },
  imageminOptions = {
    optimizationLevel: 7,
    progressive: true
  };

gulp.task('default', ['css', 'js'], function() {
    browserSync.init({
        proxy: projectURL,
        open: true,
        injectChanges: true,
    });
    gulp.watch( projectPHPWatchFiles ).on('change', browserSync.reload);
    gulp.watch("./src/**/*.js", ['js']).on('change', browserSync.reload);
    gulp.watch("./src/scss/**/*.scss", ['css']);
   
});

// Compila css (Sass)
gulp.task('css', function(){
   return gulp.src('./src/scss/**/*.scss')
       .pipe(sourcemaps.init({ loadMaps: true }))
       .pipe(plumber())
       .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError)) //expanded, nested, compact, compressed 
       .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
       .pipe(sourcemaps.write('./'))
       .pipe(gulp.dest('./css'))
       .pipe(browserSync.stream());
});

// Compila js 
gulp.task('js', function () {
   gulp.src(`${dir.src}/js/*.js`)
     .pipe(gulp.dest('./js/'))
     .pipe(uglify())
     .pipe(rename({ extname: '.min.js' }))
     .pipe(gulp.dest('./js/'))
});


//compila recursos.js
gulp.task('js-recursos', () => {
  gulp
    .src( files.JS  )
    .pipe( concat('recursos.min.js') )
    .pipe( uglify() ) 
    .pipe( gulp.dest('./js') )
});

gulp.task('ruteo', function () {
   gulp.src(files.frontCSS)
     .pipe(rename('_frontend.scss'))
     .pipe(gulp.dest('./src/scss/'))
});


//optimiza imágenes
gulp.task('media', () => {
  gulp.src('./src/img/**/*.{png,jpg,jpeg,gif,svg,ico,webp,mp4,mp3}')
    .pipe(imagemin(imageminOptions))
    .pipe(gulp.dest('./img'))
})


gulp.task('files', ['js-recursos',,'ruteo','media']);

