///<reference path="../../reference.ts" />
module gamanager {
	export class UIManager {
		//Angular DI 
		public static $inject = ['$rootScope','$document','$log'];
		
		//Static types of alert, used in alert(msg, TYPE);
		public static ALERT_SUCCESS: string = "success";
		public static ALERT_INFO: string = "info";
		public static ALERT_WARNING: string = "warning";
		public static ALERT_ERROR: string = "error";
		
		
		private loadingState: boolean = false;
		private alertManager: AlertManager;
		
		
		constructor(private $rootScope, private $document, private $log){
			this.alertManager = new AlertManager($rootScope, $log);
		} 
		
		
		/********************************************************
		 * Hide/Show User interface. If true, UI is hidden.
		 */
		public setLoading(loading: boolean): void{
			this.$log.debug('UIManager: Setting loading mode to ' + loading);
			
			//Change class on BODY element, which is necessary for CSS animation
			var generalElement = this.$document.find('body')[0];
			
			//Hide UI
			if(loading){
				this.addClass(generalElement, 'loading');
			}
			//Re-Open UI
			else {
				this.removeClass(generalElement, 'loading');
				this.addClass(generalElement, 'loaded');
				
				setTimeout(() => {this.removeClass(generalElement,'loaded')}, 3000);
			}
			
			//Set state for getLoading method
			this.loadingState = loading
		}
		
		
		/*******************************************************
		 * Returns actual state of loading. True if, UI is hidden
		 */
		public getLoadingState(): boolean {
			return this.loadingState;
		}
		
		
		/******************************************************
		 * Show Alert message based on type (success,info,warnign,error).
		 * In default shows error.
		 */
		public alert(msg: string, type?: string ){
			switch (type) {
				case 'success':
					this.alertManager.showSuccessAlert(msg);
					break;
					
				case 'info':
					this.alertManager.showInfoAlert(msg);
					break;
					
				case 'warning':
					this.alertManager.showWarningAlert(msg);
					break;
			
				case 'error':
					this.alertManager.showErrorAlert(msg);
					break;
				
				default:
					this.alertManager.showErrorAlert(msg);
					break;
			}
		}
		
		
		
		
		/******************************************************************
		 * Add class to an element. Return false if there already is one.
		 */
		private addClass(element: HTMLElement, className: string): boolean{
			if(!element.className.search(new RegExp(".*" + className + ".*"))){
				return false;
			}
			else {
				element.className += " " + className;
				return true; 
			}
		};
		
		
		/***************************************************************
		 * Remove class from an alement.
		 */
		private removeClass(element: HTMLElement, className: string): boolean{
			if(element.className.search(new RegExp(".*" + className + ".*"))){
				return false; 
			}
			else {
				var finalClassName: string = "",
					classes = element.className.split(' ');
				
				for(var i: number; i < classes.length; i++){
					if(classes[i] != className){
						finalClassName += " " + classes[i];
					}
					else {
						//never should happen
						return false
					}		                 
				}	
				
				element.className = finalClassName;	
				return true;
			}
		};
	}
}