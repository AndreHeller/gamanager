module application.directives {
	export function Alerts($templateCache: ng.ITemplateCacheService): ng.IDirective {
		return {
			restrict: 'E',
			template: $templateCache.get('app/directives/alerts/Alerts.html'),
			scope: {},
			link: function(scope:any, element, attr){
				scope.closeAlert = function(index) {
					scope.$parent.alerts[index] = null;
				}
			}
		};

	}
}