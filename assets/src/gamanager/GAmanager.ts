///<reference path="../reference.ts" />

module gamanager {
	export class GAManager{
		
		private cm: ConnectionManager;
		private ACCOUNTS: util.StringMap<Account> = new util.StringMap<Account>();
		
		
		constructor() {
			this.cm = new ConnectionManager(this);
		}
		
		public initialize(): void{
			this.cm.authorize()
				.then(() => {return this.cm.loadAnalytics();})
				.then((param) => {return this.getAccountSummaries(param);})
				.then((param) => {return this.saveAccountSummaries(param);});
		}
		
		public getAccountSummaries(msg: string): Promises.Promise{
			var d = new Promises.Deferred();
			
			if(gapi.client.analytics){
				gapi.client.analytics.management.accountSummaries.list()
					.then((param) => {
						d.fulfill(param);
						//TODO - pohlídat, pokud mi to nevrátilo nic nebo třeba jiné API
					});		
			}
			console.log('Request na data poslán');
			return d.promise();
		}
		
		public saveAccountSummaries(data): void{
			console.log('finální funce spuštena');
			var accounts: Array<ParcialAccount> = data.result.items;
			
			for(var i:number = 0; i<accounts.length; i++){
				this.ACCOUNTS.put(
					accounts[i].id, 
					new Account(
						this, 
						accounts[i].id, 
						accounts[i].name, 
						accounts[i].webProperties
					)
				); 
			}
			
			this.fillField(data.body);
		}
		
		public fillField(data){
			var output: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById('query-output'),
				select: HTMLSelectElement = <HTMLSelectElement> document.getElementById('accountSelect');;
			
			for(var i:number = 0; i < this.ACCOUNTS.names().length; i++){
				var key:string = this.ACCOUNTS.names()[i];
				var account: Account = this.ACCOUNTS.get(key);
				output.value += account.name + "\n";
				
				var option: HTMLOptionElement = document.createElement('option');
				option.innerHTML = account.name;
				option.value = account.id;
				select.add(option);
			}
		}
	}
}