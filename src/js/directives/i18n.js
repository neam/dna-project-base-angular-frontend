angular.module('Gapminder').directive('i18n', [function() {
    return {
        restrict: 'EA',
        scope: {
            text: '@',
            context: '@',
            count: '@'
        },
        controller: function($rootScope, $scope, i18nService) {}
    };
}]);
