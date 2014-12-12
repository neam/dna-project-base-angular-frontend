angular.module('Gapminder').controller('GoItemCtrl', [
    '$rootScope',
    '$scope',
    '$stateParams',
    '$location',
    'ApiService',
    'NavigationService',
    'i18nService',
    'ItemService',
function(
    $rootScope,
    $scope,
    $stateParams,
    $location,
    ApiService,
    NavigationService,
    i18nService,
    ItemService
) {
    $scope.itemService = ItemService;

    ItemService.loadItem()
        .then(function(item) {
            if (isRequestedItemType(item)) {
                NavigationService.setPageTitle(item.attributes.heading);
                ItemService.removeAdminContributorFromItem(item);
                $scope.item = item;
                $scope.itemCategory = item.attributes.composition_type;
            } else {
                $scope.notFound();
            }
        }, function() {
            $scope.notFound();
        });

    /**
     * Checks if the item type matches the item type URL param.
     * @param {} item
     * @returns {boolean}
     */
    function isRequestedItemType(item) {
        return item.attributes.composition_type === getItemTypeFromUrl();
    }

    /**
     * Returns an item type by URL param.
     * @returns {string}
     */
    function getItemTypeFromUrl() {
        var urlParam = NavigationService.getPartOfPath(0),
            paramToItemTypeMap = {
                exercises: 'exercise',
                presentations: 'presentation',
                qna: 'qna'
            };

        return angular.isDefined(paramToItemTypeMap[urlParam]) ? paramToItemTypeMap[urlParam] : '';
    }
}]);
