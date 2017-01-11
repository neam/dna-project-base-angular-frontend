'use strict';

let env = require('shared/scripts/env');

function routing($stateProvider) {

    $stateProvider

    /**
     * Base route for routes that requires an api-endpoint
     */
        .state('root.api-endpoints', {
            url: "",
            template: "<ui-view/>",
            resolve: {
                setRouteBasedContentFiltersLevel0: function (routeBasedContentFilters, $stateParams) {
                    routeBasedContentFilters.ImportSession_product_scope = 'foo';
                    routeBasedContentFilters.Foo_order = 'Foo.created DESC';
                },
            },
            data: {
                requiresLogin: true
            }
        })

        /**
         * Route that allows the user to select current domain
         */
        .state('root.api-endpoints.choose', {
            url: "/choose-account",
            template: require("project/views/domain/choose-current.html"),
            data: {pageTitle: 'Example view'}
        })

        /**
         * Route that sets the current domain to one in the url and then shows the "start" view
         */
        .state('root.api-endpoints.existing', {
            abstract: true,
            url: "/:dataEnvironment",
            template: "<ui-view/>",
            resolve: {

                loadDataEnvironmentSpecific: ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            let module = require('project/scripts/data-environment-specific.js');
                            $ocLazyLoad.load({name: module.name});
                            resolve(module);
                        })
                    });
                },

                // all child states of root.api-endpoints.existing needs information about the current api endpoint to query rest api requests against
                // such information is stored in the route, why we need to read $stateParams and set the current api endpoint based on the route
                dataEnvironmentParam: function ($stateParams, DataEnvironmentService, auth, $injector) {
                    //console.log('root.api-endpoints.existing dataEnvironmentParam - dataEnvironmentParam, $stateParams, DataEnvironmentService', $stateParams, DataEnvironmentService);

                    // Workaround for case that $stateChangeStart is not fired (and thus requiresLogin is ignored) before this resolve
                    if (!auth.isAuthenticated && !auth.refreshTokenPromise) {
                        console.log('TODO: Throw exception since one should never set the data environment unless the user is authenticated');
                        $injector.get('$state').go(auth.config.loginState);
                        return;
                    }

                    // Set active endpoint based on state param
                    DataEnvironmentService.setDataEnvironment($stateParams.dataEnvironment);

                    return DataEnvironmentService.activeDataEnvironment.promise;

                },
                // keep track of global suggested actions
                resolveSuggestedActions: function (dataEnvironmentParam, suggestedActions, $rootScope) {
                    $rootScope.suggestedActions = suggestedActions;
                }
            },
            data: {pageTitle: 'Example view'}
        })

        .state('root.api-endpoints.existing.start', {
            url: "/",
            template: require("project/views/start.html"),
            data: {pageTitle: 'Example view'}
        })

    ;

}

export default angular
    .module('data-environment-specific.routing', [])
    .config(routing);
