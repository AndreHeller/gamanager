///<reference path="../../reference.ts" />
module application {
	export class NewSettingsCtrl {
		public static $inject = ['$scope','$log','AppManager','UIManager'];
		
		constructor(private $scope, private $log,private am: gamanager.AppManager, private uim: gamanager.UIManager){
			this.$scope.vm = this;
			this.$scope.accounts = this.am.getAccounts().toArray();
			
			this.$scope.accounts = [{
				id: '123456',
				name: 'GA account name',
				updated: '2014-15-16',
				created: '2014-15-16',
				properties: [
					{
						id: 'UA-12345-6',
						internalId: '46841651',
						name: 'Web property name',
						level: 'Standard',
						updated: '2014-19-16',
						created: '2014-19-16',
						defaultProfileId: '12345',
						profilesCount: '4',
						profiles: [
							{
								id: '12345',
								name: 'Profile name',
								type: 'Web',
								updated: '2014-17-16',
								created: '2014-17-16',
							}
						]
					}
				] 
			}];
		}
		
		public selectAccount(accountId: string){
			if(!accountId){
				this.uim.alert('Nejprve vyberte účet!');
			}
			
			/*var account: gamanager.Account = this.am.getAccount(accountId);
			
			if(account.isParcial()){
				if(account.loadRest()){
					
				}
				else {
					this.$log.error('Account hlasi, že není kompletní, ale přitom metoda loadRest neprojde');
					this.uim.alert('Aooj', gamanager.UIManager.ALERT_SUCCESS);
				}
			}
			else {
				this.$scope.account = account;	
			}*/
			
			this.$scope.account = this.$scope.accounts[0];
			
			
		}
	}
}