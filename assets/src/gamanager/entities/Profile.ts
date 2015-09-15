module gamanager {
	export class Profile {
		
		constructor(
			private gam: GAManager,
			private id: string,
			private name: string,
			private type: string,
			private accountId: string,
			private webPropertyId: string
		){}
	}
}