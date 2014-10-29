angular.module('Gapminder').directive('navExpandable', ['NavigationService', function(NavigationService) {
    return {
        restrict: 'A',
        scope: {
            items: '='
        },
        templateUrl: NavigationService.createRawUrl('/templates/directives/nav-expandable.html')
    };
}]);
