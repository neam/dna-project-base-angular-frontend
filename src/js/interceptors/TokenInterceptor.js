angular.module('Gapminder').factory('TokenInterceptor', [
    '$q',
    '$window',
    '$injector',
    'PromiseFactory',
function(
    $q,
    $window,
    $injector,
    PromiseFactory
) {
    var retryUrls = [];

    /**
     * Checks if the requested URL is a template.
     * AWS S3 gives a 403 when requesting templates with authorization headers.
     * @param {string} url
     * @returns {boolean}
     */
    function isTemplate(url) {
        return _.contains(url, 'templates') && _.contains(url, '.html');
    }

    /**
     * Retries an HTTP request.
     * @param {Object} config
     * @param {Deferred} deferred
     */
    function retryHttpRequest(config, deferred) {
        function successCallback(response) {
            deferred.resolve(response);
        }

        function errorCallback(response) {
            deferred.reject(response);
        }

        var $http = $injector.get('$http');

        $http(config).then(successCallback, errorCallback);
    }

    return {
        /**
         * Handles a request config.
         * @param {Object} config
         * @returns {Object}
         */
        request: function(config) {
            config.headers = config.headers || {};

            if ($window.sessionStorage.authToken && !isTemplate(config.url)) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.authToken;
            }

            return config;
        },

        /**
         * Handles a response.
         * @param {Object} response
         * @returns {Object|Promise}
         */
        response: function(response) {
            return response || $q.when(response);
        },

        /**
         * Handles an error response.
         * @param {Object} rejection
         */
        responseError: function(rejection) {
            var UserService = $injector.get('UserService'),
                dfd = PromiseFactory.defer();

            console.log(rejection);

            if (rejection.status === 401 && !_.contains(retryUrls, rejection.config.url)) {
                retryUrls.push(rejection.config.url);

                UserService.refreshAuthToken()
                    .success(function(res) {
                        retryHttpRequest(rejection.config, dfd);
                    });
            }

            return $q.reject(rejection);
        }
    };
}]).config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
}]);
