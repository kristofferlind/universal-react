const gulp = require('gulp');
const clean = require('gulp-clean');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const WebpackDevServer = require('webpack-dev-server');
const gutil = require('gulp-util');

const buildPath = 'dist';

gulp.task('client:build:clean', () =>
  gulp.src(buildPath, { read: false })
    .pipe(clean({ force: true }))
);

gulp.task('client:build', ['copy-serviceworker'], (done) => {
  webpack(webpackConfig, (error, statistics) => {
    if (error) {
      console.error(error);  // eslint-disable-line no-console
    }
    const compilationErrors = statistics && statistics.compilation && statistics.compilation.errors;
    const hasCompilationErrors = compilationErrors && compilationErrors.length > 0;
    const formattedStatistics = statistics && statistics.toString({ chunks: false, colors: true });
    console.log(formattedStatistics);  // eslint-disable-line no-console
    if (error || (webpackConfig.bail && hasCompilationErrors)) {
      process.exit(1);
    }
    done();
  });
});

gulp.task('client:dev', () => {
  new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer)
  .listen(9001, '', (error) => {
    if (error) {
      throw new gutil.PluginError('webpack:dev-client', error);
    }
    gutil.log('[webpack:dev-client]', 'http://localhost:9001/webpack-dev-server/');
  });
});

gulp.task('copy-serviceworker', ['client:build:clean'], () =>
  gulp.src('client/app/serviceworker-api.js')
    .pipe(gulp.dest(buildPath))
);
