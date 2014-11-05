angular.module('Gapminder').directive('i18n', ['i18nService', function(i18nService) {
    return {
        restrict: 'EA',
        scope: {
            message: '@',
            fallback: '@'
        },
        template: '{{ translation }}',
        controller: function($rootScope, $scope) {
            var parts = $scope.message.split(':'),
                translated = i18nService.t(parts[0], parts[1]);

            $scope.translation = translated === $scope.message
                ? $scope.fallback
                : translated;
        }
    };
}]);
