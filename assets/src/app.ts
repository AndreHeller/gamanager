///<reference path="./reference.ts" />

module application {
	// Creates an application
    var app = angular.module('GAManager', ['ngRoute','templates']);

	
	/********************************************************************
	* App configuration.
	* 
	* Route settings. Failsafe before unlogged user.
	*/
	app.config(($routeProvider) => {
		$routeProvider
			.when('/', {
				controller: HomeCtrl,
				templateUrl: 'app/templates/home.html'
			})
			.when('/accounts',{
				controller: AccountsCtrl,
				templateUrl: 'app/templates/accounts.html'
			})
			.otherwise({redirectTo: '/'})
	})
	.run(function($rootScope, $location) {
		
		// Init states for system vars
		$rootScope.loggedUser = {};
		$rootScope.alerts = [];
		 
		
		
		// register listener to watch route changes
		$rootScope.$on( "$routeChangeStart", (event, next, current) => {
			//Clear all alerts
			$rootScope.alerts = [];
			//Set current section
			$rootScope.currentSection = next.$$route.originalPath;
			
			if (!$rootScope.loggedUser.logged) {
				// no logged user, we should be going to #login
				if ( next.$$route.templateUrl != "app/templates/home.html" ) {
					$location.path( "/" );
				}  
			}
			else {
				console.log('APP: REDIRECTING: ' + next.templateUrl);
			}         
		});
	});
	 
	
	/****************************************************
	 * Directives & services & controllers
	 */
	
	app.service('AppManager', gamanager.AppManager)
	   .service('UIManager', gamanager.UIManager);
	   
	
	
	app.directive('navigation', directives.Navigation)
	   .directive('loader', directives.Loader)
	   .directive('alerts', directives.Alerts);
	
}