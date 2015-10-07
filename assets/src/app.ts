///<reference path="./reference.ts" />

module application {
	// Creates an application
    var app = angular.module('GAManager', ['ngRoute','templates']);

	
	/*
	 * App configuration. 
	 * 
	 * Route settings. Failsafe before unlogged user.
	 */ 
	app.config(($routeProvider, $logProvider) => {
		$logProvider.debugEnabled(false);
		$routeProvider
			.when(Routes.HOME, { 
				controller: HomeCtrl,
				templateUrl: 'app/templates/home.html'
			}) 
			.when(Routes.ACCOUNTS,{ 
				controller: AccountsCtrl,
				templateUrl: 'app/templates/accounts.html'
			})
			.when(Routes.PROFILE_DETAIL,{
				controller: AccountDetailCtrl,
				templateUrl: 'app/templates/accountsDetail.html'
			})
			.when(Routes.NEW_SETTINGS,{
				controller: NewSettingsCtrl,
				templateUrl: 'app/templates/newSettings.html'
			})
			.when(Routes.TEST,{
				controller: TestCtrl,
				templateUrl: 'app/templates/test.html'
			})
			.otherwise({redirectTo: '/'}) 
	})
	.run(function($rootScope, $location, $log) {
		
		// Initiate system variables
		$rootScope.loggedUser = {};
		$rootScope.alerts = [];
		 
		
		
		// register listener to watch route changes
		$rootScope.$on("$routeChangeStart", (event, next, current) => {
			//Clear all alerts
			$rootScope.alerts = [];
			//Set current section
			$rootScope.currentSection = next.$$route.originalPath;
			
			if (!$rootScope.loggedUser.logged) {
				// no logged user, we should be going to #login
				if ( next.$$route.templateUrl != "app/templates/home.html" ) {
					$location.path( Routes.HOME );
				} 
			}
			
			$log.debug(
				'=======================================\n' +
				'APP: REDIRECTING: ' + next.templateUrl + '\n' +
				'======================================='
			);         
		});
	});
	 
	
	/*
	 * Directives & services & controllers
	 */
	
	app.service('AppManager', services.GAService)
	   .service('UIManager', services.UIService);
	
	app.directive('navigation', directives.Navigation)
	   .directive('loader', directives.Loader)
	   .directive('alerts', directives.Alerts);
	   
}