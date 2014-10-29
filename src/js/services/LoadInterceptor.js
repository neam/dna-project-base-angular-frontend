angular.module('Gapminder').factory('LoadInterceptor', function($q, $rootScope) {
    var loadCount = 0;

    return {
        request: function(config) {
            loadCount += 1;

            $rootScope.$broadcast('startedLoading');

            return config || $q.when(config);
        },
        response: function(response) {
            loadCount -= 1;

            if (loadCount < 1) {
                $rootScope.$broadcast('finishedLoading');
            }

            return response || $q.when(response);
        },
        responseError: function(response) {
            loadCount -= 1;

            if (!loadCount) {
                $rootScope.$broadcast('finishedLoading');
            }

            return $q.reject(response);
        }
    };
}).config(function($httpProvider) {
    $httpProvider.interceptors.push('LoadInterceptor');
});
