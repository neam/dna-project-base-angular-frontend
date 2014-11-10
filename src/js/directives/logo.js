angular.module('Gapminder').directive('logo', [function() {
    return {
        restrict: 'E',
        scope: {
            cssClass: '@'
        },
        templateUrl: 'templates/directives/logo.html'
    };
}]);
