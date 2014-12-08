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
            NavigationService.setPageTitle(item.attributes.heading);
            $scope.item = item;
            $rootScope.$broadcast('customPageLoadSuccess', item);
        }, function() {
            $scope.notFound();
        });

    /**
     * Returns a URL to a template based on the loaded item.
     * @returns {string}
     */
    $scope.getTemplateUrl = function() {
        if (angular.isDefined($scope.item) && $scope.item.item_type === 'go_item') {
            return NavigationService.createTemplateUrl('/states/go-item.html');
        } else {
            return NavigationService.createTemplateUrl('/states/custom-page.html');
        }
    };
}]);
