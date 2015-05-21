var gulp = require('gulp');
var paths = require('../paths');
var jspm = require('jspm/api');

gulp.task('bundle', function (done) {
  jspm.bundle(
    [
      '*',
      'aurelia-breeze-northwind/*',
      'aurelia-bootstrapper',
      'aurelia-breeze',
      'aurelia-dependency-injection',
      'aurelia-event-aggregator',
      'aurelia-framework',
      'aurelia-router',
      'aurelia-task-queue',
      'aurelia-templating',
      'aurelia-templating-resources',
      'aurelia-templating-binding',
      'aurelia-loader-default',
      'aurelia-templating-router',
      'aurelia-history-browser',
      'aurelia-html-template-element',
      //'babel',
      //'babel-runtime',
      'breeze',
      //'core-js',
      //'css',
      'materialize',
      'moment',
      'numeral',
    ].join(' + '),
    'app-bundle.js',
    {inject:true, minify: false}
  ).then(function () {
    gulp.src('./app-bundle.js')
      .pipe(gulp.dest(paths.output));
    done();
  });
});
