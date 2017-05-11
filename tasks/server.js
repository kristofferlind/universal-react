const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const shell = require('./modules/shell');
const eslint = require('gulp-eslint');

gulp.task('server:dev', ['mongodb', 'client:build'], () => {
  livereload.listen();
  nodemon({
    script: 'server/index.js',
    ignore: ['dist/**'],
    ext: 'js jsx html jade',
    env: {
      NODE_ENV: 'development'
    },
    execMap: {
      js: 'node --harmony'
    },
    stdout: true
  }).on('restart', () => {
    setTimeout(() => {
      livereload.reload();
    }, 2000);
  });
});

gulp.task('mongodb', (callback) => {
  shell('mongod --cpu', true);
  setTimeout(callback, 1000); // TODO: figure out a way to know when it's done starting up
});

gulp.task('lint', () =>
  gulp.src('server/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);
