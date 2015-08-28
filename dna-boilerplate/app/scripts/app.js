(function () {
    var app = angular.module('app', [
        'angular-frontend'
    ]);

    /**
     * Service to fetch metadata from the api (not sure if still used)
     */
    app.factory('metadataService', function ($http) {

        var factory = {};

        factory.getMetadataPromise = function () {
            return $http({
                url: env.API_BASE_URL + '/' + env.API_VERSION + '/metadata',
                method: 'GET'
            });
        };

        return factory;

    });

    /**
     * Service that injects the auth token in rest api requests when the user is authenticated
     */
    app.factory('authInterceptor', function ($rootScope, $q, UserApp) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if (UserApp.tokenStorage.get()) {
                    config.headers.Authorization = 'UserappToken ' + UserApp.tokenStorage.get();
                }
                //config.withCredentials = true;
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                    console.log('unauthorized request intercepted by authInterceptor');
                }
                if (response.status === 403) {
                    // handle the case where the user is not authorized
                    console.log('forbidden request intercepted by authInterceptor');
                }
                return response || $q.when(response);
            }
        };
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

})();