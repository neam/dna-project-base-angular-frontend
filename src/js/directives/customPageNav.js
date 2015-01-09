angular.module('Gapminder').directive('customPageNav', function($rootScope, $location, menuFactory, urlManager) {
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    controller: ['$scope', function($scope) {
      $rootScope.$on('wildcardPageLoadSuccess', function(event, item) {
        if (angular.isDefined(item.root_page)) {
          menuFactory.buildTree(menuFactory.type.ROOT_PAGE, item.root_page);
        }

        menuFactory.getChildrenOfCurrentRootPageItem()
          .then(function(children) {
            $scope.children = children;
          });

        menuFactory.getParentOfCurrentRootPageItem()
          .then(function(parent) {
            $scope.parent = parent;
          });
      });

      /**
       * Checks if the current page has children.
       * @returns {boolean}
       */
      $scope.hasChildren = function() {
        return _.isArray($scope.children);
      };

      /**
       * Checks if the current page has a parent.
       * @returns {boolean}
       */
      $scope.hasParent = function() {
        return angular.isDefined($scope.parent);
      };

      /**
       * Checks if the item has an icon.
       * @returns {boolean}
       */
      $scope.hasIcon = function() {
        return false; // TODO: Fix this once page icons have been implemented.
      };

      /**
       * @see urlManager#createUrl
       */
      $scope.createUrl = function(route) {
        if (angular.isDefined(route)) {
          return urlManager.createUrl(route);
        }
      };
    }],
    templateUrl: urlManager.createTemplateUrl('/directives/custom-page-nav.html')
  };
});
