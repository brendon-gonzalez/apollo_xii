var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus');
var nib = require('nib');

var paths = {
  vendors: ['bower_components/jquery/dist/jquery.min.js',
    'bower_components/handlebars/handlebars.min.js',
    '.bowercomponents/ember/ember.min.js'],
  scripts: ['assets/js/*.js'],
  styles: ['assets/stylesheets/*.styl']
};

gulp.task('vendors', function() {
  return gulp.src(paths.vendors)
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'));
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(watch(function(files) {
      return files.pipe(concat('main.js'))
        .pipe(gulp.dest('public/js'));
    }));
});

gulp.task('webserver', function () {
  nodemon({ script: 'app.js'})
  .on('restart', function() {
    console.log('Server Has Restarted');
  });
});

gulp.task('stylus', function() {
  gulp.src(paths.styles)
    .pipe(watch(function(files) {
      return files.pipe(stylus({use: nib(), compress: true}))
        .pipe(gulp.dest('public/stylesheets'));
    }));
});

gulp.task('default', function() {
  gulp.start('vendors', 'scripts', 'stylus', 'webserver');
});
