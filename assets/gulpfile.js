var gulp = require('gulp'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect');

gulp.task('build', function() {
	var typescript = require('gulp-typescript');
	var tsOptions = typescript.createProject({
		declarationFiles: false
	});

	return gulp.src(['typings/**/*.d.ts', 'src/**/*.ts'])
				.pipe(typescript(tsOptions))
				.pipe(concat('common.js'))
				.pipe(gulp.dest('dist/scripts'))
				.pipe(connect.reload());
});

gulp.task('dev', ['server', 'watch'], function() {

});

gulp.task('watch', function () {
	gulp.watch(['./src/**/*.ts'], ['build']);
});

gulp.task('server', function() {
	connect.server({
    root: ['dist'],
    livereload: true
  });
});


gulp.task('test', function() {
	console.log('Task test is empty. See gulpfile.js');
});

gulp.task('default', function() {
	console.log('Task default is empty. See gulpfile.js');
});