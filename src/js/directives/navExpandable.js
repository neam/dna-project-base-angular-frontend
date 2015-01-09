angular.module('Gapminder').directive('navExpandable', [
    'NavigationService',
    'menuFactory',
function(
    NavigationService,
    menuFactory
) {
    return {
        restrict: 'A',
        scope: {
            items: '='
        },
        controller: ['$scope', function($scope) {
            $scope.navigation = NavigationService;
            menuFactory.buildTree(menuFactory.type.HOME, menuFactory.getHomeTreeData());
            $scope.items = menuFactory.getHomeMenuItems();
        }],
        templateUrl: NavigationService.createTemplateUrl('/directives/nav-expandable.html')
    };
}]);
