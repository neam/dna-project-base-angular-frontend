angular.module('Gapminder').controller('ItemCtrl', [
    '$rootScope',
    '$scope',
    '$routeParams',
    '$location',
    'ApiService',
    'NavigationService',
    'baseRoute',
    'Item',
function(
    $rootScope,
    $scope,
    $routeParams,
    $location,
    ApiService,
    NavigationService,
    baseRoute,
    Item)
{
    var itemType = NavigationService.getPartOfPath($location.path(), 0);

    // Get item
    Item.get({id: $routeParams.id}, function(item) {
        $rootScope.pageTitle = item.heading;
        $scope.item = item;
        $scope.itemCategory = getItemCategory(itemType);
    });

    /**
     * Returns an item category.
     * @param {string} itemType item type machine name
     * @returns {string}
     */
    function getItemCategory(itemType) {
        // TODO: Replace with translated strings.
        var labels = {
            exercises: 'Exercises',
            presentations: 'Presentations'
        };

        return angular.isDefined(labels[itemType]) ? labels[itemType] : '';
    }

    /**
     * Creates a link to a related item.
     * @param {string} itemType
     * @param {string} permalink
     * @param {string} lang
     * @returns {string}
     */
    $scope.createRelatedItemUrl = function(itemType, permalink, lang) {
        return baseRoute + '/#/go/' + itemType + '/' + permalink + '/' + lang;
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
