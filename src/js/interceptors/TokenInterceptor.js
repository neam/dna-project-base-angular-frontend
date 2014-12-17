angular.module('Gapminder').factory('TokenInterceptor', ['$q', '$window', function($q, $window) {
    /**
     * Checks if the requested URL is a template.
     * AWS S3 gives a 403 when requesting templates with authorization headers.
     * @param {string} url
     * @returns {boolean}
     */
    function isTemplate(url) {
        return _.contains(url, 'templates') && _.contains(url, '.html');
    }

    return {
        /**
         * Manipulates a request config.
         * @param {*} config
         * @returns {*}
         */
        request: function(config) {
            config.headers = config.headers || {};

            if ($window.sessionStorage.authToken && !isTemplate(config.url)) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.authToken;
            }

            return config;
        },

        /**
         * Manipulates a response.
         * @param {*} response
         * @returns {*|Promise}
         */
        response: function(response) {
            return response || $q.when(response);
        }
    };
}]).config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
}]);
