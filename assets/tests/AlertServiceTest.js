///<reference path="../src/reference.ts" />
describe('AlertService: ', function() {
	
	var mockRootScope,
		alertService;
	
	beforeEach(function(){
		module('GAManager')
	});
	
	beforeEach(inject(function($rootScope, _alertService_){
		mockRootScope = $rootScope;
		alertService = _alertService_;
	}));
	
	//Alert Types
	var types = ['success','info','warning','danger'];
	//Icons
	var icons = ['ok-sign','info-sign','exclamation-sign','remove-sign'];
	
	
	it('Method addAlert(): Should add alert into rootScope.alerts array.', function(){
		var msg = "test", type = types[3];
		
		alertService.addAlert(type,msg);
		
		expect(mockRootScope.alerts).toContain(jasmine.objectContaining({
			'msg': msg,
			'type': type
		}));
	});
	
	
	it('Method closeAlert(): Should remove alert from rootScope.alerts array.', function(){
		var msg = "test", type = types[3];
		
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
	
	
	it('Method getAlertIcon(): Should return specific icon based on provide type.', function(){
		for(var i = 0; i < types.length; i++){
			expect(alertService.getAlertIcon(types[i])).toEqual(icons[i])	
		}
	});
	
});