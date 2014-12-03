angular.module('Gapminder').directive('customPageNav', [
    '$rootScope',
    '$location',
    'MenuService',
    'NavigationService',
function(
    $rootScope,
    $location,
    MenuService,
    NavigationService
) {
    return {
        restrict: 'E',
        scope: {
            item: '='
        },
        controller: ['$scope', function($scope) {
            $rootScope.$on('customPageLoadSuccess', function(event, item) {
                MenuService.buildTree(MenuService.type.ROOT_PAGE, item.root_page);

                MenuService.getChildrenOfCurrentRootPageItem()
                    .then(function(children) {
                        $scope.children = children;
                    });

                MenuService.getParentOfCurrentRootPageItem()
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
             * @see NavigationService#createUrl
             */
            $scope.createUrl = function(route) {
                if (angular.isDefined(route)) {
                    return NavigationService.createUrl(route);
                }
            };
        }],
        templateUrl: NavigationService.createTemplateUrl('/directives/custom-page-nav.html')
    };
}]);
