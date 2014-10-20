angular.module('Gapminder').factory('ApiService', function(ConfigService, baseApiUrl) {
    return {
        /**
         * Resolves and returns an API URL.
         * @param {string} uri
         * @param {string} method ('GET', 'POST', 'PUT', 'DELETE')
         * @returns {string}
         */
        getApiUrl: function(uri, method) {
            return baseApiUrl + uri;
        }
    }
});
