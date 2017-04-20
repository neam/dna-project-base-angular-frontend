'use strict';

require('./inspinia/inspinia');

let module = angular.module('angular-frontend', [
    require('./inspinia/angular-module').name,                     // Inspinia-theme-related functionality
    require('./auth').default.name,                         // Authentication logic summarized in auth.js (can not easily be lazyloaded since it integrates tightly with ui-router config + authentication needs to be evaluated asap upon page load to catch recurring already authenticated users)
    require('./angular-frontend-config').default.name,
    require('./angular-frontend-filters').default.name,
    require('ngReact').name,
    // Other libraries are loaded dynamically via the routing config using the library ocLazyLoad
    /*
     'angulartics',                  // angulartics + plugins
     'angulartics.scroll',
     'angulartics.google.analytics',
     'angulartics.mixpanel',
     */
]);

/**
 * Services whose purpose is to supply the "dataEnvironments" array and "setDataEnvironment" function
 */
module
    .service('activeDataEnvironment', function ($q) {
        let activeDataEnvironment = $q.defer();
        return activeDataEnvironment;
    })
    .service('DataEnvironmentService', function ($q, auth, $rootScope, $timeout, activeDataEnvironment) {

        //console.log('DataEnvironmentService');

        var dataEnvironments = {};
        dataEnvironments.list = [];
        dataEnvironments.available = false;

        var updateDataEnvironmentsListBasedOnAuthenticationState = function (profile) {

            // Ignore if no information is available
            if (!profile.user_metadata) {
                return;
            }

            // Add api endpoints from user property
            dataEnvironments.list = profile.user_metadata.api_endpoints || [];
            dataEnvironments.available = true;

            console.log('updateDataEnvironmentsListBasedOnAuthenticationState dataEnvironments', dataEnvironments);

            // If has default, set active
            if (profile.user_metadata.default_api_endpoint_slug) {
                setDataEnvironment(profile.user_metadata.default_api_endpoint_slug);
            } else {
                if (dataEnvironments.list.length === 1) {
                    setDataEnvironment(dataEnvironments.list[0].slug);
                }
            }

            // inform angular that we have updated auth data by implicitly calling $apply via $timeout
            $timeout(function () {
                console.log('updated auth data after login');
            });

        };

        // Update the list of data environments upon login
        // This is triggered by auth.js after the profile is resolved after page refresh so that
        // the list of data environments can reflect the contents of the authenticated profile after page reload
        $rootScope.$on('authenticated', function (event, profile) {
            console.log('user.authenticated profile', profile);
            updateDataEnvironmentsListBasedOnAuthenticationState(profile);
        });

        $rootScope.$on('unauthenticated', function () {

            setDataEnvironment(null);
            dataEnvironments.list = [];
            dataEnvironments.available = false;

            // inform angular that we have updated auth data by implicitly calling $apply via $timeout
            $timeout(function () {
                console.log('updated auth data after logout');
            });

        });

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
            setDataEnvironment: setDataEnvironment,
            needsToChooseActiveDataEnvironment: function () {
                return !activeDataEnvironment.available && auth.profilePromise && dataEnvironments.available && dataEnvironments.list.length > 0;
            }
        };

    });

module
    .controller('DataEnvironmentController', function (DataEnvironmentService, $scope) {

        $scope.dataEnvironments = DataEnvironmentService.dataEnvironments;
        $scope.activeDataEnvironment = DataEnvironmentService.activeDataEnvironment;
        $scope.setDataEnvironment = DataEnvironmentService.setDataEnvironment;
        $scope.needsToChooseActiveDataEnvironment = DataEnvironmentService.needsToChooseActiveDataEnvironment;

    });

/**
 * open(template, size)
 * for instance:
 * open('modals/foo.html', 'lg')
 */
module
    .service('GeneralModalControllerService', function ($modal, $log) {

        let service = {};
        service.openWithinScope = function ($scope, template, size, params) {

            $scope.params = params;
            var modalInstance = $modal.open({
                animation: true,
                template: template,
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
        return service;

    })
    .controller('GeneralModalController', function ($scope, GeneralModalControllerService) {

        $scope.open = function (template, size, params) {
            GeneralModalControllerService.openWithinScope($scope, template, size, params);
        };

    });

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
module
    .controller('GeneralModalInstanceController', function ($scope, $modalInstance /*, items */) {

        //$scope.items = items;

        $scope.ok = function () {
            $modalInstance.close(/*$scope.selected.item*/);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

/**
 */
module
    .service('GloballyAccessibleModalsService', function ($q, $rootScope) {

        let service = {
            modalElements: {},
            deferredModalElementById: function (id) {

                let self = this;
                let defer = $q.defer();

                if (self.modalElements[id]) {
                    defer.resolve(self.modalElements[id]);
                } else {
                    $rootScope.self = self;
                    let stopWatching = $rootScope.$watch(function () {
                        return self.modalElements;
                    }, function (modalElements) {
                        let desiredModalElement = modalElements[id];
                        if (desiredModalElement) {
                            defer.resolve(desiredModalElement);
                            stopWatching();
                        }
                    });
                }

                return defer;

            }
        };
        return service;

    })
    .directive('globallyAccessibleModal', function (GloballyAccessibleModalsService) {
        return {
            restrict: 'A',
            transclude: true,
            scope: {},
            template: '<ng-transclude/>',
            link: function (scope, element, attrs) {
                console.log('globallyAccessibleModal link', attrs, GloballyAccessibleModalsService);
                GloballyAccessibleModalsService.modalElements[attrs.id] = element;
            }
        };
    });

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
module
    .controller('GeneralModalInstanceController', function ($scope, $modalInstance /*, items */) {

        //$scope.items = items;

        $scope.ok = function () {
            $modalInstance.close(/*$scope.selected.item*/);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

/**
 * To workaround issue that dynamic params does not reload templateUrl
 * From https://github.com/angular-ui/ui-router/issues/2831#issuecomment-228184129
 */
module
    .service("reloadViews", function ($state, $q, $view) {
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

export default module;