var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function () {
    return gulp.src('app/css/**/*.css')
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('scripts', function () {
    return gulp.src('app/js/*.js')
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['browser-sync', 'css', 'scripts'], function () {
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/css/**/*.css', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'img', 'css', 'scripts'], function () {

    var buildCss = gulp.src('app/css/**/*')
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);