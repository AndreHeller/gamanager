///<reference path="../../reference.ts" />
module gamanager {
	
	export class ConnectionManager{

		private authorizeM: AuthorizeManager			
		
		constructor(private $log){
			this.authorizeM = new AuthorizeManager(this.$log);
		}
		
		/*******************************************************************
		 * Authorize Google Account OAuth 2.0
		 */
		public authorize(): Promises.Promise {
			this.$log.debug('ConnectionManager: Starting authorize.');
			
			var d = new Promises.Deferred();
			
			//Z nějakého důvodu zatím nelze neautorizovat při reloadu, tokne nezůstane v paměti. Má expire time na hodinu, takže je možné že po hodine nepřetržitého používání v aplikaci (bez reloadu), přestane púracovat, sle v prvotní inicializaci asi musíé být vždy. Ještě nutné doověřit, zatím nechávám tvrdý mód, který jen ověří zda už je uživatel byl přihlášený a pokud ano, tak neotevírá zbytečně okno. a autorizuje ho na pozadí.
			/*if(!this.authM.isAuthorized()){*/
				this.authorizeM.authorize()
					.then(
						(param) => {d.fulfill(param)},
						(err) => {d.reject(err)}
					);
				
			/*}
			else {
				d.fulfill();
			}*/
			 
			this.$log.debug('ConnectionManager: Returning authorize promise.');
			return d.promise();
		}
		
		
		/**********************************************************************
		 * Load Google+ Client library
		 */
		public loadGooglePlus(): Promises.Promise {
			this.$log.debug('ConnectionManager: Starting load Google+ library..');
			
			var d = new Promises.Deferred() 
			
			gapi.client.load('plus', 'v1', () => {
				if(gapi.client.load){
					this.$log.debug('ConnectionManager: Fulfilling Google+ library request.');
					d.fulfill();
				}
				else {
					this.$log.error('ConnectionManager: Rejecting Google+ library request.');
					d.reject(Strings.ERROR_PLUS_NOT_FOUND)
				}
			});
			this.$log.debug('ConnectionManager: Returning Google+ library promise.');
			return d.promise();
		}
		
		
		/***********************************************************************
		 * Load basic user info data
		 */
		public loadUserData(): Promises.Promise {
			
			this.$log.debug('ConnectionManager: Starting load user data.');
			
			var d = new Promises.Deferred() 
			if(gapi.client.plus){
				gapi.client.plus.people.get({
					'userId': 'me'
				})
				.then(
					(user)=>{
						this.$log.debug('ConnectionManager: Fulfilling User data request.');
						d.fulfill(user)
					},
					(err) => {
						this.$log.error('ConnectionManager: Rejecting Google+ library request.');
						d.reject(Strings.ERROR_USER_DATA)
						}
				);
			}
			else {
				this.$log.error('ConnectionManager: Rejecting Google+ library request.');
				d.reject(Strings.ERROR_PLUS_NOT_FOUND);
			}
			
			this.$log.debug('ConnectionManager: Returning User data request promise.');
			return d.promise();
		}
		
		
		/*****************************************************************---
		 * Load Analytics Client library
		 */
		public loadAnalytics(): Promises.Promise {
			
			this.$log.debug('ConnectionManager: Starting load Analytics librabry.');
			
			var d = new Promises.Deferred() 
			
			gapi.client.load('analytics', 'v3', () => {
				if(gapi.client.analytics){
					this.$log.debug('ConnectionManager: Fulfiiling Analytics library request.');
					d.fulfill();
				}
				else {
					this.$log.error('ConnectionManager: Rejecting Analytics librabry request.');
					d.reject(Strings.ERROR_ANALYTICS_NOT_FOUND)
				}
			});
			
			this.$log.debug('ConnectionManager: Returning Analyitics loadingpPromise');
			return d.promise();
		}
		
		
		/**
		 * logout user. Delete his saved token.
		 */
		public logout(){
			this.authorizeM.logout();
		}
	}
}