var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    babel  = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});

gulp.task('css', function () {
    return gulp.src('app/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function () {
    return gulp.src('app/js/*.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/*.*')
        .pipe(gulp.dest('dist/fonts/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('json', function () {
    return gulp.src('app/**/*.json')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('libs', function () {
    return gulp.src('app/js/libs/*.js')
        .pipe(gulp.dest('dist/js/libs/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function () {
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('img', function () {
    return gulp.src('app/img/**/*.*')
        .pipe(imagemin({
            progressive: true,
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function(){
    gulp.watch('app/**/*.html', function(event, cb) {
        gulp.start('html');
    });
    gulp.watch('app/css/*.css', function(event, cb) {
        gulp.start('css');
    });
    gulp.watch('app/js/*.js', function(event, cb) {
        gulp.start('scripts');
    });
    gulp.watch('app/img/**/*.*', function(event, cb) {
        gulp.start('img');
    });
    gulp.watch('app/**/*.json', function(event, cb) {
        gulp.start('json');
    });
    gulp.watch('app/fonts/*.*', function(event, cb) {
        gulp.start('fonts');
    });
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('build', [
    'clean',
    'img',
    'css',
    'scripts',
    'libs',
    'fonts',
    'json',
    'html'
]);

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['build', 'browser-sync', 'watch']);