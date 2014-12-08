angular.module('Gapminder').controller('GoItemCtrl', [
    '$rootScope',
    '$scope',
    '$stateParams',
    '$location',
    'ApiService',
    'NavigationService',
    'i18nService',
    'SirTrevorService',
    'ItemService',
function(
    $rootScope,
    $scope,
    $stateParams,
    $location,
    ApiService,
    NavigationService,
    i18nService,
    SirTrevorService,
    ItemService
) {
    var itemUrlParam = NavigationService.getPartOfPath(0);

    $scope.sirTrevor = SirTrevorService;

    ItemService.init()
        .then(function(item) {
            NavigationService.setPageTitle(item.attributes.heading);
            $scope.item = item;
            $scope.itemCategory = item.attributes.composition_type;
        }, function() {
            whenItemNotFound();
        });

    /**
     * Process 404 logic.
     */
    function whenItemNotFound() {
        $scope.notFound();
    }

    /**
     * Checks if the item type matches the item type URL param.
     * @param {} item
     * @returns {boolean}
     */
    function validateItemType(item) {
        return item.attributes.composition_type === getItemType(itemUrlParam);
    }

    /**
     * Returns an item type by URL param.
     * @param {string} urlParam (e.g. 'exercises')
     * @returns {string}
     */
    function getItemType(urlParam) {
        var paramToItemTypeMap = {
            exercises: 'exercise',
            presentations: 'presentation',
            qna: 'qna'
        };

        return angular.isDefined(paramToItemTypeMap[urlParam]) ? paramToItemTypeMap[urlParam] : '';
    }

    /**
     * Creates a link to a user profile page.
     * @param {number} userId
     * @returns {string}
     */
    $scope.createUserProfileUrl = function(userId) {
        return 'http://www.gapminder.org/profiles/' + userId;
    };
}]);
