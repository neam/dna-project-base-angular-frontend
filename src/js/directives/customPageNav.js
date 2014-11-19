angular.module('Gapminder').directive('customPageNav', ['NavigationService', function(NavigationService) {
    return {
        restrict: 'E',
        scope: {
            item: '='
        },
        controller: ['$scope', function($scope) {
            /**
             * Checks if the page has a parent.
             * @returns {boolean}
             */
            $scope.hasParent = function() {
                return angular.isDefined($scope.item)
                    && angular.isArray($scope.item.page_hierarchy.parent_path)
                    && $scope.item.page_hierarchy.parent_path.length > 0;
            };

            /**
             * Checks if the page has a sibling
             * @returns {boolean}
             */
            $scope.hasSibling = function() {
                return angular.isDefined($scope.item)
                    && angular.isArray($scope.item.page_hierarchy.siblings)
                    && $scope.item.page_hierarchy.siblings.length > 0;
            };

            /**
             * Checks if the page has children.
             * @returns {boolean}
             */
            $scope.hasChild = function() {
                return angular.isDefined($scope.item)
                    && angular.isArray($scope.item.page_hierarchy.children)
                    && $scope.item.page_hierarchy.children.length > 0;
            };

            /**
             * Returns all parents.
             * @returns {Array}
             */
            $scope.getParents = function() {
                return $scope.hasParent() ? $scope.item.page_hierarchy.parent_path : [];
            };

            /**
             * Returns all siblings.
             * @returns {Array}
             */
            $scope.getSiblings = function() {
                return $scope.hasSibling() ? $scope.item.page_hierarchy.siblings : [];
            };

            /**
             * Returns all children.
             * @returns {Array}
             */
            $scope.getChildren = function() {
                return $scope.hasChild() ? $scope.item.page_hierarchy.children : [];
            };
        }],
        templateUrl: NavigationService.createTemplateUrl('/directives/custom-page-nav.html')
    };
}]);
