///<reference path="../../reference.ts" />
module application {
	export class AccountsCtrl {
		
		public static $inject = ['$scope','AppManager'];
		
		constructor(private $scope: any, private am: gamanager.AppManager){ 
			this.$scope.vm = this;
			
			/*this.gam.getAccounts()
				.then(
					(accounts) => {this.$scope.accounts = accounts},
					(error) => {this.$scope.error = error});
			*/		
				
		}
	}
}