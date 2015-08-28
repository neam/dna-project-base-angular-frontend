(function () {

    /**
     * App uses AngularUI Router to manage routing and views
     * Each view is defined as state.
     */
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider

            .state('root', {
                abstract: true,
                url: "",
                templateUrl: "views/common/content_hybrid_navigation.html",
                //templateUrl: "views/common/content_top_navigation.html",
                //templateUrl: "views/common/content.html",
                resolve: {
                    // this section ensures that metadata has been queried and is available before rendering any root child-state
                    /*
                     metadataService: 'metadataService',
                     metadata: function (metadataService) {
                     return metadataService.getMetadataPromise();
                     }
                     */
                }
            })
            .state('root.main', {
                url: "/",
                templateUrl: "views/main.html",
                data: { pageTitle: 'Example view' }
            })
            .state('root.minor', {
                url: "/minor",
                templateUrl: "views/minor.html",
                data: { pageTitle: 'Example view' }
            })
            .state('topnav', {
                abstract: true,
                url: "/topnav",
                templateUrl: "views/common/content_top_navigation.html",
            })
            .state('topnav.main', {
                url: "/",
                templateUrl: "views/main.html",
                data: { pageTitle: 'Example view' }
            })
            .state('topnav.minor', {
                url: "/minor",
                templateUrl: "views/minor.html",
                data: { pageTitle: 'Example view' }
            })
            .state('root.example-view', {
                url: "/example-view",
                templateUrl: "views/example-view.html",
                resolve: {
                    // Inject the metadata resolved in the root state
                    metadata: function (metadata) {
                        return metadata;
                    }
                },
                data: { pageTitle: 'Example view' }
            })
            .state('root.pre-launch', {
                url: "/pre-launch",
                templateUrl: "views/pre-launch.html",
                data: { pageTitle: 'Example view' }
            })

        /**
         * Base route for routes that requires an api-endpoint
         */
            .state('root.api-endpoints', {
                url: "",
                template: "<ui-view/>",
                resolve: {
                    // all child states of root.api-endpoints needs a currently logged in user
                    // why we need to resolve to a logged in userapp-user for these states
                    userappService: 'user',
                    loggedInUserappUser: function (user) {
                        //console.log('root.api-endpoints - loggedInUserappUser, user.getCurrent()', user.getCurrent());
                        return user.getCurrent();
                    }
                }
            })

        /**
         * Route that allows the user to select current domain
         */
            .state('root.api-endpoints.choose', {
                url: "/choose-account",
                templateUrl: "views/domain/choose-current.html",
                data: {pageTitle: 'Example view'}
            })

        /**
         * Route that sets the current domain to one in the url and then shows the "start" view
         */
            .state('root.api-endpoints.existing', {
                abstract: true,
                url: "/:apiEndpoint",
                template: "<ui-view/>",
                resolve: {
                    // all child states of root.api-endpoints.existing needs information about the current api endpoint to query rest api requests against
                    // such information is stored in the route, why we need to read $stateParams and set the current api endpoint based on the route
                    apiEndpointParam: function ($q, loggedInUserappUser, $stateParams, ApiEndpointService, $rootScope) {
                        //console.log('root.api-endpoints.existing apiEndpointParam - apiEndpointParam, $stateParams, ApiEndpointService', $stateParams, ApiEndpointService);

                        // Make api endpoint variables globally available in all child views
                        $rootScope.apiEndpoints = ApiEndpointService.apiEndpoints;
                        $rootScope.activeApiEndpoint = ApiEndpointService.activeApiEndpoint;
                        $rootScope.setApiEndpoint = ApiEndpointService.setApiEndpoint;

                        return $q(function (resolve, reject) {
                            ApiEndpointService.apiEndpoints.$promise.then(function () {
                                ApiEndpointService.setApiEndpoint($stateParams.apiEndpoint);
                                resolve();
                            }, function (error) {
                                reject(error);
                            });
                        });
                    }
                },
                data: {pageTitle: 'Example view'}
            })

            .state('root.api-endpoints.existing.start', {
                url: "/",
                templateUrl: "views/start.html",
                data: {pageTitle: 'Example view'}
            })

            .state('root.api-endpoints.existing.foos', {
                abstract: true,
                url: "/foos",
                template: "<ui-view/>"
            })

            .state('root.api-endpoints.existing.foos.list', {
                url: "/list",
                templateUrl: "crud/foo/list.html",
                data: {pageTitle: 'List Campaigns'}
            })

            .state('root.api-endpoints.existing.foos.create', {
                url: "/new",
                templateUrl: "crud/foo/form.html",
                data: {pageTitle: 'New Campaign'}
            })

            .state('root.api-endpoints.existing.foos.existing', {
                abstract: true,
                url: "/:fooId",
                controller: "editFooController",
                template: "<ui-view/>"
            })

            .state('root.api-endpoints.existing.foos.existing.view', {
                url: "/view",
                templateUrl: "crud/foo/view.html",
                data: {pageTitle: 'View Campaign'}
            })

            .state('root.api-endpoints.existing.foos.existing.edit', {
                abstract: true,
                url: "/edit",
                templateUrl: "crud/foo/form.html"
            })

            .state('root.api-endpoints.existing.foos.existing.edit.edit-foo', {
                abstract: true,
                url: "/edit-campaign",
                template: "<ui-view/>"
            })

            .state('root.api-endpoints.existing.foos.existing.edit.edit-foo.basic-info', {
                abstract: true,
                url: "/basic-info",
                template: "<ui-view/>"
            })

            .state('root.api-endpoints.existing.foos.existing.edit.edit-foo.basic-info.foo-step', {
                url: "/foo-step",
                onEnter: function () {
                },
                data: {pageTitle: 'Edit Foo'}
            })

        ;

    }

    angular
        .module('app')
        .config(config)
        .config(function (hotkeysProvider) {
            //hotkeysProvider.cheatSheetHotkey = 'k';
        })
        .config(function ($locationProvider) {
            // enable html5Mode for pushstate ('#'-less URLs)
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
        })
        .run(function ($rootScope, $state, user, $http, UserApp, ApiEndpointService) {

            // Login/logout notifications for rest-api (not really used for other reasons than debugging and possibly stats later on)

            $rootScope.$on('user.login', function () {

                ApiEndpointService.activeApiEndpoint.promise.then(function () {

                    // update ua_session_token for rest-api so that api requests are authenticated using the same userapp user
                    // (this is a workaround for the fact that cookies are not shared across api-endpoints)
                    $http.post(env.API_BASE_URL + '/v0/auth/loginNotify', {
                        token: UserApp.tokenStorage.get(),
                        user: user
                    })
                        .success(function (data, status, headers, config) {
                            console.log('login rest api sync request successful');
                        })
                        .error(function (data, status, headers, config) {
                            console.log('login rest api sync request not successful');
                        });

                });

            });

            $rootScope.$on('user.logout', function () {

                ApiEndpointService.activeApiEndpoint.promise.then(function () {

                    // destroy session also on rest-api so that api requests are no longer authenticated using the userapp user that was logged out
                    // (this is a workaround for the fact that cookies are not shared across api-endpoints)
                    $http.post(env.API_BASE_URL + '/v0/auth/logoutNotify', {
                        token: UserApp.tokenStorage.get(),
                        user: user
                    })
                        .success(function (data, status, headers, config) {
                            console.log('logout rest api sync request successful');
                        })
                        .error(function (data, status, headers, config) {
                            console.log('logout rest api sync request not successful');
                        });

                });

            });

        });

})();