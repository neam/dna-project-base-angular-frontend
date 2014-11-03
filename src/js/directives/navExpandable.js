angular.module('Gapminder').directive('navExpandable', [function() {
    return {
        restrict: 'A',
        scope: {
            items: '='
        },
        templateUrl: 'templates/directives/nav-expandable.html'
    };
}]);
