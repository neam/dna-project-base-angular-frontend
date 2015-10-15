(function () {
    var app = angular.module('app', [
        'angular-frontend'
    ]);

    /**
     * Service to handle data-change suggestions via the angular ui
     */
    app.service('suggestionsService', function ($http, $location, $injector, routeBasedFilters) {

        var statuses = {
            ACTIVE: 'active',
            INACTIVE: 'inactive',
            LOADING: 'loading',
            ERROR: 'error'
        };

        var status = statuses.INACTIVE;

        var suggestionsService = {
            status: status,
            statuses: statuses,
            suggest: function (suggestions, save) {

                console.log('suggest - suggestions, save', suggestions, save);

                // Filters are stored in $location.search and the service routeBasedFilters
                var filters = angular.merge($location.search(), routeBasedFilters);

                var params = angular.extend({}, {
                    'suggestions': suggestions,
                    'save': save,
                    'filters': filters,
                    'default_page': 1,
                    'default_limit': 100
                });

                status = statuses.LOADING;
                $http.post(env.API_BASE_URL + '/' + env.API_VERSION + '/suggestions', params).
                    then(function (response) {
                        // this callback will be called asynchronously
                        // when the response is available

                        console.log('suggestions received', response);

                        _.each(response.data, function (value, key, list) {

                            $injector.invoke([key, function (resource) {

                                resource.replace(value.items);
                                resource.$metadata = value._meta;

                            }]);

                        });

                        if (save) {
                            status = statuses.INACTIVE;
                        } else {
                            status = statuses.ACTIVE;
                        }

                    }, function (response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.

                        status = statuses.ERROR;
                        console.log('error during suggestions received', response);

                    });

            },
            status: function () {
                return status;
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
     * Service for route-based filters, such as when visiting an item's page, only show items related to that item
     */
    app.service('routeBasedFilters', function () {

        return {};

    });

    /**
     * Service that intercepts requests, can be used to show general error messages on failed requests
     */
    app.factory('appInterceptor', function ($rootScope, $q, ApiEndpointService) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                // Supply header indicating which data profile we should use for the request
                if (ApiEndpointService.activeApiEndpoint.available) {
                    config.headers['X-Data-Profile'] = env.DATA || 'clean-db';
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
        $httpProvider.interceptors.push('appInterceptor');
    });

})();