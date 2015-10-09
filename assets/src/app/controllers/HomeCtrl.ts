///<reference path="../../reference.ts" />
module application {
	/**
	 * Class HomeCtrl represents default controller for default application View.
	 * It shows login page when user is logged off and also some summary info 
	 * about application state 
	 *
	 * @author  André Heller; anheller6gmail.com
	 * @version 1.00 — 07/2015
	 */
	export class HomeCtrl 
	{
	//== CLASS ATTRIBUTES ==========================================================	
		
		public static $inject = ['$scope','$location','$log','$rootScope'/*,'GAService'*/,'UIService'];
		
	//== INSTANCE ATTRIBUTES =======================================================	
	//== CLASS GETTERS AND SETTERS =================================================
	//== OTHER NON-PRIVATE CLASS METHODS =========================================== 
	
	//##############################################################################
	//== CONSTUCTORS AND FACTORY METHODS ===========================================	
		
		constructor(
			private $scope: any, 
			private $location: ng.ILocationService,
			private $log: ng.ILogService,
			private $rootScope: any,
			/*private ga: services.GAService,*/
			private ui: services.UIService
		){
			this.$scope.vm = this;
			this.$log.debug('HomeCtrl: Prepared!');	
					
		}
		
	//== INSTANCE GETTERS AND SETTERS ==============================================
	//== OTHER NON-PRIVATE INSTANCE METHODS ========================================		
		
		/**
		 * Authorize User, load his info aind initialize application
		 * (load Analytics library, get first request for accounts summeries 
		 * and redirect to /accounts)
		 */
		public authorize(): void{
			if(!this.$rootScope.loggedUser.logged){
				this.$log.debug('HomeCtrl: Running inicialization.');
			
				//Hide UserInterface  
				this.ui.showLoader(); 
				
				//Delegate on ApplicationManager
				/*this.ga.authorize()
					.then(
						//If OK
						() => {
								
							this.$log.debug('AppManager: Redirecting at "/accounts" page');
							this.$location.path(Routes.ACCOUNTS).replace(); 
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
							this.$log.error('HomeCtrl: Handling Error:');
							this.$log.debug(error);
							//Report Error
							this.uim.alert(error);
							//Reset UI
							this.uim.setLoading(false);
						}
					);*/
			}
		}
		
	//== PRIVATE AND AUXILIARY CLASS METHODS =======================================
	//== PRIVATE AND AUXILIARY INSTANCE METHODS ====================================
	
				
	}
}