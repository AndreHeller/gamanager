///<reference path="../../../reference.ts" />
module application {
	/**
	 * Class NavigationCtrl represents controller for navigataion panel 
	 *
	 * @author  André Heller; anheller6gmail.com
	 * @version 1.00 — 07/2015
	 */
	export class NavigationCtrl 
	{
	//== CLASS ATTRIBUTES ==========================================================
	
		public static $inject = ['$scope','$location','$rootScope','UIService'/*,'AppManager'*/];
	
	//== INSTANCE ATTRIBUTES =======================================================	
	//== CLASS GETTERS AND SETTERS =================================================
	//== OTHER NON-PRIVATE CLASS METHODS =========================================== 
	
	//##############################################################################
	//== CONSTUCTORS AND FACTORY METHODS =========================================== 
		
		constructor(
			private $scope: any,  
			private $location: ng.ILocationService, 
			private $rootScope: any,
			private $logProvider: ng.ILogProvider,
			private ui: services.UIService
			/*private am: gamanager.AppManager*/
		){
			this.$scope.vm = this;
			this.$scope.menus = [
				{
					name : "Home",
					link : Routes.HOME,
					show : 'always'
				}, {
					name : "Explorer",
					link : Routes.ACCOUNTS,
					show : 'loginOnly'
				}, {
					name : "New Settings",
					link : Routes.NEW_SETTINGS,
					show : 'loginOnly'
				}, {
					name : "Debug",
					link : Routes.TEST,
					show : 'debugOnly'
				}
			];
		}
		
	//== INSTANCE GETTERS AND SETTERS ==============================================
	//== OTHER NON-PRIVATE INSTANCE METHODS ========================================		
		
		/**
		 * Decides if menu should be visible or not. 
		 * This method is called from a view during navs iteration.
		 */
		public showMenu(menu): boolean {
			
			switch (menu) {
				
				//Only for logged users
				case 'loginOnly':
					if(this.$rootScope.loggedUser.logged){
						return true;
					}
					return false;
					
					
				case 'debugOnly':
					if(this.$rootScope.enviroment === "debug"){
						return true;
					}
					return false;	
			
				default:
					return true;		
			}
		}
		
		
		/**
		 * Retrieve information if provided link belongs to current section.
		 * This method is called from a view as a pointer where should be placed class "active".
		 */
		public showActiveClass(link): boolean {
			
			if(this.$rootScope.currentSection.match(link)){
				if(link == "/" && this.$rootScope.currentSection != "/"){
					return false;
				}
				return true;
			}
			else return false;
		}
		
		
		/**
		 * Authorize User, load his info aind initialize application
		 * (load Analytics library, get first request for accounts summeries 
		 * and redireft to /accounts)
		 */
		/*public authorize() {
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
		/*public logout(){
			this.am.logout();
			this.$location.path( '/' ).replace();
			//this.$scope.$apply();
		}*/
		
	//== PRIVATE AND AUXILIARY CLASS METHODS =======================================
	//== PRIVATE AND AUXILIARY INSTANCE METHODS ====================================		
	}
}