angular.module('Gapminder').directive('navExpandable', function(urlManager, menuFactory) {
  return {
    restrict: 'A',
    scope: {
      items: '='
    },
    controller: ['$scope', function($scope) {
      $scope.navigation = urlManager;
      menuFactory.buildTree(menuFactory.type.HOME, menuFactory.getHomeTreeData());
      $scope.items = menuFactory.getHomeMenuItems();
    }],
    templateUrl: urlManager.createTemplateUrl('/directives/nav-expandable.html')
  };
});
