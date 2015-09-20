///<reference path="../../reference.ts" />
module gamanager {
	export class Account {
		private WEB_PROPERTIES: util.StringMap<WebProperty> = new util.StringMap<WebProperty>();
		
		constructor(
			private appM: AppManager,
			private _id: string,
			private _name: string,
			webProperties: Array<ParcialWebProperty>
		){
			for(var i: number = 0; i < webProperties.length;i++){
				this.WEB_PROPERTIES.put(
						webProperties[i].id,
						new WebProperty(
							this.appM,
							webProperties[i].id,
							webProperties[i].name,
							webProperties[i].internalWebPropertyId,
							webProperties[i].level,
							this._id,
							webProperties[i].profiles
						)
				);
			}
		}
		
		public get name(){
			return this._name;
		}
		
		public get id(){
			return this._id;
		}
	}
}