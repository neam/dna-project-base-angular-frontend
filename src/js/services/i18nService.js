angular.module('Gapminder').factory('i18nService', [
    '$http',
    '$q',
    '$window',
    'ApiService',
    'LocaleService',
function(
    $http,
    $q,
    $window,
    ApiService,
    LocaleService
) {
    var currentLocale = LocaleService.getCurrentLocale(),
        translationApiUrl = '/translateui/pages/:locale'.replace(':locale', currentLocale);

    return {
        /**
         * Loads UI translations and initializes i18next.
         * @returns {Deferred.promise}
         */
        init: function() {
            var dfd = $q.defer();

            loadTranslations().then(function(translations) {
                configurei18next(translations).then(function(t) {
                    dfd.resolve(t);
                });
            });

            return dfd.promise;
        }
    };

    /**
     * Loads UI translations for the current locale.
     * @returns {Deferred.promise}
     */
    function loadTranslations() {
        var dfd = $q.defer();

        $http.get(ApiService.getApiUrl(translationApiUrl))
            .success(function(translations) {
                dfd.resolve(translations);
            }, function(err) {
                console.log('Failed to retrieve UI translations.');
                dfd.reject(err);
            });

        return dfd.promise;
    }

    /**
     * Configures the i18next library.
     * @param {} translations
     * @returns {Deferred.promise}
     */
    function configurei18next(translations) {
        var dfd = $q.defer(),
            i18nextConfig = {};

        i18nextConfig.resStore = {};
        i18nextConfig.resStore[currentLocale] = translations;

        $window.i18n.init(i18nextConfig);
        $window.i18n.setLng(currentLocale, function(t) {
            dfd.resolve(t);
        });

        return dfd.promise;
    }
}]);
