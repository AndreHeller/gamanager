var gulp = require('gulp'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	replace = require('gulp-replace'),
	merge = require('merge-stream'),
	templateCache = require('gulp-angular-templatecache'),
	karma = require('gulp-karma'),
	tslint = require('gulp-tslint'),
	jasmine = require('gulp-jasmine'),
	notify = require('gulp-notify'),
	Server = require('karma').Server

gulp.task('build', function() {
	var typescript = require('gulp-typescript');
	var tsOptions = typescript.createProject({
		declarationFiles: false,
		target: 'ES5'
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

gulp.task('lint', function() {
	gulp.src('src/app/services**/*.ts')//['src/app/**/*.ts','src/gamanager/**/*.ts','src/tests/**/*.ts','src/*.ts'])
		.pipe(tslint())
		.pipe(tslint.report('verbose', {
			reportLimit: 50,
			emitError: false
		}));
});

gulp.task('watch', function () {
	gulp.watch(['./src/**/*.ts'], ['build']);
	gulp.watch(['./src/**/*.html'], ['build']);
});

gulp.task('server', function() {
	connect.server({
    root: ['dist'],
    livereload: true
  });
});

gulp.task('test', function(done){
	
	return new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start();
	
	//Testing without Karma
	//var angular = require('angular-mocks'); //requires angular
	/*gulp.src('./tests/*.js')
		.pipe(jasmine({
			verbose: true,
			includeStackTrace: false
		}))
		.on('error', notify.onError({
			title: 'Jasmine Tests FAILED',
			message: 'One or more tests failed, see the cli for details.'
		}))*/
});

gulp.task('default', function() {
	console.log('Task default is empty. See gulpfile.js');
});