///<reference path="../../reference.ts" />
module gamanager {
	/**
	 * Instances of class {@code WebProperty} represent Google Analytics webproperty
	 * with all possible properties and all Google Analytics profiles.
	 *
	 * @author  André Heller; anheller6gmail.com
	 * @version 1.00 — 07/2015
	 */
	export class WebProperty implements ParcialEntity
	{
	//== CLASS ATTRIBUTES ==========================================================
	//== INSTANCE ATTRIBUTES =======================================================
		
		//If account instance was filly filled or its still parcial
		private parciality = true;
		
		//Storage for profiles
		private _profiles: util.StringMap<Profile> = new util.StringMap<Profile>();
		
	//== CLASS GETTERS AND SETTERS =================================================
	//== OTHER NON-PRIVATE CLASS METHODS =========================================== 
	
	//##############################################################################
	//== CONSTUCTORS AND FACTORY METHODS =========================================== 
		
		/**
		 * Creates a new Webrpoeprty. Constructor should never be called directly.
		 * Use factory method in Accounts class instead.
		 */	
		constructor(
			private _id: string,
			private _name: string,
			private _internalId: string,
			private _level: string,
			private _accountId: string,
			profiles: Array<ParcialProfile>
		){
			for(var i: number = 0; i < profiles.length;i++){
				this.createProfile(profiles[i]);
			}
		}
		
	//== INSTANCE GETTERS AND SETTERS ==============================================
	
		public get name(): string {
			return this._name;
		}
		
		public get id(): string {
			return this._id;
		}
		
		public get internalId(): string {
			return this._id;
		}
		
		//Standard / Premium
		public get level(): string {
			return this._id;
		}
		
		public get profiles(): util.StringMap<Profile>{
			return this._profiles;
		}
	
	//== OTHER NON-PRIVATE INSTANCE METHODS ========================================
	
		/**
		 * Returnn parciality. If instance already was fully loaded.
		 */
		public isParcial(): boolean{
			return this.parciality;
		}
		
		
		/**
		 * Load the rest of instance if its parciality equals true.
		 */
		public loadRest(): boolean{
			if(this.parciality){
				//TODO - vyřešit problém absence get methody API
				console.error('This method is not supported yet.');
				return false;
			}
			else return false;
		}
		
		
		/**
		 * Download full info of all properties of an account. Return promise.
		 */
		public get(): Promises.Promise{
			var d = new Promises.Deferred();
			
			if(this.isParcial){
				gapi.client.analytics.management.webproperties.list(
					{
						'accountId': this._accountId,
						'webPropertyId': this._id
					}
				)
				.then(
					(response) => {this.parciality = false;d.fulfill(response);},
					(error) => {d.reject(error);}
				);
			}
			else {
				d.reject(Strings.ERROR_PROPERTY_ALREADY_FULL);
			}
				
			return d.promise();				
		}
		
		
		/**
		 * Download full info of all properties of an account. Return promise.
		 */
		public list(): Promises.Promise{
			var d = new Promises.Deferred();
			
			gapi.client.analytics.management.webproperties.list({'accountId':this._accountId})
				.then(
					(response) => {d.fulfill(response);},
					(error) => {d.reject(error);}
				);
			
			return d.promise();				
		}
		
		
	//== PRIVATE AND AUXILIARY CLASS METHODS =======================================
	//== PRIVATE AND AUXILIARY INSTANCE METHODS ====================================
	
		/**
		 * Creates a new profile(view) and put it into profiles stringMap. 
		 */
		private createProfile(profile: ParcialProfile): void{
				this._profiles.put(
					profile.id, 
					new Profile(
						profile.id,
						profile.name,
						profile.type,
						this._accountId,
						this._id
					)
				);
			}
		}
	}
