///<reference path="../../../reference.ts" />
module application {
	export class NavigationCtrl {
	
		public static $inject = ['$scope','$location','$rootScope','AppManager','UIManager'];
		
		constructor(
			private $scope,  
			private $location, 
			private $rootScope,
			private am: gamanager.AppManager, 
			private uim:gamanager.UIManager
		){
			this.$scope.vm = this;
			this.$scope.menus = [
				{
					name : "Home",
					link : "/",
					show : 'always'
					
				}, {
					name : "Accounts",
					link : "/accounts",
					show : 'loginOnly'
				}
			];
			this.$scope.section = $rootScope.currentSection;
			 
		}
		
		
		/**
		 * Help view method. Hide menus with 'loginOnly' show parametr
		 * if user is not logged
		 */
		public showMenu(menu) {
			
			switch (menu) {
				case 'loginOnly':
					if(this.$rootScope.loggedUser.logged){
						return true;
					}
					else {
						return false;
					}				
			
				default:
				
					return true;		
			}
		}
		
		
		/**
		 * Authorize User, load his info aind initialize application
		 * (load Analytics library, get first request for accounts summeries 
		 * and redireft to /accounts)
		 */
		public authorize() {
			console.log('Navigation Ctrl: Running inicialization from Navigation controller.');
			
			//Hide UserInterface  
			this.uim.setLoading(true); 
			
			//Delegate ApplicationManager
			this.am.authorize()
				.then(
					//If OK
					() => {	
						console.log('AppManager: Redirenting at "/accounts" page');
						this.$location.path( '/accounts' ).replace();
						this.$scope.$apply();
						
						//Reset UI
						this.uim.setLoading(false);
					},
					//If error
					(error) => {
						console.error('HomeCtrl: Handling Error:');
						console.log(error);
						//Report Error
						this.uim.alert(error);
						//Reset UI
						this.uim.setLoading(false);
					}
				);
		}
		
		/**
		 * Logout User and clear app data
		 */
		public logout(){
			this.am.logout();
			this.$location.path( '/' ).replace();
			//this.$scope.$apply();
		}
	}
}