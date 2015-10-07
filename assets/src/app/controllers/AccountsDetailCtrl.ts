///<reference path="../../reference.ts" />
module application {
	export class AccountDetailCtrl {
		public static $inject = ['$scope','$routeParams','AppManager','UIManager'];
		
		
		constructor(private $scope, private $routeParams, private am: gamanager.AppManager, private uim: gamanager.UIManager){
			this.$scope.vm = this;
			this.$scope.account = this.am.getAccount(this.$routeParams.accountId);
			this.$scope.property = this.$scope.account.properties.get(this.$routeParams.propertyId);
			this.$scope.profile = this.$scope.property.profiles.get(this.$routeParams.profileId);
		}
		
		
		public loadRest(){
			this.uim.setLoading(true);
			this.$scope.account.completeProperties().then(
				(response) => {
					this.$scope.$apply();
					this.uim.setLoading(false);
				},
				(error) => {
					this.uim.alert(error.result.message);
					console.error(error);
					this.uim.setLoading(false);
				}
			);
		}
	}
}