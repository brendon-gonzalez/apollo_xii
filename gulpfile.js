var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var stylus = require('gulp-stylus');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var nib = require('nib');

var paths = {
  js: ['./assets/js/**/*.js', './assets/js/*.js'],
  styles: ['./assets/stylesheets/*.styl']
};

gulp.task('browserify', function(){
  gulp.src('assets/js/app.js')
  .pipe(browserify({
    insertGlobals: true,
    transform: [reactify],
    extensions: ['.jsx', '.js'],
    debug: false
  }))
  .pipe(gulp.dest('./build/js'));
});

gulp.task('stylus', function() {
  gulp.src(paths.styles)
  .pipe(stylus({use: nib(), compress: true}))
  .pipe(gulp.dest('./build/stylesheets'));
});

// Watch Files For Changes
gulp.task('watch', function () {
  gulp.watch(paths.js, ['browserify']);
  gulp.watch(paths.styles, ['stylus']);
});

gulp.task('webserver', function () {
  nodemon({
    script: 'app.js',
    ignore: ['assets/', 'build/']
  })
  .on('start', ['watch'])
  .on('change', ['watch'])
  .on('restart', function() {
    console.log('Server Has Restarted');
  });
});


gulp.task('default', function() {
  gulp.start('webserver');
});
