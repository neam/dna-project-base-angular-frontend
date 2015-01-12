angular.module('Gapminder').directive('contributorThumbs', function(urlManager, itemManager) {
  return {
    restrict: 'E',
    scope: {
      contributors: '='
    },
    controller: function($scope) {
      $scope.itemMgr = itemManager;

      // Filter contributors
      $scope.$watch('contributors', function() {
        $scope.validContributors = [];

        angular.forEach($scope.contributors, function(contributor) {
          if (angular.isDefined(contributor.thumbnail_url) && contributor.thumbnail_url) {
            $scope.shouldRenderContainer = true;
            $scope.validContributors.push(contributor);
          }
        });
      })
    },
    templateUrl: urlManager.createTemplateUrl('/directives/contributor-thumbs.html')
  };
});
