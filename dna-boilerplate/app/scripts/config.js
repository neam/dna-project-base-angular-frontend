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
                    optimizely: function (optimizely) {
                        if (env.OFFLINE_DEV === 'true') {
                            return true;
                        }
                        return optimizely.loadProject(env.OPTIMIZELY_ACCOUNT_ID /*, '$stateChangeSuccess' */);
                    }
                },
                data: {showSideMenu: false}
            })

            /**
             * Default "start" route
             */
            .state('root.start', {
                url: "",
                templateUrl: "views/start.html",
                data: {pageTitle: 'Start'}
            })
            .state('root.starttrailingslash', {
                url: "/",
                templateUrl: "views/start.html",
                data: {pageTitle: 'Start'}
            })

            /**
             * Scroll-to sections on start page
             */
            .state('root.start.features', {
                url: "/",
                onEnter: function (smoothScroll) {
                    // scroll to #content
                    var element = document.getElementById('content');
                    smoothScroll(element);
                },
                data: {pageTitle: 'Start'}
            })
            .state('root.start.pricing', {
                url: "/",
                onEnter: function (smoothScroll) {
                    // scroll to #main-plan
                    var element = document.getElementById('main-plan');
                    smoothScroll(element);
                },
                data: {pageTitle: 'Start'}
            })
            .state('root.start.processes', {
                url: "/",
                onEnter: function (smoothScroll) {
                    // scroll to #processes
                    var element = document.getElementById('processes');
                    smoothScroll(element);
                },
                data: {pageTitle: 'Start'}
            })
            .state('root.start.contact', {
                url: "/",
                onEnter: function (smoothScroll) {
                    // scroll to #faq
                    var element = document.getElementById('contact');
                    smoothScroll(element);
                },
                data: {pageTitle: 'Start'}
            })

            /**
             * Request invite
             */

            .state('root.start.user.request-invite', {
                url: "/request-invite",
                onEnter: function (AuthService) {
                    Intercom('onHide', _.once(function () {
                        AuthService.goAfterLogin();
                    }));
                    Intercom('showNewMessage', 'Hi! I would like to get Beta access to ' + env.SITENAME);
                },
                onExit: function () {
                    Intercom('hide');
                },
                data: {pageTitle: 'request-invite'}
            })

            /**
             * FAQ route
             */
            .state('root.faq', {
                url: "/faq",
                templateUrl: "views/faq.html",
                data: {pageTitle: 'FAQ'}
            })

            /**
             * WITHOUT END-POINT Section - 1. Supply basic info
             */
            .state('root.basic-info', {
                abstract: true,
                url: "/basic-info",
                views: {
                    '': {
                        template: "<ui-view/>",
                        controller: "BasicInfoController"
                    },
                    'sidebar@root': {
                        templateUrl: "sections/basic-info/navigation.html"
                    }
                },
                data: {
                    pageTitle: '1. Supply basic info',
                    showSideMenu: true
                }
            })

            .state('root.basic-info.overview', {
                url: "/overview",
                templateUrl: "sections/basic-info/overview.html",
                data: {pageTitle: 'Basic Info'}
            })

            /**
             * WITHOUT END-POINT Section - 2. Get things done | Connect spent time with business value
             */
            .state('root.get-things-done', {
                abstract: true,
                url: "/connect-spent-time-with-business-value",
                views: {
                    '': {
                        template: "<ui-view/>",
                        controller: "GetThingsDoneController",
                    },
                    'sidebar@root': {
                        templateUrl: "sections/get-things-done/navigation.html",
                    }
                },
                resolve: {
                    /*
                     // Inject the metadata resolved in the root state
                     metadata: function (metadata) {
                     return metadata;
                     }
                     */
                },
                data: {
                    pageTitle: '2. Connect spent time with business value',
                    showSideMenu: true
                }

            })

            .state('root.get-things-done.overview', {
                url: "/overview",
                templateUrl: "sections/get-things-done/overview.html",
                data: {pageTitle: 'Connect spent time with business value'}
            })

            /**
             * WITHOUT END-POINT Section - 3. Generate reports | Share | Export
             */
            .state('root.export', {
                abstract: true,
                url: "/export",
                views: {
                    '': {
                        template: "<ui-view/>",
                        controller: "ExportController",
                    },
                    'sidebar@root': {
                        templateUrl: "sections/export/navigation.html"
                    }
                },
                data: {
                    pageTitle: '3. Generate reports',
                    showSideMenu: true
                }
            })

            .state('root.export.overview', {
                url: "/overview",
                templateUrl: "sections/export/overview.html",
                controller: "ReportedTimeController",
                deepStateRedirect: true,
                resolve: {
                    /*
                    // Inject the metadata resolved in the root state
                    metadata: function (metadata) {
                        return metadata;
                    }
                    */
                },
                data: {
                    pageTitle: 'Export',
                    drillDownData: null
                }
            })

            /**
             * WITHOUT END-POINT Section - 4. Stay up-to-date
             */
            .state('root.up-to-date', {
                abstract: true,
                url: "/stay-up-to-date",
                views: {
                    '': {
                        template: "<ui-view/>",
                        controller: "UpToDateController",
                    },
                    'sidebar@root': {
                        templateUrl: "sections/up-to-date/navigation.html",
                    }
                },
                data: {
                    pageTitle: '4. Stay up-to-date',
                    showSideMenu: true
                }
            })

            .state('root.up-to-date.overview', {
                url: "/overview",
                templateUrl: "sections/up-to-date/overview.html",
                data: {pageTitle: 'Stay up-to-date'}
            })

            /**
             * Base route for routes that requires an api-endpoint
             */
            .state('root.api-endpoints', {
                url: "",
                template: "<ui-view/>",
                data: {
                    requiresLogin: true
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
                    apiEndpointParam: function ($stateParams, ApiEndpointService, $rootScope) {
                        //console.log('root.api-endpoints.existing apiEndpointParam - apiEndpointParam, $stateParams, ApiEndpointService', $stateParams, ApiEndpointService);

                        // Set active endpoint based on state param
                        ApiEndpointService.setApiEndpoint($stateParams.apiEndpoint);

                        return ApiEndpointService.activeApiEndpoint.promise;

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
                resolve: {
                    setRouteBasedFilters: function (routeBasedFilters, $stateParams) {
                        routeBasedFilters.Bar_order = 'Foo.id DESC';
                        routeBasedFilters.Bar_foo_id = $stateParams.fooId;
                    }
                },
                views: {
                    '': {
                        templateUrl: "crud/foo/form.html"
                    },
                    'sidebar@root': {
                        templateUrl: "crud/foo/navigation.html"
                    }
                }
            })

            .state('root.api-endpoints.existing.foos.existing.edit.edit-foo', {
                abstract: true,
                url: "/edit-foo",
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

            /**
             * Section - 1. Supply basic info
             */
            .state('root.api-endpoints.existing.basic-info', {
                abstract: true,
                url: "/basic-info",
                views: {
                    '': {
                        template: "<ui-view/>",
                        controller: "BasicInfoController"
                    },
                    'sidebar@root': {
                        templateUrl: "sections/basic-info/navigation.html"
                    }
                },
                /*
                 resolve: {
                 // Inject the metadata resolved in the root state
                 metadata: function (metadata) {
                 return metadata;
                 }
                 },
                 */
                data: {
                    pageTitle: '1. Supply basic info',
                    showSideMenu: true
                }
            })

            .state('root.api-endpoints.existing.basic-info.overview', {
                url: "/overview",
                templateUrl: "sections/basic-info/overview.html",
                data: {pageTitle: 'Basic Info'}
            })

            .state('root.api-endpoints.existing.basic-info.my-tax-entities', {
                url: "/my-tax-entities",
                templateUrl: "sections/basic-info/my-tax-entities.html",
                data: {pageTitle: 'Basic Info'}
            })

            .state('root.api-endpoints.existing.basic-info.financials', {
                url: "/financials",
                templateUrl: "sections/basic-info/financials.html",
                data: {pageTitle: 'Basic Info'}
            })

            /**
             * Section - 2. Import
             */
            .state('root.api-endpoints.existing.import', {
                abstract: true,
                url: "/import",
                views: {
                    '': {
                        template: "<ui-view/>",
                        controller: "ImportController",
                    },
                    'sidebar@root': {
                        templateUrl: "sections/import/navigation.html"
                    }
                },
                /*
                 resolve: {
                 // Inject the metadata resolved in the root state
                 metadata: function (metadata) {
                 return metadata;
                 }
                 },
                 */
                data: {
                    pageTitle: '2. Import',
                    showSideMenu: true
                }
            })

            .state('root.api-endpoints.existing.import.overview', {
                url: "/overview",
                templateUrl: "sections/import/overview.html",
                data: {pageTitle: 'Import'}
            })

            /**
             * Section - 3. Get things done
             */
            .state('root.api-endpoints.existing.get-things-done', {
                abstract: true,
                url: "/get-things-done",
                views: {
                    '': {
                        template: "<ui-view/>",
                        controller: "GetThingsDoneController",
                    },
                    'sidebar@root': {
                        templateUrl: "sections/get-things-done/navigation.html"
                    }
                },
                /*
                 resolve: {
                 // Inject the metadata resolved in the root state
                 metadata: function (metadata) {
                 return metadata;
                 }
                 },
                 */
                data: {
                    pageTitle: '3. Get things done',
                    showSideMenu: true
                }
            })

            .state('root.api-endpoints.existing.get-things-done.overview', {
                url: "/overview",
                templateUrl: "sections/get-things-done/overview.html",
                controller: "GetThingsDoneController",
                data: {
                    pageTitle: '3. Get things done',
                    showSideMenu: true
                }
            })

            /**
             * Section - 4. Stay up-to-date
             */
            .state('root.api-endpoints.existing.up-to-date', {
                abstract: true,
                url: "/stay-up-to-date",
                views: {
                    '': {
                        template: "<ui-view/>",
                        controller: "UpToDateController",
                    },
                    'sidebar@root': {
                        templateUrl: "sections/up-to-date/navigation.html",
                    }
                },
                /*
                 resolve: {
                 // Inject the metadata resolved in the root state
                 metadata: function (metadata) {
                 return metadata;
                 }
                 },
                 */
                data: {
                    pageTitle: '4. Stay up-to-date',
                    showSideMenu: true
                }
            })

            .state('root.api-endpoints.existing.up-to-date.overview', {
                url: "/overview",
                templateUrl: "sections/up-to-date/overview.html",
                data: {pageTitle: 'Stay up-to-date'}
            })
        ;

    };

    angular
        .module('app')
        .config(config)
        .config(function (hotkeysProvider) {
            //hotkeysProvider.cheatSheetHotkey = 'k';
        })
        .config(function ($locationProvider) {
            // enable html5Mode for pushstate ('#'-less URLs)
            //$locationProvider.html5Mode(true);
            //$locationProvider.hashPrefix('!');
        })
        .config(function (filepickerProvider) {
            filepickerProvider.setKey(env.FILEPICKER_API_KEY);
        })
        .run(function ($rootScope) {
            $rootScope.dnaFileSelectionWidgetPreviewHeightPixels = 500;
        })
        .run(function ($rootScope) {
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.Intercom = window.Intercom;
            });
        })
        .run(function ($rootScope, $state, suggestionsService, hotkeys, auth, $http, ApiEndpointService, $location) {

            // Make api endpoint variables globally available in all child views

            $rootScope.apiEndpoints = ApiEndpointService.apiEndpoints;
            $rootScope.activeApiEndpoint = ApiEndpointService.activeApiEndpoint;
            $rootScope.setApiEndpoint = ApiEndpointService.setApiEndpoint;

            // Make suggestions and hotkey services globally available in all views

            $rootScope.suggestionsService = suggestionsService;
            $rootScope.hotkeys = hotkeys;

            // Make auto0 service available in all views

            $rootScope.auth = auth;

            // Save $location.search() params between state changes

            var locationSearch;

            locationSearch = $location.search();
            console.log('on load - locationSearch', locationSearch);

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                //save location.search so we can add it back after transition is done
                locationSearch = $location.search();
                console.log('$stateChangeStart - locationSearch', locationSearch);
            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                //restore all query string parameters back to $location.search
                $location.search(locationSearch);
                console.log('$stateChangeSuccess - locationSearch', locationSearch);
            });

            // Login/logout notifications for rest-api (not really used for other reasons than debugging and possibly stats later on)

            $rootScope.$on('user.login', function () {

                ApiEndpointService.activeApiEndpoint.promise.then(function () {

                    // update ua_session_token for rest-api so that api requests are authenticated using the same userapp user
                    // (this is a workaround for the fact that cookies are not shared across api-endpoints)
                    $http.post(env.API_BASE_URL + '/' + env.API_VERSION + '/auth/loginNotify', {
                            profile: auth.profile
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
                    $http.post(env.API_BASE_URL + '/' + env.API_VERSION + '/auth/logoutNotify', {
                            profile: auth.profile
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