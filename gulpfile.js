const babel = require('gulp-babel');
const gulp = require('gulp');
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
    env: { NODE_ENV: 'development' },
    script: 'dist/server/main.js',
    tasks: ['compile'],
    watch: 'src/server'
  });
});

gulp.task('default', ['server']);
