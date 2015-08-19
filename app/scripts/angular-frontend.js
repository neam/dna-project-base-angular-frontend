(function () {

    var module = angular.module('angular-frontend', [
        'ui.router',                    // Routing
        'ngResource',                   // $resource
        'UserApp',                      // Userapp.io
        'inspinia',                     // Inspinia-theme-related functionality
        'angulartics',                  // angulartics + plugins
        'angulartics.scroll',
        'angulartics.google.analytics',
        'angulartics.mixpanel',
        'googlechart',                  // angular-google-chart
        'angularDc',
        'ngHandsontable',
        'ui.ink',
        //'angularJade',
        'angular-frontend-filters'      // angular-frontend-filters.js
    ]);

    /**
     * Services whose purpose is to supply the "apiEndpoints" array and "setApiEndpoint" function
     */
    module.service('ApiEndpointService', function ($q, user) {

        //console.log('ApiEndpointService');

        var activeApiEndpoint = $q.defer();

        var apiEndpoints = [];
        apiEndpoints.$promise = $q(function (resolve, reject) {

            user.getCurrent().then(function () {

                // Add base urls from user property
                apiEndpoints = _.extend(apiEndpoints, angular.fromJson(user.current.properties.api_endpoints.value));

                resolve();

            }, function (error) {
                reject(error);
            });

        });

        var setApiEndpoint = function (slug) {

            //console.log('setApiEndpoint', slug);

            var apiEndpoint = _.find(apiEndpoints, function (apiEndpoint) {
                return apiEndpoint.slug === slug;
            });

            // Set the value of the promise to the active endpoint
            activeApiEndpoint = _.extend(activeApiEndpoint, apiEndpoint);
            activeApiEndpoint.resolve();

            if (slug === 'local') {
                env.API_BASE_URL = env.LOCAL_API_BASE_URL;
                env.API_VERSION = env.LOCAL_API_VERSION;
            } else {
                env.API_BASE_URL = apiEndpoint.API_BASE_URL;
                env.API_VERSION = apiEndpoint.API_VERSION;
            }

            console.log('chosen base-url: ', apiEndpoint);
        };

        apiEndpoints.$promise.then(function () {
            //console.log('ApiEndpointService apiEndpoints resolved. apiEndpoints, user.current.properties.default_api_endpoint_slug.value', apiEndpoints, user.current.properties.default_api_endpoint_slug.value);

            // if has default, set active
            if (apiEndpoints.length === 1) {
                setApiEndpoint(apiEndpoints[0].slug);
            }
            if (user.current.properties.default_api_endpoint_slug.value) {
                setApiEndpoint(user.current.properties.default_api_endpoint_slug.value);
            }

            //console.log('ApiEndpointService apiEndpoints resolved. activeApiEndpoint, activeApiEndpoint', activeApiEndpoint, activeApiEndpoint);

        }, function () {

        });

        activeApiEndpoint.promise.then(function () {
            //console.log('ApiEndpointService activeApiEndpoint resolved');

        }, function () {

        });

        return {
            apiEndpoints: apiEndpoints,
            activeApiEndpoint: activeApiEndpoint,
            setApiEndpoint: setApiEndpoint
        };

    });

    module.controller('ApiEndpointController', function (ApiEndpointService, $scope) {

        $scope.apiEndpoints = ApiEndpointService.apiEndpoints;
        $scope.activeApiEndpoint = ApiEndpointService.activeApiEndpoint;
        $scope.setApiEndpoint = ApiEndpointService.setApiEndpoint;

        // Make globally available in all views
        /*
        $rootScope.apiEndpoints = ApiEndpointService.apiEndpoints;
        $rootScope.activeApiEndpoint = ApiEndpointService.activeApiEndpoint;
        $rootScope.setApiEndpoint = ApiEndpointService.setApiEndpoint;
        */

    });

})();