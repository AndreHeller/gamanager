///<reference path="../../reference.ts" />
module application {
	export class TestCtrl {
	
		public static $inject = ['$scope','AppManager'];
		
		constructor(private $scope, private am: gamanager.AppManager){
			this.$scope.vm = this;
			
			
			/*var account: gamanager.Account = this.am.getAccount('40454771');
			
			var property: gamanager.WebProperty = account.properties.get('UA-40454771-1');*/
			
			
			this.$scope.name = "ahoj"; 
		}
	}
}