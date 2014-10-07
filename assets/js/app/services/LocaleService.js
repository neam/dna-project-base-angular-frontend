angular.module('Gapminder').factory('LocaleService', function($http, ApiService) {
    var locales = {};

    // Get locales
    $http.get(ApiService.getApiUrl('GET', '/language/list'))
        .then(function(res) {
            locales = res.data;
        });

    return {
        /**
         * @type {string} currently selected locale (UI language)
         */
        currentLocale: 'en_us',

        /**
         * Returns all available locales.
         * @returns {*}
         */
        getLocales: function() {
            return locales;
        },

        /**
         * Sets the current locale.
         * @param {string} locale
         */
        setLocale: function(locale) {
            this.currentLocale = locale;
        },

        /**
         * Returns the current locale label.
         * @returns {string}
         */
        getCurrentLocaleLabel: function() {
            return angular.isDefined(locales[this.currentLocale]) ? locales[this.currentLocale].name : null;
        }
    };
});
