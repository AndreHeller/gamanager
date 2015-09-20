///<reference path="../reference.ts" />
module gamanager {	
	export class AppManager{
		
		//Angular DI
		public static $inject = ['$rootScope'];
		
		private connectionM: ConnectionManager;
		private accountM: AccountManager;
		
		constructor(private $rootScope) {
			this.connectionM = new ConnectionManager();
			this.accountM = new AccountManager(this);
		}
		
		
		/**
		 * Authorize User and inicialize application.
		 * Load User data, Load Analytics library and make first Accont Summaries request.
		 */
		public authorize(): Promises.Promise{
			return this.connectionM.authorize()
						.then((response) => {return this.connectionM.loadGooglePlus();})
						.then((response) => {return this.connectionM.loadUserData();})
						.then( 
							(response) => {
								console.log('AppManager: Setting user data into rootScope.');
								this.$rootScope.loggedUser.logged = true;
								this.$rootScope.loggedUser.name = response.result.displayName;
								this.$rootScope.loggedUser.img = response.result.image.url;
								
								return this.connectionM.loadAnalytics();
							}
						)
						.then((param) => {return this.accountM.requestAccountSummaries(param);})
						.then((param) => {return this.accountM.saveAccountSummaries(param);});
		}
		
		
		/**
		 * Logout user and clear app data
		 */
		public logout(){
			this.connectionM.logout();
			this.accountM.deleteAllAccounts();
			this.$rootScope.loggedUser = {};
		}
	}
}
