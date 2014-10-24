angular.module('Gapminder').controller('GoCtrl', ['$rootScope', '$scope', '$routeParams', 'GoItem', function($rootScope, $scope, $routeParams, GoItem) {
    // Initialize controller
    (function() {
        GoItem.get({itemType: $routeParams.itemType, permalink: $routeParams.permalink}, function(item) {
            $rootScope.pageTitle = item.title;
            $scope.item = item;
            $scope.itemCategory = getItemCategory($routeParams.itemType);
        });
    })();

    /**
     * Returns an item category.
     * @param {string} itemType item type machine name
     * @returns {string}
     */
    function getItemCategory(itemType) {
        var labels = {
            video: 'Videos',
            presentation: 'Presentations'
        };

        return angular.isDefined(labels[itemType]) ? labels[itemType] : '';
    }

    /**
     * Creates a link to a related item.
     * @param {string} itemType
     * @param {string} permalink
     * @returns {string}
     */
    $scope.createRelatedItemUrl = function(itemType, permalink) {
        return '/#/go/' + itemType + '/' + permalink;
    };
}]);
