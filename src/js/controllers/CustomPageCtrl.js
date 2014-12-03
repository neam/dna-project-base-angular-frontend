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

    CustomPageService.init(routePath)
        .then(function(item) {
            NavigationService.setPageTitle(item.heading);
            $scope.item = item;
            $rootScope.$broadcast('customPageLoadSuccess', item);
        }, function() {
            $scope.notFound();
        });
}]);
