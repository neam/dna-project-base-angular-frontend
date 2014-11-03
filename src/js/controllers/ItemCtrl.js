angular.module('Gapminder').controller('ItemCtrl', [
    '$rootScope',
    '$scope',
    '$routeParams',
    '$location',
    'ApiService',
    'NavigationService',
    'Item',
function(
    $rootScope,
    $scope,
    $routeParams,
    $location,
    ApiService,
    NavigationService,
    Item)
{
    var itemUrlParam = NavigationService.getPartOfPath(0);

    // Get item
    Item.get({id: $routeParams.id}, function(item) {
        if (validateItemType(item)) {
            $rootScope.pageTitle = item.heading;
            $scope.item = item;
            $scope.itemCategory = getItemCategory(itemUrlParam);
        } else {
            whenItemNotFound();
        }
    }, function(err) {
        whenItemNotFound();
    });

    /**
     * Process 404 logic.
     */
    function whenItemNotFound() {
        $rootScope.pageTitle = 'Not Found';
        $scope.itemNotFound = true;
    }

    /**
     * Checks if the item type matches the item type URL param.
     * @param {} item
     * @returns {boolean}
     */
    function validateItemType(item) {
        return item.composition_type === getItemType(itemUrlParam);
    }

    /**
     * Returns an item category by URL param.
     * @param {string} urlParam (e.g. 'exercises')
     * @returns {string}
     */
    function getItemCategory(urlParam) {
        var paramToItemCategory = {
            exercises: 'Exercises',
            presentations: 'Presentations'
        };

        return angular.isDefined(paramToItemCategory[urlParam]) ? paramToItemCategory[urlParam] : '';
    }

    /**
     * Returns an item type by URL param.
     * @param {string} urlParam (e.g. 'exercises')
     * @returns {string}
     */
    function getItemType(urlParam) {
        var paramToItemTypeMap = {
            exercises: 'exercise',
            presentations: 'presentation'
        };

        return angular.isDefined(paramToItemTypeMap[urlParam]) ? paramToItemTypeMap[urlParam] : '';
    }

    /**
     * Creates a link to a related item.
     * @param {string} compositionType
     * @param {string} slug
     * @returns {string}
     */
    $scope.createRelatedItemUrl = function(compositionType, slug) {
        return ApiService.getCompositionItemPathName(compositionType) + '/' + slug;
    };

    /**
     * Creates a link to a user profile page.
     * @param {number} userId
     * @returns {string}
     */
    $scope.createUserProfileUrl = function(userId) {
        // TODO: Use a real profile URL or make it configurable per environment.
        return 'http://www.gapminder.org/profiles/#/profiles/' + userId;
    };
}]);
