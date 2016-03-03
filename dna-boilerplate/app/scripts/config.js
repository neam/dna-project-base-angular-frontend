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
                    // Avoid FOUC by waiting for optimizely variation data to be available before rendering page
                    optimizelyVariation: function (optimizelyVariation) {
                        return optimizelyVariation.deferred.promise();
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
             * WITHOUT END-POINT Section - 0. Supply basic info
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
                    requiresLogin: true,
                    pageTitle: '0. Supply basic info',
                    showSideMenu: true
                }
            })

            .state('root.basic-info.overview', {
                url: "/overview",
                templateUrl: "sections/basic-info/overview.html",
                data: {pageTitle: 'Basic Info'}
            })

            /**
             * WITHOUT END-POINT Section - 1. Get started
             */
            .state('root.get-started', {
                abstract: true,
                url: "/get-started",
                views: {
                    '': {
                        template: "<ui-view/>",
                        controller: "GetStartedController"
                    },
                    'sidebar@root': {
                        templateUrl: "sections/get-started/navigation.html"
                    }
                },
                data: {
                    requiresLogin: true,
                    pageTitle: '1. Get started',
                    showSideMenu: true
                }
            })

            .state('root.get-started.introduction', {
                url: "/overview",
                templateUrl: "sections/get-started/introduction.html",
                data: {pageTitle: '1. Get started - Introduction'}
            })

            .state('root.get-started.what-to-get-done', {
                url: "/what-to-get-done",
                templateUrl: "sections/get-started/what-to-get-done.html",
                data: {pageTitle: '1. Decide how to use the tool - What to get done'}
            })

            .state('root.get-started.survey', {
                url: "/survey",
                templateUrl: "sections/get-started/survey.html",
                data: {pageTitle: '1. Decide how to use the tool - Survey'}
            })

            .state('root.get-started.introduction.request-invite', {
                url: "/request-invite",
                onEnter: function ($state) {
                    Intercom('onHide', _.once(function () {
                        $state.go('root.get-started.introduction');
                    }));
                    Intercom('showNewMessage', 'Hi! I would like to get Beta access to ' + env.SITENAME);
                },
                onExit: function () {
                    Intercom('hide');
                },
                data: {pageTitle: 'request-invite'}
            })

            /**
             * WITHOUT END-POINT Section - 2. Import
             */
            .state('root.import-and-inspect', {
                abstract: true,
                url: "/import-and-inspect",
                views: {
                    '': {
                        template: "<ui-view/>",
                        controller: "ImportController",
                    },
                    'sidebar@root': {
                        templateUrl: "sections/import-and-inspect/navigation.html",
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
                    requiresLogin: true,
                    pageTitle: '2. Import and inspect',
                    showSideMenu: true
                }

            })

            .state('root.import-and-inspect.import', {
                abstract: true,
                url: "/import",
                template: "<ui-view/>",
            })

            .state('root.import-and-inspect.import.overview', {
                url: "/overview",
                templateUrl: "sections/import-and-inspect/import.overview.html",
                data: {pageTitle: 'Inspect'}
            })

            .state('root.import-and-inspect.import.overview.request-invite', {
                url: "/request-invite",
                onEnter: function ($state) {
                    Intercom('onHide', _.once(function () {
                        $state.go('root.import-and-inspect.import.overview');
                    }));
                    Intercom('showNewMessage', 'Hi! I would like to get Beta access to ' + env.SITENAME);
                },
                onExit: function () {
                    Intercom('hide');
                },
                data: {pageTitle: 'request-invite'}
            })

            /**
             * WITHOUT END-POINT Section - 3. Get things done
             */
            .state('root.get-things-done', {
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
                data: {
                    requiresLogin: true,
                    pageTitle: '3. Get things done',
                    showSideMenu: true
                }
            })

            .state('root.get-things-done.overview', {
                url: "/overview",
                templateUrl: "sections/get-things-done/get-things-done.html",
                data: {pageTitle: 'Get Things Done'}
            })

            .state('root.get-things-done.overview.request-invite', {
                url: "/request-invite",
                onEnter: function ($state) {
                    Intercom('onHide', _.once(function () {
                        $state.go('root.get-things-done.overview');
                    }));
                    Intercom('showNewMessage', 'Hi! I would like to get Beta access to ' + env.SITENAME);
                },
                onExit: function () {
                    Intercom('hide');
                },
                data: {pageTitle: 'request-invite'}
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
                    requiresLogin: true,
                    pageTitle: '4. Stay up-to-date',
                    showSideMenu: true
                }
            })

            .state('root.up-to-date.overview', {
                url: "/overview",
                templateUrl: "sections/up-to-date/overview.html",
                data: {pageTitle: 'Stay up-to-date'}
            })

            .state('root.up-to-date.overview.request-invite', {
                url: "/request-invite",
                onEnter: function ($state) {
                    Intercom('onHide', _.once(function () {
                        $state.go('root.up-to-date.overview');
                    }));
                    Intercom('showNewMessage', 'Hi! I would like to get Beta access to ' + env.SITENAME);
                },
                onExit: function () {
                    Intercom('hide');
                },
                data: {pageTitle: 'request-invite'}
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
                url: "/:dataEnvironment",
                template: "<ui-view/>",
                resolve: {
                    // all child states of root.api-endpoints.existing needs information about the current api endpoint to query rest api requests against
                    // such information is stored in the route, why we need to read $stateParams and set the current api endpoint based on the route
                    dataEnvironmentParam: function ($stateParams, DataEnvironmentService, $rootScope) {
                        //console.log('root.api-endpoints.existing dataEnvironmentParam - dataEnvironmentParam, $stateParams, DataEnvironmentService', $stateParams, DataEnvironmentService);

                        // Set active endpoint based on state param
                        DataEnvironmentService.setDataEnvironment($stateParams.dataEnvironment);

                        return DataEnvironmentService.activeDataEnvironment.promise;

                    }
                },
                data: {pageTitle: 'Example view'}
            })

            .state('root.api-endpoints.existing.start', {
                url: "/",
                templateUrl: "views/start.html",
                data: {pageTitle: 'Example view'}
            })

            /**
             * Section - 0. Supply basic info
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
                    pageTitle: 'Supply basic info',
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
             * Section - 1. Get started
             */
            .state('root.api-endpoints.existing.get-started', {
                abstract: true,
                url: "/get-started",
                views: {
                    '': {
                        template: "<ui-view/>",
                        controller: "GetStartedController"
                    },
                    'sidebar@root': {
                        templateUrl: "sections/get-started/navigation.html"
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
                    pageTitle: '1. Decide how to use the tool',
                    showSideMenu: true
                }
            })

            .state('root.api-endpoints.existing.get-started.introduction', {
                url: "/introduction",
                templateUrl: "sections/get-started/introduction.html",
                data: {pageTitle: '1. Decide how to use the tool - Introduction'}
            })

            .state('root.api-endpoints.existing.get-started.what-to-get-done', {
                url: "/what-to-get-done",
                templateUrl: "sections/get-started/what-to-get-done.html",
                data: {pageTitle: '1. Decide how to use the tool - What to get done'}
            })

            .state('root.api-endpoints.existing.get-started.survey', {
                url: "/survey",
                templateUrl: "sections/get-started/survey.html",
                data: {pageTitle: '1. Decide how to use the tool - Survey'}
            })

            /**
             * Section - 2. Import and inspect
             */
            .state('root.api-endpoints.existing.import-and-inspect', {
                abstract: true,
                url: "/import-and-inspect",
                views: {
                    '': {
                        template: "<ui-view/>",
                        controller: "ImportController",
                    },
                    'sidebar@root': {
                        templateUrl: "sections/import-and-inspect/navigation.html"
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

            .state('root.api-endpoints.existing.import-and-inspect.import', {
                abstract: true,
                url: "/import",
                template: "<ui-view/>",
                resolve: {
                    setRouteBasedContentFiltersLevel0: function (routeBasedContentFilters, $stateParams) {
                        routeBasedContentFilters.ImportSession_order = 'ImportSession.created DESC';
                        routeBasedContentFilters.InputResult_order = 'InputResult.created DESC';
                    },
                },
            })

            .state('root.api-endpoints.existing.import-and-inspect.import.overview', {
                url: "/overview",
                templateUrl: "sections/import-and-inspect/import.overview.html",
                data: {pageTitle: 'Import'}
            })

            .state('root.api-endpoints.existing.import-and-inspect.import.images', {
                url: "/images",
                templateUrl: "sections/import-and-inspect/import.images.html",
                resolve: {
                },
                data: {pageTitle: 'Inspect'}
            })

            .state('root.api-endpoints.existing.import-and-inspect.inspect', {
                abstract: true,
                url: "/inspect",
                template: "<ui-view/>",
            })

            .state('root.api-endpoints.existing.import-and-inspect.inspect.overview', {
                url: "/overview",
                templateUrl: "sections/import-and-inspect/inspect.overview.html",
                data: {pageTitle: 'Inspect'}
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
            filepickerProvider.setKey(env.FILESTACK_API_KEY);
        })
        .run(function ($rootScope) {
            $rootScope.dnaFileSelectionWidgetPreviewHeightPixels = 500;
        })
        .run(function ($rootScope) {
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.Intercom = window.Intercom;
            });
        })
        .config(function (optimizelyProvider) {
            optimizelyProvider.setKey(env.OPTIMIZELY_PROJECT_ID);
            optimizelyProvider.setActivationEventName(false);
            //optimizelyProvider.setActivationEventName('$stateChangeSuccess');
        })
        .run(function ($rootScope, optimizelyVariation) {
            $rootScope.optimizelyVariation = optimizelyVariation;
        })
        .run(function ($rootScope, $state, suggestionsService, hotkeys, auth, $http, DataEnvironmentService, $location) {

            // Make api endpoint variables globally available in all child views

            $rootScope.dataEnvironments = DataEnvironmentService.dataEnvironments;
            $rootScope.activeDataEnvironment = DataEnvironmentService.activeDataEnvironment;
            $rootScope.setDataEnvironment = DataEnvironmentService.setDataEnvironment;

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

                DataEnvironmentService.activeDataEnvironment.promise.then(function () {

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

                DataEnvironmentService.activeDataEnvironment.promise.then(function () {

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