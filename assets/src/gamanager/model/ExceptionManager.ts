///<reference path="../../reference.ts" />
module gamanager {
	export class ExceptionManager {
		public static reportException(exception: any, type?: ExceptionType){
			type = type || ExceptionType.System;
			
			switch (type) {
				case ExceptionType.User:
					//TODO - dostat se odtud k UI manageru a navěsit chybu i uživateli
					console.error(exception);
					break;
			
				default:
					console.error(exception);
					break;
			}
		}	
	}
	
	export enum ExceptionType {
		System,
		User
	}
}