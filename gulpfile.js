const gulp = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');

gulp.task('compile', () => {
  gulp.src('src/**/*')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('server', ['compile'], () => {
  nodemon({
    script: 'dist/server/main.js',
    watch: 'src/server',
    tasks: ['compile'],
    env: { NODE_ENV: 'development' }
  });
});

gulp.task('default', ['server']);
