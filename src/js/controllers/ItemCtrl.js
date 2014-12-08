angular.module('Gapminder').controller('ItemCtrl', [
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
            $scope.itemCategory = getItemCategory(itemUrlParam);
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
     * Returns an item category by URL param.
     * @param {string} urlParam (e.g. 'exercises')
     * @returns {string}
     */
    function getItemCategory(urlParam) {
        var paramToItemCategory = {
            exercises: i18nService.translate('item-category:exercises', {}, 'Exercises'),
            presentations: i18nService.translate('item-category:presentations', {}, 'Presentations'),
            qna: i18nService.translate('item-category:qna', {}, 'Questions & Answers')
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
        // TODO: Use a real profile URL or make it configurable per environment.
        return 'http://www.gapminder.org/profiles/' + userId;
    };
}]);
