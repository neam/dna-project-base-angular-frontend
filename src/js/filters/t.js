angular.module('Gapminder').filter('t', ['$rootScope', 'i18nService', function($rootScope, i18nService) {
    return function(input, context, count) {
        /* TODO: Figure out another way. The following raises problems with $digest.
        i18nService.addTranslatable(input, context, count)
            .then(function(translation) {
                return translation;
            });
        */
        return input;
    };
}]);
