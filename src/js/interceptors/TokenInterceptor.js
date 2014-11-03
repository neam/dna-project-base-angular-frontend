angular.module('Gapminder').factory('TokenInterceptor', ['$q', '$window', function($q, $window) {
    return {
        /**
         * Manipulates a request config.
         * @param {*} config
         * @returns {*}
         */
        request: function(config) {
            config.headers = config.headers || {};

            if ($window.sessionStorage.authToken) {
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
