///<reference path="./reference.ts" />

module application {
	// Creates an application
    var app = angular.module('GAManager', ['ngRoute','templates']);

	
	/********************************************************************
	* App configuration. 
	* 
	* Route settings. Failsafe before unlogged user.
	*/ 
	app.config(($routeProvider, $logProvider) => {
		$logProvider.debugEnabled(true);
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
					$location.path( Routes.HOME );
				}  
			}
			else {
				$log.debug('APP: REDIRECTING: ' + next.templateUrl);
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
	   
	   
	   
	   //Měření uplynulé času uživatele = važaduje externí knihovnu.
	   /*.directive('myCurrentTime', ['$interval', 'dateFilter',
      function($interval, dateFilter) {
        // return the directive link function. (compile function not needed)
        return {
			restrict: 'E',
			template: '<span></span>',
			scope: {
				time: '='
			},
			link: function(scope, element, attrs) {
				var format = 'h:mm:ss',  // date format
					stopTime; // so that we can cancel the time updates
		
				// used to update the UI
				function updateTime() {
					// get a moment based on the user input
					var m:any = moment(scope.time);
				
					// calculate a duration of time passed between now and that moment
					var now:any = moment();
					var d = moment.duration(now - m);
					
					// build your output string
					var s = d.hours() + ":" +
							d.minutes() + ":" +
							d.seconds();
					
					element.text(s);
				}
		
				stopTime = $interval(updateTime, 1000);
		
				// listen on DOM destroy (removal) event, and cancel the next UI update
				// to prevent updating time after the DOM element was removed.
				element.on('$destroy', function() {
					$interval.cancel(stopTime);
				});
			}
		}
      }]);;*/
	
}