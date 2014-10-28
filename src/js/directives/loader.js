angular.module('Gapminder').directive('loader', ['$rootScope', function($rootScope) {
    return {
        restrict: 'AE',
        link: function($scope, element, attrs) {
            if (angular.isDefined(attrs['showWhenLoading'])) {
                $scope.$on('startedLoading', function() {
                    return element.show();
                });

                $scope.$on('finishedLoading', function() {
                    return element.hide();
                });
            } else if (angular.isDefined(attrs['hideWhenLoading'])) {
                $scope.$on('startedLoading', function() {
                    return element.hide();
                });

                $scope.$on('finishedLoading', function() {
                    return element.show();
                });
            }
        }
    };
}]);
