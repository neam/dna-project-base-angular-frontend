angular.module('Gapminder').directive('i18n', [function() {
    return {
        restrict: 'EA',
        scope: {
            text: '@',
            context: '@',
            count: '@'
        },
        controller: function($rootScope, $scope, i18nService) {
            i18nService.addTranslatable($scope.text, $scope.context, $scope.count)
                .then(function(translation) {
                    $scope.translation = translation;
                })
        },
        templateUrl: '/templates/directives/i18n.html'
    };
}]);
