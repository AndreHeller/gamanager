///<reference path="../../reference.ts" />
module application {
	export class HomeCtrl {
		
		//Angular DI
		public static $inject = ['$scope','$location','$log','$rootScope','$document','$timeout','AppManager','UIManager'];
		
		constructor(
			private $scope: any, 
			private $location,
			private $log,
			private $rootScope,
			private $document,
			private $timeout, 
			private am: gamanager.AppManager,
			private uim: gamanager.UIManager			
		){
			this.$scope.vm = this;
			this.$log.debug('HomeCtrl: Prepared!');
			
			//Dočasně zapne přihlášení bez zmáčknutí tlačítka
			$document.ready(function () {
				$scope.vm.authorize();
			});

			  
		}
		
		
		/**
		 * Authorize User, load his info aind initialize application
		 * (load Analytics library, get first request for accounts summeries 
		 * and redireft to /accounts)
		 */
		public authorize(): void{
			if(!this.$rootScope.loggedUser.logged){
				this.$log.debug('HomeCtrl: Running inicialization.');
			
				//Hide UserInterface  
				this.uim.setLoading(true); 
				
				var timeout = this.$timeout(
					(param)=>{
						this.uim.setLoading(param);
						this.uim.alert(gamanager.Strings.ERROR_REQUEST_TIMEOUT);
					},
					5000, //Timeout
					true, //Use $apply
					false //setLoading false
				);
				
				
				//Delegate on ApplicationManager
				this.am.authorize()
					.then(
						//If OK
						() => {
							this.$timeout.cancel(timeout);	
							this.$log.debug('AppManager: Redirenting at "/accounts" page');
							this.$location.path(Routes.NEW_SETTINGS).replace(); //DOČASNĚ PŘESMĚROVÁVÁ NA NOVÉ NSATVENÍ
							this.$scope.$apply();
							
							//Report Success
							this.uim.alert(
								StringF.format(
									gamanager.Strings.SUCCESS_USER_LOGGED_IN, 
									this.$rootScope.loggedUser.firstName), 
								gamanager.UIManager.ALERT_SUCCESS
							);
							//Reset UI
							this.uim.setLoading(false);
						},
						//If error
						(error) => {
							this.$timeout.cancel(timeout);
							this.$log.error('HomeCtrl: Handling Error:');
							this.$log.debug(error);
							//Report Error
							this.uim.alert(error);
							//Reset UI
							this.uim.setLoading(false);
							String
						}
					);
			}
		}
	}
}