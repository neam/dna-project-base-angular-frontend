angular.module('Gapminder').directive('loader', [
  '$rootScope',
  'urlManager',
function(
  $rootScope,
  urlManager
) {
  return {
    restrict: 'AE',
    link: function($scope, element, attrs) {
      $rootScope.loading = true;

      $scope.$on('startedLoading', function() {
        $rootScope.loading = false;
      });

      $scope.$on('finishedLoading', function() {
        $rootScope.loading = false;
      });

      /**
       * Checks if the spinner should be shown.
       * @returns {boolean}
       */
      $scope.showSpinner = function() {
        return $rootScope.loading;
      };
    },
    templateUrl: urlManager.createTemplateUrl('/directives/loader.html'),
    transclude: true
  };
}]);
