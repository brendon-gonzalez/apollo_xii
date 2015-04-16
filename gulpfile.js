var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var nib = require('nib');

var paths = {

  styles: ['./assets/stylesheets/*.styl']
};


gulp.task('browserify', function(){
  gulp.src('./assets/js/app.js')
    .pipe(watch(function(files) {
      return files
        .pipe(browserify({
          insertGlobals : true,
          transform: ['reactify'],
          extensions: ['.jsx'],
          debug :false
        }))
        .pipe(gulp.dest('./build/js'));
    })
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
  );
});

gulp.task('stylus', function() {
  gulp.src(paths.styles)
    .pipe(watch(function(files) {
      return files
        .pipe(stylus({use: nib(), compress: true}))
        .pipe(gulp.dest('./build/stylesheets'));
    }));
});

gulp.task('webserver', function () {
  nodemon({
    script: 'app.js',
    ignore: ['!assets/**/*.js', '!assets/*.js']
  })
  .on('restart', function() {
    console.log('Server Has Restarted');
  });
});


gulp.task('default', function() {
  gulp.start('browserify', 'stylus', 'webserver');
});
