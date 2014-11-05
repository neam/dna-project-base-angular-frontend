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
    var currentLocale = LocaleService.getCurrentLocale();

    /**
     * Initializes i18next.
     * @param {Array} translations
     */
    function i18nextInit(translations) {
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

    /**
     * Loads translations from the API.
     * @returns {Deferred.promise}
     */
    function loadTranslations() {
        var dfd = $q.defer();

        $http.get(ApiService.getApiUrl('/translateui/pages/' + currentLocale), {cache: true})
            .success(function(translations) {
                i18nextInit(translations).then(function(t) {
                    dfd.resolve(t);
                });
            }, function(err) {
                console.log('Failed to retrieve UI translations.');
                dfd.reject(err);
            });

        return dfd.promise;
    }

    return {
        /**
         * Initializes the service.
         * @returns {Deferred.promise}
         */
        init: function() {
            var dfd = $q.defer();

            loadTranslations().then(function(t) {
                dfd.resolve(t);
            }, function(err) {
                dfd.reject(err);
            });

            return dfd.promise;
        }
    };
}]);
