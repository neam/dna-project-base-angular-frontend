angular.module('Gapminder').factory('ConfigService', function(MainConfig, LocalConfig) {
    return {
        /**
         * Fetches and returns a configuration value by key.
         * @param {string} key
         * @returns {*}
         */
        get: function(key) {
            if (angular.isDefined(LocalConfig[key])) {
                return LocalConfig[key];
            } else {
                return MainConfig[key];
            }
        }
    };
});
