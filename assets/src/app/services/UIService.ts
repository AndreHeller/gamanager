///<reference path="../../reference.ts" />
module application.services {
	/**
	 * Class UIService represents service which controls user interface. 
	 * 
	 * It uses some other services and manage them as a complex plus add some 
	 * higher functionality.
	 * 
	 * This service is one of main and should be used as connection point from 
	 * app controllers. 
	 *
	 * @author  André Heller; anheller6gmail.com
	 * @version 3.00 — 07/2015
	 */
	export class UIService
	{
	//== CLASS ATTRIBUTES ==========================================================
			
		//Angular DI 
		public static $inject = ['$rootScope','$document','$log','$timeout','alertService'];
		
	//== INSTANCE ATTRIBUTES =======================================================		
		
		
		private loadingState: boolean = false;
		
		private loadingTimeoutPromise: ng.IPromise<any>;
		
	//== CLASS GETTERS AND SETTERS =================================================
	//== OTHER NON-PRIVATE CLASS METHODS =========================================== 
	
	//##############################################################################
	//== CONSTUCTORS AND FACTORY METHODS =========================================== 	
		
		constructor(
			private $rootScope: any, 
			private $document: ng.IDocumentService, 
			private $log: ng.ILogService,
			private $timeout: ng.ITimeoutService,
			private alert: services.AlertService
		){
			
		} 
		
		
	//== INSTANCE GETTERS AND SETTERS ==============================================
	//== OTHER NON-PRIVATE INSTANCE METHODS ========================================		
		
		/**
		 * Hide/Show User interface. If true, UI is hidden.
		 */
		public setLoading(loading: boolean): void{
			this.$log.debug('UIManager: Setting loading mode to ' + loading);		
			
			//Change class on BODY element, which is necessary for CSS animation
			var generalElement = this.$document.find('body')[0];
			
			//Hide UI
			if(loading){
				this.loadingTimeoutPromise = this.setLoadingTimeout();
				this.addClass(generalElement, 'loading');
			}
			//Re-Open UI
			else {
				this.$timeout.cancel(this.loadingTimeoutPromise);
				this.loadingTimeoutPromise = null;
				
				this.removeClass(generalElement, 'loading');
				this.addClass(generalElement, 'loaded');
				
				this.$timeout(
					() => {
						this.removeClass(generalElement,'loaded')
					},
					3000
				);
			}
			
			//Set state for getLoading method
			this.loadingState = loading
		}
		
		
		/**
		 * Show Alert message based on type (success,info,warning,error). 
		 * You can use AlertService static variables insted of that.
		 * In default shows error alert.
		 * 
		 * The other optional parameter is close timeout in milliseconds. 
		 * Without them the alert never hide itself.
		 */
		public showAlert(msg: string, type?: string, timeout?: number){
			type = type || "danger";
			
			this.$log.debug('AlertManager: Handling ' + type);
			
			var alert: Alert = this.alert.add(type, msg);

			if(timeout){
				this.$timeout(
					() => {
						this.alert.closeAlert(alert)
					},
					timeout
				)
			}
		}
		
	//== PRIVATE AND AUXILIARY CLASS METHODS =======================================
	//== PRIVATE AND AUXILIARY INSTANCE METHODS ====================================		
		
		/** 
		 * Set timeout when loading screen switch back to false and throw a timout error
		 */
		private setLoadingTimeout(time?: number): ng.IPromise<any>{
			time = time || 30000; //30 sec
			
			return this.$timeout(
					(param) => {
						this.setLoading(param);
						this.showAlert(gamanager.Strings.ERROR_REQUEST_TIMEOUT);
					},
					5000, //Timeout
					true, //Use $apply
					false // loading = false
			);
			
		}
		
		
		/**
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
		
		
		/**
		 * Remove class from an alement. return false of there is no class.
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
		}
	}
}