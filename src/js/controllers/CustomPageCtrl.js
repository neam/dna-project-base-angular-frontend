angular.module('Gapminder').controller('CustomPageCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    'Utils',
    'CustomPageService',
    'NavigationService',
function(
    $scope,
    $rootScope,
    $location,
    Utils,
    CustomPageService,
    NavigationService
) {
    var routePath = $location.$$path;

    NavigationService.overrideBaseRoute();

    CustomPageService.init(routePath)
        .then(function(item) {
            NavigationService.setPageTitle(item.heading);
            $scope.item = item;
        }, function(err) {
            $scope.notFound();
        });
}]);
