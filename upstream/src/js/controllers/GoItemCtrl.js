angular.module('Gapminder').controller('GoItemCtrl', function($rootScope, $scope, $stateParams, $location, api, urlManager, uiTranslator, itemManager) {
  $scope.itemService = itemManager;

  itemManager.loadItem()
    .success(function(item) {
      if (isRequestedItemType(item)) {
        urlManager.setPageTitle(item.attributes.heading);
        itemManager.removeAdminContributorFromItem(item);
        $scope.item = item;
        $scope.itemCategory = item.attributes.composition_type;
      } else {
        urlManager.notFound();
      }
    })
    .error(function() {
      urlManager.notFound();
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
    var urlParam = urlManager.getPartOfPath(0),
        paramToItemTypeMap = {
          exercises: 'exercise',
          presentations: 'presentation',
          qna: 'qna'
        };

    return angular.isDefined(paramToItemTypeMap[urlParam]) ? paramToItemTypeMap[urlParam] : '';
  }
});
