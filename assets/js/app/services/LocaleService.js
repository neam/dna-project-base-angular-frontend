angular.module('Gapminder').factory('LocaleService', function($http, $window, ApiService) {
    var localeOptions = {},
        currentLocale = getLocaleFromStorage() || 'en-US'; // default

    // Get locale options
    $http.get(ApiService.getApiUrl('GET', '/language/list'))
        .then(function(res) {
            localeOptions = res.data;
        });

    /**
     * Returns the current locale from local storage.
     * @returns {string}
     */
    function getLocaleFromStorage() {
        return $window.localStorage.locale;
    }

    /**
     * Saves a locale to local storage.
     * @param {string} locale
     */
    function saveLocaleToStorage(locale) {
        $window.localStorage.locale = locale;
    }

    /**
     * Sets the current locale.
     * @param {string} locale
     */
    function setCurrentLocale(locale) {
        currentLocale = locale;
    }

    return {
        /**
         * Returns the current locale.
         * @returns {string}
         */
        getCurrentLocale: function() {
            return currentLocale;
        },

        /**
         * Returns the current locale label.
         * @returns {string}
         */
        getCurrentLocaleLabel: function() {
            return angular.isDefined(localeOptions[currentLocale]) ? localeOptions[currentLocale].name : null;
        },

        /**
         * Returns all available locales.
         * @returns {*}
         */
        getLocaleOptions: function() {
            return localeOptions;
        },

        /**
         * Sets the current locale.
         * @param {string} locale
         */
        setCurrentLocale: function(locale) {
            setCurrentLocale(locale);
            saveLocaleToStorage(locale);
        }
    };
});
