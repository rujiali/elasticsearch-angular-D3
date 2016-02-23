var gulp = require('gulp'),
    gulpNgConfig = require('gulp-ng-config');

gulp.task('test', function () {
  gulp.src('configFile.json')
      .pipe(gulpNgConfig('ElasticApp.config'))
      .pipe(gulp.dest('.'))
});