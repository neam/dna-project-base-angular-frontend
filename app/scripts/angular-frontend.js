(function () {

    var module = angular.module('angular-frontend', [
        'ui.router',                    // Routing
        'ngResource',                   // $resource
        'inspinia',                     // Inspinia-theme-related functionality
        'auth',                         // Authentication logic summarized in auth.js
        'angulartics',                  // angulartics + plugins
        'angulartics.scroll',
        'angulartics.google.analytics',
        'angulartics.mixpanel',
        'googlechart',                  // angular-google-chart
        'angularDc',
        'ngHandsontable',
        'ui.ink',
        'cfp.hotkeys',                  // angular-hotkeys
        '3-way-merge',                  // 3-way-merge
        'rt.select2',                   // angular-select2
        //'angularJade',
        'angular-frontend-filters'      // angular-frontend-filters.js
    ]);

    /**
     * Services whose purpose is to supply the "apiEndpoints" array and "setApiEndpoint" function
     */
    module.service('ApiEndpointService', function ($q, auth, AuthService, $rootScope) {

        //console.log('ApiEndpointService');

        var apiEndpoints = [];
        apiEndpoints.available = false;

        $rootScope.$on('user.login', function (event, profile) {

            // Ignore if no information is available
            if (!profile.user_metadata || !profile.user_metadata.api_endpoints) {
                return;
            }

            // Add api endpoints from user property
            apiEndpoints = profile.user_metadata.api_endpoints;
            apiEndpoints.available = true;

            console.log('user.login apiEndpoints', apiEndpoints);

            if (!activeApiEndpoint.available) {

                // If has default, set active
                if (apiEndpoints.length === 1) {
                    setApiEndpoint(apiEndpoints[0].slug);
                }
                if (profile.user_metadata.default_api_endpoint_slug) {
                    setApiEndpoint(profile.user_metadata.default_api_endpoint_slug);
                }

            }

        });

        $rootScope.$on('user.logout', function () {

            var apiEndpoints = [];
            setApiEndpoint(null);
            apiEndpoints.available = false;

        });

        var activeApiEndpoint = $q.defer();

        var setApiEndpoint = function (slug) {

            console.log('setApiEndpoint', slug);

            if (!slug) {
                activeApiEndpoint.available = null;
                return;
            }

            auth.profilePromise.then(function () {

                var chosenApiEndpoint = _.find(apiEndpoints, function (apiEndpoint) {
                    return apiEndpoint.slug === slug;
                });

                // Add the value of the active endpoint slug to the promise for direct access in views
                activeApiEndpoint.slug = chosenApiEndpoint.slug;
                activeApiEndpoint.available = true;
                activeApiEndpoint.resolve();

                if (slug === 'local') {
                    env.API_BASE_URL = env.LOCAL_API_BASE_URL;
                    env.API_VERSION = env.LOCAL_API_VERSION;
                } else {
                    env.API_BASE_URL = chosenApiEndpoint.API_BASE_URL;
                    env.API_VERSION = chosenApiEndpoint.API_VERSION;
                }

                //console.log('chosen base-url: ', apiEndpoint);

            });


        };

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

    /**
     * open(template, size)
     * for instance:
     * open('modals/foo.html', 'lg')
     */
    module.controller('GeneralModalController', function ($scope, $modal, $log) {

        $scope.open = function (template, size) {

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: template,
                controller: 'GeneralModalInstanceController',
                size: size
                /*
                 resolve: {
                 items: function () {
                 return $scope.items;
                 }
                 }
                 */
            });

            modalInstance.result.then(function (/*selectedItem*/) {
                //$scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    });

    // Please note that $modalInstance represents a modal window (instance) dependency.
    // It is not the same as the $modal service used above.
    module.controller('GeneralModalInstanceController', function ($scope, $modalInstance /*, items */) {

        //$scope.items = items;

        $scope.ok = function () {
            $modalInstance.close(/*$scope.selected.item*/);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

})();