angular.module('Gapminder').directive('navExpandable', [
    'NavigationService',
    'MenuService',
function(
    NavigationService,
    MenuService
) {
    return {
        restrict: 'A',
        scope: {
            items: '='
        },
        controller: ['$scope', function($scope) {
            MenuService.buildTree(MenuService.type.HOME, MenuService.getHomeTreeData());
            $scope.items = MenuService.getHomeMenuItems();
        }],
        templateUrl: NavigationService.createTemplateUrl('/directives/nav-expandable.html')
    };
}]);
