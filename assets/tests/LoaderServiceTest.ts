///<reference path="../src/reference.ts" />
describe('Service: LoaderService', () => {
	
	var loaderService: application.services.LoaderService,
		$timeout;
		
	beforeEach(() => {
		
		/*angular.mock.module(function($provide) {
			$provide.service('$document', function(){
				this.find = jasmine.createSpy('find');
			})
		});*/
		
		/*angular.mock.module({
			'$document': {
				find: function(selector){
					return new Array(document.createElement('body'));
				}
			}
		});*/
		
		angular.mock.module('GAManager');
	});
	
	beforeEach(angular.mock.inject((_$timeout_, _loaderService_) => {
		loaderService = _loaderService_;
		$timeout = _$timeout_;
	}));
	
	it('Should has the general element set to BODY element.',() => {
		expect(loaderService.generalElement).toBe(document.getElementsByTagName('body')[0])
	})
	
	describe('Method: showLoader()',() => {
		it('Should has the initial loading state set to false.', () => {
			expect(loaderService.loadingState).toBeFalsy();
		})
		
		it('Should has the initial classname of general element not mathed with "loading" or "loaded".', () => {
			expect(loaderService.generalElement.className).not.toMatch('loading');
			expect(loaderService.generalElement.className).not.toMatch('loaded');
		})
		
		it('Should return true after success execution.', () => {
			expect(loaderService.showLoader()).toBeTruthy();
		});
		
		it('Should add "loading" class to general element (body).', () => {
			loaderService.showLoader()
			expect(loaderService.generalElement.className).toMatch('loading');
		});
		
		it('Should set loading state to true.', () => {
			loaderService.showLoader()
			expect(loaderService.loadingState).toBeTruthy();
		})
		
		it('Should return false if is already showed.', () => {
			loaderService.showLoader()
			expect(loaderService.showLoader()).toBeFalsy();
		})
	})
	
	describe('Method: hideLoader()', () => {
		
		beforeEach(() => {
			loaderService.showLoader();
		})
		
		it('Should has the initial loading state set to true.', () => {
			expect(loaderService.loadingState).toBeTruthy();
		})
		
		it('Should has the initial classname of general element mathed with "loading".', () => {
			expect(loaderService.generalElement.className).toMatch('loading');
		})
		
		it('Should return true after success execution.', () => {
			expect(loaderService.hideLoader()).toBeTruthy();
		});
		
		it('Should remove "loading" class from general element (body).', () => {
			loaderService.hideLoader();
			expect(loaderService.generalElement.className).not.toMatch('loading');
		});
		
		it('Should add "loaded" class to general element (body).', () => {
			loaderService.hideLoader();
			expect(loaderService.generalElement.className).toMatch('loaded');
		});
		
		it('Should remove "loaded" class from general element (body) after 3s.', () => {
			loaderService.hideLoader();
			
			$timeout.flush();
			$timeout.verifyNoPendingTasks();
			
			expect(loaderService.generalElement.className).not.toMatch('loaded');
		});
		
		it('Should set loading state to false.', () => {
			loaderService.hideLoader();
			expect(loaderService.loadingState).toBeFalsy();
		})
		
		it('Should return false if is already hided.', () => {
			loaderService.hideLoader();
			expect(loaderService.hideLoader()).toBeFalsy();
		});			
	});
});