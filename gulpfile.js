var gulp = require('gulp'),
    del = require('del'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    webpack = require('webpack-stream'),
    buildConfig = require('./buildConfig.json'),
    webpackConfig = require('./webpack.config.js');
//
// Clean the build folder
//
gulp.task('clean', function () {
  del(['./build/crx/*']);
});
//
// Generate the manifest.json with macros replaced
//
gulp.task('manifest', ['clean'], function () {
  var stream = gulp.src('./src/manifest.json'),
      macroRegex;

  Object.keys(buildConfig).forEach(function (key) {
    if (buildConfig.hasOwnProperty(key)) {
      macroRegex = new RegExp('__' + key + '__', 'g');
      stream = stream.pipe(replace(macroRegex, buildConfig[key]));
    }
  });

  return stream.pipe(gulp.dest('./build/crx'));
});
//
// Copy the popup/index.html to build/crx/popup.html
//
gulp.task('popup', ['manifest'], function () {
  return gulp.src('./src/popup/index.html')
             .pipe(rename('popup.html'))
             .pipe(gulp.dest('./build/crx'));
});
//
// Run webpack to bundle all jsx and less files
//
gulp.task('webpack', ['popup'], function () {
  return gulp.src([
    './src/background/entry.jsx',
    './src/popup/entry.jsx'
  ]).pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./build/crx'));
});
