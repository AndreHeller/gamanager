///<reference path="../../reference.ts" />
module application {
	export class NewSettingsCtrl {
		public static $inject = ['$scope','$log','AppManager','UIManager'];
		
		constructor(private $scope, private $log,private am: gamanager.AppManager, private uim: gamanager.UIManager){
			this.$scope.vm = this;
			this.$scope.accounts = this.am.getAccounts().toArray();
		}
		
		public selectAccount(accountId: string){
			if(!accountId){
				this.uim.alert('Nejprve vyberte účet!');
			}
			
			var account: gamanager.Account = this.am.getAccount(accountId);
			
			if(account.isParcial){
				if(account.loadRest()){
					
				}
				else {
					this.$log.error('Account hlasi, že není kompletní, ale přitom metoda loadRest neprojde');
					this.uim.alert('Aooj', gamanager.UIManager.ALERT_SUCCESS);
				}
			}
			else {
				this.$scope.account = account;	
			}
		}
	}
}