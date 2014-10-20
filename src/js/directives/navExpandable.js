angular.module('Gapminder').directive('navExpandable', [function() {
    return {
        restrict: 'A',
        controller: function($rootScope, $scope, $http, ApiService) {
            $http.get(ApiService.getApiUrl('/navbar/items', 'GET'))
                .then(function(res) {
                    $scope.items = res.data;
                    console.log($scope.items);
                });
        },
        templateUrl: '/templates/directives/nav-expandable.html'
    };
}]);
