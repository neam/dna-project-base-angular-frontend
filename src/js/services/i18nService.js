angular.module('Gapminder').factory('i18nService', [
    '$http',
    '$window',
    'ApiService',
    'LocaleService',
function(
    $http,
    $window,
    ApiService,
    LocaleService
) {
    var currentLocale = LocaleService.getCurrentLocale(),
        tFunc;

    $http.get(ApiService.getApiUrl('/translateui/pages/' + currentLocale))
        .success(function(translations) {
            i18nextInit(translations);
        }, function() {
            console.log('Failed to retrieve UI translations.');
        });

    /**
     * Initializes i18next.
     * @param {Array} translations
     */
    function i18nextInit(translations) {
        var i18nextConfig = {};

        i18nextConfig.resStore = {};
        i18nextConfig.resStore[currentLocale] = translations;

        $window.i18n.init(i18nextConfig);
        $window.i18n.setLng(currentLocale, function(t) {
            tFunc = t;
        });
    }

    return {
        /**
         * Translates a term.
         * @returns {string}
         */
        t: function(namespace, key) {
            return tFunc(namespace + ':' + key);
        }
    };
}]);
