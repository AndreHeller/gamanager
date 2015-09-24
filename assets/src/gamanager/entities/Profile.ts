///<reference path="../../reference.ts" />
module gamanager {
	export class Profile {
		
		constructor(
			private id: string,
			private name: string,
			private type: string,
			private accountId: string,
			private webPropertyId: string
		){}
	}
}