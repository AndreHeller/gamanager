// Karma configuration
// Generated on Sun Oct 18 2015 23:44:14 GMT+0200 (Střední Evropa (letní čas))

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec', 'coverage'],
    preprocessors: {
      'src/**/*.ts': ['coverage'],
      'dist/scripts/**/*.js': ['coverage']
    },
    // optionally, configure the reporter 
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    browsers: ['PhantomJS'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'dist/**/*.js',
      'tests/**/*Test.js'
    ]
  });
};
