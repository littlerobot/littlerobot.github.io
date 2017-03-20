var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var shell = require('gulp-shell')
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var uglify = require('gulp-uglify');

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

gulp.task('netlify-install', function() {
  shell.task('~/.phpbrew/bin/composer install');
});

gulp.task('styles', function () {
  let dest = 'source/css';

  return gulp.src(paths.styles)
    .pipe(cleanCss())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest(dest))
    .pipe(rev())
    .pipe(gulp.dest(dest))
    .pipe(rev.manifest())
    .pipe(gulp.dest(dest));
});

gulp.task('scripts', function () {
  let dest = 'source/js';

  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest(dest))
    .pipe(rev())
    .pipe(gulp.dest(dest))
    .pipe(rev.manifest())
    .pipe(gulp.dest(dest));
});

gulp.task('revs-replace', ['assets', 'sculpin-generate'], function () {
  return gulp.src('output_prod/**/*.html')
    .pipe(revReplace({
      manifest: gulp.src([
        'source/css/rev-manifest.json',
        'source/js/rev-manifest.json'
      ])
    }))
    .pipe(gulp.dest('output_prod'));
});

gulp.task('minify-html', ['sculpin-generate', 'revs-replace'], function () {
  return gulp.src('output_prod/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true,
      sortAttributes: true,
      sortClassName: true
    }))
    .pipe(gulp.dest('output_prod'));
});

gulp.task('sculpin-generate', ['clean', 'assets'], function () {
  shell.task('sculpin generate --env=prod');
});

gulp.task('clean', function () {
  shell.task('rm -rf output_prod/*');
});

gulp.task('assets', ['styles', 'scripts']);

gulp.task('generate', ['clean', 'assets', 'sculpin-generate', 'revs-replace', 'minify-html']);

gulp.task('netlify', ['netlify-install', 'generate']);