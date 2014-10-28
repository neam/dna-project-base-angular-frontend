angular.module('Gapminder').directive('navExpandable', [function() {
    return {
        restrict: 'A',
        controller: function($rootScope, $scope, $http, ApiService) {
            $http.get(ApiService.getApiUrl('/navbar/items'))
                .then(function(res) {
                    $scope.items = res.data;
                });
        },
        templateUrl: '/templates/directives/nav-expandable.html'
    };
}]);
