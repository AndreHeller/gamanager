///<reference path="../../reference.ts" />
module application.services {	
	export class GAService{
		
		//Angular DI
		public static $inject = ['$rootScope','$log'];
		
		private connectionM: ConnectionManager;
		private accountM: AccountManager;
		
		constructor(private $rootScope, private $log) {
			this.connectionM = new ConnectionManager(this.$log);
			this.accountM = new AccountManager(this, this.$log);
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
								this.$log.debug('AppManager: Setting user data into rootScope.');
								this.$rootScope.loggedUser = {
									logged: true,
									firstName: response.result.name.givenName,
									lastName: response.result.familyName,
									name: response.result.displayName,
									img: response.result.image.url,
									loggedTime: new Date()
								}
								
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
		
		
		/**
		 * Vrátí stringmapu se všemi účty
		 */
		public getAccounts(){
			return this.accountM.getAllAccounts();
		}
		
		/**
		 * Vrátí stringmapu se všemi účty
		 */
		public getAccount(accountId: string):Account{
			return this.accountM.getAccount(accountId);
		} 
	}
}
