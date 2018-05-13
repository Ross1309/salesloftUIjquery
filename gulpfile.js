var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

gulp.task('sass', function(){
  return gulp.src('./app/scss/style.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./app/css'));
});

gulp.task('webserver', function() {
  gulp.src('./app/')
	.pipe(webserver({
	  livereload: true,
	  fallback: '/index.html',
	  //host: '0.0.0.0',
	  port: 9000,
	  directoryListing: false,
	  open: true
	}));
});

gulp.task('sasswatch', function () {
  gulp.watch('./app/scss/style.scss', ['sass']);
});

gulp.task('default', [ 'sasswatch', 'webserver' ]);
