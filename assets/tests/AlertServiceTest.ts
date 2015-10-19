///<reference path="../src/reference.ts" />
describe('AlertService: ', () => {
	
	var alertService: application.services.AlertService,
		mockRootScope: any;
	
	beforeEach(function() {
		angular.mock.module('GAManager')
	});
	
	beforeEach(angular.mock.inject(function($rootScope, _alertService_: application.services.AlertService) {
		mockRootScope = $rootScope;
		alertService = _alertService_;
	}));
	
	//Alert Types
	var types: Array<string> = ['success','info','warning','danger'];
	//Icons
	var icons: Array<string> = ['ok-sign','info-sign','exclamation-sign','remove-sign'];
	
	
	it('Method addAlert(): Should add alert into rootScope.alerts array.', function() {
		var msg = "test",
			type = types[3]; //"danger"
		
		alertService.addAlert(type, msg);
		
		expect(mockRootScope.alerts).toContain(jasmine.objectContaining({
			'msg': msg,
			'type': type
		}));
	});
	
	
	it('Method closeAlert(): Should remove alert from rootScope.alerts array.', function() {
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
	
	
	it('Method getAlertIcon(): Should return specific icon based on provide type.', function() {
		for (var i = 0; i < types.length; i++){
			expect(alertService.getAlertIcon(types[i])).toEqual(icons[i])	
		}
	});
	
});