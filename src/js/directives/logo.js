angular.module('Gapminder').directive('logo', function(urlManager, assetUrl) {
  return {
    restrict: 'E',
    scope: {
      cssClass: '@'
    },
    controller: function($scope) {
      $scope.assetUrl = assetUrl;
    },
    templateUrl: urlManager.createTemplateUrl('/directives/logo.html')
  };
});
