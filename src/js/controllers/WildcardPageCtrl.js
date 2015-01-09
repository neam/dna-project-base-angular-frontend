angular.module('Gapminder').controller('WildcardPageCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    'itemManager',
    'NavigationService',
function(
    $scope,
    $rootScope,
    $location,
    itemManager,
    NavigationService
) {
    $scope.itemService = itemManager;

    itemManager.loadItem()
        .success(function(item) {
            NavigationService.setPageTitle(item.attributes.heading);
            itemManager.removeAdminContributorFromItem(item);
            $scope.item = item;
            $scope.itemCategory = item.attributes.composition_type;
            $rootScope.$broadcast('wildcardPageLoadSuccess', item);
        })
        .error(function() {
            NavigationService.notFound();
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
