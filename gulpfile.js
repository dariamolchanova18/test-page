'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const autoprefixer = require('gulp-autoprefixer');

const buildSass = function() {
return gulp.src("src/scss/*.scss")
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
        browsers: ['> 0.1%'],
        cascade: false
    }))
    .pipe(cleanCSS({level: 2}))
    .pipe(gulp.dest("./dist/style"))
    .pipe(browserSync.stream());
};

const buildJs = function() {
    return gulp.src("src/js/*.js")
        .pipe(concat('script.js'))
        .pipe(minify({noSource: true}))
        .pipe(uglify({toplevel: true}))
        .pipe(gulp.dest("./dist/js"))
        .pipe(browserSync.stream());
};

const minImages = async () => {
    const files = await imagemin(['./src/img/**/*.{jpg,png}'], {
       destination: 'dist/img',
         plugins: [
            imageminJpegtran(),
            imageminPngquant({
                 quality: [0.5, 0.5]
            })
        ]
    });
}


gulp.task('cleanAll', function () {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
});


gulp.task('serve', function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch(['./src/img/**/*.{jpg,png}'], minImages)
    gulp.watch("src/**/*.js", buildJs);
    gulp.watch("src/**/*.scss", buildSass);
    gulp.watch("index.html").on('change', browserSync.reload);
});


gulp.task("imagemin", minImages);
gulp.task('compress', buildJs);
gulp.task('sass', buildSass );


gulp.task('build', gulp.series('cleanAll', gulp.parallel('imagemin', 'sass', 'compress')))
gulp.task('dev', gulp.series(gulp.parallel('imagemin', 'sass', 'compress'), 'serve'))