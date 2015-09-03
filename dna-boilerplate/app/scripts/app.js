(function () {
    var app = angular.module('app', [
        'angular-frontend'
    ]);

    /**
     * Service to handle data-change suggestions via the angular ui
     */
    app.service('suggestionsService', function ($http, $location, $injector) {

        var suggestionsService = {
            suggest: function (suggestions, save) {

                console.log('suggest - suggestions, save', suggestions, save);

                var params = angular.extend({}, $location.search(), {
                    'suggestions': suggestions,
                    'save': save,
                    'default_page': 1,
                    'default_limit': 100
                });

                $http.post(env.API_BASE_URL + '/' + env.API_VERSION + '/suggestions', params).
                    then(function (response) {
                        // this callback will be called asynchronously
                        // when the response is available

                        console.log('suggestions received', response);

                        _.each(response.data, function (value, key, list) {

                            $injector.invoke([key, function (resource) {

                                resource.replace(value.items);

                            }]);

                        });


                    }, function (response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.

                        console.log('error during suggestions received', response);

                    });

            },
            bar: function () {

            }
        };

        return suggestionsService;

    });

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
     * Service that intercepts requests, can be used to show general error messages on failed requests
     */
    app.factory('appInterceptor', function ($rootScope, $q) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
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
        $httpProvider.interceptors.push('appInterceptor');
    });

})();