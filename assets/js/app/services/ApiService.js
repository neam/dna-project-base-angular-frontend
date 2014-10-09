angular.module('Gapminder').factory('ApiService', function(ConfigService) {
    /**
     * Checks if a mock API URI has been set.
     * @param {string} method
     * @param {string} uri
     * @returns {boolean}
     */
    function mockApiUriExists(method, uri) {
        var apiMocks = ConfigService.get('apiMocks');
        return angular.isDefined(apiMocks[method]) && apiMocks[method].indexOf(uri) > -1;
    }

    /**
     * Returns a mock API URL for the given URI.
     * @param {string} uri
     * @returns {string}
     */
    function getMockApiUrl(uri) {
        var baseMockApiUrl = ConfigService.get('baseMockApiUrl');
        return baseMockApiUrl + uri;
    }

    /**
     * Returns a real API URL for the given URI.
     * @param {string} uri
     * @returns {string}
     */
    function getRealApiUrl(uri) {
        var baseApiUrl = ConfigService.get('baseApiUrl');
        return baseApiUrl + uri;
    }

    return {
        /**
         * Resolves and returns an API URL.
         * @param {string} uri
         * @param {string} method ('GET', 'POST', 'PUT', 'DELETE') defaults to 'GET'.
         * @returns {string}
         */
        getApiUrl: function(uri, method) {
            var method = method || 'GET';
            return mockApiUriExists(method, uri) ? getMockApiUrl(uri) : getRealApiUrl(uri);
        }
    }
});
