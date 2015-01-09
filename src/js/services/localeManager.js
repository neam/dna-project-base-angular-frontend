angular.module('Gapminder').factory('localeManager', [
    '$http',
    '$q',
    '$window',
    'api',
function(
    $http,
    $q,
    $window,
    api
) {
    var localeOptions = {},
        currentLocale = determineLocale(),
        currentTextDirection;

    /**
     * Returns the current locale from local storage.
     * @returns {string}
     * @private
     */
    function getLocaleFromStorage() {
        return $window.localStorage.locale;
    }

    /**
     * Determines and returns the locale.
     * @returns {string}
     * @private
     */
    function determineLocale() {
        var locale = 'en_us', // default
            localeFromStorage = getLocaleFromStorage(),
            localeFromDetector = detectUserLocale();

        if (angular.isDefined(localeFromStorage)) {
            locale = localeFromStorage;
        } else if (angular.isDefined(localeFromDetector)) {
            locale = localeFromDetector;
        }

        return locale;
    }

    /**
     * Attempts to detect the user's locale.
     * @returns {string}
     * @private
     */
    function detectUserLocale() {
        // TODO: Use a GeoIP service, and fallback to navigator.language.
        return convertLocale($window.navigator.language);
    }

    /**
     * Converts a locale string into a standard format.
     * @param {string} locale
     * @returns {string}
     * @private
     */
    function convertLocale(locale) {
        var standardized = locale.replace('-', '_').toLowerCase();
        return standardized;
    }

    /**
     * Saves a locale to local storage.
     * @param {string} locale
     * @private
     */
    function saveLocaleToStorage(locale) {
        $window.localStorage.locale = locale;
    }

    /**
     * Sets the current locale.
     * @param {string} locale
     * @private
     */
    function setCurrentLocale(locale) {
        currentLocale = locale;
    }

    /**
     * Sets the current text direction.
     * @param {string} locale
     * @private
     */
    function setTextDirectionByLocale(locale) {
        var rtlLocales = [
            'ar',  // Arabic
            'arc', // Aramaic
            'bcc', // Southern Balochi
            'bqi', // Bakthiari
            'ckb', // Sorani
            'db',  // Dhivehi
            'fa',  // Farsi
            'glk', // Gilaki
            'he',  // Hebrew
            'ku',  // Kurdish
            'mzn', // Mazanderani
            'pnb', // Western Punjabi
            'ps',  // Pashto
            'sd',  // Sindhi
            'ug',  // Uyghur
            'ur',  // Urdu
            'yi'   // Yiddish
        ];

        currentTextDirection = _.contains(rtlLocales, locale) ? 'rtl' : 'ltr';
    }

    return {
        /**
         * Loads the locale options.
         * @returns {Deferred.Promise}
         */
        loadLocaleOptions: function() {
            var dfd = $q.defer();

            $http.get(api.getApiUrl('/language'))
                .then(function(res) {
                    localeOptions = res.data;
                    dfd.resolve(res.data);
                }, function(err) {
                    dfd.reject(err);
                });

            return dfd.promise;
        },

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

            setTextDirectionByLocale(locale);
        },

        /**
         * Returns the current text direction.
         * @returns {string}
         */
        getTextDirection: function() {
            if (angular.isUndefined(currentTextDirection)) {
                setTextDirectionByLocale(this.getCurrentLocale());
            }

            return currentTextDirection;
        }
    };
}]);
