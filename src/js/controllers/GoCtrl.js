angular.module('Gapminder').controller('GoCtrl', ['$rootScope', '$scope', '$routeParams', 'GoItem', function($rootScope, $scope, $routeParams, GoItem) {
    function init() {
        GoItem.get({itemType: $routeParams.itemType, permalink: $routeParams.permalink, lang: $routeParams.lang}, function(item) {
            $rootScope.pageTitle = item.title;
            $scope.item = item;
        });
    };

    init();

    /**
     * Creates a link to a related item.
     * @param {string} itemType
     * @param {string} permalink
     * @param {string} lang
     * @returns {string}
     */
    $scope.createRelatedItemUrl = function(itemType, permalink, lang) {
        return '/#/go/' + itemType + '/' + permalink + '/' + lang;
    };
}]);
