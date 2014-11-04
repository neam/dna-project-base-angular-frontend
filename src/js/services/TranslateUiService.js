angular.module('Gapminder').factory('TranslateUiService', [
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
    var translations,
        currentLocale = LocaleService.getCurrentLocale(),
        tFunction;

    $http.get(ApiService.getApiUrl('/translateui/pages/' + currentLocale))
        .success(function(translations) {
            translations = translations;

            var i18nextConfig = {};
            i18nextConfig.resStore = {};
            i18nextConfig.resStore[currentLocale] = translations;
            i18nextConfig.ns = {
                namespaces: ['navbar', 'buttons'],
                defaultNs: 'navbar'
            };

            console.log(i18nextConfig);

            i18nextInit(i18nextConfig);
        }, function() {
            console.log('Failed to retrieve UI translations.');
        });

    /**
     * Initializes i18next.
     * @param {} config
     */
    function i18nextInit(config) {
        $window.i18n.init(config);
        $window.i18n.setLng(currentLocale, function(t) {
            tFunction = t;

            console.log(t('login'));

            console.log(i18n.t('navbar.login'));
        });
    }

    return {
        /**
         * Returns the t function.
         * @returns {i18n.t}
         */
        t: function() {
            return tFunction;
        }
    };
}]);
