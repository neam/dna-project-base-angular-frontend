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
    var itemType = NavigationService.getPartOfPath(0);

    // Get item
    Item.get({id: $routeParams.id}, function(item) {
        $rootScope.pageTitle = item.heading;
        $scope.item = item;
        $scope.itemCategory = getItemCategory(itemType);
    }, function(err) {
        // TODO: Handle 404.
        console.log(err);
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
