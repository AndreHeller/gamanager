var gulp = require('gulp'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	replace = require('gulp-replace'),
	merge = require('merge-stream'),
	templateCache = require('gulp-angular-templatecache');

gulp.task('build', function() {
	var typescript = require('gulp-typescript');
	var tsOptions = typescript.createProject({
		declarationFiles: false
	});

	var ts = gulp.src(['src/typings/**/*.d.ts', 'src/**/*.ts'])
						.pipe(typescript(tsOptions));

	var tpl = gulp.src(['src/**/*.html'])
						.pipe(templateCache({standalone: true}));

	return merge(ts, tpl)
		.pipe(replace(/var ([a-zA-Z0-0_]*);/, 'var $1 = $1 || {};'))
		.pipe(concat('common.js'))
		.pipe(gulp.dest('dist/scripts'))
		.pipe(connect.reload());
});

gulp.task('dev', ['server', 'watch'], function() {

});

gulp.task('watch', function () {
	gulp.watch(['./src/**/**/**/**/*.ts'], ['build']);
	gulp.watch(['./src/**/**/**/**/*.html'], ['build']);
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