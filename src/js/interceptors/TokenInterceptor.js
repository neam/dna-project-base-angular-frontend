angular.module('Gapminder').factory('TokenInterceptor', [
    '$q',
    '$window',
    '$rootScope',
    '$injector',
    'PromiseFactory',
function(
    $q,
    $window,
    $rootScope,
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
        var $http = $injector.get('$http');

        function successCallback(response) {
            deferred.resolve(response);
        }

        function errorCallback(response) {
            deferred.reject(response);
        }

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
         * @param {Object} response
         */
        responseError: function(response) {
            var UserService = $injector.get('UserService'),
                dfd = PromiseFactory.defer();

            if (response.status === 401 && UserService.hasRefreshToken() && !_.contains(retryUrls, response.config.url)) {
                retryUrls.push(response.config.url);

                UserService.refreshAuthToken()
                    .success(function(res) {
                        retryHttpRequest(response.config, dfd);
                    })
                    .error(function(err) {
                        dfd.reject(err);
                    });

                return dfd.promise;
            }

            return $q.reject(response);
        }
    };
}]).config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
}]);
