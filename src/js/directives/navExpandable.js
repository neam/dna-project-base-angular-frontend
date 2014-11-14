angular.module('Gapminder').directive('navExpandable', ['NavigationService', function(NavigationService) {
    return {
        restrict: 'A',
        scope: {
            items: '='
        },
        templateUrl: NavigationService.createTemplateUrl('/directives/nav-expandable.html')
    };
}]);
