///<reference path="../../reference.ts" />
module application {
	export class AccountsCtrl {
		
		public static $inject = ['$scope','AppManager'];
		
		constructor(private $scope: any, private am: gamanager.AppManager){ 
			this.$scope.vm = this;
			
			this.$scope.accounts = this.am.getAccounts().toArray();				
		}
	}
}