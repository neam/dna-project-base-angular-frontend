angular.module('Gapminder').directive('logo', function(urlManager, ASSET_URL) {
  return {
    restrict: 'E',
    scope: {
      cssClass: '@'
    },
    controller: function($scope) {
      $scope.assetUrl = ASSET_URL;
      $scope.createTemplateUrl = urlManager.createTemplateUrl;
    },
    templateUrl: urlManager.createTemplateUrl('/directives/logo.html')
  };
});
