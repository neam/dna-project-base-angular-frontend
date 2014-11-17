angular.module('Gapminder').controller('CustomPageCtrl', [
    '$scope',
    '$rootScope',
    'CustomPageService',
    'NavigationService',
function(
    $scope,
    $rootScope,
    CustomPageService,
    NavigationService
) {
    $scope.item = CustomPageService.getItem();
    NavigationService.setPageTitle($scope.item.heading);

    console.log($scope.item);

    // TODO: Handle 404.
}]);
