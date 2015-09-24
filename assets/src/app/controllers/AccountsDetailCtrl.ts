///<reference path="../../reference.ts" />
module application {
	export class AccountDetailCtrl {
		public static $inject = ['$scope','$routeParams'];
		
		constructor(private $scope, private $routeParams){
			this.$scope.vm = this;
			this.$scope.accountId = $routeParams.accountId;
			this.$scope.propertyId = $routeParams.propertyId;
			this.$scope.profileId = $routeParams.profileId;
		}
	}
}