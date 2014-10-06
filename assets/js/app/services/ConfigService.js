angular.module('Gapminder').factory('ConfigService', function(MainConfig, LocalConfig) {
    return {
        /**
         * Fetches and returns a configuration value by key.
         * @param {string} key
         * @returns {*}
         */
        get: function(key) {
            if (typeof LocalConfig[key] !== 'undefined') {
                return LocalConfig[key];
            } else {
                return MainConfig[key];
            }
        }
    };
});
