(function () {

    var module = angular.module('angular-frontend', [
        'ui.router',                    // Routing
        'inspinia',                     // Inspinia-theme-related functionality
        'angular-frontend-filters',     // angular-frontend-filters.js
        'auth',                         // Authentication logic summarized in auth.js
        'angulartics',                  // angulartics + plugins
        'angulartics.scroll',
        'angulartics.google.analytics',
        'angulartics.mixpanel',
    ]);

    /**
     * Services whose purpose is to supply the "dataEnvironments" array and "setDataEnvironment" function
     */
    module.service('DataEnvironmentService', function ($q, auth, $rootScope) {

        //console.log('DataEnvironmentService');

        var dataEnvironments = {};

        $rootScope.$on('user.login', function (event, profile) {

            dataEnvironments.list = [];
            dataEnvironments.available = false;

            auth.profilePromise.then(function () {

                // Ignore if no information is available
                if (!profile.user_metadata || !profile.user_metadata.api_endpoints) {
                    return;
                }

                // Add api endpoints from user property
                dataEnvironments.list = profile.user_metadata.api_endpoints;
                dataEnvironments.available = true;

                console.log('user.login dataEnvironments', dataEnvironments);

                if (!activeDataEnvironment.available) {

                    // If has default, set active
                    if (profile.user_metadata.default_api_endpoint_slug) {
                        setDataEnvironment(profile.user_metadata.default_api_endpoint_slug);
                    } else {
                        if (dataEnvironments.list.length === 1) {
                            setDataEnvironment(dataEnvironments[0].slug);
                        }
                    }

                }

            });

        });

        $rootScope.$on('user.logout', function () {

            dataEnvironments = {};
            setDataEnvironment(null);
            dataEnvironments.list = [];
            dataEnvironments.available = false;

        });

        var activeDataEnvironment = $q.defer();

        var setDataEnvironment = function (slug) {

            console.log('setDataEnvironment', slug);

            if (!slug) {
                activeDataEnvironment.available = null;
                return;
            }

            auth.profilePromise.then(function () {

                var chosenDataEnvironment = _.find(dataEnvironments.list, function (dataEnvironment) {
                    return dataEnvironment.slug === slug;
                });

                function endsWith(str, suffix) {
                    return str.indexOf(suffix, str.length - suffix.length) !== -1;
                }

                // Set general env vars for custom requests
                if (endsWith(slug, "local")) {
                    env.API_BASE_URL = env.LOCAL_API_BASE_URL;
                    env.API_VERSION = env.LOCAL_API_VERSION;
                    env.DATA = chosenDataEnvironment.DATA;
                } else {
                    env.API_BASE_URL = chosenDataEnvironment.API_BASE_URL;
                    env.API_VERSION = chosenDataEnvironment.API_VERSION;
                    env.DATA = chosenDataEnvironment.DATA;
                }

                // Offline mode: set a dummy DATA flag used offline in requests, ignored by the rest api which instead responds according to LOCAL_OFFLINE_DATA
                if (env.OFFLINE_DEV === 'true') {
                    env.DATA = 'offline';
                }

                // Add the value of the active endpoint slug to the promise for direct access in views
                activeDataEnvironment.slug = chosenDataEnvironment.slug;
                activeDataEnvironment.API_BASE_URL = chosenDataEnvironment.API_BASE_URL;
                activeDataEnvironment.API_VERSION = chosenDataEnvironment.API_VERSION;

                activeDataEnvironment.available = true;
                activeDataEnvironment.resolve(chosenDataEnvironment);

                //console.log('chosen api endpoint: ', chosenDataEnvironment, env.API_VERSION, env.API_BASE_URL);

            });

        };

        activeDataEnvironment.promise.then(function (chosenDataEnvironment) {
            //console.log('activeDataEnvironment resolved: ', chosenDataEnvironment, env.API_VERSION, env.API_BASE_URL);
        });

        return {
            dataEnvironments: dataEnvironments,
            activeDataEnvironment: activeDataEnvironment,
            setDataEnvironment: setDataEnvironment
        };

    });

    module.controller('DataEnvironmentController', function (DataEnvironmentService, $scope) {

        $scope.dataEnvironments = DataEnvironmentService.dataEnvironments;
        $scope.activeDataEnvironment = DataEnvironmentService.activeDataEnvironment;
        $scope.setDataEnvironment = DataEnvironmentService.setDataEnvironment;

    });

    /**
     * open(template, size)
     * for instance:
     * open('modals/foo.html', 'lg')
     */
    module.controller('GeneralModalController', function ($scope, $modal, $log) {

        $scope.open = function (template, size, params) {

            $scope.params = params;
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: template,
                controller: 'GeneralModalInstanceController',
                size: size,
                resolve: {
                    modalParams: function () {
                        return $scope.params;
                    }
                }
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