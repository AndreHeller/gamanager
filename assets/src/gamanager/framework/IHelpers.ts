///<reference path="../../reference.ts" />
module gamanager {
	export interface ParcialAccount {
		id: string,
		name: string,
		webProperties: Array<ParcialWebProperty>						
	}
	
	export interface ParcialWebProperty {
		id: string,
		name: string,
		internalWebPropertyId: string,
		level: string,
		profiles: Array<ParcialProfile>						
	}
	
	export interface ParcialProfile {
		id: string,
		name: string,
		type: string						
	}
}