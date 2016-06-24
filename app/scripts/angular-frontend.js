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
    module.service('DataEnvironmentService', function ($q, auth, $rootScope, $timeout) {

        //console.log('DataEnvironmentService');

        var dataEnvironments = {};
        dataEnvironments.list = [];
        dataEnvironments.available = false;

        $rootScope.$on('user.login', function (event, profile) {

            // Ignore if no information is available
            if (!profile.user_metadata) {
                return;
            }

            // Add api endpoints from user property
            dataEnvironments.list = profile.user_metadata.api_endpoints || [];
            dataEnvironments.available = true;

            console.log('user.login dataEnvironments', dataEnvironments);

            auth.profilePromise.then(function () {

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

                // inform angular that we have updated auth data by implicitly calling $apply via $timeout
                $timeout(function () {
                    console.log('updated auth data after login');
                });

            });

            // inform angular that we have updated auth data by implicitly calling $apply via $timeout
            $timeout(function () {
                console.log('updated auth data after login');
            });

        });

        $rootScope.$on('user.logout', function () {

            setDataEnvironment(null);
            dataEnvironments.list = [];
            dataEnvironments.available = false;

            // inform angular that we have updated auth data by implicitly calling $apply via $timeout
            $timeout(function () {
                console.log('updated auth data after logout');
            });

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

                if (!chosenDataEnvironment) {
                    activeDataEnvironment.available = null;
                    console.log('Data environment could not be set to slug: ', angular.copy(slug));
                    console.log('dataEnvironments: ', angular.copy(dataEnvironments));
                    return;
                }

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

                // Allow app to react on changes of active data environment
                $rootScope.$broadcast('activeDataEnvironment.change', chosenDataEnvironment);

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

    /**
     * Simple cal heatmap wrapper directive which simply sends the config to CalHeatMap's init() function
     * together with the element reference
     */
    module.directive('simpleCalHeatmap', function () {

        var heatmap;

        function update(data) {
            heatmap.update(data);
        }

        function link(scope, el) {
            var config = angular.copy(scope.config);
            var element = el[0];
            heatmap = new CalHeatMap();
            config.itemSelector = element;
            heatmap.init(config);
            scope.$watchCollection('config.data', function (newVal, oldVal) {
                update(newVal);
            });
        }

        return {
            template: '<div id="cal-heatmap" config="config"></div>',
            restrict: 'E',
            link: link,
            scope: {config: '='}
        };
    });

    /**
     * To workaround issue that dynamic params does not reload templateUrl
     * From https://github.com/angular-ui/ui-router/issues/2831#issuecomment-228184129
     */
    module.service("reloadViews", function ($state, $q, $view) {
        return function reloadViews($transition$, stateName) {
            // Get a reference to the built state object
            var state = $state.get(stateName).$$state();
            // Find the node for the state in the "to path" (which has the updated parameters)
            var node = $transition$.treeChanges().to.find(function (node) {
                return node.state === state;
            });
            // The currently active ViewConfig(s) for the given state
            // Note: viewConfigs isn't *currently* public, but I'm planning to create an accessor
            var oldConfigs = $view.viewConfigs.filter(function (view) {
                return view.node.state === state;
            });
            // Build new ViewConfigs for all the state's views using the node from the "to path"
            var newConfigs = Object.keys(state.views)
                .map(function (name) {
                    return $view.createViewConfig(node, state.views[name]);
                })
                .reduce(function (acc, arr) {
                    return acc.concat(arr);
                }, []);
            // Load the ViewConfigs (this fetches templates, etc)
            $q.all(newConfigs.map(function (cfg) {
                return cfg.load();
            })).then(function () {
                // Then deactivate the old configs and activate the new ones
                oldConfigs.forEach(function (cfg) {
                    return $view.deactivateViewConfig(cfg);
                });
                newConfigs.forEach(function (cfg) {
                    return $view.activateViewConfig(cfg);
                });
                // finally, tell the ui-views to update based on the newly activated configs
                $view.sync();
            });
        };
    });

})();