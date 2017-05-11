const gulp = require('gulp');
require('require-dir')('./tasks');

gulp.task('client:serve', ['client:dev']);
gulp.task('server:serve', ['server:dev']);
gulp.task('build', ['client:build']);
