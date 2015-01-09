angular.module('Gapminder').factory('uiTranslator', [
    '$rootScope',
    '$http',
    '$q',
    '$window',
    'api',
    'LocaleService',
function(
    $rootScope,
    $http,
    $q,
    $window,
    api,
    LocaleService
) {
    var currentLocale,
        translationApiUrl;

    return {
        /**
         * @type {boolean} whether uiTranslator has been initialized (and ready to translate)
         */
        isReady: false,

        /**
         * Loads UI translations and initializes i18next.
         * @returns {Deferred.promise}
         */
        init: function() {
            var self = this,
                dfd = $q.defer();

            currentLocale = LocaleService.getCurrentLocale();
            translationApiUrl = '/translateui/pages/:locale'.replace(':locale', currentLocale);

            loadTranslations()
                .then(function(translations) {
                    configurei18next(translations).then(function(t) {
                        $rootScope.$broadcast('i18nReady');
                        self.isReady = true;
                        dfd.resolve(t);
                    });
                })
                .finally(function() {
                    dfd.resolve();
                });

            return dfd.promise;
        },

        /**
         * Translates an i18next namespace:key string.
         * @param {string} i18nextString
         * @param {} [options]
         * @param {string} [fallback]
         * @returns {string}
         */
        translate: function(i18nextString, options, fallback) {
            var translation = $window.i18n.t(i18nextString, options);
            return translation === i18nextString || _.isEmpty(translation) ? fallback : translation;
        }
    };

    /**
     * Loads UI translations for the current locale.
     * @returns {Deferred.promise}
     */
    function loadTranslations() {
        var dfd = $q.defer();

        $http.get(api.getApiUrl(translationApiUrl), {cache: true})
            .success(function(translations) {
                dfd.resolve(translations);
            })
            .error(function(err) {
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
