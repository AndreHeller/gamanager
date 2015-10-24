///<reference path="../src/reference.ts" />
describe('Service: UIService', () => {
	
	var UIService: application.services.UIService,
		$timeout: ng.ITimeoutService,
		alertService: application.services.AlertService,
		loaderService: application.services.LoaderService;
	
	beforeEach(function() {
		
		// Mock for alertService
		angular.mock.module({
			'alertService': {
				addAlert: function(type: string, msg: string){
					// Adding alert
				},
				closeAlert: function(alert: application.services.Alert){
					// Closing alert
				}
			}
		});
		
		angular.mock.module({
			'loaderService': {
				showLoader: function(){
					// Adding alert
				},
				hideLoader: function(){
					// Closing alert
					this.showLoader(false);
				}
			}
		});
		
		angular.mock.module('GAManager');
	});
	
	beforeEach(angular.mock.inject(function(_$timeout_, _loaderService_, _alertService_, _UIService_) {
		$timeout = _$timeout_;
		loaderService = _loaderService_;
		alertService = _alertService_;
		UIService = _UIService_;
		
		
		spyOn(alertService, 'addAlert');
		spyOn(alertService, 'closeAlert');
		
		spyOn(loaderService, 'showLoader');
		spyOn(loaderService, 'hideLoader')
	}));	
	
	describe('Method: showLoader() without args', () => {
		beforeEach(() => {
			UIService.showLoader();
		});
		
		it('Should call LoaderService.showLoader() method', () => {
			expect(loaderService.showLoader).toHaveBeenCalled();
		});
		
		it('Should set timeout to autoclose.', () => {
			var ctrl = false;
			try {
				$timeout.verifyNoPendingTasks();
			} catch (err){
				//Timer exists
				expect(err).toMatch('Deferred tasks to flush.');
				ctrl = true;	
			}
			
			expect(ctrl).toBeTruthy();
		});
		
		it('Should hide loader after timeout.', () => {			
			$timeout.flush();
			
			expect(loaderService.hideLoader).toHaveBeenCalled();
		}) 
	});
	
	describe('Method: showLoader() with false arg', () => {
		beforeEach(() => {
			UIService.showLoader(false);
		});
		
		it('Should call LoaderService.hideLoader() method', () => {
			expect(loaderService.hideLoader).toHaveBeenCalled();
		}); 
		
		it('Should clear timeout.', () => {
			expect($timeout.verifyNoPendingTasks()).toBeUndefined();
		});
	}); 
	
	describe('Method: showAlert()', () => {
		
		beforeEach(() => {
			UIService.showAlert('Message', null, 3000);
		});
		
		it('Should call AlertService.addAlert() method.', () => {
			expect(alertService.addAlert).toHaveBeenCalled();
		});
		 
		it('Should set timeout if its provided.', () => {
			var ctrl = false;
			try {
				$timeout.verifyNoPendingTasks();
			} catch (err){
				//Timer exists
				expect(err).toMatch('Deferred tasks to flush.');
				ctrl = true;	
			}
			
			expect(ctrl).toBeTruthy();
		}); 
		 
		it('Should call AlertService.closeAlert() method if timeout is provided.', () => {
			expect(alertService.closeAlert).not.toHaveBeenCalled();
			
			$timeout.flush();
			
			expect(alertService.closeAlert).toHaveBeenCalled();
		});
		
		afterAll(()=>{
			$timeout.verifyNoPendingTasks();
		});
	});
});