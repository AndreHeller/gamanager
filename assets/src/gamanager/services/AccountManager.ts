///<reference path="../../reference.ts" />
module gamanager {
	export class AccountManager {
		
		//Account storage
		private ACCOUNTS: util.StringMap<Account> = new util.StringMap<Account>();
		
		constructor(private appM: AppManager){
			
		}
		
		
		/********************************************************************
		 * Factory method for creating accounts
		 */
		public createAccount(account: ParcialAccount){
			this.ACCOUNTS.put(
					account.id, 
					new Account(
						this.appM, 
						account.id, 
						account.name, 
						account.webProperties
					)
			);
		}
		
		
		/**********************************************************************
		 * Returns map of all accounts
		 */
		public getAllAccounts(): util.StringMap<Account>{
			return this.ACCOUNTS;
		}
		
		
		/***********************************************************************
		 * Returns account by its number.
		 */
		public getAccount(accountId: string){
			return this.ACCOUNTS.get(accountId);
		}
		
		
		/************************************************************************
		 * Request API for AccounSummaries. Basic data about Account, WebProperties and Profiles.
		 */
		public requestAccountSummaries(input: any): Promises.Promise{
			console.log('AccountManager: Starting AccountSummaries request.');
			
			var d = new Promises.Deferred();
			 
			if(gapi.client.analytics){
				gapi.client.analytics.management.accountSummaries.list()
					.then(
						(param) => {
							console.log('AccountManager: Fullfilling AccountSummaries request.');
							d.fulfill(param);
						},
						(error) => {
							console.log('AccountManager: Rejecting AccountSummaries request.');
							d.reject(Strings.ERROR_ANALYTICS_NOT_FOUND);
						}
					);		
			}
			else {
				console.error('AccountManager: Rejecting AccountSummaries request. NEVER SHOULD HAPEN!');
				d.reject(Strings.ERROR_ANALYTICS_NOT_RESPONSE);
			}
			
			console.log('AccountManager: Returning AccountSummaries request promise.');
			return d.promise();
		}
		
		
		/********************************************************************************
		 * Proiteruje data v parametru a vytvoří jednotlivé instance všech ÚČTŮ, PROPERTY A PROFILŮ. Parametr by mě odpovídat tomu co vrátí APi na základě metody requestAccountSUmmaries()
		 */
		public saveAccountSummaries(data): Promises.Promise{
			console.log('AccountManager: Starting save accountsummaries info.');
			var accounts: Array<ParcialAccount> = data.result.items,
				d = new Promises.Deferred;
			
			for(var i:number = 0; i<accounts.length; i++){
				this.createAccount(accounts[i]);
			}
			
			if(this.ACCOUNTS.size == accounts.length){
				console.log('AccountManager: Fillfiling save accountsummaries info.');
				d.fulfill();
			}
			else{
				console.error('AccountManager: Rejecting save accountsummaries info.');
				d.reject(Strings.ERROR_ACCOUNT_SUMMARIES_SAVE)
			}
			
			console.log('AccountManager: Returning save accountsummaries info.');
			return d.promise();
		}
		
		
		/**
		 * Delete all accounts data.
		 */
		public deleteAllAccounts(){
			this.ACCOUNTS.flush();
		}
	}
}