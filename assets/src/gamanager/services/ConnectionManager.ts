module gamanager {
	
	export class ConnectionManager{
		
		// Replace with your client ID from the developer console.
  		private CLIENT_ID: string = '1020473408261-7fg0f5kq946c8sgrgr22j4qi931v3eit.apps.googleusercontent.com';

		// Set authorized scope.
		private SCOPES: Array<string> = ['https://www.googleapis.com/auth/analytics.readonly'];
		
		
		constructor(private gam: GAManager){}
		
		
		public authorize(): Promises.Promise {
			
			console.log('Starting Authorize');
									
			var authData = {
				client_id: this.CLIENT_ID,
				scope: this.SCOPES,
				immediate: false
			};
			
			var d = new Promises.Deferred();
			
			gapi.auth.authorize(authData, (response: GoogleApiOAuth2TokenObject) => {
				if(response.error) { 
					console.log('Authorize Error');
					d.reject(response.error);
				}
				else {
					console.log('Authorization OK');
					d.fulfill('neser');
				}
			});
			
			console.log('Returning Authorize promise');
			
			return d.promise();
		}
		
		public loadAnalytics(): Promises.Promise {
			var d = new Promises.Deferred() 
			
			gapi.client.load('analytics', 'v3', () => {
				if(gapi.client.analytics){
					d.fulfill('yes');
				}
				else {
					d.reject('no')
				}
			});
			
			return d.promise();
			
			
		}
	}
}