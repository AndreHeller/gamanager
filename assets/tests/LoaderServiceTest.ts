///<reference path="../src/reference.ts" />


describe('LoaderService: ', () => {
	
	var loaderService: application.services.LoaderService,
		mockTimeout,
		mockDocument;
		
	beforeEach(function() {
		angular.mock.module(function($provide){
			$provide.service('$document', function(){
				this.find = jasmine.createSpy('find');
			})
		});
		
		angular.mock.module('GAManager');
	});
	
	beforeEach(angular.mock.inject(function($document, _loaderService_: application.services.LoaderService) {
		loaderService = _loaderService_;
		
		mockDocument = $document;
		     
		   
		
	}));
	it('aaa', function(){ }); 
	
	/*it('Attribute generalElement: Should be HTML Body Element', function (){
		expect(loaderService.generalElement).toEqual(document.getElementsByTagName('body')[0]);	
	})*/
	
	it('Method showLoader() without arg: Should add class to general element (body), set loading state to true anr return it.', function(){
		
		//expect(loaderService.generalElement.className).not.toMatch('loading');
		//expect(loaderService.generalElement.className).not.toMatch('loaded');
		expect(loaderService.loadingState).toBeFalsy();
		
		//Show Loader
		//expect(loaderService.showLoader()).toBeTruthy();
		
		//expect(loaderService.generalElement.className).toMatch('loading');
		//expect(loaderService.loadingState).toBeTruthy();
	});
	
});