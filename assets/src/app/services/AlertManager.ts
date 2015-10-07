///<reference path="../../reference.ts" />
module application {
	export class AlertManager {
				
		constructor(private $rootScope, private $log){
			
		}
		  
		
		/*******************************************************
		 * Add Success alert to alerts array
		 */
		public showSuccessAlert(msg: string){
			this.$log.debug('AlertManager: Handling Success');
			this.$rootScope.alerts.push({
				bsType: "success",
				message: msg,
				type: "Success: ",
				icon: "ok-sign"
			});
			this.$rootScope.$apply();
		}
		
		
		/*******************************************************
		 * Add Info alert to alerts array
		 */
		public showInfoAlert(msg: string){
			this.$log.debug('AlertManager: Handling Success');
			this.$rootScope.alerts.push({
				bsType: "info",
				message: msg,
				type: "Info: ",
				icon: "info-sign"
			});
			this.$rootScope.$apply();
		}
		
		
		/*******************************************************
		 * Add Warning alert to alerts array
		 */
		public showWarningAlert(msg: string){
			this.$log.debug('AlertManager: Handling Success');
			this.$rootScope.alerts.push({
				bsType: "warning",
				message: msg,
				type: "Warning: ",
				icon: "exclamation-sign"
			});
			this.$rootScope.$apply();
		}
		
		
		/*******************************************************
		 * Add Error alert to alerts array
		 */
		public showErrorAlert(msg: string){
			this.$log.debug('AlertManager: Handling Error');
			this.$rootScope.alerts.push({
				bsType: "danger",
				message: msg,
				type: "Error: ",
				icon: "remove-sign"
			});
			this.$rootScope.$apply();
		}
	}
}