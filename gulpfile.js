var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var exec = require('child_process').exec;

var paths = {
  scripts: ['_source/js/jquery.js', '_source/js/*.js'],
  styles: [
    '_source/css/bootstrap.css',
    '_source/css/style.css',
    '_source/css/agency.css',
    '_source/css/font-icons.css',
    '_source/css/animate.css',
    '_source/css/responsive.css',
    '_source/css/colors.css',
    '_source/css/custom.css'
  ]
};

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(cleanCss())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('source/css'));
});

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('source/js'));
});

gulp.task('generate', function () {
  exec('./vendor/bin/sculpin generate --prod');
});

gulp.task('s3-publish', function () {
  return exec('./s3-publish.sh');
});

gulp.task('assets', ['styles', 'scripts']);

gulp.task('publish', ['assets', 's3-publish']);
