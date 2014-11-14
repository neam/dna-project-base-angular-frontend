angular.module('Gapminder').directive('logo', ['NavigationService', 'assetUrl', function(NavigationService, assetUrl) {
    return {
        restrict: 'E',
        scope: {
            cssClass: '@'
        },
        controller: function($scope) {
            $scope.assetUrl = assetUrl;
        },
        templateUrl: NavigationService.createTemplateUrl('/directives/logo.html')
    };
}]);
