angular.module('Gapminder').controller('CustomPageCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    'Utils',
    'CustomPageService',
    'NavigationService',
    'SirTrevorService',
function(
    $scope,
    $rootScope,
    $location,
    Utils,
    CustomPageService,
    NavigationService,
    SirTrevorService
) {
    var routePath = $location.$$path;

    $scope.sirTrevor = SirTrevorService;

    CustomPageService.init(routePath)
        .then(function(item) {
            NavigationService.setPageTitle(item.heading);
            $scope.item = item;
            $rootScope.$broadcast('customPageLoadSuccess', item);
        }, function() {
            $scope.notFound();
        });
}]);
