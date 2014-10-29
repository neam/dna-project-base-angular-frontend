angular.module('Gapminder').directive('loader', ['$rootScope', '$compile', function($rootScope, $compile) {
    return {
        restrict: 'AE',
        link: function($scope, element, attrs) {
            // TODO: Clean up and remove else-if conditions.
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
                return angular.isDefined(attrs['spinner']) && loading;
            };
        },
        templateUrl: '/templates/directives/loader.html',
        transclude: true
    };
}]);
