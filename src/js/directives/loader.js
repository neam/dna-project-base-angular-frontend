angular.module('Gapminder').directive('loader', ['NavigationService', function(NavigationService) {
    return {
        restrict: 'AE',
        link: function($scope, element, attrs) {
            var loading = true;

            $scope.$on('startedLoading', function() {
                loading = false;
            });

            $scope.$on('finishedLoading', function() {
                loading = false;
            });

            /**
             * Checks if the spinner should be shown.
             * @returns {boolean}
             */
            $scope.showSpinner = function() {
                return loading;
            };
        },
        templateUrl: NavigationService.createRawUrl('/templates/directives/loader.html'),
        transclude: true
    };
}]);
