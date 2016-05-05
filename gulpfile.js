var gulp = require('gulp');
var del  = require('del');

gulp.task('app_js', function(){
  gulp.src('./dist/assets/app/js/*.js')
      .pipe(gulp.dest('./dist/assets/app/js'));
})

gulp.task("awesome_css", function(){
  gulp.src('./src/font-awesome/css/*')
      .pipe(gulp.dest('./dist/assets/font-awesome/css'))
})

gulp.task("awesome_font", function(){
  gulp.src('./src/font-awesome/fonts/*')
      .pipe(gulp.dest('./dist/assets/font-awesome/fonts'))
})

gulp.task("clean", function(){
  del('./dist/assets/*');
})

gulp.task("build", ["app_js", "awesome_css", "awesome_font"]);
