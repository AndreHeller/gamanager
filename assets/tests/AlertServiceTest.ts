///<reference path="../src/reference.ts" />
describe('Service: AlertService', () => {
	
	var alertService: application.services.AlertService,
		mockRootScope: any;
		
	//Alert Types
	var types: Array<string> = ['success','info','warning','danger'];
	//Icons
	var icons: Array<string> = ['ok-sign','info-sign','exclamation-sign','remove-sign'];
	//Message
	var msg: string = "Message!";
	
	
	beforeEach(function() {
		angular.mock.module('GAManager')
	});
	
	beforeEach(angular.mock.inject(function($rootScope, _alertService_: application.services.AlertService) {
		mockRootScope = $rootScope;
		alertService = _alertService_;
	}));	
	
	describe('Method: addAlert()', () => {
		
		it('Should add alert into rootScope.alerts array.', () =>{
		
			alertService.addAlert(types[3], msg);
			
			expect(mockRootScope.alerts).toContain(jasmine.objectContaining({
				'msg': msg,
				'type': types[3]
			}));
		});
		
		it('Should set specific icon based on provided type.', () => {
			for (var i = 0; i < types.length; i++){
				var alert = alertService.addAlert(types[i], msg); 
				
				expect(alert.icon).toEqual(icons[i])	
			}
		});
	});
	
	
	
	describe('Method: closeAlert()', () => {
		it('Should remove alert from rootScope.alerts array.', function() {
			var msg = "test",
				type = types[3]; //"danger"
			
			var alert = alertService.addAlert(type,msg);
			
			expect(mockRootScope.alerts).toContain(jasmine.objectContaining({
				'msg': msg,
				'type': type
			}));
			
			alertService.closeAlert(alert);
			
			expect(mockRootScope.alerts).not.toContain(jasmine.objectContaining({
				'msg': msg,
				'type': type
			}));
		});
	})
});