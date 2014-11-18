angular.module('Gapminder').controller('CustomPageCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    'CustomPageService',
    'NavigationService',
function(
    $scope,
    $rootScope,
    $location,
    CustomPageService,
    NavigationService
) {
    var routePath = $location.$$path;

    $scope.item = CustomPageService.getItem();

    CustomPageService.init(routePath)
        .then(function(item) {
            NavigationService.setPageTitle(item.heading);
            $scope.item = item;
        }, function(err) {
            $scope.notFound();
        });
}]);
