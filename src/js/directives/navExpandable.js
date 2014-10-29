angular.module('Gapminder').directive('navExpandable', ['NavigationService', function(NavigationService) {
    return {
        restrict: 'A',
        controller: function($rootScope, $scope, $http, ApiService) {
            $http.get(ApiService.getApiUrl('/navbar/items'))
                .then(function(res) {
                    $scope.items = res.data;
                });
        },
        templateUrl: NavigationService.createRawUrl('/templates/directives/nav-expandable.html')
    };
}]);
