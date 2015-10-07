///<reference path="../../reference.ts" />
module gamanager {
	export class AuthorizeManager {
		
		private CLIENT_ID: string = '1020473408261-7fg0f5kq946c8sgrgr22j4qi931v3eit.apps.googleusercontent.com';

		
		private SCOPES: Array<string> = ['https://www.googleapis.com/auth/analytics.readonly',
										 'profile'];
		
		
		constructor(private $log){
			
		}
		
		
		public isAuthorized():boolean{
			if(sessionStorage.getItem('gT')){
				var now = new Date(),
					expire = new Date();
					expire.setSeconds(parseInt(sessionStorage.getItem('gTe')));
					
				if(now < expire){
					return true;	
				}
				else {
					return false;	
				}
			}
			else {
				return false;
			}
		} 
		
		
		public authorize(): Promises.Promise{
			var authData = {
					client_id: this.CLIENT_ID,
					scope: this.SCOPES,
					immediate: false  
				},
				d = new Promises.Deferred(); 
			
			//Pokud uživatel během session už přihlášený byl, přihlásí ho na pozadí bez ukládání okna.
			if(sessionStorage.getItem('gT')){
				
				authData.immediate = true;
				this.clearToken();
			}
			
			gapi.auth.authorize(authData, (response: GoogleApiOAuth2TokenObject) => {
				if(response.error) {
					this.$log.error('AuthorizeManager: Rejecting authorize.'); 
					d.reject(Strings.ERROR_NOT_AUTHORIZED);
				}
				else {
					this.$log.debug('AuthorizeManager: Fullfilling authorize.');
					this.saveToken(response);
					d.fulfill(response);
				}
			});
			
			return d.promise();
		}
		
		
		/**
		 * Logout User. Delete his saved token
		 */
		public logout() {
			this.clearToken();
		}
		
		
		
		
		
		private saveToken(token: GoogleApiOAuth2TokenObject): boolean{
			if(sessionStorage.getItem('gT')){
				return false;
			}
			else {
				sessionStorage.setItem('gT',token.access_token);
				sessionStorage.setItem('gTe',token.expires_in);
				return true;
			}
		}
		
		private clearToken():void {
			sessionStorage.removeItem('gT');
			sessionStorage.removeItem('gTe');
			
		}
		
	}
}