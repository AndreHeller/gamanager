///<reference path="../../reference.ts" />
module gamanager {
	/**
	 * Instances of class Account represent Google Analytics accounts. 
 	 * Each account has several properties (class:WebProperty) and 
 	 * settings (methods) like creating properties, filters, etc.
 	 *
 	 * @author  André Heller; anheller6@gmail.com
 	 * @version 1.00 — 07/2015
	 */
	export class Account implements ParcialEntity
	{
	//== CLASS ATTRIBUTES ==========================================================
	//== INSTANCE ATTRIBUTES =======================================================
		
		//If account instance was filly filled or its still parcial
		private parciality = true;
		
		//Storage for properties
		private _properties: util.StringMap<WebProperty> = new util.StringMap<WebProperty>();
		
	//== CLASS GETTERS AND SETTERS =================================================
	//== OTHER NON-PRIVATE CLASS METHODS =========================================== 
	
	//##############################################################################
	//== CONSTUCTORS AND FACTORY METHODS =========================================== 
		
		/**
		 * Creates a new Account. Constructor should never be called directly.
		 * Use factory method in AccountManager class instead.
		 * 
		 */
		constructor(
			private _id: string,
			private _name: string,
			webProperties: Array<ParcialWebProperty>
		){
			for(var i: number = 0; i < webProperties.length;i++){
				this.createProperty(webProperties[i]);
			}
		}
		
	//== INSTANCE GETTERS AND SETTERS ==============================================
			
		public get name(): string {
			return this._name;
		}
		
		public get id(): string {
			return this._id;
		}
		
		public get properties(): util.StringMap<WebProperty>{
			return this._properties;
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
		 * Download full info of all acounts. Return promise.
		 */
		/*public list(): Promises.Promise{
			var d = new Promises.Deferred();
			
			gapi.client.analytics.management.accounts.list()
				.then(
					(response) => {d.fulfill(response)},
					(error) => {d.reject(error)}
				);
				
			return d.promise();				
		}*/
		
	//== PRIVATE AND AUXILIARY CLASS METHODS =======================================
	//== PRIVATE AND AUXILIARY INSTANCE METHODS ====================================
	
		/**
		 * Creates a new property and put it into properties stringMap. 
		 */
		private createProperty(property: ParcialWebProperty): void{
			this._properties.put(
				property.id,
				new WebProperty(
					property.id,
					property.name,
					property.internalWebPropertyId,
					property.level,
					this._id,
					property.profiles
					)
			);
		}
	}
}