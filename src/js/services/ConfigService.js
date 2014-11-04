angular.module('Gapminder').factory('ConfigService', ['MainConfig', 'EnvironmentConfig', function(MainConfig, EnvironmentConfig) {
    return {
        /**
         * Fetches and returns a configuration value by key.
         * @param {string} key
         * @returns {*}
         */
        get: function(key) {
            if (angular.isDefined(EnvironmentConfig[key])) {
                return EnvironmentConfig[key];
            } else {
                return MainConfig[key];
            }
        }
    };
}]);
