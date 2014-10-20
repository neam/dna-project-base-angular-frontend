angular.module('Gapminder').factory('ApiService', function(ConfigService, baseApiUrl) {
    return {
        /**
         * Resolves and returns an API URL.
         * @param {string} uri
         * @returns {string}
         */
        getApiUrl: function(uri) {
            return baseApiUrl + uri;
        }
    }
});
